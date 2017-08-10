# Passing User Object with Messages
* Conditionally show edit/delete buttons
* Show right user for the message

## Fetching messages on backend on `get` route
* I don't want to just pass the message but also the complete user object
    - Because:
        + I need the user id
        + And I need the user first name
* Currently, I am not getting this additional info I need
    - I do get the user id
        + Because it is stored in the message model in the user field
        + But I don't get the whole user object

## exec()
* I used `exec()` because I want to chain multiple methods

### .populate()
* Is a mongoose method which enables me to expand the data I am retrieving
* By default it will only give me the `message` object
* But now I can tell it "hey, there is this reference to the user model"
    - And it is aware of this reference because in the model because we set it up with the `ref` key (_ref: 'User'_)
    - This is not just a string, it really is a connection to another object in my Database
    - So `.populate()` will expand to use the entire user object inside the message object

`message.js`

```js
// more code
user: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
// more code
```

`messages.js`

```js
// more code

router.get('/', function(req, res, next) {
  Message.find()
    .populate('user', 'firstName')
    .exec(function(err, messages) {
// more code
  });
});
// more code
```

* I now can use this new information on the frontend




