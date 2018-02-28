# Sourcemaps with Gulp
What are sourcemaps?

Check Chrome console and it says console.log() is from line 980 (your line number may be different) and inside `bundle.js`. This is not helpful because we want to know which line number that code is inside of `app.js`. If we know that we can easily edit it. That is what sorcemaps do for us. They give us the ability to find the line of our code from the `source` code rather than the `dist` or distribution code.

## [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* Adds sourcemaps for js and css

## Install sourcmaps as a dev dependency
`$ npm i -D gulp-sourcemaps`

### require gulp-sourcemaps
`gulpfile.js`

```json
// MORE CODE
sourcemaps = require('gulp-sourcemaps'),
// MORE CODE
```

### Two parts

1. Initiate itself
    * Enables it to track all the changes

`gulpfile.js`

```json
gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        // ADD THIS LINE
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});
```

* We sourcemap before the `concat()` so that we know where files were before and after they were concatenated

## Write sourcemap
`gulpfile.js`

```json
gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        // ADD THIS LINE
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});
```

* Before we create the concatenated file, we write a souremap that will be written to same location as `./dist/js/bundle.js`

## `EADDINUSE :::8080` Server errors
When working with node servers you may run into this error many times. Somehow, someway the server did not properly shut down and you need to manually shut it down.

Two servers can not run on same port

## Show a list of 8080 ports open
`$ lsof -i :8080`

Find the PID and stop it with
`$ kill -9 55111` (replace with your PID)

Run `$ lsof -i :8080` and it should return nothing

Run `$ npm start` or `$ gulp` and it should work.

View Chrome inspector, after updating `app.js` console.log() message and it will show you exact line of `app.js`. This means sourcemaps are working
