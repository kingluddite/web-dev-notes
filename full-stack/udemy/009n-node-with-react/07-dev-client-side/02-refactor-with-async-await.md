# Refactor with async-await
* **note** Any time we touch our Database it is an asynchronous operation and always returns a `Promise`

`passport.js`

* Find the function that contains some asynchronous code

```js
// more code

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
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
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
```

## Mark the function as being asynchronous in nature using `async`
![add async](https://i.imgur.com/8xp8ZM8.png)

## Find the `Promises` being used

![Promises being used](https://i.imgur.com/BY8TwdB.png)

## Add `await` keyword to those Promises
![add await](https://i.imgur.com/eZbbLqx.png)

## Assign awaits to a new variable
* And clean up the `then()` statements

`passport.js`

```js
// more code

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // search for an existing id match
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // we already have a record with the given profile ID
        done(null, existingUser);
      } else {
        // no existing record with that profile ID
        // So make a new record!
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
```

* Prettier should show no errors
* Check your terminal and if should show no errors (make sure it is running `$ npm run dev`)

## Check your node version
* Super important
* `$ node -v`
* You need to be running version 7.6 or greater
* If you don't have that version of Node, upgrade your Node with [Homebrew](https://www.youtube.com/watch?v=lI_2DWnYo8o)!
* `$ brew upgrade node`

## Cleaning up code
We can use `return` in first if statement and then we can get rid of our `else` block

```js
// more code
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // search for an existing id match
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }

      // no existing record with that profile ID
      // So make a new record!
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
```

