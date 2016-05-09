# Themes and Plugins with JavaScript

## wp_localize_script

* allows us to add translatable messages into our JavaScript but also for passing in any data or JavaScript files need from our PHP based plugin or theme files

```php
__( 'String to translate', 'text-domain' )
```

example

```php
__( 'Soccer is awesome', 'my-plugin ' )
```

eventually you'll use a tool that makes the translation easy but if you do this before throughout your them or plugin it will make actually translating to a different language much, much easier

__() - just a PHP function
* NOT in JavaScript

so how can we get our translated message to our JavaScript file from PHP
along with data from our plugin and theme files that we want to be available in JavaScript

and that's where we use `wp_localize_script()`

```php
wp_localize_script(
   'my-sample-script', // handle here
   'sample', // Object name in JavaScript 
   array( // Data and localized messages to pass into the JavaScript file
     'message' => __( 'Alert message', 'sample-plugin' ),
     'is_new' => true
   )
);
```

**Sample Object |  Value**
sample.message   "Alert message"
sample.is_new    true

example

```php
define( 'SAMPLE_VERSION', 1 );

function sample_enqueue_script() {
    if ( !is_page( 'about' ) )
        return;

    wp_enqueue_script(
      'my-sample-script',
      plugins_url( 'js/sample.js', __FILE__),
      array( 'jquery' ),
      SAMPLE_VERSION,
      true
    );
    wp_localize_script(
      'my-sample-script'
      'sample_data',
      array(
        'message' => __( 'This is a message', 'sample-plugin' ),
        'is_new' => true
      )
    );
};
```

sample.js

```js
console.log(sample_data.message);
if (sample_data.is_new) {

}
```

jQuery in WordPress

* WordPress loads jQuery in .noConflict() mode
* so you don't get access to the `$` like you would if you just added jQuery to a plain HTML file

ways around this

before

```php
$('#content').hide();
```

after

```php
jQuery(document).ready(function($){
    $('#content').hide();
});
```

or this

```php
(function($){
    $('#content').hide();
})(jQuery);
```

or even this

```php
(function($){
    $(document).ready(function(){
      $('#content').hide();
    });
})(jQuery);
```
