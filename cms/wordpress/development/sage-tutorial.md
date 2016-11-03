# Sage Tutorial

Sage is not a theme framework, it is a starter theme.
* you should rarely need to update it
* you shouldn't create child themes from it
* It's a starter theme so you should use it as a starting point for a new project
* by using Sage build process and asset management, you will see orders of magnitude of difference in page load time (compared to traditional non-optimized WordPress sites)

## How to optimize a site (best practices):
* [Eliminate unnecessary downloads](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads)
* [Optimizing encoding and transfer size of text-based assets](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)
* [Image Optimizatin](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)

[TWIG - PHP template engine](http://twig.sensiolabs.org/)
Sage wrapper - compromise between a full templating engine like TWIG and the default WordPress templating structure

[LEMP Stack](https://lemp.io/)
* Linux
    - Two of the most commonly used Linux distributions in LEMP stacks are `Debian` and `Ubuntu`
* Nginx
* MariaDB (MySQL)
* PHP

[Trellis vs VVV](https://roots.io/where-mamp-and-vvv-fall-short/)

`app` == `wp-content` (Bedrock)

`style.css`
* You won’t be placing any CSS in this file, it’s only used to provide
WordPress with information that’s displayed in the admin. 

`quote` - Content precedes design. Design in the absence of content is not design, it's decoration. - Jeffrey Zeldman

## Tools

* `HTML5 Boilerplate` – a front-end template.
* `Gulp` – a build system used for automating tasks such as minification and concatenation of front-end assets, optimizing images, running tests and many others.
* `Bower` – a package manager for front-end assets. It’s used for pulling JavaScript libraries like jQuery or Lodash into your project.
* `Browsersync` – synchronises file changes and interactions in multiple devices.
* `asset-builder` – used for collecting assets in your theme and putting them together.
* `wiredep` – used for injecting Sass and Less dependencies from Bower into the main theme stylesheet.
* `Bootstrap` – a front-end framework that allows us to easily create responsive websites.

## Installation

* replace `theme-name` with your theme name

```bash
$ git clone https://github.com/roots/sage.git theme-name
```

## Notes:
* Directory structure very similar to any WordPress theme
files like:
* `index.php`
* `functions.php`
* `single.php`

But we now have a `lib` folder with:
* theme configuration
* utilities

* include front-end assets with assets.php (instead of `functions.php`)
* register `widgets`, `menus` and `adding theme support` in `init.php`
* specify page titles through `titles.php`

### assets directory
* contains `.scss` files
    - get compiled later into a single `main.css` file

### gulp
* will concatenate and minify the `.scss` files

### lang directory
* use if you are interested in translating to another language

### templates directory
* all the same templates you usually have in a WordPress theme
* but in addition, they are all based on HTML5 Boilerplate
    - has default ARIA roles to improve the accessibility of your theme

## Workflow

sample way to install modules using node.js

```bash
$ npm install gulp bower browser-sync asset-builder wiredep --save
```

### Install bower

```
$ bower install
```

![after installing bower screenshot](https://i.imgur.com/M1iyBT7.png)
### Run Gulp

![after running gulp screenshot](https://i.imgur.com/vPFcjBb.png)

#### The first task is `clean`
* this removes all the files in the `dist` directory
    - this is where all the compiled and optimized files are stored

Next Step: Default task is called
* this calls the `build` task
    - then build task calls the styles, scripts, fonts and images tasks

#### Analysis of `gulpfile.js`

* open and view file
    - first task is `styles`
        + depends on `wiredep`
             * allows us to inject Less and Sass Bower dependencies into `main.css` (`dist/styles`)
             * then compiles Sass and Less files into `assets/styles`

#### How do I add page specific `CSS`?
Use `manifest.json` (assets/mainifest.json)

#### scripts task is run next
* jshint checks the quality of your JavaScript code

##### How can I customize JSHint?
edit the `.jshintrc` file in root of theme
* [link to available options](http://jshint.com/docs/options/)

* next all the JavaScript files in your Bower dependencies are concatenated with your `scripts/main.js`

* next it will minify the resulting script with `uglify.js`

##### How can I customize how JS is concatenated and minified?
using `manifest.json`
* example: you don't want all Bower dependencies to get combined with your main script (`main.js`)
* remove the main property in your `main.js`
* add a bower property

```js
"main.js": {
  "files": [
    "scripts/main.js"
  ],
  "main": true, //remove this line
  "bower": ["jquery"]
},
```

#### Next is the `fonts` task
Grabs all the fonts in `assets/fonts` and any fonts used by Bower dependencies and put them all inside `dist/fonts`

gulp-flatten: flattens directory stucture (so you only find fonts in the `dist/fonts` directory)
* great so you no longer have to specify lots of directories when linking your fonts

#### Next is `images` task
* compresses the images in `assets/images`
    - using lossless compression
    - effectively reduces image size without any perceivable reduction in image quality
    - images are then stored inside `dist/images`

## gulp watch
* use to speed up your development process
* does same thing as `gulp` command, only it does it EVERY time you make changes to an asset.

note: before you use `$ gulp watch` you must update `assets/manifest.json` so the `devUrl` is the same URL of your WordPress install

```json
"config": {
  "devUrl": "http://local.kingluddite.com"
}
```

## gulpif task
* conditional - we use it to check if source maps is enabled and only call the function that generates sourcemaps when it is enabled

## minify task
Does what you think it does (minifies your code)

## jsTask
* uglify task checks first if minify is enabled before it minifies scripts

# Theme setup
`/lib/setup.php`

## Menus

* register navigation menus
  - add them inside the `register_nav_menus` array

after registering menus
* create new menus in WordPress admin
* and assign them to the appropriate location

doing the above with WP-CLI

```bash
$ wp menu create "Footer Navigation"
Success: Created menu 2.
$ wp menu location assign 2 footer_navigation
Success: Assigned location to menu
```

## Sidebars
* register sidebars
  - default - primary and footer
    + shown in WordPress admin where widgets
    + and theme customizer

## Custom image sizes
* when you upload an image through WordPress admin, additional copies of the image are saved based on the registered image sizes.
  - helps make responsive images/retina friendly
  - name with size of image

# base.php

DRY
wrapper

# Page templates

## No Home Page Homee
No home page by default for static front page
save page.php as front-page.php

## No Blog Page Either
Save index.php as home.php

Change settings > reading in WordPress admin

* avoid creating templates with names based on `slug`
  - they automatically load
  - don't require the template name in a PHP comment
  - don't require you to manually select the page template

all sound good but template would break if the page slug changed.
create templates based on `template-custom.php`

use terminal to duplicate files
```bash
$ cp template-custom.php template-about.php
```

open template-about.php and update comment at top:

```php
/**
 * Template Name: About Us
 */
```

# Template Partials

save in `templates/` directory
* newsletters
* social media links
* Modals
* call to actions

# Customize Front-End

`lib/setup.php`

## enqueuing the CSS and JS
* at bottom of `setup.php`
* `dist/styles/main.css` is loaded by default
* `dist/scripts/main.js` is loaded by default

**note:** these files are created based off what's in `assets/manifest.json`
* based on [asset-builder](https://github.com/austinpray/asset-builder)

No more modernizr - https://github.com/roots/sage/pull/1541

## Comments
If you use Disqus, Facebook, Google+, or another commenting system, you can remove this file. When removing files, make sure to also delete the relevant import line in `main.scss`. 

## Images
If you’re in a stylesheet and you’d like to reference an image,
assets/images/logo.svg, you would write:
If you’re in a template and you’d like to reference the same image, you would write:
if (is_singular(['book', 'screencast', 'plugin'])) {
  $classes[] = 'product';
}

```css 
assets/images/
 images/
.brand {
  background: url(../images/logo.svg);
}
```

```php
<img src="<?= get_template_directory_uri() . '/dist/images/
logo.svg'; ?>">
```

Sage requires PHP 5.4, so you should be taking advantage of:
short array syntax is as simple as replacing array() with [].
The short echo syntax 

old way

```php
<?php echo get_template_directory_uri(); ?>
```

new way

```php
 <?= get_template_directory_uri(); ?>
```

Remember that you don’t want to put site functionality in your theme, such as custom post types.
You can also organize your custom code into new files within the directory, just make sure you add them to the loader in `functions.php`

4/2015 WordPress.org is requiring theme authors to use Customizer API for theme options

To use the Customizer API in a Sage based theme, start with the lib/customizer.php and assets/scripts/customizer.js files that were introduced in Sage 8.4.0.
[link to customizer tutorials](https://make.wordpress.org/themes/2015/05/07/customizer-tutorials-and-documentation/)

## David Project
quick way to be using the latest and greatest packages

[David Project link](https://github.com/alanshaw/david)
