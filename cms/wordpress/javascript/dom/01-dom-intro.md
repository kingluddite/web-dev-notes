# DOM
Document Object Model

[great article on the DOM](https://css-tricks.com/dom/)

## What is the DOM?
An API for HTML (XML, SVG) that offers a web page as a tree of objects

>Build Documents, navigate their structure, and add, modify or delete elements and content

> &mdash; <cite>W3c</cite>

The browser takes the `HTML` sent from the server and converts it into the DOM. Then any JavaScript we write will interact with the DOM as an API for the `HTML`

* DOM is language agnostic, so other programming languages can interact with it as well, not just JavaScript

Keep in mind what we see in the browser is from the DOM not the original HTML source code.

## DOM API:Web Pages
* similar to WP API:Content

## Nodes
Everything in the DOM is composed of `nodes`

* These `nodes` are `objects` that are then made into `trees`
    - `nodes` have
        + `properties`
        + `methods`

### Nodes and their special numbers
| Node Name         | Number        |
| ----------------- |:-------------:|
| Document          | 9             |
| DocumentType      | 10            |
| Element           | 1             |
| Text              | 3             |
| Comments          | 8             |
| DocumentFragments | 11            |

* Document Fragments
    - can contain a collection of nodes
        + often used for inserting a group of nodes together into a document

## DOM example
What does it look like when the following code is a DOM tree

```html
<html>
 <head>
  <title>My Dom Tree</title>
 </head>

 <body>
  <a href="#">My Link</a>
  <h1>My DOM Header</h1>
 </body>
</html>
</html>
```

![DOM Tree Visual](https://i.imgur.com/SkKEb7J.png)

* `DOCTYPE` would be a node
* What is the very top `Document`? It represents the entire Document itself.
* `HTML` is the Root element that's going to make up the rest of the page.
* The DOM sees `<title></title>` as one node and the text inside it as another node.

## DOM fragment example

```html
<p>bla bla bla <a title="bla" href="#">bla bla</a> more bla</p>
```

![fragment DOM schema](https://i.imgur.com/J4kodAt.png)

## What about attributes?
In the past DOM attributes were `nodes`.

**NOTE**: In DOM 4, attibutes will not be `nodes` in the same way.

# DOM in the browser
Seeing the DOM tree isn't easy. You have to use the Chrome tool `dev inspector`

Create a file `dom-tree-view.html` with the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Explore DOM in Chrome</title>
</head>
<body>
    <h1>My Title</h1>
    <p>some text <span>bla</span> more <a href="#">text</a>.</p>
</body>
</html>
```

Here's how to view the tree using the Chrome dev tool

![Chrome Dev Tool](https://i.imgur.com/nHsNXOB.png)

1. Click on DOCTYPE
2. In Properties, expand `<!DOCYTYPE html>`
3. Find nodeType (value is 10)
4. the `html` node has a value of 1 (represents an element in DOM)
    * You can see it has children and if you toggle open you can see the element children it has.
5. Why are the childNodes so many?
    * it is counting line breaks and spacing as their own nodes
    * if you toggle inside text node you'll see data is '' or 'return symbol' and it's nodeType is 3
    * you can also see innerHTML property
Element node can only be an element, not text
text node can not contain HTML elements
difference between children and childNodes(this also includes text space)

Check out attributes, they are know as a `NamedNodeMap` (type of collection)

# Using the DOM to Select Nodes

We will use JavaScript to select nodes in the DOM

JavaScript knows `document` is root object in DOM tree

tip: autocomplete in chrome inspector
1. start typing
2. type right arrow key
3. and then hit enter

## Document Properties
* url
* location
    - url broken down into an array
* doctype
* charset
* title
* styleSheets
* scripts
* head
* body
* links
* images

![navigation document properties](images/document-properties.gif)

* `document.children`
* `document.childNodes`

going from an array to an item
if you select the document and get all it's children
`document.children` that will be an array (you will see the square brackets)

![document.children](https://i.imgur.com/smVys21.png)

grab the paragraph

![paragraph](https://i.imgur.com/4iNyMQ0.png)

very verbose to get a paragraph
* also if element gets moved around, our code breaks

### Document Methods
A better way to traverse the DOM

* `document.getElementById()`
* `document.getElementsByTagName( 'pass elements here' )`;
    - returns array with all elements passed
* `document.getElementsByClassName( 'pass class name here' )`;
    - returns array with all elements pass with class name

take note of singular vs plural (above methods)

#### new additions to JavaScript language
Gives us the ability to write `CSS` like selectors with tag name, classes and IDs

`document.querySelector()`

![querySelector() example](https://i.imgur.com/slvFkhc.png)

    - why only 1 element returned and not an array?
        * only returns first instance
    - note that `.` used before class name

`document.querySelectorAll()`

    - if you want all items from the query in an array

```javascript
document.querySelectorAll( '.some-class' );
```

* returns an array of elements with the matching query

* if you can use `getElementById()` or `getElementsByTagName()` are faster than `querySelector()` and `querySelectorAll()` (the new methods are more processor intensive but easier to use)

**Important Tip** We can use any of these methods on any element in the document not just the document

```javascript
var myNav, myNavLinks;
myNav = document.getElementById( 'nav' );
console.log( myNav );
myNavLink = myNav.querySelector( 'a' );
console.log( myNavLink );
```

**homework**: random web site - use all of these methods to traverse the document

# Traversing the DOM

Moving from a node to its parent, children or sibling nodes.

## Going up the tree
"Traversing upwards to a parent node"

* `parentNode`
* `parentElement`
    - Only gets parent element node

* Above will usually return same value because it is unlikely that a parent will not be an element
* you can chain properties together
example

```js
h6.parentNode.parentNode
```

## Going down the tree
"Traversing to children nodes"

### Two Types
1. Those that select Any Node Type
    * .childNodes
    * .firstChild
    * .lastChild 
2. Properties that ONLY select ELEMENT nodes
    * .children
    * .firstElementChild
    * .lastElementChild
    * .childElementCount (counts all the kids)

The difference between select child and child element is white space. that includes blanks and returns. This can cause problems if you write code targeting children and including white space because the code could change in production (minified, space removed) and your code would break.

## Siblings

Similar to selecting children

### Two Types
1. Properties that select Any Node Type
    * .nextSibling
    * .previousSibling

2. Properties that only select Element Nodes
    * .nextElementSibling
    * .previousElementSibling 

**NOTE**: comments are node types of their own they are not text nodes nor are they element nodes

**TIP**: you can pass multiple values to `console.log` separated by comma

```js
console.log( varOne, varTwo, varThree, varFour );
```

**TIP**: Because white space matters you might want to specify that you want to get element nodes

**HOMEWORK** Practice using the traverse tools listed above on a web page you like and see if you can get good at moving around in the DOM.

# DOM Enlightenment
[Free Book](http://domenlightenment.com/) to learn then intricasies of the DOM

# Getting and Setting DOM Node Values

## Getting Node Values
A. Element Nodes
B. Text Nodes

A. Element Nodes
    * .innerHTML (everything inside an element)
    * .innerText (does not show text hidden by css)
    * .textContent (shows all text hidden or not)
    * .outerHTML
    * .outerText

## Setting Node Values
A. Element Nodes
B. Text Nodes

A. Element Nodes
    * .innerHTML
```js
var someHeader = document.getElementById( 'awesome-header' );
someHeader.innerHTML = '<p>I am now adding some text</p>';
someHeader.innerHTML += '<p>How do you like me now!</p>';
```

### DOM vs Source
Now if you view source you won't see the above but if you inspect the code using the Chrome dev tool, you will. You are seeing one shiny example of the difference between your source code and the DOM.

# BEST PRACTICE
Assign new content to a variable then add to element

```js
var someHeader = document.getElementById( 'awesome-header' ),
    newParStuff;

newParStuff = '<p>I am now adding some text</p>';
newParStuff += '<p>How do you like me now!</p>';

someHeader.innerHTML = newParStuff;
```

* .innerHTML parses `HTML`

* .innerText (does not show text hidden by css)
    - does NOT parse HTML
* .textContent (shows all text hidden or not)

## Outer
Use if you need to change not just what's inside an element but also it's container Element use outer.
* we could change from a DIV to an ARTICLE element

* .outerHTML
    - gives you all HTML including the wrapper Element.
* .outerText (possible but not common to use)
    - this is strange, it will change the DOM to replace the container and everything inside with text and if you output a variable it will show the value of all that used to be inside that element.

## Get and Set for Text Nodes

Two options
1. .data
2. .nodeValue

**TIP**: Because data is not consistent across elements and element attributes you are better served to just use `.nodeValue`

**TIP**: Before working with Text nodes make sure you are dealing with text nodes

```js
if ( 3 === h1Text.nodeType ) {
    h1Text.nodeValue = 'add me now!';
}
```

## Summary of nodeValue vs innerHTML vs textContent vs innerText

* `nodeValue` is a little more confusing to use, but faster than innerHTML.
* `innerHTML` parses content as HTML and takes longer.
* `textContent` uses straight text, does not parse HTML, and is faster.
* `innerText` Takes styles into consideration. It won't get hidden text for * instance.

[inner text vs text content](https://kellegous.com/j/2013/02/27/innertext-vs-textcontent/)

# Getting And Setting Attribute Values

What is an HTML attribute?
* can have 0, 1 or > 1 attributes

With elements we have access to the `attributes` property

* gives us access to all the attributes a specific element has

```js
el.attributes;
```

What does `attributes` property give us?
NamedNodeMap

## NamedNodeMap
An unordered collection of element Attributes, accessible similar to an array

### How do we get Attribute Data?
* .nodeName - name of attribute
* .nodeValue - value of attribute

```js
var aTag = document.querySelector( 'a' ),
    attr = aTag.attributes;

console.log( attr );
```

![output](https://i.imgur.com/7sATxXP.png)

html fragment markup

```html
<body>
    <a href="#" class="junk" title="none">Yo</a>...
```

attr.length

looping through to get node and values

```js
var aTag = document.querySelector( 'a' ),
    attr = aTag.attributes;

console.log( attr );

for( var i = 0, max = attr.length; i < max; i++ ) {
    console.log( attr[i].nodeName +
                 ': ' +
                 attr[i].nodeValue );
}
```

* above is multiple lines, doesn't break our code, more readible

![output of loop](https://i.imgur.com/74dBUol.png)

## Getting a specific attribute

* .getAttribute( 'the attribute you want to get' )
* .setAttribute( 'the attribute you want to set', 'the value you want to set the attribute to' )

## special case for working with `class` attributes

* .getAttribute( 'class' )
* .className  --- this is a property
* .classList (newer and better)
    - breaks classes into a collection which we can access independently
    - newer to the DOM, not much support in older browsers
    - content.classList[0] - individual class (if more than 1) 
    - or content.classList.value (all classes)

classList is much more helpful than the others
* also has a bunch of methods we can use

### How do we add a class?
```js
content.classList.add( 'active' );
```

### How do we remove a class
```js
content.classList.remove( 'active' );
```

### what if you're not sure if that class exists?
```js
content.classList.toggle( 'active' );
```

* checks if it exists, if so removes it, if not, adds it

### Data attributes

example
```html
<div id="main-content" data-time="01:01:2017" data-id="01233">
```

`data-` is new with HTML
* they allow you to set your own custom attributes
* just preface your custom attribute with `data-`

#### Getting Data Attributes
* .getAttribute( 'data-time' )
    - just gives you value of that data-
* .dataset - property

example

```js
var specificDiv = document.getElementById( 'love' );
console.log( specificDiv.dataset );
```

fragment html

```html
<a id="love" href="#" class="junk" title="none" data-id="123" data-time="1:1:1" data-love="true">Yo</a>
```

* could drill down to `specificDiv.dataset.id`
    - we could use the above to set the value of that dataset
output

![DOMStringMap](https://i.imgur.com/R7eKcq4.png)

### DOMStringMap
An Object containing the names and values of attributes of a Node Element

# BEST PRACTICE
There are better ways to store data, then in your markup
