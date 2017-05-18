# Handling Images with Webpack
* We are loading images from a 3rd party
* Downside is it takes longer to load images
* It would be much faster if we hosted the images locally ourselves
* And include that image in our local build pipeline

## We will use two separate loaders to handle images inside our app
![loading images diagram](https://i.imgur.com/inb6YkS.png)

* Whenever we attempt to import an image into a file
* We are going to send it down into two separate loaders

1. `image-webpack-loader`
    * This will optimize the image for us automatically
2. `url-loader`
    * Behaves differently depending on the size of the image
        - if image is small (_10kb or smaller_), then it will be included inside of our `bundle.js` as raw data
    * If image is large/big, it will include the raw image in the output directory
        - We'll have to reference this image inside of our code

### install the image loader
`$ yarn add -D image-webpack-loader url-loader`

```
/* eslint-disable */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        }),
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};

module.exports = config;
```

Create `/src/assets`

[http://lorempixel.com/1200/1200](http://lorempixel.com/1200/1200/)

* Open your finder inside your project `$ open .`
* Hold `cmd` down and click and drag image into `assets` folder
* Rename image as `big.jpg`
* Do the same thing but make it `http://lorempixel.com/200/200`. Drag it into `assets`
    - Rename it to `small.jpg`
* Import both images into your `image-viewer.js` file

`image-viewer.js`

```
import big from './assets/big.jpg';
import small from './assets/small.jpg';
import './styles/image-viewer.css';

const image = document.createElement('img');
image.src = small;

document.body.appendChild(image);

const bigImage = document.createElement('img');
bigImage.src = big;

document.body.appendChild(bigImage);
```

`$ yarn build`

### Error!
You need to install file-loader

* You need to update brew with `$ brew install libpng`
* Also add `$ yarn add file-loader`

`$ yarn build`

It should work now

* You should see a super large image filename inside `dist`
* The small image has been converted to **base64**
  - [How does base64 make the web better?](https://varvy.com/pagespeed/base64-images.html)
* The large image is broken and the console says the path is wrong

## Public Paths
Update our `webpack.config.js` with:

```
// more code
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
// more code
```

`$ npm build`

Refresh `index.html` in brower and our image appears

![publicPath diagram](https://i.imgur.com/Mf6JYkB.png)

* `URL Loader` job is to take our image `src/assets/big.jpg` and copy that image to our `dist` folder
* Then the URL goes back to the **import** statement inside of the `image-viewer.js`
    - And it grabs that really log filename it gave in the **build** to `big` variable
    - If we define the **output.publicPath**, the `URL Loader` will take that property, will take that string that we defined `dist/` and prepend it to the URL that gets passed back from that import statement
    - **output.publicPath** - is not just used by `URL loader`, it is also used by any other loader that produces a direct file path reference to a file in our output directory
        + The good thing is we only have to define it one time and then we'll be good to go for everything in the future
