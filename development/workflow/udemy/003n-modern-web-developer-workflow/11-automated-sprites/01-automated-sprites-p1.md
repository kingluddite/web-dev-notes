# Automated Sprites Part 1
* Configure Gulp to automatically create an icon sprite

## What is an icon sprite?
* We use icons in our features section
* And in the title of real testimonials
* Currently they are their own image file
    - The more files there are in our site
    - The longer it will take to download those images
    - The longer it will take our site to load
    - Instead of downloading 12 individual icon files
        + We'll download one icon file with all the images on it
        + That is what a sprite is

## This is a sprite
![sprite example](https://i.imgur.com/82yUex8.png)

* One single image file that contains all of our icons
* Gulp will take all of the image files in our icons folder and it will have them all automatically smushed into a sprite file

## Create a new branch
`$ git checkout -b gulp-sprite`

`/gulp/tasks/sprites.js`

```js
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite');

gulp.task('createSprite', function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(gulp.dest('./app/temp/sprite/'));
});
```

* Whenever we use `gulp.src()` we know it is asynchronous so we have to return it
## Import new file
`gulpfile.js`

```js
require('./gulp/tasks/styles');
require('./gulp/tasks/watch');
require('./gulp/tasks/sprites'); // add this line
```

## Install the package we need for sprites
`$ npm i gulp-svg-sprite@1.3.1 -D`

* Will take a couple minutes to download
* Run the new task

`$ gulp createSprite`

* That takes all our icons and places them inside the `temp/sprite` folder
* That was just a test so we can delete the `sprite` folder
* Our svg sprite package wants us to define the config inside an object literal

`sprites.js`

```js
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite');

var config = {
  mode: {
    css: {

    }
  }
}

gulp.task('createSprite', function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});
```

* Run `createSprite` again

`$ gulp createSprite`

* It created a `css` folder inside the `sprite` folder and inside it create an svg file with all of our sprites on it

![svg sprite file](https://i.imgur.com/QiEx3Ms.png)

## How do we use this single sprite file in the browser?
* We display the sprite image as a background on HTML elements
* This can be very a very tedious manual process
* The good news is Gulp **svg sprite package** can generate it for us

Create a new folder and file `/gulp/templates/sprite.css`

```
/* test comment */
```

`/gulp/tasks/sprites.js`

```js
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite');

var config = {
  mode: {
    css: {
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('createSprite', function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});
```

* Run it again

`$ gulp createSprite`

* Now look inside `temp/css/sprite.css` and you will see our test comment
* It is working!

`/gulp/templates/sprite.css`

* Replace the test comment with:

```
{{#shapes}}
{{/shapes}}
```

* The gulp svg sprite package makes use of `the Mustache template system`
* [read more about mustache](https://mustache.github.io/)
* Any code inside these two will be looped through for each icon

`gulp/tasks/templates/sprite.css`

```
{{#shapes}}
  /* Test Comment */
{{/shapes}}
```

Will output: (test and try it )

```
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
  /* Test Comment */
```

* It is repeated for every icon

```
{{#shapes}}
  .icon--{{base}} {
    width: ;
    height: ;
  }
{{/shapes}}
```

Outputs

```css
.icon--clear-view-escapes {
    width: ;
    height: ;
  }
  .icon--comment {
    width: ;
    height: ;
  }
  .icon--facebook {
    width: ;
    height: ;
  }
  .icon--fire {
    width: ;
    height: ;
  }
  .icon--globe {
    width: ;
    height: ;
  }
  .icon--instagram {
    width: ;
    height: ;
  }
  .icon--mail {
    width: ;
    height: ;
  }
  .icon--rain {
    width: ;
    height: ;
  }
  .icon--star {
    width: ;
    height: ;
  }
  .icon--twitter {
    width: ;
    height: ;
  }
  .icon--wifi {
    width: ;
    height: ;
  }
  .icon--youtube {
    width: ;
    height: ;
  }
```

* Generate each icon's height and width:

```
{{#shapes}}
  .icon--{{base}} {
    width: {{width.outer}}px;
    height: {{height.outer}}px;
  }
{{/shapes}}
```

* **note** Add mustache syntax to your text editor
* We point to the background

`background-image: url('/temp/sprite/css/{{{sprite}}}');`

* We need to make a variable because every time the sprite is created a random string (_cache-busting_) file name is created

![cache busting file name](https://i.imgur.com/Y6hYIEB.png)

* [Read More](https://css-tricks.com/strategies-for-cache-busting-css/) about **cache-busting**

### Why three curly braces `{{{sprite}}}`?
* Because the `sprite` variable will contain a forward slash telling it to go into the `svg` folder and we **do not** want that forward character to be **escaped**, we want it to come through just as it is
* [Read More](https://www.quackit.com/javascript/tutorial/javascript_escape_characters.cfm) about **escaping** characters with JavaScript

* `background-position: 15px 80px`
    - [Read More](https://www.w3schools.com/cssref/pr_background-position.asp)
* We don't want it hard coded but instead we need it to be filled in with unique data for each icon

`background-position: {{position.relative.xy}};`

* How are we supposed to know all of these variable names?
    - `shapes`
    - `outer`
    - `position.relative.xy`
* These names have nothing to do with `Node` or `Gulp` the names are entirely dependent on the package we are using
* You need to read the [documentation](https://github.com/jkphl/svg-sprite) for **svg-sprite**
    - [templating documentation](https://github.com/jkphl/svg-sprite/blob/master/docs/templating.md)

`sprite.css`

```
{{#shapes}}
  .icon--{{base}} {
    width: {{width.outer}}px;
    height: {{height.outer}}px;
    background-image: url('/temp/sprite/css/{{{sprite}}}');
    background-position: {{position.relative.xy}};
  }
{{/shapes}}
```

* Will output like this

```css
  .icon--clear-view-escapes {
    width: 142.4px;
    height: 59.53px;
    background-image: url('/temp/sprite/css/svg/sprite.css-69f19c2e.svg');
    background-position: 0 0;
  }
```

* It will spit out code like that for all 12 of our icons

## Next Up
We'll learn how to use this sprite
