# Style Header Part 1
## Git stuff
`$ git checkout -b header`

## Run gulp watch
`$ gulp watch`

## Add this class to `header` if it is not there

```html
<body>
  <header class="site-header">
```

## Import the css module
`styles.css`

## Create new css module
`/app/assets/styles/modules/_site-header.css`

`@import 'modules/_site-header.css';`

```css
.site-header {
  position: absolute;
}
```

## We lost our header!
* We need to take the header out of the normal `flow of the document`
* This makes it look like our header has disappeared
* But it is really just layered underneath the large **hero-section**

### Why is this?
* By default when two HTML elements are positioned in a way they will overlap the element that comes later in the HTML will sit on top
* `z-index` will give us control of which HTML **positioned** elements sit on top/behind

`_site-header.css`

```css
.site-header {
  position: absolute;
  z-index: 2;
}
```

### z-index
* Whichever HTML positioned element has a higher `z-index` will be placed on top
* Default `z-index` of any element is `auto` with exception of `<html>`
    - `<html>` has a default `z-index:0`
* `auto` means that element gets `z-index` from its **parent**
* the `large-hero` block doesn't have a `z-index` value
    - It is positioned `relative`
    - Which also takes it out of the flow of the document
    - Since `large-hero` is positioned but has no `z-index`, `site-header` will appear on top
      + Because it has a larger `z-index` value

You can see this by using Developer Tools (_in Chrome_) or any similar tool in other browser

* Here is what the computed value in Chrome dev tools looks like

![computed value](https://i.imgur.com/NcTzT81.png)

## Our header on top
![header on top](https://i.imgur.com/k82y9Tv.png)

## Add transparent blue background
`_site-header.css`

```css
.site-header {
  position: absolute;
  z-index: 2;
  
  background-color: rgba(47, 85, 114, .3);
}
```

* How are you supposed to figure out `rgba(47, 85, 114, .3)` values?
    - red, green, blue, alpha
    - Our mainBlue is `$2f5572`
        + What is the rgb equivalent of this color?
            * Paste into apps like
                - Photoshop
                - Sketch
                - Illustrator
* We can't do this:

`background-color: rgba($mainBlue, .3);`

* The web browser would not understand this
* But `PostCSS` can help us
* We can install a PostCSS plugin that will automatically convert hexadecimal color codes inside rgb values inside `rgba()` into the corresponding red, green and blue values

## Install the `postcss-hexrgba` plugin
* Stop Gulp Watch

`$ npm i postcss-hexrgba -D`

## Import it and use it
```js
// more code
mixins = require('postcss-mixins'), // don't forget the comma
hexrgba = require('postcss-hexrgba'); // add this line

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
// more code
});
```

* We add it right before `autoprefixer`

`_site-header.css`

```
.site-header {
  position: absolute;
  z-index: 2;

  background-color: rgba($mainBlue, 0.3);
}
```

* Change above line to: `background-color: rgba($mainBlue, .9);` and you will see header background grow more opaque
* Our plugin is working so put it back to `0.3` opacity

## Make our element cover the full page
* By default when you position elements absolutely it will try to `shrinkwrap` and only cover the elements it needs to fit its content
* We fix this by telling the element to have a width of `100%`

`_site-header.css`

```css
.site-header {
  position: absolute;
  z-index: 2;
  
  background-color: rgba($mainBlue, 0.3);
  width: 100%;
}
```

## Use our modular `wrapper` class to align horizontally
`index.html`

```html
<header class="site-header">
  <div class="wrapper">
    <img src="assets/images/icons/clear-view-escapes.svg">
    <a href="#" class="btn">Get in Touch</a>
    <nav>
      <ul>
        <li><a href="#our-beginning">Our Beginning</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
      </ul>
    </nav>
  </div>
  <!-- /.wrapper -->
</header>
```

## Move `Get in Touch` to top right of header
`index.html`

```html
<header class="site-header">
  <div class="wrapper">
    <img src="assets/images/icons/clear-view-escapes.svg">
    <div class="site-header__btn-container">
      <a href="#" class="btn">Get in Touch</a>
    </div>
    <!-- /.site-header__btn-container -->
    <nav>
```

`_site-header.css`

```css
.site-header {
  position: absolute;
  
  background-color: rgba($mainBlue, 0.3);
  width: 100%;
  z-index: 2;

  &__btn-container {
    float: right;
  }
}
```

## We'll make our own block for `nav`
* Because we will use it other places

```html
<nav class="primary-nav">
  <ul>
    <li><a href="#our-beginning">Our Beginning</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#testimonials">Testimonials</a></li>
  </ul>
</nav>
```

## Create new CSS module
`_primary-nav.css`

```css
.primary-nav {

}
```

## Import it
`styles.css`

```css
@import 'modules/_primary-nav';
```

## Add a modifier
* We don't want the main block to have a float as making it reusable will be harder

### Following BEM philosophy 100%
```html
<nav class="primary-nav primary-nav--pull-right">
  <ul class="primary-nav__list">
    <li class="primary-nav__item"><a class="primary-nav__link" href="#our-beginning">Our Beginning</a></li>
    <li class="primary-nav__item"><a class="primary-nav__link" href="#features">Features</a></li>
    <li class="primary-nav__item"><a class="primary-nav__link" href="#testimonials">Testimonials</a></li>
  </ul>
</nav>
```

Or you could use this CSS

```css
.primary-nav {

  &--pull-right {
    float: right;
  }

  ul {
    margin: 0;
    padding: 0;

    @mixin clearfix;
  }

  li {
    list-style: none;
    float: left;
  }

  a {
    color: $purple;
    font-weight: 300;
    text-decoration: none;
    display: block;
  }
}
```

With this HTML

```html
<nav class="primary-nav primary-nav--pull-right">
  <ul>
    <li><a href="#our-beginning">Our Beginning</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#testimonials">Testimonials</a></li>
  </ul>
</nav>
```

## Remove logo from flow of document
* That way the header container won't be aware the logo exists and won't change its height to match the logo's height

```html
<div class="wrapper">
  <div class="site-header__logo">
    <img src="assets/images/icons/clear-view-escapes.svg">
  </div>
```

`_site-header.css`

```css
.site-header {
  position: absolute;
  z-index: 2;
  
  background-color: rgba($mainBlue, 0.3);
  width: 100%;

  &__btn-container {
    float: right;
  }

  &__logo {
    position: absolute;

    background-color: $mainBlue;
    padding: 25px 36px;
  }
}
```

## Vertical spacing of navbar

`_site-header.css`

```
.site-header {
  position: absolute;
  z-index: 2;

  background-color: rgba($mainBlue, 0.3);
  padding: 10px 0; /* add this line */
  width: 100%;

  // more code
  &__logo {
    position: absolute;
    top: 0; /* add this line */
    
    background-color: $mainBlue;
    padding: 25px 36px;
  }
```

## Vertical center navbar
`_primary-nav.css`

```
/* more code */
  a {
    color: #fff;
    display: block;
    font-weight: 300;
    text-decoration: none;
    padding: 12px 0;
  }
}
```

* Use Chrome inspector to move links with arrow key 1px at a time to get it perfect to what you want

### Next
Make our header look good on small screens
