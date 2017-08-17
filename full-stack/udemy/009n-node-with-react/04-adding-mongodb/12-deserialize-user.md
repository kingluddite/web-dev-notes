# Deserialize User
* We will take the `_id` that we previously stuffed into a cookie

`passport.js`

```js
// more code
passport.serializeUser((user, done) => {
  done(null, user.id); // this id here!
});
// more code
```

* We need to take that id and turn it back into a user Model
* `findOne()` vs `findById()`
    - Both mongoose methods
    - `findOne()` we used to search for criteria

`User.findOne({ googleId: profile.id })`

* `findById(id)`
    - We just pass in the `id` and it will find the record if it exists
    - Remember anytime we access our `MongoDB` it is always an async action and to deal with this we have to assume it returns as a Promise to be resolved after the user with the given `_id` is found

`passport.js`

```js
// more code
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
// more code
```

## Make Passport eat a cookie! 
* Tell Passport we want it to manage all of our authentication by using a cookie
