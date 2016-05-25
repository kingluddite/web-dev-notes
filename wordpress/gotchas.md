#WordPress gotchas

## Ack command

Have an error and want to find all occurences in your site?

If you're at all familiar with the command line, this ack command will pinpoint the malformed code:

Here is what I did when I [recently updated to WordPress 4.5 and jquery broke](https://wordpress.org/support/topic/wp-45-and-jquery-syntax-error) my sliders

```
ack "\[href.?=#"
```

Just run that at the root of your site via ssh and it'll find the problems to correct.

## Permissions on Remote

If you use WordMove and get a strange 500 error you may have a permissions problem. Add `perms.php` to your server root and it will give all your folders for WordPress the correct permissions.

perms.php

```php
<?php
file_fix_directory(dirname(__FILE__));
function file_fix_directory($dir, $nomask = array('.', '..')) {
  if (is_dir($dir)) {
     // Try to make each directory world writable.
     if (@chmod($dir, 0755)) {
       echo "<p>Made writable: " . $dir . "</p>";
     }
  }
  if (is_dir($dir) && $handle = opendir($dir)) {
    while (false !== ($file = readdir($handle))) {
      if (!in_array($file, $nomask) && $file[0] != '.') {
        if (is_dir("$dir/$file")) {
          // Recurse into subdirectories
          file_fix_directory("$dir/$file", $nomask);
        }
        else {
          $filename = "$dir/$file";
            // Try to make each file world writable.
            if (@chmod($filename, 0644)) {
              echo "<p>Made writable: " . $filename . "</p>";
            }
        }
      }
    }
    closedir($handle);
  }
}
?>
```

## Child Theme not seeing parent
You must name the theme with the exact (case-sensitive ) name of parent theme folder.

Turn on debug mode

`wp-config.php`

* turn on debugging only use in development 

```php
define( 'WP_DEBUG', true );
```

Here is a more thorough use of Debugging in WordPress

## Debug
[source](https://premium.wpmudev.org/blog/debugging-wordpress-how-to-use-wp_debug/)
Add this code to your dev server
```php
// Turn debugging on
define('WP_DEBUG', true);

// Tell WordPress to log everything to /wp-content/debug.log
define('WP_DEBUG_LOG', true);

// Turn off the display of error messages on your site
define('WP_DEBUG_DISPLAY', false);

// For good measure, you can also add the follow code, which will hide errors from being displayed on-screen
@ini_set('display_errors', 0);
```

If you run into a memory error, add this to your wp-config.php

`wp-config.php`

```php
define( 'WP_MEMORY_LIMIT', '96M' );
```

## White screen of death
It always is terrifying and God help you if it occurs in the production environment.
Use wp-cli to deactivate all your plugins. Get a list first with

```
$ wp plugin list
```

That way you know which plugin is active.

Deactivate them all with this command

```
$ wp plugin deactivate --all
```

you can also just rename the plugins folder.

If that doesn't work and you recently activated a new them. Deactivate the theme and switch to the lastest WordPress theme.

```
$ wp theme deactivate [theme name here]
$ wp theme activate twentysixteen
```
