# WordPress Notes

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)

## JavaScript Components With Bootstrap

How did we attach our JavaScript?
Inside `functions.php`
Inside the theme_js() function.
We both conditionally loaded JavaScript files and directly load a file.

Add new file `js/theme.js`

and add the following code below our exist wp_enqueue_script()

```javascript
 wp_enqueue_script( 'theme_js', get_template_directory_uri() . '/js/theme.js', array('jquery', 'bootstrap_js'), '', true );
```

**noted items**

* add a handle so we can call it when we need to add a dependency
* we point to the path where our new JavaScript file resides inside our theme (`theme.js`)
* we add a dependency of `bootstrap_js` (using the handle), so we want to make sure jQuery and bootstrap are both loaded before our theme.js
* we add true as last parameter to make sure JavaScript gets injected into the footer hook (bottom of our page where JavaScript should be inserted)

Add this comment to your `theme.js`

`theme.js`

```javascript
// just a lonely comment here... nothing to see
```

View your site in the browser, check the source for `theme.js`
* click on the file in the source code and the link will take you to the file an the browser will show you the comment. Nice!

But nothing is really happening right now. Let's change that.

## JavaScript components on Bootstrap
[link](http://getbootstrap.com/javascript/)

### Add a Carousel
Features
* easy navigation
* text description of each image
* links to specif page per slide

Where?
Blog Page
Add Carousel Bootstrap HTML to top of Blog page
Create custom query that will pull in all featured posts
display posts featured images

[Add 3 categories](https://i.imgur.com/ZJq0pdY.png) of `Featured`, `Soccer`, `Video`

Add 3 posts, 1 with each category. Add a youtube video inside the post with the `video` category.
Make sure 2 posts have a category of 'Featured'

Grab carousel code from bootstrap

home.php

```php
<div class="col-md-9">
  <div class="page-header">
     <!-- gives us the name of the page itself -->
      <h1><?php wp_title(''); ?></h1>
  </div>

  <?php

    $args = array(
      'post_type'     => 'post',
      'category_name' => 'featured'
    );
    $the_query = new WP_Query( $args );
  ?>

  <?php if ( have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

    <p><?php the_title(); ?></p>
  <?php endwhile; endif; ?>

  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>

    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div class="item active">
        <img src="..." alt="...">
        <div class="carousel-caption">
          ...
        </div>
      </div>
      <div class="item">
        <img src="..." alt="...">
        <div class="carousel-caption">
          ...
        </div>
      </div>
      ...
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
```

Test it out in the browser. You should see the text from the two posts with the 'Featured' category

Slide show is trying to work but it's broken.

If Test was successful just wrap the li inside the if loop

```php
<ol class="carousel-indicators">
<?php if ( have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
  <li data-target="#carousel-example-generic" data-slide-to="<?php echo $the_query->current_post; ?>" class="<?php if( $the_query->current_post == 0 ):?>active<?php endif; ?>"></li>
  <?php endwhile; endif; ?>

</ol>
```

* we need to replace the data-slide-to="0" with dynamic code
* we set class to active if it is the first slide
* we need to reset our loop so we can use it further down the page
    - `rewind_posts()`

```php
<?php rewind_posts(); ?>
<!-- Wrapper for slides -->
```

* the `rewind_posts()`; does not blow up the loop, it restarts it from the beginning



[Add an image with dimensions 900px x 338px](http://www.douglasmcc.co.uk/wp-content/uploads/2011/12/model-comp.jpg)



![theme.js in source](https://i.imgur.com/3sBNajz.png)

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

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)
