# How CSS Values are processed
* If you use any other unit of measurement it will ultimately be converted to pixels

`HTML`

```
// MORE CODE

<div class="section">
  <p class="amazing">CSS is great</p>
</div>
// MORE CODE
```

`CSS`

```
// MORE CODE

.section {
  font-size: 1.5rem;
  width: 280px;
  background-color: orangered;
}

p {
  width: 140px;
  background-color: green;
}

.amazing {
  width: 66%;
}
// MORE CODE
```

![rendered HTML](https://i.imgur.com/TJoudh4.png)

## 1. Declared value (author declaration)

![declared value](https://i.imgur.com/Gow4Cg7.png)

width of `p` is either 140px or 66%?
* width of `p` will be 66% because it is more specific

## 2. Cascaded value (after the cascade)
* Because of specificity the width of `p` will be 66%

## 3. Specified value (defaulting, if there is no cascaded value)
* Not relevant in the case as it is already 66%

## 4. Computed value (converting relative values to absolute)
* values with relative units are converted to pixels so then can be inherited
* Also CSS keywords like orange, red, orangered, green, auto, bolder are computed and converted in this step
* In this step we are using % which is technically not a unit so nothing is converted in this step

## 5. Used value (final calculation, based on layout)
184.8px

![final used value](https://i.imgur.com/ip8SJTl.png)

* The CSS engine uses the rendered layout to figure out some of the remaining values
    - for example:
        + percentage values that depend on the layout
        + 66% of 280px (66% is in relation to it's parent element `<div class="section">` which has a width of `288px`)
        + 280*.66 = 184.8px
        + 184.8px is our `used` value
        + browser won't render a value that specific and they'll just round to 185px (and this is after all the calculated value steps the **actual value** which is now ready to be used in the layout)
        + So remember the actual value is usually obtained by considering the browser and device restrictions

## Now looks at the padding property of the paragraph
* There is no padding property in our example
* Yes we didn't declare padding but it still have to have a value
* This is because in each element on the page each and every CSS property NEEDS to have a value (even if we never declare it at all!)
    - for `padding` we have no declared value and no cascade value
    - But we do have a **specified** value
        + And that is because each CSS property has something referred to as an `initial value` (which is simply the value used if there is no cascaded value)
            * In this case it will be `0px` (initial value)
        + different properties have different initial values
        + For padding the initial value is `0px`
            * And that's it because there is no other computed values
            * It is already `px` which is an absolute unit
            * So the computed, actual and used values are all just `0px`

![0px](https://i.imgur.com/yaA99lw.png)

## root font-size
* This means the overall font-size of a document
    - We didn't define it anywhere
    - So again there is no declared value
    - But this is different from the padding property we looked at before
        + That is because the browser for font-size usually has a default value of `16px` (browser default)
        + **remember** The CSS can come from different agents and in this case the font-size is a user-agent (comes from the browser default)
        + So 16px is our cascaded value
* No more calculations needed, 16px is the used value

![16px font-size](https://i.imgur.com/yRBerni.png)

## section font-size
* We do have a declared value of `1.5rem` for font-size
* **note** `rem` is a relative unit and so it needs to be converted to pixels by the engine
    - So the cascaded and specified values are still `1.5rem`
        + But the computed value is 24px
            * Why is that?
                - 1.5 * 16px = 24px
                - The `rem` unit is ALWAYS relative to the root font-size (16px)

![final value](https://i.imgur.com/yNiqY1G.png)

## font-size of paragraph
* We don't see a font-size specified for `p`
    - So how come the text still has a font-size?
        + In this case its no default
        + And it's no initial value
        + But it is a mechanism called **inheritance**
* Note that some properties like font-size inherit the computed value of their parent element
    - This works like this because it is extremely useful
    - Imagine if you had to specify the font size on each and every element (this would be a nightmare)
    - So we just need to define it on some parent and the children will inherit it (unless we declare something else in the child)

![inherit font-size](https://i.imgur.com/lChwUe5.png)

![final how css values are processed](https://i.imgur.com/Lfdc0MS.png)

## How CSS engine Units are converted from relative to absolute (px)
4. Computed value (converting relative values to absolue)
5. Used value (final calculations, based on layout)

* **note** This is crucial to know when you write your own code
* This has a practical application in the real world
* As relative units are fundamental to build modern responsive layouts

`CSS`

```
// MORE CODE

html, body {
  font-size: 16px;
  width: 80vw;
}

header {
  font-size: 150%;
  padding: 2em;
  margin-bottom: 10rem;
  height: 90vh;
  width: 1000px
}

.header-child {
  font-size: 3em;
  padding: 10%;
}
// MORE CODE
```

### Let's talk about percentages %
* There is a difference with percentages when it comes to:
    - % (fonts)
    - % (lengths or distant measurements)
* **note** % is not technically a unit but for simplicity we'll treat it as one

#### in `header` we have a font-size of `150%`
**Example**    **How to convert to px **                    **Result in px**
150%          x% * parent's computed font-size          24px
                1.5*16=24px

## length (expressed in %) measurement work differently
* height, padding, margin or something else
    - **NEVER FORGET** the reference IS ALWAYS the parent elements width

### .header-child
**Example**    **How to convert to px **                    **Result in px**
padding: 10%         x% * parent's computed font-size          100px
                    1000px * 10% = 100          

## font based relative units
* em
    - It is different to use `em` for fonts than for lengths
* rem

* **Note** both `em` and `rem` are font based
    - But the difference is `em` use the parent or the current element as a reference
    - While `rem` use the root font-size as the reference

### .header-child 3em font-size
* The reference is just the parent's font size
    - 3 * 24 = 72px

### header
* But for length and padding of `2em` we use the font-size of the current element (which is 24px)
    - so 24*2=48px
* It is a subtle difference but **and important one**

## But rem works the same for font-sizes and length
* It is based on the root element
    margin-bottom will be 16*10 = 160px

![final px measurements](https://i.imgur.com/JBdq4FA.png)

## Why use em and rem if they are based on font-size?
* The answer is by doing so we can build more robust responsive layouts
    - Because just by changing font-sizes we will automatically change length since they depend on a font-size
        + That gives us a lot of flexibility
        + It is a great technique

![all measurements](https://i.imgur.com/bKIb8WF.png)

em (font-based)
em (lengths)
rem (font-based)

viewport-based (vh, vw)

90vh x * 1% of viewport height 90% of current viewport height

We use vh and vw for heros in layout

## Summary
* Each property has an initial value, used if nothing is declared (and if there is no inheritance)
* Browsers specify a **root font-size** for each page (usually 16px)
* Percentages and relative values are always converted to pixels
* Percentages are measured relative to their parent's **font-size**, if used to specify font-size;
* Percentages are measured relative to their parent's width, if used to specify lengths
* `em` are measured relative to their parent `font-size`, if used to specify font-size
* `em` are measured relative to the current font-size, if used to specify lengths
* `rem` are always measured relative to the document's root `font-size`
* `vh` and `vw` are simply percentage measurements of the viewport's `height` and `width`
