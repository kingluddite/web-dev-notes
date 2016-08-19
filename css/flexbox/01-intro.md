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
  border-sizing: border-box;
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



