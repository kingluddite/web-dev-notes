# Verify JWT on Backend to Get Current User
## Create new branch
`$ git checkout -b auth`

* We are sending our local token to our backend 

## But...
* Whenever we `signin` and there is no value inside our `token` we sent to the server
* You see the token in `localStorage` but the server only sees `null` which means it does not have our token
* This is a problem 

## Why is token null?
* Add this check to `server.js`

`server.js`

```
// MORE CODE

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(typeof token);
  next();
});

// MORE CODE
```

* Login and you'll see type of token is `string`
* Remove token and login again and you'll see `null` is also a type of `string`

### Check for a string of "null"
* If we don't have a string of "null"
* Make sure to import `jsonwebtoken` (jwt)

`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // add this

// MORE CODE
```

`server.js`

```
// MORE CODE

app.use(cors(corsOptions));

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      console.log(currentUser);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// MORE CODE
```

* You may get this error `JsonWebTokenError: jwt must be provided`
* To fix change your function to look like this:

```
// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token, typeof token);
  if (token !== 'null' && token !== '' && token !== undefined) {
    try {
      // add currentUser to the request object
      req.currentUser = await jwt.verify(token, process.env.SECRET);
      console.log(req.currentUser);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});
```

* Log in and you'll see the user object on backend

```
[server]  { username: 'bob',
[server]   email: 'bob@bob.com',
[server]   iat: 1535035353,
[server]   exp: 1535038953 }
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add verify jwt on backend to getCurrentUser`

## Push to github
`$ git push origin auth`

## Next - add getCurrentUser query

## Additional Resources
* [view the data inside your jwt](https://jwt.io/)
