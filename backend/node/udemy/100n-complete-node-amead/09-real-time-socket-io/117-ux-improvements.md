# UX improvements

* Wipe text after submitting form

`app.js` (formerly `index.js`)

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
    () => {
      jQuery('[name=message]').val('');
    }
  );
});
// MORE CODE
```

## Refactor improvement

`app.js`

```js
// MORE CODE
jQuery('#message-form').on('submit', e => {
  e.preventDefault();

  const messageInput = jQuery('[name=message]');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageInput.val(),
    },
    () => {
      messageInput.val('');
    }
  );
});
// MORE CODE
```

* **best practice** If you write something long twice, you should turn it into a variable and reuse it

### createMessage handler
* on `server.js` has the callback returning string so we can just turn this:

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

* Into this:

```js
// MORE CODE
socket.on('createMessage', (message, callback) => {
  console.log('createMessage', message);
  io.emit('newMessage', generateMessage(message.from, message.text));
  callback();
});
// MORE CODE
```

* Make some quick UX improvements

`index.html`

```html
  <form id="message-form" action="">
    <input name="message" type="text" placeholder="Message"
        autofocus autocomplete="off"
/>
```

* When the form loads the focus will be on the input field
* We turn off the autocomplete field as it is not needed for our app

* Set send location button to disabled while waiting for it to get the info

`app.js`

```
// MORE CODE
const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return console('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttr('disabled');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      locationButton.revoveAttr('disabled');
      console.log('Unable to fetch location.');
    }
  );
});
// MORE CODE
```

update text to say `Sending`
    - UX 

`app.js`

```js
// MORE CODE
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return console('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttr('disabled').text('Sending location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      locationButton.revoveAttr('disabled').text('Send location');
      console.log('Unable to fetch location.');
    }
  );
});
// MORE CODE
```

## Git
```
$ ga .
$ gc -m 'Add CSS/Sass for chat app'
$ gph (alias to push to heroku)
