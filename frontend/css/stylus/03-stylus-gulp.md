# Gulp and Stylus

if you're tired of constantly typing commands to watch your project with stylus, you will like gulp as it is a build tool that does work for you and saves you time

watch level up video series on Gulp

install gulp globally

`$ sudo npm install --global gulp`

now we need to install gulp into our project

`$ npm init -y`

add gulp to our project

`$ npm install --save-dev gulp`

install gulp-stylus

`$ npm install --save-dev gulp-stylus`

create your `gulpfile.js`

```js
var gulp = require('gulp');
var stylus = require('gulp-stylus');


gulp.task('styles', function() {
  gulp.src('style.styl')
      .pipe(stylus())
      // current path
      .pipe(gulp.dest('./'));
});
```

comment out all stylus and just make this simple rule

```stylus
body
  background red
```

`$ gulp stylus`

and that will generate your css for you

update the gulpfile.js

```js
var gulp = require('gulp');
var stylus = require('gulp-stylus');


gulp.task('styles', function() {
  gulp.src('style.styl')
      .pipe(stylus())
      // current path
      .pipe(gulp.dest('./'));
});

gulp.task('watch:styles', function(){
  gulp.watch('**/*.styl', ['styles']);
});
```

and then start watching with

`$ gulp watch:styles`

now if you change your stylus, you will see the css output file automatically update

## useing gulp with packages

```
$ npm install --save-dev typographic
$ npm install --save-dev nib
```

update your gulpfile.js

```js
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var typographic = require('typographic');
var nib = require('nib');


gulp.task('styles', function() {
  gulp.src('style.styl')
      .pipe(stylus({
        use: [typographic(), nib()]
      }))
      // current path
      .pipe(gulp.dest('./'));
});

gulp.task('watch:styles', function(){
  gulp.watch('**/*.styl', ['styles']);
});

```
update your stylus

```stylus
@import 'typographic'
@import 'nib'

typographic()

body
  fixed bottom right
  background blue
```

and run your gulp watch command

`$  gulp watch:styles`

and now you can see your stylus typgraphy and nib libraries working

