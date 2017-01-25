# Gulp and images

## Require
`gulpfile.js`

```js
imagemin     = require('gulp-imagemin'),
notify       = require('gulp-notify'),
```

## Update paths object for html

`gulpfile.js`

```js
paths = {
      html: {
        all: './src/*.html',
        dest: './dist/'
},
// MORE CODE
}
```

## Update bundle html task

`gulpfile.js`

```js
gulp.task('bundlehtml', function () {
  return gulp.src(paths.html.all)
          .pipe(gulp.dest(paths.html.dest))
          .pipe(connect.reload());
});
```

## Add image task

`gulpfile.js`

```js
/**
 * Images
 *
 * Look at src/images, optimize the images and send them to the appropriate place
*/
gulp.task('images', function() {

// Add the newer pipe to pass through newer images only
    return gulp.src(['./src/images/**/*.{png,jpg,gif}'])
                .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
                .pipe(gulp.dest('./dist/img/'))
                .pipe( notify( { message: 'Images task complete', onLast: true } ) );
});
```

## Update watch task and default task

`gulpfile.js`

```js
gulp.task('watch', function() {
  gulp.watch([paths.html.all], ['bundlehtml']);
  gulp.watch('./src/images/**/*', ['images']);
  gulp.watch([paths.js.all], ['bundlejs']);
  gulp.watch([paths.sass.all], ['bundlesass']);
});

gulp.task('default', ['connect', 'watch', 'images']);
```

