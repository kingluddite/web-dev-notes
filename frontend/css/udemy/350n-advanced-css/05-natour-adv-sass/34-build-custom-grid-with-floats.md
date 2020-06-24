# Building a Custom Grid With Floats
* How to architect and build a simple grid system
* How the attribute selector works
* How the `:not` pseudo-class works
* How `calc()` works, and what's the difference between `calc()` and simple **Sass** operations

## What is a grid?
* Just a design system which allows us to build consistent interfaces

## What is a gutter?
* Space between columns

![example of grid](https://i.imgur.com/46n8oxu.png)

## Mark up html with grid structure
`index.html`

```
// MORE CODE
<section>
      <div class="row">
        <div class="col-1-of-2">Col 1 of 2</div>
        <div class="col-1-of-2">Col 1 of 2</div>
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-1-of-3">Col 1 of 3</div>
        <div class="col-1-of-3">Col 1 of 3</div>
        <div class="col-1-of-3">Col 1 of 3</div>
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-1-of-3">Col 1 of 3</div>
        <div class="col-2-of-3">Col 2 of 3</div>
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-1-of-4">Col 1 of 4</div>
        <div class="col-1-of-4">Col 1 of 4</div>
        <div class="col-1-of-4">Col 1 of 4</div>
        <div class="col-1-of-4">Col 1 of 4</div>
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-1-of-4">Col 1 of 4</div>
        <div class="col-1-of-4">Col 1 of 4</div>
        <div class="col-2-of-4">Col 2 of 4</div>
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-1-of-4">Col 1 of 4</div>
        <div class="col-3-of-4">Col 3 of 4</div>
      </div>
      <!-- /.row -->
    </section>
  </body>
</html>
```

## Add `layout/_grid.scss`


* Don't forget to add `_grid.scss` to the manifest

`_manifest.scss`

```
// MORE CODE

@import "body";
@import "grid"; // add this
@import "footer";
@import "header";
@import "section";
// MORE CODE
```

* Standard width is `1140px`
* We never use `px` and instead use `rem`
* So `1140px` --> rem is `114rem`
* We want to use `max-width` instead of `width`

### What is difference between `width` and `max-width`?
* `max-width` says if we have the available width than we can use the max-width measurement
    - But if the viewport is smaller than the `max-width` measurement than it will simply fill 100% viewport width 

`_grid.scss`

```
.row {
  width: 114rem;
  background-color: #d7d7d7;
  margin: 0 auto;
}
```

## **TIP** How do we center block elements inside of another block element?
```
margin: 0 auto;
```

* Notice the rows are centered in browser if browser is greater than 114rem

## Setting us grid variables
`_variables.scss`

```
// Grid
$grid-width: 114rem; // 1140px
$gutter-vertical: 8rem; // 80px
$gutter-horizontal: 6rem; // 60px
```

`_grid.scss`

```
.row {
  width: $grid-width;
  background-color: #d7d7d7;
  margin: 0 auto;
  margin-bottom: $gutter-vertical;
  &:last-child {
    margin-bottom: 0;
  }
}
```

* But there is a CSS rule that will let us put a gutter on ever element except the last one and that is `:not` psuedo selector

#### Slightly better way (1 less line)
`_grid.scss`

```
.row {
  width: $grid-width;
  background-color: #d7d7d7;
  margin: 0 auto;
  &:not(:last-child) {
    margin-bottom: $gutter-vertical;
  }
}
```

* Use chrome dev tools and you'll see all rows have `row:not(:last-child)` and a margin-bottom of `8rem` except the last row

## Working with columns
* They are inside rows so we'll nest it

![first row 2 columns](https://i.imgur.com/6jMWxYJ.png)

* It will be the entire width - gutter width
* The entire width is 100%
* If we subtract the gutter space we get the entire space these 2 columns can occupy and then if we divide that by 2 parts we then get the width of 1 of the columns

#### START AT 16:25
### calc()
* Powerful css function
* We can mix units
