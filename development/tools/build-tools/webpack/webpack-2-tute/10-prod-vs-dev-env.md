# Production vs Development Environment
`webpack.config.js`

* We again use ExtractTextPlugin

`webpack.config.js`

```
// MORE CODE
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              url: false,
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
      }),
    },
    plugins: [
    // MORE CODE
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false, // modify this
      allChunks: true,
    }),
  ],
};
```

* Stop and start dev `$ yarn run dev`
* Change `scss`

`index.scss`

```
body {
  color: #fff;
  background-color: lightblue; // modify this line
  p {
    color: red;
  }
}
```

* It will update to `lightblue` but only if you refresh the browser
* How can we make Hot Module Replacement only work in development mode and use the ExtractTextPlugin only for production

`package.json`

```
// MORE CODE
"scripts": {
  "dev": "webpack-dev-server --mode development",
  "olddev": "webpack --mode development --watch",
  "prod": "yarn run clean && NODE_ENV=production webpack --mode production", // update this line (above)
  "clean": "rimraf ./dist/*"
},
// MORE CODE
```

* We want to disable `ExtractTextPlugin` if it is in development mode
* So if `isProd` is true we will just that variable with `!isProduction` because if we are not in production mode, we are in devMode and we will set disable: false

`webpack.config.js`

```
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production'; // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        url: false,
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

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: './src/index.js',
    contact: './src/contact.js',
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].bundle.js',
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.pug$/,
        use: ['raw-loader', 'pug-html-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    stats: 'errors-only',
    open: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLPlugin({
      title: 'Home Page',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.pug',
    }),
    new HTMLPlugin({
      title: 'Contact Page',
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.html',
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: !isProd,
      allChunks: true,
    }),
  ],
};
```

* Stop and start dev `$ yarn run dev`

`index.scss`

```
body {
  color: #fff;
  background-color: darkblue; // modify this line 
  p {
    color: red;
  }
}
```

* Now make changes and it loads
* Look at console and you'll see HMR is working

## Test in production
`$ yarn run prod`

* Should generate new files
* You should see the new dark blue color in the dist css folder and that means extract-text-plugin is working fine in production
