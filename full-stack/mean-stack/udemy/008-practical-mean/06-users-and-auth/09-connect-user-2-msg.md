# Connect Users to messages
* A user may have multiple messages
* In `models/user.js`

```
messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
```

* Also each message has a user:

`models/message.js`

```js
// more code
const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});
// more code
```

## Remove all messages in Database
* Log into `MongoDB`
* `$ mongo`
* `> use node-angular`
* `> db.messages.remove({})`

Now all messages have been removed from the Database

* We did this because those messages don't have a user mapped to them
* From now on we'll only create users where the mapping exists

## Add user id to message
* We stored our user in the payload of the token

`user.js`

```js
const token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
```

* NEVER USE `jwt.decode()` if you don't use `jwt.veryify()` first!

`messages.js`

```js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./../models/user'); // add this line
const Message = require('../models/message');

// more code
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
// more code
```

* Do we need to update any other routes?
    - router.patch('/:id')
        + Nope. I don't need to update anything about this relation
        + This is the update message route
        + The message changed, the user relationship didn't change

## Deleting messages
* If I delete a message I need to remove it from the array of messages the user has
    - We don't want to leave the user id in the array of messages if the message was deleted
* We could fetch the user and delete the message from the array of messages but Mongoose gives us another nice way of doing this
    - We will create Mongoose middleware in the Message model `message.js`
    - I will use `schema.post('whichaction', callback)` which means do this after a certain method happened

`message.js`

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user'); // add this line

const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});

// whenever a message is deleted
//  the message on the user, who created this message is updated so that I don't have any redundant connections in my Database 
schema.post('remove', function(message) {
  // even though we removed the message this will still pass us a reference to the deleted messaged
  User.findById(message.user, function(err, user) {
    user.messages.pull(message);
    user.save();
  });
});

module.exports = mongoose.model('Message', schema);
```

* Restart server

## Next - Sending request with token
* Login
* Create a new message
* You should see the Message object in the console

## Mongo
`$ db.messages.find()`

* You should see the user field has been populated with an ID of a user in your users collection

![message with user id](https://i.imgur.com/gkUmuTr.png)

* User with that user id and array of messages with that message

![user id and array of messages](https://i.imgur.com/nNcdezR.png)

* Our mapping is working!
* If I log out I can not create messages

## Deleting messages
* If logged out, you can not delete messages
* But on the front end the message will be removed but it really isn't
    - Refresh the browser and it will come back
    - We need to add a check on the frontend to see if we are logged in and if not, user can not delete messages
* Log in and delete message
    - It is deleted this time for real
    - And if you use mongo to `> db.users.find()` you should see that the message was removed from the messages array inside the user document
    - It works!

## We should only see the options on the frontend which we actually have
* If I am logged out, I shouldn't see the edit and delete buttons
    - Because I can't use them anyway
* Replace `Dummy` with actual user name
* But If I create a new user and log in, I can still delete messages of other users, this is bad! I need to fix this

## Next
* Making only users who created a resources is able to create or edit or delete it
