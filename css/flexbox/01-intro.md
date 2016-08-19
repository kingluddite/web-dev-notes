# Flex Intro

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Flexbox Tutorial</title>
  <link rel="stylesheet" href="normalize.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="container">
    <div class="box box1">1</div>
    <div class="box box2">2</div>
    <div class="box box3">3</div>
    <div class="box box4">4</div>
    <div class="box box5">5</div>
    <div class="box box6">6</div>
    <div class="box box7">7</div>
    <div class="box box8">8</div>
    <div class="box box9">9</div>
    <div class="box box10">10</div>
  </div>
</body>

</html>
```

```css
/* Box-size border-box */

* {
  box-sizing: border-box;
}

.box {
  color: white;
  font-size: 100px;
  text-align: center;
  text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}

/* colors for each box */

.box1 {
  background: green;
}
.box2 {
  background: blue;
}
.box3 {
  background: purple;
}
.box4 {
  background: #34495e;
}
.box5 {
  background: #f1c40f
}
.box6 {
  background: #e67e22
}
.box7 {
  background: #e74c3c
}
.box8 {
  background: #bdc3c7
}
.box9 {
  background: #2ecc71
}
.box10 {
  background: #16a085
}
```

use npm to install normalize.css

view page. see a bunch of block colors

## Start using flexbox

```css
.container {
  display: flex;
  /*display: inline-flex;*/
  border: 10px solid goldenrod;
}
```

view page and see how it changed
comment out flex and try inline-flex to see the difference

when you define the container as flex, the items inside become flex items

## vh
Viewport height
* makes the container stretch the entire height
* kind of like height 100% but a new way of doing it
* nothing to do with flexbox and you should not ever set height for dynamic content but for showing how flexbox works it helps so add this:

```css
.container {
  display: flex;
  /*display: inline-flex;*/
  border: 10px solid goldenrod;
  height: 100vh; /*add this line*/
}
```

## Flex direction
* axis
    - main
    - cross

[complete guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## flex direction
style.css

```css
.container {
  display: flex;
  border: 10px solid goldenrod;
  height: 100vh;
  flex-direction: row;
}
```

* nothing happens because that is the default of any flex container
    + will stack next to each other
    + span vertically to hit the height of the container 

#### Row
* **MAIN AXIS** in row is left to right
* **CROSS AXIS** goes from top to bottom
 
### flex-direction: column
* stack them vertically on top of each other

####
* **MAIN AXIS** goes from top to bottom
* **CROSS AXIS** goes from left to right

## row-reverse 

```css
.container {
  display: flex;
  border: 10px solid goldenrod;
  /* change this */
  min-height: 100vh;
  /* add this */
  flex-direction: row-reverse;
}
```

row goes in reverse direction
MAIN AXIS goes from right to left

## column-reverse

```css
.container {
  display: flex;
  border: 10px solid goldenrod;
  /* change this */
  min-height: 100vh;
  /* add this */
  flex-direction: column-reverse;
}
```

Main Axis goes from bottom to top

ask yourself what is my main axis? row is default

## Wrapping Elements with Flexbox

throw your knowledge of float out the window for a moment

```css
.container {
  display: flex;
  border: 10px solid goldenrod;
  /* change this */
  min-height: 100vh;
  /* add this */
  flex-wrap: nowrap; // default value
}

.box {
  width: 300px;
}
```

* nothing happens

* flexbox is flexible
* more forgiving than floats
* flex container and inside is the flex items
* add flex-wrap to flex container
    - default value is `nowrap`

### flex-wrap: wrap

```css
.container {
  display: flex;
  border: 10px solid goldenrod;
  /* change this */
  min-height: 100vh;
  /* add this */
  flex-wrap: wrap;
}

.box {
  width: 300px;
}
```

* wrap-reverse

## fill in space

```css
.container {
  display: flex;
  border: 10px solid goldenrod;
  /* change this */
  height: 100vh;
  /* add this */
  flex-wrap: wrap;
}

.box {
  width: 33.33333333%;
}
```

change to column

```css
.container {
  display: flex;
  border: 10px solid goldenrod;
  /* change this */
  height: 100vh;
  /* add this */
  flex-wrap: wrap;
  flex-direction: column;
}
```

![flex-direction column](https://i.imgur.com/rkFfhi6.png)

* have 100vh as height
* goes down until #7 and has no more space so goes to next column
* if you change to min-height: 100vh, it doesn't wrap to next column because it never hits min height
