# Get input from user

`$ node app.js list`

* We have access to `list` argument

## argv
* argv - Short for `arguments vector`
    - More like an arguments array (in js)
    - An array of all arguments passed in

`$ npm app.js list`

* Now we see our ` showing up (3rd)

![list as array](https://i.imgur.com/daAmQzx.png)

`app.js`

```js
console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

const command = process.argv[2];
console.log('Command', command);

if (command === 'add') {
  console.log('Adding new note');
} else if (command === 'list') {
  console.log('Listing all notes');
} else if (command === 'read') {
  console.log('Reading note');
} else if (command === 'remove') {
  console.log('Removing note');
} else {
  console.log('Command not recognized');
}
```

* Will give you this output

![conditional args](https://i.imgur.com/d24yqC1.png)

## Getting more specific info
`$ node app.js remove --title="secrets two"`

* Will pass the title arg but it is hard to access
* We will use a 3rd party **Yargs** module to make this easier
    - Parsing key/value pairs is too complex
* `process.argv` automatically populates all the arguments

## Yargs
* [yargs github documentation link](https://github.com/yargs/yargs)

### Install yargs
`$ npm i yargs -S`

### Access yargs
`app.js`

```js
console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = process.argv[2];
console.log('Command', command);
console.log('Process', process.argv);
console.log('Yargs', argv);

if (command === 'add') {
  console.log('Adding new note');
} else if (command === 'list') {
  console.log('Listing all notes');
} else if (command === 'read') {
  console.log('Read note');
} else if (command === 'remove') {
  console.log('Remove note');
} else {
  console.log('Command not recognized');
}
```

* Now we can easily access our args

`$ node app.js remove --title="secrets two"`

`app.js`

```js
console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = process.argv[2];
console.log('Command', command);
console.log('Process', process.argv);
console.log('Yargs', argv);

if (command === 'add') {
  notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
  console.log('Listing all notes');
} else if (command === 'read') {
  console.log('Read note');
} else if (command === 'remove') {
  console.log('Remove note');
} else {
  console.log('Command not recognized');
}
```

* notes.js

```js
console.log('Starting notes.js');

const addNote = (title, body) => {
  console.log('Adding note', title, body);
};

module.exports = {
  addNote
};
```

`$ node app.js list`

### Complete code
`app.js`

```js
console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = process.argv[2];
console.log('Command', command);
console.log('Yargs', argv);

if (command === 'add') {
  notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  notes.getNote(argv.title);
} else if (command === 'remove') {
  notes.removeNote(argv.title);
} else {
  console.log('Command not recognized');
}
```

notes.js

```js
console.log('Starting notes.js');

const addNote = (title, body) => {
  console.log('Adding note', title, body);
};

const getAll = (title, body) => {
  console.log('Getting all notes');
};

const getNote = title => {
  console.log('Get note', 'title is: ' + title);
};

const removeNote = title => {
  console.log('Remove note', 'title is: ' + title);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
```

`$ node app.js remove --title=secret`




