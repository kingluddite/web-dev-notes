# What is Browsersync?
* We will update Gulp setup to auto-refresh the web browser whenever we change HTML/CSS
* Browsersync does this
    - And it does a lot more

## install browser-sync
`$npm i browser-sync -D`

## Import browser-sync
`gulpfile.js`

```
// more code
browserSync = require('browser-sync').create();
watch = require('gulp-watch');
```

* We are not importing the entire package, just the `create()` method
* We want to auto-refresh whenever we save a change to a file so we want to work inside our Gulp `watch` task
* `browser-sync` spins up a tiny web server on our computer so we need to tell it where our project is

`gulpfile.js`

```
// more code
gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });

  watch('./app/index.html', function() {
    gulp.start('html');
  });
// more code
```

`$ gulp watch`

* `Browser-sync` starts up a server
* Opens the browser
* Points our site, in the server, to the browser

### Add the auto-refresh capability
* Stop the server

`ctrl` + `c`

`gulpfile.js`

```
// more code
gulp.task('html', function() {
  browserSync.reload();
});

gulp.task('styles', function() {
```


