# Geolocation Part 1
* Send everyone my lng and lat
* Send link with map
* geolocation api
* available on all mobile browsers
* MDN has the best docs for client side APIs
* [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)

## Add button below form
`index.html`

```html
  <form id="message-form" action="">
    <input name="message" type="text" placeholder="Message"
    />
    <button>Send</button></form>
  <button id="send-location">Send Location</button>
  <script src="/socket.io/socket.io.js"></script>
  <script src="/js/index.js"></script>
</body>
</html>
```

* It is better to store jQuery in a variable rather than use `jQuery` multiple times as it takes time for it to manipulate the DOM and it is **expensive**

`index.js`

```js
// MORE CODE
const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return console('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(position);
    },
    () => {
      console.log('Unable to fetch location.');
    }
  );
});
```

* Click buttoon
* Will ask you if ok to reveal your position
* Accept/pause and your coords appear

![clear these settings](https://i.imgur.com/n4efeUv.png)

* After you accept to give geolations it won't ask you again but you can override that with this button
* All we care about is lat and lng
    - position.coords.latitude
    - position.coords.longitude

`index.js`

```js
// // MORE CODE
navigator.geolocation.getCurrentPosition(
  position => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  },
  () => {
    console.log('Unable to fetch location.');
  }
);
// // MORE CODE
```

* And now we set up on the server

`server.js`

```js
  socket.on('createLocationMessage', coords => {
    io.emit(
      'newMessage',
      generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`)
    );
  });
});

server.listen(port, () => {
  console.log(`App started on port ${port}. VROOOOOOM!`);
});
```

* Now when you click the button you will see the lng and lat appear on the browser
* We will hide this from the user as they don't need to see the lng and lat
* They just need a map
* Past lng and lat in google and you'll see a map of your location

## Next - We'll add a nice UX map next


