# Testing Express App part 2
* We'll use Jest to test an endpoint

## Two ways to do this
1. Start up Express server on your port
2. Then use a HTTP request library to make real requests to our API from code
3. Then make assertions about their response seeing if it is correct or not

## But there is a better way - Supertest
* Was created by the Express team
* It makes it even easier

## Supertest example
* Here is an entire example creating an Express app
    - And making a request to it
    - And asserting something about the response
```
// We load in both express and supertest
const request = require('supertest');
const express = require('express');

// Define an express app 
const app = express();

// Set up a single route 
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

// Now we use the supertest library loaded above (request) to make
   // a request to the endpoint 
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
```

## Why is supertest useful?
* [supertest docs](https://www.npmjs.com/package/supertest)
* **note** We never make a call to `app.listen()` and it still works
    - supertest doesn't need your server to be up and running
    - All it needs it the express app itself (even if it is not running) and it can use that to fire off any of the requests that you are trying to test
    - This will be great for us when we are testing from Jest

## Install supertest
`$ npm i supertest -D`

* Bring in supertest

```
const request = require('supertest');
```

* Above is the common naming convention for bringing in supertest
    - You can change it but why?

## Now we need to do is get access to our Express app
* **IMPORTANT** But we don't want listen to be called!
    - We just want the express app before listen is called

### We need to refactor
* We need to restructure things across two files so we can get the Express app without calling `app.listen()`
* We'll create a sibling file for `server.js` called `app.js`
    - This is where the express app will get set up and exported, then our test suite can load it in and `server.js` will also be able to load it in (just so it can call listen)

`app.js`

* We load in the express app
* We define our port
* Then we call listen

```
const app = require('./app')
// Define port remotely and locally
const PORT = process.env.PORT;

// Server is listening now
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
```

* We remove PORT code because it is unnecessary
* We remove our `app.listen()` code

## Now how do I start the server up in development mode?
* Same as before

`$ npm run dev`

* Test to make sure it works as it did before

## When I want to load in the app strictly for testing purposes
* Just grab it from `app.js`
* And now we can use supertest without invoking the `app.listen()` express method
* **note** We did not change the functionality at all we just refactored

## Let's use supertest
`tests/user.test.js`

* Now with the 2 lines in place below we'll now be able to make requests to our express app from our test cases

```
// MORE CODE

const request = require('supertest');
const app = require('../app');

// MORE CODE
```

* Now let's write our first test

`tests/auth.test.js`

```
const request = require('supertest');
const app = require('../app');

test('Should signup a new user', async () => {
  await request(app).post('/api/v1/auth/register').send({
    "name": "Johnny Test",
    "email": "jane@example.com",
    "password": "123456",
    "role": "user"
  }).expect(201)
})
```

* You'll see it works
* But if you try again we get an error
* Look in Compass to see you are adding data
    - We are looking into the localDB

## Houston we have a problem!
* We want to create a document in our Database but then be able to delete it (tear it down) after we create it
* We want to wipe the data in our Test Database before every test
* We need to set up some code to tell Jest that it should be wiping data and setting up specific data before the test cases run
    - Our test cases shouldn't work once and then fail the second time because of what the previous run of the test did to the Database
    - Everytime our test case runs the Database should be deleted
    - **note** We'll also set up data in our test Database to start with so we can test things like the ability to log in or update a profile
