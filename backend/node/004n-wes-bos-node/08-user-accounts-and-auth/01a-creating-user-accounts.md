# Creating User Accounts - Part 1
## Update navbar to have Register and Login links

`layout.pug`

```
doctype html
html
  head
    title= `${title} | ${h.siteName}`
    link(rel='stylesheet', href='/dist/style.css')
    link(rel="shortcut icon" type="image/png" href="/images/icons/doughnut.png")
    meta(name="viewport" content="width=device-width, initial-scale=1")
  body
    block header
      header.top
        nav.nav
          .nav__section.nav__section--pages
            li.nav__item
              a.nav__link.nav__link--logo(href="/")
                | The Retail Apocalypse
            each item in h.menu
              li.nav__item
                a.nav__link(href=item.slug)
                  span #{item.title}
          .nav__section.nav__section--user
            if user

            else
              li.nav__item: a.nav__link(href="/register", class=(currentPath.startsWith('/register') ? 'nav__link--active' : '')) Register
              li.nav__item: a.nav__link(href="/login", class=(currentPath.startsWith('/login') ? 'nav__link--active' : '')) Log In

    block messages
    // MORE CODE
```

### What is `currentPath()`?
* It is defined in `app.js`

`app.js`

```js
// more code
// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path; // here it is
  next();
});
// more code
```

* We then can use vanilla JavaScript `startsWith()` to see if the path starts with a specific string

```
li.nav__item: a.nav__link(href="/register", class=(currentPath.startsWith('/register') ? 'nav__link--active' : '')) Register
```

* So if the path does start with that specific link we know it is the current page so we style it accordingly `nav__link--active`
    - If it isn't the current page, we replace that class with an empty string
## Login
* Click on it and we get a `404`

### Add our login route
`index.js`

```js
// more code
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/login', userController.loginForm);
// more code
```

## Good Site Organization
### Why are we creating a new controller?
* You generally have a new controller for each area of your website
* This controller will handle
    - login
    - signup
    - registration validation
    - password reset
    - all the forms
* We will also have an **Authentication Controller**
    - This will deal with all the heavy lifting of:
        + Having everyone login
        + Making sure they are logged in
        + Making sure that they own the store

## Create our userController
`userController.js`

```js
const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};
```

## Import userController
`routes/index.js`

```js
const express = require('express');
const storeController = require('./../controllers/storeController');
const userController = require('./../controllers/userController'); // add this
const { catchErrors } = require('./../handlers/errorHandlers');
// more code
```

## View `/login` and we get a view error
* We need to create `login.pug`

`login.pug`

```js
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
  form.form(action="/login" class="card" method="POST")
    h1 Login
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

![login form rendered](https://i.imgur.com/IVjLY4K.png)

## When use logs in
* We send them to a route
* We post the info

### Where are we posting it to?
* We need to create a new Model
* The Users model

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
    - Similar to `named export` vs `default export` in ES6
        + But this is how you do in `Node.js`
    - In this case, it would be the `default export`
* Also, when you require this file
    - That is the thing you are getting out of the file without specifying a sub property

### Working on our Schema
* We will eventually want five things that will go on our Schema
* But for now we'll just focus on **email** and **name**

#### Let's deal with email first

`User.js`

```js
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

* `unique` - Makes sure someone doesn't log in with a **duplicate** email
* `lowercase` - Will only enter `lowercase emails` into database
    - People enter emails in upper and lowercase
    - And if we don't make it lowercase before we enter it into the database we'll have to constantly write code everywhere we use it to make sure we make it lowercase because obviously an uppercase email and lowercase email are two different emails
* `trim` - Remove before and after spacing before entering email
    - People constantly place spaces before and after their email
    - And if we don't remove them, we will have problems later
* `validate` - Great validator that comes with `node.js`
    - [link to validator](https://www.npmjs.com/package/validator)
    - We pass it the validator we want to use inside an array
    - And we put the error message we want to show if a user email fails to enter a valid email
        + It performs all the necessary checks (_has an `@`, has a `.`, etc_)

##### Server side validation is the most important
* We will also do **Client side** checks for email so user most likely will never see this error message
* But if a malicous user finds a way to get past our **Client side** validation, they will get this error and we can be sure that emails in our Database are clean
* **note** All **Client side** validation can be avoided if a user maliciously turns off JavaScript
* `required` - If someone forgets to supply an email we give them this error
    - Once again, the user only sees this if they bypass our Client side validation

### And we also will add `name`
* This is a way easier task

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

### Create new users
* Don't we need a password field?
    - Yes we do!

### All about our Password
* We don't need to store our password
* We need to store a **hash** of our password (_hashed password_)
* We will accomplish this using `Passport.js`

#### Passport.js
* [link to passportjs.org](http://passportjs.org/)
* The **defacto library** that you use if you need to do any sort of `authentication` inside of Express

##### Uses "strategies"
* Enables you to do stuff with `passport-auth`
* `Local Strategy` - **username** and **password**
* Search their strategies on `passportjs.org` and you will find many
* **Passportjs** is authentication **middleware** for `Node.js`
* Extremely flexible and modular
    - Passport can be unobtrusively dropped in to any Express-based web application
    - A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more...
        + Using Facebook, Twitter is called OAuth

#### What does Passport.js do?
* It takes away lots of heavy lifting that comes along with:
    - Managing Sessions
    - Creating tokens
    - Logging people in/out
    - Interface with many popular login providers (_LinkedIn, Google, Twitter, Facebook_)

## No Password? WTF?
* <u>We will not specify a password</u> in our schema
* <u>We will not specify a hash or anything</u> inside our schema
    - Instead we will use `passportLocalMongoose` Library that we imported
    - It will take care of adding the additional fields to our schema
        + As well as adding the additional methods to create our new logins

### [passportLocalMongoose](https://github.com/saintedlama/passport-local-mongoose)
* We imported this

`User.js`

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const md5 = require('md5');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('password-local-mongoose'); // required!
```

### mongodbErrorHandler
* [mongodbErrorHandler link](https://www.npmjs.com/package/mongoose-mongodb-errors)
* We required this

```js
// more code
const mongodbErrorHandler = require('mongoose-mongodb-errors'); // required!
const passportLocalMongoose = require('password-local-mongoose');
// more code
```

#### What is `mongoose-mongodb-errors` for?
* Our current email validation will give us **good errors**
* But when you have a **unique** of `true` it doesn't give us good errors
* It gives us an ugly error that comes along with `MongoDB` and it has a code in it and it is something you don't want to show to your user
    - **All this plugin does is it will turn those ugly errors into nice user friendly errors**
