# Auth Protect Middleware
* We are able to register or login and get a token

## Now we'll create a piece of middleware
This middleware will make it so that we have to send this token to certain routes to:
* Create a new bootcamp
    - A logged in user should be able to create a new bootcamp but not someone that is a "guest" that is not logged in
    - We'll defer our discussion on "roles" for now

## Dealing with the token
1. We take the token
    - Typically it will be stored in a cookie or localStorage on the client side
2. When we make the request to create a new bootcamp
    - In the Headers we would send along an `Authorization` Header with that token
        + The convention for the value is `Bearer token AND_THE_TOKEN_HERE`

![token in Header with Authorization](https://i.imgur.com/JzBa3ZI.png)

## What is a Bearer Token
* [reference](https://www.oauth.com/oauth2-servers/differences-between-oauth-1-2/bearer-tokens/)
    - The most common way of accessing OAuth 2.0 APIs is using a “Bearer Token”
    - This is a single string which acts as the authentication of the API request, sent in an HTTP “Authorization” header
    - The string is meaningless to clients using it, and may be of varying lengths
    - `Pros`
        + Bearer tokens are a much simpler way of making API requests, since they don’t require cryptographic signing of each request
        + The tradeoff is that all API requests must be made over an HTTPS connection, since the request contains a plaintext token that could be used by anyone if it were intercepted
        + The advantage is that it doesn’t require complex libraries to make requests and is much simpler for both clients and servers to implement
    - `Cons`
        + The downside to Bearer tokens is that there is nothing preventing other apps from using a Bearer token if it can get access to it
            * This is a common criticism of OAuth 2.0, although most providers only use Bearer tokens anyway
            * Under normal circumstances, when applications properly protect the access tokens under their control, this is not a problem, although technically it is less secure
* **note** If your service requires a more secure approach, you can a different access token type that may meet your security requirements

## Create protect middlewear
* check for authorization Header and that it starts with "Bearer"
* We use array `split` method to just get the token (we don't need the "Bearer")
    - We split at the space and get the token which will be in the `req.headers.authorization.split(' ')[1]`

### Comment out cookies (for now)
* Testing with cookies is harder so we'll just check for them and assign `req.cookies.token` to `token` but we'll comment it out for now
* `jwt.verify(TOKEN, SECRET)`
    - Must be the secret the `jwt` was signed with
    - We `console.log()` to see what decoded looks like
    - We find the user in our Database by the `id` inside our decoded jwt
        + Whatever `id` is in that token (which the user got by logging in with correct credentials), that will be passed in here and that will be set to our `req.user`
            * **note** This will ALWAYS BE the currently logged in user
    - This is what a `decoded` item looks like

```
{ id: '5ec77909e9a5e3cde5b4c278', iat: 1590212213, exp: 1592804213 }
```

`middleware/auth.js`

```
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/error-response');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
```

## How to we use this protect middleware?
* Wherever we want to use this in our routes
* We need to add it as a first parameter before the method
* We have to bring in the protect middleware first
    - We can destructure and bring in `protect` middleware

`route-bootcamps.js`

```
const express = require('express');
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/controller-bootcamps');

const router = express.Router();

const { protect } = require('../middleware/auth');

// /api/v1/bootcamps
router
  .route('/')
  .get(getBootcamps)
  .post(protect, createBootcamp);

// /api/v1/bootcamps/123
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
```

* Whatever routes we need to protect we add `protect`
    - We'll need to do this with courses routes
        + Include protect at top of courses routes too
            * protect:
                - addCourse, updateCourse, deleteCourse
    - Also protect 
        + Upload a photo

## Test if our protect middleware is working
* Remove the authorization Bearer token
* Add a new bootcamp called `Testing123`
* That POST request should fail with:

```
// MORE CODE

{
    "success": false,
    "error": "Not authorized to access this route"
}
// MORE CODE
```

## Test now by logging in with a user in Database
* user: `john@doe.com` and password `123456` 
* Copy the token (after logging in)
* Add in Headers `Authorization` and type `Bearer PASTE_YOUR_TOKEN_HERE` (don't forget the space)
* **UPDATE** I made the bootcamp emails not unique so a user could create multiple bootcamps and use the same email
    - I was getting `duplicate value entered` when not changing emails
    - TODO: `even though unique was removed all bootcamp emails still must be unique - figure out why this is not working as expected`
* After a successful entry is made with a logged in Bear token provided, a new bootcamp is created

### Also test a valid Bearer token but change last character to something else and it should
* Give 401 Unauthorized and `Not authorized to access this route` error
* Review this chunk of code

`auth.js`

```
// MORE CODE

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {

// MORE CODE
```

1. We passed in the token to verify and we see the decoded in the terminal (we logged it out)

```
{ id: '5ec77909e9a5e3cde5b4c278', iat: 1590212213, exp: 1592804213 }
```

* And that `id` is the user._id from that token
* We use that id and find the user with `User.findById(decoded.id)`
    - And then we get the user
    - And we assign that user to `req.user`
    - **IMPORTANT** So now IN ANY ROUTE where we use that middleware we have access to `req.user` (and any of the user fields!)

## Now we'll get the route to get the currently logged in user
`controller-auth.js`

```
// @desc     Get current logged in user
// @route    GET /api/v1/auth/me
// @access   Private 
```

* We point it to `/me` and we use GET request method
* It is Private so the user needs to be logged in to access this request route

```
// @desc     Get current logged in user
// @route    GET /api/v1/auth/register
// @access   Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
```

## Add it to our router
`route-auth.js`

* We include `getMe`
* We add in our protect method
* We use `get` and point it to `/me` for full `/api/v1/auth/me` route
* We add in our `protect` middleware

```
const express = require('express');
const { register, login, getMe } = require('../controllers/controller-auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

// /api/v1/auth

router.post('/register', register);

router.post('/login', login);

rrouter.get('/me', protect, getMe);

module.exports = router;
```

# Add in Postman
* We will have a GET request
* It doesn't need a body
* But we do need `Authorization` Header with Bearer token
* Save GET request in Authentication folder as `Get Logged in User via Token`

### Test
* You should see the currently logged in user is in the response

```
{
    "success": true,
    "data": {
        "role": "publisher",
        "_id": "5ec77909e9a5e3cde5b4c278",
        "name": "John Doe",
        "email": "john@doe.com",
        "createdAt": "2020-05-22T07:02:33.938Z",
        "__v": 0
    }
}
```

* **note** The password is not in the user response because we use `select: false` in the User model
    - Even though the user password is encrypted (hashed and salted) we still never want to return it

## Test with another user
* Create jane@doe.com
* Doesn't matter if you register or log in you'll get a token with an id
    - Now try to log in using the `me` route and you'll get the new user logged in
* New user logged in

```
{
    "success": true,
    "data": {
        "role": "publisher",
        "_id": "5ec8c0eb16f20c6c7c1f432d",
        "name": "Jane Doe",
        "email": "jane@doe.com",
        "createdAt": "2020-05-23T06:21:31.647Z",
        "__v": 0
    }
}
```

## NEXT 
* Having to manually enter the Authorization and value is a pain
* There is a better, more efficient way
* Instead of the `Headers` request tab in Postman we'll use the `Authorization` tab
    - So when we log in, that token will automatically get stored in Postman and we can use it through the `Authorization` tab
