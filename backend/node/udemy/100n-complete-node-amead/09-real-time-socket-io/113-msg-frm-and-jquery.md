# Message Form and jQuery
* We are tired of using the console as it can only be used by developers
* Time to add a form

## Todo
* We'll add a form
* We'll add a listener that will wait for the form to be submitted
    - Inside that listener callback we will fire socket.emit() with the data that was typed in the field
    - We will also render all incoming messages to the screen
    - At end of this video we'll have an ugly, functional chat app
    - We are going to use jQuery to use DOM manipulation

### Add jQuery
`index.js`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Node Chat App</title>
  <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
</head>
<body>
  <p>The Chat App</p>  
  <script src="/socket.io/socket.io.js"></script>
  <script src="/js/index.js"></script>
</body>
</html>
```

### Add form
`index.html`

```html
<!-- MORE CODE -->
  <p>The Chat App</p>  
  <form id="message-form">
    <input name="message" type="text" placeholder="Message"
    />
    <button>Send</button></form>
  <script src="/socket.io/socket.io.js"></script>
  <script src="/js/index.js"></script>
</body>
</html>
```

* We need to override the form submit default behavior

`> jQuery('#message-form')`

* Will gain you access to the form

`index.js`

```js
// MORE CODE
jQuery('#message-form').on('submit', e => {
  e.preventDefault();
});
```

### Test
* Remove query string from browser
* Refresh
* Click Send and you will see nothing happens
* You successfully overwrote the default from behavior

```js
// MORE CODE
jQuery('#message-form').on('submit', e => {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: jQuery('[name=message]').val(),
    },
    () => {}
  );
});
```

* Not fill the form out
* Does not submit
* But sends form data to console

## Rending incoming messages to the screen
* Create dom hook in index.html

```index.html
<!-- MORE CODE -->
<body>
  <p>The Chat App</p>  

  <ol id="messages"></ol>

  <form id="message-form" action="">
<!-- MORE CODE -->
```

`index.js`

```js
// // MORE CODE
socket.on('newMessage', message => {
  console.log('newMessage', message);
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});
// // MORE CODE
```

* Now the chat app lists all the messages
* Delete this:

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

* We don't need it anymore as we are now using the form to create messages
* Now our app is functioning
* Sending messages to different tabs
* No longer using the console to send messages

## Git
```
$ ga .
$ gc -m 'working chat app'
$ gpush
$ gph
```

### Test it out
