# Webpack installation and configuration
`$ yarn add webpack -D`

![webpack config diagram](https://i.imgur.com/iQmCyai.png)

* By default Webpack doesn't know what to do in our project
* We have to tell it which files to process and which to join together in a single bundle (_bundle.js_)

## webpack.config.js
* Name of the file with webpack config settings
* Special name so Webpack is looking for this file

`$ touch webpack.config.js`

### Bare minimum Webpack config to run on our project
1. The Entry Property
    * In our project that entry point would be `index.js` because it is the code that actually does something
    * Traditionally we call the entry point file to our Application `index.js`
    * Because `index.js` doesn't export anything else and it not depended upon by anything else, we refer to it as the **Entry Point** of our Application
    * We tell Webpack this is the first file that should execute when our Application starts up in the browser
    * `index.js` forms the start of the module building process

`webpack.config.js`

```
/* eslint-disable */
const config = {
  entry: './src/index.js'
};

module.exports = config;
```

* We point our relative path from the root of our project to `index.js`
    - `'./src/index.js'`

## Second required webpack property
The `output` property - Takes our huge bundle and tells it where to save it and what to name it

* `ouput` takes and object
* `entry` is a relative path but `path` inside `output` requires and **absolute** path (_fully qualified path on our hard drive_)
    - To help with this we'll use a helper from `node.js`
    - The **path** module (_we'll have to require it_)
        + That `require` is handled by the node runtime and not by webpack
        + When we run webpack it runs in the **node.js** environment so we can make use of any **node.js** technology we want inside of our tooling pipeline
        + **path** module has a function on it called `resolve()`
        + `path.resolve()`
            * `resolve()` takes in a path to a file and it makes sure the file path is correctly specified no matter which OS we are on
                - So regardless if we are Windows, OS, or Linux, node will make sure the correct path is generated here
        + `path.resolve(__dirname),`
            * `__dirname` is a constant in `node.js` and is a reference to the current working directory
            * The second argument is what we want the folder to be called that we are putting `bundle.js` inside
                - popular names
                    + `dist`, `build`

`webpack.config.js`

```
/* eslint-disable */
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};

module.exports = config;
```
