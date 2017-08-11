# Handle User Authentication
* Ensure that only users who created a post are able to edit or delete it I need to modify the `patch` and `delete` routes on the backend

## Once again how do we fetch the user?
* As mentioned previously I can extract it from the decoded token

`const decoded = jwt.decode(req.query.token);`

* Copy the above code from the post route and paste it into our `patch` route

`messages.js`

```
// more code
router.patch('/:id', function(req, res, next) {
  const decoded = jwt.decode(req.query.token);
// more code
```

* As another reminder only ever use `jwt.decode` after you have validated a token using `jwt.verify()`

`messages.js`

```js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./../models/user');
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

router.post('/', function (req, res, next) {
    // I don't check the validity of the token (like above)
    // I just decode the token
    // This is ok because we check the validity before reaching this route
    // NEVER USE jwt.decode() if you don't use jwt.veryify() first!
    const decoded = jwt.decode(req.query.token); // I now have the decoded token
    // find the user
    User.findById(decoded.user._id, function(err, user) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      const message = new Message({
        content: req.body.content,
        user: user
      });
      message.save(function(err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        // push the new message on the stack of messages
        user.messages.push(result);
        // then save it to the Database
        user.save();
        res.status(201).json({
          message: 'Saved message',
          obj: result
        });
      });
    });
});

router.patch('/:id', function(req, res, next) {
  const decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found',
        error: { message: 'Message not found' }
      });
    }
    // is message.user (id) not equal to our decoded user id
    // If they are not equal, a different user is trying to delete this message
    // then who originally created this message
    if (message.user != decoded.user._id) {
      // not creator id so return a 'not authenticated' error
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    message.content = req.body.content;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  const decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found',
        error: { message: 'Message not found' }
      });
    }
    if (message.user != decoded.user._id) {
      // not creator id so return a 'not authenticated' error
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    message.remove(function(err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Message Deleted',
        obj: result
      });
    });
  });
})

module.exports = router;
```

* IF `message.user` (id) not equal to our **decoded user id**
* If they are not equal, a different user is trying to delete this message
    - Generate an error with this `user doesn't match` info
* Restart server
* Log in as user A and create a new message
* Log out and create a new user and create a message as that user
* Try to edit user A's message and you should be given an error in the console
* Try to delete user A's message and you should also be given an error in the console
* We do see when editing that it looks like it is edited until we refresh the page and it reverts to the original unchanged message
    - We will need to fix this on the frontend

## Next
* Hide Edit and Delete if we can not edit and delete
* Output the real user name instead of `Dummy`
