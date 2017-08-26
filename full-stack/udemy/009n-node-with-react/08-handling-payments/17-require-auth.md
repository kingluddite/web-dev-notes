# Requiring Authentication
## Test it out
* Fill out and send the form
* Use Network tab of Chrome dev tool sort by XHR
* Click on `stripe` request
* Click `Preview` tab
* You should see:

![user object with credits](https://i.imgur.com/gfuaaNF.png)

* If you do, billing is now working inside our route

## Houston we have a problem
`billingRoutes.js`

```js
// more code
req.user.credits += 5;
const user = await req.user.save();

res.send(user);
// more code
```

* We are assuming we always have a user object
* But would if a user not logged in visited our `/api/stripe` route?
* We need to update our routeHandler to make sure a user is logged in before we add credits to a user account
* We'll send a status of 401 (which stands for `forbidden`)

`billingRoutes.js`

```js
module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in' });
    }

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

* If the user object doesn't exist on the request, we leave the function
* `return res.status(401).send({ error: 'You must log in' });`
    - We set the status on the response to 401
    - And we send back an object with an error key and value so developers can troubleshoot

## Houston we have a problem
* What if we have hundreds of routeHandlers that we need to check to make sure the user is logged in?
    - Do I have to do this for every route?
    - That doesn't seem DRY
    - It's not DRY
    - We can do better
    - Let's refactor



