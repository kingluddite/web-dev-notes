# Restart with nodemon
## Install nodemon
`$ npm i nodemon -g`

## Run nodemon
`$ nodemon app.js`

* Now when you save files, Nodemon will automatically restart your app
* `nodemon` is only used for development purposes

## Clean our code up
`app.js`

* Leave a space between your custom require files and the 3rd party files
* Remove `greetings.txt` as we won't use it
* Shut down nodemon using `ctrl` + `c`

`app.js`

```js
console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');
```

`notes.js`

```js
console.log('Starting notes.js');

module.exports.addNote = () => {
  console.log('addNote');
  return 'New note';
};
```
