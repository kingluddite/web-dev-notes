# SASS with Gulp
Similar to how we worked with SASS and grunt. But there are small nuances that differ based on how Gulp is configured.

## [gulp-sass plugin](https://www.npmjs.com/package/gulp-sass)

## Install gulp-sass plugin as dependency
`$ npm i -D gulp-sass`

## Require gulp-sass

`gulpfile.js`

```js
// MORE CODE
sass = require('gulp-sass'),
// MORE CODE
```

## Add `return`
Forgot to add this when first created this task

```js
gulp.task('bundlejs', function() {
    // MODIFY THIS LINE TO INCLUDE `return`
    return gulp.src(paths.js.all)
        // ADD THIS LINE
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        // ADD THESE 2 lines
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});
```

## Update `paths` object to include all SASS and html

`gulpfile.js`

```js
// MORE CODE
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
// MORE CODE
```

* We will break up watching HTML, JavaScript and SASS in a moment

## Add SASS task

`gruntfile.js`

```js
gulp.task('bundlesass', function() {
  return gulp.src(paths.sass.main)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({ouputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.sass.dest))
            .pipe(connect.reload());
});
```

* Point to `style.scss` because it imports all other files
* We use plumber() so we don't have to manually restart server if we can an error
* We need sourcemaps to point to the exact spot of the error in our source code and we log that error to the console
    - We also minify our SASS
        + We don't need to call `uglify` on SASS as it is built into `gulp-sass`
        + We could just call `pipe(sass()` but we use some configurations to expand on what `sass()` can do for us
* Write our our sourcemaps first `.pipe(sourcemaps.init())`
* Create file named `style.css` and place it into `./dist/css`
* Any changes to SASS, reload our browser with `.pipe(connect.reload());`

## Break up HTML, SASS and JavaScript in `watch` task

`gulpfile.js`

```js
// MORE CODE
gulp.task('watch', function() {
  gulp.watch([paths.html.all], ['bundlehtml']);
  gulp.watch([paths.js.all], ['bundlejs']);
  gulp.watch([paths.sass.all], ['bundlesass']);
});
// MORE CODE
```

## Add `bundlehtml` task

`gruntfile.js`

```js
// MORE CODE
gulp.task('bundlehtml', function () {
  return gulp.src(paths.html.all)
            .pipe(connect.reload());
});
// MORE CODE
```

Just reloading HTML on any changes. Could compress but just reloading.

### Run gulp
`$ gulp`

Make change to `$view-background-color` in `_variables.scss` and the background should instantaneously update

## Update html
Change the main title to `Vanilla Press 3` and it updates instantaneously
