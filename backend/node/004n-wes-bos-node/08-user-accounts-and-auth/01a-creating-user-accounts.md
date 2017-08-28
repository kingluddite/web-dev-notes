# Creating User Accounts - Part 1
## Login
* Click on it and we get a 404

### Add our login route
`index.js`

```
// more code
router.get('/login', catchErrors(userController.loginForm));
// more code
```

## Good Site Organization
* Why are we creating a new controller?
    - You generally have a new controller for each area of your website
    - This controller will handle
        + login
        + signup
        + registration validation
        + password reset
        + all the forms
    - We will also have an **Authentication Controller**
        + This will deal with all the heavy lifting of:
            * having everyone login
            * making sure they are logged in
            * making sure that they own the store

## Create our userController
`userController.js`

```
const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};
```

## Import userController
`index.js`

```
const express = require('express');
const storeController = require('./../controllers/storeController');
const userController = require('./../controllers/userController'); // add this
const { catchErrors } = require('./../handlers/errorHandlers');
// more code
```

## View `/login` and we get a view error
We need to create `login.pug`

`login.pug`

```
extends layout

block content
  .inner
    h2= title
```

### View in browser
You'll see `Login`

### We need to build the login form
* Should we include the login form inside `login.pug`?
    - No, create a mixin and then you can use it anywhere you want

`views/mixins/_loginForm.pug`

```
mixin loginForm()
  form.form(action="/login" method="POST")
    h2 Login
    label(for="email") Email Address
    input(type="email" name="email")
    label(for="password") Password
    input(type="password" name="password")
    input.button(type="submit" value="Log In")
```

* We'll never see it unless we include it and add it to the template

`login.pug`

```
extends layout

include mixins/_loginForm

block content
  .inner
    h2= title
    +loginForm()
```

![login form rendered](https://i.imgur.com/YlJgn7C.png)

## When use logs in
* We send them to a route
* We post the info
* Where are we posting it to?
* We need to create a new Model
* The users model

## Users Model
`User.js`

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const md5 = require('md5');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('password-local-mongoose');

mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', userSchema);
```

### Make our Model
* Our Model is what our data will look like

#### Keep In Mind
We use:

`module.exports = mongoose.model('User', userSchema);`

And we are not using:

`exports.something`

* The reason is this is the **main** thing we are exporting from this file
    - Similar to named export vs default export in ES6
    - In this case, it would be the default export
* Also, when you require this file that is the thing you are getting out of the file without specifying a sub property

### Working on our Schema
* There are 5 things that will go on our Schema
* But for now we'll just focus on **email** and **name**

#### Let's deal with email first

`User.js`

```
// more code
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  }
});

module.exports = mongoose.model('User', userSchema);
```

* `unique` - makes sure someone doesn't log in with a duplicate email
* `lowercase` - great as it will only enter lowercase emails into database
    - People enter emails in upper and lowercase and if we don't make it lowercase before we enter it into the database we'll have to constantly write code everywhere we use it to make sure we make it lowercase because obviously an uppercase email and lowercase email are two different emails
* `trim` - remove before and after spacing before entering email
    - People constantly place spaces before and after their email and if we don't remove them, we will have problems later
* `validate` - great validator that comes with `node.js`
    - [link to validator](https://www.npmjs.com/package/validator)
    - We pass it the validator we want to use inside an array
    - And we put the error message we want to show if a user email fails to enter a valid email
        + It performs all the necessary checks (_has an `@`, has a `.`, etc_)
* We will also do client side checks for email so user most likely will never see this error message but if they find a way to get past our Client side validation, they will get this error and we can be sure that emails in our Database are clean
    - **note** All Client side validation can be avoided if a user maliciously turns off JavaScript
* `required` - If someone forgets to supply an email we give them this error
    - Once again, the user only sees this if they bypass our Client side validation

### And name is way easier
`User.js`

```
// more code
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  }
});

module.exports = mongoose.model('User', userSchema);
```

### We can now create new users
#### Don't we need a password field?
Yes

### All about our Password
* We don't need to store our password
* We need to store a **hash** of our password (_hashed password_)
* We will accomplish this using `Passport.js`

#### Passport.js
[link to passportjs.org](http://passportjs.org/)

* The defacto library that you use if you need to do any sort of authentication inside of Express

##### Uses "strategies"
* Enables you to do stuff with `passport-auth`
* `Local Strategy` - **username** and **password**
* Search their strategies on `passportjs.org` and you will find many
* **Passportjs** is authentication **middleware** for `Node.js`
* Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application
* A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more...

#### What does Passport.js do?
* It takes away lots of heavy lifting that comes along with:
    - managing Sessions
    - creating tokens
    - logging people in/out
    - interface with many popular login providers (_LinkedIn, Google, Twitter, Facebook_)

## No Password? WTF?
* <u>We will not specify a password</u> in our schema
* <u>We will not specify a hash or anything</u> inside our schema
    - Instead we will use `passportLocalMongoose` Library that we imported
    - It will take care of adding the additional fields to our schema
        + As well as adding the additional methods to create our new logins

### [passportLocalMongoose](https://github.com/saintedlama/passport-local-mongoose)
* We imported this

`userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });`

* We add `passportLocalMongoose` to our Schema
* We tell it that `email` will be the username field
    - Some sites use **username** instead of email and this just gives us a choice
    - We are using the **email** to log people in

### mongodbErrorHandler
[mongodbErrorHandler link](https://www.npmjs.com/package/mongoose-mongodb-errors)
* We imported this

#### What is it for?
* Our current email validation will give us good errors
* But when you have a **unique** of true it doesn't give us good errors
* It gives us an ugly error that comes along with `MongoDB` and it has a code in it and it is something you don't want to show to your user
    - All this plugin does is it will turn those ugly errors into nice user friendly errors
