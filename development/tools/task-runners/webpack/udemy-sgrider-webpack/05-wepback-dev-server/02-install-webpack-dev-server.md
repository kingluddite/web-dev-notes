# Install webpack-dev-server
`$ yarn add -D webpack-dev-server`

## Add to scripts
`package.json`

```
"scripts": {
    "clean": "rimraf dist",
    "build": "yarn run clean && webpack",
    "serve": "webpack-dev-server"
  },
```

* Just as we added the build command we add the command to run webpack and the primary reason is to avoid having to install these modules globally

## Run webpack-dev-server
`$ npm run serve`

* It will run and tell us our site is running at http://localhost:8080
* visit that page
* make a change to the console.log() and watch how the web page updates automatically
* the big key is that it does not rebuild the whole project
    - If you scroll up in the terminal you will see that only 1 file was rebuilt

**note** If you change the `webpack.config.js` file, you have to restart the webpack-dev-server
    * Webpack does not watch for changes to the `webpack.config.js`
    * Close server with `ctrl` + `c`

## Try this
* Stop webpack-dev-server
* `$ npm run clean`
* `$ npm run`
* `$ npm run serve` - the `dist` directory was not created
* View in browser and our app is still working
* How can it be working when we have no `dist` folder?
    - When we run webpack-dev-server
    - It internally will execute webpack
    - but it stops webpack from actually saving any files to our project directory
    - when you run webpack-dev-server and webpack executes nothing gets saved to your harddrive 
        + if you want to get a portable version of your app (i.e. the raw development assets) YOU HAVE TO RUN WEBPACK
        + when you run webpack-dev-server and it relies on webpack internally to build our project those files are only saved in memory (so they only exist in memory as part of the webpack-dev-server itself)
        + So going to `http://localhost:8080` those files are only served entirely out of memory (not directly from our harddrive)
        + Remember - webpack-dev-server is only for development, it is not for production use
