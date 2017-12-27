# Create Separate test database
* We create a side db used alongside our TodoApp DB specifically used to test

## Running our app locally vs running test suite locally
`mongoose.js`

* Currently we have two options
    - We use the MONGODB_URI variable
    - Or we use a local string
        + The string is used for both:
            * testing
                - When we run our test script
            * development
                - When we run our app locally

## How can we set environment variables locally
* `process.env.NODE_ENV`
    - Special environment variable
    - This variable made popular by Express library
    - But now it has been adopted by an Node hosting company
        + Like... Heroku
            * They set `process.env.NODE_ENV` === 'production' by default

## We will have 3 environments
* Production ---> Heroku
    - process.env.NODE_ENV === 'production'
* Development
    - process.env.NODE_ENV === 'development'
* Test
    - When we run our app through mocha
    - process.env.NODE_ENV === 'test'

### Benefit of this setup
* We'll be able to setup a different value for MONGODB_URI for all 3 environments and creating a separate test DB

`server.js`

```js
const env = process.env.NODE_ENV;

// MORE CODE
```

* NODE_ENV is currently ever set on Heroku
* environment variables are used for more than just node
* Common that 24 or more environment variables are on your computer right now
    - where certain programs exist
    - what version of libraries you want to use
* We'll configure NODE_ENV inside `package.json` for our testing and development environments
    - We'll add conditional logic to config app depending on environment

`package.json`

```
// MORE CODE
"test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**/*.test.js",
// MORE CODE
```

* This code works on Linux, Windows and OSx

`server.js`

```js
const env = process.env.NODE_ENV || 'development';
```

* We set NODE_ENV to **development** by default
    - If we are on production this will be set to production
    - If we are on test this will be set to 'test'
    - If we are on development, this **won't** be set and so then we'll use **development**

## Set up conditionals to determine current environment
* Update `mongoos.js` from:

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'
);

module.exports = { mongoose };
```

* To this:

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };
```

### Set up conditionals
`server.js`

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

const _ = require('lodash');
// MORE CODE
```

* We also set up a log to let us know which environment we are in

`$ node server/server.js`

* As startup you will see `env **** developement`

## Play around with it in Postman
* Open local postman GET
* You will see a couple test records
* Change the text on firt document
* Than we we look at the code inside test, it won't have changed as it holds our old data
* Grab the id and use path to change the id and click send to update our document
* Shut down server
* Then run `$ npm test`

### Test server running
* At top you'll see `env ***** test`
* All tests run
* True test about our test db works is if we try to start up the server again and we try to fetch our data from the development db
* You should see the db wasn't updated
* Even though our test suite did run, it isn't wiping our db anymore, it is wiping our test database
* Robomongo shows both dbs

![new test db](https://i.imgur.com/2BRTdEo.png)

## Organize better
* Cut code and paste into `server/config/config.js`

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
```

* Point to that file:

`server.js`

```js
const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
```

## Git stuff
`$ git add .`

`$ git commit -m 'set up separate test and development envs`

* Push to heroku

`$ git push heruko master`

## Test remote GET on Postman

