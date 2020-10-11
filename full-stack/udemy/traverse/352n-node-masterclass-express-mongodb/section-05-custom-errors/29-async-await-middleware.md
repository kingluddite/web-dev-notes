# Async/Await Middleware
## DRY
* Clean up our code
* We have lots of `try/catch`

## What is callback hell?
* Here is an example:

```
// Verifying a user using callbacks
const verifyUser = function(username, password, callback){
   dataBase.verifyUser(username, password, (error, userInfo) => {
       if (error) {
           callback(error)
       }else{
           dataBase.getRoles(username, (error, roles) => {
               if (error){
                   callback(error)
               }else {
                   dataBase.logAccess(username, (error) => {
                       if (error){
                           callback(error);
                       }else{
                           callback(null, userInfo, roles);
                       }
                   })
               }
           })
       }
   })
};
```

## Here are promises
```
// Verifying a user with promises
const verifyUser = function(username, password) {
   database.verifyUser(username, password)
       .then(userInfo => dataBase.getRoles(userInfo))
       .then(rolesInfo => dataBase.logAccess(rolesInfo))
       .then(finalResult => {
           //do whatever the 'callback' would do
       })
       .catch((err) => {
           //do whatever the error handler needs
       });
};

// Here you must implement `database.verifyUser`, `database.getRoles`
// and `database.logAccess` as promises, i.e:
const getRoles = new function (userInfo) {
   return new Promise((resolve, reject) => {
       database.connect()
           .then((connection) => connection.query('get roles sql'))
           .then((result) => resolve(result))
           .catch(reject)
   });
};
```

## And here is async/await
```
// Verifying a user with async/await
const verifyUser = async function(username, password){
   try {
       const userInfo = await dataBase.verifyUser(username, password);
       const rolesInfo = await dataBase.getRoles(userInfo);
       const logStatus = await dataBase.logAccess(userInfo);
       return userInfo;
   }catch (e){
       //handle errors as needed
   }
};

// Here we use the same `database.verifyUser`, `database.getRoles`
// and `database.logAccess` implementation based on promises
```

* The `async/await` notation is more clear
* It visually looks like a sequential set of imperative sentences
    - But with the added benefit of JS asynchronous programing

## Notes on async/await
* When you use `async/await` you are responsible to handle errors at the point you desire
* In the previous example we could also write:

```
// MORE CODE

async function run() {
  try {
    const userInfo = await verifyUser();
    // Do something with the info
  } catch (error) {
    // Do whatever
  }
}
// MORE CODE
```

* **Note**: There is nothing new, the same way we need to use `.catch()` for promises

## Middleware
* Express is one of the most popular `Node.js` frameworks
* Express adds the concept of middleware
* Given an HTTP request (also the response) we can imagine a pipeline to traverse, where on each step a task is made like:
    - check request is authenticated
    - parse body and “inject” as an extra param in the request
    - check params are right
    - do some business logic, etc.

![HTTP req res with Express JS](https://i.imgur.com/Rixgqqq.png)

* **GOOD TO KNOW** In Express, `middleware` is nothing more than a callback function that receives three params: 

## The Three parameters middleware requires
```
function middleware (request, response, next) {}
```

* You'll most likely see it written like:

```
function middleware (req, res, next) {}
```

* `request` (req): Reference to the object representing the HTTP request
    - We use it to get any data associated to the request: 
        + `body`
        + `url`
        + `headers`
        + etc.
* `response` (res): Reference to the object representing the HTTP response
    - We need it to write a response:
        + `response code`
        + `body`
        + `headers`
        + etc.
* `next`: Callback we need to execute if we want to continue the pipeline of middlewares

### Here is an example
```
const require = require('express');

const app = express();

app.get('/hello', (req, res, next) => {
  response.status(200).end('This is a not async/await middleware')
});
```

## How to use async/await functions as middleware
* Simply remember to handle async/await errors

### NEVER EVER EVER EVER DO THIS!
```
// NEVER DO THIS !!!
app.get('/hello', async (req, res, next) => {
  // Some code here
});
```

* Because if for some reason the code inside the `async` function fails
    - It will throw the error to the caller function (which is Express JS) and **it will never be handled!**

## This is the correct way to handle errors
```
// DO THIS !!!
app.get('/hello', async (req, res, next) => {
  try {
    // Do something
    next();
  } catch (error) {
    next(error);
  }
});
```

* Inside the middleware we make some actions:
    - And if things goes well:
        + We invoke the `next` middleware
    - And if things go bad:
        + We `catch` the error and invoke the `next` middleware with the error (this way Express JS) will detect and handle the error

## Apply the DRY
* You will have a lot of `try/catch` which is a lot of repeating, which is a lot of repeating, which is a lot of repeating (lol)
    - Stop! We need to make our code dry
    - One thing we can do to avoid repeating the `try/catch` code on each and every `async` **middleware** is write one in a high order function (HOC)

```
// HOC example
const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)
```

* The `asyncHandler` receives a function and returns a function with **three** input `params` (oh wait!!! that’s like a middleware function)
    - This new function is responsible to executes the original function passing the three params and catching any error
* Now we can rewrite our `asynchronous` middlewares like:

```
app.get('/hello', asyncHandler( (req, res, next) => {
  // Some code here. Any error will be caught (catch) and pass to Expressjs
}) );
```

* [source for this async-await article](https://web.archive.org/web/20191005035733/http://www.acuriousanimal.com/2018/02/15/express-async-middleware.html)

## Now we'll apply that to our code
* We just cut and past the DRY HOC into `middleware/async.js`

`async.js`

```
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler; // make sure you export so we can use it in other files
```

## We import and wrap it like this:
* Here is the controller before using a try/catch

### Before we add it:
```
// MORE CODE

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`No bootcamp found with id ${req.params.id}`, 400)
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};
// MORE CODE
```

* And look how much cleaner our controller is when we use the HOC wrapper

## After we add it
```
// MORE CODE

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp found with id ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});
// MORE CODE
```

* Do it for the other controllers that are using try/catch

### Here is the final file
`controller-bootcamps.js`

```
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async');

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp found with id ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
};

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp found with id of ${req.params.id}`, 400)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
```

* **note** You only need to add this asyncHandler if you are doing asynchronous operations

## Test to make sure it all works as it did before
* getAllBootcamps in Postman
* getSingleBootcamp and see if errorHandler still works
    - add characters onto `id` in URL
        + We should still get our 404 not found status
        + And it should still go through our `errorHandler`
            * It is looking at the err.name (from error.js) and spitting out that error message with a 404
* createBootcamp
    - Make sure duplicate key is still working
        + Send a dupe via Postman
            * Should get a 400 Bad request
            * error is Duplicate field value entered
    - Send an empty object to see if validation errors fire
        + Should get a 400 response status with all our validation error messages for each required field

### All of the above was to refactor and clean up our code 

## Next
* Mongoose has its own set of middleware that it can fire off when you save something in a certain model
    - Examples
        + Create a slug
        + Convert a string address to it into a GeoJSON Point
        + Inside models
