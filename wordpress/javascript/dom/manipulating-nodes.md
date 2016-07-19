# Manipulating Nodes

* elements(tags) and text are two separate nodes in the DOM

## functions to create nodes
1. `document.createTextNode( 'Value');`
2. `document.createElement( 'el' );`

nodeType of 3 ---> Text nodes

### Appending Text nodes to Elements
```js
el.appendChild( childNode );
```

```js
var aText = document.createTextNode( 'Read More..' ),
  aEl = document.createElement( 'a' ),
  pText = document.createTextNode( 'Learn more about the DOM.' ),
  pEl = document.createElement( 'p' );

aEl.setAttribute( 'href', '#link' );
aEl.appendChild( aText );

pEl.appendChild( pText );
pEl.appendChild( aEl );

console.log( pEl.outerHTML );
```

Will create this

`<p>Learn more about the DOM.<a href="#link">Read More..</a></p>`

## Document Fragment
A container for holding Nodes
**special thing about Document Fragments**
When a document fragment is appended to another Node it disappears and just the children nodes you have added are present.

why not just build them all up at once instead of using the document fragment?
sometimes it is more efficient. you store them in the document fragment and when it is ready, they you attach the document fragment

[createElement Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
[createTextNode Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode)
[createDocumentFragment Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment)
[createComment Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/createComment)

## Adding Nodes to the DOM

`document.appendChild()`
* grab an element from the DOM and append stuff to it

## insertBefore

```js
parentEl.insertBefore( newEl, elAddBefore );
```

## Is there a native .insertAfter?
No

### But we can do the same thing if we use .insertBefore with .nextSibling

```js
var content = document.querySelector( '.content' ),
  firstP = content.children[ 1 ],
  pText = document.createTextNode( 'bla, bla, bla' ),
  pEl = document.createElement( 'p' );

pEl.appendChild( pText );
content.insertBefore( pEl, firstP.nextSibling );

console.log( content.outerHTML );
```

## replaceChild()
Tell it your parent and inside that parent tell it, what you want to replace with your content

`parentEl.replaceChild( newEl, elToReplace )`

If you tell it to replace something that does not exist, you will get an error.
