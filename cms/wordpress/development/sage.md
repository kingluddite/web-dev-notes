# Sage WordPress Starter Theme

[YouTube video where I learned this stuff](https://www.youtube.com/watch?v=D34iMIbcBAY)

[Sage tutorial](http://www.sitepoint.com/modernizing-wordpress-theme-development-with-sage/)

[Theme Development with Sage PDF book](https://roots.io/books/theme-development-with-sage/?utm_source=designernews)

## What does is use?
* [Gulp](http://gulpjs.com/)
* [Bower](http://bower.io/)
* [Bootstrap](http://getbootstrap.com/)
* [bedrock](https://roots.io/bedrock/)
* [trellis](https://roots.io/trellis/)

## What is Sage?
Starter Theme (not theme framework)

## Why Sage?
Professionally maintained
Developed on github
Until version 7 it was known as [Roots](https://roots.io/), now it is called [Sage](https://roots.io/sage/)

Has branch so you can use sage and [bootstrap4](http://v4-alpha.getbootstrap.com/)
Perfect amount of boilerplate
Don't want Bootstrap, just remove it
* a modern build process
* image optimization

## Sage requirements
* WordPress (latest version)
* PHP >= 5.4x
* [Git]https://git-scm.com/](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/) 0.12.x

# Steps to run Sage

## 1. Install WordPress with [WP-CLI](https://wp-cli.org/)

## 2. Set Environment to development

Why? If you don't, it will automatically use the `dist` folder of `gulp`

`wp-config.php`

```php
define('WP_ENV', 'development');
```

## 3. Browse to `themes` folder

`$ cd /your-server/wordpress-project/wp-content/themes/`

## 4. Install sage

```bash
$ git clone https://github.com/roots/sage.git your-theme-name
```

## 5. Use `node.js` to install packages

 This will look inside the `package.json` file and install all the project dependencies.

(_another way developers say this is:_)

 * will install all the `modules` that are in `package.json`

```bash
$ npm install
```

## 6. User bower to install

* installs all packages that are listed on `bower.json` and their dependencies.

```
$ bower install
```

## 7. Run Gulp

```
$ gulp
```

* Gulp will compile optimize the files in your `assets` directory

## 8. Run Gulp in Production Mode

It will compile assets in production and it will remove all the old source maps in your css files.

```
$ gulp --production
```

## 9. Gulp Watch

Compile Assets when file changes are made

 **note:** roots used `grunt` but it was slower so they upgraded to `gulp`

### [BrowserySync](https://www.browsersync.io/) is built in to this Gulp!

**Why BrowserSync is awesome?**
Well, without it, you would have to:
* say you change something in your css file, you'd need to compile it, minify it, they you have to look at your css file and then reload your browser... that's time consuming

BrowserSync will completely change the way you develop

### Gulp Watch and BrowserSync and the super hero manifest.json

#### Where is [manifest.json](https://github.com/hillmanov/gulp-manifest)?
`sage-theme/assets/manifest.json`

#### Why is manifest.json useful?

You can set your dev url here:

* with this change, you can now see your CSS changes almost instantly

```js
"config": {
    "devURL": "http://local.project-name.com"
}
```

### [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) plugin

* you can now change code using Chrome browser with `inspect element` and it will 
    + inject that code into sublime, compile and save for browser 
        - (_so yes, stuff you do in the Chrome Dev Toolbar, now can directly change and save the changes to your actual code!!!_)

## Now let's talk about the Sage Theme folder

### the `assets` folder

* fonts/
* images/
* scripts/
* files/
* manifest.json

* lang/
    - sage.pot

Sage is completely translatable

* lib/
    - assets.php
    - conditional-tag-check.php
    - config.php
    - extras.php
    - init.php
    - titles.php
    - utils.php
    - wrapper.php

* templates/
    - content.php
    - head.php
    - header.php
    - footer.php
    - sidebar.php

# Sage Concept - DRY

Don't repeat yourself

Every piece of knowledge must have a single, unambiguous, authoritative representation within a system

* opposite of DRY
    - WET - Write Everything Twice
        * Most WordPress themes are WET
    - CRY - Continuously Repeating Yourself

## base.php

Doesn't escape WordPress Template Hierarchy. Keeping everything DRY.

* introduces a template wrapper and within that file we want to keep everything DRY

If you need to overide this file:

`base-*.php` (this still works)

`base-<template-name>.php`
base-front-page.php
base-home.php
pase-singular.php

## Extending Templates

static front page?
copy page.php to front-page.php

about page?
copy page.php to page-about.php

gallery CPT? (Custom Post Types)
Copy `index.php` to `single-gallery.php`

Best Practice
* Keep functionality out of theme

Trellis Error

[Ansible roles/packages](http://stackoverflow.com/questions/36958125/ansible-roles-packages-ansible-galaxy-error-on-instalation-mac-osx) - Ansible Galaxy - error on instalation MAC OSX
```
pip install --upgrade setuptools --user python
```
