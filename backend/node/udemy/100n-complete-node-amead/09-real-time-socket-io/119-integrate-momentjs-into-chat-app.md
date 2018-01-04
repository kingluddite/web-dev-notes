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


