# Private Routes and Auth Middleware
* Turn Express routes into private routes
    - We'll require an x-auth token
    - We'll validate that token
    - We'll find the user associated with that token
    - Then, and only then, can you run the route code

## How to convert public route into private route
* We need to make it an easy process
* We'll add Express middleware that will help do this for us
    - Signup would be a public route
        + No sense in making it private if it was no one would sign up
            * How do you sign up for something when you 
            don't have permission to sign up?

## new route
* `res.header()` vs `req.header()`
    - `req.header()` enables us to grab that `x-auth` we need

## .statics
* Turns everything into a **Model method** as opposed to an **Instance method** (like `.methods`)

`const User = this`

* Instance methods get called with the individual document
* Model methods get called with the Model method with the `this` binding
* `decoded` will store the **decoded** `jwt` values

`user.js`

```js
UserSchema.statics.findByToken = function(token) {
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {}

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};
```

* User.findOne returns a Promise so that is why we `return User.findOne()`
* We need to query our **nested object properties**

```js
},
tokens: [
  {
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
],
```

* So how do we access `access` and `token`?
* We need to find a user who's token's array has an object where the token property we have
    - To query a nested object we wrap our nested property in quotes `'tokens.token': token`
    - We do the same thing for access
    - 'auth' is a string (not a variable)
    - quotes are required when we have a `.` in the value
    - We just add them around `_id` for consistency in our keys in our key/value pairs

```js
return User.findOne({
  '_id': decoded._id,
  'tokens.token': token,
  'tokens.access': 'auth',
});
```

## Final
```js
UserSchema.statics.findByToken = function(token) {
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {}

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};
```

* Now our success case is handled

## Continuing on inside `server.js`

`server.js`

```js
// MORE CODE
// app.get('/users/me', (req, res) => {
  const token = req.header('x-auth');

  User.findByToken(token).then(user => {
    if (!user) {
    }

    res.send(user);
  });
});
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
```

## Test
* After saving and running the server, it should work if we pass in a valid x-auth token
* Open robomongo
* Refresh connection
* Drop TodoApp database (our data is getting sloppy so best to start with a clean slate)
* Start up server
    - `$ node server/server.js`
* Open Postman to create user
    - We get our user back
    - We get our `auth` Header value

### Copy x-auth
* Make sure to grab it all (scroll horizontally to grab everything)
* New tab
* GET `{{url}}/users/me`
* Under Headers enter `x-auth` key and paste the token you copied to your clipboard under `value`
* Click send
    - You should see we get our user back
    - The `users/me` requires and `x-auth` value and you won't get the user unless you provide one
    - Delete that `x-auth` value, hit send again, and we get an error

## Write some code when the token is invalid
* Promise gets called with `resolve` and `reject`

```js
UserSchema.statics.findByToken = function(token) {
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};
```

* We work on our `catch` above
* The Promise gets returned by findByToken(), then over in `server.js` it will get rejected so our then() success case will never fire
    - the catch callback will so we can add

`server.js`

* **401** status code means authentication is required
    - If we get an error it means the user didn't authenticate correctly
        + `res.status(401).send()`
            * And we send back with the 401 status an empty body

`server.js`

```js
, res) => {
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if (!user) {
      }

      res.send(user);
    })
    .catch(err => {
      res.status(401).send();
    });
});
```

## Refactor `user.js`
* We can do this to clean up our code
* Exact same functionality but a lot more simple

```js
UserSchema.statics.findByToken = function(token) {
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};
```

* Old code above is commented out for the easier one line `return Promise.reject();`

## What if there is no user?
`server.js`

* There is a valid token but the query could not match the parameters we specified
* We want to send back a 401 status
    - We could do this:

```
User.findByToken(token)
  .then(user => {
    if (!user) {
      res.status(401).send();
    }
```

* But a more efficient way would be to do this:

```js
app.get('/users/me', (req, res) => {
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      res.send(user);
    })
    .catch(err => {
      res.status(401).send();
    });
});
```

* We return Promise.reject() - just like we did in user.js, the function will automatically stop, so the `res.send(user)` will never get executed, we'll run the error case and send back a 401 status

## Test if new code is working
* Restart server
* Create new user
* Copy x-auth
* Swith to other tab pointing to `users/me`
    - add new x-auth token
    - Alter first letter of token to see if you get the 401 not authorized server status
    - remove key value by deleting it and send and you should also get 401 unauthorized
* We will use this route with the x-auth param often so let's save it to our Todo App Postman collection
    - Save as `GET /users/me`
    - add key of `x-auth` and `text` as the value

## We have our one route privatized

## Break out this privatized route into some middleware
* **note** - middleware gets called with `req, res, next`

`/server/middleware/authenticate.js`

```js
const { User } = require('./../models/user');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      res.status(401).send();
    });
};

module.exports = { authenticate };
```

* We had to require the { User } object
* We had to user module.exports to get the file to be access in other files (we require it inside server.js)

## Require it
`server.js`

```js
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate'); // Add this line

const app = express();
// MORE CODE
```

## Use the middleware inside your routes
* This will make them private routes

```js
// MORE CODE
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});
```

* We pass the middleware into our route
    - Notice how it is in the "middle" (above)
* By the time we send the response with `res.send(req.user)` we checked to make sure the user has a valid id and token

## Next - Hashing passwords



