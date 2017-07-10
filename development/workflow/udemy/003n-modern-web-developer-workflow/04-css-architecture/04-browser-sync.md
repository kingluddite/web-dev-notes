# Browser-Sync
## Install browserSync
`$ npm i browser-sync -D`

### Adding browserSync to our CSS
* browser-sync will inject our latest CSS into the page without even forcing a refresh

`gulpfile.js`

```
// more code
cssImport = require('postcsss-import'), // don't forget the comma
browserSync = require('browser-sync').create(); // add this line
// more code
gulp.task('cssInject', function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
})

gulp.task('watch', function() {

    browserSync.init({
      server: {
        baseDir: 'src'
      }
    });
  // more code
}
```

* Because `gulp.src()` is an asynchronous function we need to return it
* We point to our temp CSS file
* And use browser-sync's `stream()` function to inject it into our `index.html`

### When do we want to run our cssInject task?
Whenever we save a change to any CSS file we trigger the `styles` task which runs all of our `postCSS` tasks

#### We'll make this change:
From this:

```js
watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });
```

To this:

```js
watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });
```

* Then we'll add a second argument inside our cssInject task
* This argument is called `dependencies`
* It will run and wait until they are complete before running the task

`gulpfile.js`

```
// more code
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
})

gulp.task('watch', function() {
// more code
```

* Stop and start `browserSync` again
* Test with some obvious code

`_global.js`

```
body {
  background-color: blue; /* add this line */
  font-family: 'Roboto', sans-serif;
  color: #333;
}
// more code
```

* You see how it instantaneously updates the code
* Remove the blue background as we just used it for an example

### That browerSync box is annoying so we can turn it off
```
gulp.task('watch', function() {

    browserSync.init({
      notify: false,
      server: {
        baseDir: 'src'
      }
    });
  // more code
}
```

### See how cool `browserSync` is!
* Select text, make CSS change, the text is still selected, `browserSync` didn't even need to refresh the page
  - When we start working with JavaScript this feature will come in very handy because, like opening and closing a menu, it is really nice to update the CSS without updating the state of the browser

### Cool feature - the sync in browserSync
* Copy URL and paste in Safari and Firefox
* Scroll and they all scroll
  - Any actions in one browser
    + filling out a form, opening menu,
    + They will be matched in all browsers open in your computer
* This makes `cross browser testing super easy`

### The External URL in terminal
* Type that URL into your mobile phone or tablet and you can preview our website on your devices
* So mobile testing becomes super simple too

