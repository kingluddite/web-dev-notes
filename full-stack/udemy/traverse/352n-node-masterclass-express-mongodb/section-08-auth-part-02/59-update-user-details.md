# Update User Details
* Logged in users should be able to update their `name`, `email` and `password`
* This will be two separate routes

## We are going to have a user's controller and user's routes
* We could put all our auth stuff in the user's controller
* But we want `controllers/users.js` and `routes/api/v1/users.js` to be just the admin functionality
    - Essentially CRUD functionality for users (which only admins can do)

## And auth.js controller and routes is just for authentication 
`controllers/auth.js`

```
// MORE CODE

// @desc     Update user details
// @route    PUT /api/v1/auth/updatedetails
// @access   Private
exports.updateDetails = asyncHandler(async (req, res, next) => {

// MORE CODE
```

* We want to use `findByIdAndUpdate()`
    - But we don't just want to pass in `req.body`
        + Because if a password is sent, or a role or any other field in the model is sent, it will update that and we don't want that
        + This update should just be for `name` and `email`

`controllers/auth.js`

```
// MORE CODE

// @desc     Update user details
// @route    PUT /api/v1/auth/updatedetails
// @access   Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        // give us latest value
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});

// MORE CODE
```

## Add the route to include updateDetails
`routes/api/v1/auth.js`

```
const express = require('express');
const {register, login, getMe, forgotPassword, resetPassword, updateDetails} = require('../../../controllers/auth');

// MORE CODE

// /api/v1/auth/me
router.get('/me', protect, getMe);

// /api/v1/auth/updatedetails
router.put('/updatedetails', protect, updateDetails); // ADD!

// MORE CODE
```

## Test in Postman
* Login as `publisher@sftpw.com`

```
{
    "email": "publisher@sftpw.com",
    "password": "newpassword"
}
```

## update details route
`PUT {{DOMAIN}}:{{PORT}}/api/v1/auth/updatedetails`

* Add `Content-Type` with a value of `application/json`
* Click `Authorization` tab and select `Bearer Token`
    - And it will automatically be populated with `{{TOKEN}}`

### Save route to Postman
* `name`: Update User Details
* `description`: Update logged in user name and email
* In the body > raw > JSON
    - Let's change the name and email

```
{
    "name": "Bad",
    "email": "bad@email.com"
}
```

* You should see both are updated
* Change them back

## Now let's update the password
`controllers/auth.js`

```
// MORE CODE

// @desc     Update password
// @route    GET /api/v1/auth/updatepassword
// @access   Private
exports.updatePassword = asyncHandler(async (req, res, next) => {

// MORE CODE
```

* The user will send the current password and the new password in the body
* We want to find the user by their `id` which we have
    - But we also want the password (which by default is false ---- select false)

`controllers/auth.js`

```
// MORE CODE

// @desc     Update password
// @route    GET /api/v1/auth/updatepassword
// @access   Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    // don't forget to use `hashed_password`
    const user = await User.findById(req.user.id).select('+hashed_password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401));
    }

    user.hashed_password = req.body.newPassword;
    await user.save();

    sendTokenInCookieResponse(user, 200, res);
});

// MORE CODE
```

## Add our route
`routes/api/v1/auth.js`

```
// MORE CODE

const {register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword} = require('../../../controllers/auth');

// MORE CODE

// /api/v1/auth/updatepassword
router.put('/updatepassword', protect, updatePassword);

// MORE CODE
```

## Test in Postman
1. Log in as:

```
{
    "email": "publisher@sftpw.com",
    "password": "newpassword"
}
```

`PUT {{DOMAIN}}:{{PORT}}/api/v1/auth/updatepassword`

* Save in Postman Authentication folder
    - `name`: Update password
    - `desc`: Update logged in user password, send in the body `currentPassword` and `newPassword`
* Add `Content-Type` and `application/json`
* Add body > raw > json
* Set Authorization to Bearer Token and {{TOKEN}}

```
{
    "currentPassword": "newpassword",
    "newPassword": "1234567"
}
```

## Try to log in with old password
* It won't work
* But new password will

## Next
* Add users functionality for the Admin
* User controller and users routes with basic CRUD functionality only available to Admin

