# Mongoose queries
![skip if user exists](https://i.imgur.com/HYRpEMq.png)

* User comes back to use
* We have access to their profile
* Before we create a new user, we'll check if anyone has this profile `id`
    - no? - Create a user
    - yes? - Don't create a user

## Houston we have a problem
* If I browse to `localhost:5000/auth/google`
* It will enter another user with the same profile ID
* This is a huge problem
* We need to add logic to check for the profile ID before we enter it into the Database
* All profile IDs must be unique for our app to work properly

## Async!
* Any time we reach out to our `MongoDB` we are initiating an asynchronous action
    - We just can't do this:
        + `const user = User.findOne({ googleId: profile.id });`
        + Instead the query returns a promise

`passport.js`

```js
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// add api keys
const keys = require('./../config/keys');

mongoose.Promise = global.Promise;
const User = mongoose.model('User');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // search for an existing id match
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
        } else {
          // no existing record with that profile ID
          // So make a new record!
          new User({ googleId: profile.id }).save();
        }
      });
    }
  )
);
```

* Now if you visit `localhost:5000/auth/google`
* It won't duplicate the user with the same profile id
* Delete the duplicate user on `mLab`

## Next - Fix the "hanging browser"
