# Minifying with Gulp
Use two plugins

1. gulp-uglify
2. gulp-rename

## [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
Compress JavaScript

## [gulp-rename](https://www.npmjs.com/package/gulp-rename)
Rename `bundle.js` to `something.min.js`

## Two for the price of one
Install multiple packages by just using a space between package names

`$ npm i -D gulp-uglify gulp-rename`

## Add sourcemaps and rename

`$ npm i -D gulp-sourcemaps gulp-rename gulp-uglify`

## Add requires

`gulpfile.js`

```js
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    // ADD THESE THREE LINES
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
// MORE CODE
```

`gulpfile.js`

```js
gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});
```

Adds a new file called `bundle.min.js` and creates sourcemap for it.

## Update html
Point `index.html` to this new minified file.

`index.html`

```html
<!-- MORE CODE -->
<script src="dist/js/bundle.min.js"></script>
<!-- MORE CODE -->
```

## Run Gulp
`$ npm start`

Make `console.log()` change to `app.js`. Site will update. Sourcemap shows you where `console.log()` is and it is pointing to `bundle.min.js`

We will talk more about sourcemaps and code minification soon.


