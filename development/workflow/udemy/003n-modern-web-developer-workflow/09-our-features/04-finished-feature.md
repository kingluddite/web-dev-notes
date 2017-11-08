# Finished Feature section
`index.html`

```html
<!-- #home -->
<div id="features" class="page-section page-section--orange"
        data-matching-link="#features-link">
        <div class="wrapper">
          <h2 class="section-title"><span class="icon icon--star section-title__icon"></span> Our <strong>Features</strong></h2>
          
          <div class="row row--gutters-large generic-content-container">
            
        <div class="row__medium-6">

          <div class="feature-item">
            <span class="icon icon--rain feature-item__icon"></span>
            <h3 class="feature-item__title">The Home Page</h3>
            <p>The home page has some old school javascript to add an
            animation effect. It uses an old loader function instead of jQuery
            and it uses older forms of the DOM.</p>
          </div>

          <div class="feature-item">
            <span class="icon icon--globe feature-item__icon"></span>
            <h3 class="feature-item__title">The About Page</h3>
            <p>The About page has a way to show hide information using old
            school DOM manipulation.</p>
          </div>
        </div>
        <!-- /.row__medium-6 -->

        <div class="row__medium-6">
          <div class="feature-item">
            <span class="icon icon--wifi feature-item__icon"></span>
            <h3 class="feature-item__title">The Live Page</h3>
            <p>The Live Page has an interactive HTML table manipulating it
            with the
            DOM.</p>
          </div>
          <div class="feature-item">
            <span class="icon icon--fire feature-item__icon"></span>
            <h3 class="feature-item__title">The Photos Page</h3>
            <p>This page adds and image to the page dynamically and uses a neat
            no-page refresh needed effect to show how clicking on thumbnails
            updates the larger image and it's text</p>
          </div>
        </div>
        <!-- /.row__medium-6 -->
        
      </div>
      <!-- /.row -->

    </div><!-- ./wrapper -->

  </div><!-- #features -->

  <!-- #technologies -->
```

`_feature-item.css`

```
.feature-item {
  position: relative;
  padding-bottom: 3rem;
  
  @mixin atSmall {
    padding-left: 9.4rem;
  }

  &__icon {
    display: block;
    margin: 0 auto;
    @mixin atSmall {
      position: absolute;
      left: 0;
    }
  }

  &__title {
    font-size: 2.6rem;
    font-weight: 300;
    margin-top: 0.7rem;
    margin-bottom: 0.8rem;
    text-align: center;

    @mixin atSmall {
      margin-top: 1rem;
      font-size: 2rem;
      text-align: left;
    }
  }
}
```

`_page-sections.css`

```
.page-section {
  padding: 1.2rem 0;

  @mixin atMedium {
    padding: 4.5rem 0;
  }

  &--no-b-padding-until-medium {
    padding-bottom: 0;

    @mixin atMedium {
      padding-bottom: 4.5rem;
    }
  }

  &--orange {
    background-color: $orange;
    color: $white;
  }

  &--technologies {
    background-color: $light-blue;

    @mixin atLarge {
      &.lazyloaded {
         background: url('/assets/images/technologies-bg.jpg') top center no-repeat;
         background-size: cover;
      }
    }
  }
}
```

`_row.css`

```
.row {
  @mixin clearfix;

  &--t-padding {
    padding-top: 8rem;
  }

  &--gutters {
    margin-right: -6.5rem;
  }

  &--gutters-small {
    margin-right: -4.5rem;
  }

  &--gutters-large {
    margin-right: -10rem;
  }
  
  &--gutters > div {
    padding-right: 6.5rem;
  }

  &--gutters-large > div {
    padding-right: 10rem;
  }

  &__b-margin-until-medium {
    margin-bottom: 1rem;
  }

  @mixin atMedium {
    &__b-margin-until-medium {
      margin-bottom: 1rem;
    }

    &__medium-4 {
      float: left;
      width: 33.33%;
    }

    &__medium-4--larger {
      width: 37%;
    }

    &__medium-6 {
      float: left;
      width: 50%;
    }

    &__medium-8 {
      float: left;
      width: 66.66%;
    }

    &__medium-8--smaller {
      width: 63%;
    }
  }
  
  /* Begin Equal Height Rules */
  &--equal-height-at-large {
    @mixin atMedium {
      display: flex;
    }

    & > div {
      float: none;
      display: flex;
    }
  }
}
```

`_section-title.css`

```
.row {
  @mixin clearfix;

  &--t-padding {
    padding-top: 8rem;
  }

  &--gutters {
    margin-right: -6.5rem;
  }

  &--gutters-small {
    margin-right: -4.5rem;
  }

  &--gutters-large {
    margin-right: -10rem;
  }
  
  &--gutters > div {
    padding-right: 6.5rem;
  }

  &--gutters-large > div {
    padding-right: 10rem;
  }

  &__b-margin-until-medium {
    margin-bottom: 1rem;
  }

  @mixin atMedium {
    &__b-margin-until-medium {
      margin-bottom: 1rem;
    }

    &__medium-4 {
      float: left;
      width: 33.33%;
    }

    &__medium-4--larger {
      width: 37%;
    }

    &__medium-6 {
      float: left;
      width: 50%;
    }

    &__medium-8 {
      float: left;
      width: 66.66%;
    }

    &__medium-8--smaller {
      width: 63%;
    }
  }
  
  /* Begin Equal Height Rules */
  &--equal-height-at-large {
    @mixin atMedium {
      display: flex;
    }

    & > div {
      float: none;
      display: flex;
    }
  }
}
```

`_wrapper.css`

```
.wrapper {
  margin: 0 auto;
  max-width: 123.6rem;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  overflow: hidden;

  &--no-p-until-medium {
    padding: 0;
    left: 0;

    @mixin atMedium {
      padding-left: 1.8rem;
      padding-right: 1.8rem;
    }
  }

  &--medium {
    max-width: 97.6rem;
  }

  &--b-margin {
    margin-bottom: 1rem;

    @mixin atSmall {
      margin-bottom: 6.2rem;
    }
  }

  &--narrow {
    max-width: 470px;
  }

  .wrapper {
    padding-left: 0;
    padding-right: 0;
  }
}
```

