# Generating Auth tokens and setting Headers
* Integrate this into the `todo` API
* First place we'll do that is inside this route

`server.js`

```js
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then(
    user => {
      res.send(user);
    },
    err => {
      res.status(400).send(err);
    }
  );
});
```

* Currently we don't return an auth token ---- not good!
    - We don't want the user to sign up and then make a separate login request
    - When they sign up... give them a token back
* We could put this code in our route handler
    - But we're going to be reusing it in multiple places
    - The sign up and login will require this functionality
    - So it's smarter to break this out as a reusable method

## Model methods vs Instance methods
* Model methods are called on the Class... `User` (uppercase)
    - `findByToken()`
        + Doesn't exist inside of mongoose
        + This will be a custom Model method we'll create
        + It takes the `jwt` token that the user sends in one of their secure requests, we'll find the individual user, and we'll return that user to the `caller`
* Instance methods are called on an individual user `user` (lowercase)
    - `generateAuthToken()`
        + Will be responsible for adding a token onto the individual Document
        + Saving that and return it to the user
            * This requires the individual Document to work
            * We can't generate the `auth` token if we don't have the user `id` and access to updating that individual user so we can add that token to it's token's array

## Restructure app for flexibility ----> UserSchema
* This will not alter the functionality of our app at all
* In order to create these user methods we have to change how we create our User model

### UserSchema
* `const UserSchema = new mongoose.Schema({});`
    - That is how you define a new schema
* We can't add methods onto User so this is how we add methods (generating a Schema)
* We just cut and paste our User object into our schema like this:

`user.js`

```js
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
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
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
```

* Now we can add any method we want onto `UserSchema` using this syntax:

* `UserSchema.methods`
    - `methods` is an object
    - We will add our instance methods
        + `generateAuthToken`
            * instance methods do have access to the individual Document
            * This is great because we need this info to create our JSON token
            * We DON'T USE ARROW FUNCTION HERE!
                - Arrow functions do not bind a `this` keyword
                - We need a `this` keyword so we use a regular function
                - `this` keyword stores the individual Document

## Import jsonwebtoken `jwt`
```js
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
// MORE CODE
```

* Generate token with secret

```js
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'abc123')
    .toString();
};
```

* That secret is very important and for security we'll eventually move it to a more secure location
* If someone has our secret they can compromise our site

## Update the user token's array
```js
// MORE CODE
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'abc123')
    .toString();

  user.tokens.push({
    access,
    token,
  });
};
// MORE CODE
```

## Save those changes
`user.save()` - returns a promise so we can call `then()`

```js
user.save().then(() => {
  return token;
})
```

* We pass in our success callback function
* We just return `token` (variable we defined above)
* We do this so later on in `server.js` we can grab the token by tagging on another `then()` callback, getting access to the token and then responding inside the callback function

```js
user.save().then(() => {
  return token;
}).then((token) => {

})
```

* The nested `then()` statement above will happen in `server.js`
    - So in order to allow `server.js` to chain on the Promise, we will return it like this:

```js
return user.save().then(() => {
  return token;
});
```

* You may not have seen this done before
    - Usually when you return to chain in a Promise, you return another Promise
    - But in this case we are JUST returning a value and this is perfectly legal
    - That value will get passed as the success argument for the next `then()` call

### Final `user.js`
```js
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
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
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'abc123')
    .toString();

  user.tokens.push({
    access,
    token,
  });

  return user.save().then(() => {
    return token;
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
```

## Moving on to server.js generating the token
* By calling `generateAuthToken()` method and adding it as a Header

### Start inside save callback of POST /users route handler
`server.js`

```js
// MORE CODE
user.save().then(
  user => {
    res.send(user);
  },
  err => {
    res.status(400).send(err);
  }
);
// MORE CODE
```

* We'll delete `send.user(user)` because we don't want to respond right here
* Instead we're going to call the `generateAuthToken()` method

```js
user.save().then(
  user => {
    // res.send(user)
    return user.generateAuthToken();
  },
  err => {
    res.status(400).send(err);
  }
);
```

* We **return** `user.generateAuthToken()` because we are expecting a chaining Promised
    - And we can tack on another `then()` callback
        + And this will get called with the `token` value

```js
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user
    .save()
    .then(user => {
      return user.generateAuthToken();
      // res.send(user);
    })
    .then(token => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});
```

* Now we have everything we need to make the `response`
    - We have the `user` and we have the `token`
* **note** Now `user` is different than it was before

```
const user = new User(body);

user
  .save()
  .then(user => {
```

* Both `user` above are the exact same object (in memory)
* So we can remove the latter one

```
const user = new User(body);

  user
    .save()
    .then(() => {
```

* Now it is more clear that all we are doing is sending back the `user`

## Add on Header
* Send token back as a HTTP response Header (which was our goal from the start)

`res.header(HEADER_NAME, VALUE_YOU_WANT_TO_SET_HEADER_TO).send(user);`

### x-
* When you prefix a Header with `x-` you are creating a **custom Header**
    - Which means it's not Header that HTTP supports by default
    - It is a Header that you are using for specific purposes
    - We are using a `jwt` token scheme so we are using a custom Header so we can store that value

`res.header('x-auth', token).send(user);`

### Final code for adding jwt token to header
```js
// MORE CODE
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// MORE CODE
```

### Test to see if it is working
* Start mongod `$ mongod`
* Start our server `$ node server/server.js`
* Open Postman
    - Use local setup
    - Use our saved `POST /users`
    - Change to a new email
* And we get back something like:

```js
{
    "__v": 1,
    "email": "joe2@joe1.com",
    "password": "123456",
    "_id": "5a447f51c07712397ed964d9",
    "tokens": [
        {
            "access": "auth",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTQ0N2Y1MWMwNzcxMjM5N2VkOTY0ZDkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTE0NDM4NDgxfQ.Oo2sB7gAPtdFc8glJPxQlQXSxc9PqaGky7nP-n_Q-Kk",
            "_id": "5a447f51c07712397ed964da"
        }
    ]
}
```

* We see the entire user document
    - This is a problem that we'll fix in a moment
    - We have:
        + Our access value
        + Our token value
        + A unique id for this object
        + All inside the `tokens` array
* Switch to the `Headers` tab (You should see `(7)` beside it) and when you open it you'll see that we indeed successfully added our custom `x-auth` custom Header with our `token`
    - This is the JWT value that we're going to send with our secure requests like posting todos, getting todos or deleting todos

## Make the values we send back more secure
* We don't want to offer to much user data to the client
* We should just send back the email and the password
    - And leave off the `_id` and the `tokens` array
    - The others are the secure properties that should NEVER EVER get sent back to the user, because they have no reason for them

## Override a method
`user.js`

```js
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash'); // add to use _.pick()

// MORE CODE
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};
// MORE CODE
```

* We created a method (generateAuthToken)
* But we can also override a method to update how mongoose handles certain things
* `user.toObject();` is responsible for taking your mongoose variable `user` and converting it to a regular object where only the properties available on the document exist
## Restart server to Test
* Make a new signup request to see if we only see `_id` and `email`
*

```json
{
    "_id": "5a44848eaf938c3bbfaace7f",
    "email": "mike500@joe1.com"
}
```

* It worked!
* We only send the user what they need
* Our token is added to the header using `x-auth` custom Header
