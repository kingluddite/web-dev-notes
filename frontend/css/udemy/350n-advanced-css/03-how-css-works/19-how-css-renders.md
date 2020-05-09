# How CSS Renders
## Website rendering:
* The visual formatting model

![now let's move on to website rendering](https://i.imgur.com/xN8LAr1.png)

## What is the Visual Formatting Model
* Algorithm that calculates boxes and determines the layout of these boxes, for each element in the render tree, in order to determine the final layout of the page
* This model is one of the fundamental concepts of CSS

## The model takes in the following considerations:
* `Dimensions of boxes`: the box model
* `Box type`: inline, block and inline-block
* `The Positioning scheme`: floats and positioning (absolute/relative)
* `Stacking contexts`
* Other elements that are present in the render tree
    - (ie siblings or parents)
* `External information`: viewport size, dimensions of images, etc

### By putting all of the above factors together
* The browser figures out how the final website will look for the end user

## The Box Model
![the box model](https://i.imgur.com/X0SbRnU.png)

* Without a doubt the Box Model is one of the most fundamental parts of CSS
* You have to master the Box Model in order to be an expert at laying out the web page
* The Box Model is one of the factors that define how elements are displayed on a web page and how they are sized
* According to the Box Model each and every element on the page can be seen as a rectangular box
    - And each box can have a:
        + width
        + height
        + padding
        + margins 
        + border
    - But all are optional

### Breaking down the Box Model
* `Content`: text, images, etc
* `Padding`: transparent area around the content, inside the box
    - We use padding to generate white space inside of a box
* `Border`: goes around the padding and the content
* `Margin`: space between boxes
* `Fill area`: area that gets filled with background color or background image
    - This also includes the padding and the border (but not the margin)

## The Box Model: Heights and Widths
**total width** = right border + right padding + specified width + left padding + left border

**total height** = top border + top padding + specified height + bottom padding + bottom border

Example: height = 0 20px + 100px + 20px + 0 = 140px

## Houston we have a problem!
* The above Box Model default width and height is not practical
* The solution is to use `box-sizing: border-box`

![box-sizing: border-box](https://i.imgur.com/Jjw6QcP.png)

## What happens if we set box-sizing to border-box?
* The height and width will be defined for the entire box (including the padding and the border - and not just for the content area)
* What this means at the same time is that the paddings and borders that we specify will reduce the inner width of the content area instead of adding them to the total height or width of an element

![new dimensions with box-sizing:border-box](https://i.imgur.com/omfBoKo.png)

* Adding `box-sizing:border-box` makes our front-end designs so much easier

## All of the above main apply to `block-level` boxes

## 2. Box Types: inline, block-level and inline-block
* These are the 3 most common box types
* These determine the different way boxes are laid out on a page

### Block-level boxes
* Elements formatted visually as blocks
* 100% of parent's width
* Vertically, one after another
* Box-model applies as shown

```
display: block
(display: flex)
(display: list-item)
(display: table)
```

* All of the above produce block-level displays
* All HTML elements have a default display property
    - We can always change this property manually
* Block level will always occupy as much space as possible (which is usually 100% of it's parent's width)
    - And create line breaks after and before
    - This means blocks are formatted vertically one after the other

### Inline boxes
* Basically the opposite of block-level boxes
* Content is distributed in lines
* Occupies only content's space
* No line-breaks
* No heights and widths
* Padding and margins only horizontal (left and right)

```
display: inline;
```

* inline-blocks have lots of limitations

### Inline-blocks
* Technically a inline box but work as a block-level box on the inside
    - The box model applies to them just like in the regular block level boxes (on the inside)
* A mix of block and inline
* Occupies only content's space
* No line-breaks
* Box-model applies like:

```
display: inline-block
```

### 3. Positioning Schemes: Normal Flow, Absolute Positioning and Floats
* There are 3 in CSS

#### Normal Flow
* Default positioning scheme
* NOT floated
* NOT absolutely positioned
* Elements laid out according to their source order
* If you use `position: relative` then the element is still in the "normal flow"

```
Default
position: relative
```

###### What is Normal Flow again?
* It just means that elements are simply laid out in their natural order in the code

### Floats
* Element is removed from the normal flow 
    - The float property causes an element to be completely taken out of the normal flow and shift to the left or the right as far as possible until it touches the edge of its containing box (or another floated element)
* Text and inline elements will wrap around the floated element
    - When an element is floated text and inline elements will wrap around the floated element
* The container will not adjust its height to the element
    - When an element is floated it's container will not adjust its height to the element (which sometimes can be problematic)
        + The usual solution to this is to use clear fixes

```
float: left
float: right
```

### Absolute Positioning
* Element is removed from the normal flow
    - But what is different from floats is:
        + The element has no impact on surrounding content or elements at all
            * It can even overlap them
* We use `top`, `bottom`, `left` and `right` to offset the element from its relatively positioned container

```
position: absolute
position: fixed
```

* **note** An absolutely positioned element can overlap other elements that are occupying the same space
    - CSS solves this for us using something called "stacking context"

### 4. Stacking Contexts
![stacking contexts](https://i.imgur.com/5oD6CJZ.png)

* Stacking contexts are what determine in which order elements are rendered on the page
* A new stacking context can be created by different CSS properties
    - The most widely know is z-index
    - But there are other properties that also create stacking context
* stacking contexts are like layers that form a stack
    - Layers at the bottom of the stack are "painted" first and elements higher up the stack appear on top (overlapping the elements below them)
* We can have a stacking context using position relative or absolute
* **note** A common misconception is that only `z-index` creates a new stacking context but that is not true
    - An `opacity` value different from one
    - A transform, filter or other properties will also create a new stacking context
    - That is why even with a z-index set on a positioned element the stacking order doesn't work as expected







