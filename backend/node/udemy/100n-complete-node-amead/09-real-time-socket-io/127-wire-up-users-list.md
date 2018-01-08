# Wire Up User's List
* We need to do something when a user joins (connect) and when a user leaves (disconnect)
* We need to keep our user list up to date
* Every time we update it we want to give a fresh copy of the list to **the client**
    - So the server will need to emit and event to the client
    - The client will listen for that event and it will update the markup

## Start up app
`$ nodemon server/server.js`

* Enter name and room

`chat.js`

```
// // MORE CODE
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  console.log('Users list', user);
});

socket.on('newMessage', message => {
// MORE CODE
```

* Import User class

`server.js`

```js
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
// MORE CODE
```

* Create a new instance of Users

`server.js`

```js
// MORE CODE
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));
// MORE CODE
```


`server.js`

```
// MORE CODE
socket.on('join', (params, callback) => {
  if (!isRealString(params.name) || !isRealString(params.room)) {
    return callback('Name and room name are required');
  }

  socket.join(params.room);
  // after user joins we remove them from any
  // previous rooms
  users.removeUser(socket.id);
  users.addUser(socket.io, params.name, params.room);

  io.to(params.room).emit('updateUserList', users.getUserList(params.room));
  // MORE CODE
```
