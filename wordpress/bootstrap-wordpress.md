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

* style.css
* functions.php
* header.php
* footer.php
* index.php (required)
* style.css (required)

[screenshot.png](https://themes.trac.wordpress.org/ticket/27213) - This is a step that let's you show an image of your theme in the Dashboard.

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

In `index.php`, select from the html5 doctype down to the closing NAV element and paste inside `header.php`

### php includes

#### get_header()

If you worked with PHP before you know about includes. It's just a way to include a chunk of code onto another page. `get_header()` will pull into index.php the code inside `header.php`.

Replace cut code in index.php with the following PHP code:

`index.php`

```php
<?php get_header(); ?>
```

View page in browser to test if header include is working

#### get_footer()

In `index.php` select and cut from the HR element to end of the HTML element and paste into `footer.php`.

Replace cut code in `index.php` with the following PHP code:

```php
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

13. add this php to just before header.php closing HEAD element

```php
<?php wp_head(); ?>
```

14. View WP site and view source code
15. You will see that bootstrap.min.css is included
16. Delete unused old link to bootstrap.min.css
17. What about link to jumbotron.css? How can we add that?
    * click in source to see it's css
    * Add that css to our style.css file

```php
<?php
function theme_styles() {
    wp_enqueue_style( 'bootstrap_css', get_template_directory_uri() . '/css/bootstrap.min.css' );
    wp_enqueue_style( 'main_css', get_template_directory_uri() . '/style.css'); 
}
add_action( 'wp_enqueue_scripts', 'theme_styles' );
?>
```

18. Delete hardcoded link to jumbotron.css
19. Make sure fonts that came with bootstrap are linked correctly
20. copy bootstrap `fonts` folder and paste into bootstrap theme
    * search bootstrap.min.css for `Glyph` and you will see the links are to ../fonts/glyph...
    * if you keep fonts an css as sibling directories than all is well, if you move fonts directory somewhere else, you have to update the path
21. Delete header.php debugging comment
22. HTML5 shim and Respond.js IE8 support - how we add in WP
23. in footer.php we are linking to jQuery and bootstrap.js
    * WordPress has jQuery built in

functions.php
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

## what is a hook
change functions.php to this
* remember that WP comes with jQuery pre-installed
* we need to include bootstrap min in WP
```php
/* more code here */

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

View source and you won't see included bootstrap.min.js in footer
because you forgot to include the footer hook

add the footer hook:

footer.php (writer before </body>)
```php
<?php wp_footer(); ?>

 </body>
</html>
```

how to hide admin bar

functions.php

```php
add_filter( 'show_admin_bar' '__return_false' );
```

special body class

```php
<body <?php body_class(); ?>>
<!-- rest of code -->
```

[body class php function output](https://i.imgur.com/5SljR6O.png)

push down the admin bar when logged in

style.css
```css
.admin-bar .navbar-fixed-top {
    margin-top: 30px;
}
```

## Menus

add to bottom of functions.php

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

Create 3 pages in Dashboard
* Home
* Sample Page
* Blog

In Dashboard, Menus, Create menu, choose Header Menu as theme location
in sourcecode change blog name header.php to
```
...<a class="navbar-brand" href="<?php bloginfo( 'url'); ?>"><?php bloginfo( 'name'); ?></a>...
```
* remove login form

inside `collapse section of nav`

```php
<div class="navbar-collapse collapse">
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

* check out wp_nav_menu() on codex
* check out and see pages are showing on nav
* set front page as Home and Blog as Blog page

style.css

```css
.current-menu-item > a {
    background: #000;
}
```
