# Revision and Compression
## Install multiple packages
`$ npm i gulp-rev gulp-cssnano gulp-uglify -D`

* `gulp-rev`
    - Helps us revision our files
* `gulp-cssnano`
    - Helps us compress our CSS
* `gulp-uglify`
    - Helps ups compress our JS

`build.js`

```js
gulp.task('usemin', ['deleteDistFolder'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() { return rev()}, function() {
        return cssnano()
        }],
      js: [function() { return rev()}, function() { return uglify()}],
    }))
    .pipe(gulp.dest('./dist'));
});
```

* `css: [function() {}, function() {}],` - the first anonymous function is where we perform the revision on the file, the second anonymous function is where we will compress the css file
* We **return** `rev()` because we want Gulp to be aware when it completes
    - `rev()` will revision our CSS files and JS files
* We **return** `cssnano()` because we want Gulp to be aware when it completes
    - `cssnano()` will compress our CSS
* We **return** `uglify()` because we want Gulp to be aware when it completes
    - `uglify()` will compress our JS

## Let's see if our `usemin` task will minify our css and js production code
`$ gulp build`

* You will see our JS and CSS files are compressed (aka minified)

![minified](https://i.imgur.com/9jLettg.png)

* The JS and CSS files have been revisioned
    - Great for `cache-busting`
* Check out the file size difference in development `App.js` and production `App-randomstring.js` file

![file size diff](https://i.imgur.com/5yiWv27.png)

* And the production `index.html` includes the new revision names

![new revision names](https://i.imgur.com/yazwmqM.png)

## Usemin task is complete
###Our dist folder has:
* HTML
* Image files
* CSS
* JavaScript

## Let's make build task flexible so we can use it for other files and future products

### Create a make believe folder
* Put it inside your `/app` folder
* Name it `cats`
* Put an image of a cat inside it

`build.js`

```js
const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify');

gulp.task('deleteDistFolder', function() {
  return del('./dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp/*',
    '!./app/temp/**',
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('usemin', ['deleteDistFolder'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}],
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);

```

* Run the build task

`$ gulp build`

* You should see the `cats` folder inside `dist`
* Delete it as it was just a test to make our build task more flexible

## Make sure our `usemin` only runs after `scripts` and `styles` have run
* To ensure we have fresh CSS and JS files

`build.js`

```js
// more code
gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}],
    }))
    .pipe(gulp.dest('./dist'));
});
// more code
```

* Also our `optimizeImages` task should not run until we create a fresh rebuild of our icons sprite

`build.js`

```js
// more code
gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./dist/assets/images'));
});
// more code
```

## Run gulp build
* It will run a fresh rebuild of our
    - CSS
    - JS
    - regenerate our icon sprite
    - custom modernizr file
    - move everything perfectly into place in the `dist` folder

## Create a task that will let us preview our `dist` folders in the web browser
* We can use `browser-sync` to spin up a server

`build.js`

```js
const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });
});

// more code
```

`$ gulp previewDist`

![running preview dist](https://i.imgur.com/1BIXJ8L.png)

* And we are running two instances on two different ports
    - production on 3002 and development on 3000

![two servers](https://i.imgur.com/LK4nTxO.png)

## Finished build.js
```js
const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], function() {
  return del('./dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp/*',
    '!./app/temp/**'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}],
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
```
 
