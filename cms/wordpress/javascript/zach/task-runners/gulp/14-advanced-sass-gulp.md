# Advanced SASS Gulp

## Add require

`gulpfile.js`

```js
// MORE CODE
autoprefixer = require('gulp-autoprefixer'), // Autoprefixing magic
    cmq          = require('gulp-combine-media-queries'),
    filter       = require('gulp-filter'),
    notify       = require('gulp-notify'),
    minifycss    = require('gulp-uglifycss'),
// MORE CODE
```

# New and improved bundlesass task

`gulpfile.js`

```js
gulp.task('bundlesass', function () {
  return gulp.src(paths.sass.main)
     .pipe(plumber())
     .pipe(sourcemaps.init())
     .pipe(sass({
                errLogToConsole: true,
                //outputStyle: 'compressed',
                outputStyle: 'compact',
                // outputStyle: 'nested',
                // outputStyle: 'expanded',
                precision: 10
            }))
      .pipe(sourcemaps.write({includeContent: false}))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(sourcemaps.write('.'))
            .pipe(plumber.stop())
     .pipe(gulp.dest(paths.sass.dest))
    //  .pipe(filter('**/*.css')) // Filtering stream to only css files
            // .pipe(cmq()) // Combines Media Queries
            //.pipe(reload({stream:true})) // Inject Styles when style file is created
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifycss({
                maxLineLen: 80
            }))
     .pipe(gulp.dest(paths.sass.dest))
     .pipe(connect.reload())
     .pipe(notify({ message: 'Styles task complete', onLast: true }));
});
```

* Add notifications, nice pop up window giving you feedback of gulp tasks
* Add Min file for css
* Add possible output styles for development CSS
* Add prefix ability and sample file to see it in action

`_prefix-example.scss`

```scss
.example {
    display    : flex;
    transition : all 0.5s;
    user-select: none;
    background : linear-gradient(to bottom, white, black);
}
```

## Add to style.scss

```scss
@import 'color';
@import 'layout';
@import 'typography';
@import 'prefix-example';
```

