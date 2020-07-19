# Add stylelint to gatsby
* [gatsby stylelint docs](https://www.gatsbyjs.org/packages/gatsby-plugin-stylelint/)
* [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
* [vs code and stylelint](https://github.com/stylelint/vscode-stylelint/issues/35)

## Add to config
`gatsby-config.js`

```
// MORE CODE

// In your gatsby-config.js
plugins: ["gatsby-plugin-stylelint"]
// MORE CODE
```

## Install
`$ gatsby-plugin-stylelint stylelint stylelint-webpack stylelint-config-standard stylelint-order`

Create `.stylelintrc.json` in root of your project

`.stylelintrc.json`

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

## TODO - autofix

## Test
* You now need to use proper spacing and order for css properties

`layout.js`

```
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

body {
font-family: 'Roboto', sans-serif;
}

h1 {
  text-transform: capitalize;
  color: green;
}
```

* You should see that stylelint tells you to order and space index
* Fix the errors and you are good to go
* Would be great if it autofixed this
