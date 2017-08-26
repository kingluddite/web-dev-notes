# Routing in Production
![prod routing](https://i.imgur.com/Hp0gvdt.png)

## Set up Express Server
* Let it know that there are some routes it might not have a specific routeHandler for

`/index.js`

```js
// more code
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // main.js, main.css...
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  // client/build/static/js/main.3ce3315a.js
}
// more code
```

`app.use(express.static('client/build'));`

* If we get to this part of `index.js`, we have gone through all our custom routes and if we are in `production` then go inside `client/build` for our route information
* Once inside `client/build` try to see if there is some file inside there that matches up with the route that was requested
    - So if someone comes looking for `/client/build/static/js/main.js`
    - Go inside `client/build` and see if there is a file at `static/js/main.js`
        + If there is, go ahead and respond with that file

`/index.js`

```js
// more code
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // main.js, main.css...
  // client/build/static/js/main.3ce3315a.js
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// more code
```

* We added this:

```js
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
```

* This says if someone makes a request for a route that we don't understand, just serve it up the HTML document `index.html`
* If we don't know what this route is, we'll assume that the `React Router` side of our Application is responsible for this route
    - So we just kick the user over to our client side Application

## Valid Question
* If we have this thing where you don't understand the route give them the HTML file, how do we prevent Express from giving them an HTML file when really want to send them an asset like main.js?
    - Answer:
        + It's all about the order of operations
            * In our chunk of code above, Express first checks if there is some specific file that matches up with what that request is looking for
            * If there is, it will answer the request with this line:
                - `app.use(express.static('client/build'));`
            * If there's not, Express will continue on to this line:

```js
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
```

* You see the `*` wildcard character which is the absolute catch-all inside of our app
    - This code says:
        + If there is nothing inside our `authRoutes.js` file
        + And nothing inside our `billingRoutes.js` file
        + And there's no file inside of our `/client/build` directory that matches up with what this request is looking for
        + Then we've exhausted all possibilities, fine! Just serve the `index.html` and see if our client side has any matching routes

## Takeaway
* There are some routes that can be answered by the Express server
* Some that are looking for very specific files that exist inside of our `client/build` directory
* And then there are some that have to be answered by the `index.html` file because the assumption is `React Router` knows what to do with this route

## Next
* Making sure our client project is properly built when we deploy to production
