# Passport Callbacks
`passport.js`

```js
// more code
(accessToken, refreshToken, profile, done) => {
  // search for an existing id match
  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      // we already have a record with the given profile ID
    } else {
      // no existing record with that profile ID
      // So make a new record!
      new User({ googleId: profile.id }).save();
    }
  });
}
// more code
```

* We have a promise
* If we find a profile id we store that in existingUser and that will hold a mongoose Model Instance (and it represents exactly one record)
    - If none is found, existingUser will be `null`

## Done! ... kind of :)
![one step added to diagram](https://i.imgur.com/TdsognG.png)

* The Google Strategy gives us the **callback** to give us the exact thing we are doing right now
* And that is to create a new record to our Database that represents our new user
* After we finished with the user creation and user fetching stuff, we have to tell Passport (more pointedly to tell that strategy that we are all done)
* And we do that using the `done` callback
* The 4th argument is `done` and whenever we call that we tell the Strategy we're done! And the Strategy can proceed with the Authentication flow

## done(errorObj, USER-RECORD)
* If not error, pass `null` as first arg

`passport.js`

```js
// more code

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // search for an existing id match
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // no existing record with that profile ID
          // So make a new record!
          new User({ googleId: profile.id }).save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
```

* In callback you'll see `new User` and then `.then(user`
    - they both are the same object but the latter one is considered more 'fresh' becuase the `new User` could change after we `.save()` it so we like to use `.then(user`

## Test it in the browser
* It should work with no errors
