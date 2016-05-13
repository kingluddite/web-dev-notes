# WordPress Notes

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)

# Bootstrap and WordPress

## Header Footer Templates

* remove meta description (author, description)
  + _SEO Yoast plugin display dynamic descriptions on each page_

remove this in `header.php`

```php
    <meta name="description" content="">
    <meta name="author" content="">
```

## Favicon
go to original source code
browse to favicon
save to a new `img` folder in your custome theme

**Change this**

`header.php`

```php
<link rel="icon" href="../../favicon.ico">
```

**To this:**

```php
<link rel="icon" href="<?php bloginfo('template_directory'); ?>/img/favicon.ico">
```

[Grab a sample favicon](http://www.freefavicon.com/freefavicons/objects/)

**Refresh and you will see favicon**

![favicon in action](https://i.imgur.com/bogZOuv.png)

_note:_ 404 error is gone from console

## Making Page Title Dynamic

`header.php`

**Change this**

```php
<title>Jumbotron Template for Bootstrap</title>
```

**To this**

```php
<title><?php wp_title( '|', true, 'right' ); ?></title>
```

`wp_title()` will display just your WordPress site title by itself if on home page 
* It will also display title and `|` separate if on another page. 
* The last parameter places separator on `left` or `right`.

## Useful Copyright in Footer

`footer.php`

```php
[more code here]
<footer>
 <p>&copy; <?php bloginfo('name'); ?> <?php echo date('Y'); ?></p>
</footer>
[more code here]
```


# The WordPress Hierarchy

There is [a template hierarchy in WordPress](https://wphierarchy.com/). This diagram visually explains how WordPress determines which template file(s) to use on individual pages.

## Static Front Page

By default, WordPress shows your most recent posts in reverse chronological order on the front page of your site. But some people like to have their Blog on a different page and a static home page. Use front-page.php if you want a static home page.

Use `Administration` > `Settings` > `Reading` in the Dashboard to assign your `home` page and `blog` page.

![home and blog page in Dashboard](https://i.imgur.com/mNYhMSV.png) 

[More Info on front-page.php](https://codex.wordpress.org/Creating_a_Static_Front_Page)

Save `index.php` as `front-page.php`

* wordpress knows to automatically use `front-page.php` template any time you have a static homepage set

We want `jumbotron homepage` text to be editable in admin area

## The Loop

[Info about the Loop](https://codex.wordpress.org/The_Loop)

**Replace this**

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

**With the Loop**

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

* use bootstrap plugin to style and add button
* hard link it if you want
  + _not best practice because it is hardcoded and if it changes later, you'll have to update this code_

# Widgets

When working with custom themes in WordPress you will at times want to add widgets. 

Adding a widget is a three step process.

1. In `functions.php` use the create widget function to establish the parameters you will be working with
  * Inside this function you will use the `register_sidebar()` function that will take and use the parameter values when they are passed when the function is `create_widget()` is called
2. In `functions.php` call the `create_widget()` function and pass it the parameter values you want.
3. You can now visit `Widgets` will now appear under `Appearance` in the Dashboard [(view)](https://i.imgur.com/9ZH7FYV.png).
  * Drop text or whatever you want inside the widgets and click `Save`
4. In the template you're using (_example: page.php_) call `dynamic_sidebar("unique widget name here")` and that will pull in the data you set inside the Widget when you were in the Dashboard.

## Add Widget Areas to the Front Page

### create_widget()

`functions.php`

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

This is a cool plugin that lets you easily add marked up code without writing HTML. Great for your clients that hate writing (or don't know how) to write code.

[Black Studio TinyMCE Widget](https://wordpress.org/plugins/black-studio-tinymce-widget/)

* Plugin for those that don't like or understand HTML

# Sidebars

## Our Page Template (page.php)
At some point you want to add a sidebar whether it's for advertising or to showcase something cool you on the side of your site.

Save `index.php` as `page.php`

Make `page.php` look like this:

### Two column layout

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

`page.php` is a special file name in WordPress. It will automatically be the new template for pages 

_(if that doesn't make sense check out the [WPHeirarchy](http://www.elegantthemes.com/blog/tips-tricks/understanding-the-wordpress-template-hierarchy))_

The best way to see this is if you click on the page we created `page-with-sidebar` in the browser you will see it has a 2 column layout.

Since we want dynamic content for the first column we need to put in our dynamic loop (WordPress Loop)

#### Static sidebar in page.php

`page.php`

Here we have a sidebar but it is static and not too exciting.

**What we do have that's exciting:**

* we Added the Loop
  + _allows us to edit our page content in the Dashboard_
* the_title() function pulls the title of our page
* the_content() pulls the page content into this page
* conditional logic to show or hide depending on content or no content

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

## `Included` Sidebar

Just like we included our `header.php` and `footer.php` we now include our `sidebar.php`

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

## Improve our sidebar with HTML5 semantic markup

```html
<!-- add this sidebar class so we can style it better later -->
<aside class="col-md-3 sidebar">
    <h3>Set Up this sidebar</h3>
    <p>Drag stuff here so your sidebar will not be empty</p>
</aside>
```

### Dynamic Sidebar

Here we combine our knowlege of creating a widget with our sidebar.

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

## Let's Style our Sidebar

Drop it down a bit.

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

## Alter Widget HTML

Our headings in our widget our `H2`. How can we change them to `H3`?

`functions.php`

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

### Adding More Widgets to Sidebar

* Add another widget to our Sidebar widget
  + example: Recent Posts

**How do I do this?**
Just drag and drop it into our Page Sidebar wiget. It will go under our Visual Editor section. 

The widgets are to close together. Need to add some padding between them.

Add this CSS to `style.css`

```css
.widget {
  margin: 10px 0 30px;
}
```

in our `register_sidebar()` we gave the class of `widget` to the `DIV` whenever a widget is created.

# Full width pages

What if I want one template page that has no sidebar _(a full width page)_

Save `page.php` as `page-full-width.php`

`page-full-width.php`

Check out the `comment` at the top of this template. This comment has special instructions for our template 

_(remember the special comment instructions our style.css file had?)_

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

## Don't forget to select the full-width-page template in the Dashboard

Open the full width page and select under Page Attributes in the Dashboard `Full Width Tempalte` under Template.

View the Full Width Page in the browser and you will see it has no sidebar!

## Full width grid using our WYSIWYG

1. Create a new page
2. Name it
3. From Sample Page
4. Choose full page template
5. Use WYSIWYG bootstrap plugin to add 3 rows of different columns with sample text
6. Make sure to add it to your menu _(as a dropdown)_

# Sass and WordPress

## Fun Assignment

[Sass](http://sass-lang.com/)

If you never used Sass before it's very useful at improving your workflow with WordPress.

The trick is how to you get all your `scss` files to output to the root level of the theme's `style.css` file with the all important comment section at the top.

The CSS should also be minfied which shouldn't be too hard.

Anyone figure out how to do it?


# Blog

What would a WordPress site be without a Blog. Instead of static text in all the pages we have created thus far, now we're going to create some posts and show how we can view them on our Blog page.

## Let's create some posts!

Create 3 sample posts in WordPress

### Oh no! Our Blog is Broken!
But when we navigation to our Blog WordPress page. We still only see static content.

Save `page.php` as `home.php`

WP automatically uses `home.php` to display the blog listing page

Remember Dashboard in `Settings > Reading` we chose [Blog as our Posts Page](https://i.imgur.com/4ETSzoQ.png). 

_(it will automatically look to `home.php` to control our blog page)_

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

New stuff to talk about:

* `the_permalink()` - links to the full post
*  `the_time()` - lots of parameters
* `the_category()`
  + we will soon create categories
* `comments_link()` - no comments yet
* `comments_number()` - no comments yet
* `the_excerpt()` - a short excerpt of the content

#### Users
* `the_author()` - who created the post?
  + show how to add users to WordPress and their permissions

The `author` is who created the post.

**How do you create users in WordPress**
Through the Dashboard. Add the user, add their info and choose their permissions. One you do, they will receive an email with information on how to log into the WordPress Site.

### To get categories to work

* add 3 categories 
  + use 1 category on each post
* add a second category on 1 post to see how multiple categories are displayed

**Why is comments broken?**

`index.php` is overriding `single.php` which is what the comments links should be going to.

### Just show the excerpt()

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

### Style the post

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

# Create a sidebar just for blog

In `home.php`

Change `<?php get_sidebar(); ?>`

To this `<?php get_sidebar( 'blog' ); ?>`

Save `sidebar.php` as `sidebar-blog.php`

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

## View your cool new Blog with unique Sidebar in the browser

### small stylistic improvement to home.php

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

# How do we create a single page?

## single.php

When someone clicks on a post they like they want to read the full post (with the full content). That's where `single.php` comes into the picture.

Save `page.php` as `single.php`

Now test and see that it's working

* but it's showing page sidebar?
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

# Archives

## archive.php

* listing page for categories
* great if we are searching a particular date

### Categories

Click on category and you are taken to a `category/news` page _(uses template of `index.php`)_

Save `home.php` as `archive.php`

* Change posts to be in different months _(Dashboard)_
* Remove recent comments from blog sidebar widget and replace with archives

Now remove `Recent Posts` from blog sidebar widget and replace with `Categories`

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)
