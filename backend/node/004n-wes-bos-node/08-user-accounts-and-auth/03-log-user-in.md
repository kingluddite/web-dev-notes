# Log User in
1. We validated the registration data (done)
2. We registered the user (done)
3. We need to log the user in (working on that now)

## As soon as you create your account
* We will automatically log that user in
* This is a nice usability touch

## authController
* This will be our third controller
    - authController will handle:
        + all logging in
        + all `passport.js` stuff
        + handle all password reset stuff, email setting that is specically related to logging in and being authenticated rather than just with the user

`authController.js`

```js
const passport = require('passport');
```

* We haven't sent password data and tell us if we can log in or not
* That is called a **Strategy** in `passport`
    - A `Strategy` is something that will interface with checking if you're allowed to be logged in
    - There could be a Strategy for Twitter that will check with Twitter if they have the correct tokens
    - We will use a local strategy

* If we were using a local Strategy `passport.authenticate('local')`
* If we were using a Twitter Strategy `passport.authenticate('twitter')`

## Local Strategy
This will check if our **username** and **password** have been sent in correctly

* We will create a middleware here
* This will look different because we are taking advantage of some of the middleware that comes bundled with Passport

`authController.js`

```js
const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login',
  successRedirect: '/',
  successFlash: 'You are now logged in'
});
```

* We use the `local` **Strategy** (_handles username and password_)
* On bad login we can rely on the above to redirect to `/login` and send a Flash error message
* On a successful log in we redirect them to home page and flash them happy message

## Import `authController` to our routes
`index.js`

```js
const express = require('express');
const storeController = require('./../controllers/storeController');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController'); // add this line
const { catchErrors } = require('./../handlers/errorHandlers');

// more code
```

## Add our authController to our route
`index.js`

```js
// more code
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
// more code
```

## remove res.sent('it works') and comment back in `next();`
![remove this line](https://i.imgur.com/hsZPsze.png)

## Configure Passport to use local
* Before you use any Strategy you must configure them
* If you use Github you need to give the the correct tokens
    - Same with Facebook or LinkedIn or any of them...
* We need to tell our **local Strategy** what to do with our users once they've signed in
* **We want to put the user object on each request**

## Create `/handlers/passport.js`
This is a handler that will configure our passport

`passport.js`

```js
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());
```

* We need to tell passport what to do with the user
* We will log into passport
* Passport will say, "Ok, now what? What information would you like on each request?"
    - In our case we just want to pass along the actual user object
        + This will enable us to put their avatar in the top right corner
        + Show the stores they've created
        + Show stuff specific to that user

`passport.js`

```js
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());

// add these two lines
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

### What will these two lines do?
* Everytime you have a request it will ask passport, "What should I do with the user now that I have confirmed they are properly logged in?"

### Import passport
* We need to import `passport.js` somewhere in our Application

`app.js`

```js
// more code
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport'); // add this line
// more code
```

## Register user
* If you try to register with a duplicate email you'll get this error in the Terminal:

`UserExistsError: A user with the given username is already registered`

* The server "hangs" so this is not a good solution
* For now, delete the email in Compass and register again
* You will see success flash letting you know you are logged in
* You are redirected to the home page

### Troubleshoot Login
If you are having problems logging in it may be your `email` and `normalizeEmail`

`userController.js`

```
// more code
exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
// more code
```

* If you use gmail and you have a `.` in your email like `john.doe@gmail.com`, `normalizeEmail()` will strip out the `.` so if you log in with `john.doe@gmail.com` you will get a failed log in
* You will have to add `gmail_remove_dots: false`

```
req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_dots: false
  });
```

* I had this issue with my email and it took me an hour to figure it out

## Success
* If all works according to plan you should see this after registering

![logged in](https://i.imgur.com/mgGi8NQ.png)

* You registered successfully,
* You were redirected to the home page
* You are now logged in!


