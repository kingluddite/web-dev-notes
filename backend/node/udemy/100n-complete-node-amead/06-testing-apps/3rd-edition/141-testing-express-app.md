# Testing Express App
* We'll write test cases that interact with our Express API
* Our test cases will make requests to the various endpoints
    - Then we can make assertions to make sure they work as expected
    - Example:
        + So If I want to write a test case to make sure I log in successfully:
            * I can expect I get a 200 back with an authentication token in a response
            * I can also make a test case to make sure when the credentials are invalid, I don't get logged in

## Houston we have a problem
* Out test cases are about to load in files in the `src` folder related to our app
* That would be a problem because those files depend on environment variables existing and they don't
    - We only load in our config/dev.env when we run the dev script in package.json
        * Currently we are not loading any configuration in our test script
        * **IMPORANT** We need to make sure we supply a set of environment variables to jest when it runs so our test cases can actually start up the app server and make requests to it
        * To do this we'll create a separate `test` environment to set up those environment variables 

## Why do we need a separate test Database?
### Why not just load our `dev.env` for our test cases?
* The answer is our Database (the value for MONGODB_URL)
    - Currently, the dev environment is interacting with this Database on our local MongoDB server
    - We don't want the test environment to also use that because the test environment is going to populate the Database with seed data (dummy data that the test cases can use to do things like test log in)
        + And it will be running test cases over and over again so it will be wiping the Database setting up that seed data and running a test case
        + And if it's doing that for our Dev database it will make it hard for us to actually use the API in Postman as we're setting up new routes
        + So we'll just bring our entire config file over but we'll append `test` to the end of our mongodb URL

`config/test.env`

```
// MORE CODE

MONGODB_URI=mongodb://127.0.0.1:27017/task-manager-api-test

// MORE CODE
```

* Now when we run that test script we want to make sure that config file is loaded 

## Environment variables
* We can make this change:

`server.js`

```
// MORE CODE

// Define port remotely and locally
const PORT = process.env.PORT || 4000;

// MORE CODE
```

* To this:

```
// MORE CODE

// Define port remotely and locally
const PORT = process.env.PORT;

// MORE CODE
```

* We can do this because we add this to our config:

`config/config.env`

```
// MORE CODE

PORT=4000

// MORE CODE
```

* Make sure to add PORT= to your production .env
* And add it to `test.env`
* Now locally we'll use port `4000` and in test we'll use port 4000 and in production we'll use port 4000

## Setting environment variable is huge pain
* Because each OS has a different way to get that done
* We'll use an NPM module that allows us to get this done in a cross-OS compatible way
    - This means your project will work on linux, linux distributions, windows and mac

## env-cmd
* [env-cmd docs](https://www.npmjs.com/package/env-cmd)
* What does it do?
    - This npm module will load in the environment variables we defined in that env file and then it will make sure it is available to our Node.js app
* **note** We only need this module locally on our machine
    * We won't need this in production

### Install env-cmd
`$ npm i env-cmd -D`

* You can remove `dotenv` from your app

`server.js`

```
// MORE CODE

const dotenv = require("dotenv");

// MORE CODE

// Load environment variables
dotenv.config({path: "./config/config.env"});

// MORE CODE
```

`$ npm uninstall dotenv`

## Note
* If you cane your .env value it will not automatically be detected
* `env-cmd` only runs once right away
* This means you need to restart your program every time you change your .env files

## Let's set our environment variables for our test.env
`package.json`

```
// MORE CODE

  "scripts": {
    "start": "NODE_ENV=production node server",
    "dev": "env-cmd -f ./config/config.env nodemon server",
    "test": "env-cmd -f ./config/test.env jest --watch"
  },

// MORE CODE
```

## Store our Jest configuration
* We'll store this in `package.json`
* It will be an object that will store our Jest configuration
    - When working with Node.js the only thing we really need to set is what's referred to as `testEnvironment`

`package.json`

```
// MORE CODE

  "jest": {
    "testEnvironment": "node"
  },

// MORE CODE
```

* There are lots of things we can configure in our Jest environment
* [configuring Jest docs](https://jestjs.io/docs/en/configuration)

## testEnvironment
* This is the only thing we need for the jest environment
* The default testEnvironment is "jsdom"
    - [docs for testEnvironment](https://jestjs.io/docs/en/configuration#testenvironment-string)
    - jsdom is a development environment similar to what you'd see in the browser (so by default jest assumes you are testing browser based JavaScript)
    - We change the value to `node` to use a node environment for our test cases

## Now we are ready
* Jest is all set up and it's ready to start up our app and connect to it making queries to the API from our test cases

