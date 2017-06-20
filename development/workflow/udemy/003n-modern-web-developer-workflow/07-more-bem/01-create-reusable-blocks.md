# Create Reusable Blocks
* Add padding to wrapper

`/app/assets/styles/modules/_wrapper.css`

```css
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
}
```

## Import it
`styles.css`

```css
// more code
@import 'modules/_wrapper'; /* add this line */
@import 'modules/_large-hero';
@import 'modules/_btn';
```

* We'll add a new `div` and wrap our text inside it
* then We'll add the `wrapper` class to that new `div`

`index.html`

```html
<!-- MORE CODE -->
 <div class="large-hero__text-content">
      <div class="wrapper">
        <h1 class="large-hero__title">Your clarity.</h1>
        <h2 class="large-hero__subtitle">One trip away.</h2>
        <p class="large-hero__description">We create soul restoring journeys that inspire you to be you.</p>
        <p><a href="#" class="btn btn--orange btn--large">Get Started Today</a></p>
      </div>
      <!-- /.wrapper -->
    </div>
    <!-- /.large-hero__text-content -->
<!-- MORE CODE -->
```

### Test
* Run `$ gulp watch`
* Check it out in the browser
* We now have the spacing we need

![nice padding](https://i.imgur.com/0fhY7pp.png)

## Let's work on font sizing for these elements

`_large-hero.css`

```
// more code
&__title {
    color: $mainBlue;
    font-weight: 300;
    font-size: 2.4rem; /* modify this line */
    margin: 0;

// more code
```

### Reducing media queries
* We showed how to create smallest, small, medium and large but we can just use smallest and atSmall
* Delete the others

Change this:

`_large-hero.css`

```
// more code
&__title {
    color: $mainBlue;
    font-weight: 300;
    font-size: 2.4rem;
    margin: 0;

    @mixin atSmall {
      font-size: 2rem;
    }

    @mixin atMedium {
      font-size: 3.2rem;
    }

    @mixin atLarge {
      font-size: 4.8rem;
    }
  }

  &__subtitle {
    color: $mainBlue;
    font-weight: 300;
    font-size: 1.1rem;
    margin: 0;

    @mixin atSmall {
      font-size: 2rem;
    }

    @mixin atMedium {
      font-size: 3.2rem;
    }

    @mixin atLarge {
      font-size: 4.8rem;
    }
  }


// more code
```

to this

```
&__title {
    color: $mainBlue;
    font-weight: 300;
    font-size: 2.4rem;
    margin: 0;

    @mixin atSmall {
      font-size: 4.8rem;
    }
  }

  &__subtitle {
    color: $mainBlue;
    font-weight: 300;
    font-size: 1.5rem;
    margin: 0;

    @mixin atSmall {
      font-size: 2.9rem;
    }

  }
```

And make the description like this:

```
// more code
&__description {
    color: #fff;
    font-size: 1.1rem; /* 30 / 16 = 1.875rem */
    font-weight: 100;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, .1);
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;

    @mixin atSmall {
      font-size: 1.875rem;
    }
  }
// more code
```

* We want to make our button font size smaller on small screens
* We remove the font-size on smallest screens so it will default to 1rem

### Add 10px blue border to here section
`_large-hero.css`

```
// more code
.large-hero {
  border-bottom: 10px solid $mainBlue;
  position: relative;
// more code
```

* We need to remove the white space between the blue border and image

![blue border and white space](https://i.imgur.com/2A6y0bF.png)

* We need to make our hero image block instead of inline
* Add the class `large-hero__image`

`index.html`

```
// more code
<img class="large-hero__image" srcset="assets/images/hero--smaller.jpg 640w, assets/images/hero--smaller-hi-dpi.jpg 1280" alt="Coastal view of ocean and mountains" />
    </picture>
// more code
```

`_large-hero.css`

```
.large-hero {
  border-bottom: 10px solid $mainBlue;
  position: relative;

  &__image {
    display: block;
  }
// more code
```

* The white space is now gone
* How did that work?
    - By default browsers treat images as inline element
    - inline - a line of text `span`, `strong`, `em`
* Because the browser thinks the image is a line of text it wants to leave a little room for descender letters (like `g` and `y`) to hang below the line

![image inline room](https://i.imgur.com/jl4hbXm.png)

* By changing the element to a blocklevel element we are telling it to treat the image like a `div`
* [Read More About Block level vs Inline](https://www.impressivewebs.com/difference-block-inline-css/)

## Style the Intro Area
### Design Pattern
The white spacing at the top of each section is a design pattern

`/app/assets/styles/modules/_page-section.css`

```css
.page-section {
  padding: 4.5rem 0;
}
```

### Import to `styles.css`

`@import 'modules/_page-section';`


### Add to `index.html`
`<div id="our-beginning" class="page-section">`

* Top and bottom padding added

![top and bottom padding](https://i.imgur.com/5I3BapU.png)

* Our content in `our-beginning` section needs padding
* We will reuse `wrapper`

`index.html`

![wrap the wrapper](https://i.imgur.com/XvvFd5r.png)

#### Too wide
* If we have a 30 inch monitor, we don't want our web site to stretch 30 inches
* We need to set a max-width
* Too long text lines are terrible usability and way too long for human eye to comfortably read
    - [read more on line length](https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/)

* We will add a max-width of 1200px and horizontally centered in screen

`_wrapper.css`

```css
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
```

## The benefit of reusable blocks
`index.html`

```html
// more code
<div id="features" class="page-section page-section--blue">
    <div class="wrapper">
      ...
    </div>
    <!-- /.wrapper -->
</div>
<!-- /#features -->
<div id="testimonials" class="page-section">
    <div class="wrapper">
      ...
    </div>
    <!-- /.wrapper -->
</div>
<!-- /#testimonials -->
// more code
```

* We reuse our page-section class
* We add a block modifier `page-section--blue`
