# Production Webpack
* Currently --- zero optimization
* `$ yarn run build` (note total size of bundle)
    - Mine is almost 6MB
    - That is horrible
    - Most is source maps
* We will try to get as much as possible outside of bundle.js and into other files that can optionally load

## How can we run Webpack in production mode?
* [guides - big picture stuff](https://webpack.js.org/guides/)
* [production docs](https://webpack.js.org/guides/production/)

## webpack -p
`package.json`

```
// // MORE CODE
"build:dev": "webpack --watch",
"build:prod": "webpack -p",
// // MORE CODE
```

`$ yarn run build:prod`

* This will shave off approx 1mb

# Production Webpack
https://webpack.js.org/guides/production/

`package.json`

```
"build:dev": "webpack --watch",
"build:prod": "webpack -p",
```

## Export a function
`webpack.config.js`

```js
const path = require('path');

module.exports = () => {
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
    },
  };
  module.exports = {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
    },
  };
};
```

## Why export as a function?
* The function gets called with some stuff
* We will get access to the `env`
* Use the env.production to determine which devtool to add

`webpack.config.js`

```
const path = require('path');

module.exports = env => {
  console.log('env', env);
  // MORE CODE
```

* Run `$ yarn run build:prod` and you will see:

`env undefined`

* Currently it is undefined which means there is no way to know if we are running the development script or the production script

## set env to 'production'
`package.json`

`"build:prod": "webpack -p --env production",`

* Now env is set to production
* If we run `build:dev` env is undefined
* We don't need to check for dev and only need to check if it matches `production`

`webpack.config.js`

```
const path = require('path');

module.exports = env => {
const isProduction = env === 'production';
```

## Make production sourcemaps smaller
`webpack.config.js`

```
// MORE CODE
  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },
};
module.exports = {
    // MORE CODE
```

* We want to bundle fast in development because we do it often
* But for production we don't do it as much and want our files smaller
    - It takes longer to build for production but the files are smaller but we also have smaller sourcemaps to help with debugging

`$ yarn run build:prod`

* Now we have 2 assets that output is bundling
    - bundle.js
        + contains core app js (189kb)
    - bundle.js.map (new file) 2mb
        + we don't care about this file
        + only loaded when someone opens dev tools
        + for regular users the browsers will never make a request for this file

`$ yarn run serve`

* Should work as it did before

## Test production sourcemaps
* Add a simple log inside `app.js`
* Run prod build

`$ yarn run build:prod`
`$ yarn run serve`

* Should show line number of log in app.js
* If it does your sourcemaps are working properly

## Next dump all css into external css file
* -p
    - let's us minify our JavaScript
    - also sets production environment variable for 3rd party libraries
* add `--env production` flag
    - enables us to customize how webpack.config.js generates that object
    - we switched from exporting an object to exporting a function that returns the object
        + This enables us to access the environment and use it in the object configuration
            * we use a ternary to generate one type of sourcemap if we are in production and another if we are not
            * This greatly reduced our size of bundle.js for production
