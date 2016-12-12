# [Webpack 2 Full Tutorial](https://www.youtube.com/watch?v=eWmkBNBTbMM)

## Create a new folder `webpack-full-on-tutorial`
* index.js
* index.html

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Full On Webpack</title>
</head>

<body>
  <div id="app"></div>
  <!-- /#id -->
  <script src="index.js"></script>
</body>

</html>
```

`index.js`

```js
const app = document.getElementById( 'app' );
app.innerHTML = '<p>Hi there</p>';
```

## View in browser
We need a server so `$ npm install -g http-server`

* Should be globally installed npm package

You should see `Hi there` in browser

## Make it a npm project
`$ npm init -y`

* We do this to be able to install our project dependencies

## Webpack 2
What versions are available?

`$ npm view webpack versions`

Gives you a list of all npm versions but it truncates them. We need all of them so use this command:

`$ npm info webpack versions --json`

* That will give you the full list
* Grab the latest version
* My current last version is `2.1.0-beta.27`

`$ npm install webpack@2.1.0-beta.27 --save-dev`

## Tree Shaking
**New Term** Research `What does "tree shaking" mean?`
* **hint** Dead code elimination

## webpack 2 vs 1?
* Webpack 2 handles ES6 imports
* Without transpiling it to AMD imports
* Important because it enables you to do tree shaking

## run webpack

`$ ./node_modules/webpack/bin/webpack.js ./index.js bundle.js`

* Running from package
* Needs input file `./index.js`
* Needs output file `bundle.js`

## Or run with this:

`$ webpack ./index.js bundle.js`

Change `index.html` script `src` to `bundle.js`

### View In browser
Same thing but now it is using the created distribution file.

## Update `package.json`

```json
"scripts": {
    "build": "webpack index.js bundle.js"
  },
```

### We don't use `./node_modules/webpack/bin/webpack.js ./index.js bundle.js`
* Why?
  - Because npm looks into `node_modules` for binaries

### npm run
The command we use to run our npm scripts

`$ npm run`

* The command to run npm scripts by referring to the the `scripts` key in the `package.json` file

### Manually remove bundle.js
`$ rm -rf bundle.js`

And then `$ run build` again and that will generate your `bundle.js` file again

#### rimraf
* We could keep using `rm` to remove files on a mac but if a member on your team is using a Windows machine this won't work. We need a better way that works across all members of our team using different machines. We also need to automate the process of removing and re-installing `bundle.js`.
  - That is were the small npm package called `rimraf` comes in handle
* Will delete files not matter what the OS is
`$ npm install rimraf --save-dev`

#### Automate deleting and rebuilding file
Then just do this to delete files first then build them

```json
"scripts": {
   "build": "rimraf bundle.js && webpack index.js bundle.js"
},
```

## Run our build script
`$ npm run build`

* This will automatically delete than recreate `bundle.js`

## Make `dist` and `src` folders
* `dist` is a common abbreviated name for `distribution` and this folder houses all your final production level code. (Minified, no comments, tree shake code)
* `src` is a common abbreviated name for `source` code. This is the code that you and your team are working on.
 
`$ mkdir src dist`

Move `index.js` inside `src`

`$ mv index.js src`

## Update scripts

```json
"scripts": {
    "build": "rimraf dist && webpack src/index.js dist/bundle.js"
  },
```

* Delete the root `bundle.js`
  - Since we are now building our files automatically into the `dist` folder you just need to delete our original `bundle.js` file that is still in the root of our project. We don't need it anymore. Just a bit of house cleaning.

## Update `index.html`

`<script src="dist/bundle.js"></script>`

## Start our server again
`$ http-server`

## Run our build script again
`$ npm run build`

* It should work just like before

## Let's create our first module
Create a new file

`$ touch src/messages.js`

`src/messages.js`

```js
module.exports = {
  hi: 'hello there',
  event: 'tree shaking every day, every way',
};
```

## Update `src/index.js`

```js
const messages = require( './messages' );

const app = document.getElementById( 'app' );
app.innerHTML = `<p> ${messages.hi} ${messages.event} </p>`;
```

## Run our build script again
`$ npm run build`

## Start our server again
`$ http-server`

* Our output: `hello there tree shaking every day, every way`

## A problem
We have to keep using `$ npm run build` every time. This is getting old fast. There has to be a better way.

## A solution
Add this to our `package.json`

```json
"scripts": {
    "build": "rimraf dist && webpack src/index.js dist/bundle.js --watch"
  },
```

* Run the server `http-server` in one tab
* In other tab now run `$ npm run build`
* Make a change to the `messages.js`, see how the watch terminal tab changes
and the browser will change when you hit refresh
* Great! We now can use one of our Terminal tabs to keep watching for us to make change to any of our `.js` files and it will automatically run the build command and re-bundle our code into `dist/bundle.js`.

## webpack.config.js
This is the standard name for webpack's configuration file. If you use this name you will not have to specify which config file you are going to use.

`$ touch webpack.config.js`

```js
const path = require( 'path' );

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join( __dirname, 'dist' ),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
};
```

* We are using ES6 syntax (`const`)
* Our entry points to `index.js`
* We use path to help with writing paths in node
* Our public path will point to `/dist/`
* The filename of our final bundled webpack `js` is `bundle.js` which will be placed inside the `dist` folder
* So we took the input and output parameters from our `package.json` file and we moved it into it's own configuration file `webpack.config.js`
* 
Now that we have that config file we can: 

## Update `package.json` 

From:

```json
"scripts": {
    "build": "rimraf dist && webpack src/index.js dist/bundle.js --watch"
  },
```

To:

```json
"scripts": {
    "build": "rimraf dist && webpack --watch"
  },
```

## Stop server and start again. 
* Stop server with: `ctrl` + `c`

`$ npm run build`

## View the browser
It should work just as it did before

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

### Environment Variables
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

