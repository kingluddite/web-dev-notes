# Arrow Functions (Part 2)
* We'll talk about the subtle differences between regular functions and arrow functions

```
// MORE CODE

const add = function(a, b) {
  console.log(arguments);
};

add(11, 22, 33, 44); // [Arguments] { '0': 11, '1': 22, '2': 33, '3': 44 }

// MORE CODE
```

* We only named `a` and `b` argument but we called it with 4 arguments and when we log arguments we see all 4

## Now we'll add 2 arguments
```
// MORE CODE

const add = function() {
  return arguments[0] + arguments[1];
};

console.log(add(11, 22, 33, 44)); // 33

// MORE CODE
```

* Arguments is rarely used, maybe 99% of the time you won't use them but they are a tool to be aware of

## Important to note!
### `arguments` only exist in regular functions
* `arguments` do not exist in arrow functions
* `arguments` is not bound, there is no local `arguments` variable in your arrow functions
* If we change the code above to an arrow function you will see that the code fails

### Rewrite as arrow function
```
const add = () => {
  return arguments[0] + arguments[1];
};

console.log(add(11, 22, 33, 44)); // 33
```

* Error (this is a node error)

```
object Object]function require(path) {
      return mod.require(path);
    }
```

## Another big difference between arrow functions and regular functions
* Arrow functions DO NOT bind their `this` value meaning their bad candidates for methods

```
const car = {
  color: 'Red',
  getSummary: function() {
    return `The car is ${this.color}`;
  },
};

console.log(car.getSummary()); // The car is red
```

* Above works fine but if we try an arrow function in the method:

```
const car = {
  color: 'Red',
  getSummary: () => {
    return `The car is ${this.color}`;
  },
};

console.log(car.getSummary()); // The car is undefined
```

* So `this` works in object methods with regular functions but this is not bound to methods in objects for arrow functions

## Remember this rule!
* When you create properties on objects do not use arrow functions but instead always use regular functions

## Method Definition Syntax
## Note: There is an alternative way to define your regular functions on an object and that is using the `method definition syntax`
* And to do that we:
    - Remove the `function` keyword
    - And we remove the colon (:)

### So this:

```
// MORE CODE

const car = {
  color: 'Red',
  getSummary: function() {
    return `The car is ${this.color}`;
  },
};

// MORE CODE
```

### Becomes this:
```
const car = {
  color: 'Red',
  getSummary() {
    return `The car is ${this.color}`;
  },
};

console.log(car.getSummary()); // The car is red
```

## Convert `notes-functions.js` to use arrow functions (when applicable)
### Start 
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

const removeNote = function(id) {
  const noteIndex = notes.findIndex(function(note) {
    return note.id === id;
  });
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate DOM structure for a Note
const generateNoteDOM = function(note) {
  const id = note.id;
  const noteEl = document.createElement('div');
  // Make it an anchortag
  const textEl = document.createElement('a');
  const button = document.createElement('button');

  // Setup the remove note button
  button.textContent = 'x';
  noteEl.appendChild(textEl);
  button.addEventListener('click', function() {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  // Set up the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = 'Unnamed Note';
  }
  // link to edit-note page and send note id in URL
  textEl.setAttribute('href', `/edit-note.html#${id}`);
  noteEl.appendChild(button);
  return noteEl;
};

// Save the notes to localStorage
const saveNotes = function(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Sort your notes by one of three ways
const sortNotes = function(notes, sortBy) {
  if (sortBy === 'byEdited') {
    return notes.sort(function(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'byCreated') {
    return notes.sort(function(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'alphabetical') {
    return notes.sort(function(a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// Render application notes
const renderNotes = function(notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
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

// Generate the last edited message
const generateLastEdited = function(timestamp) {
  return `Last edited ${moment(note.updatedAt).fromNow()}`;
};
```

## After
`notes-functions.js`

```
// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

const removeNote = id => {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate DOM structure for a Note
const generateNoteDOM = note => {
  const id = note.id;
  const noteEl = document.createElement('div');
  // Make it an anchortag
  const textEl = document.createElement('a');
  const button = document.createElement('button');

  // Setup the remove note button
  button.textContent = 'x';
  noteEl.appendChild(textEl);
  button.addEventListener('click', () => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  // Set up the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = 'Unnamed Note';
  }
  // link to edit-note page and send note id in URL
  textEl.setAttribute('href', `/edit-note.html#${id}`);
  noteEl.appendChild(button);
  return noteEl;
};

// Save the notes to localStorage
const saveNotes = notes => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'alphabetical') {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// Render application notes
const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(note => {
    // find if note contains filter text
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // clear all notes from last search
  document.querySelector('#notes').innerHTML = '';

  filteredNotes.forEach(note => {
    const noteEl = generateNoteDOM(note);
    document.querySelector('#notes').appendChild(noteEl);
  });
};

// Generate the last edited message
const generateLastEdited = timestamp => {
  return `Last edited ${moment(note.updatedAt).fromNow()}`;
};
```

* Make sure you test that it still works after refactoring to using arrow functions instead of regular functions

## Convert rest of notes files to use arrow functions
### Before `notes-app.js`
```
let notes = getSavedNotes();

const filters = {
  searchText: '',
  sortBy: 'byEdited',
};

renderNotes(notes, filters);

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  const id = uuidv4();
  const timestamp = moment().valueOf();

  notes.push({
    id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  saveNotes(notes);
  location.assign(`/edit-note.html#${id}`);
});

// Event Listeners
document.querySelector('#search-text').addEventListener('input', function(e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document
  .querySelector('#filter-by-select')
  .addEventListener('change', function(e) {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
  });

// check for any localStorage updates
window.addEventListener('storage', function(e) {
  notes = JSON.parse(e.newValue);
  saveNotes(notes);
  renderNotes(notes, filters);
});

```

## After `notes-app.js`
```
let notes = getSavedNotes();

const filters = {
  searchText: '',
  sortBy: 'byEdited',
};

renderNotes(notes, filters);

// change create note button text
document.querySelector('#create-note').addEventListener('click', e => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  notes.push({
    id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  saveNotes(notes);
  location.assign(`/edit-note.html#${id}`);
});

// Event Listeners
document.querySelector('#search-text').addEventListener('input', e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#filter-by-select').addEventListener('change', e => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

// check for any localStorage updates
window.addEventListener('storage', e => {
  notes = JSON.parse(e.newValue);
  saveNotes(notes);
  renderNotes(notes, filters);
});
```

## Before `notes-edit.js`
```
const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note-button');
const dateElement = document.querySelector('#last-edited');
let notes = getSavedNotes();
const hash = location.hash;
const noteId = hash.substring(1);
let note = notes.find(function(note) {
  return note.id === noteId;
});

if (note === undefined) {
  location.assign('/index.html');
}

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener('change', function(e) {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener('change', function(e) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

// remove note button
removeElement.addEventListener('click', function() {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
});

window.addEventListener('storage', function(e) {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);

    let note = notes.find(function(note) {
      return note.id === noteId;
    });

    if (note === undefined) {
      location.assign('/index.html');
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});
```

## After `notes-edit.js`
```
const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note-button');
const dateElement = document.querySelector('#last-edited');
let notes = getSavedNotes();
const hash = location.hash;
const noteId = hash.substring(1);
let note = notes.find(note => {
  return note.id === noteId;
});

if (note === undefined) {
  location.assign('/index.html');
}

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener('change', e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener('change', function(e) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

// remove note button
removeElement.addEventListener('click', () => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
});

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);

    let note = notes.find(note => note.id === noteId);

    if (note === undefined) {
      location.assign('/index.html');
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});
```

## Todos
### Before `todos-app.js`
```
let todos = getSavedTodos();

// filters object
const filters = {
  searchText: '',
  hideCompleted: false,
};

// render todos on initial load
renderTodos(todos, filters);

// listen for new todo searches
document
  .querySelector('#todo-search-text')
  .addEventListener('input', function(e) {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
  });

// todo form submit listener
document
  .querySelector('#new-todo-form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    todos.push({
      id: uuidv4(),
      text: e.target.elements.text.value,
      completed: false,
    });
    saveTodos(todos);
    // store in localStorage
    renderTodos(todos, filters);
    e.target.elements.text.value = '';
  });

// hide completed todos
document
  .querySelector('#hide-completed-checkbox')
  .addEventListener('change', function(e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
  });
```

## After `todos-app.js`
```
let todos = getSavedTodos();

// filters object
const filters = {
  searchText: '',
  hideCompleted: false,
};

// render todos on initial load
renderTodos(todos, filters);

// listen for new todo searches
document.querySelector('#todo-search-text').addEventListener('input', e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

// todo form submit listener
document.querySelector('#new-todo-form').addEventListener('submit', e => {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.text.value,
    completed: false,
  });
  saveTodos(todos);
  // store in localStorage
  renderTodos(todos, filters);
  e.target.elements.text.value = '';
});

// hide completed todos
document
  .querySelector('#hide-completed-checkbox')
  .addEventListener('change', e => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
  });
```

## Before `todos-functions.js`
```
// fetch existing todos from localStorage
const getSavedTodos = function() {
  // Grab any todos from localStorage
  const todosJSON = localStorage.getItem('todos');

  if (todosJSON !== null) {
    // if there is something in todosJSON
    // Grab the string and turn it back into an object
    return JSON.parse(todosJSON);
  } else {
    // If there is nothing in localStorage under 'notes' return an empty array
    return [];
  }
};

// Save todos to localStorage
const saveTodos = function(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Render Todos to browser
const renderTodos = function(todos, filters) {
  // filter todos to find matches to search
  let filteredTodos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  filteredTodos = todos.filter(function(todo) {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const hideCompletedTodos = filteredTodos.filter(function(todo) {
    // if hideCompleted is false show all
    // else show only incomplete
    return filters.hideCompleted;
  });

  // find out how many todos still need to be completed
  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  // clear before each new render
  document.querySelector('#todos').innerHTML = '';
  document
    .querySelector('#todos')
    .appendChild(generateSummaryDOM(incompleteTodos));

  // iterate through incomplete todos
  filteredTodos.forEach(function(todo) {
    // const p = generateTodoDOM(todo);
    document.querySelector('#todos').appendChild(generateTodoDOM(todo));
  });
};

const removeTodo = function(id) {
  // find a match of the id argument and the todo id
  const todoIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// toggle the completed value for a given todo
const toggleTodo = function(id) {
  const todo = todos.find(function(todo) {
    return todo.id === id;
  });
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

const generateTodoDOM = function(todo) {
  // create checkbox, text  and button
  const todoEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // make input a checkbox
  checkbox.setAttribute('type', 'checkbox');
  // check checkbox is todo completed
  checkbox.checked = todo.completed;
  // add checkbox to DOM
  todoEl.appendChild(checkbox);

  // listen for checkbox getting checked
  checkbox.addEventListener('change', function() {
    // console.log('checked');
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  // add text inside todo
  todoText.textContent = todo.text;
  // attach the text to the DOM
  todoEl.appendChild(todoText);
  // add X text for delete button
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

const generateSummaryDOM = function(incompleteTodos) {
  const summary = document.createElement('h2');
  // Give h1 content
  summary.textContent = `You have ${incompleteTodos.length} todos left to complete`;
  return summary;
};
```

## After `todos-functions.js`
```
// fetch existing todos from localStorage
const getSavedTodos = () => {
  // Grab any todos from localStorage
  const todosJSON = localStorage.getItem('todos');

  if (todosJSON !== null) {
    // if there is something in todosJSON
    // Grab the string and turn it back into an object
    return JSON.parse(todosJSON);
  } else {
    // If there is nothing in localStorage under 'notes' return an empty array
    return [];
  }
};

// Save todos to localStorage
const saveTodos = todos => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Render Todos to browser
const renderTodos = (todos, filters) => {
  // filter todos to find matches to search
  let filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  filteredTodos = todos.filter(todo => {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const hideCompletedTodos = filteredTodos.filter(
    todo => filters.hideCompleted
  );

  // find out how many todos still need to be completed
  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  // clear before each new render
  document.querySelector('#todos').innerHTML = '';
  document
    .querySelector('#todos')
    .appendChild(generateSummaryDOM(incompleteTodos));

  // iterate through incomplete todos
  filteredTodos.forEach(todo => {
    // const p = generateTodoDOM(todo);
    document.querySelector('#todos').appendChild(generateTodoDOM(todo));
  });
};

const removeTodo = id => {
  // find a match of the id argument and the todo id
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// toggle the completed value for a given todo
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

const generateTodoDOM = todo => {
  // create checkbox, text  and button
  const todoEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // make input a checkbox
  checkbox.setAttribute('type', 'checkbox');
  // check checkbox is todo completed
  checkbox.checked = todo.completed;
  // add checkbox to DOM
  todoEl.appendChild(checkbox);

  // listen for checkbox getting checked
  checkbox.addEventListener('change', () => {
    // console.log('checked');
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  // add text inside todo
  todoText.textContent = todo.text;
  // attach the text to the DOM
  todoEl.appendChild(todoText);
  // add X text for delete button
  removeButton.textContent = 'x';
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  // Attach button to DOM
  todoEl.appendChild(removeButton);
  // return the created DOM stuff
  return todoEl;
};

const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement('h2');
  // Give h1 content
  summary.textContent = `You have ${incompleteTodos.length} todos left to complete`;
  return summary;
};
```

