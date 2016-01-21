# Floats
A box shifted to the left or right on the current line. Content will wrap around floated elements.

## values
* Left
* Right
* None

Good use of floats
Image with text floating around it
```
<div>
 <img src="some_image.jpg">
 <h4>Some Image</h4>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis expedita nam facere in voluptas ipsam repellendus odio animi ipsa natus sequi perferendis dolorem vel mollitia porro veritatis, eos maxime id.</p>
</div>
```

H4 and P are block level elements so they each appear on their own line
But if you add this float to the image the h4 and p will float around it.

```
img {
    float: right;
}
```

Now that the image is floated put borders around the P and H4. Add margin to them. You'll see it's not what you want. The IMG doesn't move. The proper solution would be to add margins around the IMG.

## Collapse problem
If you also float the P left, you'll see the parent DIV collapses.

**Solution 1**: add a BR below the P and give the BR the following CSS
```
br {
    clear: left; /* left, right, both, none(default) */
}
```
* left - allows now float values on the left
* not a good solution because we have to add a non-semantic BR

**Solution 2**: add `overflow` property to parent element

```
div {
    overflow: hidden;
}
```

* not a good solution because scrollbars may appear in certain browser or certain parts may get cut off due to positions or margins and padding.

**Solution 3**: Clearfix (recommended)
* AKA micro clearfix
[SRC](http://nicolasgallagher.com/micro-clearfix-hack/)

```
.group:before,
.group:after {
    content: "",
    display: table;
}
.group:after {
    clear: both;
}
.group {
    *zoom: 1; /* to ensure consistency for IE6 and IE7 */
}
```
* Uses before and after pseudo elements to generate empty content
* Then styles via table mode which creates an anomomous table cell and a new block formatting context which uses the before pseudo element which prevents top margins from collapsing.
* Then we use the after pseudo element to clear it both sides. 
[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/float)
Any time you float an element you take it out of the normal document flow. This sometimes causes the parent element to collapse because it no longer honors the space inside it.

`.group` is the **most common class name**
`.group` is the most semantic class name because we are using it to contain (or group) the elements within the parent

Other popular names are `clearfix` and `cf`

### How to apply clearfix
Just add the class `group` to your parent element.

**Bad solution**

Float a bunch of items. Bad because elements that follow will begin to wrap around that floated content.

**Better Solution**

## Clearfix
Forces the parent element to clear the children.

```
/* Clearfix
============================================ */
.group::after {
    content: " ";
    display: table;
    clear: both;
}
```

So now anytime we need to clear a container we just need to give it a class of group.

Here is an example:

`index.html`
```
<header class="main-header group">
        <h1 class="main-logo"><a href="#">Logo</a></h1>
        <ul class="main-nav">
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
          <li><a href="#">Link 4</a></li>
        </ul>
      </header>
```

### Wrapping Around with Floats
When you shrink the browser content will wrap around the floated items.
This is usually not what you want to happen.

To fix this just set the float value to initial in the one column media query - which will use the browser default value.
See the example below

```
/* Media Queries */
@media (max-width: 768px) {
  .main-wrapper,
  .main-nav li,
  .main-logo {
    width: initial;
    height: initial;
    float: initial;
  }
  .main-logo {
    margin-right: 0;
  }
  .extra-content {
    display: none;
  }
}
```

## Floats need widths
* good to use percentages instead of pixels for column width
* if you add a width, we get columns but also the **container collapsing bug**
    - fix by adding `group` class to parent container
    - make sure 3 columns have a container
        + good class name is `content-row` for parent container

## Lorem Pixel
Quick way to add image placeholders
`index.html`

```
<img class="feat-img" src="http://lorempixel.com/400/300/sports/" alt="sports">
```

`floats.css`
.feat-img {
    float: left;
}

## Media Queries
```
/* Media Queries */
@media (max-width: 768px) {
  .main-wrapper,
  .main-nav li,
  .main-logo,
  .col,
  .feat-img {
    width: initial;
    height: initial;
    float: initial;
  }
  .feat-img {
    width: 100%;
  }
  .main-logo {
    margin-right: 0;
  }
  .extra-content {
    display: none;
  }
}
```

* we add col and feat-img class to set width, height and float to initial which will give our site a nice one column look when browser is shrunk down
* we set the feat-img class to have a width of 100% for small browsers (instead of shriking down into an unrecognizable image)

