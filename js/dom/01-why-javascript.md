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
