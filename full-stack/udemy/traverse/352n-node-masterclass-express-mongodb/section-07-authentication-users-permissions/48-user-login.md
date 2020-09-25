# User Login
* We are now able to register a user and get back a token
* And that token includes the user's `_id` in the payload

## Make sure you save the register request
* With the json **Content-Type** `application/json`
* With this data:

```
{
    "name": "John Doe",
    "email": "jdoe@example.com",
    "password": "123456",
    "role": "publisher"
}
```

## Add our login route

`controllers/auth.js`

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

## Why are we validating `email` and `password` inside our controller for login but not for register controller?
* Because for `register`, we are using our model and we already have validation in that model for when we create a new user
  - And that gets handled by our error handler
* But for this login controller we are using the data that gets passed in when the user logs in
  - This data is not getting put into our Database, it's not going through the model so we need to check it manually here

`controllers/auth.js`

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
* We can check for the `user` using the email entered into the login form (or the body we pass in Postman)

`controllers/auth.js`

```
// MORE CODE

  // Check for user
  const user = await User.findOne({ email });

// MORE CODE
```

## Houston we have a problem!
* In our `User` model we used `select: false` which means when we query for a user the `password` will not be included
* But in this case we need the `password`!

### Solution to the problem
* We'll add on `select()` and this will do the same thing here that we did in the model and we'll use `select('+password')`

### Why do we need the password?
* Because we need to validate it for login

```
// MORE CODE

  // Check for user
  const user = await User.findOne({ email }).select('+hashed_password');

// MORE CODE
```

### Throw an error
* If the `user` isn't found the `user` did not provide valid credentials to access the site
  - We need to use a server status of 401 (which is 'Unauthorized') and say inform the user `Invalid credentials`

```
// MORE CODE

  // Check for user
  const user = await User.findOne({ email }).select('+hashed_password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

// MORE CODE
```

## Time to create a model method
### Now we deal with the password
* We need to take the **plain text password** that is being passed in from the `body` and match it with the **encrypted password**
  - To do this we'll create a `model method` (_similar to the method we used to get the token_)
  - But we'll use this method to match the `password`

### Method to match password using bcrypt's `compare()` method
* We can match the passed `password` and the `hashed_password` in our Database using bcrypt's `compare` method
  - I named the field in our Database with snake case (this_is_snake_case) to differentiate between the user provided `password` and the field in our database `hashed_password` which does not contain the password but the hashed and salted password
  - `compare()` returns a Promise so we need to use `await` (_don't forget to add `async` to the function_)
  - `compare()` takes 2 arguments, the plain text `password` and the encrypted `hashed_password` in the Database
      + **Remember** This method is **not static** and it is being called on the actual `user`
        * We have access to their `hashed_password` with `this.password`

`models/User.js`

```
// MORE CODE

// Match user entered password to hashed_password in Database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.hashed_password);
};

// MORE CODE
```

* **note** When returning `await` you can omit `await`

```
// MORE CODE

// Match user entered password to hashed password in Database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.hashed_password);
};

// MORE CODE
```

## Do our passwords match? 
* Now back in our `login controller` we **check if our passwords match**
* We are calling `matchPassword` which is going to call `bcrypt.compare(`)

`models/User.js`

```
// MORE CODE

// Match user entered password to hashed password in Database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.hashed_password);
};

// MORE CODE
```

*  `bcrypt.compare()` will return a Promise so we must `await` it
  -  And we pass `matchPassword` the plain text password from the request body

`controllers/auth.js`

```
// MORE CODE

  // Check if user entered password matches
  const isMatch = await user.matchPassword(password);

// MORE CODE
```

## What do we do if passwords match?
* If above sets `isMatch` to true, **the passwords match** and we want to:
  - Generate a token
  - Set 200 success status
  - `return` a success and the generated token
 If `isMatch` is not true

## What do we do if passwords do NOT match?
`controllers/auth.js`

```
// MORE CODE

  // Check if user entered password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

// MORE CODE
```

* **note** `isMatch` will store a **boolean** as that is what bcrypt's `compare()` method returns
    - `true` if there is a match
    - `false` if there is not

## If we have a match create a token
* Respond with a 200 success server status and the token

`controllers/auth.js`

```
// MORE CODE

  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });

// MORE CODE
```

## And here is the full login controller
`controllers/auth.js`

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
    // No match then send "Unauthorized" 401 status
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
```

## Better to be safe than sorry - Security is important!
* It is important to return the same error `Invalid credentials` for both:
  - Check for `user` and
  - Check that password matches
* For security, this helps prevent hackers from knowing if they entered something specifically wrong

## You need to create your routes
* Bring in `login`
* And add the login route pointing to the login controller

`routes/api/v1/auth.js`

```
const express = require('express');
const {register, login} = require('../../../controllers/auth');

const router = express.Router();

// /api/v1/auth/register
router.post('/register', register);

// /api/v1/auth/login
router.post('/login', login);

module.exports = router;
```

## Compass Buggy on Mac (sometimes)
* Works better on Windows than on Mac
* Sometimes you have to completely disconnect and then reconnect (buggy)

## Test in Postman
* Make sure you have a user
* Duplicate Register user request as Login
    - Change Description
    - Change Route to `{{URL}}/api/v1/auth/login`
    - Change body to:

```
{
    "email": "jdoe@.com",
    "password": "123456"
}
```

* Test bad email by entering `wrongdoe@.com`
    - You should get error `Invalid credentials`
#
```
{
    "success": false,
    "error": "Invalid credentials"
}
```

* **note** You get same error if you enter good `email` but **bad** `password` (This is good security!)
* Test good `password` and `email` and we should get 200 and token
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
* We are now getting the `token` sent back to the `client`
* And in many cases if we are using React on the frontend (or just Vanilla JavaScript) would just store that `token` in **localStorage** and then when we make a request to a protected route (which we haven't implemented yet), the token would be taken from `localStorage`, put in the HEADER and then sent to that protected route

## Houston we have a problem!
* This is a security issue!!
* **WARNING** Storing token in `localStorage` can have security issues
  - A lot of times we would do this:
    + We store the token in `localStorage`
    + And then when we make a request to a protected route (we will add this functionality soon)
    + The token would be taken from localStorage, put in the Header and then sent to that protected route

### We will handle this is a more safe manner
* Storing a token in localStorage can have security issues
* To be safer and follow best practices we will take this a step further
  - We are going to send a `cookie` to the `client` with the `token` inside it
    + So that the `token` can get stored in the browser cookies
    + And the `token` can be used that way and **then you don't have to send the token with every request**

## Next - Helper function and Logout
### Modularize creating a token and sending a cookie with it
* Take our response from both the `login` and the `register`, we're going to create a helper function where we generate the token but also add the functionality of sending the cookie with the token inside it
* And we'll have a `logout` route that will **clear that cookie** 
