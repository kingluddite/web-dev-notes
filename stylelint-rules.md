# Stylelint rules
## Getting it to work with styled-components
* Use my css-boilerplate as a starter
* These links
  - https://github.com/styled-components/stylelint-processor-styled-components
  - https://styled-components.com/docs/tooling
  - https://www.reddit.com/r/reactjs/comments/fb1o97/is_there_a_favoured_way_to_lint_styled_components/
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

