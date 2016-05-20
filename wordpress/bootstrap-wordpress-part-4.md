# WordPress Notes

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)
* [part 5](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-5.md)

# Custom Post Types

WordPress comes with these post types

* Post
* Page
* Attachment
* Revision
* Nav Menu

You can create your own custom post types ([more info](http://www.wpbeginner.com/wp-tutorials/how-to-create-custom-post-types-in-wordpress/))

## Create a Landing Page

### Custom Post Types
Install and activate these plugins
* [Custom Post Types UI](https://wordpress.org/plugins/custom-post-type-ui/)
* [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields)

Use Dashboard to create a new Post Type called `portfolio`

![add custom post type](https://i.imgur.com/OW873Nk.png)

![add these settings and click `Add Post Type`](https://i.imgur.com/RooEaIK.png)

### Add New Field Group
1. Click `Custom Fields` in sidebar of Dashboard
2. Click `Add New` in Field Groups
3. Enter title under `Add New Field Group` as `Portfolio`
4. Click `+ Add Field` button
5. Enter a field Label as `link`
6. Select from `Style` dropdown `Standard (WP metabox)`
7. Click `Hide / Show All` at top of checkboxes
8. Then uncheck (to show) Permalink, Content Editor, Featured Image
9. Under `Location` beside `Rules` set `Post Type` `is equal to` `portfolio` and click the `Add rule group` button
10. Click `Publish` button.

**You now see a `portfolios` button on your Dashboard sidebar**
![portfolios button](https://i.imgur.com/EfgqcLo.png)

### Add a Portfolio item

Click `portfolios` Dashboard sidebar button and click `Add New` button

**Name 'Pele'**
1. Enter Latin Filler text for body content.
2. For link add: `http://www.absolutearts.com/portfolio3/l/lonvig/pele-1047734135m.jpg`
3. Publish

### Add Featured Image

Where are `featured images?`

It just doesn't appear. You have to add that option via `functions.php`

`functions.php`

* add this `add_theme_support( 'post-thumbnails' );` under the add_theme_support( 'menus' );

![post-thubmails](https://i.imgur.com/LWE6o9w.png)

Now if you create a new post or update an existing post you'll see this in WordPress admin which means you now can add featured images.

~[featured image](https://i.imgur.com/AvID2JS.png)

### Group Add Images to WordPress

1. Find 5 soccer player paintings and save them to your Downloads folder.
2. Click `Media` and drag and drop them all in
3. Create portfolio pages for all 5 of them.
    * make sure to add the images so they are all featured images of the post

**example of featured image:**

![sample feature image](https://i.imgur.com/nloBufX.png)

## Porfolio page

1. Name it `Portfolio Grid w Custom Posts` 
2. Set `parent` as `Sample Pages`
3. Publish

### page-portfolio.php

This will be a new template based on the `page-full-width.php` template

Save `page-full-width.php` as `page-portfolio.php`

`page-portfolio.php`

```php
<?php
/*
  Template Name: Page Portfolio Grid Template
 */
?>
<?php get_header(); ?>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
          <!-- tbs class for headers -->
          <div class="page-header">
            <!-- the_title() is WP function that shows the title of the post -->
            <h1><?php the_title(); ?></h1>
          </div>
          <!-- WP function that outputs post content -->
          <?php the_content(); ?>

        <?php endwhile; else: ?>
           <!-- we run this else if there is no content -->
          <div class="page-header">
            <h1>Wups!</h1>
          </div>

          <p>Looks like we have no content for this page?</p>

        <?php endif; ?>
      </div>

    </div><!-- END .row -->

<?php get_footer(); ?>
```

* Now edit `Portfolio Grid w Custom Posts` to use `Page Portfolio Grid Template`
* See if you can add it to dropdown on our menu
* View page and see if link works

In `Settings > Media` _(Dashboard)_, change default size for thumbnails to be `260px` x `260px`

![screenshot](https://i.imgur.com/2aNHkcD.png)

`page-portfolio.php`

* add this chunk of code below the 1st row

```php
 <div class="row">

      <?php
        $args = array(
          'post_type' => 'portfolio'
        );
        $the_query = new WP_Query( $args );
      ?>

      <?php if ( have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

      <div class="class col-sm-3 portfolio-piece">
        <p><?php the_post_thumbnail('medium' ); ?></p>
        <h3><?php the_title(); ?></h3>
      </div>

    <?php endwhile; endif; ?>
    </div>
```

[Should look something like this](https://i.imgur.com/sxYA9cM.png)

## Make Portfolio and images more responsive

**note** Bootstrap 4 has a new class called `img-fluid` that does this out of the box

Change the row to this:

```php
<div class="row">

      <?php
        $args = array(
          'post_type' => 'portfolio'
        );
        $the_query = new WP_Query( $args );
      ?>

      <?php if ( have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

      <div class="col-xs-3 portfolio-piece">
       <?php
         // grab the id of the thumbnail
         $thumbnail_id = get_post_thumbnail_id();
         // grab the url of the thumbnail
         $thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
       ?>
        <!-- dynamically create images -->
        <p><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></p>
        <h4><?php the_title(); ?></h4>
      </div>

    <?php endwhile; endif; ?>
    </div>
```

**Add some new CSS** 

`style.css`

```css
/* make images reponsive */
.portfolio-piece img {
    max-width: 100%;
}

@media (min-width:540px) {
    .portfolio-piece h4 {
        font-size: .8em;
    }
}
```

## Add rows dynamically when we have 4 items

```php
<div class="row">

      <?php
        $args = array(
          'post_type' => 'portfolio'
        );
        $the_query = new WP_Query( $args );
      ?>

      <?php if ( have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

      <div class="col-xs-12 col-md-3 portfolio-piece">
       <?php
         $thumbnail_id = get_post_thumbnail_id();
         $thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
       ?>

        <p><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></p>
        <h4><?php the_title(); ?></h4>
      </div>

      <?php $portfolio_count = $the_query->current_post + 1; ?>
      <?php if ( $portfolio_count % 4 === 0): ?>
        </div><div class="row">
      <?php endif; ?>

    <?php endwhile; endif; ?>
    </div>
```

This will automatically add a Bootstrap row when 4 columns have been reached. Makes the layout look much nicer.

## Link thumbnails to specific portfolio page

When you click on a portfolio thumbnail you want to be taken to the large image of the portfolio piece.

modify your fragment of code to look like this:

```php
 <p><a href="<?php the_permalink(); ?>"><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></a></p>
        <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
```

## Fix wrong link to single.php page

We need it to go to a different single template, one that we will build now. This `single.php` page will be just for our portfolio section.

## Single Page for Portfolio

Save `page-full-width.php` as `single-portfolio.php`

* we will remove the template comment at the top. Why
  - because of the naming convention (hierarchy) WordPress uses. The `single-` followed by the name of the page will automatically work

We want our `full page` to have

* Large image on the left
* meta data about the image on the right

## Create a single page template just for porfolio pieces

`single-portfolio.php`

```php
<?php get_header(); ?>

  <div class="container">
    <div class="row">

        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
           <div class="col-md-8 portfolio-image">
            <?php
              $thumbnail_id = get_post_thumbnail_id();
              $thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
            ?>

            <p><a href="<?php the_permalink(); ?>"><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></a></p>
           </div>

            <div class="col-md-4">
             <h1><?php the_title(); ?></h1>
             <?php the_content(); ?>

            </div>

        <?php endwhile; else: ?>
           <!-- we run this else if there is no content -->
          <div class="page-header">
            <h1>Wups!</h1>
          </div>

          <p>Looks like we have no content for this page?</p>

        <?php endif; ?>


    </div><!-- END .row -->

<?php get_footer(); ?>
```

## Responsive Design Improvements

### Problem with large images

* need to make them responsive

Modify the **.porfolio-piece** CSS rule in `style.css`

`style.css`

```css
/* make images reponsive */
.portfolio-piece img,
.portfolio-image img {
    max-width: 100%;
}
```

* It collapses too soon so change the classes

`single-portfolio.php`

**Change**

`<div class="col-md`

**To**

`<div class="col-sm`

## Add Chrome Extension for Breakpoints

See breakpoints with chrome extension

Add `Viewport Dimensions` [link](https://chrome.google.com/webstore/detail/viewport-dimensions/kchdfagjljmhgapoonapmfngpadcjkhk)

## Add Navigation for Portfolio

`single-portfolio.php` (code fragment)

```php
<div class="container">

   <div class="page-header">
     <div class="row">
       <div class="col-xs-9">
         <h1>Players</h1>
       </div>
       <div class="col-xs-3 prev-next">
         <?php next_post_link( '%link', 'Left' ); ?>
         <?php previous_post_link( '%link', 'Right' ); ?>
       </div>
     </div>
   </div>

    <div class="row">
```

## Bootstrap Glyphicons [link](http://getbootstrap.com/components/)

* replace the 3 col navigation with the following code fragment

```php
<div class="col-xs-3 prev-next">
 <?php next_post_link( '%link', '<span class="glyphicon glyphicon-circle-arrow-left"></span>' ); ?>
 <a href="<?php bloginfo('url'); ?>/?p=54"><span class="glyphicon glyphicon-th"></span></a>
 <?php previous_post_link( '%link', '<span class="glyphicon glyphicon-circle-arrow-right"></span>' ); ?>
 </div>
```

* [where did I get `54` from?](https://i.imgur.com/jILGDT7.png)

## How do I add a link to original image (using custom post link we created earlier)

```php
<div class="col-md-4">
 <h1><?php the_title(); ?></h1>
 <?php the_content(); ?>
 <p><a class="btn btn-large btn-primary" href="<?php the_field('link'); ?>" target="_blank">View Final Piece <span class="glyphicon glyphicon-fullscreen"></span></a></p>
</div>
```

## Convert index.php from static to dynamic page

Replace contents of `index.php` with `page.php`

We are turning a static page into a safe generic loop (remember the index.php is the fallback template for everything in WordPress)

# FIN

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)
* [part 5](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-5.md)
