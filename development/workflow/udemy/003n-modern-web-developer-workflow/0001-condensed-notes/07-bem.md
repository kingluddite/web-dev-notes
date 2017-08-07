# BEM
Old way to target elements

`_large-hero.css`

```css
// more code

.large-hero h1 {
    font-weight: 300;
}
```

## BEM is better

* Give element a class

```css
.large-hero__title {
    font-weight: 300;
}
```

* Is it bad to add classes like this?
* Does it go against semantic HTML principles?
* We'll circle back to this topic again

## B.E.M.
Popular abstract way of thinking about our interface

* `B`lock
    - An independent reusable part of our design
    - hero section is a block
    - Each of the [4 elements in feature section](https://i.imgur.com/9wWdtq1.png) are blocks
    - blocks are independent (stand on their own)
        + can be reused
    - this is [a testimonial block](https://i.imgur.com/xu8Yj18.png)
* `E`lement
    - An element belongs to a block
    - It cannot be used outside of the block that it belongs to
    - `Your clarity` is an element ([screenshot](https://i.imgur.com/eqk6Ykk.png))
        + 'One trip away' is also an element
            * Both can't be reused anywhere else in the design
            * They are unique to the block
    - This image ([screenshot](https://i.imgur.com/U4YInul.png)) is an element to the block, we won't use this image anywhere else in the design
* `M`odifier
    - A modifier can be used on a block or an element to indicate a change to the default state of an object
    - We have a mobile design where the menu could be open or closed, the modifier would be when it is open ([screenshot](https://i.imgur.com/jn16yX0.png))
* We could have buttons used all over our site but since we reuse the button but make it look different at different times, it would be a modifier
    - default state of button `btn`
    - change the color elsewhere in the design `btn btn--orange`
    - and a larger button `btn btn--orange btn--large`

## BEM Takeaway
* CSS selectors should target elements directly with classes
  - Instead of relying on **type selectors**, **descendant selectors**, and **"the cascade"**
* Because we are limiting cascade we are free to move blocks around and reuse them throughout the page
    - we create a one-on-one relationship between a block of HTML and its CSS we don't need to worry about any parent elements trickling their styles down to our block and hurting the predictability of our blocks styles
* Blocks can be nested inside other blocks
* Identify patterns, and then create **single-responsibility** blocks
* BEM makes the relationship between our HTML and CSS crystal clear
    - Editing sites that are over year old can become a nightmare
    - You don't have the confidence to edit any CSS because you don't know where the styles are being used and what your changes might break
    - And if you can't edit existing CSS you just pile more spaghetti CSS on top of the existing spaghetti CSS
        + You create brand new CSS styles and plop them into the already enormous pile of existing CSS
        + That is not organized
        + That is not maintainable
        + That is a developers nightmare
        + With BEM you can come back a year later and confidently edit a project's styles because you always know where and how those rules affect the page

### What does `single-responsibility` mean?
* (two columns) [screenshot](https://i.imgur.com/ei5mSBl.png)
* (two columns) [screenshot](https://i.imgur.com/Nip3IUf.png)
* (three columns) [screenshot](https://i.imgur.com/CxMil6M.png)

Some columns are `50/50 width`, some are `25/75` (for two columns) and 3 columns are `33% * 3`

* The pattern is columns
* There is no reason to code a pattern more than once
  - We want to write modular reusable code

### So...for testimonials
* Create a block to represent column layouts
* Then create a block for testimonials to nest inside the column block
* We can reuse the column block throughout the page
    - the column block has the single responsibility of creating blocks
* We also create a testimonial block
    - The testimonial block has the single responsibility of creating testimonials

## Back to coding
`_large-hero.css`

```css
// more code
.large-hero__title {
  color: #2f5572;
  font-weight: 300;
  font-size: 4.8rem;
}
```

* We'll discuss what `rem` is in a bit
* It is just a responsive measurement

```html
<h1 class="large-hero__title">...</h1>
```

`index.html`

```html
// more code
<h2 class="large-hero__subtitle">One trip away.</h2>
// more code
```

`_large-hero.css`

```css
// more code
.large-hero__subtitle {
  color: #2f5572;
  font-weight: 300;
  font-size: 2.9rem;
}
```

## Nesting
We could use `PostCSS` to nest our code but [that would go against the BEM philosophy](https://en.bem.info/methodology/) of no nesting because that would lead to **specificity wars**

[reading assignment on specificity](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/)

### But nesting is cool because it helps you visualize the code better
#### Can we have the best of both worlds? Yes
* We will write Nested CSS to help us stay organized conceptually
* Without having Gulp compile things down to a descendant selector

##### Example of descendant selector
```css
.large-hero .large-hero__text-content {
  position: absolute;
  top: 50%;
  left: 0;

  text-align: center;
  transform: translateY(-50%);
  width: 100%;
}
```

## The Power of &
* `&` gives us the parent selector

`_large-hero.css`

```css
.large-hero {
  position: relative;

  &__text-content {
    position: absolute;
    top: 50%;
    left: 0;

    text-align: center;
    transform: translateY(-50%);
    width: 100%;
  }

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
}
```

* Checkout out the output in `temp`
* No descendant selectors!
* We have the best of both worlds!

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
