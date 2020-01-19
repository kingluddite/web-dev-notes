# Creating separate CSS files
* We will take all the styles that make up our app and break them into their own CSS file

## Problems with bundle.js right now
* Currently all CSS styles live inside `bundle.js`
    - This means `bundle.js` is 
      + Bigger than it needs to be
      + Doing things it shouldn't be doing
* **Important** The styles don't get added to the browser until after our JavaScript runs (which takes some time)
  - This could slow down how our app appears when it first loads

## Our Improvement - We'll do 2 things 
* We will have Webpack load up a JavaScript file that just contains JavaScript
* We will add a separate CSS file that contains all our styles
  - We'll link CSS into `index.html`

`app.js`

```
// MORE CODE

import 'normalize.css/normalize.css'; // we still import his CSS
import 'react-dates/lib/css/_datepicker.css'; // we still import this css
import configureStore from './store/configureStore'; // Redux store
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss'; // we still import our custom CSS

// MORE CODE
```

## How will we do this?
* We will keep importing CSS into our `app.js` (that won't change)
* Our import statements will allow Webpack to decide what styles we want to include in our app
  - But when Webpack does run it will pull all those styles out into a separate file
* I reordered so 3rd party links come first
* I added date CSS that was missing

### To make all this happen we need to add a Webpack plugin
#### extract-text-webpack-plugin

##### What does plugin do?
* It will allow us to extract some text out of bundle.js

##### What text do we want to extract?
* We want to extract all text that matches this text case `test: /\.s?css$/` that can be found here:

`webpack.config.js`

```
// MORE CODE

const path = require('path');

module.exports = env => {
  // console.log('env', env);
  const isProduction = env === 'production';

  return {

   // MORE CODE

    module: {
      rules: [

      // MORE CODE

        {
          test: /\.(scss|css)$/,

          // MORE CODE

        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',

// MORE CODE
```

* This will look for every single time you see a CSS file or SCSS file, and it will tell Webpack to process it and then take that text and instead of including it inline like it currently does, dump it into a separate file

## NEW WEBPACK CODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* extract-text-webpack-plugin has been archived and replaced with: `mini-css-extract-plugin`
* [mini-css-extract-plugin docs](https://github.com/webpack-contrib/mini-css-extract-plugin)
* I have created a new file `134a-webpack-5.md`
* Use that for configuring webpack from here
  - The following notes are the way we used to configure Webpack

#### Install plugin
* [plugin docs](https://github.com/webpack-contrib/extract-text-webpack-plugin)

`$ npm add extract-text-webpack-plugin -D`

## Require it inside webpack

* **note** We are using node so we don't have access to ES6 **import** so we use `require`
* Using the documentation:

### 3 important things to highlight
1. They import extract-text-webpack-plugin using Node's require
2. The usage (we use it with the stuff we are trying to extract)
3. We add the Plugins array to define the file we want to save all the CSS to

**note** Whenever you are using 3rd party Webpack plugins they will most likely have you add something to the plugins array

#### What is the plugins array for?
* Where you can set up the plugins that should have access to change and work with your existing webpack build

`webpack.config.js`

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); add this line

module.exports = env => {
    // MORE CODE
```

## Create a new instance of this plugin
`webpack.config.js`

```
module.exports = env => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  // MORE CODE
```

* We won't use `style-loader` anymore as that handled `inline` styles

`webpack.config.js`

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

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
          use: CSSExtract.extract({
            use: ['css-loader', 'sass-loader'],
          }),
        },
      ],
    },
    plugins: [CSSExtract],
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
    },
  };
};
```

## Test our our prod
* Let's see if our new plugin will extract a separate css file

`$ npm run build:prod`

`$ npm run serve`

### View new output
* You should now see we have 4 files
    - `bundle.js`
    - `styles.css`
    - `bundle.js.map`
    - `styles.css.map`

### Now we need to add a link tag to `index.html`

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Expensify</title>
  <link rel="icon" type="image/png" href="/img/favicon.png" />
  <link rel="stylesheet" href="/styles.css">
</head>
<!-- MORE CODE -->
```

* View newtwork tab of dev tools and you'll see `styles.css` is loading in

## Setup sourcefiles for css
* our sourcemaps work well in production build
* But no in development build
* To prove
    - Delete all files we just created in pub folder
        +  `bundle.js`
        +  `bundle.js.map`
        +  `styles.css`
        +  `styles.css.map`
* Shut down server
* Run `$ yarn run dev-server` 
* View date picker and you'll see that the styles.css is pulling from line ~ 1165

![no css sourcemaps](https://i.imgur.com/tPVQdlO.png)

## How do get sourcemaps working for dev-server
* We have to make tweaks to loader options
* We will also tweak the type of dev tool we are using when working in development mode
    - sourcemaps in webpack have a few bugs
    - this is a fix for now but it could change

`webpack.config.js`

```
// // MORE CODE
    module: {
      rules: [
      // // MORE CODE
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
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
      ],
    },
    plugins: [CSSExtract],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    // // MORE CODE
  };
};
```

## Restart dev server
`$ yarn run dev-server`

* Now we have sourcemaps working for css and js and separate files for both js and css
* We are not going to add compiled files to repo

