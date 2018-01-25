# Creating separate css files
* take all the styles that make up our app and break them into their own css file
* currently they all live inside bundle.js
    - this means bundle.js is bigger than it needs to be
    - they are doing things they shouldn't be doing
        + The styles don't get added to the browser until after our JavaScript is run
        + We'll have webpack load up a file that just contains JavaScript and a separate css file that contains all our styles
            * We'll link that into index.html

## How will we do this?
* We will keep importing css into our app.js

### Adding a webpack plugin
* Will grab all css/scss and instead of dumping it inline dump it in a separate css file
* https://github.com/webpack-contrib/extract-text-webpack-plugin

`$ yarn add extract-text-webpack-plugin -D`

## Require it inside webpack
* We are using node so we don't have access to import so we use `require`

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

* We won't use style-loader anymore as that handled inline styles

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

`$ yarn run build:prod`

`$ yarn run serve`

### view new output
* You should now see we have 4 files
    - bundle.js
    - styles.css
    - bundle.js.map
    - styles.css.map
* Now we need to add a link tag to index.html

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
        +  bundle.js
        +  bundle.js.map
        +  styles.css
        +  styles.css.map
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

