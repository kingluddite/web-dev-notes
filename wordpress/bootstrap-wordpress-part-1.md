# WordPress Notes

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)
* [part 5](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-5.md)

# Bootstrap & WordPress
 
## 1. Install WordPress locally

### If you use MAMP remember to:
* [download WordPress](https://wordpress.org/download/)
* Extract and rename `wordpress` folder after your project
    + follow my rules of 
        * files and folder lowercase (file.jpg of some-folder)
        * no spaces, use dashes for multiple words (file-name.jpg or folder-name)
        * only use underscores when naming a database
        * once extracted, delete zip file for good computer house cleaning
* Change MAMP settings. By default the port is :8888. Change the port to 80
[screenshot of MAMP settings for port](https://i.imgur.com/LTKCIiJ.png)
* Change the Document root to `Sites`
    - This is an exception to the folder name rule because this used to be an out of the box feature of IOS but they removed it with recent IOS systems. I name it with a capital letter out of tradition.
    - [screenshot of Sites Document Root](https://i.imgur.com/ivxdIvE.png)
* **Note** Stop and start MAMP servers
    - Mac IOS will ask you to enter your password to stop and start servers
    - You will know if it is working if you when you click on 'Open WebStart page' you see a path of `http://localhost` and not `http://localhost:8888`
* use `phpMyAdmin` to create a new empty database
    - use lowercase only and if multiple words use underscores
    - name the database without saying db or database in name (for better security)
* place your new, extracted, renamed WordPress folder inside your new `Sites` folder
* if you browse to `http://localhost` you should now see your new WordPress project
    - click project and you will now walk through browser pages to install wordpress
        + **page 1** ![choose language](https://i.imgur.com/AXvxvU6.png)
        + **page 2** tells you that you are about to populate your database with the [WordPress tables](https://codex.wordpress.org/Database_Description). Click the `Let's go!` button [screenshot](https://i.imgur.com/EvJnTnI.png)
        + **page 3** - This is your database connection info. When you enter this, WordPress will be able to connect to your database and populate the database you just created with the WordPress database tables. It will also create a `wp-config.php` file and put your database info in that file. This file is important to keep safe because if someone gets a hold of it, they can access and delete your database. The MAMP default username is `root` and the default password is `root`. This is fine for local development but when deploying to production you obviously want a more secure user name and password. In production your Database Host is usually `localhost` but some hosts use a different URL. They will let you know if they do in their cpanel. It is also a good security practice to rename the Table prefix to something other than `wp_`. Click `Submit` button when your Database info is correctly entered.![screenshot of WordPress sample database info](https://i.imgur.com/ea6NPKb.png_)
        + ![error database page](https://i.imgur.com/MDpJ69B.png) - you'll get this is you typed any of the info incorrectly. It's a good idea to write down and store all your connection information in a safe place. Click `Try again` to take another stab at putting in the correct info.
        + **page 4** - ![run install](https://i.imgur.com/fdDKsrF.png) - If all is well, you'll get this. Click `Run the install`.
        + **page 5** - This will start to add info to specific WordPress database tables. Put your Site Title in (great SEO boost right out of the gate). Enter a username (Never use `admin` as the password as most hackers try that first because most people use it.). For local development you can put an easy password like `password` as you are the only one that has access to this. But when you put it live, you obviously want a better password. It should be noted that the username and password here are to enable you to login to the WordPress Admin Dashboard with Admin privlidges. Check `confirm use of weak password` checkbox if you use a weak password. Enter your email. This is important if you ever forget your password as WordPress will send you an email when you request to reset your password. When working locally or on a staging server, you obviously don't want SEO engines to see your site so check `Discourage search engines from indexing this site`. Make sure to uncheck it when in production or else your site will be invisible to all search engines which is obviously bad for business. ![page 5 screenshot](https://i.imgur.com/CDAK5Ol.png). Finally, click `Install WordPress`.
        + **page 6** - if all goes well you ![will see this page](https://i.imgur.com/SMipiMU.png). If not, troubleshoot and try and find the error of your ways. Click the `Log In` button.
        + **page 7** - ![You will see this page](https://i.imgur.com/VFjF4CV.png). Use your login credentials to login to the admin Dashboard.
            * **note** To login in the future go to `http://localhost/your-wordpress-site/wp-admin`


## 2. Download Bootstrap
[Download Bootstrap](http://getbootstrap.com/getting-started/)

## 3. Create new custom theme

What WordPress directory do you put your custom theme?

`wp-content/themes/wp-bootstrap`

## 4. Add folder to project in Sublime Text

Not a required step but a helpful one. This is obviously assuming your are using Sublime Text as your text editor. Sublime makes working with WordPress easier with it's project functionality. [This link shows you the power of control you can have with projects](http://code.tutsplus.com/tutorials/sublime-text-2-project-bliss--net-27256). I just like to create a folder for CORE WordPress and for my custom theme. If you are also developing a plugin, you could add a folder for your plugin too.
    * save project as and create CORE and wp-bootstrap project folders

## 5. Add these files to your custom theme folder

Custom themes can have lots of files. But the only required files are `index.php` and `style.css`.

* functions.php
* header.php
* footer.php
* index.php (required)
* style.css (required)
* screenshot.png

Use this code to grab a proper dimensioned `screenshot.png` to give you a cute example of how to add a `screenshot.png` using the terminal

* make sure you are inside the custom theme folder when entering this code

```
$ curl -O https://make.wordpress.org/training/files/2013/10/screenshot.png
```

## 6. Add special css comment to style.css

Some may find this strange but WordPress using comments to give itself special instructions. The `style.css` file is a perfect example of this. Here you see a comment that adds meta information about the theme to the Dashboard. You can put all your CSS in this file but there is a better way to break up your CSS with help from the `functions.php` file.

```css
/*
Theme Name: Kingluddite Magazine Theme
Author: Kingluddite
Author URI: http://kingluddite.com/
Description: A simple theme to showcase how to build a theme from Twitter Bootstrap
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Code and take over the world line-by-line
*/
```

## 7. Activate Your Theme

So if you are logged into your WordPress Dashboard and you navigation to `Appearance > Themes` you should see your theme. If you don't you may have created a `broken theme` and you'll have to troubleshoot to get it working. WordPress usually will give you a broken theme notice and let you know what the problem may be. If you added a screenshot.png to your theme, you will see that image in the themes page of your Dashboard. Click Activate and your theme will now be live. Click `Visit Site` in Dashboard to view your live site. Don't get too excited because it will blank.

## 8. Our Bootstrap Starter Template

We'll use this template and convert it so it looks the same in our WordPress custom theme.

[Our BS template](http://getbootstrap.com/examples/jumbotron/)

* View the page in Chrome and view the source of the page. Copy the source and paste it into `index.php`. The CSS won't be working but you will see the content.

## 9. Break up our page into pieces

### header.php

In `index.php`, select from the `<!DOCTYPE html>` down to the closing `</nav>` element and paste inside `header.php`

### php includes

#### get_header()

If you worked with PHP before you know about includes. It's just a way to include a chunk of code onto another page. `get_header()` will pull into index.php the code inside `header.php`.

Replace the cut code in `index.php` with the following PHP code:

`index.php`

```php
<?php get_header(); ?>
[rest of index.php code here]
```

View page in browser to test if header include is working

#### get_footer()

In `index.php` select and cut from the HR element to end of the HTML element and paste into `footer.php`.

Replace cut code in `index.php` with the following PHP code:

```php
[rest of index.php code here]
<?php get_footer(); ?>
```

View page in browser to test if `footer.php` include is working

## 10. Custom CSS

Create a `css` folder and put `bootstrap.min.css` (from when you downloaded Twitter Bootstrap) inside it

## 11. Proper Way to Include CSS in WordPress

In a static HTML page, you use LINK elements to point to the CSS files. In WordPress the proper (and secure) way to include CSS is through the `functions.php` page.

Add this to `functions.php`

`functions.php`

```php
<?php
function theme_styles() {
    wp_enqueue_style( 'bootstrap_css', get_template_directory_uri() . '/css/bootstrap.min.css' );
}
add_action( 'wp_enqueue_scripts', 'theme_styles' );
?>
```

## 11.1 Homebrew

[Homebrew](http://brew.sh/) is great for Mac computers.

Install it with this code:

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 11.2 Install Node using Homebrew

```
$ brew install node
```

Now you have `npm` (node package manager) and this gives you some cool abilities

## 11.3 package.json

```
$ npm init
```

This will create a simple package.json file that will be used a lot when you are using git and github. We are using it here so we can easily install bootstrap. (Otherwise we would have to find a CDN link or manually download it). package.json is a file modern web developers use to spead up their workflow when building web applications.

## 11.4 Install Twitter Bootstrap with npm

```
$ npm install bootstrap --save
```

## 11.5 Sample package.json

After installing bootstrap and saving it, `package.json` will look something like this:

```js
{
  "name": "kl-wordwrap",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bootstrap": "^3.3.6"
  }
}
```

The really cool thing about this file is that you can save all the dependencies your custom theme needs to github and then when you, or someone else, clones it to another computer, it can easily install all your application dependencies with this simple command:

```
$ npm install
```

**What is an application dependency?**
If your site is using `jQuery` and `bootstrap`, they are application dependencies and you would have to manually download them every time you clone the site. You don't want to add `jQuery` and `bootstrap` to git (and github) because you are not maintaining these files. But you do need these files for your site to work. So the modern workflow for web developers is to add `node_modules` to your .gitignore file in `git` and then they won't be in your git or github repositories. But when you clone them you can easily (and quickly) add them with `$ npm install`. This is an advanced topic that may confuse you but it is just introduced here to simple introduce you to a very important web development tool.

## 12. Hooks in WordPress

There will be times where you need to inject code at a certain part of your custom theme. That is where hooks come in. In a standard static HTML site, you would put LINK elements to point to your CSS. In WordPress we use the `wp_head()` **hook** to inject the CSS we have line up (or a better WordPress word to use here would be **enqueued**). Once you do this and view your WordPress site, you will see that the CSS from Twitter Bootstrap's Jumbo sample page is now working.

In `header.php` add this php to just before closing HEAD element

```php
<?php wp_head(); ?>
</head>
```

## 13. View Source Code

### 404 Errors

Right click on the page and `View Page Source`. This will let you see if the hook is working. Our Bootstrap Jumbotron code still has some static links. Check out all these broken 404 pages. It means we requested the page from the server and the server tells us that it has no idea what we are talking about because the files we requested do not exist on the server.

Here are some 404 errors when we use the Console in Google Chrome (shortcut to open is `cmd`+`option`+`j`)

![404 errors](https://i.imgur.com/6RW0uHc.png)

You will see that `bootstrap.min.css` is included
![our hook is working](https://i.imgur.com/3jC4etb.png)

* Delete unused old link to `bootstrap.min.css`

## 14. Add our style.css using our functions.php page
What about link to `jumbotron.css`? How can we add that?

On the original static source if you click on the link it will take you to jumbotron.css and show you this code:

```css
/* Move down content because we have a fixed navbar that is 50px tall */
body {
  padding-top: 50px;
  padding-bottom: 20px;
}
```

Copy that code and put it at the bottom of `style.css`

To enqueue it (add it to our list of needed css files) just adjust our `functions.php` file to look like the following:

```php
<?php
function theme_styles() {
    wp_enqueue_style( 'bootstrap_css', get_template_directory_uri() . '/css/bootstrap.min.css' );
    wp_enqueue_style( 'main_css', get_template_directory_uri() . '/style.css'); 
}
add_action( 'wp_enqueue_scripts', 'theme_styles' );
?>
```

**Notice** we just add another **wp_enqueue_style()** call but this time we point to our custom theme `style.css`

View our source for our WordPress site and you'll see the style code is working. Delete the static reference to 

```html
    <!-- Custom styles for this template -->
    <link href="jumbotron.css" rel="stylesheet">
```

#### wp_enqueue_style('name', path to file)

The first parameter is just an internal name WordPress uses
The second parameter concatenates a cool `get_template_directory_uri()` function that has the ability to point us the active theme and then we concatenate the rest of the path from inside the custom theme folder.

If you view the source you should now see that our custom theme `style.css` file is now there:

![style.css in source code](https://i.imgur.com/9QSoFEG.png)

## 14.1 Adding Custom CSS

Add a new file inside our `css` folder

```
$ touch css/ie10-viewport-bug-workaround.css
```

This is another file in our sample jumbotron bootstrap template.

In that file grab the code from the original static template:

```css
/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*
 * See the Getting Started docs for more information:
 * http://getbootstrap.com/getting-started/#support-ie10-width
 */
@-webkit-viewport { width: device-width; }
@-moz-viewport    { width: device-width; }
@-ms-viewport     { width: device-width; }
@-o-viewport      { width: device-width; }
@viewport         { width: device-width; }
```

Delete the static code from `header.php`

Now your `functions.php` file will look like this:

```php
<?php
function theme_styles() {
    wp_enqueue_style( 'bootstrap_css', get_template_directory_uri() . '/node_modules/bootstrap/dist/css/bootstrap.min.css' );
    // IE10 viewport hack for Surface/desktop Windows 8 bug
    wp_enqueue_style( 'ie10fix_css', get_template_directory_uri() . '/css/ie10-viewport-bug-workaround.css');
    wp_enqueue_style( 'main_css', get_template_directory_uri() . '/style.css');
}
add_action( 'wp_enqueue_scripts', 'theme_styles' );
?>
```

Notice I added a comment for good documenation
* the path points to my file inside the `css` folder.

## 15. Fonts with Bootstrap

Make sure fonts that came with bootstrap are linked correctly

* copy bootstrap `fonts` folder and paste into bootstrap theme
    * search bootstrap.min.css for `Glyph` and you will see the links are to ../fonts/glyph...
    * if you keep fonts an css as sibling directories than all is well, if you move fonts directory somewhere else, you have to update the path
* Delete header.php debugging comment

```html
<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>
```

## 16. HTML5 shim and Respond.js IE8 support - how we add in WP
In `footer.php` we are linking to `jQuery` and `bootstrap.js`

**Important** WordPress has jQuery built in

`functions.php`

```php
/* css function here */

function theme_js() {
    global $wp_scripts;

    wp_register_script( 'html5_shiv', 'http://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js', '', '', false);
    wp_register_script( 'respond_js', 'http://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js', '', '', false);

    $wp_scripts->add_data( 'html5_shiv', 'conditional', 'lt IE 9' );
    $wp_scripts->add_data( 'respond_js', 'conditional', 'lt IE 9' );

}

add_action( 'wp_enqueue_scripts', 'theme_js' );

```

Here we are adding JavaScript that will only be used if we have an IE browser that is less than `IE9`

So WordPress gives us a global variable calle $wp_scripts and we use that class and it's add_data() method to called both of these javascript files on the condition that IE is version that is less than 9. More more modern browsers will never see this code.

## 17. Adding other JavaScript files using functions.php

`functions.php`

You'll see this is very similar to what we did with CSS but here we use the `wp_enqueue_script` which has a few different parameters

### Important Parameters in wp_enqueue_script()
* The 3rd parameter allows us to include dependencies this JavaScript file needs. It can just be one file (like jQuery) or more than one file.
* The last parameter is boolean which enable you to have the JavaScript file in the HEAD element of our `header.php` (false) or in the footer.php file just before the closing `</body>` tag (true).

```php
/* our css enqueues here */

function theme_js() {
    global $wp_scripts;

    wp_register_script( 'html5_shiv', 'http://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js', '', '', false);
    wp_register_script( 'respond_js', 'http://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js', '', '', false);

    $wp_scripts->add_data( 'html5_shiv', 'conditional', 'lt IE 9' );
    $wp_scripts->add_data( 'respond_js', 'conditional', 'lt IE 9' );

    wp_enqueue_script( 'bootstrap_js', get_template_directory_uri() . '/node_modules/bootstrap/dist/js/bootstrap.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'ie10_js', get_template_directory_uri() . '/js/ie10-viewport-bug-workaround.js', array('jquery'), '', true );
}

add_action( 'wp_enqueue_scripts', 'theme_js' );


?>
```

## 18. Another hook - wp_footer()

View source and you won't see included `bootstrap.min.js` in footer
because you forgot to include the footer hook

`footer.php` 

```php
[more code here]
<?php wp_footer(); ?>

 </body>
</html>
```

### Delete JavaScript static code

```html
 <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="../../dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
```

**Note** I create a new file inside `js` with the ie10 fix

```
$ touch js/ie10-viewport-bug-workaround.js
```

`js/ie10-viewport-bug-workaround.js`

```js
/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

// See the Getting Started docs for more information:
// http://getbootstrap.com/getting-started/#support-ie10-width

(function () {
  'use strict';

  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.querySelector('head').appendChild(msViewportStyle)
  }

})();
```

## 19. WordPress filters

### Hide admin bar

Sometimes when you are logged in, the WordPress Admin CSS gets in your way. You have the ability to override it.

`functions.php`

```php
add_filter( 'show_admin_bar' '__return_false' );
```

This is a simple filter that hides the admin bar

## 20. WordPress body_class()

This is a very powerful dynamic function that generates a bunch of classes inside the BODY element. You can use these classes to style a WordPress page the way you want depending on the situation.

`header.php`

If you add the following code and then view the source code, you'll see a bunch of classes have been added to the body.

```php
<body <?php body_class(); ?>>
<!-- rest of code -->
```

![body class php function output](https://i.imgur.com/5SljR6O.png)

### Push down the admin bar when logged in

`style.css`

Add this underneath our existing code

```css
.admin-bar .navbar-fixed-top {
    margin-top: 30px;
}
```

## 21. Menus

`functions.php`

* add to bottom 

```php
add_theme_support( 'menus' );

function register_theme_menus() {
    register_nav_menus(
      array(
        'header-menu' => __( 'Header Menu' )
      )
    );
}
add_action( 'init', 'register_theme_menus' );
?>
```

### Create 3 pages in Dashboard

We'll create these pages but we won't be able to view them. The reason is because of WordPress' hierarchy. But we will at least be able to get our menu to work.

* Home
* Sample Page
* Blog

note: delete the Home page with a custom link in the WordPress Admin

![Menu Dashboard](https://i.imgur.com/LtUqqox.png)

### Delete Form

`header.php`

```html
<form class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
```

## 22. WordPress bloginfo()
In Dashboard, Menus, Create menu, choose Header Menu as theme location
in source code change blog name `header.php` to

```
...<a class="navbar-brand" href="<?php bloginfo( 'url'); ?>"><?php bloginfo( 'name'); ?></a>...
```

## 23. wp_nav_menu()

`header.php`

```php
<div id="navbar" class="navbar-collapse collapse">
 <?php
  $args = array(
   'menu'    => 'header-menu',
   'menu_class' => 'nav navbar-nav',
   'container' => 'false'
  );
  wp_nav_menu( $args );
 ?>
</div>
```

* check out [wp_nav_menu()](https://developer.wordpress.org/reference/functions/wp_nav_menu/) on codex
* check out and see pages are showing on nav
* set front page as Home and Blog as Blog page

`style.css`

This will highlight the currently selected page in WordPress. Twitter bootstrap uses different CSS for an active page and this shows you how to alter this code using what class WordPress uses for the current page.

```css
.current-menu-item > a {
    background: #000;
}
```

## 23.1 Permalinks

This a great feature of WordPress that will greatly improve your SEO with just a few clicks. It makes your URL much more SEO friendly.

* How to change them in the Dashboard
* Improves SEO

Before Permalinks

![Before Permalinks](https://i.imgur.com/zukfE79.png)

After Permalinks

![After Permalinks](https://i.imgur.com/gRCsfkk.png)

## 24. Dropdown Navigation

Create a new Page `Page With Sidebar`
Before Publishing it, give it a parent of `Sample Page`
Create another Page `Full Width Page`, give it a parent of `Sample Page` and Publish.
Go into Menu and add those pages underneath `Sample Page` like this:
* Make sure to click `Save Menu`

![Drop Down Setup](https://i.imgur.com/uynTpCC.png)

Our dropdown CSS is not what we want

![bad styled dropdown](https://i.imgur.com/OiwopBB.png)

`style.css`

```css
@media (min-width: 768px) {
    .sub-menu {
        display: none;
        position: absolute;
        background: #222;
        padding: 10px 15px;
        width: 200px;
    }

    li:hover .sub-menu {
        display: block
    }
}

.sub-menu li {
    margin-bottom: 10px;
    list-style: none;
}
```

## 25. Check if Navbar is responsive

## 26. Install Bootstrap Shortcodes
* [link](https://wordpress.org/plugins/bootstrap-shortcodes/)
* Kevin Attfield
* Install and Activate
* view page and you'll see shortcodes in editor

# WordPress Notes

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)
* [part 5](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-5.md)
