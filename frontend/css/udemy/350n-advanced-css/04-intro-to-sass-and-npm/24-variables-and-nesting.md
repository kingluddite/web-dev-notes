# Variables and Nesting
* Use Code Pen web site
    - Log in
    - New Code Pen
    - Minimize JavaScript Editor
    - Choose SCSS as CSS Preprocessor

## Comments in Sass
* You can write them like you do in JavaScript!

## HTML fragment
```
// MORE CODE

<nav>
  <ul class="navigation">
    <li><a href="#">one</a></li>
    <li><a href="#">two</a></li>
    <li><a href="#">three</a></li>
  </ul>
  <div class="buttons">
    <a href="#" class="btn-main">Sign up</a>
    <a href="#" class="btn-hot">Get a quote</a>
  </div>
</nav>
// MORE CODE
```

## Our first variable
![bg yellow](https://i.imgur.com/gsmiGeU.png)

### CSS
```
// MORE CODE

* {
  margin: 0;
  padding: 0;
}

$color-primary: #f9ed69;
$color-secondary: #f08a5d;
$color-tertiary: #b8db5e;

nav {
  margin: 30px;
  background-color: $color-primary;
}
// MORE CODE
```

## Sharing Code is caring
* You don't need to log in to save and share code with someone
* Just click save button and cancel and send URL to who you want to share with

## View compiled CSS
* From CSS dropdown choose `View Compiled CSS`

![view compiled CSS](https://i.imgur.com/tGaa20x.png)

## Nested scss
```
// MORE CODE

.navigation {
  list-style: none;
  
  li {
    display: inline-block;
    margin-left: 30px;
  }
}
// MORE CODE
```

## Nesting using the `&`
* It will write the selector path up to and including the `&`

### Remove the margin on the first child of the li
* If you omit the `&` then it just indents nested code

```
// MORE CODE

.navigation {
  list-style: none;
  
  li {
    display: inline-block;
    margin-left: 30px;
    
    &:first-child { // .navigation li:first-child
      margin: 0
    }
  }
}
// MORE CODE
```

## Rule
* Don't nest deeper than 3 deep in Sass

```
// MORE CODE

.navigation {
  list-style: none;
  
  li {
    display: inline-block;
    margin-left: 30px;
    
    &:first-child {
      margin: 0
    }
    
    a {
      text-decoration: none;
    }
  }
}
// MORE CODE
```

```
// MORE CODE
$color-primary: #f9ed69; // yellow
$color-secondary: #f08a5d; // orange
$color-tertiary: #b8db5e; // pink
$color-text-dark: #333; // dark grey

// MORE CODE

 a:link {
      text-decoration: none;
      text-transform: uppercase;
      color: $color-text-dark;
    }
  }
}
```

* Buttons and floats

```
// MORE CODE

.navigation {
  list-style: none;
  float: left;

// MORE CODE

.buttons {
  float: right
}
// MORE CODE
```

* Because all the child elements of the container are floating the parent container loses all it's height and that is why the yellow bg disappears

## Inspect the element
* Hover over the `nav` and you'll see it pop up that there is a height of `0px`

![nav is 0px height](https://i.imgur.com/j6S5oTk.png)

## Add a clear fix to fix the collapsed element
* This adds a psuedo-element after the collapsed element

### SCSS
```
.clearfix::after {
    content: '';
    clear: both;
    display: table;
}
```

### HTML
```
// MORE CODE

<nav class="clearfix">
  <ul class="navigation">
    <li><a href="#">one</a></li>
    <li><a href="#">two</a></li>
    <li><a href="#">three</a></li>
  </ul>
// MORE CODE
```

## Improve by nesting clearfix
```
// MORE CODE

nav {
  margin: 30px;
  background-color: $color-primary;
  
  &::after { // clearfix
    content: '';
    clear: both;
    display: table;
  }
}

// MORE CODE
```

```
* {
  margin: 0;
  padding: 0;
}

$color-primary: #f9ed69; // yellow
$color-secondary: #f08a5d; // orange
$color-tertiary: #b8db5e; // pink
$color-text-dark: #333; // dark grey
$width-button: 150px;
$color-text-light: #eee;

nav {
  margin: 30px;
  background-color: $color-primary;
  
  &::after {
    content: '';
    clear: both;
    display: table;
  }
}



.navigation {
  list-style: none;
  float: left;
  
  li {
    display: inline-block;
    margin-left: 30px;
    
    &:first-child {
      margin: 0
    }
    
    a:link {
      text-decoration: none;
      text-transform: uppercase;
      color: $color-text-dark;
    }
  }
}

.buttons {
  float: right
}

.btn-main:link,
.btn-hot:link {
  padding: 10px;
  display: inline-block;
  text-align: center;
  border-radius: 100px;
  text-decoration: none;
  text-transform: uppercase;
  width: $width-button;
  color: $color-text-light;
}

.btn-main {
  &:link {
    background-color: $color-secondary;
  }
  
  &:hover {
    background-color: darken($color-secondary, 15%);
  }
}

.btn-hot {
  &:link {
    background-color: $color-tertiary;
  }
  
  &:hover {
    background-color: lighten($color-tertiary, 15%);
  }
}
```

[complete codepen of this example](https://codepen.io/kingluddite/pen/MWaEZYX?editors=1100)
