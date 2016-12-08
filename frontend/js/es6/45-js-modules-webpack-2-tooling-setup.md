# JavaScript Modules and WebPack 2 Tooling Setup
* How we are writing JavaScript apps is changing
    - previously we would have several `<script>` tags in the body of our doc
    - maybe we would have a build process where we would concatenate and minify all our JavaScript
    - with ES6 it is now popular to pick up JavaScript modules
        + not new but ES6 is getting everyone on board to use it

## What is a JavaScript module?
Just a file with one or many functions inside of it

* You can make those functions available to other files
* You can make those functions available to other applications
* You can also use other peoples existing modules
* Instead of using a script tag and using a whole bunch of global variables what we do is we import things from existing modules

`some-file.js`

```js
import slug from 'slug';
import { uniq, shuffle } from 'lodash';
import Flickity from 'flickity';
```

* Use `npm` to grab slug and import that to use
* Or you can pull in only a couple of the many methods from lodash
* Or if you are using a slider plugin then you need to import Flickity from the package called `flickity`

## JavaScript Modules
ES6 has great support across the browsers

* So when working with JavaScript in html all is cool but when working with modules, browser support varies.
* So if we want to use modules, we have to use some sort of tooling
    - the syntax
    - the idea of importing and exporting modules

1. Set up a `package.json` file
    * This will enable us to install our external dependencies from `npm`
2. We will need to use `webpack`
    * Will enable us to bundle up all of our JavaScript together.

Create a new directory `es6-modules`

* you could use bower but `npm` kind of has won the battle so we'll use that

## Create an entry point
`$ touch app.js`

## Intialize package.json
`$ npm init -y`

**slug** - cool package that returns url friendly slugs

`$ npm install slug -S`

`npm install lodash flickity jquery insane jsonp -S`

```js
"dependencies": {
  "flickity": "^2.0.5",
  "insane": "^2.6.2",
  "jquery": "^3.1.1",
  "jsonp": "^0.2.0",
  "lodash": "^4.17.2",
  "slug": "^0.9.1"
}
```

* never need node_modules, unless you are going on a plane or someplace there is no internet connection (offline access)
* gitignore node_modules
* if you delete it, bring it back with `npm install`

`jsonp`

* fetch doesn't work with JSON API
    - so if you need to work with JSONp API, you need to install `jsonp`

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>JS Modules</title>
</head>

<body>
  <script src="app.js"></script>
</body>

</html>
```

View in browser, check inspector and you will see an error: `SyntaxError: Unexpected token import`

The reason is it doesn't know how to handle the `import` stuff. Because it is the one piece of ES6 that has yet to be implemented.

## We need Webpack
Webpack will bundle it all together for us

* Kind of a task to get up and running but once you get it working you can use it on multiple projects

### Install some dependencies
First thing we need to do is install some dependencies

* We will be using Webpack 2, because that will come put pretty soon
* Not yet available (or maybe it is)
    - How can you check?
        + vist this site `https://www.npmjs.com/package/webpack`
            * look at version of webpack
                - if it says `2` you don't need to use @beta

`$ npm install webpack@beta -S`

* We install as a dependency
    - Why dev dependency?
        + It is just a tool for building our app, it is not a part of our app

### Now we need to add stuff to help us convert our code to ES5

#### Babel
It will take your ES6 code and convert it to the equivalent ES5 code and make it work in all of the browsers

So now we will integrate Babel into our build system so it will work on all of our browsers. We will need to install a bunch of Babel addons

`$ npm install babel-loader babel-core babel-preset-es2015-native-modules -D`

`package.json`

```json
"devDependencies": {
    "babel-core": "^6.18.2",
    "babel-loader": "^6.2.8",
    "babel-preset-es2015-native-modules": "^6.9.4",
  }
```

## Create `webpack.config.js`
* We are using `require()` to import webpack because node doesn't support `import` just yet

`const webpack = require( 'webpack' );`


### We need a variable for the environment

`const nodeEnv = process.env.NODE_ENV || 'production';`

* install webpack globally is one option but a better option is to run a `npm script`

`package.json`

```js
"scripts": {
    "build": "webpack --progress --watch"
  },
```

### Finished File

`webpack.config.js`

```js
const webpack = require( 'webpack' );
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  devtool: 'source-map',
  // where do you want to start your app
  entry: {
    filename: './app.js'
  },
  // where do you want it to go?
  output: {
    filename: '_build/bundle.js'
  },
  module: {
    // how should I handle specific types of files
    // webpack can be used for everything under the sun
    // our loader, take all of our js files and run it through babel
    // we use a regex to only look for js files
    // we want to exclude node_modules so we don't run it through all that code
    // babel-loader is the loader that converts all to ES5
    // our query gives us presets so we want to use es2015
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
              ["es2015", { "modules": false }]
          ]
        }
      }
    ]
  },
  plugins: [
    // uglify js
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true
    }),
    // env plugin
    // it passes the environment value to this file
    // and plugins like uglify will know if they should remove certain things or not depending on what environment we are actually in
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify( nodeEnv )}
    })
  ]
};
```

## Updates
From tutorial received errors and updated the following code:

`webpack.config.js`

* changed this:

`loader: 'babel',`

* to this:

`loader: 'babel-loader',`

* and changed this:

```js
query: {
    presets: ['es2015-native-modules']
}
```

to this:

```js
query: {
  presets: [
      ["es2015", { "modules": false }]
  ]
}
```

### Run the build
It created a build file `_build/bundle.js`

`$ npm run build`

### Change the path to our new bundled file:

`indes.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>JS Modules</title>
</head>

<body>
  <script src="_build/bundle.js"></script>
</body>

</html>
```

### Update app.js
To see if our code is pulling in our packages

`app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';

const ages = [1,1,2,2,4,5,6,6,7,7,8];

console.log( uniq( ages ) );
```

### Test in browser
You should see the `uniq()` method working from `lodash`

`[1, 2, 4, 5, 6, 7, 8]`

and it tells us where we wrote the code and it's line number


