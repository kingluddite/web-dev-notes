# Passport and Github

## Setting up a Passport Strategy
1. Install Strategy through **npm**
2. Create "Application" on Oauth Provider
    * We'll use Github and Facebook
3. Configure Passport Strategy or Passport Middleware with the **id** or **key** and **secret**
4. Create Routes for Logging into Provider

### Install Passport Strategy

`$ npm install passport-github --save`

1. Go to [http://github.com/username](http://github.com/username)
2. Click on `account settings`
3. Click on `oAuth applications`
    * You will see all apps that have oAuth from github
    * You can revoke them anytime
4. Click on developer applications
5. Register a new application
    * **app name** - bookworm - development
    * **homepage url** - http://localhost:3000

## In the Real World Of App Development
Generally you will have multiple oAuth apps

    * One for development
    * One for staging
    * One for production

  * **callback url** - the route where your app will handle the return call from the oAuth provider containing the profile information
    - `http://localhost:3000/auth/github/return`

### submit form

## Use passport
**app.js** (_fragment_)

```js
passport.use(); // ADD THIS LINE

passport.serializeUser( function( user, done ) {
  done( null, user._id );
} );
```

View **Client ID** and **Client Secret** inside Github

* Passport specific middleware is called `Strategies`

## Add Passport to the required list
Just under where we imported `passport` in **app.js** require the github strategy

```js
var passport = require( 'passport' );
var GitHubStrategy = require( 'passport-github' ).Strategy;
```

## Now configure out github strategy

**app.js**

```js
var User = require( "./models/user" );

// MODIFY passport.user() as seen below

// Configure GitHub Strategy
passport.use( new GitHubStrategy( {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/return'
}, function() {} ) );
```

* `callbackURL` must be identical to what you used when you created it on Github
* We leave `clientID` and `clientSecret` blank on purpose for security reasons
    - You don't want to add this sensative info to version control
    - You don't want your development credentials deployed to staging and production
        + You don't want to mix up your development and stating users with your actual user base
    - If developer leaves your team, you want to revoke that development environment without effecting your production users
    - It is good practice to separate **IDs** and **secrets** from all environments

## Environmental Variables
Allow us to not show our **ID** and **Secrets** to anyone we don't want to:

```
clientID: process.env.GITHUB_CLIENT_ID
clientSecret: process.env.GITHUB_CLIENT_SECRET
```

```js
// Configure GitHub Strategy
passport.use( new GitHubStrategy( {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/return'
}, function( accessToken, refreshToken, profile, done ) {
  if ( profile.emails[ 0 ] ) {
    // ideal place to find our create a user document in the database
    User.findOneAndUpdate( {
        email: profile.emails[ 0 ].value
      }, {
        name: profile.displayName || profile.username,
        email: profile.emails[ 0 ].value,
        photo: profile.photos[ 0 ].value
      }, {
        upsert: true
      },
      done );
  } else {
    var noEmailError = new Error( 'Your email privacy settings prevent you from signing in to Bookworm' );
    done( noEmailError, null );
  }
} ) );
```

* We can pass them in as arguments or set them before we run the node application
* **profile** - json object
* Mongoose has method `findOneAndUpdate(filter, update, option, callback)`
    - `User.findOneAndUpdate()...`
        + The Mongoose Model finds data based on search criteria
            * Our search criteria is the user's **email address**
                - We access that email from the list of emails returned by the profile object from the **oAuth** callback
            * Always good to inspect the **profile** object so that you are sure you are getting all the info you expect and it is in the correct format
            * If we find the object, we should update it with the latest info from the social network 
            * The **displayName** on the **profile object** is the user's name
                - use and or || in case **displayName** not available from **oAuth** provider and use the **username** instead
            * We use **upsert** to add data if user doesn't exist yet
            * The **last callback** sends info back to passport and eventually back to express, so it can execute the next piece of middleware
                - We can pass `done` to the `findOneAndUpdate()` method
                - If there is an error from the `upsert` that method will pass in an error to the `done` as the first argument, if a document is found it will be passed as the 2nd argument
            * Check if email was collected, if not, error and let user know

## Working on our Auth Route

```js
var routes = require( './routes/index' );
var auth = require( './routes/auth' ); // ADD THIS ROUTE
```

### Now user the auth route

```js
app.use( '/', routes );
app.use( '/auth', auth ); // ADD THIS LINE
```

## Now create `routes/auth.js`

`$ touch routes/auth.js`

**routes/auth.js**

```js
var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );

// GET /auth/login/github
router.get( '/login/github',
  passport.authenticate( 'github' ) );

// GET /auth/github/return
router.get( '/github/return',
  passport.authenticate( 'github', { failureRedirect: '/' } ),
  function( req, res ) {
    // Success Auth, redirect profile page
    res.redirect( '/profile' );
  } );

// GET /auth/logout
router.get( '/logout', function( req, res ) {
  req.logout();
  res.redirect();
} );

module.exports = router;
```

* Passport middleware not only adds the user property to the request object, it also adds a logout() method

## Before you start the app, first start the mongodb server
$ mongod

## Start the app with environmental variables
Open Github to copy the Client ID and Client Secret

Add this to the terminal immediatly before you use the start command

`$ GITHUB_CLIENT_ID=5b251c08ea9acf0b130d GITHUB_CLIENT_SECRET=df59cec05aac059dda568abfdb86a26346f2938b ./bin/www`

## Test

1. Visit: http://localhost:3000
2. Click Login
3. Click Github
4. Click Authorize application

And you should be routed to your profile page
Congrats! You are signed in.
