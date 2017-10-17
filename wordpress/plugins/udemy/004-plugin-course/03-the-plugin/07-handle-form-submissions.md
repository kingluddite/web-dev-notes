# Handling Form Submissions
 
* Get the list id

```
// 2.2
function slb_form_shortcode( $args, $content="") {
  
  // get the list id
  $list_id = 0;
  if( isset($args['id']) ) $list_id = (int)$args['id'];

// more code
```

## Add a form action
```
<form id="slb-form" name="slb-form" class="slb-form" action="/wp-admin/admin-ajax.php?action=slb_save_subscriptions" method="post">
```

* WordPress has a very useful built in ajax handler
* `/wpadmin/admin-adjax.php`
* We submit all of our ajax posts to this file
  - And then we tell it what **action** we want to run
    + `?action=slb_save_subscriptions`
    + We need to write that `slb_save_subscriptions()` function
    + We need to pass in the list id to our form so this is a great spot to use a hidden field

```
function slb_form_shortcode( $args, $content="") {
  
  // get the list id
  $list_id = 0;
  if( isset($args['id']) ) $list_id = (int)$args['id'];

  // setup output variable = the form html
  $output = '

      <div class="slb">
      
        <form id="slb-form" name="slb-form" class="slb-form" action="/wpadmin/admin-ajax.php?action=slb_save_subscription" method="post">
    
          <input type="hidden" name="slb_list" value="' . $list_id . '">
```

* If **$list_id** isn't passed in it will be equal to `0` and if it is it will be whatever we passed into our shortcode

## View Form in post
* Check out the code

![code in subscriber post](https://i.imgur.com/4Wq1twN.png)

* Notice the ajax link in action
* Notice the hidden field has `0` for the **id** value
* We can change that by editing the post and adding an id like this:

![add id](https://i.imgur.com/7JO0VWi.png)

![form hidden field now has id](https://i.imgur.com/KAlKAZj.png)

### Create `slb_save_subscription()`
```
function slb_save_subscription() {

  // setup default result data
  $result = array(
    'status' => 0,
    'message' => 'Subscription was not saved. '
  );

  // array for storing errors
  $errors = array();

  try {
  
    // get_list_id
    $list_id = (int)$_POST['slb_list'];

    // prepare subscriber data
    $subscriber_data = array(
      'fname'=> esc_attr( $_POST['slb_fname'] ),
      'lname'=> esc_attr( $_POST['slb_lname'] ),
      'email'=> esc_attr( $_POST['slb_email'] )
    );

    // attempt to create/save subscriber
    $subscriber_id = slb_save_subscriber( $subscriber_data );
    // IF subscriber was saved sucessfully $subscriber_id will be greater than 0
    if( $subscriber_id ):

      // IF subscriber already has this subscription
      if( slb_subscriber_has_subscription( $subscriber_id, $list_id ) ):

        // get list object
        $list = get_post( $list_id );

        // return detailed error
        $result['message'] .= esc_attr( $subscriber_data['email'] . ' is already subscribed to ' . $list->post_title . '.'];

      else:

        // save new subscription
        $subscription_saved = slb_add_subscription( $subscriber_id, $list_id );

        // IF subscription was saved succesfully
        if( $subscription_saved ):

          // subscription saved!
          $result['status']=1;
          $result['message']='Subscription saved';

        endif;
          
      endif;

    endif;
          
  } catch (Exception $e) {
    
    // a php error occurred
    /* $result['message'] = 'Caught exception: ' . $e->getMessage(); */

  }

  // return result as json
  slb_return_json($result);

}
```

* Save negative result first

```php
  // setup default result data
  $result = array(
    'status' => 0,
    'message' => 'Subscription was not saved. '
  );
```

* This ensures that if anything went wrong it won't return that it went well
* This is because we set the result to status that it didn't work

### try/catch
```
try {

} catch {
  Exception $e
}
```

* Try some code and if their is an error it will catch it and give us the result of that Exception in the $e variable
* This ensures that if we get an error it won't break our page but we can isolate the error and get feedback from it to help fix it

### Get list id coming from inside the form post
* That will be inside the post scope
* It will be the `slb_list` input field (hidden field)

`    $list_id = (int)$_POST['slb_list'];`

* This is the hidden field

```html
<input type="hidden" name="slb_list" value="' . $list_id . '">
```

### Prepare the subscriber data
* We'll store the first name, last name and email from the form submit inside an array

```
    $subscriber_data = array(
      'fname'=> esc_attr( $_POST['slb_fname'] ),
      'lname'=> esc_attr( $_POST['slb_lname'] ),
      'email'=> esc_attr( $_POST['slb_email'] )
    );
```

* `esc_attr()`
  - WordPress function to clean up data to make sure it is safe

### Save the subscriber
* We will create another function called `save_subscriber()`
  - It will try to take our subscriber data from `slb_save_subscription()` and ssave that subscriber
    + But if the subscriber is already in the db, we will then update that info
    + We will then return the new unique post id for that subscriber

```
// attempt to create/save subscriber
    $subscriber_id = slb_save_subscriber( $subscriber_data );
```

* If `$subscriber_data` doesn't exist it will return `0` **zero** as a subscriber id
* We then check for subsciber id

`if ( $subscriber_id ):`

* If it exists it will be a number and true
* If it doesn't exist it will be 0 and false

### We will write another function `subscriber_has_subscription()`
* We will pass in **$subscriber_id** and **$list_id** to check if the subscriber already has the subscription
* This function will return true or false
* If it returns true, we want to get the list post object from the db with `get_post( $list_id )` and set to a variable called **$list**

```
$list = get_post( $list_id );
```

* Then (if function returns true) We fire off an error letting the user know that the subscriber has already subscribed to the list
* And we include the subscriber's email address and we grab the list and the title of that list
* If it returns false, it means the subscriber doesn't have a subscription
  - That means we can add it now (all in the `else`)
  - We call `slb_add_subcription()` function and passit the **$subscriber_id** and the **$list_id** and it will return true or false and we'll store that in the **$subscription_saved** variable

```php
if( $subscription_saved ):

  // subscription saved!
  $result['status']=1;
  $result['message']='Subscription saved';

endif;
```

* If true we change status from `0` to `1`
* And set message to success!

## return result
* Will be JSON to handle Ajax post
* `slb_return_json()`
  - Will take our PHP array result and turn it into a JSON string and return that
