# Gulp and PostCSS
## What is a CSS workflow
* Autoprefixer

![autoprefixer](https://i.imgur.com/QD7ghLU.png)

### Other CSS features
* Stuff we want to do with CSS but can't do it because Web browsers don't support it
* Famous CSS Preprocessors
    - Sass
    - Less
    - Stylus
* CSS Variables

![css variables](https://i.imgur.com/44rBx5B.png)

* Nested CSS

![nested css](https://i.imgur.com/OKRoRxG.png)

* CSS Workflow

![css workflow](https://i.imgur.com/J6uhJYZ.png)

* Instead of Sass, Less or Stylus, we'll use PostCSS

## PostCSS
* Popular new post-processor
* Fastest to compile out of all pre/post-processors

## Vocab building: 3 important Gulp/Node terms
![pipe of water](https://i.imgur.com/7QzSXE7.png)

* `gulp.src()` - source files
    - `./main.css`
* `gulp.dest()` - destination files
* `pipe()`

We are not just moving water, we are manipulating the water

![water manipulation](https://i.imgur.com/bAtAbOj.png)

* water turned blue and scented blueberry

![code and PostCSS filters](https://i.imgur.com/xNV2xZ0.png)

## Setup CSS workflow
* We use the word `return` because `gulp.src()` is an **asynchronous** function
* We need to Gulp to be aware when this function completes so we include `return`

`gulpfile.js`

```
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('default', function() {
  console.log('You just ran a Gulp task');
});

gulp.task('html', function() {
  console.log("HTML stuff here");
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css').pipe(gulp.dest('./app/temp/styles'));
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

`$ gulp watch`

Change our `/app/styles/styles.css`

```
body {
  padding: 15px;
}
```

When you make changes to the `styles.css`

You will see

![new temp folder generated](https://i.imgur.com/Yz0Slo9.png)

### Run our code through PostCSS filters
#### Install gulp postcss
`$ npm i gulp-postcss -D`

#### Install autoprefixer

`$  npm i autoprefixer -D`

`gulpfile.js`

```
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
```
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

```
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

```
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

```
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

```
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
