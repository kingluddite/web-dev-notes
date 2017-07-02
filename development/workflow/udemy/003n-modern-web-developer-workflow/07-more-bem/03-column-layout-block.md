# Column Layout block
* Resusable Column Layout

## Create a two column layout
![2 col layout](https://i.imgur.com/nvUU6kb.png)

* We will create a class of `row`

`index.html`

```html
// more code
<!-- /.wrapper -->
      <div class="row">
        <img src="assets/images/our-start.jpg" alt="Our founder, Jane Doe">
        // more code
      </div>
<!-- /.row -->
// more code
```

## Add our two columns
```html
<div class="row">
  <div>
     <img src="assets/images/our-start.jpg" alt="Our founder, Jane Doe">
  </div>
  <div>
    // more code
  </div>
</div>
<!-- /.row -->
```

* What will will call our columns?
* We could call it a `4 - 8 split` so

```html
<div class="row">
  <div class="row__4">
     <img src="assets/images/our-start.jpg" alt="Our founder, Jane Doe">
  </div>
  <div class="row__8">
    // more code
  </div>
</div>
<!-- /.row -->
```

![12 col grid](https://i.imgur.com/rjsJpRa.png)

## Create our css file
`/app/assets/styles/modules/_row.css`

```
.row {

  &__4 {
    float: left;
    width: 33.33%;
  }

  &__8 {
    float: left;
    width: 66.66%;
  }

}
```

`width: 33.33%`

* 100% /  12 grid = 8.33%
* 8.33 * 4 = 33.33%

## Import it
`styles.css`

```css
@import 'modules/_row';
```

![no clear](https://i.imgur.com/JoWFeTL.png)

## Clear floats!
* We have columns but we need to clear our floats
* When we float a column we take it out of the normal ["flow" of the page](http://marksheet.io/css-the-flow.html)
* Both columns are taken out of the `flow of the document`
* So the containing `row` thinks that it is empty

## Sloppy solution
```
        </div>
        <div class="clear-me"></div>
        <!-- /.clear-me -->
        </div>
    <!-- /.row -->
</div>
<!-- /.wrapper -->
```

`_row.css`

```css
// more code
.clear-me {
  clear: both;
}
```

![this works](https://i.imgur.com/1pnGwCB.png)

### Sloppy Solution
* This is a sloppy solution because we added an empty element to our markup
* Whenever possible you should avoid adding empty elements just for styling purposes

### A better solution
* Remove the `clear-me` empty element and matching class as we won't use them

```
&::after {

  }
```

* This enables us to create some psuedo content (_aka fake content_) with CSS

`_row.css`

```
.row {
  
  &::after {
    content: "";
    clear: both;
    display: table;
  }

// more code
```

* This CSS selector `&::after` will add this blank space `content: "";` after all of the content in the main `.row` div
* You could temporarily add this:

```
.row {
    background-color: yellow;
    // more code
```

* To see the columns and clear flow problem more clearly
* Remove it when you get it working as we don't need it

### Modular code
Since we may use our clear float solution more than once, we should move it inside our `_mixins.css` file

`_mixins.css`

```
// more code
@define-mixin atLarge {
  @media (min-width: 1200px) {
    @mixin-content;
  }
}

@define-mixin clearfix {
  &::after {
    content: "";
    clear: both;
    display: table;
  }
}
```

### Use our new mixin
```css
.row {

  @mixin clearfix;

  &__4 {
    float: left;
    width: 33.33%;
  }

  &__8 {
    float: left;
    width: 66.66%;
  }

}
```

## We need a gutter (aka margin)
![two cols no gutter](https://i.imgur.com/2TlXhz2.png)

* We want to select all `div` children of rows with a class of `row--gutters`

`_rows.css`

```

.row {

  @mixin clearfix;

  &--gutters > div {
    padding-right: 65px;
  }
// more code
```

`index.html`

```
// more code
<!-- /.wrapper -->
      <div class="row row--gutters">
        <div class="row__4">
// more code
```

![broken columns](https://i.imgur.com/dVw9vwk.png)

## This will break our column layout :(
* Our second column gets pushed to a second line
* This is a **common problem**
    - When the width of the entire row exceeds `100%`, the columns then appear on their own rows
    - This happens because the padding we just added + our `33.33%` and `66.66% `exceeds 100%

## By Default
Web browsers calculate the **true width** of an element by taking the declared with and then adding on any padding or borders

## box-sizing: border-box
* We can change the browser default behavior
* This makes browsers honor our declared width value
* Our padding will still be applied but it won't affect our declared width values

```
&--gutters > div {
    padding-right: 65px;
    box-sizing: border-box;
  }
```

* [read more about box-sizing](https://css-tricks.com/box-sizing/)

### Tip - Global rule
* In recent years developers have been setting `box-sizing` globally to all elements on the page
* We'll move `box-sizing: border-box;` in `_row.css` and we'll move it to `_global.css`

`_global.css`

```css
* {
  box-sizing: border-box
}

body {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

img {
  max-width: 100%;
  height: auto;
}
```

## Life just got a whole lot better
* With that in place, managing our width values is now so much easier
* But we have some margin issues
* To see it add this to `_row.css`:

```
.row {

  background-color: yellow;

  @mixin clearfix;
  // more code
```

![gutter issue](https://i.imgur.com/lklSDlX.png)

* We want the gutter inbetween the image and text but not the right gutter

![right gutter](https://i.imgur.com/QipY8yy.png)

## How do we remove the end gutter?
* We could select the last column in a row and tell it to have `0` padding
    - But that would effect the ratio of our columns
    - The first column is exactly 1/3 available width
    - The second column is exactly 2/3 available width
    - If we told the final column to now have any padding it would no longer be exactly 2/3

`_row.css`

```
.row {

  background-color: yellow;

  @mixin clearfix;

  &--gutters {
    margin-right: -65px;
  }

  &--gutters > div {
    padding-right: 65px;;
  }
// more code
```

* Add green background color to see effect

`_wrapper.css`

```
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  background-color: green;
// more code
```

![outside wrapper](https://i.imgur.com/BWKD4qu.png)

## Overlapping!
* Our column is now overlapping it's container
* This is because of the negative right margin value
* To fix this we just tell the `wrapper` to hide the overflow with:

```
.wrapper {
  padding-left: 18px;
  padding-right: 18px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
// more code
```

* Our problem is solved
* Remove the green background color
* Remove the the yellow background color

### What does our mobile layout look like with two columns?
Not good

![ugly two column mobile layout](https://i.imgur.com/2zNqutk.png)

* We will fix this by making small screens use a single column layout

`index.html`

* Add classes
    - `row__medium-4`
    - `row__medium-8`

```html
// more code
<!-- /.wrapper -->
      <div class="row row--gutters">
        <div class="row__medium-4">
          <img src="assets/images/our-start.jpg" alt="Our founder, Jane Doe">
        </div>
        <div class="row__medium-8">
// more code
```

`_row.css`

```css
.row {

  @mixin clearfix;

  &--gutters {
    margin-right: -65px;
  }

  &--gutters > div {
    padding-right: 65px;
  }

  @mixin atMedium {
    &__medium-4 {
      float: left;
      width: 33.33%;
    }

    &__medium-8 {
      float: left;
      width: 66.66%;
    }
  }

}
```

