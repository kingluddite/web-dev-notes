# Variables
* are like placeholders for a value
* all start with `$`
example: `$primary-color`

**Tip** Use $primary-color and $secondary-color as a starting point

Good way to set up your folder structure
root
* css
    - style.css (compiled)
    - scss
        + style.scss

```
$ sass --watch css/scss:css
```

* above will look for a scss folder inside a css folder and compile css inside the css folder

```
$primary-color: #963;
$margin: 5px;
.entry {
    background: $primary-color;
    margin: $margin;
    padding: $margin * 1.5; /* will calculate to 7.5 in css Cool! */
}
```
* You can do math with variables
* add subtract multiply and division

### Sass errors
Will show up on page
* You can not calculate px and em

## Mixins
Example
Before Mixins  
```css
.box {
  border-radius: 4px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
}

.button {
  border-radius: 4px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  background: #345;
}
```

After (Using Mixins)
1. Define a Mixin (@mixin mixin name)
2. Use a Mixin (@include mixin name)
```css
@mixin roundy {
  border-radius: 4px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
.box {
  @include roundy;
}

.button {
  @include roundy;
  background: #345;
}
```

Add Another Cool Mixin
```css
@mixin roundy {
  border-radius: 4px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
@mixin green-links {
  a {
    color: green;
    &:hover {
      color: blue;
    }
  }
}
.box {
  @include roundy;
  @include green-links;
}
```

Output in CSS
```css
.box {
  border-radius: 4px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px; }
  .box a {
    color: green; }
    .box a:hover {
      color: blue; }
```

## Passing arguments to Mixins
```css
@mixin roundy($radius-one, $radius-two) {
  border-radius: $radius-one;
  border-top-right-radius: $radius-two;
  border-bottom-left-radius: $radius-two;
}

.box {
  @include roundy(4px, 8px);
}
```

Refactored
```css
@mixin roundy($radius) {
  border-radius: $radius;
  border-top-right-radius: $radius * 2;
  border-bottom-left-radius: $radius * 2;
}

.box {
  @include roundy(4px);
}

.button {
  @include roundy(2px);
  background: #345;
}
```

Adding a color attribute
```css
@mixin roundy($radius, $color) {
  border-radius: $radius;
  border-top-right-radius: $radius * 2;
  border-bottom-left-radius: $radius * 2;
  a {
    color: $color;
  }
}

.box {
  @include roundy(4px, blue);
}

.button {
  @include roundy(2px, red);
  background: #345;
}
```

Output in CSS
```css
.box {
  border-radius: 4px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px; }
  .box a {
    color: blue; }

.button {
  border-radius: 2px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: #345; }
  .button a {
    color: red; }
```

### Golden Mixin Rule
IF you find yourself coding in a similar pattern 2 or 3 times - use a mixin
IF you use it 6 or more times - create a `Global Mixin`

## Extending Selectors
@extend directive
* `@extend` allows you to extend the attributes from one class or id onto another selector

```css
.bar {
  height: 14px;
  font-size: 10px;
  > div {
    float: left;
    clear: none;
  }
}

.menu {
   height: 14px;
  font-size: 10px;
  > div {
    float: left;
    clear: none;
  }
}
```

Both are using the same styles.

Better to use `@extend` like this
```css
.bar {
  height: 14px;
  font-size: 10px;
  > div {
    float: left;
    clear: none;
  }
}

.menu {
  @extend .bar;
}
```

Ouput
```css
.bar, .menu {
  height: 14px;
  font-size: 10px; }
  .bar > div, .menu > div {
    float: left;
    clear: none; }
```

## Placeholders
People weren't using .bar or the starting class in their scss so it was polluting their css. So Sass has `placeholders` to keep from polluting the production css

Example
```css
%bar {
  height: 14px;
  font-size: 10px;
  > div {
    float: left;
    clear: none;
  }
}

.menu {
  @extend %bar;
  color: #345;
}
```

Output
```css
.menu, .nav {
  height: 14px;
  font-size: 10px; }
  .menu > div, .nav > div {
    float: left;
    clear: none; }

.menu {
  color: #345; }
```

## Rule for when to use Mixin vs Extend
Mixins are great for arguments and advanced login
Extends are when you have attributes and you want to copy them
