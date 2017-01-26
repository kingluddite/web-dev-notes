# [Gulp Plummer](https://www.npmjs.com/package/gulp-plumber)
When error from linter occurs, gulp stops stream and server. This is unique to gulp. Plummer not needed in grunt.

[more info on gulp streaming problems and why gulp plummer may help](https://gist.github.com/floatdrop/8269868)

Makes sure errors that occur do not stop everything else from running.

## Install gulp-plumber
`$ npm i -D gulp-plumber`

## Require gulp-plumber

`gulpfile.js`

```js
// MORE CODE
plumber = require('gulp-plumber'),
// MORE CODE
```

## Update `bundlejs` task

`gulpfile.js`

```js
gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        .pipe(plumber())
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

## Run Gulp
`$ gulp`

Break JavaScript. You are notified of error. Fix JavaScript error and server refreshes.

