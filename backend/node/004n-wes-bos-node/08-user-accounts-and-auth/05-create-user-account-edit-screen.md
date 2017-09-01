# Creating a User Account Edit Screen
1. Log in
2. Click on avatar
3. 404

## This should take us to our user account
`index.js`

```js
// more code
router.get('/account', userController.account);

module.exports = router;
```

## Add our `account` controller
`userController.js`

```js
// more code
exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name
  });
  const registerWithPromise = promisify(User.register, User);
  await registerWithPromise(user, req.body.password);
  next(); // pass to authController.login
};

// add the below code
exports.account = (req, res) => {
  res.render('account', { title: 'Edit Your Account' });
};
```

### Account view not found
* We need to create that view now

### Create account view
`account.pug`

```
extends layout

block content
  .inner
    h2= title
```

### Make our account page nice
`account.pug`

```
extends layout

block content
  .inner
    h2= title
    form(action="/account" method="POST")
      label(for="name") Name
      input(type="text" name="name" value=user.name)
```

#### Can't access `user.name`
* View in browser `/account` and you'll see we CAN NOT access the logged in user name
* You first need to make sure you are logged in

##### How can we do this?
* Because `user` is going to be passed to every single request

`app.js`

![user in app.js](https://i.imgur.com/qikAs89.png)

* The above line `res.locals.user = req.user || null;`
    - It takes `req.user` (_Passport makes this available to us_)
    - And we pass our `user` to our locals `res.locals.user`
    - `locals` is all the variables our template will have
    - When we were not logged in it was just `null`
    - But when we are logged in, Passport gives us `req.user` and we can pass it along to our locals

## The User object passed into our Controller
`userController.js`

```js
// more code
exports.account = (req, res) => {
  res.render('account', { user: req.user, title: 'Edit Your Account' });
};
```

* `user: req.user`
* Now our template has access to the user object

### Test it out
`account.pug`

```
extends layout

block content
  .inner
    h2= title
    pre= h.dump(user)
```

* Will show you this (You must be logged in to see this!)

![dump user data account](https://i.imgur.com/xUjsSzA.png)

## Finish our form
`account.pug`

```
extends layout

block content
  .inner
    h2= title
    form(action="/account" method="POST")
      label(for="name") Name
      input(type="text" name="name" value=user.name)
      label(for="email") Email Address
      input(type="text" name="email" value=user.email)
      input.button(type="submit" value="Update My Account")
```

![updated account form](https://i.imgur.com/SsYrdDN.png)

* We will deal with password later

## Houston we have a problem!
* If you try to update your Name and submit you will get a `404`

### Add post account route pointing to new `updateAccount()` controller
`index.js`

```js
// account routes
router.get('/account', userController.account);
router.post('/account', catchErrors(userController.updateAccount));

module.exports = router;
```

* This route will be using `async-await` on our **POST** account so we wrap it in **catchErrors()**
* We also want to make sure the user is logged in to see `/account` route for both **POST** and **GET** so we add our `isLoggedIn` middleware controller check

`index.js`

```js
// more code
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount)
// more code
);
```

### Create our `updateAccount()` controller
`userController.js`

```js
// more code
exports.account = (req, res) => {
  res.render('account', { user: req.user, title: 'Edit Your Account' });
};

// add the code below
exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(QUERY, UPDATES, OPTIONS);
};
```

### Filling in QUERY, UPDATES and OPTIONS
`userController.js`

```js
exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );

  res.json(user);
};
```

* Make sure you get the user `_id` from the `request` (**req**) because if you get the `_id` from the `user` that value can be maliciously manipulated and is a security risk
* **new: true** - `returns` the new actual user
* **runValidators: true** - Make sure to run through all validation steps
* **context: 'query'** - Must be there for Mongo to do the query
* We add `res.json(user)` so we can see the JSON data we get in the `response` **res**

## Test it out
1. Edit your username and submit
2. You should see this JSON returned (_your user object_)

![user object JSON response](https://i.imgur.com/S9Pi14b.png)

* You will see what is returned is the new changed data (_not the old data_) 
* And that is what `new: true` does

`userController.js`

```js
exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );

  req.flash('success', 'Updated the profile');
  res.redirect('back');
  // res.redirect('/account')
};
```

* We can use `res.redirect('back')` or `res.redirect('/account')`
    - Both redirect back to the account form with the newly updated data
    - And a successful flash message
* Back is an alternative that sends user back to their last page (_this is useful if you are working with multiple endpoints_)

## Dump user data anywhere
If you ever want to see the user data dump just add this to the specific view template

`account.pug`

```
extends layout

block content
  .inner
    h2= title
    pre= h.dump(user)
    form(action="/account" method="POST")
      label(for="name") Name
      input(type="text" name="name" value=user.name)
      label(for="email") Email Address
      input(type="text" name="email" value=user.email)
      input.button(type="submit" value="Update My Account")
```

And this is the data dump

![user data dump](https://i.imgur.com/VSr3n4l.png)

## Next Up
Password reset flow (_When your user forgets their password_)

