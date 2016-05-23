# WordPress Notes

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)
* [part 5](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-5.md)

## JavaScript Components With Bootstrap

### How did we attach our JavaScript?

1. Inside `functions.php`
2. Inside the `theme_js()` function.
3. We both conditionally loaded JavaScript files and directly load a file.

### Create a new custom JavaScript file (`theme.js`)
In the terminal create a new file: `js/theme.js`
* add the following code below our exist `wp_enqueue_script()`

```javascript
 wp_enqueue_script( 'theme_js', get_template_directory_uri() . '/js/theme.js', array('jquery', 'bootstrap_js'), '', true );
```

**noted items**

* add a handle so we can call it when we need to add a dependency
* we point to the path where our new JavaScript file resides inside our theme (`theme.js`)
* we add a dependency of `bootstrap_js` (using the handle), so we want to make sure jQuery and bootstrap are both loaded before our theme.js
* we add true as last parameter to make sure JavaScript gets injected into the footer hook
  - bottom of our page where JavaScript should be inserted

### Test to see if the file works

We have used `functions.php` to enqueue our JavaScript files before. We're doing the same thing again but we need to make sure the file is getting injected and we can view it in our page source.

#### Add Comment Test Placeholder
Add this comment to your `theme.js`

`theme.js`

```javascript
// just a lonely comment here... nothing to see
```

![theme.js in source](https://i.imgur.com/3sBNajz.png)

View your site in the browser, check the source for `theme.js`

* click on the file in the source code and the link will take you to the file an the browser will show you the comment. Nice!

But nothing is really happening right now. Let's change that.

## JavaScript components on Bootstrap
[link to all Bootstrap JavaScript components](http://getbootstrap.com/javascript/)

### Add a Carousel
Features
* easy navigation
* text description of each image
* links to specif page per slide

### What page are we going to add this component to?
Blog Page

### What we want to achieve
1. Add Carousel Bootstrap HTML to top of Blog page
2. Create custom query that will pull in all featured posts
3. Display posts featured images

[Add 3 categories screenshot](https://i.imgur.com/ZJq0pdY.png) of `Featured`, `Soccer`, `Video`

### Todo Tasks for you to complete
* Add `(3)` posts, `(1)` with each category. 
* Add a youtube video inside the post with the `video` category.
* Make sure `(2)` posts have a category of 'Featured'

### Copying some bootstrap code

Bootstrap has chunks of code you can easily copy and paste into your projects. 

#### Copy the carousel code

[here is the code](https://getbootstrap.com/javascript/#carousel) 
[code screenshot](https://i.imgur.com/UwUUKNm.png)

`home.php`

```php
<div class="col-md-9">
  <div class="page-header">
     <!-- gives us the name of the page itself -->
      <h1><?php wp_title(''); ?></h1>
  </div><!-- END .page-header -->

  [PASTE THE CODE HERE]
```

## Test to see if our code is working

We will build this piece by piece:

### Create an array

* this will hold the post type and the category name
* we pass those parameters into `WP_Query()`

```php
[ADD this just below the closing div of .page-header]

<?php

    $args = array(
      'post_type'     => 'post',
      'category_name' => 'featured'
    );
    $the_query = new WP_Query( $args );
  ?>
```

## What is a WordPress custom query?

[article with some more info on WP_Query()](http://www.hongkiat.com/blog/wordpress-query-basic/)
Under that code we need to run our test to see if we can see our titles

* we used that `if` statement before so we copy and paste it here
* we just grab our title
* we end our while and if

```php
 <?php if ( have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

    <p><?php the_title(); ?></p>
  <?php endwhile; endif; ?>
```

Test it out in the browser. You should see the text from the two posts with the `Featured` category

[It should look something like this](https://i.imgur.com/iAcewyl.png).

Slide show is trying to work but it's broken. No Images yet but we are seeing the titles from our posts so it's kind of working but we still have work to do.

### Add dynamic slide numbers
If Test was successful just wrap the li inside the if loop

Delete this line because we don't need it any more. Our test is complete.

`home.php`

```php
<p><?php the_title(); ?></p>
```

* We want to loop through all the `Featured` posts and populate the `data-slide-to` attribute with a number representing the current post (`$the_query->current_post`)
* And we want to add a class of `active` if the current post is 0

Now wrap the ordered lists' `LI` with the if and the closing endwhile and endif.

It should look like this:

`home.php`

```php
<ol class="carousel-indicators">
<?php if ( have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
  <li data-target="#carousel-example-generic" data-slide-to="<?php echo $the_query->current_post; ?>" class="<?php if( $the_query->current_post == 0 ):?>active<?php endif; ?>"></li>
  <?php endwhile; endif; ?>

</ol>
```

* we need to replace the data-slide-to="0" with dynamic code
* we set class to active if it is the first slide

Test and inspect and you should see that it is working

![dynamic code is working](https://i.imgur.com/f3GorJQ.png)

## Reset our loop

When a loop runs and gets to the end it stops and can't run again unless we specifically tell it to.

### `rewind_posts()`
* we need to reset our loop so we can use it further down the page
    - `rewind_posts()`

```php
<?php rewind_posts(); ?>
<!-- Wrapper for slides -->
```

* the `rewind_posts()`
  - does not blow up the loop, it restarts it from the beginning
  - there are some resets that blow up the loop

So now we can reuse our loop again.
* this time we want to spit out carousel items
* our caption will just be the post title

```php
<?php rewind_posts(); ?>
          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">

            <?php if ( have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

            <div class="item active">
              <img src="" alt="">
              <div class="carousel-caption"><?php the_title(); ?></div>
            </div>

          <?php endwhile; endif; ?>
```

If we view our page it doesn't look too great but if we view our source things look a bit more promising.

![source code of carousel items working](https://i.imgur.com/dg2z5kd.png)

* but we still need to get our images working and their alt attributes

### Responsive images
* we could pull in the images
* or we could pull in the URL of the images
  - gives us more flexibilty in creating responsive images

#### Reusing code

We obtained the image URL before in `page-portfolio.php` so we can go into that file and copy the code.

code fragment from `page-portfolio.php`

```php
<?php
  $thumbnail_id = get_post_thumbnail_id();
  $thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
?>
```

And grab the image tag code too

```php
<a href="<?php the_permalink(); ?>"><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></a>
```

* we will change `graphic` to `featured image`

`home.php`

```php
<div class="item active">

  <?php
    $thumbnail_id = get_post_thumbnail_id();
    $thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
  ?>
  <a href="<?php the_permalink(); ?>"><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></a>
  <div class="carousel-caption"><?php the_title(); ?></div>
</div>
```

When we inspect we'll see something similar to this:

![carousel image source code](https://i.imgur.com/6qR8RN2.png)

### Improving information on alt attribute
* where did the original image come from

change the code to this:

`home.php`

```php
<?php
      $thumbnail_id = get_post_thumbnail_id();
      $thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
      $thumbnail_meta = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true );
    ?>
    <a href="<?php the_permalink(); ?>"><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php echo $thumbnail_meta; ?>"></a>
    <div class="carousel-caption"><?php the_title(); ?></div>
  </div>

<?php endwhile; endif; ?>
```

### Make everything not active

we have hard coded `active` class
this means everything shows
copy the code we used to dynamically show active

change this

```php
<div class="item active">
```

to this

```php
<div class="item <?php if( $the_query->current_post == 0 ):?>active<?php endif; ?>">
```

Now our carousel is showing the images.

Make sure you delete this code as we don't need it

```html
<div class="item">
              <img src="..." alt="...">
              <div class="carousel-caption">
                ...
              </div>
            </div>
            ...
```

## Make images appear on `single.php`

Just copy the code from `home.php` and past under the title
* also remove the link as it's not needed

`single.php`

```php
<h1><?php the_title(); ?></h1>
            <?php
              $thumbnail_id = get_post_thumbnail_id();
              $thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
              $thumbnail_meta = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true );
            ?>
            <p>
              <img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php echo $thumbnail_meta; ?>">
            </p>
```

check it out and you should see it works nicely

[Add an image with dimensions 900px x 338px](http://www.douglasmcc.co.uk/wp-content/uploads/2011/12/model-comp.jpg)

image is too large so let's make it more responsive

`single.php`

* add this class

```php
<p class="featured-image">
  <img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php echo $thumbnail_meta; ?>">
</p>
```

update `styles.css`

```css
/* make images reponsive */
.featured-image img,
.portfolio-piece img,
.portfolio-image img {
    max-width: 100%;
}
```

## move title below image

`single.php`

Pure aestetic improvement. Just move the `<?php the_title(); ?>` below the image.

We can add a slideshow anywhere (even in our sidebar)

# Dropdown Bootstrap Menus

[link to dropdowns](https://getbootstrap.com/javascript/#dropdowns)

## Why do they not work out of the box in WordPress?

They require additional markup.

## The Walker Class

In order for WordPress to use Bootstrap Dropdowns properly, we have to use the Walker Class

### What is `The Walker Class`
In WordPress the Walker Class allows the developer to deconstruct all the main navigation elements that appear for a specific menu and restylize or reformat them or logically reformat them as needed.

[link to wp-bootstrap-navwalker](https://github.com/twittem/wp-bootstrap-navwalker)
* it is a single `PHP` file `wp_bootstrap_navwalker.php` that you include and link to in your `functions.php` file that will enable you to:
  - add custom dropdown menus
  - add glyphicons to the menu links

#### The Walker Class Instructions
1. Grab wp_bootstrap_navwalker.php from the repo (link above)
2. Save into root of your custom theme
3. Add this to `functions.php`

`functions.php`

```php
/ Register Custom Navigation Walker
require_once('wp_bootstrap_navwalker.php');
```

4. Update your `wp_nav_menu()` in `header.php` to use this:
5. Display the Menu
  - To display the menu you must associate your menu with your theme location. You can do this by selecting your theme location in the Theme Locations list while editing a menu in the WordPress menu manager.

```php
<?php
   wp_nav_menu( array(
       'menu'              => 'primary',
       'theme_location'    => 'primary',
       'depth'             => 2,
       'container'         => 'div',
       'container_class'   => 'collapse navbar-collapse',
 'container_id'    => 'bs-example-navbar-collapse-1',
       'menu_class'        => 'nav navbar-nav',
       'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
       'walker'            => new wp_bootstrap_navwalker())
   );
?>
```

5. Declare your new menu

```php
register_nav_menus( array(
    'primary' => __( 'Primary Menu', 'THEMENAME' ),
) );
```

### More NavWalker Tutorials
* [Video Tutorial](https://www.youtube.com/watch?v=pGD8Q72ej60)
* [Article Tutorial](http://code.tutsplus.com/tutorials/how-to-integrate-bootstrap-navbar-into-wordpress-theme--wp-33410)

### How to Add Modal Windows

[link to Bootstrap Modals](https://getbootstrap.com/javascript/#modals)

### Add Ninja Forms Plugin
* I like this form plugin because it doesn't just email, it also allows you to see all the submissions which are stored in a db table.

[link to ninja forms plugin](https://wordpress.org/plugins/ninja-forms/)

(Use `WP-CLI` and make life better)

1. Install it
2. Activate it

Copy Modal code and paste below `FOOTER` element in `footer.php`

```html
<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Contact Us</h4>
      </div>
      <div class="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```


* we changed the title
* we also will copy and paste the Ninja Forms Template function and put it here

```php
<div class="modal-body">
  <?php
    if( function_exists( 'ninja_forms_display_form' ) ){ ninja_forms_display_form( 1 ); }
  ?>
</div>
```

* remove save changes button

View page, not there.
View source, it's there (css says `display:none;`)

[source screenshot](https://i.imgur.com/GUgHzum.png)

## Add button to trigger Modal

* copy code
* go to Widgets in WordPress admin
* Drag text widget in sidebar
* Give title of `Contact Us`
* Paste the code into the body of the widget

```html
<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myContactForm">
  Launch demo modal
</button>
```

* change id of modal to what works for your project
  - I'll use `#myContactForm`

* go into your modal in `footer.php` and add

```html
<div class="modal fade" tabindex="-1" role="dialog" id="myContactForm">
```

Test it out and you'll see it works and disappears super fast.

### Plugin Conflict
Here is the fix:

![Change the following setting](https://i.imgur.com/zeHibOR.png)

* unchecking Bootstrap CSS and JS does the job.

Save changes and test. It should work!

### Off Canvas

off canvas example

* grab the css and paste into `style.css`


FIN

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)
* [part 5](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-5.md)
