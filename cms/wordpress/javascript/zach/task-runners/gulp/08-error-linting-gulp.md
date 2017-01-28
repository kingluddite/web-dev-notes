# Error Linting with Gulp

## [eslint](https://www.npmjs.com/package/gulp-eslint)
Different linting library than we used for grunt (jshint)

### Needed to work with eslint
`$ npm i -D eslint gulp-eslint babel-eslint`

## Add require
```js
// MORE CODE
eslint = require('gulp-eslint'),
// MORE CODE
```

### Where do we use eslint in our current bundle process?
At the beginning of `bundlejs` because we want to make sure our code is correct before we do anything with it

## Update bundlejs task

`gulpfile.js`

```js
gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        // ADD THESE 2 lines
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});
```

We need both lines. The first line is eslint but we won't get the errors spelled out in our terminal console unless we use `eslint.format()`

## Test

## Run gulp
`$ npm start`

`app.js`

Change this:

`var vanillaPress = {`

to this (remove `=`):

`var vanillaPress {`

Error: `Error: No ESLint configuration found.`

Put `=` back in and save and the code does not rerun.

## Configure ESLint in `package.json`

```json
"scripts": {
    "start": "gulp"
  },
   "eslintConfig": {
       "eslintConfig": {
         "env": {
           "no-unused-vars": [
             "error",
             {
               "vars": "all"
             }
           ]
         }
       }
     },
```

The above rule lets us use unused variables.

Now if you run `$ npm start` and remove `=` from `app.js` (like before)
You will get an error.

## Eslint inside Atom
You can install. Errors inside atom are just for you the developer. But you also have gulp that will lint. It is important to have both.

## Problem
Errors stops the stream and the server. Gulp Plummer will help prevent this

