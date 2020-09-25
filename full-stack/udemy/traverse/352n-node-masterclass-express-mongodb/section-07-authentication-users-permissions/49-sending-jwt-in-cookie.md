## Sending JWT in a Cookie
* We have register and login setup
  - We are sending a token back to the client
    + The client could store this `token` in **localStorage**
    + And then we can create some middleware so that it can be sent in the HEADERS
    + **But we also want to be able to send a cookie** with this `token` so that could be stored in the browser
        + **note** We do this because in some cases storing the `token` in a **cookie** could be safer than saving it in `localStorage`

### Read `47a-cookie-safer.md` for why cookies are safer than localStorage

## Cookie Parser
* We are going to use a package called `cookie-parser`
* [docs](https://www.npmjs.com/package/cookie-parser)
    + Parse Cookie header and populate req.cookies with an object keyed by the cookie names
    + Optionally you may enable signed cookie support by passing a secret string, which assigns `req.secret` so it may be used by other middleware

### What does cookie-parser do?
* Parse Cookie header and populate req.cookies with an object keyed by the cookie names
    - It will give us the ability to have access to `req.cookies`

### Install and enable the middleware
* We'll install it
* We'll enable the middleware by running it through `app.use(cookieParser())`
* Then we'll have access to `req.cookie` and we can then set our token inside of cookie and we can validate it when it comes back to the server

`$ npm i cookie-parser`

`server.js`

```
// MORE CODE

const cookieParser = require('cookie-parser'); // ADD!

// MORE CODE

const app = express();

// Body parser
app.use(express.json({extended: false}));

// Cookie parser
app.use(cookieParser()); // ADD!

// MORE CODE
```

## Let's use the `cookie-parser` in our auth controller
* We get the signed token and return it twice
* Both in `register` and `login` we have duplicated code
  - Any time we have duplicated code we need to apply the DRY principle

`controllers/auth.js`

1. We get the token from the model

`const token = user.getSignedJwtToken();`

2. We send back the token in the response

`res.status(200).json({ success: true, token });`

```
// MORE CODE

  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });

// MORE CODE
```

## We will create a custom function that will keep our code DRY
* It will
  1. Get the token from the model
  2. Create cookie
  3. And send response
* We'll need to pass in the `user`, the `statusCode` and the `response`

`controllers/auth.js`

```
// MORE CODE
  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// Get token from model, create cookie and send response
const sendTokenInCookieReponse = (user, statusCode, res) => {

  // Create token
  const token = user.getSignedJwtToken();

}
```

### When does the cookie expire?
* **NOTE** We need to set the expiration of our cookie as the same as our JWT (30 days)

`config/config.env`

* **note** We can't use `30d` like we did with our JWT, we need to just use `30`
  - Because we need to do math inside our code to arrive at the "30 days"

```
// MORE CODE
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

* **IMPORANT** Since we changed our `.env` file we need to restart our server

## Set options and make our cookie expire in 30 days
* Log this out in `server.js`

`server.js`

```
// MORE CODE

// START UP EXPRESS
const app = express();
console.log(process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);

// MORE CODE
```

24 hours * 60 minutes * 60 seconds * 1000 milliseconds

* You'll get `2592000000` in terminal

![logging out 30 days in milliseconds](https://i.imgur.com/flXWCEg.png)

* You can convert days to milliseconds [with this site](https://convertlive.com/u/convert/days/to/milliseconds#30)

* So our options:

```
// MORE CODE
// Get token from model, create cookie and send response
const sendTokenInCookieReponse  = (user, statusCode, res) => {
  // Create a token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
};
```

## Here's how we expire a cookie in 30 days from now
* We just need to expire the cookie in 30 days from now
* And **we need to get the number of milliseconds for the current time** `Date.now()`
* And we use our environment variable `30` and just multiply that by 24 hours, 60 minutes, 60 seconds and 1000 milliseconds to get the number of milliseconds for the cookie to expire in 30 days

## Security is important with cookies!
* We only want the cookie to be accessed through the `client` side scripts
* So we set `httpOnly: true`

```
// MORE CODE
// Get token from model, create Cookie and send response
const sendTokenInCookieReponse = (user, statusCode, res) => {
  // Create a token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
};
```

## Send response
* We pass in a `statusCode` to **sendTokenInCookieResponse()**
* To send a `cookie` you can do `res.cookie` (and we just tack it on)
    - `.cookie()` takes three arguments
        + the `key` (what is the cookie called)
        + The `value` (the token itself)
        + The `options` (the expiration and stuff like that)

`controllers/auth.js`

```
// MORE CODE

// Get token from model, create cookie and send response
const sendTokenInCookieResponse = (user, statusCode, res) => {

  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    // cookie will expire in 30 days in 2592000000 milliseconds
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // For security cookie can only be accessed through client side scripts
    httpOnly: true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    })
}
```

## Final auth controller
* Here we put our new utility function on top
  - Cut it and move the function to the top of `controllers/auth.js`
* **And we will call it twice**, passing it:
  - The `user`
  - The `status code`
  - And the `response`
* And then it is up to the client side on how they want to handle it

`controllers/auth.js`

```
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// Get token from model, create Cookie and send response
const sendTokenInCookieReponse = (user, statusCode, res) => {
  // Create a token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
    });
};

// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenInCookieReponse(user, 200, res);
});

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

  sendTokenInCookieReponse(user, 200, res);
});
```

## Test it out
* **note** Postman allows us to see the cookies

1. Delete user and add a user
2. View cookie tab in response (in the response!)

![cookie in postman](https://i.imgur.com/5awZPYL.png)

* You will see the name of the cookie `token`
* The value of the cookie (our token)
* When it expires
* `HttpOnly` is **true**

### Why is Secure false?
* If we set the secure flag to `true` the cookie will be sent with HTTPS
  - We can set that (but we would only set that if it is in production)
* **Note** You will also generate a cookie when you log in

## Set Cookie to Secure only in production
`controllers/auth.js`

```
// MORE CODE
// Get token from model, create Cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create a token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Set options options to secure only in Production (HTTPS)
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
    });
};
```

## Next
* Create a piece of middleware to **validate the token**
* Right now we can set our `token`
* We will send it in the HEADERS (we'll see that next)
* We'll need to validate the token and access the `payload` of the JWT
