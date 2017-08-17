# Testing Authentication
![testing diagram](https://i.imgur.com/SVbVTfq.png)

* We have completed OAuth flow but what does it get us?

## Flow every time a user makes a request to our app
* After having gone through the OAuth flow

1. request comes in from browser
2. We take that request and pass that request to that cookie session thing
    * Which will automatically extract all the data from that cookie
    * And it will de-encrypt all the data inside of there
3. That de-crypted data is passed on to Passport
    * Which pulls that user `_id` out of the cookie data
4. The `_id` is then passed on to our `deserializeUser()` function
    * Where we take that `_id` and turn it into a User Model Instance
5. The end product of all this is, all our hard word, is the User Model Instance is added to the request as `req.user`
    * `req` is short for the **request object** that is passed into any Express routeHandler
6. That request is then sent on to whatever routerHandler is supposed to deal with that request

## Testing it out
* We need to add a new routeHandler inside our app who's sole purpose is to inspect this `req.user` property

`authRoutes.js`

```js
const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
```

* Check if your server is running
* And there are no errors
* Browse in a new tab to `localhost:5000/auth/google`
    - You will not see a GET error - We'll fix that route later
* We are taken to our server, sent to Google, get the profile id
* The profile id is put into the cookie
* Then we return that cookie to our browser
* I now have a cookie tied to my application that identifies me as a verified user
* I am now considered logged in and authenticated to our application
* Then I browse to the new `api` route I just created `localhost:5000/api/current_user`
* And you should see a JSON object of the current user!

![current user logged in!](https://i.imgur.com/xiER4CC.png)

* When I navigate to `localhost:5000/api/current_user` I run through this flow chart

![cookie flow chart](https://i.imgur.com/TqfpQ4B.png)

* `__v` key is maintained by mongoose and we don't need to worry about it

## It works!
* Congrats!
* That is a whole lot of work to make authentication happen
* We need to add the ability to log out
* Now you can install any other Strategy (Github, LinkedIn, Facebook Twitter...)
