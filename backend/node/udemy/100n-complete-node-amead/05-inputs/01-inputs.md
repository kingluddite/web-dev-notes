# Inputs

`app.js`

```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

const command = process.argv[2];
console.log('Command: ', command);
console.log(process.argv);

if (command === 'add') {
  console.log('Add new note');
} else if (command === 'list') {
  console.log('list all notes');
} else if (command === 'read') {
  console.log('Reading note');
} else if (command === 'remove') {
  console.log('Removing note');
} else {
  console.log('Command not recognized');
}
```

## In Terminal
`$ node app.js remove --title="secrets two"`

* Passing args is simple but passing args like title is hard so we will use a 3rd party module to simplify the process

