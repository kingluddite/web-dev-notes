# Logout to clear token/cookie
* When we login we have a cookie with a token value inside it
* We commented out some code in our auth middleware

`middleware/auth.js`

1. We are checking the headers for the token
2. If it is in there we are storing it inside the token
3. Then we move on to verify it...

* But we commented out the cookies part of it

```
// MORE CODE

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }
  // else if (req.cookies.token) { // WE COMMENTED THIS OUT!
  //   token = req.cookies.token;
  // }


// MORE CODE
```

## Comment in the commented out code
```
// MORE CODE

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    }
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

// MORE CODE
```

### Now log in
```
{
    "email": "jfighter@sftpw.com",
    "password": "123456"
}
```

* Now the cookie gets put in the client
    - Click the `Cookies` tab of the response
* And now that we commented that code in, the token inside the cookie will get sent with every request
    - And if you go to a protected route like (Get Logged in User)
    - And take the Bearer Token out of the Authorization tab (change it to `No Auth` from the dropdown)
    - And you send
    - It will still work
    - This is possible because it is using the cookie
        + It wasn't found in the header so the first part of our logic was false

```
// MORE CODE

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    }

// MORE CODE
```

* But then it looked in the cookies
    - And it found it
    - So the token got sent by that
    - **note** It is up to you if you want to use cookies or not, or you want to use the header or not... up to you

```
// MORE CODE

    else if (req.cookies.token) {
        token = req.cookies.token;
    }

// MORE CODE
```

## Add a log out
* So we can clear out the cookie

## Log in as someone else
```
{
    "email": "jwizard@sftpw.com",
    "password": "123456"
}
```

* Then click on Get Logged in User via Token
    - And you see they are logged in now
    - Even through Authorization is set to No Auth
        + This, once again, is because we have the token inside the cookie and it is sent with every request

## Create a log out route
* Add this just under the login route

`controllers/auth.js`

```
// MORE CODE

// @desc     Log user out / clear cookie
// @route    GET /api/v1/auth/logout
// @access   Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        data: {}
    });
});

// MORE CODE
```

* We'll set the cookie to `none` and have it expire very quickly (10 seconds)

* **Note** We have access to `res.cookie()` because we installed the `cookie-parser` middleware

## Add the route
`routes/api/v1/auth.js`

```
// MORE CODE

const express = require('express');
const { register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword, logout } = require('../../../controllers/auth'); // Add logout!

// MORE CODE

// /api/v1/auth/login
router.post('/login', login);

// /api/v1/auth/logout
router.get('/logout', logout); // add this

// MORE CODE
```

## Test in Postman
`GET {{DOMAIN}}:{{PORT}}/api/v1/auth/logout`

* `Name`: Logout user
* `Description`: Logout user and clear token and cookie
* Save to `Authentication` folder

### Log in as a user
```
{
    "email": "jwizard@sftpw.com",
    "password": "123456"
}
```

* See the cookie
* Now use the logout request route
* And you'll see the `token` value is **none** and `HttpOnly` is true

```
{
    "success": true,
    "data": {}
}
```

![cookie removed](https://i.imgur.com/TRl7UyK.png)

* Now go back to the `Get logged in user` request route
* And you'll see you successfully logged out

```
{
    "success": false,
    "error": "Not authorized to access this route"
}
```

* **Note** We set the token to expire in 10 minutes
* Let's change that to 2 seconds

`controllers/auth.js`

```
// MORE CODE

// @desc     Log user out / clear cookie
// @route    GET /api/v1/auth/logout
// @access   Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })

// MORE CODE
```

## What if you don't want to use cookies?
* Then just comment out the cookie logic in the auth middleware

```
// MORE CODE

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    }
    //else if (req.cookies.token) {
       // token = req.cookies.token;
   // }

// MORE CODE
```

## We will comment it out
* So we force to sent the token in the Header

## Add some comments to show how we are setting our token
```
// MORE CODE

    // Set token from Bearer token in header // ADD!
    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    }
    // Set token from cookie // ADD!
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

// MORE CODE
```

## Since we are not using cookies
* Add the Bearer Token back to the Authorization tab of Get Logged in User
* Make sure to save route

## TODO: Cookies or headers - which one to use?
* Which is more secure

## Next - Security improvements
* We have security vulnerabilities
    - NoSQL injections
    - XSS
