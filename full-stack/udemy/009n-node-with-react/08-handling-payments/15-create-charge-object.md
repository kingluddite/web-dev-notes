# Creating a Charge Object
* Make sure the request object credit card token is being communicated to our request helper successfully

## Test it out
* We will at first not form a response
* So the browser will just hang
* Open Chrome dev tool Network tab
* Filter by XHR requests

![XHR filter](https://i.imgur.com/sHeZpCq.png)

* Clear out log
* Click add credits button in Header
* Fill out form
    - Remember cc# is just `42` repeated
* Click Pay button
* That reaches out to the Stripe API

![tokens request](https://i.imgur.com/jyci3w6.png)

* And it gets back a credit card authorization `id`
* Now we'll add a log to test this out

`billingRoutes.js`

```js
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', (req, res) => {
    console.log(req.body);
  });
};
```

* Check out the Terminal and you should see this:

![request body](https://i.imgur.com/v31b6KX.png)

* This shows we are successfully communicating the request body into our request handler

## Make our charge
* We will take that `req.body` to make the charge

![stripe create charge](https://i.imgur.com/wWzeqUU.png)

`billingRoutes.js`

```js
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', (req, res) => {
    stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    })
  });
};
```

## Finalize A Charge
* If you look at the Stripe documentation you will see there is also a callback
* **remember** Whenever you reach out to an API (Stripe included) it is always asynchronous and we have to deal with it either by:
    - Using a callback by using a Promise
        + The [documentation on Stripe](https://stripe.com/docs/api#create_charge) web site shows how to use a callback
    - Or use async-await syntax
        + The [npm stripe documentation](https://www.npmjs.com/package/stripe) says "Every method returns a chainable promise which can be used instead of a regular callback:"

![Using Promises stripe](https://i.imgur.com/cYHBjLZ.png)

* We will use async-await syntax instead of a callback
* Find a function that has asynchronous code inside it
    - That is our request handler

![async code](https://i.imgur.com/suux3BJ.png)

* We put async in front of that function

`billingRoutes.js`

```js
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
  });
};
```

* Find a call that returns a Promise and put the `await` keyword in front of it

`billingRoutes.js`

```js
// more code
module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
  });
};
```

* And whatever this Promise resolves with, we will pass off to a new variable

`billingRoutes.js`

```js
// more code
module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
  });
};
```

* We name it `charge` as that is what it really returns as it represents the charge that just occurred
* Let's log out the charge to test it

`billingRoutes.js`

```js
// more code
module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    
    console.log(charge);
  });
};
```

* Test
* Fill out and submit form
* Check out your terminal
* And you will see a huge object describing the charge we just made

### We are done dealing with Stripe
* We takeout `checkout.js` (stripe checkout form)
* We receive info that id's user credit card that they just entered that authorizes us to bill a certain amount of money
* We post it to the backend api
* And use the stripe npm module to create the actual charge and bill the user

## Next
* We just billed the user
* Now we need to assign the user some amount of credits
