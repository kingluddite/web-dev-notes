# Flex
Need to establish a Flex formatting context

## HTML structure change
`index.html`
Move H1 inside `main-nav` as a LI
```
<header class="main-header group">
        <ul class="main-nav">
          <li class="main-logo"><h1><a href="#">Logo</a><h1></li>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
          <li><a href="#">Link 4</a></li>
        </ul>
      </header>
```

## CSS changes
This will adjust to our HTML structure change
```
.main-nav a       { background-color: #3f8abf; }
.main-logo a        { background-color: #5fcf80; }
```

## Add Flex
```
@media (min-width: 769px) {
  .main-nav {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    height: 100%;
  }
  .main-nav li {
    align-self: center;
    margin-left: 8px;
    margin-right: 8px;
  }
}
```
**Tip** What if you want to place your navigation all the way to the right?

```
.main-logo:first-child {
    margin-right: auto;
  }
```

## Flex Grow Property
Control the amount of space a flex item takes up
We want all our links to be equal width and equally distributed
```
.main-logo:first-child {
    margin-right: 50px;
    flex-grow: 1.5;
  }
  .main-nav li {
    -webkit-align-self: center;
    align-self: center;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    margin-left: 8px;
    margin-right: 8px;
  }
```
The `flex-grow` value of 1 means have items take up the same space
The `flex-grow` value of `1.5` means have item take up 1 and a half times space.
![Flex-grow example](https://i.imgur.com/0f9Gr89.png)

## Animate Flex items
We changed the NAV
```
<ul class="main-nav">
          <li class="main-logo"><h1><a href="#">Logo</a><h1></li>
          <li><a href="#" data-icon="&#xe602;">Link 1</a></li>
          <li><a href="#" data-icon="&#xe601;">Link 2</a></li>
          <li><a href="#" data-icon="&#xe603;">Link 3</a></li>
          <li><a href="#" data-icon="&#xe600;">Link 4</a></li>
        </ul>
```
We added data-icon and unicode values to display glyphs from this site:
[Icomoon.io](https://icomoon.io)
[Select the fonts you want](https://icomoon.io/app/#/select)
Download and put inside a `fonts` folder
Get the html entity from icomoon site by selected icon and copying html entity
Add this to the CSS
```
.main-nav a::before {
  font-family: 'icomoon';
  content: attr(data-icon);
  color: #fff;
  position: absolute;
  top: 10px;
}
```
Will look similar to this:
![icomoon icons](https://i.imgur.com/BssAUqG.png)

But we want the links inside the nav links
simple add `position: relative` here:

```
.main-logo a,
.main-nav a {
  display: block;
  color: #fff;
  text-decoration: none;
  text-align: center;
  padding: 8px 15px;
  border-radius: 5px;
  position: relative;
}
```

We want to hide the icons initially so we set the margin to -30% on the left
and hide the overflow like:

```
.main-logo a,
.main-nav a {
  display: block;
  color: #fff;
  text-decoration: none;
  text-align: center;
  padding: 8px 15px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}
.main-nav a::before {
  font-family: 'icomoon';
  content: attr(data-icon);
  color: #fff;
  position: absolute;
  top: 10px;
  left: -30%;
}
```

## Nice Animation for icons
The transition property is all we need to add this
```
.main-nav a::before {
  font-family: 'icomoon';
  content: attr(data-icon);
  color: #fff;
  position: absolute;
  top: 10px;
  left: -30%;
  transition: .4s;
}
```

## Flex Grow
Enables you to create quick and easy animations
```
.main-nav li {
    margin-left: 8px;
    margin-right: 8px;
    -webkit-align-self: center;
    align-self: center;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    transition: .5s; /* adds nice rollover animation */
  }
  .main-nav li:hover:not(.main-logo) {
    flex-grow: 2; /* hover rule on all links except logo */
  }
```

## Add columns with Flex
```
/* Column Layout */

  .content-row {
    display: flex; /* makes the columns */
  }
  .col {
    flex: 1; /* makes the columns take up equal space */
  }
```

What if we want the `primary-content` to take up 2 columns?
```
.primary-content {
    flex: 2;
}
```

## Change order of flex item
```
.primary-content {
    flex: 2;
    order: -1; /* moves primary content to be the first column */
  }

  .extra-content {
    display: block;
    order: 1; /* makes this column the last column */
  }
```

## Make flex work in Safari
* Add prefixes
```
.content-row {
    display: -webkit-flex;
    display: flex;
  }
  .col {
    -webkit-flex: 1;
    flex: 1;
  }

  .primary-content {
    -webkit-flex: 2;
    flex: 2;
    -webkit-order: -1; /* moves primary content to be the first column */
    order: -1; /* moves primary content to be the first column */
  }

  .extra-content {
    display: block;
    -webkit-order: 1;
    order: 1;
  }
```

## Modernizr
Detects if a feature is supported by the browser (like Flexbox)
If not, falls back to conditional CSS you write in the stylesheet

### Just testing with Flex
Grab Modernizr with Flex script
Add to HTML at top in HEAD
```
<script src="js/modernizr-custom.js"></script>
```

Is it working?
If you see this, yes
![Flexbox is working](https://i.imgur.com/ScsayCG.png)
Image means JavaScript is enabled and the browser supports flexbox
If it does not support flexbox it will display no-flex in HTML element class.

![IE9 no flexbox support](https://i.imgur.com/aA7zDoj.png)

### Moderizr fallbacks
**Note:** If browser doesn't support flexbox it will simple ignore the flexbox CSS rules

### Fallback for the nav
```
.main-nav li {
    margin-left: 8px;
    margin-right: 8px;
    -webkit-align-self: center;
    align-self: center;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    transition: .5s;
  }
      .no-flexbox .main-nav li {
        display: block;
        margin-top: 12px;
        width: 150px;
      }
```
**Tip** indenting no-flexbox makes it easy to see (comment might help too)

### Fallback for the columns
```
 .col {
    -webkit-flex: 1;
    flex: 1;
  }
      .no-flexbox .col {
        float: left;
        width: 33.3%;
      }
```

### Fallback for the icon placement
```
.main-nav a:hover::before {
  left: 28%;
}
    .no-flexbox a:hover::before {
      left: 18px;
    }
```

## IE10 Flexbox different notation
[IE10 Flexbox Documentation](https://msdn.microsoft.com/library/hh673531(v=vs.85).aspx)

```
#myFlexbox {
  display: -ms-flexbox;
  background: gray;
  border: blue;
}
```
