# Todo Filter Challenge
* Try to do this without looking at last app
* Just use MDN documentation if you get stuck (only if you find the challenges so far too easy)

## Challenge Instructions
1. Setup a div container for todos
2. Setup filters (searchText) and wire up a new filter input to change it
3. Create a renderTodos function to render and re-render the latest filtered data

### Part of code working on
* The stuff we want to include in `renderTodos` starts here
    - In this function we'll need to recalculate how many of the visible todos we have left
    - And we need to render the latest data
    - We'll still need to run the calculation based on the initial filters
    - So does the search text match the todos, then out of those, figure out how many are incomplete and continue working through the functionality
    - Don't forget to clear that div before adding any new functionality into it

`script.js`

```
// MORE CODE

// STARTS HERE!
// find out how many todos still need to be completed
const incompleteTodos = todos.filter(function(todo) {
  return !todo.completed;
});

// console.log(incompleteTodos(todos));
// create a new p
const summary = document.createElement("h1");
// add content to the p
summary.textContent = `You have ${incompleteTodos.length} todos left to compete`;
// since I'm using it more than once, store body element in variable
const bodyTag = document.querySelector("body");
// append the p to the body tag
bodyTag.appendChild(summary);

todos.forEach(function(todo) {
  const p = document.createElement("p");
  p.textContent = todo.text;
  document.querySelector("body").appendChild(p);
});
// ENDS HERE!

// MORE CODE
```

## Final Todo Challenge
```
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: false },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: false },
];

// filters object
const filters = {
  searchText: '',
};

// Render Todos to browser
const renderTodos = function(todos, filters) {
  // filter todos to find matches to search
  const filteredTodos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  // find out how many todos still need to be completed
  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  // clear before each new render
  document.querySelector('#todos').innerHTML = '';

  const summary = document.createElement('h2');
  // Give h1 content
  summary.textContent = `You have ${incompleteTodos.length} todos left to complete`;
  // A
  const header = document.querySelector('#todos').appendChild(summary);

  // iterate through incomplete todos
  filteredTodos.forEach(function(todo) {
    // create a p element
    const p = document.createElement('p');
    // Provide the content for the todo based on the todo object
    p.textContent = todo.text;
    // Add each todo to header
    document.querySelector('#todos').appendChild(p);
  });
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
document.querySelector('#add-todo').addEventListener('click', function(e) {
  e.target.textContent = 'You completed the Challenge. Congrats!';
});

document.querySelector('#new-todo').addEventListener('input', function(e) {
  console.log(e.target.value);
});
```
