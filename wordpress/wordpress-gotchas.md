#WordPress gotchas

## .htaccess for WordPress

I deleted my htaccess and I got all kinds of errors. Make sure you have one. Sometimes you'll need to alter it but I'll leave that for you to figure out. Here is the default

[`.htaccess`](https://codex.wordpress.org/htaccess)

```
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

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
// Set to false when in Production
define( 'WP_DEBUG', true );
```

## File Permissions

If you log into your shared hosting cpanel you can go to the File Manager and you will see a column named 'Perms'

![file permissions](https://i.imgur.com/P36sKmH.png)

Sometimes you may get a 500 error page when you try to load your WordPress site in the browser. Many times this has to do with Permission problems on the file.

In the cpanel you can open the server error log and you might see something like:

![permission error](https://i.imgur.com/t06H9QH.png)

You see that the error is 'is writable by group'

I know it's a pretty lame error but it just means you have to change the file permissions on those files. Click on the files in the file manager and click the 'Change Permissions' button. Uncheck the checkbox under Write group and it will change the file from `0664` to `0644`.

Now if you do that for each file in the error log, you should see your WordPress page load up.

## A Faster Solution
A fast way would be SSH into your remote box and recursively change the folder and file permissions using this magical line of code

```
chmod -R u+rwX,go+rX,go-w .
```


Here is a solution I use often:

* After I push everything to staging using WordMove, I inadvertently change the entire sites file and folder permissions. Manually changing 4000+ files and folders would be a huge time suck. Luckily, the two terminal commands below will change them all to what they need to be in less then 2 minutes.

Just navigate to your staging server's root WordPress folder and run the 2 following commands.

To change all the directories to 755 (-rwxr-xr-x):

```
$ find -type d -exec chmod 755 {} \;
```

To change all the files to 644 (-rw-r--r--):

```
$ find -type f -exec chmod 644 {} \;
```

After running the above two commands your 500 internal error page should turn into your WordPress custom theme live and working. Congratulations for being awesome.

## Why does this happen?
It happens every time I add WordPress using WP-CLI.


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
