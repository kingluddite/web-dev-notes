# Attention to Typography Detail
* We are going to work on this typography

![typography](https://i.imgur.com/KBxa0Aj.png)

* Our design spec has the top of the heading aligned with the top of the image

![aligned image and text](https://i.imgur.com/hbSqBGw.png)

* Not aligned image and text (current site)

![not aligned image and text](https://i.imgur.com/ESgfosk.png)

* Search for `got started` in `index.html` and append the `headline--no-t-margin`

```html
<h2 class="headline headline--no-t-margin">Here&rsquo;s how we got started&hellip;</h2>
```

`_headline.css`

```
// more code
 &--no-t-margin {
    margin-top: 0;
  }
}
```

* That's it. Our heading is now aligned with the image

![image and heading aligned](https://i.imgur.com/yyYh2VC.png)

### Breaking out of BEM
* Adding a BEM class to every repeating paragraph is crazy
* We could have 20 paragraphs inside a block of text and adding a class to all of them, doens't make sense

`index.html`

```html
// more code
<div class="row__medium-8 row__medium-8--smaller">
          <h2 class="headline headline--no-t-margin">Here&rsquo;s how we got started&hellip;</h2>
          <div class="generic-content-container">
            <p>...</p>
            <p>...</p>
            <p>...</p>  
          </div>
          <!-- /.generic-content-container -->
          
        </div>
// more code
```

`/app/assets/styles/modules/_generic-content-container.css`

```css
.generic-content-container {
  p {
    line-height: 1.65;
    font-size: 1.125rem; /* 18px */
    margin: 1.8rem 0;
  }

  p a {
    font-weight: 700;
  }
}
```

* line-height - doesn't require a measurement of value (px, rem, em)
* Don't nest more than one layer deep!
* Since our orange links will be global, let's define it in our `_global.css`

`_global.css`

```css
// more code
a {
  color: $mainOrange;
}
```

* Be very cognizant of never polluting your global css scope
* Big idea behind BEM methodology
* BEM would have us add a class to each `p`
    - Styling like that avoids
        + descendant selectors
        + generic type selectors
* BEM rescues us from:

![BEM saves us from](https://i.imgur.com/ohYi8gC.png)

* We did go against this philosophy
    - By setting up the `.generic-content-container`
    - By and using descendant and type selectors
        + more about [type selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors)
        + more about [descendant selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors)
        + But we did keep both scoped to this class
        + And we will only apply this class to elements if we are ok with all of their descendants being styled a specific way

## Takeaway
* For unique parts of our page follow BEM
* But for sections where content is more generic and streamlined and comes from automated sources (Like WordPress, or a blog) it's OK to deviate from BEM

```css
.generic-content-container {
  p {
    line-height: 1.65;
    font-size: 1.125rem; /* 18px */
    margin: 1.8rem 0;

    a {
      /* This is nesting too deep! */
    }
  }
}
```

### Import to main `styles.css`
`@import 'modules/_generic-conent-container`;

### One more change
* Fix landscape image bottom margin on mobile

![image needs bottom margin](https://i.imgur.com/YpxvKu9.png)

`index.html`

```html
// more code
<div class="row row--gutters">
  <div class="row__medium-4 row__medium-4--larger row__b-margin-until-medium">
    <picture>
// more code
```

* Add our CSS

`_row.css`

```
// more code
  &--gutters > div {
    padding-right: 65px;;
  }

  &__b-margin-until-medium {
    margin-bottom: 1rem;
  }

  @mixin atMedium {

    &__b-margin-until-medium {
      margin-bottom: 1rem;
    }
// more code
```

* Now our landscape image has spacing it needs for small screens and the necessary spacing for larger screens

## Make our generic font size text smaller
On smallest devices it is smaller and grows in size on small and larger devices

`_generic-content-container.css`

```css
.generic-content-container {
  p {
    line-height: 1.65;
    margin: 1.8rem 0;

    @mixin atSmall {
      font-size: 1.125rem;
    }
  }

  p a {
    font-weight: 700;
  }
}
```

* By not adding a `font-size` to the paragraph on smallest devices it will default to 1rem which is the default size

## Update our images
* Remove the `-i` from all images (when you are ready for production)
* This is just to test how the images will work
