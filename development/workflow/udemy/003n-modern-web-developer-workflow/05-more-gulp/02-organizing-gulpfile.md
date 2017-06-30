# gulpfile.js Organization
* Create folders and files

`/gulp/tasks/styles.js`

```js
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
      .pipe(gulp.dest('./app/temp/styles'));
});
```

`/gulp/tasks/watch.js`

```js
var gulp = require('gulp'),
browserSync = require('browser-sync').create();
watch = require('gulp-watch');

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
});

gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

});
```

`gulpfile.js`

```
require('./gulp/tasks/styles');
require('./gulp/tasks/watch');
```

* Run `$ gulp watch` and it works just like it did before
