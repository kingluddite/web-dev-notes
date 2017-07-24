# Installing Express
* One of most popular packages on npm registry

## Make your project folder look like this
* Basic `package.json` file

`package.json`

```json
{
  "name": "nodejs-test-app",
  "version": "1.0.0",
  "description": "NodeJS test app",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

* Delete `node_modules` in your project
* Have an empty `app.js` file

## Install Express
* It's available on the npm registry
* It's just JavaScript code
* We will intall it as a dependency since it is just JavaScript code

`$ npm install express --save`

or

`$ npm i express -S`

* You will see `node_modules` and `express` and a bunch of other dependencies were added
* We can now use express!

## Take a peak under the express hood
`node_modules/express/index.js`

```js
'use strict';

module.exports = require('./lib/express');
```

* So we require a `lib` folder with all the `express` JavaScript code inside it
* It is exporting `createApplication`

`exports = module.exports = createApplication;`

* `createApplication()` is a function
* But it is not a function contructor, it actually returns a value `app`

```js
function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  app.init();
  return app;
}
```

* So I need to call this function
* And what it returns is a function

```
// more code
function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };
// more code
```

* Because functions are first class in JavaScript
* Functions are objects in JavaScript
* The creators of Express chose to add properties and methods directly to that function
    - It has an `init()` function
    - Has a `request` and `response` property
        + That are wrapping the standard request and response node objects
    - It adds on an application, router, query, static

## Back to our code
* We usually store express() inside a `app` variable

`app.js`

```js
const express = require('express');
const app = express();
```

* Now I can use `app` as it is a working **express** app
* express.js requires `application.js` and that has this code:

```js
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

* We did this before
* It calls the standard core node `http` object and the `createServer()` method
* So we'll use `app.listen(port)` and give it a port of `3000` as that is what is commonly used in their documentation

`app.js`

```js
const express = require('express');
const app = express();

app.listen(3000);
```

* Now I have an `http` server running
* Everything that **express** is doing is code you could have written yourself
    - It is just a lot of JavaScript code taking care of a lot of common things in a really great way (Propably the reason it is so popular)

## What happens when we deploy this to a server?
* I'm listening on port 3000 because I'm developing locally but that isn't the port I want to use in production
* I may not be able to choose the port I use in production
* We can use **Environment Variables**

## Environment Variables
* Global variables specific to the environment (_usually the Server_) our code is living in
* Different servers can have different variable settings, and we can access those values in code
* The whole purpose of this is so we don't have to change our code in order to change our setting (local, staging, production)
* We will do this a lot when we are deploying code dealing with node to servers

## Practical Example of Environmental Variables
```js
const express = require('express');
const app = express();

const port = process.env.PORT

app.listen(port);
```

* `process` is provided by node as a global object
* `process.env.WHATEVER_ENVIRONMENT_VARIABLE_I_WANT_TO_ACCESS`
    - It may be a standard one
    - It may be one that is added on as an extra on the server
    - Let's say we have a PORT variable available on the server and I'll be able to access it via `process.env`

## JavaScript trick to set default value
`const port = process.env.PORT || 3000;`

* This will set `port` equal to my environment PORT if it exists or it will set the port to 3000

## Deploying tips
* On many servers when you are deploying node, you can set up environment variables
    - So on Node you could set up a PORT variable (example: 80) and then in production that's what the app will listen to when it is in production because the environment variable exists `process.env.PORT`
    - This is very common to do this in node

## What about responding to the URL?
* We did this with `if` statement originally
* Express comes with a much better way to deal with this

## HTTP Method
* Specifies the type of action the request wishes to make
* GET, POST, DELETE and others
    - Also called **verbs**
    - This exists inside the HTTP request itself, it is just a piece of data
    - They don't do anything themselves
        + It is just text
        + Some data that is coming along for the ride as part of the HTTP request
        + But it is up to the server to do what is expected to be done with one of those HTTP methods

### Examples
* When you are just requesting data, like a download of a file or image, that is a GET request
* But when you send the contents of a form, you click the **submit** button on a form that is usually a POST that is being sent
* But we then want to respond properly to each of these HTTP methods
    - Express built in a way to map what you see as the **verb** in the HTTP request to a particular function you want to run when a request comes in
    - So on my express app I have access to the verbs that are the same name as their HTTP request verbs but they are lowercase
        + `app.get()` responds to http.GET()
        + And it will map to a particular URL

```js
app.get('/', function(req, res) {

});

app.post('/', function(req, res) {

});
```

* Both could run and they could respond different because one is a GET request and the other is responding to a form submit and POST
* So you could have the same URL but do something different because of the HTTP verb that is used

```js
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('<html><head></head><body><h1>Hello World</h1></body></html>')
});

app.listen(port);
```

* **note** I am not including a `content-type`
* The express app looks at what I'm sending and takes care of that for me the best it can
    - So right here **express** is saving us time

## Run it
`$ nodemon app.js`

### Visit `localhost:3000`
* You will see `Hello World`

### Another route pointing to JSON
```js
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('<html><head></head><body><h1>Hello World</h1></body></html>')
});

app.get('/api', function(req, res) {
  res.json({
    firstName: 'John',
    lastName: 'Doe'
  });
});

app.listen(port);
```

* Browse to `/json` and you'll see the JSON on the page

## Takeaway
* Express is saving me time
* It is taking care of little things that I wouldn't want to have to do all the time
