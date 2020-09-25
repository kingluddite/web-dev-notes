# Error Handler Middleware
* [docs](https://expressjs.com/en/guide/error-handling.html)
* Express has an error hander that includes

## How we can call Express custom error handler:
* For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the `next()` function, where Express will catch and process them

### Example
* We pass in `next()` the error

```
// MORE CODE

app.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
// MORE CODE
```

### Let's add it to our getBootcamp controller
`controller-bootcamps.js`

```
// MORE CODE

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err); // here we call our built-in Express error handler
  }
};
// MORE CODE
```

## Make an error
* Use a bogus `id` (not correctly formatted) in the URL **and you'll get HTML with an error in the response** (_default in built-in Express error handler_)
    - We don't want HTML!
    - We need to create a custom event handler
    - The docs show us how to build custom error handler middleware
* Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: (err, req, res, next)

### Our custom error
* We'll define it inside our middleware folder
* We'll use a simple log to log out the error
* We use `colors` module to make it red
* We output the `err.stack` to see the full error stacktrace
* We return an error status and add a new `error` property and set its value to be the err's `message` property

`middleware/error.js`

```
const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack.red);

  res.status(500).json({ 
    success: false, 
    error: err.message 
  });
};
```

* We'll soon create a custom class to extend the core error class and include a status code so that we can customize that
    - So that when we call `next()` we'll be able to instantiate the error response class with a message and a code

## Don't forget to export this
* We need to use it in another file

`controller/controller-bootcamps.js`

```
// MORE CODE
  res.status(500).json({ success: false, error: err.message });
};

module.exports = errorHandler;
```

## Remember this is middleware and to use it we need to use `app.use`
* So in our Express `server.js`

### ignore eslint for one line
```
// MORE CODE

const colors = require('colors'); // eslint-disable-line no-unused-vars
const error = require('./middleware/error');
const connectDB = require('./config/db');
// MORE CODE
```

## Where to we execute middle in `server.js`
### IMPORTANT!!!!
* If you want to execute our middleware in our controller methods it has to come after where we mount our router `app.use('/api/v1/bootcamps/, bootcamps)`
    - This is because middleware is executed in a linear order
    - If you put your middleware above this line it won't catch it

`server.js`

```
// MORE CODE

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Custom Error handler
app.use(error);
// MORE CODE
```

* Now we'll use GET in Postman to make the same request to an ID that is not valid
* And we get our custom error in the response with a 500 Internal Server Error status message
    - Notice we are getting JSON data instead of that HTML

```
{
    "success": false,
    "error": "Cast to ObjectId failed for value \"5ec17a8b1956be6716e6b1233\" at path \"_id\" for model \"Bootcamp\""
}
```

* And in the terminal we'll see this error with a poorly formed `id`

```
CastError: Cast to ObjectId failed for value "5f452f885a31372449e211f33" at path "_id" for model "Bootcamp"
    at model.Query.exec (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongoose/lib/query.js:4351:21)
    at model.Query.Query.then (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongoose/lib/query.js:4443:15)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
```

* Congrats we now have a custom error handler

## Next
* Create a custom class to extend the core error class
    - So that we can add a status code
    - And we can also add more customization to our error handler



