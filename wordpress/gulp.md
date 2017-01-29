# Gulp

## Install Gulp globally

```
$ sudo npm install -g gulp
```

[WordPress Gulp Tutorial](http://code.tutsplus.com/tutorials/using-gulp-for-wordpress-automation--cms-23081)

## Gulp And WordPress

Navigate to WP Theme folder

```
$ cd Sites/bhs-wp/wp-content/themes/
```

Create the `gulp-animation` folder and initiate a `npm project` inside it

```
$ mkdir wp-gulp-automation
cd wp-gulp-automation 
npm init
```

Accept the defaults (yes, yes, yes...)

Your `package.json` file has been created.

### Install Gulp locally to your file

```
npm install gulp --save-dev
```

* `node_modules` has been created
    - all project dependencies are inside that folder
    - `--save-dev` updates your developer dependencies (stuff you need for development not for production) - gulp is for development environment

### gulpfile.js

```
var gulp = require('gulp');
 
gulp.task('default', function(){
 
    console.log('default gulp task...')
 
});
```

### Install Gulp Sass

```
$ npm install gulp-sass --save-dev
```


`gulpfile.js`

```
var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
 
    gulp.src('./css/src/*.scss')
 
        .pipe(sass())
 
        .pipe(gulp.dest('./css'));
 
});
 
gulp.task('default', ['sass']);
```

You can now run with `gulp` or `gulp sass` command in Terminal.

## Lint and Concat JS files

```
$ npm install gulp-jshint --save-dev
$ npm install gulp-concat --save-dev
```

gulpfile.js

```
...
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin');
...
```

Finished File

gulpfile.js

```
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('sass', function () {
  gulp.src('./css/src/*.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('js', function () {
    gulp.src('js/src/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('js'));
    .pipe(livereload());
});

gulp.task('img', function() {
  gulp.src('img/src/*.{png,jpg,gif}')
    .pipe(plumber(plumberErrorHandler))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest('img'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('css/src/*.scss', ['sass']);
  gulp.watch('js/src/*.js', ['js']);
  gulp.watch('img/src/*.{png,jpg,gif}', ['img']);
});

gulp.task('default', ['sass', 'js', 'img', 'watch']);

```
