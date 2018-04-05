# Menus in WordPress
* You have choices when making menus
* You can do it the simple way for a basic Menu that builds on your existing pages in WordPress
* Or you can create a custom menu that shows certain pages that you choose
* You also need to select a location
* Or you can create a complex navigation using Twitter Bootstrap with the Walker class.

### Create pages in Dashboard
* We'll create these pages but we won't be able to view them
* The reason is because of WordPress' **hierarchy**
* But we will at least be able to get our menu to work

#### Here are the pages we will create
* Home
* Sample Page (Exists by default)
* Blog
* About
* Contact

## Delete the Home page and create your own `Home` page

![Menu Dashboard](https://i.imgur.com/LtUqqox.png)

## Simple Menu
* Let's start with a simple menu
* This is a multi-step process

### Steps
1. Create your pages in WordPress that you want to be in your navigation
  * Let's say for the sake of simplicity you create three pages `home`, `about`, `contact`.
2. Add this code to your `functions.php`

`functions.php`

```php
// MORE CODE
/**
 *
 * Add Menu
 *
 */

add_theme_support( 'menus' );

function domsters_register_menu() {
  register_nav_menu( 'main-menu', __( 'Main Menu' ) );
}

add_action( 'init', 'domsters_register_menu' );
```

3. In the WP Dashboard, you select `Menus`
4. Create a New Menu by clicking `create a new menu`
5. Give it a name: Let's call it 'Primary'
6. Drag and drop your pages to your new `Primary` window
7. Then click `Save Menu`
5. Choose the location by selecting the `Main Menu`
6. Add your navigation to your code
7. For my simple navigation, I am adding it to the `header.php`
8. Drop this code inside `header.php`

**note** You may have to change some of the values of the array properties depending on the structure of your navigation.

`header.php`

```php
// MORE CODE
<body <?php body_class(); ?>>
    <div id="header">
        <img src="images/logo.gif" alt="Jay Skript and the Domsters" />
    </div>
<!-- <div id="navigation">
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="photos.html">Photos</a></li>
        <li><a href="live.html">Live</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</div> -->

  <?php
  $defaults = array(
    'theme_location'  => 'main-menu',
    'menu'            => '',
    'container'       => 'nav',
    'container_class' => '',
    'container_id'    => '',
    'menu_class'      => 'main-nav',
    'menu_id'         => '',
    'echo'            => true,
    'fallback_cb'     => 'wp_page_menu',
    'before'          => '',
    'after'           => '',
    'link_before'     => '',
    'link_after'      => '',
    'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
    'depth'           => 0,
    'walker'          => ''
  );
  wp_nav_menu( $defaults );
   ?>
```

* Check out [wp_nav_menu()](https://developer.wordpress.org/reference/functions/wp_nav_menu/) on codex
* Check out the site in your browser and see pages are showing on `nav`
* If you want, use the Dashboard to set **front page** as Home and Blog as **Blog page** (Assuming you created those pages)

### Menus - The WP-CLI way!
[Making Menus using WP-CLI docs](https://wp-cli.org/commands/menu/)
* This is another way to create a menu but this way will save you time
* First check what your current menus look like.

`$ wp menu list`

* You will see a table displaying what your current menu list looks like.

### Create a new menu
```
$ wp menu create "Primary"
```

* That's it
* You created a menu!

##### List existing menus
`$ wp menu list`

```
+---------+---------+---------+-----------+-------+
| term_id | name    | slug    | locations | count |
+---------+---------+---------+-----------+-------+
| 7       | Primary | primary |           | 0     |
+---------+---------+---------+-----------+-------+
```

**note** The `id` will be different when you create yours

##### Create a new menu link item
* You can make your own menu links

`$ wp menu item add-custom primary Apple http://apple.com`

##### Custom Menu items
* View the current items in your menu

`$ wp menu item list primary`

```
+-------+--------+-------+------------------+----------+
| db_id | type   | title | link             | position |
+-------+--------+-------+------------------+----------+
| 67    | custom | Apple | http://apple.com | 1        |
+-------+--------+-------+------------------+----------+
```

#### Menu locations
* To create a location for you menu, you need to drop this code into your theme's `functions.php`

`functions.php`

```php
/*=============================
=            Menus            =
=============================*/
add_theme_support( 'menus' );

function domsters_register_menu() {
  register_nav_menu('main-menu', __( 'Main Menu') );
}

add_action('init', 'domsters_register_menu');
```

* In this example we are calling the location `main-menu`
* If you look at your WordPress Admin panel (ie WP Dashboard)
* and under `Appearance > Menus`, you will see the custom link you added with WP-CLI
* You now will see a location of `Main Menu`.

#### Choose Pages for menu items
1. In the WP Dashboard, select the `Secondary` menu from the dropdown and click `Select`
2. Click checkboxes of Pages you want to add to the menu and click `Add to Menu`
3. Drag to organize your menu items in the order you want
4. Click `Save Menu`.

#### Assign our menu "Primary" to the `main-menu` location
`$ wp menu location assign secondary main-menu`

#### Check if location assignment is correct
`$ wp menu list`

### The Walker Class
* If you want to plug the Bootstrap 4 menu into WordPress, it won't be straightforward but it is possible
* Walker Class notes - walker-class.md
* You can add a menu using the dashboard

## WordPress `bloginfo()`
* This is a special WordPress PHP function that gives us access to info about our site
* Instead of having our link to our home page hardcoded we can use `bloginfo()` to give us the correct URL

`header.php`

```php
...<a class="navbar-brand" href="<?php bloginfo( 'url'); ?>"><?php bloginfo( 'name'); ?></a>...
```

### How can I highlight the current page?
* Great to let the user know what page they are on
* This will highlight the selected page in WordPress
* Twitter Bootstrap uses different CSS for an active page
* And this shows you how to alter this code using what class WordPress uses for the current page

`style.css`

```css
.current-menu-item > a {
    background: #000;
}
```
