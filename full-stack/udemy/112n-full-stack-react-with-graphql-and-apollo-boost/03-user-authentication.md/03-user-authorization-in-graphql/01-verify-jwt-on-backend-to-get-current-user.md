# Verify JWT on Backend to Get Current User
* We are sending our local token to our backend 

## But...
* Whenever we `signin` and there is no value in `localStorage`

### Let's try this now:
1. Open Application and delete the token
2. Then sign in again

* You will get `null` sent to the backend

## Why is token null?
* Add this check to `server.js`

```
// MORE CODE

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(token, typeof token);
  next();
});

// MORE CODE
```

* Login and you'll see type of token is `string`
* And remove token and login again and you'll see `null` is also a type of `string`

### Check for a string of "null"
* If we don't have a string of "null"
* Make sure to import `jsonwebtoken` (jwt)

`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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
  const token = req.headers['authorization'];
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

* log in and you'll see the user object on backend

```
[server]  { username: 'bob',
[server]   email: 'bob@bob.com',
[server]   iat: 1535035353,
[server]   exp: 1535038953 }
```

## Next - add getCurrentUser query
