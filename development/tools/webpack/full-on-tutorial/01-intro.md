# [Webpack 2 Full Tutorial](https://www.youtube.com/watch?v=eWmkBNBTbMM)

Create a new folder `webpack-full-on-tutorial`
index.js
index.html

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Full On Webpack 2col</title>
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

View it in browser running `http-server`

* should be globally installed npm package

You should see `Hi there` in browser

turn into npm project
`$ npm init -y`

* we do this to be able to install dependencies

## Webpack 2
what versions are available?

`$ npm view webpack versions`

gives you a list of all npm versions

but truncates them so you need to use this

`npm info webpack versions --json`

That will give you the full list

Grab the latest version

* my current last version is `2.1.0-beta.27`

`$ npm install webpack@2.1.0-beta.27 --save-dev`


**term** - what does `tree shaking mean`?
* dead code elimination

webpack 2 vs 1?
2 handles ES6 imports
* without transpiling it to AMD imports
* important because it enables you to do tree shaking

## run webpack

`$ ./node_modules/webpack/bin/webpack.js ./index.js bundle.js`

* running from package
* needs input file `./index.js`
* needs output file `bundle.js`

## or run with this:

`$ webpack ./index.js bundle.js`

change index.html script src to `bundle.js`

View in browser. Same thing but now it is using the created distribution file.

update `package.json`

```json
"scripts": {
    "build": "webpack index.js bundle.js"
  },
```

we don't use `./node_modules/webpack/bin/webpack.js ./index.js bundle.js`

* because npm looks into `node_modules` for binaries

`$ npm run`

* is command to run npm scripts (the `scripts` key in the package.json file)

remove bundle.js

run build with `$ npm run build`

and that will generate your bundle.js file again

rm works to remove bundle.js to test but if you want to share with a buddy on windows that won't work

that is were the small npm package called `rimraf` comes in handle

## rimraf
Will delete files not matter what the OS is
`$ npm install rimraf --save-dev`

Then just do this to delete files first then build them

```
"scripts": {
   "build": "rimraf bundle.js && webpack index.js bundle.js"
},
```

`$ npm run build`

it will delete than build bundle.js

mkdir src dist

mv index.js src

update scripts

```json
"scripts": {
    "build": "rimraf dist && webpack src/index.js dist/bundle.js"
  },
```

delete the root `bundle.js`

update `index.html`

`<script src="dist/bundle.js"></script>`

$ npm run build

$ http-server

should work just like before

let's create our first module

last stopped at: `09:41`

