# socket.io Rooms
* We can emit to everybody or just to people in specific rooms

`server.js`

```js
// MORE CODE
socket.on('join', (params, callback) => {
  if (!isRealString(params.name) || !isRealString(params.room)) {
    callback('Name and room name are required');
  }

  socket.join(params.room);  // add this line

  callback();
});
// MORE CODE
```

* That's it!
* We now have a special place to send messages
* `params.room` needs to be a string
    - leave a room with `socket.leave('room name here')`

### Review
* **io.emit()** - emits to every user
    - emit an event to every single person connected to a room
    - `io.to('The Office Fans').emit()`
* **socket.broadcast.emit()**- sends a message to everyone connected to the socket server (except for the current user)
    - send an event to ever single person except for the current user
    - `socket.broadcast.to('The Office Fans').emit()`
* **socket.emit()**- emits to one specific user

## Move some code
```js
socket.emit(
  'newMessage',
  generateMessage('Admin', 'Welcome to the chat app')
);

socket.broadcast.emit(
  'newMessage',
  generateMessage('Admin', 'New User Joined')
);
```

* We won't tell someone they joined a room until they actually joined the room
* We won't tell a user they have joined a room until the call has actually gone through

```js
// MORE CODE
socket.on('join', (params, callback) => {
  if (!isRealString(params.name) || !isRealString(params.room)) {
    callback('Name and room name are required');
  }

  socket.join(params.room);

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app')
  );

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New User Joined')
  );
  callback();
});
// MORE CODE
```

* Update broadcast to just one room and notify who joined using template string

```js
  socket.broadcast
    .to(params.room)
    .emit(
      'newMessage',
      generateMessage('Admin', `${params.name} has joined.`)
    );
  callback();
});
```

## Take it for a test drive
* Open app in tab #1
    - Enter `User One` and room `A`
* Open app in tab #2
    - Enter `User Two` and room `B`

**note** Both rooms are independent

* Open app in tab #3
    - Enter `User Three` and room `A`
    - You will see in tab #1 that **User Three** has joined
