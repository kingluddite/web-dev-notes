# Sass Mixins, Extends and functions
## codepen
* If you view inspector the interface changes
* To bring back HTML and CSS panes close inspector
* Copying codepen links paste the link as markdown in a markdown file!

## Mixins
* What is a mixin?
    - A reusable piece of code that we write into a mixin
    - Where ever we use the mixin that code is then placed where we called that mixin
        + Just think of a mixin like a huge variable with multiple lines of code

### Example of a mixin
* What if we wanted to use the `clearfix` code to fix floats all over our site

[complete codepen of this example](https://codepen.io/kingluddite/pen/MWaEZYX?editors=1100)

* It would not be practical to add this chuck of code inside all our elements

```
// MORE CODE

&::after {
    content: '';
    clear: both;
    display: table;
  }
// MORE CODE
```

### We first store that code as a mixin like this
* Remember think of it as a chunk of code stored in a variable ('fat variable')

```
// MORE CODE

// mixins
@mixin clearfix {
  &::after {
    content: '';
    clear: both;
    display: table;
  }
}

nav {
// MORE CODE
```

#### Now to consume the mixin (or use it)
```
// MORE CODE

nav {
  margin: 30px;
  background-color: $color-primary;
  
  @include clearfix;
}
// MORE CODE
```

### mixins help us avoid repeating code
* This follows the DRY principle

```
// MORE CODE

@mixin style-link-text {
  text-decoration: none;
  text-transform: uppercase;
  color: $color-text-light;
}
// MORE CODE

.navigation {

  // MORE CODE
  
  li {

    // MORE CODE
    
    a:link {
      @include style-link-text;
    }
  }
}

// MORE CODE

.btn-main:link,
.btn-hot:link {

  // MORE CODE
  
  @include style-link-text;
  
}

// MORE CODE
```

## But how can we pass in an argument to a mixin so we can override default values inside the mixin
* You need to create the mixin to accept the argument
    - We'll use $color
    - Then when you call that mixin you must pass that argument (or you'll get an error from codepen - you might need to save and refresh the page)

```
// MORE CODE
@mixin style-link-text($color) {
  text-decoration: none;
  text-transform: uppercase;
  color: $color;
}

// MORE CODE

.navigation {

  // MORE CODE
  
  li {
    
    // MORE CODE
    
    a:link {
      @include style-link-text($color-text-dark);
    }
  }
}

// MORE CODE

.btn-main:link,
.btn-hot:link {

  // MORE CODE
  
  @include style-link-text($color-text-light);
  
}

// MORE CODE
```

## functions
* We used function with `darken()` and `lighten()`
* A function takes arguments (just like a mixin) and it does something with those arguments and returns them
    - example: darken() will take a color and darken it and return that darken hex value

### custom functions
* You can write your own custom functions
* Let's take 2 numbers and divide and returnt them

### custom function syntax
* This is how you define a custom function in sass
* The function needs to have a name (so you can call it)

```
// MORE CODE

@function divideNums ($numOne, $numTwo) {
  @return $numOne / $numTwo;
}
// MORE CODE
```

### And invoke that function
```
// MORE CODE

nav {
  margin: divide(30, 2);
  background-color: $color-primary;
  
  @include clearfix;
}
// MORE CODE
```

* But that will give us an error
* The reason for the error is we give it the number 15 but CSS width needs a pixel measurement (unit of measurement)
* The best way to do this in sass is to multiple our function call by 1px

```
// MORE CODE

nav {
  margin: divide(30, 2) * 1px;
  background-color: $color-primary;
  
  @include clearfix;
}
// MORE CODE
```

## Extends
* This let's us create a placeholder and put a bunch of styles in there and then have other selectors "extend" that placeholder

### Sass Placeholder syntax
```
// MORE CODE

.buttons {
  float: right
}

%btn-placeholder {
  padding: 10px;
  display: inline-block;
  text-align: center;
  border-radius: 100px;
  width: $width-button;
  @include style-link-text($color-text-light);
}

.btn-main {
  &:link {
    @extend %btn-placeholder;
    background-color: $color-secondary;
  }
  
  &:hover {
    background-color: darken($color-secondary, 15%);
  }
}

.btn-hot {
  &:link {
    @extend %btn-placeholder;
    background-color: $color-tertiary;
  }
// MORE CODE
```

## Why did we not just write the above as a mixin instead of a placeholder
* To see the advantage of a placeholder in Sass look at the compiled code

`compiled as CSS`

```
// MORE CODE

.btn-main:link,
.btn-hot:link {
  padding: 10px;
  display: inline-block;
  text-align: center;
  border-radius: 100px;
  width: 150px;
  text-decoration: none;
  text-transform: uppercase;
  color: #eee;
}
// MORE CODE
```

* We see that we can write DRY in our source SCSS and it's not dry in our compiled code (which we don't care about) we only want to write DRY in our source code

### placeholder is very different than a mixin
* Our placeholder code was not copied to here:

```
// MORE CODE

.btn-main {
  &:link {
    @extend %btn-placeholder;
    background-color: $color-secondary;
  }
  
  // MORE CODE
}

.btn-hot {
  &:link {
    @extend %btn-placeholder;
    background-color: $color-tertiary;
  }
  
  // MORE CODE
}
// MORE CODE
```

* But what happened instead was the selector `.btn-main &:link` was copied to `%btn-placeholder`
* And if we did the same thing with a mixer than both code fragments would be pasted into both places
* So placeholders copy the selector to the placeholder rule and that is why both selectors are combined in the compiled CSS code and the all the properties are added to both of those selectors
* **note** You should only use `@extends` if the rules that you are extending are inherently and thematically related (and in our case our buttons are related - and that won't cause a maintenance problem further down the road)
* **many** front end developers don't use `@extends` and usually stick with `@mixins`

### Note
* Mixins, Functions and Extends don't produce any CSS at the end of the day their only use is to help us the developers with writing our code
