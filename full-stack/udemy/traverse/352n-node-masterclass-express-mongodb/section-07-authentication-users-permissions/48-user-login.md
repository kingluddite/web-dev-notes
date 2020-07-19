# User Login
* We are now able to register a user and get back a token
* And that token includes the user's `_id` in the payload

## Make sure you save the register request
* With the json **Content-Type** `application/json`
* With this data:

```
{
    "name": "Rodolph Lorroway",
    "email": "rlorroway0@hugedomains.com",
    "password": "rRDL1Y",
    "role": "publisher"
}
```

## Add our login route

`controller-auth.js`

```
// MORE CODE

// @desc     Login user
// @route    POST /api/v1/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password

  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
```

* Why are we validating email and password inside our controller for login but not for register controller?
  - Because for register, we are using our model and we already have validation in that model for when we create a new user
    + And that gets handled by our error handler
  - But for this login controller we are using the data that gets passed in when the user logs in
    + This data is not getting put into our Database, it's not going through the model so we need to check it manually here

```
// MORE CODE

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

// MORE CODE
```

## We also want to check for the user
* We can check for the user using the email entered into the login form (or the body we pass in Postman)

```
// MORE CODE

  // Check for user
  const user = await User.findOne({ email });

// MORE CODE
```

* But we have a slight problem
* In our user model we used `select: false` which means when we query for a user the `password` will not be included but in this case we need the `password`
  - And we'll add on `select()` and this will do the same thing here that we did in the model and we'll use `select('+password')` because we do want the password (because we need to validate it for login)

```
// MORE CODE

  // Check for user
  const user = await User.findOne({ email }).select('+password');

// MORE CODE
```

### Throw an error
* If the user isn't found the user did not provide valid credentials to access the site
  - We need to use a server status of 401 (which is 'Unauthorized') and say inform the user `Invalid credentials`

```
// MORE CODE

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

// MORE CODE
```

## Now we deal with the password
* We need to take the **plain text password** that is being passed in from the `body` and match it with the **encrypted password**
  - To do this we'll create a model method (similar to the method we used to get the token)
  - But we'll use this method to match the `password`

### Method to match password
* We can match the passed password and the hashed password in our Database using bcrypt's `compare` method
  - compare returns a promise so we need to use `await` (don't forget to add `ascyn` to the function)
    + compare takes 2 arguments, the plain text password and the encrypted password in the Database
      * Remember this method is not static and it is being called on the actual user so we have access to their hashed password with `this.password`

```
// MORE CODE

// Match user entered password to hashed password in Database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// MORE CODE
```

* **note** When returning await you can omit `await`

```
// MORE CODE

// Match user entered password to hashed password in Database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// MORE CODE
```

## Now back in our login controller we check if our passwords match
* We are calling `matchPassword` which is going to call `bcrypt.compare(`)

`User.js`

```
// MORE CODE

// Match user entered password to hashed password in Database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// MORE CODE
```

*  `bcrypt.compare()` will return a promise so we must await it
  -  And we pass `matchPassword` the plain text password from the request body

```
// MORE CODE

  // Check if password matches
  const isMatch = await user.matchPassword(password);

// MORE CODE
```

* If above sets `isMatch` to true, the passwords match and we want to generate a token, set 200 status and return a success and the generated token
* If `isMatch` is not true

### Error if no match
```
// MORE CODE

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

// MORE CODE
```

* **note** isMatch will store a boolean as that is what bcrypt's `compare()` method returns
    - `true` if there is a match
    - `false` if there is not

## If we have a match create a token
* Respond with a 200 success server status and the token

```
// MORE CODE

  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });

// MORE CODE
```

## And here is the full login controller
```
// MORE CODE

// @desc     Login user
// @route    POST /api/v1/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
```

* It is important to return the same error `Invalid credentials` for both check for user and check that password matches for security reasons
    - This helps prevent hackers from knowing if they entered something specifically wrong

## You need to create your routes
* Bring in `login`
* And add the login route pointing to the login controller

`route-auth.js`

```
const express = require('express');
const { register, login } = require('../controllers/controller-auth');

const router = express.Router();

// /api/v1/auth
router.post('/register', register);

// /api/v1/auth
router.post('/login', login);

module.exports = router;
```

## Compass Buggy on Mac (sometimes)
* Works better on Windows than on Mac
* Sometimes you have to completely disconnect and then reconnect (buggy)

## Test
* Make sure you have a user
* Duplicate Register User request as Login
    - Change Description
    - Change Route to `{{URL}}/api/v1/auth/login`
    - Change body to:

```
{
    "email": "rlorroway0@hugedomains.com",
    "password": "rRDL1Y"
}
```

* Test bad email by entering `rlorroway10@hugedomains.com`
    - You should get error `Invalid credentials`
    - You get same error if you enter good email but bad password (good!)
    - Let's test good password and email and we should get 200 and token
* **TIP** For testing enter a super simple password like `123456`
    - Delete user and create new user with 123456 password and john@doe.com
    - Save Login Request with that new user and easy password and email
    - It makes testing easier
* Enter this in Postman Register User request and save:

```
{
    "name": "John Doe",
    "email": "john@doe.com",
    "password": "123456",
    "role": "publisher"
}
```

* And update Login Request with:

```
{
    "email": "john@doe.com",
    "password": "123456"
}
```

* And save Login Request in Postman

## What are we going to do with our token?
* We are now getting the token sent back to the client
* And in many cases if we are using React on the frontend (or just Vanilla JavaScript) many times we would just store that token in localStorage and then when we make a request to a protected route (which we haven't implemented yet), the token would be taken from localStorage, put in the HEADER and then sent to that protected route
    - **WARNING** Storing token in localStorage can have security issues
    - To take this a step further we are going to send a cookie to the client with the token in it, so that it can get stored in the browser cookies and it can be used that way and then you don't have to send the token with every request

## Next
* Take our response from both the login and the registration, we're going to create a helper function where we generate the token but also add the functionality of sending the cookie with the token inside it
    - And we'll have a logout route that will clear that cookie 
