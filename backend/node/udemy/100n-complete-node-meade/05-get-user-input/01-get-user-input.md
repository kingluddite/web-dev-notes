# Get user input
`process.argv` - Will be an array of all the arguments passed in


```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

console.log(process.argv); // arguments vector (aka arguments array)
```

## In the Terminal
`$ node app.js list`

```
Starting app.js
Starting notes.js
[ '/usr/local/Cellar/node/8.9.1/bin/node',
  '/Users/USERNAMEHERE/Documents/dev/experiments/node-stuff/udemy/100e-ameade-node/05-get-user-input/app.js' ]
```

1. points to node that was executed
2. points to app that was started
3. shows command line arguments

```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

const command = process.argv[2];
console.log('Command: ', command);
```

* Cool things are possible when we introduce logic

```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

const command = process.argv[2];
console.log('Command: ', command);

if (command === 'add') {
  console.log('Adding new note');
  
} else if (command === 'list') {
  console.log('Listing all notes');
} else {
  console.log('Command not recognized');
}
```

## Run this command in terminal
`$ node app.js list`

* You will see 'Listing all notes' is output in the terminal

```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

const command = process.argv[2];
console.log('Command: ', command);

if (command === 'add') {
  console.log('Adding new note');
  
} else if (command === 'list') {
  console.log('Listing all notes');
} else if (command === 'read') {
  console.log('Reading Note');
} else if (command === 'remove') {
  console.log('Removing Note');
} else {
  console.log('Command not recognized');
}
```

