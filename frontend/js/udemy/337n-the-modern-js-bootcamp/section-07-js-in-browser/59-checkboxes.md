# Checkboxes
* We need to add in things that are true or false
    - example:
        + Do we want to show completed todo's or not? (have a checkbox just for that)

## Let's Explore how the checkbox works
* Work on notes app
* Remove form, we don't need it now (we'll add it back later in a separate page)
    - Since we remove the form we also need to remove it's event listener in script.js

## Render a checkbox to the browser
`index.html`

```
// MORE CODE
    <button id="create-note">Create Note</button>
    <input type="checkbox" />
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

* View the brower and you'll see the checkbox (you can check and uncheck it)
* We have a placeholder for input but not for checkboxes so we definitely want to add a label letting the user know what the checkbox is for (this is also important for accessibility)

## The label html tag
* You wrap this around your checkbox
* We can put our text for the label either before or after (for checkbox it typically comes after)
* To associate the label with the checkbox we give the checkbox and `id` and match that `id` value to the `for` value of the `label`
* **tip** Adding the label makes the entire text clickable to check the checkbox, this is an improvement in UX and accessibility

`index.html`

```
// MORE CODE
    <label for="notes-checkbox">
      <input id="notes-checkbox" type="checkbox" /> Check me for fun
    </label>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

## We can add labels to all inputs
```
// MORE CODE

  <body>
    <h1>Notes App</h1>
    <h2>Take notes whenever you want</h2>
    <label for="search-text">
    Search: <input id="search-text" placeholder="Search Notes" type="text" />
    </label>
    
    <div id="notes"></div>

// MORE CODE
```

* We won't use this label here but it is shown just for clarity

## Adding event listener for checkbox
```
// MORE CODE

document
  .querySelector('#note-checkbox')
  .addEventListener('change', function(e) {
    console.log(e);
  });

// MORE CODE
```

* ![shows the checked property](https://i.imgur.com/k88JsJO.png)
    - The checked property is true or false

### Get value from checked or not checked
```
// MORE CODE

document
  .querySelector('#note-checkbox')
  .addEventListener('change', function(e) {
    console.log(e.target.checked);
  });

// MORE CODE
```

* Check and you'll see `true` in client console
* Uncheck and you'll see `false` in client console
* We will eventually use the checkbox in our todos app to hide or show the completed todos

## Challenge
* Todo app

### Steps
1. Create a checkbox and setup event listener with text "Hide completed"
    * It will be unchecked by default
2. Create new `hideCompleted` filter (default to false)
    * This new filter will be along side our search text filter
        - The searchText filter has a default value of an empty string
        - The default value for `hideCompleted` with be the Boolean value of false (so by default the checkbox is unchecked and our filter is false - under those situations we should expect all our todos to show up)
3. Update `hideCompleted` and rerender list on checkbox change
    * When someone checks or unchecks the `hide-completed-checkbox` checkbox we want to update `hideCompleted` based on what we just learned and we want to rerender that list (just like we re-rendered the list like with our our `searchText` input)
4. Setup `renderTodos` to remove completed item
    * All of our changes above will never show up unless we make a modification to our `renderTodos` function
    * In `renderTodos`, you'll need to take the `hideCompleted` filter into account, if its **true** than we don't want to show todos that are completed, if it is **false** then we want to show everything,
        - This means we'll need to make another filter call in `filteredTodos` which will manipulate our `filteredTodos` array

### Solution from step 1 to 3
* This part was fairly simple

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
  hideCompleted: false,
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

  const hideCompletedTodos = filteredTodos.filter(function(todo) {
    // if hideCompleted is false show all
    // else show only incomplete
    return filters.hideCompleted;
  });
  console.log(hideCompletedTodos);

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

// todo form submit listener
document
  .querySelector('#new-todo-form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    todos.push({
      text: e.target.elements.text.value,
      completed: false,
    });
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

### Step 4 was the hardest
* Lots of ways to solve this

#### One step take the filtered array and whittle it down further
* If we alter an array we need to change const to `let`

```
// MORE CODE

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

// MORE CODE
```

* We use let and filter down our filteredTodos one more time
* This time we check if our hideCompleted checkbox was checked
* If it was we return all todos that are not complete
* If it is not checked we want to return all todos and so in our else we just return `true`

## Test and it will work and we now have multiple ways to filter our data

## Here is a more efficient solution
```
// MORE CODE

  filteredTodos = todos.filter(function(todo) {
    // if (filters.hideCompleted) {
    //   return !todo.completed;
    // } else {
    //   return true;
    // }
    return !filters.hideCompleted || !todo.completed;
  });

// MORE CODE
```

## Even more efficient
* This is a solution many experienced developers would choose

```
// MORE CODE

// Render Todos to browser
const renderTodos = function(todos, filters) {
  // filter todos to find matches to search
  const filteredTodos = todos.filter(function(todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

// MORE CODE
```




