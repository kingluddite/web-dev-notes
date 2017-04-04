# Redirecting Users to Long Links
* We need to take the `token` out of the URL
* Find the link
* And send the user on their way

Currently, when we intercept a request we are just logging it with console.log()

## Add a redirect
Since it is fairly complex we will define our redirect in a separate helper function

`server/main.js`

```
function onRoute() {
  
}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});
```

* The `onRoute()` method will be executed whenever a user visits our app with a `token` in the URL

### Here is what we want to accomplish
`server/main.js`

```
// Executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute() {
   // Take the token out of the URL and try to find a
   // matching link in the Links collections

   // If we find a link object, redirect the user to the
   // long URL

   // If we don't find a link object, send the user
   // to our normal React app
}
```

#### Passing arguments to `onRoute()`
`function onRoute(req, res, next) { } `

* `req` - An object that contains data about the incoming request
* `res` - An object that describes the `response` that we are going to send the client
    - Could be HTML, or some content we want to send back to the user
* `next` - A little bit more tricky. We wrote a Middleware and there can be many Middleware in any given application. `next` is a reference to the next Middleware that we need to run
    - In other words if we don't want this Middleware to stop our request we can call `next` to execute the next Middleware in our stack

We saw from our terminal (console.log(req)) we could access the token with `req.params.token`

`const link = Links.findOne({ token: req.params.token });`

Go through the `Links` collection and find the first record (`findOne()`) that matches where `token` equals the token in the URL (`req.params.token`) and assign it to the variable `link`

We can't assume that when we are searching for a token that we will find one so we need to write logic in our code that deals with if we found a link and if we didn't find a link

```
if (link) {
    // cool we found one, let's deal with it
} else {
    // Didn't find it. Yuck. Let's deal with that bad news
}
```

### Handle the case where we found a link object

```
res.writeHead(307, { 'Location': link.url });
res.end();
```

* We set the status code of response `res` to `307`
* `307` is a redirect request, whoever made this request, you need to figure out this other URL to figure out where to go and we provide that url as `link.url`
    - **remember** We saved the long form of the URL as the `url` property on `link` inside our `Links` collection
* `res.end()` - This just means we are done with our response, go now and send our `res` (response) back to the user

### Handle the case where we didn't find a link object
* Could be lots of reasons
    - They typed in the link wrong
    - The link was deleted
* If the link is not found we want to send the user onto the React application and this is done by using the `next` function we previously talked about
    - Calling `next` means `Hey, I don't care about this request, let someone else deal with it`
    - `next()` - Calling next like this will hand off the `req` to the next Middleware in line and eventually it will fall all the way through to our React app

### final `onRoute()`
`server/main.js`

```
// Executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
   // Take the token out of the URL and try to find a
   // matching link in the Links collections
   const link = Links.findOne({ token: req.params.token });

   if (link) {
     // If we find a link object, redirect the user to the
     // long URL
     res.writeHead(307, { 'Location': link.url });
     res.end();
   } else {
     // If we don't find a link object, send the user
     // to our normal React app
     next();
   }

}
```

### Test in browser
Browse to `localhost:3000`
Copy the link beside `http://www.example.com` (mine was `http://localhost:3000/f9a4i`) - Your token will be different because remember that it was randomly created. Paste the short URL in the browser address bar and hit return and you should magically be taken to `http://www.example.com`

And you will be magically taken to the long URL!

## Our app now successfully redirects

### Next Challenge
Just increment the clicks when the link is clicked
