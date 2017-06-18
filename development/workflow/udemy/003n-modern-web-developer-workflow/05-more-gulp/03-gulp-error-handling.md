# Gulp Error Handling
* Let's stop errors from interrupting our Gulp watch tasks
* By default Gulp will stop on error

`styles.js`

```
gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
      .on('error', function() {
        this.emit('end');
      })
      .pipe(gulp.dest('./app/temp/styles'));
});
```

* Now when there is an error, we will tell our styles to stop but not stop Gulp
* Test by adding a non-existant variable like:

`_global.css`

```
body {
  font-family: 'Roboto', sans-serif;
  color: #333;
  background-color: $doesnotexist;
}

// more code
```

* Stop and start `$ gulp watch`
* Gulp doesn't stop on that error but we need to know what the error is

### What error was it?
`styles.js`

```
// more code

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
      .on('error', function(error) {
        console.log(error.toString());
        this.emit('end');
      })
      .pipe(gulp.dest('./app/temp/styles'));
});
```

And now we get an error message

![error message from gulp](https://i.imgur.com/Btci5m4.png)

* Remove that fake variable to fix error


