# Automated Sprites Part 3
* When we add a new icon or remove an icon we'll need Gulp to generate a new sprite
* Let's show a problem with our current system
* Open the icons folder

`/app/assets/images/icons`

* Temporarily move `fire.svg` to the desktop
* Run our icon task because we need to regenerate our icons to update them with the most recent change (_fire.svg was removed_)

`$ gulp icons`

* Open `/app/assets/images/sprites`
* The problem is we now have two sprite files

![two sprite files](https://i.imgur.com/VXCF9QC.png)

* Currently, our setup isn't intelligent enough to delete the old outdated `sprite.svg`
* It will only be a matter of time before this file is filled with old `sprite.svg` files
* We will fix this by only having the latest `sprite.svg` and all the others will be deleted
* We will delete the `app/temp/sprite` folder
* We create this folder through Gulp in the `createSprite` task
* If we delete that folder before we create it we can avoid filling it with old svg files

## Install `del` npm package
`$ npm i del -D`

## Import `del` package
`sprites.js`

```js
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'), // don't forget the comma
del = require('del'); // add this line

// more code
```

## Add the new `beginClean` task
`sprites.js`

```js
// more code

// add this task
gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite'));
});
// more code
```

* We want the `beginClean` task to be the first task that runs in our `icons` task sequence

`sprites.js`

```js
// more code

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS']);
```

* And it is **important** to point out that we don't want the `createSprite` task to begin until the `beginClean` task is completed

`sprites.js`

```js
gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite'));
});
```

`$ gulp icons`

![beginClean working](https://i.imgur.com/Fry2eUF.png)

* Now we will only have one `sprite.svg` inside `images/sprites`

![one sprite only](https://i.imgur.com/LWYAYZL.png)

* Move `fire.svg` back

`$ gulp icons`

* Our fire icon returns

![fire icon is back](https://i.imgur.com/SdFTDQC.png)

## We don't need the temp sprite folder anymore
* When this task sequence is completed, we no longer need the temp `sprites` folder
* So delete it

`gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS']);`

### endClean task

* We don't want `endClean` to run until both of these tasks `'createSprite', 'copySpriteGraphic'` have completed

`sprites.js`

```js
gulp.task('endClean', ['createSprite', 'copySpriteGraphic'], function() {
  return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
```

* Temporarily move `globe.svg` to Desktop

`$ gulp icons`

* Move it back

`$ gulp icons`

![new task running](https://i.imgur.com/dGR7iF2.png)

* You will see there is no longer a `app/temp/sprite` folder
* Our `endClean` task is working

## Mobile icons look good?
* Yep
* Same look as before we were using sprites

### Git work
`$ git status`

* Add everything to the Staging area

`$ git add -A`

* Commit the Staging area

`$ git commit -m 'Complete automatic sprite generation'`

* Switch to master branch

`$ git checkout master`

* Merge feature branch into master

`$ git merge gulp-sprites`

* Push to Github

`$ git push origin master`

### Next
Style our footer
