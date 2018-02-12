# Loggin In POST /users/login
* We'll set up a route for logging in existing users
* As it stands right now, the only way we get a `x-auth` token back is on the signup call
* if you lose the token or you sign in from a different device, you'll need a way to get a new one
    - Currently, that is not possible
    - you can't make another call to the POST /users route because the email already exists, so that call will return a 400 status

## We need a dedicated route for logging in users
* Route we'll use POST `/users/login`
* When we make a post request to this route we will also send data
    - an `{email, password}` in the request body
    - The password will be in plain text
    - So...
        + We'll need to find a user in the mongodb user's collection who:
            1. has an email matching the email sent in
            2. has a hashed password equals the plain text password when passed through the `bcrypt` compare method

```js
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
```

## Challenge
* Set up this route
* Then pick up the email and password from the request body
* To verify that the route is setup correctly use res.send() and send back the body data
* fire up server
* make login call in Postman pass in an email and password
* and make sure you get the email and password back

### Solution
```js
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  console.log(body.email);

  res.send(body);
});
```

* Start up server

`$ nodemon server/server.js`

Postman, Make POST {{url}}/users/login (Todo App Local)

```js
{
 "email": "mike@mike.com",
 "password": "sithlord"
 }
```

## New model method
### findByCredentials
* will take email and password as args
* will return a Promise with the user or an error if user didn't exist
* bcrypt library accepts callbacks not Promises

```js
UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
    })
  });
};
```

`server.js`

```js
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).send();
    });
});
```

## Challenge
* Complete the custom `findByCredentials()`

### Solution
```js
UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};
```

* Wipe TodoApp in robomongo
* Use POST /users local Postman route to find email and password of user

```json
{
  "email": "joe@joe1.com",
  "password": "123456"
}
```

* Send to create a new user
* If you get 'Could not get any response' make sure you have mongod and nodemon running

`$ nodemon server/server.js`

* Then hit `Send` again
* You get new user and `x-auth` added to Header
* Now we need to use these exact same credentials inside our login route
* New tab POST {{url}}/users/login
* Body, raw

```json
{
  "email": "joe@joe1.com",
  "password": "123456"
}
```

* Hit send
* Should get status of 200

```js
{
    "_id": "5a465bb57c1c6e0f9133dfd9",
    "email": "joe@joe1.com"
}
```

* And above is the feedback when means we get the user object back
* check if `_id`s match

    - in body of POST /users/login and:
    - in body of POST /users

#### Check for bad passwords
* Should give status of 400
* Or check for email that doesn't exist 400 too
* Save to postman in Todo App collection

## One more step
* Generate new token and send it back
* We will resue or `generateAuthToken()`

```
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      res.send(user);
    })
```

* We won't send user like in `res.send(user)` above
* Instead we'll generate our token

```js
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(err => {
      res.status(400).send();
    });
});
```

* Now in Postman
* Use /users/login with valid email/password combo
* Hit send
* You whould see 200 status
* and x-auth populated with token
* copy that x-auth value
* change to GET users/me
* swap out x-auth value for the copied x-auth value in your clipboard

* Hit send and you should get 200 status
* Change value slightly and you'll get 401 unauthorized

## Git
* Shut down nodemon
* `$ git status`
* `$ git commit -am 'Add POST /users/login route'`
