# User Register Encrypt Password
* Add to our controller our "registration " functionality
* Here is our register controller method

`controllers/auth.js`

```
// MORE CODE

// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
```

* Now we will be sending data in the body when we make our POST request
* We need to get that data
* We'll destructure to pull stuff out of `req.body`
* We're using Mongoose which always returns a promise
    - We'll use async/await syntax

`controllers/auth.js`

```
// MORE CODE

// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    hashed_password: password,
    role,
  });
});
```

* **note** We didn't `hash` the password above
* Instead we'll add a piece of middleware, so that when a user is saved the password, the password is automatically hashed there instead of putting into our controllers
    - We are trying to keep the controllers "clean" and put stuff that can go in the middle, in the middleware (in the model)

```
const ErrorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

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

  res.status(200).json({ success: true }); // add this
});
```

* We just want to make sure a user is being added
* Open Your Database in Compass

## Connect to compass
* Open mongo atlas remote
* Open your cluster
* Click on your Database
* Click `connect`
* Click `Connect using MongoDB Compass`
* Copy your string - it will resemble:

`mongodb+srv://icsadmin:<password>@ics.2luxs.mongodb.net/test`

* Replace `<password>` with your password and `test` with the name of your Database
* Click `CONNECT` button
* Click on your database
* Click on the `users` collection

## Postman
* Save the Register request
    - Save as `Register User`
    - Desc: `Add user to Database with encrypted password`
    - Save in `Authentication` folder
    - Click `Headers` tab of request and choose `JSON Content Type preset`
    - Make sure server is running `$ npm run dev`
    - In `Body` > raw > JSON and add:

```
{
    "name": "John Doe",
    "email": "jdoe@example.com",
    "password": "123456",
    "role": "publisher"
}
```

* And you will get a success in the response:

```
{
    "success": true
}
```

* View in Compass
  - **note** The password is NOT HASHED

```
{
    "_id": {
        "$oid": "5f64e08384a39e1125c29f09"
    },
    "role": "publisher",
    "name": "John Doe",
    "email": "jdoe@example.com",
    "hashed_password": "123456",
    "createdAt": {
        "$date": "2020-09-18T16:29:55.909Z"
    },
    "__v": 0
}
```

* Try to enter another user document but with a role of `admin`
  - We get a `400 Bad Request` error

```
{
    "success": false,
    "error": "`admin` is not a valid enum value for path `role`."
}
```

* Our Enum is working as expected, we can only enter `publisher` or `user`
* **note** You could target this error inside your error handler and send back a different message

### Test if you don't put a role
* It should default to `user`

```
{
    "name": "John Doe",
    "email": "jdoe@example.com",
    "password": "123456"
}
```

* You will see unique validation is working
* Enter a different email

```
{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "123456"
}
```

* And `user` is the default role

```

{
    "_id": {
        "$oid": "5f64e1d484a39e1125c29f0c"
    },
    "role": "user",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "hashed_password": "123456",
    "createdAt": {...},
    "__v": 0
}
```

## Tip - Mockaroo
* Helps you create JSON quickly
* [mockaroo](https://mockaroo.com/)

## View the new user
* In Compass

![new user](https://i.imgur.com/7Ponace.png)

* The user is a publisher and we can see the password (we never want to be able to see the password)

## Now we'll encrypt our password
* Include `bcryptjs` (we already installed it)
    - Confirm that `bcryptjs` is in your `package.js`

`models/User.js`

```
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

// MORE CODE
```

* **note** There is a `bcrypt` but there are lots of issues (especially with windows and dependencies)
* `bcryptjs` is a complete JavaScript implementation of **bcrypt** and it always just seems to work

### We add some middle to salt and hash our password
* This will happen before the user is inserted
    - `gen.salt()` is a method on the bcrypt object, it returns a promise so we need to use `await`
    - `gen.salt()` takes a number of rounds as an argument (the higher the rounds the more secure - but also the heavier it is on your system)
        + `10` is the recommended number in the `bcrypt` documentation
* When we use `user.create()` we have access to the `password` field (also `name`, `email` and `role` fields)
    - `password` will be plain text but we'll set it to (using await) `bcrypt.hash(this.password, salt)` (and we pass in our salt)
    - This will make the password very secure

## Troubleshooting
* If you get this error:

`Error: Illegal arguments: undefined, object`

* It is because ([from documentation](https://github.com/kelektiv/node.bcrypt.js#readme))

### with promises
* `bcrypt` uses whatever **Promise** implementation is available in global.Promise
* NodeJS >= 0.12 has a native Promise implementation built in
* However, this should work in any Promises/A+ compliant implementation
* `Async` methods that accept a callback, return a Promise when callback is not specified if Promise support is available

```
bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    // Store hash in your password DB.
});
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
    // result == false
});
```

* This is also compatible with `async/await`

```
async function checkUser(username, password) {
    //... fetch user from a db etc.

    const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login
    }

    //...
}
```

`User.js`

* So if you are using this:

```
// MORE CODE

UserSchema.pre('save', function (next) {
  const salt = bcrypt.genSalt(10);
  this.hashed_password = bcrypt.hash(this.password, salt);
})

// MORE CODE
```

* Use `async/await` like this:

```
// MORE CODE

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.hashed_password = await bcrypt.hash(this.hashed_password, salt);
})

// MORE CODE
```

* Since it is middleware we pass in `next` as a parameter

```
// MORE CODE
// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
```

* Just having the above password should let us hash our password

## Test
* Create a user and see if the password is hashed
* You should see a hash/salted password that looks similar to:

```
"$2a$10$Djm9gvId57IozFKEiUfBtuAH7SktDJMd06/ggPNlESTwW3Um9kAXu" 
```

![hashed and salted password](https://i.imgur.com/eB4OJAv.png)

* Check if you forget to pass a request with an email (does validation work?)
    - Should have success - false and error "Please add an email"
* Check if you pass a request with an invalid email
    - Will get success - false and error "Please add a valid email"
* Finally enter a user with a valid email and a role of `publisher`

![successful user with hashed password entered](https://i.imgur.com/R5wmr9d.png)

## Make John doe a publisher
* Delete any users you have and enter this user:

```
{
    "name": "John Doe",
    "email": "jdoe@example.com",
    "password": "123456",
    "role": "publisher"
}
```

## Test some validation rules
* Check without email and you should get this response:

```
{
    "success": false,
    "error": "Please add an email"
}
```

* Enter an invalid email

```
{
    "name": "John Doe",
    "email": "jdoe@example",
    "password": "123456",
    "role": "publisher"
}
```

* And you'll get this error response:

```
{
    "success": false,
    "error": "Please add a valid email"
}
```

## Next - Implement JSON web tokens
### Protected routes
* So that once we register, we get back a token that we'll then be able to use to access **protected routes**
* And we can add custom middleware to be able to protect certain routes (i.e. adding a bootcamp, or adding a course, or updating a course - those are routes you don't want the public to have access to)

### Add relationships between collections
* And we'll need to **add a relationship** between bootcamps and users and courses and users
