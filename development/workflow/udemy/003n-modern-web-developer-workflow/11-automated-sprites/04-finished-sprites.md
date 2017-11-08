# Finished Sprites

`gulp/tasks/sprites.js`

```js
/* eslint-disable import/no-extraneous-dependencies, func-names */
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const del = require('del');
// const svg2png = require('gulp-svg2pngfix');

const config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng() {
          return function (sprite, render) {
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

gulp.task('beginClean', () => del(['./app/temp/sprite', './app/assets/images/sprites']));

gulp.task('createSprite', ['beginClean'], () => (gulp
  // grab all the svgs inside the icons folder
  .src('./app/assets/images/icons/**/*.svg')
  // use the template var
  .pipe(svgSprite(config))
  // output generated sprite to tmp file
  .pipe(gulp.dest('./app/temp/sprite/'))));

// gulp.task('createPngCopy', ['createSprite'], () => gulp
//   .src('./app/temp/sprite/css/*.svg')
//   .pipe(svg2png())
//   .pipe(gulp.dest('./app/temp/sprite/css')));

// gulp.task('copySpriteGraphic', ['createPngCopy'], () => gulp
gulp.task('copySpriteGraphic', () => gulp
  .src('./app/temp/sprite/css/**/*.{svg,png}')
  .pipe(gulp.dest('./app/assets/images/sprites')));

gulp.task('copySpriteCSS', ['createSprite'], () => (gulp
  // grab all the sprites generated
  .src('./app/temp/sprite/css/*.css')
  // rename to partial `_sprites`
  .pipe(rename('_sprite.css'))
  // copy file and move copy to modules directory
  .pipe(gulp.dest('./app/assets/styles/modules'))));

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], () => del('./app/temp/sprite'));

gulp.task('icons', [
  'beginClean',
  'createSprite',
  // 'createPngCopy',
  'copySpriteGraphic',
  'copySpriteCSS',
  'endClean'
]);
```

## Generate sprites
1. Grab all the icons inside the `icons` folder
2. Use the `svgSprite` function to take all those sprites and create one SVG of them using the config file that points to a handlebars template

`templates/templates/sprite.css`

```css
{{#shapes}}
  {{#first}}
  
    .icon {
      background-image: url('/temp/sprite/css/{{{sprite}}}');
    }

/*    
    .no-svg .icon {
      background-image: url('/assets/images/sprites/{{#replaceSvgWithPng}}{{{sprite}}}{{/replaceSvgWithPng}}');
    }
*/
  {{/first}}

  .icon--{{base}} {
    width: {{width.outer}}px;
    height: {{height.outer}}px;
    background-position: {{position.relative.xy}};
  }
{{/shapes}}
```

* We have some code that used to valuable but nowadays because svgs are so prevalent it is no longer need (convert svg to png)
* This is good because the gulp plugin that converts svg to png is no longer maintained and broke after the latest version of node (remember Gulp works with Node)
* That code used modernizr to generate a `.no-svg` class if the browser would not understand `svg` and the commented out code above would be used to point to the point to the `png` instead of the `svg`

### Now back to our steps
3. That handlebars template saved us time by auto-generating all the positions of the sprites [example of sprite css](http://www.spritecow.com/)
      - If you hover over the icons you will see the CSS necessary to generate sprite
      - **note** The purpose of sprites is to decrease HTTP requests to server
4. Once, the sprite image and css are created they will be located inside: `app/temp/sprite/`
5. Then, to keep images together and organized we move the sprite.svg from `app/temp/sprite/css/` to `app/assets/images/sprites`
6. And to keep the sprite css code in one place it is moved from `./app/temp/sprite/css/*.css` to `app/assets/styles/modules` and renamed to `_sprite.css`
7. In production (aka `the "build" gulp task`) the images and css are moved into the `dist` folder

