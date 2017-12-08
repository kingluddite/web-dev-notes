# Yargs
* 3rd party module
* Makes process of parsing much easier
* Will let us access title and body info without having to write a manual parser

## Install Yargs
* [documentation](https://github.com/yargs/yargs)
* `$ yarn add yargs`

## Why yargs is useful
`app.js`

```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = process.argv[2];
console.log('Command: ', command);
console.log('Process', process.argv);
console.log('Yargs', argv);

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

`$ node app.js add --title="secrets from us"`

* Now we show argv (from yargs) which is an object and we can more easily access the title then when just using arv

`app.js`

```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = process.argv[2];
console.log('Command: ', command);
console.log('Process', process.argv);
console.log('Yargs', argv);

if (command === 'add') {
  notes.addNote(argv.title, argv.body);
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

`notes.js`

```js
console.log('Starting notes.js');

const addNote = (title, body) => {
  console.log('Adding note', title, body);
};

module.exports = {
  addNote
};
```

`$ node app.js add --title=secret --body="this is my secret"`

### Output
```
Starting app.js
Starting notes.js
Command:  add
Process [ '/usr/local/Cellar/node/8.6.0/bin/node',
  '/Users/howley/Documents/dev/experiments/100e-node-amead/05-getting-input/app.js',
  'add',
  '--title=secret',
  '--body=this is my secret' ]
Yargs { _: [ 'add' ],
  help: false,
  version: false,
  title: 'secret',
  body: 'this is my secret',
  '$0': 'app.js' }
Adding note secret this is my secret
```

## Final code for yargs chapter
`app.js`

* We are now using yargs everywhere

```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
// const command = process.argv[2];
const command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
  notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  notes.getNote(argv.title);
} else if (command === 'remove') {
  notes.removeNote(argv.title)
} else {
  console.log('Command not recognized');
}
```

`notes.js`

```js
console.log('Starting notes.js');

const addNote = (title, body) => {
  console.log('Adding note', title, body);
};

const getAll = () => {
  console.log('Getting all notes');
}

const getNote = (title) => {
  console.log('Getting note', title);
}

const removeNote = (title) => {
  console.log('Removing Notes', title);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
```

