# Concatenation with Gulp

## [gulp-concat](https://www.npmjs.com/package/gulp-concat)
Plugin for Gulp to concatenate files

### Install gulp-concat as dependency
`$ npm i -D gulp-concat`

### require gulp concat

`gulpfile.js`

```json
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
// MORE CODE
```

## Update `paths` object

`gulpfile.js`

```json
// MORE CODE
paths = {
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
// MORE CODE
```

## Update bundlejs task

`gulpfile.js`

```json
// MORE CODE
gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});
// MORE CODE
```

* `concat('bundel.js')` - works on stream of data only
* `gulp.dest()` take our stream and write to a file (`paths.js.dest`)

### `gulpfile.js` naming convention
Don't use spaces inside parenthesees

## Quick hack for index.html

`gulpfile.js`

```json
// MORE CODE
gulp.task('watch', function() {
  gulp.watch([paths.js.all, 'index.html'], ['bundlejs']);
});
// MORE CODE
```

Easy way to watch changes to `index.html` and then run livereload but we don't really want to update all files when we only update `index.html`. A better solution will be discussed later.

## Run with npm
`$ npm start`

* Uses `package.json`
* Instead of `$ gulp`, this way abstracts the underlying build tools

## Does it work?
Update `index.html` to point to one file

Change this:

```html
<script src="src/js/data.js"></script>
  <script src="src/js/helpers.js"></script>
  <script src="src/js/model.js"></script>
  <script src="src/js/router.js"></script>
  <script src="src/js/view.js"></script>
  <script src="src/js/editor.js"></script>
  <script src="src/js/app.js"></script>
```

To this:

```html
<script src="dist/js/bundle.js"></script>
```

* Page should update because we are watching `index.html`
* Update your `app.js` console.log() to see change updates Chrome inspector

## Works but with a problem
We overwrite `bundle.js`

We stop server.
`ctrl` + `c`

Any changes to `gulpfile.js`, stop and start server

