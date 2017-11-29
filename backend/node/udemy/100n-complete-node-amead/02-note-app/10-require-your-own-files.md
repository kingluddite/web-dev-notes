# Require your own files

`app.js`

```js
console.log('starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

const user = os.userInfo();

fs.appendFileSync('greetings.txt', `Hello ${user.username}`);
```

`notes.js`

```js
console.log('Starting notes.js');

console.log(module);
```

* You will see a ton of stuff inside `module`
* All we care about inside this object is `exports`

## exports
* Is an object on the module property
* Everything on this object gets exported
* This (the `module` we are logging inside nodes.js) object gets set inside `app.js` when we define the **notes** variable like this:

`const notes = require('./notes.js')`

### Let's try it out
`notes.js`

```js
console.log('Starting notes.js');

module.exports.age = 25;
```

* Update `app.js`

```js
console.log('starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

const user = os.userInfo();

fs.appendFileSync(
  'greetings.txt',
  `Hello ${user.username}: You are ${notes.age}`
);
```

* Run with `$ node app.js`

And you will see in `greetings.txt` what we say before and also `You are 25 was appended to the end`

* This is not very practical
* The real goal is to export function inside app.js

## Exporting functions
`app.js`

```js
console.log('starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

const res = notes.addNote();
console.log(res);
```

`notes.js`

```js
console.log('Starting notes.js');

module.exports.addNote = () => {
  console.log('addNote');
  return 'New note';
};
```

* Run with `$ node app.js`
* Outputs to the terminal:

```
starting app.js
Starting notes.js
addNote
New note
```
