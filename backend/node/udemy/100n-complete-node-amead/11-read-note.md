# Read Note

`notes.js`

```js
const getNote = title => {
  // fetch notes
  const notes = fetchNotes();
  // only return notes who's tite matches tite arg
  const filteredNotes = notes.filter(note => note.title === title);

  return filteredNotes[0];
};
```

`app.js`

```js
{
// more code
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if(note) {
    console.log('Note found!');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
// more code
}
```

```
$ node app.js read --title="santa secret"
```

* That will put up the note if the title exists
* It will run note doesn't exist if it doesn't

## Refactor with DRY
`app.js`

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
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note added');
    notes.logNote(note);
  } else {
    console.log('Note title already exists');
  }
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if(note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);
  const message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
  
} else {
  console.log('Command not recognized');
}
```

`notes.js`

```js
const logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
};
```

* Will work just as before but now our code is more modular and it took us less time to type
