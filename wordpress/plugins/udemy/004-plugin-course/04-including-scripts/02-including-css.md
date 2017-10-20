# Including CSS

`css/public/snappy-list-buider.css`

```css
.slb-form {
  overflow: hidden;
  float: none;
  max-width: 400px;
  margin: 0 auto 2em auto;
  padding: 1em;
  padding-bottom: 0;
  background: #fff;
  border: 3px solid #fafafa;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 2px;
  
}

.slb-form * {
  font-family: arial;
  color: #444;
}

h3.slb-title {
  display: block;
  float: none;
  overflow:hidden;
  font-size: 1.8rem;
  line-height: normal;
    padding: 1em;
    margin: -1em -1em 2em -1em !important;
    background: #fafafa;
  border: 1px solid #444;
}

.slb-input-container {
  display: block;
  float: none;
  overflow: hidden;
  margin: 0 0 1.5em 0;
  padding: 0 0 1em 0;
  border-bottom: 3px solid #fafafa;
}

.slb label {
  font-size: 1.8rem;
  font-weight: bold;
}

.slb-content {
  overflow: hidden;
  padding: 1em 0;
}

.slb-content p {
  margin: .5em 0;
}

.slb input[type=submit] {
  width: 100%;
  margin: 0;
    padding: 0.8125em 1.625em;  
    color: #fff;
  font-size: 1.6rem;
  line-height: normal;
    border: 0;
    cursor: pointer;
    background: #444;
  border-radius: 2px;
    -webkit-appearance: button;
}

.slb input[type=submit]:hover {
  background: #222;
}

.slb input[type=text] {
  border: 1px solid rgba(51, 51, 51, 0.1);
  background: #fafafa;
  border-radius: 2px;
  margin-bottom: .5em;
}
```

Add the CSS
```php
function slb_public_scripts() {

  // register scripts with WordPress's internal library
  wp_register_script('snappy-list-builder-js-public', plugins_url('/js/public/snappy-list-builder.js',__FILE__), array('jquery'),'',true);

  wp_register_style('snappy-list-builder-css-public', plugins_url('/css/public/snappy-list-builder.css',__FILE__));

  // add to que of scripts that get loaded into every page
  wp_enqueue_script('snappy-list-builder-js-public');
  wp_enqueue_style('snappy-list-builder-css-public');
}
```

## Add title in shorcode
```
// 2.2
// hint: returns a html string for a email capture form
function slb_form_shortcode( $args, $content="") {

  // get the list id
  $list_id = 0;
  if( isset($args['id']) ) $list_id = (int)$args['id'];

  // title
  $title = '';
  if( isset($args['title']) ) $title = (string)$args['title'];
  // setup our output variable - the form html
  $output = '

    <div class="slbr">

      <form name="slb_form" class="slb-form"
      action="/wp-admin/admin-ajax.php" method="post">

        <input type="hidden" name="slb_list" value="'. $list_id .'">';

        if( strlen($title) ):
        
          $output .= '<h3 class="slb-title">' . $title . '</h3>';

        endif;

        $output .= '<p class="slb-input-container">

// MORE CODE
```

### Edit post and update shortcode
* Just add title attribute to shortcode

```
this is a test

[slb_form id="11" title="this is my title"]this is a test really![/slb_form]
```
