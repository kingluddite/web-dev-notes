## problems
Get CLI error when installing jshint when using Gulp

![jshint error](https://i.imgur.com/5xEtagI.png)

First make sure **jshint** is installed globally

```
npm install -g jshint
```

**Solution**

```
$ npm install --save-dev jshint gulp-jshint
```

## Compile Sass into CSS
**Never** Edit compiled `application.css` file

## gulp-sass

```
$ npm install gulp-sass --save-dev
```

```js
gulp.task('compileSass', function() {
  gulp.src("scss/application.scss")
      .pipe(sass())
      .pipe(gulp.dest('css'))
});
```

### To Test
1. Delete css folder with application.css inside
    - That file is compiled from all the scss files
2. Run the server
3. View [http://localhost:3000](http://localhost:3000)
4. You will see a site without CSS
5. Run compileSass
6. Restart the server
7. You will see a site with the new compiled **Sass** into a new **CSS** folder
8. Gulp creates the directory and file if it doesn't exist

## Source Maps
Point your compiled **CSS** file to your individual `.scss` source files

### Install
```
$ npm install gulp-sourcemaps --save-dev
```

### Create Source Map

```js
gulp.task('compileSass', function() {
  gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('../maps'))
      .pipe(gulp.dest('css'))
});
```

* Add required `gulp-sourcemaps` variable
* Task initializes sourcemap
* Task compiles application.scss into application.css
* Task writes the source file
* Task puts the compiled application.css the `css` folder
* Task puts source map in `maps`

## JavaScript source maps

### Why they are useful

Without them if you have a JavaScript error you'll see something like this

* At the bottom of your JavaScript file add this:

```js
var foo = bar; // bar is undefined so you will get an error
```

* Run the server and you'll get this error

![js error without source maps](https://i.imgur.com/DC6V76U.png)

Error on line 10540! Wow that will be a pain to track down

**Note:** the path `.pipe(gulp.write('./'))` is relative to the path provided to `gulp.dest()`

Our new adjusted task

```js
gulp.task("concatScripts", function() {
  gulp.src([
    'js/jquery.js',
    'js/sticky/jquery.sticky.js',
    'js/main.js'])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('../maps'))
  .pipe(gulp.dest("js"));
});
```

* The `app.js` will be in the `js` folder
* The source map will be in the `maps` folder
* You now see the original file where the error is located. Easy to fix. Cool!

## Automate running tasks
Add this line before last `default` task

```js
gulp.task("build", ['concatScripts', 'minifyScripts', 'compileSass']);
```

### Run it
```
$ gulp build
```

**Note:** By default gulp runs all tasks concurrently

* This could be a big problem!

If you delete your JavaScript `app.js` and `app.min.js` files and rerun the build script you will see the min file is not generated. Also if you add a line of JavaScript to `main.js` it will be compiled but not added to the minified code

## How do we add dependencies in gulp?

* Need **concatScripts** to explicitly return the stream that its creating. This is a small detail but it is very important. Adding this **return** statement acts as sort of a **promise**. Without the **return** statement other tasks won't know when the **concatScripts** task is finished and so they'll start right away instead of waiting for it to finish.

* Since all of our tasks are going to be dependencies of other tasks we'll add the **return** statement for each of the streams of data.

* Since **concatScripts** is a dependency of **minifyScripts** we can remove it from the build task

* Add build task to default task. Now just type `gulp` to run all tasks. Cool!

## Final gulpfile.js

```js
'use strict'

var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass   = require('gulp-sass'),
    maps   = require('gulp-sourcemaps');

gulp.task("concatScripts", function() {
  return gulp.src([
    'js/jquery.js',
    'js/sticky/jquery.sticky.js',
    'js/main.js'])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('../maps'))
  .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('js'))
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('../maps'))
      .pipe(gulp.dest('css'))
});

gulp.task("build", ['minifyScripts', 'compileSass']);

gulp.task("default", ['build']);
```

## Gulp's Watch Method
**Note:** You don't always need a **return** statement

If other tasks don't depend on a given task you don't need to return anything from its callback.

[more info](https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support)

 We need to watch all our 12 `.scss` files. We could add them all in a series of strings inside an array but that would be time consuming

 ### Using Globbing Patterns is way faster

**example**

```js
 gulp.watch('scss/**/*.scss', ['compileSass']);
```

* Look in the **scss** folder
     - Look in all of its sub directories
         + Look for any file with a `.scss` extension

### Watch task
```
gulp.task('watchSass', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
});
```

* First parameter can be a String or Array if more than one glob pattern
* Second parameter must be an Array (_tell gulp what to watch_)

### Run watch task
```
$ gulp watchSass
```

Now every change you make to any `.scss` file will be watched and recompiled every time. Major time saver!

**Note:** Watch is a gulp method

## Gulp tips
* Build and deploy your application
* File Concatenation
* Minification

### How to implement the build pipeline in your project
Build our finished app in one easy to distribute folder called `dist`

```js
gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src([
                   "css/application.css",
                   "js/app.min.js",
                   "index.html",
                   "maps/**",
                   "img/**",
                   "fonts/**"], { base: './'})
              .pipe(gulp.dest('dist'));
});
```

* We use **return** because this task is a dependency on default task
* We point to our current source files
* We use base to keep our same folder structure when we move to the `dist` folder

## Run `gulp build`
We now have all our production files ready to be distributed. Cool!

## Automate your workflow in your development environment

## Add a clean process
The *clean task* deletes all the files that may have been compiled by previous runs of a gulp task
* Purpose
    - Make sure nothing stays from past builds
    - Especially if the file names have changed
        + Lots of unused files will be hanging around
 
### `Del` node module
* Allows us to delete files and folders according to a glob pattern
 
## Install the `del` module

```
$ npm install del --save-dev
```

Here is the clean task

```js
 gulp.task('clean', function() {
  del(['dist', 'css/application.css', 'js/app*.js', 'maps/**']);
});
```

* When **clean task** is called, the **del node method** will delete all the glob patterns displayed in the array

### Tried to minify CSS too but had problems

```js
"use strict";

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    del        = require('del'),
    cssnano    = require('gulp-cssnano');

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('css'));
});

gulp.task('minifyCss', ["compileSass"], function() {
  return gulp.src('css/application.css')
    //.pipe(sourcemaps.init())
    .pipe(cssnano())
    //.pipe(sourcemaps.write('../maps'))
    .pipe(rename('application.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('watchSass', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
});

gulp.task('clean', function() {
  del(['dist', 'css/application*.css', 'js/app*.js', 'maps/**']);
});

gulp.task("build", ['minifyScripts', 'minifyCss'], function() {
  return gulp.src([
                   "css/application.min.css",
                   "js/app.min.js",
                   "index.html",
                   "maps/**",
                   "img/**",
                   "fonts/**"], { base: './'})
              .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
```

### Working Gulp
* Watching **js** and **css**

```js
"use strict";

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    del        = require('del'),
    cssnano    = require('gulp-cssnano');

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('css'));
});

// gulp.task('minifyCss', ["compileSass"], function() {
//   return gulp.src('css/application.css')
//     //.pipe(sourcemaps.init())
//     .pipe(cssnano())
//     //.pipe(sourcemaps.write('../maps'))
//     .pipe(rename('application.min.css'))
//     .pipe(gulp.dest('css'));
// });

gulp.task('watchFiles', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('js/main.js', ['concatScripts']);
});

gulp.task('clean', function() {
  del(['dist', 'css/application*.css', 'js/app*.js', 'maps/**']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src([
                   "css/application.css",
                   "js/app.min.js",
                   "index.html",
                   "maps/**",
                   "img/**",
                   "fonts/**"], { base: './'})
              .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
```






