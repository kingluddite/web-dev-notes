# Emmitting and Listening to Custom Events
## Example - Email app

![sample socket.io app](https://i.imgur.com/IwHagCT.png)

* Left is a server starts up a socket.io server
* Right is our app showing list of all current emails
* We have a Custom event ---> new email event
* Will get emitted from the server when an email comes in from someone else
* Client is able to listen for new email event
    - And it can rerender the list of emails in the browser
        + using jquery/react/ember... whatever library show new email to user
* On top of sending event we can send data
    - You can send whatever info you want from client to server or server to client
    - maybe who email was from, text of email and when it was `createdAt`
    - This is data flowing from client to server
        + We could not do this with HTTP requests
        + But we can accomplish using socket.io
* Another event `createEmail` will flow from client to server
    - This data we are sending with our `createEmail` event will be different
        + Who are we sending email to
        + The test
        + scheduleTimestamp

## Slight improvement on site org
* Move js from `index.html`
* Can use arrow functions as they are accepted in modern browsers

`/public/js/index.js`

```js
const socket = io(); // opens a connection

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

`/public/index.html`

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
  <script src="/js/index.js"></script>
</body>
</html>
```

* `$ nodemone server/server.js`
* Test and make sure **localhost:3000** still works

## Move on to custom event
* New email
* Create email

### on vs emit
* `on` is listening for an event
* `emit` is creating an event

`public/index.js`

* Listen for the event **on the client**
```js
// MORE CODE
socket.on('newEmail', () => {
  console.log('New Email');
});
```

* Create (emit) the event **on the server**

```js
// MORE CODE
io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newEmail');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// MORE CODE
```

* Refresh browser and you'll see in client console `New Email`
* But we didn't send custom data
* How can we?
* Super easy!
    - Just provide a second argument when you emil
    - Most times you want to send multiple pieces of data so the object is mostly used

## Let's update our emmiter
`server.js`

```js
// MORE CODE
socket.emit('newEmail', {
  from: 'guys@budweiser.com',
  text: 'wassuuuuup!',
  videoURL: 'https://www.youtube.com/watch?v=JJmqCKtJnxM',
  createdAt: 123,
});
// MORE CODE
```

* But nothing happens
* In order to make this work we need to grab what we're sending (the data) and that is in the first argument of the client site event listener

`index.js`

```js
// MORE CODE
socket.on('newEmail', email => {
  console.log('New Email', email);
});
```

![passing event data](https://i.imgur.com/7jlJL6a.png)

* Now we get New Email and the object holding our data
* We just did something using socket.io that we could never do with an HTTP API

## Emit from client sending data to the server
`server.js`

```
// MORE CODE
io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'guys@budweiser.com',
    text: 'wassuuuuup!',
    videoURL: 'https://www.youtube.com/watch?v=JJmqCKtJnxM',
    createdAt: 123,
  });

  socket.on('createEmail', newEmail => {
    console.log('createEmail', newEmail);
  });
// MORE CODE
```

* We now need to emit the event on the client
* But we do it inside connect as we only want to emit when connected

`index.js`

```js
const socket = io(); // opens a connection

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'superbowl@commercial.com',
    text: 'Wassaaaaaaap!',
  });
});
// MORE CODE
```

* Refresh browser and now you'll see in server terminal:

`createEmail { to: 'superbowl@commercial.com', text: 'Wassaaaaaaap!' }`

* Now we just have proven that we can send data from client to server and from server to client
* In real world app, a user would fill out forms and then emit it

## Emit from client console
`> socket.emit('createEmail', { to: 'test@email.com', text: 'yo'});`

* That will fire an event and you'll see the date in the server terminal

## Challenge - Create two events

![diagram of challenge](https://i.imgur.com/MjDhCX0.png)

## newMessage (on server)
* We have a server and a user using our chat app
* The server will emit a new server event
* It will be listened to on the client
* When a `newMessage` comes it the server will send it to everyone connected to the chat room
    - So they can display it to the screen and everyone can respond to it
* `newMessage` Event will pass data
    - from
    - text
    - createdAt
* `newMessage` will print in log inside client

## createMessage (on client)
* Will come from the client to the server
* I am `user1` and I fire a `createMessage` from my browser
    - This will go to the server
    - We send:
      + who the message is from
      + the text of the message
      + the createdAt time
* The server will fire new message events to everyone else so they can see my message
    - This means the `createMessage` event will be emitted from the client and the server will be the one who is listening for the event
    - Will require some data
         + who the message was from
         + the text they want to send
         + We don't send the createdAt property
            * The reason is createdAt will be created on the server
            * This is prevent the client from spoofing when the message was created
                - We will trust some things the user can provide us and other we will not
                - To do this you just need to create an event listener on the server that waits for this event to fire
                     + Just log message to console and provide the data that got passed along
                     + Once that data is in place you'll want to emit it when the user first connects and you can also fire a couple socket.emit calls from the chrome dev tools making sure that all the messages show up in the terminal
* Comment out previous event listeners and emits for fake email app

### Solution
`server.js`

```js
// MORE CODE

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('createMessage', message => {
    console.log('createMessage', message);
  });
});

// MORE CODE
```

`index.js`

```js
const socket = io(); // opens a connection

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Sir Luke S',
    text: 'Prove it. Bring your lightsaber',
  });
});
```

* On Server

```js
createMessage { from: 'Sir Luke S', text: 'Prove it. Bring your lightsaber' }
```

* Test in chrome dev console

`> socket.emit('createMessage', {from: 'Han', text: 'Need the MF?'});`

* On the server

`createMessage { from: 'Han', text: 'Need the MF?' }`

### On the client
`index.js`

```js
const socket = io(); // opens a connection

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Sir Luke S',
    text: 'Prove it. Bring your lightsaber',
  });
});
// add this socket listener below
socket.on('newMessage', message => {
  console.log('newMessage', message);
});
```

`server.js`

```js
// MORE CODE

io.on('connection', socket => {
  console.log('New user connected');
  
  // add this emitter
  socket.emit('newMessage', {
    from: 'Mr. Darth V',
    text: 'Luke. I am your father.',
    createdAt: new Date().getTime(),
  });

  socket.on('createMessage', message => {
    console.log('createMessage', message);
  });
});

// MORE CODE
```

* On the server

`newMessage {from: "Mr. Darth V", text: "Luke. I am your father.", createdAt: 1514842898738}`

## Git
`$ git add .`

`$ git commit -m 'Add newMessage and createMessage events`

`$ git push origin master`

## Communicate between browser tabs


