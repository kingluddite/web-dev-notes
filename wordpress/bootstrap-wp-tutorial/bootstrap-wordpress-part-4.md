# WordPress Notes

* [part 1](bootstrap-wordpress-part-1.md)
* [part 2](bootstrap-wordpress-part-2.md)
* [part 3](bootstrap-wordpress-part-3.md)
* [part 4](bootstrap-wordpress-part-4.md)
* [part 5](bootstrap-wordpress-part-5.md)

# Custom Post Types
WordPress comes with these post types

* Post
* Page
* Attachment
* Revision
* Nav Menu

## Where are post types stored in the database?
Open up the `wp_posts` table in the database and you will see a `post_type` field ([screenshot](https://i.imgur.com/293gFsx.png)).

All post types located here.

## What is a Taxonomy?
Think of it as categories.

## When would I use a Custom Post Type or Taxonomy?
[Good article with a good answer](http://www.wpbeginner.com/beginners-guide/when-do-you-need-a-custom-post-type-or-taxonomy-in-wordpress/)

## Create a Porfolio Page
### We'll create a soccer team page.
A common example and good use of creating a new custom post type is creating a portfolio. You have one page highlighting all your portfolio pieces and one page that shows the singular portfolio piece.

As a take on this concept we'll create a page that shows famous soccer players. When you click on the player, you go to a page that has their photo and information about them.

### Custom Post Types

#### Install Plugins
**Install and activate these plugins**

* [Custom Post Types UI](https://wordpress.org/plugins/custom-post-type-ui/)
    - This plugin provides an easy to use interface for creating and administrating custom post types and taxonomies in WordPress. This plugin is for WordPress 3.0 and higher.
    - This plugin alone will not display post types or taxonomy data in customized places within your site; it registers them for you to use.
    - Customise WordPress with powerful, professional and intuitive fields

**Note**: You will need both of these plugins to create and use custom post types

#### Add a custom post type

Use the Dashboard to create a new Post Type called `portfolio`

![add custom post type](https://i.imgur.com/OW873Nk.png)

##### Name the custom post type properly

![add these settings and click `Add Post Type`](https://i.imgur.com/RooEaIK.png)

**Important** Code with caution

Pay attention to how you name the custom post type because the database stores custom post types.

In one lecture I accidentilly gave the post type the name `portfolios` and all the following code broke.
Why?
Because instead of referring to `porfolfios` it reffered to the singler `portfolio`.

The fix would be to go into the `wp_posts` table and rename the `post_type` value from `portfolios` to `portfolio`.

Regardless this error turned out to be a good learning experience and help reduce similar problems from occuring in the future.

### Add New Field Group
We are going to add a link field so that people can click on a link that goes to where you found the original image.

This isn't a great example but it does show you how you can add fields. A better example would be to enter fields that show the player's number. The team they play for and the position they play. When you add a player you can then display their attributes on the page.

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

#### Add Portfolio Item
Add `Pele` as an individual player.

1. Click `portfolios` Dashboard sidebar button
2. Click `Add New` button
3. Enter Latin Filler text for body content.
4. For `link` add: `http://www.absolutearts.com/portfolio3/l/lonvig/pele-1047734135m.jpg`
3. Click `Publish`

### [Add Featured Image](https://codex.wordpress.org/Post_Thumbnails)

Featured Image is an image chosen as the representative image for Posts, Pages or Custom Post Types. The display of this image is up to the theme. This is useful for "magazine-style" themes where each post has an image.

#### How do I start using featured images?
Out of the box, `a featured image` doesn't appear. You have to add that option to your theme via:

`functions.php`

```php
/*==========================================
=            Add Featured Image            =
==========================================*/
add_theme_support( 'post-thumbnails' );
```

![post-thubmails](https://i.imgur.com/LWE6o9w.png)

Now if you create a new post or update an existing post you'll see this in the WordPress admin dashboard. If you see it, congratulations. You can now add featured images.

![featured image](https://i.imgur.com/AvID2JS.png)

### Group Add Images to WordPress
To add groups of images, drag and drop.

[adding images](https://en.support.wordpress.com/add-media/.

1. Find 5 soccer player paintings and save them to your Downloads folder.
2. Click `Media` and drag and drop them all in
3. Create portfolio pages for all 5 of them.
    * make sure to add the images so they are all featured images of the post

**Example of featured image:**

![sample feature image](https://i.imgur.com/nloBufX.png)

## Porfolio Page

Here we are going to create our page that will show our soccer players. We need a new layout so we'll use the [WPHierarchy](https://wphierarchy.com/) to build a page from our `page-full-width.php`.

### page-portfolio.php

Save `page-full-width.php` as `page-portfolio.php` and add this code:

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

### Create a new page

Now we can create a page that follows the above template. Select that template from the template dropdown and we make sure we add page to our menu in the menu part of the WordPress Admin.

1. Name it `Portfolio Grid w Custom Posts`
2. Set `parent` as `Sample Pages`
3. Select `Page Portfolio Grid Template` as the template
4. Add it to dropdown on our menu under Sample page
5. Publish
6. View page in browser to test if it works.

Ok. You have a page but there are no images. Why?

The WordPress loop is not in this page yet.

[What is the WordPress Loop](https://codex.wordpress.org/The_Loop)
The WP Loop by default pulls in all posts and pages. Can we manipulate the loop to filter the result?
Yes and you do this using WP Query.

`[WP_Query()](https://www.smashingmagazine.com/2013/01/using-wp_query-wordpress/)`.

But before we do that, let's show you how to manipulate the defaults sizes of the your uploaded images.

## How do I change the default image sizes when uploaded?
When a user uploads an image, WordPress saves the original image and also creates three other copies for thumbnail, medium and large image sizes. An administrator can adjust these sizes on this page. [Read More](http://www.wpbeginner.com/glossary/media-settings/)

In `Settings > Media` _(Dashboard)_, change default size for thumbnails to be `260px` x `260px`

![screenshot](https://i.imgur.com/2aNHkcD.png)

## Create a Single Portfolio Piece Page
We have our portfolio team page and now we need the single page that will show each individual player.

We need a new page because this will be a new layout that we want to look different from the other pages to highlight our players.

## [WP_Query()](https://codex.wordpress.org/Class_Reference/WP_Queryv)
This WordPress class gives you the ability to alter your result from the WordPress Loop.

Instead of pulling all posts from our database we want to pull a subset which includes our portfolio pieces. To make this work we create a new instance of the `WP_Query()` class and pass it our `portfolio` post_type. Then we return our result which will hold an array of all the porfolio pieces (_or in our example, all our players_).

`page-portfolio.php`

* add this chunk of code **BELOW** the first `ROW`

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

This is what it should look like:

[Should look something like this](https://i.imgur.com/sxYA9cM.png)

## Make Portfolio and images more responsive

* Here we add a class of `portfolio-piece` that we will style our images with CSS.
* We also use WordPress functions to dynamically create the image URL.

**Note** Bootstrap 4 has a new class called `img-fluid` that does this out of the box

Change the row to this:

`page-portfolio.php`

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

## Add Responsive Image CSS

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

This is a cool trick to help make sure your layout doesn't break. It essentially creates a new row dynamically when the images total 4. So if we have 12 images the HTML will look something like this

```html
<div class="row">
 <div class="col-md-3">pic 1</div>
 <div class="col-md-3">pic 2</div>
 <div class="col-md-3">pic 3</div>
 <div class="col-md-3">pic 4</div>
</div>
<div class="row">
 <div class="col-md-3">pic 5</div>
 <div class="col-md-3">pic 6</div>
 <div class="col-md-3">pic 7</div>
 <div class="col-md-3">pic 8</div>
</div>
<div class="row">
 <div class="col-md-3">pic 9</div>
 <div class="col-md-3">pic 10</div>
 <div class="col-md-3">pic 11</div>
 <div class="col-md-3">pic 12</div>
</div>
```

`page-portfolio.php`

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

After 4 columns build, a row will be dynamicaly generated. Makes the layout look much nicer.

## Link thumbnails to specific portfolio page

Click on a portfolio thumbnail and you will see the large image.

When we click on one of the players on our team page, we will get taken to that player page.

Make the following change to your code:

`page-portfolio.php`

```php
 <p><a href="<?php the_permalink(); ?>"><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></a></p>
        <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
```

## Single Page for Portfolio
WordPress is following the WordPress template hierarchy but since we have a different layout for our player page, we need to created a new template.

We need it to go to a different single template, one that we will build now.

### single-portfolio.php
Create a single page template for porfolio pieces

Save `page-full-width.php` as `single-portfolio.php`

* We will remove the template comment at the top. Why?
  - Because of the naming convention the `single-` followed by the name of the page will automatically work

We want our `full player page` to have

* Large image on the left
* meta data about the image on the right

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
Weed to make them responsive

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

We want the ability from within our player page to navigate to the next and previous player.

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
Bootstrap 3 shipped with Glypicons but Bootstrap 4 does not. Since we are using Bootstrap 4 we need to use FontAwesome instead.

[Here is a great article using Gulp instead of Grunt for Bootstrap 4](http://blog.marcrudkowski.com/using-gulp-with-bootstrap-4/)

Bootstrap 4 switched from the LESS CSS preprocessor to the Sass CSS preprocessor. Bootstrap 4 still uses Grunt as a build tool. I prefer Gulp to Grunt because the syntax seems to make more sense to me. These days Gulp is a popular tool but there is also a build tool gaining popularity called Webpack.

I like this article because it shows you how to set up Gulp and Bootstrap 4. It grabs all Bootstrap `.scss` file and `.js` and compresses them all. It also adds useful gulp packages like Browser-sync, autoprex, sourcemaps, babel (for ES6 code).

[Here is the Github to grab the code.](https://github.com/marcrd/bootstrap4playground)

### Improve our Player Navigation
* Add font-awesome instead of glypicon

`single-portfolio.php`

* replace the 3 col navigation with the following code fragment

```php
<div class="col-xs-3 prev-next">
 <?php next_post_link( '%link', '<span class="glyphicon glyphicon-circle-arrow-left"></span>' ); ?>
 <a href="<?php bloginfo('url'); ?>/?p=54"><span class="glyphicon glyphicon-th"></span></a>
 <?php previous_post_link( '%link', '<span class="glyphicon glyphicon-circle-arrow-right"></span>' ); ?>
 </div>
```

## 54?
In the above code you will see `p=54`. 54 is the id of the page in the WordPress Dashboard where we created to show single portfolio pieces
.
* [`54`](https://i.imgur.com/jILGDT7.png)

## How do I add a link to original image (using custom post link we created earlier)

```php
<div class="col-md-4">
 <h1><?php the_title(); ?></h1>
 <?php the_content(); ?>
 <p><a class="btn btn-large btn-primary" href="<?php the_field('link'); ?>" target="_blank">View Final Piece <span class="glyphicon glyphicon-fullscreen"></span></a></p>
</div>
```

## Fix index.php
As it stands our `index.php` is static and this is not good. This page is the fallback page for all templates so we need to make sure the page is dynamic and uses the Loop.
## Convert `index.php` from static to dynamic page

Replace contents of `index.php` with `page.php`

We are turning a static page into a safe generic loop (remember the `index.php` is the fallback template for everything in WordPress)

* [part 1](bootstrap-wordpress-part-1.md)
* [part 2](bootstrap-wordpress-part-2.md)
* [part 3](bootstrap-wordpress-part-3.md)
* [part 4](bootstrap-wordpress-part-4.md)
* [part 5](bootstrap-wordpress-part-5.md)
