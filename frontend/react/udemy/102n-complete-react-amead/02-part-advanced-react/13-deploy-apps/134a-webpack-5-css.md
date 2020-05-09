# Webpack 5 with CSS
## Code repo's used to update to this config:
* [man1cato](https://github.com/man1cato/dnd-3.5-character-manager)
* [kshutty](https://github.com/kshutty/react-course-2-expensify-app)

## Old `webpack.config.js`

```
const path = require('path');

module.exports = env => {
  // console.log('env', env);
  const isProduction = env === 'production';

  return {
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
        {
          test: /\.(scss|css)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
    },
  };
};

```

## New wepback.config.js
### Install mini-css-extract-plugin
* [docs for mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

`$ npm i mini-css-extract-plugin`

### Install dotenv
* For environment variables

`$ npm i dotenv -D`

### Update test with environmental variable
* Old **package.json** `test`

```
// MORE CODE

    "test": "cross-env NODE_ENV=test jest --config=jest.config.json --watchAll"
  },

// MORE CODE
```

* New **package.json** `test`

```
// MORE CODE

    "test": "cross-env NODE_ENV=test jest --config=jest.config.json --watchAll"
  },

// MORE CODE
```

## Update .gitignore
* Old `.gitignore`

```
node_modules
*.log
.DS_Store
```

* New `.gitignore`

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

* TODO - should only use one `.env` file but I don't know how this works
    - Currently using a dev `.env.development` and a test `.env.test`

## Run code
* You should see the code is broken up into JavaScript and CSS

* Need to add dependencies to project
    - @babel/cli
    - @babel/plugin-proposal-class-properties
    - eslint-plugin-jest

`$ npm i @babel/cli @babel/plugin-proposal-class-properties eslint-plugin-jest`

* Need to remove these dependencies
    - babel-plugin-transform-class-properties (remove old)
    - babel-plugin-transform-object-rest-spread (remove old)
    - babel-preset-env (remove old)
    - babel-preset-react (remove old)
    - uuid (no longer using it)

```
$ npm uninstall uuid babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread babel-preset-env babel-preset-react
```

## Test to make sure it runs in dev
* Note - create react app environment variables
    - [good article on this](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d)

## Using environment variables in react
* [doc](https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5)

### Problem this is solving
* How to declare different API URLs for your local development build and production build
* When working with React, environment variables are variables that are available through a global process.env Object
    - That global Object is provided by your environment through NodeJs.
    - But because we don't have NodeJs in the browser, we're going to need Webpack to help us

## 2 ways to set and use environment variables for React apps with Webpack
1. Using `npm` scripts (inside `package.json` **scripts** part)
2. Using an `.env` file

### Using npm scripts
* You need to install these 2 dev-dependencies:

`$ npm i webpack webpack-cli -D`

### Basic scripts that run webpack
`package.json`

```
// MORE CODE

{
  // the rest of your package.json
  scripts: {
    "dev": "webpack --config webpack.config.js",
    "build": "webpack --config webpack.config.js"
  }
}
// MORE CODE
```

### Adding environment variables changes it to look like:
`package.json`

```
// MORE CODE

{
  // the rest of your package.json
  scripts: {
    "dev": "webpack --env.API_URL=http://localhost:8000 --config webpack.config.dev.js",
    "build": "webpack --env.API_URL=https://www.myapi.com --config webpack.config.build.js"
  }
}
// MORE CODE
```

## Problem
* If we tried to see this output in our React component

`app.js`

```
// MORE CODE

const App = () => <h1>{process.env.API_URL}</h1>;

// MORE CODE
```

## Run webpack
`$ npm run dev`

* Our code breaks

## Why?
* Because when we use environment variables in our front-end code, they really just serve as placeholders that will be replaced when we compile our code

### But this is a problem
* Because we didn't tell webpack to compile those variables to real values

### Let's tell webpack to compile those variables to real values using DefinePlugin webpack plugin

`webpack.config.js`

```
// remember to require this, because we DefinePlugin is a webpack plugin
const webpack = require('webpack'); 

// return a function from the config file
// the `env` variable will be a simple Object: 
//      { API_URL: 'http://localhost:8000' }
//      it will contain all the environment variables
//      (that we set in package.json) as key/value pairs

module.exports = (env) => {
  // this object is our actual webpack config
  return {
    plugins: [
      // add the plugin to your plugins array
      new webpack.DefinePlugin({ `process.env.API_URL`: JSON.stringify(${env.API_URL}) })
    ]
  };
};

// MORE CODE
```

## Reduce helps save some time!
* But writing them all manually is a big pain and we can use the `reduce()` method to "reduce" the values to a nice handy object

`webpack.config.js`

```
// MORE CODE

module.exports = (env) => {
  // create a nice object from the env variable
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  };
};
// MORE CODE
```

## Using .env file to set environment variables
* We will create a file called `.env`
    - Add .env to your .gitignore
* Your front-end code will refer to the same environment variable (example: `process.env.API_URL`) on both environments (development/production)
    - But because you defined different values in your `.env` files, the compiled values will be different

`.env`

```
API_URL=http://localhost:8000
```

* That's all we need to do

## How do we handle our .env file?
* We need some way to handle the file and its content
* This is where `dovenv` comes in handy

### dotenv
* Commonly used (create-react-app uses it too!)
* dotenv gets the variables from our .env file and adds them to the global `process.env`

#### install dotenv
`$ npm i dotenv -D`

### How do we add environment variables to our React
* Problem
    - `dotenv` only works server-side
    - React is client-side not server-side
    - In order for this to work `dotenv` needs some sort of environment to actually store the variables
        + And that's where Webpack comes to save the day

#### We'll use Webpack's DefinePlugin
* We add it to our configuration

`webpack.config.js`

```
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  };
```

* Calling `.config()` on dotenv will return an Object with all the environment variables set in your .env file under a key called parsed
    - Check the React code

`AppRouter.js`

```
// MORE CODE

const AppRouter = () => (
  <Router>
    <Header />
    <h1>{process.env.API_URL}</h1>
    <Switch>

// MORE CODE
```

## So now we get Production to greatly lower our JavaScript bundle (only 1.07mb)
* And it split out the `bundle.js.map` (large 3.66mb but this is only for developers)
* We break out the css and a map for it
* Awesome!
* Here is the working code:

`webpack.config.js`

```
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//
// if (process.env.NODE_ENV === 'test') {
//   require('dotenv').config({ path: '.env.test' });
// } else if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config({ path: '.env.development' });
// }

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  // console.log('env', env);
  // const isProduction = env === 'production';
  console.log(process.env.ENVIRONMENT);
  const isProduction = process.env.ENVIRONMENT === 'Production';
  const CSSExtract = new MiniCssExtractPlugin('styles.css');

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
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
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin(envKeys),
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
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_MESSAGING_SENDER_TO': JSON.stringify(
          process.env.FIREBASE_FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_APP_ID': JSON.stringify(
          process.env.FIREBASE_APP_ID
        ),
      }),
    ],
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },
  };
};
```

## Run it
`$ npm run prod:build`

* You will see `console.log(process.env.ENVIRONMENT)` logs out "Production" in the terminal so that log shows that we are pulling the environment value from the variable in .env using dotenv

![the successful build](https://i.imgur.com/NuXTgUl.png)

## View it in the browser
`$ npm run server`

### Everything is Awesome but... we have a problem
* We need to update our HTML to point to `public/dist/`

`index.html`

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Expensify</title>
  <link rel="icon" type="image/png" href="/images/favicon.png" />
</head>

<body>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
</body>

</html>
```

* The last file was looking at the same file that was there from before `bundle.js` directly inside `public`
* When we add the `css` link we'll need to use the same path
* Now we can see the envionment variable showing up inside our `AppRouter.js` file
* And our Chrome console is empty as we got rid of all our console.log statements from before

## Different environment variables for different environments
* We want to create different .env files for different environments and let webpack pick the correct .env file based on the active environment

### Create another file in your root to join .env
* Create `.env.development` (this will contain all the environment variables for development)
* `.env` (contains all the environment variables for production)
    - It is common to name `.env` for production environment variables

### Setting the active environment using NPM scripts
* **note** You could create more `.env` files for more environments (`.env.staging` for example), as long as you set the environment in the `package.json` and create the corresponding `.env` file in the root of your project!

`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server public/",
    "build:dev": "webpack --env.ENVIRONMENT=development --config webpack.config.js",
    "build:prod": "webpack -p --env.ENVIRONMENT=production --config webpack.config.js",
    "fix-styles": "prettier-stylelint --write 'src/**/*.{css,scss}' ",
    "dev-server": "webpack-dev-server --open",
    "test": "cross-env NODE_ENV=test jest --config=jest.config.json --watchAll"
  },

// MORE CODE
```

* A slight improvement

`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server public/",
    "build:dev": "webpack --env.ENVIRONMENT=development --config webpack.config.js",
    "build:prod": "webpack -p --env.ENVIRONMENT=production --config webpack.config.js",
    "fix-styles": "prettier-stylelint --write 'src/**/*.{css,scss}' ",
    "dev-server": "webpack-dev-server --env.ENVIRONMENT=development --open",
    "test": "cross-env NODE_ENV=test jest --config=jest.config.json --watchAll"
  },

// MORE CODE
```

## Run dev-server
`$ npm run dev-sever`

Our CSS is not working

## Test our our prod
* Let's see if our new plugin will extract a separate css file

`$ npm run build:prod`

`$ npm run serve`

### View new output
* You should now see we have 4 files
    - `bundle.js`
    - `styles.css`
    - `bundle.js.map`
    - `styles.css.map`

### Now we need to add a link tag to `index.html`

`index.html`

```
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Expensify</title>
  <link rel="icon" type="image/png" href="/img/favicon.png" />
  <link rel="stylesheet" href="/dist/styles.css">
</head>
<!-- MORE CODE -->
```

## Houston we have a problem!
* Our app doesn't load and we get this error "Refused to apply style from 'http://127.0.0.1:8080/dist/styles.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled."

### Just make sure to add the proper type
* Webpack is creating `main.css` so we need to point to it
    - TODO: Find out how to change this 

```
<link rel="stylesheet" type="text/css" href="/dist/main.css" />
```

* The full code

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

## Test our our prod again
* Let's see if our new plugin will extract a separate css file

`$ npm run build:prod`

`$ npm run serve`

### Docs on Webpack and mini-css-extract-plugin
* [docs](https://webpack.js.org/plugins/mini-css-extract-plugin/)

### Removed this log
`src/actions.expenses.js`

```
// MORE CODE

export const startAddExpense = (expenseData = {}) => dispatch => {
  console.log('startAddExpense called');

// MORE CODE
```

## Add these 2 plugins
```
$ npm i terser-webpack-plugin optimize-css-assets-webpack-plugin
```

## My new webpack.config.js
```
const path = require('path'); // to get the current path
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');

// to check if the file exists
const devMode = process.env.NODE_ENV !== 'production';

module.exports = env => {
  // Get the root path (assuming your webpack config is in the root of your project)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = `${currentPath}/.env`;

  // We're concatenating the environment name to our filename to specify the correct .env file
  const envPath = `${basePath}.${env.ENVIRONMENT}`;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // call dotenv and it will return an Object with a parsed key
  // const env = dotenv.config().parsed;

  // reduce it to a nice object with the variables from the file
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  // console.log('env', env);
  // const isProduction = env === 'production';
  console.log(process.env.ENVIRONMENT);
  const isProduction = process.env.ENVIRONMENT === 'Production';
  const CSSExtract = new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
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
      new webpack.DefinePlugin(envKeys),
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
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_MESSAGING_SENDER_TO': JSON.stringify(
          process.env.FIREBASE_FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_APP_ID': JSON.stringify(
          process.env.FIREBASE_APP_ID
        ),
      }),
    ],
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },
  };
};
```

## Firebase is working
`.env`

```
ENVIRONMENT=PRODUCTION
API_KEY=acdeftDUpPr5pG87V3PRpsX2VF-7QOTDsA77sv4
AUTH_DOMAIN=expensify-12355.firebaseapp.com
DATABASE_URL=https://expensify-12355.firebaseio.com
PROJECT_ID=expensify-12355
STORAGE_BUCKET=expensify-1235.appspot.com
MESSAGING_SENDER_ID=1239625827386
APP_ID=1:123625827386:web:9558d708af1aeeae958d03
MEASUREMENT_ID=G-GB3GZ1SYXB
```

`.env.development`

`.env`

```
ENVIRONMENT=DEVELOPMENT
API_KEY=acdeftDUpPr5pG87V3PRpsX2VF-7QOTDsA77sv4
AUTH_DOMAIN=expensify-12355.firebaseapp.com
DATABASE_URL=https://expensify-12355.firebaseio.com
PROJECT_ID=expensify-12355
STORAGE_BUCKET=expensify-1235.appspot.com
MESSAGING_SENDER_ID=1239625827386
APP_ID=1:123625827386:web:9558d708af1aeeae958d03
MEASUREMENT_ID=G-GB3GZ1SYXB
```

* **Note** You would set firebase environment variables on your host Dashboard or using their CLI
* Get rid of the following lines (yo and API_URL) as we just used them for testing

![remove from AppRouter.js](https://i.imgur.com/4LIMQYU.png)

## Test that you see firebase saving expenses
* But we have yet to learn to read and show firebase expenses in our app so they will still disappear but if you look at the Firebase dashboard you will see it

## View Chrome network tab
* You will see `main.css`
    - Click on it and you will see (if in development) all 3 css files we are using bundled in the same file

## What about CSS source maps?
* If you run `$ npm run build:prod` and `$ npm run serve`
    - View the calendar and see if source maps are working
    - They should be
    - TODO: Fix and find out why production source map files are not working

## But they are not working on the dev-server
* To test this delete all `js` and `css` files inside public folder
* This will make sure the `dev-server` is not falling back to these generated production assets (using cache) but the webpack dev server is using and generating everything itself

`$ npm run dev-server`

* We can see that the source maps are not working when inspecting calendar in UI of browser using the Chrome dev tools 

## To get this working we need to tweak our loader options in Webpack
* We also need to tweak the dev-tool we are using when working in development mode
    - cheap-module-eval-source-map is not work

### Fix - change `cheap-module-eval-source-map` to `inline-source-map`
* **note** source maps in webpack are buggy and they are working on it
    - This change will work but it is slower than before

`webpack.config.js`

* Old way

```
// MORE CODE
    
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',

// MORE CODE
```

* New way

```
// MORE CODE

    devtool: isProduction ? 'source-map' : 'inline-source-map',

// MORE CODE
```

### We also need to enable sourcemaps for our loaders
* All of our loaders do support a set of options

#### css-loader
* [css-loader sourcemaps](https://webpack.js.org/loaders/css-loader/)
* **note** By default css-loader sourcemaps are disabled
* We will make a minor tweek to our use webpack array
    - Instead of using a string `css-loader` we'll use an object instead
* We'll also do this for the Sass loader

`webpack.config.js`

```
// MORE CODE

            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },

// MORE CODE
```

* I had that code already

## Sourcemaps working now in dev but not in prod (for css)
```
const path = require('path'); // to get the current path
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');

// to check if the file exists
const devMode = process.env.NODE_ENV !== 'production';

module.exports = env => {
  // Get the root path (assuming your webpack config is in the root of your project)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = `${currentPath}/.env`;

  // We're concatenating the environment name to our filename to specify the correct .env file
  const envPath = `${basePath}.${env.ENVIRONMENT}`;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // call dotenv and it will return an Object with a parsed key
  // const env = dotenv.config().parsed;

  // reduce it to a nice object with the variables from the file
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  // console.log('env', env);
  // const isProduction = env === 'production';
  console.log(process.env.ENVIRONMENT);
  const isProduction = process.env.ENVIRONMENT === 'Production';
  const CSSExtract = new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
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
      new webpack.DefinePlugin(envKeys),
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
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_MESSAGING_SENDER_TO': JSON.stringify(
          process.env.FIREBASE_FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_APP_ID': JSON.stringify(
          process.env.FIREBASE_APP_ID
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

* We have a separate CSS and JS file
