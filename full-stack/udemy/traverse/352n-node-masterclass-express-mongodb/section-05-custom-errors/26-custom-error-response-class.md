# Custom ErrorResponse Class
* We'll create a `utils` folder
    - Anything that is not middleware that is kind of a helper or utility we'll put inside `utils`
    - Create a new file called `error-response.js`

`utils/error-response.js`

* We are extending the Error class that comes with Express
* We pass as arguments into our extended class a new `statusCode` property and the existing `message` property
* We use `super` to refer to the Error class and get it's `message` value
* We set `statusCode` passed to this custom error class extension
* We export the class so we can use it in other files

```
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
```

## Now we'll update our `errorHandler` middleware
`middleware/error.js`

* If `err.statusCode` exists we use it or we use `500`
* If there is an `err.message` we use it or we say `Server Error`

```
const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack.red);

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || 'Server Error' });
};

module.exports = errorHandler;
```

* If we send again in Postman we'll still get the old error response error because we have yet to use our new `ErrorResponse` class error

## Let's use our new Error Extension

`controllers/bootcamp.js`

```
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/error-response'); // add this

// MORE CODE
exports.getBootcamp = async (req, res, next) => {
  try {

     // MORE CODE

   } catch (err) {
     // res.status(400).json({ success: false });
     // next(err);
     next(
       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
     );
   }
};

// MORE CODE
exports.getBootcamps = async (req, res, next) => {
 try {

    // MORE CODE

  } catch (error) {
     // res.status(400).json({ success: false });
     next(new ErrorResponse(`No bootcamps found`, 404));
   }
};

// MORE CODE
exports.createBootcamp = async (req, res, next) => {
  try {

     // MORE CODE

   } catch (error) {
    // res.status(400).json({ success: false });
    next('A bootcamp could not be created', 404);
  }
};

// MORE CODE
exports.updateBootcamp = async (req, res, next) => {
  try {

     // MORE CODE

     } catch (error) {
       // res.response(400).json({ success: false });
       next(`A bootcamp with the id ${req.params.id} could not be updated`, 404);
     }
};

// MORE CODE
exports.deleteBootcamp = async (req, res, next) => {
  try {

    // MORE CODE

  } catch (error) {
    // res.status(400).json({ success: false });
    next(
      new ErrorResponse(
        `A bootcamp with the id ${req.params.id} could not be deleted`,
        404
      )
    );
  }
};
```

* We also have to return next with `ErrorResponse` too
* And since we are using `color` we need to import that

## Test it out
```
// MORE CODE

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      // return res.status(400).json({ success: false });
      return next(ErrorResponse(`No bootcamp found`, 400));
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
// MORE CODE
```

* If you test with GET bootcamp request with invalid `id` you will get bottom ErrorResponse (in the `try` and if you test with valid `id` but not an existing id in the Database you will get the ErrorResponse inside the `catch`

### Success 
```
GET /api/v1/bootcamps/5f452f885a31372449e211f2 200 134.935 ms - 603
```

### Error
* Wrong `id`

```
// MORE CODE

Error: Bootcamp not found with id of 5f452f885a31372449e211f2s
    at exports.getBootcamp (/Users/USER/Documents/dev/ics/361e-icc-mern-app/controllers/bootcamps.js:24:7)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
GET /api/v1/bootcamps/5f452f885a31372449e211f2s 404 4.089 ms - 83
// MORE CODE
```

## Making our custom error a little more clean
