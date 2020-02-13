# Target by UUID
## Wire up our inputs to do something with our unique id's
* Let's wire up the remove button for our notes app

### Add event handler to our remove button
`notes-functions.js`

```
// MORE CODE

  const button = document.createElement('button');

  // Setup the remove note button
  button.textContent = 'x';
  noteEl.appendChild(textEl);
  button.addEventListener('click', function() {
    console.log(note.id);
  });

// MORE CODE
```

* Click on buttons and you'll see their id in the client console

## Create a removeNote() function
* Better to make this modular and keep all the data for removing a note in one place
* It will take one argument which is the note id

`notes-functions.js`

```
// MORE CODE

const removeNote = function(id) {
  console.log(id);
};

// Generate DOM structure for a Note
const generateNoteDOM = function(note) {
  const noteEl = document.createElement('div');
  const textEl = document.createElement('span');
  const button = document.createElement('button');

  // Setup the remove note button
  button.textContent = 'x';
  noteEl.appendChild(textEl);
  button.addEventListener('click', function() {
    removeNote(note.id);
  });

// MORE CODE
```

## Don't forget to re-render the notes list
* After we remove the note we need to show the fresh version of the notes list (and the note we removed will be gone)

```
// MORE CODE

  // Setup the remove note button
  button.textContent = 'x';
  noteEl.appendChild(textEl);
  button.addEventListener('click', function() {
    removeNote(note.id);
    renderNotes(notes, filters); // add this to re-render the notes 
  });

// MORE CODE
```

## Now we need to remove the note
1. First we find the index of the array
2. Then we remove it

```
// MORE CODE

const removeNote = function(id) {
  // search for the index of a match
  const noteIndex = notes.findIndex(function(note) {
    // if the id argument matches an id of a note (they are all unique remember! - then we capture that index)
    return note.id === id;
  });
  // make sure there was a match found first
  if (noteIndex > -1) {
    // remove the note from the array
    notes.splice(noteIndex, 1);
  }
};

// MORE CODE
```

* That will remove the note but we still need to save to update our localStorage

```
// MORE CODE

  // Setup the remove note button
  button.textContent = 'x';
  noteEl.appendChild(textEl);
  button.addEventListener('click', function() {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

// MORE CODE
```

* Click to delete note and it will be gone
* Check the localStorage to confirm you are in fact deleting notes based on their unique `id`

`todos-functions.js`

```
// MORE CODE

const removeTodo = function(id) {
  // find a match of the id argument and the todo id
  const todoIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// MORE CODE
```

`todos-functions.js`

```
// MORE CODE

  removeButton.textContent = 'x';
  removeButton.addEventListener('click', function() {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  // Attach button to DOM
  todoEl.appendChild(removeButton);
  // return the created DOM stuff
  return todoEl;
};

// MORE CODE
```

* You can now delete todos

## Next - wire up the checkbox
