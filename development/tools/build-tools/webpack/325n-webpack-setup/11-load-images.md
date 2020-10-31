# How to load images with Webpack
* How to load images through css or template
* How to use the file loader through your webpack config

## image-webpack-loader
* [documentation](https://github.com/tcoopman/image-webpack-loader)

`$ yarn add -D image-webpack-loader`

## file-loader
* [documentation](https://github.com/webpack-contrib/file-loader)
* Install

`$ yarn add -D file-loader`

* This loader will scan all our files and wherever we are referencing an image it will try to load it inside our `dist`

## ADD image with css
* background image

`index.scss`

```
html, body {
  height: 100%;
  min-height: 100%;
  background: url('./img/puma-logo.jpg') center center no-repeat;
}

body {
  h1 {
    color: red;
  }
}
```

`$ yarn run dev`

* You will get an error
* You need to add a loader for images

## Add a loader for jpg
`webpack.config.js`

```
// MORE CODE
{
  test: /\.jpg$/,
  use: ['file-loader'],
},
// MORE CODE
```

* Stop and start server `$ yarn run dev`
* The puma logo appears in middle of page

## Load image into template
* We'll use HTML and not pug (pug we'll do later)
* We'll use a svg
* Don't forget to change from `.pug` to `.html`

`webpack.config.js`

```
// MORE CODE
new HTMLPlugin({
  title: 'Home Page',
  minify: {
    collapseWhitespace: true,
  },
  hash: true,
  excludeChunks: ['contact'],
  template: './src/index.html',
}),
// MORE CODE
```

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <h1>Webpack and images</h1>
    <h2>How to configure Webpack to use images from our template or CSS</h2>
    <img src=<%= require("./img/pen.png") %> alt="pen" />
  </body>
</html>
```

* **note** If you're using pug and want to use require the syntax is only a tad different

`img(src=require("./../assets/image.png"))﻿`

* Run dev server and view penquin in browser

`$ yarn run prod`

* Image will be saved to `img` folder

### file-loader
* [documentation](https://github.com/webpack-contrib/file-loader)

#### Modify where image files are saved
#### Modify what image filename is
`webpack.config`

```js
// MORE CODE
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }  
}
// MORE CODE
```

* Or

```
// MORE CODE
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: 'file-loader?name=[name].[ext]&outputPath=images/',
    },
  ],
},
devServer: {
// MORE CODE
```

* That will save the original name inside the `img` folder

## Name your images with hash

```
// MORE CODE
{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: 'file-loader?name=[hash:6].[ext]&outputPath=img/',
},
// MORE CODE
```

![hash named images of size 6](https://i.imgur.com/JJGIY6J.png)

## Optimize images
* Before they are saved into the `dist/img`

### image-webpack-loader
* Install it

`$ yarn add -D image-webpack-loader`

* Change back to name and not hash
* So we can compare original img size with optimized img size
* Include `image-webpack-loader`

```
// MORE CODE
{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader?name=[name].[ext]&outputPath=img/',
    'image-webpack-loader',
  ],
},

// MORE CODE
```

* The order of the loaders matters
* We want optimize the image first (last in array)
* Then we name and move them to `dist/img`

## Cool app - Beyond Compare
* [download](https://www.scootersoftware.com/download.php)
* Compares file size/folder size
* After downloading point to original `src/img` and on the right point to `dist/img`
* Run `$ yarn run prod`
* Refresh Beyond Compare and see file size reduction

## Fix background css so that it is optimized and moved
`webpack.config.js`

```
// MORE CODE
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        url: true, // change this to true
        minimize: true,
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
});
// MORE CODE
```

* Now you'll see 2 images inside `dist/img`
* Compare again and see file savings

#### Lots of options (see documentation)
```
loaders: [{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
  ],
}]
```

## Houston we have a problem!
* Currently, the html file doesn't know where the file is saved

`index.html`

```
// MORE CODE
    <img src=<%= require("./img/pen.png") %> alt="pen" />
  </body>
</html>
```

* The `publicPath` needs to be defined with outputPath

## Update
* I had issues with public path and ended up not using it as I could not get it working
* I used the modern webpack 4 notation instead of the antiquated query string method

`webpack.config.js`

```
// MORE CODE
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // use: [
        //   'file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/',
        //   'image-webpack-loader',
        // ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              // publicPath: 'img/',
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
// MORE CODE
```

* I installed `html-loader` (https://github.com/webpack-contrib/html-loader)

`$ yarn add -D html-loader`

`webpack.config.js`

```
// MORE CODE
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false,
              collapseWhitespace: false,
            },
          },
        ],
      },
// MORE CODE
```

* So I could use this in `index.html`

`<img src="img/pen.png" alt="pen" />`

* Instead of this:

`<img src=<%= require("./img/pen.png") %> alt="pen" />`

* I installed `html-loader` with `$ yarn add -D html-loader`﻿
