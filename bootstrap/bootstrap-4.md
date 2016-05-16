# Bootstrap-4

* [Where is it?](http://v4-alpha.getbootstrap.com/)
* [Bootstrap 4 Documenation](http://v4-alpha.getbootstrap.com/getting-started/introduction/)
* [View stuff made with Bootstrap](http://expo.getbootstrap.com/)
* [Bootstrap Resources](http://expo.getbootstrap.com/resources/)

## Installation

### Install with npm

* make sure you create your `package.json` first

```
$ npm install bootstrap@4.0.0-alpha.2 --save
```

### CDN Start 

Quick, Easy and Painless

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

Bootstrap uses [Normalize.css](http://v4-alpha.getbootstrap.com/getting-started/introduction/#normalizecss) reset

## Reboot

[What is reboot?](http://v4-alpha.getbootstrap.com/content/reboot/)
Bootstrap builds on normalize's base css rules with a custom set of styles (called `reboot`). They are element specific css styles that help display common HTML elements in a consistent way.

So Normalize + Reboot help your project look the same across browsers.

## Typography

[Where is BS4 Typography documentation?](http://v4-alpha.getbootstrap.com/content/reboot/)

All HTML headings, `<h1>` through `<h6>`, are available. `.h1` through `.h6` classes are also available

```html

<small class="text-muted">With faded secondary text</small>

<!-- headings -->
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>

<!-- lead styling for paragraphs -->
<p class="lead">
  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
</p>

<!-- misc text styles -->
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

<!-- **only works on immediate child elements -->

<!-- lists -->
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

### input group
http://v4-alpha.getbootstrap.com/components/input-group/

### offset

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

### fun with colors
```html
<div class="bg-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</div>
<div class="bg-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</div>
<div class="bg-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</div>
<div class="bg-warning">Etiam porta sem malesuada magna mollis euismod.</div>
<div class="bg-danger">Donec ullamcorper nulla non metus auctor fringilla.</div>
<div class="bg-inverse">Cras mattis consectetur purus sit amet fermentum.</div>
```

* body class="bg-info"
* changes bg and text to white
* change submit button to btn-primary

### utilities spacing

**rem** - stands for "root em"
a flexible CSS unit that's relative to the font size of the root element - usually the `HTML` element

bootstrap has a global default value of 1 rem

## create a page
`call to action buttons`

bootstrap is developed to be `mobile first`

## 5 responsive breakpoints

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

* `xs` - extra small
* `sm` - small
* `md` - medium
* `lg` - large
* `xl` - extra large

### Bootstrap Grid
* Containers
* Rows
* Columns

#### example of all 3 in action

```html
<div class="container">
  <!-- about -->
  <div class="row">
    <div class="col-sm-6">
      <h3>Civitas FC</h3>
      <p>Team started in 2006 and has been rocking and rolling since then.</p>
    </div>
    <div class="col-sm-3">
      <h3>Team Members</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus recusandae autem quas sint, hic suscipit sit, illum aspernatur, doloremque minus et aperiam tempore similique. Mollitia sed nulla tempora a temporibus.</p>
    </div>
    <div class="col-sm-3">
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

**IMPORTANT NOTE**: columns must add up to 12

## responsive images
class `img-fluid` (image will now never be wider than column it's in)

## What does `xs-center`
align on all viewport sizes extra-small to extra-large

## Bootstrap short cuts for spacing

* `class="m-y-3"` - margin to top and bottom
* `class="m-x-3"` - margin left and right
* `class="m-a-3"` - margin to ALL four sides

## Columns
Must add up to 12
If they exceed 12 they will wrap to next line.

* `col-xs` - extra small
* `col-sm` - small
* `col-md` - medium
* `col-lg` - large
* `col-xl` - extra large

Do you have to add bootstrap classes for every breakpoint?
No because BS4 classes are `additive`
so sm classes apply to small and up

[Example of Additive](http://v4-alpha.getbootstrap.com/layout/grid/#example-stacked-to-horizontal)
* drag wide and narrow to see how additive works

our sm breakpoint has too small columns
* content hard to read
* we need to stack in xs ans s breakpoints

change columsn to ...

```html
<div class="row">
    <div class="col-md-4">
```

view col-md-4 and col-lg-4 in browser and what is the difference

2 different layouts depending on device
```html
<div class="col-md-4 col-lg-push-4"></div>
<div class="col-md-4 col-lg-pull-4"></div>
<div class="col-md-4 col-xl-4"></div>

```

## Toggle Device Mode

Open chrome dev tools (`ctrl` + `opt` + `i`)
Click this button

![Toggle Device](https://i.imgur.com/drD8Xqb.png)

## Column Order and Offset

```html
<div class="row">
  <div class="col-md-9 col-md-push-3">Was Left</div>
  <div class="col-md-3 col-md-pull-9">Was Right</div>
</div>
```

if we want our image to appear first on xs, sm and md but in the middle on lg and xl devices

* great for structure html for seo purposes and then use css to restructure the page without ever having to change the html.

```html
<div class="col-md-4 col-lg-push-4"></div>
<div class="col-md-4 col-lg-pull-4"></div>
<div class="col-md-4 col-xl-4"></div>
```

offset

```html
 <!-- signup form -->
  <hr>
  <div class="row p-y-2 text-muted">
    <div class="col-md-6">
      <p><strong>About Civitas</strong></p>
      <p>Civitas FC has been a team since 2008.</p>
    </div>
    <div class="col-md-6">
      <p><strong>Request Tryout</strong></p>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Email">
        <span class="input-group-butn">
          <button class="btn btn-primary" type="button">Send</button>
        </span>
      </div>
    </div><!-- END .col-6 -->
  </div><!-- END .row -->

```

after offset added

```html
<!-- signup form -->
  <hr>
  <div class="row p-y-2 text-muted">
    <div class="col-md-6 col-xl-5">
      <p><strong>About Civitas</strong></p>
      <p>Civitas FC has been a team since 2008.</p>
    </div>
    <div class="col-md-6 col-xl-5 col-xl-offset-2">
      <p><strong>Request Tryout</strong></p>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Email">
        <span class="input-group-butn">
          <button class="btn btn-primary" type="button">Send</button>
        </span>
      </div>
    </div><!-- END .col-6 -->
  </div><!-- END .row -->
```

note: BS4 has [tether](https://github.com/HubSpot/tether) as a dependency.

## Responsive utilities

* `.hidden-xs-down`
* `.hidden-xl-up`

`up` that value and up hide or show
`down` that value and down hide or show

```html
<img class="m-b-1 img-fluid img-rounded hidden-xs-down" src="http://placehold.it/500x100" alt="Logo">
```

## Navbar

```html
<body>
  <!-- navbar -->
  <nav class="navbar navbar-dark bg-primary navbar-fixed-top">
    <div class="container">
      <ul class="nav navbar-nav">
        <li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="#about" class="nav-link">About</a></li>
        <li class="nav-item"><a href="#players" class="nav-link">Players</a></li>
        <li class="nav-item"><a href="#schedule" class="nav-link">Schedule</a></li>
      </ul>
      <a class="navbar-brand pull-sm-right m-r-0 hidden-xs-down" href="http://example.com">Link To Example</a>
    </div>
  </nav>
  <!-- END navbar -->
```

## Fluid Jumbotron

```html
<!-- END navbar -->

  <!-- jumbotron -->
    <div class="jumbotron jumbotron-fluid bg-info">
      <div class="container">
        <h1 class="display-2 text-xs-center p-t-2">vs Lionside B</h1>
        <p class="lead">Aviation Field @ 4:45pm</p>
      </div>
    </div>
  <!-- /jumbotrong -->
```

## Buttons/Button Groups

```html
<!-- season schedule -->
  <!-- callout button -->
  <button type="button" class="btn btn-info-outline btn-large center-block m-y-3">Join Team</button>
  <!-- /callout button -->
```

improve jumbotron

```html
<!-- jumbotron -->
    <div class="jumbotron jumbotron-fluid bg-info">
      <div class="container text-xs-center p-t-3">
        <h1 class="display-2 p-t-2">Civitas FC</h1>
        <p class="lead">vs Lionside B</h1>
        <p class="lead">Aviation Field @ 4:45pm</p>

        <div class="btn-group m-t-2" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-danger btn-lg">RSVP</button>
          <a href="#game-roster" class="btn btn-secondary btn-lg">View Game Roster</a>
        </div>
      </div>
    </div>
  <!-- /jumbotrong -->
```

* add `id="game-roster` so link jumps you to that section


## [Inline Nav](http://v4-alpha.getbootstrap.com/components/navs/#inline)

```html
<ul class="nav nav-inline">
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Another link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Disabled</a>
  </li>
</ul>
```

## Button Dropdown

```html
<!-- Split button -->
<div class="btn-group">
  <button type="button" class="btn btn-danger">Action</button>
  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
```

## Add footer

```html
<!-- footer -->
  <div class="row p-y-1">
    <div class="col-md-7">
      <ul class="nav nav-inline">
        <li class="nav-item">
          <a class="nav-link" href="#">League</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Standings</a>
        </li>
        <li class="nav-item">
          <!-- Split button -->
          <div class="btn-group dropup">
            <button type="button" class="btn btn-secondary">Other Teams</button>
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Manchester United</a>
              <a class="dropdown-item" href="#">Chelsea FC</a>
              <a class="dropdown-item" href="#">Barcelona FC</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Neymar's Tax Attorney</a>
            </div>
          </div>
        </li>
      </ul>
    </div><!-- END .col-7 -->
    <div class="col-md-5 text-md-right">
      <small>&copy; 2016 Civitas FC</small>
    </div><!-- END .col-5 -->
  </div>
  <!-- /footer -->
```

* dropup vs dropdown
* btn-secondary vs btn-default
* divider in dropdown

## [Cards](http://v4-alpha.getbootstrap.com/components/card/)
New UI component to BS4


add 6 of these

```html
<div class="col-md-6 col-lg-4">
        <div class="card">
          <img class="card-img-top img-fluid" src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg" alt="Mike">
          <div class="card-block">
            <h4 class="card-title">Mike Stopper</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis est, provident quam a harum ex corporis vitae assumenda impedit veniam consequatur deleniti cumque repellat, magni non voluptatibus, aut dolorum?</p>
          </div>
        </div>
      </div>
```

put inside this:

```html
</div><!-- END about -->
  <!-- full team roster -->
  <h1 class="display-4 text-xs-center m-y-3 text-muted">Team Roster</h1>
    <div class="row">

    </div>
```

## List Group

```html
<div class="col-md-4 col-xl-4">
      <!-- game-roster -->
      <h3 id="game-roster" class="m-b-2">Game Roster</h3>
      <div class="list-group">
        <a href="#" class="list-group-item"><strong>Phil</strong>: Midfield</a>
        <a href="#" class="list-group-item"><strong>Adrian</strong>: Forward</a>
        <a href="#" class="list-group-item"><strong>Rafael</strong>: Defense</a>
        <a href="#" class="list-group-item"><strong>Jose</strong>: Goalie</a>
      </div>
      <!-- /game-roster -->
    </div>
```

### [Labels](http://v4-alpha.getbootstrap.com/components/list-group/#labels)


### Schedule

```html
<!-- season schedule -->
  <h1 id="schedule" class="display-4 text-xs-center m-y-3 text-muted">Season Schedule</h1>
  <ul>
    <li class="list-group-item">
      <h4 class="list-group-item-heading">Lionside B FC <span class="pull-xs-right">4:45pm</span></h4>
      Sunday, May 1st
    </li>
    <li class="list-group-item">
      <h4 class="list-group-item-heading">Cali FC<span class="pull-xs-right">4:45pm</span></h4>
      Sunday, May 15th
    </li>
    <li class="list-group-item list-group-item-warning">
      <h4 class="list-group-item-heading">Beach Cities United <span class="pull-xs-right">6:00pm</span></h4>
      SATURDAY, May 21st
    </li>
    MORE CODE HERE
```

## [Modal](http://v4-alpha.getbootstrap.com/components/modal/)
* add at bottom of page
* use large comment tag to designate where modal starts

```html
<!--===========================================
    FORM MODAL
=============================================-->
```

Copy `Static example`

Add this at bottom of page

```html
<!--===========================================
    FORM RSVP MODAL
=============================================-->
<div id="rsvp-modal" class="modal fade">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">Game RSVP</h4>
      </div>
      <div class="modal-body">
        <p>PLACEHOLDER FOR FORM</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!--===========================================
    FORM TRYOUT MODAL
=============================================-->
<div id="team-tryout-modal" class="modal fade">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">Request Tryout</h4>
      </div>
      <div class="modal-body">
        <p>PLACEHOLDER FOR FORM</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

### Add attributes to button to open modals (hidden by default)

```html
<!-- callout button -->
  <button type="button" class="btn btn-info-outline btn-large center-block m-y-3" data-toggle="modal" data-target="#team-tryout-modal">Join Team</button>
```

## [Scrollspy](http://v4-alpha.getbootstrap.com/components/scrollspy/)

Add this to `BODY` element

```html
<body id="home" data-spy="scroll" data-target=".navbar" data-offset="100">
```

* data-target needs to match object you want to affect with scrollspy
* data-target must be data-target="#ID_NAME_HERE" or data-target=".CLASS_NAME_HERE" (if you omit `.` or `#` scrollspy will not work)
* since our nave using `#home` internal link, add `#home` to `BODY` element
* make sure you add rest of internal links so scrollspy will work properly
* `data-offset="100"` makes your scroll more accurate

## [Form Groups, Form Controls](http://v4-alpha.getbootstrap.com/components/forms/)

Update Modal with form

```html
<!--===========================================
    FORM TRYOUT MODAL
=============================================-->
<div id="team-tryout-modal" class="modal fade">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-info">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">Request Tryout</h4>
      </div>
      <div class="modal-body">
        <!-- tryout form -->
        <form>
          <h5 class="m-b-2">Player Info</h5>
          <fieldset class="form-group">
            <label class="sr-only" for="player-name">Name</label>
            <input type="text" class="form-control" id="player-name" placeholder="Player Name">
          </fieldset>
          <fieldset class="form-group">
            <label class="sr-only" for="player-email">Email</label>
            <input type="email" class="form-control" id="player-email" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
              <label for="field-position">Field Position</label>
              <select class="form-control" id="field-position" name="userRole">
                <option value="defense">Defense</option>
                <option value="midfield">Midfield</option>
                <option value="goalie">Goalie</option>
                <option value="offense">Offense</option>
              </select>
            </fieldset>
        </form>
        <!-- /tryout form -->
      </div>

    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

## Custom Form Controls

Make our forms look even nicer across all browsers

Checkboxes

```html
<hr class="m-y-2">
<h5>What playing experience do you have?</h5>
<div class="form-group c-inputs-stacked">
  <label class="c-input c-checkbox">
    <input type="checkbox">
    <span class="c-indicator"></span>
    1 years
  </label>
  <label class="c-input c-checkbox">
    <input type="checkbox">
    <span class="c-indicator"></span>
    5 years
  </label>
  <label class="c-input c-checkbox">
    <input type="checkbox">
    <span class="c-indicator"></span>
    10 years
  </label>
</div>
```

## Alerts

```html
<div class="modal-body">
  <!-- tryout form -->
  <div class="alert alert-warning alert-dismissible fade in" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>Hurry!</strong> The season starts in 1 week.
  </div>
  <form>
```

## Form Layouts Using Grid

```html
    <!-- credit card -->
    <hr class="m-b-2">
    <h5 class="m-b-2">Payment Info</h5>
    <p>Full Season: $120</p>
    <p>Per Game: $15</p>
    <div class="row">
      <div class="col-lg-6 form-group">
        <label for="cc-num">Card Number:</label>
        <input class="form-control" id="cc-num" type="text">
      </div>

      <div class="col-lg-3 form-group">
        <label for="zip">Zip Code:</label>
        <input class="form-control" id="zip" type="text">
      </div>

      <div class="col-lg-3 form-group">
        <label for="cvv">CVV:</label>
        <input class="form-control" id="cvv" type="text">
      </div>
    </div>

    <div class="row">
      <label class="col-lg-12">Expiration Date:</label>
      <div class="col-lg-8 form-group">
        <select class="c-select form-control" id="exp-month">
          <option value="1">1 - January</option>
          <option value="2">2 - February</option>
          <option value="3">3 - March</option>
          <option value="4">4 - April</option>
          <option value="5">5 - May</option>
          <option value="6">6 - June</option>
          <option value="7">7 - July</option>
          <option value="8">8 - August</option>
          <option value="9">9 - September</option>
          <option value="10">10 - October</option>
          <option value="11">11 - November</option>
          <option value="12">12 - December</option>
        </select>
      </div>
      <div class="col-lg-4 form-group">
        <select class="c-select form-control" id="exp-year">
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </div>
    <hr class="m-b-2">
    <button type="submit" class="btn btn-primary btn-lg">JOIN</button>
    <!-- /credit card -->
</form>
```

## [Form Validation CSS](http://v4-alpha.getbootstrap.com/components/forms/#validation)

```html
<fieldset class="form-group has-success">
  <label class="form-control-label p-l-0" for="player-name">Name</label>
  <input type="text" class="form-control form-control-success" id="player-name" placeholder="Player Name">
</fieldset>
<fieldset class="form-group has-danger">
  <label class="form-control-label" for="player-email">Email</label>
  <input type="email" class="form-control form-control-danger" id="player-email" placeholder="Email">
</fieldset>
```

## Custom CSS

* Add CSS file `style.css` after BS4 css LINK

```css
.navbar .navbar-brand {
        color: rgba(255, 255, 255, .85);
        font-size: 1rem;
        padding-top: .45rem;
}
.jumbotron {
  background: url('https://nflcdns.nfl.com/static/content/static/config/super-bowl-city/2015/landing/background.jpg');
  background-size: cover;
}
.btn,
.active {
  transition: .4s
}
```
