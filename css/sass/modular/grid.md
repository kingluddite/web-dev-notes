# Grids

## Add Grid config variables
`scss/utilities/_config.scss`

* add useful variables

```
// Grid
$g-col-width    : 65px;
$g-gutter-width : 20px;
$g-col-count    : 12;
$g-cont-max-w   : 1050px;
```

## Add grid function

`scss/utilities/_functions.scss`

```
// Set the "context" width for the grid
@function g-context($g-col-width, $g-col-count, $g-gutter-width) {
  $g-context: ($g-col-width * $g-col-count) + ($g-gutter-width * ($g-col-count - 1));
  @return $g-context;
}
```

## Add grid inside layout

`scss/layout/_grid-columns.scss`

```
/*===================================
=            Grid Column            =
===================================*/

// Calculate grid columns

@for $i from 1 through $g-col-count {

  $context: g-context($g-col-width, $g-col-count, $g-gutter-width);
  $target: ($g-col-width * $i) + ($g-gutter-width * ($i - 1));

  // Generate column modifier classes
  .grid__col--#{$i} {
    width: percentage($target / $context);
  }
}
```

## Change layouts _index.scss

`scss/layout/_index.scss`

* To make room for new grid layout file

```
// ==========================================================================
// Placeholder Selectors
// ==========================================================================
@import 'extends';

// ==========================================================================
// Panel
// ==========================================================================
@import 'panel';

// ==========================================================================
// Grid Container
// ==========================================================================
@import 'grid-container';

// ==========================================================================
// Grid Columns
// ==========================================================================
@import 'grid-columns';

```

Now when you view `application.css` you will see the grid css has been calculated. If you change the grid variable values in the config file, the grid will be recalculated (ie number of columns or width of gutter)

# Building the Grid Container

## Modify index.html to have grid classes

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
      <div class="grid__col--8">
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
      <div class="grid__col--12"> 
        <form class="form">
          <label class="form__label--hidden" for="name">Name:</label> 
          <input class="form__input" type="text" id="name" placeholder="Name">
          
          <label class="form__label--hidden" for="email">Email:</label>
          <input class="form__input" type="email" id="email" placeholder="email@website.com">
      
          <label class="form__label--hidden" for="msg">Message:</label>
          <textarea class="form__input" id="msg" placeholder="Message..." rows="6"></textarea>
      
          <input class="btn--default" type="submit" value="Submit">
          <input class="btn--warning" type="reset" value="Reset">
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
  </body>
</html>
```

## Add container

`scss/layout/_grid-container.scss`

```
/*======================================
=            Grid Container            =
======================================*/

.grid {
  @extend %clearfix;
  @extend .centered;
  width: 90%;

  // Make nested grid 100%
  [class*="grid__col--"] > & {
    width: 100%;
  }

  // Set a max-width grid container
  @media (min-width: 1100px) {
    width: 1050px;
  }
}
```

View in browser
To center typography add this code:

index.html

```html
...
<h4 class="grid">Typography</h4>

    <div class="grid">
      <div class="centered grid__col--8">
...
```

