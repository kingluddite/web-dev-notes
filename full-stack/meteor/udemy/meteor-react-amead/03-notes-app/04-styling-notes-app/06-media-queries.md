# Media Queries
Smush our app in the browser and it looks unusable

![bad mobile](https://i.imgur.com/PUxHncH.png)

## Goal
Hide sidebar on smaller screens

### What are Media Queries?
A way to conditionally add styles to your application

[Media Query Resource](http://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/)

### min-width
```
@media (min-width: 50rem) {
  .page-content__sidebar * {
    color: red;
  }
}
```

* The above media query says when the browser has a minimum width of` 50rem`'s, apply these styles
* That means these rules will only be applied to this element when the browser is equal to or wider than `50rem`
* With the browser smushed up slowly stretch it and once it is `50rem` wide it will turn the text red and it will stay red if you keep stretching it wider than `50rem`

![red text with min-width](https://i.imgur.com/wUuLXU4.png)

### max-width
```
@media (max-width: 50rem) {
  .page-content__sidebar * {
    color: red;
  }
}
```

## Point Break!

* This is the exact opposite
* Our text turns red when `50rem` or smaller
* This is known as a **breakpoint**

## What are `breakpoints`?
Where one transition is based off of width

* You can have multiple breakpoints in your app
    - mobile
    - tablets
    - laptops
    - desktops
* Normal to have 1 and up to 6 breakpoints

## Chaining together multiple queries
```
@media (max-width: 50rem) and (min-width: 30rem) {
  .page-content__sidebar * {
    color: red;
  }
}
```

* These rules will only apply when the max width is `50rem` and the min width is `30rem`
* This is possible but might not be the most practical use of media queries but it does let you know you can do some complex things with media queries
* We will just be targeting with `min-width` for our mobile styles
* You can comment this code out as we don't need it but you can keep it for reference

## Mobile First Approach
* Our core styles will be for mobile
* And then we'll add **breakpoints** that add on new styles as the browser size increases
* So to use this approach in our app we'll set **sidebar** to `display: none` as our core

```
// more code
.page-content__sidebar {
  display: none; // change from display: flex
  width: $page-content-sidebar-width;
  padding-right: $large-space;
}
// more code
```

But it will never show so we nest a media query to show it when it grows to `50rem`

```
// more code
.page-content__sidebar {
  display: none;
  width: $page-content-sidebar-width;
  padding-right: $large-space;

  @media (min-width: 50rem) {
    display: flex;
  }
}
// more code
```

* Try in browser and smush --> no `sidebar` but stretch and you'll see the `sidebar` appear when you hit the **50rem** breakpoint
* Notice we don't use a `selector` in the **@media** and it uses the code it is nested inside as the `selector` it will apply it's rules to

## Mobile first approach for `.page-content`
### Who needs phone padding?
* We don't need padding on phones so we put it in a media query

```
.page-content {
  display: flex;
  height: $page-content-height;
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $large-space $space;
}
// more code
```

And that becomes:

```
.page-content {
  display: flex;
  height: $page-content-height;
  max-width: $site-max-width;
  margin: 0 auto;

  @media (min-width: 50rem) {
    padding: $large-space $space;
  }
}
// more code
```

## Media Query Main
```
// more code
.page-content__main {
  display: flex;
  width: 100%; // add this line

  @media (min-width: 50rem) {
    width: $page-content-main-width;
  }
}
```

## Next Up
SCSS Media Query Mixins
