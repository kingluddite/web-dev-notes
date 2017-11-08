# Final hero section

`index.html`

```html
<!-- IE 9 comment here --->
    <div class="large-hero">
          <picture>
            <source srcset="assets/images/hero--large.jpg 1920w,
            assets/images/hero--large-hi-dpi.jpg 3840w" media="(min-width:
            1380px)" />
            <source srcset="assets/images/hero--medium.jpg 1380w, assets/images/hero--medium-hi-dpi.jpg 2760w" media="(min-width:
            990px)" />
            <source srcset="assets/images/hero--small.jpg 990w, assets/images/hero--small-hi-dpi.jpg 1980w" media="(min-width:
            640px)" />
            <img src="assets/images/hero--smaller.jpg" srcset="assets/images/hero--smaller.jpg 640w, assets/images/hero--smaller-hi-dpi.jpg 1280w" alt="Coastal view of ocean and mountains" class="large-hero__image" />
          </picture>

      <div class="large-hero__text-content">
          <div class="wrapper">
            <h1 class="large-hero__title">The Domsters Redux</h1>
            <h2 class="large-hero__subtitle">New and Improved!</h2>
            <p class="large-hero__description">Domsters was a cool site back
              in the day but it grew old and needed a facelift with a dose of
              modern technology. That was what we did with <strong>The Domsters
                Redux</strong>. Enjoy and let us know what you think.</p>
            <p><a class="btn btn--orange btn--large open-modal" href="contact.html">Do You Like?</a></p>
        </div><!-- /.wrapper -->
      </div>  
    </div><!-- /.large-hero -->

<!-- #home section here -->
```

`_large-hero.css`

```
.large-hero {
  position: relative;

  border-bottom: 1px solid $purple;

  &__text-content {
    position: absolute;
    top: 50%;
    left: 0;

    padding-top: 11rem;
    text-align: center;
    transform: translateY(-50%);
    width: 100%;

    @mixin atMedium {
      padding-top: 3rem;
    }
  }

  &__title {
    color: $purple;
    font-weight: 300;
    font-size: 4rem;
    margin: 0;

    /* think of atSmallest as mobile first design */
    @mixin atSmall {
      font-size: 3rem;
    }

    @mixin atMedium {
      font-size: 4rem;
    }

    @mixin atLarge {
      font-size: 4.8rem;
    }
    
  }

  &__subtitle {
    color: $blue;
    font-weight: 300;
    font-size: 2rem;
    margin: 0;

    @mixin atSmall {
      font-size: 2rem;
    }

    @mixin atMedium {
      font-size: 3.2rem;
    }

    @mixin atLarge {
      font-size: 4.8rem
    }
  }

  &__description {
    color: $white;
    font-size: 2rem;
    font-weight: 100;
    text-shadow: 2px 2px 0 rgba($black, 0.1);
    max-width: 30rem;
    margin: 1rem auto;

    @mixin atSmall {
      font-size: 1.875rem;
    }
  }
}
```

