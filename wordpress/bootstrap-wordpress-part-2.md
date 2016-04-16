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

view your WP site
refresh and you will see favicon
404 error is gone from console

## Title
Change in `header.php`
```php
<title>Jumbotron Template for Bootstrap</title>
```

to

```php
<title><?php wp_title( '|', true, 'right' );</title>
```

wp_title will display just your WordPress site title by itself if on home page but it will also display title and `|` separate if on another page. The last parameter places separator on `left` or `right`.

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

When you are in the WP Dashboard, you can go to Appearance > Widgets

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

page.php is a special file name in WordPress. It will automatically be the new template for pages (if that doesn't make sense check out the [WPHeirarchy](http://www.elegantthemes.com/blog/tips-tricks/understanding-the-wordpress-template-hierarchy))

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


`functions.php`

* add to bottom

```php
[more code here]
// sidebar
create_widget( 'Page Sidebar', 'page', 'Displays on side of pages with sidebar');
?>
```

Dashboard > Widgets
Add Text widget (or better yet, experiment with the `Visual Editor` widget) to `Page Sidebar` widget. Add some filler text and test to see if it works.

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

* change H2 to H3 so new CSS in style.css will work

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

Add this CSS to style.css

```css
.widget {
  margin: 10px 0 30px;
}
```

in our `register_sidebar()`` we gave the class of `widget` to the div whenever a widget is created.

## Full width pages

What if I want one template page that has no sidebar (a full width page)

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

1. create a new page
2. name it
3. From Sample Page
4. choose full page template
5. use WYSIWYG bootstrap plugin to add 3 rows of different columns with sample text
6. make sure to add it to your menu (as a dropdown)

## Blog

Create 3 sample posts in WP

But when we navigation to our Blog WP page. We still only see static content.

Save page.php as home.php

WP automatically uses home.php to display the blog listing page

Remember Dashboard in Settings > Reading we chose [Blog as our Posts Page](https://i.imgur.com/4ETSzoQ.png). (it will automatically look to home.php to control our blog page)

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

to get categories to work, add 3 categories and use 1 on each post and then add a second category on 1 post to see how multiple categories are displayed

why is comments broken?
index.php is overriding single.php which is what the comments links should be going to.
remove `<?php the_content(); ?>` as we are using `the_excerpt()`

change this:

```php
    <?php the_excerpt(); ?>
          </article>
          <!-- WP function that outputs post content -->
          <?php the_content(); ?>

        <?php endwhile; else: ?>
```

to this

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

Add this CSS to style.css

```css
article.post {
    margin: 20px 0 40px;
}
```

create a sidebar just for blog

in home.php

change `<?php get_sidebar(); ?>`

to this `<?php get_sidebar( 'blog' ); ?>`

save sidebar.php as sidebar-blog.php

sidebar-blog.php

```php
<aside class="col-md-3 sidebar">
    <?php if ( ! dynamic_sidebar( 'blog' ) ): ?>
    <!-- if no sidebar, show this content -->
    <h3>Set Up this sidebar</h3>
    <p>Drag stuff here so your BLOG sidebar wont be empty</p>

    <?php endif; ?>
</aside>
```

functions.php

```php
create_widget( 'Blog Sidebar', 'blog', 'Displays on side of pages in blog section');
```

in Dashboard add recent posts and recent comments in blog sidebar widget













