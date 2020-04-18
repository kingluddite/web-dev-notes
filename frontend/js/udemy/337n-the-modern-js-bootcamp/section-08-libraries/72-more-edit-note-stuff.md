# More Edit Note page
* Now we want to work on our forms to make sure they change the title and body

## Add script
* We'll load in our notes-functions.js page
* We don't call any of these so it won't mess up our existing behavior

`edit-note.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edit Note</title>
</head>
<body>
 <script src="/assets/js/notes-functions.js"></script>
</body>
</html>
```

* We will also add a new file `notes-edit.js` (that will be specific to the editing of the notes)
* We won't load in the notes-app.js file because that was specifically for the home page

```
// MORE CODE
<body>
 <script src="/assets/js/notes-functions.js"></script>
 <script src="/assets/js/notes-edit.js"></script>
</body>
</html>
```

## Getting hash
* We need to grab the hash from the URL
* `location.hash` will give us the full string but it will also include the `#`
* We need to strip out the `#` and we can do that using the String method `substring()`

## String.prototype.substring()
* [substring docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)

```
const hash = location.hash;
const id = hash.substring(1);
console.log(id); // f8087cfb-fc77-4eeb-8f80-b4b433fc85ed
```

* You could also do:

`const noteId = location.hash.substring(1);`

## Now we need to grab all our notes
* We can reuse a function we used before `getSavedNotes`

```
// MORE CODE
// Grab all notes from localStorage if they exist
const notes = getSavedNotes();
// grab the hash
const hash = location.hash;
// parse the id from the hash
const noteId = hash.substring(1);
// grab the note with the id in the URL
const note = notes.find(function(note) {
  return note.id === noteId;
});

// if note is undefined (id doesn't exist and no match was found)
if (note === undefined) {
    // redirect to home page
  location.assign('/index.html');
}
```

## Test it out
* Create new note, you will see note in URL
* Change note id and you will get redirect to home page

### Prepopulate edit form with title and body
* Delete all notes except one
* In the client console manually add a title and body

`notes-edit.js`

```
const notes = getSavedNotes();
const hash = location.hash;
const noteId = hash.substring(1);
const note = notes.find(function(note) {
  return note.id === noteId;
});

if (note === undefined) {
  location.assign('/index.html');
}

document.querySelector('#note-title').value = note.title;
document.querySelector('#note-body').value = note.body;
```

## Test it out
* Be on home page
* Click on link to note
* You should see the title and body are prepopulated with the note data you just manually added

## Challenge
* When end user changes title or body save it on the fly

1. Setup input event for title
2. Update note object and save notes list
3. Do steps 1 and 2 for body
4. Setup a remove button that removes notes and sends the user back to the home page

`edit-note.html`

```
// MORE CODE
  <button id="remove-note-button">Remove Note</button>
 <script src="/assets/js/notes-functions.js"></script>
 <script src="/assets/js/notes-edit.js"></script>
</body>
</html>
```

## Tip - Selecting from the DOM is expensive
* If you use it more than once, store it in a variable

### This is inefficient
```
// MORE CODE

document.querySelector('#note-title').value = note.title;
document.querySelector('#note-body').value = note.body;

document.querySelector('#note-title').addEventListener('change', function(e) {
  note.title = e.target.value;
  saveNotes(notes);
});

document.querySelector('#note-body').addEventListener('change', function(e) {
  note.body = e.target.value;
  saveNotes(notes);
});

// MORE CODE
```

### This is better and more efficient
```
// MORE CODE

const noteTitle = (document.querySelector('#note-title').value = note.title);
const noteBody = (document.querySelector('#note-body').value = note.body);

noteTitle.querySelector('#note-title').addEventListener('change', function(e) {
  note.title = e.target.value;
  saveNotes(notes);
});

noteBody.querySelector('#note-body').addEventListener('change', function(e) {
  note.body = e.target.value;
  saveNotes(notes);
});

// MORE CODE
```

## Even better is define all variables at top
```
const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const notes = getSavedNotes();
const hash = location.hash;
const noteId = hash.substring(1);
const note = notes.find(function(note) {
  return note.id === noteId;
});

if (note === undefined) {
  location.assign('/index.html');
}

titleElement.value = note.title;
bodyElement.value = note.body;

titleElement.addEventListener('change', function(e) {
  note.title = e.target.value;
  saveNotes(notes);
});

bodyElement.addEventListener('change', function(e) {
  note.body = e.target.value;
  saveNotes(notes);
});

// MORE CODE
```

## Remove button
```
const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note-button'); // add

// MORE CODE

// remove note button (ADD THIS)
removeElement.addEventListener('click', function() {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
});
```

## Test it out
* Add a home link to your edit-note.html

`edit-note.html`

```
// MORE CODE

<body>
  <a href="/index.html">Home</a>
  <form id="edit-note-form">

// MORE CODE
```

* home page
* Create note (you will be redirected to edit-note.html page)
* Change title/body and refresh page (data will remain in form)
* Click home link and you'll see your note rendered on home page
* Create note again and remove and you will be redirect to home page and the note you just deleted is not in the note list

## Next - Multiple tabs
* If you open your edit-note.html in 2 tabs, updating one tab does not update the other
* Next we'll work on making updates to one tab will also update the other tab
