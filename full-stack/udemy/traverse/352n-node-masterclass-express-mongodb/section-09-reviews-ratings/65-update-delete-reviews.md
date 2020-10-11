# Update and Delete reviews
`controllers/reviews.js`

```
// MORE CODE
// @desc    Update a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {

    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id} exists`, 404)
        )
    }

    // Make sure user is review owner
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`Not authorized to update this review with an id of ${req.params.id}})`, 401)
        );
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        msg: 'Update a review',
        data: review,
        error: null,
    });
})
```

## Add it to our routes
`routes/api/v1/reviews.js`

```
// MORE CODE

const express = require('express');
const {
    getReview,
    getReviews,
    createReview,
    updateReview // ADD!
} = require('../../../controllers/reviews');

const Review = require('../../../models/Review');

const router = express.Router({mergeParams: true});

const advancedResults = require('../../../middleware/advancedResult');
const {protect, authorize} = require('../../../middleware/auth');

// GET /api/v1/reviews
router
    .route('/')
    .get(advancedResults(Review,
        {
            path: 'bootcamp',
            select: 'name description'
        }
    ), getReviews)

    // POST /api/v1/bootcamps/:bootcampId/reviews
    .post(protect, authorize('user', 'admin'), createReview)

// GET /api/v1/reviews/:id
router
    .route('/:id')
    .get(getReview)
    .put(protect, authorize('user', 'admin'), updateReview) // ADD!

// MORE CODE
```

## Test in Postman
* You want to update the review you wrote
    - Grab the id from jill's review as Jane and you should not be able to update it
    - Log in as Jill and update jill's review and you should be able to update the review

### Save request
`name`: Update review
`description`: Update review in Database

## Delete review
`controllers/reviews.js`

```
// MORE CODE

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {

    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id} exists`, 404)
        )
    }

    // Make sure user is review owner
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`Not authorized to delete this review with an id of ${req.params.id})`, 401)
        );
    }

    await review.remove();

    return res.status(200).json({
        success: true,
        msg: 'Delete review',
        data: {},
        error: null,
    });
})
```

* **note**
    - If you use this ` await Review.remove();` you will delete the entire review collection
        + This is not what you want (obviously)
        + So use the instance `await review.remove()`

## And add our route
`routes/api/v1/reviews.js`

```
// MORE CODE

const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview // ADD!
} = require('../../../controllers/reviews');

// MORE CODE

// GET /api/v1/reviews/:id
router
    .route('/:id')
    .get(getReview)
    .put(protect, authorize('user', 'admin'), updateReview)
    .delete(protect, authorize('user', 'admin'), deleteReview) // ADD!

module.exports = router;

// MORE CODE
```

## Postman
* Save to `Reviews` folder
    - `Title`: Delete review
    - `Description`: Remove review from Database

### Test Delete
* Create a review with jill (logged in as jill)
* Log in as jane and try to delete review (you can't)
* Log in as jill and you can delete the review
* When you delete reviews the averageRating for the bootcamp should change and update (verify this)

## Helpful Note
* If you are wondering why mongoose creates a `_id` and a `id` in a document it is a helper so you don't have to search using `_id` and can just use `id`

## Troubleshoot
* We need to save and remove post so make sure:

`models/Course.js`

```
// MORE CODE

// Call getAverageCost after (so we use "post") save
CourseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

// Call getAverageCost after (so we use "post") save
CourseSchema.post('remove', function () {
    this.constructor.getAverageCost(this.bootcamp);
})

// MORE CODE
```

`models/Review.js`

```
// MORE CODE

// Call getAverageRating after (so we use "post") save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.bootcamp);
})

// Call getAverageRating after (so we use "post") save
ReviewSchema.post('remove', function () {
  this.constructor.getAverageRating(this.bootcamp);
})

// MORE CODE
```

## TODO
* Double check `averageRating` changes when updates and deletes

## Seed data
```
node seeder -d
node seeder -i
npm run dev
```

## Run get all reviews to make sure you get all the seeder data

## Next
* Make our API more secure and production ready
* We'll add some packages and protect against NoSQL injection
