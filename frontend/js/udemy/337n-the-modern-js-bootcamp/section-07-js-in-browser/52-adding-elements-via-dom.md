# Adding Elements via the DOM
* We have an array of object for our todos
* We need to add a todo object to this array using the DOM
    - For the todo we'll need to render a `p` with a description as the content and a checkbox
    - For the note we'll need to render the `title` and the `body`

## Moving to notes app
1. Shut down live-server
2. Move to your notes app in the terminal
3. Run live-server for that app so you can see it in the browser

## Adding DOM content
1. Create this new element

* `document.createElement('p')` will return `<p></p>` and so we store it in its own variable `newPar`

```
// Add a new element
const newPar = document.createElement('p');

```
2. Update the new element's content

* **note** `textContent` is a read or write (get or set) property

```
// Add a new element
const newPar = document.createElement('p');
// Add content to this new element
newPar.textContent = 'A new Note'; // add this line
```

3. Put it somewhere (attach to the document)

* To append new content you need to designate what you will be appending it to
* We'll append it to the `body` tag
* We use the querySelector to "grab" the body element
* We use `appendChild()` to designate what we are appending to body
* If you inspect the page with the web tools you'll see `A new Note` is at the bottom of our list of notes
* **note** But if you view the source of the browser page you won't see it (because the static HTML doesn't change but the DOM (virtual representation of the HTML page) does change)

```
// Add a new element
const newPar = document.createElement('p');
// Add content to this new element
newPar.textContent = 'A new Note';
// Append new element to document
document.querySelector('body').appendChild(newPar); // add this line
```

### Inspect element
![inspect element](https://i.imgur.com/Q6tlRXW.png)

### View Page Source
![view page source](https://i.imgur.com/8lrPA4Z.png)

## Now let's apply that to our notes
* We have an array of notes (each note is an object)
* When we save a note in this structure and when we add a new we'll require 2 arguments, `title` and `body` of that note
* We'll move the array of notes to the top of our notes' `script.js`

`notes-app/assets/js/script.js`

```
const notes = [
  {
    title: 'Go to gym',
    body: 'Work out shoulders',
  },
  {
    title: 'Go to gym',
    body: 'work out arms',
  },
  {
    title: 'Go to school',
    body: 'Teach a good class',
  },
  {
    title: 'do homework',
    body: 'Write lots of JavaScript',
  },
];

// DOM - Document Object Model
const pTags = document.querySelectorAll('p');

pTags.forEach(function(p, index) {
  p.textContent = `hello ${index} paragraph`;
});

// Add a new element
const newPar = document.createElement('p');
// Add content to this new element
newPar.textContent = 'A new Note';
// Append new element to document
document.querySelector('body').appendChild(newPar);
```

## Do the same thing for the todo app
`todo-app/assets/js/script.js`

```
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: true },
];

const paragraphs = document.querySelectorAll('p');

paragraphs.forEach(function(paragraph) {
  if (paragraph.textContent.includes('the')) {
    paragraph.remove();
  }
});
```

## Challenge
* Start from this code in your todo app

`todo-app/index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo App</title>
</head>
<body>
<h1>Todo App</h1>  
<script src="assets/js/script.js"></script>
</body>
</html>
```

`todo-app/assets/js/script.js`

```
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: true },
];
```

### Challenge Instructions
1. Add a paragraph that will say "You have 2 todos left" and append that to the document
2. Print a p for each todo above (use the text value of the todo object as the content for the p tag)

### Challenge Solution
* You need to switch live-server to the todo app (You should know how to do this by now)
* **notes**
    - Don't forget to filter to find out how many todos are left (completed: false)
    - Don't forget when you call the function with the filter to pass it the todos array

### Solution
* Filtering the incomplete todos
* If this was your solution:

```
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: false },
];

// find out how many todos still need to be completed
const incompleteTodos = function(todos) {
  return todos.filter(function(todo) {
    return !todo.completed;
  });
};

const numTodosToComplete = incompleteTodos(todos).length;

// console.log(incompleteTodos(todos));
// create a new p
const todoMessagePar = document.createElement('p');
// add content to the p
todoMessagePar.textContent = `You have ${numTodosToComplete} todos left to compete`;
// since I'm using it more than once, store body element in variable
const bodyTag = document.querySelector('body');
// append the p to the body tag
bodyTag.appendChild(todoMessagePar);
```

* My filter could be shorter so this:

```
// find out how many todos still need to be completed
const incompleteTodos = function(todos) {
  return todos.filter(function(todo) {
    return !todo.completed;
  });
};
```

* Could become this:

```
// find out how many todos still need to be completed
const incompleteTodos = todos.filter(function (todo) {
    return !todo.completed;
};
```

* So I'm not storing a function inside my variable but just an array of all objects with `completed` property value of `false`
* I use a better variable name `summary`
* I just append the length property onto the incompleteTodos to get the dynamic length of incomplete todos

```
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: false },
];

// find out how many todos still need to be completed
const incompleteTodos = todos.filter(function(todo) {
  return !todo.completed;
});

// console.log(incompleteTodos(todos));
// create a new p
const summary = document.createElement('h1');
// add content to the p
summary.textContent = `You have ${incompleteTodos.length} todos left to compete`;
// since I'm using it more than once, store body element in variable
const bodyTag = document.querySelector('body');
// append the p to the body tag
bodyTag.appendChild(summary);
```

## Output
* Should show you how many todos are left
* Change some values of completed for the objects and watch it dynamically update!

## Improving on outputting the todos
```
todos.forEach(function(todo) {
  const p = document.createElement('p');
  p.textContent = todo.text;
  document.querySelector('body').appendChild(p);
});
```

* We can use `const` because the `p` is new for each iteration and won't cause a conflict where we would have to use `let`
* We are writing out the querySelector for body but the code seems cleaner and easier to read

## Final code for Challenge
```
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: false },
];

// find out how many todos still need to be completed
const incompleteTodos = todos.filter(function(todo) {
  return !todo.completed;
});

// create a new p
const summary = document.createElement('h1');
// add content to the p
summary.textContent = `You have ${incompleteTodos.length} todos left to compete`;
// since I'm using it more than once, store body element in variable
const bodyTag = document.querySelector('body');
// append the p to the body tag
bodyTag.appendChild(summary);

todos.forEach(function(todo) {
  const p = document.createElement('p');
  p.textContent = todo.text;
  document.querySelector('body').appendChild(p);
});
```

## Next
* Do something in JavaScript when someone interacts with the browser
    - Like do something when someone clicks a button
