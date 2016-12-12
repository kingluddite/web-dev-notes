# No Refresh

## A Problem
Having to refresh the browser is not fun. We can do better.

## Two Solutions

### Hot Reload and Hot Module Replacement

#### Live/Hot Reload
1. Rebuild `bundle.js`
2. Refresh brower

OR

2. Refresh only `bundle.js` in browser

* This will change the state of the application
  - When you reload the browser, you reset the state

##### Example of Live/Hot Reload
We need to use Webpack 2

* What is the latest version?

`$ npm info webpack-dev-server versions --json`

* Above showed us the latest and greatest so we grab it and install in
with the following line:
* We will use this command whenever we need to find the latest and greatest of any npm package

`$ npm install webpack-dev-server@2.1.0-beta.12 --save-dev`

## Update `package.json`

From:

```json
"scripts": {
    "build": "rimraf dist && webpack --watch"
  },
```

To:

```json
"scripts": {
    "build": "rimraf dist && webpack",
    "dev": "webpack-dev-server"
  },
```

* We remove the `--watch` from `build` because we don't need to watch when we build, it is just a one time action when we are ready to deploy our site
* We add `dev` that will run our **webpack-dev-server** when we type: 

`$ npm run dev`

* The webpack-dev-server will watch our js files for us

## No Page Refresh
* After we make this change we no longer need to start the **http-server** and we can just run `$ npm run dev` and then whenever we make a change and save, the page will automatically refresh.
* This will save us time

### Chrome Inspector Tool
Look at the `Elements` tab of the inspector when you change and save the code. You will see that the entire page is refreshed.

* It works but it is not that fancy

#### Hot Module Replacement (HMR)
1. Rebuild chunk
2. Replace chunk in browser

* This means the state of the application won't change
  - _When you inject code you won't reset the state_

##### webpack server can be confusing on how to use it
You can use it in multiple ways and this is confusing to many new users. 
* You can start it from the CLI
* You can start it as a dependency for another application
* Since there are multiple ways of doing this this may be the preferred way

#### New web dev jargon
'accept new shanks of code'

* Since we are just injecting the page with little chucks (shanks) we now can talk about `shanks` when talking about HMR

**note** put Webpack in `dependencies` of `package.json`

* BUG TO INVESTIGATE - eslint is saying webpack is a dependency and not a dev dependency. Not sure why it is doing this but I know it is a dev dependency. I just need to brush up on why this error in eslint is occuring.
  - I figure out later in the notes that you can comment out 1 line to not trigger then error

## Update `webpack.config.js`

```js
const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
  entry: [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
  ],
  plugin: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join( __dirname, 'dist' ),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
};
```

* We now are requiring webpack
* In our entry we watch our `index.js` file but also point to the dev-server inside of webpack that will enable us to use HMR
* We tell our webpack-dev-server where to serve the files `localhost:8080`
* We add the necessary HMR plugin

## Update `index.js`
We want to check if we are using HMR and, if we are, to fire the HMR `accept()` method

```js
const messages = require( './messages' );

const app = document.getElementById( 'app' );
app.innerHTML = `<p> ${messages.hi} ${messages.event} </p>`;

// ADD THIS CONDITIONAL
if ( module.hot ) {
  module.hot.accept();
}
```

## Update `package.json`

From:

```json
"scripts": {
    "build": "rimraf dist && webpack",
    "dev": "webpack-dev-server"
  },
```

To:

```json
"scripts": {
    "build": "rimraf dist && webpack",
    "dev": "node dev-server.js"
  },
```

Now we are pointing to our own `dev-server` and we are using node to make it run

`dev-server.js`

```js
const WebpackDevServer = require( 'webpack-dev-server' );
const webpack = require( 'webpack' );
const config = require( './webpack.config.js' );
// const path = require( 'path' );

const compiler = webpack( config );
const server = new WebpackDevServer( compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
} );
server.listen( 8080, 'localhost', function () {} );
```

`$ npm run dev`

You may need to refresh the page once to jumpstart it but now you should see that (using the chrome inspector) that when you make changes to the strings used in `messages.js`, you will see the entire page is not reloaded, only a chunk of code is injected.

* Check if we need to use our own dev-server or if we can use one that HMR comes packaged with?

#### run the build script
`$ npm run build`

We have over 9000 lines of code in our `bundle.js`. We don't want all that code in our **build**, only in our **development**. 

**note** All that extra code was added for HMR code (Hot Module Replacement)
