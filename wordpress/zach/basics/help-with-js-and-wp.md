# WordPress and JS

## Handle With Care
* Conflicts with other JS files
* Security
* Performance

## Do Not Use Link or Script Tags
Use wp_enqueue_script instead

### Why the heck not?
* Helps prevent conflicts
* Add WordPress bundled scripts
* Resolves dependencies
* Allows you to set a version for your JavaScript file
* Only adds a script once

`wp_enqueue_script()`
* specifies what JavaScript file(s) to load in your plugin or theme
* WordPress injects script into either header
`wp_head()` or footer `wp_footer()`

WordPress is bundled with:
* jQuery
* jQuery UI (dialog, effects...)
* jcrop
* `Backbone.js` (helps structure you JS code)
* `Underscore.js` - for useful functions in your JS development

[WordPress Code Reference](https://developer.wordpress.org/reference/)

## [Default Scripts Included and Registered by WordPress](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

By default, WordPress installation includes many popular scripts commonly used by web developers besides the scripts used by WordPress itself. Some of them are listed in the table below.

WordPress gives you the ability to pass data from your PHP into your JS files using `wp_localize_script` function

* can pass translations of messages (other languages)
* any data for your script

When using JavaScript and WordPress together be sure to use `nonce` (number used once)
* helps protect against certain types of misuse
* verify that request is actually coming in from a real user

### Example:
form data + nonce gets passed to server
server can validate that the key is valid for this user and is not expired and if so, allows the form to be processed (if not, it will throw an error and tell the user to bugger off)

```php
wp_enqueue_script(HANDLE, SOURCE, ARRAY of dependencies,Version number, in footer parameter)
```

`SOURCE` - where's your file located?
* plugin - plugins_url('PATH', __FILE__)
* theme - get_template_directory_uri() . 'PATH'

`array of scripts` - array of scripts the script file depends on (WP figures out the right order to add scripts so that the dependencies are loaded first)

`version number` - used to make sure WP is not using an old or cached version of your script
  example
```html
  <script src="http://.../.../js/code.js?ver=1"></script>
```
 
 ### TIP
 rather than hard coding version number use a CONSTANT like at the top of your plugin value

```php 
 define( 'TEST_VERSION', 1 );
```

Then call that constant like this:

```php
wp_enqueue_script( 'test-script', get_template_directory_uri() . '/js/sample.js', array( 'jquery' ), SAMPLE_VERSION, true);
```

in footer parameter - if `true` script added to footer, `false`, added to header
* best to set to `true` to speed up rendering of page content (unless it absolutely must be in the header)

* you DO NOT want to include your own version of jQuery
    - or your own version of an already bundled library

## When to call `wp_enqueue_script`

`add_action()` - basically events that are called during specific points in time during the page load.

we can HOOK into an action that is firing at the time we want using `add_action`

### `add_action( 'action_name', 'our_function_name' );`

`action_name()` - name of action that we want to hook into
our_function_name - name of the function we want to be called when this action is fired

### Example

**note** `wp_enqueue_script()` has to be inside a function

```php
<?php
define( 'SCRIPT_VERSON', 1 );

// $hook parameter
function my_example_enqueue_script( $hook ) {
    if ( 'post.php' != $hook )
        return;
    wp_enqueue_script(
        'my-example-script',
        plugins_url( 'js/sample.js', __FILE__ ),
        array( 'jquery' ),
        SAMPLE_VERSION,
        true
    );
}
add_action( 'admin_enqueue_scripts', 'my_example_enqueue_script' );
?>
```

* will be enqueued on EVERY single administration screen - do we want this?
    - we only want to load our script when it's needed
        + we only want to load our script on the post editing screen
            * admin_enqueue_scripts - gives us a $hook parameter we can use to only load if we are where we want to be

so if our hook is `wp_enqueue_scripts()` this will get called on every front end page which is not what we want, we can run a check before we run the wp_enqueue_script

```php
// if not home page exit out and not enqueue our script
function some_function() {
 if ( !is_home() )
      return;
    wp_enqueue_script(
    );
}
```

or this 
```js
if ( !is_page( 'about' ) )
    return;
```

**just for login**

`login_enqueue_scripts()` - action 

only load JavaScript files when you need them (helps prevent conflicts from your scripts or your theme)
