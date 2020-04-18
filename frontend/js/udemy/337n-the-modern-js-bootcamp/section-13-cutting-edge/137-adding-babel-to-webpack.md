# Adding Babel to Webpack
* We need to add support for Babel directly inside our Webpack config
* To accomplish this we'll need to use a `Webpack` **loader**

## Webpack loader
* `loaders` allow us to customize what happens when Webpack loads a file with its module system
    - In our case we'll be able to run that code through babel

## Install babel-loader
`$ npm i babel-loader`

* This is how we did this in `package.json`

`package.json`

```
  "scripts": {

     // MORE CODE

    "build": "babel src/index.js --out-file public/scripts/bundle.js --presets env --watch"
  },
```

* But now we'll tell Webpack to use the `babel-loader`
* And we specify the presets to be `env`

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{

      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'env'
          ]
        }
      }
    }]
  }
};
```

## Tell webpack which files to apply the rules to
* We want to apply it to all files in our project excluding `node_modules`
    - If we don't do this babel will get very slow because of all the files inside node_modules
    - This will slow down our build code
    - Since this isn't code we wrote we don't need to process it

### We'll use `exclude` and a `regular expression`
`webpack.config.js`

```
// MORE CODE

    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],

// MORE CODE
```

`/Users/me/Documents/dev/javascript-stuff/amead/udemy/337e-the-modern-js-bootcamp/node_modules/inquirer/lib/inquirer.js`

* So because we exclude all `/node_modules` we won't process anything that is inside the `node_modules` folder

## Not we'll use `test` to see if the file ends in `.js`
`webpack.config.js`

* Same as before but we need to escape the `.` using `\.`
* And we need to make sure the file ends in `.js` so we use the regular express `$` which denotes it occurs at the end of the filename

```
// MORE CODE

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },

// MORE CODE
```

## Now run live-server 
* Make sure the server is running in the background
* `$ npm run serve`

## Re-run webpack (separate terminal tab)
`$ npm run webpack`

## Woops - you need to upgrade to Babel 8
`babel-loader@8.x uses Babel 7.x, which is @babel/core@^7.0.0, and uses @babel/preset-env@7 which replaces babel-preset-env@^1.7.0`

### Uninstall the old modules

`$ npm uninstall babel-preset-env`

### Install the new modules
* [docs](https://webpack.js.org/loaders/babel-loader/)

`$ npm i @babel/core @babel/preset-env`

## Whew! Webpack should now work
`$ npm run webpack`

## And now we can update our package.json
* We can remove the babel script
* And rename webpack to build

### Old package.json
`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server public",
    "webpack": "webpack",
    "build": "babel src/index.js --out-file public/scripts/bundle.js --presets env --watch"
  },

// MORE CODE
```

### New package.json
`package.json`

```
  "scripts": {
    "serve": "live-server public",
    "build": "webpack"
  },
```

* Now we have a serve script for serving up the app
    - `$ npm run serve`
* Now we also have a build script for running things through webpack
    - `$ npm run build`
    - Now we no longer need to use babel outside of the context of webpack
