## Sending JWT in a Cookie
* We have register and login setup
* We are sending a token back to the client
    - The client could store this token in localStorage
    - And then we can create some middleware so that it can be sent in the HEADERS
    - But we also want to be able to send a cookie with this token so that could be stored in the browser
        + We do this because in some cases storing the token in a cookie could be safer than saving it in `localStorage`

### Read `47a-cookie-safer.md` for why cookies are safer than localStorage

## Cookie Parser
* We are going to use a package called `cookie-parser`
* [docs](https://www.npmjs.com/package/cookie-parser)

### What does cookie-parser do?
* Parse Cookie header and populate req.cookies with an object keyed by the cookie names
    - It will give us the ability to have access to `req.cookies`

### Install and enable the middleware
`$ npm i cookie-parser`

`server.js`

```
// MORE CODE

const cookieParser = require('cookie-parser');

// MORE CODE

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// MORE CODE
```

## Let's use the cookie-parser in our auth controller
* We get the signed token and return it twice

```
// MORE CODE

  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });

// MORE CODE
```

* We will create a custom function to use this
    - We'll need to pass in the user, the statusCode and the response

`controller-auth.js`

```
// MORE CODE
  // Create a token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// Get token from model, create Cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

  // Create a token
  const token = user.getSignedJwtToken();

}
```

* We need to set the expiration of our cookie as the same as our jwt (30 days)

`config/config.env`

```
// MORE CODE
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

* **IMPORANT** Since we changed our .env file we need to restart our server

## Set options and make our cookie expire in 30 days
* Log this out in `server.js`

`console.log(process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);`

* You'll get `2592000000` in terminal
* You can convert days to milliseconds [with this site](https://convertlive.com/u/convert/days/to/milliseconds#30)
* So our options:

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
  };
};
```

* We just need to expire the cookie in 30 days from now and we need to get the number of milliseconds for the current time `Date.now()` and we use our environment variable `30` and just multiplye that by 24 hours, 60 minutes, 60 seconds and 1000 milliseconds to get the number of milliseconds for the cookie to expire in 30 days

## We only want the cookie to be accessed through the client side scripts
* So we set `httpOnly: true`

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
};
```

## Send response
* We pass in a statusCode to sendTokenResponse
* To send a cookie you can do `res.cookie` (and we just tack it on)
    - `.cookie()` takes three arguments
        + the key (what is the cookie called)
        + The value (the token itself)
        + The options

`controller-auth.js`

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

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
    });
};
```

## Final auth controller
* Here we put our new utility function on top
* And we call it twice, passing it the user, the status code and the response

`controller-auth.js`

```
const ErrorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

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

  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});
```

## Test it out
* **note** Postman allows us to see the cookies

1. Delete user and add a user
2. View cookie tab in response

![cookie in postman](https://i.imgur.com/5awZPYL.png)

* You will see the name of the cookie `token`
* The value of the cookie (our token)
* When it expires
* HttpOnly is true
* Why is Secure false?
    - If we set the secure flat to `true` the cookie will be sent with HTTPS
        + We can set that (but we would only set that if it is in production)
* **Note** You will also generate a cookie when you log in

## Set Cookie to Secure only in production
`controller-auth.js`

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

  // we add this check to set options secure to true (HTTPS)
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
* Create a piece of middleware to validate the token
* Right now we can set our token
* We will send it in the HEADERS (we'll see that next)
* We'll need to validate the token and access the `payload`
