# EM vs REM units

[Great article on this subject](http://webdesign.tutsplus.com/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984)

CSS Data Types
[link](https://developer.mozilla.org/en-US/docs/tag/CSS%20Data%20Type)

common data types
* color
* length `90px ... px is length`
* number `90px ... 90 is number`
* images
* gradients
* uri - points to source

## Pixels
different types of units
relative - scale to other units
absolute - don't scale to other units

Length Units
Relative length units
percentages - always relative to something else

when we use percentage unit in css, the percentage value is measured relative to a parent element's length

tip: for sizing fonts, use ems over pxs

### Absolute length units
* most common `px`
if we use `px` will always remain same and will not scale

#### em unit
* useful unit for creating scalable content because it can adapt to other font sizes
most common relative unit
aka font relative unit (based on parent elements font size)

caveot, when you set parent elements to em, their child font-size on elements is relative to that parent element font-size (so ems nested in ems will have a compounding effect)

##### rem
stands for `root em`
 * similar to em unit, different is, it is only relative to root element of page. (not any parent element like em's are)

how to get around em font-size compounding issue

what is the `root element`?
the `HTML` element

so use em but when you run into compounding problem use 'rem'

```css
/* Type Selectors ------------------ */

body {
  color: #878787;
  margin: 0;
  font-size: 1em;
}

h1 {  
  font-size: 5.625em; /* 90px / 16px  */
  color: white;
}

h2 {
  font-size: 53px;
}

h3 {
  font-size: 20px;
  color: #48525c;
}


/* Class Selectors ----------------- */

.main-header {
  background-color: orange;
  font-size: 2em;
}

.title {
  color: white;
  font-size: 1.625em; /* 26px/16px */
}

.primary-content, 
.secondary-content {
  width: 60%;
}

.primary-content {
  text-align: center;
}
```

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>EMs, Rems, Px</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body> 
    <header id="top" class="main-header">
      <span class="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sint dolor alias consectetur commodi fugit omnis dolore voluptate voluptatem quasi officiis itaque, nisi, repudiandae corporis pariatur sapiente hic rerum quae.</span>
      <h1>Heading 1</h1>
    </header>
    
        <div class="primary-content t-border">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus rem error aperiam optio dolore quas, ipsa amet. Minus veritatis aliquid facere voluptates fugit quidem incidunt quos, ipsa recusandae, consectetur blanditiis.
            </p>
            <a href="#more">more</a>
      <h2>Heading Two</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus omnis, ducimus perferendis natus quo numquam! Labore quia, delectus, rem possimus blanditiis quasi! Odit eum earum neque quidem aut cumque expedita..
      </p>
        </div>

        <div class="secondary-content t-border"> 
      <h3>Heading 3</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, est, accusamus. Distinctio amet cum vel molestiae similique quod maxime, commodi dolorem debitis expedita aperiam exercitationem hic repudiandae officiis labore eius.
      </p>
      <ul>
        <li><a href="#">one</a></li>
        <li><a href="#">two</a></li>
        <li><a href="#">three</a></li>
      </ul>         
      <ol>
        <li>one</li>
        <li>two</li>
        <li>three</li>
        <li>four</li>
      </ol>
        </div>
  </body>
</html>
```

example
1em = font-size value of parent element

default font size of most browsers is `16px`

so if you set body font-size to 1em
and h1 to font-size to 3em (will be 16px * 3 = 48px)

how do you convert px to em?
font-size: 26px /* 26px/16px = 1.625em
* remember 16px is default browser body font size
px / parent font-size px



[more info](http://inamidst.com/stuff/notes/csspx)
[even more info](https://docs.webplatform.org/wiki/tutorials/understanding-css-units)


[viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag?redirectlocale=en-US&redirectslug=Mobile%2FViewport_meta_tag)



