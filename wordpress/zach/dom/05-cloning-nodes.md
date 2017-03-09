# Cloning Nodes in the DOM

* aka - duplicate a node

syntax

```js
el.cloneNode( deep );
```

```js
// clone LI by itself
secondField = firstField.cloneNode(),
// clone LI and all of its children
thirdField = firstField.cloneNode( true );
```

**tip**

* people wonder why they don't clone the children and so it is a good idea to use this:
`element.cloneNode(false)`

* rather than leaving cloneNode() empty, the false let's you know that if it is true, you will also clone the element's children

## problem with cloning
* it will duplicate the ID
* it will mess up form usability because of duplicate for and id
* we need a way of incrementing our cloned code

solution to problem

```js
/* beautify preserve:start */
var fieldsList             = document.querySelector( '.fields' ),
    firstField             = fieldsList.children[ 0 ],
    firstFieldInput        = firstField.querySelector( 'input' ),
    firstFieldIdStr        = firstFieldInput.getAttribute( 'id' ),
    firstFieldPlaceholder  = firstFieldInput.getAttribute( 'placeholder' ),
    secondField            = firstField.cloneNode( true ),
    secondFieldInput       = secondField.querySelector( 'input' ),
    secondFieldLabel       = secondField.querySelector( 'label' ),
    secondFieldPlaceholder = secondField.querySelector( 'placeholder' ),
    secondFieldIdStr       = updateIdStr( firstFieldIdStr );
/* beautify preserve:end */
secondFieldInput.setAttribute( 'id', secondFieldIdStr );
secondFieldInput.setAttribute( 'name', secondFieldIdStr );
secondFieldInput.setAttribute( 'placeholder', 'Custom ' + secondFieldIdStr );
secondFieldLabel.setAttribute( 'for', secondFieldIdStr );
secondFieldLabel.innerHTML = secondFieldIdStr;
// console.log( secondField );
fieldsList.appendChild( secondField );

function updateIdStr( value ) {
  /* beautify preserve:start */
 var strArray = value.split( '-' ),
     id       = strArray[ strArray.length - 1 ],
     newId    = parseInt( id ) + 1;
  /* beautify preserve:start */
  strArray[ strArray.length - 1 ] = newId;
  return strArray.toString().replace( ',' , '-' );
}
```

* beautify preserve comments are for prettify and prevent formatting of code inside those comments.


# Removing Nodes from the DOM

syntax

```js
el.remove();
```

* it will remove from DOM but not from source code itself

```js
var pEl = document.querySelector( 'li' );

pEl.remove();
```

* querySelector() stops after selecting the first instance
* .remove() is newer to JavaScript

older version of remove (still useful today)

syntax
```js
parentEl.removeChild( elToRemove );
```

* benefit of above syntax is you can save the element you are removing as a variable like this:

```js
var oldEl = parentEl.removeChild( elToRemove );
```

remove-node.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Remove Nodes</title>
  <link rel="stylesheet" href="remove-node.css">
</head>

<body>
  <div class="content post">
    <h1>Posts</h1>
    <ul class="posts">
      <li>First Item</li>
      <li>Second Item</li>
    </ul>
    <hr>
    <div class="trash hidden">
      <h3><em>Trash</em></h3>
      <ul class="trash posts">
      </ul>
    </div>
  </div>
  <script src="app.js"></script>
</body>

</html>
```

app.js

```js
/*====================================================
=            Removing a Node with .removeChild()            =
====================================================*/

var posts = document.querySelector( '.posts' ),
firstPost = posts.querySelector( 'li' ),
trash = document.querySelector( '.trash' ),
trashPosts = document.querySelector( '.trash.posts'),
oldEl;

oldEl = posts.removeChild( firstPost );
trashPosts.appendChild( oldEl );
trash.classList.remove( 'hidden' );
```

remove-node.css

```css
body {
  background: #efefef;
  text-align: center;
}

h1 {
  font-size: 200%;
  font-family: sans-serif;
}

.content {
  background: #fff;
  border: 1px #ddd solid;
  padding: 20px;
  margin: 20px;
}

.hidden {
  display: none;
}

ul {
  text-align: left;
  font-size: 1.4rem;
}
```
