# Client Sites
* Had to fix these bugs

## Contmpodesign
`~/VVV/www/contmpodesign/public_html/wp-content/plugins/upme/classes/class-upme.php`

```php
    function upme_hide_admin_bar() {
        global $upme_options;
        // PEH2 added if to check for $upme_options as it was NULL and
        //  causing an error
        if ($upme_options) {
            $current_option = $upme_options->upme_settings;
            if ('hide_from_non_admin' == $current_option['hide_frontend_admin_bar']) {
                if (!current_user_can('manage_options') && !current_user_can('manage_upme_options') ) {
                    show_admin_bar(false);
                }
            } else if ('hide_from_all' == $current_option['hide_frontend_admin_bar']) {
                show_admin_bar(false);
            }
        }
    }
```

```php
function upme_profile_custom_routes() {
        global $upme_options;
        // PEH2 added if to check if $upme_options is not NULL
        if ($upme_options) {
            $current_option = $upme_options->upme_settings;

            // Add custom rewrite rules when not in default permalinks
            if (isset($current_option['profile_page_id']) && !isset($_REQUEST['page_id'])) {
                $link = get_permalink($current_option['profile_page_id']);
                $filter_link = rtrim(substr(str_replace(home_url(), '', $link), 1), '/') . '/';
                $filter_link_with_slash = '^' . $filter_link . '([^/]+)/?';
                $filter_link_empty_slash = '^' . $filter_link . '([^/]+)?';
                $profile_page_id = url_to_postid($link);

                add_rewrite_rule($filter_link_empty_slash, 'index.php?page_id=' . $profile_page_id . '&upme_profile_filter=$matches[1]', 'top');
                add_rewrite_rule($filter_link_with_slash, 'index.php?page_id=' . $profile_page_id . '&upme_profile_filter=$matches[1]', 'top');
            }
        }
    }
```

`/Users/philiphowley/VVV/www/contmpodesign/public_html/wp-content/plugins/adroll-retargeting/wp-adroll.php`

```php
class WP_AdRoll {
  // DEPRECATED PHP4 code
    // public function WP_AdRoll() {
    //  $this->init();
    // }
    // PHP7 good way
    // Prevents error - Deprecated: Methods with the same name as their class will not be constructors in a future version of PHP
    function __construct() {
        $this->init();
    }
// more code
}
```

`~/VVV/www/contmpodesign/public_html/wp-content/plugins/upme/integrated_plugins/visual_composer/vc_extend.php`

```php
new VCExtend_UPME();

// DEPRECATED CODE
// if( function_exists('add_shortcode_param')){
//     add_shortcode_param( 'upme_multiple_select', 'upme_multiple_select_field' );
// }
```

`/Users/philiphowley/VVV/www/contmpodesign/public_html/wp-content/plugins/q-and-a/inc/reorder.php`

```php
class faqpageorder_Widget extends WP_Widget {
  // DEPRECATED PHP4 CODE
    // function faqpageorder_Widget() {
    //  $widget_ops = array('classname' => 'widget_faqpageorder', 'description' => __( 'Enhanced Pages widget provided by Reorder FAQs', 'qa-free') );
    //  $this->WP_Widget('faqpageorder', __('Reorder FAQs', 'qa-free'), $widget_ops);   }
    // GOOD PHP7 CODE
    // Prevents this error: PHP Deprecated:  Methods with the same name as their class will not be constructors in a future version of PHP
    function __constructor() {
        $widget_ops = array('classname' => 'widget_faqpageorder', 'description' => __( 'Enhanced Pages widget provided by Reorder FAQs', 'qa-free') );
        $this->WP_Widget('faqpageorder', __('Reorder FAQs', 'qa-free'), $widget_ops);
    }
// more code
}
```

## WPCLI error stop getting 301 redirect plugin error when running in wp-cli

`$ wp plugin list --skip-plugins=simple-301-redirects`





