# Install Webpack
* Local install
    - Which means I have access to it via `scripts` in `package.json`

`$ yarn add webpack`

`package.json`

```json
// MORE CODE
"scripts": {
  "serve": "live-server public/",
  "build": "webpack",
  "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
},
// MORE CODE
```

* For now we will have a separate command for babel and webpack
    - I change the names to avoid a collision
    - Eventually there will be only one command as webpack can run itself and babel at the same time
* We won't add any extra stuff for `webpack` in scripts as we'll use the special `webpack.config.js` for that info
    - The reason for this file is there are a ton of settings that would just make the `scripts` in `package.json` way too bulky

## Run Webpack
`$ yarn run build`

* We get an error
* Webpack doesn't know what to do
* There is no `webpack.config.js`
* Move `src/app.js` to `src/playground/app.js`
* Create a new `app.js` in `src`
    - We'll just use a simple file to test webpack is working properly

`src/app.js`

`console.log('app.js is running');`

`/webpack.config.js`

* Must be in root of project
* This is a `node` script

## Webpack needs to know two required pieces of information
* As a minimum to run

1. Where is our app entry point?
2. Where do we want to put our output?
    * This is the final `bundle.js` webpack will create for us

## module.exports
* This is a `node` thing
* It is a way to expose something to another file
    - ES6 uses `export` to do the same thing
    - We will be adding an object that we want available to other files

`webpack.config.js`

```js
module.exports = {

};
```

## Where is your app entry point?
```js
module.exports = {
 // what is the main file we want webpack to start at?
 entry: './src/app.js'
};
```

* [link to webpack documentation](https://webpack.js.org/)
    - Click on the "Documentation" link located [here](https://webpack.js.org/concepts/)
    - Click on "Entry" for documentation on that setting
        + [entry documentation](https://webpack.js.org/concepts/#entry)

## Where do you want to put the output
`webpack.config.js`

```js
module.exports = {
 // what is the main file we want webpack to start at?
  entry: './src/app.js',
  output: {
    path: '',
    filename: 'bundle.js'
  }
};
```

* Filename is what you want to name your output (`bundle.js` is the traditional filename)
* `path` is a bit more tricky
    - You can't use `./` for the path because that is for relative paths
    - And `path` needs to be an **absolute** path
        + We need to provide here the path to our machine
        + The tricky part is that this will be different for everyone
            * Mac/Linux/Windows
            * And add to that all the different usernames are different too
            * There is a variable that will make this way easy

## __dirname
* Let's see what the value is
* To test we'll run it through node in the terminal

`$ node webpack.config.js`

### Sample output for __dirname
`/Users/SOMEUSERNAME/Documents/dev/react-stuff/indecision-app`

* You should see it outputs the absolute path for us and it will do this for everyone no matter what their username or OS
* But we don't want to put `bundle.js` in the root of our project
    - Instead we want to put it inside `public` so we can serve it up to the browser
    - But we are in another quagmire because each OS treats paths differently
    - To solve this problem we'll use `node`s **path**
        + This is a function from node that will allow us to join together 2 paths no matter what OS you are on
        + We will combine the absolute path with the relative path to the `public` folder

## path
* Documentation for node's path [here](https://nodejs.org/api/path.html)
* And we'll be using `path.join()`
    - Documentation for path.join [here](https://nodejs.org/api/path.html#path_path_join_paths)
    - The `path.join()` method joins all given path segments together using the platform specific separator as a delimiter, then normalizes the resulting path

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
```

`webpack.config.js`

```js
const path = require('path');

console.log(path.join(__dirname, 'public'));

module.exports = {
  // what is the main file we want webpack to start at?
  entry: './src/app.js',
  output: {
    path: '',
    filename: 'bundle.js',
  },
};
```

* We don't have to use yarn to install `path` as it is built into `node`
* Sample path using `__dirname` and `path` is:

`/Users/SOMEUSERNAME/Documents/dev/react-stuff/indecision-app/public`

* Now after all that hard work we have our absolute path to the public folder where we will finally server our `bundle.js`
    - And we know this will work on all different machines

`webpack.config.js`

```js
const path = require('path');

module.exports = {
  // what is the main file we want webpack to start at?
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
};
```

## We're ready to take webpack for a test drive

`$ yarn run build`

* It should work
* You should see output similar to:

![webpack output](https://i.imgur.com/KcLFf5m.png)

* The `Hash` enables us to verify the integrity of the output
* The webpack version
* The time it took to get everything done
* It created a single asset called `bundle.js` and its size
    - We'll ignore `chunks` for the moment
* The we see the input
    - There were no dependencies of that file so no other files (dependency tree)
* The end result should give you a `bundle.js` inside your `public` folder
    - Open that file and you'll see a ton of code you did not write
    - But this code is necessary for webpack to do it's job
    - The code you wrote will be at the very bottom of `bundle.js`

### Delete `scripts` directory
* We don't need this anymore
* We can remove all of our script tags
* We'll load in React and ReactDOM via import later
* And our path to the one script will be `/bundle.js`
    - We are pointing to the root of the server

### Our original `public/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Indecision App 3</title>
</head>
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
  <script src="/scripts/app.js"></script>
</body>
</html>
```

* Make the following updates to that file:

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Indecision App 3</title>
</head>
<body>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>
</html>
```

* Make sure to delete the `/public/scripts` folder (and the app.js file inside of it)

## Test if it is running
* You should see that console log out `app.js` is running
* If you do, congrats webpack is working

### One problem
* Make a change to your file:

`src/app.js`

`console.log('app.js is running!');`

* Just added a `!`
* But the browser doesn't update without a page refresh
* Let's fix that

## Updating browser automatically with webpack using --watch
`package.json`

```json
// MORE CODE
"scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
// MORE CODE
```

## Test again
* Start and stop both webpack and babel in terminal tabs
* Restart them
* Make changes to `src/app.js`, save changes, and see how the console log updates without a page refresh
* **note** When you run `$ npm run build` and run webpack you will now see a new line `Webpack is watching files..` so it will refresh automatically on every save

## Summary
* This was a simple bare bones webpack setup
* Next we'll add some layers to this and break up our files using the ES6 import/export functionality


