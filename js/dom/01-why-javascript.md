# Why JavaScript?

In modern Front-End Web Development 3 main components:
1. Content
  * HTML and markup
2. Style
  * CSS and layout
3. Interactivity
  * JavaScript and interactivity and behavior
      - JavaScript can work with the `window` object (HTML and CSS can not)
          + everything you do with JavaScript in the browser happens inside the `window`
          + a browser has a special object called the `window object`

## Window Object
Contains lots of information

* current location URL
* web page or the `document` you have open
* the application code you've written

## What happens when the browser loads a web page?
It creates TWO things:

1. Window
2. Document

* both window and document are objects
    - objects are containers for data and can perform specific actions for that particular object
    - many objects built into the browser environment and JavaScript itself
    - you can create `custom` objects using JavaScript

## Example
dog
Properties | Methods  
--- | ---
name | bark()
owner | fetch()
numberOfLegs |

* you can acess methods or properties on any object using dot notation
    - `dog.name`, `dog.owner`

Window Object
chrome console
tip: ignore all faded purple colors
it can look very daunting when you open it up

let's check out `window.location`

```js
> window.location
> window.location.host
```

save a variable
```js
> var name = "kingluddite";
```

![window.name](https://i.imgur.com/u9oErru.png)

* window is the global scope of your JavaScript program
alert is `window.alert`

* also `window.document`
`window.document.body`
document.head
window.document.images (returns and array, an empty array if no images)
window.document.forms (array of forms)
window.document.scripts

## DOM
Document Object Model
when browser reads an HTML file it creates a treelike structure of nodes
node is a branching point that reveals more nodes
* each node is an HTML element or a JavaScript object that has properties and methods that can be accessed and used

tree nodes is top down structure (not traditional tree structure with root on bottom)

The tree structure is the DOM tree or the Document Object Model

## MDN
Mozilla Developer Network
[link to MDN](https://developer.mozilla.org/en-US/)
* we don't want to jump straight to JavaScript
    - we want to access and click on `[Web APIs & DOM](https://developer.mozilla.org/en-US/docs/Web/Reference/API)`

**note**: the DOM is NOT JavaScript but it is an interface that we can interact with the programming langauge JavaScript

[Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) - "The DOM is an API that allows access to and modification of the current document. It allows manipulation of document Node and Element. HTML, XML and SVG have extended it to manipulate their specific elements."

"The Document Object Model (DOM) is a programming interface for `HTML`, `XML` and `SVG` documents. It provides a structured representation of the document as a tree. The `DOM` defines methods that allow access to the tree, so that they can change the document **structure**, **style** and **content**. The `DOM` provides a representation of the document as a structured group of nodes and objects, possessing various properties and methods. Nodes can also have **event handlers** attached to them, and once an event is **triggered**, the event handlers get executed. Essentially, it connects web pages to scripts or programming languages."

### 3 Types of Actions We Can Do to the DOM
* Manipulation
    - where we manipulate elements
* Traveral
    - selecting an element based on the relationship with another element.
        + example: select a child element of a known parent element like a list item child of an undordered list
* Events
    - listening to a specific event, like a mouse click or a key press, and having something execute.

### DOM interfaces
* [document](https://developer.mozilla.org/en-US/docs/Web/API/Document)
* [element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
* [node](https://developer.mozilla.org/en-US/docs/Web/API/Node)

### 4 P's of Problem Solving
1. Preparation - where we understand the problem and think of a high level solution
2. Plan - where we plan out the solution
3. Perform - where we perform what's required in our proposed solution
4. Perfect - where refactor the solution

**note**: the DOM is an API for the browser (it is NOT JavaScript!)

### Different function format
Although they are formatted differently, they are the same

```js
// one way to format a function
function addTask() {
  // do stuff
}

// another way to format a function
var addTask = function() {
  // do stuff
};
```

**note**: you call them the same way
* `addTask();`

## getElementById( 'someId' )
* don't need to preface with `#` as it is implied
* [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
* note that it is singular because this will only EVER get one element

## getElementsByTagName( 'img' )
* notice this is plural because it gets a HTMLCollection with is very similar to an Array and you will access it using array syntax `myArray[0]`
* [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName)

### example

```js
var taskInput = document.getElementById( 'new-task' ), // new-task
    addButton = document.getElementsByTagName( 'button' )[0], // first button
    incompleteTasksHolder = document.getElementById( 'incomplete-task' ), // incomplete-tasks
    completeTasksHolder = document.getElementById( 'complete-task' ); // completed-tasks
```

* you can open console to see if this is actually working by typing in the console

```js
> taskInput
```

* after adding all 4 items in console you should see this:

![console output](https://i.imgur.com/OJrH6pQ.png)

* if you hover over the returned items stored inside the variables in the console you will see those items highlighted on the browser page (document)

## Events

Think of a race. It will not start until the gun sounds. Web pages work in a similar fashion. When the user interacts with the page with clicks or mousemoves these are events that will trigger functions to be called. These functions are known as `event handlers`.

### Structure of JavaScript Tip
Variables at top
Then Functions
Then Events

#### Click Event
* [MDN reference for onclick](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick)

```js
// syntax
element.onclick = functionRef;
```

**note**: it says `functionRef` above. This is an important distinction to make. Normally when you first work with JavaScript and functions you'll call function using parentheses but when you are dealing with `functon references` you do not use the parentheses. The difference is if you use the parentheses, you will call the function as soon as that line is called. If you use a function reference instead, the function will not be called until the event triggers the `event handler` to run.

## Traversing Elements with children
* traverse - "means go from one element to anther"

## We come up with plan

```js
// cycle over incompleteTasksHolder ul list items
  // for each list item
    // select it's children
    // bind editTask to edit button
   // bind deleteTask to delete button
   // bind taskComplete to checkbox


// cycle over completeTasksHolder ul list items
  // for each list item
    // select it's children
    // bind editTask to edit button
   // bind deleteTask to delete button
   // bind taskIncomplete to checkbox
```

* we see a lot of redundancy so we decide to come up with a function to keep our code DRY

### After refactoring we get this:

```js
var bindTaskEvents = function( taskListItem, checkBoxEventHandler ) {
  // select it's children
    // bind editTask to edit button
   // bind deleteTask to delete button
   // bind checkBoxEventHandler to checkbox
};
// cycle over incompleteTasksHolder ul list items
  // for each list item
    // bind events to list item's children (taskComplete)

// cycle over completeTasksHolder ul list items
  // for each list item
    // bind events to list item's children (taskIncomplete)
```

* [MDN Reference `children`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children)

### More refactoring give us:

```js
var bindTaskEvents = function( taskListItem, checkBoxEventHandler ) {
  console.log( 'bind list item events' );
  // select it's children
    // bind editTask to edit button
   // bind deleteTask to delete button
   // bind checkBoxEventHandler to checkbox
};
// cycle over incompleteTasksHolder ul list items
for( var i = 0; i < incompleteTasksHolder.children.length; i++ ) {
    // bind events to list item's children (taskComplete)
    bindTaskEvents( incompleteTasksHolder.children[i], taskComplete );
}

// cycle over completeTasksHolder ul list items
for ( var i = 0; i < completeTasksHolder.children.length; i++ ) {
    // bind events to list item's children (taskIncomplete)
    bindTaskEvents( completeTasksHolder.children[i], taskIncomplete );
}
```

* view in browser and you'll see 'bind list item events' output in console

* with checkboxes you can check or uncheck it also with spacebar (and clicking with mouse)
  - the [global event handler](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers) has [onchange](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange)
* [querySelector() MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)

### Even More refactoring

```js
var bindTaskEvents = function( taskListItem, checkBoxEventHandler ) {
  console.log( 'bind list item events' );
  // select taskListItem's children
    var editButton = taskListItem.querySelector( 'button.edit' ),
        deleteButton = taskListItem.querySelector( 'button.delete' ),
        checkBox = taskListItem.querySelector( 'input[type=checkbox]' );

        // bind checkBoxEventHandler to checkbox
        checkBox.onchange = checkBoxEventHandler;
        // bind editTask to edit button
        editButton.onclick = editTask;
        // bind deleteTask to delete button
        deleteButton.onclick = deleteTask;
};
```

* view in browser and now you'll see our console logs working when you click checkboxes with mouse or use keyboard (onchange), click add or delete buttons.
