# Tree Shaking
This is a big deal. It is a modern way of doing dead code elimination. And that is why we are using Webpack 2 beta.

## How does tree shaking work?
Imagine yourself taking up a tree, shaking it and everything that is not connected to the stem, will fall off. And that goes for your code. Even modules. If they are not being used, they will be stripped off the bundle.

## Create a new module `src/math-stuff.js`

`math-stuff.js`

```js
export function add( a, b ) { return a + b; }
export function subtract( a, b ) { return a - b; }
export function multiply( a, b ) { return a * b; }
export function divide( a, b ) { return a / b; }
```

* We have 4 different modules in this file

Update `src/index.js`

```js
import { multiply } from './math-stuff';

const newMessage = () => ( multiply( 3, 3 ) );

const app = document.getElementById( 'app' );

app.innerHTML = newMessage();

if ( module.hot ) {
  module.hot.accept();
}
```

Output should be: `9`

* So we are only using the `multiply()` method but not the other 3 in `math-stuff.js`

**important** To make tree shaking work we need to do this with ES6 modules. This only works with ES6 modules

### What Webpack 1 does
It transpiles ES6 modules into commonJS modules. That is the first thing it does. And then tree shaking doesn't work.

### But with Webpack 2
It understands ES6 modules out of the box, so there is not need for babel to do the transformation. Since the transformation is breaking the tree shaking, we can remove it

If it sounds too complex, just accept it and you'll be happy :)

### We need to change our presets slightly

`.babelrc`

Change this:

```js
{
  "presets": ["es2015", "stage-0"]
}
```

To this:

```js
{
  "presets": [
    ["es2015", { "modules": false }],
    "stage-0"
  ]
}
```

* We are telling babel to not transpile modules to ES6 to commonJS

### Run build
`$ npm run build`

You will see this inside `dist/bundle.js`

```js
/* unused harmony export add */
/* unused harmony export subtract */
/* harmony export (immutable) */ exports["a"] = multiply;
/* unused harmony export divide */
```

* This means webpack has seen them as unused

## So how do we remove this code?
We need to use `uglifyJS`

* UglifyJS
    - Is a mangler, compresser, beautfier to make JavaScript minimized
        + It shortens variable names
        + It removes comments
        + It does tips and tricks, everything it can to make the code smaller

### Add Uglify

Update our `plugins` variable in `webpack.config.js`

```js
const plugins = PRODUCTION
      ? [
        new webpack.optimize.UglifyJsPlugin( {
          comments: true,
          mangle: false,
          compress: {
            warnings: true,
          },
        } ),
      ]
      : [new webpack.HotModuleReplacementPlugin()];
```

* We temporarily keep our comments
* We do not mangle the code
* We set compress warnings to true

## Run build
`$ npm run build`

Webpack tells us about the after effects of tree shaking
```
WARNING in bundle.js from UglifyJs
Condition always false [bundle.js:104,4]
Dropping unreachable code [bundle.js:105,2]
Dropping unused function add [bundle.js:117,9]
Dropping unused function subtract [bundle.js:120,9]
Dropping unused function divide [bundle.js:126,9]
```

And if we view our `dist/bundle.js`, we see the unused code was removed. We still have comments but we can easily remove them too.

**note** Uglify does some code elimination on its own

#### What does `conditions` always false means (in the Terminal Output)
If you write... "if true"... and then something (if uglify sees that this is always true).. than uglify will just remove the if statement

If it is always false, then uglify will remove the entire body of that statement as well

Look at this code in `src/index.js`

```js
if ( module.hot ) {
  module.hot.accept();
}
```

This code will only run in development. It is always false in production so it will be stripped by uglify from our code. And you can do a search for `accept()` inside `bundle.js` and you won't find it because it was stripped from the code

And if you add this to the end of `index.js`

```js
if ( true ) {
  console.log( 'yo' );
}
```

And if you look at `bundle.js` you will see the `if` was removed and you just have the `console.log`

### This helps with Environments
So using tree shaking we can have different code stripped if we are in Development mode or Production mode

### The DefinePlugin
We are going to use it for both development and production. So we can just push to the `plugins` array.

#### Update `webpack.config.js`

```js
plugins.push(
  new webpack.DefinePlugin( {
    DEVELOPMENT: JSON.stringify( DEVELOPMENT ),
    PRODUCTION: JSON.stringify( PRODUCTION ),
  } ) // I had to remove this trailing commas because it caused an error
);
```

* We are pushing to two globally available variables into our source code.
    - So we are taking our environment variables, which can be true or false depending on which environment we are in, and then we are pushing that into our actual source code

And now that we have those global variables we can update:

`src/index.js`

```js
const newMessage = () => ( `
  DEV: ${DEVELOPMENT.toString()}<br>
  PROD: ${PRODUCTION.toString()}<br>
` );

const app = document.getElementById( 'app' );

app.innerHTML = newMessage();

if ( module.hot ) {
  module.hot.accept();
}
```

Output: 

```
DEV: true
PROD: false
```

So this means you could then do stuff like

```js
if( DEVELOPMENT ) {
    // do this
}
if( PRODUCTION ) {
    // do this
}
```

## Configure Uglify
* Very easy to configure uglify
* you could remove all configuration and be happy with the default config

`webpack.config.js`

Change this:

```js
const plugins = PRODUCTION
      ? [
        new webpack.optimize.UglifyJsPlugin( {
          comments: true,
          mangle: false,
          compress: {
            warnings: true,
          },
        } ),
      ]
      : [new webpack.HotModuleReplacementPlugin()];
```

To this:

```js
const plugins = PRODUCTION
      ? [
        new webpack.optimize.UglifyJsPlugin(),
      ]
      : [new webpack.HotModuleReplacementPlugin()];
```

And if you look at `bundle.js` you will see it has been compressed into 1 line

## Summary
* We have shaken the tree
* Excluded everything that is not there
* We have removed all of the unnecessary if statements
* And we have added things that are only added in Production or Development Mode


