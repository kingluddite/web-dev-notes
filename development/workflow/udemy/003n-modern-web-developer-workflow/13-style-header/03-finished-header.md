# Finished Header

`index.html`

```html
<header class="site-header site-header--is-expanded"> 
      <div class="wrapper">
        <div class="site-header__logo">
          <div class="site-header__logo__graphic icon icon--clear-view-escapes section-title__icon">
            The Domsters
          </div>
        </div>
        <!-- /.site-header__logo -->

        <!-- .site-header__menu-icon MOBILE MENU -->
        <div class="site-header__menu-icon
          site-header__menu-icon--close">
          <div class="site-header__menu-icon__middle"></div>
        </div>
        <!-- /.site-header__menu-icon -->

        <!-- .site-header__menu-content -->
        <div class="site-header__menu-content
          site-header__menu-content--is-visible">
          <div class="site-header__btn-container">
            <a class="btn btn--orange open-modal" href="#">Get in Touch</a>
          </div>
          <nav class="primary-nav primary-nav--pull-right">
            <ul>
              <li><a href="#home" id="home-link">Home</a></li>
              <li><a href="#features" id="features-link">Features</a></li>
              <li><a href="#technologies" id="technologies-link">Technologies</a></li>
              <li><a href="#about" id="about-link">About</a></li>
              <li><a href="#photos" id="photos-link">Photos</a></li>
              <li><a href="#live" id="live-link">Live</a></li>
            </ul>
          </nav>
        </div>
        <!-- /.site-header__menu-content -->
      </div>
      <!-- /.wrapper -->
    </header>
```

`_primary-nav.css`

```css
.primary-nav {
  padding-top: 1rem;

  @mixin atMedium {
    padding-top: 0;
  }
  
  &--pull-right {
    @mixin atLarge {
      float: right;
    }
  }

  ul {
    margin: 0;
    padding: 0;

    @mixin clearfix;
  }

  li {
    list-style: none;
    display: inline-block;
    padding-right: 0.7rem;
    
    @mixin atMedium {
      float: left;
    }
  }

  a {
    background-color: rgba($blue, 0.5);
    color: $white;
    display: block;
    font-size: 1.5rem;
    font-weight: 300;
    padding: 0.5rem;
    margin: 0.5rem 0;
    text-decoration: none;

    @mixin atMedium {
      background-color: transparent;
      font-size: 3rem;
      padding: 1.2rem 0;

      &.is-current-link {
        color: #fabb69;
      }
    }
  }
}
```

`_site-header.css`

```css
.site-header {
  position: absolute;
  z-index: 2;

  padding: 1rem 0;
  transition: background-color 0.3s ease-out;
  width: 100%;

  /* when you scroll site-header is fixed at top */
  @mixin atMedium {
    position: fixed;

    background-color: rgba($blue, 0.3);

    &--dark {
      background-color: rgba(23, 51, 72, 1.0);
    }
  }

  &--is-expanded {
    background-color: rgba($blue, 0.55);
  }

  &__btn-container {
    @mixin atMedium {
      float: right;
    }
  }

  &__logo {
    position: absolute;
    top: 0;
    left: 50%;

    background-color: $purple;
    padding: 2.5rem 3.6rem;
    transform: translateX(-50%) scale(0.8);
    transform-origin: 50% 0;
    transition: transform 0.3s ease-out;

    @mixin atMedium {
      left: auto;
      transform: translateX(0) scale(1);

      .site-header--dark & {
        transform: scale(0.56);
      }
    }
  }

  /* gets rid of text by pushing it off screen */
  /* Kept on page for screen readers */
  &__logo__graphic {
    text-indent: -9999px;
  }

  /* hide the menu on phones */
  &__menu-content {
    position: relative;
    z-index: -10;

    opacity: 0;
    padding-top: 9rem;
    text-align: center;
    transform: scale(1.2);
    transition: all 0.3s ease-out;

    @mixin atMedium {
      z-index: 1;

      opacity: 1;
      padding-top: 0;
      transform: scale(1);
    }

    &--is-visible {
      z-index: 1;

      opacity: 1;
      transform: scale(1);
    }
  }

  &__menu-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;

    height: 2rem;
    width: 2rem;

    @mixin atMedium {
      display: none;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;

      background-color: $white;
      content: '';
      height: 0.3rem;
      width: 2rem;
      transform-origin: 0 0;
      transition: transform 0.3s ease-out;
    }

    &__middle {
      position: absolute;
      top: 0.7rem;
      left: 0;

      background-color: $white;
      height: 0.3rem;
      width: 2rem;
      transition: all 0.3s ease-out;
      transform-origin: 0 50%;
    }

    &::after {
      position: absolute;
      top: 1.4rem;
      bottom: 0;

      background-color: $white;
      content: '';
      height: 0.3rem;
      width: 2rem;
      transform-origin: 0 100%;
      transition: transform 0.3s ease-out;
    }
  }

  &__menu-icon--close-x {
    &::before {
      transform: rotate(45deg) scaleX(1.25);
    }
    
    .site-header__menu-icon__middle {
        opacity: 0;
        transform: scaleX(0);
     }
    
    &::after {
      transform: rotate(-45deg) scaleX(1.25) translateY(1px);
    }
  }
}
```

