IMPORTANT!!!! - grab new jest notes from 138
# Create a Separate Test Database
* We need to test a bunch of stuff
* The ability to remove an expense
* Get all expenses
* Update an expense
* Full CRUD

## Fixtures vs DB
* We had fixtures data as a simple local array
* Now we will use a test db with prepopulated values
* We will constantly wipe this DB
* If we did this on our real production DB, we would be wiping real user data

## Static config variables
* We have them inside `firebase.js`
* We will move them into a file and store them in variables who's value will change depending on their environment
    - `Production` environment variables
    - `Development` environment variables
    - `Testing` environment variables

## Let's make structure changes to our site
* This will make our environment variables work nicely 

### process.env.NODE_ENV
* This is an environment variable that stores the environment you are currently in
* This gets **automatically** set for us on Heroku as a string 'production'
* We will set this in our test environment
    - It will be 1 of 3 values
        + 1. 'production' (we are in the `production` environment)
        + 2. 'test' (we are in the `test` environment)
        + 3. 'undefined' (we are in `development`)

## Set up test script
* In `package.json` we will set this up
* There are ways to this is each OS but there is no good 'cross OS' way
    - **problem** This means you can't just have a single script that works in all environments
    - **solution** `cross-env` A really small `npm` module that will enable us to set up environment variables

### cross-env
* [link to npmjs.com](https://www.npmjs.com/package/cross-env)
* Makes it so you can have a single command without worrying about setting or using the environment variable properly for the platform
* Just set it like you would if it's running on a POSIX system, and `cross-env` will take care of setting it properly

#### install cross-env
`$ npm i cross-env -D`

```
"test": "cross-env KEY=value jest --config=jest.config.json"
```

* **BEST PRACTICE** Common naming convention for all variables to use all upper case letters
    - ONE or
    - TWO_WORDS
    - We'll use: NODE_ENV=test

`package.json`

```
// MORE CODE

  "heroku-postbuild": "yarn run build:prod",
  "test": "cross-env NODE_ENV=test jest --config=jest.config.json"
},
"lint-staged": {

// MORE CODE
```

* We only need to set this up for `test` because Heroku will set this up for us
* We don't need to do it in development because the absence of an environment variable will just tell us it is in development

`webpack.config.js`

* **note** The old way to do this was with `extract-text-webpack-plugin`
* We will be using something to replace this (wait a bit)

### The old way of doing this

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// MORE CODE
```

* We set the `NODE_ENV` environment variable equal to itself if it exists and equal to 'development' if it doesn't (if it is equal to undefined... it doesn't exist)

`webpack.config.js`

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {

} else if (process.env.NODE_ENV === 'development') {

}
```

* If we are in the `test` environment do one thing
* If we are in the `development` environment do another thing

## Secrets are important
* We need to take special care of our firebase API key variables
* If someone has them they can destroy our app

### Two files are better than one
* We will create 2 separate files that both will be excluded from the git repository and we will read them in to our app in this part of the code

### .env.test
* Will hold our test environment variables
* All variables that Firebase needs (for testing)

### .env.development
* Will hold our development environment variables
* All variables that Firebase needs (for development)

### What about production?
* Heroku will let us set all these up so we won't have a file
* **note** But if you are not using Heroku for Production, you MAY need to set up a file for this

## Create 2 files in the root of your app
* .env.development
* .env.test

### .env.development
* Open `firebase.js` and cut all items inside the config variable into `.env.development`

#### KEY=value
* We need to set up KEY=value pairs
* Name our KEYs with something meaningful
* **important** Do not use quotes
* When you are finished your files should look similar to:

`env.development`

```
FIREBASE_API_KEY=AIzaSyDYG7aalHm2evdm0-bqfV_9QJNAmhwt123
FIREBASE_AUTH_DOMAIN=expensify-123db.firebaseapp.com
FIREBASE_DATABASE_URL=https://expensify-123db.firebaseio.com  
FIREBASE_PROJECT_ID=expensify-123db 
FIREBASE_STORAGE_BUCKET=expensify-123db.appspot.com
FIREBASE_MESSAGING_SENDER_ID=447434791123
```

* And we copy them over to `.env.test`

```
FIREBASE_API_KEY=AIzaSyDYG7aalHm2evdm0-bqfV_9QJNAmhwt123
FIREBASE_AUTH_DOMAIN=expensify-123db.firebaseapp.com
FIREBASE_DATABASE_URL=https://expensify-123db.firebaseio.com  
FIREBASE_PROJECT_ID=expensify-123db 
FIREBASE_STORAGE_BUCKET=expensify-123db.appspot.com
FIREBASE_MESSAGING_SENDER_ID=447434791123
```

## Create our Test Database
* In the Firebase console dashboard
* We now need to create a separate test DB named 'Expensify Test'
* Modify rules for test DB to allow all access

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

* Click `Publish`
* Ignore security warning (we want it to be public for now)
* Click 'Add Firebase to your web app', paste them at the bottom of `.env.test` and swap them out with the old values
* Clear up both files so it is just key-value pairs

## Read the values of environment variables into webpack.config.js

`webpack.config.js`

```
// MORE CODE
if (process.env.NODE_ENV === 'test') {
  process.env.FIREBASE_API_KEY="value we have in our files"
} else if (process.env.NODE_ENV === 'development') {

}
// MORE CODE
```

* We could do this for all of the environment variables in both environments but that would take too much time

### There is a better way
* We can use a simple `npm` module that will do this for us

### dotenv
* [link to npm site](https://www.npmjs.com/package/dotenv)
* `Dotenv` is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology
* All `dotenv` does is read one of those environment files and it sets up **process.env** +  `.` + all of the values in that file

#### install dotenv
`$ npm i dotenv`

##### How to use
`require('dotenv').config()`


### Instructions for custom use of dotenv
* But we named our files something other than `.env` so we need pass options to config
    - `path`
        + You can specify a custom path if your file containing environment variables is named or located differently

`require('dotenv').config({path: '/full/custom/path/to/your/env/vars'}`

* Our setup will be:

`require('dotenv').config({ path: '.env.test' });`

`webpack.config.js`

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}
/* eslint-enable global-require */

// MORE CODE
```

* Now all our file variables will be read
* They will be set on `process.env`

## Houston we have a problem!
### Node variables don't play nice in the client side of JavaScript
* Our **node** variables, the ones that exist in the `webpack` config file DO NOT get passed down to the client side JavaScript (_if they did that would create a ton of security concerns_)
    - Instead we need to manually pass those through
    - We need to pass all our 6 environment variables down into `bundle.js`
    - We will use a built-in webpack plugin called 'DefinePlugin'

### require webpack
`webpack.config.js`

```
const path = require('path');
const webpack = require('webpack'); // add this
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// MORE CODE
```

* We now have access to built-in webpack plugins
* We need to use `DefinePlugin`

`webpack.config.js`

```
// MORE CODE
    plugins: [CSSExtract,new webpack.DefinePlugin({

    })],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist',
    },
  };
};
```

* How we set this up can be tricky

```
// MORE CODE
plugins: [CSSExtract,new webpack.DefinePlugin({
  'process.env.FIREBASE_API_KEY': process.env.FIREBASE_API_KEY
})],
// MORE CODE
```

* The variable we are setting in our client side JavaScript is:

`webpack.DefinePlugin({ 'process.env.FIREBASE_API_KEY':?})`

* And we will get its value from the same variable but in the node environment

`DefinePlugin({'process.env.FIREBASE_API_KEY': process.env.FIREBASE_API_KEY`

* But that won't work because of how the `DefinePlugin` works

### Let's try to use this
`firebase.js`

```
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  // MORE CODE
```

* If we did that
* Our `DefinePlugin` will look around our project
* And it will do a find and replace
* It will replace the string `process.env.FIREBASE_API_KEY'` with the value inside `process.env.FIREBASE_API_KEY` which is 'test'

```
'process.env.FIREBASE_API_KEY': 'test' 
```

* So the value will be replaced with the content of the string, not the string itself
* This means, this would happen:

`firebase.js`

```
apiKey: test,
```

* That is not what we want
* We don't want the text value
* We want the `process.env.FIREBASE_API_KEY` value

### What is the solution?
* Wrap the string inside a string

```
plugins: [CSSExtract,new webpack.DefinePlugin({
  'process.env.FIREBASE_API_KEY': "'test'" 
})],
```

* Webpack will replace it with a valid string

## Houston we have a problem!
* Wrapping a string inside a string is not very readable

### Solution -- JSON.stringify()
* `JSON.stringify(`) will automatically add those quotes

`webpack.config.js`

```
// MORE CODE
plugins: [CSSExtract,new webpack.DefinePlugin({
  'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), 
  'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN), 
  'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL), 
  'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID), 
  'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET), 
  'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
})],
devServer: {
// MORE CODE
```

## Almost finished!
* We are now correctly passing down (to the client) our values
* Won't work yet because we are not using those values
* Update `firebase.js`

`firebase.js`

```
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};
// MORE CODE
```

* This will work... but only for the development setup

## Now let's make this work for our test files
### setupFiles
* An array of files to run our test cases
* Jest replaces `<rootDir>` with the root directory later on

`/jest.config.json`

```
{
  "setupFiles": [
    "raf/polyfill",
    "<rootDir>/src/tests/setupTests.js"
  ],
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ]
}
```

`src/tests/setupTests.js`

```
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';
import 'react-dates/initialize';

DotEnv.config({ path: '.env.test' });

Enzyme.configure({
  adapter: new Adapter(),
});
```

## Time to take this out for a test drive
* First clear both DBs
* `$ npm test -- --watch`
* If you pass all test it means that we are using the test DB
* Switch to the production DB and it should still be empty which means success!
* Our test cases are not affecting our production DB

## Here are my changes to webpack.config.js using modern way
* Using `mini-css-extract-plugin`

`webpack.config.js`

```
const path = require('path'); // to get the current path
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');

// what environment are we in?
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  // set up test environment variables
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  // set up development environment variables
  require('dotenv').config({ path: '.env.development' });
}

// to check if the file exists
const devMode = process.env.NODE_ENV !== 'production';
// console.log(devMode);
module.exports = env => {
  console.log(process.env.ENVIRONMENT);
  const isProduction = process.env.ENVIRONMENT === 'Production';
  const CSSExtract = new MiniCssExtractPlugin({
    filename: 'main.css',
  });

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins: [
      CSSExtract,
      // new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
      }),
    ],
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },
  };
};
```

