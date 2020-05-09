# Deploy with Heroku
* We just set up environment variables for our test and development environments
* Now we need to set up environment variables for our production environment

## Houston we have a problem!
* None of that environment code runs on production and we made sure of it using the following "if" statements:

`webpack.config.js`

```
// MORE CODE

// what environment are we in?
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  // set up test environment variables
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  // set up development environment variables
  require('dotenv').config({ path: '.env.development' });
}

// MORE CODE
```

## How do we set up environment variables in our Heroku Production environment?
* We need to use the Heroku CLI
* The Heroku CLI permits us to set up environment variables on `process.env`
* **note** NODE_ENV is automatically set to "production" string on our Heroku server
  - But for all of these environment variables:
    + FIREBASE_API_KEY
    + FIREBASE_AUTH_DOMAIN
    + FIREBASE_DATABASE_URL
    + FIREBASE_PROJECT_ID
    + FIREBASE_STORAGE_BUCKET
    + FIREBASE_MESSAGING_SENDER_ID
    + FIREBASE_APP_ID

`webpack.config.js`

* ** CAUTION** If we don't set them up manually and we try to use them right here it won't work as expected
  - We will be passing invalid values to the client side JavaScript when Heroku runs Webpack

```
// MORE CODE

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

// MORE CODE
```

## So how do we do this? 
* How do we set all the stuff we have in our `.env.development ` file on our Heroku production server?
* We need to add all the stuff from `.env.development` into a command

### Let's dive into the series of Heroku commands to manage our Heroku configuration
* Shut down test suite

#### heroku config
* `heroku config` prints out all of your Heroku production server environment variables

`$ heroku config`

* This will be similar to your output

```
=== peh2-react-expensify Config Vars
```

* It just means that currently we have not custom environment variables on our Heroku server

## Let's set our first Heroku production server environment variable
* We'll use this syntax

`$ heroku config:set KEY=value`

* We just provide our Key/value pairs and plugin it in to the command above and that's how we set Heroku production environment variables on our Heroku server
* Let's actually try this out:

`$ heroku config:set KEY=value`

* You will see this output (similar):

```
Setting KEY and restarting ⬢ peh2-react-expensify... done, v5
KEY: value
```

* So we just set up an environment variable called `KEY` with a value of `value` and it will restart the app with that new variable

## Double check by running:
`$ heroku config`

```
=== peh2-react-expensify Config Vars
KEY: value
```

* Now your new Heroku production environment variable is showing up

## Remove environment variables on Heroku using the Heroku CLI
### heroku config:unset KEY (provide whatever KEY name you want to remove)
* We don't need our `KEY` environment variable as it was just an example showing how to add them so let's remove it with:

`$ heroku config:unset KEY`

* You will see this output

```
Unsetting KEY and restarting ⬢ peh2-react-expensify... done, v6
```

* And list all your current Heroku environment variables with:

`$ heroku config`

* And you will see this output which means you have no current production environment variables on your Heroku server

```
=== peh2-react-expensify Config Vars
```

* So using just these 3 variables we can manage all our Heroku environment variables
  - heroku config
  - heroku config:set KEY:value
  - heroku config:unset KEY

## We can save time by adding multiple environment variables
* **IMPORTANT!** Just separate them with spaces
* It should like similar to this:

```
$ heroku config:set FIREBASE_API_KEY=BIzaSyDUpPr5pG87V3PRpsX2VF-7QOTDsA77sv4 FIREBASE_AUTH_DOMAIN=expensify-6fd66.firebaseapp.com FIREBASE_DATABASE_URL=https://expensify-6fd66.firebaseio.com FIREBASE_PROJECT_ID=expensify-6fd66 FIREBASE_STORAGE_BUCKET=expensify-6fd66.appspot.com
```

* **tip** Working in the Terminal can be cumbersome so I recommend typing this long command in your text editor, reviewing it meticulously, make sure all new KEYs are separated by spaces and paste the final creation into the Terminal
* After submitting the above command you will have set all 6 production environment variables on your Heroku server

## Test to make sure
`$ heroku config`

```
=== peh2-react-expensify Config Vars
FIREBASE_API_KEY:        BIzaSyDUpPr5pG87V3PRpsX2VF-7QOTDsA77sv4
FIREBASE_AUTH_DOMAIN:    expensify-6fd66.firebaseapp.com
FIREBASE_DATABASE_URL:   https://expensify-6fd66.firebaseio.com
FIREBASE_PROJECT_ID:     expensify-6fd66
FIREBASE_STORAGE_BUCKET: expensify-6fd66.appspot.com
```

## Let's see where we are with Git
`$ git status`

* If you see your `.env.development` or `.env.test` we do NOT want these in our Git repo so we need to make sure we ignore them
  - **IMPORTANT** These files contain secrets
  - The whole point we broke them out into their own files was that they would not get deployed and don't get pushed up to GitHub where they could be exposed

`.gitignore`

```
// MORE CODE

.env.test
.env.development

// MORE CODE
```

## Add and commit all files 
```
$ git add .
$ git commit -m 'Setup test db environment'
```

* We push up to GitHub

`$ git push`

## Now we will deploy
* Deploying will only work now because we made sure to already have our production environment variables set up

`$ git push heroku master`

## First let's test to see if our app works in the browser
* Click on the URL in your Terminal window or `$ heroku open`
* Add an expense and see if the data is added to your Firebase development Database

## Firebase Error
`package.js`

```
// MORE CODE

  "scripts": {
    "build:dev": "webpack --env.ENVIRONMENT=development --config webpack.config.js",
    "build:prod": "webpack -p --config webpack.config.js",
    "fix-styles": "prettier-stylelint --write 'src/**/*.{css,scss}' ",
    "dev-server": "webpack-dev-server --env.ENVIRONMENT=development --open",
    "test": "cross-env NODE_ENV=test jest --config=jest.config.json --watchAll",
    "start": "node server/server.js",
    "heroku-postbuild": "npm run build:prod"
  },

// MORE CODE
```

* Remove the separate production webpack file (not needed) `webpack.config.prod.js`

## CSS hash issue
* Just going to remove it for now to get the CSS working

`webpack.config.js`

```
// MORE CODE

  // const CSSExtract = new MiniCssExtractPlugin({
  //   filename: devMode ? '[name].css' : '[name].[hash].css',
  //   chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  // });
  const CSSExtract = new MiniCssExtractPlugin({
    filename: 'main.css',
  });

// MORE CODE
```

* Add, commit push to GH and Heroku

## Make sure the development server works and also updates the same Database
`$ npm run dev-server`

* Add another expense and it should same to same Database

## Bonus - config.js for environment variables
### TODO - figure out how to use them in firebase.js
`server/config.js`

```
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  EV_PORT: process.env.PORT,
};
```

* Get more control over our environment variables
* Create it inside your `server`
* Let's update our port environment variable

`server/server.js`

```
const path = require('path');
const express = require('express');

const { EV_PORT } = require('./config');

const app = express();

// MORE CODE

app.listen(port, () => {
  console.log(
    `Server is running. You better go catch it! LOL. I am listening on ${port}`
  );
});

```

`server/config.js`

## Recap
* We just spend a lot of time (and blood, sweat and tears) setting up this object:

`firebase.js`

```
// MORE CODE

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// MORE CODE
```

* To get the above to work we had to do a bunch more things inside `package.json` and a lot inside `webpack.config.js`
* **remember** `process.env` is not something the browser usually has
  - So we had to set up this object and all of the keys (and we did that inside of `webpack.config.j`s using **DefinePlugin()**)
  - We also used the `cross-env` tool allow us to set the test environment variable for our test script
  - We used `dotenv` allowing us to load in those environment variables and actually set them up

## Next
* We'll write more test cases that rely on real data being in Firebase in order for them to work












* Deploy our app live to the web for all to see

## Heroku - Tool we'll use to deploy
* Heroku is an application deployment platform
* Similar to:
    - AWS beanstock
    - Digital Ocean
* Benefits of Heroku
    - Easy to setup
    - No need to be an IT Specialist or Server admin to set up to in order to get your apps up and running
* They have a great free tier without credit card info

## Sign up

## Existing account - Login
* We could do everything from their site but we won't
* We'll use Heroku's CLI (Command Line Interface)
    - Everything we do for our app will be done through the command line
    - When we create apps
    - When we customize our apps
    - When we push our changes up to Heroku
    - All done through the Heroku CLI

## Install Heroku CLI
* [link to Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
    - All instructions for Mac, Windows and Linux on this page
* For Mac move through it with the default installers
* Git is a requirement for Heroku but we already have that set up!

### Homebrew
* I recommend using Homebrew instead of the default installer but feel free to choose either

`$ brew tap heroku/brew && brew install heroku`

* Depending on your machine you may need to restart you machine or your Terminals
* **tip** Try it first without doing that and then if it doesn't work, do a cold reboot

## After installing - check if it works
### Check to see what version of Heroku CLI you are running

`$ heroku --version`

### Upgrade
* If you already have heroku take this time to upgrade it

`$ brew upgrade heroku`

* As of 11/28/2019 I'm running version: 

`heroku/7.35.0 darwin-x64 node-v12.13.0`

### Authenticate with Heroku
* When you are using the CLI at first Heroku has no idea who you are so you must first authenticate and then they'll let you play with their Heroku CLI tools
* To authenticate we just run a single command

`$ heroku login`

* **note** On windows you must run `$ heroku login` from the Command line and it is currently not supported in GitBash

### After logging in follow these instructions:
(these instructions assume you set up SSH - if not you will manually have to enter your user name and password from the terminal)
1. Click any key to open the browser
2. A browser window opens
3. Click `Log In` button
4. Enter your username and password
5. Click `Log In`
6. You are informed you successfully logged in
7. Close that browser window
8. Return to the Terminal
9. The Terminal will say

```
Logging in... done
Logged in as YOUR_EMAIL
```

* That's in you are authenticated with Heroku and now you can start playing with their tools

## Create an app
* Type this command in the Terminal (will only work if authenticated)

`$ heroku create`

* If you don't provide a name it will name your app some random name
* **tip** Provide your own name as it is easier to see which app you are dealing with when you have lots of apps

`$ react create react-peh2-expensify`

* **note** Choose a unique name so it will not conflict with other apps with same name

### What just happened?
* It won't do anything specific with our code
* Behind the scenes Heroku is setting up your new app
    - They are adding a new Git remote to your local repository

### What is a git remote?
* We already set up one called `origin` (and that is our GitHub account)

`$ git remote`

* Now you will see:

```
heroku
origin
```

* So now Heroku just created an additional remote repo for you
* Let that sink in for a moment:
    - You have a git remote repo located on GitHub
    - And you have a git remote repo located on Heroku

## Get more info on each remote repo
`$ git remote -v` (we are adding the `verbose` flag (-v))

* That will output something like:

```
heroku  https://git.heroku.com/peh2-react-expensify.git (fetch)
heroku  https://git.heroku.com/peh2-react-expensify.git (push)
origin  git@github.com:yoyoma/334e-expensify-app.git (fetch)
origin  git@github.com:yoyoma/334e-expensify-app.git (push)
```

* Now you see the URLS to the remote git repo's on GitHub and Heroku

## What is the purpose of our new Heroku remote Git repo?
* This is how we'll deploy

### Steps in deploying to Heroku
1. We will push our code up to the Heroku remote Git repo
2. Heroku will take that code and deploy our application with the latest

### So how can we get our app up and running?
1. Add and commit our changes
2. Push to up to that remote Heroku repo

### But... We can't do that just yet
* We have a couple of changes we need to make specifically with Heroku

#### What changes do we need to make?
1. We need to make a change to our app to let Heroku know what to do

* Currently Heroku has no idea how to start up our app
* So we need to teach Heroku how to do this
* The first thing we'll teach Heroku is how to run the Node server

#### Teach Heroku how to run the Node server
* When Heroku starts your app by default it will try to run the `start` script inside `package.json`
* Open `package.json` and you'll see we do not currently have a `start` script

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

* Without a `start` script Heroku will have no idea that to run our Express server it should run node and then go into the `server` folder and run `server.js`

#### So how do we tell Heroku to run this command?

`$ node server/server.js`

* Easy, we just add a `start` script with that instruction

`package.json`

```
// MORE CODE

  "scripts": {

    // MORE CODE

    "test": "cross-env NODE_ENV=test jest --config=jest.config.json --watchAll",
    "start": "node server/server.js"
  },

// MORE CODE
```

* **note** Don't forget that ending comma at the end of the previous line!

## Are we done? No. We need to address a port problem
* We make this change in `server.js`

### Problem - Hard coded port number
* We are currently using port 3000
* If we have something running on our machine on port 3000 we can change it to port 3001 and we are good to go
* But when we deploy this app we have no idea what port Heroku will use for our app so hard coding a port number is not an option
    - Heroku will provide a dynamic port value to your app and this is why a static value won't work

#### Solution to port issue
* Heroku provides you with an Environment variable
* This environment variable will change every single time you deploy your app (it can change and may not change but regardless we can't hard code it)

#### What environment variable does Heroku set for you?
`PORT`

* To use it `process.env.PORT`

#### How we'll use this `PORT` environment variable
* If this PORT environment variable exists that will mean we are on Heroku and we do want to use the PORT value
* Let's capture the PORT environment variable in a variable of our own

`server.js`

```
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
// Heroku port
const port = process.env.PORT; // add this line

// MORE CODE
```

### Add some logic
* If it exists we'll use PORT, if not we'll default to `3000` on our local machine

```
// MORE CODE

// Heroku port
const port = process.env.PORT ? process.env.PORT : 3000;

// MORE CODE

app.listen(port, () => {
  console.log('Server is running. You better go catch it! LOL');
});
```

### Our server is compatible with Heroku
* Heroku knows how to start our app
* Heroku knows which to listen on the port Heroku is expecting

## 2. We also now need to teach Heroku how to run Webpack
* When we created our `node_modules` folder we added it to `.gitignore` so this isn't committed to our Git repo (and this is a good thing because it is a generated folder

### Steps to generate code with Webpack
1. And it can regenerate all the dependencies by running `$ npm install`
2. Then it will go through `package.json`
3. And then use the `package-lock.json` file and grab all the dependency versions and then it will install of them
4. The same thing is true for `bundle.js`, `bundle.js.map`, `main.css` and `main.css.map` files (all of these are just generated files and they are generated when we run Webpack)
    * But we don't want to commit these files to the project
    * Why?
        - Imagine I ran in development mode and then in production mode to test things out
            + We would have different changes to our source code and that would not be idea
            + So we'll add all of those files to our `.gitignore` and that will remove them from our `Git` repository
            + But to work around that when deploying to Heroku we need to make sure that Heroku does run Webpack, otherwise when it tries to start the server up, there will be no files to access and we'll get an error

## How do we tell Heroku about Webpack
* It's a fairly easy process
* There are a couple of custom scripts that Heroku will look for as you application starts up

### There are 2 custom scripts that Heroku will look for as your app starts up
1. heroku-postbuild
2. heroku-prebuild (we won't be using this)

#### heroku-postbuild
* This will run after Heroku installs all your dependencies and this is a great place to run some commands to build
    - If you were using `grunt` or `gulp` you would put them here
    - Since we are using `Webpack` we'll put that here now

`package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "start": "node server/server.js",
    "heroku-postbuild": "WEBPACK, GRUNT, or GULP CODE HERE"
  },

// MORE CODE
```

#### heroku-prebuild
* Runs before your dependencies get installed (not very useful but know that it exists)

### What do we want to do with `heroku-postbuild`?
* We just want to run the `build:prod` command

`package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "start": "node server/server.js",
    "heroku-postbuild": "npm run build:prod"
  },

// MORE CODE
```

* With that modification the actual Webpack production build will run on our Heroku server

## Add files to ignore in .gitignore
`.gitignore`

```
node_modules
public/dist/bundle.js
public/dist/bundle.js.map
public/dist/main.css
public/dist/main.css.map
```

* But I just add the entire `dist` folder and that saves a couple of lines

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

## Now we are ready
* We can add, commit and push our changes to Heroku
* And if all goes well we should be able to view our Expensify app on the web

## Git stuff
* `$ git status` (get an overview of what changed)
    - You will see our new server file
    - And modifications to `.gitignore`, `package.json` and `package-lock.json`
* We need to add all of them otherwise Heroku won't use them in its production build of our app
* We can push to Github with `$ git push` (we don't have to specify the origin as it is setup as the default) - DOESN'T
    - If this doesn't work you first need to set `$ git push -u origin master`
    - Now all future pushed can go to GitHub with `$ git push`
* **note** We always want to push our latest code to GitHub

## Now we explicitly take our master branch and push up to Heroku remote repo
1. When we do this Heroku will detect that
2. Heroku will then go through process of deploying our application

### How do we deploy to Heroku?
`$ git push heroku master`

* **note** When we run this command it will take a little while

#### Why does Heroku take so long the first time we deploy?
* It needs to install all our dependencies
* It needs to run Webpack
* It needs to start up a our server
* Future deploys will not be as slow (as it will cache a lot of our assets)

#### What is happening on our screen as Heroku deploys?
* We are resolving Node version
* It will detect if we are using Yarn or NPM (it can detect this by looking at our application structure)
    - It will see we have a `package.json` and a `package-lock.json` file
    - It uses the `package.json` file to learn that we are using `node` and `npm`
    - Then it uses `package-lock.json` file that we are using `npm` as opposed to `yarn`
* Then it goes through the process of installing all our dependencies
* You will see Heroku runs `$ npm run build:prod` to run the production build, and then it will actually run Webpack and generate all those assets

## I get an error because I am passing an environment variable in my script
```
// MORE CODE

  "scripts": {
    "serve": "live-server public/",
    "build:dev": "webpack --env.ENVIRONMENT=development --config webpack.config.js",
    "build:prod": "webpack -p --env.ENVIRONMENT=production --config webpack.config.js",

// MORE CODE
```

* Change it to:

```
// MORE CODE

  "scripts": {
    "serve": "live-server public/",
    "build:dev": "webpack --env.ENVIRONMENT=development --config webpack.config.js",
    "build:prod": "webpack -p",

// MORE CODE
```

* Add, commit, push to GitHub and Heroku again

## webpack local vs production
* I needed 2 different webpacks so I created `webpack.config.prod.js`

`webpack.config.prod.js`

```
const path = require('path'); // to get the current path
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');

const prodMode = process.env.NODE_ENV === 'production';

module.exports = env => {
  // console.log('env', env);
  // const isProduction = env === 'production';
  console.log(process.env.ENVIRONMENT);
  const CSSExtract = new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
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
            },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins: [CSSExtract],
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },
  };
};
```

### Also update package.json
`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server public/",
    "build:dev": "webpack --env.ENVIRONMENT=development --config webpack.config.js",
    "build:prod": "webpack -p --config webpack.config.prod.js",

// MORE CODE
```

* I add and commit and push to GH and Heroku
* It will work but since I am not checking I removed check for environment FB variables, we get Firebase errors - (we will fix this soon)

## Note on heroku build
* You may see in the Terminal a super large file size like 60M
* This is not the size of your app
* This is the size of the entire local Heroku instance that is starting up
    - It contains a lot of code we did not write
    - And it contains a lot of code that is not served up to the end user
    - Its just for the backend process of starting up the heroku app

### The Terminal will spit out your live URL
* **note** On Mac OS command click links in Terminal to open link in new browser window

### Other way to open your app from the Terminal
* Using the Heroku CLI

`$ heroku open`

## Troubleshooting if Heroku doesn't show your live app
* This will dump the Heroku server logs
* If things go well you will see a lot of logs related to pages the end user requested
    - You will see all the assets being loaded from the browser 
* If these go poorly you will see a really long stacktrack

`$ heroku logs`

## Recap
* We told Heroku how to run the server
* We told Heroku how to run webpack
* Getting both tasks completed allows us to deploy our app to the web using Heroku




