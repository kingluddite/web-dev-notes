# Splitting up our application
* Create a new file `notes-functions.js`
* Here is the html

`index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Notes App</title>
    <link rel="shortcut icon" href="#" />
  </head>
  <body>
    <h1>Notes App</h1>
    <h2>Take notes whenever you want</h2>
    <input id="search-text" placeholder="Search Notes" type="text" />
    <select id="filter-by-select">
      <option value="byEdited">Sort by last edited</option>
      <option value="byCreated">Sort by recently created</option>
      <option value="alphabetical">Sort alphabetically</option>
    </select>
    <div id="notes"></div>
   <!-- notes container  -->
    <button id="create-note">Create Note</button>
    <script src="assets/js/notes-functions.js"></script>
    <script src="assets/js/notes-app.js"></script>
  </body>
</html>
```

* We rename `script.js` to `notes-app.js` to improve the naming and readibility of our code and structure

## Now we have 2 JavaScript files
* Important
    - All files share a single file global namespace
    - The `notes` array in `notes-app.js` is not specific just to `notes-app.js` but it will be specific to all files in our app

## Order is import on how we load in JavaScript files
* Add a log to try and print the value of `filters`

`notes-functions.js`

```
console.log(filters);

```

### Houston we have a problem!
`ReferencedError: filters is not defined`

* Why this error?
* Because of the order of our JavaScript imports

`index.html`

```
// MORE CODE
    <script src="assets/js/notes-functions.js"></script>
    <script src="assets/js/notes-app.js"></script>
  </body>
</html>
```

* In `notes-functions.js` we want filters value but it isn't defined until the next line
* If we want to solve this issue we rearrange the import order

`index.html`

```
// MORE CODE
    <script src="assets/js/notes-app.js"></script>
    <script src="assets/js/notes-functions.js"></script>
  </body>
</html>
```

* And now we get the value for `filters`

## But we will define our functions in the `notes-functions.js` file
* So we'll put the order back to the way we had it before

`index.html`

```
// MORE CODE
    <script src="assets/js/notes-functions.js"></script>
    <script src="assets/js/notes-app.js"></script>
  </body>
</html>
```

## Start refactoring
* We need to make this a function

`notes-functions.js`

```
// Read existing notes from localStorage
const getSavedNotes = function() {
  const notesJSON = localStorage.getItem('notes');

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

```

`notes-app.js`

```
let notes = getSavedNotes(); // add this line

const filters = {
  searchText: '',
};

// MORE CODE
```

* Now our code works just like it did before

## Now let's refactor `renderNotes`
* We will refactor this into 3 separate function calls

`notes-app.js`

```
// MORE CODE

const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    // find if note contains filter text
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // clear all notes from last search
  document.querySelector('#notes').innerHTML = '';

  filteredNotes.forEach(function(note) {
    const noteEl = document.createElement('p');
    if (note.title.length > 0) {
      noteEl.textContent = note.title;
    } else {
      noteEl.textContent = 'Unnamed Note';
    }
    document.querySelector('#notes').appendChild(noteEl);
  });
};

// MORE CODE
```

## Generate Note DOM
* Look at this fragment

```
// MORE CODE

    const noteEl = document.createElement('p');
    if (note.title.length > 0) {
      noteEl.textContent = note.title;
    } else {
      noteEl.textContent = 'Unnamed Note';
    }
    document.querySelector('#notes').appendChild(noteEl);

// MORE CODE
```

* We can put that in a function called `generateNoteDOM()`

`notes-app.js`

```
// MORE CODE

  filteredNotes.forEach(function(note) {
    const noteEl = generateNoteDOM(note);
    document.querySelector('#notes').appendChild(noteEl);
  });
};

// MORE CODE
```

`notes-functions.js`

```
// MORE CODE
// Generate DOM structure for a Note
const generateNoteDOM = function(note) {
  const noteEl = document.createElement('p');
  if (note.title.length > 0) {
    noteEl.textContent = note.title;
  } else {
    noteEl.textContent = 'Unnamed Note';
  }
  return noteEl;
};
```

* Works just like it did before
* But now we can more easily update code to do what we need

## Just move renderNotes
* We can just cut and paste this function entirely into our notes-functions.js file

`notes-functions.js`

```
// MORE CODE
// Render application notes
const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    // find if note contains filter text
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // clear all notes from last search
  document.querySelector('#notes').innerHTML = '';

  filteredNotes.forEach(function(note) {
    const noteEl = generateNoteDOM(note);
    document.querySelector('#notes').appendChild(noteEl);
  });
};
```

* Code works just like it did before but it is way easier to read, understand and maintain

## Goal of refactoring
* Is to take your existing features and break them out into something more reasonable
* How you refactor is based on your own personal preference
* We'll take this line:

`notes-app.js`

```
  localStorage.setItem('notes', JSON.stringify(notes));

```

* And put it inside it's own function

`notes-functions.js`

```
// Save the notes to localStorage
const saveNotes = function(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
};
```

* And we'll call our new function

`notes-app.js`

```
// MORE CODE

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  notes.push({
    title: '',
    body: '',
  });
  saveNotes(notes);
  renderNotes(notes, filters);
});

// MORE CODE
```

* Code works just as it did before
* Some developers might think this refactor is unnecessary
    - Some developers might like it because now we can just call the function and pass it what it needs and not have to worry about the implementation details (it just works)
    - And later on if I wanted to change storage mechanisms all I would need to do is change a bit of code in getSavedNotes and savedNotes and I'm off to the races
        + I wouldn't need to touch the notes-app.js file at all because it's not concerned about any of the details
        + It is just concerned with the "high level functionality"

## Next - Refactor the Todos app

