# Mongoose Error Handling Part 2
* We previously dealt with our error for a bad object id (inside of our error handler)

## Let's handle more Mongoose errors
* duplicate field
* validation errors

### Postman saving HTTP requests
* Close tab and reopen new tab (this will show you what was saved)

### Lets first look at the entire error object
* We can just log it out
* You can see what properties you have access to to use for error handling

### Let's deal with duplicate field
* Add a duplicate bootcamp using Postman
* We just get standard 500 error and standard message because in our controller we're just calling next(err) in catch `controller/controller-bootcamps.js`

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

* We could put in our new error response in the catch and customize the status code and whatever else we want but we want all of our catches to just have `next(err)` and then we'll do the handling in one place (the error handler)

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

## Now let's test for validation errors
* In Postman Post pass an empty object as the body and `Send`
* You'll get this error: `Bootcamp validation failed: address: Please add an address, description: Please add a description, name: Please add a name`
* Look at error object and you'll see we have an array of error objects

### How do we get all the errors and map them to each validation error?
We first check for `err.name === 'ValidationError'

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
    - const message = err.errors
        + Remember that `errors` in `err.errors` is an array of objects
            * it has a bunch of different fields in each object and we just want the message
            * We can just get the values with `Object.values(err.errors)`

#
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
* This is one choice for error handling or you could
* We implemented validation without having to use any 3rd party validation package (in Mern stack course we use the [Express validator](https://express-validator.github.io/docs/))
    - Which one is better? You decide but with what we just accomplished it is one less 3rd party dependency you need and you can handle all errors on your own
    - We can catch whatever errors we want in our custom error handler and if you want to explicitly set an error from your controller
        + You just `new ErrorResponse('some custom message', set some status code)` 

## Next
* Add another custom middleware for asynchronous calls so that we don't have to do a try catch in each of our controller methods
    - This will really clean up our controllers
    - And since all of our errors are `next(err)` we can create a wrapper to easily handle async calls
