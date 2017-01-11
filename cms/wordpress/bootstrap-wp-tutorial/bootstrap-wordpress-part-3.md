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

### Oh no! Our Blog is Broken!
But when we navigation to our Blog WordPress page. We still only see static content. The solution to our problem can be found by viewing the WordPress Template Hierarchy.

The blog in WordPress is based on a template that must be named `home.php`.

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
* `the_content();` - all of that post's content

### Just show the excerpt()
On the blog page we only want to show a truncated version of the post. So we need to delete `the_content()` and just keep `the_excerpt()`.

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
We can easily style the posts but just giving them a class of `post`

```html
<article class="post">...
```

Then we just add the necessary CSS to `css/style.css`

**note** If you are using Sass, just make the necessary adjustments to make your CSS work properly.

```css
article.post {
    margin: 20px 0 40px;
}
```

## Create a sidebar just for blog
Right now we can only use one sidebar for all of our pages. We can use many different sidebars we just create files named `sidebar-SOMENAME.php`.

So let's add a different sidebar for our blog page.

`home.php`

Change `<?php get_sidebar(); ?>`

To this `<?php get_sidebar( 'blog' ); ?>`

Save `sidebar.php` as `sidebar-blog.php`

`sidebar-blog.php`

And put this code inside your new sidebar.

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

Of course we have to create a new instance of our widget so that we can have access to our new blog widget sidebar.

```php
create_widget( 'Blog Sidebar', 'blog', 'Displays on side of pages in blog section');
```

For a little variety, in our Dashboard, add `recent posts` and `recent comments` in blog sidebar widget by simply dragging them into our new blog sidebar widget.

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

## Link to individual posts is broken
What good is a blog if you can't click on one of the posts to read more about that individual post?

The reason this is not working once again has to do with the WordPress Hierarchy. Single posts page will only be see if you create a `single.php` template.

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

Pull in `blog` sidebar. Just showing that we can easily add different sidebars. New sidebars or ones we used before on other pages.

```php
<?php get_sidebar('blog'); ?>
```

#### Adding Users
You can add users and give them specific permissions. Maybe one user can only write posts and one user can have full access to everything on the site.

* `the_author()` - who created the post?
  + The `author` is who created the post.
  + Research how to add users to WordPress and give them various permissions

**How do you create users in WordPress**
Through the Dashboard. Add the user, add their info and choose their permissions. One you do, they will receive an email with information on how to log into the WordPress Site.

### Categories
Right now, the categories isn't working like we would like. In the WP Dashboard, add 3 categories. If you don't know how to do this, Google 'How to add categories in WordPress' and see if you can find a solution.

* Use one category on each of the three posts you created.
* Add a second category on one post
  + This will let you see how multiple categories are displayed in WordPress

## archive.php
Archives lets you see and sort by older posts

* Listing page for categories
* Great if we are searching a particular date

Click on category and you are taken to a `category/news` page _(uses template of `index.php`)_

Save `home.php` as `archive.php`

* Change posts to be in different months _(Dashboard)_
* Remove recent comments from blog sidebar widget and replace with archives

Now remove `Recent Posts` from blog sidebar widget and replace with `Categories`

* [part 1](bootstrap-wordpress-part-1.md)
* [part 2](bootstrap-wordpress-part-2.md)
* [part 3](bootstrap-wordpress-part-3.md)
* [part 4](bootstrap-wordpress-part-4.md)
* [part 5](bootstrap-wordpress-part-5.md)

