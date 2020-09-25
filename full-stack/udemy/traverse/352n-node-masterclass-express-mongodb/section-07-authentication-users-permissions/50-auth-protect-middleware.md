# Auth Protect Middleware
* We are able to `register` or `login` and get a `token`

## Now we'll create a piece of middleware
* This middleware will make it so that we have to send this token to certain routes to:
* Create a new bootcamp
    - A logged-in user should be able to create a new bootcamp but not someone that is a "guest" that is not logged in
    - **note** We'll defer our discussion on "roles" for now

## Dealing with the token
1. We take the token
    - Typically it will be stored in a `cookie` or `localStorage` on the **client side**
2. When we make the request to create a new bootcamp
    - In the Headers we would send along an `Authorization` Header with that token
        + The convention for the value is `Bearer token AND_THE_TOKEN_HERE`

![token in Header with Authorization](https://i.imgur.com/JzBa3ZI.png)

### Steps to create an Authorization token
1. Select Headers tab of the request in Postman
2. Add `Authorization` for Key
3. Login as a user to get a token (new request)
4. Go back to `POST {{DOMAIN}}:{{PORT}}/api/v1/bootcamps` (create a bootcamp) and enter the token in value but first type `Bearer ` (make sure you include a space after `Bearer`) so it will look like:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjY5MTQ5OTVkMTgwNzU2OTJiMTA1ZCIsImlhdCI6MTYwMDU2NTUxMywiZXhwIjoxNjAzMTU3NTEzfQ.ydMU1eya1_fgIo69ZpPBu8XPjR0kOUK3MFFkw8MEEwk
```

![Bearer token in Postman](https://i.imgur.com/8tWD9Gy.png)

1. We need to get the Bearer token in our application
2. And then extract the user `id` from the `token`
3. And then look that `user` up
4. And then put that into a `request` variable

## What is a Bearer Token
* [reference](https://www.oauth.com/oauth2-servers/differences-between-oauth-1-2/bearer-tokens/)
    - The most common way of accessing OAuth 2.0 APIs is using a “Bearer Token”
    - This is a single string which acts as the authentication of the API request, sent in an HTTP “Authorization” header
    - The string is meaningless to clients using it, and may be of varying lengths
    - `Pros`
        + Bearer tokens are a much simpler way of making API requests, since they don’t require cryptographic signing of each request
        + The tradeoff is that all API requests must be made over an HTTPS connection, since the request contains a plaintext `token` that could be used by anyone if it were intercepted
        + The advantage is that it doesn’t require complex libraries to make requests and is much simpler for both clients and servers to implement
    - `Cons`
        + The downside to Bearer tokens is that there is nothing preventing other apps from using a Bearer token if it can get access to it
            * This is a common criticism of OAuth 2.0, although most providers only use Bearer tokens anyway
            * Under normal circumstances, when applications properly protect the access tokens under their control, this is not a problem, although technically it is less secure
* **note** If your service requires a more secure approach, you can use a different access token type that may meet your security requirements

## Create protect middleware
* Check for authorization Header and that it starts with "Bearer"
* We use array `split` method to just get the token (we don't need the "Bearer")
    - We split at the `space` and get the `token` which will be in the `req.headers.authorization.split(' ')[1]`

### Comment out cookies (for now)
* Testing with cookies is harder so we'll just check for them and assign `req.cookies.token` to `token` but we'll comment it out for now
* `jwt.verify(TOKEN, SECRET)`
    - Must be the secret the `JWT` was signed with
    - We `console.log()` to see what decoded looks like
    - We find the user in our Database by the `id` inside our decoded JWT
        + Whatever `id` is in that `token` (_which the user got by logging in with correct credentials_), that will be passed in here and that will be set to our `req.user`
            * **note** This will ALWAYS BE the currently logged in user
    - This is what a `decoded` item looks like

```
{ id: '5ec77909e9a5e3cde5b4c278', iat: 1590212213, exp: 1592804213 }
```

`middleware/auth.js`

* We can access any Headers we want using `req.headers`

```
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {

  // Get token from Header (req.headers)
  // const token = req.header('x-auth-token');
  const {authorization} = req.headers;
  let token;

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    // Not Authorized client error
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // let's see what the decoded token looks like
    console.log(decoded);

    // Assign the user to the request
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    // Not Authorized client error
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }
});
```

## The secret
* Remember in `User.js` we used a **secret** when we signed our token

`models/User.js`

```
// MORE CODE

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  // Store current user id as payload in JWT
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

// MORE CODE
```

* When decoding that token we need to use the exact same secret (JWT_SECRET)

`middleware/auth.js`

```
// MORE CODE

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

// MORE CODE
```

## About the `decoded`
* We log this out so you can see it
* The decoded object will have an `id` property (which is the user `id`)
* So we set a new `req.user` value to search the `User` model and find a `user` with a matching `id` we have in `decoded` via `decoded.id`
* **Remember** The user got that `id` when they logged in with correct credentials
* And then we get the user that is logged in and we set it equal to `req.user`
* **note** This `req.user` will always be the current logged in user

`middleware/auth.js`

```
// MORE CODE

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // let's see what the decoded token looks like
    console.log(decoded);

    // Assign the user to the request
    req.user = await User.findById(decoded.id);

    next(); // Don't forget to call next() to move to next middleware
  } catch (err) {

// MORE CODE
```

## How do we use this protect middleware?
* Wherever we want to use this in our routes
  - We need to add it as a first parameter before the method
  - We have to bring in the protect middleware first
    - We can destructure and bring in `protect` middleware

`routes/api/v1/bootcamps.js`

```
// MORE CODE

const router = express.Router();

// bring in our protect middleware
const { protect } = require('../../../middleware/auth'); 

// Re-route into other resource routers
// anything that contains :bootcampId route that into the courses router
router.use('/:bootcampId/courses', courseRouter);

// /api/v1/bootcamps
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// /api/v1/bootcamps/:id/photo
// protect uploading images
router.route('/:id/photos').put(protect, bootcampPhotoUpload); 

// /api/v1/bootcamps
router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, createBootcamp); // protect creating bootcamps

// api/v1/bootcamps/:id
router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, updateBootcamp) // protect updating bootcamps
    .delete(protect, deleteBootcamp); // protect deleting bootcamps

module.exports = router;
```

* Whatever routes we need to protect we add `protect`
    - **note** We'll need to do this with courses routes
        + Include protect at top of courses routes too
            * protect:
                - createBootcamp
                - updateBootcamp
                - deleteBootcamp
    - Also protect 
        + bootcampPhotoUpload

## Test if our protect middleware is working
* Remove the authorization Bearer token
* Add a new bootcamp called `Testing123`

```
{
    "name": "Testing BOOTCAMP",
    "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
    "website": "https://devworks.com",
    "phone": "(111) 111-1111",
    "email": "testing@devworks.com",
    "address": "233 Bay State Rd Boston MA 02215",
    "careers": [
        "Web Development",
        "UI/UX",
        "Business"
    ],
    "housing": true,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
}
```

* That POST request should fail with:
  - It fails because we did not send a token

```
// MORE CODE

{
    "success": false,
    "error": "Not authorized to access this route"
}
// MORE CODE
```

## Test now by logging in with a user in Database
* Use the Login request

`POST {{DOMAIN}}:{{PORT}}/api/v1/auth/login`

* Put this in the body of the request

```
{
    "email": "jdoe@example.com",
    "password": "123456"
}
```

* Copy the token (after logging in)
* Add in Headers `Authorization` and type `Bearer PASTE_YOUR_TOKEN_HERE` (don't forget the space)
* Will look something like:

![Add Authorization with Bearer token](https://i.imgur.com/VuuxDOj.png)

### I updated Bootcamp model
* Changed the email from having to be unique to just required
* I want the ability to have the same email for multiple bootcamps

`models/Bootcamp.js`

```
// MORE CODE

    email: {
        type: String,
        required: [true, 'Please add an email'],

// MORE CODE
```

* **note** To make sure this works drop all the course and bootcamps and import them again with the seeder.js
  - Also delete the users and register a new user and use that token at the Bearer token for the create a new bootcamps request

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

* And that `id` is the `user._id` from that token
* We use that `id` and find the user with `User.findById(decoded.id)`
    - And then we get the user
    - And we assign that user to `req.user`
    - **IMPORTANT** So now IN ANY ROUTE where we use that middleware we have access to `req.user` (and any of the user fields!)

## Now we'll get the route to get the currently logged in user
`controllers/auth.js`

* Below is called `the signature` copy it from elsewhere and paste and then just update it

```
// @desc     Get current logged in user
// @route    GET /api/v1/auth/me
// @access   Private 
```

* We point it to `/me` and we use GET request method
* It is `Private` so the user needs to be logged in to access this request route
* We now have access to `req.user` (which is always the logged in user)
* **note** Don't forget `await` or you'll get this error in Postman:

```
{
    "success": false,
    "error": "Converting circular structure to JSON\n    --> starting at object with constructor 'NativeTopology'\n    |     property 's' -> object with constructor 'Object'\n    |     property 'sessionPool' -> object with constructor 'ServerSessionPool'\n    --- property 'topology' closes the circle"
}
```

`controllers/auth.js`

```
// @desc     Get current logged in user
// @route    GET /api/v1/auth/me
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
`routes/api/v1/auth.js`

* We include `getMe`
* We add in our `protect` method
* We use `get` and point it to `/me` for full `/api/v1/auth/me` route
* We add in our `protect` middleware

```
const express = require('express');
const { register, login, getMe } = require('../../../controllers/auth');

const { protect } = require('../../../middleware/auth');

const router = express.Router();

// /api/v1/auth/register
router.post('/register', register);

// /api/v1/auth/login
router.post('/login', login);

// /api/v1/auth/me
router.get('/me', protect, getMe);

module.exports = router;
```

# Add in Postman
* We will have a GET request
* It doesn't need a body
* Add Headers
  - `Content-Type`: application/json
  - `Authorization` with Bearer token
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

* **note** The `password` is not in the user response because we use `select: false` in the **User** model
    - **BEST PRACTICE FOR SECURITY** Even though the user password is encrypted (hashed and salted) we still never want to return it

## Test with another user
* Create jane@doe.com
* Now it doesn't matter if you `register` or `log in` with jane because I get a token with jane's `id`

## Now using the `me` route and you'll get the new user logged in
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
