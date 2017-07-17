# Gulp Intro
## What is Gulp?
* A build system
* A build tool
* A task runner
* **Translation:** Gulp makes it easy to automate development tasks
* Gulp is at heart of all automation for many projects
* Gulp doesn't do anything by itself
    - Lightweight
    - Efficient
    - Runs Quickly

## Think of Gulp like a record player
![record player](https://i.imgur.com/eXX2iSm.png)

* It does nothing by itself
* Gulp plugins `===` records
* Thousands of Gulp plugins to automate thousands of tasks
* Gulp is simple

`$ gulp`

* If you get **"Command not found"** - you need to install it

## Install Gulp globally on your computer

`$ sudo npm install gulp-cli --global`

### Version of Gulp running
* `$ gulp -v` - version of Gulp you are currently running

## Install Gulp in your project
* `$ npm i gulp --save-dev`

## Run gulp 
`$ gulp`

* Error message: `No gulpfile found`
* We are good. Time to create the **Gulp config file**

## Install gulp-watch

`$ npm install gulp-watch --save-dev`

## `/gulpfile.js`

`$ touch gulpfile.js`

`gulpfile.js`

```js
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});

gulp.task('styles', function() {
  console.log("CSS stuff here");
});

gulp.task('watch', function() {

  watch('./app/index.html', function() {
    gulp.start('html');
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });

});
```

## Run gulp-watch
`$ gulp watch`

## How to stop gulp from watching
`ctrl` + `c` in command line

* **Globbing** - way to watch all css files inside a folder or even nested CSS files
* Changes to anything inside the `css` folder or `index.html` are being watched
* You can individually call `$ gulp styles` just to run that task

### Update HTML

`index.html`

```html
// more code
<link rel="stylesheet" href="temp/styles/styles.css" />
// more code
```

## postcss and autoprefixr
`$ npm i gulp-postcss autoprefixer -D`

`gulpfile.js`

```js
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([autoprefixer]))
      .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {

  watch('./app/index.html', function() {
    gulp.start('html');
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });

});
```

* If you **watch** with gulp and make a normal CSS change, no difference than before
* But if you use a css property that needs prefixes like

```css
body {
    padding: 25px;
    margin: 10px;
    columns: 300px 2;
}
```

You will see this output

```css
body {
    padding: 25px;
    margin: 10px;
    -webkit-columns: 300px 2;
            columns: 300px 2;
}
```

### Adding Variables
```css
$mainBlue: #2f5572;

body {
    color: $mainBlue;
    padding: 25px;
    margin: 10px;
    columns: 300px 2;
}
```

If you **watch** that, it won't work

### Install postcss-simple-vars
You need this package to have variables work

`$ npm i postcss-simple-vars -D`

`gulpfile.js`

```js
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssvars, autoprefixer]))
      .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {

  watch('./app/index.html', function() {
    gulp.start('html');
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });

});
```

* `$ gulp watch`
* Now you get the variables transformation

```css
body {
    color: #2f5572;
    padding: 25px;
    margin: 10px;
    -webkit-columns: 300px 2;
            columns: 300px 2;
}
```

### Add ability for nested CSS
`$ npm i postcss-nested -D`

`gulpfile.js`

```js
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssvars, nested, autoprefixer]))
      .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {

  watch('./app/index.html', function() {
    gulp.start('html');
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });

});
```

* `$ gulp watch`
* Make this change

```css
$mainBlue: #2f5572;

body {
    color: $mainBlue;
    padding: 25px;
    margin: 10px;
    columns: 300px 2;
}

.box {
  a {
    display: block;
    padding: 10px;
  }
}
```

And you will see this output

```css
body {
    color: #2f5572;
    padding: 25px;
    margin: 10px;
    -webkit-columns: 300px 2;
            columns: 300px 2;
}

.box a {
    display: block;
    padding: 10px;
  }
```
