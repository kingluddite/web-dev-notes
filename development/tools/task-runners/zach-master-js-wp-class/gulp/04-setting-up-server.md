# Setting up a Server with Gulp

## [gulp-connect](https://www.npmjs.com/package/gulp-connect)
Gulp plugin to run a webserver (with LiveReload)

## Install gulp-connect as dev dependency

`$ npm i -D gulp-connect`

## Update config file
`gulpfile.js`

```js
var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('demo', function() {
  console.log('Demo working');
});

gulp.task('connect', function() {
  connect.server();
});

gulp.task('default', ['connect', 'demo']);
```

## Run gulp

`$ gulp`

Connect task runs and starts a sever and path is `http://localhost:8080`

## View in browser
Site runs through server



