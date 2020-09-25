# Advanced Results middleware
* Let's take all the advanced result features that we have for our Bootstrap resource
    - Like filtering
        + select
            * `GET {{URL}}:{{PORT}}/api/v1/bootcamps?select=name,description`
        + limit
            * `GET  {{URL}}:{{PORT}}/api/v1/bootcamps?limit=2`
        + pagination

### Let's make all of the above available for any resource we create
* To do this we'll just move our filter code to middleware
* Then we can use it for any resource

## Create new file
`middleware/advancedResult.js`

* Since this is middleware it must take as parameters
    - req
    - res
    - next

# Make the model an argument
## But we also need to take in the model
* Because we don't always want to take in Bootcamp
* Currently `Bootcamp` is hardcoded into `bootcamp.js`

`controllers/bootcamps.js`

```
// MORE CODE

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  // count up all the bootcamps
  const total = await Bootcamp.countDocuments(); // We need to make the model an argument when we call our advancedResult method

// MORE CODE
```


## We also need to make `populate()` arguments optional
* So we can pass them if we need them

`middleware/advancedResult.js`

* This is shorthand for putting a function inside of a function

```
const advancedResults = (model, populate) => async (req, res, next) => {
  //
}

module.exports = advancedResults; // so we can use in other files
```

* We are going to gut this from `bootcamps.js`

`controllers/bootcamps.js`

```
// MORE CODE

  let query;

  // Copy req.query
  const reqQuery = {...req.query};

  // Fields to exclude
  // An array of fields that we don't want to be matched for filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create mongodb operators ($gt, $gte, $lt, $lte, $in)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // default will be to sort by createdAt data in descending order
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  // count up all the bootcamps
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  // if we don't have a last page don't show it
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  // if we don't have a previous page don't show it
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

// MORE CODE
```

## Paste the above into `middleware/advancedResult.js`

`advancedResult.js`

```
const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = {...req.query};

  // Fields to exclude
  // An array of fields that we don't want to be matched for filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create mongodb operators ($gt, $gte, $lt, $lte, $in)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // default will be to sort by createdAt data in descending order
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  // count up all the bootcamps
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  // if we don't have a last page don't show it
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  // if we don't have a previous page don't show it
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }
}
```

* Now since we have `model` an argument swap all the times Bootcamp is used with `model`

```
const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = {...req.query};

  // Fields to exclude
  // An array of fields that we don't want to be matched for filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create mongodb operators ($gt, $gte, $lt, $lte, $in)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = model.find(JSON.parse(queryStr)).populate('courses');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // default will be to sort by createdAt data in descending order
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  // count up all the bootcamps
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  // if we don't have a last page don't show it
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  // if we don't have a previous page don't show it
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }
}

```

* And where we create the query 

```
// MORE CODE

  // Executing query
  const bootcamps = await query;

// MORE CODE
```

* Let's change that to `results`
    - As we don't want to tie the result to `bootcamps`

```
// MORE CODE

  // Executing query
  const results = await query;

// MORE CODE
```

## Create an object on the response `res` object
* And we can use this on any routes that uses middleware
* We call next() because this is middleware and when we are finished we need to move onto the next middleware

```
// MORE CODE
  // if we don't have a previous page don't show it
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  }

  next();
}

module.exports = advancedResults;
```

## Now we need to handle the populate
* We have currently hardcoded `populate('courses')`

```
// MORE CODE

  // Finding resource
  query = model.find(JSON.parse(queryStr)).populate('courses');

// MORE CODE
```

* We will remove that populate()
* Remember with our `query` object (above) we can just keep adding onto it

```
// MORE CODE

  // Finding resource
  query = model.find(JSON.parse(queryStr));

// MORE CODE
```

* And we'll add it on below to look like this:

```
// MORE CODE

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

// MORE CODE
```

* So what we did above is:
    - If something is passed into `populate`
        + Then we'll set the query to whatever the query is
        + And we'll also add on `populate()` and whatever is passed into `populate(populate)`

## Congrats
* You just converted from just dealing with `bootcamps` to making it generic to deal with whatever resource you want to deal with

## How can we use this middleware we just created?
1. We have to go into our routes
2. We'll have to bring in our middleware into our routes

`routes/api/v1/bootcamps.js`

```
const express = require('express');
const {
    getBootcamp,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../../../controllers/bootcamps');

const advancedResults = require('../../../middleware/advancedResult'); // ADD!

// MORE CODE
```

## We also need to bring in our Bootcamp model
```
// MORE CODE

const Bootcamp = require('../../../models/Bootcamp'); // ADD!
const advancedResults = require('../../../middleware/advancedResult');

// MORE CODE
```

## Now to use `advancedResult` we pass it into the route like this:
* Since we want to use it for getBootcamps we do this:

`routes/api/v1/bootcamps.js`

```
// MORE CODE

// /api/v1/bootcamps
router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(createBootcamp);

// MORE CODE
```

## Now we need to alter our controller - `bootcamps.js`
`controllers/bootcamps.js`

* We'll modify this:

```
// MORE CODE

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

  // When we get all bootcamps let's also get back the length of the bootcamps
  // We'll include our pagination object in our reponse
  res
    .status(200)
    .json({success: true, count: bootcamps.length, pagination, data: bootcamps});
});

// MORE CODE
```

* To look like this:
    - We just replace our object with `res.advancedResults`

```
// MORE CODE

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

  // When we get all bootcamps let's also get back the length of the bootcamps
  // We'll include our pagination object in our reponse
  res
    .status(200)
    .json({success: true, count: bootcamps.length, pagination, data: bootcamps});
});

// MORE CODE
```

* And we have access to `res.advancedResults` because this method is using that middleware

## Here's the final controller
* And now the final `getBootcamps` controller:

```
// MORE CODE

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

  // When we get all bootcamps let's also get back the length of the bootcamps
  // We'll include our pagination object in our reponse
  res
    .status(200)
    .json(res.advancedResults);
});

// MORE CODE
```

## Test in Postman
* Try to get all boocamps with:
    - `GET  {{URL}}:{{PORT}}/api/v1/bootcamps`
* Try filtering
    - `GET  {{URL}}:{{PORT}}/api/v1/bootcamps?housing=true&location.state=MA`
* Get name and description
    - `GET  {{URL}}:{{PORT}}/api/v1/bootcamps?select=name,description`
* Try pagination (page 2 and limit 2)
    - `GET  {{URL}}:{{PORT}}/api/v1/bootcamps?page=2&limit=2`
    - And we get our previous results

```
// MORE CODE

"pagination": {
        "prev": {
            "page": 1,
            "limit": 2
        }
    },
// MORE CODE
```

## Great! It works as it did before
* But it is far more modular
* And we can now use it with any resource

## Now let's implement this in courses
`controllers/courses.js`

```
// MORE CODE

// @desc     Get courses
// @route    GET /api/v1/courses
// @route    GET /api/v1/bootcamps/:bootcampId/courses
// @access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  // Check if `:bootcampId` exists
  if (req.params.bootcampId) {
    //   If it does then we just get the courses from the bootcamps
    query = Course.find({bootcamp: req.params.bootcampId})
  } else {
    //   If it DOES NOT then we'll get all of the courses
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    });
  }

  const courses = await query;

  res
    .status(200)
    .json(res.advancedResults);
})

// MORE CODE
```

* We remove the populate because we'll pass in that and the object passed to it in the getCourses router

```
// MORE CODE

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  // Check if `:bootcampId` exists
  if (req.params.bootcampId) {
    //   If it does then we just get the courses from the bootcamps
    query = Course.find({bootcamp: req.params.bootcampId})
  } else {
    //   If it DOES NOT then we'll get all of the courses
    query = Course.find()
  }

  await query;

  res
    .status(200)
    .json(res.advancedResults);
})

// MORE CODE
```

## And update the courses Router
`routes/api/v1/courses.js`

* We bring in the model and middleware (advancedResult)
* We pass in the object we passed to `populate()`

```
// MORE CODE

const Course = require('../../../models/Course');
const advancedResults = require('../../../middleware/advancedResult');

// MORE CODE

// GET /api/v1/courses
router
  .route('/')
  .get(advancedResults(Course,
    {
      path: 'bootcamp',
      select: 'name description'
    }

  ), getCourses)

  // POST /api/v1/bootcamps/:bootcampId/courses
  .post(createCourse)

// MORE CODE
```

* We test
    - select
    - limit
    - page
    - And they should all now work!

## One improvement
* We need to alter `getCourses` countroller slightly
    - If we are just looking for all the courses in a bootcamp we don't want to use filtering and pagination
        + So that will have a separate response -  `res`
    - We only want to use it if we are getting all the courses

## Troubleshooting
* If you get an error "converting circular structure to JSON..."

```
{
    "success": false,
    "error": "Converting circular structure to JSON\n    --> starting at object with constructor 'NativeTopology'\n    |     property 's' -> object with constructor 'Object'\n    |     property 'sessionPool' -> object with constructor 'ServerSessionPool'\n    --- property 'topology' closes the circle"
}
```

* Most likely you forgot to `await` your query
    - Example:

```
// MORE CODE

exports.getCourses = asyncHandler(async (req, res, next) => {
  // Check if `:bootcampId` exists
  if (req.params.bootcampId) {
    //   If it does then we just get the courses from the bootcamps
    const courses = Course.find({bootcamp: req.params.bootcampId})

// MORE CODE
```

* But if we change to `await`

```
// MORE CODE

exports.getCourses = asyncHandler(async (req, res, next) => {
  // Check if `:bootcampId` exists
  if (req.params.bootcampId) {
    //   If it does then we just get the courses from the bootcamps
    // WE ADD `await` below
    const courses = await Course.find({bootcamp: req.params.bootcampId})

// MORE CODE
```

* And now we get all the courses for that bootcamp!

## Next - Authentication!


