# Admin users CRUD
* Get a list of users
* Get a single user
* Create user
* Update user
* Delete user
* All of the above all just for "admins" (role)

## Create routes and controllers
* `$ touch routes/api/v1/users.js`
* `$ touch controllers/users.js`

### Add routes to server.js
`server.js`

```
// MORE CODE

// Route files
// Route authentication
const auth = require('./routes/api/v1/auth');
// Route resources
const users = require('./routes/api/v1/users'); // ADD!

// MORE CODE

// DEFINE ROUTES
// Mount Route Authentication
app.use('/api/v1/auth', auth);
// Mount Route Resources
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/users', users); // ADD!

// MORE CODE
```

## Let's work on our controller for users
`controllers/users.js`

* We set our access to `// @access   Private/Admin`
* We get access to all filtering we want with advancedResults
    - We get access to that in our users route
```
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc     Get all users 
// @route    GET /api/v1/users
// @access   Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .json(res.advancedResults);
});
```

## Add the getUsers route
`routes/api/v1/users.js`

```
// MORE CODE

const express = require('express');
const {
  getUsers
} = require('../../../controllers/users');

const User = require('../../../models/User');
const advancedResults = require('../../../middleware/advancedResult');

const router = express.Router();

const {protect, authorize} = require('../../../middleware/auth');

// /api/v1/users
router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(User), getUsers)

modules.export = router;
```

## Test in Postman
`GET {{DOMAIN}}:{{PORT}}/api/v1/users`

* Save as `Get all users` to a new `Users` collection folder
* Make sure to click `Authorization` tab and select **Type** Bearer Token and save
* Log in with non-admin user and you won't be able to access the route

```
{
    "success": false,
    "error": "Not authorized to access this route"
}
```

## Manually change this user to `admin` in Compass
* Change role from `user` to `admin`
* Log in with that user:

```
{
    "email": "admin@sftpw.com",
    "password": "123456"
}
```

* Try `getUsers` route again in Postman and this time you will see all users
* You can now get all the users

## Get a single user
`controllers/users.js`

```
// MORE CODE

// @desc     Get single user
// @route    GET /api/v1/users/:id
// @access   Private
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User with id of ${req.params.id} not found`, 404));
    }

    res
        .status(200)
        .json({
            success: true,
            data: user
        });
});

// MORE CODE
```

## Get single user route
`routes/api/v1/users.js`

```
const express = require('express');
const {
  getUsers,
  getUser
} = require('../../../controllers/users');

const User = require('../../../models/User');
const advancedResults = require('../../../middleware/advancedResult');

const router = express.Router();

const {protect, authorize} = require('../../../middleware/auth');

 // MORE CODE

// api/v1/users/:id
router
  .route('/:id')
  .get(protect, authorize('admin'), getUser)
```

* You can see the single user if you are an admin
* And get this if you are not:

```
{
    "success": false,
    "error": "User role user is not authorized to access this route"
}
```

## Create user
`controllers/users.js`

```
// MORE CODE

// @desc    Create a user 
// @route   POST /api/v1/users
// @access  Private
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    return res.status(201).json({
        success: true,
        msg: 'Create a user',
        data: user,
        error: null,
    });
})

// MORE CODE
```

## Add the createUser router
`routes/api/v1/users.js`

```
const express = require('express');
const {
  getUsers,
  getUser,
  createUser // ADD!
} = require('../../../controllers/users');

const User = require('../../../models/User');
const advancedResults = require('../../../middleware/advancedResult');

const router = express.Router();

const {protect, authorize} = require('../../../middleware/auth');

// /api/v1/users
router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(User), getUsers)
  .post(protect, authorize('admin'), createUser); // ADD!

// MORE CODE
```

## Add route to Postman and Test
* Save {{TOKEN}} using Authorization (Bearer Token)
* Add Content-Type: application/json
* Add Body > raw > JSON

```
{
    "role": "user",
    "name": "My Test",
    "email": "mytest@sftpw.com"
}
```

* If logged in as `admin` you can add a user
* If not logged in a `admin` you can not

```
{
    "success": false,
    "error": "User role user is not authorized to access this route"
}
```

* But log in as `admin` and you can successfully add a user
* Make sure to use `hashed_password` in the Postman body like this:

```
{
    "role": "user",
    "name": "My Test",
    "hashed_password": "123456",
    "email": "mytest@sftpw.com"
}
```

* And you will get successful output like:

```
{
    "success": true,
    "msg": "Create a user",
    "data": {
        "role": "user",
        "_id": "5f6a31f67f059c39a4a13bef",
        "name": "My Test",
        "hashed_password": "$2a$10$AC.rwSpsT2b4WVArVYKUFerapy8wBe6YD1UvZfDlLdZ3nZhEbf5La",
        "email": "mytest@sftpw.com",
        "createdAt": "2020-09-22T17:18:46.053Z",
        "__v": 0
    },
    "error": null
}
```

## Quick fix
* Spelling in hashed_password validation in User model

`models/User.js`

```
// MORE CODE

  hashed_password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
    select: false
  },

// MORE CODE
```

## And update and delete a user
`controllers/users.js`

```
// MORE CODE
// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.id);

    // Check to make sure there is a user to update 
    if (!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        // return the updated user
        new: true,
        runValidators: true
    });

    res.status(200).json({success: true, data: user});
});

// @desc    Delete a user 
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // Check to make sure there is a user
    if (!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        )
    }

    user.remove();

    res.status(200).json({success: true, data: {}});
})
```

## And the routes for updateUser and deleteUser

`routs/api/v1/users.js`

```
// MORE CODE

// api/v1/users/:id
router
  .route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

// MORE CODE
```

### Update
`PUT {{DOMAIN}}:{{PORT}}/api/v1/users/5f6a31f67f059c39a4a13bef`

* Content-Type: application/json
* body > raw > JSON

```
{
    "role": "publisher",
    "name": "My Test2"
}
```

* **Note** You can not change role to admin because it is not in the ENUM for users
    - You have to manually change it in the Database
* You must be an "admin" to update user
* Save route as `Update` a user in the Users folder

## Delete a user
`DELETE {{DOMAIN}}:{{PORT}}/api/v1/users/5f6a31f67f059c39a4a13bef`

* Add `Content-Type` - application/json
* Authorization: Type: Bearer Token pointing to {{TOKEN}}
* If you are "admin" you can delete and get:

```
{
    "success": true,
    "data": {}
}
```

## Quick fixes
* Put middleware together

`routes/api/v1/bootcamps.js`

```
// MORE CODE

// MORE CODE

const Bootcamp = require('../../../models/Bootcamp');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

const advancedResults = require('../../../middleware/advancedResult');
const {protect, authorize} = require('../../../middleware/auth');

// MORE CODE
```

`routes/api/v1/courses.js`

```
// MORE CODE

const Course = require('../../../models/Course');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../../../middleware/advancedResult');
const { protect, authorize } = require('../../../middleware/auth');

// MORE CODE
```

## Improvement on our code
* Since we are using protect and authorize for all of our routes in `users.js` we can do this
    - router.use(protect)
    - router.use(authorize('admin'))
* By doing that all routes below those two lines will be use protect and authorize with "admin"

`routes/api/v1/users.js`

```
const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../../controllers/users');

const User = require('../../../models/User');
const advancedResults = require('../../../middleware/advancedResult');

const router = express.Router();

const {protect, authorize} = require('../../../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

// /api/v1/users
router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

// api/v1/users/:id
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
```

* **note** In postman give the desc for the `Users` folder
    - desc: CRUD functionality for users only available to admins

## Quick fix
* The user relationship on Bootcamp was wrong
* Change this:

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

## Summary
* We have complete CRUD for users
* The user using user CRUD must be an admin or all routes won't work (they are all protected)

## Next - Reviews
* We'll add the Review resource
* Write reviews for bootcamps
* Only users can write reviews (and admins)
* You can calculate the ratings for all reviews and put that in a field in bootcamps
