# Role Authorization
## Compass
* Make jane have a role of `user`

![roles in Compass](https://i.imgur.com/UEAGrGp.png)

* We use the spread operator `...roles`
    - We will pass into `...roles` a comma separated value list of roles `publisher, admin`
    - We pass a `403` error which is a "Forbidden Error"

`middleware/auth.js`

```
// MORE CODE
// Grant access to specific roles
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(
        `User role ${req.user.role} is not authorized to access this route`,
        403
      )
    );
  }
  next(); 
};
```

## Routes
* Now we'll go into `routes/api/v1/bootcamps.js` and import `authorize`
* We pass in `authorize()` and pass in the roles that are allowed to perform the action
* **IMPORTANT** Make sure you place `authorize()` after `protect` because authorize is using `req.user` and that gets set in the `protect` middleware

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

const Bootcamp = require('../../../models/Bootcamp');
const advancedResults = require('../../../middleware/advancedResult');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

const { protect, authorize } = require('../../../middleware/auth');

// Re-route into other resource routers
// anything that contains :bootcampId route that into the courses router
router.use('/:bootcampId/courses', courseRouter);

// /api/v1/bootcamps
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// /api/v1/bootcamps/:id/photo
router.route('/:id/photos').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

// /api/v1/bootcamps
router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp);

// api/v1/bootcamps/:id
router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
```

* Add authorize for `uploadPhoto` and CRUD for courses

## And add it to our courses
`routes/api/v1/courses.js`

```
const express = require('express');
const {
    getCourse,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../../../controllers/courses');

const Course = require('../../../models/Course');
const advancedResults = require('../../../middleware/advancedResult');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../../../middleware/auth');

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
    .post(protect, authorize('publisher', 'admin'), createCourse)

// GET /api/v1/courses/:id
router
    .route('/:id')
    .get(getCourse)
    .put(protect, authorize('publisher', 'admin'), updateCourse)
    .delete(protect, authorize('publisher', 'admin'), deleteCourse)

module.exports = router;
```

* **Note** When testing make sure you change jane doe to `user` and save it in Mongo Atlas
  - Change/Edit and click `UPDATE` button

## Test if roles are working
* Make Jane Joe just a user (do this manually in Compass)

![one user and one publisher](https://i.imgur.com/hkXcRmC.png)

* Log in as Jane Doe and try to create a bootcamp, delete a bootcamp or update a bootcamp and you'll get

```
{
    "success": false,
    "error": "User role user is not authorized to access this route"
}
```

* But log in as John Doe and you will be able to perform all those requests
* You will get 403 Forbidden error if you are not `admin` or `publisher`
* Change Jane to `admin` manually in Compass and you will also be able to perform those protected requests

## Now creating roles is fairly simple to implement

## Next - Ownership
* When we create a bootcamp right now we are not entering the user with that bootcamp
* Any publisher or admin can create a bootcamp but right now we don't know who created the bootcamp
    - And there's no special permissions that say only the owner can up date or delete that bootcamp
    - Right now anyone who is logged in has the right role (admin or publisher) they can manage any bootcamp they want

### Next we'll work on access and permissions for specific bootcamps and courses 
