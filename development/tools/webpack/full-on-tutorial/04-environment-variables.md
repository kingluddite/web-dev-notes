# Environment Variables
* Variables which are available for all applications on your computer
* Some JavaScript libraries actually read these variables and minimize themself when run in a production mode

**note** In Webpack2 you can set these variables by usine `--env` instead of setting environment variables

Here's how we set Environment variables (the old way)

```json
"scripts": {
    "build": "rimraf dist && NODE_ENV=production webpack",
    "dev": "NODE_ENV=development node dev-server.js"
  },
```

## Update `webpack.config.js`

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
  output: {
    path: path.join( __dirname, 'dist' ),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
};
```

* We set our dev and production environments
* We set the entry variable to be set to the Production array that has inside it one file (`index.js`) it the NOD_ENV is 'production' or `index.js`, and our webpack dev server code if... this will better explain what is happening

`webpack.config.js`

```js
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';
const entry = PRODUCTION
      ? ['./src/index.js']
      : [
        './src/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
      ];

console.log( `env is ${entry}` );
const plugins = PRODUCTION
      ? []
      : [new webpack.HotModuleReplacementPlugin()];

console.log( `env is ${plugins}` );
```

* So I add a couple console.log() statements to grab the value of `entry` and `plugins` depending on the environment
* If the NODE_ENV is `development` the values will be

```
env is ./src/index.js,webpack/hot/dev-server,webpack-dev-server/client?http://localhost:8080
plugins is [object Object]
```

* If NODE_ENV is `production` the values will be

```
env is ./src/index.js
plugins is
```

So you see, depending on the environment, the env and plugins will hold different values

If you run `$ npm run dev`, we will have tons of line in `bundle.js` because our ENV is development.

But if you run `$ npm run build`, we will have less than 100 lines because our ENV is production.
