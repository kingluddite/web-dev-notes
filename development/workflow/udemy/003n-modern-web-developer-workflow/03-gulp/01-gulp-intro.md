# Gulp Intro
## What is Gulp?
* A build system
* A build tool
* A task runner
* Translation: Gulp makes it easy to automate development tasks
* Gulp is at heart of all automation for many projects
* Gulp doesn't do anything by itself
    - Lightweight
    - Efficient
    - Runs Quickly
* Think of Gulp like a record player
    - By itself does nothing
    - Gulp plugins === records
    - Thousands of Gulp plugins to automate thousands of tasks
    - Gulp is simple

## Install Gulp on your computer
### Two steps to installing Gulp on Project
1. Install it Globally
   * `$ gulp` - if you get "Command not found" - you need to install it
   * If you don't have Gulp installed globally here is how you do that:

`$ npm install gulp-cli --global`

## Troubleshoot
`$ sudo npm install gulp-cli --global`

* Now we have the ability to use gulp commands from any project we are working on, on our computer

* Now run gulp and you'll get an error message
* `$ gulp -v` - version of Gulp you are currently running

2. Install Gulp in your project
    * Add the Gulp package into our `pacakge.json`
    * `$ npm i gulp --save-dev`
    * Then test gulp with `$ gulp`
    * Error message: `No gulpfile found`
    * We are good. Time to create the Gulp config file

## `/gulpfile.js`

`$ touch gulpfile.js`

## Demo
`gulpfile.js`

```
var gulp = require('gulp');
```

* Run gulp `$ gulp` - error --> "Task default is not in your gulpfile"
* Everything in gulp revolves around tasks

`gulpfile.js`

```
var gulp = require('gulp');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});
```

Run gulp and you'll see the log message

### Running individual tasks
Add another task

`gulpfile.js`

```
var gulp = require('gulp');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});
```

* You can run the `default` task with just `$ gulp`
* Or you can run the individual `html` task with `$ gulp html`

### first Gulp plugin
gulp-watch

`$ npm install gulp-watch --save-dev`

or better

`$ npm i gulp-watch -D`

### Require the plugin
```js
var gulp = require('gulp');
var watch = require('gulp-watch');
```

#### Save yourself typing
```js
var gulp = require('gulp'),
watch = require('gulp-watch');
```

### Using watch to watch tasks
`gulpfile.js`

```
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});

gulp.task('watch', function() {

  watch('./app/index.html', function() {
    gulp.start('html');
  });

});
```

* Now anytime you make changes to `app/index.html` gulp is watching and will run the log statement inside the `html` task

## How to stop gulp from watching
`ctrl` + `c` in command line

### Two for one
* Have gulp watch two files
* Create `app/assets/css/styles.css`

`gulpfile.js`

```
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});

gulp.task('styles', function() {
  console.log("CSS stuff here");
});

gulp.task('watch', function() {

  watch('./app/index.html', function() {
    gulp.start('html');
  });

  watch('/.app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });

});
```

* Globbing - way to watch all css files inside a folder or even nested CSS files
* Changes to anything inside the `css` folder or `index.html` are being watched
* You can individually call `$ gulp styles` just to run that task
