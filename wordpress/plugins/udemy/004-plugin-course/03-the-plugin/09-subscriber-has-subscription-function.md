# Subscriber has subscription
* Helper function
* We will write this function once and then reuse it
* We'll add this inside the `helper` section of our plugin

```php
function slb_subscriber_has_subscription( $subscriber_id, $list_id ) {

  // setup default return value
  $has_subscription = false;

  // get subscriber
  $subscriber = get_post($subscriber_id);

  // get subscriptions
  $subscriptions = slb_get_subscriptions( $subscriber_id );

  // check subscriptions for $list_id
  if( in_array($list_id, $subscriptions) ):

    // found the $list_id in $subscriptions
    // this subscriber is already subscribed to this list
    $has_subscription = true;

  else:

    // did not find $list_id in $subscriptions
    // this subscriber is not yet subscribed to this list

  endif;

  return $has_subscription;

}
```

* We first take a subscriber_id and a list_id
* We first set the default value of has_description to false
* We get the subscriber post object
* We also want to get the subscriptions of that subscriber
  - We will write another helper function called `slb_get_subscriptions()`
    + It will return an array of all the subscriptions that that subscriber has
* Then we need to look for the list_id inside the subscriptions
  - We pass in the **needle** the `$list_id`
  - And we look through the **haystack** the `$subscriptions`
  - If its in the array we set `$has_subscriptions` to be **true**
  - If it's not in there, we do nothing in the **else**
* Finally we return the result of `$has_subscription`
