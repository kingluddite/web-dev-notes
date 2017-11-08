# Mobile fix
* If your mobile box is not working properly, make sure you don't have the dynamically generated classes hardcoded into `index.html`

```html
<header class="site-header"> 
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
        <div class="site-header__menu-content">
```

