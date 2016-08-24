# oAuth

## What is oAuth?
OAuth is a protocol that allows users of social networks to grant 3rd party websites access to profile information without revealing their username and passwords.

* Only way to share data between sites was to enter **email** and **password** into a 3rd parties website
* The 3rd party would then log in on behalf of the user to access an API
* But high profile hacks started to occur a lot 
* Hackers who could compromise a 3rd party's site now had user's email and password for other sites too

[oAuth](http://oauth.net/) was invented to fix this

[wiki info on oAuth](https://en.wikipedia.org/wiki/OAuth)

### Google Trends shows Passwords stolen
[passwords stolen](https://www.google.com/trends/explore?date=all&q=passwords%20stolen)

## Difference between Authentication and Authorization

### Authentication
Who you are?

### Authorization
What you can do?

## How oAuth Works - An Example Using Facebook
1. We have an app and we want users to log in with their Facebook profile
2. We need to register our app with Facebook
3. They'll give us a couple of tokens (_aka unique identifiers_) that will give our app access to their **API**
    * Normally tokens come in the form of **ID** and key or **secret**
    - Think of it as a `username` and `password` specifically for our app
    - This allow Facebook the ability to remove users who are abusing their information
        + Like using data for unauthorized purposes (_like spam_)
4. We use the **ID** and **secret** in our application
5. When user wants to use our app, they are redirected to Facebook's page
6. The user authenticates on Facebook with their **username** and **password**
7. Then they authorize our app to have access to their profile information
8. If the user is already authenticated with the service, the user won't see the login page but they will see the authorization page
9. The requested profile information is sent back to our app for us to use in whatever which way we want
10. In this case, to authenticate them with our app
11. Along with profile info, you get **TWO** specific tokens for the user
    1. Access Token
        * Allows you to access other parts of the **API**
    2. Refresh Token (_sometimes_)
        * Used to renew access tokens without forcing the user to reauthenticate with the provider

## oAuth
Can be used to authorize an application to work with a provider's **API**
But in most cases its used to authenticate a user

### 3 ways to authenticate someone
1. What they know
    * **password** for logging in or **secret phrase** to reset a password
2. What they are
    * Using biometric scanners to recognize fingerprints, faces or irises
        - Apple uses touch id to read fingerprints to authenticate people
        - Microsoft uses face detection in Windows Hello to allow people to log in without a password
3. What someone has
    * Slack allows you to sign in via **magic links** sent to an email address
    * Other apps send a text message with a unique code
        - To prove that you have access to that telephone number
    * 2-factor authentication
        - You have an app installed on your phone
        - That generates secret codes to prove that you have the device and you are who you say you are

**Oauth** can request info for **creating**, **reading**, **updating**, **deleting** all sorts of info on a provider's website

* Valid profile with a trusted provider

## [Github Starter](kingluddite/passport-oauth-workshop-start.git)
Click to download starter files

* Built with Express
* Install dependencies `$ npm install`
* Start with `$ npm start` or `$ node ./bin/www`

## Current State of app
* Our app will save user info to mongodb
* User model defines user data we want to save
    - email
    - name
    - favoriteBook
    - photo
    - we do not have a password field
        + this is because we'll be using a user's profile info returned from either GitHub or Facebook to authenticate the user

## Our `routes` folder
* index.js
*   home (root rout `/`)
*   about `/about`
*   contact `/contact`
*   profile `/profile`
*   login `/login`

Passport makes the user object available to the request object
* So all of our routes and views have access to that data
* Pay attention to the /profile handler
    - If there is a user, the profile page will render
        + If no user, it will redirect to the login page (**/login**)

## Views
* In `profile` view, it also checks if the user exists

**views/profile.pug**

`if(user)`

* If it does, it will show the photo and the name

**views/navbar.pug**

* It checks for a user too
    - If we don't have a user, we'll `display login links`
    - If user is present, the `logout button will appear`

## Install Passport
`$ npm install passport --save`

## Install express-session

`$ npm install express-session --save`

## Install connect-mongo

`$ npm install connect-mongo --save`

* Store the user while the browser session is still open
* We will be using a persistant session store with mongodb
* This will allow user to remain logged in when they return to the site

**app.js**

## Require
* passport
* express-session
* connect-mongo
* passing in the session

(**code fragment app.js**)

```js
var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
var session = require( 'express-session' );
var MongoStore = require( 'connect-mongo' )( session );
var User = require( "./models/user" );
```

* We need to initialize the express session install
* Do this just after the DB connection

(**code fragment app.js**)

```js
// mongodb connection
mongoose.connect( "mongodb://localhost:27017/bookworm-oauth" );
var db = mongoose.connection;

// Session config for Passport and MongoDB
var sessionOptions = {
  secret: "this is a super secret hooha!",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( {
    mongooseConnection: db
  } )
};
```

* Now that we have our session set up as middleware
* It will be available to the passport middleware

## Initialize Passport

(**code fragment app.js**)

```js
app.use( session( sessionOptions ) );

// Initialize Passport
app.use(passport.initialize());
```

## Restore the Passport session
* This restores the user's previous session
    - If a user was previously signed in, they still will be when they return to the site

```js
app.use(passport.initialize());

// Restore Session
app.use(passport.session());
```

Passport doesn't require sessions to work (which is fine if you want a temporary authorization for a one-off request)

In order for Passport to handle sessions, you need to implement two methods:

1. passport.serializeUser()
    * To serialize something is to translate a data structure for storage
        - In our case (_a session storage_)
        - Requires a function with two arguments
            + `user` and `done`
2. passport.deserializeUser()

```js
passport.deserializeUser(function(value, done) {

});
```

* The value in our case is a `user id`

```js
passport.deserializeUser( function( userId, done ) {
  User.findById( userId, function( err, user ) {
    done( err, user );
  } );
} );
```

* `findById()` will find a user's **id**
* We can then call `done` when the **user** is found
    - The `done` **callback** will either:
        + Pass an error to the express middleware that handles errors
        + Or the user model that will be added to the request object so that its accessible to the route handlers and views

    * To read the data again you need to deserialize
        - AKA reconstruct the stored data
    * We can pass the done as a callback, since the done's function parameters are the same as Mongoose's callback parameters (err, document returned)

### So this:

```js
passport.deserializeUser( function( userId, done ) {
  User.findById( userId, function( err, user ) {
    done( err, user );
  } );
} );
```

### Becomes this:

```js
passport.deserializeUser( function( userId, done ) {
  User.findById( userId, done );
} );
```

## Documentation
* [Passport.js Sessions](http://passportjs.org/docs#sessions)
* [Express Session](https://github.com/expressjs/session)
* [connect-mongo Express Integration](https://github.com/jdesboeufs/connect-mongo#express-or-connect-integration)
* [Mongoose findById](http://mongoosejs.com/docs/api.html#model_Model.findById)

