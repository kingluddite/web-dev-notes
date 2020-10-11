# Get Single Review and update seeder
`controllers/reviews.js`

```
// MORE CODE

// @desc     Get single review
// @route    GET /api/v1/reviews/:id
// @access   Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!review) {
        return next(
            new ErrorResponse(`No review found with id of ${req.params.id}`), 404
        );
    }

    res.status(200).json({
        success: true,
        data: review
    });
});

// MORE CODE
```

## Now let's update our routes
`routes/api/v1/reviews.js`

```
const express = require('express');
const {
    getReview, // ADD!
    getReviews,
} = require('../../../controllers/reviews');

// MORE CODE

router
    .route('/:id')
    .get(getReview)

// MORE CODE
```

## Test in Postman
`GET {{DOMAIN}}:{{PORT}}/api/v1/reviews/1`

### Houston we have a problem!
* We are getting a `CastError`

```
// MORE CODE

CastError: Cast to ObjectId failed for value "1" at path "_id" for model "Review"
    at model.Query.exec (/Users/USERNAME/Documents/dev/ics/361e-icc-mern-app/node_modules/mongoose/lib/query.js:4351:21)
    at model.Query.Query.then (/Users/USERNAME/Documents/dev/ics/361e-icc-mern-app/node_modules/mongoose/lib/query.js:4443:15) {
  messageFormat: undefined,
  stringValue: '"1"',
  kind: 'ObjectId',
  value: '1',
  path: '_id',
  reason: Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters

// MORE CODE
```

* Take a look at our `ErrorResponse` (our custom error)

`middleware/error.js`

* Make sure it says `Resource` so it is generic

```
// MORE CODE

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

// MORE CODE
```

* Let's update our error to say this message

`middleware/error.js`

```
// MORE CODE

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

// MORE CODE
```

* **note** The reason the `CastError` is firing off is we do not have a properly formatted `id`
    - If we did have a properly formatted `id` like this:

`{{DOMAIN}}:{{PORT}}/api/v1/reviews/5d713a66ec8f2b88b8f830b8`

* Then it would throw our `ErrorResponse` we have in our controller which would look like this:

```
{
    "success": false,
    "error": "No review found with id of 5d713a66ec8f2b88b8f830b8"
}
```

## Houston we have a problem!
* Why are we getting a 500 Internal Server Error thrown from the error above?
* It is because we have this:

`controllers/reviews.js`

```
// MORE CODE

    if (!review) {
        return next(
            new ErrorResponse(`No review found with id of ${req.params.id}`), 404
        );
    }

// MORE CODE
```

* And our status error is outside the parentheses and should be like this:

```
// MORE CODE

    if (!review) {
        return next(
            new ErrorResponse(`No review found with id of ${req.params.id}`, 404)
        );
    }

// MORE CODE
```

## Now test again in Postman
```
{
    "success": false,
    "error": "No review found with id of 5d713a66ec8f2b88b8f830b8"
}
```

* And we get the expected 404 Not Found status error

## Name Request in Postman
`name`: Get single review
`description`: Fetch a review from database by `id` and populate Bootcamp name and description

## Now let's edit or Database seeder
* Let's add our Review model to our seeder
* And point it to our `_data/reviews.json`

`seeder.js`

```
// populate and depopulate Database This is a "self-contained app for dealing with our Database"
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');
const Review = require('./models/Review');

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'));

// Import into Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);

    // Let developer know all is good
    console.log('Data Imported...'.green.inverse);
    // We are finished
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    // Let developer know we deleted all the data
    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Let's use argv to determine if we are IMPORTING or DELETING data
if (process.argv[2] === '-i') {
  importData();
} else {
  deleteData();
}
```

## Seed data
```
$ node seeder -d
$ node seeder -i
```

## Test in Postman
### getReviews request `{{DOMAIN}}:{{PORT}}/api/v1/reviews`
* Will show 8 reviews
* Has pagination and filters because we used our advancedResults middleware

### getReview request:

`{{DOMAIN}}:{{PORT}}/api/v1/reviews/5d7a514b5d2c12c7449be027`

* Should show you that review

## Next
* Create a review
