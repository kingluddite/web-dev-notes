# JavaScript Modules and WebPack 2 Tooling Setup

## Old way of JavaScript
Lots of script tags and load them all with lots of http hits
Using build tools to concatenate and minify to make files smaller and decrease the http hits

## New way of JavaScript
Using Modules. Not really new with JavaScript but with ES6 developers are jumping on the bandwagon

## What is a module
Just a file with functions inside of it and you can make those functions available to other files, applications, and you can use other people's existing modules

We replace our list of `<script></script>` tags and instead we import things from existing modules.

```js
import slug from 'slug';
import { uniq, shuffle } from 'lodash';
import Flickity from 'flickity';
```

* We can pull in an entire module like we did with `slug`
* We can pull in a couple of methods from the `lodash` library
* We can import a class from a package like we did with `Flickity`

## ES6 modules
All browsers don't render this currently

So we will need to use some tooling to use ES6 modules

### We need to install `package.json`
To install our external dependencies from `npm`

### We will need to use WebPack 2
This tool will bundle up all our JavaScript into one single (or multiple files)

Create a new directory

`$ mkdir es6-modules && cd es6-modules`

There are lots of ways to get modules

* bower
* npm
* [jspm](http://jspm.io/)

`npm` currently is the goto standard

```
$ touch app.js
$ npm init -y
```

### [Slug](https://www.npmjs.com/package/slug)
Returns url friendly slugs

`$ npm i slug --save`

`$ npm i lodash flickity --save`

`package.json`

```json
{
  "name": "es6-modules",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "flickity": "^2.0.5",
    "lodash": "^4.17.4",
    "slug": "^0.9.1"
  }
}
```

**tip** If you ever accidentilly delete your `node_modules` folder, just type `$ npm install` and it will read your dependencies in `package.json` bring it back

**note** You never need to add `node_modules` to your git repo

`$ npm i jquery insane --save`

`app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
```

**note** fetch does not work with `jsonp` api's. You need to install the `jsonp` package

`$ npm i jsonp --save`

`app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
```

`$ touch index.html`

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>JS Modules</title>
</head>
<body>
  <script src="app.js"></script>
</body>
</html>
```

Open in browser and you will get a SyntaxError: `Unexpected token import`

The browser is telling you it does not know how to handle the `import` because this is the one piece of ES6 that has yet to be implemented

## [Installing Webpack 2](https://www.npmjs.com/package/webpack)

`$ npm i webpack -D` (same as `$ npm install webpack --save-dev`)

**note** Installing a beta? If you are use `$npm i webpack@beta -D`

### Dev Dependencies
Not required for production site but used in developing site

This was added to `package.json`

```json
{
// MORE CODE
"devDependencies": {
    "webpack": "^2.2.1"
  }
 } 
```

### What is babel?
It transpiles your ES6 JavaScript into ES5 JavaScript and make it work in all of the browsers

### Steps for installing Webpack

1. First Install your dependencies:

```bash
npm install webpack babel-loader babel-core babel-preset-es2015-native-modules --save-dev
```

Now your `package.json` devDependencies will look similar to:

```json
"devDependencies": {
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-preset-es2015-native-modules": "^6.9.4",
    "webpack": "^2.2.1"
  }
```

**note** `babel-preset-es2015-native-modules` - This will transpile all ES6 to ES2015 (aka ES5), but this `native-modules` version will skip converting them to the older module version called `commonJS` because Webpack 2 is able to handle data modules

2. Then, Create a `webpack.config.js` file:

```js
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './app.js'
  },
  output: {
    filename: '_build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015-native-modules']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ]
};
```

### Notes
* Why are we using `require()` (that is commonJS) if Webpack 2 understand ES6 modules?
    - Because node doesn't support ES6 modules just yet

* What is the `environment` for?
    - It will help us with production and development builds. Our production builds will be much smaller

* The `devtool` gives us a sourcemap for our js so we can find out where in our modules the error is (instead of trying to locate it from the bundled file)

* The `entry` is asking you 'Where do you want to start you application?'
    - We are starting in `app.js`

* `output` - Where do you want the bundled file to go?
    - `build/bundel.js`

* `loaders` - How should I handle certain types of files?
    - We are going to take all of our files and run it through `babel`
    - We want to use this regex `/\.js$/` to find all JavaScript files but we will exclude the `node_modules` folder because we don't want it to run against that huge folder. Not our code, the `loader` is babel and that will convert it all to ES5
    - We `query` and use `presets` that are set to `es2015-native-modules` because Webpack doesn't need them converted to commonJS. Webpack 2 knows how to handle ES6 modules

## plugins
* uglify js
* env plugin
    - This will pass the nodeEnv to `process.env` and then it will know depending on the environment if it should remove or keep certain code

3. Setup the build npm script in `package.json`:

### How do we run webpack?
We could run it from the command line. We could install it globally. But a nicer way is to use a `npm script`

Add the following to your `package.json`

```json
"scripts": {
    "build": "webpack --progress --watch"
  },
```

Now without installing webpack globally you should be able to run webpack with

`$ npm run build`

## You will get an error 
In a recent change you must name all your loaders with a `-loader` suffix so change this:

`webpack.config.js`

From this:

```json
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015-native-modules']
      }
    }
  ]
},
```

To this:

```json
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015-native-modules']
      }
    }
  ]
},
```

Run again and you will see a `build` folder created with `bundle.js` and a sourcemap inside it

## Update HTML with new build link

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>JS Modules</title>
</head>
<body>
  <script src="build/bundle.js"></script>
</body>
</html>
```

Update `app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';

const ages = [1,1,4,100,200,5];

console.log(uniq(ages));
```

**note** When you add code and save, the bundle is recreated with your new code.

View it in the browser and the error is gone and all the non-unique numbers have been removed from the array








