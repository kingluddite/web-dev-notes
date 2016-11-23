# Susy, Breakpoint and Typi
You use Susy for easy grids.
You use Breakpoint for easy media queries.
You use Typi for easy responsive Typography

## Install

```js
{
  "name": "domsters",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "normalize.css": "^5.0.0"
  },
  "devDependencies": {
    "breakpoint-sass": "^2.7.0",
    "browser-sync": "^2.18.1",
    "del": "^2.2.2",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.1",
    "gulp-cache": "^0.4.5",
    "gulp-imagemin": "^3.1.1",
    "gulp-sass": "^2.3.2",
    "gulp-sourcemaps": "^2.2.0",
    "run-sequence": "^1.2.2",
    "susy": "^2.2.12",
    "typi": "^2.3.0"
  }
}
```

`gulpfile.js`

```js
gulp.task('sass', function(){
  // **/*.scss - matches any file ending with .scss in the root folder and any child directories
  return gulp.src('scss/**/*.scss')
    // Converts Sass to CSS with gulp-sass using gulp-sass
    .pipe( sourcemaps.init() )
    .pipe(sass({
          // outputStyle: 'compressed',
          includePaths: ['node_modules/susy/sass', 'node_modules/breakpoint-sass/stylesheets', 'node_modules/typi/scss']
      }).on('error', sass.logError))
    .pipe( autoprefixer( {
      browsers: [ 'last 4 version' ]
    }))
    .pipe(sourcemaps.write() )
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
```

### imports

`scss/style.scss`

```css
@import 'susy';
@import 'typi';
@import 'breakpoint';
@import 'variables';
```

`scss/_variables.scss`

## Susy

```css
// Susy
$susy            : ( columns: 12, gutters: 1/4, math: fluid, output: float, gutter-position: split );
```

## Breakpoints
```
// breakpoints
$xsmall          : 400px;
$small           : 550px;
$medium          : 769px;
$large           : 960px;
$desktop         : 1200px;
```

## Typi

```
$breakpoints     : ( small: 600px, large: 1200px );
$typi            : ( null:(16px, 1.4), small: 18px, large: 20px);

$h1-font-map     : ( null: (2em, 1.2), small: (2em, 1.1) );
$h2-font-map     : ( null: (1.5em, 1), small: (2em, 1.1) );
$h3-font-map     : ( null: (1em, 0.8), small: (1.5em, 1.0) );
$table-font-map  : ( null: (.6em, 1.4), small: (.8em, 1.0) );
```

### Usage of Susy, Breakpoint and Typi

```
.main {
    padding: vr(1);
    @include span(12);
    @include breakpoint($large) {
         @include span(8);
    }
    @include susy-breakpoint($desktop, 24) {
         @include span(16);
        .col1,
        .col2,
        .col3 {
            @include span(1 of 3);
        }
    }
    &.full-page {
        @include span(12);
    }
    &.two-column {
        @include span(8 of 12);
    }
}
```

### More examples

```css
*,
*:after,
*:before {
    -moz-box-sizing   : border-box;
    -webkit-box-sizing: border-box;
    box-sizing        : border-box;
}

html {
    @include typi-base();
}

body {
    // susy
    @include container(80%);
}

/* headings */
h1 {
    @include typi($h1-font-map);
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

h2 {
    @include typi($h2-font-map);
}

h3 {
    @include typi($h3-font-map);
}

table {
    @include typi($table-font-map);
}
```
