# Styling

`$ mkdir style`

`$ touch style/globalStyle.css`

`src/style/globalStyle.css`

```css
body {
    background: lightblue;
}
```

## Import the style
Add to the top of this file

`index.js`

```js
import globalStyle from './style/globalStyle.css';
```

## Add loaders for CSS
`$ npm install css-loader style-loader --save-dev`

* `css-loader`
    - Takes care of loading and understanding the css
* `style-loader`
    - Takes the content of that CSS and input put it (inject) a style tag into the head of my page

## Update

`webpack.config.js`

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
  }, {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader'],
    exclude: '/node_modules/',
  }],
},
```

## Run the dev server
`$ npm run dev`

Refresh the background and you should see that it now has a lightblue background. The CSS is now working.

## Chrome Inspector tool
If you inspect you will see how the CSS was injected into the `<head>` tag:

```html
<style type="text/css">body {
    background: lightblue;
}</style>
```

# Let's do something more advanced

`src/style/globalStyle.css`

```css
body {
    background: lightblue;
}

/* this is the syntax for css modules without any other module loading system */
:local(.box) {
  background-color: white;
  padding: 1em;
  border: 1px solid deeppink;
}
```

If you use React, you will use some other system for injecting CSS into your project.

* We are just using plain JavaScript

`src/index.js`

```js
import globalStyle from './style/globalStyle.css';

// const newMessage = () => ( multiply( 3, 3 ) );
const newMessage = () => ( `
  <div class="${globalStyle.box}">
  DEV: ${DEVELOPMENT.toString()}<br>
  PROD: ${PRODUCTION.toString()}<br>
  </div>
` );
```

View in browser and you should see a white box with a pink border

## Chrome inspector
You will see the class names are now hashed

![hashed class names](https://i.imgur.com/uxVPwwH.png)

This is the default setting of `css-loader`

## Give better class names
Update the style loader

`webpack.config.js`

```js
{
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?localIdentName=[path][name] --[local]'],
      exclude: '/node_modules/',
}
```

## Run the dev server
`$ npm run dev`

## View in Chrome inspector

```html
<div class="src-style-globalStyle---box">
  DEV: true<br>
  PROD: false<br>
  </div>
```

This is better for development because you now can see what the names are

## Bad for Production
But for production doing it this way can get bad, so we like the hash name in production

`webpack.config.js`

```js
const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]--[local]';

module.exports = {
  devtool: 'source-map',
  entry,
  plugins,
  module: {
    loaders: [{ ... }, { ... }, {
      test: /\.css$/,
      loaders: ['style-loader', `css-loader?localIdentName=${cssIdentifier}`],
      exclude: '/node_modules/',
    }],
  },
  output: { ... },
};
```

* Now our code has nice class names for local development and 10 char long hashed classes (`t.locals={box:"_3A1UJCb1xF"}`) in production

View in each environemen and see the difference. You will have to search bundle.js in production for `box:` and you will find it.

## Add CSS to a seperate file
Currently, all our CSS is injected into the head of the document. Now let's use webpack to inject a separate file into our document

### extract-text-webpack-plugin
We need to find the latest version

`$ npm info extract-text-webpack-plugin versions`

### Install it

`$ npm install extract-text-webpack-plugin@2.0.0-beta.4 --save-dev`

In development mode we can just let it inject CSS on it's own but in production mode we want to use the plugin.

`webpack.config.js`

```js
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const path = require( 'path' );
const webpack = require( 'webpack' ); // eslint-disable-line import/no-extraneous-dependencies

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';
const entry = PRODUCTION
      ? ['./src/index.js']
      : [
        './src/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
      ];

// console.log( `env is ${entry}` );
const plugins = PRODUCTION
      ? [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin( 'styles.css' ),
      ]
      : [new webpack.HotModuleReplacementPlugin()];

plugins.push(
  new webpack.DefinePlugin( {
    DEVELOPMENT: JSON.stringify( DEVELOPMENT ),
    PRODUCTION: JSON.stringify( PRODUCTION ),
  } )
);
// console.log( `plugins is ${plugins}` );

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]--[local]';

const cssLoader = PRODUCTION
  ? ExtractTextPlugin.extract( {
    loader: `css-loader?localIdentName=${cssIdentifier}`,
  } )
  : ['style-loader', `css-loader?localIdentName=${cssIdentifier}`];
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
      loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      exclude: '/node_modules/',
    }, {
      test: /\.css$/,
      loaders: cssLoader,
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

Now in development mode it will be injected in the header

But in production mode `$ npm run build` you will see a seperate css file. 

`index.html`

We add the `<link>` tag and point it to `dist/styles.css`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Full On Webpack 2col</title>
  <link rel="stylesheet" href="dist/styles.css">
</head>

<body>
  <div id="app"></div>
  <!-- /#id -->
  <script src="dist/bundle.js"></script>
</body>

</html>
```
If you run the `http-server` to view your page, and inspect the source you will see the seperate css file served.

View in `http-server` and check it out in the browser and in the Chrome inspector you will see under `Sources`, the `dist` folder and inside that the `styles.css`.




