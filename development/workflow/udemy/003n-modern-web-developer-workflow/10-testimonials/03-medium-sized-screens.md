# Medium Sized Testimonial Screens
* 3 col layout for medium screens it too little **screen real estate** for 3 columns
* We'll change our atLarge from 1200 to 1010

`_mixins.css`

```css
@define-mixin atLarge {
  @media (min-width: 1010px) {
    @mixin-content;
  }
}
```

* Using the `atMedium` for 3 columns is too small, we'll change it to `atLarge`

```html
<div id="testimonials" class="page-section page-section--no-b-padding-until-large page-section--testimonials">
```

`_page-section.css`

```css
  &--no-b-padding-until-medium {
    padding-bottom: 0;

    @mixin atMedium {
      padding-bottom: 4.5rem;
    }
  }

  &--no-b-padding-until-large {
    padding-bottom: 0;

    @mixin atLarge {
      padding-bottom: 4.5rem;
    }
  }
```

`index.html`

```html
<div id="testimonials" class="page-section page-section--no-b-padding-until-large page-section--testimonials">
    <div class="wrapper wrapper--no-p-until-large">
```

`_wrapper.css`

```
&--no-p-until-medium {
  padding-left: 0;
  padding-right: 0;

  @mixin atMedium {
      padding-left: 18px;
      padding-right: 18px;
  }

}

&--no-p-until-large {
  padding-left: 0;
  padding-right: 0;

  @mixin atLarge {
      padding-left: 18px;
      padding-right: 18px;
  }

}
```

`index.html`

```html
<div class="row row--gutters row--equal-height-at-large row--gutters-small row--t-padding generic-content-container">
```

`_row.css`

```
  /* Begin Equal Height Rules */
  &--equal-height-at-medium {
    @mixin atMedium {
      display: flex;
    }

    & > div {
      float: none;
      display: flex;
    }
  }

  &--equal-height-at-large {
    @mixin atLarge {
      display: flex;
    }

    & > div {
      float: none;
      display: flex;
    }
  }
```

`index.html`

```html
<div class="row__large-4">
  // content
</div>
<!-- /.row__large-4 -->
<div class="row__large-4">
  // content
</div>
<!-- /.row__large-4 -->
<div class="row__large-4">
  // content
</div>
 <!-- /.row__large-4 -->
```

`_row.css`

Copy the medium section, paste and rename to:

```css
@mixin atLarge {

    &__b-margin-until-large {
      margin-bottom: 1rem;
    }

    &__large-4 {
      float: left;
      width: 33.33%;
    }

    &__large-4--larger {
      width: 37%;
    }

    &__large-6 {
      float: left;
      width: 50%;
    }

    &__large-8 {
      float: left;
      width: 66.66%;
    }

    &__large-8--smaller {
      width: 63%;
    }
  }
```

* We need to fix our padding and margin in testimonials

`_testimonial.css`

```
@mixin atMedium {
    margin-bottom: 0;
    padding: 0 1.875rem 1px 1.875rem;
  }
```

To

```
@mixin atLarge {
    margin-bottom: 0;
    padding: 0 1.875rem 1px 1.875rem;
  }
```

And change our `page-section` rule so background is not used until the large breakpoint

`_page-section.css`

```
&--testimonials {
    background-color: #e0e6ef;

    @mixin atLarge {
      background: url('/assets/images/testimonials-bg.jpg') top center no-repeat;
      background-size: cover;
    }
  }
```

* Testimonial section is now complete for every size

## Add high dpi images for each of the testimonial images

`index.html`

```
// more code
<div class="testimonial__photo">
  <img sizes="160px" srcset="assets/images/testimonial-jane.jpg 160w, assets/images/testimonial-jane-hi-dpi.jpg 320w" alt="Jane Doe">
</div>
// more code
<div class="testimonial__photo">
  <img sizes="160px" srcset="assets/images/testimonial-john.jpg 160w, assets/images/testimonial-john.jpg-hi-dpi 320w" alt="John Smith">
</div>
// more code
<div class="testimonial__photo">
  <img sizes="160px" srcset="assets/images/testimonial-cat.jpg 160w, assets/images/testimonial-cat-hi-dpi.jpg 320w" alt="Cat McKitty">
</div>
// more code
```

* Add `-i` to test images

## Time to Merge
`ctrl` + `c` to stop gulp watch

`$ git status`

`$ git add -A`

`$ git commit -m 'Complete Testimonials section'`

`$ git checkout master`

* Open a new tab

`$ gulp watch`

* Go to other Terminal tab in project
* Merge

`$ gulp merge testimonials`

* Push to GitHub

`$ git push origin master`

## Next
* Create a vector sprite
* We will take multiple SVG icon files
* Configure Gulp to combine them into one sprite file
    - Allows website to load faster for visitors
