# Bootstrap & WordPress

1. Install WordPress locally
2. [Download Bootstrap](http://getbootstrap.com/getting-started/)
3. Create new custom theme
    * `wp-content/themes/wp-bootstrap`
4. Add folder to project in Sublime Text
    * save project as and create CORE and wp-bootstrap project folders
5. Add these files to your custom theme folder
    * style.css
    * functions.php
    * header.php
    * index.php
    * style.css
    * [screenshot.png](https://themes.trac.wordpress.org/ticket/27213)
6. Add special css comment to style.css

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

7. In WP Dashboard, select our new custom theme
    * site will be blank

8. [Our BS template](http://getbootstrap.com/examples/jumbotron/)
    * copy source to index.php
        - css links won't work
9. Break up our page into pieces
    * in index.php, cut html5 doctype to close of navigation tag and put inside `header.php`
    * replace cut code in index.php with the following PHP code:

```php
<?php get_header(); ?>
```

    * view page in browser to test if header include is working

10. in index.php cut HR element to end of HTML and paste into footer.php
    * replace cut code in index.php with the following PHP code:

```php
<?php get_footer(); ?>
```

    * view page in browser to test if footer include is working

11. create css folder and put bootstrap.min.css inside it
12. Add this to functions.php

functions.php

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
