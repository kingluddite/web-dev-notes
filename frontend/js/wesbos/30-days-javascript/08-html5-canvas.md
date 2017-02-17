# Fun with HTML5 canvas
## Starter
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Fun with HTML5 canvas</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<canvas id="draw" width="800" height="800"></canvas>
<script src="app.js"></script>
</body>
</html>
```

style.css

```css
html, body {
  margin: 0;
}
```

## Grab our element
`const canvas = document.querySelector('#draw');`

### What is context?
You don't draw on the canvas you draw on the `context` which can be `2D` or `3D`

`const ctx = canvas.getContext('2d');`

### Sizing up our canvas
We gave our canvas a default width and hight of 800x800 but we want to make it the exact width and height of our window

We want to resize our canvas size before we do any of our drawing

```js
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

Now if you view your page in the browser and you check out the canvas size you will see it changes width and height depending your browser inner height and width

### Base settings
```js
// base settings
// we need a color
ctx.strokeStyle = '#BADA55';
// when you draw a line should the end be square or round?
// lots of different opions
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
```

[MDN CanvasRenderingContext2D.lineJoin](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin)

[MDN CanvasRenderingContext2D.lineCap](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)

## Setting a draw flag
How do you know when you are drawing or not. When this variable we can use a boolean value to let us know when to draw or not. We can set that based on mouse click down `isDrawing` will be `true` and mouse click up `isDrawing` is set to false

## We need to know our starting and end points
When we draw we need to know where our line starts and ends

```js
// this will be the x and y coordinates of where we starting drawing
let lastX = 0;
let lastY = 0;
```

## Track our mouse movements
```js
function draw(e) {
  console.log(e);
}

canvas.addEventListener('mousemove', draw);
```

Checkout the inspector and move your mouse around the browser window. THe MouseEvent is fired a lot

On those mouse events we will see `offsetX, offsetY, movementX, movementY`

All this information about what happened. Where was the mouse when the event was fired

```js
function draw(e) {
  if (!isDrawing) return; // stop the fn running when they are not moused down
  console.log(e);
}

function stopDrawing() {
  isDrawing = false;
}
function startDrawing() {
  isDrawing = true;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousedown', startDrawing);
```

But a more efficient way would be:

```js
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousedown', => isDrawing = true);
```

But if you are using `eslint` you should expression with parenthesees

```js
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mousedown', () => (isDrawing = true));
canvas.addEventListener('mousedown', () => (isDrawing = true));
```

You must also check for the `mouseout` event because you can click down, leave the browser and then come back so it won't turn drawing off and so when you come back to the browser window you will automatically be drawing

```js
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mousedown', () => (isDrawing = true));
canvas.addEventListener('mouseout', () => (isDrawing = false));
```

Test and you should see it working

## Start drawing
```js
function draw(e) {
  if (!isDrawing) return; // stop the fn running when they are not moused down
  console.log(e);
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // move to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}
```

We won't see anything until we call stroke.

* offsetX and offsetY are coming from the event

View in browser and start drawing

### What is wrong?
Our starting point is always `0,0`

#### Fix
When we are done drawing we need to update `lastX` and `lastY`

```js
function draw(e) {
  if (!isDrawing) return; // stop the fn running when they are not moused down
  console.log(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
}
```

**ES6 Tip**

Define in 1 line instead of 2 by `Destructuring an array`

`[lastX, lastY] = [e.offsetX, e.offsetY];`

### Some problems
* First drawing always starts at 0,0 and we want it to start where our x and y coordinates are
* When I stop and start is only allows me to draw one continuous line

```js
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
```

* mousedown happens before we move our mouse (mousemove)

## Thicker Stroke
```js
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// add this line
ctx.lineWidth = 100;
```

Comment out `lineJoin` and `lineCap` lines to see default square line

### That was the basics of drawing on a canvas

## What is HSL?
[fun site](http://mothereffinghsl.com/)

`HSL` is the rainbow but you can programmatically select pieces of the rainbow

`H` (hue) - Red to Red
`S` (saturation) - How bright it is
`L` (lightness) - how light it is (all lightness is white, absence of lightness is black)

if `0` is red and `360` is other spectrum (so we can pick a number from 0 to 360 and we'll get the full colors of the rainbow)

```js
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0; // add this

function draw(e) {
  if (!isDrawing) return; 
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // add this
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}
```

Now when we draw we will draw a red line

### Change colors
```js
function draw(e) {
  if (!isDrawing) return; 
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; 
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++; // add this
}
```

Hue loops after 360 so it will not just go from red to red and stay red but this would be a better way to code hue

```js
hue += 1;
  if (hue >= 360) {
    hue = 0;
  }
```

## Change line width
```js
function draw(e) {
  if (!isDrawing) return;
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = hue; // add this line
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue += 1;
  if (hue >= 360) {
    hue = 0;
  }
}
```

Line gets super large thickness `359` and then starts over

### Update the function
```js
function draw(e) {
  if (!isDrawing) return; // stop the fn running when they are not moused down
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // ctx.lineWidth = hue;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  // lastX = e.offsetX;
  // lastY = e.offsetY;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue += 1;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth += 1;
  } else {
    ctx.lineWidth -= 1;
  }
}
```

Draw and you'll see the line thickness grow 100 and then reverse

## [Global Composite Operation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
(similar to Photoshop blend modes)

```js
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
ctx.globalCompositeOperation = 'multiply'; // add this line
```

