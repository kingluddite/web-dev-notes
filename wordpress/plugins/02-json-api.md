# JSON/API

## What does JSON stand for?
JavaScript Object Notation

## What does JSON look like

```json
{
    "soccer_players": [
      {
        "first_name":"David",
        "last_name":"Beckam"
      },
      {
        "first_name":"Wayne",
        "last_name":"Rooney"
      }
    ]
}
```


## Customizable

Each JSON object can have different value pairs

```json
{
    "soccer_players": [
      {
        "first_name":"David",
        "last_name":"Beckam",
        "postion":"Midfielder"
      },
      {
        "first_name":"Wayne",
        "last_name":"Rooney",
        "gersey_number":10
      }
    ]
}
```

## Must be formatted correctly
Will FAIL if not formatted correctly

## Useful Tools
* Use JsLint to make sure we have valid JSON
* JSON view (chrome extension)

## Why is JSON popular
flexiblility and readability

## I have an API for my website. Why is that cool?
It gives me the ability to send and receive data.

Empty JSON document with empty array named `players`

{
 "players": []
}

## Grab a JSON file from somewhere
Site like TTH
URL to JSON: user profile.json

How do we pull JSON into our Database?
Use this function: `wp_remote_get()`

[documentation](http://codex.wordpress.org/Function_Reference/wp_remote_get)

```php
<?php $response = wp_remote_get( $url, $args ); ?>
```

Why is timeout important?
JSON is long and we want to make sure we give enough time to pull in entire JSON data

echo won't work
echo $wpkingluddite_profile;
because it's not a string

need to use var_dump($wpkingluddite_profile) to output contents of our profile

add this to functions.php

```php
function wpkingluddite_badges_get_profile( $wpkingluddite_username ) {
  $json_feed_url = 'http://teamtreehouse.com/' . $wpkingluddite_username . '.json';
  $args = array( 'timeout' => 120 );
  $json_feed = wp_remote_get( $json_feed_url, $args );
  return $json_feed;
}
```

update this function in functions.php

```php
function wpkingluddite_badges_options_page() {
    [code here]

    // was form submitted
    if ( isset( $_POST['wpkingluddite_form_submitted'] ) ) {
     [code here]
     [code here]

      $wpkingluddite_profile = wpkingluddite_badges_get_profile( $wpkingluddite_username );

         $options['wpkingluddite_username']        = $wpkingluddite_username;
         // add this line
         $options['wpkingluddite_profile']         = $wpkingluddite_profile;
         $options['last_updated']                  = time();

         update_option( 'wpkingluddite_badges', $options );
      }
  }
  $options = get_option( 'wpkingluddite_badges' );

  if( $options != '') {

    $wpkingluddite_username = $options['wpkingluddite_username'];
    // add this line
    $wpkingluddite_profile = $options['wpkingluddite_profile'];

  }
  // echo $wpkingluddite_profile; // doesn't work
  // add this line
  var_dump($wpkingluddite_profile); // will output NULL on load (no username entered yet)
  require( 'inc/options-page-wrapper.php' );
}
```

Go to plugin page using Dashboard and enter a TH username
You will now see JSON data from the API

It returns the JSON and other stuff. We just want the body
So add this modification

`return $json_feed['body'];`

scroll all the way down to update the user

So it's a long string and hard to use

Make this change

```php
function wpkingluddite_badges_get_profile( $wpkingluddite_username ) {
  $json_feed_url = 'http://teamtreehouse.com/' . $wpkingluddite_username . '.json';
  $args = array( 'timeout' => 120 );
  $json_feed = wp_remote_get( $json_feed_url, $args );
  // add line
  $wpkingluddite_profile = json_decode( $json_feed['body'] );
  // modify this line
  return $wpkingluddite_profile;
}
```

Now instead of a string its stored as an object instead of a string. Easier to work with.

comment out var_dump
check out json in phpMyAdmin
look in the wp_options db and find wpkingluddite_badges option name (towards the end)
we have the full profile in (check out in by editing entry in phpMyAdmin)
also time last updated

How can you find it using SQL?
Click `SQL` in phpMyAdmin
```sql
SELECT * FROM `wp_options` WHERE option_name = 'wpkingluddite_badges'
```

You can edit or delete the data.

Store JSON feed locally puts less load on server.

## parsing and getting specific data from JSON

`options-page-wrapper.php`

```php
</div>
            <!-- /col-wrap -->

            <div class="col-wrap">
                <h3>Most Recent Badges</h3>
                <div class="inside">

                  <p>
                      <?php echo $wpkingluddite_profile->{'name'}; ?>
                  </p>
                   <p>
                      <?php echo $wpkingluddite_profile->{'profile_url'}; ?>
                  </p>
                  <p>
                      <?php echo $wpkingluddite_profile->{'badges'}[1]->{'courses'}[1]->{'title'}; ?>
                  </p>
                  <pre><code>
                    <?php var_dump( $wpkingluddite_profile ); ?>
                  </code></pre>
                </div>

             </div>
          <?php endif; ?>


        </div>
        <!-- /col-right -->
```

`var_dump` will show you JSON object in Dashboard plugin. Use that and the hints above to grab any data you want.

apply this to our loop

# update badges

```php
<p>You have 10 badges.</p>
                  <ul class="wpkingluddite-badges">
                    <?php for( $i = 0; $i < 20; $i++ ): ?>
                    <li>
                        <ul>
                            <li><img width="100px" src="<?php echo $wpkingluddite_profile->{'badges'}[$i]->{'icon_url'}; ?>" alt="<?php echo $wpkingluddite_profile->{'badges'}[$i]->{'name'}; ?>"></li>
                            <li class="wpkingluddite-badge-name">
                                <a href="<?php echo $wpkingluddite_profile->{'badges'}[$i]->{'url'}; ?>"><?php echo $wpkingluddite_profile->{'badges'}[$i]->{'name'}; ?></a>
                            </li>
                            <li class="wpkingluddite-project-name">
                                <a href="<?php echo $wpkingluddite_profile->{'badges'}[$i]->{'courses'}[0]->{'title'}; ?>"><?php echo $wpkingluddite_profile->{'badges'}[$i]->{'courses'}[0]->{'title'}; ?></a>
                            </li>
                        </ul>
                    </li>
                <?php endfor; ?>
```


hide show json when you need it

assign global variables


`working-badges.php`

```php
/*
 * Assign global variables
 */

[code here]
// add this one
$display_json = false;
```

then add it so your function can use it

`working-badges.php`

```php
function wpkingluddite_badges_options_page() {
    [code here]
    // add this one
    global $display_json;
```

add this to `options-page-wrapper.php`

```php
<!-- /col-wrap -->
            <?php if ($display_json): ?>
            <div class="col-wrap">
                <h3>JSON FEED</h3>
                <div class="inside">
            [code here]
            <?php endif; ?>
```

