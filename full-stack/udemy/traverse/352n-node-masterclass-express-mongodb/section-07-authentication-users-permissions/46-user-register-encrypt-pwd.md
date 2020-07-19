# User Register Encrypt Password
* Add to our controller our register functionality
* Here is our register controller method

`controller-auth.js`

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

`controller-auth.js`

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
    password,
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

## Postman
* Save the Register request
    - Save as `Register User`
    - Desc: `Add user to Database with encrypted password`
    - Click `Headers` tab of request and choose `JSON Content Type preset`
    - Make sure server is running `$ npm run dev`
    - In `Body` > raw add:

```
// MORE CODE

{
    "name": "Rodolph Lorroway",
    "email": "rlorroway0@hugedomains.com",
    "password": "rRDL1Y",
    "role": "publisher"
}
```

* And you will get a success in the response:

```
{
    "success": true
}
```

## Tip - Mockaroo
* Helps you create JSON quickly
* [mockaroo](https://mockaroo.com/)

## Notes
* You only can have a role from the list of enums in the model so below would error out
* If you don't provide a role it will default to `user`

```
{
    "name": "Rodolph Lorroway",
    "email": "rlorroway0@hugedomains.com",
    "password": "rRDL1Y",
    "role": "164.55.167.11"
}
```

## View the new user
* In Atlas

![new user](https://i.imgur.com/7zXpnUy.png)

* The user is a publisher and we can see the password (we never want to be able to see the password)
* Also see you new user in Compass (make sure you can connect)

## Test in Postman
* If you try to change to `admin` and submit you should get an error
* If you submit without a role the role will default to `user`
* You should get duplicate user
* Delete the user with no role and that user will have a role of `user`

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

* **note** There is a `bcrypt` but there are lots of issues (especially with windows)
* bcryptjs is a complete JavaScript implementation of bcrypt and it always just seems to work

### We add some middle to salt and hash our password
* This will happen before the user is inserted
    - gen.salt() is a method on the bcrypt object, it returns a promise so we need to use `await`
    - `gen.salt()` takes a number of rounds as an argument (the higher the rounds the more secure - but also the heavier it is on your system)
        + `10` is the recommended number in the bcrypt documentation
* When we use user.create() we have access to the `password` field (also name, email and role fields)
    - `password` will be plain text but we'll set it to (using await) `bcrypt.hash(this.password, salt)` (and we pass in our salt)
    - This will make the password very secure

`User.js`

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
// MORE 

password
:
"$2a$10$Djm9gvId57IozFKEiUfBtuAH7SktDJMd06/ggPNlESTwW3Um9kAXu"

// MORE 
```

* Check if you forget to pass a request with an email (does validation work?)
    - Should have success - false and error "Please add an email"
* Check if you pass a request with an invalid email
    - Will get success - false and error "Please add a valid email"
* Finally enter a user with a valid email and a role of `publisher`

![successful user with hashed password entered](https://i.imgur.com/R5wmr9d.png)

## Next - Implement JSON web tokens
* So that once we register, we get back a token that we'll then be able to use to access protected routes
* And we can add custom middle to be able to protect certain routes (i.e. adding a bootcamp, or adding a course, or updating a course - those are routes you don't want the public to have access to)
    - And we'll need to add a relationship between bootcamps and users and courses and users
