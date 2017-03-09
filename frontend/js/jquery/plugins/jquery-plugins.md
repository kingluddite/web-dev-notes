# jQuery plugins
* jCalculator
* jQuery Adabptive Modal
* jQuery ListNav
* Vide
* Lightbox 2
* jQuery UI

## How to find jQuery plugins

jQuery Plugin Registry (shutdown)

[Sitepoint Popular jQuery Plugins List Directory](https://www.sitepoint.com/jquery-popular-plugins-list/)

[Unheap.com](http://www.unheap.com/)

## Tips to finding a good jQuery plugin
* Find Plugins You Need
* Clear documentation
* Actively developed
    - How old it is and if they're still working on it
    - If it has a github page, you can tell if they are working on, how often and for how long
* Responsive
* Mobile friendly
    - Touch gestures (_finger swipe or pinch_)
* [FSVS](http://luke.sno.wden.co.uk/full-screen-vertical-scroll)
    - Full Screen Vertical Slider using CSS3 transitions followed up by a jQuery fallback.

## What do jQuery plugins include?
* A CSS file (_optional_)
* a JS file (_required_)
* Images (_optional_)

## Animsition
[demo link](http://git.blivesta.com/animsition/)

* jQuery plugin that helps you animate between pages
* It's on github
* Files you need and don't need
* `dist` folder
    - Files author is distributing
* Download vs git clone
* `maps` vs `min` files

#### Steps to Download Animsition
Rename `dist` the name of plugin (animsition)
Move all the `css` and `js` files into the `animsition` folder
Delete the `css` and `js` empty folders.
Download jQuery (use npm to make process quick and efficient)

1. Position of plugin `css` file
    * Add link to **HTML**
    * Put before your custom `css` file

```html
<link rel="stylesheet" href="js/animsition/animsition.min.css">
<link rel="stylesheet" href="css/style.css">
```

2. Add jQuery file
    - Put at bottom of html (before `</body>`)

```html
<script src="js/jquery-1.11.2.min.js"></script>
```

3. Add min animsition file

```html
<script src="js/jquery-1.11.2.min.js"></script>
<script src="js/animsition/jquery.animsition.min.js"></script>
```

## Do the same thing but replace with `npm`

### Documentation
Use documentation to structure HTML a certain way

```html
<div class="animsition">[rest of code]</div>
```

### Custom JavaScript
Add your custom js
* To make program work you'll need to add your own js either externally (_preferred_) or just a set of `<script>` tags on a page

```html
<script>
  // your code here
</script>
```

### Selecting jQuery elements
Select element on page using jQuery

```html
<script>
$('.animsition' )
</script>
```

### Calling jQuery function
Call the plugin function

```html
<script>
$('.animsition' ).animsition();
</script>
```

## Practice with a plugin

**index.html**

```html
<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Agency - A Treehouse template</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--CSS-->
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/normalize.min.css">
        
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
      <div class="row container">
        <header class="row header">
          <div class="grid-third">
            <a href="index.html" class="logo"></a>
          </div>
          <div class="grid-third">
            <h1 class="description">We build apps</h1>
          </div>
          <div class="grid-third">
            <nav>
              <a href="#" class="active">Home</a>
              <a href="work.html">Work</a>
              <a href="team.html">Team</a>
            </nav>
          </div>
      </header><!--/header-->
        <div class="row">
          <div class="grid-full">

          </div>
          <div class="main row">
            <div class="grid-third">
              <img src="img/sticker-team.png" alt="" />
              <p>United we stand divided we fail.  Meet the all star team behind the agency.</p>
              <a href="team.html" class="button">Meet the Team</a>
            </div><!--/team-->
            <div class="grid-third">
              <img src="img/sticker-work.png" alt="" />
              <p>Check our latest app builds or download them in the App Store.</p>
              <a href="work.html" class="button">Latest Projects</a>
            </div><!--/work-->
            <div class="grid-third">
              <img src="img/sticker-contact.png" alt="" />
              <p>Have questions or requests?  Feel free to contact us, we’d love hear from you.</p>
              <a href="#" class="button">Contact Us</a>
            </div><!--/contact-->
          </div>
        </div><!--/main-->
        <footer>
          <div class="row">
            <div class="grid-full">
              <p>Connect with us</p>
              <ul class="social">
                <li>
                  <a href="#" class="pink"></a>
                  <a href="#" class="light-blue"></a>
                  <a href="#" class="dark-blue"></a>
                </li>
              </ul>
            </div>
          </div>
        </footer><!--/footer-->
        </div>
    </body>
</html>
```

## Add JavaScript and CSS
Add JavaScript and CSS links to HTML for animition and jquery

## Add necessary HTML
From looking at [online documentation](http://git.blivesta.com/animsition/fade-down-sm/) you see this:

```html
<body>
  <div class="animsition">
    <a href="./page1" class="animsition-link">animsition link 1</a>
    <a href="./page2" class="animsition-link">animsition link 2</a>
  </div>
</body>
```

* This let's you know to create a parent div tag with `animsition` class
* Each link need a class of `animsition-link`
* After connecting CSS and JS for animsition and jQuery
and creating and linking custom JS with calling JS code from online documentation, you should see `index.html` fade in
* Others pages don't work because we didn't add code to them yet)

## Exploring Plugin Options

JavaScript Object Literal `{}`
* A set of property names and property values
* Plugins use them to receive settings that control how the plugin works

# [Stickyjs Demo](http://stickyjs.com/)
## [Stickyjs Github](https://github.com/garand/sticky)

### Bug
* I searched for `stickyjs` through NPM and used it but the code broke.
* I found another `stickyjs` and **manually downloaded** it and it worked.
* Viewed in browser and it works fine.

## Plugin Events

# Slick Carousel
[Github link](https://github.com/kenwheeler/slick/)
[Demo page](http://kenwheeler.github.io/slick/)
[settings](http://kenwheeler.github.io/slick/#settings)
* Responsive
* Swipe enabled

### Install slick with npm

```
$ npm install slick-carousel
```

#### Add HTML

**index.html** (_code fragment_)

```html
[MORE CODE]
</header><!--/header-->
        <div class="row">
          <div class="grid-full">
           <!-- carousel goes here -->
           <div class="slides">
             <div>Slide 1</div>
             <div>Slide 2</div>
             <div>Slide 3</div>
           </div><!-- END .slides -->
          </div>[MORE CODE]
```

Since we are only using this on one page we just embed the call to the slick carousel plugin on the page after all our other linked JavaScript files

```html
<script>
 $( '.slides' ).slick();
</script>
```

## Slick css and default theme
* Author broke the two files up so that you could style your own slider effects

# Plugin conflicts
Working with more than one jQuery plugin can cause problems.
The **sticky nav** and **carousel** plugins have problems running together.
