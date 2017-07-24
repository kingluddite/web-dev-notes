# Routing
* We just saw has express will match a URL and then run a function for us where we handle the request and the response
* But it does a lot more than that

## Learn More about Express at their website
* [Express Website Link](https://expressjs.com/)
* [Docs on Routing in Express](https://expressjs.com/en/guide/routing.html)

## Add new dynamic route
`app.js`

```js
// more code
app.get('/person/:id', function(req, res) {
  res.send(`<html><head></head><body><h1>Person: ${req.params.id}</h1></body></html>`)
});
// more code
```

* The colon `:` tells Express this value can be anything
* Run `$ nodemon app.js`

![person](https://i.imgur.com/MgtAtnI.png)

* View this URL `http://localhost:3000/person/john`
* Will output `Peson: john` in the browser
    - We hit the route and return as our HTTP response `req.params.id`
    - `req.params` will return the query string
    - `req.params.id` will return `id` which we designated in our route so `/person/john` will return `john` as the `id`
