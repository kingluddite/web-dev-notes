# WordPress Tools
cowboy coding
## Staging Server
ServerPilot
[link](https://serverpilot.io/)
cost: free

1. create account
2. do manual install
3. paste code like this below into terminal

```
(test -e /usr/bin/wget || (sudo apt-get update && sudo apt-get -y install wget)) && \
sudo wget -nv -O serverpilot-installer.py https://download.serverpilot.io/serverpilot-installer.py && \
sudo python serverpilot-installer.py \
    --server-id=BvN9EMOeS1StskmP \
    --server-apikey=BoelGeujUI7HDO8pVezL52ks0cWC71tAPsCk7HLusko
```

4. press return

Debug
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

