# Environmental Variables
We are building our project on Express

## What is Express?
Fast, unopinionated minimalist web framework for `Node.js`

* Un-Opinionated and minimalist
    + Doesn't do much by itself
    + So we pick and choose pieces of the **node** ecosystem we want to use in order to make things work
    + Comes `batteries not included`
* Express Session will manage sessions
* We'll use Mongoose to work with MongoDB database
    - Mongoose is a nice interface for MongoDB

## /app.js
* Lots of stuff inside here
* We'll learn about everything in this file as we build our app

### package.json
* Notice this part of `package.json`

```
// more code
"scripts": {
    "prod": "node ./start.js",
    "watch": "nodemon ./start.js --ignore public/",
// more code
```

### Our Entry Point - `/start.js`
* `production` and `watch` point to `start.js` as our **entry point**

## `/start.js` 
### What does `start.js` do?
* Imports `mongoose` - we use this to interface with our `mongodb`

## Make sure Node is >= the version we need to use async-await
* If check -> make sure we are on node 7.6+
    - (_totally optional - can delete if you want_)

```js
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
  process.exit();
}
```

## Environmental Variables
* This is where you store your sensitive information
    - passwords
    - usernames
    - logins
    - API keys
    - tokens
* anything you need to keep safe

### variables.env
**Q:** Why don't we just keep this in a `.txt` file?
**A:** This info should NEVER go into your Git repo because this info is based on the environment you are on

* You will also have a `variables.env` file on your server
    - It might be named `production`
        + Your Database will be different
        + Your mail server will be different
        + API keys

### The `dotenv` package
Takes all stuff inside `variables.env` and enables us to access it via `process.env.NAMEOFVARIABLEWENEED`

`start.js`

```js
// more code
require('dotenv').config({ path: 'variables.env' });
// more code
```

* Make sure you renamed this to be: `variables.env`

### mongodb instance connection info
We don't want to use this:

`mongoose.connect('mongodb:...')`

* Because that will `change depending on our environment` so we use this instead:

`start.js`

```js
// more code
mongoose.connect(process.env.DATABASE);
// more code
```

* And if you open `variables.env`
    -You'll see our DATABASE variable which will look something like:

`DATABASE=
mongodb://coolguy:abceasyas123@ohyeah.mlab.com:0u812/awesome`

* We used this info to connect to Compass (_our GUI for MongoDB_)

### We use ES6 Promises in Mongoose
* ES6 vs ES5
    - Why we are using ES6 in this project
* You could use External Libraries like [bluebird](http://bluebirdjs.com/docs/getting-started.html)
* But we will use the built-in ones so we can use **async-await** so that is why we need `mongoose.Promise = global.Promise;`

### Show errors when we have them

```
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
```

### require `./app`
* We finally require `./app` which is our application
* And then we start the server

### Install all our dependencies/dev-dependencies
You need to install all the packages first with:

`$ npm install` or `$ yarn install`

* Will take 5 to 10 minutes depending on your connection
* We are installing a lot of stuff

### Start the server

`$ npm start` or `$ yarn start`

#### Yarn issues with node-sass
* `$ yarn add --force node-sass`
* `$ npm rebuild node-sass`
* `$ yarn install --force`
* `$ yarn cache clean`
* Remove and reinstall `node_modules`

## Running Scripts
* Look inside `package.json` and you see all the **scripts**
* Any time you type:

`npm` + **one of the script names** ----> you will execute the value on the write of the script key

So `$ npm start` will execute: 

`$ concurrently \"npm run watch\" \"npm run assets\" --names \"💻,📦\" --prefix name`

**note** `$ npm start` will also call other scripts `watch` and `assets` and the will also execute **concurrently**

#### What all this means
* We kick off a node process and start on `./start.js`
* And we'll use a package call `nodemon` (_monitors our files and any time there is a change to one of our JavaScript files, it will shut down and restart the server again_)
* Then we run `assets`
    - This is just for our CSS and our client side JavaScript
    - Nothing to do with **backend**
    - Just there to compile our Sass into CSS
    - And compile our **frontend** JavaScript into a `bundle.js` for us

### After we run our server
* We'll see **logs** that <u>come from our computer</u> (_coming from our node Application_)
* And **log** that <u>comes from box</u> (_logs that come from our webpack Application_)
* We should see our server is running on **port** `7777`

[http://localhost:7777/](http://localhost:7777/)

* Will show us `Hey! It works!`
