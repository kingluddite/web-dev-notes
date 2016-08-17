# Custom Middleware

Middleware is software that sits in the "middle" of other parts of your application -- in other words, it's programming that runs after a request is received but before a response is sent back.

## Improving the App with Custom Middleware

* Add logic to template files so they display different information based on if a user is logged in or not
* Add a logout feature
    - feel safe that someone won't jump on their computer and impersonate them
* Write custom middleware adds two simple methods that let you control routes based on whether a user is logged in or not
* Use mongodb to create a production ready session storage system
    - one that can handle thousands of simultaneous users

## Our App
* Currently creates a session whenever a user logs in
    - That session contains a user id
        + Which identifies a valid user in our system
            * Very useful piece of information
                - We know that users who haven't logged in won't have a session id with a user id property
                - Those who are logged in will


## Changing the nav to be dynamic
When logged in (button changes to log out) and Sign Up link disappears

### Global Session Id value
We need to make our user's session id value available to our entire application

**app.js**

```js
// use sessions for tracking logins
app.use( session( {
  secret: 'soccer is awesome',
  resave: true,
  saveUninitialized: false
} ) );

// ADD ALL CODE BELOW
// make user ID available in templates
app.use( function( req, res, next ) {
  res.locals.currentUser = req.session.userId;
  next();
} );
```

### res.locals
* `response` object has a property called **locals**
    - **locals** provides a way to provide information to the response object
        + Think of as stuffing a custom variable into the response
        + In Express all of your views have access to the **responses** locals object
        + Remember: sessions are attached to the request object (req)
        + If a user is logged in `res.locals.currentUser` will hold a number (their user ID)
            * If a user is not logged in there will be no session, and no session ID, so the value of currentUser will be `undefined`

**views/navbar.pug**

```
#navbar.navbar-nav.collapse.navbar-toggleable-sm
    .container
      a.navbar-brand(href='/')
        i.icn-logo.material-icons bookmark_border
        | Bookworm
      .nav-items.clearfix
        if !currentUser
          a.nav-item.nav-link(href='register') Sign Up
        a.nav-item.nav-link(href='about') About
        a.nav-item.nav-link(href='contact') Contact
        a.nav-item.nav-link(href='profile') My Profile
      
      if currentUser
        div
          img.avatar.img-circle.hidden-xs-down(src='/img/avatar.png', alt='avatar')
          a.btn.btn-light.pull-md-right(href='/logout') Log Out
      else
        a.btn.btn-info.pull-md-right(href='login') Login
```

## Now you need to attach the session to the user
So we are going to attach the session to the user when their profile is created.

You will need this line added to your route

```js
// use schema's `create` method to insert document into Mongo
    User.create( userData, function( error, user ) {
      if ( error ) {
        return next( error );
      } else {
        req.session.userId = user._id; // ADD THIS LINE
        return res.redirect( '/profile' );
      }
    } );
```

## profile route

```js
// GET /profile
router.get( '/profile', mid.requiresLogin, function( req, res, next ) {
  User.findById( req.session.userId )
    .exec( function( error, user ) {
      if ( error ) {
        return next( error );
      } else {
        return res.render( 'profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook } );
      }
    } );
} );
```

## profile view

views/profile.pug

```
extends layout

block content
  .main.container.clearfix
    .row
      .col-md-8.col-md-offset-2
        h1.display-4
          img.avatar.img-circle.hidden-xs-down(src='/images/avatar.png', alt='avatar')
          | #{name}
        h2.favorite-book Favorite Book
        | #{favorite}
```

So now when you register, your user id will be added to the session.

In order to use sessions you need to add `npm install express-session --save` and require it at the top of `app.js`

app.js

```js
'use strict';
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var session = require( 'express-session' );
var app = express();
```

## Login view
views/login.pug

```
extends layout

block content
  .main.container
    .row
      .col-md-6.col-md-offset-3
        h1.display-4.m-b-2 Log In
        form(method='POST' action='/login')
          div.form-group
            label(for='email') Email
            input.form-control(type='text' id='email' placeholder='email' name='email')
          div.form-group
            label(for='password') Password
            input.form-control(type='password' id='password' placeholder='password' name='password')
          button.btn.btn-primary(type='submit') Log in 
```

## Test

`$ nodemon`
`http://localhost:3000`
Click Login
You'll see LOGIN, changes to LOG OUT
SIGN IN button is hidden
But logout button is a broken link because we didn't create that route yet

## Log Out
Destroying the session -- which was tracking the user -- is the easiest way to log the user out of the site.

**routes/index.js**

```js
// GET /logout
router.get( '/logout', function( req, res, next ) {
  // check if session exists
  if ( req.session ) {
    // delete session object
    req.session.destroy( function( err ) {
      if ( err ) {
        return next( err );
      } else {
        // redirect to home page
        return res.redirect( '/' );
      }
    } );
  }
} );

// GET /login
```

## Test

Click logout and then it will destroy the session and use the logic in navbar.pug to remove logout and replace it with login and bring back 'Sign up'

but we can't got to the login route because we have not created login.pug or created the login route yet.



## Express Middleware
Express is known as a routing and middleware framework

### Routes
Routing lets our app do different things and display different information based on which URL the browser requests and how it requests it

So sending a GET request to the /login route leads to the login form
While a PUT request to /login route tells the app to authenticate the user by comparing the form data against records in the database

## Middleware
Software that sits in the middle of other parts of your app
(in other words) it's programming that's run after a request is received but before a response is sent back

**example**: body-parser module
Most express apps use the body-parser module to convert incoming requests into a format that's easy for a JavaScript program to use
the Express app gets a request
body-parser takes the body of the request
makes it readable to our program
then hands it off to the next part of the express app
it sits in the `middle` of that request cycle

**Another example**: expression session module
We used to track session for logged in users

```js
// session middleware
app.use(session({
  secret: 'soccer is awesome',
  resave: true,
  saveUninitialized: false
}));
```

* This is called application level middleware
    - Because it makes sessions available anywhere in our app
    - You'll often use more than one piece of middleware
    - You can chain together multiple middleware functions that run one after the other
    - In express middleware is a function that has access to the request and response objects
    - The entire process from request to response in express is called the **Request/Response Cycle**
    - A typical piece of middleware is a function that accepts three arguments

```js
app.use(function (req, res, next) {

});
```

* `req` - request
* `res` - response
* `next` - is a function and it represents the `next` piece of middleware, the next function in the Request/Response Cycle
    in our app we added a bit of middleware to make sure the userID property of the session is available to the application

```js
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});
```

* The above middleware function assigns a userId to the currentUser property
* When it's done, it calls next, telling express to move on to the next piece of middleware
* When writing custom middleware, we must ALWAYS include a call to `next()`

Checkout **app.js**
* Everywhere you see `app.use()` these are cases were we are adding middleware to the app
    - Some are third party middleware (like session and body-parser)
    - Some are built in to express (like express.static )
        + Lets us serve static files within a specific directory
            * images
            * css
* We also have error handling middleware
* There is also router middleware
    - A function you add to particular routes

## Writing Custom Middleware
* Create 2 pieces of middleware
    - One custom middleware function produces an error to users who aren't logged in
        + This will let us easily password protect any page on our site with a simple call to the middleware
    - One custom middleware function will be for users who are logged in but are visiting pages that are not for them, like the register page, the log in form, or a promotional marketing page targeted to new visitors

## Show Sign Up form to only non-logged in users
If users click on this, and they are logged in, send them to their profile page

It is common to keep your custom middleware outside of the main app in one or more separate JavaScript files

## Create directory `middleware`
In your site root

**middleware/index.js**

```js
function loggedOut( req, res, next ) {
  if ( req.session && req.session.userId ) {
    return res.redirect( '/profile' );
  }
  return next();
}
module.exports.loggedOut = loggedOut;
```

* In order to use this middleware in our application, we have to export it and that is what the module.exports line is for
* Because this is router middleware we need to require it to use it in the file defining our routes

```js
var express = require( 'express' );
var router = express.Router();
var User = require( '../models/user.js' );
var mid = require( '../middleware' ); // ADD THIS LINE
```

* Requiring a directory instead of a file, will point to the `index.js` file inside that directory

Only show the registration form if the user is not logged in

Update **routes/index.js**

```js
// GET /register
router.get( '/register', mid.loggedOut, function( req, res, next ) {
  return res.render( 'register', { title: 'Register Today!' } );
} );
```

And

```js
// GET /login
router.get( '/login', mid.loggedOut, function( req, res, next ) {
  return res.render( 'login', { title: 'Log In' } );
} );
```

* Notice `mid.loggedOut` is placed in the middle of the routes (it literally is middleware!)

## Test
Login in and manually browse to /profile or /register and you will be rerouted to the /profile page

## requiresLogin
* Determine if the user is logged in by checking for a session with a userId property
    - If they are logged in, then they just continue on to the next piece of middleware and eventually to wherever that route leads
    - If the user isn't logged in, it will spit out an error saying that the user must be logged in to view the page

**middleware/index.js** update with:

```js
function requiresLogin( req, res, next ) {
  if ( req.session && req.session.userId ) {
    return next();
  } else {
    var err = new Error( 'You must be logged in to view this page' );
    err.status = 401;
    return next( err );
  }
}
module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
```

Now if you wanted to put this in the about page (really shouldn't as that is a public page and should be viewed by everyone)

**routes/index.js**

```js
// GET /about
router.get( '/about', mid.requiresLogin, function( req, res, next ) {
  return res.render( 'about', { title: 'About' } );
} );
```

## Test
You should not be able to see the about route when you are not logged in
* Remove that middleware from about and put it on the profile page
* You can remove some of the existing code because it is redundant

Old

```js
// GET /profile
router.get( '/profile', function( req, res, next ) {
  if ( !req.session.userId ) {
    var err = new Error( 'You are not authorized to view this page' );
    err.status = 403
    return next( err );
  }
  User.findById( req.session.userId )
    .exec( function( error, user ) {
      if ( error ) {
        return next( error );
      } else {
        return res.render( 'profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook } );
      }
    } );
} );
```

New

```js
// GET /profile
router.get( '/profile', mid.requiresLogin, function( req, res, next ) {
  User.findById( req.session.userId )
    .exec( function( error, user ) {
      if ( error ) {
        return next( error );
      } else {
        return res.render( 'profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook } );
      }
    } );
} );
```

## Test
You should not be able to see the `/profile` route when not logged in

## Using MongoDB as a Session Store
Currently our session data is stored in the systems memory
Server ram is limited resource
And quickly can fill up if a lot of folks sign up and log in
Too many logins and server will slow down and crash
For a production server you should use a more scalable solution
Lots of Session Storage options for express
Including ones that use fast DBs like Redis and Mongo
We'll use MongoDb to store session data
Someone has already written a middleware module called connect mongo which Makes it very simple to add a mongo session store

## Install connect-mongo module
* Make sure you are in project's root directory

`$ npm install connect-mongo --save`

## Require the module in app.js

**app.js**

```js
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var session = require( 'express-session' );
var MongoStore = require( 'connect-mongo' )(session); // ADD THIS LINE
var app = express();
```

* Make sure to add after the line that loads our `session` module
* I'm both loading and calling this module and passing our express `session` as an argument
    - This lets the connect-mongo middleware access the sessions

**app.js**

```js
// use sessions for tracking logins
app.use( session( {
  secret: 'soccer is awesome',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore( {
    mongooseConnection: db
  } )
} ) );
```


* **note** session code comes after the MongoDB connection

Final **app.js**

```js
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var session = require( 'express-session' );
var MongoStore = require( 'connect-mongo' )( session );
var app = express();

// mongodb connection
mongoose.connect( 'mongodb://localhost:27017/bookworm' );
var db = mongoose.connection;
// mongo error
db.on( 'error', console.error.bind( console, 'connection error:' ) );

// use sessions for tracking logins
app.use( session( {
  secret: 'soccer is awesome',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore( {
    mongooseConnection: db
  } )
} ) );

// make user ID available in templates
app.use( function( req, res, next ) {
  res.locals.currentUser = req.session.userId;
  next();
} );

// parse incoming requests
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

// serve static files from /public
app.use( '/scripts', express.static( __dirname + '/node_modules' ) );
app.use( express.static( __dirname + '/public' ) );

// view engine setup
app.set( 'view engine', 'pug' );
app.set( 'views', __dirname + '/views' );

// include routes
var routes = require( './routes/index' );
app.use( '/', routes );

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
  var err = new Error( 'File Not Found' );
  err.status = 404;
  next( err );
} );

// error handler
// define as the last app.use callback
app.use( function( err, req, res, next ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    error: {}
  } );
} );

// listen on port 3000
app.listen( 3000, function() {
  console.log( 'Express app listening on port 3000' );
} );

```

`> mongo`
`> show dbs`
`> use bookworm`
`> show collections`

You won't see sessions but if you log in now, you will see the sessions collection

And you can see the session with

`> db.sessions.find()`

If you log out, you should see the sessions collection is empty (our log out route deletes the user session)

## Improvements
When user logs in you don't want their email and password from their browser to your server
* Someone along the way can intercept the traffic and get those credentials
* The same is true when user signs up (disclosing personal or financial info)
* On any site that uses authentication you should serve your site via `https` the s on the end stands for secure because it uses TLS (Transport Layer Security ) - this means the data being transferred is encrpted which prevents our users information from being intercepted and deciphered
* These days many sites use https for all requests and responses, not just for form data

## How to use HTTPS
* You need to aquire a certificate signed by a trusted source to verify the security of the website
* You can get a certificate for free from [Let's Encrypt](https://letsencrypt.org/)
    - It requires some set up on your server to use your free certificate
    - This makes it easier [certbot](https://certbot.eff.org/)

[Getting Started with Let's Encrypt](https://letsencrypt.org/getting-started/)
[Let's Encrypt Middleware](https://github.com/Daplie/letsencrypt-express)

## Token Based Authentication
When user submits their credentials to log into website
The server responds with a token
That allows the user to request various resources
Without submitting their username and password again
That token can then be offered to the server with each subsequent request to allow the user to gain access to a specific resource
If you ever signed into a site usign your google, facebook or github account you used token based authentication
It's another way of gaining the functionality we achieved with sessions and cookies
Instead of using a session id to look into the session object for our users information
We can access it via a token generated by the server

## 2 popular approaches to token based authorization
1. [oAuth](http://oauth.net/)
2. [JSON Web tokens](https://jwt.io/)

## [Passport](http://passportjs.org/)
Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

Very popular option for adding authentication to express

Middleware that supports a wide variety of authentication strategies

