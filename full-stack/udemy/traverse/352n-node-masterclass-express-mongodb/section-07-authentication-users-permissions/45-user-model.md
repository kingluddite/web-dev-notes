# User Model
## Install jsonwebtoken
`$ npm i jsonwebtoken bcryptjs`

## We are going to create User
* This is another resource in our application
* Just like all models it will have a schema
    - So we'll need mongoose
    - We won't have usernames so the email will be required
    - And it needs to be unique (we can't have 2 users have the same email)

`User.js`

```
// MORE CODE

  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },

// MORE CODE
```

## Add Role field
* Each user will have a role
* We only have 2 role types `user` and `publisher`
    - We'll use `enum` type to limit it to those 2 types
    - There will also be `admin` but the only way to add that is to go into the Database and add that
        + You can do this via Compass or the shell and just change their role to admin
    - All users will default to a role of `user`
        + **note** With the role of `publisher` a user can create bootcamps and courses etc and `user`s are people who can create reviews about bootcamps  

```
// MORE CODE

  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  },

// MORE CODE
```

## Password is needed
* `select: false` - What this does is when we get a user through our API, it won't show the password

```
// MORE CODE

  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
    select: false,
  },

// MORE CODE
```

## Reset a password
* We'll need a token and an expiration for that token

```
// MORE CODE

  resetPasswordToken: String,
  resetPasswordExpire: Date,

// MORE CODE
```

* Every model will have a createdAt field that will default to the current time using `Date.now`

```
// MORE CODE

  createdAt: {
    type: Date,
    default: Date.now,
  },

// MORE CODE
```

## Make sure you export you model
* Here is our file User model

`User.js`

```
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
});

module.exports = mongoose.model('User', UserSchema);
```

## Route update
* Now we will have an auth route and a user route
    - And we'll have an auth controller
    - And a user controller

## Why do we need separate auth and user routes and controllers?
* Because they are different
* `Authentication` has to with things like:
    - Registering a user
    - Encrypting passwords
    - Logging in
    - Getting the currently logged in user
    - Resetting passwords
* But Users will be the CRUD functionality for the admin
    - Add a user
    - Update a user
    - Delete a user

## We'll work on authentication first
* We'll create `auth.js` in `routes`
    - This is up to the developer
        + You could do a straight `users.js` route and controller and put everything that has to do with users in there but it is a good idea to separate the two (auth and users)

### Create 2 new files
* `routes/route-auth.js`
* `controllers/controller-auth.js`

### Working on auth controller
* Grab the ErrorResponse and asyncHandler from `controller-bootcamps.js`
* **note** I removed color from models as it is not needed

`controller-auth.js`

```
const ErrorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// MORE CODE
```

## Let's set up our register route
### Register User
`controller-auth.js`

* We have a public route (anyone can register) to a new route

```
// @desc     Register user
// @route    GET /api/v1/auth/register
// @access   Public

// MORE CODE
```

* And let's build our controller with a simple status

```
const ErrorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc     Register user
// @route    GET /api/v1/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
```

## Now we'll build our route
`routes/route-auth.js`

```
const express = require('express');
const { register } = require('../controllers/controller-auth');

const router = express.Router();

// /api/v1/auth
router.post('/register', register);
```

## Don't forget to add the route to our main server file
`server.js`

* We consume our new route and mount it

```
// MORE CODE

// Connect to Database
connectDB();

// Route files
const bootcamps = require('./routes/route-bootcamps');
const auth = require('./routes/route-auth'); // add this line

const app = express();

// MORE CODE

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', auth);

// MORE CODE
```

## Update Postman
* Add a new folder in Postman called `Authentication`
    - Give it a description of: `Routes for user authentication inluding register, login, reset password, etc`
    - Add a Post request called Register with this endpoint `{{URL}}/api/v1/auth/register`

![POST register added](https://i.imgur.com/UtlFJcr.png)

## Test
* Send that POST request and you should get

```
{
    "success": true
}
```

* And a 200 status

## Next
* Add to this controller method our register functionality
