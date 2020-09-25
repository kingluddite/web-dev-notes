# Forgot Password
* We'll start with the "forgot password route"
* Reset password
* The user can send their email and it will be sent with a token they can use in order to reset their password

## Now we'll start with
1. They can send an email to a route `forgotPassword` route
2. We'll generate a token
3. We'll hash it
4. And we'll put hashed token into Database in the `resetPasswordToken` field in our `User` model
5. We will also set an expiration for the token (`resetPasswordExpire` field)

`models/User.js`

```
// MORE CODE

  hashed_password: {
    type: String,
    required: [true, 'Please enter a passord'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

// MORE CODE
```

## Seed our Database
`$ node seeder -d`

`$ node seeder -i`

## Run server
`$ npm run dev`

## Move help function
* We'll put it at the bottom of our controller

`controllers/auth.js`

```
// MORE CODE
// HELPER FUNCTIONS
// Get token from model, create cookie and send response
const sendTokenInCookieResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        // cookie expires 30 days from now
        // same as JWT (30 days)
        expires: new Date(
            // 24 hours, 60 minutes, 1000, milliseconds (2592000000 milliseconds)
            // https://convertlive.com/u/convert/days/to/milliseconds#30
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        // cookie only accessible via client side scripts
        httpOnly: true
    };

    // We add this check to set options secure to true (HTTPS) only for production
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    // send the response (statusCode, the token inside the cookie that will expire in 30 days, and the token)
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}
```

## Let's work on our "Forgot password" route
* The route will be `POST /api/v1/auth/forgotpassword`
* It will be Public
* We'll get the user by the email that's sent in the body (so we'll use `findone()`)

`controllers/auth.js`

```
// MORE CODE

// @desc     Forgot password
// @route    POST /api/v1/auth/forgotpassword
// @access   Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

// MORE CODE
```

* And check if the user exists

```
// MORE CODE

// @desc     Forgot password
// @route    POST /api/v1/auth/forgotpassword
// @access   Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // Get user by their email in the request body
    const user = await User.findOne({email: req.body.email});

    // Check if user exists
    if (!user) {
        return next(new ErrorResponse(`There is no user with that email`, 404));
    }

// MORE CODE
```

## Get the reset token
* We will create a method inside our User model (and we do this so we can call that method on the user itself)
    - That will be called `getResetPasswordToken()`

`controllers/auth.js`

```
// MORE CODE

// @desc     Forgot password
// @route    POST /api/v1/auth/forgotpassword
// @access   Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // Get user by their email in the request body
    const user = await User.findOne({email: req.body.email});

    // Check if user exists
    if (!user) {
        return next(new ErrorResponse(`There is no user with that email`, 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    res.status(200).json({
        success: true,
        data: user
    });
});

// MORE CODE
```

### crypto module
* We will use a module called `crypto` to:
    - Generate the token
    - And to encrypt it
    - crypto has a method called `randomBytes()` which just generates some random data
        + We'll pass in the number of bytes we want as the parameter and it will be `20`
            * crypto.randomBytes(20)
                - But that will give us a `buffer` and we need to format it as a string and to do that we use:

`UserSchema.methods.crypto.randomBytes(20).toString('hex')`

* Above will give us the reset token we need

## Now let's move into our User model and build the `getResetPasswordToken()` method

`models/User.js`

* Let's install crypto 

`$ npm i crypto` - UPDATE! - no need to install

### Update - crypto is now built into Node.js
* Here is [the documentation](https://nodejs.org/api/crypto.html#crypto_crypto)

* And bring it into our User model

`models/User.js`

```
const crypto = require('crypto'); // ADD!
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// MORE CODE
```

## This is a method
* Remember we are creating this function on the user itself (as opposed to the model itself) so we call it a `method`
    - And we add the method like this: `UserSchema.methods.yourFunctionNameHere`
    - **note** IF the function was called on the model itself it would be called a `static`

`models/User.js`

```
// MORE CODE
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set reset password token to expire in 10 minutes (in milliseconds)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  // Return the original token (not the hashed token!)
  return resetToken;
}

module.exports = mongoose.model('User', UserSchema);
```

## Test if it works
* Let's log it out and see if it works

`controllers/auth.js`

```
// MORE CODE

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    console.log(resetToken); // ADD!

    res.status(200).json({
        success: true,
        data: user
    });

// MORE CODE
```

## Add to our auth router
`routers/api/v1/auth.js`

```
const express = require('express');
const {register, login, getMe, forgotPassword} = require('../../../controllers/auth'); // UPDATE!

// MORE CODE

// /api/v1/auth/me
router.get('/me', protect, getMe);

// /api/v1/auth/forgotpassword
router.post('/forgotpassword', forgotPassword); // ADD!

module.exports = router;

// MORE CODE
```

## Test in Postman
* If you don't pass an email in the Postman body you'll get:
* Make sure it is POST with this route:

`POST {{DOMAIN}}:{{PORT}}/api/v1/auth/forgotpassword`

* And add `Content-Type` with a value of `application/json`
* And in Body > raw > JSON

```
{
    "email": "bademail@example.com"
}
```

* The response is:

```
{
    "success": false,
    "error": "There is no user with that email"
}
```

* And if you pass and email that does exist in user collection you'll get:
    - Remember we imported a users collection so review your mongodb/compass to see an existing email
    - I'm using `publisher@sftpw.com`
* I have a response where I am sending back the `user` so I see:

```
{
    "success": true,
    "data": {
        "role": "publisher",
        "_id": "5d7a514b5d2c12c7449be043",
        "name": "Publisher Account",
        "email": "publisher@sftpw.com",
        "createdAt": "2020-09-22T00:23:25.216Z",
        "__v": 0,
        "resetPasswordToken": "c276ae9a328fb06492dca5414ecd9c91e2ec57e4eeb2dc7570384f9204a774bf",
        "resetPasswordExpire": "2020-09-22T01:30:07.197Z"
    }
}
```

* We get the hashed version sent back in the response
* And the expiration for the token is 10 minutes from now

### But I also see my log in the Terminal console that reads:

`257dc766264e8a5c5011f474132eec109f6fa0cb` (this is what `randomBytes()` gave us)

* So the token generated by `crypto` is working
* **IMPORTANT** We'll store the hashed version of the token in our Database but we'll send the regular version to the user in an email

## Houston we have a problem!
* Our hashed resetPassword tokens are not stored in our Database (check MongoDB for yourself)

### We need to do two things:
1. Save the `resetToken` in our Database
2. But before we save we want to turn off any validators and we can do that by passing the Mongoose `save()` method with an object passing it `validateBeforeSave: false`

`controllers/auth.js`

```
// MORE CODE

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false}); // ADD!

    res.status(200).json({
        success: true,
        data: user
    });
});

// MORE CODE
```

## Test our forgot password route again in Postman
`POST {{DOMAIN}}:{{PORT}}/api/v1/auth/forgotpassword`

```
{
    "email": "publisher@sftpw.com"
}
```

## Houston we have a problem!
* We get an error:

```
{
    "success": false,
    "error": "Illegal arguments: undefined, string"
}
```

* The problem is our middleware below is running:

```
// MORE CODE

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.hashed_password = await bcrypt.hash(this.hashed_password, salt);
});

// MORE CODE
```

* We are saving a user but we are not adding a password
* We can use a method called `isModified()` and pass it the field `hashed_password`
    - We just check to see if the password is not modified then move along to next middleware using `next()`

`models/User.js`

```
// MORE CODE

UserSchema.pre('save', async function (next) {
  if (!this.isModified('hashed_password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.hashed_password = await bcrypt.hash(this.hashed_password, salt);
});

// MORE CODE
```

* Now our `hash` and `salt` methods will only run if the `hashed_password` is modified

## Send again in Postman
* Check to make sure the it gets added to Database

![reset hashed token and expiration added to Database](https://i.imgur.com/792OLw3.png)

## Next
* Continue with actual email sending of token to end user
* Set up sending an email in our auth controller and that email will be sent with our token, with a specific route they can go to where they can reset their password (_and they'll have 10 minutes to do this before the token is expired and they have to do reset it again if they want to reset their password_)
