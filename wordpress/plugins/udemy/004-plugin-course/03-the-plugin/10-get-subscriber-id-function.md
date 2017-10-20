# get subscriber id function
```php
function slb_get_subscriber_id( $email ) {
  
  $subscriber_id = 0;

  try {

    // check if subscriber already exists
    $subscriber_query = new WP_Query(
      array(
        'post_type'   => 'slb_subscriber',
        'posts_per_page' => 1,
        'meta_key' => 'slb_email',
        'meta_query' => array(
          array(
          'key' => 'slb_email',
          'value' => $email, // or whatever it is you're using here
          'compare' => '=',
        ),
      ),
    )
  );

  // IF the subscriber exists...
  if( $subscriber_query->have_posts() ):

    // get the subscriber_id
    $subscriber_query->the_post();
    $subscriber_id = get_the_ID();

    endif;
  
  } catch( Exception $e ) {

    // a php error occurred

  }

  // reset the WordPress post object
  wp_reset_query();

  return (int)$subscriber_id;

} 
```

* This function retreives a subscriber id from an email address
* So we pass it an email argument
* We first set subscriber id to be zero

## Try/catch
* We want to see if user already exists
* We use `WP_Query()` and pass in args
  - only
    + slb_subscribers
    + only the first result (we only expect 1)
    + we look for the slb_email and see if it matches the email we passed into this function
    + our query has an array with an array inside of it
    + we use **compare** and set it to `=` which checks if there is an email match
* If subscriber exists
  - then we'll get true for `$subscriber_query->have_posts()`
  - we get the id by initialize the post object using '->the_post()'
  - and then get that id with `get_the_ID()` and store it inside `$subscriber_id` (that will be the post id)
* If all that works it will return the id of the subscriber in our db
* If the subscriber is not there we'll get 0 back

## wp_reset_query()
* Since we initiated the post object using `the_post()`
* So resetting query is good practice to clear that from memory
  - This helps ensure we are not bleeding any memory into another function
  
## Return subscriber id
* Finally we return the subscriber id
* We cast it as a integer to make sure it is a number

```php
  switch( $field_name ) {

  case 'slb_fname':
    $field_key = 'field_59e8cf2830c53';
    break;
  case 'slb_lname':
    $field_key = 'field_59e8cf4d30c54';
    break;
  case 'slb_email':   
    $field_key = 'field_59e8d03430c55';
    break;
  case 'slb_subscriptions':
    $field_key = 'field_59e8d05430c56';
    break;

  }
```

* Replace these field id's with your own
* I forgot to change $key to `$field_key`


