# Add third parties to plugin
* Move ACF plugin to snappy and create `lib` folder and drop it inside that

`snappy-list-builder/lib/ACFPLUGINHERE`

## Include ACF plugin inside your custom plugin

```php
/* !4. EXTERNAL SCRIPTS */

// 4.1
// Include ACF
include_once( plugin_dir_path( __FILE__ ) . 'lib/advanced-custom-field/acf.php' );

// 4.2
```

* Add custom filters that that plugin requires
* The online documentation for ACF website instructs you to include these filters

```php
// 1.6
// Advanced Custom Field Settings
add_filter('acf/settings/path', 'slb_acf_settings_path');
add_filter('acf/settings/dir', 'slb_acf_settings_dir');
add_filter('acf/settings/show_admin', 'slb_acf_show_admin');
if( !defined('ACF_LITE') ) define('ACF_LITE', true); // turn off ACF plugin menu
```

## add custom post types
```php
/* !7. CUSTOM POST TYPES */

// 7.1
// subscribers
include_once( plugin_dir_path(__FILE__) . 'cpt/slb_subscriber.php');
```

```php
/* !4. EXTERNAL SCRIPTS */

// 4.1
// Include ACF
include_once( plugin_dir_path( __FILE__ ) . 'lib/advanced-custom-fields/acf.php' );
```

* comment out lite mode 1.6 to get ACF code and export it and paste it into plugin folder new file (copy paste)
* Comment in when done
* don't forget to add `<?php` opening tag in slb_subscriber.php


