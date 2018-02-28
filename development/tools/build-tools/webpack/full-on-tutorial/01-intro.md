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

