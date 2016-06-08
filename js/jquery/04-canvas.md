# Canvas

`index.html`

```html
<!DOCTYPE html>
<html>

<head>
  <title>Simple Drawing Application</title>
  <link rel="stylesheet" href="css/jquery-canvas.css">
</head>

<body>
  <canvas width="600" height="400"></canvas>
  <div class="controls">
    <ul>
      <li class="red selected"></li>
      <li class="blue"></li>
      <li class="yellow"></li>
    </ul>
    <button id="reveal-color-select">New Color</button>
    <div id="color-select">
      <span id="new-color"></span>
      <div class="sliders">
        <p>
          <label for="red">Red</label>
          <input id="red" name="red" type="range" min=0 max=255 value=0>
        </p>
        <p>
          <label for="green">Green</label>
          <input id="green" name="green" type="range" min=0 max=255 value=0>
        </p>
        <p>
          <label for="blue">Blue</label>
          <input id="blue" name="blue" type="range" min=0 max=255 value=0>
        </p>
      </div>
      <div>
        <button id="add-new-color">Add Color</button>
      </div>
    </div>
  </div>
  <script src="node_modules/jquery/dist/jquery.min.js"></script>
  <script src="js/jquery-canvas.js"></script>
</body>

</html>
```


`css/jquery-canvas.css`

```css
body {
  background: #384047;
  font-family: sans-serif;
}

canvas {
  background: #fff;
  display: block;
  margin: 50px auto 10px;
  border-radius: 5px;
  box-shadow: 0 4px 0 0 #222;
  cursor: url(../img/cursor.png), crosshair;
}

.controls {
  min-height: 60px;
  margin: 0 auto;
  width: 600px;
  border-radius: 5px;
  overflow: hidden;
}

ul {
  list-style: none;
  margin: 0;
  float: left;
  padding: 10px 0 20px;
  width: 100%;
  text-align: center;
}

ul li,
#new-color {
  display: block;
  height: 54px;
  width: 54px;
  border-radius: 60px;
  cursor: pointer;
  border: 0;
  box-shadow: 0 3px 0 0 #222;
}

ul li {
  display: inline-block;
  margin: 0 5px 10px;
}

.red {
  background: #fc4c4f;
}

.blue {
  background: #4fa3fc;
}

.yellow {
  background: #ECD13F;
}

.selected {
  border: 7px solid #fff;
  width: 40px;
  height: 40px;
}

button {
  background: #68B25B;
  box-shadow: 0 3px 0 0 #6A845F;
  color: #fff;
  outline: none;
  cursor: pointer;
  text-shadow: 0 1px #6A845F;
  display: block;
  font-size: 16px;
  line-height: 40px;
}

#reveal-color-select {
  border: none;
  border-radius: 5px;
  margin: 10px auto;
  padding: 5px 20px;
  width: 160px;
}


/* New Color Palette */

#color-select {
  background: #fff;
  border-radius: 5px;
  clear: both;
  margin: 20px auto 0;
  padding: 10px;
  width: 305px;
  position: relative;
  display: none;
}

#color-select:after {
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0);
  border-bottom-color: #fff;
  border-width: 10px;
  margin-left: -10px;
}

#new-color {
  width: 80px;
  height: 80px;
  border-radius: 3px;
  box-shadow: none;
  float: left;
  border: none;
  margin: 10px 20px 20px 10px;
}

.sliders p {
  margin: 8px 0;
  vertical-align: middle;
}

.sliders label {
  display: inline-block;
  margin: 0 10px 0 0;
  width: 35px;
  font-size: 14px;
  color: #6D574E;
}

.sliders input {
  position: relative;
  top: 2px;
}

#color-select button {
  border: none;
  border-top: 1px solid #6A845F;
  border-radius: 0 0 5px 5px;
  clear: both;
  margin: 10px -10px -7px;
  padding: 5px 10px;
  width: 325px;
}

```

`js/canvas.js`

```js
// when clicking on control list items
  // Deselect sibling elements
  // Select clicked element

// When new color is pressed
  // Show color select or hide the color colect

// when color sliders change
  // update the new color span

// when add color is pressed
  // append the color to the controls ul
  // Select the new color

// on mouse events on the canvas
  // Draw lines
```

`css()`

* get the value of a css property or set one

`siblings()`

* gets the siblings of each element in the set of matched elements, optionally filtered by a selector

update `js/jquery-canvas.js`

```js
var color = $( '.selected' ).css( 'background-color' );

// when clicking on control list items
$( '.controls li' ).click( function() {
  // Deselect sibling elements
  $( this ).siblings().removeClass( 'selected' );
  // Select clicked element
  $( this ).addClass( 'selected' );
  // cache current color
  color = $( this ).css( 'background-color' );
} );
```

* view in browser and click on the buttons and you'll see the background of that button change background color
* if you open the console and type `color` after clicking each button you'll see the result of caching the background color

![cached background color](https://i.imgur.com/L1DMnKl.png)

## Show Hide the Color Selector

`js/jquery-canvas.js`

```js
// When new color is pressed
$( '#reveal-color-select' ).click( function() {
  // Show color select or hide the color select
  $( '#color-select' ).toggle();
} );
```

View in the browser and you'll see when you click on 'new color` button, the color selector shows and hides.

## Update Slide Color

```js
// When new color is pressed
$( '#reveal-color-select' ).click( function() {
  // Show color select or hide the color select
  changeColor();
  $( '#color-select' ).toggle();
} );

// update the new color span
function changeColor() {
  var r, g, b;
  r = $( '#red' ).val();
  g = $( '#green' ).val();
  b = $( '#blue' ).val();

  $( '#new-color' ).css( 'background-color', "rgb(" + r + "," + g + ", " + b + ")" );
}

// when color sliders change
$( 'input[type=range]' ).change( changeColor );
```


View in the browser, toggle to show the color selector, drag the sliders and watch the color change.


## After Create Color Append it

`js/jquery-canvas.js`

```js
// when color sliders change
$( 'input[type=range]' ).change( changeColor );
// when "add color" is pressed
$( '#add-new-color' ).click( function() {
  var $newColor = $( '<li></li>' );
  $newColor.css(
    'background-color', $( '#new-color' ).css( 'background-color' )
  );
  // append the color to the controls ul
  $( '.controls ul' ).append( $newColor );
  // Select the new color
  $newColor.click();
} );
```

View in the browser.
Click New color and the select appears.
Drag to create your color
Click Add color and that color will be added to the 3 other buttons above the new color button. But it is not yet clickable.

The real problem is we have a listener for all LI elements on the page when the page load (inside controls). But when we create a a new LI element it is not bound to that click event because it is new. 

How do we dynamically add events to elements?

## watch out for deprecated items
`.delegate()`
* attach a handler to one or more events for all elements that match the selector, now OR IN THE FUTURE, based on a specific set of root elements
But this has been **deprecated**!

The API tells you to not use .delegate() and instead use .on()

`.on()`
* attach an event handler function for one or more events to the selected elements

So to make this work we change this:

```js
// when clicking on control list items
$( '.controls li' ).click( function() {
  // Deselect sibling elements
  $( this ).siblings().removeClass( 'selected' );
  // Select clicked element
  $( this ).addClass( 'selected' );
  // cache current color
  color = $( this ).css( 'background-color' );
} );
```

To this:

```js
// when clicking on control list items
$( '.controls li' ).on("click", function() {
  // Deselect sibling elements
  $( this ).siblings().removeClass( 'selected' );
  // Select clicked element
  $( this ).addClass( 'selected' );
  // cache current color
  color = $( this ).css( 'background-color' );
} );
```

but that won't work either. What we need to do is bind the click on the LI element like this

```js
// when clicking on control list items
$( '.controls' ).on( 'click', 'li', function() {
  // Deselect sibling elements
  $( this ).siblings().removeClass( 'selected' );
  // Select clicked element
  $( this ).addClass( 'selected' );
  // cache current color
  color = $( this ).css( 'background-color' );
} );
```

And that should do the trick. The new color button can now be clicked!

## Canvas
Is HTML5 and we use JavaScript to make it work (not jQuery)

The following are equivalent:
* document.getElementsByTagName('canvas')[0]
* $('canvas')[0]

var context
* you may also see people use the name `ctx`

### Add a new variable at top

```js
var color = $( '.selected' ).css( 'background-color' ),
  ctx = $( 'canvas' )[ 0 ].getContext( '2d' );
//[more code here]

// Draw lines
ctx.beginPath();
ctx.moveTo( 10, 10 );
ctx.lineTo( 20, 10 );
ctx.stroke();
```

just draws a very small 10px line

Now using the above concept, let's draw a box

```js
// Draw lines
ctx.beginPath();
ctx.moveTo( 10, 10 );
ctx.lineTo( 20, 10 );
ctx.lineTo( 20, 20 );
ctx.lineTo( 10, 20 );
//ctx.lineTo( 10, 10 );
ctx.closePath();
ctx.stroke();
```

* mousedown() vs click()
* mousemove()
* mouseup()

## Making our Canvas App draw

Add and update our varialbles

```js
var color = $( '.selected' ).css( 'background-color' ),
  $canvas = $( 'canvas' ),
  ctx = $canvas[ 0 ].getContext( '2d' ),
  lastEvent;
```

mousevent

```js
// on mouse events on the canvas
$canvas.mousedown( function( e ) {
  lastEvent = e;
} );
```

view in browser and click on page, then type `lastEvent` in console
and you should see something like this:

![lastEvent in console](https://i.imgur.com/dOxbrxZ.png)

* check out properties like offsetX and offsetY which we'll use in our drawing code

## Cool Canvas Drawing

```js
// on mouse events on the canvas
$canvas.mousedown( function( e ) {
  lastEvent = e;
} ).mousemove( function( e ) {
  // Draw lines
  ctx.beginPath();
  ctx.moveTo( lastEvent.offsetX, lastEvent.offsetY );
  ctx.lineTo( e.offsetX, e.offsetY );
  ctx.stroke();
} );
```

## Get drawing to work

```js
// on mouse events on the canvas
$canvas.mousedown( function( e ) {
  lastEvent = e;
} ).mousemove( function( e ) {
  // Draw lines
  ctx.beginPath();
  ctx.moveTo( lastEvent.offsetX, lastEvent.offsetY );
  ctx.lineTo( e.offsetX, e.offsetY );
  ctx.stroke();
  // this one line does the trick
  lastEvent = e;
} );
```

## functional canvas drawing

```js
var color = $( '.selected' ).css( 'background-color' ),
  $canvas = $( 'canvas' ),
  ctx = $canvas[ 0 ].getContext( '2d' ),
  lastEvent,
  mouseDown = false;

// code here

// on mouse events on the canvas
// on mouse events on the canvas
$canvas.mousedown( function( e ) {
  lastEvent = e;
  mouseDown = true;
} ).mousemove( function( e ) {
  // Draw lines
  if ( mouseDown ) {
    ctx.beginPath();

    ctx.moveTo( lastEvent.offsetX, lastEvent.offsetY );
    ctx.lineTo( e.offsetX, e.offsetY );
    ctx.stroke();
    lastEvent = e;
  }
} ).mouseup( function() {
  mouseDown = false;
} );
```

## Now add the colors to the drawing

```js
// on mouse events on the canvas
$canvas.mousedown( function( e ) {
  lastEvent = e;
  mouseDown = true;
} ).mousemove( function( e ) {
  // Draw lines
  if ( mouseDown ) {
    ctx.beginPath();

    ctx.moveTo( lastEvent.offsetX, lastEvent.offsetY );
    ctx.lineTo( e.offsetX, e.offsetY );
    // this add the stroke color
    ctx.strokeStyle = color;
    ctx.stroke();
    lastEvent = e;
  }
} ).mouseup( function() {
  mouseDown = false;
} );
```

And now our color drawing program works!

draw and then off stage and then back on, a bit of a bug

* mouseleave()

```js
// on mouse events on the canvas
$canvas.mousedown( function( e ) {
  lastEvent = e;
  mouseDown = true;
} ).mousemove( function( e ) {
  // Draw lines
  if ( mouseDown ) {
    ctx.beginPath();

    ctx.moveTo( lastEvent.offsetX, lastEvent.offsetY );
    ctx.lineTo( e.offsetX, e.offsetY );
    // this add the stroke color
    ctx.strokeStyle = color;
    ctx.stroke();
    lastEvent = e;
  }
} ).mouseup( function() {
  mouseDown = false;
} ).mouseleave( function() {
  // if someone draws and leaves canvas, stop drawning
  $canvas.mouseup();
} );
```

* so when we call $canvas.mouseup() and don't pass and event (e) it just calls the mouseup event and runs the function that sets our mouseDown variable to false


