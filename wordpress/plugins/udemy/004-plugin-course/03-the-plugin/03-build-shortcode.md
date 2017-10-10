# Building Custom Shortcodes
* Create form to capture user info

## What is shortcode?
* A WordPress specific code that lets you do cool things will little effort
* Shortcode === short cut
* They output something
* It has to be some type of text string
* Allow you to have settings
  - example: HTML attribute
  - These settings are optional
  - You can use as many settings as you want
  - Uses can pass this information into their shortcode
  - Shortcode can wrap around content and manipulate that content
  - They can take so much time to create but if they are built well they will save so much time (hours!)

### What can shortcode do?
* Embed files
* Create objects that would normally require a lot of complicated ugly code

## Code Organization
```
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

    2. SHORTCODES

    3. FILTERS

    4. EXTERNAL SCRIPTS

    5. ACTIONS

    6. HELPERS

    7. CUSTOM POST TYPES

    8. ADMIN PAGES

    9. SETTINGS
 */

/* 1. Hooks */


/* 2. Shortcodes */


/* 3. Filters */

/* 4. External Scripts */

/* 5. Actions */

/* 6. Helpers */

/* 7. Custom Post Types */

/* 8. Admin Pages */

/* 9. Settings */
```

* if ( true )
* strlen() - string length
* wpautop() - auto add paragraph tags
* add_shortcode($string, tag);a
* ohcount (add with brew) - counts lines of code

working code with short code

`snappy-list-builder.php`

```
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

    2. SHORTCODES
        2.1 - slb_register_shortcodes()
        2.2 - slb_form_shortcode()
        
    3. FILTERS

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

/* 4. External Scripts */

/* 5. Actions */

/* 6. Helpers */

/* 7. Custom Post Types */

/* 8. Admin Pages */

/* 9. Settings */
```
