# Babel Setup for ES2015
Usually used for transpiling from ES6 to ES5

* `Webpack` - Link up JS modules together
* `Babel` - Turn future JS code into ES5 code

## Three modules we need to get Babel setup for our project
1. `babel-loader` - Teaches babel how to work with webpack
    * Babel has support for many different build systems (not just webpack)
2. `babel-core` - Knows how to take in code, parse it, and generate some output files
    * The heart of babel
    * `babel-core` has no idea how to take ES6 code and transpile it inot ES5
3. `babel-preset-env` - Ruleset for telling babel exactly what pieces of ES2015/6/7 syntax to look for, and how to turn it into ES5 code
    * These are the rules to tell babel how to transform our code
    * "Hey look for **const** word and **let** word and turn them into **var**"

### Install all three using `yarn`
`$ yarn add -D babel-loader babel-core babel-preset-env`

## What are loaders?
* Are used to enhance the behavior of webpack in some fashion
* They are individual Libraries that can run on different files in our project
* babel is one of the most popular loaders

![input output webpack](https://i.imgur.com/RsrjFl8.png)

1. We first add **babel-loader** inside `webpack.config.js`
2. Then we tell webpack which files to use loader on
3. Loaders can be applied to any type of file we wish (css)
    * We want to make sure **babel** only works with JavaScript files in our project

## Webpack 1 vs Webpack 2 (change in terminology)
* Webpack 1 called them `loaders`
* Webpack 2 calls them `module` (_and each individual loader is referred to as a rule_)
    * We will use the terms **loaders** and **rules** interchangeably
    * We could have many different rules so we store them in an array

`test: /\.js$/` - RegEx expression that tells **babel** to only work with files that end in `.js`

`webpack.config.js`

```
/* eslint-disable */
const path = require('path');

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
      }
    ]
  }
};

module.exports = config;
```

## .babelrc
```
{
  "presets": ["babel-preset-env"]
}
```

* Needs to use double quotes `""`
* **babel** will look to this file to see what rules it must follow
* It will look to make sure this module is installed
* And then it will run that set of rules the file contains

## Run webpack
`$ yarn build`

Open `dist/bundle.js` and you'll see when you scroll to the bottom that `const` has been changed to `var`


