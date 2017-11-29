# List notes
`notes.js`

`const getAll = () => fetchNotes();`

`app.js`

```js
// more code
} else if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => notes.logNote(note));
} else if (command === 'read') {
// more code
```


