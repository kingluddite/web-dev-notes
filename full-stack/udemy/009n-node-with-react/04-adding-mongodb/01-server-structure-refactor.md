# Server Structure Refactor
* No set structures in Express
* "Unopinionated" framework

## Our Structure
![server structure](https://i.imgur.com/DhqMPAH.png)

### `/config`
* Holds
    - All API keys
    - All other config and setting info we need

### `/routes`
* One file for each set or group of routes that we have
* Currently we have two authentication routes

### `/services`
* You may here other use `/controllers` instead of `/services`
* Holds logic that helps our app or configures it in a way we expect
    - We'll have a passport.js file with all Passport stuff

### index.js
* Helper modules
* Business logic

## Question: When we require the same file in multiple modules is it loaded twice?
* Answer:
    - You can require a module as many times as you need
    - As long as you require them in different modules
    - Node caches a module once you require it, so requiring it a second time wouldn't have any effect

`/services/passport.js`

```js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// add api keys
const keys = require('./../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    },
  ),
);
```

* **note** We are not exporting this file

`/index.js`

```js
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

app.use('/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* Because we don't want to pull any code out and use on our starter Express page, all we need to do is execute all the code inside `passport.js` so we just need to `require` it
    - We don't assign it to a variable because that file is not returning anything (we are not exporting any code)
    - So we just require it

### authRoutes.js
```js
const passport = require('passport');

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

app.get('/auth/google/callback', passport.authenticate('google'));
```

* Notice `app.get()` but we do not define `app`
* We need to use a trick to make sure our `app` object we define inside `/index.js` makes it's way into our `authRoutes.js` file
    - Trick
        + Wrap both our routes inside `module.exports` and an arrow function

`authRoutes.js`

```js
const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
```

## index.js and Routes
```js
const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* We import the `authRoutes` and then pass `app` to the `authRoutes` object
* Now we can safely use `app` inside `authRoutes`

## Even more refactoring
* We require, assign and then immediately call `authRoutes`
* When we require the `authRoutes` it returns a function and so then we can immediately call that function with the app object (and save some typing)
    - The second set of parenthesees immediately invokes the function that we just required in

`require('./routes/authRoutes')(app)`

`index.js`

```js
const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

## Check if after refactoring code still works
* Inside `server` directory `$ npm run dev`
* If nodemon kicks off and run, you did it!
* If not, read the error message in the terminal and troubleshoot
