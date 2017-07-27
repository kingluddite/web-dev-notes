# Understanding the Flow of a Request

## How does a request travel through our app
* You enter `localhost:3000` and then what happens?

1. `$npm start`

* This starts `node ./bin/www`
    - So we use NodeJS which we installed on our computer

![bin www](https://i.imgur.com/KeBCwnh.png)

`www`

```js
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('node-rest:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

* Holds normal JavaScript code
* Uses a couple of NodeJS tools
* Generally this is what happens
    - We set up a port for our application (3000)
    - We create our server using `createServer()` and as an argument we pass the `app`...... `createServer(app)`
    - This is where we get app from
        + We importeed it from the `app.js` file

![import app.js](https://i.imgur.com/0SzHF2o.png)

* We listen to the server and pass in the port

`var server = http.createServer(app);`

![listen to port](https://i.imgur.com/w09yYBD.png)

* server.listen(post)
    - Tells our NodeJS server to listen to any requests reaching our domain and this port
    - When we type `$ npm start` our server will keep running and listening

![server running](https://i.imgur.com/RXXGOKh.png)

## app.js
* Since we pass `app.js` to our NodeJS is must be important
* It is!
* `app.js` holds the code that is executed on EACH REQUEST reaching our server no matter which URL it is
    - http://localhost
    - http://localhost/user
    - http://localhost/users
    - http://localhost/ohwowthisisalongandreallyhardtoreadurl
* Inside `app.js` we set up our Express app
    - Express is a framework we are using that is built on top of NodeJS
        + It is NodeJS
        + It is JavaScript
        + But it also gives us some extra features

### Start the express app (app.js)
![start express app](https://i.imgur.com/FZT1mC3.png)

### We intialize our views

![initialize views](https://i.imgur.com/ShcjH13.png)

* This tells the server where our views (files we want to send back to the browser) live
    - It is in the `views` folder

### Our view engine `app.js`
`app.set('view engine', 'hbs');`

* This gives instructions on how we want to parse these files on the server
* We could send raw HTML files but usually in a server-side only application, you use a templating engine to dynamically inject content into your template
    - Like a username if a user logged in

## Middleware
`app.js`

```js
// more code
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// more code
```

* We want to extract the body of our request
* To extract any data from our request
* To parse any cookies
* And we set up the **static directory** of our project
    - It is set up to be the public folder and this is **important**
    - It says only this folder will be accessible from "outside" (aka anywhere)
        + All the other folders
            * routes, views, bins, assets are only accessible by the server
            * You can't read the `routes/app.js` from the Internet, it is not accessible
        + With this static command we let it be known that this public folder holds our files we want to be accessible from anywhere
            * It holds our client side JavaScript files and our styles
            * When you visit localhost:3000 it will run some view that looks as if it were placed in that public folder
            * This `public` folder is the one that is server our server application in the end

## Prevent CORS errors
Cross-origin resource sharing

`app.js`

```js
// more code
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
// more code
```

* CORS is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes and videos
* Which basically means, requests coming from a different origin than the server
    - You may have your Angular 2 app served from a different server than your
    - In our app we will server the angular 2 app from the same server as our NodeJS server side code runs on
    - If you split your servers on this project that will lead to problems if you don't have these CORS headers set up on your server because these servers allow such a set up
    - Otherwise it won't be allowed because it poses a potential security risk if other code tries to access your code on another server

## Routes
* This line is very important!

`app.use('/', appRoutes);`

* It forwards any request to the `appRoutes` variable and that variable `appRoutes` just imports the `/routes/app.js` file or the module exported in this file in this routes folder

## What happens to the request after it gets to the Routes
* The request shouldn't get past the `routes` part
* Because we should handle any requests reaching this website
* But if we try to access an undefined route, we then use the 404 part of `app.js` to catch any requests which are still there and did return
    - When this happens, normally you would show some kind of error page
        + We are not doing that
        + Instead we are always rendering our `views/index.js` file which is also the same file holding the angular 2 application
        + The reason we do this is we will set up our main routing in the Angular 2 app
            * So by default, most of our routes won't be found on the server
            * We only have the backend routes for angular 2 to connect behind the scenes on the server
            * All the **user related routes** are stored in the Angular 2 app
                - But by default each request sent to the server (whenever we reload the page) it will reach the server first and not Angular 2, so having the routes in the Angular 2 app is nice but won't do the trick except for this setup where I always where I always send back to the angular 2 app where we have a setup where we can't get 404 on the server, we would have to handle that on the front end
                - Our setup makes sure we always render the angular 2 app which is essential since we handle our routing with our angular 2 app

## `routes/app.js`
* All paths having `/` at beginning will get forwarded to this file

`app.js`

```js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
```

* We just have one route `/`
* We use the `res` (response object) that Express JS gives us
* Express passes `res` in the callback function which we need to set up on any middleware
* We call the render method on the response object `res.render()` and we pass our template
    - This tells Express JS, create a new response and render a view
    - And that points to `index.hbs` which holds our Angular 2 application

### All that happens and leads to this:
![in the browser](https://i.imgur.com/RYKaNTp.png)

* Anytime we visit `localhost:3000` that request will return this response (and do all that other stuff in the process)




