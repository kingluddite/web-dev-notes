# Center stuff in header
## Using BEM
* [BEM 101](https://css-tricks.com/bem-101/)

```
// MORE CODE
.heading__primary {
  color: #fff;
  text-transform: uppercase;
}

.heading__primary--main {

}

.heading__primary--sub {

}
```

## Block elements
* Can convert inline `span` from default `inline` to `block` level
* **note** block elements occupy entire width that hey have available
    - And they create line-breaks after and before them

```
// MORE CODE
.heading__primary {
  color: #fff;
  text-transform: uppercase;
}

.heading__primary--main {
  display: block;
  font-size: 60px;
  font-weight: 400;
  letter-spacing: 35px;
}

.heading__primary--sub {
  display: block;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 18px;
}
```

## BEST PRACTICE: CSS should be written in the natural order from top to bottom
## BEST PRACTICE: CSS properties can be written in alphabetical order

## Best way to center a header in the middle

`index.html`

```
// MORE CODE

  <header class="header">
      <div class="logo-box"><img class="logo" src="./assets/img/logo-white.png" alt="Logo"></div>
     
      <div class="text__box">
        <h1 class="heading__primary">
          <span class="heading__primary--main">Outdoors</span>
          <span class="heading__primary--sub">is where life happens</span>
        </h1>
        <!-- /.heading__primary -->
      </div>
      <!-- /.text__box -->
  </header>

// MORE CODE
```

* Now we'll style that

```
// MORE CODE

.text__box {
  left: 50%;
  position: absolute;
  top: 50%;
}

// MORE CODE
```

* That moves it left 100% and top 100% but it's not what we want
* We'll use the transform rule to translate the image -50% x and -50% y to the element itself

```
// MORE CODE

.text__box {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

// MORE CODE
```

* And now our heading is smack in the middle of the page
* We just ship it 40% down for a better look

```
// MORE CODE

.text__box {
  left: 50%;
  position: absolute;
  top: 40%;
  transform: translate(-50%, -50%);
}

// MORE CODE
```

* **important note** about positioning
    - In position: absolute it is in relation to the parent element
    - But transform: translate(-50%, -50%) is in relation to the element itself

## .stylelintrc
* stylelint-order rules for SMACSS property sort order
* [github repo](https://gist.github.com/jsit/441a44fb07bfae49c93348147d2459d6#file-stylelintrc)

`stylelintrc.json`

```
{
  "extends": "stylelint-config-standard",
  "plugins": [
        "stylelint-order"
    ],
    "rules": {
        "order/order": [
            "custom-properties",
            "declarations"
        ],
    "order/properties-order": [
      { "properties": [ "content", "quotes" ] },

      { "properties": [ "display", "visibility" ] },
      { "properties": [ "position", "z-index", "top", "right", "bottom", "left" ] },
      { "properties": [ "box-sizing" ] },
      { "properties": [ "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "align-content", "align-items", "align-self", "justify-content", "order" ] },
      { "properties": [ "width", "min-width", "max-width", "height", "min-height", "max-height" ] },
      { "properties": [ "margin", "margin-top", "margin-right", "margin-bottom", "margin-left" ] },
      { "properties": [ "padding", "padding-top", "padding-right", "padding-bottom", "padding-left" ] },
      { "properties": [ "float", "clear" ] },
      { "properties": [ "overflow", "overflow-x", "overflow-y" ] },
      { "properties": [ "clip", "zoom" ] },
      { "properties": [ "columns", "column-gap", "column-fill", "column-rule", "column-span", "column-count", "column-width" ] },
      { "properties": [ "table-layout", "empty-cells", "caption-side", "border-spacing", "border-collapse", "list-style", "list-style-position", "list-style-type", "list-style-image" ] },

      { "properties": [ "transform", "transform-origin", "transform-style", "backface-visibility", "perspective", "perspective-origin" ] },
      { "properties": [ "transition", "transition-property", "transition-duration", "transition-timing-function", "transition-delay" ] },
      { "properties": [ "animation", "animation-name", "animation-duration", "animation-play-state", "animation-timing-function", "animation-delay", "animation-iteration-count", "animation-direction" ] },

      { "properties": [ "border", "border-top", "border-right", "border-bottom", "border-left", "border-width", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width" ] },
      { "properties": [ "border-style", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style" ] },
      { "properties": [ "border-radius", "border-top-left-radius", "border-top-right-radius", "border-bottom-left-radius", "border-bottom-right-radius" ] },
      { "properties": [ "border-color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color" ] },
      { "properties": [ "outline", "outline-color", "outline-offset", "outline-style", "outline-width" ] },
      { "properties": [ "stroke-width", "stroke-linecap", "stroke-dasharray", "stroke-dashoffset", "stroke" ] },

      { "properties": [ "opacity" ] },
      { "properties": [ "background", "background-color", "background-image", "background-repeat", "background-position", "background-size", "box-shadow", "fill" ] },

      { "properties": [ "color" ] },
      { "properties": [ "font", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-effect", "font-style", "font-variant", "font-weight" ] },
      { "properties": [ "font-emphasize", "font-emphasize-position", "font-emphasize-style" ] },
      { "properties": [ "letter-spacing", "line-height", "list-style", "word-spacing" ] },
      { "properties": [ "text-align", "text-align-last", "text-decoration", "text-indent", "text-justify", "text-overflow", "text-overflow-ellipsis", "text-overflow-mode", "text-rendering", "text-outline", "text-shadow", "text-transform", "text-wrap", "word-wrap", "word-break" ] },
      { "properties": [ "text-emphasis", "text-emphasis-color", "text-emphasis-style", "text-emphasis-position" ] },
      { "properties": [ "vertical-align", "white-space", "word-spacing", "hyphens" ] },
      { "properties": [ "src" ] },

      { "properties": [ "tab-size", "counter-reset", "counter-increment", "resize", "cursor", "pointer-events", "speak", "user-select", "nav-index", "nav-up", "nav-right", "nav-down", "nav-left" ] }
    ]
    }
}
```
