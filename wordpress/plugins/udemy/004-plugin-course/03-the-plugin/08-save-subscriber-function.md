# Save subscriber function
```php
function slb_save_subscriber( $subscriber_data ) {

  // setup default subscriber id
  // 0 means the subscriber was not saved
  $subscriber_id = 0;

  try {

    $subscriber_id = slb_get_subscriber_id( $subscriber_data['email'] );

    // IF the subscriber does not already exist...
    if( !$subscriber_id ):

      // add new subscriber to db
      $subscriber_id = wp_insert_post(
        array(
          'post_type'=>'slb_subscriber',
          'post_title'=>$subscriber_data['fname'] . ' ' . $subscriber_data['lname'],
          'post_status'=>'publish',
        ),
       true 
     );

    endif;
    
    // add/update custom meta data
    update_field(slb_get_acf_key('slb_fname'), $subscriber_data['fname'], $subscriber_id);
    update_field(slb_get_acf_key('slb_lname'), $subscriber_data['lname'], $subscriber_id);
    update_field(slb_get_acf_key('slb_email'), $subscriber_data['email'], $subscriber_id);

  } catch( Exception $e ) {
    
  }

  // return subscriber_id
  return $subscriber_id;
}
```

* function takes subscriber_id
* first it sets subscriber_id to zero `0`
  - It means it didn't work

## Try statement
* We try to run our code
* We now have another function we need to write
  - slb_get_subscriber_id
    + it will take in the email
    + And we'll look to see if we already have a subscriber in our db with that email address
      * if not, we'll get zero `0`

`if( !$subscriber_id ):`

* Means "if not subscriber is true" or `if( $subscriber_id == 0 )`
* So if there is no subscriber we need to create one
  - So we use `wp_insert_post` to create the subscriber
    + WordPress' build-in function for adding new posts to the db
    + We then add an array of values to tell WordPress what kind of post are we inserting
      * post_type: slb_subscriber (our custom post type)
      * post_title: first and last name from our subscriber data
      * post_status: publish (we are publishing this)
    + WordPress after insterting will return a post id and we store that inside **$subscriber_id**
        - If it can't return an id it will return `0`

### Update
* If the user does exist than we use `update_field()`
  - WordPress function
  - And we pass the subscriber first name, last name and email
  - And we also make sure to pass the **$subscriber_id** so we are only updating one record
  - We will look at and create `slb_get_acf_key()` function later

## return subscriber id
* Finally we return the subscriber id

