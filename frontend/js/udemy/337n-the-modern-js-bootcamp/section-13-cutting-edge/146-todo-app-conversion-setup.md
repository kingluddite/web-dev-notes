# Todo app conversion setup
## Challenge Instructions
`src/filters.js`

```
// Set up filters default object

// getFilters
// Arguments: none
// Return value: filters object

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none

// Make sure to set up the exports

```

`src/index.js`

```
// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage

```

`todos.js`

```
// Setup the empty todos array

// loadTodos
// Arguments: none
// Return value: none

// saveTodos
// Arguments: none
// Return value: none

// getTodos
// Arguments: none
// Return value: todos array

// createTodo
// Arguments: todo text
// Return value: none

// removeTodo
// Arguments: id of todo to remove
// Return value: none

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none

// Make sure to call loadTodos and setup the exports

```

`views.js`

```
// renderTodos
// Arguments: none
// Return value: none

// generateTodoDOM
// Arguments: todo
// Return value: the todo element

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

// Make sure to set up the exports

```

## Format styles
`main.css`

```
/*

// Colors
$off-black: #20222b;
$dark-blue: #333745;
$blue: #3c4251;
$light-blue: #464b5e;
$off-white: #a5afd7;
$purple: #8357c5;
// Spacing
$s-size: 1.2rem;
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;
$desktop-breakpoint: 45rem;

*/

/* box sizing rules - https://css-tricks.com/box-sizing/ */

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

*,
*::before *::after {
  box-sizing: inherit;
}

body {
  background: #2b292e;
  color: #fafafa;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
}

button {
  cursor: pointer;
}

a {
  color: #6f439c;
}

/* Container */

.container {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.6rem;
}

/* Header */

.header {
  padding: 1.6rem 0;
  background: #6f439c;
  color: white;
}

.header__title {
  margin-bottom: 0.4rem;
  font-size: 3.2rem;
}

.header__subtitle {
  /* color: #777; */
  font-size: 1.6rem;
  font-weight: 300;
}

/* Actions Bar */

.actions {
  padding: 1rem;
  background-color: #353239;

  /* border-bottom: 1px solid #dedfe0; */

  /* color: #333333; */
}

.actions__container {
  display: flex;
  align-items: center;
  max-width: 60rem;
  min-height: 3rem;
  margin: 0 auto;
  padding: 0 1.6rem;
}

.actions__container--spaced {
  justify-content: space-between;
}

/* Form Inputs */

.input {
  height: 3rem;
  margin-right: 1.6rem;
  padding: 0.4rem 0.8rem;
  border: none;
  font-size: 1.4rem;
  font-weight: 300;
}

.checkbox {
  display: flex;
  align-items: baseline;
}

.checkbox > input {
  margin-right: 0.4rem;
}

.button {
  padding: 0.8rem;
  transition: background 0.3s ease, color 0.3s ease;
  border: none;
  border-bottom: 2px solid #603a88;
  background: #7044a0;
  color: white;
  font-size: 1.4rem;
  font-weight: 300;
}

.button:hover {
  background: #5f3a87;
}

.button--secondary {
  border-bottom: 2px solid #717171;
  background: #888;
}

.button--secondary:hover {
  background: #6e6e6e;
}

.button--text {
  border: none;
  background: none;
  color: #aaa;
}

.button--text:hover {
  background: none;
  color: white;
  text-decoration: underline;
}

/* Note editor */

.title-input {
  display: block;
  width: 100%;
  margin: 2.4rem 0;
  padding: 0.8rem;
  border: 1px solid #dedfe0;
  font-size: 2rem;
  font-weight: 300;
}

.body-input {
  display: block;
  width: 100%;
  min-height: 15rem;
  margin: 2.4rem 0;
  padding: 0.8rem;
  border: 1px solid #dedfe0;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 300;
}

/* Note List Item */

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.6rem 0;
  padding: 1rem 1.6rem;
  transition: background 0.3s ease;
  border: 1px solid #423e47;
  background: #353239;
  color: #fafafa;
  text-decoration: none;
  cursor: pointer;
}

.list-item__container {
  display: flex;
  align-items: baseline;
  font-size: 1.8rem;
  font-weight: 300;
}

.list-item__container > *:first-child {
  margin-right: 0.8rem;
}

.list-item:hover {
  background: #3d3941;
}

.list-item__title {
  margin-bottom: 0.4rem;
  font-size: 1.8rem;
}

.list-item__subtitle {
  color: #666;
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 300;
}

.list-title {
  margin: 3.2rem 0 1.6rem;
}

.empty-message {
  margin: 3.2rem 0;
}
```

## Let's add CSS to our boilerplate
* [ref](web-dev-notes/development/tools/build-tools/webpack/webpack-2-tute)
* Full instructions are in `155-add-css-sass-to-webpack.md`



