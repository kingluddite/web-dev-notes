# Saving user data using Local Storage (Part 2)
## Notes app
* We'll delete our notes object
* Remove all examples from last exercise
* Delete all localStorage from your browser
    - Run `localStorage.clear()`

`notes-app/assets/js/script.js`

```
const notes = [];

const filters = {
  searchText: '',
};

const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    // find if note contains filter text
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // clear all notes from last search
  document.querySelector('#notes').innerHTML = '';

  filteredNotes.forEach(function(note) {
    const noteEl = document.createElement('p');
    noteEl.textContent = note.title;
    document.querySelector('#notes').appendChild(noteEl);
  });
};

// Event Listeners
document.querySelector('#search-text').addEventListener('input', function(e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  e.target.textContent = 'first button text changed';
});

document
  .querySelector('#create-note')
  .addEventListener('dblclick', function(e) {
    e.target.textContent = 'Create Note';
  });

document
  .querySelector('#filter-by-select')
  .addEventListener('change', function(e) {
    console.log(e.target.value);
  });
```

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
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

## Check for existing saved data
* We first (when our app initializes check for any saved data, notes in side localStorage)
    - If there are we want to make sure to use them by updating the notes array
    - If there are none, we'll stick with an empty notes array, waiting for the end user to add some data

`script.js`

```
let notes = []; // change to let because we'll change the value later

// MORE CODE

// check for existing saved data
const notesJSON = localStorage.getItem('notes'); // grab it if it is there

// Make sure it isn't null (it will be null if empty)
if (notesJSON !== null) {
    // we have some JSON so we grab and parse it an store it into our notes array
  notes = JSON.parse(notesJSON);
} else {
    // null so say localStorage is empty
  console.log('localStorage is empty');
}

// MORE CODE
```

## Update our notes code
* We have a create note event listener on a button that only changes button text which is useless
* Let's push an new object onto the notes array
* Both the `text` and `body` will be empty strings
* Then we need to stringify notes
* Then we need to store in localStorage

```
// MORE CODE

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  notes.push({
    title: '',
    body: '',
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes(notes, filters);
});

// MORE CODE
```

* We didn't store anything so we can't see any difference yet

## Show something to user if we don't have a note title
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
    // If there is a title use it
    if (note.title.length > 0) {
      noteEl.textContent = note.title;
    } else {
        // if no title, make one up
      noteEl.textContent = 'Unnamed Note';
    }
    document.querySelector('#notes').appendChild(noteEl);
  });
};

// MORE CODE
```

* Nothing happens in browser
* But Create a new new
    - You will see `Unnamed Note` appear in the browser UI
    - You will see Key `notes` and a string array of object in Value in Application tab (of localStorage)
* Refresh the page you will still see your `Unamed Note`

## Complete working code
```
let notes = [];

const filters = {
  searchText: '',
};

// check for existing saved data
const notesJSON = localStorage.getItem('notes');

if (notesJSON !== null) {
  notes = JSON.parse(notesJSON);
} else {
  console.log('localStorage is empty');
}

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

renderNotes(notes, filters);

// Event Listeners
document.querySelector('#search-text').addEventListener('input', function(e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  notes.push({
    title: '',
    body: '',
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes(notes, filters);
});

document
  .querySelector('#filter-by-select')
  .addEventListener('change', function(e) {
    console.log(e.target.value);
  });
```

## Recap - How it works
* At the start of our app it will look for notes, there aren't any
    - notes is null
* But if a note is added, an object with title and body have empty strings as values
* Since no note has a title, the Unnamed note appears on the page
* It shows up because we called `rerenderNotes()` again after adding item
* Because it is saved to localStorage we can refresh the browser and still see Unnamed Note in the browser
* Add a bunch of other notes and they are all saved to localStorage an will remain even on a page refresh

## Challenge for Todos
1. Delete any dummy data
2. Read and parse the data when the app starts up
3. Stringify and write the data when the new data is added
4. Test - end result is when you add todo's they should not go away and should remain even after page refresh

### Challenge Solution
```
// start with empty array of todos
let todos = [];

// check if todos exists in localStorage
const todosJSON = localStorage.getItem('todos');

// if our todos key in localStorage isn't empty
if (todosJSON !== null) {
    // parse it and store it in todos array
  todos = JSON.parse(todosJSON);
} else {
  console.log('todos are empty');
}

// MORE CODE

// Render Todos to browser
const renderTodos = function(todos, filters) {
 // MORE CODE

};

// render todos on initial load
renderTodos(todos, filters);

// MORE CODE

// todo form submit listener
document
  .querySelector('#new-todo-form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    todos.push({
      text: e.target.elements.text.value,
      completed: false,
    });
    // stringify our array
    const todosJSON = JSON.stringify(todos);
    // store in localStorage
    localStorage.setItem('todos', todosJSON);
    // Don't forget to re-render todos
    renderTodos(todos, filters);
    // clear form field for good house keeping :)
    e.target.elements.text.value = '';
  });

  // MORE CODE
```

* Add a bunch of todos
* If you refresh and they remain, you found the solution!

## Next - Refactoring our code
* Restructure it to multiple files making it easier to manage
