# Verify Minimum Credits

## Create new middleware
`/middlewares/requireCredits.js`

```js
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits' });
  }

  next();
};
```

* A status code in the 400 range indicates to the user that they made some error in the request (they did something wrong)

## W3C Status Codes
[status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

* There is a 402 - but that is not in public use yet
* So we'll use 403 - Not quite what we want but close enough

## Update our routeHandler
`surveyRoutes.js`

```js
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {});
};
```

* We can add as many middlewares as we want
* But we need to add them in the order we want them to be executed
