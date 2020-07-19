# route files with Express Router
## VS Code color for backend
* Let's make our VS server code visual so we know when we are working on server side code
* Root of app

`.vscode/settings.json`

```
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#ba55d3",
    "titleBar.inactiveBackground": "#a080a8"
  }
}
```

* We will create all routes
    -  Break up by resource
        +  auth
        +  profile
        +  post

## Express Router
### How can I break my routes into separate files instead of having them all inside my server.js?
* If you want break routes up into separate files you need to use Express Router
* You could put all routes inside `server.js` but that would make `server.js` very long so it makes sense to break them up into different resources

### How to use Express Router
```
const express = require('express');

const router = express.Router();
```

* And to create routes we don't user `app.get()` or `app.post()` like we would if there were all in `server.js` but instead we will use `router.get()` and `router.post()`

## `routes` folder
* Will hold all routes
* We'll have separate files for all our routes
* All of these routes will return JSON for our API so we'll create a folder to hold all them called `api`
    - There will be no server rendered templates (like Handlebars)
        + That will all happen on the frontend react application

## Route names - singular or plural
* Here's a [stackoverflow](https://stackoverflow.com/questions/6845772/rest-uri-convention-singular-or-plural-name-of-resource-while-creating-it) discussing which is best
* **BEST PRACTICE** Be consistent for all route names
* **note** I will use plural

### Create our first route files
#### Adding users (aka "registering" users)
`routes/api/users.js`

* Will handle **registering** and **adding** users

#### Authenticating users
* **EXCEPTION TO THE RULE** - auth is a little different as it is not a CRUD resource (so we spell it with singularly)
`routes/api/auth.js`

* Will handle getting a `jwt` (JSON web token) for authentication

### Deal with user profiles 
`routes/api/profiles.js`
 
* Will handle anything that has to do with profiles
    - fetching them (READ)
    - adding them (CREATE)
    - editing them (UPDATE)

`routes/api/posts.js`

* Where we can add:
    - posts
    - like
    - follow

### Create a user route
* Public vs Private access
    - Private means you need a token to access that route
* **IMPORTANT** Always remember to export the route

`routes/api/users.js`

* VS code snippets will make commenting and documentation easier

## Create test routes for all our API routes
* Will show you `API Running` when visiting `http://localhost:5000`

```
const express = require('express');

const router = express.Router();

// @route    GET api/users
// @desc     Test route
// @access    Public
router.get('/', (req, res) => res.send('user route'));

module.exports = router;
```

* We need to create test routes for all our `api` routes

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

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', (req, res) => res.send('auth route'));

module.exports = router;
```

`routes/api/profiles.js`

```
const express = require('express');

const router = express.Router();

// @route    GET api/profiles
// @desc     Test route
// @access    Public
router.get('/', (req, res) => res.send('profile route'));

module.exports = router;
```

## Test the routes
* http://localhost:5000/api/auth
* http://localhost:5000/api/users
* http://localhost:5000/api/posts
* http://localhost:5000/api/profiles

### They all give you a error
* Look in the console and you'll see `users:1 Failed to load resource: the server responded with a status of 404 (Not Found)`
* On the page you'll see: `Cannot GET /api/RESOURCES` for each of the routes

## We need to point from our server to these routes
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
app.use('/api/profiles', require('./routes/api/profiles'));

// MORE CODE
```

* Now we can test all routes by pointing to:
    - `/api/users`
    - `/api/posts`
    - `/api/auth`
    - `/api/profile`
* **note** When we point `/api/users` it will point to the file `./routes/api/users` and that file has this:

`router.get('/', (req, res) => res.send('user route'))` 

* and the `/` means it will actually point to `/api/users`

## Route Structure
GET/POST/PUT/DELETE

* /api/v1/bootcamps
* /api/v1/courses
* /api/v1/reviews
* /api/v1/auth
    - Auth is a little different as it is not a CRUD resource
* /api/v1/users

### Why `v1`?
* We are versioning our API
* We do this just in case we decide to update our API
    - And we do this to not affect the `v1` route
    - Any frontend apps that uses our API can still use v1 (if we move to v2)
    - We might keep it or specify in docs they have a certain amount of time to update before the API is deprecated
* **TODO** Create a `v1` folder for your routes

`routes/api/v1/posts.js`

* Update the routes folder structure (hint: you'll need to create a `v1` folder and put routes inside it)
* Update the server.js to:

`server.js`

```
// MORE CODE

// ROUTES
// Quick test that API endpoint is running
app.get('/', (req, res) => {
  res.status(400).json({
    success: false,
    error: 'Did not give us what we wanted!',
  });
});

// Define routes
// Authentication
app.use('/api/v1/auth', require('./routes/api/v1/auth'));
// Resources
app.use('/api/v1/users', require('./routes/api/v1/users'));
app.use('/api/v1/posts', require('./routes/api/v1/posts'));
app.use('/api/v1/apps', require('./routes/api/v1/apps'));
app.use('/api/v1/profiles', require('./routes/api/v1/profiles'));

// MORE CODE
```

## Add PORT environment variable for local development

`.env`

```
// MORE CODE

NODE_ENV=Development
PORT=5000

// MORE CODE
```

## Test in Postman

## Collections in Postman
* Create a container folder `Dev Connector`
    - Inside
        + Create collection folder `Auth & Users`
        + Create collection folder `Profiles`
        + Create collection folder `Posts`

## CRUD API Example:
* Let's say we had a bootcamps resource

`routes/api/v1/bootcamps.js`

```
const express = require('express');

const router = express.Router();

// @route.    GET api/v1/bootcamps
// @desc.     Get all bootcamps
// @access.   PUBLIC
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Show all bootcamps' },
    error: null,
  });
});

// @route.    POST api/v1/bootcamps
// @desc.     Create a bootcamp
// @access.   PUBLIC
router.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Create a bootcamp' },
    error: null,
  });
});

// @route.    PUT api/v1/bootcamps/:id
// @desc.     Update a bootcamp
// @access.   PUBLIC
router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Update a bootcamp with ${req.params.id}` },
    error: null,
  });
});

// @route.    DELETE api/v1/bootcamps/:id
// @desc.     Delete a bootcamp
// @access.   PUBLIC
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Delete a bootcamp with ${req.params.id}` },
    error: null,
  });
});

module.exports = router;
```

`server.js`

```
// MORE CODE

const connectDb = require('./config/db');
// Route files
// Route authentication
const auth = require('./routes/api/v1/auth');
// Route resources
const users = require('./routes/api/v1/users');
const posts = require('./routes/api/v1/posts');
const apps = require('./routes/api/v1/apps');
const profiles = require('./routes/api/v1/apps');
const bootcamps = require('./routes/api/v1/apps');

// MORE CODE

// ROUTES
// Quick test that API endpoint is running
app.get('/', (req, res) => {
  res.status(400).json({
    success: false,
    error: 'Did not give us what we wanted!',
  });
});

// Define Routes
// Mount Route Authentication
app.use('/api/v1/auth', auth);
// Mount Route Resources
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);
app.use('/api/v1/apps', apps);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/bootcamps', bootcamps);

// MORE CODE
```

## Test Routes
* GET `http://localhost:5000/api/v1/bootcamps/`
* POST `http://localhost:5000/api/v1/bootcamps/`
* PUT `http://localhost:5000/api/v1/bootcamps/1`
* DELETE `http://localhost:5000/api/v1/bootcamps/1`

### All should work as they did before
* But now they are more modular and easier to understand

## Next
* Users model setup next
* This will let us create an endpoint to register a user
* We want to send and `email`, `password` to create a user in our Database
* But to do that and interact with the Database we need to create a Mongoose model (_this holds all the fields we want for a user_)

