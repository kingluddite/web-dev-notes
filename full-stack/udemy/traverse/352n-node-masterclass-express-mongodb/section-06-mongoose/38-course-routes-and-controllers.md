# Course routes and controllers
## Create routes
* getCourses
    - This method will be used with 2 different routes
        + And it will do 2 different things
            1. It will GET all courses
            2. And GET all courses for a specific bootcamp

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
    query = Course.find();
  }

  const courses = await query;
})
```

* We have a route that can either grab all courses if not bootcampId exists or grab bootcamps with a specific bootcampId
* **Note** We only use `await` when we have built out our query to do what we need

## Don't forget to send a response
* We need to say it was successful (if it was)
* We need to pass the data from the Database
* We need to pass the length of the result set
* **note** Later we will implement pagination and more advanced results 

`controllers/courses.js`

```
// MORE CODE
  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  })
})
```

## Now add our router
* We can't test this without creating our routes file for courses

`routes/api/v1/courses.js`

```
const express = require('express');
const {
  getCourses,
} = require('../../../controllers/courses');

const router = express.Router();

// /api/v1/courses
router
  .route('/')
  .get(getCourses)

module.exports = router;
```

## But that won't work yet because we need to modify `server.js`
* We need to do 2 things:
    1. We need to bring the router file in
    2. And we need to "mount" the router

`server.js`

* Let's bring in our router file

```
// MORE CODE

// Route resources
const users = require('./routes/api/v1/users');
const bootcamps = require('./routes/api/v1/bootcamps');
const courses = require('./routes/api/v1/courses'); // ADD THIS!

// MORE CODE

// Mount Route Resources
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

// MORE CODE
```

## Add to Postman

![add to postman](https://i.imgur.com/hy2Fffw.png)

* Get all courses

GET `{{URL}}/api/v1/courses`

## Now we want to get the courses for just a specific bootcamp
* We'll use this GET route request
* We'll need to grab an idea from our Get all courses route request

![Grab a bootcamp `_id` (THIS IS IMPORTANT!) from get all courses route request](https://i.imgur.com/0cpH0Yy.png)

* **note** Make sure you are not grabbing an `id` of a course

`"_id": "5d713995b721c3bb38c1f5d0"`

### And we'll use this route
`{{URL}}/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses`

#### Houston we have a problem!
* That route request won't work!
* Because... we didn't set up that route yet
* **NOTE** This route request starts with `bootcamps` and not `courses`
* We could bring in `getCourses`  into our `routes/api/v1/bootcamps.js`
    - **SUGGESTION** Let's keep our courses routes within the courses controller

## Resource router
* A better idea is to use a resource router
* This will help us keep like resources with each other
* So we will effectively re-route a route to the resource where we want to include it

`routes/api/v1/bootcamps.js`

```
// MORE CODE

const express = require('express');
const {
    getBootcamp,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require('../../../controllers/bootcamps');

// Include other resource routers // ADD!
const courseRouter = require('./courses'); // ADD!

const router = express.Router();

// Re-route into other resource routers // ADD!
// anything containing ":bootcampId" route that into the courses router // ADD!
router.use('/:bootcampId/courses', courseRouter); // ADD!

// MORE CODE
```

* So now if this route is hit:

`http://localhost:5000/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses`

* It will continue on into `routes/api/v1/courses.js` and it will call `getCourses` (if we make a GET request to that)

## One more thing to do `mergeParams: true`
* We need to pass into our `express.Router()` **mergeParams**
* We have to do this in order for this to work and the reason is because we are merging the URL `params`

`routes/api/v1/courses.js`

```
const express = require('express');
const {
  getCourses,
} = require('../../../controllers/courses');

const router = express.Router({mergeParams: true}); // Modify this line!

// /api/v1/courses
router
  .route('/')
  .get(getCourses)

module.exports = router;
```

## Now let's test this out in Postman
GET `{{URL}}/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses`

* And we get 2 (both with the same bootcampId - **5d713995b721c3bb38c1f5d0**)

## Update Postman
* `Name it:` Get courses for bootcamp
* `Desc:` Get the specific courses for a bootcamp
* Save in `Courses` folder

## TODO: Repair error handler
* Error handling is not working properly - fix this
* If you put the wrong id for a bootcamp in the get courses for bootcamp route it should error with `bootcamp with [ID_OF_BOOTCAMP_HERE] doesn't exist` and currently this does not happen

## Next - populate
* When we get all the courses from a bootcamp we need to use mongoose to "populate" information from the bootcamp document into our courses document
* We will look at `virtuals` in mongoose
* How to cascade delete when one bootcamp is deleted, we want all the courses for that bootcamp to be deleted
    - We don't want courses hanging around if the bootcamp is not there
