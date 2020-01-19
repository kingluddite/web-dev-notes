# Stylelint
* This helps find bugs in your css
* It also helps format your styles in alphabetical order

### Add these packages

`$ yarn add stylelint stylelint-order -D`
`$ npm i stylelint stylelint-order -D`

`/.stylelintrc`

```
{
  "plugins": [
    "stylelint-order"
  ],
  "rules": {
    "order/order": [
      "custom-properties",
      "declarations"
    ],
    "order/properties-alphabetical-order": true
  }
}
```

* Adding this got rid of errors in `.scss` files
* [readmore](https://www.freecodecamp.org/news/integrating-prettier-with-eslint-and-stylelint-99e74fede33f/)

## Where is my `bundle.js`?
* `webpack-dev-server` is serving `bundle.js` from memory
* This is done to make serving `bundle.js` fast
* You can add another webpack config for production that spits out `bundle.js` to disk
