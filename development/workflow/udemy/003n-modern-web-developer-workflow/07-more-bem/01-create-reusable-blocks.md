# Create Reusable Blocks
* Add padding to wrapper

`/app/assets/styles/modules/_wrapper.css`

```
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
}
```

## Import it
`styles.css`

```
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


