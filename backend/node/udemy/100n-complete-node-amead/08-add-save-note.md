# Add Save Note

`notes.js`

```js
const fs = require('fs');

const addNote = (title, body) => {
  const notes = [];
  const note = {
   title,
    body
  };

  // fetch existing notes
  const notesString = fs.readFileSync('notes-data.json');
  // convert string to JSON
  notes = JSON.parse(notesString);

  notes.push(note);
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

module.exports = {
  addNote
};
```

## Run function
`$ node app.js add --title="some secret" --body="Some Body"`

* Will out an object with title and body
* Will create a file named 'notes-data.json' and put our note title and body inside it

## try/catch
* If we try to fetch a file that doesn't exist we'll get an error
* try/catch prevents that error

```js
const fs = require('fs');

const addNote = (title, body) => {
  let notes = [];
  const note = {
    title,
    body,
  };

  try {
    const notesString = fs.readFileSync('notes-data.json');
    notes = JSON.parse(notesString);
  } catch (e) {
    // nothing needed here
  }

  notes.push(note);
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
```

* If there is no file and we try and fetch it, it will error silently and place it into the catch
* Our app won't break like it did without the try/catch

## Prevent Duplicate notes

```js
const fs = require('fs');

const addNote = (title, body) => {
  let notes = [];
  const note = {
    title,
    body,
  };

  try {
    const notesString = fs.readFileSync('notes-data.json');
    notes = JSON.parse(notesString);
  } catch (e) {
    // nothing needed here
  }

  // duplicateNotes will be an array that stores all the notes that have a duplicate title
  // if duplicateNotes has any notes, that is bad and we should not add the note
  // filter() array method that takes a callback with the singlar version of note, this function gets called once for every item in the array and you have opportunity to return either true or false
  // a return value of true will get saved into the duplicateNotes array
  // a return value of false will not get saved into the duplicateNotes array
  // we will return true if the titles match
  // note.title === title
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
  }
};
```

* If there are no duplicates it will add note
* If there is a duplicate it will not add a note


