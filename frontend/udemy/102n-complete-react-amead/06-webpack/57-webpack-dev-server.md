# Webpack Dev Server
* [documentation](https://webpack.js.org/configuration/dev-server/)
* Similar to live-server
* But has some built-in features specific to webpack
* Will speed up the changes in our files and the change in the browser

## Install Webpack dev Server
`$ yarn add webpack-dev-server`

* Lots of options
* One required setting is `devServer.contentBase`
    - This tells webpack where our `public` folder is
    - This is only necessary if you want to serve static files. 

`webpack.config.js`

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
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
```

* Now our webpack dev server is set up

`package.json`

* We'll remove the babel script as we don't need it anymore
* We'll get rid of `--watch` as devserver will do this
* We'll keep the build for production

```
// MORE CODE
"scripts": {
  "serve": "live-server public/",
  "build": "webpack --watch",
  "dev-server": "webpack-dev-server"
},
// MORE CODE
```

* We don't need to add any flags/options to `dev-server` as it will get all config settings from `webpack.config.js`

## Great news!
* We don't need to use two terminals running
* We can run all of it in one terminal tab
* Shut down and close `live-server` tab
* Shut down our `build` process and run dev server with:

`$ yarn run dev-server`

* Works just like before
* More data in webpack terminal window

## Take dev server for a test drive
* In AddOption change the button text and see how UX updates without page refresh
* You could delete `bundle.js` and it would still work
    - This is possible because dev-server is using it's memory to create those files
    - This makes it very fast for development changes

## Re-Generate real `bundle.js`
* dev server will never regenerate it
* But `$ yarn run build` will generate it
    - Try it now
    - But the size is approx 1.89MB which is HUGE!
    - We can do better
    - And we will
    - When we talk about Production and deploying later

## Add improvements using ES6 cutting edge stuff! 

