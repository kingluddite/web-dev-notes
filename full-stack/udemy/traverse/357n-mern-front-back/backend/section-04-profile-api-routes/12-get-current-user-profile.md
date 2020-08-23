# Get current user profile

## Create a route to get our profile
`routes/api/v1/profiles.js`

```
const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route    GET api/profile/me
// @desc     Get current user profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    // Try to find the profile using the user id in the token
    // Grab the user name and avatar off the User object
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    // Do we have a profile?
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    // There is a profile so send it in the response
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500).send('Server Error');
  }
});

module.exports = router;
```

* The route will be `api/v1/profiles/me`
    - `api/profile` will be a route to get all profiles
    - We update our comments (helps with self-documentation)
    - Since this is private we need to bring in our `auth` middleware
    - We're using `Mongoose` and the method we'll use is returning a Promise so we'll use `async/await`
    - Bring in the **Profile** and **User** models
    - The `req.user.id` will be from the Profile `user` field `id`
    - We also want the user `avatar` and `name` but they are not in the token with `req.user` but because we have the user `id` we can use the Mongoose `populate()` method to grab those fields from the User object
    - Add the URL route of `/me` (which is really `api/v1/profiles/me` - because of the routing we set up in `server.js`)

`server.js`

```
// MORE CODE

// Route authentication
const auth = require('./routes/api/v1/auth');
// Route resources
const users = require('./routes/api/v1/users');
const posts = require('./routes/api/v1/posts');
const apps = require('./routes/api/v1/apps');
const profiles = require('./routes/api/v1/profiles'); // this one!
const bootcamps = require('./routes/api/v1/bootcamps');

// MORE CODE
```

## Test it out in Postman
* Create a new tab with GET `http://localhost/api/v1/profiles/me`

### Houston we have a problem!
* This will fail with:

```
{
   "msg": "No token, authorization denied"
}
```

* Log in and get a token
    - Add `x-auth-token` Headers property and a `x-auth-token` value from login route inside your get current user profile route request

## Houston we have another problem!
* This will also fail with:

```
{
    "msg": "There is no profile for this user"
}
```

* We first need to create a route that will create our profile - we are erroring because our profile doesn't exist yet

## Next
* Create a route to create a profile for the user
