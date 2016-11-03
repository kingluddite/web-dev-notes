# Settings Page

useful plugin - 
[backupwordpress](https://wordpress.org/plugins/backupwordpress/)

We namespace our plugin folder and file names to prevent conflict with other plugins.

Inside your `plugins` folder create a new folder
namespace your plugin folder name
`wpkingluddite-badges`

first file `wpkingluddite-badges.php`
name with same name as our folder

[plugin header](https://developer.wordpress.org/plugins/the-basics/header-requirements/)

```php
<?php
/*
Plugin Name: Kingluddite Badges Plugin
Description: Practice building plugin
Version:     1.0
Author:      PEH2
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/
?>
```

* wordpress and most plugins in WordPress directory use GPL2 license

add function that enables us to add a link

```php
<?php
/*
Plugin Name: Kingluddite Badges Plugin
Description: Practice building plugin
Version:     1.0
Author:      PEH2
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

function wpkingluddite_badges_menu() {
    /*
     * Use the add_options_page function
     * add_options_page( $page_title, $menu_title, $capability, $menu-slug, $function )
     */

    add_options_page(
      'Kingluddite Badges Plugin',
      'Kingluddite Badges',
      'manage_options',
      'wpkingluddite-badges',
      'wpkingluddite_badges_options_page'
    );
}
add_action( 'admin_menu', 'wpkingluddite_badges_menu' );

function wpkingluddite_badges_options_page() {
    if ( !current_user_can( 'manage_options' ) ) {
        wp_die( 'You do not have sufficient permissions to access this page');
    }

    echo '<p>Welcome to our plugin page!</p>';
}
?>
```

check your plugins page and you'll see something like this

![badge plugin](https://i.imgur.com/kvIXFqZ.png)
* you could have links to the person that created the site
* and the link to the plugin page

activate plugin
once you do that you'll see our link under kingluddite badges
![our new menu item in dashboard](https://i.imgur.com/iYbG7NB.png)

But it doesn't have too much stuff inside it yet
![bare plugin](https://i.imgur.com/zSXf92K.png)

## Add Plugin from Github
* [WordPress Admin Style](https://github.com/bueltge/WordPress-Admin-Style)

1. Download zip from Github to Downloads
2. Plugins > Add New > Upload Plugin > (point to zip file you just downloaded)
3. Activate
4. [New link in our dashboard](https://i.imgur.com/yMj7yJE.png)

This gives us all the admin styling code we need to lay out our plugin admin dashboard controls.

copy 2 column layout

```php
<h2><?php esc_attr_e( '2 Columns Layout: relative (%)', 'wp_admin_style' ); ?></h2>

<div class="wrap">

    <h1><?php esc_attr_e( 'Heading String', 'wp_admin_style' ); ?></h1>
    <div id="col-container">

        <div id="col-right">

            <div class="col-wrap">
                <?php esc_attr_e( 'Content Header', 'wp_admin_style' ); ?>
                <div class="inside">
                    <p><?php esc_attr_e( 'WordPress started in 2003 with a single bit of code to enhance the typography of everyday writing and with fewer users than you can count on your fingers and toes. Since then it has grown to be the largest self-hosted blogging tool in the world, used on millions of sites and seen by tens of millions of people every day.', 'wp_admin_style' ); ?></p>
                </div>

            </div>
            <!-- /col-wrap -->

        </div>
        <!-- /col-right -->

        <div id="col-left">

            <div class="col-wrap">
                <?php esc_attr_e( 'Content Header', 'wp_admin_style' ); ?>
                <div class="inside">
                    <p><?php esc_attr_e( 'Everything you see here, from the documentation to the code itself, was created by and for the community. WordPress is an Open Source project, which means there are hundreds of people all over the world working on it. (More than most commercial platforms.) It also means you are free to use it for anything from your cat’s home page to a Fortune 500 web site without paying anyone a license fee and a number of other important freedoms.', 'wp_admin_style' ); ?></p>
                </div>
            </div>
            <!-- /col-wrap -->

        </div>
        <!-- /col-left -->

    </div>
    <!-- /col-container -->

</div> <!-- .wrap -->
```

## create `inc` folder in `wpkingluddite-badges` plugin folder

inside `inc`
save `options-page-wrapper.php`
paste in code we copied for 2 column layout

change our function to:

`wpkingluddite-badges.php`

```php
function wpkingluddite_badges_options_page() {
    if ( !current_user_can( 'manage_options' ) ) {
        wp_die( 'You do not have sufficient permissions to access this page');
    }

    // notice this is a relative link
    require( 'inc/options-page-wrapper.php' );
}
```

No check out your plugin page in the Dashboard and you'll see 2 columns

## Add content for plugin
tables are usually used to layout forms in WordPress

table code

```php
<h2><?php esc_attr_e( 'Tables', 'wp_admin_style' ); ?></h2>

<p><strong>Table with class <code>form-table</code></strong></p>
<table class="form-table">
    <tr>
        <th class="row-title"><?php esc_attr_e( 'Table header cell #1', 'wp_admin_style' ); ?></th>
        <th><?php esc_attr_e( 'Table header cell #2', 'wp_admin_style' ); ?></th>
    </tr>
    <tr valign="top">
        <td scope="row"><label for="tablecell"><?php esc_attr_e(
                    'Table data cell #1, with label', 'wp_admin_style'
                ); ?></label></td>
        <td><?php esc_attr_e( 'Table Cell #2', 'wp_admin_style' ); ?></td>
    </tr>
    <tr valign="top" class="alternate">
        <td scope="row"><label for="tablecell"><?php esc_attr_e(
                    'Table Cell #3, with label and class', 'wp_admin_style'
                ); ?> <code>alternate</code></label></td>
        <td><?php esc_attr_e( 'Table Cell #4', 'wp_admin_style' ); ?></td>
    </tr>
    <tr valign="top">
        <td scope="row"><label for="tablecell"><?php esc_attr_e(
                    'Table Cell #5, with label', 'wp_admin_style'
                ); ?></label></td>
        <td><?php esc_attr_e( 'Table Cell #6', 'wp_admin_style' ); ?></td>
    </tr>
</table>
```

We just want a form with 2 input fields so convert the above to this:

```php
<table class="form-table">
    <tr>
        <td><label for="wpkingluddite_username">Kingluddite Username</label></td>
        <td><input type="text" name="wpkingluddite_username" id="wpkingluddite_username" value="" class="regular-text" /></td>
    </tr>
</table>
```

Add input fields using admin style plugin

[will look like this](https://i.imgur.com/uPPmbXK.png)

moving stuff around

```php
<h2><?php esc_attr_e( 'Kingluddite Badges Plugin', 'wp_admin_style' ); ?></h2>

<div class="wrap">
    <h1><?php esc_attr_e( 'Let\'s Get Started', 'wp_admin_style' ); ?></h1>
    <div id="col-container">
        <div id="col-right">
            <div class="col-wrap">
                <?php esc_attr_e( 'User Info', 'wp_admin_style' ); ?>
                <div class="inside">
                    <table class="form-table">
    <tr>
        <td><label for="wpkingluddite_username">Kingluddite Username</label></td>
        <td><input type="text" name="wpkingluddite_username" id="wpkingluddite_username" value="" class="regular-text" /></td>
    </tr>
</table>
                </div>
            </div>
            <!-- /col-wrap -->
        </div>
        <!-- /col-right -->
        <div id="col-left">
            <div class="col-wrap">
                <?php esc_attr_e( 'Let\'s Get Started', 'wp_admin_style' ); ?>
                <div class="inside">
                </div>
            </div>
            <!-- /col-wrap -->
        </div>
        <!-- /col-left -->

    </div>
    <!-- /col-container -->

</div> <!-- .wrap -->
```

* no form tag yet
* no submit button yet

```php
<form method="post" action="">
                        <table class="form-table">
                            <tr>
                                <td><label for="wpkingluddite_username">Kingluddite Username</label></td>
                                <td><input type="text" name="wpkingluddite_username" id="wpkingluddite_username" value="" class="regular-text" /></td>
                            </tr>
                        </table>
                        <p>
                            <input class="button-primary" type="submit" name="wpkingluddite_username_submit" value="<?php esc_attr_e( 'Save' ); ?>" />
                        </p>
                    </form>
```

[so far we have this](https://i.imgur.com/3LLLdBM.png)
* form does not submit yet

## add another box for badges

```php
</div><!-- END .inside -->
                <?php esc_attr_e( 'Most Recent Badges', 'wp_admin_style' ); ?>
                <div class="inside">
                  <p>You have 10 badges.</p>
                </div>
```

add `img` folder

find 5 girl scout images 100x100 px and add them inside your `img` folder


## Global variables in plugins
### link to image inside plugins

Add a comment above `wpkingluddite_badges_menu()`

```
/*
 * Add a link to our plugin in the admin menu
 * under 'Settings > Kingluddite Badges'
 */
```

copy that comment and alter it so that it reads:

```
/*
 * Assign global variables
 */

$plugin_url = WP_PLUGIN_URL . '/wpkingluddite-badges';
```

`WP_PLUGIN_URL` - WordPress constant that points to our `plugins` folder

Now we alter this file `wpkingluddite-badges.php`

```php
function wpkingluddite_badges_options_page() {
    if ( !current_user_can( 'manage_options' ) ) {
        wp_die( 'You do not have sufficient permissions to access this page');
    }
    
    // we pull in our global variable
    // so we can use it in options-page-wrapper.php
    global $plugin_url;

    require( 'inc/options-page-wrapper.php' );
}
```

finished

```php
<?php
/*
Plugin Name: Kingluddite Badges Plugin
Description: Practice building plugin
Version:     1.0
Author:      PEH2
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

/*
 * Assign global variables
 */

$plugin_url = WP_PLUGIN_URL . '/wpkingluddite-badges';

/*
 * Add a link to our plugin in the admin menu
 * under 'Settings > Kingluddite Badges'
 */

function wpkingluddite_badges_menu() {
    /*
     * Use the add_options_page function
     * add_options_page( $page_title, $menu_title, $capability, $menu-slug, $function )
     */

    add_options_page(
      'Kingluddite Badges Plugin',
      'Kingluddite Badges',
      'manage_options',
      'wpkingluddite-badges',
      'wpkingluddite_badges_options_page'
    );
}
add_action( 'admin_menu', 'wpkingluddite_badges_menu' );

function wpkingluddite_badges_options_page() {
    if ( !current_user_can( 'manage_options' ) ) {
        wp_die( 'You do not have sufficient permissions to access this page');
    }

    // we declare this as a global variable
    // so we can use it in options-page-wrapper.php
    global $plugin_url;

    require( 'inc/options-page-wrapper.php' );
}
?>
```

`options-page-wrapper.php`

```php
<h2><?php esc_attr_e( 'Kingluddite Badges Plugin', 'wp_admin_style' ); ?></h2>

<div class="wrap">

    <h1><?php esc_attr_e( 'Let\'s Get Started', 'wp_admin_style' ); ?></h1>
    <div id="col-container">

        <div id="col-right">

            <div class="col-wrap">
                <?php esc_attr_e( 'User Info', 'wp_admin_style' ); ?>
                <div class="inside">
                    <form method="post" action="">
                        <table class="form-table">
                            <tr>
                                <td><label for="wpkingluddite_username">Kingluddite Username</label></td>
                                <td><input type="text" name="wpkingluddite_username" id="wpkingluddite_username" value="" class="regular-text" /></td>
                            </tr>
                        </table>
                        <p>
                            <input class="button-primary" type="submit" name="wpkingluddite_username_submit" value="<?php esc_attr_e( 'Save' ); ?>" />
                        </p>
                    </form>
                </div><!-- END .inside -->
                <?php esc_attr_e( 'Most Recent Badges', 'wp_admin_style' ); ?>
                <div class="inside">
                  <p>You have 10 badges.</p>
                </div>
                <ul class="wpkingluddite-badges">
                    <?php for( $i = 0; $i < 20; $i++ ): ?>
                    <li>
                        <ul>
                            <li><img width="100px" src="<?php echo $plugin_url . '/img/blue-badge.png'; ?>" alt="blue badge"></li>
                            <li class="wpkingluddite-badge-name">
                                <a href="#">Badge Name</a>
                            </li>
                            <li class="wpkingluddite-project-name">
                                <a href="#">Project Name</a>
                            </li>
                        </ul>
                    </li>
                <?php endfor; ?>
            </ul>
            </div>
            <!-- /col-wrap -->

        </div>
        <!-- /col-right -->

        <div id="col-left">

            <div class="col-wrap">
                <?php esc_attr_e( 'Let\'s Get Started', 'wp_admin_style' ); ?>
                <div class="inside">
<p><img class="wpkingluddite-gravatar" width="100%" src="<?php echo $plugin_url . '/img/darth-vader.jpg'; ?>" alt="Darth Vader"></p>
                    <ul class="wpkingluddite-badges-and-points">
                        <li>Badges: <strong>100</strong></li>
                        <li>Points: <strong>20000</strong></li>
                    </ul>
                </div><!-- END .inside -->
            </div>
            <!-- /col-wrap -->

        </div>
        <!-- /col-left -->

    </div>
    <!-- /col-container -->

</div> <!-- .wrap -->
```

finished - [looks something like this](https://i.imgur.com/QLCGuOv.png)

[Adam Brown WordPress hook directory](http://adambrown.info/p/wp_hooks/hook)

Add styles to plugin

append this to `wpkingluddite-badges.php`

```php
function wpkingluddite_badges_styles() {
  wp_enqueue_style( 'wpkingluddite_badges_styles', plugins_url( 'wpkingluddite-badges/wpkingluddite-badges.css' ) );
}
add_action( 'admin_head', 'wpkingluddite_badges_styles' );
```

create `wpkingluddite-badges.css`

```css
h2 {
    color: green;
}
p {
    color: blue;
}
```

You will now see styles in your plugin.

## Make our form work in WordPress

Notes with WordPress and Forms:
* With WordPress we use the `POST` format

`options-page-wrapper.php`

modify top of form so it looks like this:

```html
<form name="wpkingluddite_username_form" method="post" action="">
                    <input type="hidden" name="wpkingluddite_form_submitted" value="Y">
```

### Test if form works

`wpkingluddite-badges.php`

```php
[code here]
global $plugin_url;

    // was form submitted
    if ( isset( $_POST['wpkingluddite_form_submitted'] ) ) {
    // store and clean value
    $hidden_field = esc_html( $_POST['wpkingluddite_form_submitted'] );
    // check if 'Y'
    if( $hidden_field == 'Y' ) {
        // store and clean username
        $wpkingluddite_username = esc_html( $_POST['wpkingluddite_username'] );
        // test if username was stored
        echo $wpkingluddite_username;
    }
```

Refresh Dashboard
Enter Name
Click `Submit` button
[Do you see name in top write of Dashboard?](https://i.imgur.com/dA5JdTv.png) Yes = Success

But if you refresh, the value is gone because it has not been saved to the database.

Only show data when username is submitted (conditionals)


```php
//before form
<?php if( !isset( $wpkingluddite_username ) || $wpkingluddite_username == '' ): ?>
// form
// after .inside closes
<?php else: ?>
// for loop
// after inside closes
<?php endif; ?>
```

Now you show badges if username submitted and won't if not.

Display profile info if username is set and it is not empty

```php
<?php if( isset( $wpkingluddite_username ) || $wpkingluddite_username != '' ): ?>
profile
<?php endif; ?>
```

## Storing in the WordPress `options` database table

optons table has 4 fields
option_id (autoincrement)
option_name (takes a unique name so we can easily find)
option_value (this is the plugin information we want to save)
autoload (default value = yes ( info will be available as soon as WordPress runs))

what do we want to store
* username
* profile feed
* last updated

do we store each item in each field or do we store items in an array as a single entry (latter is better option)

MySQL does not accept arrays as a format so we'll have to serialize an array into a string

normal php array

```php
options = array( 'username', 'profile_feed', 'last_updated');
```

serialized array (same data as above, but it's just converted into a string)
```php
a:3:{i:0;s:8:"username";i:1;s:12:"profile_feed";i:2;s:12:"last_updated";}
```

* note: `a:3` (telling us the serialized data is an array)
WordPress will automatically serialize and unserialize our data for us

## CRUD in WordPress

```php
add_option( 'option_name' 'option_value' )
get_option( 'option_name')
update_option( 'option_name' 'option_value' )
delete_option( 'option_name' )
```

add new global variable
```php
$options = array();
```

modify function (The 'U' in Crud)

```php
function wpkingluddite_badges_options_page() {
    if ( !current_user_can( 'manage_options' ) ) {
        wp_die( 'You do not have sufficient permissions to access this page');
    }

    // we declare this as a global variable
    // so we can use it in options-page-wrapper.php
    global $plugin_url;
    global $options;

    // was form submitted
    if ( isset( $_POST['wpkingluddite_form_submitted'] ) ) {
      // store and clean value
      $hidden_field = esc_html( $_POST['wpkingluddite_form_submitted'] );
      // check if 'Y'
      if( $hidden_field == 'Y' ) {
          // store and clean username
          $wpkingluddite_username = esc_html( $_POST['wpkingluddite_username'] );
         // store username in options array
         $options['wpkingluddite_username']        = $wpkingluddite_username;
         // store time in options array
         $options['last_updated']                  = time();
         // update db with unique name and populate with options array
         update_option( 'wpkingluddite_badges', $options );
      }
  }
  // grab from the options table the value (using unique name) and store in options array
  $options = get_option( 'wpkingluddite_badges' );
  // if array is not empty
  if( $options != '') {
    // store the value in the options db table into a username variable we can use in our required page wrapper in our includes folder
    $wpkingluddite_username = $options['wpkingluddite_username'];
  }

    require( 'inc/options-page-wrapper.php' );
}
```

now you can click on permalinks and come back and the data is still there
but we can't delete it

in sidebar
you can add updated button under profile pic

```php
<li>Points: <strong>20000</strong></li>
                    </ul>
                    <form name="wpkingluddite_username_form" method="post" action="">
                    <input type="hidden" name="wpkingluddite_form_submitted" value="Y">
                        <p>
                            <label for="wpkingluddite_username">Username</label>
                        </p>
                               <p> <input type="text" name="wpkingluddite_username" id="wpkingluddite_username" value="<?php echo $wpkingluddite_username; ?>" />

                            <input class="button-primary" type="submit" name="wpkingluddite_username_submit" value="<?php esc_attr_e( 'Update' ); ?>" />
                        </p>
                    </form>
                </div><!-- END .inside -->
```

enter a blank username and we see it party works but we need to change || to && to remove profile too
```php
<?php if( isset( $wpkingluddite_username ) && $wpkingluddite_username != '' ): ?>
```

* we set the value of the input to our variable populated with data from db

