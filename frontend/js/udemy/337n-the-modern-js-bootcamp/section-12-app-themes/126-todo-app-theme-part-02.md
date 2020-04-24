# Todo Add theme (part 2)
## Challenge
`todo-app.js`

### What does this code do?
1. It listens for a form submission
2. It creates a new todo
3. It makes sure to save and render the updated list of todos

```
// MORE CODE

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    todos.push({
        id: uuidv4(),
        text: e.target.elements.text.value,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.text.value = ''
})

// MORE CODE
```

## Houston we have a problem!
* We can currently add empty todos

1. Get a trimmed version of the input
2. Only add a new todo if it has content

## Challenge Solution
`todo-app.js`

```
// MORE CODE

document.querySelector('#new-todo').addEventListener('submit', (e) => {
  let text = e.target.elements.text.value.trim();
  e.preventDefault();

  if (text.length > 0) {
    alert('please enter a note before submitting');
  } else {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.text.value = '';
  }
});

// MORE CODE
```

## Let's work on the DOM generator code
* This creates each todo and shows it on the UI

`todo-functions.js`

```
// MORE CODE

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Setup the todo text
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    // Setup the remove button
    removeButton.textContent = 'x'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// MORE CODE
```

* We'll change our root `div` to be a `label` (This will allow us to click anywhere in the box instead of trying to get our mouse inside the checkbox)
* We'll place checkbox on left hand side and push the remove button off to the righthand side

`todo-functions.js`

```
// MORE CODE

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkbox = document.createElement('input')

// MORE CODE
```

* We want to put the checkbox and the text inside the new container (div) we just created

`todo-functions.js`

```
// MORE CODE

  // Setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setup the remove button
  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// MORE CODE
```

![styled todo item](https://i.imgur.com/EAzPv8T.png)

* Now the entire label makes this item clickable which is a much better UI

## DOM structure we just created
![dom structure](https://i.imgur.com/Yik9SVV.png0)

## Complete function
`todo-functions.js`

```
// MORE CODE

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // Setup todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setup the remove button
  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// MORE CODE
```

## Challenge
`todo-functions.js`

```
// MORE CODE

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
```

1. Add "list-title" class
2. Pluralize (todos) unless you only have one (todo)

## Challenge Solution
`todo-functions.js`

```
// MORE CODE
// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  const plural = incompleteTodos.length === 1 ? '' : 's';
  summary.classList.add('list-title');
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
};
```

## Last Challenge
`todo-functions.js`

* This is the code that loops through all of the filtered todos and actually puts them in the DOM
* But what if there are no todos? We want to render an "empty" message like we did for the notes application

```
// MORE CODE

// Render application todos based on filters
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector('#todos').innerHTML = '';
  document
    .querySelector('#todos')
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach((todo) => {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo));
  });
};

// MORE CODE
```

## So we will write some conditional logic to only run this code
* When there are items in the array
* If there are no items in the array, print a message to the screen
`todo-functions.js`

```
// MORE CODE

  filteredTodos.forEach((todo) => {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo));
  });

// MORE CODE
```

## Challenge
1. If todos to show, render them
2. Else, p with class "empty-message" and message "No to-dos to show"

## Challenge Solution
`todo-functions.js`

```
// MORE CODE

  // console.log(filteredTodos.length);
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'No to-dos to show';
    document.querySelector('#todos').appendChild(messageEl);
  }
};

// MORE CODE
```

![no to-dos to show](https://i.imgur.com/E6mXvMc.png)

## Refactor
* If we use a querySelector more than once, store it in a variable

`todo-functions.js`

```
// MORE CODE

// Render application todos based on filters
const renderTodos = (todos, filters) => {
  const todoEl = document.querySelector('#todos');
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  todoEl.innerHTML = '';
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  // console.log(filteredTodos.length);
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'No to-dos to show';
    todoEl.appendChild(messageEl);
  }
};

// MORE CODE
```
