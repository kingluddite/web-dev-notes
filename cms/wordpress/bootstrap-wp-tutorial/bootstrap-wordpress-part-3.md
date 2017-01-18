# WordPress Notes

* [part 1](bootstrap-wordpress-part-1.md)
* [part 2](bootstrap-wordpress-part-2.md)
* [part 3](bootstrap-wordpress-part-3.md)
* [part 4](bootstrap-wordpress-part-4.md)
* [part 5](bootstrap-wordpress-part-5.md)

## Follow WordPress PHP naming guide

The WordPress community can be snobs about their code. If you work on a team, it will serve you well to follow this guide. If you don't haters are gonna hate.

[link](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/)

# Blog
What would a WordPress site be without a Blog. Instead of static text in all the pages we have created thus far, now we're going to create some posts and show how we can view them on our Blog page.

## Let's create some posts!
Create 3 sample posts using the WP Dashboard.

### Broken Blog
But when we navigation to our Blog WordPress page. We still see static content. The WordPress Template Hierarchy helps us find the solution to our problem.

## home.php
The template used to create the WordPress blog.

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
### New items we have yet to discuss:

* `the_permalink()` - Links to the full post
*  `the_time()` - Lots of parameters
* `the_category()`
  + we will soon create categories
* `comments_link()` - We have comments yet
* `comments_number()` - We have comments yet
* `the_excerpt()` - A short excerpt of the content
* `the_content();` - That post's content

### excerpt()
On the blog page show a truncated version of the post. Delete `the_content()` and keep `the_excerpt()`.

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
Style the posts using a class of `post`

```html
<article class="post">...
```

Add the necessary CSS to `css/style.css`

**note** If you are using Sass, make the necessary adjustments to make your CSS work properly.

```css
article.post {
    margin: 20px 0 40px;
}
```

## Create a blog sidebar
Right now we use one sidebar on all our pages. We can use different sidebars if we name them  `sidebar-SOMENAME.php`.

Add a different sidebar for our blog page.

`home.php`

Change `<?php get_sidebar(); ?>`

To this `<?php get_sidebar( 'blog' ); ?>`

Save `sidebar.php` as `sidebar-blog.php`

```php
<aside class="col-md-3 sidebar">
    <?php if ( ! dynamic_sidebar( 'blog' ) ): ?>
    <!-- if no sidebar, show this content -->
    <h3>Set Up this sidebar</h3>
    <p>Drag content here so your BLOG sidebar wont be empty</p>

    <?php endif; ?>
</aside>
```

`functions.php`

Of course we have to create a new instance of our widget so that we can have access to our new blog widget sidebar.

```php
create_widget( 'Blog Sidebar', 'blog', 'Displays on side of pages in blog section');
```

For a little variety, in our Dashboard, add `recent posts` and `recent comments` in blog sidebar widget by dragging them into our new blog sidebar widget.

View your cool new Blog with unique blog Sidebar widget in the browser

### Update home.php

`home.php`

Make this subtle change for purely aesthetic purposes:

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

## Fix broken links
What good is a blog if you can't click on one of the posts to read more about that individual post?

The reason this is not working once again has to do with the WordPress Hierarchy. Single posts page will be see if you create a `single.php` template.

**note** If you don't create the correct template, WordPress will always use the `index.php` layout as the case of last resort. `index.php` is overriding `single.php` because `single.php` does not exist yet.

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

Pull in `blog` sidebar.

```php
<?php get_sidebar('blog'); ?>
```

#### Adding Users
You can add users and give them specific permissions.

* `the_author()` - who created the post?
  + The `author` is who created the post.
  + Research how to add users to WordPress and give them different permissions

**How do you create users in WordPress**
Through the Dashboard. Add the user, add their info and choose their permissions. One you do, they will receive an email with information on how to log into the WordPress Site.

### Categories
Right now, the categories isn't working like we would like. In the WP Dashboard, add 3 categories. If you don't know how to do this, Google 'How to add categories in WordPress' and see if you can find a solution.

* Use one category on each of the three posts you created.
* Add a second category on one post

## archive.php
Archives lets you see and sort by older posts

* Listing page for categories
* Great if we are searching a particular date

Click on a category. Your new path is `category/news`. That page _(uses template of `index.php`)_

Save `home.php` as `archive.php`

* Change posts to be in different months _(Dashboard)_
* Remove recent comments from blog sidebar widget and replace with archives

Now remove `Recent Posts` from blog sidebar widget and replace with `Categories`

* [part 1](bootstrap-wordpress-part-1.md)
* [part 2](bootstrap-wordpress-part-2.md)
* [part 3](bootstrap-wordpress-part-3.md)
* [part 4](bootstrap-wordpress-part-4.md)
* [part 5](bootstrap-wordpress-part-5.md)

