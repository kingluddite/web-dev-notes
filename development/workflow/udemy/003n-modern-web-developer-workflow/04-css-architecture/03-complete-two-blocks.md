# Complete Two blocks
## Remove Margins
`_large-hero.css`

```css
  &__title {
    color: #2f5572;
    font-weight: 300;
    font-size: 4.8rem;
    margin: 0;
  }

  &__subtitle {
    color: #2f5572;
    font-weight: 300;
    font-size: 2.9rem;
    margin: 0;
  }
```

### Style hero paragraph
`index.html`

```html
// more code
<p class="large-hero__description">We create soul restoring journeys that inspire you to be you.</p>
// more code
```

`_large-hero.css`

```
// more code
&__description {
  color: #fff;
  font-size: 1.5rem;
}
// more code
```

## REM
* All of the following should use REM (instead of `px`, `em`)
  - Padding
  - Margin
  - Font-Size

### What is REM?
* When we use `rem` everything is relative to the root of the page
* The root of every page is `html`
* Most browsers have a default size of `html` of 16px
  - 16px * 1.5rem = 24px

### Why use REM?
* Not everyone has their web browser configured the same
* Other people may change their default `html` font size to deal with stuff like:
  - eye problems
  - near-sighted
  - far-sighted 
  - or just avoiding eye-strain
    + (_they may have their `html` configured to use `30px`_)

##### As a good web developer we want to honor the user's font size preference
* If we use REM for font-size, padding and margin our entire web site, all the white-space and balance will scale accordingly to the user's font-size preference
  - If we used `px` our **font-size** would be set in stone
  - If the user had a larger **font-size**, the text might appear too big for the layout surrounding it

### How can we eliminate guesswork with font-sizes?
`_large-hero.css`

```css
&__description {
  color: #fff;
  font-size: 1.875rem; /* 30 / 16 = 1.875rem */
  font-weight: 100;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, .1);
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
}
```

* Instead of tweaking and tweaking numbers, is their a faster way to find out what our font size should be?
* Open the photoshop file for measurements
* Make element on two lines
  - Set a `max-width: 480px` and it will wrap
  - But that will move text to the left
    + It is still centered in it's `480px` wide box but it is now on the left side of the page
  - We need to convert 480px to rem `480 / 16` = 30rem

![left side of page](https://i.imgur.com/4tyQ8cT.png)

## Styling the btn block
* Add our `btn` class to our default button

`index.html`

```html
// more code
  <header>
    <img src="assets/images/icons/clear-view-escapes.svg">
    <a href="#" class="btn">Get in Touch</a>
// more code
```

### Adding Variables
`/app/styles/base/_variables.css`

```
$mainBlue: #2f5572;
```

`/app/styles/modules/_btn.css`

```css
.btn {
  background-color: $mainBlue;
  color: #fff;
}
```

### Import the partial
`styles.css`

```css
@import 'normalize.css';
@import 'base/_variables';
@import 'base/_global';
@import 'modules/_large-hero';
@import 'modules/_btn';
```

### Update other blue colors
`_large-hero.css`

```css
  &__title {
    color: $mainBlue;
    font-weight: 300;
    font-size: 4.8rem;
    margin: 0;
  }

  &__subtitle {
    color: $mainBlue;
    font-weight: 300;
    font-size: 2.9rem;
    margin: 0;
  }
```

* I like **single quotes** `''` for css
* The order of the imports is important for obvious reasons

### Making improvements on button
`_btn.css`

```css
.btn {
  background-color: $mainBlue;
  color: #fff;
  text-decoration: none;
  padding: .75rem 1.2rem;
  display: inline-block;
}
```

* Because we give it padding we also want to give it a display of `inline-block`
  - Info on what `inline-block` does [read this stackoverflow article](https://stackoverflow.com/questions/9189810/css-display-inline-vs-inline-block)
  - This helps the parent and surrounding elements to be away of of its vertical padding

## Errors break the gulp-watch task
* Just restart with `$gulp watch`

### Our default button

![default button](https://i.imgur.com/R58PTrk.png)

### Styling another button
`index.html`

```html
// more code
<footer>
    <p>Copyright &copy; 2016 Clear View Escapes. All rights reserved. <a href="#" class="btn">Get in Touch</a></p>
  </footer>
// more code
```

* That makes our button look like our other button
* But now we want to use a `BEM modifier`

### Adding a BEM modifier for our button
```html
// more code
<footer>
    <p>Copyright &copy; 2016 Clear View Escapes. All rights reserved. <a href="#" class="btn btn--orange">Get in Touch</a></p>
  </footer>
// more code
```

### Add to our btn module
`_btn.css`

```css
.btn {
  background-color: $mainBlue;
  color: #fff;
  display: inline-block;
  padding: .75rem 1.2rem;
  text-decoration: none;

  &--orange {
    background-color: $mainOrange;
  }
}
```

## Add our variable
`_variables.css`

```
$mainBlue: #2f5572;
$mainOrange: #d59541;
```

### Orange button

![orange button](https://i.imgur.com/gB8kJSr.png)

### Make our button large
`index.html`

```html
// more code
<p><a href="#" class="btn btn--orange btn--large">Get Started Today</a></p>
    </div>
    <!-- /.large-hero__text-content -->
// more code
```

`_btn.css`

```css
// more code
  &--orange {
    background-color: $mainOrange;
  }

  &--large {
    font-size: 1.25rem;
    padding: 1.1rem 1.9rem;
  }
}
```

* Make changes to `index.html` and watch the browser refresh on its own
