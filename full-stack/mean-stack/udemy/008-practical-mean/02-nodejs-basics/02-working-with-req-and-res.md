# Working with Requests and Responses
* req and res
* How we adjust server-side code

`routes/app.js`

```js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
```

* This uses the ExpressJS router
* On these routes we can use the HTTP verbs as methods on these routes

`router.get()`

* **callback** sends the req (request that was sent), the res (response), which is being built by Express JS, and the `next()` function which you can execute to tell the `request` to travel on
* Why are we not calling it like this:

```js
// more code
router.get('/', function (req, res, next) {
    res.render('index');
    next();
});
// more code
```

* We could do that but we don't want the request to continue it's journey
* We just send a response and we're done
* If we did include `next()` it would take us to the next code inside `app.js`

`app.js`

```js
// more code
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});
// more code
```

* And that would trigger another `response` which is never good
* We do use `next()` in our CORS code because we do want to continue to the next middleware and all that CORS code does is set the header and it doesn't send a response, so I do want to forward move the request (continue with it), I only wanted to adjust the response but not send it yet

### But how can we add another server-side route?
* You can add Handlebars syntax to your editor

```js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/message', function (req, res, next) {
    res.render('node', { message: 'Hello' });
});

module.exports = router;
```

* And add our template

`/views/node.hbs`

```
<h1>A NodeJS View</h1>
{{ message }}
```

* **important** Restart the server
* Stop server with `ctrl` + `c`
* Start server and browse to `localhost:3000/message`

`$ node start`

* Why is bootstrap gone?
    - In node.hbs we don't import any styling
    - This is how we render a different view with NodeJS only
    - But you should be aware we can set up multiple server side routes
    - And you should know what the `render()` method actually does

