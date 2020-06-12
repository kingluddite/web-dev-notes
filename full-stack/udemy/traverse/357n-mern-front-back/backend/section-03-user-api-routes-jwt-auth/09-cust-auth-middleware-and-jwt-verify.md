# Custom Auth Middleware & JWT Verify
* We want to send our token back to authenticate access protected routes (we'll accomplish this by creating our own custom middleware)
* Passport is good to use if you are using Facebook or Twitter OAuth but if not just write custom middelware as JS Passport if very "heavy"

## Create `middleware` folder
### What is a "middleware function"?
* A middleware function has access to the request and response cycle (aka the req and res objects)
    - And `next` is a callback function we have to run in order for it to move on to the next piece of middleware

## token
* We get it from the header `req.header('x-auth-token')`
* `401` server status is `Not Authorized`
* We decode the token by `verify()` it
    - verify needs to things:
        + The token
        + The secret

`middleware/auth.js`

* Here is our middleware that grabs the token from the request header and attaches the user to the request
* We deal with errors if they occur
* We export this middleware so we can use it in other files inside our app
* After we do this if there is a token we can use that toke because we add it to req.user and then we can use the token on any of our routes we want to protect (example: we can send the token to the user's profile and protect that route

```
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from Header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // assign the user to the request
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
```

## Implement our auth middleware into a protected route
* We will use it in our `auth` route
* We just add it as the second argument in the `router.get()`
* That's it, the route is protected, if you visit `http://localhost:5000/api/auth` you will get the error `no token, authorization denied`

`routes/api/auth.js`

```
const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, (req, res) => res.send('auth route'));

module.exports = router;
```

## How can we make our auth route work
* We grab our token from the register user route request endpoint `http:localhost:5000/api/user` (In Production this token would expire after an hour but in Development we set it to expire after a "long" time)
* We go to `http://localhost:5000/api/auth` and set a header to `x-auth-token` with a value of (and we paste in our token)
    - Then try the route auth endpoint again and you will get 200 success server status
    - You will get the log `Auth route`

![add x-auth-token header](https://i.imgur.com/Ftu25tp.png)

* If you change the last letter of the token, and click send in Postman you will get `token is not valid` 401 Unauthorized error
* This proves our middleware is now working and doing it's job

## Now we want this route to return the user's data
* We need to search the Database for the user
    - This means we'll need to import User model
    - We'll use mongoose `findById({ id: req.user.id})`
* We have the `id` from the token
* We'll do a try/catch to make sure we catch any errors if something goes wrong

`routes/api/auth`

```
const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, (req, res) => {
  try {
    const user = User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
```

## Test it in Postman
* We get an error because we are trying to get data from our Database and we get a Promise from `User.findById()`
    - We could use `then()` but cleaner to use `async/await`

### Adding async/await
```
const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

* Test again in Postman and this is a success and we get this in the response

```
{
    "_id": "5edd06fa1a6e6a6966a9a865",
    "name": "John Doe",
    "email": "howley.phil@gmail.com",
    "avatar": "//www.gravatar.com/avatar/39bc26d9d735a3e215473f085cd22345?size=200&default=mm&rating=pg",
    "password": "$2a$10$oEMOI2PvyEL/fy9LoOjMJuPM4jkR1zV5PpLlxNqxzq/Bx8kYjZeae",
    "date": "2020-06-07T15:25:46.216Z",
    "__v": 0
}
```

### We have a problem!
* We don't want to send back our password. Even though it is encrypted we should never send our password to the client
* We prevent sending our password to the client with this code:

```
// MORE CODE

const user = await User.findById(req.user.id).select('-password');

// MORE CODE
```

* Here is the fragment of code it is used in

`routes/api/auth.js`

```
// MORE CODE

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {

// MORE CODE
```

* And in Postman when we hit `Send` again we don't see the password

```
{
    "_id": "5edd06fa1a6e6a6966a9a865",
    "name": "John Doe",
    "email": "howley.phil@gmail.com",
    "avatar": "//www.gravatar.com/avatar/39bc26d9d735a3e215473f085cd22345?size=200&default=mm&rating=pg",
    "date": "2020-06-07T15:25:46.216Z",
    "__v": 0
}
```

## Later in our React app
* We will constantly make a request with the token (if we're authenticated) and we'll fill our React state (or more specifically our Redux state - application state) will have a user object with the above data inside it and this will let us know which user is logged in at all times

## Save Collection in Postman
* Save inside Users & Auth collection as `Get auth user`

## Next - Log in
* Right now we can register and it gives us a token back
* Now we need to take the credentials of a user (the email and the password) and send that to a route and get the token back (the same way it does for the registration)

