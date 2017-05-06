# SCSS Media Query Mixins
Think of Mixins just like a JavaScript function

* We define it
* We call it
* It will do something (set some CSS properties)

## Basic Mixin
* `@media` is available in regular CSS
* `@mixin` does require you to be preprocessing your file

## Define Mixin
```
@mixin funky-border {
  border: 10px solid #ffa550;
}
```

### Call that mixin
```
.page-content__main {
  @include funky-border();
  display: flex;
  width: 100%;


  @media (min-width: 50rem) {
    width: $page-content-main-width;
  }
}
```

And that will add an orange border to our main content

![add mixin](https://i.imgur.com/yNERN59.png)

* When you call a mixin you are place those rules set in the mixin definition right where the call happens

### Mixins can have arguments
```
@mixin funky-border($border-size) {
  border: $border-size solid #ffa550;
}
// code
.page-content__main {
  display: flex;
  width: 100%;


  @media (min-width: 50rem) {
    @include funky-border(30px);
    width: $page-content-main-width;
  }
}
```

### Pass multiple arguments in mixin
```
@mixin funky-border($border-size, $border-color) {
  border: $border-size solid $border-color;
}
// more code
.page-content__main {
  display: flex;
  width: 100%;

  @media (min-width: 50rem) {
    @include funky-border(30px, #ffa550);
    width: $page-content-main-width;
  }
}
```

## Default mixin arguments
```
@mixin funky-border($border-size: 10px, $border-color: blue) {
  border: $border-size solid $border-color;
}
// more code
.page-content__main {
  display: flex;
  width: 100%;


  @media (min-width: 50rem) {
    @include funky-border(30px);
    width: $page-content-main-width;
  }
}
```

* Since you didn't pass a border-color when calling mixin, the default color of blue will be used
* We are not limited to just putting style properties inside mixins
    - We can also put selectors inside mixins

If I want to select everything that shows up inside of `.page-content__main` 

```
@mixin funky-border($border-size: 10px, $border-color: blue) {
  border: $border-size solid $border-color;

  * {
    color: green;
  }
}
```

That will change all elements inside main to that color (note if you type in the input or textarea they will change that color but that won't change the placeholder color)

[how to color HTML5 placeholders with CSS](http://stackoverflow.com/questions/9451902/changing-an-inputs-html5-placeholder-color-with-css-does-not-work-on-chrome)

## @content
When we call our mixin we can provide a block

```
.page-content__main {
  display: flex;
  width: 100%;

  @media (min-width: 50rem) {
    width: $page-content-main-width;

    @include funky-border() {
      color: yellow;
    };

  }
}
```

* View in browser and nothing has a yellow color added to it
    - But we do have access to these styles via **@content**

But if you add **@content** to the mixin:

```
@mixin funky-border($border-size: 10px, $border-color: blue) {
  border: $border-size solid $border-color;

  * {
    @content;
  }
}
```

* You'll now see the text is now yellow

## Exercise
* Create a mixin called `groovy-background`
* It has an argument it takes called `$background-color` with a pink default color
* Set the backgrond-color property equal to the argument
* Call the mixin and Make sure default value works
* Pass a different color and make sure that gets used when provided

<details>
  <summary>Solution</summary>
```
@mixin groovy-background($background-color: pink) {
  background-color: $background-color;
}
page-content {
  display: flex;
  height: $page-content-height;
  max-width: $site-max-width;
  margin: 0 auto;

  @media (min-width: 50rem) {
    @include groovy-background();
    padding: $large-space $space;
  }
}
```
</details>

## Create a mixin for our media query
This is so we don't have to use `@media (min-width: 50rem)` everywhere we want to add some styles for the desktop

```
@mixin desktop() {
  @media (min-width: 50rem) {
    @content;
  }
}
```

* We take whatever gets passed into the mixin and dump it right where **@content** is
* If there are no arguments, parenthesees are option so this:

```
.page-content {
  display: flex;
  height: $page-content-height;
  max-width: $site-max-width;
  margin: 0 auto;

  @include desktop() {
    padding: $large-space $space;
  }
}
```

Could become this

```
.page-content {
  display: flex;
  height: $page-content-height;
  max-width: $site-max-width;
  margin: 0 auto;

  @include desktop {
    padding: $large-space $space;
  }
}
```

* I think the parenthesees make it more readable so I keep them even if I have no arguments

```
@mixin desktop() {
  @media (min-width: 50rem) {
    @content;
  }
}

.page-content {
  display: flex;
  height: $page-content-height;
  max-width: $site-max-width;
  margin: 0 auto;

  @include desktop() {
    padding: $large-space $space;
  }
}

.page-content__sidebar {
  display: none;
  width: $page-content-sidebar-width;
  padding-right: $large-space;

  @include desktop() {
    display: flex;
  }
}

.page-content__main {
  display: flex;
  width: 100%;

  @include desktop() {
    width: $page-content-main-width;
  }
}
```

* Just like variables you have to define your mixin before it can be used

### Organize your mixins
Create a new folder called `mixins`

`imports/client/styles/mixins/_media-query-mixins.scss`

Cut and paste from `_page-content.scss` into `_media-query-mixins.scss`

```
@mixin desktop() {
  @media (min-width: 50rem) {
    @content;
  }
}
```

## In general you should import mixins right after variables
`imports/client/styles/_main.scss`

```
@import './variables';
@import './mixins/media-query-mixins'; // add this line
@import './base';
@import './components/boxed-view';
@import './components/button';
@import './components/editor';
@import './components/header';
@import './components/page-content';
@import './components/checkbox';
@import './components/item';
```

* Do a full page refresh and make sure mobile styles are still working

`$ git status`

`$ git add .`

`$ git commit -m 'Setup media queries for page content'`
