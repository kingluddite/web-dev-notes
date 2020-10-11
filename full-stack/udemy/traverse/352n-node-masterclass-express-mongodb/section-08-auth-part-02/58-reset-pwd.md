# Reset Password
1. We can hit our `forgetpassword` route
2. Get an email sent with the reset token
3. NOW we want to create the route that we use the token with

## We'll create a new method called `resetPassword`
* It will be a PUT request
* It will be Public
* The route will be `/api/v1/auth/resetpassword/:resettoken`

`controllers/auth.js`

```
// MORE CODE

// @desc     Reset password
// @route    PUT /api/v1/auth/resetpassword/:resettoken
// @access   Private
exports.resetPassword = asyncHandler(async (req, res, next) => {

// MORE CODE
```

* We now need to get the token out of the URL
    - And we also need to hash it
    - Because that's what we need to match it (remember in the Database the resetToken will be hashed)

## We'll need to use crypto again
* Make sure to bring that in

`controllers/auth.js`

```
// MORE CODE

const crypto = require('crypto'); // ADD!
const ErrorResponse = require('../utils/ErrorResponse');

// MORE CODE
```

* We use the same crypto hash we used before to get same value in our Database and we store in `resetPasswordToken`
* We pull the resettoken from the URL using `req.params.resettoken`
* We switch to using mongoose's `findOne()`
    - [findOne() docs](https://mongoosejs.com/docs/api.html#model_Model.findOne)
* We try to find a user with the `resetPasswordToken` (_the one we just created and we want to make sure it is the same as the one in our Database_)
    - And we want to make sure that the `resetPasswordExpire` hasn't expired so we are looking for a date that is greater than now `$gt: Date.now()`

## Setting a new password
* Since the `password` is being modified the **salt** and **hash** will fire off

`controllers/auth.js`

```
// MORE CODE

// @desc     Reset password
// @route    PUT /api/v1/auth/resetpassword/:resettoken
// @access   Private
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    // Check if user exists
    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // Set new password
    // DONT FORGET TO make this user.hash_password!!!!!!!
    user.hashed_password = req.body.password;
    // clean up after ourselves
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // save the user with the user password 
    await user.save();

    // now the password has been hashed and salted in our Database

    sendTokenInCookieResponse(user, 200, res);
});

// MORE CODE
```

## Add the route
`routes/api/v1/auth.js`

```
// MORE CODE

const {register, login, getMe, forgotPassword, resetPassword} = 

// MORE CODE

// /api/v1/auth/forgotpassword
router.post('/forgotpassword', forgotPassword);

// /api/v1/auth/resetpassword/:resettoken
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
```

## Test it out in Postman
* Let's delete all emails from mailtrap
* Run forgot password request again with this email:

```
{
    "email": "publisher@sftpw.com"
}
```

* Get this successful response

```
{
    "success": true,
    "data": "Email sent"
}
```

* Mongo will have `resetPasswordExpire` and `resetPaswordToken` inside it

![mongo has our reset password stuff fields](https://i.imgur.com/HW68cmv.png)

* Check mailtrap for the email sent

```
You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to 

 http://localhost:5000/api/v1/auth/resetpassword/4df937a6fea074b659dd277718d1c1c2dce5c912
```

* Grab the URL in that email
* Paste the URL into a new request in Postman
    - Make sure it is a PUT request

`PUT http://localhost:5000/api/v1/auth/resetpassword/4df937a6fea074b659dd277718d1c1c2dce5c912`

* Add
    - `Content-Type`: `application/json`
    - Body > raw > JSON

```
{
    "password": "newpassword"
}
```

* You will get a token in the response

```
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2E1MTRiNWQyYzEyYzc0NDliZTA0MyIsImlhdCI6MTYwMDc0OTY1NCwiZXhwIjoxNjAzMzQxNjU0fQ.AL2GntEPqGE2KVIR20tRQ2_Z78WiTiNvpNipPdlXULY"
}
```

* Login in with old password and fail!

```
{
    "success": false,
    "error": "Invalid credentials"
}
```

* Login in with new password and success!

```
{
    "email": "publisher@sftpw.com",
    "password": "newpassword"
}
```

* Check mongo/Compass and you'll see the reset fields are now gone!

## Save in Postman
* name of request `Reset Password`
* desc: `Reset user password using token`
* Save in `Authentication` collection folder
