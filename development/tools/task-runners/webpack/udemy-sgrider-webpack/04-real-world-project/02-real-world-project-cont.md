# Real Word Project Continued
We have an error `wepackJsonp is not defined`

![webpack jsonp error](https://i.imgur.com/EPispFZ.png)

## No script tag!
* We forgot to add our `<script>` for vendor.js
* But to have to add these all the time is a pain
* There is a plugin that will add them for us

## Add script tags automatically
Now it will run and regenerate our HTML with the necessary script tags injected

`$ yarn add -D html-webpack-plugin`

* We need to make our index.html a template so it knows where to inject the script tags

## Move `index.html`
* Since `index.html` is not part of the configuration of our project we'll move it into `src`

`index.html`

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Upstar Music</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="dist/bundle.js"></script>
</html>
```

### Remove the script tag

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Upstar Music</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

`webpack.config.js`

```
/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'faker', 'lodash', 'react', 'react-dom', 'react-input-range', 'react-redux', 'react-router', 'redux', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
```

* We add the `require` and add the plugin

`$ npm build`

`$ open dist/index.html`

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Upstar Music</title>
  </head>
  <body>
    <div id="root"></div>
  <script type="text/javascript" src="vendor.js"></script><script type="text/javascript" src="bundle.js"></script></body>
</html>
```

## Disable cache (while DevTools is open)
`ctrl` + `j` > `Settings`

![Disable cache (while DevTools is open)](https://i.imgur.com/amRltjy.png)

* By default, as a developer, you should have this checked so you never get a cached version of your `bundle.js` file

## Bust our cache
aka `cache busting`

* We need to somehow rename our `bundle.js` file and our vendor .js files so the browser is crystal clear on when the files have actually changed
* by renaming the file we'll give the browser the info it needs to know if it downloaded the file before

### chuckhash to the rescue!
* `hashed` of the contents of the file
* **hashed** === long string of numbers and letters
* everytime we build our project webpack will automatically hash the contents of our file (unique string of characters)

```
// more code
module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
// more code
```

* one small gotcha
* When we build webpack will think we also changed our vendor

#### The fix
Update this:

```
// more code
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
// more code
```

To this: 

```
// more code
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
// more code
```

* With that change, a new file will be created `manifest' that's purpose is to better tell the browser whether or not the vendor file actually got changed

Chunked cache with manifest

![chunked cache](https://i.imgur.com/cF4cPp4.png)

* separate caches for bundle.js and vendor.js
* if we change something in our custom code, the bundle will change but vendor will be same chunk cache

`src/index.js`

```
// more code
import '../style/style.css';
console.log('we made a change'); // add this line
// more code
```

#### Before

![before build](https://i.imgur.com/xO0kpPT.png)

#### After build

![after build](https://i.imgur.com/o1iKAi0.png)

* We generated a `bundle.js` but not a vendor so that is 3MB we won't have to download again
* We will need a way of deleting files in our dist file
* This is saving us tons of time
* The hash is updated inside `dist/index.html`

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Upstar Music</title>
  </head>
  <body>
    <div id="root"></div>
  <script type="text/javascript" src="manifest.8433775aaa8609e6474b.js"></script><script type="text/javascript" src="vendor.8fec7088e312a213ba37.js"></script><script type="text/javascript" src="bundle.f2dab149e8314f8b6c1a.js"></script></body>
</html>
```

## Cleaning project files
* Each time we run builds we get additonal files added
* This is not good

### install rimraf
This is a helper module

`$ yarn add -D rimraf`

* This program was create because of differences in OS systems
    - OS gives you access to a tiny program that can remove folder/files from your system using `rm`
    - On Windows, that command is not available
    - this is a combatibility program for cleaning out files and folders

`package.json`

```
// more code
"scripts": {
    "clean": "rimraf dist",
    "build": "webpack"
  },
// more code
```

### Update to

```
// more code
  "scripts": {
    "clean": "rimraf dist",
    "build": "yarn run clean && webpack"
  },
// more code
```

1. It will delete all files inside our build diretory (dist)
2. And then rebuild our project

### Test it out
And it should work
