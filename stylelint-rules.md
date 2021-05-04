# Stylelint rules
* Rules
    Use double quotes

#
```
// MORE CODE

{
  "extends": "stylelint-config-recess-order",
  "rules": {
    // MORE CODE

    "string-quotes": "double",

    // MORE CODE

  }

// MORE CODE
```

What about vendor prefixes?

* I think we should use [browserslist](https://github.com/browserslist/browserslist/#readme) as a separate file to be explict about which browsers we support
* [browserslist is a good idea](https://css-tricks.com/browserlist-good-idea/)

`.browserslistrc`

```
# Browsers that we support

last 2 versions
> 1%
IE 10 # sorry
```

`.stylelintignore`

* https://stylelint.io/user-guide/ignore-code

```
css/**/*.css
**/*.js
vendor/**/*.css
```

