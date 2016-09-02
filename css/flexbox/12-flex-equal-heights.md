# Flexbox equal height columns and leftover elements

**equal-height-style.css**

```css
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: sans-serif;
  margin: 0;
  background: #3CA55C;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #3CA55C, #B5AC49);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #3CA55C, #B5AC49);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

a {
  color: white;
}

.item.large {
  font-size: 40px
}

.item.small {
  font-size: 20px;
}

.item {
  background: rgba(255, 255, 255, 0.2);
  margin: 10px;
  padding: 20px;
  font-size: 30px;
}


/* flexbox starts here */
```

**equal-height-index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Flexbox Equal heights</title>
  <link rel="stylesheet" href="node_modules/normalize.css">
  <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/equal-height-style.css">
</head>

<body>
  <div class="elements">
    <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item large">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item small">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item small">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item small">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item large">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item">[guitar]</div>
    <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item small">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
    <div class="item large">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
  </div>
</body>

</html>
```

now add this:

```css
.elements {
  display: flex;
}
```

and all the elements will be in a row and not wrap

we need to turn wrapping on with:

```css
.elements {
  display: flex;
  flex-wrap: wrap; // add this line
}
```

now give grow, shrink width

```css
.item {
  flex: 1 1 33.33%;
}
```

why not 3 columns?
because of the 10px margin in .item

use this

```css
.item {
  flex: 1 1 calc(33.33% - 20px);
}
```

we use 20px because left and right margin of 10px = 20px

now we have 3 columns

## Flexbox single line form

coverr.co

the `.cover` class
100vh 
100vw 

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Single Line Form Flexbox</title>
  <link rel="stylesheet" href="node_modules/normalize.css">
  <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="">
</head>

<body>
  <div class="cover">
    <form action="" class="flex-form">
      <input type="search" placeholder="Where do you want to go?">
      <label for="from">From</label>
      <input type="date" name="from">
      <label for="to">To</label>
      <input type="date" name="to">
      <select name="" id="">
        <option value="1">1 Guest</option>
        <option value="2">2 Guest</option>
        <option value="3">3 Guest</option>
        <option value="4">4 Guest</option>
        <option value="5">5 Guest</option>
      </select>
      <input type="submit" value="Search">
    </form>
  </div>
  <video class="comics" src="img/Comics/MP4/Comics.mp4" autoplay loop></video>
</body>

</html>
```


