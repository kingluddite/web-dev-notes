# Mongoose Error Handling Part 2
* We previously dealt with our error for a **bad object `id`** (inside of our error handler)

## Let's handle more Mongoose errors
* duplicate field
* validation errors

### Postman saving HTTP requests
* Close all Postman tabs
  - You save your requests and if you change them to test something new, close that tab and you'll get a fresh copy of when you saved it
    + So if you save a GET bootcamp request, that was saved with one `id` (to test that request you may put in a different `id` but if you close and don't save as that request, it will open with your original `id` in the bootcamp you want to get)

### Lets first look at the entire error object
* We can just log it out
* You can see what properties you have access to to use for error handling

### Let's deal with duplicate field
* Add a duplicate bootcamp using Postman
  - Open the Create a bootcamp request and create a duplicate bootcamp
* We just get standard 500 error and standard message because in our controller we're just calling `next(err)` in catch `controller/controller-bootcamps.js`

#### Here is your postman client side error
```
{
    "success": false,
    "error": "E11000 duplicate key error collection: ics.bootcamps index: name_1 dup key: { name: \"Devworks Bootcamp\" }"
}
```

* And you'll see this on the server

```
MongoError: E11000 duplicate key error collection: ics.bootcamps index: name_1 dup key: { name: "Devworks Bootcamp" }
    at Function.create (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/core/error.js:51:12)
    at toError (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/utils.js:149:22)
    at /Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/operations/common_functions.js:265:39
    at handler (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/core/sdam/topology.js:913:24)
    at /Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/cmap/connection_pool.js:356:13
    at handleOperationResult (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/core/sdam/server.js:493:5)
    at MessageStream.messageHandler (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/cmap/connection.js:272:5)
    at MessageStream.emit (events.js:314:20)
    at processIncomingData (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/cmap/message_stream.js:144:12)
    at MessageStream._write (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongodb/lib/cmap/message_stream.js:42:5)
    at writeOrBuffer (_stream_writable.js:352:12)
    at MessageStream.Writable.write (_stream_writable.js:303:10)
    at TLSSocket.ondata (_stream_readable.js:714:22)
    at TLSSocket.emit (events.js:314:20)
    at addChunk (_stream_readable.js:304:12)
    at readableAddChunk (_stream_readable.js:280:9)
```

* Here is the code in the controller where we tap into our custom error

```
// MORE CODE

exports.createBootcamp = async (req, res, next) => {
  try {
   
   // MORE CODE

  } catch (err) {
    next(err); // this is the error that is getting triggered
  }
};
// MORE CODE
```

* We could put in our new `error` response in the **catch** and customize the **status code** and whatever else we want
  - But we want all of our catches to just have `next(err)`
    + And then we'll do the handling in one place (the error handler)

### We can check for a code `11000`
`error.js`

```
// MORE CODE

// Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }
// MORE CODE
```

* Enter a duplicate bootcamp and you'll get the `Duplicate field value entered` with a 400 Bad Request status sent in response

#### Now our error is easier to see and use:
```
{
    "success": false,
    "error": "Duplicate field value entered"
}
```

* Server shows us the full error and stacktrace

## Now let's test for validation errors
* In Postman Post pass an empty object as the body and `Send`
* You'll get this error: `Bootcamp validation failed: address: Please add an address, description: Please add a description, name: Please add a name`
* Look at error object and you'll see we have an array of error objects

### How do we get all the errors and map them to each validation error?
We first check for `err.name === 'ValidationError'`

`error.js`

```
// Mongoose validation error
  if (err.name === 'ValidationError') {
    console.log('yes we have a validation error');
  }
```

* Post an empty body object and you'll get `yes we have a validation error` in terminal

#### Now we need to write our message
* We'll use some JavaScript to extract our message
    - `const message = err.errors`
        + Remember that `errors` in `err.errors` is an ***array of objects***
            * It has a bunch of different fields in each object and we just want the message
            * We can just get the values with `Object.values(err.errors)`

```
// MORE CODE

// Mongoose validation error
  if (err.name === 'ValidationError') {
    const test = Object.values(err.errors).map(val => {
      console.log(val.message);
    });
    console.log(test);
  }
// MORE CODE
```

* That will give us these values in terminal:

```
Please add an address
Please add a description
Please add a name
[ undefined, undefined, undefined ]
```

* Also log out the `err` with `console.log(err)` and you'll see that 

## And now we pull out each message and pass to our custom error handler middleware ErrorResponse

```
// MORE CODE

// Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }
// MORE CODE
```

* Send a Post request with an empty object and you'll get a 400 Bad Request with:

```
{
    "success": false,
    "error": "Please add an address,Please add a description,Please add a name"
}
```

* And with React we can use this info to create a bulleted list of stuff that needs to be filled out in form

## If you pass a field that is required your response error updates
```
{
    "name": "test name"
}
```

* Great you no longer need to pass a name
* But you still need to pass the other required fields:

```
{
    "success": false,
    "error": "Please add an address,Please add a description"
}
```

## This let's you track all the errors yourself
* This is one choice for error handling 
* We implemented validation without having to use any 3rd party validation package (in Mern stack course we use the [Express validator](https://express-validator.github.io/docs/))
    - Which one is better? You decide but with what we just accomplished it is one less 3rd party dependency you need and you can handle all errors on your own
    - We can catch whatever errors we want in our custom error handler and if you want to explicitly set an error from your controller
        + You just `new ErrorResponse('some custom message', set some status code)` 

## Next
* Add another custom middleware for asynchronous calls so that we don't have to do a try catch in each of our controller methods
    - This will really clean up our controllers
    - And since all of our errors are `next(err)` we can create a wrapper to easily handle async calls
