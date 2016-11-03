# Create Elements

## createElement() methdo
* [link reference](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)

```js
// New Task List Item
var createNewTaskElement = function( taskString ) {
    // Create List Item
    var listItem     = document.createElement( 'li' ),
        // input (checkbox)
        checkBox     = document.createElement( 'input' ), // type checkbox
        // label
        label        = document.createElement( 'label' ),
        // input (text)
        editInput    = document.createElement( 'input' ), // type text
        // button.edit
        editButton   = document.createElement( 'button' ),
        // button.delete
        deleteButton = document.createElement( 'button' );

      // Each element needs modifying

      // Each element needs appending
    return listItem;
};
```

## Appending and Removing Elements
* [MDN resource link](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

`js/app.js`

```js
var createNewTaskElement = function( taskString ) {

    [CODE HERE]

      // Each element needs appending
      listItem.appendChild( checkBox );
      listItem.appendChild( label );
      listItem.appendChild( editInput );
      listItem.appendChild( editButton );
      listItem.appendChild( deleteButton );
    return listItem;
};

// Add a task
var addTask = function() {
  [CODE HERE]
  // Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild( listItem );
};
```

![add item button](https://i.imgur.com/5HjUHhT.png)

* view in browser and under `ADD ITEM` section, add an item in the input box and click the `Add` button. You will see that something happens and we can tell that stuff has been appended to our document but it doesn't look pretty.

If you view the DOM elements we added in the browser console you will see something like this

![dom elements created](https://i.imgur.com/53ftBGT.png)

## Node.parentNode
* [MDN reference link](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)

`js/app.js` (code fragment)

```js
// Add a task
var addTask = function() {
  console.log( 'addTask called' );
  // Create a new list item with the test from #new-task
  var listItem = createNewTaskElement( 'Some New Task' );

  // Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild( listItem );
  bindTaskEvents( listItem, taskComplete );
};

// Mark a task as complete
var taskComplete = function() {
  console.log( 'taskComplete called' );
  // Append the task list item to the #completed-tasks
  // note: `this` is the checkbox
  var listItem = this.parentNode;
  completeTasksHolder.appendChild( listItem );
  bindTaskEvents( listItem, taskIncomplete );
};

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log( 'taskIncomplete called' );
  // when the checkbox is unchecked

  // Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild( listItem );
  bindTaskEvents( listItem, taskComplete );
};
```

## Remove Child
[MDN link reference](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild)

```js
// Delete an existing task
var deleteTask = function() {
  console.log( 'deleteTask called' );
  // When the Delete button is pressed
  var listItem = this.parentNode, // li (parent of input)
      ul       = listItem.parentNode // ul (parent of li)
    // Remove the parent list item from the ul
    ul.removeChild( listItem );
};
```

## Modifying Elements

```js
// New Task List Item
var createNewTaskElement = function( taskString ) {
    
    [VARIABLES]

    // MODIFY ELEMENTS
    
    // Each element needs modifying
    // inputs
    checkBox.type = 'checkbox';
    editInput.type = 'text';

    // edit
    editButton.innerText = 'Edit';
    editButton.className = 'edit';

    // delete
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';

    // label
    // mozilla browser fix
    if (typeof label.innerText === 'undefined')  {
      label.textContent = taskString;
    } else {
      label.innerText = taskString;
    }

    [APPEND]

    return listItem;
};

```

* view in browser and now you'll see we have successfully modified elements
* click the `Add` button under `ADD ITEM` and by default it will add an li with a bunch of stuff nested inside it where the attributes have been modified

![modified elements of added li](https://i.imgur.com/JMy0iKQ.png)

# innerText and Firefox

Mozilla didn't implement innerText but has implemented textContent.

Here's some cross-browser compatible code for the edit button:

```js
if (typeof editButton.innerText === "undefined")  {
    editButton.textContent = "Edit";
} else {
    editButton.innerText = "Edit";
}
```

## Changing Classes

* [MDN link reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

```js
// Edit an existing task
var editTask = function() {
  console.log( 'editTask called' );

  // When the Edit button is pressed
  var listItem      = this.parentNode,

      editInput     = listItem.querySelector( 'input[type=text]' ),
      label         = listItem.querySelector( 'label' ),

      // boolean value for easy if condition check
      containsClass = listItem.classList.contains( 'editMode' );

    // if the class of the parent is .editMode
  if( containsClass ) {
    // Switch from .editMode
    // label text become the input's value
    // Mozilla check
    if (typeof label.innerText === 'undefined')  {
      label.textContent = editInput.value;
    } else {
      label.innerText   = editInput.value;
    }

  } else {
    // Switch to .editMode
    // input value becomes the label's text
    // Mozilla check
    if (typeof label.innerText === 'undefined')  {
      editInput.value = label.textContent;
    } else {
      editInput.value   = label.innerText;
    }
  }

  // Toggle .editMode on list item
  listItem.classList.toggle( 'editMode' );
};

```

## Add a class

Quick exercise:

* Use the `classList` property on the `anchor` to add a new class of "selected" to it
* use classList to toggle the "live" class on the anchor element

```js
var anchor = document.querySelector("a");

//Add the class to the classList "selected"

anchor.classList.add( 'selected' );

//Toggle the class "live"
anchor.classList.toggle( 'live' );
```

## Fix Issues with our App
1. When tasks are added, clear them out of add task input box

```js
// Add a task
var addTask = function() {
  console.log( 'addTask called' );
  // Create a new list item with the text from #new-task
  var listItem = createNewTaskElement( taskInput.value );

  // Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild( listItem );
  bindTaskEvents( listItem, taskComplete );

  // clear out value after adding
  taskInput.value = '';
};
```

* setting taskInput.value = '' is all we need to do to clear out input box

### EventTarget

[MDN link resource](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

#### EventTarget.addEventListener()

[MDN link resource](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

syntax

```js
target.addEventListener(type, listenener)
```

* type - a string representing the `event type`
* listener - a function we want to add

##### Why use addEventListener?
* It allows adding more than a single handler for an event

currently if we try to add more than one event using `.onclick` it will only add the last event

## ToDo Assignment
* prevent creation of empty tasks
* alter the Edit Button so that it says 'Save' when the text input is showing and Edit when the label is
* when edit is clicked, give it a grey background
* 

