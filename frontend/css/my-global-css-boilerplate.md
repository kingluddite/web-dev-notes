# My CSS Global boilerplate

* prefixes are dead for box-sizing - https://caniuse.com/css3-boxsizing

## box-sizing
* The relationship of `width` and `padding` in CSS by default is problematic
* If you are using widths to match your grid or general column proportions, and then add in text, which necessitates defining padding for those boxes
* And then you need to subtract pixels from your original `width` so the box doesn’t expand
* [history of the css box-model](https://en.wikipedia.org/wiki/CSS_box_model#Background)
* [more history of css box-model](https://www.jefftk.com/p/the-revenge-of-the-ie-box-model)

### Solution to box-sizing problem
* If you want a width of 200px, and you want the width to stay 200px even if you add 20px of padding do this:

```
/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

## Add Normalize before all css

```
// MORE CODE

    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">

// MORE CODE
```

`global.css`

```
/* add box-sizing 
https://www.paulirish.com/2012/box-sizing-border-box-ftw/
*/

/* apply a natural box layout model to all elements, but allowing components to change */
/* no need for prefixes for box-sizing: https://caniuse.com/css3-boxsizing */
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

/* make images responsive */
img {
    max-width: 100%;
}

/* Best way to center main container */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

```

## Tools
* Stylelint
    - [stylelint order](https://stylelint.io/user-guide/get-started)
    - [smacss order](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)

`$ npm install --save-dev stylelint stylelint-config-standard`

## autofix
`$ stylelint --fix` (provide file path to fix)

* example: `npx stylelint --fix "**/*.css"`

`.stylelintrc.json`

```
{
  "extends": "stylelint-config-standard",
  "plugins": ["stylelint-order"],
  "rules": {
    "order/order": ["custom-properties", "declarations"],
    "order/properties-order": ["width", "height"]
  }
}
```

