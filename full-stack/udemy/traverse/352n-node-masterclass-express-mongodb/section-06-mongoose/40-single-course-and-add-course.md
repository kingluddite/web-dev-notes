# Single Course and Add Course
## CRUD for courses

## Steps
1. You need to write your controller
2. You need to write your router

### Don't forget
* You are using async/await
* It is GET
* Name what controller you are exporting `getCourse`
* Don't forget your custom error `ErrorResponse`
* Don't forget you are passing id in URL `req.params.id`
* In response you don't need count (there is only ever 1)
* You will need 2 fields from bootcamp so use `populate()`
    - And pass object with `path` point to `bootcamp`
    - And also pass `select` with a string with fields you want separated by spaces

### getCourse controller
* First let's define our `getCourse` controller

`controllers/courses.js`

```
// MORE CODE

// @desc     Get single course
// @route    GET /api/v1/courses/:id
// @access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404);
  }

  // console.log(course);

  res.status(200).json({
    success: true,
    data: course
  })
})

// MORE CODE
```

## Now let's define our router
`routes/api/v1/courses.js`

```
const express = require('express');

const {
  getCourse, // ADD!
  getCourses,
} = require('../../../controllers/courses');

const router = express.Router({mergeParams: true});

// /api/v1/courses
router
  .route('/')
  .get(getCourses)

// /api/v1/courses/:id // WE NEED TO ADD our route with :id URL param
router
  .route('/:id')
  .get(getCourse)

module.exports = router;
```

## Test in postman
* Grab a course `id` from
* GET `{{URL}}/api/v1/courses/5d725a4a7b292f5f8ceff789`

### Postman response
```
{
    "success": true,
    "data": {
        "scholarshipAvailable": false,
        "_id": "5d725a4a7b292f5f8ceff789",
        "title": "Front End Web Development",
        "description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
        "weeks": "8",
        "tuition": 8000,
        "minimumSkill": "beginner",
        "bootcamp": {
            "_id": "5d713995b721c3bb38c1f5d0",
            "name": "Devworks Bootcamp",
            "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
            "id": "5d713995b721c3bb38c1f5d0"
        },
        "createdAt": "2020-09-14T02:59:00.268Z",
        "__v": 0
    }
}
```

## Save Route in Postman
* As `Get single course` in Courses collection

## Create a course
* We need a way to get the bootcamp `id`
* We will need to use our resource controller (how we added the course router into the bootcamp router)
* We need the bootcampId in the `req.body` so we'll manually assign it like `req.body.bootcamp = req.params.bootcampId`
* We will need the Bootcamp model so we need to import it

`controllers/bootcamps.js`

```
// MORE CODE

const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp'); // ADD THIS!

// MORE CODE

// @desc    Create a course 
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  // Assign our bootcampId param to the req.body
  req.body.bootcamp = req.params.bootcampId;

  // grab the bootcamp by it's id
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  // Do we have a bootcamp?
  if (!bootcamp) {
    // No, then throw an error
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId} exists`, 404)
    )
  }

  // Add user to req.body (TODO)
  // Time to create our course
  // We now have the bootcampId attached to the req.body
  const course = await Course.create(req.body);

  return res.status(201).json({
    success: true,
    msg: 'Create a course',
    data: course,
    error: null,
  });
})

// MORE CODE
```

## Now we need to add our route
`routes/api/v1/courses.js`

* It should be just on the `/:id`
    - Even though it is `/bootcamps/:bootcampId/courses` in our bootcamps route we essentially forwarded that to our `courseRouter` using this code fragment

`routes/api/v1/bootcamps.js`

```
// MORE CODE

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
// anything that contains :bootcampId route that into the courses router
router.use('/:bootcampId/courses', courseRouter);

// MORE CODE
```

## So now we'll add our POST route consuming our `createCourse` controller
`routes/api/v1/courses.js`

```
// MORE CODE
// GET /api/v1/courses/:id
router
  .route('/:id')
  .get(getCourse)
  .post(createCourse)

module.exports = router;
```

### Houston we have a problem!
* That will not work
* It is a post request so it does not go on the `id`

`routes/api/v1/courses.js`

```
const express = require('express');
const {
  getCourse,
  getCourses,
  createCourse
} = require('../../../controllers/courses');

const router = express.Router({mergeParams: true});

// GET /api/v1/courses
router
  .route('/')
  .get(getCourses)
  // POST /api/v1/bootcamps/:bootcampId/courses (this is the route)
  .post(createCourse) // ADD THIS!

// GET /api/v1/courses/:id
router
  .route('/:id')
  .get(getCourse)

module.exports = router;
```

## Test in Postman
`POST {{URL}}/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses`

* **Headers** have `Content-Type` and a **value** of `application/json`
* We need a raw > `body` of JSON
    - Grab this from `Get all courses`

```
{
    "scholarshipAvailable": false,
    "title": "YAML",
    "description": "learn about YAML",
    "weeks": "8",
    "tuition": 18000,
    "minimumSkill": "beginner"
}
```

## And the response to the client
```
{
    "success": true,
    "msg": "Create a course",
    "data": {
        "scholarshipAvailable": false,
        "_id": "5f6119329d2d9fe06fc0f13f",
        "title": "YAML",
        "description": "learn about YAML",
        "weeks": "8",
        "tuition": 18000,
        "minimumSkill": "beginner",
        "bootcamp": "5d713995b721c3bb38c1f5d0",
        "createdAt": "2020-09-15T19:42:42.725Z",
        "__v": 0
    },
    "error": null
}
```

* **note** We have a bootcamp `id` in the response (this is good because it is required in our Courses model)

`models/Course.js`

```
// MORE CODE
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }
});

module.exports = mongoose.model('Course', CourseSchema);
```

## Save in Postman
* `Create a Course` to the **Courses** collection
    - **desc** Create a course for a specific bootcamp
* I added variables for all id's in Postman
* Check `getAllBootcamps` and you should now see that `devworks bootcamp` has 2 bootcamps on it

![add Postman global variables](https://i.imgur.com/ynIi6eb.png)

## Next
* Create Update and Delete controllers and routes
* Calculating the average cost of the course
