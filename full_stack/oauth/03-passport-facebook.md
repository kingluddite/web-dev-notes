# Passport Facebook
Each strategy differs slightly because each provider implements oAuth slightly and have different privacy settings for users

## [Passport Facebook Documentation](https://github.com/jaredhanson/passport-facebook)

* You need to pass the fields you want
* We will also have to ask for permission when the user authorizes with the `scope` options of email
    - When we authorize the user, facebook with notify our user that we are requesting their email address

## Add Facebook Strategy
* After our github strategy

**app.js**

```js
// Configure Facebook Strategy
passport.use( new FacebookStrategy( {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function( accessToken, refreshToken, profile, cb ) {
    User.findOrCreate( { facebookId: profile.id }, function( err, user ) {
      return cb( err, user );
    } );
  }
) );
```

## Environmental Variables
* Make **ID** and **Secret** environmental variables

`process.env.` before both of them

```js
clientID: process.env.FACEBOOK_APP_ID,
clientSecret: process.env.FACEBOOK_APP_SECRET,
```

Change this line

`callbackURL: "http://localhost:3000/auth/facebook/callback"`
To this:

`callbackURL: 'http://localhost:3000/auth/facebook/callback'`

Add profile fields

```js
 callbackURL: 'http://localhost:3000/auth/facebook/return',
 profileFields: [ 'id', 'displayName', 'photos', 'email' ]
```

Since we will be use the same function twice, grab the function we used for github (see below)

```js
function( accessToken, refreshToken, profile, done ) {
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
}
```

Give the function a name and add it right below our variable declarations:

```js
function generateOrFindUser( accessToken, refreshToken, profile, done ) {
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
}
```

Then add that function into both our Strategies as a reference:

```js
// Configure GitHub Strategy
passport.use( new GitHubStrategy( {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/return'
}, generateOrFindUser ) );

// Configure Facebook Strategy
passport.use( new FacebookStrategy( {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/return',
  profileFields: [ 'id', 'displayName', 'photos', 'email' ]
}, generateOrFindUser ) );
```

Don't forget to require our Facebook Strategy

```js
var GitHubStrategy = require( 'passport-github' ).Strategy;
var FacebookStrategy = require( 'passport-facebook' ).Strategy;
```

## Don't forget to install `passport-facebook`

`$ npm install passport-facebook --save`

[visit facebook developers page](https://developers.facebook.com)

If you haven't signed up as a developer yet, you need to sign up first

## Once you are registered

1. My Apps > Add a new app

We will first create a production app

**Display Name:** Bookworm
**Email Address:** your@email.com
**Select Category:** Books

2. Submit
3. Complete verification step so facebook knows you're human
4. Click submit
5. Click on Bookworm (top left)
6. Click on `Create Test App`
7. Bookworm should prepopulate the dropdown
8. Click Create Test App
9. Verify you are human again
10. Click submit
11. Basic Settings - we tell facebook the domain we are using for the app
12. Choose platform
13. Website
14. Site URL: http://localhost:3000
15. Hit `Next`
16. Skip to Developer Dashboard
17. Click Settings
18. Enter **localhost** in `App Domains` and `Save Changes`
19. In your production environment you will have to include your real domain names
20. Copy the App ID and Secret (we need these before we start our app)

## Create Auth routes
Just copy and paste github auth routes
replace all `github` with `facebook`

* We need to add the scope of email to the authentication route for facebook, this instructs facebook to ask permission from the user to share the email addresses with our application

Save and start application passing ID and secret

`$ GITHUB_CLIENT_ID=5b251c08ea9acf0b130d GITHUB_CLIENT_SECRET=df59cec05aac059dda568abfdb86a26346f2938b FACEBOOK_APP_ID=292563471106162 FACEBOOK_APP_SECRET=5f56cf8af9d7abe67ee46bb2023ea5f0 ./bin/www`

## Test
You should log in via Facebook and all should be well.

Congrats!
