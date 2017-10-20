# Admin Columns
* We want to create some new functions
* This will go in the filters section
  - Since each function will be responsible for applying filters to existing data before its out (that's why it's going into the filter section)

## Manipulate the column header (subscribers)
```php
/* 3. Filters */

// 3.1
function slb_subscriber_column_headers( $columns ) {

  // creating custom column header data
  $columns = array(
    'cb' => '<input type="checkbox" />',
    'title' => __('Subscriber Name'),
    'email' => __('Email Address'),
  );

  // returning new columns
  return $columns;

}
```

* `cb` stands for checkbox
* We keep the checkbox
* But we add a `title` and `email` column
* __()
  - Built in function in WordPress
  - To be used with other languages (French, Japanese...)
    + Good Practice to use
    + So changing languages is easy
* We finally return `$columns` back to WordPress and it will override our out of the box WordPress column `titles`
* We now need to call this function inside of a hook so that our code will run
* [WordPress filter codex](https://developer.wordpress.org/reference/functions/add_filter/)
* Add this code to call our filter

```
// 1.2
// hint: register custom admin column headers
add_filter('manage_edit-slb_subscriber_columns', slb_subscriber_column_headers');

/* 2. Shortcodes */
```

* View in Admin Dashboard

![new columns](https://i.imgur.com/y99uPlO.png)

## Add function to handle custom column data

```php
// 3.2.2
// hint: registers specia custom admin title columns
function slb_register_custom_admin_titles() {

  add_filter(
    'the_title',
    'slb_custom_admin_titles',
    99,
    2
  );
}

// 3.2.3
// hint: handles custom admin title "title" column for post types without titles
function slb_custom_admin_titles( $title, $post_id ) {

  global $post;

  $output = $title;

  if( isset($post->post_type) ):
    switch( $post->post_type ) {
      case 'slb_subscriber':
        $fname = get_field('slb_fname', $post_id );
        $lname = get_field('slb_lname', $post_id );
        $output = $fname . ' ' . $lname;
        break;
    }
  endif;

  return $output;

}
```

* Add a hook to call `slb_custom_admin_titles()`

```php
add_action(
  'admin_head-edit.php',
  'slb_register_custom_admin_titles'
);
```

* [documentation on admin_head](https://codex.wordpress.org/Plugin_API/Action_Reference/admin_head)
* We now have first and last name in Subscribers

![first last name](https://i.imgur.com/GQpRKw7.png)

## Update title in Lists
* Final code

```php
<?php

/*
 Plugin Name: Snappy List Builder
 Plugin URI: 
 Author:: PEH2
 License: GPL2
 License URI: https://www.gnu.org/licenses/gpl-2.0.html
 Text Domain: snappy-list-builder
 */


/* 0. TABLE OF CONTENTS */

/*
    1. HOOKS
        1.1 - registers all our custom shortcodes
        1.2 - register custom admin column headers
        1.3 - register custom admin column data 

    2. SHORTCODES
        2.1 - slb_register_shortcodes()
        2.2 - slb_form_shortcode()
        
    3. FILTERS
        3.1 - slb_subscriber_column_headers()
        3.2 - slb_subscriber_column_data()
        3.2.2 - slb_register_custom_admin_tites()
        3.2.3 - slb_custom_admin_titles()
        3.3 - slb_list_column_headers()
        3.4 - slb_list_column_data()

    4. EXTERNAL SCRIPTS

    5. ACTIONS

    6. HELPERS

    7. CUSTOM POST TYPES

    8. ADMIN PAGES

    9. SETTINGS
 */

/* 1. Hooks */

// 1.1
// hint: registers all our custom shortcodes on init
add_action('init', 'slb_register_shortcodes');

// 1.2
// hint: register custom admin column headers
add_filter('manage_edit-slb_subscriber_columns', 'slb_subscriber_column_headers');
add_filter('manage_edit-slb_list_columns', 'slb_list_column_headers');

// 1.3
// hint: register custom admin column data
add_filter('manage_slb_subscriber_posts_custom_column', 'slb_subscriber_column_data', 1, 2);

add_action(
  'admin_head-edit.php',
  'slb_register_custom_admin_titles'
);
add_filter(
  'manage_slb_list_posts_custom_column',
  'slb_list_column_data',
  1,
  2
);

/* 2. Shortcodes */

// 2.1
// hint: registers all our custom shortcodes
function slb_register_shortcodes() {

  add_shortcode('slb_form', 'slb_form_shortcode');
  
}

// 2.2
function slb_form_shortcode( $args, $content="") {

  // setup output variable = the form html
  $output = '

      <div class="slb">
      
        <form id="slb-form" name="slb-form" class="slb-form" method="post">
        
          <p class="slb-input-container">

            <label>Your Name</label></br>
            <input type="text" name="slb_fname" placeholder="First Name" />
            <input type="text" name="slb_lname" placeholder="Last Name" />

          </p>

          <p class="slb-input-container">

            <label>Your Name</label></br>
            <input type="email" name="slb_email" placeholder="example@email.com" />

          </p>';
          
          // including content in our form html if content
          // is passed into function
          if( strlen($content) ):

            $output .= '<div class="slb-content">' . wpautop($content) . '</div>';

          endif; 
          
          // completing our form html
          $output .= '<p class="slb-input-container">

            <input type="submit" name="slb_submit" value="Sign Up" />

          </p>

        </form>

      </div>
';

  // return our results/html
  return $output;
}

/* 3. Filters */

// 3.1
function slb_subscriber_column_headers( $columns ) {

  // creating custom column header data
  $columns = array(
    'cb' => '<input type="checkbox" />',
    'title' => __('Subscriber Name'),
    'email' => __('Email Address'),
  );

  // returning new columns
  return $columns;

}

// 3.2
function slb_subscriber_column_data( $column, $post_id ) {

  // setup our return text
  $output = '';

  switch( $column ) {

    case 'title':
      // get the custom name data
      $fname = get_field('slb_fname', $post_id );
      $lname = get_field('slb_lname', $post_id );
      $output .= $fname . ' ' . $lname;
      break;
    case 'email':
      // get the custom email data
      $email = get_field('slb_email', $post_id );
      $output .= $email;
      break;
  }

  // echo the output
  echo $output;

}

// 3.2.2
// hint: registers special custom admin title columns
function slb_register_custom_admin_titles() {

  add_filter(
    'the_title',
    'slb_custom_admin_titles',
    99,
    2
  );
}

* `99` - lower in priority because we want it to run last
* `2` - We want two excepted arguments passed in (column and post id)


// 3.2.3
// hint: handles custom admin title "title" column for post types without titles
function slb_custom_admin_titles( $title, $post_id ) {

  global $post;

  $output = $title;

  if( isset($post->post_type) ):
    switch( $post->post_type ) {
      case 'slb_subscriber':
        $fname = get_field('slb_fname', $post_id );
        $lname = get_field('slb_lname', $post_id );
        $output = $fname . ' ' . $lname;
        break;
    }
  endif;

  return $output;

}
```
* Then you need to add a new hook

```php
// 1.3
// hint: register custom admin column data
add_filter('manage_slb_subscriber_posts_custom_column','slb_subscriber_column_data',1,2);
add_action('admin_head-edit.php', 'slb_register_custom_admin_titles');
```

* After making this change you will now see the name of the subscriber
* This code was needed to make this work in modern versions of wordpress

```
// 3.3
function slb_list_column_headers( $columns ) {

  // creating custom column header data
  $columns = array(
    'cb' => '<input type="checkbox" />',
    'title' => __('List Name')
  );

  // returning new columns
  return $columns;

}

// 3.4
function slb_list_column_data( $column, $post_id ) {

  // setup our return text
  $output = '';

  switch( $column ) {

    case 'example':
      // get the custom name data

      /* $fname = get_field('slb_fname', $post_id ); */
      /* $lname = get_field('slb_lname', $post_id ); */
      /* $output .= $fname . ' ' . $lname; */
      break;
  }

  // echo the output
  echo $output;

}



/* 4. External Scripts */

/* 5. Actions */

/* 6. Helpers */

/* 7. Custom Post Types */

/* 8. Admin Pages */

/* 9. Settings */
```


