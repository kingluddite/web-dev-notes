# Minification
* Make files as small as possible so they will load as fast as possible

## /dist
* Short for `distributable`
* Public copy - that we will push up to the web
* It will be streamlined, minimalist
* Only contains files essential for visitors visiting the site
* Compressed files
    - img
    - css
    - js

## /app is our source code `src`
* We don't need to upload the `app` folder because it contains lots of files that visitors to our website don't need
* Think of this as our Developer folder
* Our source code
* Multiple files
* Highly organized

### Developers Need:
* Individual CSS and JS modules

### Our Visitors Need:
* Only the bundled/compiled files

## Create `build` Gulp task
* After we create this task anytime we want to push new changes live
    - Then we run `$ gulp build` and then we'll get a fresh `dist` folder we can upload to our production server

## Git Stuff
`$ git status`

* Add all changes with:

`$ git all -A`

* Commit changes

`$ git commit -m 'Add browser support fallbacks`

* Merge branch into master

`$ git checkout master`

`$ git merge browser-support`

`$ git push origin master`

* Create new branch

`$ git checkout -b build-task`

## Create build file
`/app/gulp/tasks/build.js`

```js
const gulp = require('gulp');

gulp.task('optimizeImages', function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
  .pipe()
  .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('build', );
```

* The build task won't do anything
    - It will just be called to run other build tasks
* Create a task that will copy all of our images files over to the `dist` folder and also compress the image files before they reach their destination
* The `!` allows us to **exclude** certain files from the previous path
    - Why do we need to exclude certain files?
        + Our icons folder is used to generate a consolidated SVG or PNG file so we don't need to include the icons folder as it is not used in production
## Import build file
`gulpfile.js`

```js
// more code
require('./gulp/tasks/build'); // add this line
```

## Install gulp-imagemin
`$ npm i gulp-imagemin -D`

* May take 2 minutes to install

### Import it
`build.js`

```js
const gulp = require('gulp'),
imagemin = require('gulp-imagemin');

gulp.task('optimizeImages', function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('build', ['optimizeImages']);
```

* `progressive` - optimize our JPG images
* `interlaced` - optimize our GIF images
* `multipass` - optimize our SVG images

## Run our build task
`$ gulp build`

* Look inside your `dist/assets/images` and you should see all your images optimized

![saved 320kb](https://i.imgur.com/WjPppW8.png)

* Almost 8% reduction in file size
* Meaning the imagery will download that much quicker

## Delete our `dist` folder
* Let's begin the build task by **deleting the 'dist' folder** so we begin each build with a clean slate

`$ npm i del -D`

`build.js`

```js
const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del');

gulp.task('deleteDistFolder', function() {
  return del('./dist');
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

gulp.task('build', ['deleteDistFolder', 'optimizeImages']);
```

* We used the `del` package before and we're doing more of the same

## Optimize and move to `dist` folder our CSS files
### Which files will we need?
* Inside `index.html` you will see the 3 files we need

```html
// more code
<link rel="stylesheet" href="/temp/styles/styles.css"/>
<script src="/temp/scripts/Vendor.js"></script>
// more code
  <script src="/temp/scripts/App.js"></script>
</body>
</html>
```

* `/temp/styles/styles.css`
* `/temp/scripts/Vendor.js`
* `/temp/scripts/App.js`

## Compress and Revision files
* We not only want to copy these files but we all want to:
    - Compress
    - Revision

### What does revision mean?
* We just want to add a unique string of numbers and letters after the file name

![revision files](https://i.imgur.com/n5eNV0B.png)

* This is for cache-busting
    - Which means, we force the browsers to redownload the file if we made any changes
    - If we don't revision, browsers will cache the file and a visitor won't see any changes to our site if they visited our site and didn't clear their browser cache
* There is a great tool that will `copy to dist folder, compress files and revision them for us` and this tool is called `usemin`

## Install usemin tool
`$ npm i gulp-usemin -D`

### Import and build the task
`build.js`

```js
const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin');

gulp.task('deleteDistFolder', function() {
  return del('./dist');
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
    .pipe(usemin())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin']);
```

## Add the task to gulpfile
`gulpfile.js`

```js
// more code
require('./gulp/tasks/build'); // add this line
```

## Add HTML comment to tell usemin what we want
`index.html`

```html
// more code
<!-- build:css /assets/styles/styles.css -->
<link rel="stylesheet" href="temp/styles/styles.css"/>
<!-- endbuild -->

<!-- build:js /assets/scripts/Vendor.js -->
<script src="/temp/scripts/Vendor.js"></script>
<!-- endbuild -->
// more code
<!-- build:js /assets/scripts/App.js -->
<script src="/temp/scripts/App.js"></script>
<!-- endbuild -->
```

* We tell build that it is a css file `build:css`
    - Then we provide a path where we want this file copied to
        + Within `dist` folder we want it to live at `/assets/styles/styles.css`

## Run the build task
`$ gulp build`

* You will see the `index.html` was copied to the `dist` folder
* The new **paths** we instructed `usemin` to use in our HTML comments in our source `index.html` have been injected

`dist/index.html`

```html
// more code
<link rel="stylesheet" href="/assets/styles/styles.css"/>

<script src="/assets/scripts/Vendor.js"></script>
// more code
  <script src="/assets/scripts/App.js"></script>
</body>
</html>
```

* `usemin` stripped out the comments for our **production** `index.html`
* Our `styles` and `scripts` have been moved inside `dist`
