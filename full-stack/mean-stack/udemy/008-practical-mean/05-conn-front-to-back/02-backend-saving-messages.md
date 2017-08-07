# Backend - Saving Messages
* Create two new files inside `routes`
    - `/routes/messages.js`
    - `/routes/user.js`

## Messages
`routes/messages.js`

```js
const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
```

* Update our `app.js` to include our two new routes will be adding

`app.js`

```js
// more code
var appRoutes = require('./routes/app');
var messageRoutes = require('./routes/messages');
// more code
app.use('/message', messageRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
```

#### Order is important!
* The order of the routes I `.use()` is **important**
* If I put `/` routes first, then all routes would be handled with `/` and it would never get to `/message`

## Change to post route
`routes/messages.js`

```js
// more code
router.post('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
```

* We change it from `.get()` to `.post()` because we want to store messages in Database
    - I don't want to get them
    - I want to store them in my backend and that is what `post` is for
    - We use `/` but it really will be `/message` because I only get that route because of this:

`app.js`

```js
// more code
app.use('/message', messageRoutes);
app.use('/', appRoutes);
// more code
```

* But we don't want to render `index`, instead we want to save a message
* In our `message.js` model

```js
const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});
```

* We want to store `content` and `user` (we'll deal with user later)

`routes/message.js`

```js
// more code
router.post('/', function (req, res, next) {
    var message = new Message({
      content: req.body.content
    });
});

module.exports = router;
```

* I will use my Angular2 form to create the message and then when I submit it Express will use the bodyParser to make the `content` field value available on the `req.body` and I use the `name` attribute of the form with a value of `content`

`message-input.component.html`

```html
// more code
<div class="form-group">
      <label for="content">Content</label>
      <input
         // more code
          name="content"
         // more code
      />
    </div><!-- /.form-group -->
// more code
```

* Status code of `201` means everything is OK and your resource was created

`routes/messages.js`

```js
// more code
router.post('/', function (req, res, next) {
    var message = new Message({
      content: req.body.content
    });
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
    });
});

module.exports = router;
```

## Next
* How do we get from Angular route to this code we just wrote that will save our messages
