## Inheritance in CSS
* Every CSS property must have a value
    - Even if we the developer or the browser specify a value

### Let's analyze `line-height` on .child

```
.parent {
    font-size: 20px;
    line-height: 150%;
}

.child {
   font-size: 25px; 
}
```

### Questions the CSS engine asks when processing a certain property for a certain element
![is there a cascaded value](https://i.imgur.com/clfVf88.png)

1. Is there a cascaded value?
    * If Yes... that is the value used (specified value = Cascaded value)
    * If No... Is the property inherited (specific to each property)
        - There are some properties that are inherited and some that are not
        - Use MDN to find if inherited under the Specifications
            + [Here is an example](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) of `line-height` where you can see it is inherited
    * If the property is inherited then the value of that property becomes the computed value of its parent element (THIS IS INHERITANCE)

![inheritance](https://i.imgur.com/vyIqta7.png)

* **note** The value that gets inherited is not `line-height: 150%` but the computed value
    - The computed value is `150% of 20px` (20px is the font-size) and so the computed value is `30px` and so the line-height of the child element will also be `30px`
    - **REMEMBER** It is not the declared value that gets passed but the computed value

## What about a property that is not inherited?
* `padding` is not inherited
    - Then since it is not inherited, then the specified value will become the Initial value which is also specific to each property
    - So for padding that would just be `0px`
        + You don't need to memorize these initial values as they are all intuitive

### List of CSS properties that Inherit
```
border-collapse
border-spacing
caption-side
color
cursor
direction
empty-cells
font-family
font-size
font-style
font-variant
font-weight
font-size-adjust
font-stretch
font
letter-spacing
line-height
list-style-image
list-style-position
list-style-type
list-style
orphans
quotes
tab-size
text-align
text-align-last
text-decoration-color
text-indent
text-justify
text-shadow
text-transform
visibility
white-space
widows
word-break
word-spacing
word-wrap
```

## Summary
* Inheritance passes the values for some specific properties from parents to children - **more maintainable code**
    - Inheritance allows developers to write less code
* Properties related to text are inherited: `font-family`, `font-size`, `color`, etc
    - As a rule of thumb, properties related to text are inherited
* Padding and margin are not inherited
    - This is just for practical reasons
    - Imagine setting padding on a parent and then all of the children inherit that padding... it would be a nightmare
* What gets inherited is the computed value and **not** the declared value
* Inheritance of a property only works if no one declares a value for that property (neither the developer or the browser)
* The `inherit` keyword forces inheritance on a certain property
* The `initial` keyword resets a property to its initial value


