# WordPress Notes

* [part 1](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-1.md)
* [part 2](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-2.md)
* [part 3](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-3.md)
* [part 4](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/bootstrap-wordpress-part-4.md)

## Follow WordPress PHP naming guide

The WordPress community can be snobs about their code. If you work on a team, it will serve you well to follow this guide. If you don't haters are gonna hate.

[link](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/)

## Full width pages

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
* `the_author()` - who created the post?
  + show how to add users to WordPress and their permissions
* `the_time()` - lots of parameters
* `the_category()`
  + we will soon create categories
* `comments_link()` - no comments yet
* `comments_number()` - no comments yet
* `the_excerpt()` - a short excerpt of the content

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

