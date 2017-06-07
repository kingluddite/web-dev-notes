# Password Reset Flow - Part 1
## Create a new mixin `_forgotPassword.pug`
`views/mixins/_forgotPassword.pug`

```
mixin forgotPasswordForm()
  form.form(action="/account/forgot" method="POST")
    h2 I forgot my password
    label(for="email") Email
    input(type="email" name="email")
    input.button(type="submit" value="Send a Reset")
```

![reset password form](https://i.imgur.com/OYDmGc1.png)

* That's the easy part
* Now for the complex part
* To do it securely, it is a complex process

## Steps in resetting a password
1. First check if that user has an email address on file
2. If they do
    * We will set a token in their user
    * A password reset token
    * And a expires date
        - The person requests the password be reset and they only have an hour to do the reset (for security sake)
3. The password reset token and expires date will be emailed to user as a link
4. The user clicks on the link
    * That takes them back to our site
        - If they have a proper token
        - And they have a date that is not expired
        - Then they will be able to reset their password

## When someone submits the forgot password form
They will go to our method

`authController.js`

```
exports.forgotPassword = async (req, res) => {
  // 1. See if a user with that email exists
  // 2. Set reset tokens and expiration date on their account
  user.reset = 'somecrazylongstringthatrepresentsatoken';
  user.expires = 234234030923423; // timestamp expiration date
  // 3. Send them an email with the token
  // 4. redirect to login page
}
```

### 1. See if a user with that email exists
* We don't have an email yet so we need to get it
* We get it by creating a POST route that will send the data to our `forgotPassword()` method

### Set up our `/account/forgot` route
`index.js`

```
// more code
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
// add the following line
router.post('/account/forgot', catchErrors(authController.forgotPassword));
// more code
```

* We use the `catchErrors()` method because we are using **async-await**
* All of the following is code inside `authController.js`

### Get the email
`const user = await User.findOne({ email: req.body.email });`

### Handle reset errors
```
const user = await User.findOne({ email: req.body.email });
if (!user) {
    req.flash('error', 'No account with that email exists');
    return res.redirect('/login');
}
```

* This could be a security issue
* If you tell people the email doesn't exist and a malicious user has a chunk of emails from a website, they can user that email list to find out if the emails they might be able to see if people signed up for that site
* If you feel the security issue is big enough you could use this flash message **"A password email has been mailed"**
    - Yes that is a lie but it is up to you

## crypto
* We need a random bunch of keys to generate our reset password token
* That is where crypto comes in
* It is built right into `node.js`
* Enables us to get crytographically secure random strings
* This module is built into node.js - you don't have to install in
    - `crypto.randomBytes(20).toString('hex')`

### Import crypt
`authController.js`

```
const passport = require('passport');
const crypto = require('crypto'); // add this line
// more code
```

### 2. Set reset tokens and expiration date on their account
`authController.js`

```
user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
```

#### Create a one hour deadline
`authController.js`

```
user.resetPasswordExpires = Date.now() + 3600000;
```

* **Date.now()** + `3,600,000` milliseconds translated into 1 hour from now

## Eslint Error
![User not defined](https://i.imgur.com/llfd88F.png)

### We need to:
1. Require mongoose
2. Get reference to our **User** Model

`authController.js`

```
const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose'); // add this line
const User = mongoose.model('User'); // add this line
// more code
```

## Add fields to our Schema

`User.js`

```
// more code
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
// more code
```

* `user.resetPasswordToken`
* `user.resetPasswordExpires`
    - We just created these to fields and we will be inserting the data they hold into our Database

### Save the user
`authController.js`

```
await user.save();
```

### Bringing it together
`authController.js`

```
// more code
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
  // 4. redirect to login page
};
```
