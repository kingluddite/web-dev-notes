# Improve with Ajax
```php
jQuery(document).ready(function($) {

  const wpajax_url = document.location.protocol + '//' + document.location.host + '/wp-admin/admin-ajax.php';

});
```

* That script will now work on multiple domains without having to adjust the code

`snappy-list-builder/js/public/snappy-list-builder.js`

```js
// wait until the page and jQuery have loaded before running the code below
jQuery(document).ready(function($){
  
  // setup our wp ajax URL
  var wpajax_url = document.location.protocol + '//' + document.location.host + '/wp-admin/admin-ajax.php';
  
  // email capture action url
  var email_capture_url = wpajax_url += '?action=slb_save_subscription';
  
  $('form.slb-form').bind('submit',function(){
    
    // get the jquery form object
    $form = $(this);
    
    // setup our form data for our ajax post
    var form_data = $form.serialize();
    
    // submit our form data with ajax
    $.ajax({
      'method':'post',
      'url':email_capture_url,
      'data':form_data,
      'dataType':'json',
      'cache':false,
      'success': function( data, textStatus ) {
        if( data.status == 1 ) {
          // success
          // reset the form
          $form[0].reset();
          // notify the user of success
          alert(data.message);
        } else {
          // error
          // begin building our error message text
          var msg = data.message + '\r' + data.error + '\r';
          // loop over the errors
          $.each(data.errors,function(key,value){
            // append each error on a new line
            msg += '\r';
            msg += '- '+ value;
          });
          // notify the user of the error
          alert( msg );
        }
      },
      'error': function( jqXHR, textStatus, errorThrown ) {
        // ajax didn't work
      }
      
    });
    
    // stop the form from submitting normally
    return false;
    
  });
  
});
```

## Add a hook
* That will include our js into our page when a public page loads
* We will create a function to include this script and any other public scripts we want to include later

```php
// 1.5
// load external files
add_action('wp_enqueue_scripts', 'slb_public_scripts');
```


```php
// 4.1
// hint: leads external files into PUBLIC website
function slb_public_scripts() {

// register scripts with WordPress's internal library
wp_register_script('snappy-list-builder-js-public', plugin    s_url('/js/public/snappy-list-builder.js', __FILE__), array(    'jquery'),'',true);

// add to queue of scripts that get loaded into every page
  wp_enqueue_script('snappy-list-builder-js-public');

}
```

 * View plugin and see if it has been included in source
 
 ![source code with plugin](https://i.imgur.com/vWKxvKe.png)

## hooks
```php
// 1.4
// hint: register ajax actions
add_action('wp_ajax_nopriv_slb_save_subscription', 'slb_save_subscription'); // regular website visitor
add_action('wp_ajax_slb_save_subscription', 'slb_save_subscription'); // admin user

// 1.5
// load external files to public website
add_action('wp_enqueue_scripts', 'slb_public_scripts');
```

## load external scripts
```php
// 4.1
// hint: loads external files into PUBLIC website
function slb_public_scripts() {

  // register scripts with WordPress's internal library
  wp_register_script('snappy-list-builder-js-public', plugins_url('/js/public/snappy-list-builder.js',__FILE__), array('jquery'),'',true);

  // add to que of scripts that get loaded into every page
  wp_enqueue_script('snappy-list-builder-js-public');

}
```

 

