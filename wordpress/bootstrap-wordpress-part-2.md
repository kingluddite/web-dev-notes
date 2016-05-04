# Bootstrap and WordPress

## Header Footer Templates

remove meta description (SEO Yoast plugin display dynamic descriptions on each page)
remove meta author

remove this in `header.php`

```php
    <meta name="description" content="">
    <meta name="author" content="">
```

## Favicon
go to original source code
browse to favicon
save to a new `img` folder in your custome theme

change this

`header.php`

```php
<link rel="icon" href="../../favicon.ico">
```

to this:

```php
<link rel="icon" href="<?php bloginfo('template_directory'); ?>/img/favicon.ico">
```

[grab a sample favicon](http://www.freefavicon.com/freefavicons/objects/)

## view your WP site

* refresh and you will see favicon
* 404 error is gone from console

## Title
Change in `header.php`
```php
<title>Jumbotron Template for Bootstrap</title>
```

**to**

```php
<title><?php wp_title( '|', true, 'right' ); ?></title>
```

`wp_title()`` will display just your WordPress site title by itself if on home page but it will also display title and `|` separate if on another page. The last parameter places separator on `left` or `right`.

## Useful Copyright in Footer

`footer.php`

```php
[more code here]
<footer>
 <p>&copy; <?php bloginfo('name'); ?> <?php echo date('Y'); ?></p>
</footer>
[more code here]
```

## Static Front Page
Save `index.php` as `front-page.php`

* wordpress knows to automatically use `front-page.php` template any time you have a static homepage set

We want `jumbotron homepage` text to be editable in admin area

## The Loop
replace this

`front-page.php`

```php
<div class="jumbotron">
      <div class="container">
        <h1>Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
      </div>
    </div>
```

with the loop

`front-page.php`

```php
<div class="jumbotron">
      <div class="container">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
          
          <?php the_content(); ?>

        <?php endwhile; endif; ?>
      </div>
    </div>
```

Now you can go to home page and edit that section

* use bootstrap plugin to style and add button (hard link if you want (not best practice because it is hardcoded and if it changes later, you'll have to update this code))

## Add Widget Areas to the Front Page

## functions.php

### create_widget()

```php
function create_widget($name, $id, $description) {
    register_sidebar(array(
      'name' => __( $name ),
      'id'   => $id,
      'description' => __( $description ),
      'before_widget' => '<div class="widget">',
      'after_widget' => '</div>',
      'before_title' => '<h2>',
      'after_title' => '</h2>'
    ));
}

create_widget( 'Front Page Left', 'front-left', 'Displays on the left of the hompage');
create_widget( 'Front Page Center', 'front-center', 'Displays on the center of the hompage');
create_widget( 'Front Page Right', 'front-right', 'Displays on the right of the hompage');
```

This will create 3 widgets that we can put in a row with Twitter Bootstrap

When you are in the WP Dashboard, you can go to `Appearance > Widgets`

You will see the 3 widgets you created for the front Page. Drag and drop `Text` widget into each of these boxes.

In WP Dashboard add a `Text` Widget [looks like this](https://i.imgur.com/4W1IGJf.png)

`front-page.php`

```php
<!-- Example row of columns -->
<div class="row">
  <div class="col-md-4">
      <?php if ( dynamic_sidebar( 'front-left' ) ); ?>
  </div>
  <div class="col-md-4">
    <?php if ( dynamic_sidebar( 'front-center' ) ); ?>
 </div>
  <div class="col-md-4">
    <?php if ( dynamic_sidebar( 'front-right' ) ); ?>
  </div>
</div>
```

Notice we are using the names that we created in `functions.php` (front-left, front-center, front-right)

This will pull in the text from the 3 Text Widgets you created in the Dashboard

View your WordPress page and you should see the 3 widgets in one horizontal row

## WYSIWYG Plugin

[Black Studio TinyMCE Widget](https://wordpress.org/plugins/black-studio-tinymce-widget/)

* Plugin for those that don't like or understand HTML

## Sidebars

Save `index.php` as `page.php`

Make `page.php` look like this:

* Will have 2 column layout

```php
<?php get_header(); ?>

  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
      </div>
      <div class="col-md-3">
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
   </div>

<?php get_footer(); ?>
```

`page.php` is a special file name in WordPress. It will automatically be the new template for pages (if that doesn't make sense check out the [WPHeirarchy](http://www.elegantthemes.com/blog/tips-tricks/understanding-the-wordpress-template-hierarchy))

The best way to see this is if you click on the page we created `page-with-sidebar` in the browser you will see it has a 2 column layout.

Since we want dynamic content for the first column we need to put in our dynamic loop (WordPress Loop)

`page.php`

```php
<?php get_header(); ?>

  <div class="container">
    <div class="row">
      <div class="col-md-9">
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
      <div class="col-md-3">
        <!-- this will be our sidebar so we rename the heading -->
        <h2>Sidebar</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
   </div>

<?php get_footer(); ?>
```

View page in browser and you'll see it's empty

## Ipsum Generator for Chrome

* time saving tool

Add this Chrome extension - [Yet Another Lorem Ipsum Generator](https://chrome.google.com/webstore/detail/yet-another-lorem-ipsum-g/jffcmkkfbampimhpimhofhhkanhflfce?hl=en)

Install it and use it to add some Lorem Ipsum to your `page-with-sidebar` while using the Chrome browser.

## Sidebar

Make our sidebar not static and pull in code from `sidebar.php`. Create that file in our custom theme and cut the static code inside our current `page.php` and paste it into `sidebar.php`

`page.php`

```php
<?php get_header(); ?>

  <div class="container">
    <div class="row">
      <div class="col-md-9">
       [FIRST COLUMN CODE HERE]
      </div>
      
      <?php get_sidebar(); ?>
      
    </div><!-- END .row -->

<?php get_footer(); ?>
```

`sidebar.php`

```php
<div class="col-md-3">
    <!-- this will be our sidebar so we rename the heading -->
    <h2>Sidebar</h2>
    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
    <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
</div>
```

## Improve our sidebar

```
<!-- add this sidebar class so we can style it better later -->
<aside class="col-md-3 sidebar">
    <h3>Set Up this sidebar</h3>
    <p>Drag stuff here so your sidebar won't be empty</p>
</aside>
```

### even better sidebar

```php
<aside class="col-md-3 sidebar">
    <?php if ( ! dynamic_sidebar( 'page' ) ): ?>
    <!-- if no sidebar, show this content -->
    <h3>Set Up this sidebar</h3>
    <p>Drag stuff here so your sidebar wont be empty</p>

    <?php endif; ?>
</aside>
```

Add to bottom `functions.php`

```php
[more code here]
// sidebar
create_widget( 'Page Sidebar', 'page', 'Displays on side of pages with sidebar');
?>
```

`Dashboard > Widgets`

* Add Text widget (or better yet, experiment with the `Visual Editor` widget) to `Page Sidebar` widget. Add some filler text and test to see if it works.

## Drop sidebar down

`style.css`

```css
.sidebar {
  margin-top: 40px;
  color: #444;
}
.sidebar h3 {
  color: #888;
}
```

## update functions.php

* change `H2` to `H3` so new CSS in `style.css` will work

```php
function create_widget($name, $id, $description) {
    register_sidebar(array(
      'name' => __( $name ),
      'id'   => $id,
      'description' => __( $description ),
      'before_widget' => '<div class="widget">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    ));
}
```

Add another widget (recent posts - just drag and drop it into our Page Sidebar wiget. It will go under our Visual Editor section. The widgets are to close together. Need to add some padding between them.

Add this CSS to `style.css`

```css
.widget {
  margin: 10px 0 30px;
}
```

in our `register_sidebar()` we gave the class of `widget` to the `DIV` whenever a widget is created.

## Full width pages

What if I want one template page that has no sidebar _(a full width page)_

Save `page.php` as `page-full-width.php`

`page-full-width.php`

```php
<?php
/*
  Template Name: Full Width Template
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

Open the full width page and select under Page Attributes in the Dashboard `Full Width Tempalte` under Template.

View the Full Width Page in the browser and you will see it has no sidebar!

## Full width grid using our WYSIWYG

1. Create a new page
2. Name it
3. From Sample Page
4. Choose full page template
5. Use WYSIWYG bootstrap plugin to add 3 rows of different columns with sample text
6. Make sure to add it to your menu _(as a dropdown)_

## Blog

Create 3 sample posts in WP

But when we navigation to our Blog WP page. We still only see static content.

Save `page.php` as `home.php`

WP automatically uses `home.php` to display the blog listing page

Remember Dashboard in `Settings > Reading` we chose [Blog as our Posts Page](https://i.imgur.com/4ETSzoQ.png). _(it will automatically look to `home.php` to control our blog page)_

`home.php`

```php
<?php get_header(); ?>

  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <div class="page-header">
           <!-- gives us the name of the page itself -->
            <h1><?php wp_title(''); ?></h1>
        </div>
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

          <article>
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <!-- date() only shows date for post on that day, time() function better here -->
            <!-- add name in users section of Dashboard to offer better name display -->
            <p>By <?php the_author(); ?>
               on <?php echo the_time('l, F jS, Y'); ?>
               in <?php the_category( ', ' ); ?>
               <a href="<?php comments_link(); ?>"><?php comments_number(); ?></a>
            </p>

            <?php the_excerpt(); ?>
          </article>
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

      <?php get_sidebar(); ?>

    </div><!-- END .row -->

<?php get_footer(); ?>
```

### To get categories to work

* add 3 categories 
* and use 1 on each post
* then add a second category on 1 post to see how multiple categories are displayed

**Why is comments broken?**

`index.php` is overriding `single.php` which is what the comments links should be going to.

Remove `<?php the_content(); ?>` as we are using `the_excerpt()`

**change this:**

```php
    <?php the_excerpt(); ?>
          </article>
          <!-- WP function that outputs post content -->
          <?php the_content(); ?>

        <?php endwhile; else: ?>
```

**to this**

```php
<hr>
    <?php the_excerpt(); ?>
          </article>
          <!-- WP function that outputs post content -->

        <?php endwhile; else: ?>
```

* give article a class of post

```html
<article class="post">...
```

Add this CSS to `style.css`

```css
article.post {
    margin: 20px 0 40px;
}
```

## Create a sidebar just for blog

in `home.php`

change `<?php get_sidebar(); ?>`

to this `<?php get_sidebar( 'blog' ); ?>`

save `sidebar.php` as `sidebar-blog.php`

`sidebar-blog.php`

```php
<aside class="col-md-3 sidebar">
    <?php if ( ! dynamic_sidebar( 'blog' ) ): ?>
    <!-- if no sidebar, show this content -->
    <h3>Set Up this sidebar</h3>
    <p>Drag stuff here so your BLOG sidebar wont be empty</p>

    <?php endif; ?>
</aside>
```

`functions.php`

```php
create_widget( 'Blog Sidebar', 'blog', 'Displays on side of pages in blog section');
```

In Dashboard add by dragging and dropping `recent posts` and `recent comments` in blog sidebar widget

### stylistic change to home.php

`home.php`

Make this subtle change for purely aesthetic purposes

```php
<article class="post">
  <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
  <!-- date() only shows date for post on that day, time() function better here -->
  <!-- add name in users section of Dashboard to offer better name display -->
  <p><em>By <?php the_author(); ?>
     on <?php echo the_time('l, F jS, Y'); ?>
     in <?php the_category( ', ' ); ?>
     <a href="<?php comments_link(); ?>"><?php comments_number(); ?></a></em>
  </p>
  <?php the_excerpt(); ?>
  <hr>
</article>
```

## Create single.php

Save `page.php` as `single.php`

Now test and see that it's working

* but it's showing page sidebar
* we want to add meta information (we can grab this from `home.php`)
* enable comments so people can comment on post

From `home.php` take add this to `single.php` underneath H1 title

```php
[more code]
<p><em>By <?php the_author(); ?>
     on <?php echo the_time('l, F jS, Y'); ?>
     in <?php the_category( ', ' ); ?>
     <a href="<?php comments_link(); ?>"><?php comments_number(); ?></a></em>
  </p>
  <hr>
  <?php comments_template(); ?>
[more code]
```

Pull in `blog` sidebar

```php
<?php get_sidebar('blog'); ?>
```

## Create archive page
* listing page for categories
* if we are searching a particular date

### Categories

Click on category and you are taken to a `category/news` page _(uses template of `index.php`)_

Save `home.php` as `archive.php`

* Change posts to be in different months _(Dashboard)_
* Remove recent comments from blog sidebar widget and replace with archives

Now remove Recent Posts from blog sidebar widget and replace with Categories

## Create Landing Page

### Custom Post Types
Install and activate these plugins
* [Custom Post Types UI](https://wordpress.org/plugins/custom-post-type-ui/)
* [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields)

Use Dashboard to create a new Post Type called `portfolio`

![add custom post type](https://i.imgur.com/OW873Nk.png)
[add these settings and click `Add Post Type`](https://i.imgur.com/RooEaIK.png)

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

**Do you now see a `portfolios` button on your Dashboard sidebar?**
![portfolios button](https://i.imgur.com/EfgqcLo.png)

If yes, success!

Click `portfolios` Dashboard sidebar button and click `Add New` button

**Name 'Pele'**
1. Enter Latin Filler text for body content.
2. For link add: `http://www.absolutearts.com/portfolio3/l/lonvig/pele-1047734135m.jpg`
3. Publish

Where are `featured images?`

It just doesn't appear. You have to add that option via `functions.php`

`functions.php`

* add this `add_theme_support( 'post-thumbnails' );` under the add_theme_support( 'menus' );

![post-thubmails](https://i.imgur.com/LWE6o9w.png)

1. Find 5 soccer player paintings and save them to your Downloads folder.
2. Click `Media` and drag and drop them all in
3. Create portfolio pages for all 5 of them.

## Create Porfolio page

1. Name it `Portfolio Grid w Custom Posts` 
2. Set parent as Sample Pages
and Publish
3. Create new template based on `page-full-width.php`
so save page-full-width.php as page-portfolio.php

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

Now edit `Portfolio Grid w Custom Posts` to use Page Portfolio Grid Template

See if you can add it to dropdown on our menu

view page and see if link works

In `Settings > Media` _(Dashboard)_, change default size for thumbnails to be `260px` x `260px`

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

Add some new css

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

      <div class="col-xs-3 portfolio-piece">
       <?php
         $thumbnail_id = get_post_thumbnail_id();
         $thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
       ?>

        <p><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></p>
        <h4><?php the_title(); ?></h4>
      </div>

      **<?php $portfolio_count = $the_query->current_post + 1; ?>
      <?php if ( $portfolio_count % 4 === 0): ?>
        </div><div class="row">
      <?php endif; ?>**

    <?php endwhile; endif; ?>
    </div>
```

## Link thumbnails to specific portfolio page

```php
 <p><a href="<?php the_permalink(); ?>"><img src="<?php echo $thumbnail_url[0]; ?>" alt="<?php the_title(); ?> graphic"></a></p>
        <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
```

## Fix wrong link to single.php page

We need it to go to a different single template, one that we will build now. This single.php page will be just for our porfolio section.

## Single Page for Portfolio

Save `page-full-width.php` as `single-portfolio.php`

* we will remove the template comment at the top. Why
  - because of the naming convention (hierarcy) WordPress uses. The `single-` followed by the name of the page will automatically work

we want our full page to have the large image on the left and meta data about the image on the right

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

## Problem with large images
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

* collapses too soon so change the classes

change in `single-portfolio.php`

`<div class="col-md`

to

`<div class="col-sm`

## see breakpoints with chrome extension
Add `Viewport Dimensions` [link](https://chrome.google.com/webstore/detail/viewport-dimensions/kchdfagjljmhgapoonapmfngpadcjkhk)

## navigation through portfolio

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

replace contents of `index.php` with `page.php`

We are turning a static page into a safe generic loop (remember the index.php is the fallback template for everything in WordPress)

FIN
















