# Install Webpack
## Local install
* Which means I have access to it via `scripts` in `package.json`

## Webpack config file
* We'll talk about the Webpack `config` file
  - Allows us to set up Webpack to fit the needs of our app
* We'll start off with a simple config file
  - Bare bones config
  - Will allow us to run Webpack successfully
    + Later we'll add more complex features 

## Install Webpack (npm or yarn)
* `-D` will install Webpack as a dev dependency

### What is difference between dev dependencies and dependencies?
* [dev depend vs depend](https://medium.com/@dylanavery720/npmmmm-1-dev-dependencies-dependencies-8931c2583b0c)

`$ yarn add webpack -D`

`$ npm i webpack -D`

## New build script
* Installing Webpack locally means we have access to it via scripts
* Add a new script it will be called `build`
  - We'll rename our `build` previously created to `build-babel`
    + Webpack can be setup to run babel automatically but we'll keep this script command around for the time being

`package.json`

```
// MORE CODE
"scripts": {
  "serve": "live-server public/",
  "build": "webpack",
  "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
},
// MORE CODE
```

* For now we will have a separate command for `babel` and `webpack`
    - I change the names to avoid a collision
    - Eventually there will be only one command as webpack can run itself and `babel` at the same time
* We won't add any extra stuff for `webpack` in scripts as we'll use the special `webpack.config.js` for that info
    - The reason for this file is there are a ton of settings that would just make the `scripts` in `package.json` way too long and hard to update

## Run Webpack
`$ yarn run build` or `$ npm run build`

### Houston we have a problem!
* We get an error
* Webpack doesn't know what to do
* There is no `webpack.config.js`

## Let's setup `webpack.config.js`
* Move `src/app.js` to `src/playground/app.js`
* Create a new `app.js` in `src`
    - We'll just use a simple file to test webpack is working properly

### Simple log statement in new app.js
`src/app.js`

```
console.log('app.js is running');
```

## Create webpack.config.js
`/webpack.config.js`

* Must be in root of project
* This is a `node` script

## Webpack needs to know two required pieces of information
* Webpack needs the following 2 pieces of information a minimum to run

1. Where is our app `entry point`?
  * In other words "where does our application kick off?"
  * This will be `src/app.js`
2. Where do we want to put our output?
    * This is the final `bundle.js` webpack will create for us
    * We will put all this information inside `webpack.config.js` and that will enable us to run webpack successfully

## module.exports = {}
* This is a `node` thing
* It is a way to expose something (in this case an object) to another file
  - Webpack will grab this file, run it, and it will have access to whatever we put on this object
    - ES6 uses `export` to do the same thing
    - We will be adding an object that we want available to other files

## Where is your app entry point?
* We need to tell webpack where it should start

```
module.exports = {
 // what is the main file we want webpack to start at?
 entry: './src/app.js'
};
```

* [link to webpack documentation](https://webpack.js.org/)
    - Click on the "Documentation" link located [here](https://webpack.js.org/concepts/)
    - Click on "Entry" for documentation on that setting
        + [entry documentation](https://webpack.js.org/concepts/#entry)

## Where do you want to put the output?
* This is the 2nd essential piece for Webpack to run
`webpack.config.js`

```
module.exports = {
 // what is the main file we want webpack to start at?
  entry: './src/app.js',
  output: {
    path: '',
    filename: 'bundle.js'
  }
};
```

### filename
* `filename` is what you want to name your output (`bundle.js` is the traditional filename - but you could name it whatever you want)

### path
* `path` is a bit more tricky
  - This is the absolute path on your machine to where you want to output that webpack bundled file
  - Where do we want to put our `bundled.js` file?
    + In the `public` folder in our project and this is the tricky part

#### We can't use `./`
* You can't use `./` for the path because that is for relative paths
* And `path` needs to be an **absolute** path
        + We need to provide here the path to our machine
        + The tricky part is that this will be different for everyone
            * Mac/Linux/Windows
            * And add to that all the different usernames are different too
            * There is a **variable** (__dirname) that will make this way easy

## __dirname
* Let's see what the value is

`webpack.config.js`

```
console.log(__dirname);

module.exports = {
  entry: './src/app.js',
  output: {
    path: '',
    filename: 'bundle.js',
  },
};
```

## Test it out
* To test we'll run it through node in the terminal
* Remember this is `node` so we need to run it through node

`$ node webpack.config.js`

### Sample output for __dirname
`/Users/SOMEUSERNAME/Documents/dev/react-stuff/indecision-app`

* You should see it outputs the **absolute path** for us and it will do this for everyone no matter what their username or OS

## Where do we want to output and store `bundle.js`?
* But we don't want to put `bundle.js` in the **root** of our project
  - Instead we want to put it inside `public/`
  - Why?
    + So we can serve it up to the browser

## Houston we have a problem!
* But we are in another quagmire because each OS treats paths differently

### Solve the problem with node's `path`
* To solve this problem we'll use `node`s **path**
  - This is a function from **node** that will allow us to:
    + Join together 2 paths (`path.join()`) no matter what OS you are on
      * We will combine the absolute path with the relative path to the `public` folder

## path
* Documentation for node's path [here](https://nodejs.org/api/path.html)
* And we'll be using `path.join()`
    - Documentation for `path.join()` [here](https://nodejs.org/api/path.html#path_path_join_paths)
    - The `path.join()` method joins all given path segments together using the platform specific separator as a delimiter, then normalizes the resulting path

```
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
```

* Notice in the example above how the last argument was `..` and that means we'll go up a directory so the final path is `'/foo/bar/baz/asdf'`
* We go inside `quuz` folder but the `..` takes us out and that is why the path is the way it is

## You need to remember to require `path`:
* So using the following code we'll be able to join together the absolute path with the public folder giving us the final path we need to server up our bundle.js in `public/bundle.js`
* If you forget to require `path` you will get an error `ReferenceError: path is not defined`

`webpack.config.js`

```
const path = require('path'); // add this line

console.log(path.join(__dirname, 'public')); // update this line

module.exports = {
  // what is the main file we want webpack to start at?
  entry: './src/app.js',
  output: {
    path: '',
    filename: 'bundle.js',
  },
};
```

## No need to install `path` to package.json
* We don't have to use yarn or npm to install `path` as it is built into `node`
* Sample path using `__dirname` and `path` is:

`/Users/SOMEUSERNAME/Documents/dev/react-stuff/indecision-app/public`

* Now after all that hard work we have our `absolute path` to the **public** folder where we will finally server our `bundle.js`
    - And we know this will work on all different machines

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'), // update this line
    filename: 'bundle.js',
  },
};
```

## We're ready to take webpack for a test drive
* We have a minimal Webpack setup

`$ yarn run build` or `$ npm run build`

### Houston we may have a problem
* I received an error [similar to this issue](https://github.com/cretueusebiu/laravel-vue-spa/issues/109):
  - To fix I ran `$ npm i -D webpack-cli`

* It should work now with `$ npm run build`

## We get output from Webpack
You should see output similar to:

![webpack output](https://i.imgur.com/KcLFf5m.png)

* The `Hash` enables us to verify the integrity of the output
* The webpack version
* The time it took to get everything done
* Down below in the output:
  - It created a single `asset` called `bundle.js` and its size
      + We'll ignore `chunks` for the moment
* Then we see the input
    - We have just a single file that was found `src/app.js`
      + There were no dependencies of that file so no other files (dependency tree)

## We have a new public/bundle.js!
* The end result should give you a `bundle.js` inside your `public` folder
    - Open that file and you'll see a ton of code you did not write
    - But this code is necessary for webpack to do it's job
    - The code you wrote will be at the very bottom of `bundle.js`
      + You will see `console.log("app.js is running")`

### Delete `scripts` directory
* We don't need this anymore
* We can remove all of our script tags
* We'll load in `React` and `ReactDOM` via import later
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

* We change the path to forward slash `/` (which is the root of the web server)
  - **note** The root of the web server is the `public/` folder
  - So our path to bundle.js becomes `./bundle.js`

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

* Make sure to delete the `/public/scripts` folder (and the `app.js` file inside of it)

## Test if it is running
`$ npm run serve`

* You should see that the client browser `http://127.0.0.1:8080/` logs out `app.js is running`
* If you do, congrats webpack is working!

### One problem
* Make a change to your file:

`src/app.js`

`console.log('app.js is running!');`

* Just added a `!`
* But the browser doesn't update without a page refresh
* Let's fix that

## Updating browser automatically with webpack using `--watch`
`package.json`

```
// MORE CODE
"scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
// MORE CODE
```

## Test again
* Start and stop both webpack and live server
* Restart them

`$ npm run serve` and `$ npm run build`

* Make changes to `src/app.js`, save changes, and see how the console log updates without a page refresh!

* **note** When you run `$ npm run build` (runs webpack) you will now see a new line `webpack is watching files..` so it will refresh automatically on every save

## Summary
* This was a simple bare bones webpack setup
* Next we'll add some layers to this and break up our files using the ES6 import/export functionality

## Recap
* We installed Webpack locally and we installed a command that lets us run webpack
* If we didn't have a webpack config file it failed
* We set up a webpack config file `webpack.config.js`
  - This file needs 2 core properties and values
    + `entry` - The input (the entry point)
      * All the files I take in
      * Simple to set up
    + `output` - The output
      * Where should I put all the minified concatenated bundled file?
      * Required a little more configuration
      * We will use path again when we introduce CSS to our webpack builds

## Next
* ES6 import/export


