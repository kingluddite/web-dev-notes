# Add a source map
Helps you to read this code better. A mapping between your source code and your complied code.

`webpack.config.js`

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
  devtool: 'source-map',
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

* We just add one line `devtool: 'source-map`

Restart webpack

`cltr` + `c` to stop

`$ npm run dev`

Now in inspector click on `button.js` and you can actually see your code there (instead of all the code inside the `bundle.js`)

## Also access your actual code
* Use inspector
  - Open `Sources` tab
    + Expand the `webpack` link
      * Expand the `.` link
        - Expland `src` link
          + You can click on your individual files to see your code

So source maps help you with understanding your code.

## Adding breakpoints
Inside your `button.js` add a breakpoint to line 5 (should be your **console.log**)

Then click the button on your page

## Add breakpoints directly inside your code

```js
const Button = {
  button: '<button id="myButton">Press me</button>',
  attachEl: () => {
    document.getElementById( 'myButton' ).addEventListener( 'click', () => {
      debugger;
      console.log( 'click' );
    } );
  },
};

export default Button;
```

Refresh the page and you will see the debugger pauses your code

Those are the two ways to add breakpoints.

