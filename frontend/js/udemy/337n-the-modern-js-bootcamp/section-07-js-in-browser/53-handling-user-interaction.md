# Handling User Interaction
* We'll run 2 servers at same time
    - Todo App in one browser
    - Notes App in another server
* Just use 2 tabs of your Terminal
    - It will automatically assign it a new port on the 2nd server
    - **note** You can not run 2 apps on same server port number

`$ live-server notes-app`

`$ live-sever todo-app`

## Notes app
* Add a button to your page

### Event Handlers
* There are many events we can listen to

#### What is an event
* Something the user does
    - clicking a button
    - hovering over a paragraph
    - scrolling over the screen
    - lots of other events
* On all of these **events** you can attach `event listeners` to

#### What is an event listener?
* Nothing more than a function to run when the event happens

##### addEventListener(string event name, function to run when that event occurs)

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notes App</title>
  <link rel="shortcut icon" href="#" />
</head>
<body>
  <h1>Notes App</h1>
  <h2>Take notes whenever you want</h2>
  <p>hello again</p>
  <p>one two three</p>
  <p>
  Consectetur quidem minus impedit nulla maiores quam quibusdam. Harum sint quos modi sequi repellat. Magni nulla similique impedit laboriosam deserunt? Itaque aut tenetur mollitia ratione voluptatum exercitationem atque dolorum? At.
</p>
<button>Create Note</button>
  <script src="assets/js/script.js">
  </script>
</body>
</html>
```

`script.js`

```
const notes = [
  {
    title: "Go to gym",
    body: "Work out shoulders"
  },
  {
    title: "Go to gym",
    body: "work out arms"
  },
  {
    title: "Go to school",
    body: "Teach a good class"
  },
  {
    title: "do homework",
    body: "Write lots of JavaScript"
  }
];

document.querySelector("button").addEventListener("click", function() {
  console.log("Did this work");
});
```

## Try it out
* Click button and see the `Did this work` in the browser console
* Click anywhere else on the page and the event will not be triggered
* In the browser each time you click the button the log will just stack with the number of times you clicked on the button and the log will be that n number of times clicked beside it

## addEventListener event
* [docs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* **note** If you see this:

```
target.addEventListener(type, listener [, options]);
```

* The square brackets means "optional"
* For now we'll ignore all optional arguments and just focus on the required ones (any items not in square brackets are required)
    - type
    - listener

### Event types
* [docs](https://developer.mozilla.org/en-US/docs/Web/Events)
* Lists all of the event types, narrow down to each event and see docs just for that event type

### An argument that is passed to your callback function
* Whenever you are listening for an event you get access to an argument inside your callback function
* `event` or `e` is an object that represents that event and give you info about that event, what event happened and why
    - `e` isn't a great name for this variable but it is so common we'll use it
* This is very useful

`script.js`

```
// MORE CODE

document.querySelector("button").addEventListener("click", function(e) {
  console.log("Did this work");
  console.log(e);
});
```

* Click the button and you will see a ton of info in the browser console
* Most of the stuff we don't need but there are some useful things like `target`

`e.target`

* If you log out e.target you will get `<button>Create Note</button>`

### Change text of button using the DOM and e.target
```
 // MORE CODE

document.querySelector("button").addEventListener("click", function(e) {
  e.target.textContent =
    "You just clicked the button! and I changed the button text when you did this!";
});
```

* Click the button and watch the text change

## Challenge
* Add a new button to the todo markup
* The text on button should say `Add Todo`
* Add a listener to that button
* When the button is clicked log test that says "I'm adding a new todo"

`index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo App</title>
  </head>
  <body>
    <h1>Todo App</h1>
    <button>Add Todo</button>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

`script.js`

```
addTodoBtn = document.querySelector("button");
addTodoBtn.addEventListener("click", function(e) {
  e.target.textContent = "I just added a todo";
});
```

* Click button and the Text will change to `I just added a todo`
* **Note** If you don't use `e` you don't need to include it as an argument

## Grabbing a unique element
`index.html`

* Now we have 2 buttons

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo App</title>
  </head>
  <body>
    <h1>Todo App</h1>
    <button>Add Todo</button>
    <button>Another Todo</button>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

* What if we have 2 buttons on a page?
    - Then `document.querySelector('button')` will only grab the first element
    - This is a problem
    - We need a way of uniquely identifying elements to make sure we only grab the element we want
* Try it and when you click, the button text only works for the 1st button, the event does not fire on the second button

## We could use querySelectorAll()
* That would grab all of the elements and put them in a collection (similar to an array) and we could grab the 2nd element and do something with it using JavaScript when it is clicked

`script.js`

```
// MORE CODE

// grab all buttons
const allBtns = document.querySelectorAll("button");
allBtns[1].addEventListener("click", function(e) {
  e.target.textContent = "Second button clicked";
});

// MORE CODE
```

* That will grab the second button and change the text when it is clicked

## Houston we have a problem
* What if we change the order of our buttons, then our code will work differently
* We have a close coupling of our HTML structure and the JavaScript selector code

## A better way using `getElementById()`
* Give the element an `id`
* `id` is perfect because every `id` should be unique

`index.html`

```
// MORE CODE

  <body>
    <h1>Todo App</h1>
    <button>Add Todo</button>
    <button id="otherBtn">Another Todo</button>
    <script src="assets/js/script.js"></script>
  </body>
// MORE CODE
```

## Naming id's
* We used camel case for our `otherBtn`
* But it is a common convention to use hyphens for `id` and `class` names
* **note** You can not use spaces

### Changing to hypen names
```
// MORE CODE

  <body>
    <h1>Todo App</h1>
    <button>Add Todo</button>
    <button id="other-btn">Another Todo</button>
    <script src="assets/js/script.js"></script>
  </body>
// MORE CODE
```

`script.js`

```
// MORE CODE

// grab unique button
document.getElementById("other-btn").addEventListener("dblclick", function(e) {
  e.target.textContent = "using getElementById() here!";
});
// MORE CODE
```

* Now if you click once you will see the text change on the button
* But if you double click you will see it change to different text

## An even better way
* We can use `querySelector` and for `id` we use `#` and for class we'll use `.`

### Clean up our html
`index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo App</title>
  </head>
  <body>
    <h1>Todo App</h1>
    <button id="create-btn">Create Todo</button>
    <button id="delete-btn">Delete All Todos</button>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

* We'll have a `Create Note` button and `Delete all notes` button

`script.js`

```
const todos = [
  { text: "Lift weights", completed: true },
  { text: "Pay Rent", completed: false },
  { text: "Do Laundry", completed: true },
  { text: "Code JavaScript", completed: false },
  { text: "Run", completed: false }
];

document.querySelector("#create-btn").addEventListener("click", function() {
  console.log("create a todo");
});

document.querySelector("#delete-btn").addEventListener("click", function() {
  console.log("delete a todo");
});
```

* Now click buttons and you see logs for creating and deleting todos
* **note** Now we can switch the order and our buttons will not alter the behavior we programmed

## Now let's add `class` to our HTML markup elements
* `id`s should be unique to each HTML page
* `class` on the other hand can be shared across multiple elements

### The class attribute
`<p class="note">bla bla bla</p>`

* **note** You can add multiple classes to an element

`<p class="note fun dance">bla bla bla</p>`

### Now we can give specific paragraphs a class of `note`
* Then we can use the `DOM` to target them to remove them all when clicked

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
    <p class="note">This is my first note</p>
    <p class="note">This is my second note</p>
    <p>
      Consectetur quidem minus impedit nulla maiores quam quibusdam. Harum sint
      quos modi sequi repellat. Magni nulla similique impedit laboriosam
      deserunt? Itaque aut tenetur mollitia ratione voluptatum exercitationem
      atque dolorum? At.
    </p>
    <button id="create-note">Create Note</button>
    <button id="remove-all-notes">Remove All Notes</button>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

`script.js`

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
  // grab the remove all notes button
  .querySelector('#remove-all-notes')
  // listen for a click on that button
  .addEventListener('click', function(e) {
    // remove all buttons
    // grab all elements with a class of note
    const allNotes = document.querySelectorAll('.note');
    // loop through the array of notes
    allNotes.forEach(function(note) {
      // remove each note
      note.remove();
    });
  });

document
  .querySelector('#remove-all-notes')
  .addEventListener('dblclick', function(e) {
    e.target.textContent = 'Remove All Notes';
  });
```

* **tip** `querySelectorAll()` is usually used with `class` because we are trying to grab multiple items
    - `querySelector()` is usually used with `id` because we just want one item

### **important** Don't forget the dot!
* When searching for elements with class use:

`document.querySelectorAll('.note')`

* Click the remove all button and all the paragraphs (with the `note` class` and their content are removed

## Good news
* If you are familiar with CSS this should be old news for you
    - '.' is how we target `class`es
    - '#' is how we target `id`s
    - We use the exact same pattern in querySelector and querySelectorAll

### Some more examples
* Single
    - **p** (we target everything that has a p tag)
    - **#replace** (we target elements that have an id of `replace`)
    - **.item** (we target all elements that have a class of `item`)

### We can chain multiple things together
* **p#order** (we can target a paragraph if it has an id of `order`)
* **button.inventory** (we can target a button if it has a class of inventory)
* **h1#title.application** (we can target an h1 that has an id of title and a class of application)
* **h1.application#title** (we can target an h1 that has a class of application and an id of title)
* **note** For multiple selectors the tag name needs to come first
    - `.application#titleh1` would obviously not make sense

## Challenge
* In todo-app
* Add an id to a button
* Write JavaScript to use DOM to do something when button is clicked

`index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo App</title>
  </head>
  <body>
    <h1>Todo App</h1>
    <button id="add-todo">Add Todo</button>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

`script.js`

```
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: false },
];

document.querySelector('#add-todo').addEventListener('click', function(e) {
  e.target.textContent = 'You completed the Challenge. Congrats!';
});
```

* Click the button and it's text changes
