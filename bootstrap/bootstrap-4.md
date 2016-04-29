# Bootstrap-4

Where is it? [link](http://v4-alpha.getbootstrap.com/)

[Bootstrap 4 Documenation](http://v4-alpha.getbootstrap.com/getting-started/introduction/)

[View stuff made with Bootstrap](http://expo.getbootstrap.com/)

[Bootstrap Resources](http://expo.getbootstrap.com/resources/)

Install with npm

* make sure you create your package.json first

```
$ npm install bootstrap@4.0.0-alpha.2 --save
```

CDN Start

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Bootstrap 4 Intro</title>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery first, then Bootstrap JS. -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
  </body>
</html>
```

## Normalize.css
[link](http://v4-alpha.getbootstrap.com/getting-started/introduction/#normalizecss)

Bootstrap uses Normalize.css reset

## Reboot

**What is reboot?** [link](http://v4-alpha.getbootstrap.com/content/reboot/)
Bootstrap builds on normalize's base css rules with a custom set of styles (called 'reboot'). They are element specific css styles that help display common HTML elements in a consistent way.

So Normalize + Reboot help your project look the same across browsers.

## Typography
[link](http://v4-alpha.getbootstrap.com/content/reboot/)
All HTML headings, <h1> through <h6>, are available. `.h1` through `.h6` classes are also available

```
<small class="text-muted">With faded secondary text</small>
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<p class="lead">
  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
</p>
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
<p><abbr title="attribute">attr</abbr></p>
<p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
<blockquote class="blockquote">
  <p class="m-b-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>
<blockquote class="blockquote">
  <p class="m-b-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
<blockquote class="blockquote blockquote-reverse">
  <p class="m-b-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>

only works on immediate child elements

<ul class="list-unstyled">
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
      <li>Vestibulum laoreet porttitor sem</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ul>

<ul class="list-inline">
  <li class="list-inline-item">Lorem ipsum</li>
  <li class="list-inline-item">Phasellus iaculis</li>
  <li class="list-inline-item">Nulla volutpat</li>
</ul>

<dl class="dl-horizontal">
  <dt class="col-sm-3">Description lists</dt>
  <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

  <dt class="col-sm-3">Euismod</dt>
  <dd class="col-sm-9">Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
  <dd class="col-sm-9 col-sm-offset-3">Donec id elit non mi porta gravida at eget metus.</dd>

  <dt class="col-sm-3">Malesuada porta</dt>
  <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>
</dl>
```


## Layout

Add a container

```html
<div class="container">
    stuff to be contained
</div>
```

## Utilities

Components > Utilities

Text alignement
```html
<p class="text-xs-center">Center aligned text on all viewport sizes.</p>
```

## Forms
Bootstrap utilizes the HTML5 doctype, all inputs must have a `type` attribute.

input group
http://v4-alpha.getbootstrap.com/components/input-group/

offset

```html
<body class="bg-info">
    <div class="container text-xs-center">
      <h1 class="display-1 m-t-3">Civitas FC</h1>
      <p class="lead m-b-3">11 v 11 Men's Soccer Team</p>
      <div class="col-lg-6 col-lg-offset-3">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for...">
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button">Join</button>
          </span>
        </div><!-- END .input-group -->
      </div><!-- END .col-6 -->
    </div><!-- END .container -->
    ...more code
</body>
```

**note:** Bootstrap 4 uses `rem` for typography, margin and padding

colors
<div class="bg-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</div>
<div class="bg-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</div>
<div class="bg-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</div>
<div class="bg-warning">Etiam porta sem malesuada magna mollis euismod.</div>
<div class="bg-danger">Donec ullamcorper nulla non metus auctor fringilla.</div>
<div class="bg-inverse">Cras mattis consectetur purus sit amet fermentum.</div>

body class="bg-info"
changes bg and text to white
change submit button to btn-primary

utilities spacing
rem - stands for "root em"
a flexible CSS unit that's relative to the font size of the root element - usually the `HTML` element

bootstrap has a global default value of 1 rem


## create a page
2 call to action buttons

bootstrap is developed to be `mobile first`

media query ranges
Layout 

5 responsive breakpoints

```
// Extra small devices (portrait phones, less than 34em)
// No media query since this is the default in Bootstrap

// Small devices (landscape phones, 34em and up)
@media (min-width: 34em) { ... }

// Medium devices (tablets, 48em and up)
@media (min-width: 48em) { ... }

// Large devices (desktops, 62em and up)
@media (min-width: 62em) { ... }

// Extra large devices (large desktops, 75em and up)
@media (min-width: 75em) { ... }
```

xs - extra small
sm - small
md - medium
lg - large
xl - extra large

### Bootstrap Grid
* Containers
* Rows
* Columns

example of all 3 in action

```html
<div class="container">
  <!-- about -->
  <div class="row">
    <div class="col-sm-4">
      <h3>Civitas FC</h3>
      <p>Team started in 2006 and has been rocking and rolling since then.</p>
    </div>
    <div class="col-sm-4">
      <h3>Team Members</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus recusandae autem quas sint, hic suscipit sit, illum aspernatur, doloremque minus et aperiam tempore similique. Mollitia sed nulla tempora a temporibus.</p>
    </div>
    <div class="col-sm-4">
      <h3>Season Schedule</h3>
      <ul>
          <li><strong>vs Manchester United</strong>: 1/11/2016</li>
          <li><strong>vs Manchester United</strong>: 1/11/2016</li>
          <li><strong>vs Manchester United</strong>: 1/11/2016</li>
          <li><strong>vs Manchester United</strong>: 1/11/2016</li>
          <li><strong>vs Manchester United</strong>: 1/11/2016</li>
      </ul>
    </div>
  </div><!-- END about -->
</div><!-- END .container -->
```

columns must add up to 12

## responsive images
class `img-fluid` (image will now never be wider than column it's in)

