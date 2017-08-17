# Logging Out Users
* If someone makes a request to `/api/logout` route, we will log them out of our Application
* Passport adds `logout()` to the request object `req.logout()` automatically
    - It takes the cookie that contains the user id and kills the id inside it
    - We also send back feedback to the user which will just send back a user but the user will be null because they are logged out

`authRoutes.js`

```
// more code

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
```

### Test it out
* Browse to `localhost:5000/api/logout`
* I was logged out and now I should see a white screen
* That means we got a response from our app but the response was empty, I know longer have a `req.user`
* The moment we logout req.user is destroyed by Passport
* If I try now to visit `localhost:5000/api/current_user` I will also see a blank screen
* But if I `localhost:5000/auth/google` and then visit `localhost:5000/api/current_user` I will see my user object again
