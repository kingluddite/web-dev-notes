# Complex DOM rendering
* Notes app
* We'll add a button to delete notes
* We just go into the `generateNoteDOM`

```
// MORE CODE

// Generate DOM structure for a Note
const generateNoteDOM = function(note) {
  const noteEl = document.createElement('p');
  const button = document.createElement('button');

  // x to click to delete note
  button.textContent = 'x';

  if (note.title.length > 0) {
    noteEl.textContent = note.title;
  } else {
    noteEl.textContent = 'Unnamed Note';
  }

  noteEl.appendChild(button);
  return noteEl;
};

// MORE CODE
```

* Add notes and you'll see the button with an `x` appear on the right

## Placing DOM stuff we create
* We want the delete button to come first
* We can't just move our `noteEl.textContent`

```
// MORE CODE

// Generate DOM structure for a Note
const generateNoteDOM = function(note) {
  const noteEl = document.createElement('div');
  const textEl = document.createElement('p');
  const button = document.createElement('button');

  // x to click to delete note
  button.textContent = 'x';
  noteEl.appendChild(textEl);

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = 'Unnamed Note';
  }

  noteEl.appendChild(button);
  return noteEl;
};

// MORE CODE
```

* The paragraph tag comes with a new line so to remove that new line we'll use a `span` HTML tag instead

```
// MORE CODE

// Generate DOM structure for a Note
const generateNoteDOM = function(note) {
  const noteEl = document.createElement('div');
  const textEl = document.createElement('span');
  const button = document.createElement('button');

// MORE CODE
```

* Now everything is back on one line

## If you get confused with DOM
* Use the browser's inspect tab to see how the HTML was constructed with your DOM manipulation

![inspect DOM creation](https://i.imgur.com/LrRLJnc.png)

## Challenge
* Todos
* Modify `generateTodoDOM` function
* Add a checkbox before todo item
* And a button to remove todo after

`todos-functions.js`

```
// MORE CODE

const generateTodoDOM = function(todo) {
  // create checkbox, text  and button
  const todoEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // make input a checkbox
  checkbox.setAttribute('type', 'checkbox');
  // add checkbox to DOM
  todoEl.appendChild(checkbox);

  // add text inside todo
  todoText.textContent = todo.text;
  // attach the text to the DOM
  todoEl.appendChild(todoText);
  // add X text for delete button
  removeButton.textContent = 'x';
  // Attach button to DOM
  todoEl.appendChild(removeButton);
  // return the created DOM stuff
  return todoEl;
};

// MORE CODE
```

![app rendered with complex DOM structure](https://i.imgur.com/QSBbY92.png)
