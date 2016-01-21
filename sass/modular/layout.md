# Layout

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Poly UI Kit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/application.css">
  </head>
  <body>
    <div class="container">
      <header role="banner"> 
        <a class="site-logo" href="/">
          <b class="srt">Poly - UI Toolkit</b>
        </a>
        <nav class="navbar" role="navigation">
          <span class="icn-toggle">
            <b class="srt">Toggle</b>
          </span>
          <ul class="nav">
            <li class="nav__item"><a href="#">Typography</a></li>
            <li class="nav__item"><a href="#">Buttons</a></li>
            <li class="nav__item"><a href="#">Forms</a></li>
            <li class="nav__item"><a href="#">Images</a></li>
            <li class="nav__item"><a href="#">Grid</a></li>
            <li class="nav__item--current"><a href="#">Navigation</a></li>
          </ul>
        </nav>     
      </header> 
      
      <h4>Typography</h4>
      <h1 class="headline-primary--grouped">Take a look at this amazing headline</h1>
      <h2 class="headline-secondary--grouped">Don't forget about the subtitle</h2>
      <p>This is a typical paragraph for the UI Kit. <a href="#">Here is what a link might look like</a>. The typical font family for this kit is Helvetica Neue.  This kit is intended for clean and refreshing web layouts. No jazz hands here, just the essentials to make dreams come true, with minimal clean web design. The kit comes fully equipped with everything from full responsive media styling to buttons to form fields. <em>I enjoy using italics as well from time to time</em>. Fell free to create the most amazing designs ever with this kit. I truly hope you enjoy not only the kit but this amazing paragraph as well. :)</p>
      <blockquote>You know what really gets me going? A really nice set of block quotes.  That's right, block quotes that say, "Hey, I'm an article you want to read and nurture."</blockquote>
  
      <h4>Buttons</h4>
      <a class="btn--default" href="#">Button Default</a>
      <a class="btn--success" href="#">Button Success</a>
      <a class="btn--error" href="#">Button Error</a>
      <button class="btn--warning">Button Warning</button>
      <button class="btn--info">Button Info</button>
           
      <h4>Form Elements</h4>
      <form>
        <label class="form__label--hidden" for="name">Name:</label> 
        <input class="form__input" type="text" id="name" placeholder="Name">
        
        <label class="form__label--hidden" for="email">Email:</label>
        <input class="form__input" type="email" id="email" placeholder="email@website.com">
  
        <label class="form__label--hidden" for="msg">Message:</label>
        <textarea class="form__input" id="msg" placeholder="Message..." rows="6"></textarea>
  
        <input class="btn--default" type="submit" value="Submit">
        <input class="btn--warning" type="reset" value="Reset">
      </form>
      
      <h4>Footer</h4>
      <footer role="contentinfo">
        <a class="site-logo" href="#">
          <b class="srt">Poly - UI Toolkit</b>
        </a>
        <p>A simple UI Kit for everyone to share and enjoy.</p>
      </footer>
    </div>
  </body>
</html>
```

application.scss

```css
// ==========================================================================
// Utilities
// ==========================================================================
@import "utilities/index";

// ==========================================================================
// Base Styles
// ==========================================================================
@import "base/index";

// ==========================================================================
// Layout Styles
// ==========================================================================
@import "layout/index";

// ==========================================================================
// Modules
// ==========================================================================
@import "modules/index";

// ==========================================================================
// States
// ==========================================================================
@import "states/index";

```

## Add
scss/layouts/extends.scss

```css
// ==========================================================================
// Placeholders
// ==========================================================================

%panel-default {
  padding-top: em(30px);
  padding-bottom: em(20px);
}

%panel-padding {
  padding-top: em(80px);
  padding-bottom: em(34px);
}
```

## Add
scss/layouts/_panel.scss

```css
 // ==========================================================================
// Panels
// ==========================================================================

.panel {
  @extend %panel-default;
  @include m(centered) {
    @extend %panel-default;
    @extend %center-align;
  }

  @include m(padded) {
    @extend %panel-padding;
    @include m(centered) {
      @extend %center-align;
      @extend %panel-padding;
    }
  }
}
```

## Modify index.html
* to give header and footer padding and centering

```html
...
<header role="banner" class="panel--padded--centered">
...
<footer role="contentinfo" class="panel--padded--centered">
...
```

# Images

We in `scss/base/_base.scss`
* give images 100% max-width

```css
// Images

img {
  margin-bottom: em(24px);
  max-width: 100%;
  height: auto;
}
```

Add to `scss/modules/_img.scss`

```css
.img {
  @include m(wrap) {
   border: 1px solid palette(grey, x-light);
   padding: em(12px);
  }

  @include m(avatar) {
    display: block;
    border-radius: $br--round;
  }
  @include m(hero) {
    margin-bottom: em(42px);
  }
}
```

Modify `index.html`

```html
...
<img class="img--hero" src="img/hero.jpg" alt="Poly Example">
<h4>Typography</h4>
...
<h4>Media</h4>
       <img src="img/sample.jpg" alt="Poly Example">
       <img class="img--wrap" src="img/sample.jpg" alt="Poly Example">
       <img class="img--avatar" src="img/avatar.png" alt="Poly Example">
      <h4>Footer</h4>
...
```

