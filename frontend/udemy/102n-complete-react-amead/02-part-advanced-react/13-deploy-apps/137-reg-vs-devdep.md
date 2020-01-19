# Regular vs Dev Dependencies
* We are going to focus on 2 optimizations we can make
* The first one has to do what's in package.json
  - Look at our dependencies: (we have ~ 30 dependencies)
  - If you need dependencies install them but if not don't
  - Some of our dependencies are only for testing (like enzyme)
  - We only need live-server locally
  - We only need webpack-dev-server locally
  - Currently if they are dependencies we are installing them on our Heroku server even though we're never going to use them
  - Let's change that

## We'll create 2 different sections of Dependencies (dependencies and devDependencies)
* devDependencies will only get install locally

### My current devDependencies and dependencies
package.json

```
// MORE CODE

  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/plugin-proposal-object-rest-spread": "^7.6.2",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "autoprefixer": "^9.6.1",
    "babel-cli": "^6.26.0",
    "babel-eslint": "^10.0.2",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^0.28.11",
    "dotenv": "^8.2.0",
    "enzyme-to-json": "^3.4.3",
    "eslint": "4.10.0",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-prettier": "2.7.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.1",
    "eslint-plugin-prettier": "2.3.1",
    "eslint-plugin-react": "^7.4.0",
    "html-webpack-plugin": "^3.2.0",
    "jest": "^24.9.0",
    "node-sass": "^4.12.0",
    "postcss-loader": "^3.0.0",
    "prettier": "1.8.2",
    "prettier-eslint-cli": "^4.4.0",
    "prettier-stylelint": "^0.4.2",
    "sass-loader": "^8.0.0",
    "style-loader": "^0.18.2",
    "stylelint": "^10.1.0",
    "stylelint-order": "^3.1.0",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.7",
    "webpack-dev-server": "^3.8.0",
    "webpack-merge": "^4.2.2"
  },
  "dependencies": {
    "@babel/cli": "^7.7.4",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@types/react": "^16.9.2",
    "@types/redux": "^3.6.0",
    "enzyme": "^3.10.0",
    "enzyme-adapter-react-16": "^1.15.1",
    "eslint-plugin-jest": "^23.0.5",
    "express": "^4.17.1",
    "firebase": "^7.4.0",
    "live-server": "^1.2.1",
    "mini-css-extract-plugin": "^0.8.0",
    "moment": "^2.24.0",
    "normalize.css": "^8.0.1",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "prop-types": "^15.7.2",
    "raf": "^3.4.1",
    "react": "^16.8.0",
    "react-addons-shallow-compare": "^15.6.2",
    "react-dates": "^21.2.1",
    "react-dom": "^16.9.0",
    "react-modal": "^3.10.1",
    "react-redux": "^7.1.1",
    "react-router-dom": "^5.0.1",
    "react-test-renderer": "^16.11.0",
    "redux": "^4.0.4",
    "redux-thunk": "^2.3.0",
    "strip-ansi": "^5.2.0",
    "terser-webpack-plugin": "^2.2.1",
    "validator": "^11.1.0"
  }

// MORE CODE
```

## Install chalk module
* Won't use it but using it just as a demo of how to install a dev dependency

`$ npm install chalk --dev`

* Shortcut way of writing same line as above

`$ npm i chalk -D`

* By installing apps like we just did for `chalk` it will add that dependency in the `devDependencies` part of `package.json` and when deploying to Heroku or any other production server, any apps listed in `devDependencies` will not be installed on production servers which will save valuable server resources

## Package to move to devDependencies
* enzyme
* enzyme-adapter-react-16
* eslint-plugin-jest
* live-server
* react-test-renderer
* anything for eslint

### So uninstall all first
`$ npm uninstall enzyme enzyme-adapter-react-16 eslint-plugin-jest live-server`

* A faster way would just be to cut and paste them from `dependencies` to `devDependencies`
* **important notes when moving code from dependencies to devDependencies**
  - Don't forget trailing slashes
  - Last item in list does not have a trailing slash

### My new package.json
```
// MORE CODE

  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/plugin-proposal-object-rest-spread": "^7.6.2",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "autoprefixer": "^9.6.1",
    "babel-cli": "^6.26.0",
    "babel-eslint": "^10.0.2",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^0.28.11",
    "dotenv": "^8.2.0",
    "enzyme": "^3.10.0",
    "enzyme-adapter-react-16": "^1.15.1",
    "enzyme-to-json": "^3.4.3",
    "eslint-plugin-jest": "^23.0.5",
    "eslint": "4.10.0",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-prettier": "2.7.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.1",
    "eslint-plugin-prettier": "2.3.1",
    "eslint-plugin-react": "^7.4.0",
    "jest": "^24.9.0",
    "prettier": "1.8.2",
    "prettier-eslint-cli": "^4.4.0",
    "prettier-stylelint": "^0.4.2",
    "react-test-renderer": "^16.11.0",
    "stylelint": "^10.1.0",
    "stylelint-order": "^3.1.0",
    "webpack-cli": "^3.3.7",
    "webpack-dev-server": "^3.8.0"
  },
  "dependencies": {
    "@babel/cli": "^7.7.4",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@types/react": "^16.9.2",
    "@types/redux": "^3.6.0",
    "express": "^4.17.1",
    "firebase": "^7.4.0",
    "mini-css-extract-plugin": "^0.8.0",
    "moment": "^2.24.0",
    "node-sass": "^4.12.0",
    "normalize.css": "^8.0.1",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "prop-types": "^15.7.2",
    "raf": "^3.4.1",
    "react": "^16.8.0",
    "react-addons-shallow-compare": "^15.6.2",
    "react-dates": "^21.2.1",
    "react-dom": "^16.9.0",
    "react-modal": "^3.10.1",
    "react-redux": "^7.1.1",
    "react-router-dom": "^5.0.1",
    "redux": "^4.0.4",
    "redux-thunk": "^2.3.0",
    "sass-loader": "^8.0.0",
    "strip-ansi": "^5.2.0",
    "style-loader": "^0.18.2",
    "terser-webpack-plugin": "^2.2.1",
    "validator": "^11.1.0",
    "webpack": "^4.39.3"
  }
}
```

## Live server
* We are going to remove it as we won't use it anymore
* We can remove it all together from our `devDependencies` list
* We will also remove the `serve` script

`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server public/",

// MORE CODE
```

* We have the dev server for development purposes
  - We use the command `$ npm run dev-server` to run our dev server

`"dev-server": "webpack-dev-server`

* And we have the `start` script for the production server
  - Heroku will use the command `npm run start` to run our Express server

`"start": "node server/server.js`

* So we don't need a third option and we remove `live-server` from `package.json`

### Remove chalk
`$ npm uninstall chalk`

## How do we install just production dependencies (will be apps in the `dependencies` folder)
* Delete `node_modules` to test if this will actually work as we expect

`$ npm i --production`

* We will never do this locally but this is what will actually run on Heroku so let's try it out
* After running the command open `node_modules` and you will not see `enzyme`, `eslint` stuff or `jest`
  - So our dependencies are installing correctly for production

## But locally we will still install dependencies and devDependencies
* So we will continue to use:

`$ npm install` or the shortcut `$ npm i`

* Look inside the `node_modules` and now you'll see all our dependencies like before but also devDepencies like `jest`, `eslint` and `enzyme` stuff

## What did we accomplish?
* After all that we have a slightly smaller build process
* Heroku will require a little less time to deploy our app
* It is always a good idea to stay organized like this

## One more change - deals with our `public` directory
* We are taking all our compiled assets and just dumping them in the public folder (this works but is not ideal)
  - bundle.js
  - bundle.js.map
  - main.css
  - main.css.map
* A more ideal solution is create a `dist` folder and dump those files inside that directory and place that file inside the `public` folder (we are already doing this but just wanted to point this out)

## Benefits of this solution
* This will make things easier to work with and manage
* We'll have a single `dist` folder and we know that contains all the compiled files (as opposed to having 4 files buried in with other slings which would be a sloppy solution)
* We can remove 4 files listed in `.gitignore` and now we can just list `dist/`

### Making the change
* Make sure you CSS and JavaScript point to the `dist` folder in your `index.html`

`index.html`

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Expensify</title>
  <link rel="icon" type="image/png" href="/images/favicon.png" />
  <link rel="stylesheet" type="text/css" href="/dist/main.css" />
</head>

<body>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
</body>

</html>
```

* Make sure Webpack places our compiled code in the `dist` folder

`webpack.config.js` (and `webpack.config.prod.js`)

```
// MORE CODE

    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
    },

// MORE CODE
```

* The `output` path tells webpack where to put all those assets and if we were dumping them in the `public` folder it would look like this

`webpack.config.js` (and `webpack.config.prod.js`)

```
// MORE CODE

    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },

// MORE CODE
```

* By adding a 3rd argument `dist` it will go from the `public` directory to `public/dist` directory
  - Even if `dist` doesn't exist Webpack will create it for us on the fly
  - We also need to make this change to the development server (down below in our webpack config file

## Webpack dev-server
* **Remember** The development server never writes assets to the file system it serves them up virtually
  - This is why working in the dev-server is so quick
  - But after our change above to point to the `dist` folder we need to make it here too
    + Because if we have this:

`webpack.config.js`

```
// MORE CODE

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    },

// MORE CODE
```

* That means the dev-server is looking for those virtual assets in the public folder
* To do this we add a single property
  - Webpack docs > Documentation > Configuration > DevServer > devServer.publicPath
  - [docs](https://webpack.js.org/configuration/dev-server/#devserverpublicpath-)
  - "The bundled files will be available in the browser under this path."
    + By default it is the root of the server `/` so your bundle will be available as `http://localhost:8080/bundle.js`

`webpack.config.js`

* We set it up like this:

```
// MORE CODE

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },
  };

// MORE CODE
```

## When you run your app through the dev-server
`$ npm run dev-server`

* Use the Chrome dev tools to see the Network tab and see that your compiled js and css files are now located in the `dist` folder (refresh browser with `All` filter selected and hover over `bundle.js` and you will see path that pops up has `dist` in it, you will see the same path for `main.css`)

![see dist in path](https://i.imgur.com/Ew1Rz53.png)

* **note** But if you view the folder inside VS Code (or your editor) you will see the `dist` folder does not exist because the `dev-server` doesn't write files to the system and instead serves them virtually from memory

## Test if files get written to public/dist for production
* If `dist` folder exists, delete it

`$ npm run build:prod`

* You should see after the build completes that the `build` folder has been created and it has the compiled assets inside it

## Finally run your express server to make sure it can access the assets inside the `dist` folder

`$ npm run start` or the shortcut (`$ npm start`)

## Our .gitignore
`.gitignore`

```
yarn-error.log
public/dist/
*.env
config/*.json
playground.js
node_modules
.vscode
*.log
.DS_Store
.env.test
.env.development
```

* **note** We are now ignoring one folder `dist` instead of 4 files (cleaner code and much easier to maintain!)

## Git shortcut for "modified" files
* You can add and commit with one line with `$ git commit -am "Add dist folder and setup devDependencies`
* You may see people use the slightly longer `$ git commit -a -m "My message"`
* **note** This will not include new files

## Add, commit and push to GH and Heroku
* The build process on Heroku will be much faster
  - A lot of the modules were already installed so they'll be cached
  - Then it will run the Webpack build which will take some time
  - Finally the app link will be provided and your app should be up and running
  - Our app would be working except for our Firebase API keys are missing and we are erroring out
  - But if it was running we could use the Chrome network tab to see that styles and bundle are properly loading in the `dist` folder

![dist path working](https://i.imgur.com/TksuH2E.png)

## Recap
* We rearranged our dependencies
  - We created a devDependencies section in package.json
  - This allows us to install all dependencies locally but when in production Heroku will only install dependencies it needs and not devDependencies
* We added a `dist` folder which makes managing our bundled assets much easier

## Next - Feature Request workflow
* Feature idea, testing and deploying
