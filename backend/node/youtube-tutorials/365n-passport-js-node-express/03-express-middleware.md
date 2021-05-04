# Express Middleware
* In order for use to implement PPJS Local Strategy (which utilizes Express Session)
    - We need to understand middleware
    - Both PPJS and Express are both middlewares

## How does this middleware work?
* And how does the request, response and next (or callback object), and the error object work in an Express app?

`app.js`

* The most basic express server

```
const express = require('express');

const app = express();

app.listen(3000);
```

## Our first route
```
const express = require('express');

const app = express();

// routes
app.get('/', (req, res, next) => {
  res.send('<h1>Hello World</h1>');
});

app.listen(3000);
```

* View in browser to see `Hello World`

`http://localhost:3000/`

## Investigating our route
```
app.get('/', (req, res, next) => {
  res.send('<h1>Hello World</h1>');
});
```

* We are passing in two arguments
    - route string
    - callback function

## Let's make our callback function more clear
```
const express = require('express');

const app = express();

function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
  requestObject.send('<h1>Hello World</h1>');
}
// routes
app.get('/', standardExpressCallback);

app.listen(3000);
```

## We can call other middleware like this:
* Express allows you to pass in as many arguments as you want

```
const express = require('express');

const app = express();

function middlewareOne(req, res, next) {
  console.log(' I am middleware One');
}
function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
  console.log('I am the standard Express function');
  requestObject.send('<h1>Hello World</h1>');
}
// routes
app.get('/', middlewareOne, standardExpressCallback);

app.listen(3000);
```

* We have a problem with our middleware
    - It runs middlewareOne but nothing after
        + Why?
            * Because we never called the `next` callback
                - This tells us to run the next middleware

# Woops we have one more mistake
* We tried to use `requestObject.send()` instead of `responseObject.send()`

```
// MORE CODE

function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
  console.log('I am the standard Express function');
  responseObject.send('<h1>Hello World</h1>');
}

// MORE CODE
```

* Now if we run this code:

```
const express = require('express');

const app = express();

function middlewareOne(req, res, next) {
  console.log(' I am middleware One');
  next();
}
function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
  console.log('I am the standard Express function');
  responseObject.send('<h1>Hello World</h1>');
}
// routes
app.get('/', middlewareOne, standardExpressCallback);

app.listen(3000);
```

* Our code runs and we get (the order of how this runs is important):
    - I am middleware One (We first run `middlewareOne`)
    - I am the standard Express function (And then we run `standardExpressCallback`)

## **note** Above is the basics of how middleware works
* `next()` is a parameter that gets passed in by default by Express
* And when we call `next()` it will go to the "next" middleware (the last one is the standard express callback middleware)
* If we don't call `next()` it will never get to the next middleware and just "hang" and we'll never return any data

## route specific middleware vs global middleware
* `app.use()` Will run middleware
    - This is global middleware
* **note** That when you run the code below you might expect since `app.use(middlewareOne` is not in a route it will run as soon as your restart the server
    - But no, it only runs when you hit the route `/`

```
const express = require('express');

const app = express();

function middlewareOne(req, res, next) {
  console.log('I am middleware One');
  next();
}

function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
  console.log('I am the standard Express function');
  responseObject.send('<h1>Hello World</h1>');
}

app.use(middlewareOne);

// routes
app.get('/', middlewareOne, standardExpressCallback);

app.listen(3000);
```

* Server logs look like:

```
I am middleware One
I am middleware One
I am the standard Express function
```

## What just happened here?
1. `app.use(middlewareOne)` is the first middleware we run IN ALL OF OUR ROUTES
    - It is not just specific to `/` route
    - It will run with any route endpoint we hit (within our app)
2. Then it runs the middleware in our route
3. Then it runs the `standardExpressCallback` middleware

## The order matters of middleware
### What if we switch up the order
* And we'll also add more middleware

##
```
const express = require('express');

const app = express();

function middlewareOne(req, res, next) {
  console.log('I am middleware One');
  next();
}

// we add one more middleware
function middlewareTwo(req, res, next) {
  console.log('I am middleware Two');
  next();
}

app.use(middlewareOne);
app.use(middlewareTwo); // we call our middleware globally

// routes
// We revert to the standard form we are used to seeing
// for the standard Express callback
app.get('/', (req, res, next) => {
  console.log('I am the standard Express function');
  res.send('<h1>Hello World</h1>');
});

app.listen(3000);
```

* Output in terminal

```
I am middleware One
I am middleware Two
I am the standard Express function
```

## You will have 20-30 different middleware
* You need to understand the order you put them in

```
const express = require('express');

const app = express();

function middlewareOne(req, res, next) {
  console.log('I am middleware One');
  next();
}

function middlewareTwo(req, res, next) {
  console.log('I am middleware Two');
  next();
}

function middlewareThree(req, res, next) {
  console.log('I am middleware Three');
  next();
}

app.use(middlewareOne);
app.use(middlewareTwo);

// routes
app.get('/', middlewareThree, (req, res, next) => {
  console.log('I am the standard Express function');
  res.send('<h1>Hello World</h1>');
});

app.listen(3000);
```

* Output

```
I am middleware One
I am middleware Two
I am middleware Three
I am the standard Express function
```

## Error Handling
* Error Handling in Express is just another middleware
  - But it is a special type of middleware

### How do we define an error handling middleware?
* Define a function with a fourth parameter

```
function errorHandler(err, req, res, next) {
  //
}
```

* The above errorHandler will be populated with and `err` if it exists
* We want to do something with more "friendliness" than a default error

```
function errorHandler(err, req, res, next) {
  if (err) {
    res.send(`<h1>There was an error, please try again</h1>`);
  }
}
```

## Let's first see what happens with errors without an errorHandler
* We comment out our errorHandler
* We create and error object and pass it as an argument to our next() method

```
// MORE CODE

function middlewareThree(req, res, next) {
  console.log('I am middleware Three');

  const errObj = new Error('I am an error');

  next(errObj);
}

// function errorHandler(err, req, res, next) {
//   if (err) {
//     res.send(`<h1>There was an error, please try again</h1>`);
//   }
// }

app.use(middlewareOne);
app.use(middlewareTwo);

// MORE CODE
```

* Now when you run this you will get `Error: I am an error` with a full stacktrack
  - You do not want this full stack trace
  - The end users will see this and you don't want them to see this
  - You as a developer want to handle errors in a more graceful way
  - Also, if you look at our terminal we've crashed our application
    + So if this was our real app, our app could crash and it could be down for hours without us even knowing
    + So it is essential that we handle our errors gracefully in our app without crashing the Express app

## Now we'll use our error handler
* Normally it will be more complex than this
  - **important** We need to call `middlewareThree` because that has an error and next so then we call our error handler which will gracefully give us our h1 error message to the end users (no stack trace)

```
const express = require('express');

const app = express();

function middlewareOne(req, res, next) {
  console.log('I am middleware One');
  next();
}

function middlewareTwo(req, res, next) {
  console.log('I am middleware Two');
  next();
}

function middlewareThree(req, res, next) {
  console.log('I am middleware Three');

  const errObj = new Error('I am an error');

  next(errObj);
}

function errorHandler(err, req, res, next) {
  console.log('yo');
  if (err) {
    res.send(`<h1>There was an error, please try again</h1>`);
  }
}

app.use(middlewareThree);
// app.use(middlewareTwo);
app.use(errorHandler);

// routes
app.get('/', (req, res, next) => {
  console.log('I am the standard Express function');
  res.send('<h1>Hello World</h1>');
});

app.listen(3000);
```

## What happens if there is no error?
- If There was no error fired, we never execute our errorHandler and just got to our home route with the standard Express callback function

```
// MORE CODE

function middlewareThree(req, res, next) {
  console.log('I am middleware Three');

  // const errObj = new Error('I am an error');
  //
  // next(errObj);
  next();
}

function errorHandler(err, req, res, next) {
  console.log('yo');
  if (err) {
    res.send(`<h1>There was an error, please try again</h1>`);
  }
}

app.use(middlewareThree);
// app.use(middlewareTwo);
app.use(errorHandler);

// routes
app.get('/', (req, res, next) => {
  console.log('I am the standard Express function');
  res.send('<h1>Hello World</h1>');
});

app.listen(3000);

// MORE CODE
```

## But order matters!
* So if you ordered you error handler like this:
  - You get the dreaded stacktrace error

```
// MORE CODE

function errorHandler(err, req, res, next) {
  console.log('yo');
  if (err) {
    res.send(`<h1>There was an error, please try again</h1>`);
  }
}

app.use(errorHandler);
app.use(middlewareThree);
// app.use(middlewareTwo);

// routes
app.get('/', (req, res, next) => {
  console.log('I am the standard Express function');
  res.send('<h1>Hello World</h1>');
});

app.listen(3000);

// MORE CODE
```

## What did we learn?
* Make sure you know the order of your middleware
* To prevent this stacktrace error from happening you need to put your errorHandler at the very end of your app

```
// MORE CODE
function middlewareThree(req, res, next) {
  console.log('I am middleware Three');

  const errObj = new Error('I am an error');

  next(errObj);
}

function errorHandler(err, req, res, next) {
  console.log('yo');
  if (err) {
    res.send(`<h1>There was an error, please try again</h1>`);
  }
}

app.use(middlewareThree);
// app.use(middlewareTwo);

// routes
app.get('/', (req, res, next) => {
  console.log('I am the standard Express function');
  res.send('<h1>Hello World</h1>');
});

app.use(errorHandler);

app.listen(3000);
```

* After all of our routes and all of our middleware that is where we put our error handler
  - The reason we put it at the end if there is an error in any of our middlewares or any of our routes (which are basically just middlewares), the error will be passed directly to the final error handler
  - In our case we have the error happening in `middlewareThree`
  - Then in middlewareThree we call `next(errObj)`
  - Express will pick up on this and say "Oh, there is an error"
  - It will skip the home route and go straight to the error handler and handle the error appropriately and gracefully

### Most of the time you will send back a JSON object with the error
* Then our frontend app will handle the error on the front end rather than the server handling it

```
// MORE CODE
function errorHandler(err, req, res, next) {
  res.json({ err });
}

app.use(middlewareThree);
// app.use(middlewareTwo);

// routes
app.get('/', (req, res, next) => {
  console.log('I am the standard Express function');
  res.send('<h1>Hello World</h1>');
});

app.use(errorHandler);

app.listen(3000);
```

## We can mutate (append) different properties/object/functions to the parameters we are passing through each of the middlewares
* Since Express as a framework passes the request and response object through each of the middlewares, it will actually be available to us through later middlewares

```
// MORE CODE

function middlewareOne(req, res, next) {
  // create custom property and attack it
  // to the request object
  req.customProperty = 100;
  next();
}

// MORE CODE
```

* This means we can use that custom property in other middlewares

```
// MORE CODE

function middlewareOne(req, res, next) {
  // create custom property and attack it
  // to the request object
  req.customProperty = 100;
  next();
}

function middlewareTwo(req, res, next) {
  console.log(`The custom property value is ${req.customProperty}`);
  next();
}

// MORE CODE
```

* And the terminal will show you `The custom property value is 100`
* We can reassign the value in other middleware and show it in our home route

```
// MORE CODE
function middlewareOne(req, res, next) {
  // create custom property and attack it
  // to the request object
  req.customProperty = 100;
  next();
}

function middlewareTwo(req, res, next) {
  console.log(`The custom property value is ${req.customProperty}`);
  req.customProperty = 1000;
  next();
}

function errorHandler(err, req, res, next) {
  res.json({ err });
}

app.use(middlewareOne);
app.use(middlewareTwo);

// routes
app.get('/', (req, res, next) => {
  res.send(`The value of the custom property is now ${req.customProperty}`);
});

app.use(errorHandler);

app.listen(3000);
```

* And you'll see in browser `The value of the custom property is now 1000`

## Why is this important?
* It helps you understand how Express we use on a daily basis are actually working
* This is exactly how PPJS (which is an Express middleware) is going to keep track of users whether they are authenticated or not
  - The PPJS is going to take that `req` object and it will append different custom properties to it
  - **remember** The `req` session object is where the session is stored

## Misc
* You could check if a user has admin rights
  - You can use a middleware to do this
  - Middleware could look up the user in the Database, check the admin property, if the admin property is true then we pass it to the `next()` middleware
    + If the admin property is false then we might return a server status of 401 or 403 (unauthorized HTTP statuses)

## Summary
* We are no ready to understand the Express session library
* When you are implementing the PPJS Local Strategy it uses Express Session under the hook
  - This can be extremely confusing
  - The PPJS documentation doesn't make it clear that this is happening

## Next
* Understand how Express Session middleware is working behind the scenes (independent of PPJS middleware itself)
* Understand how the Express Session is being looped into to our PPJS authentication middleware
  - Understanding Express Session middleware is not only going to help you implement a PPJS Local Strategy but it will also help with other purpuses in your web app
* State management
  - Usually handled on the front end within front end frameworks (Vue.js, React and Angular)
  - But you can also handle state (or application state) on the back end in the form of a session
    + That is what the Express Session Library aims to do
