# Creating User Accounts - Register Users
## Posting our data to our login

### Set up our Register Form route
`index.js`

```
// more code
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);

module.exports = router;
```

### Creator our register controller
`userController.js`

```
// more code
exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};
```

### Create our Register view
`register.pug`

```
extends layout

include mixins/_registerForm

block content
  .inner
    h2= title
    +registerForm()
```

* We will build and include a mixin with our register form
* We add that mixin to our template

### Create our mixin with our register form
`_registerForm.pug`

```
mixin registerForm()
  form.form(action="/register" class="card" method="POST")
    h2 Register
    label(for="name") name
    input(type="text" name="name" required)
    label(for="email") Email
    input(type="email" name="email" required)
    label(for="password") Password
    input(type="password" name="password")
    label(for="password-confirm") Confirm Password
    input(type="password" name="password-confirm")
    input.button(type="submit" value="Register")
```

### View the `/register` route and you will see our register form
![register form](https://i.imgur.com/NW0nkSG.png)

### Add our post route
* We have our `GET` route so we see our form when we visit `/login` and `/register`
* But we need to **POST** info <u>when the form is submitted</u>
    - So we need to add that route

#### Add the register post route
1. Validate the registration data
2. Register the user
3. We need to log them in

#### 1. Validate the registration data
* We will do this in our controller
* We will add some **middleware** that will do a bunch of checks to ensure we did everything correctly
    - We will use `next` because this is **middleware**
    - And when our checks pass we need to pass this to the **next** `middleware` in the assembly line of Express

`userController.js`

```js
exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  return next();
};
```

* Where did `sanitizeBody()` come from?
    - Open `app.js` and you'll see we required: 

`const expressValidator = require('express-validator');`

* [link to express-validator](https://github.com/ctavan/express-validator)
* We use `expressValidator()` here:

`app.js`

```js
// Exposes a bunch of methods for validating data
// This is used heavily on userController.validateRegister()
app.use(expressValidator());
```

* This applies several validation methods to **every single request**
    - Then whenever you have a request you can call any of those validations that live on top of it without having to import the library

##### We can check stuff with:
* Check that they are all in the format we want

```js
// VALIDATION
  // checkBody only checks req.body; none of the other req parameters
  // Similarly checkParams only checks in req.params (URL params) and
  // checkQuery only checks req.query (GET params).
  req.checkBody('postparam', 'Invalid postparam').notEmpty().isInt();
  req.checkParams('urlparam', 'Invalid urlparam').isAlpha();
  req.checkQuery('getparam', 'Invalid getparam').isInt();
```

##### We can sanitize stuff with:

```js
// SANITIZATION
  // as with validation these will only validate the corresponding
  // request object
  req.sanitizeBody('postparam').toBoolean(); // clean the body
  req.sanitizeParams('urlparam').toBoolean(); // clean the URL
  req.sanitizeQuery('getparam').toBoolean(); // clean the URL after /?
```

* Before you send your data you often have to do some sanitizing
* That is exactly what `expressValidator()` helps us do

##### Check email with `normalizeEmail({})` - 
* You can use several versions of your email:
    - Johndoe@gmail.com
    - JOHNDOE@gmail.com
    - johndoe@gmail.com
    - johndoe@googlemail.com
    - j.o.h.n.doe@gmail.com
    - johndoe+test@gmail.com

* `normalizeEmail()` - Will convert them all to `wesbos@gmail.com` and helps cut down on abuse and angry users
* `express-validator` just sits on top of `validator.js`
    - [link to validator.js](https://github.com/chriso/validator.js)
    - Search for **normalizeEmail**
        + you will see all the options

`userController.js`

```js
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
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req.checkBody('password-confirm', 'Confirm Password cannot be blank').notEmpty();
  req.checkBody('password-confirm', 'Oops. Your passwords do not match').equals(req.body.password);
  return next();
};
```

* We used HTML5 `required` which will give us:

![HTML5 required message](https://i.imgur.com/5dhKVVT.png)

* But malicious users can just go into page and remove the `required` attrbute manually

![removed HTML5 required attribute](https://i.imgur.com/GwUnkOH.png)

#### And so our data sanitization used multiple tiers of validation:
1. HTML5 validation
2. Custom `Client side` validation
3. `Server side` validation with our Schema

### Get the validation errors
`userController.js`

```js
// more code
req.checkBody('password-confirm', 'Oops. Your passwords do not match').equals(req.body.password);

const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map((err) => err.msg));
  }
// more code
```

* `req.validationErrors()` will check all of the validations we performed and put them into an **errors** object
* And if there are any **errors** we won't pass the error on to other middleware, we will handle the **error** ourselves
* Our **errors** object will contain any error and the field that had the error
    - We could also use this to highlight which fields has an error but we won't be concerned with this in this project

### What if we get errors? What do we do next?
* Just re-render the register form
* But we don't want to totally clear the form as the user will have to re-enter all their input (_which won't make them happy!_)

`userController.js`

```js
// more code
const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map((err) => err.msg));
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    });
  }
// more code
```

* We pass the `body: req.body` back to the form so the form will still be filled out when we re-render it
* We also have to send the `flashes` along
    - normally the flashes get passed along because it is on the next request
    - but because all of this validation and re-rendering is on one single request, we need to explicitly pass the flashes `flashes: req.flash()`

## Finally, we are finished
`userController.js`

```js
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
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req.checkBody('password-confirm', 'Confirm Password cannot be blank').notEmpty();
  req.checkBody('password-confirm', 'Oops. Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map((err) => err.msg));
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    });
    return; // stop the function from running
  }
  next(); // there were no errors
};
```

## Now we hook up our `validateRegister()` method to our router
`index.js`

```
// more code
router.get('/register', userController.registerForm);
router.post('/register', userController.validateRegister); // add this

module.exports = router;
```

## Test it!
* Let's break it on purpose to see if this is working
* Manually remove `require` from `_registerForm.pug`
  - This will remove CLient side validation and leave us with just our server side validation
  - Inspect the code in the Chrome dev toolbar `Elements` tab and manually remove the `required="required"` from the **name** and **email** fields

![removing required](https://i.imgur.com/R1zbHpY.png)

* Click the register button
* This shows you how easy it is to get around **Client side** validation
* And it also shows you how important **Server side** validation is!

![server side validation working](https://i.imgur.com/t9Gczi7.png)

## Time to test the register form
* Make changes and save
* View in browser and submit empty form
* You should see:

![all errors](https://i.imgur.com/tdypiFS.png)

* Try variations of form entry to see that our validations are firing the proper errors
* If we get errors we `return` to stop the function from running so we can deal with our errors
* If there are no errors we use `next()` that moves us onto the next **middleware**
