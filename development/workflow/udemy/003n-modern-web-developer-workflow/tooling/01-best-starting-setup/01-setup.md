# Setup For a project
## Yarn vs npm
* You can use either to install npm modules
* Yarn is growing in popularity, it is faster, it uses caching and that's why it is faster

### Install modules with npm
`$ npm install` (install all modules inside package.json)
`$ npm install jquery --save`
`$ npm i jquery -S`
`$ npm install gulp --save-dev`
`$ npm i gulp -D`

### Install modules with yarn
`$ yarn install`  (install all modules inside package.json)
`$ yarn add jquery`
`$ yarn add jquery`
`$ yarn add gulp --dev`
`$ yarn add gulp -D`

**note** You can install both with Homebrew

`$ brew install node` (comes with npm built in)

`$ brew install yarn`

## Gulp vs Webpack
Webpack is currently the leader in this field but many teams and companies are still using Gulp or a hybrid of the two

## Gulp/Webpack Hybrid
* Gulp uses Node.js so we can create files and folders, move files and folders and we have a ton of power at our fingertips

### CSS Pre/PostProcessor
* PostCSS

#### PostCSS packages
* `gulp`
* `gulp-postcss`
* `autoprefixer`
    - Add all browser prefixes
* `postcss-simple-vars`
    - Use variables
* `postcss-nest`
    - Nest your css
    - BEM methodology recommended don't nest deeper than 1
* `postcss-import`
    - Import all your partials
    - Helps break up your css into modules
    - Makes it more manageble
    - Makes working in BEM easy
* `postcss-hexrgba`
    - You supply a hex value and it converts it to rgba
* `postcss-mixins`
    - Enables you to use mixins
    - Code faster
    - Reuse chunks of code
* `gulp-sourcemaps`
    - Instead of seeing one bundled CSS file, you can see the partial file for easier trouble shooting

## Stylelint
* When developing you can use Stylelint to make sure you (and your team) are writing consistent code as well as generate errors when you type bad CSS
* Here is a sample gulp task to do this:

`stylelint.js`

```js
/* eslint-disable import/no-extraneous-dependencies, func-names, function-paren-newline */

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const reporter = require('postcss-reporter');
const stylelint = require('stylelint');

gulp.task('css-lint', () => {
  // Stylelint config rules
  const stylelintConfig = {
    ignoreFiles: [
      'app/assets/styles/modules/_sprite.css'
    ],
    rules: {
      'block-no-empty': true,
      'color-no-invalid-hex': true,
      'declaration-colon-space-after': 'always',
      'declaration-colon-space-before': 'never',
      'function-comma-space-after': 'always',
      'function-url-quotes': 'always',
      'string-quotes': 'single',
      'media-feature-colon-space-after': 'always',
      'media-feature-colon-space-before': 'never',
      'media-feature-name-no-vendor-prefix': true,
      'max-empty-lines': 2,
      indentation: [2, {
        severity: 'warning',
        except: ['value']
      }],
      'number-leading-zero': 'always',
      'number-no-trailing-zeros': true,
      'property-no-vendor-prefix': true,
      'declaration-block-no-duplicate-properties': [true, {
        ignore: ['consecutive-duplicates-with-different-values']
      }],
      'declaration-block-trailing-semicolon': 'always',
      'selector-list-comma-space-before': 'never',
      'selector-list-comma-newline-after': 'always',
      'value-no-vendor-prefix': true
    }
  };

  const processors = [
    stylelint(stylelintConfig),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];

  return gulp.src(
    // Stylesheet source:
    ['./app/assets/styles/**/*.css',
      // Ignore linting vendor assets:
      // (Useful if you have bower components)
      '!app/assets/css/vendor/**/*.css'])
    .pipe(postcss(processors));
});
```

### Run stylelint
`$ gulp css-lint`

## Dev with CSS
* You want to transform your partials and move them to a bundle file
* You want to generate sourcemaps
* You want autoprefixes
* You are using ESLint so you want a way to quickly ignore some eslint errors that you don't need to worry about
  - See the comments below `eslint-disable`
  - Separate by commas
* We import all our partials into `./app/assets/styles/styles.css`
* We run all our css through autoprefixer and sourcemaps
  - This will let us see which partial our elements are inside when we use the Chrome dev tool to inspect our code
* Finally, we bundle our code and create a file and a path to it `./app/temp/styles`
* **note** This is just for development and we like this because it won't be minifed and we can see what the code looks like after all our transformations
* Eventually we will build our code our for production and the sourcemaps will be removed and the css minified

```css
/* eslint-disable import/no-extraneous-dependencies, func-names, no-console */
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const hexrgba = require('postcss-hexrgba');
const mixins = require('postcss-mixins');
const sourcemaps = require('gulp-sourcemaps');

const autoprefixerConfig = { browsers: ['> 1%', 'last 3 versions', 'Android >= 4', 'iOS >= 7'] };


gulp.task('styles', () => {
  const transformations = [
    autoprefixer(autoprefixerConfig),
    cssImport,
    mixins,
    cssvars,
    nested,
    hexrgba
  ];
  gulp.src('./app/assets/styles/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss((transformations)))
    .on('error', function (error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(sourcemaps.write('.')) // path relative to the outputted css file
    .pipe(gulp.dest('./app/temp/styles'));
});
```

## Watch our code with Gulp using BrowserSync
* Everytime we hit save we want to run our tasks
* We can add dependencies and have multiple tasks run
* Or we can have one off tasks that we use when we need to do something like generate sprites
  - We don't want to run every task on save or our terminal would slow considerably

`watch.js`

```js
/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('cssInject', ['styles'], () => gulp.src('./app/temp/styles/styles.css').pipe(browserSync.stream()));

gulp.task('scriptsRefresh', ['scripts'], () => {
  browserSync.reload();
});

gulp.task('watch', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  });

  watch('./app/*.html', () => {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', () => {
    gulp.start('cssInject');
  });

  // watch for any changes to our js files
  watch('./app/assets/js/**/*.js', () => {
    gulp.start('scriptsRefresh');
  });
});
```

* We use this gulp task to watch for any changes to our html, css or js files and if there is, we will automatically refresh the browser
* We point to the root of our app (_baseDir: 'app'_)
* We turn off the annoying browserSync notification `notify: false`

## JavaScript
### Prettier and ESLint
* I recommend using Prettier and ESLint together, this will make formatting your JavaScript a snap (without Prettier, it an be a real pain)
* And ESLint can track and fix your errors
  - Setting both of these to play nice is fairly straight forward in Atom, Sublime Text and VS code
  - Vim, on the other hand is a bit more difficult

#### ESLint
`.eslintrc.json`

```json
{
  "extends": [
   "airbnb",
   "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "rules": {
    "comma-dangle": ["error","never"],
    "no-unused-vars": [ "error",
    {
      "vars": "local",
      "args": "none"
    }],
  }
}
```

* I like to add `.json` at the end of `.eslintrc` so you get the color coding
* `airbnb` is a top notch style guide
  - Gives you a ton of rules
  - But we need it to come first (extends)
  - Then add prettier (must come after)
  - This will overwrite the style that comes with airbnb that conflicts with prettier
  - The `parserOptions` lets you use ES6 code and not have ESLint bark at you about using it
  - Setting the environment to `node, browser and es6` will let you code your project with cutting edge code and not get barked at
  - I added some examples on how you can change some rules to customize how you/your team codes

#### .eslintignore
```
app/temp/**
node_modules/**
```

* Helps you avoide linting stuff you don't need to

### Installs for Prettier and ESLint
`$ yarn add eslint-config-airbnb, eslint-config-prettier, eslint-plugin-import, eslint-plugin-jsx-a11y, eslint-plugin-prettier, eslint-plugin-react -D`

* **tip** Don't install ESLint globally
  - It is better to install it project by project

### Installs for Prettier
`$ yarn add prettier, prettier-eslint-cli -D`

## Eslint and Prettier in Vim
`~/.vimrc`
```
Plugin 'prettier/prettier'
Plugin 'mitermayer/vim-prettier'
Plugin 'w0rp/ale'
"
" ESLint through Vim
let g:ale_fixers = {
  \ 'javascript': ['eslint'],
  \}

" shortcut to run :ALEFix (<space>d)
nmap <leader>d <Plug>(ale_fix)

" Set this. Airline will handle the rest.
let g:airline#extensions#ale#enabled = 1
```

## CSS Sprites
* Reduce the number of HTTP requests
* This will take all your SVGs and convert them to one image
* Then we use the handlebars templating engine to autogenerate the CSS for all the CSS sprites
* We delete everytime this task is run to clear out the old junk
  - If we didn't do this we would build a folder stuffed with thousands of files and it would grow everytime we used it
  - We don't need the old code so we can blow it up and re-create it every time

```
/* eslint-disable import/no-extraneous-dependencies, space-before-function-paren, func-names, function-paren-newline */
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

gulp.task('beginClean', () =>
  del(['./app/temp/sprite', './app/assets/images/sprites'])
);

gulp.task('createSprite', ['beginClean'], () =>
  gulp
    // grab all the svgs inside the icons folder
    .src('./app/assets/images/icons/**/*.svg')
    // use the template var
    .pipe(svgSprite(config))
    // output generated sprite to time file
    .pipe(gulp.dest('./app/temp/sprite/'))
);

// gulp.task('createPngCopy', ['createSprite'], () => gulp
//   .src('./app/temp/sprite/css/*.svg')
//   .pipe(svg2png())
//   .pipe(gulp.dest('./app/temp/sprite/css')));

// gulp.task('copySpriteGraphic', ['createPngCopy'], () => gulp
gulp.task('copySpriteGraphic', () =>
  gulp
    .src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'))
);

gulp.task('copySpriteCSS', ['createSprite'], () =>
  gulp
    // grab all the sprites generated
    .src('./app/temp/sprite/css/*.css')
    // rename to partial `_sprites`
    .pipe(rename('_sprite.css'))
    // copy file and move copy to modules directory
    .pipe(gulp.dest('./app/assets/styles/modules'))
);

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], () =>
  del('./app/temp/sprite')
);

gulp.task('icons', [
  'beginClean',
  'createSprite',
  // 'createPngCopy',
  'copySpriteGraphic',
  'copySpriteCSS',
  'endClean'
]);
```

* We used to use convert svg to png for older browsers but this is no longer needed as a majority of browsers (see for yourself by visiting canisuse.com)
* Our config file does some things
  - names our sprite `sprite.svg`
* We grab all the svg's in our project

`app/assets/images/icons/**/*.svg`

* We pass our sprite task the config and call this function `svgSprite` that usese this gulp module `gulp-svg-sprite` to generate one image filled with all our current project's svg (or the path we point it to)
* We copy the sprite image to this folder `app/assets/images/sprites` (Purely for organizational purposes - keep all like items in the same directories)
* We have our handlebars template located here: `/gulp/templates/sprite.css`
* Our config points to that and we use that to generate our CSS for our sprite

```
{{#shapes}}
  {{#first}}
    .icon {
      background-image: url('/temp/sprite/css/{{{sprite}}}');
    }
    
    .no-svg .icon {
      background-image: url('/assets/images/sprites/{{#replaceSvgWithPng}}{{{sprite}}}{{/replaceSvgWithPng}}');
    }
  {{/first}}

  .icon--{{base}} {
    width: {{width.outer}}px;
    height: {{height.outer}}px;
    background-position: {{position.relative.xy}};
  }
{{/shapes}}
```

* The .no-svg is an option we won't be using because it is outdated but kept it here to show because it is cool what it did and might be a useful technique for other items
* The .no-svg is created by modernizr, which is some javascript we will talk about that goes through pages and generates classes on that page that says whether or not it understands certain technology
* In this case, it generates svg if it does understand svg and no-svg is it does not
* We could show a svg or a png background image depending on the browser's capabilities
* We use a function to turn the sprite into a different named file with a .png suffix
* We isolate the background-image into `{{first}}` because this code will be dynamically generated based on logic while this code:

```
.icon--{{base}} {
    width: {{width.outer}}px;
    height: {{height.outer}}px;
    background-position: {{position.relative.xy}};
  }
```

* The above code is the magic that creates all the CSS values to point to the different CSS sprite images on our dymanically generated image holding all our sprites

```css
.icon {
  background-image: url('/temp/sprite/css/sprite-e79e95cc.svg');
}
.no-svg .icon {
  background-image: url('/assets/images/sprites/sprite-e79e95cc.png');
}

.icon--clear-view-escapes {
  width: 144.4px;
  height: 61.53px;
  background-position: 0 0;
}
```

* Above shows what some of the dynamically generated css sprite code will look like

![all svgs in one image](https://i.imgur.com/WcYtzuu.png)

* Above shows what our one image with all svgs looks like
* **note** One problem is if you are using stylehint, it will not like the formatting of your dynamically generated css, so you need to comment it out so you don't get the errors, here's how

`stylelint.js`

```
// more code
gulp.task('css-lint', () => {
  // Stylelint config rules
  const stylelintConfig = {
    ignoreFiles: [
      'app/assets/styles/modules/_sprite.css'
    ],
// more code
```

## Webpack
* Webpack will bundle all our javascript in App.js and our 3rd party javascript into Vendor.js
  - It is easy generating them with just Webpack and Webpack Dev server but with the gulp/webpack hybrid, I haven't figured it out yet

### Webpack config file
`webpack.config.js`

* Generate scripts `$ gulp scripts`
* Generate styles `$ gulp styles`
* Generate icons `$ gulp icons`
* Create sprites `$ gulp createSprite`
* Watch `$ gulp watch`

```js
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    App: './app/assets/js/App.js',
    Vendor: './app/assets/js/Vendor.js'
  },
  output: {
    path: path.join(__dirname, './app/temp/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
```

* devtool
  - property to give sourcemaps (not working with gulp)
  - The Entry is pointing to `App.js` and `Vendor.js` inside the `app/assets/js` folder
  - We output to `.app/temp/js` and dynamically use filename to make both files App.js and Vendor.js
  - We transpile to babel and use a common preset `es2015`
    + This makes all our modern code usable in older browsers because it is converted to an older javascript version

## Tell Gulp about Webpack
`scripts.js`

```js
/* eslint-disable import/no-extraneous-dependencies, arrow-parens, global-require, no-console  */
const gulp = require('gulp');
const webpack = require('webpack');

gulp.task('scripts', ['modernizr'], callback => {
  // tell webpack where our config file is
  webpack(require('../../webpack.config.js'), (err, stats) => {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});
```

## OOP
* We used OOP and when we have errors, we will see that particular JavaScirpt file that created that error
* This is the beauty of sourcemaps
  - They save you time tracking down where the error occurred
  - Without sourcemaps you will just see the huge bundled javascript file


