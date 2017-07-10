## Git Stuff
`$ git status`

* Add all changes with:

`$ git add -A`

* Commit changes

`$ git commit -m 'Add build task`

* Merge branch into master

`$ git checkout master`

`$ git merge build-task`

`$ git push origin master`

* Remove old branch

`$ git branch -d build-task`

* Create new branch

`$ git checkout -b github-build-task`

# Deploy To Github Pages
* 100% free service
* URL will look like `username.github.io/repo-name`

## Public folder
* lots of people name it `dist`
* Github wants us to name it `docs`

## Rename all `./dist` to `./docs`
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
      baseDir: './docs'
    }
  });
});

gulp.task('deleteDistFolder', function() {
  return del('./docs');
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
    .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}],
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);
```

## Quick fix
* We want to make sure our fresh rebuild of our styles doesn't begin until our fresh build `icons` sprite has completed

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
      baseDir: './docs'
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], function() {
  return del('./docs');
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
    .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
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
    .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
```

### URLs and file path issues...
* Because our site will live at a URL that isn't **the base of its domain**
* Our URL will look like this:
    - http://username.github.io/travel-site
* Instead of this:
    - http://username.github.io/

Because of the above we need to update the way our `index.html` references our CSS and JavaScript files

`index.html`

* Simple change from this:

```
 <!-- build:css /assets/styles/styles.css -->
 <!-- build:js /assets/scripts/Vendor.js -->
 <!-- build:js /assets/scripts/App.js -->
```

* To this:

```
 <!-- build:css assets/styles/styles.css -->
 <!-- build:js assets/scripts/Vendor.js -->
 <!-- build:js assets/scripts/App.js -->
```

* When we use the forward slash, the browser will look to the root of the **current domain** to find this path and file
* But because our Github pages site won't live at the root domain we just want our paths to be relative to the `index.html`

* Note - you may have to add comments we forgot to add earlier:

```html
  <!-- build:js assets/scripts/App.js -->
  <script src="/temp/scripts/App.js"></script>
  <!-- endbuild -->
</body>
</html>
```

## Update our CSS background images paths
`sprite.css`

* Change this from:

```
{{#first}}
  .icon {
    background-image: url("/assets/images/sprites/{{{sprite}}}");
  }

  .no-svg .icon {
    background-image: url("/assets/images/sprites/{{#replaceSvgWithPng}}{{{sprite}}}{{/replaceSvgWithPng}}");
  }
{{/first}}
```

* To this:

```
{{#first}}
  .icon {
    background-image: url("../../assets/images/sprites/{{{sprite}}}");
  }

  .no-svg .icon {
    background-image: url("../../assets/images/sprites/{{#replaceSvgWithPng}}{{{sprite}}}{{/replaceSvgWithPng}}");
  }
{{/first}}
```

`_page-section.css`

* Update our background image path to this:

```css
&--testimonials {
  background-color: #e0e6ef;

  @mixin atLarge {
    &.lazyloaded {
      background: url("../../assets/images/testimonials-bg.jpg") top center no-repeat;
      background-size: cover;
    }
  }
}
```

* Delete the old dist folder
* Run a fresh rebuild

`$ gulp build`

* Now we have a `docs` folder that we can use for github pages

![docs folder](https://i.imgur.com/C4ekbsd.png)

## Git Stuff
`$ git status`

* Add all changes with:

`$ git add -A`

* Commit changes

`$ git commit -m 'Complete gulp build task`

* Merge branch into master

`$ git checkout master`

`$ git merge build-task`

`$ git push origin master`

* Delete that last branch

`$ git branch -d build-task`

## Log into your Github Account and browse to your travel-site repo
* Click Settings
* Scroll down and click master branch / docs folder and then click save

![docs folder](https://i.imgur.com/i8CNLqY.png)

* Open new browser tab
* Type `https://username.github.io/travel-site`

## Next - Merge Conflict
