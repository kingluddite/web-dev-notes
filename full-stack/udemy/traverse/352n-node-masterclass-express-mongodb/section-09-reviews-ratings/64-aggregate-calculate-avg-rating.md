# Calculate aggregate average rating for each bootcamp
* And put this in the model

`models/Review.js`

```
// MORE CODE

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  // console.log('Calculating avg cost...'.blue);

  const arrayWithSingleObject = await this.aggregate([
    {
      $match: {bootcamp: bootcampId}
    },
    {
      // the object that we want to create
      // the calculated object
      // We need to use `_id: $bootcamp`
      // We createdOur field and say we want to average `$avg`
      // And point to field we want to average `$rating`
      $group: {
        _id: '$bootcamp',
        averageRating: {$avg: '$rating'}
      }
    }
  ])

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: arrayWithSingleObject[0].averageRating
    })
  } catch (err) {
    console.error(err);
  }
}

// Call getAverageReview after (so we use "post") save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.bootcamp);
})

// Call getAverageReview after (so we use "post") save
ReviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.bootcamp);
})

// MORE CODE
```

## Test in Postman
* We'll create a whole new bootcamp
* And a few reviews
* clear out Database with seeder

`$ node seeder -d`

### Create a publisher
* `{{DOMAIN}}:{{PORT}}/api/v1/auth/register`

```
{
    "name": "John Doe",
    "email": "jdoe@example.com",
    "password": "123456",
    "role": "publisher"
}
```

### Create 2 `user` 
```
{
    "name": "Jane One",
    "email": "jane@example.com",
    "password": "123456",
    "role": "user"
}
```

* And one more

```
{
    "name": "Jill Two",
    "email": "jill@example.com",
    "password": "123456",
    "role": "user"
}
```

* Log in as the publisher

```
{
    "email": "jdoe@example.com",
    "password": "123456"
}
```

* Create a bootcamp as John Doe

## Log in as both users for the bootcamp id you just created
* And write reviews

5f6c16c868150035449e567d

## Troubleshoot
* I had my Bootcamp model wrong
* It was erroneously pointing to Bootcamp from Bootcamp
* So change this:

`models/Bootcamp.js`

```
// MORE CODE

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }

// MORE CODE
```

* To this:

```
// MORE CODE

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }

// MORE CODE
```

## I made a mistake
* A user doesn't need to own a bootcamp to write a review so I need to remove this fragment of logic I erroneously added to my review controller

```
// MORE CODE

    // Make sure user is bootcamp owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            // User not authorized error message - 401
            new ErrorResponse(`User ${req.user.name} (${req.user.id}) is not authorized to add a course to bootcamp ${bootcamp.name} (${bootcamp._id})`, 401)
        );
    }

// MORE CODE
```

* Here is my new controller

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
            new ErrorResponse(`No review found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: review
    });
});

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

    // We now have the bootcampId attached to the req.body
    const review = await Review.create(req.body);

    return res.status(201).json({
        success: true,
        msg: 'Create a review',
        data: review,
        error: null,
    });
})
```

## Test again
* So you log in as a publisher
* Create a bootcamp
* Use that bootcamp id on a write review request
* Log in as 2 different "user" roles and write a review with 2 different ratings
* View all bootcamps and you'll see that bootcamp has an average rating on it
    - One review gave 2
    - The other gave 1
    - The averageReview is 1.5

## Next - Update and Delete reviews
