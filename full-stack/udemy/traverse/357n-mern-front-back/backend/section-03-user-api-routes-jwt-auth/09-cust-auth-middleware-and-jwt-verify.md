# Custom Auth Middleware & JWT Verify
* We want to send our `token` back to authenticate access protected routes (_we'll accomplish this by creating our own custom middleware_)

## What about PassportJS?
* Passport is good to use if you are using Facebook or Twitter OAuth but if not just write custom middelware as PassportJS has a very "heavy" footprint

## Create `middleware` folder
### What is a "middleware function"?
* A middleware function has access to the **request and response cycle** (aka the `req` and `res` objects)
    - And `next` is a **callback** function we have to run in order for it to move on to the "next" piece of middleware

## How do we access the jwt token?
* We get it from the Headers `req.header('x-auth-token')`
* **note** `401` server status is `Not Authorized`

## How do we decode the token?
* We decode the token by `verify()` it
    - `verify()` needs two arguments:
        + The token
        + The secret

## Create this new `middleware` folder and `auth.js` file

`middleware/auth.js`

* Here is our middleware that grabs the `token` from the **request header** and attaches the `user` to the **request**
* **note** We deal with errors if they occur
* **note** We export this middleware so we can use it in other files inside our app
* After we do this if there is a `token` we can use that `token` because we add it to `req.user` and then:
  - We can use the token on any of our routes we want to protect (_example: we can send the token to the user's profile and protect that route_)

`middleware/auth.js`

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

`routes/api/auth.js`

```
const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

// @route    GET api/auth
// @desc     Test route
// @access   Private
router.get('/', auth, (req, res) => res.send('auth route'));

module.exports = router;
```

### That's all we have to to and the route is protected!
* If you visit `http://localhost:5000/api/auth`
  - You will get the error `no token, authorization denied` in Postman's response

```
{
    "msg": "No token, authorization denied"
}
```

## Test if our auth works
* We need to know if our routes can be protected

### How can we make our auth route work?
1. Grab our `token` from the register user route request endpoint `http:localhost:5000/api/user`
  * **note** In Production this token would expire after an hour but in Development we set it to expire after a "long" time
2. Visit `http://localhost:5000/api/auth` and set a header to `x-auth-token` with a value of (_Paste in our token_)
3. Then try the route `auth` request endpoint again
4. You will get 200 success server status with the log `Auth route`

![add x-auth-token header](https://i.imgur.com/Ftu25tp.png)

### Test if you enter a valid syntax for token but a wrong token
* If you change the last letter of the token, and click send in Postman you will get `token is not valid` 401 Unauthorized error
* This proves our middleware is now working and doing it's job

## Now we want this route to return the user's data
* We need to search the Database for the user
    - This means we'll need to import User model
    - We'll use mongoose `findById({ id: req.user.id})`
* We have the `id` from the token
* We'll do a `try/catch` to make sure we catch any errors if something goes wrong

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
### Houston we have a Problem! ----- Error!
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
router.get('/', auth, async (req, res) => { // add async here
  try {
    const user = await User.findById(req.user.id); // add await here
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
* **IMPORTANT** We don't want to send back our password! 
* **BEST PRACTICE** Even though it is encrypted we should never send our password to the client
* We prevent sending our password to the client with this code:

```
// MORE CODE

const user = await User.findById(req.user.id).select('-hashed_password');

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

## No more password sent to client!
* And we use `hashed_password` because that is our Database filed in our User model
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
* We will constantly make a request with the `token` (_if we're authenticated_) and we'll fill our React state (or more specifically our Redux state - application state) will have a `user` object with the above data inside it and this will let us know which user is logged in at all times

## Save Collection in Postman
* Save inside Users & Auth collection as `Get auth user`

## Next - Log in
* Right now we can register and it gives us a token back
* Now we need to take the credentials of a user (the `email` and the `password`) and send that to a route and get the token back (the same way it does for the registration)

