# Review Model and getReviews
`models/Review.js`

```
const mongoose = require('mongoose');
const User = '../models/User';

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the word review'],
    trim: true,
    maxlength: [100, 'Name can not be more than 200 characters'],
  },
  text: {
    type: String,
    required: [true, 'Please add some content'],
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Review', CourseSchema);
```

## Create route and controller files
`$ touch routes/api/v1/reviews.js`
`$ touch controllers/reviews.js`

## Let's work on the Reviews controller
* We want to get all the reviews
* We also want just the reviews for the Bootcamp

`controllers/reviews.js`

```
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @desc     Get reviews
// @route    GET /api/v1/reviews
// @route    GET /api/v1/:bootcampId/reviews
// @access   Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Review.find({bootcamp: req.params.bootcampId});

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});
```

## Update our server
* We need to point to where our reviews route is

`server.js`

```
// MORE CODE

const courses = require('./routes/api/v1/courses');
const reviews = require('./routes/api/v1/reviews'); // ADD!

// MORE CODE

app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews); // ADD!

// MORE CODE
```

## Now let's update our reviews route file

`routes/api/v1/reviews.js`

```
const express = require('express');
const {
    // getCourse,
    getReviews,
    // createCourse,
    // updateCourse,
    // deleteCourse
} = require('../../../controllers/reviews');

const Review = require('../../../models/Review');

const router = express.Router({mergeParams: true});

const advancedResults = require('../../../middleware/advancedResult');
// const {protect, authorize} = require('../../../middleware/auth');

// GET /api/v1/reviews
router
    .route('/')
    .get(advancedResults(Review,
        {
            path: 'bootcamp',
            select: 'name description'
        }
    ), getReviews);

module.exports = router;
```

* **note** Remember this line?

`const router = express.Router({mergeParams: true});`

* We want to keep this because we want to be able to go to:

`/bootcamps/bootcampId/reviews`

## Test in Postman
* Create a new Folder `Reviews`

`GET {{DOMAIN}}:{{PORT}}/api/v1/reviews`

* Save as `Get all reviews`
    - Desc - `Get all reviews from Database and populate with bootcamp name and description`

### Now we need to get the reviews from a single bootcamp
* Grab a bootcamp id from another request
* The route we want to hit is:

`GET {{DOMAIN}}:{{PORT}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews`

* If you test now you'll see it is not working:
    - You just get HTML with an error 404 status

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Error</title>
</head>

<body>
    <pre>Cannot GET /api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews</pre>
</body>

</html>
```

### Houston we have a problem!
* The reason we get this error is in our bootcamps route we need to redirect to reviews
* Make this

`routes/api/v1/bootcamps.js`

```
// MORE CODE

const Bootcamp = require('../../../models/Bootcamp');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews'); // ADD!

const router = express.Router();

const advancedResults = require('../../../middleware/advancedResult');
const { protect, authorize } = require('../../../middleware/auth');

// Re-route into other resource routers
// anything that contains :bootcampId route that into the courses router
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter); // ADD!

// MORE CODE
```

* Now anything that goes to `bootcamp/reviews`

## Test route again in Postman
`GET {{DOMAIN}}:{{PORT}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews`

* We get no data because we didn't create and reviews yet
* Save request
    - `Name`: Get reviews for bootcamp
    - `Description`: Fetch the reviews for a specific bootcamp
* We need to add these names and descriptions for our generated DocGen documentation

## Next
* Create a single review
* Update Database seeder
* Create a route and controller method to actually create reviews
