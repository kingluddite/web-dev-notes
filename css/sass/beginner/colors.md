# Colors

```css
$background: #cd3cc1;
$text-color: #3ccd48;
$highlighted-text-color: darken($text-color, 30%);
body {
  background: $background;
  font-family: sans-serif;
  color: $text-color;
}
a {
  color: $highlighted-text-color;
}
```

## Complementary Color
Color on opposite color of color wheel
![comp color](https://i.imgur.com/RGtz5lA.png)
```css
$background: #cd3cc1;
$text-color: complement($background);
```

# Importing Files
* split up scss into multiple files
* a partial Sass file will not be compiled into CSS

## Organize
* break you scss into multiple partials

### Partials
`_this-is-a-partial.scss`
* Create one file to import all your separate files

application.scss
```
@import "reset";
// Defining
@import "variables";
// Global Styles
@import "globals ";
// Page Specifics
@import "pages/about-us";
```

## Sass Libraries

### Bootstrap
* originally written in Sass
* [link](https://github.com/twbs/bootstrap-sass)

### Foundation
* written in Sass

### Compass
[compass link](http://compass-style.org/)

### Bourbon
[bourbon](http://bourbon.io/)
lighter version of compass
* bourbon install code directly into your project
#### Install
```
gem install bourbon
```

So you can use bourbon now in your project
Go to your project
```
$ bourbon install
```

in your scss file import bourbon
```
@import "bourbon/bourbon";

body {
  @include linear-gradient(to top, red, orange);
}
```
And it will output the correct CSS
```css
body {
  background-color: red;
  background-image: -webkit-linear-gradient(bottom, red, orange);
  background-image: linear-gradient(to top,red, orange); }
```

## Include fonts fast and easy
```css
h1 {
  font-family: $lucida-grande;
}
```

outputs
```css
h1 {
    font-family: "Lucida Grande", "Tahoma", "Verdana", "Arial", sans-serif; }
}
```

Cool!

**Note:**compass and libsass are not yet compatible

Bourbon is a lightweight library of mixins

# Sass Functions
html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sass Functions</title>
  <link rel="stylesheet" href="css/style-functions.css">
</head>
<body>
 <div class="color">&nbsp;</div>
 <div class="red">&nbsp;</div>
 <div class="blue">&nbsp;</div>
 <div class="green">&nbsp;</div>
</body>
</html>

```

```css
div {
  height: 100px;
  width: 255px;
  border: 1px solid black;
}
```

Why use a function instead of a mixin?
In functions you only can have inside another function or arithmetic 
* need to include `@return`

This function will generate boxes that show how much of red green and blue oare in different colors (visually)
```css
$color: #369;

@function pxify($value) {
  @return  unquote($value + "px");
}

div {
  height: 100px;
  width: 255px;
  border: 1px solid black;
}

.color {
  background: $color;
}

.red, .blue, .green {
  float: left;
}
.red {
  background: red;
  width: pxify(red($color));
}
.blue {
  background: blue;
  width: pxify(blue($color));
}
.green {
  background: green;
  width: pxify(green($color));
}
```

Use the `double` function to refactor the following code:
```css
div {
    font-size: 5px * 2;
}
```

**Answer**

```css
@function double($input) {
  @return $input * 2;
}

div {
  font-size: double(5px);
}
```

# Debugging
* Don't forget semi-colons
* If error is at end of file most likely you messed up on curly braces
* style option
* 
```
sass --style compressed style.scss
```

**trick/tip**
Avoids printing out in console
```
sass --style compressed main.scss:main.css
```

### Find line numbers
Or use sourcemaps!

```
sass -l css/scss/style-debug.scss:css/style-debug.css
```

## @warn

```
@mixin old {
  @warn "Please use new() instead";
}
body {
  background: $primary-color;
  font-family: Future, "Trebucket MS", sans-serif;
  > h1 {
    font-size: 3em;
    color: #eee;
    margin: $margin 0 0 $margin;
  }
  @include old;
}
```

You will see an error like this:

![@warn error](https://i.imgur.com/tG6kUKw.png)

* correct syntax for Sass comments
  - // Comment for Sass-only, /* Comment */ for CSS output comments


