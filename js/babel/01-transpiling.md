# Transpiling

## What is transpiling?
taking one language and converting it to another

You probably already transpiled Sass into CSS
Or CoffeeScript to transpile JavaScript

Are transpiling and compiling the same thing?
No.
Compiling converts one language to another at a lower abstraction level like Java to byte code

Transpiling converts one language to another at the same abstraction level (Sass to CSS)
* both are high level languages that serve the same purpose

compatibility
ES2015 is current version of JavaScript
Not all browsers have fully implemented it's features

[ES6 compatibility chart](https://kangax.github.io/compat-table/es6/)
Safari currently 8/17/2016 only supports 54% of ES6

so many browsers don't fully support es6
that's were babel comes in
we can write our apps with ES2015 and transpile them into ES5

[babeljs.io](http://babeljs.io/)
Click 'Try it out' link

Type this on the left:

```js
var myArrowFunction = () => "Hello, ES2015";
```

you will see it transpiled on the write as:

```js
"use strict";

var myArrowFunction = function myArrowFunction() {
  return "Hello, ES2015";
};
```

The Babel Command Line Tool ([CLI](http://babeljs.io/docs/usage/cli/))

[clone this repo](git clone https://github.com/treehouse-projects/babel-workshop.git)

`$ cd babel-workshop`

checkout a branch
`$ git checkout cli-lesson`

npm install babel

`$ npm install --save-dev babel-cli`

install babel preset 2015

`$ npm install --save-dev babel-preset-es2015`

Two important files to look at
1. `.babelrc`
    * tells babel how we want our code transpiled
        - two most important properties
            + presets (defining each plugin is tedious, with presets you can bundle multiple plugins together)
            + plugins (tell features you want babel to provide)
2. `src/index.js`


preset - babel-preset-es2015
* includes all finalized ES2015 features

**src/index.js**

```js
var double = (value) => value * 2;

console.log("What is 1337 x 2?");
console.log(double(1337));
```

define a build command in the script section
-d flat - we are working with directories (not individual files)

.babelrc (in sublime text set syntax to JSON)

```js
{
  "presets": [
    "babel-preset-es2015"
  ],
  "plugins": []
}
```

`$ npm run build`

creates a build folder and `index.js` inside it

it has been transpiled into ES5

```js
"use strict";

var double = function double(value) {
  return value * 2;
};

console.log("What is 1337 x 2?");
console.log(double(1337));
```

run the file we just created

`$ node build/index.js`

**output**
What is 1337 x 2?
2674

## Using Build tools to make life easier
* gulp
* webpack

`$ touch .gitignore`

Add node_modules to gitignore

add and commit changes

## Babel and Webpack

`$ git checkout webpack-lesson`

in order to use babel with webpack you need to install 4 dependencies

`$ npm install --save-dev babel-core babel-preset-es2015 webpack babel-loader`

how do we tell webpack to use babel when building our app?
webpack uses extensions called loaders to transform files
(think of loaders like tasks are used in gulp)
* each one is responsible for carrying out a specific type of transformation

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

loader for:
* transforming Sass to CSS
* minifying files
* many more

we will use the babel loader
* it will translate our ES2015 to ES5

loader - which loader are you using
test - which file to pipe into loader
    * we want to use a regular expression that match all files that end in .js
        - `/.js$/,`
excludes - which files should not be processed
    * `node_modules`

## add a build command in script section

package.json

```js
"scripts": {
    "build": "webpack"
  },
```

run build script

`$ npm run build`

![webpack output](https://i.imgur.com/ixOQJA0.png)

Now run `$ node build/index.js`

## New ES features and babel

http://babeljs.io/
click plugins

The TC39 categorises proposals into 4 stages:

stage-0 - Strawman: just an idea, possible Babel plugin.
stage-1 - Proposal: this is worth working on.
stage-2 - Draft: initial spec.
stage-3 - Candidate: complete spec and initial browser implementations.
stage-4 - Finished: will be added to the next yearly release.

click stage-3 link

* stages are cumulative

$ touch .gitignore
add node_modules to .gitignore
save and commit changes

$ git checkout es2016-lesson

here is our package.json

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

install dependencies

$ npm install

.babelrc

```js
{
  "presets": [
  "babel-preset-stage-3"
  ],
  "plugins": []
}
```

src/index.js

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

$ npm run build

$ node build/index.js

after 3 seconds it prints `2674`
