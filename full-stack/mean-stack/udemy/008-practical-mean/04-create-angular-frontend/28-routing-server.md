# Routing and the Server
* When we refresh the page we don't get a 404?
* We only have 1 route and that is `/`
* So somehow when we refresh and Angular2 routes take over and take us to `/messages` we never get the 404. How is this happening?

## Your server should not return 404 errors
* We fix this in `app.js`

`app.js`

```js
// more code
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});
// more code
```

* So after our server routes points to `/` but then after that we see we catch all 404 errors and send them also to the `index` template
* That is the template that has all our Angular2 code
* So it knows how to handle the 404 error pages
* If we did throw a 404 error on our node server we would get that befor Angular2 has a chance to take over
