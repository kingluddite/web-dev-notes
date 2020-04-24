# Traversing DOM
How to move up, down and across looking at parents notes, child nodes and sibling nodes

```
<ul id="items" class="list-group">
  <li class="list-group-item">Item 1</li>
<!-- MORE -->
</ul>
```

## What is a parent node?
* The `ul` node is a parent of the `li` node

## What is a child node?
* The `li` node is a child of the `ul` node

## What is a sibling node?
The `h2` node and the `ul` node are `siblings`

```
// MORE CODE

        <h2 class="title">Items</h2>
        <ul id="items" class="list-group">
          <li class="list-group-item">Item 1</li>
        </ul>

// MORE CODE
```

## How can we grab a parent node?
* I want to grab the `#items` node and then jump up and grab it's parent which will be `#main`

`traversing-dom.js`

```
// MORE CODE

// TRAVERSING THE DOM //
var itemListEl = document.querySelector('#items');
// parentNode
console.log(itemListEl.parentNode);

// MORE CODE
```

```
// MORE CODE

    <div class="container">
      <div id="main" class="card card-body">
        <h2 class="title">Add Items</h2>
        <form class="form-inline mb-3">
          <input type="text" class="form-control mr-2" />
          <input type="submit" class="btn btn-dark" value="Submit" />
        </form>
        <h2 class="title">Items</h2>
        <ul id="items" class="list-group">
          <li class="list-group-item">Item 1</li>
          <li class="list-group-item">Item 2</li>
          <li class="list-group-item">Item 3</li>
          <li class="list-group-item">Item 4</li>
        </ul>
      </div>
    </div>

// MORE CODE
```

## Use the parent node as a selector and make the background color red
```
// MORE CODE

itemListEl.parentNode.style.backgroundColor = '#ff0000';

// MORE CODE
```

## Chaining
* We can make the parent node of the parent node's background red

### Let's log it out to see what we get
```
// MORE CODE

console.log(itemListEl.parentNode.parentNode);

// MORE CODE
```

* And we get the `<div class="container>...</div>`

### We can style that too
```
// MORE CODE

itemListEl.parentNode.parentNode.style.backgroundColor = 'green';

// MORE CODE
```

## We could use `parentElment` as a substitute for `parentNode` and get same result

```
// MORE CODE

itemListEl.parentElement.parentElement.style.backgroundColor = 'blue';

// MORE CODE
```

## childNodes
* We can get all the child nodes of an element

```
// MORE CODE

// childNodes
console.log(itemListEl.childNodes);

// MORE CODE
```

* It will give us a NodeList that looks like:

![NodeList](https://i.imgur.com/JwL9PPo.png)

* You will see a `text` node (represents a space)
    - That is a line break
    - If you removed all line breaks

```
// MORE CODE

<ul id="items" class="list-group"><li class="list-group-item">Item 1</li><li class="list-group-item">Item 2</li><li class="list-group-item">Item 3</li><li class="list-group-item">Item 4</li></ul>

// MORE CODE
```

* View again and you'll see all the `text` space nodes are gone (because you removed all the new lines)

![remove text nodes](https://i.imgur.com/SYss26G.png)

## childNodes are a pain
* Dealing with all the text nodes can be a pain
* A better way would be to use `children`

## children
* Put the spaces back `itemList` and try this

```
// MORE CODE

console.log(itemListEl.children);

// MORE CODE
```

* You now get an `HTMLCollection` instead of a `NodeList` but the great thing is you don't have to worry about `text` nodes as you just get all the element children

## Access an item inside the HTMLCollection
* You can treat it like an array and use the index to get the item

```
// MORE CODE

console.log(itemListEl.children[2]);
// itemList.children[1].style.backgroundColor = 'yellow';

// MORE CODE
```

* You could treat that as a sector and change that item's CSS

## What does `firstChild` give us
* It gives us something similar to childNode where we have to deal with white space

```
// MORE CODE

console.log(itemListEl.firstChild); // #text

// MORE CODE
```

* That's probably not what you wanted and the only way it would be useful is if you removed white space which would be tedious

### firstElementChild is better
* This is the one you want to use as it will just give you the first element child and doesn't take text space nodes into consideration

* You also have `lastChild` and `lastElementChild`
* You could change the last element content like this:

```
// MORE CODE

itemListEl.firstElementChild.textContent = 'I changed the first element';
console.log(itemListEl.lastChild);
itemListEl.lastElementChild.textContent = 'I changed the last element';

// MORE CODE
```

### Let's look at siblings
* We could use `nextSibling` or `previousSibling` but they give us access to all the `nodes` which includes **text** which is not what we want

```
// MORE CODE

console.log(itemListEl.nextSibling); // #text
console.log(itemListEl.nextElementSibling); // null (nothing after it)
console.log(itemListEl.previousSibling); // #text
console.log(itemListEl.previousElementSibling); // <h2 class="title">Items</h2>

// MORE CODE
```

## Do I need jQuery
* For simple DOM manipulation, no
* Vanilla JS will suffice and you don't need all the bloated jQuery code

## Manipulating the DOM
```
// MORE CODE

// createElement
// Create a div
var newDiv = document.createElement('div');

// Add class
newDiv.className = 'hello';

// Add id
newDiv.id = 'hello1';

// Add attr
newDiv.setAttribute('title', 'Hello Div');

// Create text node
var newDivText = document.createTextNode('Hello World');

// Add text to div
newDiv.appendChild(newDivText);

var container = document.querySelector('header .container');
var h1 = document.querySelector('header h1');
//
console.log(newDiv);
//
newDiv.style.fontSize = '30px';
//
container.insertBefore(newDiv, h1);

// MORE CODE
```

* That will add a heading and place it on the document

`app.js`

```
// TRAVERSING THE DOM //
var itemList = document.querySelector('#items');
// parentNode
// console.log(itemList.parentNode);
// itemList.parentNode.style.backgroundColor = '#f4f4f4';
// console.log(itemList.parentNode.parentNode.parentNode);

// parentElement
// console.log(itemList.parentElement);
// itemList.parentElement.style.backgroundColor = '#f4f4f4';
// console.log(itemList.parentElement.parentElement.parentElement);

// childNodes
// console.log(itemList.childNodes);

// console.log(itemList.children);
// console.log(itemList.children[1]);
// itemList.children[1].style.backgroundColor = 'yellow';

// // FirstChild
// console.log(itemList.firstChild);
// // firstElementChild
// console.log(itemList.firstElementChild);
// itemList.firstElementChild.textContent = 'Hello 1';


// lastChild
// console.log(itemList.lastChild);
// lastElementChild
// console.log(itemList.lastElementChild);
// itemList.lastElementChild.textContent = 'Hello 4';

// nextSibling
// console.log(itemList.nextSibling);
// // nextElementSibling
// console.log(itemList.nextElementSibling);

// previousSibling
// console.log(itemList.previousSibling);
// previousElementSibling
// console.log(itemList.previousElementSibling);itemList.previousElementSibling.style.color = 'green';

// createElement

// Create a div
var newDiv =  document.createElement('div');

// Add class
newDiv.className= 'hello';

// Add id
newDiv.id = 'hello1';

// Add attr
newDiv.setAttribute('title', 'Hello Div');

// Create text node
var newDivText = document.createTextNode('Hello World');

// Add text to div
newDiv.appendChild(newDivText);

var container = document.querySelector('header .container');
var h1 = document.querySelector('header h1');

console.log(newDiv);

newDiv.style.fontSize = '30px';

container.insertBefore(newDiv, h1);
```

