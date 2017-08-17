# Saving Model Instances
![create a new record diagram](https://i.imgur.com/GFjFKhG.png)

* We need logic that saves a new record when the user signs in
* Where will we put this logic?

## Callback
`passport.js`

```js
// more code
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    }
  )
);
```

* The second argument was of our GoogleStrategy was a callback function that was automatically called anytime the user was redirected back to our app from the Google flow
* That `profile` contains the user `id`
* I will remove the 3 logs as I don't need them anymore

## Do we import our Model class into passport?
* You might think we do but we don't
* For everything that using monogoose Model classes and there is a good reason why we don't need to use a `require` statement for our Model
* mongoose has problems in development if we require in the same Model class in different places
* So we will require the Model class in a slightly different fashion

`passport.js`

```js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// add api keys
const keys = require('./../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {}
  )
);
```

## mongoose.model() two args vs one
* With two args, we load a Schema into mongoose
* With one arg for `mongoose.model()` we can pull a model out of mongoose
    - `const User = mongoose.model('users');`
    - **note** We get a handle on the 'users' Collection using `mongoose.model('user')` so when we store that inside `Users` we can then target that with our JavaScript and mongoose helper functions to pull info from our 'users' Collection
        + We can use that Model class to create a Model instance and save it (persist it) to the Database

![model class and instance](https://i.imgur.com/LgE3Fh7.png)

## Test in browser
`$ npm run dev`

### Houston we have a problem!
![error schema](https://i.imgur.com/fxpq8ip.png)

* It looks like Mongoose doesn't think we loaded in a Schema into mongoose that describes users
* This is tricky because it is an "order of operations" issue
* We just need to change the order of requiring passport and User

`index.js`

* Change this:

```js
// more code
require('./services/passport');
require('./models/User');
// more code
```

* To this:

```js
// more code
require('./models/User');
require('./services/passport');
// more code
```

* **note** That the order of your require statements can result in an error in your app
* Test in browser and you should see the deprecation warnings we can safely ignore and our app will hang when we hit the `/localhost:5000/auth/google` route

## The Google ID!
* Browse and log in to mlab
