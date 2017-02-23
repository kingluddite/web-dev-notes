# webpack.config.js

[Getting Started with Webpack Configuration](https://webpack.js.org/concepts/configuration/)

* `entry` - Since Webpack can read our import files we just need to tell it where to start. Our entry point will be `index.js`
* `output` - Where the final bundle should go
    - filename (_usually `bundle.js` or `bundle.min.js`_)
    - path (_of where you want it to be_ - commonly used is `dist`)
* `loaders` - Transforms our code as Webpack bundles. We'll use these to process ES6 or newer JavaScript as well as for our CSS/SASS
* `plugins` - Plugins pick up where loaders leave off. They have access to the entire Webpack lifecycle
    - Grunt or Gulp might just call some tasks but with Webpack it has access to more advanced functionality could be packaged and implemented as a plugin
    - There will be several core plugins used in your Webpack projects

## The `webpack.config.js`

### Install Webpack Dependencies:

* `babel-core`
* `babel-loader`
* `babel-preset-es2015`
* `uglifyjs-webpack-plugin`

All of the above are dependencies our Webpack will need. 

#### Install them using:

`$ npm i babel-core babel-loader babel-preset-es2015 uglifyjs-webpack-plugin -D`

`webpack.config.js`

```js
/* eslint-disable */
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
};
```

Why are we using `require`?

* We need to require `path`. This is for native node which will give us the ability to find out where we are, where the folder is located.
* The other require will be pulling in our plugin to uglify our JavaScript 

## Our entry point
Will be `./src/index.js`

### `./`
This means starting in the same directory where `webpack.config.js` is located currently

## Our output
Our bundled file will be called `bundle.min.js`

We are also using the node architecture `path.resolve` to figure out where you are and make sure that that folder `dist` is created in the right place since you are working with full path names

## loaders
**note** Change

```
// was in Webpack 1
module : {
    loaders: []
}
// now in Webpack 2
module : {
    rules: []
}
```

## Let's talk about this part of `webpack.config.js`

```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
  ]
},
```

* This is saying when you process all of the different modules (all the stuff inside our js folder), when you bundle all of them, make sure you follow the following rules:
    - Use a regular expression to make sure it is a JavaScript file `/\.js$/`
    - Except for `node_modules` as that is not our code
    - Run the babel loader
        + A tool that allows us to write the latest JavaScript and have it be compiled in a way that older browsers understand it
            * In order for this to work we needed to add `babel-core`, `babel-loader`, and `babel-preset-es2015`
                - `babel-preset-es2015` is a collection of all the necessary things we need to do to transpile our code to ES2015
        + Webpack currently does not support default exports so it helps to have babel running to fix this limitation

**note** Everything in Webpack is a module

* plugins - This particular plugin will enable us to minify all our JavaScript
    - **note** We needed to import this at the top of our file and it is pulling it in from the `node_modules` folder

## Updating our `package.json` `"scripts"` to:
This will tell Webpack to run based on the configurations of `webpack.config.js`

### Update the file with:
This is suggested to be the start tag for `package.json` and Webpack

```json
"scripts": {
    "start": "webpack --config webpack.config.js"
  },
```

So it will look like this now:

```json
{
  "name": "zach-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.23.1",
    "babel-loader": "^6.3.2",
    "babel-preset-es2015": "^6.22.0",
    "uglifyjs-webpack-plugin": "^0.1.5",
    "webpack": "^2.2.1"
  }
}
```

## Run Webpack
`$ npm start`

That will run Webpack, bundle all our JavaScript modules into `bundle.min.js`

This is just a basic run of Webpack.
