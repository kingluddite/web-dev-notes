# Webpack Automation
* Webpack does come with the ability to watch our files
* And it can spin up it's very own `Webpack` dev server
* But we are already extensively using `Gulp` and `Browsersync` so we won't use those
* We want to integrate `webpack` into **our existing Gulp automation**

## scripts.js
* New Gulp task

`/gulp/tasks/scripts.js`

```js
var gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts', function(callback) {
  // tell webpack where our config file is
  webpack(require('../../webpack.config.js'), function() {
    console.log('Webpack completed');
    callback();
  });
});
```

* Before, when we were just working with webpack, Webpack knew where our `webpack.config.js` file was
    - Inside Gulp we have to explicitly tell **Webpack** where that file is
    - `webpack(require('../../webpack.config.js'));`
* We provide a second argument that is just an anonymous function that will run when `webpack` completes (this is a **callback** function)
    - We will just use a simple log statement to test this **callback**
    - Normally we don't need to do anything else but we also want to make sure that Webpack is playing nicely with Gulp
        + We need Gulp to be aware when Webpack completes
        + We do this by passing `callback` into our main function signature
            * `gulp.task('scripts', function(callback) {`
            * Then within's Webpack's callback function we run that callback function with `callback()`
                - So Gulp can be certain that Webpack completed

### Import the new task
`gulpfile.js`

```js
// more code
require('./gulp/tasks/scripts');
```

* We installed **Webpack** globally but now we are going to use it locally so we need to install it into our project

## Uninstall Webpack globally
`$ npm uninstall webpack -g`

* [Read more](https://hashnode.com/post/install-all-npm-packages-globally-or-locally-cin0eje5f002ulk5354i1rh9r) about why `Webpack` global is not the best idea

## Install Webpack locally
`$ npm i webpack -D`

### Test our Gulp `scripts` task
`$ gulp scripts`

* You will see `Webpack completed` in our Terminal

![webpack completed](https://i.imgur.com/ymmHdGK.png)

* Update our js file

`App.js`


```
var $ = require('jquery');
var Person = require('./modules/Person');

console.log('Webpack Automation test#2');
```

* Refresh the browser and you will see `Webpack Automation test` console message showing

![webpack console message](https://i.imgur.com/56leA7p.png)

* This lets us know that Webpack successfully bundled our JavaScript

## Automate Webpack and Gulp
* Now we'll add a watch for any changes to our JavaScript files

`watch.js`

```
// more code
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

  // add this task
  watch('./app/assets/js/**/*.js', function() {
    gulp.start('scripts');
  });

});
```

* Run `$ gulp scripts`
* Restart `$ gulp watch`

`App.js`

```
var $ = require('jquery');
var Person = require('./modules/Person');

console.log('Webpack Automation test#2');
// more code
```

* Refresh browser
* Look how easy it is to import jQuery
* `Webpack Automation test#2` should now be in console
* Change some JavaScript code you will see webpack is watching as well as gulp and you do not have to restart them

## Have Browsersync refresh JavaScript
Any changes to JavaScript and browsersync refreshes our browser

`watch.js`

```js
// more code

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
});

// add this task
gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});

gulp.task('watch', function() {

  // more code

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

  // modify this task
  watch('./app/assets/js/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });

});
```

* We add a task that will just reload the browser when any changes to JavaScript files occur
* But we don't want that to happen until our `scripts` task is complete where `webpack` does all our bundling

## Restart gulp watch task
`$ gulp watch`

`App.js`

* Just update the log to #3

```
// more code
console.log('Webpack Automation test#3');
// more code
```

* You will see that once you press `cmd` + `s` to save the file, `Gulp` and `browsersync` refresh the browser and the log is automatically updated

## Making things `error-proof`

`scripts.js`

```js
var gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts', function(callback) {
  // tell webpack where our config file is
  webpack(require('../../webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});
```

* `Webpack` gives us access to the `err` and `stats` object in the **callback**
* Restart gulp `$ gulp watch`

## Create an error on purpose
`$ gulp watch`

`App.js`

```js
var $ = require('jquery');
var Person = require('./modules/Personnn'); // we misspell this on purpose
// more code
```

* Here are the stats

![stats](https://i.imgur.com/jt9Badr.png)

* Here is error message

![error msg](https://i.imgur.com/etnXSsh.png)

* Nice feature is even though there was an error, our gulp watch task is still alive so we can fix the error save and we're up an running

## Next - Babel
* Think of it like this
    - **Babel is to JavaScript** what **PostCSS is to CSS**
* Babel lets us use modern JavaScript even if that code won't run in older browsers
* Babel will convert our modern JavaScript into JavaScript that will work on every web browser
