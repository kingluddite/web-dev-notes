# Mongoose Error Handling Part 1
* Now we want to catch specific errors in our error handler and handle response from there rather than handle it in the `catch`

## Modify our code
* From this:

```
// MORE CODE

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
};
// MORE CODE
```

* To this:

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
    next(err); // we update this line
  }
};
// MORE CODE
```

* Now test in Postman with an id that is not properly formatted
    - We'll still get our 500 error because I took out the `ErrorReponse`

## Errors have different names
* Let's log one out

`error.js`

```
const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack.red);

  console.log(err.name); // add this line

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || 'Server Error' });
};

module.exports = errorHandler;
```

* Click `Send` in Postman and look in the terminal and you'll see `CastError`
  - You only get this when you have an improperly formed `id`
  - If you `id` is properly formed but a wrong `id` you'll get this error

```
// MORE CODE

TypeError: Class constructor ErrorResponse cannot be invoked without 'new'
    at exports.getBootcamp (/Users/philiphowley/Documents/dev/ics/361e-icc-mern-app/controllers/bootcamps.js:17:19)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
TypeError
GET /api/v1/bootcamps/5f452f885a31372449e211f3 500 51.341 ms - 91
// MORE CODE
```

`error.js`

* Make sure to change `err` to `error`

```
const ErrorResponse = require('../utils/error-response');

const errorHandler = (err, req, res, next) => {
  // make a copy of our error object using the spread operator
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
```

## Update our error in `controller-bootcamps.js`

`controller-bootcamps.js`

```
const colors = require('colors'); // eslint-disable-line no-unused-vars
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/error-response');

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      // return res.status(400).json({ success: false });
      return next(ErrorResponse(`No bootcamp found`, 400));
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    // res.response(400).json({ success: false });
    next(err);
  }
};

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};
```

## Final `controller-bootcamps.js`

```
const colors = require('colors'); // eslint-disable-line no-unused-vars
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/error-response');

// @desc     Get bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public
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

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    // res.response(400).json({ success: false });
    next(err);
  }
};

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`No bootcamp found with id of ${req.params.id}`, 400)
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};
```

## Now when you enter a bad id
* You will get 404 status error
* Here is the reponse

```
{
    "success": false,
    "error": "Resource not found with id of 5f452f885a31372449e211f23"
}
```

* The server will show this:

```
CastError: Cast to ObjectId failed for value "5f452f885a31372449e211f23" at path "_id" for model "Bootcamp"
    at model.Query.exec (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongoose/lib/query.js:4351:21)
    at model.Query.Query.then (/Users/USER/Documents/dev/ics/361e-icc-mern-app/node_modules/mongoose/lib/query.js:4443:15)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
GET /api/v1/bootcamps/5f452f885a31372449e211f23 404 10.385 ms - 83
```

## Next - Handle validation errors
* Similar to **CastError** in `error.js` we will check for bad emails and output the error messages
