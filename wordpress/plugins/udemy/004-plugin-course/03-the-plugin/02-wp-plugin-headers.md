# WordPress Plugin Headers
* [header requirements](https://developer.wordpress.org/plugins/the-basics/header-requirements/)
* The Header section of the plugin is the primary component that tells WordPress that a file is a plugin
* And at minimum a Header can contain just a plugin name
* But other pieces can/should be included
* We store this plugin meta data inside PHP comments

```php
<?php
/*
Plugin Name:  WordPress.org Plugin
Plugin URI:   https://developer.wordpress.org/plugins/the-basics/
Description:  Basic WordPress Plugin Header Comment
Version:      20160911
Author:       WordPress.org
Author URI:   https://developer.wordpress.org/
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  wporg
Domain Path:  /languages
*/
```

* Name folder what your plugin is named
  - Name first file the same name as the folder
* Create folder inside `plugins` named 'snappy-list-builder'
  - Create file named `snappy-list-builder.php`

`snappy-list-builder.php`

```php
<?php

/*
 * Plugin Name: Snappy List Builder
*/
```

* View Dashboard > Plugins
  - And you will now see `Snappy List Builder` listed as an installed plugin
  - We are missing:
    + Description
    + Version
    + Author
    + Link to more details
    + WordPress recommends GPL2 (General Public License 2)
    + usually the last meta item you add is the Text Domain
      * This is the unique name of our plugin's directory

`snappy-list-builder.php`

```
/*
  4  Plugin Name: Snappy List Builder
  5  Plugin URI:
  6  Description: The ultimate email list building plugin for Wo    rdPress. Capture new subscribers. Reward subscribers with a     custom download upon opt-in. Build unlimted lists. Import an    d export subscribers easily with .csv
  7  Version: 1.0
  8  Author:: PEH2
  9  License: GPL2
 10  License URI: https://www.gnu.org/licenses/gpl-2.0.html
 11  Text Domain: snappy-list-builder
 12 */
 ```

![new plugin in dashboard with newly added meta data](https://i.imgur.com/Esm1Ge1.png)

* Then click **activate** to activate the plugin
    - Nothing will happen
    - We haven't given any instruction to WordPress yet






