# Widgets

## register_widget();
<a href="https://codex.wordpress.org/Function_Reference/register_widget" target="_blank">register_widget() link</a>
```
<?php register_widget( $widget_class ) ?>
```

click `example` in sidebar and you can use that code to copy and paste into our main plugin file

```php
class MyNewWidget extends WP_Widget {

    function __construct() {
        // Instantiate the parent object
        parent::__construct( false, 'My New Widget Title' );
    }

    function widget( $args, $instance ) {
        // Widget output
    }

    function update( $new_instance, $old_instance ) {
        // Save widget options
    }

    function form( $instance ) {
        // Output admin widget options form
    }
}

function myplugin_register_widgets() {
    register_widget( 'MyNewWidget' );
}

add_action( 'widgets_init', 'myplugin_register_widgets' );
```

add inside `wpkingluddite-badges.php` (under the require of `options-page-wrapper' )

[similar to themes `register_sidebar()`](https://codex.wordpress.org/Function_Reference/register_sidebar)

```php
<?php $args = array(
    'name'          => __( 'Sidebar name', 'theme_text_domain' ),
    'id'            => 'unique-sidebar-id',
    'description'   => '',
        'class'         => '',
    'before_widget' => '<li id="%1$s" class="widget %2$s">',
    'after_widget'  => '</li>',
    'before_title'  => '<h2 class="widgettitle">',
    'after_title'   => '</h2>' ); ?>
```

and change to:

```php
// WordPress capitalizes class names (lowercase underscore function names)
class Wpkingluddite_Badges_Widget extends WP_Widget {

  function __construct() {
    // Instantiate the parent object
    parent::__construct( false, 'Kingluddite Badge Widget' );
  }

  function widget( $args, $instance ) {
    // Widget output

    extract( $args ); // not using but this must be included
    $title = apply_filters( 'widget_title', $instance['title'] ); // shows up above widget

    $options = get_option( 'wpkingluddite_badges' );
    $wpkingluddite_profile = $options['wpkingluddite_profile'];

    require( 'inc/front-end.php' );
  }

  // the new instance is set up to replace the old_instance
  function update( $new_instance, $old_instance ) {
    // Save widget options

    $instance = $old_instance;
    $instance['title'] = strip_tags($new_instance['title']);

    return $instance;
  }

  function form( $instance ) {
    // Output admin widget options form

    $title = esc_attr( $instance['title'] );

    require( 'inc/widget-fields.php' );
  }
}

function wpkingluddite_badges_register_widgets() {
  register_widget( 'Wpkingluddite_Badges_Widget' );
}

add_action( 'widgets_init', 'wpkingluddite_badges_register_widgets' );
```


`inc/front-end.php`

```php
<?php

 echo $before_widget;

 echo $before_title . $title . $after_title;

 echo $wpkingluddite_profile->{'name'};

 echo $after_widget;
?>
```

`inc/widget-fields.php`

```php
<p>
    <label>Title</label>
    <input type="text" class="widefat" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $title; ?>" />
</p>
```

## update `widget-fields` with more fields

```php
<p>
    <label>Title</label>
    <input type="text" class="widefat" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $title; ?>" />
</p>
<p>
    Total Badges
    <?php echo count($wpkingluddite_profile->{'badges'}); ?>
</p>
<p>
    <label>How many badges to you want to display?</label>
    <input size="4" name="<?php echo $this->get_field_name('num_badges'); ?>" type="text" value="<?php echo $num_badges; ?>" />
</p>
<p>
    <label>Display Tooltips</label>
    <input type="checkbox" name="<?php echo $this->get_field_name('display_tooltip'); ?>" value="1" <?php checked( $display_tooltip, 1 ); ?> />
</p>
```

update the class in `wpkingluddite-badges.php`

```php
class Wpkingluddite_Badges_Widget extends WP_Widget {

  function __construct() {
    // Instantiate the parent object
    parent::__construct( false, 'Kingluddite Badge Widget' );
  }

  function widget( $args, $instance ) {
    // Widget output

    extract( $args ); // not using but this must be included
    $title = apply_filters( 'widget_title', $instance['title'] ); // shows up above widget
    $num_badges = $instance['num_badges'];
    $display_tooltip = $instance['display_tooltip'];

    $options = get_option( 'wpkingluddite_badges' );
    $wpkingluddite_profile = $options['wpkingluddite_profile'];

    require( 'inc/front-end.php' );
  }

  // the new instance is set up to replace the old_instance
  function update( $new_instance, $old_instance ) {
    // Save widget options

    $instance = $old_instance;
    $instance['title'] = strip_tags($new_instance['title']);
    $instance['num_badges'] = strip_tags($new_instance['num_badges']);
    $instance['display_tooltip'] = strip_tags($new_instance['display_tooltip']);

    return $instance;
  }

  function form( $instance ) {
    // Output admin widget options form

    $title = esc_attr($instance['title']);
    $num_badges = esc_attr($instance['num_badges']);
    $display_tooltip = esc_attr($instance['display_tooltip']);

    $options = get_option( 'wpkingluddite_badges' );
    $wpkingluddite_profile = $options['wpkingluddite_profile'];

    require( 'inc/widget-fields.php' );
  }
}
```

how to get code to show on the front end of the site

updated `front-end.php` with embedded css

```php
<style type="text/css">
    .wpkingluddite-badge {
        position: relative;
    }
    .wpkingluddite-badge-info {
        display: none;
        background: rgba(255,255,255,.9);
        padding: 5px 10px;
    }
    .wpkingluddite-badge:hover .wpkingluddite-badge-info{
        display: block;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>

<?php

    echo $before_widget;
    echo $before_title . $title . $after_title;
?>

<ul class="wpkingluddite-badges frontend">
    <?php
      $total_badges = count( $wpkingluddite_profile->{'badges'} );

      for( $i = $total_badges - 1; $i >= $total_badges - $num_badges; $i-- ):
    ?>
    <li class="wpkingluddite-badge">
        <img src="<?php echo $wpkingluddite_profile->{'badges'}[$i]->{'icon_url'}; ?>">

        <?php if( $display_tooltip == '1' ): ?>
            <div class="wpkingluddite-badge-info">
            <p class="wpkinggluddite-badge-name">
                <a href="<?php echo $wpkingluddite_profile->{'badges'}[$i]->{'url'}; ?>">
                 <?php echo $wpkingluddite_profile->{'badges'}[$i]->{'name'}; ?>
                </a>
            </p>

            <?php if ( $wpkingluddite_profile->{'badges'}[$i]->{'courses'}[1]->{'title'} != ''): ?>

                <p class="wpkingluddite-badge-project">
                    <a href="<?php echo $wpkingluddite_profile->{'badges'}[$i]->{'courses'}[1]->{'url'}; ?>">
                      <?php echo $wpkingluddite_profile->{'badges'}[$i]->{'courses'}[1]->{'title'}; ?>
                    </a>
                </p>
            <?php endif; ?>

            <a href="http://example.com">
                <img src="<?php echo plugins_url( 'wpkingluddite-badges/img/fun-logo.png' ); ?>">
            </a>
            <span class="wpkingluddite-tooltip bottom"></span>

          </div>

        <?php endif; ?>
    </li>
<?php endfor; ?>
</ul>

<?php
  echo $after_widget;
?>
```

you can use the loop here on our backend settings page as it's a better way to do the loop

**note:** `wp_enqueue_scripts` is a hook and is plural because it is pulling many but inside your frontend scripts and styles function it is singlar `wp_enqueue_style` and `wp_enque_script` because it only loads one page

`wpkingluddite-badges.css`

```css

/*
 *  Backend Styles
 *
*/

.postbox img.gravatar {
    max-width: 100%;
}

.postbox .inside {
    display: table
}

.postbox .wpkingluddite-badges > li {
    float: left;
    margin: 5px;
    text-align: center;
    height: 220px;
    width: 120px;
    overflow: hidden;
}

.postbox .wpkingluddite-badges li li {
    margin: 2px 0;
    padding: 0;
}

.postbox .wpkingluddite-badges img {
    float: left;
    width: 100%;
    margin-bottom: 5px;
}

.postbox .wpkingluddite-project-name a {
    font-size: .8em;
    text-decoration: none;
    line-height: .5em
}

.postbox .wpkingluddite-badges-and-points li {
    padding: 5px 10px;
    background: #474747;
    color: #ddd;
    border-radius: 20px;
    font-size: 1.2em;
    float: left;
}

.postbox .wpkingluddite-badges-and-points li:first-child {
    margin-right: 5px
}

.postbox .wpkingluddite-badges-and-points strong {
    color: #92ae57;
}


/*
 *  Frontend Styles
 *
*/

.wpkingluddite-badges.frontend a,
.widget-area .widget .wpkingluddite-badges.frontend a {
    color: #999;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    letter-spacing: .25px;
    text-decoration: none;
}

.wpkingluddite-badges.frontend a:hover,
.widget-area .widget .wpkingluddite-badges.frontend a:hover {
    color: #ddd;
}

.wpkingluddite-badges,
.widget-area .widget .wpkingluddite-badges {
    display: table;
}

.wpkingluddite-badges li,
.widget-area .wpkingluddite-badges li {
    float: left;
    width: 100px;
    margin: 0 5px 5px;
    padding: 10px 0 0;
    position: relative;
    list-style: none;
}

.wpkingluddite-badges .wpkingluddite-badge img {
    width: 100%;
    border: none;
    box-shadow: 0 0 0 0;
}

.wpkingluddite-badges .wpkingluddite-badge-info {
    display: none;
    background: #3d444b;
    border-radius: 4px;
    color: #ededed;
    padding: 14px;
    width: 120px;
    position: absolute;
    z-index: 100;
    left: -22px;
    bottom: 119px;
    transition: bottom ease-out .5s;
    -webkit-transition: bottom ease-out .5s;
}

.wpkingluddite-badges li:hover .wpkingluddite-badge-info {
    bottom: 129px;
    transition: bottom ease-out .5s;
    -webkit-transition: bottom ease-out .5s;
}

.wpkingluddite-badges .wpkingluddite-badge-info .wpkingluddite-tooltip.bottom {
    background: url(img/tooltip-arrow.png) no-repeat 0 0;
    display: block;
    position: absolute;
    width: 26px;
    height: 13px;
    bottom: -8px;
    left: 59px;
    z-index: 99;
}

.wpkingluddite-badge-info p.wpkingluddite-badge-name,
.widget-area .widget .wpkingluddite-badge-info p.wpkingluddite-badge-name {
    font-size: 14px;
    line-height: 16px;
    margin:  0 0 8px;
}

.wpkingluddite-badge-info .wpkingluddite-badge-name a,
.widget-area .widget .wpkingluddite-badge-info .wpkingluddite-badge-name a {
    color: #fff;
    text-shadow: 0 0 1px #000;
}

.wpkingluddite-badge-info .wpkingluddite-badge-name a:hover,
.widget-area .widget .wpkingluddite-badge-info .wpkingluddite-badge-name a:hover {
    color: #fff
}

.wpkingluddite-badge-info p.wpkingluddite-badge-project,
.widget-area .widget .wpkingluddite-badge-info p.wpkingluddite-badge-project {
    color: #edeff0;
    font-size: 11px;
    line-height: 14px;
    margin: 0;
}

.wpkingluddite-badge-info .wpkingluddite-logo,
.widget-area .widget .wpkingluddite-badge-info .wpkingluddite-logo {
    display: block;
    width: 80px;
    padding: 20px 0 0;
}

.kingluddite-badge-info .kingluddite-logo img,
.widget-area .widget .kingluddite-badge-info .kingluddite-logo img {
    display: block;
}
```

wpkingluddite-badges.js

```js
jQuery(document).ready(function($){

    $('.wpkingluddite-badge').hover(function() {
        $(this).find('.wpkingluddite-badge-info').stop(true, true).fadeIn(200);
    }, function() {
        $(this).find('.wpkingluddite-badge-info').stop(true, true).fadeOut(200);
    });
});
```

frontend backend enqueue script

```php
function wpkingluddite_badges_backend_styles() {
  wp_enqueue_style( 'wpkingluddite_badges_backend_styles', plugins_url( 'wpkingluddite-badges/wpkingluddite-badges.css' ) );
}
add_action( 'admin_head', 'wpkingluddite_badges_backend_styles' );

function wpkingluddite_badges_frontend_scripts_and_styles() {
  wp_enqueue_style( 'wpkingluddite_badges_frontend_css', plugins_url( 'wpkingluddite-badges/wpkingluddite-badges.css' ) );
  wp_enqueue_script( 'wpkingluddite_badges_frontend_js', plugins_url( 'wpkingluddite-badges/wpkingluddite-badges.js' ), array('jquery'), '', true );
}
add_action( 'wp_enqueue_scripts', 'wpkingluddite_badges_frontend_scripts_and_styles' );
?>
```

[link to arrow image](https://www.dropbox.com/s/zn7loc4dllh3exc/tooltip-arrow.png?dl=0)
