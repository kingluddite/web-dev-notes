# Setting up Babel with Webpack
* Transpile JSX into ES5

## loader
* Advanced webpack technique
* Let you customize the behavior of webpack when it loads a given file

### Any `.js` file
* Anytime webpack sees a `*.js` file, we can run it through `babel`
* There are also loaders for SCSS to transpile to CSS

## Install
* `babel-core`
    - Similar to `babel-cli`
    - `babel-core` allows you to run `babel` from `webpack`
        + Does nothing on its own
        + We need to add presets to let it know what it can transpile
* `babel-loader`
    - This is a `webpack` plugin
    - Enables us to teach webpack how to run babel when webpack sees certain files

`$ yarn add babel-core babel-loader`

`$ npm i babel-core babel-loader`

## Setup loader
`webpack.config.js`

* We do this using the `module` property
    - It is an object

### Let's check out the webpack documentation
* Click on Documentation > Configuration
* [documentation](https://webpack.js.org/configuration/module/)
  - We are interested in the module's **rule** property
  - [Link to documentation](https://webpack.js.org/configuration/module/#module-rules)

#### Rule property - Lets you set up an array of rules
+ A rule lets you define how you want to use your loader
    * One rule could change `jsx` into ES5
    * One rule could change `scss` into css
    * And many many more possible rules
+ rules is a single array
+ one single rule

```
const path = require('path');

module.exports = {
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
    ],
  },
};
```

## 3 properties we set up
* `loader` - What loader are we trying to use, we just installed `babel-loader` and that is the loader we want to use
* `test` - This will be a regular expression to find all JavaScript files (_`.js` files_)
    - `/\.js$/`
    - We escape the `.` (special character)
    - Ends in `.js` so we use the `$`
* `exclude` 
    - We don't need to check `node_modules` as that is production ready code, that is so huge that running it through all those files would hurt the performance of our app
* We gave `babel` the **rules** but we haven't told `babel` to use the **env** or the **react** `presets`

![babel presets](https://i.imgur.com/AVJ5mlA.png)

* We told `babel` that info but we no longer have access to those **presets** inside `webpack`
* To do this we need to:
 
### Create a separate config file for babel
* And it needs to be called `.babelrc`
* Here we put all the commands we added to the command line inside this file

`/.babelrc`

```
{
  "presets": [
    "env",
    "react"
  ]
}
```

## A better way
* I like one less file and just to stick this babel config inside package.json

`package.json`

```
{
  "name": "eslint-prettier-boilerplate",
  "version": "1.0.0",
  "description": "Starting point for build modern websites",
  "main": "index.js",
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "babel": {
    "presets": [
      "env",
      "react"
    ]
  },

// MORE CODE
```

## Houston we have a problem - we need to update babel to 7
* Here's how to do that:

I upgraded babel to 7 and used this link to get it working - [resource](https://stackoverflow.com/questions/47830273/babel-plugin-preset-files-are-not-allowed-to-export-objects-only-functions?rq=1)

My dependencies `package.json` fragment : 

```
// MORE CODE

"devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "babel-cli": "^6.26.0",
    "babel-loader": "^8.0.6",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.7"
  },
  "dependencies": {
    "live-server": "^1.2.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "validator": "^11.1.0"
  }

  // MORE CODE
```

* I don't use a `.babelrc` file and just put the config inside `package.json` (1 less file to worry about)

`package.json` fragment

```
// MORE CODE

"scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ]
  },
// MORE CODE
```

* webpack.config.js

```
// MORE CODE

const path = require('path');
 
module.exports = {
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
    ],
  },
};
// MORE CODE
```

After installing all that `$ npm run build` and it should work

## Test for Success!
`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

const template = <p>Hello from React and I've spoken to Babel!</p>;

ReactDOM.render(template, document.getElementById('root'));
```

* You should now see we have transpiled using babel
* This is what you should see in the UX

`Hello from React and I've spoken to Babel!`

## Summary
# How is this working?
* Because we told `webpack` to run `babel` every time it sees a JavaScript file we wrote

## Steps it follows
1. `webpack` loads the file
2. It runs it through `babel`
3. Converting the **JSX** to `React.createElement()` calls
4. And that is what gets finally stored in `bundle.js`

## bundle.js just got HUUUUGE!
* Open `bundle.js`
* It is 22,000 lines long!
* All of that for our simple app?
    - There is a ton of code in this file solely for development
    - The code is not minified so it's taking up lots more space than necessary
    - The reason is for readability while in dev mode
* In future we'll create a `webpack` build for production that will greatly reduce all the extraneous dev code and vastly reduce the filesize of my app

## Recap
* Can't just use JSX directly inside webpack
* We have to teach webpack how to use babel
  - We do that using the babel-loader
    + Any file that is not `.js` (regex in `webpack.config.js`) or in node_modules, run babel
    + That includes `app.js` and any files that app.js might import

## Next
* We'll break out all of our components into their own files

