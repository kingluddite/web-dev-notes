# Stylelint

## Installs
`$ npm i gulp-postcss postcss-reporter stylelint -D`

`/gulp/tasks/stylelint.js`

```js
/**
 * Linting CSS stylesheets with Stylelint
 * http://www.creativenightly.com/2016/02/How-to-lint-your-css-with-stylelint/
 */

var gulp        = require('gulp');

var postcss     = require('gulp-postcss');
var reporter    = require('postcss-reporter');
var stylelint   = require('stylelint');

gulp.task("css-lint", function() {

  // Stylelint config rules
  var stylelintConfig = {
    "rules": {
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "function-comma-space-after": "always",
      "function-url-quotes": "always",
      "string-quotes": "single",
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-no-vendor-prefix": true,
      "max-empty-lines": 5,
      "number-leading-zero": "always",
      "number-no-trailing-zeros": true,
      "property-no-vendor-prefix": true,
      "declaration-block-no-duplicate-properties": [ true, {
      ignore: ["consecutive-duplicates-with-different-values"],
    } ],
      "declaration-block-trailing-semicolon": "always",
      "selector-list-comma-space-before": "never",
      "selector-list-comma-newline-after": "always",
      "selector-no-id": true,
      "string-quotes": "double",
      "value-no-vendor-prefix": true
    }
  }

  var processors = [
    stylelint(stylelintConfig),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];

  return gulp.src(
      // Stylesheet source:
      ['./app/assets/styles/**/*.css',
      // Ignore linting vendor assets:
      // (Useful if you have bower components)
      '!app/assets/css/vendor/**/*.css']
    )
    .pipe(postcss(processors));
});
```

## Require it

`gulpfile.js`

```js
require('./gulp/tasks/styles');
require('./gulp/tasks/watch');
require('./gulp/tasks/sprites');
require('./gulp/tasks/stylelint');
```

[Read More On How to use Stylelint](http://www.creativenightly.com/2016/02/How-to-lint-your-css-with-stylelint/)

[Stylelint home page](https://stylelint.io/)

