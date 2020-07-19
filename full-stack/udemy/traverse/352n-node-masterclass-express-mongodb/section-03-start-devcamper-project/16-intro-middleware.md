# Intro to Middleware
## What is middleware?
* Middleware is a function that has access to the request/response cycle (and runs during that cycle)
    - Example:
        + You can set `request` variables **req**

## Create a very simple logging middle
* As an example

`server.js`

```
// MORE CODE

const app = express();

// Simple middleware example
const logger = (req, res, next) => {
  req.greeting = 'Hello from Middleware';
  console.log('Middleware ran!');
};
// MORE CODE
```

* **note** All middleware functions take 3 arguments `req`, `res` and `next`
* We will set a value on the request object (req) that we can then access on any routes that COME AFTER THIS middleware

### Don't forget to call `next()`
* **note** In every middleware that you run you need to call `next()` in the body of the middleware function

`server.js`

* Calling `next()` lets the method know it needs to go to the next piece of middleware in the cycle

```
// MORE CODE

const app = express();

// Simple middleware example
const logger = (req, res, next) => {
  req.greeting = 'Hello from Middleware';
  console.log('Middleware ran!');
  next(); // add this line to call next() function
};
// MORE CODE
```

## IMPORTANT! You can never use middleware unless you use `app.use()` method
`server.js`

```
// MORE CODE

const app = express();

// Simple middleware example
const logger = (req, res, next) => {
  req.greeting = 'Hello from Middleware';
  console.log('Middleware ran!');
  next();
};

app.use(logger);
// MORE CODE
```

### Now make a request on Postman
* Start server `$ npm run dev`
* You get 200 server status
* You will see `Middleware ran!` in Terminal

#### req.greeting
* We added this property onto our request object and we now have access to it on any route
* We'll add it onto our getBootcamps controller method

### Woops I need to change the structure of the object I'm passing my controllers
* Was this:

```
// MORE CODE

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Show a bootcamp' },
    error: null,
  });
};
// MORE CODE
```

* Needs to be this:

```
// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Show a bootcamp',
    error: null,
    greeting: req.greeting,
  });
};
```

* Update all the others and file should look like:

`controller-bootcamps.js`

```
// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Show a bootcamp',
    error: null,
  });
};

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
    error: null,
    greeting: req.greeting,
  });
};

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Create a bootcamps',
    error: null,
  });
};

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update a bootcamp with ${req.params.id}`,
    error: null,
  });
};

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete a bootcamp with ${req.params.id}`,
    error: null,
  });
};
```

## Access our middleware method
* We use GET to `localhost:5000/api/v1/bootcamps/` route in Postman and we get this in our response:

```
{
    "success": true,
    "msg": "Show all bootcamps",
    "error": null,
    "greeting": "Hello from Middleware"
}
```

* **note** We can see `greeting` with our log from that middleware method we just created

### VERY COOL
* By setting this value on our request object we now have access to it in all of our routes
* Remove `greeting: req.greeting,` from controller-

### Think about this with authentication middleware
* When we build our authentication middleware:
    - We are going to validate a `token` that is sent in
    - And if that token validates
    - Then we are going to set a `user` on our req object `req.user`
        + And that user will come from the Database (and that will be the currently logged in user)
        + And then we can use that user object within our controller methods to do what we need to do
        + THIS IS EXTREMELY POWERFUL!

## Modify our Logger
* We'll make our logger do something useful
    - Every time we log we'll output:
        + the request method (GET, PUT, DELETE, PATCH, POST)
        + the protocol HTTP HTTPS
        + the host
        + the URL

### Make are request via Postman
* And your logger will output this in Terminal
    - Because we `app.use()` we have access to all routes and we'll get this log for every route we hit (but it will show the log information just for that route)

```
GET http://localhost:5000/api/v1/bootcamps/
```

* Now we have custom logging middleware

## BEST PRACTICE: Keep `server.js` as clean as you can
* We'll create a folder called `middleware` and inside create `logger.js` and add the code we just created

`middleware/logger.js`

```
// @desc    Logs request to console
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );

  next();
};

module.exports = logger; // gives us access to this method in other files
```

## Import and use middleware
`server.js`

```
const express = require('express');
const dotenv = require('dotenv');

// custom logger
const logger = require('./middleware/logger');

// Route files
const bootcamps = require('./routes/routes-bootcamps');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(logger);
// MORE CODE
```

* Works just like it did before but we cleaned up our `server.js`

## Morgan is better logger
* We'll delete our custom logger and use a 3rd party logger that is more comprehensive

### Install morgan
`$ npm install morgan -D`

* Delete our custom logger from the `middleware` folder

`server.js`

```
// MORE CODE

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Route files
const bootcamps = require('./routes/routes-bootcamps');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(morgan('dev'));
// MORE CODE
```

* It works the same but has more info when you hit an API endpoint

### Only run morgan in development environment
* `morgan()` is a function that takes many options, we'll just pass in `dev` and we'll only run in our development environment

`server.js`

```
// MORE CODE

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// MORE CODE
```

* You will see morgan gives us:
    - It has the method (DELETE)
    - It has the URL `/api/v1/bootcamps/1`
    - It also has the response status code `200`
    - It also has the time `3.454 ms`
    - We could easily custom build this but morgan is light and super easy to set up and use

## Next - Organizing Postman
* We'll save our routes to test in an environment inside Postman collections with all of our requests
    - Later on we're going to create documentation from it
