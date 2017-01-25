# Watch & Livereload with Gulp
* `watch` built into Gulp
* Livereload built into connect server

## Update config
`gulpfile.js`

```js
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    paths = {
      js: {
        all: ['./src/js/data.js',
             './src/js/helpers.js',
             './src/js/model.js',
             './src/js/router.js',
             './src/js/view.js',
             './src/js/editor.js',
             './src/js/app.js']
      }
    };

gulp.task('connect', function() {
  connect.server();
});

gulp.task('default', ['connect', 'demo']);
```

### defaults vs paths
Both are used a lot for storing paths. In grunt we used `defaults` and here we use `paths`

### Why can't we use globs in `js` property of `paths` object?
Because the order of the JavaScript matters in this instance

* Webpack has a way of not having to list all this files
* Writing files out like this is not a good long term solution

### Configure Livereload on server

`gulpfile.js`

```js
// MORE CODE
gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});
// MORE CODE
```

#### What is root?
Where our server will be living. Above says it lives in the root of our project because that is where `gulpfile.js` resides

* We set livereload to true and that is all we need to do to configure our server

## Set up watch task
Set up certain files and reload server when change occurs in those files

`gulpfile.js`

```js
gulp.task('watch', function() {
  gulp.watch([paths.js.all], ['bundlejs']);
});
```

## Create `bundlejs` task

```js
gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        .pipe(connect.reload());
});
```

Why are we using `paths.js.all`? That is not DRY
Because when we run `gulp.src` it will set up a stream of data, with the files passed

`gulp.src(paths.js.all)`

When we watch these files and run task, the command is not dependent on those files. Maybe we only want to watch two files and not all 30 (or whatever number) of files we are bundling

**gulp.src()** Native method of Gulp

## pipe the reload
`pipe(connect.reload)`

Livereload documentation wants you to specify implicitly whenever you want to reload the server.

## Bottom of html
Pointing to multiple JavaScript files

`index.html`

```html
<!-- /#editorToggle.hidden -->
  <script src="src/js/data.js"></script>
  <script src="src/js/helpers.js"></script>
  <script src="src/js/model.js"></script>
  <script src="src/js/router.js"></script>
  <script src="src/js/view.js"></script>
  <script src="src/js/editor.js"></script>
  <script src="src/js/app.js"></script>
```

## update gulpfile.js

```js
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    paths = {
      js: {
        all: ['./src/js/data.js',
             './src/js/helpers.js',
             './src/js/model.js',
             './src/js/router.js',
             './src/js/view.js',
             './src/js/editor.js',
             './src/js/app.js']
      }
    };

gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch([paths.js.all], ['bundlejs']);
});

gulp.task('default', ['connect', 'watch']);
```

## Run gulp

`$ gulp`

## Check in Chrome inspector
Make a change to `app.js` and update the `console.log()` with a new message. Save and new `console.log()` message updates without having to manually refresh browser. It reloads automatically.

**note** after testing, it does not repload automatically. Still needs a manual page refresh

## scripts in `package.json`
We can run with `$ gulp` or use `$ npm start` if we set that up with `scripts` in `package.json`

```json
{
  "name": "install-gulp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-connect": "^5.0.0"
  }
}
```
