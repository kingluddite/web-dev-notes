# Password Reset Flow - Part 2

### 3. Send them an email with the token
* Right now we won't email them a token
* We will just send them a token
* We will email them a token later on
* What URL are we operating on?
    - ``http://${req.headers.host}``
        + That will give you localhost when development mode
        + And give you your staging or production domains when in either environment

`authController.js`

```
const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  req.flash('success', `You have been emailed a password reset link. ${resetURL}`);
```

* We are doing this in a very insecure manner just for testing purposes
* **YOU WOULD NEVER FLASH THE RESET LINK TO THE USER** as they could reset any email
* We will email them soon so hold your horses :)

### 4. Redirect them to the login page
`res.redirect('/login');`

## Final `forgotPassword()` controller
`authController.js`

```
exports.forgotPassword = async (req, res) => {
  // 1. See if a user with that email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'No account with that email exists');
    return res.redirect('/login');
  }
  // 2. Set reset tokens and expiration date on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  // 3. Send them an email with the token
  `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  req.flash('success', `You have been emailed a password reset link. ${resetURL}`);
  // 4. redirect to login page
  res.redirect('/login');
};
```

### Testing if it works
Open Mongo Compass and see our current user fields

![current user fields](https://i.imgur.com/8vJto7j.png)

Enter email in reset password field and press `Send a reset` button

![send a reset](https://i.imgur.com/3fqCIb6.png)

You get redirected to `/login` with a flash message containing the link to the reset password

### Added token and expire date to MongoDB
![token and expire date in Mongo](https://i.imgur.com/LpzD3vU.png)

* Check if a bad email doesn't exist
* Enter a valid user email and copy and vist the URL link in the success flash message
    - We will get a 404 error, the route doesn't exist

### Add the reset link route
`index.js`

```
router.post('/account/forgot', catchErrors(authController.forgotPassword));
// add this line
router.get('/account/reset/:token', catchErrors(authController.reset));
```

* We create a dynamic route to match any token `:token`
* We point it to the `reset()` controller we will create now

`authController.js`

```
exports.reset = async (req, res) => {
  res.json(req.params);
};
```

### View the reset URL link
* We are testing to see what JSON is returned in the **result** `res`

![token returned](https://i.imgur.com/vt06vGm.png)

`authController.js`

```
exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  // if there is a user, show the reset password form
  res.render('reset', { title: 'Reset your Password' });
};
```

* We look for one particular record that has two requirements
    - the token
    - the time is greater than now
        + Very cool feature of MongoDb
            * If the date is greater than now, it hasn't expired yet
    - If no user, the seach came up empty
    - Flash an error to the user and let them know the reset is invalid or expired
    - Redirect them to `/login`

### Test a bad token
And you will be redirected to `/login` and get the flash error message

### Render the reset template form
```
// if there is a user, show the reset password form
res.render('reset', { title: 'Reset your Password' });
```

Create the pug template form

## HTML form tidbit
When you submit a form without an `action` it will default to the current URL you are on (it will post to itself)

### Create our password reset template
`view/reset.pug`

```
extends layout

block content
  .inner
    form.form(method="POST")
      h2 Reset Your Password
      label(for="password") Password
      input(type="password" name="password")
      label(for="password-confirm") Confirm Password 
      input(type="password" name="password-confirm")
      input.button(type="submit" value="Reset Password")
```

### Test in browser
Open URL of reset link from flash success message

![reset password template](https://i.imgur.com/XXMoHpu.png)

#### Cool tip to see your user data
1. Open Terminal
2. `cmd` + `k` to clear it

`authController.js`

```
exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  // view the user object
  console.log(user); // ADD THIS LINE
  // if there is a user, show the reset password form
  res.render('reset', { title: 'Reset your Password' });
};
```

### View server console data in Terminal
![terminal user data](https://i.imgur.com/5VxdiWn.png)

## Time to update the user password
Since someone is filling out our reset form with their new and confirmed password we need to get both pieces of information, make sure they are the same and post them to our controller to insert the data into `MongoDB`

`index.js`

```
// more code
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgotPassword));
router.get('/account/reset/:token', catchErrors(authController.reset));
// add this next chunk of code
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);
// more code
```

* We will need to confirm password match and we will write this middleware
* We will use `async-await` to update password so we use `catchErrors()`

### Add `confirmedPasswords()`
`authController.js`

```
exports.confirmedPasswords = (req, res) => {
  if (req.body.password === req.body.password-confirm);
};
```

## Houston we have a problem!
* We can't use dashes in our variable name and `password-confirm` will give us an error
* Easy Fix below - use square brackets

```
exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next(); // keep it going!
    return;
  }
  req.flash('error', 'Passwords do not match');
  res.redirect('back');
};
```

* We use `next()` that says if they are the same we can move on to the `update()` controller

![the update controller](https://i.imgur.com/6JuVwWC.png)

* If we don't have a match we flash that error and redirect them back to the reset password form page
* Test to see if not matching passwords generate a flash error

![password do not match flash](https://i.imgur.com/uzaxN1z.png)

### If passwords do match
Then we go to `update` method of our middleware

* We can use `.setPassword()` because Passport gives us that method
    - Sadly, it is not promisified, it is callback-ified
    - We need to make it into a promisified

### Require `promisify`
`authController.js`

```
const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const promisify = require('es6-promisify'); // add this line
```

### Finish with `.update()` controller
`authController.js`

```
exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    req.flash('error', 'Password reset invalid or has expired');
    return res.redirect('/login');
  }

  const setPasswordPromisify = promisify(user.setPassword, user);
  await setPasswordPromisify(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
};
```

## Trash the password token and exiration date
* The way you get rid of fields in `MongoDB` is you set them to **undefined** and they will be removed

## Actually save the new document
`const updatedUser = await user.save()`

## Save and automatically log user in
* `req.login()` - Passportjs gives us access to this useful method
    - We pass it the updatedUser `req.login(updatedUser)`
    - Very useful from Passwortjs, we can always pass `req.login(PUTUSERHERE)` and it will automatically log that user in (without us having to pass them in a username and password)
* Flash them a success message and redirect them to `/login`

### Test to see if it works
* Reset password
* Use link provided in flash
    - Save reset link in other browser tab
* View document in Mongo Compass (_you will see token and expiration date_)
* Enter and confirm new password
* You will be redirected to `/`
* * View document in Mongo Compass (_you will see token and expiration date have been removed_)
* If you try to use the reset link again you will get flash error that reset link [is invalid or expired](https://i.imgur.com/IXRBRNP.png)
