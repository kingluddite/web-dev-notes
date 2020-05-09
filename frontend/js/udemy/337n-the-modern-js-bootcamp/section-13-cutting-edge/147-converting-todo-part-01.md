# Converting Todo (part 01)
## filters.js
```
// Set up filters default object
const filters = {
  searchText: '',
  hideCompleted: false,
}

// MORE CODE
```

* Make sure you start `hideCompleted` initially with a value of false
    - So by default we'll show both not done and done todos

`filters.js`

```
// Set up filters default object
const filters = {
  searchText: '',
  hideCompleted: false,
}

// expose a function to get the filters
// getFilters
// Arguments: none
// Return value: filters object
const getFilters = () => filters

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = updates => {
  // if (_isString(updates.searchText)) {
  if (typeof updates.searchText === 'string') {
    filters.searchText = updates.searchText
  }

  // if (_isString(updates.hideCompleted)) {
  if (typeof updates.hideCompleted === 'boolean') {
    filters.hideCompleted = updates.hideCompleted
  }
}

// Make sure to set up the exports
export { getFilters, setFilters }
```

## Test filters
`index.js`

```
// Add necessary imports
import { getFilters, setFilters } from './filters'


TEST filters
console.log(getFilters())
setFilters({
  searchText: 'yo',
  hideCompleted: true,
})
console.log(getFilters())

// MORE CODE
```

## Run your app
`$ npm run dev`

* You should see filters
* You adjust filters
* You should see your adjusted filters

`todos.js`

## Some things to think about
* Look at this code:

```
// MORE CODE

const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
 
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}
// MORE CODE
```

* **note** We get notes from localStorage and we return the parsed JSON or an empty array

```
// MORE CODE

const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')
 
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}
// MORE CODE
```

* He we set `todos` to the parsed JSON from localStorage or an empty array

### The first approach
* Is generally assumed to be better, since it clearly returns something instead of mutating (manipulating) a variable in outer scope like the the second function does (which changes the todos variable)
    - So, in order to update notes we have to be more explicit:

`notes = loadNotes()`

* While when updating `todos` we just call:

`loadTodos()`

* Which is less clear (not good)

### Takeaway
* So the first function is more 'pure' than the other one (I'm not sure if it's 100% pure since it depends on something external - `localStorage`, but at least in doesn't change a variable in its outer scope like the second one),  which in **functional programming** is considered a good thing

`todos.js`

```
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

// Setup the empty todos array
let todos = []

// loadTodos
// Arguments: none
const loadTodos = () => {
  // Read existing notes from localStorage
  const todosJSON = localStorage.getItem('todos')

  try {
    todos = todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    todos = []
  }
  // Return value: none
}

// getTodos
// Arguments: none
// Return value: todos array
// Expose todos from module
const getTodos = () => todos

// set todos to what's in localStorage or if empty keep array empty
// todos = loadTodos()
loadTodos()

// Save the todos to localStorage
// Arguments: none
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos))

  // Return value: none
}

// createTodo
// Arguments: todo text
const createTodo = text => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  todos.push({
    id: uuidv4(),
    text,
    completed: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  })
  saveTodos(todos)

  // Return value: none
}

// Remove todo by id
// Arguments: id of todo to remove
const removeTodo = id => {
  // search all todos to find an id that matches
  const todoIndex = todos.findIndex(todo => todo.id === id)

  // if you find a match
  if (todoIndex > -1) {
    // remove that todo from the todos array
    todos.splice(todoIndex, 1)
    savedTodos()
  }
  // Return value: none
}

// toggleTodo
// Arguments: id of todo to toggle
// Toggle the completed value for a given todo
const toggleTodo = id => {
  // search the todos array to find a match by id
  const todo = todos.find(todo => todo.id === id)

  // if you find a match
  if (todo) {
    // toggle the completed boolean value
    todo.completed = !todo.completed
    saveTodos()
  }
  // Return value: none
}

// Make sure to call loadTodos and setup the exports
export { loadTodos, getTodos, saveTodos, createTodo, removeTodo, toggleTodo }
```

`views.js`

```
import { getFilters } from './filters'
import { getTodos, removeTodo, saveTodos, toggleTodo } from './todos'

// renderTodos
// Arguments: none
// Render application todos based on filters
const renderTodos = () => {
  // grab #todos element
  const todoEl = document.querySelector('#todos')
  // grab all filters
  const filters = getFilters()
  // look through all todos
  // we grab all the todos
  const filteredTodos = getTodos().filter(todo => {
    // make todo text lower case
    const searchTextMatch = todo.text
      .toLowerCase()
      // make filters lower case and see if the filter matches
      .includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
  })

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed)

  todoEl.innerHTML = '' // empty the todoEl contents
  todoEl.appendChild(generateSummaryDOM(incompleteTodos))

  // do we have any todos?
  if (filteredTodos.length > 0) {
    // generate UI for each todo
    filteredTodos.forEach(todo => {
      todoEl.appendChild(generateTodoDOM(todo))
    })
  } else {
    // no todos so let end user know
    const messageEl = document.createElement('p')
    messageEl.classList.add('empty-message')
    messageEl.textContent = 'There are no to-dos to show'
    todoEl.appendChild(messageEl)
  }

  // Return value: none
}

// generateTodoDOM
// Arguments: todo
const generateTodoDOM = todo => {
  // Get the DOM elements for an individual note
  const todoEl = document.createElement('label')
  const containerEl = document.createElement('div')
  const checkbox = document.createElement('input')
  const todoText = document.createElement('span')
  const removeButton = document.createElement('button')

  // Setup todo checkbox
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = todo.completed
  containerEl.appendChild(checkbox)
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id)
  })

  // Setup the todo text
  todoText.textContent = todo.text
  containerEl.appendChild(todoText)

  // Setup container
  todoEl.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  todoEl.appendChild(containerEl)

  // Setup the remove button
  removeButton.textContent = 'remove'
  removeButton.classList.add('button', 'button--text')
  todoEl.appendChild(removeButton)
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id)
    renderTodos()
  })

  // Return value: the todo element
  return todoEl
}

// Get the DOM elements for list summary
// Arguments: incompletedTodos
const generateSummaryDOM = incompleteTodos => {
  // grab the h2
  const summary = document.createElement('h2')
  // pluralize if necessary
  const plural = incompleteTodos.length === 1 ? '' : 's'
  // add class for style
  summary.classList.add('list-title')
  // pupulate with pluralized message
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`

  // Return value: the summary element
  return summary
}

// Make sure to set up the exports
export { generateSummaryDOM, generateTodoDOM, renderTodos }
```

`index.js`

```
import reset from './assets/scss/reset.scss'
import css from './assets/scss/index.scss'

// Add necessary imports
import { getFilters, setFilters, getTodos } from './filters'
import { loadTodos, createTodo, removeTodo, toggleTodo } from './todos'
import { renderTodos } from './views'

console.log('Hello from webpack!')

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-text').addEventListener('input', e => {
  setFilters({
    searchText: e.target.value,
  })
  renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide-completed').addEventListener('change', e => {
  // filters.hideCompleted = e.target.checked;
  setFilters({
    hideCompleted: e.target.checked,
  })
  renderTodos()
})

// Set up form submission handler
document.querySelector('#new-todo').addEventListener('submit', e => {
  e.preventDefault()
  // grab the text from the form field
  // debugger
  let text = e.target.elements.text.value.trim()

  // check for at least one character submitted in form field
  if (text.length > 0) {
    // create a todo and pass it the user text
    createTodo(text)
    // render todos
    renderTodos()
    // clear form
    e.target.elements.text.value = ''
  } else {
    // alert('please enter a note before submitting')
  }
})
// Bonus: Add a watcher for local storage
window.addEventListener('storage', e => {
  if (e.key === 'todos') {
    loadTodos()
    renderTodos()
  }
})
```

* The app should work
* The changes should sync in different tabs (thanks to bonus)
