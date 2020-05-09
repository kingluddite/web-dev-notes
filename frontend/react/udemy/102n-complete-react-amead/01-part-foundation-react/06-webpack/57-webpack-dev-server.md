# Webpack Dev Server
* [documentation](https://webpack.js.org/configuration/dev-server/)
* Similar to `live-server`
* But has some built-in features specific to webpack
* Will speed up the changes in our files and the change in the browser

## Install Webpack dev Server
`$ yarn add webpack-dev-server -D`

`$ npm i webpack-dev-server -D`

* Lots of options
* One required setting is `devServer.contentBase`
    - This tells webpack where our `public` folder is
    - This is only necessary if you want to serve static files

`webpack.config.js`

```
const path = require('path');

module.exports = {
  // MORE CODE

  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
```

## Congrats! You just successfully configured webpack dev server!
* Now our webpack dev server is set up

## Set up a script that runs webpack dev server

### Let's clean up our scripts
#### build-babel
* We don't need build babel anymore - Delete it
  - We'll remove the babel script as we don't need it anymore

`package.json`

```
// MORE CODE

"build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
// MORE CODE
```

### Let's work on webpack
* currently this runs webpack in watch mode

```
// MORE CODE

    "build": "webpack --watch",

// MORE CODE
```

* Above will be redundant since we will build a new script for the dev server
  - We'll remove `--watch` and keep the build to run webpack in production
  - We'll get rid of `--watch` as devserver will do this
* We'll keep the build for production

```
// MORE CODE
"scripts": {
  "serve": "live-server public/",
  "build": "webpack",
  "dev-server": "webpack-dev-server"
},
// MORE CODE
```

* We add a dev-server script that will run `webpack-dev-server`
  - This is the command that webpack-dev-server provides to us
  - We don't need to add any flags/arguments to `dev-server` as it will get all config settings from `webpack.config.js`
    + webpack-dev-server will use all the config inside webpack.config.js to bootstrap itself
* After this we'll be able to remove `live-server` as we won't need this anymore

## Great news!
* We don't need to use two terminals running
* We can run all of it in one terminal tab
* Shut down and close `live-server` tab
* Shut down our `build` process and run dev server with:

`$ yarn run dev-server` or `$ npm run dev-server`

* Works just like before
* More data in webpack terminal window

## Two for the price of one
* We now have webpack-dev-server which runs both a server and webpack!

## Content served from (this is our public folder and webpack-dev-server lets us always know where it is)
`Content not from webpack is served from /Users/MYUSERNAMEHERE/Documents/dev/react-stuff/my-react-app/public`

## Take dev server for a test drive
* http://localhost:8080/
* In `AddOption` change the button text and see how UX updates without page refresh
* You could delete `bundle.js` and it would still work
    - This is possible because `dev-server` is using it's memory to create those files
    - This makes it** very fast for development changes**
+ This is a different URL so localStorage values won't be saved

## Re-Generate real `bundle.js`
* `dev-server` will never regenerate it
* But `$ yarn run build` or `$ npm run build` will generate it
    - Try it now
    - But the size is approx 1.89MB which is HUGE!
    - We can do better
    - And we will
    - When we talk about Production and deploying later

## Add improvements using ES6 cutting edge stuff! 

## Notes
* Remove live server

`$ npm uninstall live-server`
