# Media Queries

Create break point variables in your config file:

base/_config.scss

```
// Breakpoints
$brkpoint-sm      : 1px;
$brkpoint-md      : 768px;
$brkpoint-lg      : 1100px;
```

Add a media query mixin to `utilities/_mixins.scss`

```
@mixin mq($break) {
  @if $break == "small" {
    @media (min-width: $brkpoint-sm) and (max-width: $brkpoint-md) {
      @content;
    }
  }
  @else if $break == "medium" {
    @media ( min-width: $brkpoint-md + 1) {
      @content;
    }
  }
  @else if $break == "large" {
    @media (min-width: $brkpoint-lg) {
      @content;
    }
  }
  @else {
    @error "Slow Down Partner! No value could be retrieved for `#{$break}`."
  }
}
```

So now we can change this:

layout/_grid-columns.scss
```
// ==========================================================================
// Grid Columns
// ==========================================================================

// Calculate grid columns

@media (min-width: 769px) {
  @for $i from 1 through $g-col-count {
    $context: g-context($g-col-width, $g-col-count ,$g-gutter-width) !global;
    $target: ($g-col-width * $i) + ($g-gutter-width * ($i - 1));

    // Generate column modifier classes
    .grid__col--#{$i} {
      width: percentage($target / $context);
    }
  }
}

// Column styles

[class^="grid__col--"] {
  @media (min-width: 1px) and (max-width: 768px) {
    margin-top: em(12px);
    margin-bottom: em(12px);
  }
  @media (min-width: 769px) {
    @include doubly(percentage($g-gutter-width / $context));
    float: left;
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
    &:last-of-type {
      float: right;
    }
  }
}
```

To this:

```
// ==========================================================================
// Grid Columns
// ==========================================================================

// Calculate grid columns

@include mq(medium) {
  @for $i from 1 through $g-col-count {
    $context: g-context($g-col-width, $g-col-count ,$g-gutter-width) !global;
    $target: ($g-col-width * $i) + ($g-gutter-width * ($i - 1));

    // Generate column modifier classes
    .grid__col--#{$i} {
      width: percentage($target / $context);
    }
  }
}

// Column styles

[class^="grid__col--"] {
  @include mq(medium) {
    margin-top: em(12px);
    margin-bottom: em(12px);
  }
  @include mq(small) {
    @include doubly(percentage($g-gutter-width / $context));
    float: left;
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
    &:last-of-type {
      float: right;
    }
  }
}
```

We can also make our column loop nicer with a mixin

Add this to bottom of `utilities/_mixins.scss`

```
// Grid columns
@mixin g-columns {
  @for $i from 1 through $g-col-count {
    $context: g-context($g-col-width, $g-col-count ,$g-gutter-width) !global;
    $target: ($g-col-width * $i) + ($g-gutter-width * ($i - 1));

    // Generate column modifier classes
    &--#{$i} {
      width: percentage($target / $context);
    }
  }
}
```

Update your code in `layout/_grid-columns.scss`

```
...
// Calculate grid columns
.grid_col {
  @include mq(medium) {
    @include g-columns;
  }
}
...
```

## Update Grid Container

layout/_grid-container.scss

Replace this:

```
// ==========================================================================
// Grid Container
// ==========================================================================

.grid {
  @extend %clearfix;
  @extend .centered;
  width: 90%;
 
  // Make nested grid 100%
  [class*="grid__col--"] > & {
    width: 100%; 
  }

  // Set a max-width for grid container
  @media (min-width: 1100px) {
    max-width: $g-cont-max-w;
  }
}
```

With this:

```
...
// Set a max-width for grid container
  @include mq(large) {
    max-width: $g-cont-max-w;
  }
}
```

We can also edit our extends file:

Change this:

```
// ==========================================================================
// Placeholders
// ==========================================================================

// Panel

%panel-default {
  padding-top: em(30px);
  padding-bottom: em(20px);
}

%panel-padding {
  padding-top: em(80px);
  padding-bottom: em(34px);
}
```

To this:

```
%panel-default {
  padding-top: em(30px);
  @include mq(medium) {
    padding-bottom: em(20px);
  }
}

%panel-padding {
  padding-top: em(34px);
  @include mq(medium) {
    padding-top: em(80px);
    padding-bottom: em(34px);
  }
}
```

Make nav responsive

Change this modules/_extends.scss

```
// Nav Items
%nav-item-disp {
  display: inline-block;
  margin: 0 em(12px);
}
```

To this:

```
%nav-item-horz {
  @include mq(medium) {
    display: inline-block;
    margin: 0 em(12px);
  }
}
```

update _/modules/\_nav.scss_

```
.nav__item {
  @extend %nav-item-horz;
  a {
    @extend %nav-item-link;
    color: palette(grey);
    &:hover {
      @extend %nav-item-on;
    }
  }
}
```

Now when you shrink the browser the links look great on phone using a `Mobile first approach`

And add this for phones

```
%nav-item-link {
  font-weight: $font-weight--light;
  text-align: center;
  font-size: em(18px);
  display: block;
  padding: em(8px, 18px);
  border-bottom: 1px solid transparent;
  @include mq(small) { // we add this!
    border-bottom-color: palette(grey, xx-light);
    padding-top: em(14px, 18px);
    padding-bottom: em(14px, 18px);
  }
}
```

## Media Queries and State

_state/\_index.scss_

```
// ==========================================================================
// Grid Display
// ==========================================================================
@import 'grid-display';

// ==========================================================================
// Collapsed State
// ==========================================================================
@import 'collapsed';

```

state/_collapseded.scss

```
/*=================================
=            Collapsed            =
=================================*/

.is-collapsed-mobile {
  @include mq(small) {
    visibility: collapse;
    padding: 0;
    height: 0;
    line-height: 0;
  }
}
```

state/_grid-display.scss
* using `@at-root`

```
/*====================================
=            Grid Display            =
====================================*/

.is-displayed-mobile {
  @include mq(small) {
    display: block;

    @at-root (with: media) {
      .is-hidden-mobile {
        display: none;
      }
    }
  }
  @include mq(medium) {
    display: none;
  }
}
```


_index.html_

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Poly UI Kit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/application.css">
  </head>
  <body>
    <div class="grid">
      <header class="grid__col--12 panel--padded--centered" role="banner"> 
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
    </div>
    
    <div class="grid">
      <div class="grid__col--12">
        <img class="img--hero" src="img/hero.jpg" alt="Poly - A simple UI Kit">
      </div>
    </div>
    
    <h4 class="grid">Typography</h4>
    
    <div class="grid">
      <div class="centered grid__col--8">
        <h1 class="headline-primary--grouped">Take a look at this amazing headline</h1>
        <h2 class="headline-secondary--grouped">Don't forget about the subtitle</h2>
        <p>This is a typical paragraph for the UI Kit. <a href="#">Here is what a link might look like</a>. The typical font family for this kit is Helvetica Neue.  This kit is intended for clean and refreshing web layouts. No jazz hands here, just the essentials to make dreams come true, with minimal clean web design. The kit comes fully equipped with everything from full responsive media styling to buttons to form fields. <em>I enjoy using italics as well from time to time</em>. Fell free to create the most amazing designs ever with this kit. I truly hope you enjoy not only the kit but this amazing paragraph as well. :)</p>
        <blockquote>You know what really gets me going? A really nice set of block quotes.  That's right, block quotes that say, "Hey, I'm an article you want to read and nurture."</blockquote>
      </div>
    </div>
  
    <h4 class="grid">Buttons</h4>
    
    <div class="grid">
      <div class="grid__col--12">
        <a class="btn--default" href="#">Button Default</a>
        <a class="btn--success" href="#">Button Success</a>
        <a class="btn--error" href="#">Button Error</a>
        <button class="btn--warning">Button Warning</button>
        <button class="btn--info">Button Info</button>
      </div>
    </div>
         
    <h4 class="grid">Form Elements</h4>
    
    <div class="grid">
      <div class="grid__col--7"> 
        <form class="form">
          <label class="form__label--hidden" for="name">Name:</label> 
          <input class="form__input" type="text" id="name" placeholder="Name">
          
          <label class="form__label--hidden" for="email">Email:</label>
          <input class="form__input" type="email" id="email" placeholder="email@website.com">
      
          <label class="form__label--hidden" for="msg">Message:</label>
          <textarea class="form__input" id="msg" placeholder="Message..." rows="7"></textarea>
      
          <input class="btn--default" type="submit" value="Submit">
          <input class="btn--warning" type="reset" value="Reset">
        </form>
      </div>
      <div class="grid__col--4">
        <img class="img--avatar" src="img/avatar.png" alt="Avatar">
        <form>
            <label class="form__label--hidden" for="username">Username:</label> 
            <input class="form__input" type="text" id="username" placeholder="Username">
            <label class="form__label--hidden" for="password">Password:</label>
            <input class="form__input" type="password" id="password" placeholder="Password">
            <input class="form__btn" type="submit" value="Login">
        </form>
      </div>
    </div>
    
    <h4 class="grid">Media</h4>
    
    <div class="grid">
      <div class="grid__col--5">
        <img src="img/sample.jpg" alt="sample image">
      </div>
      <div class="grid__col--5">
        <img class="img--wrap" src="img/sample.jpg" alt="sample image">
      </div>
      <div class="grid__col--2">
        <img class="img--avatar" src="img/avatar.png" alt="Avatar">
      </div>
    </div>
    
    <h4 class="grid">Footer</h4>
    
    <div class="grid">
      <footer class="grid__col--12 panel--padded--centered" role="contentinfo">
        <a class="site-logo" href="#">
          <b class="srt">Poly - UI Toolkit</b>
        </a>
        <p>A simple UI Kit for everyone to share and enjoy.</p>
      </footer>
    </div>
    <script>
      $('#toggle').click(function() {
        $(this).next('.nav').toggleClass("is-collapsed-mobile");
      });
    </script>
  </body>
</html>
```


update index.html

```html
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
```

To this:

```html
      <nav class="navbar" role="navigation">
          <span id="toggle" class="icn--nav-toggle is-displayed-mobile">
            <b class="srt">Toggle</b>
          </span>
          <ul class="nav is-collapsed-mobile">
            <li class="nav__item"><a href="#">Typography</a></li>
            <li class="nav__item"><a href="#">Buttons</a></li>
            <li class="nav__item"><a href="#">Forms</a></li>
            <li class="nav__item"><a href="#">Images</a></li>
            <li class="nav__item"><a href="#">Grid</a></li>
            <li class="nav__item--current"><a href="#">Navigation</a></li>
          </ul>
        </nav>
      </header>
    </div>

    <div class="grid is-hidden-mobile">
      <div class="grid__col--12">
        <img class="img--hero" src="img/hero.jpg" alt="Poly - A simple UI Kit">
      </div>
    </div>
```

Add some javascript

```html
...
<script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script>
      $('#toggle').click(function() {
        $(this).next('.nav').toggleClass("is-collapsed-mobile");
      });
    </script>
  </body>
</html>
```

Don't forget to add jQuery before call to use jQuery code.

Finished Github - https://github.com/Guilh/Poly

note: `@content` directive lets us pass custom styles to a mixin when including it.
