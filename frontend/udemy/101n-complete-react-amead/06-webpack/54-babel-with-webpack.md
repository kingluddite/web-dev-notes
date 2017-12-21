# Setting up Babel with Webpack
* Transpile JSX into ES5

## loader
* Advanced webpack technique
* Let you customize the behavior of webpack when it loads a given file

### Any `.js` file
* Anytime webpack sees a `*.js` file, we can run it through babel
* There are also loaders for SCSS to transpile to CSS

## Install
* babel-core
    - Similar to babel-cli
    - babel-core allows you to run babel from webpack
        + Does nothing on its own
        + We need to add presets to let it know what it can transpile
* babel-loader
    - This is a webpack plugin
    - Enables us to teach webpack how to run babel when webpack sees certain files

`$ yarn add babel-core babel-loader`

## Setup loader

`webpack.config.js`

```json
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

* We do this using the `module` property
    - It is an object
    - [documentation](https://webpack.js.org/configuration/module/)
        + We are interested in the modules **rules** property
        + [Link to documentation](https://webpack.js.org/configuration/module/#module-rules)

## Lets you set up an array of rules
* A rule lets you define how you want to use your loader
    - One rule could change `jsx` into ES5
    - One rule could change `scss` into css
    - And many many more possible rules
* rules is a single array
* one single rule

## 3 properties we set up
* `loader` - what loader are we trying to use, we just installed babel-loader and that is the loader we want to use
* `test` - this will be a regular expression to find all JavaScript files (_`.js` files_)
    - `/\.js$/`
    - we escape the `.` (special character)
    - ends in `.js` so we use the `$`
* `exclude` - we don't need to check `node_modules` as that is production ready code, that is so huge that running it through all those files would hurt the performance of our app
We gave `babel` the **rules** but we haven't told `babel` to use the **env** or the **react** `presets`

![babel presets](https://i.imgur.com/AVJ5mlA.png)

* We told `babel` that info but we no longer have access to those **presets** inside `webpack`
* To do this we need to create a separate config file for babel
    - And it needs to be called `.babelrc`
    - Here we put all the commands we added to the command line inside this file

`/.babelrc`

```json
{
  "presets": [
    "env",
    "react"
  ]
}
```

## Success!
* You should now see we have transpiled using babel
* This is what you should see in the UX

`JSX from webpack yo!`

## Summary
* How is this working?
    - Because we told webpack to run babel every time it sees a JavaScript file we wrote
    - webpack loads the file
    - It runs it through babel
    - Converting the jsx to React.createElement() calls
    - And that is what gets finally stored in `bundle.js`

## OMG
* Open `bundle.js`
* It is 22,000 lines long!
* All of that for our simple app?
    - There is a ton of code in this file solely for development
    - The code is not minified so it's taking up lots more space than necessary
    - The reason is for readability while in dev mode
* In future we'll create a webpack build for production that will greatly reduce all the extraneous dev code and vastly reduce the filesize of my app

## Next - One component per file
