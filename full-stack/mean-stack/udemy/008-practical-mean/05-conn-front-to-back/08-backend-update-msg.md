# Backend Updating Messages
* Saving messages on the backend is most complicated

## What is a `patch` route
* HTTP method people use to change existing data
    - `put` would be alternative if you want to override the existing data
* `patch` could have some data in the **request** and some data in the **body**

`routes/messages.js`

```js
// more code

router.patch('/:id', function(req, res, next) {
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

module.exports = router;
```

## Next - Hook up the frontend to the backend
