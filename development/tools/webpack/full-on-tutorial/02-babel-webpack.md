# ES6
Babel and Webpack

`$ npm install babel-core babel-loader babel-preset-es2015 babel-preset-stage-0 --save-dev`

babel-core - is the transpiler that will take all new code and transpile it down to ES2015 (older JS)

babel-loader - is a loader we will use in webpack

loaders are a core concept

babel-presets - are 2 groups of presets that will save us time from installing a gazillion npm packages

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
const webpack = require( 'webpack' );

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const entry = PRODUCTION
      ? ['./src/index.js']
      : [
        './src/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
      ];

const plugins = PRODUCTION
? []
: [new webpack.HotModuleReplacementPlugin()];

module.exports = {
  entry,
  plugins,
  module: {
    loaders: [{
      test: '/\.js$/',
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

* We add the `module`
    - test
        + what files are going to be run through babel?
            * regex will be used on the file names
                - `/\.js$`
                    + every file that ends in `.js` will be transpiled by babel
    - loaders - babel-loader
    - exclude - files that you don't want to run through. we will add `node_modules` because it would take forever to go through them and over 95% of them are transpiled already 

40 min point review
 breakpoints
debugger;
