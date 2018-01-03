# Geolocation p2
* Add a link that will enable a user to see where the other user is
* We will emit an new message called `newLocationMessage` on the server and code a handler for it on the client

## Set up URL for google maps and lng and lat
`https://www.google.com/maps?q=33.9797811,-118.41832839999998`

* We had to remove the space between lng and lat
* The red pin is correct within a couple of houses

`server.js`

```js
// // MORE CODE
const { generateMessage, generateLocationMessage } = require('./utils/message');

// MORE CODE
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

// MORE CODE
  socket.on('createLocationMessage', coords => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longitude)
    );
  });
});
// // MORE CODE
```

* We update our message by giving it a new name
* And we are going to use a new utility function that will create the link we need to show the map
* We make sure to import that function name by adding it to the destructured require at the top of the file

`message.js`

```js
// MORE CODE

const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps${lat},${lng}`,
    createdAt: new Date().getTime(),
  };
};

module.exports = { generateMessage, generateLocationMessage };
```

* And then we have to built the DOM link and append it to our html

`index.js`

```js
// // MORE CODE
socket.on('newLocationMessage', message => {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current Location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', e => {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: jQuery('[name=message]').val(),
    },
    () => {},
  );
});
```

* We will refactor this code later
* But we are done right now

## Test it out
* Click button and a link appears that when clicked opens a new tab in google maps with your location inside it

## Write test case
* Shut down server
* `$ npm test` shows 1 test passing

### Solution
`message.test.js`

```js
describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Admin';
    const lat = 123;
    const lng = 456;
    const url = 'https://www.google.com/maps?q=123,456';
    const locationMessage = generateLocationMessage(from, lat, lng);

    expect(typeof locationMessage.createdAt).toEqual('number');
    expect(locationMessage).toMatchObject({
      from,
      url,
    });
  });
});
```

* `$ npm test`
* You should see 2 passing tests

## Git
```
$ gs
$ git add .
$ git commit -m 'Add geolocation support via geolocation API'
$ git push origin master
$ git push heroku master
$ heroku open
```

* **note** To test geolocation on live site it must be `https`

