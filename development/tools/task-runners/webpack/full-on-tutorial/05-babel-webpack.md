# ES6
Babel and Webpack

`$ npm install babel-core babel-loader babel-preset-es2015 babel-preset-stage-0 --save-dev`

* `babel-core` - is the transpiler that will take all new code and transpile it down to ES2015 (older JS)
* `babel-loader` - is a loader we will use in webpack
* `loaders` are a core concept
* `babel-presets` - are 2 groups of presets that will save us time from installing a gazillion **npm** packages

## .babelrc
This is the babel configuration file

```json
{
  "presets": ["es2015", "stage-0"]
}
```

* These are just presets for babel and has nothing to do with Webpack

## Tell Webpack to do stuff with our ES files

Update `webpack.config.js`

```js
const path = require( 'path' );
const webpack = require( 'webpack' ); // eslint-disable-line import/no-extraneous-dependencies

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';
const entry = PRODUCTION
      ? ['./src/index.js']
      : [
        './src/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
      ];

// console.log( `env is ${entry}` );
const plugins = PRODUCTION
      ? []
      : [new webpack.HotModuleReplacementPlugin()];

// console.log( `plugins is ${plugins}` );
module.exports = {
  entry,
  plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/',
    }],
  },
  output: {
    path: path.join( __dirname, 'dist' ),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
};
```

* I make a mistake and made the regex a string (bad: `test: '/\.js$/',` and good: `test: /\.js$/,`)
* We add the `module`
    - `test`
        + What files are going to be run through babel?
            * regex will be used on the file names
                - `/\.js$`
                    + Every file that ends in `.js` will be transpiled by babel
    - `loaders` - babel-loader
    - `exclude` - files that you don't want to run through. we will add `node_modules` because it would take forever to go through them and over 95% of them are transpiled already
+ **note** I add an eslint comment to disable and annoying notice telling me to make webpack a dependency and not a dev-dependency

## Add some ES6 code
`src/index.js`

```js
const messages = require( './messages' );

const newMessage = () => ( `<p>${messages.event}</p>` );

const app = document.getElementById( 'app' );
app.innerHTML = newMessage();

if ( module.hot ) {
  module.hot.accept();
}
```

## Run webpack
`$ npm run dev`

You should see it work as before but now it is outputting just `messages.event`

### Troubleshoot
If you see this in the browser:

```
() => ( `
${messages.event}

` )
```

It is because you forgot the `()`

```js
app.innerHTML = newMessage;
```

Adding the `()`

```js
app.innerHTML = newMessage(); // It is now a function so we need to add the parenthesees
```

It works but if you go into Sources and look at `dist/bundle.js` you should see it transpiled to ES5 code. I do not. Did I miss something?

### Add a button
This will have an event listener on it

`src/button.js`

```js
const Button = {
  button: '<button id="myButton">Press me</button>',
  attachEl: () => {
    document.getElementById( 'myButton' ).addEventListener( 'click', () => {
      console.log( 'click' );
    } );
  },
};
```

* We will use ES6 with modular exports

### Importance of Imports

Here's how we currently bring files into `index.js`

Require way

```js
var messages = require( './messages' );
var button = require( './button' );
```

ES6 Import modules way

```js
import Button from './button';
import messages from './messages';
```

* **note** `'/button` vs `./button`
  - Use relative paths when importing

## Update `index.js`

```js
import messages from './messages';
import Button from './button';

console.log( Button );

const oldMessage = () => ( `<p>${messages.event}</p>` );
const newMessage = () => ( Button.button );
const app = document.getElementById( 'app' );

app.innerHTML += oldMessage();

app.innerHTML = newMessage();

Button.attachEl();

if ( module.hot ) {
  module.hot.accept();
}
```

* **tip** remember to add `()` after the `oldMessage` and `newMessage` variables because they each have been assigned functions

## Run
`$ npm run dev`

You will get an error because you forget to export your Button module

## Remember to export your modules
This is so other files can use that code

```js
const Button = {
  button: '<button id="myButton">Press me</button>',
  attachEl: () => {
    document.getElementById( 'myButton' ).addEventListener( 'click', () => {
      console.log( 'click' );
    } );
  },
};

export default Button;
```

## Add console to test
Let's see if we can see our Button

`index.js`

```js
import messages from './messages';
import Button from './button';

console.log( Button );
// MORE CODE HERE
```

Now if your run `$ npm run dev` you will see that there is an Object in the Chrome inspector and if you expand the Object you will see your button code. Comment out the last line `export default Button;` in `button.js` and you will see that there is an Object but is has nothing inside it. If this happens again in the future it should act as a reminder for you to add the `export` to your module.

## View the page in the browser
You should see a button and when you click the button you will see the `click` in the Chrome inspector increase with each click

