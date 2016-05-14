#WordPress gotchas

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
