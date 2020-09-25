# Create a review
`controllers/reviews.js`

```
// MORE CODE

// @desc    Create a review 
// @route   POST /api/v1/bootcamps/:bootcampId/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
    // grab bootcamp id from URL
    req.body.bootcamp = req.params.bootcampId;
    // grab user id from logged in user
    req.body.user = req.user.id;

    // grab the bootcamp by it's id
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId} exists`, 404)
        )
    }

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.user.name} (${req.user.id}) is not authorized to add a course to bootcamp ${bootcamp.name} (${bootcamp._id})`, 401)
        );
    }

    // We now have the bootcampId attached to the req.body
    const review = await Review.create(req.body);

    return res.status(201).json({
        success: true,
        msg: 'Create a review',
        data: review,
        error: null,
    });
})

// MORE CODE
```

## Add our router
`routes/api/v1/reviews.js`

```
const express = require('express');
const {
    getReview,
    getReviews,
    createReview // ADD!
} = require('../../../controllers/reviews');

const Review = require('../../../models/Review');

const router = express.Router({mergeParams: true});

const advancedResults = require('../../../middleware/advancedResult');
const {protect, authorize} = require('../../../middleware/auth'); // ADD!

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
    .post(protect, authorize('publisher', 'admin'), createReview) // ADD!


// MORE CODE
```

## Test in Postman
* Save as `Create a review` in the Reviews folder
    - With `description` of: Insert review for a specific bootcamp
* This request

`POST {{DOMAIN}}:{{PORT}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews`

* Content-Type
* Authorization tab set to `Bearer Token` **{{TOKEN}}**
* raw JSON in body

```
{
    "title": "Was better than cats!",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra feugiat mauris id viverra. Duis luctus ex sed facilisis ultrices. Curabitur scelerisque bibendum ligula, quis condimentum libero fermentum in. Aenean erat erat, aliquam in purus a, rhoncus hendrerit tellus. Donec accumsan justo in felis consequat sollicitudin. Fusce luctus mattis nunc vitae maximus. Curabitur semper felis eu magna laoreet scelerisque",
    "rating": 7
}
```

* Find a list of bootcamps get an id
* Add to the URL
* Make sure the logged in user owns that bootcamp (search by id to find bootcamp)
* Log in as that owner of that bootcamp
* Click send and you should receive a 201 response

```
{
    "success": true,
    "msg": "Create a review",
    "data": {
        "_id": "5f6c0589ce8dfc05e4797e38",
        "title": "Was better than cats!",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra feugiat mauris id viverra. Duis luctus ex sed facilisis ultrices. Curabitur scelerisque bibendum ligula, quis condimentum libero fermentum in. Aenean erat erat, aliquam in purus a, rhoncus hendrerit tellus. Donec accumsan justo in felis consequat sollicitudin. Fusce luctus mattis nunc vitae maximus. Curabitur semper felis eu magna laoreet scelerisque",
        "rating": 7,
        "bootcamp": "5d725a1b7b292f5f8ceff788",
        "user": "5c8a1d5b0190b214360dc032",
        "createdAt": "2020-09-24T02:33:45.745Z",
        "__v": 0
    },
    "error": null
}
```

## Change!
* We want only `users` to be able to write reviews (or admins)
* So change this:

`routes/api/v1/reviews.js`

```
// MORE CODE

    // POST /api/v1/bootcamps/:bootcampId/reviews
    .post(protect, authorize('publisher', 'admin'), createReview)

// MORE CODE
```

* To this:

```
// MORE CODE

    // POST /api/v1/bootcamps/:bootcampId/reviews
    .post(protect, authorize('user', 'admin'), createReview)

// MORE CODE
```

## New business rule!
* Users can only write one review per bootcamp
* **Tip** This is not hard to do
    - We just add an index to our Review model
    - And it looks like this:

`models/Review.js`

```
// MORE CODE

// Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({bootcamp: 1, user: 1}, {unique: true}); // ADD!

module.exports = mongoose.model('Review', ReviewSchema);
```

## One more test
* Create a user that is a publisher

```
{
    "name": "Test User",
    "email": "Test@example.com",
    "password": "123456",
    "role": "publisher"
}
```

## Create a bootcamp with that user
* Grab the id of that bootcamp
* Paste it into the create review request route
* You will get:

```
{
    "success": false,
    "error": "User role publisher is not authorized to access this route"
}
```

* Then change role of `publisher` to `user` for the user we just created
    - Use Compass/Atlass to do this
* Try to write review again and this time you will have success
* If this is correct, your permissions are working as expected

### Try out our new business rule
* Submit the review again
* And you will get a 400 Bad Request status error

```
{
    "success": false,
    "error": "Duplicate field value entered"
}
```

* So we can't add more than one review per bootcamp!
* Click get all reviews request route and you'll see the review is added

## Next
* Average Ratings
    - We'll do same thing we did with tuition costs
    - We want a field in our Bootcamp that has the average review
