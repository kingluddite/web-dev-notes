# Regular vs Dev Dependencies
* Install chalk
* Won't use it but using it just as a demo of how to intall a dev dependency

`$ yarn add -D`

## Package to move to devDepency
* 2 enzyme packages
* jest
* react-test-renderer
* webpack-dev-server

### remove
* Live server
* chalk
* `"serve": "live-server public/`
    - we don't need this
    - we have the dev server for development purposes
    - we have the start script for the production server

`package.json`

```json
{
  "name": "expensify",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build:dev": "webpack --watch",
    "build:prod": "webpack -p --env production",
    "lint": "eslint --fix src/*.js",
    "pretest": "npm run lint",
    "dev-server": "webpack-dev-server",
    "precommit": "lint-staged",
    "eslint-check": "eslint --print-config .eslintrc.js | eslint-config-prettier-check",
    "start": "node server/server.js",
    "heroku-postbuild": "yarn run build:prod"
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ],
    "*.css": "stylelint",
    "*.scss": "stylelint --syntax=scss"
  },
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-eslint": "^8.2.1",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "eslint": "4.15.0",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-last": "0.0.5",
    "eslint-config-prettier": "2.9.0",
    "eslint-config-standard": "^11.0.0-beta.0",
    "eslint-loader": "^1.9.0",
    "eslint-plugin-flowtype": "^2.41.0",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-jsx-a11y": "^6.0.3",
    "eslint-plugin-node": "^5.2.1",
    "eslint-plugin-prettier": "2.5.0",
    "eslint-plugin-promise": "^3.6.0",
    "eslint-plugin-react": "^7.5.1",
    "eslint-plugin-standard": "^3.0.1",
    "express": "^4.16.2",
    "extract-text-webpack-plugin": "^3.0.2",
    "husky": "^0.14.3",
    "lint-staged": "^6.0.0",
    "moment": "^2.20.1",
    "node-sass": "^4.7.2",
    "normalize.css": "^7.0.0",
    "prettier": "1.10.2",
    "prettier-eslint": "^8.7.5",
    "prettier-eslint-cli": "^4.4.0",
    "react": "^16.2.0",
    "react-dates": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-modal": "^3.1.10",
    "react-redux": "^5.0.6",
    "react-router-dom": "^4.2.2",
    "redux": "^3.7.2",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.19.1",
    "stylelint": "^8.4.0",
    "stylelint-order": "^0.8.0",
    "uuid": "^3.1.0",
    "validator": "^9.2.0",
    "webpack": "^3.10.0"
  },
  "devDependencies": {
    "enzyme": "^3.3.0",
    "enzyme-to-json": "^3.3.0",
    "jest": "^22.1.4",
    "react-test-renderer": "^16.2.0",
    "webpack-dev-server": "^2.9.7"
  }
}
```

## How do we install one or the other?
* Delete `node_modules`

`$ yarn install --production`

* This tells yarn to only install the dependencies and leave off the devdependencies
* We won't do this locally but this is what is running on heroku
    - But try it locally to see what happens
    - search for `jest` inside `node_modules` and you won't find it

`$ yarn install`

* That will install both dependencies and dev dependencies
* Using the smaller build process will mean less time to create remote app on heroku
* good to stay organized

## dist
* We have our generated bundles directly inside public
* Better to create a `dist` folder inside `public`
* Then have webpack dump the 4 assets inside that directory
    - makes for better organization
    - easier to workwith and manage
    - single dist folder in public
    - we know that it will contain all of the compiled files as opposed to having 4 files buring in with other things
        + and we also have 4 files listed in the .gitignore file

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Expensify</title>
  <link rel="icon" type="image/png" href="/img/favicon.png" />
  <link rel="stylesheet" href="/dist/styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="/dist/bundle.js"></script>
</body>
</html>
```

* We add the `/dist` path
* remember the dev server never writes assets to the file system, it serves it up virtually which allows it to be very fast

## Public Path
* https://webpack.js.org/configuration/dev-server/#devserver-publicpath-

`webpack.config.js`

```js
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
    },
    // // MORE CODE
      devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist',
    },
  };
};
```

* We just make 2 changes to:
    - the output path
    - the devServer public path

## Test to see if it works
* Delete our 4 compiled files
* `$ yarn run dev-server`

`localhost:8080`

* View chrome dev tools `Network` tab
* We can't see the dist folder in local dev mode because the dev server does it all virtually and never generates it

### Try production build
`$ yarn run build:prod`

* You should see the dist folder was generated with our 4 assets

## Start the server
`$ yarn run start`

* And the app is running on localhost:3000

## Update .gitignore
`.gitignore`

```
node_modules
*.swp
*js.swp
*~
public/dist/
```

## Push to heroku
`$ gc -am 'add dist'`

* Will be faster
    - Many of the modules were already installed and cached

## Open
`$ heroku open`

* View network tab of chrome
* Refresh
* Make sure you see styles and bundle.js (dist)
* And the app is running with no errors

## Need to do testing 

* New Feature Workflow
* Build It: Adding Total Selector
* Build It: Adding Summary Component


