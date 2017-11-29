# Remove note

`notes.js`

```js
console.log('Starting notes.js');

const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body,
  };

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  console.log('Getting all notes');
};

const getNote = title => {
  console.log('Getting note', title);
};

const removeNote = title => {
  // fetch notes
  const notes = fetchNotes();
  // filter notes, removing the one with title of argument
  const filteredNotes = notes.filter(note => note.title !== title);
  // save new notes array
  saveNotes(filteredNotes);
  
  // if return true, a note was removed
  // if return false, no not was removed
  return notes.length !== filteredNotes.length;
};


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};
```

`app.js`

```js
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
    console.log('Note created');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note title already exists');
  }
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  notes.getNote(argv.title);
} else if (command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);
  const message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
  
} else {
  console.log('Command not recognized');
}
```
