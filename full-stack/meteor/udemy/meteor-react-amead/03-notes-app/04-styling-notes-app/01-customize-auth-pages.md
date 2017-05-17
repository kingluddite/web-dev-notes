# Customizing Auth Pages

## Change Boxed View Styles

`_base.scss`

```
html {
  font-size: 62.5%;
}

body {
  font-family: Helvetica, Arial, sans-serif; // updated
  font-size: $base-font-size;
  background-color: $body-bg-color; // updated
}
// more code
```

`_variables.scss`

```
// Colors
// $brand-primary: #5b4681;  // remove
$brand-primary: #397ab1;  // add
$grey: #dddddd;
$white: #ffffff;
$light-grey: #f9f9f9;
$dark-grey: #777777;

// Body
$body-bg-color: #fafafa; // add

// Spacing
$space: 1.4rem;
$site-max-width: 50rem;

// Font sizes
$base-font-size: 1.4rem;
$large-font-size: 1.8rem;

// Header
$header-bg: $brand-primary;
$header-color: $white;
$header-link-color: $white;

// Form inputs
$input-border: $grey;
$input-spacing: 1rem;

// Boxed view
$boxed-view-overlay-bg: $grey;
$boxed-view-bg: $white;
$boxed-view-border-color: $grey; // add
// more code
```

`_boxed-view.scss`

```
.boxed-view {
  align-items: center;
  // background: $boxed-view-overlay-bg; // remove this
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

// take up entire space of viewport
.boxed-view__modal {
  background: fade-out($boxed-view-overlay-bg, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.boxed-view__box {
  background-color: $boxed-view-bg;
  border: 1px solid $boxed-view-border-color; // add
  padding: 2.4rem;
  text-align: center;
  width: 24rem;
}
// more code
```

## Exercise
* Define a new variable `$body-default-color` as **#333333**
* Make sure to set `body` and `a` to that color

<details>
  <summary>Solution</summary>
  `_base.scss`

```
// more code
body {
  color: $body-default-color;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $base-font-size;
  background-color: $body-bg-color;
}
// more code
a {
  color: $body-default-color;
}
// more code
```

`_variables.scss`

```
// more code
// Body
$body-bg-color: #fafafa;
$body-default-color: #333333; // add this line
// more code
```
</details>

## Computed Styles
![h1 computed style](https://i.imgur.com/daQyS3u.png)
