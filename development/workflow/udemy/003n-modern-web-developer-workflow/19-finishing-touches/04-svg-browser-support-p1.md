# SVG Browser support - Part 1
* We will create a PNG fallback for outdated browsers

## What is a PNG fallback?
* All of our icons are stored as `.svg`
    - There are also
        + `.jpg`
        + `.gif`
        + `.png`

* SVG support in webbrowsers is great
    - SVG files: 97% support
    - PNG files: 100% support

## Strategy
* Send the `.svg` icons by default
* Send the `.png` icons for those without svg support

### Plan
1. Use `Gulp` to automatically create a **PNG** copy of our **SVG** icon sprite
2. Figure out how to only send the **PNG** version to browsers that don't support **SVG**

#### How can we know if a browser supports SVG?
Modernizr

##### What is Modernizr?
A tool that tests web browser support for SVG and a everything else

## Install gulp package `gulp-svg2png`
`$ npm i gulp-svg2png@2.0.2 -D`

### What will this package do?
* We have a SVG file here `/app/assets/images/sprites/sprite-RANDOMNUM.svg`
* This package will generate a PNG file with the same icon graphics

## Import and and create task
`sprites.js`

```js
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'), // don't forget comma
svg2png = require('gulp-svg2png'); // add this line
// more code

gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite'));
});

// add the below task
gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
  return del('./app/temp/sprite');
});

// more code
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
```

* We want to make sure the `createPngCopy` task doesn't begin until the task that creates the sprite `createSprite` ends
* The copySpriteGraphic task is responsible from moving the temp folder to our real images folder and it should have as it's dependency our new `createPngCopy` instead of the original `createSprite` task
    - We also have to change the `gulp.src()` from just pointing to `svg` to pointing to `svg` and `.png`
        + So this: `return gulp.src('./app/temp/sprite/css/**/*.svg')`
        + Becomes this: `return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')`
* We also add the `createPngCopy` to our `icons` task

## Run our new task
`$ gulp icons`

* `$ open .` - open current directory in finder
* Browse to `/app/assets/images/sprites` and you will see a PNG and SVG file

![svg and png](https://i.imgur.com/1F0xhc9.png)

## Install Modernizr
`$ npm i gulp-modernizr -D`

### What does Modernizr do?
* Once we add it to our page it will test a user's browsers for different features on the fly
* Example
    - If a user's browser supports SVG files, modernizr will add a class named `svg` to the root `<html>` element
    - If a user's browser doesn't support SVG files, it will add a class of `no-svg` to the `<html>` element of the page
    - We then customize our CSS to send different icons depending on the CSS class

### Use JavaScript to generate a modernizr file to use in the browser
`/gulp/tasks/moderizr.js`

```js
const gulp = require('gulp'),
modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src('')
    .pipe(modernizr())
    .pipe(gulp.dest(''));
});
```

* This is the **basic gulp task skeleton**

1. We require what we need in this file
2. We give our task a name
3. We point to the `src` file
4. We run our code through `modernizr`
5. We point to the `dest` folder

### Import modernizr
`gulpfile.js`

```js
// more code
require('./gulp/tasks/modernizr'); // add this line
```

## What does the gulp modernizr package do for us?
* `Modernizr` has the ability to test browsers for hundreds of different features
    - Examples
        + Flexbox
        + Opacity
        + CSS animations
* But the more features we test for, the larger the `modernizr` file becomes and the more it will slow down load speed for our visitors
* This `gulp-modernizr` will enable us to build our own custom copy of `modernizr` to **only include the code we need** to test for certain features we are using in our site
    - This will keep our `modernizr` file small and efficient
    - Our web site will load faster

## How does modernizr know which features we need to test for?
* We point to our CSS and JS files in the `src`
* We pipe that group of files through the `modernizr` package
* It will look at our code and automatically determine which features we need to test for
* It will generate a lightweight customized `modernizr` file
* And we use `Gulp` to **pipe** that file to our destination folder `dest`

`modernizr.js`

```js
const gulp = require('gulp'),
  modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp
    .src(['./app/assets/styles/**/*.css', './app/assets/js/**/*.js'])
    .pipe(
      modernizr({
        options: ['setClasses']
      })
    )
    .pipe(gulp.dest('./app/temp/js/'));
});
```

## Run the modernizr task
`$ gulp modernizr`

![output terminal for modernizr task](https://i.imgur.com/bQT4wbh.png)

* Open `/app/temp/js/modernizr.js`
* You will see it has been created for us

![file created](https://i.imgur.com/r2F5Ld7.png)

* Now we need to include this file into our web site

## Add to our Vendor files
`Vendor.js`

```js
import 'lazysizes';
import 'picturefill';
import '../../temp/js/modernizr'; // add this line
```

`$ gulp watch`

## Trigger Rebundling
* You would think that you just have to run `$ gulp watch` and all would automatically update but currently, this is not the case
* You need to jump start gulp to get Webpack to update our JavaScript bundle regenerated (maybe we'll automate this too!)
* Save `Vendor.js`
    - Just saving won't work
    - You need to make a slight change for the change to jumpstart the re-bundling
    - That should trigger a rebundling from Gulp of our JavaScript files

![rebundling worked](https://i.imgur.com/vmeILSD.png)

* View site in browser
* Inspect element

![svg support](https://i.imgur.com/3qTPLdq.png)

* Modernizr is working and generated a `svg` class in the `<html>` element
* This is because it ran its checks and determined my browser understands svg

## Update our Gulp
* Anytime we update our JavaScript files our modernizr task gets automatically run and we regenerate our `modernizr.js` file

`scripts.js`

```js
const gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts', ['modernizr'], function(callback) {
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

* We just add our `modernizr` task as a dependency of our `scripts` task

`$ gulp watch`

* Re-save a JavaScript file in your `modules` folder and you will see that a new `modernizr.js` file was regenerated

### Troubleshoot! - Let's get this working
* Maybe your code works great
    - If not, here are some troubleshooting steps to get your svg image generated and copied the temp folder
* I had many issue getting the svg to work
* I was missing the `del` npm package so I installed that

`$ yarn add del -D`

* There was a broken package because it did not get updated since node 7 and this was that package

` svg2png = require('gulp-svg2png-node7fix');`

* The svg2png package broke
* I found `gulp-svg2png-node7fix` and this was installed with:

`$ yarn add gulp-svg2png-node7fix -D`

* I then updated the config part of my gulp `sprites` task and here is my `sprites` task in totality

`sprites.js`

```js
var gulp = require('gulp'),
  svgSprite = require('gulp-svg-sprite'),
  rename = require('gulp-rename'),
  del = require('del'),
  svg2png = require('gulp-svg2png-node7fix');

var config = {
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            return render(sprite)
              .split('.svg')
              .join('.png');
          };
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
};

gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function() {
  return (gulp
      // grab all the svgs inside the icons folder
      .src('./app/assets/images/icons/**/*.svg')
      // use the template var
      .pipe(svgSprite(config))
      // output generated sprite to time file
      .pipe(gulp.dest('./app/temp/sprite/')) );
});

gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp
    .src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return gulp
    .src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
  return (gulp
      // grab all the sprites generated
      .src('./app/temp/sprite/css/*.css')
      // rename to partial `_sprites`
      .pipe(rename('_sprite.css'))
      // copy file and move copy to modules directory
      .pipe(gulp.dest('./app/assets/styles/modules')) );
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
  return del('./app/temp/sprite');
});

gulp.task('icons', [
  'beginClean',
  'createSprite',
  'createPngCopy',
  'copySpriteGraphic',
  'copySpriteCSS',
  'endClean'
]);
```

* I then rand `$ gulp icons`
* I stopped gulp watch and ran it again `$ gulp watch`
* I resaved `Vendor.js` to regerate my custom JavaScripts and the modernizr.js file
* And then finally I saw this (I had to also update my NerdTree with `R`)

![sprite in temp](https://i.imgur.com/Ntrlima.png)

* And you'll see the `svg` file inside `temp/sprite/css`
* I had issues getting this to work and it took a few hours
* Hope this saves you the time I lost :)

## What if we add a new element that needs flexbox
* Flexbox is something you should be using in all your sites
* It is modern, accepted in a lot of browser but not all
* It is very power
* Now that we have modernizr in our script, we can check to see if the browser understands flexbox and if so, we'll use flexbox code, if not, we won't use it

`_btn.css`

* Let's just show you how smart our modernizr code is
* Add this test code:

```
.flexbox .example-element {
  padding: 1rem;
}

.cssanimations .some-other-element {
  margin: 1rem;
}

.btn {...}
```

* We just add test code for flexbox and cssanimations
* Save this
* Open `Vendor.js` and resave
* That will regenerate our JavaScript bundles
* Look in Chrome inspector
* Modernizr has updated and added the classes to our `<html>` element

![modernizr adds new classes](https://i.imgur.com/T9rGkdS.png)

* Remove that test code as we are not using it in our project

### Tell browser which file to serve PNG or SVG?
`sprite.css`

```
/* Do not edit modules/_sprite.css directly as it is generated automatically by Gulp
Instead edit gulp/templates/sprite.css */

{{#shapes}}
  {{#first}}
    .icon {
      background-image: url("/assets/images/sprites/{{{sprite}}}");
    }

    .no-svg .icon {
      background-image: url("/assets/images/sprites/{{{sprite}}}");
    }
  {{/first}}

  .icon--{{base}} {
    width: {{width.outer}}px;
    height: {{height.outer}}px;
    background-position: {{position.relative.xy}};
  }
{{/shapes}}
```

## Next - We'll finish up with this file
