# Front End With Ajax when working with plugins

```php
function wpkingluddite_badges_refresh_profile() {

  $options = get_option( 'wpkingluddite_badges' );
  $last_updated = $options['last_updated'];

  $current_time = time();

  $update_difference = $current_time - $last_updated;

  // # seconds in day
  if ( $update_difference > 86400 ) {

    $wpkingluddite_username = $options['wpkingluddite_username'];

    $options['wpkingluddite_profile'] = wpkingluddite_badges_get_profile( $wpkingluddite_username );
    $options['last_updated'] = time();

    update_option( 'wpkingluddite_badges', $options );

  }
  // let's ajax know when entire function has completed
  die();
}

add_action( 'wp_ajax_wpkingluddite_badges_refresh_profile', 'wpkingluddite_badges_refresh_profile' );
```

Next part

```php
function wpkingluddite_badges_enable_frontend_ajax() {
?>
  <script>
   var ajaxURL = '<?php echo admin_url('admin-ajax.php'); ?>';
  </script>
<?php
}

add_action( 'wp_head', 'wpkingluddite_badges_enable_frontend_ajax' );
```

* break up `php` so we can write HTML inside our function
* the script tag will echo out the correct url to the admin-ajax.php file
* the add action will hook into the head part of our page and call the function which will output the script tag.
* view a page and check the source and you should see the link to admin-ajax.php

![admin-ajax.php](https://i.imgur.com/JnBYB0Y.png)

add this to your plugin js file

```js
jQuery(document).ready(function($){

    $('.wpkingluddite-badge').hover(function() {
        $(this).find('.wpkingluddite-badge-info').stop(true, true).fadeIn(200);
    }, function() {
        $(this).find('.wpkingluddite-badge-info').stop(true, true).fadeOut(200);
    });

    $.post(ajaxURL, {

       action: 'wpkingluddite_badges_refresh_profile'

    }, function ( response ) {

       console.log( 'AJAX complete' );

    });

});
```

view in browser
open inspector
refresh page
you should see this

![Ajax Complete](https://i.imgur.com/BENzBCD.png)

seach in phpMyAdmin wp_options table for `wpkingluddite_badges`
(if you have millions of records this is a huge time saver)
scroll all the way to bottom (expand as it's big)
you will see something liek this

![last_updated](https://i.imgur.com/oGpuBV5.png)
if we edit and manually change last_updated time and then refresh our page, the db should update this table with the new time.

try it

in production you should remove the ajax function's console log of 'Ajax complete'

## Readme.txt
store screenshots in a folder called `assets` name them screenshots-1.png to screenshots-8.png

descriptions match your number in the text file under == Screenshots ==

[WordPress example code for Readme.txt](https://wordpress.org/plugins/about/readme.txt)

Validate your Readme.txt [link](https://wordpress.org/plugins/about/validator/)




