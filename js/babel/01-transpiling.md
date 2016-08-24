# Transpiling

## What is transpiling?
Taking one language and converting it to another

## Been there done that
You probably already transpiled:

* Sass into CSS
* CoffeeScript to JavaScript

## Are transpiling and compiling the same thing?
### Compiling
No. Compiling converts one language to another at a lower abstraction level

* Like Java to byte code

### Transpiling
Transpiling converts one language to another at the same abstraction level

* Like Sass to CSS
    - Both are high level languages that serve the same purpose

## ES 2015 Compatibility
ES2015 is current version of JavaScript

* Not all browsers have fully implemented it's features

[ES6 compatibility chart](https://kangax.github.io/compat-table/es6/)
Safari currently (_as of 8/17/2016_) only supports 54% of ES6

## A name is just a name
ES6 and ES2015 can be used interchangably

## Where is the browser Love?
So many browsers don't fully support es6

That's were babel comes in!

* We can write our apps with ES2015 and transpile them into ES5

[babeljs.io](http://babeljs.io/)

Click `Try it out` link

Type this on the left:

```js
var myArrowFunction = () => "Hello, ES2015";
```

You will see it transpiled on the write as:

```js
"use strict";

var myArrowFunction = function myArrowFunction() {
  return "Hello, ES2015";
};
```

The Babel Command Line Tool ([CLI](http://babeljs.io/docs/usage/cli/))

1. [clone this repo](git clone https://github.com/treehouse-projects/babel-workshop.git)

2. Change into that repo's directory: `$ cd babel-workshop`

3. Checkout a branch: `$ git checkout cli-lesson`

4. Install babel: `$ npm install babel`

5. Install the babel CLI: `$ npm install --save-dev babel-cli`

6. Install babel preset 2015 `$ npm install --save-dev babel-preset-es2015`

## Two important files to look at
1. `.babelrc`
    * Tells babel how we want our code transpiled
        - Two most important properties
            + Presets
                - Defining each plugin is tedious
                - With presets you can bundle multiple plugins together
            + Plugins
                - Tell features you want babel to provide
2. `src/index.js`

## preset - babel-preset-es2015
* includes all finalized ES2015 features

**src/index.js**

```js
var double = (value) => value * 2;

console.log("What is 1337 x 2?");
console.log(double(1337));
```

## Package a build
Define a build command in the script section

`-d` flag - we are working with directories (_not individual files_)

`.babelrc` (_in sublime text set syntax to JSON_)

```js
{
  "presets": [
    "babel-preset-es2015"
  ],
  "plugins": []
}
```

### Run that build!
`$ npm run build`

Creates a `build` folder and `index.js` inside it

It has been transpiled into ES5

```js
"use strict";

var double = function double(value) {
  return value * 2;
};

console.log("What is 1337 x 2?");
console.log(double(1337));
```

Run the file we just created

`$ node build/index.js`

**output**
What is 1337 x 2?
2674

## Using Build tools to make life easier
* gulp
* webpack

`$ touch .gitignore`

Add `node_modules` to **.gitignore**

Add, Commit changes with Git

## Babel and Webpack

`$ git checkout webpack-lesson`

In order to use babel with webpack you need to install 4 dependencies

1. babel-core
2. babel-preset-es2015
3. webpack
4. babel-loader

And here's how to install all 4 at one time:

`$ npm install --save-dev babel-core babel-preset-es2015 webpack babel-loader`

## How do we tell webpack to use babel when building our app?
webpack uses extensions called **loaders** to transform files

* Think of **loaders** like **tasks** are used in `gulp`)
* Each one is responsible for carrying out a specific type of transformation

**webpack.config.js**

```js
var webpackConfig = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/build",
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /.js$/,
        excludes: /node_modules/
      }
    ]
  }
};

module.exports = webpackConfig;
```

**loader** for:

* Transforming Sass to CSS
* Minifying files
* And Many more!

We will use the babel loader

* It will translate our ES2015 to ES5

**loader** - Which loader are you using
**test** - Which file to pipe into loader
    * We want to use a regular expression that match all files that end in `.js`
        - `/.js$/,`
**excludes** - which files should not be processed
    * `node_modules`

## Add a build command in script section

**package.json**

```js
"scripts": {
    "build": "webpack"
  },
```

## Run build script

`$ npm run build`

![webpack output](https://i.imgur.com/ixOQJA0.png)

Now run `$ node build/index.js`

## New ES features and babel

[http://babeljs.io/](http://babeljs.io/)

### Click `plugins`

The TC39 categorises proposals into 4 stages:

1. stage-0 - **Strawman**: just an idea, possible Babel plugin.
2. stage-1 - **Proposal**: this is worth working on.
3. stage-2 - **Draft**: initial spec.
4. stage-3 - **Candidate**: complete spec and initial browser implementations.
5. stage-4 - **Finished**: will be added to the next yearly release.

### Click stage-3 link

* stages are cumulative

Create a .gitignore

`$ touch .gitignore`

Add `node_modules` to **.gitignore**
Save and commit changes

`$ git checkout es2016-lesson`

Here is our `package.json`

```js
{
  "name": "treehouse-babel-template",
  "version": "0.0.1",
  "description": "Project template for \"Getting Started with Babel and ES2015\" on Treehouse.",
  "scripts": {
    "build": "webpack"
  },
  "homepage": "https://github.com/treehouse/Babel_IsaacLeeMorris",
  "devDependencies": {
    "babel-core": "^6.7.7",
    "babel-loader": "^6.2.4",
    "babel-polyfill": "^6.7.4",
    "babel-preset-stage-3": "^6.5.0",
    "webpack": "^1.13.0"
  }
}
```

## Install dependencies

`$ npm install`

**.babelrc**

```js
{
  "presets": [
  "babel-preset-stage-3"
  ],
  "plugins": []
}
```

**src/index.js**

```js
require( "babel-polyfill" );

function doubleAsync( value ) {
  return new Promise( ( resolve, reject ) => {
    setTimeout( () => resolve( value * 2 ), 3000 );
  } );
}

async function myAsyncFunction() {
  var answer = await doubleAsync( 1337 );

  console.log( answer );
}

myAsyncFunction();
```

`$ npm run build`

`$ node build/index.js`

* After 3 seconds it prints `2674`
