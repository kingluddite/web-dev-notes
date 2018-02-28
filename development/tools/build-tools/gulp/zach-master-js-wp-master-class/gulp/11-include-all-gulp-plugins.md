# Including All Gulp Plugins
Plugin to automatically include all plugins instead of having to manually reference them at the top of your file

## [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)
gdhtgm

## Install `gulp-load-plugins`
`$ npm i -D gulp-load-plugins`

## Update config
`gulpfile.js`

```js
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins'),
    // connect = require('gulp-connect'),
    // concat = require('gulp-concat'),
    // sourcemaps = require('gulp-sourcemaps'),
    // uglify = require('gulp-uglify'),
    // rename = require('gulp-rename'),
    // plumber = require('gulp-plumber'),
    // sass = require('gulp-sass'),
    paths = {
      html: {
        all: './*.html'
      },
      sass: {
        main: './src/sass/style.scss',
        all: './src/sass/**/*.scss',
        dest: './dist/css'
      },
      js: {
        all: ['./src/js/data.js',
             './src/js/helpers.js',
             './src/js/model.js',
             './src/js/router.js',
             './src/js/view.js',
             './src/js/editor.js',
             './src/js/app.js'],
        dest: './dist/js'
      }
    };
```

We can comment out all those plugins we manually required. Now that this is set up, this plugin will go into `package.json` and automatically load all `gulp-SOMENAME` plugins

## Replace all names with `plugins.THEPLUGINNAME`

**note** You need to call plugins once you load it:

This is wrong

`plugins = require('gulp-load-plugins'),`

This is correct

`plugins = require('gulp-load-plugins')(),`

## Complete new `gulpfile.js`

```js
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    paths = {
      html: {
        all: './*.html'
      },
      sass: {
        main: './src/sass/style.scss',
        all: './src/sass/**/*.scss',
        dest: './dist/css'
      },
      js: {
        all: ['./src/js/data.js',
             './src/js/helpers.js',
             './src/js/model.js',
             './src/js/router.js',
             './src/js/view.js',
             './src/js/editor.js',
             './src/js/app.js'],
        dest: './dist/js'
      }
    };

gulp.task('bundlehtml', function () {
  return gulp.src(paths.html.all)
            .pipe(plugins.connect.reload());
});

gulp.task('bundlesass', function() {
  return gulp.src(paths.sass.main)
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({ouputStyle: 'compressed'}).on('error', plugins.sass.logError))
            .pipe(gulp.dest(paths.sass.dest))
            .pipe(plugins.connect.reload());
});

gulp.task('bundlejs', function() {
    return gulp.src(paths.js.all)
        // ADD THIS LINE
        .pipe(plugin.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('bundle.js'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        // ADD THESE 2 lines
        .pipe(plugin.uglify())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(plugins.connect.reload());
});

gulp.task('connect', function() {
  plugins.connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch([paths.html.all], ['bundlehtml']);
  gulp.watch([paths.js.all], ['bundlejs']);
  gulp.watch([paths.sass.all], ['bundlesass']);
});

gulp.task('default', ['connect', 'watch']);
```

## Pros of Doing this
Saves you typing

## Cons
Extra step for team members to know what you are using
You have to use `plugins.NAME` instead of naming it what you want
