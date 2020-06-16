# route files with Express Router
* We will create all routes
    -  Break up by resource
        +  auth
        +  profile
        +  post

## routes folder
* Will hold all routes
* We'll have separate files for all our routes
* All of these routes will return JSON for our API so we'll create a folder to hold all them called `api`
    - There will be no server rendered templates
        + That will all happen on the frontend react application

`routes/api/users.js`

* Will handle registering and adding users

`routes/api/auth.js`

* Will handle getting a jwt (JSON web token) for authentication
 
`routes/api/profile.js`
 
* Will handle anything that has to do with profiles
    - fetching them, adding them, editing them

`routes/api/posts.js`

* Where we can add posts, like, follow

## Express Router
* If you want break routes up into separate files you need to use Express Router
* You could put all routes inside `server.js` but that would make `server.js` very long so it makes sense to break them up into different resources

### How to use Express Router
```
const express = require('express');

const router = express.Router();
```

* And to create routes we don't user `app.get()` or `app.post()` we use `router.get()` and `router.post()`

### Create a user route
* Public vs Private access
    - Private means you need a token to access that route

### Always remember to export the route
`routes/api/users.js`

```
const express = require('express');

const router = express.Router();

// @route    GET api/users
// @desc     Test route
// @access    Public
router.get('/', (req, res) => res.send('user route'));

module.exports = router;
```

* We need to create test routes for all our api routes

`routes/api/posts.js`

```
const express = require('express');

const router = express.Router();

// @route    GET api/posts
// @desc     Test route
// @access    Public
router.get('/', (req, res) => res.send('posts route'));

module.exports = router;
```

`routes/api/auth.js`

```
const express = require('express');

const router = express.Router();

// @route    GET api/posts
// @desc     Test route
// @access    Public
router.get('/', (req, res) => res.send('auth route'));

module.exports = router;
```

`routes/api/profile.js`

```
const express = require('express');

const router = express.Router();

// @route    GET api/posts
// @desc     Test route
// @access    Public
router.get('/', (req, res) => res.send('profile route'));

module.exports = router;
```

* But you need point to these routes inside `server.js`

`server.js`

```
// MORE CODE

// test API endpoint
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

// MORE CODE
```

* Now we can test all routes by pointing to:
    - `/api/users`
    - `/api/posts`
    - `/api/auth`
    - `/api/profile`
* **note** When we point `/api/users` it will point to the file `./routes/api/users` and that file has this:

`router.get('/', (req, res) => res.send('user route'))` and the `/` means it will actually point to `/api/users`

* Test in Postman

## Collections in Postman
* Create a container folder `Dev Connector`
    - Inside
        + Create collection folder `Auth & Users`
        + Create collection folder `Profiles`
        + Create collection folder `Posts`

## Next
* Users model setup next
    - This will let us create an endpoint to register a user
    - We want to send and email, password to create a user in our Database
        + But to do that and interact with the Database we need to create a Mongoose model (this holds all the fields we want for a user)

