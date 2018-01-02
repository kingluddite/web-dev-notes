# Event Acknowledgments
## newMessage Event
* Event emitted by server
* Listen to by the client
* Sends from, text, createdAt data to client
    - All are required to render message to screen

## createMessage Event
![diagram for createMessage](https://i.imgur.com/r6PSSL5.png)

* We will update this
* This event gets emitted by the client
* And the event is listend to by the server
* We are sending `from` and `text` data from the client to the server
    - There is a problem here
    - The data flows in one direction
    - The data comes from a form inside the browser
    - It then gets sent over to the server
    - Then the server is kind of "stuck"
        + If the data is valid... no problem
        + invalid data... problem! And the server has no way to let the client know that something went terribly wrong
        + We need the option to acknowledge we received a request and have the option to send some data back
        + So we will add an **acknowledgment** for createMessage
        + If all good we'll acknowledge it and sending back no error messages
        + If there are problems we'll acknowledge it and send back the errors (This will give the client the info it needs to send a valid request)
        + The data flow will look like this

## Time to implement it
* Adding acknowledgments is fairly straightforward
* **note** acknowledgments work in both directions - client to server and server to client

`index.js`

```js
const socket = io(); // opens a connection

// MORE CODE
 
sosocket.emit('createMessage', {
  from: 'Sam',
  text: 'cheers!',
});
```

* We'll get this message on terminal

`createMessage { from: 'Sam', text: 'cheers!' }`

And this in client

`newMessage {from: "Sam", text: "cheers!", createdAt: 1514909807823}`

* Goal - send message from server back to client that we got the data
    - To do this we need to make a change to both the listener and the emitter
    - If you only change one, it won't work as expected

`index.js`

```js
// MORE CODE
socket.emit(
  'createMessage',
  {
    from: 'Sam',
    text: 'cheers!',
  },
  () => {
    console.log('Got it!');
  }
);
```

`server.js`

```
// MORE CODE
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });
});

server.listen(port, () => {
  console.log(`App started on port ${port}. VROOOOOOM!`);
});
```

### Test out in browser
* Refresh and you'll see `Got it!`

#### Send data from server to client
`server.js`

```js
// MORE CODE
socket.on('createMessage', (message, callback) => {
  console.log('createMessage', message);
  io.emit('newMessage', generateMessage(message.from, message.text));
  callback('This is from the server');
});
// MORE CODE
```

`index.js`

```js
socket.emit(
  'createMessage',
  {
    from: 'Sam',
    text: 'cheers!',
  },
  data => {
    console.log('Got it!', data);
  }
);
```

* We add data (string) to the callback on the server and pass that into our client function and output it on the client's callback
* View the chrome console

`> Got it! This is from the server`

### Summary
* Acknowledgments are important
* If I send an email I need to know if it did or did not send successfully
    - If it didn't I need to know why

## Next - Adding a form field
