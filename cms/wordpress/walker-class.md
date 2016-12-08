# Walker class
Note. This will be a bit buggy if you use this with Bootstrap 4. Be forewarned.

This part is in a little transition because the walker class was for Bootstrap 3 and we need to find code that was updated to Bootstrap 4. [A developer forked](https://github.com/sebakerckhof/wp-bootstrap-navwalker/blob/580e114965778a495464c6755a202c07cdbbb58d/README.md) the code and updated it but the pull request has yet to be merged.

## wp_bootstrap_navwalker.php

[Here is the current code](https://github.com/sebakerckhof/wp-bootstrap-navwalker/blob/580e114965778a495464c6755a202c07cdbbb58d/wp_bootstrap_navwalker.php). 

Create a file called `wp_bootstrap_navwalker.php` and add the current code to it.

`functions.php`

* Add this code to the top of your `functions.php`

```php
<?php
// Register Custom Navigation Walker
require_once('wp_bootstrap_navwalker.php');
/* menus */
add_theme_support( 'menus' );
function register_theme_menus() {
    register_nav_menus(
      array(
        'primary' => __( 'Primary', 'thunder-tube-theme' )
      )
    );
}
add_action( 'init', 'register_theme_menus' );
/* add css */
```

### Add your menu to `header.php`
`wp_nav_menu()` - Check the WordPress codex for more info.

`header.php`

```php
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Jumbotron Template for Bootstrap</title>

    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>


      <a class="navbar-brand" href="#">Project name</a>
      <?php
            wp_nav_menu( array(
                'menu'              => 'primary',
                'theme_location'    => 'primary',
                'depth'             => 2,
                'container'         => 'nav',
                'container_class'   => 'navbar navbar-static-top navbar-dark bg-inverse',
        'container_id'      => 'bs-example-navbar-collapse-1',
                'menu_class'        => 'nav navbar-nav',
                'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
                'walker'            => new wp_bootstrap_navwalker())
            );
        ?>
```

That should get you started. Happy troubleshooting!



