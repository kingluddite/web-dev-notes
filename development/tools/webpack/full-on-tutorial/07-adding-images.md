# Adding Images
Start thinking that everything are dependencies

`src/image.js`

```js
import kittenPath from './img/kitten.jpg';

const Image = `<img src="${kittenPath}">`;

export default Image;
```

## Add file-loader
`$ npm install file-loader`

### update `webpack.config.js`

```js
module.exports = {
  devtool: 'source-map',
  entry,
  plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpg|gif)$/,
      loaders: ['file-loader'],
      exclude: '/node_modules/',
    }],
  },
  output: {
    path: path.join( __dirname, 'dist' ),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
};
```

* We added our file-loader
* We need to tell webpack what to do with a jpg
* By default webpack handles JavaScript, plain JavaScript
* We already added a loader that handles ESNext (ES6 and future) and transpile it
* We are now going to add a file loader that will handle arbitrary files

`index.js`

```js
import messages from './messages';
// import Button from './button';
import Kitten from './image';

const oldMessage = () => ( `
  <p>
    ${messages.event} AND ${messages.hi}
  </p>
  <p>
    ${Kitten}
  </p>
  ` );
// const newMessage = () => ( Button.button );
const app = document.getElementById( 'app' );

app.innerHTML = oldMessage();

// app.innerHTML = newMessage();

// Button.attachEl();

if ( module.hot ) {
  module.hot.accept();
}
```

## Run build
`$ npm run build`

![build export with images](https://i.imgur.com/DGCdVaQ.png)

* You will see we now have an export hash of our image
* And if you view the source

![image page source](https://i.imgur.com/ARlX2sJ.png)

* Our image has been giving a hash as it's source name

### Look in dist folder
You will see the hashed image has been placed there

## Let's add another image
Download another image. I did a FC Barcelona logo and saved it as `img/fcb-logo.jpg`

### Create a new file named `src/fcb-logo.js`

```js
import fcbLogoPath from './img/128-logo-fc-barcelona-small.jpg';

const Image = `<img src="${fcbLogoPath}">`;

export default Image;
```

* The image is small (128x128)

### Update `index.js`

```
import messages from './messages';
// import Button from './button';
import Kitten from './image';
import FCBLogo from './fcb-logo';

const oldMessage = () => ( `
  <p>
    ${messages.event} AND ${messages.hi}
  </p>
  <p>
    ${Kitten}
  </p>
  <p>
    ${FCBLogo}
  </p>
  ` );
// const newMessage = () => ( Button.button );
const app = document.getElementById( 'app' );

app.innerHTML = oldMessage();

// app.innerHTML = newMessage();

// Button.attachEl();

if ( module.hot ) {
  module.hot.accept();
}
```

## Data URL
Since the 2nd image we added is so small we might want to include it as a data url so that the browser doesn't have to do another HTTP request which would take some time.

Right now it is include the 2nd image on the file like:

![included 2nd image on page](https://i.imgur.com/28U8ZMK.png)

### install the url-loader

`$ npm install url-loader --save-dev`

### update `webpack.config.js`

Add our `url-loader`

```js
module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpg|gif)$/,
      loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      exclude: '/node_modules/',
    }],
  },
```

Let's examine this new chunk of code:

```js
loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
```

* We set our image site limit to 10,000 (10k)
* We tell it to name it with `images/` + a 12 character hash + `.` + whatever the extension is

### How does the url-loader work?
By saying that if an image is smaller than (THIS SIZE) make this into a data-url, if not, use the file-loader and serve it with the file loader

![data url](https://i.imgur.com/HvLRvd2.png)

So now we see that it takes care of the larger images by serving them to the page and the smaller images are data url images which helps us by limiting the HTTP requests the server has to make

How did we know how to use the url-loader. We just found it in the [documentation](https://github.com/webpack/url-loader)
