# Media Queries

## Nested Media Queries are possible
```
.content {
  .sidebar {
    color: white;
  }
  a {
    display: block;
    color: white;
  }
  @media (max-width: 480px) {
    background: red;
  }
}
```

another example
```css
/* Write your SCSS code below. */
@media screen and (orientation: landscape) {
  img {
    width: 360px;
  }
  ul#menu {
    li {
      @media screen (max-width: 500px) {
        text-align: center;
      }
    }
  }
}

```

# Interpolation

Why?

You get an error if you try this:
```css
@mixin color-class($color) {
  .$color {
    color: $color;
  }
}

@include color-class(red);
@include color-class(green);
@include color-class(blue);
```

But not an error if you use `Interpolation`

```css
@mixin color-class($color) {
  .#{$color} {
    color: $color;
  }
}

@include color-class(red);
@include color-class(green);
@include color-class(blue);
```

Can even use classes on Interpolation like this

```css
@mixin color-class($color) {
  .#{$color}.color {
    color: $color;
  }
}

@include color-class(red);
@include color-class(green);
@include color-class(blue);

```

Which will output this:

```css
.red.color {
  color: red; }

.green.color {
  color: green; }

.blue.color {
  color: blue; }
```

### Interpolation with Images

```css
@mixin color-class($color) {
  .#{$color}.color {
    color: $color;
    background-image: url("images/#{$color}.jpg");
  }
}

@include color-class(red);
@include color-class(green);
@include color-class(blue);
```

Outputs this:

```css
.red.color {
  color: red;
  background-image: url("images/red.jpg"); }

.green.color {
  color: green;
  background-image: url("images/green.jpg"); }

.blue.color {
  color: blue;
  background-image: url("images/blue.jpg"); }
```

## If and Conditionals

Only show a border if the color is red

```css
@mixin color-class($color) {
  .#{$color}.color {
    color: $color;
    background-image: url("images/#{$color}.jpg");
    @if $color == red {
      border: 1px solid black;
    }
  }
}

@include color-class(red);
@include color-class(green);
@include color-class(blue);
```

Output

```css
.red.color {
  color: red;
  background-image: url("images/red.jpg");
  border: 1px solid black; }

.green.color {
  color: green;
  background-image: url("images/green.jpg"); }

.blue.color {
  color: blue;
  background-image: url("images/blue.jpg"); }
```

**Note** If nothing is to get printed out Sass will just leave it out

Example with If(conditionals) and numbers

```css
@mixin box($width) {
  @if $width > 100px {
    padding: 0;
  }
}

div.nope {
  @include box(100px);
}
div.yep {
  @include box(101px);
}
```

Output
```css
div.yep {
  padding: 0; }
```

## If and Else
```css
@mixin box($width) {
  @if $width > 100px {
    padding: 0;
  } @else {
    padding: 100px;
  }
}
```

## If, Else If and Else
Just like JavaScript!

```css
@mixin box($width) {
  @if $width > 100px {
    padding: 0;
  } @else if $width == 200px {
    padding: 20px;
  } @else {
    padding: 100px;
  }
}
```

### You can also define class names in conditionals

```css
@mixin box($width) {
  @if $width > 100px {
    padding: 0;
  } @else if $width == 50px {
    padding: 20px;
    background: #d7d7d7;
    .big {
      content: "huge!";
    }
  } @else {
    padding: 100px;
  }
}

div {
  @include box(50px);
}
```

Output

```css
div {
  padding: 20px;
  background: #d7d7d7; }
  div .big {
    content: "huge!"; } 
```

Interpolation needs to use `"`(double quotes) and no`''`(single quotes)

```css
@mixin cars($make, $color) {
  .#{$make} {
    border: 1px solid black;
    background-image: url("#{$color}.png");
  }
}
```


# Loops

index.html
Create 100 `DIV` elements with a class of box.

style.scss
this will create a gradient

```css
.box {
  width: 100%;
  height: 10px;
}

@for $i from 1 through 100 {
  .box:nth-child(#{$i}) {
    background-color: darken(white, $i);
  }
}
```

Sass @each and list
```css
@each $member in thom, johnny, colin, phil {
  .bandmember .#{$member} {
    background: url("images/#{$member}.jpg");
  }
}

```

output css
```css
.bandmember .thom {
  background: url("images/thom.jpg"); }

.bandmember .johnny {
  background: url("images/johnny.jpg"); }

.bandmember .colin {
  background: url("images/colin.jpg"); }

.bandmember .phil {
  background: url("images/phil.jpg"); }

```

QUESTION
Use an @each loop to set the variable $color to the color red, then blue, and finally green. Use the loop to create three classes: .red_box, .blue_box, and .green_box. The background color for each class should be set to the corresponding color.
```
@each $color in red, blue, green {
  .#{"" + $color}_box {
    background: $color;
  }
}

```
## Advanced Mixin Arguments

```
@mixin band($members...) {
    @each $member in $members {
        .bandmember .#{$member} {
            background: url("images/#{$member}.jpg");
        }
    }
}

@include band(manny, moe, jack);
@include band(rick);
```

output

```
.bandmember .manny {
  background: url("images/manny.jpg"); }

.bandmember .moe {
  background: url("images/moe.jpg"); }

.bandmember .jack {
  background: url("images/jack.jpg"); }

.bandmember .rick {
  background: url("images/rick.jpg"); }
```
    
What if we want the band name and the members?

```
@mixin band($name, $members...) {
    @each $member in $members {
        .#{$name}.bandmember .#{$member} {
            background: url("images/#{$member}.jpg");
        }
    }
}

@include band(radiohead, manny, moe, jack);
@include band(nin, trent);
```

output

```
.radiohead.bandmember .manny {
  background: url("images/manny.jpg"); }

.radiohead.bandmember .moe {
  background: url("images/moe.jpg"); }

.radiohead.bandmember .jack {
  background: url("images/jack.jpg"); }

.nin.bandmember .trent {
  background: url("images/trent.jpg"); }
```

Notes on lists
Did you know this was a list?

```
div {
    margin: 0 0 0 10px;
}
```
* if you added commas instead of spaces, it would be wrong

So you could also write the previous list example like this:

And it will give you the same output
**NOT RECOMMENDED** Use commas as users will prefer it that way

```
@mixin band($name, $members) {
    @each $member in $members {
        .#{$name}.bandmember .#{$member} {
            background: url("images/#{$member}.jpg");
        }
    }
}
```

Other example
How do you know what the order of the arguments is?
* Can be confusing to your users of your mixin
* Order of arguments is important

```
@mixin box($size, $color) {
  width: $size;
  height: $size;
  background: $color;
}

a {
 @include box(10px, blue);
}
```

Output

```
a {
  width: 10px;
  height: 10px;
  background: blue; }
```

A better way would be name the variables and then the order doesn't matter.

```
@mixin box($size, $color) {
  width: $size;
  height: $size;
  background: $color;
}

a {
 @include box($color: blue, $size: 20px);
}
```

## Default Values

```
@mixin box($size: 10px, $color: blue, $display: block) {
  width: $size;
  height: $size;
  background: $color;
  display: $display;
}

a {
 @include box($color: blue, $size: 20px);
}
```

* give all default values and then you can put them in any order you want when you call them

Question
Design a mixin (called "rainbow") that can take any number of colors via the argument $colors.... Within the mixin, use the loop @each $color in $colors to create a class named after each color, and set its background to the corresponding color.


```
@mixin rainbow($colors...) {
  @each $color in $colors {
    .#{$color} {
     background: $color;
    }
  }
}
```
