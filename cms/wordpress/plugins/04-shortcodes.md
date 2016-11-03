# WordPress Shortcodes

[shortcode api](https://codex.wordpress.org/Shortcode_API)

example of shortcode
```
[gallery id="123" size="medium"]
```

php to make a shortcode

```php
// [bartag foo="foo-value"]
function bartag_func( $atts ) {
    $a = shortcode_atts( array(
        'foo' => 'something',
        'bar' => 'something else',
    ), $atts );

    return "foo = {$a['foo']}";
}
add_shortcode( 'bartag', 'bartag_func' );
```


most important part is in the `add_shortcode`, the first parameter is the name of the tag we want to use in our shortcode. in the above example from the WordPress codex is `bartag`. everything else is just custom functions working with a set of parameters

add our plugin below register widgets and get profile function in our `wpkingluddite-badges.php` plugin

when using shortcodes you really start to see the value of namespacing everything

fix front-end.php notices with something like this

```php
<?php
if (isset( $before_widget ) ) echo $before_widget;
if (isset( $before_title ) || isset( $title ) || isset( $after_title ) ) {
    echo $before_title . $title . $after_title;
}
?>
```

here's our shortcode

```php
/*=================================
=            shortcode            =
=================================*/

function wpkingluddite_badges_shortcode( $atts, $content = null ) {
    // need to have this
    // it gets info from post where we use this shortcode
    global $post;

    extract( shortcode_atts( array(
        'num_badges' => '8',
        'tooltip' => 'on'
    ), $atts ) );

    if( $tooltip == 'on' ) $tooltip = 1;
    if( $tooltip == 'off' ) $tooltip = 0;

    $display_tooltip = $tooltip;

    $options = get_option( 'wpkingluddite_badges' );
    $wpkingluddite_profile = $options['wpkingluddite_profile'];

    // we don't want the default behavior of `require` to work here
    // were the code is put at the top of the post
    // we want to wait until our shortcode is called in the content and then pull in our required file
    ob_start(); // here we are buffering

    require( 'inc/front-end.php' ); // grabbing data

    $content = ob_get_clean(); // storing data in object

    return $content; // returning object
}
add_shortcode( 'wpkingluddite_badges', 'wpkingluddite_badges_shortcode' );
```

create a page, edit it and drop this shortcode inside it

```
[wpkingluddite_badges]
```

let's see if our parameters work

```
[wpkingluddite_badges num_badges='4' tooltip='off']
```

## New Plugin - Display Widgets
install and activate
view it and you'll see you can now choose what page you want your widget to show up on.

Remove extra widets. Add text widget to request people to contact you to work with you.
