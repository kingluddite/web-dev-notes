# jQuery plugins
jCalculator
jQuery Adabptive Modal
jQuery ListNav
Vide
Lightbox 2
jQuery UI

## How to find jQuery plugins

jQuery Plugin Registry (shutdown)

[Sitepoint Popular jQuery Plugins List Directory](https://www.sitepoint.com/jquery-popular-plugins-list/)

[Unheap.com](http://www.unheap.com/)

## Tips to finding a good jQuery plugin
* Find Plugins You Need
* Clear documentation
* Actively developed
    - how old it is and if they're still working on it
    - if it has a github page, you can tell if they are working on, how often and for how long
* Responsive
* Mobile friendly
    - touch gestures (finger swipe or pinch)
* [FSVS](http://luke.sno.wden.co.uk/full-screen-vertical-scroll)
    - Full Screen Vertical Slider using CSS3 transitions followed up by a jQuery fallback.

## What do jQuery plugins include?
* A CSS file (optional)
* a JS file (required)
* Images (optional)

## Animsition
[demo link](http://git.blivesta.com/animsition/)

jQuery plugin that helps you animate between pages

### How to download Animsition
* It's on github
* How to use github
* Files you need and don't need
* `Dist` folder
    - files author is distributing
* download vs git clone
* maps vs min files
* rename `dist` the name of plugin (animsition), move all the `css` and `js` files into the `animsition` folder and delete the `css` and `js` empty folders.
* download jQuery

1. Position of plugin `css` file
    * add link to html
    * put before your custom `css` file

```html
<link rel="stylesheet" href="js/animsition/animsition.min.css">
<link rel="stylesheet" href="css/style.css">
```

2. Add jQuery file
    - put at bottom of html (before `</body>`)

```html
<script src="js/jquery-1.11.2.min.js"></script>
```

3. Add min animsition file

```html
<script src="js/jquery-1.11.2.min.js"></script>
<script src="js/animsition/jquery.animsition.min.js"></script>
```

4. Use documentation to structure HTML a certain way

```html
<div class="animsition">[rest of code]</div>
```

5. Add your custom js
    - to make program work you'll need to add your own js either externally (preferred) or just a set of `<script>` tags on a page

```html
<script>
  // your code here
</script>
```

6. Select element on page using jQuery

```html
<script>
$('.animsition' )
</script>
```

7. Call the plugin function

```html
<script>
$('.animsition' ).animsition();
</script>
```

## Practice with a plugin

index.html

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
