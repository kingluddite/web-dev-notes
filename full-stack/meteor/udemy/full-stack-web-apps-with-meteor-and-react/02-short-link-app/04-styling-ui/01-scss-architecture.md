# SCSS config and Architecture
## Install Sass
`$ meteor add fourseven:scss`

* Rename `client/main.css` to `client/main.scss`

`client/main.scss`

```
@import './../imports/client/styles/main';
```

## Create `_main.scss`
`$ touch imports/client/styles/_main.scss`

### Also Create
* _base.scss
* _variables.scss

### Import them to `_main.scss`
* Order here is **super** important

```
@import './variables';
@import './base';
```

`_base.scss`

```
// poor man's reset
* {
  margin: 0;
  padding: 0;
}
```

### We will use BEM
`imports/client/styles/components`

## csscomb
[This is a great](http://csscomb.com/) site where you can configure css/sass the way you like:

* Use atom-beautify and in the setting of SCSS use format on save and choose [csscomb as the option](https://i.imgur.com/KwWQQnY.png)

![atom-beautify settings](https://i.imgur.com/vmoLtC2.png)

`csscomb.json`

```
{
    "remove-empty-rulesets": true,
    "always-semicolon": true,
    "color-case": "lower",
    "block-indent": "  ",
    "color-shorthand": false,
    "element-case": "lower",
    "eof-newline": true,
    "leading-zero": true,
    "quotes": "single",
    "sort-order-fallback": "abc",
    "space-before-colon": "",
    "space-after-colon": " ",
    "space-before-combinator": " ",
    "space-after-combinator": " ",
    "space-between-declarations": "\n",
    "space-before-opening-brace": " ",
    "space-after-opening-brace": "\n",
    "space-after-selector-delimiter": "\n",
    "space-before-selector-delimiter": "",
    "space-before-closing-brace": "\n",
    "strip-spaces": true,
    "tab-size": true,
    "unitless-zero": true,
    "vendor-prefix-align": true
}
```

