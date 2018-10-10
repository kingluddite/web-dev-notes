# Remote MongoDB
* We could use a `local mongo DB` but it is actually easier to set up a remote Mongo DB (as long as you have an internet connection)
* We will create our DB and hook it up to our backend

## Sign up for a free mLab account
* [link to mLab](https://mlab.com/)
* Sign up for a free sandbox account

## Create your remote MongoDB nosql database
1. Log in to
2. Create a MongoDB deployment by clicking on the `Create new` button
3. Select `Plan Type` of **SANDBOX** and click `CONTINUE` button
4. Where do you want your DB to be located, click the closest place to you (_I will select US East_) and click `CONTINUE` button
5. Name your DB - I'll name my `peh2-they-came-before-me` and click the `CONTINUE` button
6. Check to make sure everything is FREE and then click `SUBMIT ORDER` button
7. Click on your new database (takes a couple minutes to generate

## Create a user for this database
* It is required and the username and password of this special admin user will allow you and your app to access this database

1. Click `Users` tab
    * It is mandatory to create an Admin user for our DB
    * Enter a username, password and confirm password
    * Write down and save this information in a safe location
2. After creating user **scroll up on the page** (_ imo mLab needs to improve this UX_) and copy the 2nd URI
    * The first URI is what you would use if you wanted to connect to the mongo shell

### Tell your app about your database (and do so securely!) 
* Security is important
* We have the URI information and we will save it into a file called `variables.env` and this is a file that we will hide using our `.gitignore` file
    - Open `.gitignore` and search for `*.env` this is what ignores all `.env` files from git (and github)

#### Never save API keys with Git
* Why? They can easily be accessed and maliciously used by coders with bad intentions
* In order to use this file we have already installed the `dotenv` npm package

`variables.env`

```
MONGO_URI=mongodb://<dbuser>:<dbpassword>@ds219672.mlab.com:19672/peh2-they-came-before-me
```

* Replace `<dbuser>` and `dbpassword` with your username and password

```
MONGO_URI=mongodb://admin:a12346@ds219672.mlab.com:19672/peh2-they-came-before-me
```

### Let our app know about our `.env` file
`server.js`

```
const express = require('express');
require('dotenv').config({ path: '../variables.env'}); // add this

const app = express();

// MORE CODE
```

* We are not using `dotenv` anywhere else in `server.js` so we don't need to store it in a variable
* Just pointing to where that file is lets us access the secure information inside it by using `process.env` + `SOME_CONSTANT_VARIABLE_NAME_INSIDE_VARIABLES_ENV`

### Mongoose
* Connect our app's backend to `mLab`
* We'll do this using a package called `mongoose` (_which we've already installed_)
* We can now user our `MONGO_URI` varables we set in `variables.env` so we can use `Mongoose` to connect to our **remote Mongo DB on mLab**
* We access environment variables using `process.env`
* We'll `connect` or **throw an error**

`server.js`

```
const express = require('express');
const mongoose = require('mongoose'); // add this
require('dotenv').config({ path: 'variables.env' });

const PORT = process.env.PORT || 4444;

// connect to db (add these lines)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const app = express();

// MORE CODE
```

## Run your app
`$ npm run dev`

* If all is well you will see DB connected in terminal

## Houston we have a problem!
* We get an error `missing script dev`

### Solution - Add nodemon and a npm script
* We already installed `nodemon`
    - `nodemon` will save you time as you won't have to keep restarting your server after you make changes, once `nodemon` is installed and running it will automatically restart your server each time you make a change to your code

* Add your `dev` script

`package.json`

* This code needs to be placed in your root app's `package.json`

`/package.json`

```
// MORE CODE
"scripts": {
  "precommit": "pretty-quick --staged",
  "server": "nodemon server/server.js",
  "client": "cd client && npm start",
  "dev": "concurrently --names \"server,client\" \"npm run server --silent\" \"npm run client --silent\""
},
// MORE CODE
```

## Run your app
`$ npm run dev`

* We get an error that `concurrently: command not found`
* This is because we installed it inside teh server folder and we need to uninstall it from there and install it into the root of our project

`$ cd server && npm uninstall concurrently`

* Go up one directory and install concurrently

`$ cd ../ && npm i concurrently`

## Run your app again
`$ npm run dev`

* If all is well you will see `DB connected` in terminal
* If you see this, this is great news because we are connecting to a remote MongoDB located on mLab
* Our environment variables are secure and we can use them to connect to our remote db

### Two Servers will be running
* So the `concurrently` package lets us run both the `client server` (webpack dev server built in with create react app) and the server server in the same terminal window
  - We haven't installed React yet so only one server is running
* But you should know that when you type `$ npm run dev` it is running this script `$npm run server` in the `server` directory which will start the express server by running `$ nodemon server/server.js` which has nodemon running always and will restart the server whenever you save changes to server files
* It will then run `$ cd client` to jump into the `client` folder and run `$ npm start` which will start the react developer server (webpack dev server)

## Another error
* `DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.`
* You may or not get this error

### Solution to getting rid of errors
* [Source of solution](https://github.com/Automattic/mongoose/issues/4135)

`server.js`

```
// MORE CODE

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });

// MORE CODE
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add MongoDB`

## Push to github
`$ git push origin add-apollo`

### Additonal Resources: Difference between `require` and `import`
* JavaScript introduced a great way to compartmentalize JavaScript. In the pass you had to use [IFFE](https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript) statements but now you can use **import** and **export**
* But you will also see we are using **require** and this is often a point of confusion with people learning JavaScript
* Currently, on the server side, `import` does not work so we need to use the older way to import JavaScript and that is `require`
* `require` is from **NODE JS**
* [Read more](https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export) about `import vs require`
