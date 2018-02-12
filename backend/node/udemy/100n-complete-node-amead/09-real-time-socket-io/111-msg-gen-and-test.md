# Message Generator & Tests
* Clean up server.js
* Setup test suite to verify utility functions are working

## Goal
* Great a function that helps us generate this object:

```js
{
    from: 'Admin',
    text: 'Some text',
    createdAt: new Date().getTime()
}
```

* We want to avoid having to creating that object every single time
* We want to pass in args to function (name and text) and it will generate the object (saves us time)

## Create new file message.js
`/server/utils/message.js`

```js
const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime(),
  };
};

module.exports = { generateMessage };
```

* Before we hook it up to server.js let's set up testing

1. Install mocha 
2. Install the `expect insertion` library

`$ yarn add mocha expect -D`

3. Setup `package.json` scripts

```json
// MORE CODE
"scripts": {
  "start": "node server/server.js",
  "test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**/*.test.js",
  "test-watch": "nodemon --exec 'npm test'"
},
// MORE CODE
```

* We need to install nodemone insideo our `package.json` so we'll be using a local copy
    - If our team clones they will also get nodemon added
    - Before this change our nodemon relies on a global install of nodemon and if someone doesn't have nodemon installed they'll get an error
    - We add it locally and team members get up and running with our app faster because we built in the stuff needed inside our package.json and this is a best practice (clone and go! - means people don't need to install anything globally)

`$ yarn add nodemon -D`

4. Start writing tests

`$ npm test`

* We get errors that it could not find any test files matching pattern `server/**/*.test.js`
* We can fix this error by creating a test file:
 
`server/test/server.test.js`

* Once that file is created you can run `$ npm test` again and you'll get `0 passing`

## Challenge
* call generateMessage(from, text)
* get response back and store in variable
* make assertions about response
* assert from matches value you passed in
* assert text matches up
* assert that createdAt is number

## Solution
`server/utils/message.test.js`

```js
const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Tom';
    const text = 'Some message';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toEqual('number');
    expect(message).toMatchObject({
      from,
      text,
    });
  });
});
```

* Run `$ npm test`
  - Should get one passing test

## Integrate test into app
* Move into `server.js`
* Replace all the objects we pass to the emit function with calls to our new function

`server.js`

```js
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app')
  );

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New User Joined')
  );

  socket.on('createMessage', message => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });
});

server.listen(port, () => {
  console.log(`App started on port ${port}. VROOOOOOM!`);
});
```

### Test it out
* Should work as it did before but now we are using a function which will help us scale our app
* Test in two tabs
* Test console statement

```
> socket.emit('createMessage', { from: 'test', text: 'test the text' })
```

* will output the message in both tabs

## Git
```
$ gs
$ git add .
$ git commit -m 'Create generateMessage utility'
$ gpush
```

## Next - socket.io acknowledgments
