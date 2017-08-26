# Routing Specific Middlewares
![how express works diagram](https://i.imgur.com/A5Qo5gl.png)

* A request from our browser
* Gets sent to our Express app
* There can be lots of middleware wired up to our app
    - We use this middleware to inspect our request
    - And modify or change the request how we need it
* The the request is sent of to the different routeHandlers inside our app

## So we can use this to refactor to make sure our user is logged in on a route
![our app diagram](https://i.imgur.com/fyFgjjk.png)

* A request comes in from the browser
* Gets sent to our Express app
* We have Passport middleware
* Make sure users logged in!
* Send to requestHandler

But unlike when we use `app.use()` where we always run that middleware, we only want to run the check if user is logged in middle on private routeHandlers

## Add a `middlewares` directory in the root of your app
* And create a new file called `requireLogin.js`
* Remember naming convention
    - If we export a little function we use a lowercase letter
    - If we are exporting a class (of any type - Component class, Model class...) we use a capital letter

`/middlewares/requireLogin.js`

```js
// let's immediately define and export a function
module.exports = () => {};
```

### next
`/middlewares/requireLogin.js`

```js
module.exports = (req, res, next) => {};
```

* We user `next` because we want to push to the next middleware when we are done checking if the user is logged in
* If we don't use `next` here the request will just hang and go nowhere

`/middlewares/requireLogin.js`

```js
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in' });
  }

  next();
};
```

* If the user is not logged in, return and send an error in the response
* We are not using `next` so we just tell the user "Yo, there's a problem"
* But if the user is logged in we called `next()` to keep the request going to the next middleware or to the final routeHandler

`billingRoutes.js`

```js
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('./../middlewares/requireLogin'); // add this line

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => { // update this line
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
```

* **note** We don't call `requireLogin()`, but just reference it (with no parenthesees), We don't want to call this immediately but just have it there to be called with the routeHandler is visited
* **note** routeHandlers take an arbitrary number of arguments so we can pass in as many middlewares as we want
    - The only requirement is one of the functions has to process the request and send back a response to the browser

## Next - Display Credits inside Header
