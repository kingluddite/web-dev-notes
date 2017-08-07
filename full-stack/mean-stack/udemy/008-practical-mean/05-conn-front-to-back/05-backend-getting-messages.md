# Backend Getting Messages
`messages.js`

```
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

router.post('/', function (req, res, next) {
// more code
}
// more code
```

* We use a get verb because we are getting data
* We use 200 status to say the get was successful

## Next - Connect Angular2 frontend to this function
* We'll access this route and then work with the data we get back
