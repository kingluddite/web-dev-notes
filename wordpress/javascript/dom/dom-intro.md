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
(similar to WP API:Content)

## Nodes

Everything in the DOM is composed of `nodes`
* these `nodes` are `objects` that are then made into `trees`
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

* DOCTYPE would be a node
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

NOTE: In DOM 4, attibutes will not be `nodes` in the same way.

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

check out attributes, they are know as a `NamedNodeMap` (type of collection)
aaa
# Using the DOM to Select Nodes

We will use JavaScript to select nodes in the DOM

JavaScript knows `docuement` is root object in DOM tree

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

* document.children
* document.childNodes

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

* document.getElementById()
* document.getElementsByTagName( 'pass elements here' );
    - returns array with all elements passed
* document.getElementsByClassName( 'pass class name here' );
    - returns array with all elements pass with class name

take note of singular vs plural (above methods)

#### new additions to JavaScript language
Gives us the ability to write `CSS` like selectors with tag name, classes and IDs

* document.querySelector()

![querySelector() example](https://i.imgur.com/slvFkhc.png)

    - why only 1 element returned and not an array?
        * only returns first instance
    - note that `.` used before class name
**
* document.querySelectorAll()

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

homework: random web site - use all of these methods to traverse the document

# Traversing the DOM
