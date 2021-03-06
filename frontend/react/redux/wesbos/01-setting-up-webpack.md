# Redux - Setting up Webpack
## Need to know
* React
* ES6
* [React Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
* NodeJS - at least version > 5

[redux starter files](https://github.com/wesbos/Learn-Redux-Starter-Files)

## Start project folder structure
```
.
├── client/
    ├── reduxstagram.js
├── .babelrc
├── .eslintrc
├── .gitignore
├── devServer.js
├── index.html
├── package.json
├── webapck.config.dev.js
└── webpack.config.prod.js
```

## `package.json`
```json
{
  "name": "learn-redux",
  "version": "1.0.0",
  "description": ":) ",
  "scripts": {
    "build:webpack": "NODE_ENV=production webpack --config webpack.config.prod.js",
    "build": "npm run clean && npm run build:webpack",
    "test": "NODE_ENV=production mocha './tests/**/*.spec.js' --compilers js:babel-core/register",
    "clean": "rimraf dist",
    "start": "node devServer.js",
    "tunnel": "browser-sync start --proxy localhost:7770 --tunnel wesbos"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wesbos/Learn-Redux.git"
  },
  "author": "Wes Bos",
  "license": "MIT",
  "homepage": "https://github.com/wesbos/Learn-Redux",
  "dependencies": {
    "babel-core": "^6.7.7",
    "babel-eslint": "^6.0.4",
    "babel-loader": "^6.2.4",
    "babel-plugin-react-transform": "^2.0.2",
    "babel-plugin-transform-object-rest-spread": "^6.6.5",
    "babel-plugin-transform-react-display-name": "^6.5.0",
    "babel-polyfill": "^6.7.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "css-loader": "^0.23.1",
    "eslint": "^2.9.0",
    "eslint-plugin-babel": "^3.2.0",
    "eslint-plugin-react": "^5.0.1",
    "express": "^4.13.4",
    "raven-js": "^2.3.0",
    "react": "^15.0.2",
    "react-addons-css-transition-group": "^15.0.2",
    "react-dom": "^15.0.2",
    "react-redux": "^4.4.5",
    "react-router": "^2.4.0",
    "react-router-redux": "^4.0.4",
    "react-transform-catch-errors": "^1.0.2",
    "react-transform-hmr": "^1.0.4",
    "redbox-react": "^1.2.3",
    "redux": "^3.5.2",
    "rimraf": "^2.5.2",
    "style-loader": "^0.13.1",
    "stylus": "^0.54.5",
    "stylus-loader": "^2.0.0",
    "webpack": "^1.13.0",
    "webpack-dev-middleware": "^1.6.1",
    "webpack-hot-middleware": "^2.10.0"
  },
  "devDependencies": {
    "expect": "^1.18.0",
    "expect-jsx": "^2.5.1",
    "mocha": "^2.4.5",
    "react-addons-test-utils": "^15.0.2"
  }
}
```

`$ npm install`

## Client
Create the `client` folder and create an empty file named `reduxstagram.js` inside

## .eslintrc
```
{
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "rules": {
    "quotes": [2, "single"],
    "strict": [2, "never"],
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 1,
    "babel/object-shorthand": 1,
    "babel/arrow-parens": 1,
    "babel/no-await-in-loop": 1,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2
  },
  "plugins": [
    "babel",
    "react"
  ]
}
```

## .gitignore
```
# Logs
logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directory
node_modules

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history
```

## `devServer.js`

```
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(7770, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});
```

## index.html
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Reduxstagram</title>
    <link rel="shortcut icon" type="image/png" href="http://wes.io/ehRe/my-favourite-icon.png"/>

  </head>
  <body>
    <div id="root"></div>
    <script src="/static/bundle.js"></script>
  </body>
</html>
```

## webpack.config.dev.js
```
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/reduxstagram'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    {
      test: /\.styl$/,
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!stylus-loader'
    }
    ]
  }
};
```

## webpack.config.prod.js
```
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [

    './client/reduxstagram'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    {
      test: /\.styl$/,
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!stylus-loader'
    }
    ]
  }
};
```

## Webpack
Take all our **ES6 modules** and bundle them all into one `bundle.js` file

`$ npm start`

That uses our `scripts` in `package.json` and runs this command:

`$ node devServer.js`

This will compile all our JavaScript. It will start up an `express` server for us and will give us as our default `http://localhost:7770` and this will allow us to see what we are developing in real time

## Deploying
`$ npm build` - build a static file that you can put on your production server

In order for us to have:

* Hot Reloading
* Live Reloading

Make our edits in our text editor and immediately see our changes in the browser

## Let's get ready to rumble!
`$ npm start`

If you see the following you know where your server is running `http://localhost:7770` and that webpack is listening

![webpack is working](https://i.imgur.com/OF13LQI.png)

**tip** `cmd` + `click` the link and it will open the link in the browser from the terminal! (but it won't work inside atom's inhouse terminal)

## Fix `cannot find babel-eslint` error
`$ npm install babel-eslint -g`





