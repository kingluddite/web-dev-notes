# Enabling Cookies
* Time to tell Passport that it needs to manage our authentication by using Cookies
* **note** Out of the box Passport has no idea how to handle cookies

## Install Cookies Session
* This is a NPM package that will help us manage cookies in our session

`$ yarn add cookie-session`

## We will tell our app about cookie-session in `index.js`
* This file is great for anything that has to do with our app set up

`index.js`

```js
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
// more code
```

* We require cookie-session
* We require Passport because we need to tell it to use cookies in our app

`passport.js`

```js
// more code
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [secretKeys.randomCookieKey]
  })
);
// more code
```

* `maxAge` - How long cookie can exist inside the browser before it automatically expires (I will use 30 days (in milleseconds))
* 30 days * 24 hours * 60 minutes * 60 seconds * 1000 millisecons
* [random key generator](https://randomkeygen.com/)
* [convert days to milliseconds](http://www.calculateme.com/Time/Days/ToMilliseconds.htm)
* We use a key to encrypt our cookie
    - So whenever we send out this cookie it will ALWAYS be 100% encrypted
        + This will prevent people from manually changing the `id` that we are stuffing inside there
        + If they could do this they could fake being someone else inside our Application
        + Anytime you use keys, you never want it to be on version control/Git Github, publicly available
            * We put all keys inside our `/config/keys.js`
            * Just put any random string of characters inside your cookie, I used a site above to create my random cookie string but feel free to totally make it on the fly
* **note** Our keys value is an array of keys
    - `cookieSession()` allows us to supply multiple keys and if you have multiple keys it will randomly pick one to encrypt as a cookie (just here to provide an additional level of security)

## Now tell Passport to eat cookies!
* We need to tell Passport to use cookies to handle authentication

`index.js`

```js
// more code
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [secretKeys.randomCookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
// more code
```

## Our Authentication Flow is complete!
* But we can't test it yet `:(`
* Just start up your server `$ npm run dev` to make sure no errors pop up
* If they do, troubleshoot!

