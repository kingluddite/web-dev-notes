# WordPress Custom theme development

## Enable Permalinks for nicer URLS

## Where themes live?
`Dashboard` > `Appearance` > `Active`
* can search themes
* [WordPress.org Theme Repository](https://wordpress.org/themes/)
    - free
* [themeforest.com](http://themeforest.net/)
    - premium

## How to install a theme?

1. Download zip
2. upload directly into WP

* sometime download contains more than theme so check out theme documentation

## How to manually install themes?
[server-root] > `wp-content` > `themes`

[WP Template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)

WordPress works on a hierarchy. The above page is the documentation that explains how this hierarchical system works.

[wphierarchy.com](https://wphierarchy.com/)

* The above link is a great dynamic resource for the hierarchical system of WordPress

## What should I name a theme?
Namespace theme to not conflict with other names

### Sample theme folder name
`kl-magazine`

[What we want to build as a custom theme](http://foundation.zurb.com/templates-previews-sites-f6/news-magazine.html#)

Two of the main CSS frameworks used currently in the dev world are Twitter Bootstrap and Foundation. They are great places to start so you don't have to worry about your code working in all browsers. They already did the leg work for this and have grids, components and media queries that are tested and work across all modern browsers. This is a major time saver for developers.

Then you can start with these frameworks and customize them to fit your own individual needs per project.

### Create these files in your custom theme
* style.css (required)
* index.php (required)
* functions.php

## style.css
meta information (seen on appearance > themes)

[special comment](http://codex.wordpress.org/Theme_Development#Theme_Stylesheet)

```css
/*
Theme Name: Kingluddite Portfolio Theme
Author: the WordPress team
Author URI: http://kingluddite.com/
Description: A simple theme to showcase how to build a theme from the ground up.
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Code and take over the world line-by-line
*/
```

At this point we can see our theme in the Dashboard
`Dashboard` > `Appearance` > `Themes`

### screenshot.png
No photo in our theme. Let's make one.
Create 880 x 660px screenshot

#### Useful tools for working with images
##### imgur
Create imgur account
[imgur.com](http://imgur.com/)

##### mac2imgur
* [how to install](https://github.com/mileswd/mac2imgur)
* [how to add screenshot video](https://www.youtube.com/watch?v=mf_HZvSY05M)
* [sample screenshot.png 880px x 660px](http://i1.wp.com/wptavern.com/wp-content/uploads/2014/12/Nulis-screenshot.png?resize=880%2C660)

Now check theme and you'll see image

`Dashboard` > `Appearance` > `Themes`

## Activate custom theme

### Broken themes

rename `style.css` > `styles.css`

View Dashboard to see broken theme. Rename to fix

Our site is now blank

* use template `html`, `css`, `javascript`

## Custom CSS

Lots of ways to add CSS. For simplicity let's just add ours right underneath our custom comment in `style.css`
  
## Homebrew

[homebrew](http://brew.sh/) is something every web developer using a mac should use. Why? Saves you time because it improves your workflow.

### Install Homebrew

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Node

We need to use node so that we can easily add library dependencies to our project. We don't have to do this but it will save us tons of time. 

[install nodejs with homebrew](http://blog.teamtreehouse.com/install-node-js-npm-mac)

```
$ brew install node
```

### package.json

This is a json file that acts like a configuration file for your project. It works great with github and git. You add your dependencies to package.json and then can easily pull them down to your project whenever you need them.

Initialize your `package.json` file

* accept all default values

#### Create your package.json file

```
$ npm init
```

### Install normalize css
Install [normalize.css](https://necolas.github.io/normalize.css/)

```
$ npm install normalize.css --save
```

### Install Zurb Foundation
Install [Zurb Foundation](http://foundation.zurb.com/)

```
$ npm install foundation-sites --save
```

* install bower globally
    - install [zurb foundation](http://foundation.zurb.com/)
        + [zurb github](https://github.com/zurb/bower-foundation)
    - install [normalize](https://github.com/necolas/normalize.css/)

### You can add CSS inside it's own folder if you want
Create `css` folder in custom theme

`functions.php`

```php
<?php
function klt_theme_styles() {

    wp_enqueue_style( 'foundation_css', get_template_directory_uri() . '/css/foundations.css' );
    wp_enqueue_style( 'normalize', get_template_directory_uri() . '/css/normalize.css');
    wp_enqueue_style( 'google_font', 'http://fonts.googleapis.com/css?family=Asap:400,700,400italic,700italic' );
    wp_enqueue_style( 'main_css', get_template_directory_uri() . '/style.css');
}

add_action( 'wp_enqueue_scripts', 'klt_theme_styles');

?>
```

## add JavaScript
* WP already has jQuery
* we have from npm foundation js
* look at html template to see what we are trying to convert to WP theme

```php
function klt_theme_js() {
    wp_enqueue_js() {
        //'moderizr_js', get_template_directory_uri() . '/js/modernizr.js', '', '', false );
     'foundation_js', get_template_directory_uri() . '/js/foundation.js', array('jquery'), '', true ); // dependency and true puts js at bottom
     'main_js', get_template_directory_uri() . '/js/app.js', array('jquery', 'foundation_js'), '', true ); // dependency and true puts js at bottom
    }
}

add_action( 'wp_enqueue_scripts', 'klt_theme_js' );
```

* why not use WP way of putting URLs inside header?
    - gives structure of your site to public, not good for security

how do we deal with this?

```html
<script>
 $(document).foundation();
</script>
```

# The $ problem
* can lead to conflicts
* you can't just use jQuery like you normally would

```js
$( ".some-class").click(function() {
    $(this).toggleClass("open");

    return false;
});
```


## Add wrapper for `no-conflict` jQuery [link](https://premium.wpmudev.org/blog/daily-tip-adding-custom-js-to-wordpress-remember-jquery-noconflict-wrappers/)

use this wrapper

```js
jQuery(document).ready(function($) {
    // $() will work as an alias for jQuery() inside of this function
});
```

will turn into this in our js/app.js

```js
jQuery(document).ready(function($) {
    $(document).foundation();
    $( ".some-class").click(function() {
        $(this).toggleClass("open");

        return false;
    });
});
```



