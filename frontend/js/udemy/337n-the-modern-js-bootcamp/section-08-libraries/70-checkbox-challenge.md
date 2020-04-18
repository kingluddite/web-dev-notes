# Checkbox Challenge
## 2 Steps
1. Making sure the initial value is rendering properly (displaying whether the todo has or has not been completed)
2. Set it up so that it will respond to changes in the checkbox

### Check the checkbox if the data shows that the todo is completed
#### Troubleshooting issue
* If you change the string of our localStorage that breaks the format will cause our app to crash
    - If that happens, just delete the data and add a few more items and try again

### Make sure you have some todos that are completed and some that are not
* Go into localStorage and **carefully** manually set completed to true for a couple of items (let's say 2 todos are completed and 2 are not)

![2 true and 2 false](https://i.imgur.com/XD8SDgs.png)

* **note** You have to alter the `localStorage` in the long horizontal scrolling Value part of the Key/Value part of the Chrome Application Local Storage (be forewarned, it is not very user friendly)
* **note** If you make the change to localStorage, the summary will not update until you refresh the page

### Check the checkbox 
* We now need to have the summary update when we check the checkbox (which means we completed the todo)

#### We need to set the checkbox.checked value
* Inside our generateTodoDOM we will fire off

`checkbox.check = todo.completed`

* This will (for every todo generated) set the checkbox to checked if todo.completed is true and unchecked if todo.checked is false

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
  // check checkbox is todo completed
  checkbox.checked = todo.completed;
  // add checkbox to DOM
  todoEl.appendChild(checkbox);

// MORE CODE
```

* Now refresh page and you'll see 2 items are checked

## More complex - event handler
* When user checks or unchecks todo the summary will update accurately
* You will save and rerender the todos with each check/uncheck

```
// MORE CODE

  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // make input a checkbox
  checkbox.setAttribute('type', 'checkbox');
  // add checkbox to DOM
  todoEl.appendChild(checkbox);

  // listen for checkbox getting checked
  checkbox.addEventListener('change', function(e) {
    console.log('checked');
  });

// MORE CODE
```

* Test and check any checkbox and you will see `checked` appear in client console

## Toggle the completed boolean value
```
// MORE CODE

  // listen for checkbox getting checked
  checkbox.addEventListener('change', function(e) {
    // console.log('checked');
    todo.completed = !todo.completed;
    console.log(todo);
  });

// MORE CODE
```

* Test and you'll see that if you check the checkbox on any item it will toggle it's value and you can verify this is correct in the client console
* **note** We are not using the event object so we don't need an `e` argument

## Save and rerender
```
// MORE CODE

  checkbox.checked = todo.completed;
  // add checkbox to DOM
  todoEl.appendChild(checkbox);

  // listen for checkbox getting checked
  checkbox.addEventListener('change', function() {
    // console.log('checked');
    todo.completed = !todo.completed;
    saveTodos(todos);
    renderTodos(todos, filters);
  });

// MORE CODE
```

## Let's break our toggleTodo into a function
```
// MORE CODE

// toggle the completed value for a given todo
const toggleTodo = function(id) {
  const todo = todos.find(function(todo) {
    return todo.id === id;
  });
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

// MORE CODE
```

* **note** We didn't need the `id` here but there are lots of ways to accomplish what we need, it comes down to if it works and personal preference
