# Google Strategy Options
## Why prepend of `Google` in:

`keys.js`

```js
module.exports = {
  googleClientID: '1005918912077-sre6e8et2sabtf7rtrcidh5k939abcde.apps.googleusercontent.com',
  googleClientSecret: 'gcCJByKtspHxUU_xE_abcd'
}
```

* Because we most likely will add Facebook and Github (they also have clientIDs and secrets) and others so this naming convention scales well

## Import our API keys into our app
`index.js`

```js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// add api keys
const keys = require('./config/keys'); // add this line

const app = express();

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* Now that we have our `keys` object
    - We can pass those two keys to the Google Strategy
    - Note we are using `ID` and not `Id` in our naming convention!

## The `code`
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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* GoogleStrategy takes an object with the `clientId` and `clientSecret` inside it
* The object will take a third argument
*   Which will be the `code` that is appended to the URL on the callback after the user grants permission and google sends a request back to our server using something like `localhost:5000/auth/google/callback?code=456`
* We have to manually specify where we want the user sent to on our server
    - We will do this by adding a routeHandler to our Express app to handle a user coming back to our app on this route `/auth/google/callback`
* There is a 4th argument that passes and arrow function with logging an `accessToken` but we'll deal with that later
