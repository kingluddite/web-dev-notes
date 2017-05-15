# The Real Word Project
[repo](https://github.com/kingluddite/WebpackProject)

## Clone it
* Clone it to your local machine
* `/Users/USERNAMEHERE/Documents/dev/experiments/webpack-stuff/udemy-sg`
* `$ cd WebpackProject`

## Install it
* `$ yarn install`
* `$ atom .`
* check out package.json`
    - have a script for build `$ yarn build`
    - have all the dev dependencies we need for webpack

```
  "devDependencies": {
    "babel-core": "^6.17.0",
    "babel-loader": "^6.2.0",
    "babel-preset-env": "^1.1.4",
    "babel-preset-react": "^6.16.0",
    "css-loader": "^0.26.1",
    "style-loader": "^0.13.1",
    "webpack": "2.2.0-rc.0"
  }
```

## Our `webpack.config.js`
* Is bare bones
* We need to add stuff to it

```
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

### Add in babel loader
```
/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
```

* We don't need to convert node_modules to ES5 as it is not our code and it already has been converted and if we did not exclude it, it would just be a waste of resources and slow us down
* We look for all .js files and transpile them

## Add `.babelrc`
* This file instructs babel on which pieces of syntax it should try to transform inside our codebase
* We place it inside the root of our project

`.babelrc`

```
{
  "presets": ["babel-preset-env", "react"]
}
```

* We add an additional `react` preset because this is a react project
* the babel preset is just all JavaScript into ES5
* it does not transpile JSX into ES5 and that is why we need the `react` preset also
    - `"babel-preset-react": "^6.16.0",` (package.json)

## Add CSS
* We are using [`materialize`](http://materializecss.com/), [`react-range`](https://github.com/davidchin/react-input-range) and a custom `style.css`

* We won't use the ExtractText plugin
* We are solely relying on style-loader and css-loader
* `css-loader`
    - Allows webpack to read and understand the content of css files that are imported into our project structure
* `style-loader` takes all those modules and injects them into a `<style>` tag inside our HTML document

```
/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
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
};
```

`$ npm build`

* This is a large app (3.36 MB)
* We get warnings because it is so large
* `$ open index.html`
* Different pages? Code splitting might help

## Vendor Asset Caching
* Webpack doesn't make fetching data faster
* Webpack is all about helping us to speed up the load time of our JavaScript dependencies
* We will take all the code we are writing and separate it out from all of the vendor code

![vendor caching](https://i.imgur.com/eaRSYyf.png)

### How does Vendor caching work?
![how it works](https://i.imgur.com/H98v387.png)

* Vendor updates are occasional

![vendor updates](https://i.imgur.com/fnNbVcf.png)

* Our updates to our custom codebase are continuous

![continual code updates](https://i.imgur.com/yoIL6sk.png)

And this is how we'll cache vendor code and not our custom code

![next visit](https://i.imgur.com/3BWA3k0.png)

## Refactor for Vendor Splitting
1. We open webpack.config.js
2. We change the entry point from 1 file to multiple files by changing it from a string value to an object

```
entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
```

3. We open `package.json` and grab all the dependency names and put them in a constant array called VENDOR_LIBS

```
// more code
const VENDOR_LIBS = [
  'faker', 'lodash', 'react', 'react-dom', 'react-input-range', 'react-redux', 'react-router', 'redux', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
// more code
```

* But right now we have a problem because we have two entry points but only one output `bundle.js` file
* We fix that with this:

```
output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
```

* Now it will first create a `bundle.js` and then a `vendor.js` file

`$ yarn build`

## Houston we have a problem
![problem](https://i.imgur.com/KIF0xJh.png)

* We have two files (this is good)
* Our file size has doubled (this is bad)

`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Routes from './router';
// more code
```

![crude wireframe](https://i.imgur.com/Zb7mvJS.png)

* How we have it coded so far webpack won't go through our vendor and bundle and just make sure files are only included one time. I have redux dependency for bundle and for vendor and it will bring them both in
* To reduce duplications we'll use a plugin

## Plugins
* Plugins are like loaders but they are looking at the total sum of inputs or outputs that is going through webpack
* Loaders - look at individual files

`webpack.config.js`

```
// more code
},
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    });
  ]
};
```

* Tells webpack to look at the total sum of all of our files between both bundle and vendor entry points
* If any modules in all those files are identical (aka duplicates)
* Pull them out and only add them to the `vendor` entry point

`$ npm build`

We save space!

![smaller file](https://i.imgur.com/8ga9ONx.png)

* The first time a user comes to our website they'll download the entire 3.5 MB chunk but every time after they visit our site again they won't have download vendor.js
* If they every clear their browser cache they'll have to download it again
