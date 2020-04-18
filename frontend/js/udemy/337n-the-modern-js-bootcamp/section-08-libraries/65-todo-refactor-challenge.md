# Todo Refactor Challenge
## Steps
1. Fetch existing todos from localStorage (getSavedTodos)
2. Save todos to localStorage (saveTodos)
3. Render app todos based on filters (renderTodos)
4. Get the DOM elements for an individual todo (generateTodoDOM)
5. Get the DOM elements for list summary (generateSummaryDOM)

`todos-functions.js`

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

const generateTodoDOM = function(todo) {
  // create a p element
  const p = document.createElement('p');
  // Provide the content for the todo based on the todo object
  p.textContent = todo.text;
  return p;
};

const generateSummaryDOM = function(incompleteTodos) {
  const summary = document.createElement('h2');
  // Give h1 content
  summary.textContent = `You have ${incompleteTodos.length} todos left to complete`;
  return summary;
};
```

`todos-app.js`

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

`index.html`

```
// MORE CODE
    <script src="assets/js/todos-functions.js"></script>
    <script src="assets/js/todos-app.js"></script>
  </body>
</html>
```
