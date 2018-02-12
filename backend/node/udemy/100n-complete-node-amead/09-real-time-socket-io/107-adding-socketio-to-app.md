# Adding socket.io to an App
* We'll configure our server to allow for incoming websocket connections
    - This means the server will be able to accept connections
    - We'll setup the client to make the connection
    - With that persistant connection we can send data back and forth
    - That is the beauty of websockets
        + You can send the data in either direction

## The socketio Library
* This library makes it dead simple to setu socket.io and to create a frontend that communicates with the server
* socketio has a backend and frontend library
    - We will use both

### Install socket.io
`$ yarn add socket.io`

`server.js`

```js
const path = require('path');
const express = require('express');
const socketIO = require('socket.io'); // add this line
```

* We now need to integrate socket.io into our existing web server
* As it stands right now, we use express to make our web server
    - We create a new express app
    - We configure our middleware
    - And we call app.listen()
* Behind the scenes `node` is using a built-in module called `http` to create this server
    + We're going to need to use 'http' ourselves
    + And configure Express to work with 'http'
    + Then, and only then, can we add socket.io support

### Adding http
* When you call `app.listen()` node calls **http.createServer()** in the background

```js
const path = require('path');
const http = require('http'); // add this line
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app); // add this line

app.use(express.static(publicPath));

server.listen(port, () => { // update this line
  console.log(`App started on port ${port}. VROOOOOOM!`);
});
```

* We now are replacing app with server
* We don't have access to socket.io yet
* `$ nodemon server/server.js`
* View localhost:3000 in browser and it works still

## Now configure server to also use socket.io
`server.js`

```js
// MORE CODE
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
// MORE CODE
```

* Now we have `io` and that is our web sockets server
* And on `io` we can do whatever we want with regards to emitting or listening to events
* This is how we'll communicate between the server and the client

## We are ready to accept new connections
* Our server is ready
* But right now, we don't have any connections to accept
* When we load `index.html` we're not doing anything
    - We're not connecting to the server
    - So we need to add some client side JavaScript to initiate that connection process

### New stuff we have access to
* After configuring `io` we have access to a route that accepts incoming connections
    - This means we can accept web socket connections
* We also have access to a JavaScript library that makes it easy to work with socket.io on the client
* Here is the route
    `http://localhost:3000/socket.io/socket.io.js`
* You will see the JavaScript
    - This is all the JavaScript we need on the client to make the connection to the server and to transfer data
    - either server to client or client to server

## Add to index.html
`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Node Chat App</title>
</head>
<body>
  <p>The Chat App</p>  
  <script src="/socket.io/socket.io.js"></script>
</body>
</html>
```

* Now our browser has access to socket.io methods

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Node Chat App</title>
</head>
<body>
  <p>The Chat App</p>  
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io(); // opens a connection
  </script>
</body>
</html>
```

### Chrome dev tool
* Open Network tab
    - Keeps track of all requests made by your web page
    - No filter on
    - Refresh page
    - You will see 5 requests
    - At top is first request made, bottom is last request made

### io.on
* Let's you register an event listener
* io.connection()
    - Let's you listen for a new connection and let's you do something when that connection comes in

```js
// MORE CODE
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');
});
// MORE CODE
```

* Look at terminal and you'll see `New user connected`
* Web sockets are a **persistent technology**
* Shut down the server with `ctrl + c`
* You will see red failed because the client is still trying to connect to the server but the server is not up
* Start server again and the red fails get replaced with connections

## Connection event also works on client
```html
<!-- MORE CODE -->
<body>
  <p>The Chat App</p>  
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io(); // opens a connection

    socket.on('connect', () => {
      console.log('Connected to server');
    });
  </script>
</body>
</html>
```

* Open new tab
* View chrome dev tool Console tab
* You'll see `Connected to server`
* Now both the client and server are connected
* We haven't created custom events but we have used built-in events

## Disconnect event
* Let's you do something on client and server when connection drops

```
  <script>
    const socket = io(); // opens a connection

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  </script>
</body>
</html>
```

* Shut down server and in client console you'll see `Disconnected from server`

## Challenge
* Use disconnect from client on the server

### Solution
```js
// MORE CODE
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`App started on port ${port}. VROOOOOOM!`);
});
```

* Start server
* Close browser tab and you'll see `Client disconnected` in terminal

## Git
* `$ git commit -am 'Add connect and disconnect event handlers'`
