# Backend route protection with JWT
`messages.js`

```js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Message = require('../models/message');

router.get('/', function(req, res, next) {
  Message.find()
    .exec(function(err, messages) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: messages
      });
    });
});

router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      })
    }
    next();
  });
});
```

* Only allow logged in users to create new messages
* `router.use()` - This means on **each** request this method is reached and run
    - We use `/` to handle every request reaching this route
    - This route will check the `client/user/browser` if it sends us a valid token
        + How do we find out if a token is valid?
        + We will use the `secret` to validate an incoming token
        + The token will not be in the URL like this `/:token` but instead it will be added in the **query parameters**
            * What are `query parameters`?
                - They are the parameters appended at the end of a URL
                    + `?token=sfsflasjfksfjaslkfjsfjsf'`
                        - `token` would be the key
                        - And the right of `=` would be the value of the token
                        - If not query parameters are passed, then it will be `null`
        + Make sure `secret` matches what you used when you created the token

![token created with secret](https://i.imgur.com/Jx2G1Tz.png)

* `401` - Not Authorized
* We use `next()` because we don't want to send a response because we just used this as a check and then we want it to move on to the next middleware

## Test in browser
* Restart Express server `$ npm start`
* Logout if you are logged in
* Create a new message
* You should see this 'Not Authenticated' message in the console

![not authenticated token](https://i.imgur.com/Z7ysstZ.png)

## Houston we have a problem
* When we do sign in, we get the same error message
* We set up the token in our backend but we are not passing the token from our frontend
* We need to pass the token with each request in `message.service.ts`
* We will handle that in a moment

## Next
* Map our users to their message
* Map the messages to their user

