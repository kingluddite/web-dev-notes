# Redirect user on OAuth
`authRoutes.js`

```js
app.get('/auth/google/callback', passport.authenticate('google'));
```

* passport.authenticate('google') is middleware
* Where do we go next?
* We never said and that is why the route breaks

```js
app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/surveys');
  }
);
```

* The response object `res` has a function attached to it called `redirect()`
* The redirect() responds back to the browser and says "Oh hey, glad you came here but I don't want to deal with you anymore, I don't want to deal with your request. I have this other routeHandler inside our app that cares way more about you so I want you to go over to this other route `/surveys` and that will figure out what to do with you"

## Review
* After the user comes back from the OAuth flow
* passport middleware takes over and does its thing and says I'm done
* It passes the request on to the next handler in this chain
* Which is the arrow function
* We take the request in and we tell the response to inform the browser that it needs to go to this other route `/surveys`

## Test
* Log out
* Click Login with Google
* You should be logged in and taken to the `/surveys` route
