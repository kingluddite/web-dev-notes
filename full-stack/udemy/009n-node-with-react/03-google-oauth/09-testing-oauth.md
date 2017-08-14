# Testing OAuth
* We need to create a routeHandler that whenever someone visits `localhost:5000/auth/google` we need to start the whole `oAuth` process that is being managed by Passport JS
* We use Express to do different things based on different routes, so we use a routeHandler

## Create our first routeHandler
`index.js`

```js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// add api keys
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    accessToken => {
      console.log(accessToken);
    },
  ),
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* We add our routeHandler that listens for `/auth/google`
* When a user hits that route we will use a Strategy called `google`
    - This is kind of strange because we never specifically registered our GoogleStrategy with a string of `google`
    - Internally GoogleStrategy knows if someone uses the string `google` identifier it knows that we should use the GoogleStrategy
* The second argument is an object
    - Inside the object we pass in `scope`
    - This tells Google what access we want to have inside this user's profile
        + We are telling Google to give us access to this user's `profile` info and their `email` as well
        + `email` and `profile` are not randomly made up, on the Google API documentation all the names we can request are listed

## Run our server
`$ node index.js`

* Browse to `localhost:5000/auth/google`
* We get an error but we were successfully sent to google
* The URL now says something like:

`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri`

* But we have an error
* `redirect_uri_mismatch`

![400 error](https://i.imgur.com/uodbAA2.png)
