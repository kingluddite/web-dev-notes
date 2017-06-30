# BEM
Old way to target elements

`_large-hero.css`

```css
// more code

.large-hero h1 {
    font-weight: 300;
}
```

BEM is better

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

## How does BEM deal with the semantics of our HTML?
Is adding all these extra classes with presentational names making our HTML less semantic? **No**

### Nicolas Gallagher
  * Creator of `Normalize.css` says:
  * Well known and respected in internet community
  * Great [article to read for homework](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)
  * He says:
    - "Class names cannot be 'unsemantic'"
    - "Content-layer semantics are already served by HTML elements"
    - "Class names impart little or no useful semantic information to machines or human visitors"
    - "The primary purpose of a class name is to be a hook for CSS and JavaScript"
    - "Class names should communicate useful information to developers"

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
  -webkit-transform: translateY(-50%);
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
  }

  &__subtitle {
    color: #2f5572;
    font-weight: 300;
    font-size: 2.9rem;
  }
}
```

* Checkout out the output in `temp`
* No descendant selectors!
* We have the best of both worlds!
