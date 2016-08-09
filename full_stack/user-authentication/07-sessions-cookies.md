# Sessions & Cookies

## Add Login
Add a login form so users who already registered can log into the site
We'll add a profile page
* Show the details for a logged in user
    - Should only be visible to someone who is logged in
        + aka we need to add `authentication` to the profile page

### HTTP stateless protocol
How do we keep track of our users as they use our site
As users click from page to page in our site, we'll use cookies and sessions to keep track of users that are logged in

## What we are building
* Log in form
* A post route
    - Makes sure user supplies values for email and password
    - Makes ure supplied email and password match a user in DB
    - It authenticates users so they can visit the profile page so they can see information specific to them

We'll need to add a new behind the scenes feature to deal with the HTTP stateless protocol

## Sessions and Cookies

## HTTP - the stateless protocol
Web servers don't normally keep track of who's visiting the site
Servers also don't keep track of visitors as they click from page to page

### So if this is true? How can I log in and jump from page to page if the server has no idea who I am?

Sessions give servers a way to keep track of users as they move from page to page

* A session represents one visit by one browser to a website
* With a little bit of programming a server can create a session id when visitor logs into the site
    - The session id identifies that browser and usually lasts a set period of time
    - After that time, the session is destroyed and the user is forgotten
    - MOST IMPORTANT, the server can save information along with the session id
        + Example
            * The server could save the id for a logged in user
            * Or the last 5 pages the user visited
            * Or the items they added to their shopping cart

## Our app and how it will work
User logs into site
The server creates a session containing:
* Session ID
* User ID
    - For security, all information about the session is stored on the server
    - But in order for the browser to identify itself, we also need to use cookies

# Cookies
A cook is a Key/Value Pair managed by your web browser
It can store any information that the web site wishes to save
A server can:
* Create
* Modify
* Delete
* Read
    from a cookie

In our case, the server will create a cookie in the user's browser with only the user's session ID
As the logged in visitor travels from page to page, the server reads the cookie, gets the session id, and then looks up the user id associated with that session

## Add Sessions and Cookies to our Express App
We will use the Express Session Module
* Package created by Express programming team
* Gives us middleware to handle session logic in an Express app
    + This saves us from having to do a lot of programming

## Install [express-session](https://github.com/expressjs/session)
`$ npm install express-session --save` 

### Include express-session in your app

**app.js**

```js
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var session = require( 'express-session' ); // ADD THIS LINE
var app = express();
```

### Tell our app to use the middleware express-session provides

**app.js**

```js
var app = express();

// use sessions for tracking logins
app.use( session( {
  secret: 'soccer is awesome',
  resave: true,
  saveUninitialized: false
} ) );
```

* **secret** - only require option, it is a string that is used to sign the session id cookie, the secret adds another level of security to our system
* **resave** - forces the session to be saved in the session store whether anything changed during the request or not
* **saveUninitialized** - forces an uninitialized session to be saved in the session store
    - [list of session stores](https://github.com/expressjs/session#compatible-session-stores)

What is an uninitialized session? A new and not yet modified session and we don't want to save it so we set it to false

That is all we need to get sessions working in Express

* You can use sessions all of the time
* Even for visitors who haven't signed up as members of your site
* Useful to keep track of how anonymous users 
    - Visit your site
    - Which pages they visit
    - How long they stay on the site
    - Google Analytics uses sessions to collect web site usage data

## The Session store setting
One setting for session object we are not using yet
This tells Express where to save session information
By default Express stores all session information in the server's memory, this is only suitable for local development because it is fast and easy to use
but if you had millions of users visiting your site, storing all that session's data in the server's RAM would quickly overrun the server and crash the site
In production, you'll use some sort of database to store session information
there are numerous options for a [session store](https://github.com/expressjs/session#compatible-session-stores)
We will use the default because it is fast and easy to use
But we will use a real session store using mongoDb in a little bit. stay tuned

## Add the programming to create a session
We'll only create sessions for logged in users
We'll add that to the route, whenever a user logs in and is authenticated
Once you create a session you can access it in the request object in any route

**Why are session variables typically stored on the server rather than in a cookie on the browser?** 

Because you don't want to send sensitive information and store it in the browser where a user (or hacker) could change it. Usually the cookie only holds the session ID -- a key to associate that one user and browser with a specific collection of session data.

**What does the secret option do?**

It is used to sign a cookie, to ensure that only the application created the cookie. This adds another layer of security, because it makes it difficult for someone to create a cookie in their browser to try and gain access to session data.

## Adding Log In Routes

**routes/index.js**

```js
// GET /login
router.get( '/login', function( req, res, next ) {
  return res.render( 'login', { title: 'Log In' } );
} );

// POST /login
router.post( '/login', function( req, res, next ) {
  res.send( 'logged in' );
} );
```

Post route won't work until the Login Form is built

**views/login.pug**

```
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
Run `$ nodemon`

You'll get an error from Mongo
We can ignore that error for this test
Browser to http://localhost:3000/login
Should show form and when you click login button should show you `logged in`
our route works!

## Authenticating Username and Password

**routes/index.js**

```js
// POST /login
router.post( '/login', function( req, res, next ) {
  if ( req.body.email &&
    req.body.password ) {
    return res.redirect( '/profile' );
  } else {
    var err = new Error( 'Email and password are required' );
    err.status = 401; // unauthorized
    return next( err );
  }
} );
```

401 status code - unauthorized, use it to indicate missing or bad authentication

## Test
Should make you enter email and password if you go to http://localhost:3000/login and just hit login button

**models/user.js**

Mongoose Schema's statics object - lets you add methods directly to the model
* We'll be able to call this method when we require the model in our other files (like our routes file) 
* The function takes 3 arguments
* The email and password submitted with the form and a callback function
    - We'll add the function in the route but it will either log the user in or give them an unauthorized user error
* In the function we use a query to find the document with the users email address, then use the exec() to perform search and provide a callback to process the results
    - If there's an error with the query, return an error
    - Also return an error if the email wasn't in any document
    - If there is a user, we use bcrypt.compare() method to compare the provided password with the hashed version
        + Compare method takes 3 arguments
            * Plain text password (user types into log in form)
            * Hashed password (from retrieved database document)
            * Callback function
        + Returns an error if something goes wrong or a result (just a boolean true or false)
            * `true` if passwords match
                - We return null and user document because we know that the user logging in is who they claim to be
                - The null value represents an error value
                    + node uses a standard pattern for callbacks, an error followed by other arguments, since we have no error, we pass a null value, followed by the user object
            * `false` if they don't

With the authenticate added to our schema we can now call it from the login route

**routes/index.js**

```js
// POST /login
router.post( '/login', function( req, res, next ) {
  if ( req.body.email &&
    req.body.password ) {
    User.authenticate( req.body.email, req.body.password, function( error, user ) {
      if ( error || !user ) {
        var err = new Error( 'Wrong email or password' );
        err.status = 401;
        return next( err );
      }
    } );
}
// more code
});
```

* Conveniently Express adds session data to the request object, so anywhere you can request the request object, like any route, you can set and read session data, and Express also creates the cookie for us automatically
* We also don't do anything special to create a session, just by adding a property `req.session.userId = user._id` we are telling express to add the property to the session or create a new session if one doesn't exist
* user._id
    - Is what we'll get back from authenticate function when its authenticated and user is our document (represents all the info for a single logged in user and _id is the unique id that every document has) 

Also add this to the register route
`req.session.userId = user._id`

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

* The above line means once the user has registered, they are automatically logged in

## Our /profile route
* Our only password protected page

Create **views/profile.pug**

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

* #{name} - users name
* #{favorite} - users favorite book

## /profile

**routes/index.js**

```js
// GET /profile
route.get( '/profile', function( req, res, next ) {
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
Check if user is logged in
Status code 403 - page is forbidden or offlimits unless you are logged in
`user.name` - pulls from database
`name:` is template variable

{ name: user.name }
 We are sending a username from the database to the template

 ## Test
 Drop users collection (check notes)
 Register again
 Submit
 Should be taking to profile page showing your name, and your favorite book

 ![profile logged in](https://i.imgur.com/RSP7ECb.png)

 We don't store the email address for the user in a session. The userID, stored in a session variable, lets us authenticate a user.

 Which property of the request object would you access to retrieve form data.
**req.body**
