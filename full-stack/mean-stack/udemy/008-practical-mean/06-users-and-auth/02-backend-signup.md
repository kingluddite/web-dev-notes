# Backend - Signup User
* We can copy all code from app.js and paste into user.js

`user.js`

```js
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
```

* We will change from `get` route to `post` route because creating a user is creating a resource on the server
* We won't want to render a response
    - I look at `models/user.js` which shows us how we should create a user
    - We need to **require** this model so we can use it in this file
* We never want to store our password
    - We always should encrypt it
    - In a production environment you should always submit a form using SSL, that will encrypt data you send over your network
    - Always encrypt the data you store in the Database

`user.js`

```js
const express = require('express');
const router = express.Router();

const User = require('./../models/user');

router.post('/', function (req, res, next) {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email
    });
});

module.exports = router;
```

### How do we encrypt a password?
* Save time and use a 3rd party package!

#### bcryptjs
* Install this package with

`$ yarn add bcryptjs`

* Require bcrypt

`user.js`

```js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

router.post('/', function (req, res, next) {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email
    });
    user.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(201).json({
        message: 'User Created',
        obj: result
      });
    });
});

module.exports = router;
```

* Second arg is number of **salting rounds**
    - What is `salting`?
        + The algo or strength of this algo (it defines how strong the encryption is)
* This encrypted password is a **one way encryption**, you can not **decrypt** it
* If this is true how do we then check if the user has correctly logged in?
    - We'll deal with the answer to this question in the logged in part
    - But after doing this to our code, we are now saving a safe password
* To save time, copy and paste error/check code from `messages.js`
* Status of `201` means resource was created successfully

## And that is our backend function - Done!
* This route enables me to create a new user
* What is the missing piece?
    - We need to add this user route to our `app.js` routes file

`routes/app.js`

```js
// more code

var appRoutes = require('./routes/app');
var messageRoutes = require('./routes/messages');
var userRoutes = require('./routes/user'); // add this line

// more code

app.use('/user', userRoutes); // add this line
app.use('/message', messageRoutes);
app.use('/', appRoutes);

// more code
```

## Next
* Connect frontend to backend - Wiring it up!


