# Adding Static Menu Items to wp_nav_menu()
* Need to append a static menu item to the end of a `wp_nav_menu()`-powered navigation menu?
* Do this using `wp_nav_menu()`‘s **items_wrap** parameter.

## Steps
1. Create a function that picks apart the default value of **items_wrap** and rebuilds it with a static link
2. Call that function in the **items_wrap** parameter of `wp_nav_menu()`:

`functions.php`

```php
// more code
function my_nav_wrap() {
  // default value of 'items_wrap' is <ul id="%1$s" class="%2$s">%3$s</ul>'

  // open the <ul>, set 'menu_class' and 'menu_id' values
  $wrap  = '<ul id="%1$s" class="%2$s">';

  // get nav items as configured in /wp-admin/
  $wrap .= '%3$s';

  // the static link
  $wrap .= '<li class="social"><a href="https://twitter.com"><i class="fab fa-twitter"></i></a></li><li class="social"><a href="https://facebook.com"><i class="fab fa-facebook"></i></a></li><li class="social"><a href="https://github.com"><i class="fab fa-github"></i></a></li><li class="social"><a href="https://instagram"><i class="fab fa-instagram"></i></a></li>';

  // close the <ul>
  $wrap .= '</ul>';
  // return the result
  return $wrap;
}
// more code
```

`header.php` (or the file you need to add it into)

```php
 <?php
 $defaults = array(
   'theme_location'  => 'main-menu',
   'container'       => 'nav',
   'container_id'    => 'navigation',
   'container_class'    => 'flex-nav',
   'echo'            => true,
   'fallback_cb'     => 'wp_page_menu',
   'items_wrap'      => my_nav_wrap(),
   'depth'           => 0,
 );
 wp_nav_menu( $defaults );
?>
```

