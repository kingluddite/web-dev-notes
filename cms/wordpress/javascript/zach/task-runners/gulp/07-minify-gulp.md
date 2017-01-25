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

## Add requires

`gulpfile.js`

```js
// MORE CODE
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
// MORE CODE
```

## Update `bundlejs` task

```js
gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        // ADD THESE 2 lines
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});
```

We compress with uglify and then take the stream of compressed data and create the minified file alongside the `bundle.js` file

