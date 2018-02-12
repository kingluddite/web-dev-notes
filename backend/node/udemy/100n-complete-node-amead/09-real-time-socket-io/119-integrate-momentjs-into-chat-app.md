# Integrate Momentjs into chat app

* Pass your timestamp into momentjs like this:

```js
const createdAt = new Date().getTime();
const date = moment(createdAt);
console.log(date.format('h:mm a')); // 1:55 pm
```

* Use moments way of getting a timestamp

```js
const createdAt = moment().valueOf();
const date = moment(createdAt);
console.log(date.format('h:mm a')); // 1:55 pm 
```

## Apply momentjs to our app
* We use moment everywhere instead of `new Date().getTime()` as it just makes our code more unified

`message.js`

```js
const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf(),
  };
};

const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf(),
  };
};

module.exports = { generateMessage, generateLocationMessage };
```

### Test
`$ node server/server.js`

* Timestamps appear in chrome console
* Stop server
* Run test

`$ npm test`

* 2 tests still passing
* If you .valueOf() from either and ran test you would get an error

### Load moment on the frontend client
* Start server

`$ nodemon server/server.js`

`app.js`

```js
import io from 'socket.io-client';
import jQuery from 'jquery';
import moment from 'moment';
// MORE CODE
```

* In a perfect world our webpack dev server would be updating all our JavaScript code into the bundle on save
* If it's not, you'll need to re-run your build script

`app.js`

* This will add the time when you create a message

```js
import io from 'socket.io-client';
import jQuery from 'jquery';
import moment from 'moment';
// import validator from 'validator';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

// // MORE CODE
socket.on('newMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = jQuery('<li></li');
  li.text(`${message.from}: ${formattedTime} ${message.text}`);

  jQuery('#messages').append(li);
});
// // MORE CODE
```

* Will look like this:

![new formatted time](https://i.imgur.com/8U403Gx.png)

## Challenge
* Add formatted time to newLocationMessage

`app.js`

```js
socket.on('newLocationMessage', message => {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current Location</a>');
  const formattedTime = moment(message.createdAt).format('h:mm a');

  li.text(`${message.from}: ${formattedTime} `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});
```

### Git
```
$ gs
$ ga .
$ gc -m 'Format timestamps using momentjs'
$ gpush
$ gph
```

## Next up - Mustache
* A templating language
