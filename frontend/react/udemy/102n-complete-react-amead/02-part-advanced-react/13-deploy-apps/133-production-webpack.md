# Production Webpack
* Currently --- zero optimization

`$ npm run build`

`$ yarn run build` 

## (note total size of bundle)
* My `bundle.js` is 6.28MB
  - That is horribly wayyyyyy toooo large
* **Note** Most is source maps
* We will try to get as much as possible outside of `bundle.js` and into other files that can optionally load

## How can we run Webpack in production mode?
* [guides - big picture stuff](https://webpack.js.org/guides/)
* [production docs](https://webpack.js.org/guides/production/)

## webpack -p
`package.json`

```
// // MORE CODE
"build:dev": "webpack --watch",
"build:prod": "webpack -p",
// // MORE CODE
```

`$ yarn run build:prod`

* This will shave off approx 1mb

# Production Webpack
https://webpack.js.org/guides/production/

`package.json`

```
"build:dev": "webpack --watch",
"build:prod": "webpack -p",
```

## Export a function
* We had a config object and now we set it to a function and return our object

`webpack.config.js`

```
const path = require('path');

module.exports = () => {
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
    },
  };
```

## Why export as a function?
* [webpack 4 docs](https://webpack.js.org/configuration/configuration-types/)
* What is the advantage of exporting as a function?
  - The function gets called with some stuff
  - We will get access to the `env`
  - They use the `env.production` to determine which devtool to add
    + We will do something very similar

`webpack.config.js`

* We added the `env` like so:

```
const path = require('path');

module.exports = env => {
  console.log('env', env);
  // MORE CODE
```

* Run `$ npm run build:prod` and you will see:

`env undefined`

## So are we running our dev or prod script? 
* Currently it is undefined which means there is no way to know if we are running the development script or the production script

### Troubleshooting:
* I found why I was getting this error and sharing my mistake with others to maybe help them not pull their hair out like I did. The problem I made was I cut out the object and pasted it into the function (but... and I'm embarrassed here... I forgot to delete my empty module.exports = {}

https://i.imgur.com/hZ5Smek.png

And so it saw an empty object and that was why I was getting Can't resolve './src' error

**Solution**: Just delete that empty object and you'll be back and good to go. (My next adventure will be upgrading webpack to 5 - it looks like a cleaner solution... stay tuned)

## Solution: Tweak our script in package.json
* set `env` to 'production'

`package.json`

`"build:prod": "webpack -p --env production",`

* Now `env` is set to production
  - This is redundant (we add -p and a production environment variable but that's the best way we can do this in webpack 4)

### Run again `$ npm run build:prod`
* **note** But if we run `build:dev` `env` is still `undefined`

#### We don't need to check for `dev` only check if prod
* We could check for `dev` but it's not necessary and only need to check if it matches `production`

`webpack.config.js`

```
const path = require('path');

module.exports = env => {
  // we just check if `env` is equal to the string "production"
const isProduction = env === 'production';
```

* If env does equal "production" - great!
* If not, and it is undefined, that's good too because if it is false or undefined then we'll run webpack without the optimizations

## Make production sourcemaps smaller
* sourcemaps are taking up a ton of space (approx 5mb)

### Do we need sourcemaps in production?
* Yes, they are still important
* We will use a slower version of sourcemaps in production
  - This will lead to a slower build for production but since we are not deploying all the time this is a decent trade off
  - We may deploy to production a dozen times a day
  - But if we used this slow process for development it would lead to a grinding halt to our team dev workflow

### Our new external sourcemap
* Will create an external file
* It will be huge but will only load when someone cracks open the devtools
* When a regular user visits our app they won't have to get bogged down by that sourcemap

### Ternary operator to the rescue!
* We will test if we are in `Production` environment if it is we'll use our production sourcemap (String value = "source-map") if false it will use our development sourcemap (String value = "cheap-module-eval-source-map")
* [webpack docs for devtool](https://webpack.js.org/configuration/devtool/#devtool)
  - Shows you how source-map is slowest but build for production

`webpack.config.js`

```
// MORE CODE
  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },

// MORE CODE
```

* We want to bundle fast in development because we do it often
* But for production we don't do it as much and want our files smaller
    - It takes longer to build for production but the files are smaller but we also have smaller sourcemaps to help with debugging

## Run build for production

`$ npm run build:prod`

* **Remember** This will be a lot slower to build but we only run this about a dozen times a day

### Two assets are created in this build

![two build files for prod created](https://i.imgur.com/NPgQb4W.png)

* Now we have 2 assets that output is bundling
    - `bundle.js`
        + Contains core app js (~189kb)
    - `bundle.js.map` (new file) ~2mb
        + We don't care about this file
        + Only loaded when someone opens dev tools
        + For regular users the browsers will never make a request for this file

### Test production locally using live-serve
* I removed this and now I'm putting it back

`package.json`

```
// MORE CODE

"scripts": {
    "serve": "live-server public/",
    "build:dev": "webpack",
    "build:prod": "webpack -p --env production",
    "dev-server": "webpack-dev-server",
    "test": "jest --config=jest.config.json"
  },
// MORE CODE
```

## Install live-server

`$ npm i live-server`

## Run app in production

`$ npm run serve`

* Should work as it did before so we know our production build is good to go

## public folder and index.html file
* I deleted my index.html file and it broke the app
* I put it back into public

`public/index.html`

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Expensify</title>
  <link rel="icon" type="image/png" href="/images/favicon.png" />
</head>

<body>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>

</html>
```

* But that gave me a strange error with a link:

![app error](https://i.imgur.com/xjP5DeS.png)

The link was: https://reactjs.org/docs/error-decoder.html/?invariant=200

And that let me know in Minified react they don't send down a lot of error info to keep app small. But this error let me know that I had the wrong DOM root id `app`. I changed it to the root id my app.js was using `root` and ran it again and it worked.

## How do we test Production sourcemaps?
* Add a simple log inside `app.js`

`app.js`

```
// MORE CODE

const store = configureStore();
console.log('I am a log statement on line 20 of app.js - thank goodness for production source maps!');

// MORE CODE
```

### What are sourcemaps used for again?
* They let us know exactly where our JavaScript is coming from so if we need to debug we can get right to it.
  - Without sourcemaps all our JavaScript code gets bundled together and trying to find an error in our production build code is literally like trying to find a needle in a coding haystack

### Run prod build again
* First stop live-server with `ctrl` + `c`

`$ npm run build:prod`
`$ npm run serve`

![source-maps in production are working!](https://i.imgur.com/Q1DobEF.png)

* Should show line number of log in `app.js`
* If it does your sourcemaps are working properly

## Next - Dump all CSS into external CSS file
* We need to figure out how to extract our CSS out of that `bundle.js` file and put it into its own `styles` file

## Clean up!
* Don't forget to remove the test log in app.js
* I also found I had a log showing the date in ExpenseForm.js on line 12 I can remove as well!

## Recap
* We set up a separate script that allows us to set up our Production webpack build

* `-p`
    - Allows us minify our JavaScript
    - Also sets production environment variable for 3rd party libraries
* Add `--env production` flag
    - Enables us to customize how `webpack.config.js` generates that object
    - We switched from exporting an object to exporting a function that returns the object
        + This enables us to access the environment and use it in the object configuration
            * We use a ternary to generate one type of sourcemap if we are in production and another if we are not
            * This greatly reduced our size of `bundle.js` for production
