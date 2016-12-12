# Watching our JavaScript

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
