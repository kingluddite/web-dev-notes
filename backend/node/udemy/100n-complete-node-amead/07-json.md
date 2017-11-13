# JSON
* Convert from string to object and object to string

`app.js`

```js
// const obj = {
//   name: 'Pip'
// };

// const stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(obj);

const personString = '{"name": "Pip", "age": 22}';
const person = JSON.parse(personString);
console.log(typeof person);
console.log(person);
```

```
const fs = require('fs');

const originalNote = {
  title: 'Some title',
  body: 'Some body'
}

const originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

const noteString = fs.readFileSync('notes.json');
const note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
```

* This shows how to convert a json object into a string and vice versa
