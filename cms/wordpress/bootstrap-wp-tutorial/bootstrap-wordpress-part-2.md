# WordPress Notes

* [part 1](bootstrap-wordpress-part-1.md)
* [part 2](bootstrap-wordpress-part-2.md)
* [part 3](bootstrap-wordpress-part-3.md)
* [part 4](bootstrap-wordpress-part-4.md)
* [part 5](bootstrap-wordpress-part-5.md)

# Bootstrap and WordPress

## SEO Yoast
This is a free useful plugin to help make your site SEO Friendly

remove this in `header.php`

```php
    <meta name="description" content="">
    <meta name="author" content="">
```

* Remove meta description (author, description)
  + _SEO Yoast plugin display dynamic descriptions on each page_
* Instead of hard coding this info you can add it per page using SEO Yoast
* SEO Yoast also helps you set up Google Analytics

## Favicon
When making a site one of your tasks will be to create a favicon added to the tab in the browser. It helps with branding your site.

You can create your own favicon or use a site like the link below to generate one for yourself:

[Grab a sample favicon](http://www.freefavicon.com/freefavicons/objects/)


`header.php`

Now we need to change the hardcoded favicon to use the WordPress `bloginfo()` function to point to our current theme.

**Change this**

```php
<link rel="icon" href="../../favicon.ico">
```

**To this:**

```php
<link rel="icon" href="<?php bloginfo('template_directory'); ?>/img/favicon.ico">
```

**Refresh and you will see favicon**

* You may have to use a hard refresh with `cmd` + `r`

![favicon in action](https://i.imgur.com/bogZOuv.png)

**note:** 404 error should remain in console

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

* There is a Bug - doesn't show title on static home page.
  - See if you can troubleshoot this to determine a way to get this to work on the home page.

`wp_title()` will display WordPress site title by itself if on home page

* It will also display title and `|` separate if on another page.
* The last parameter places separator on `left` or `right`.

## Useful Copyright in Footer
When working with WordPress sometimes you will use WordPress function and in the following case you will use plain old, traditional PHP to add a copyright date in our footer.

`footer.php`

```php
[more code here]
<footer>
 <p>&copy; <?php bloginfo('name'); ?> <?php echo date('Y'); ?></p>
</footer>
[more code here]
```

WordPress is constantly updated. From time to time you will need to update to the most recent version of WordPress. [Using WP-CLI](development/wp-cli.md) to make this task easy.

# The WordPress Hierarchy
This will help us build our pages. If we view any of our pages in the browser, they will all be the same because they are all based on `index.php`.

[template hierarchy in WordPress](https://wphierarchy.com/). This diagram visually explains how WordPress determines which template file(s) to use on individual pages.

## front-page.php
Static Front Page

Save `index.php` as [`front-page.php`](https://codex.wordpress.org/Creating_a_Static_Front_Page).

By default, WordPress shows your most recent posts in reverse chronological order on the front page of your site. But some people like to have their Blog on a different page and a static home page. Use `front-page.php` if you want a static home page.

### Assign Home and Blog pages
Use `Administration` > `Settings` > `Reading` in the Dashboard to assign your `home` page and `blog` page.

![home and blog page in Dashboard](https://i.imgur.com/mNYhMSV.png)

* WordPress knows to automatically use `front-page.php` template any time you have a static homepage set.

We want Bootstrap's `jumbotron homepage` text to be editable in admin area

## [The Loop](https://codex.wordpress.org/The_Loop)
One of the main features of WordPress is `The Loop`. Every page and post will use it.

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

**With `The Loop`**

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

* Use Bootstrap plugin to style and add button
* Hard link it if you want
  + Not best practice. If it changes later, you'll have to update this code.

# Widgets

When working with custom themes in WordPress you will at times want to add widgets.

Adding a widget is a three step process.

1. In `functions.php` use the create widget function to establish the parameters you will be working with
  * Inside this function you will use the `register_sidebar()` function that will take and use the parameter values when you call `create_widget()`
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

### Add the widget to your page

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

Notice we are using the names that we created in `functions.php` (`front-left`, `front-center`, `front-right`)

This will pull in the text from the 3 Text Widgets you created in the Dashboard

View your WordPress page and you should see the 3 widgets in one horizontal row

In WP Dashboard add a `Text` Widget [looks like this](https://i.imgur.com/4W1IGJf.png)

#### Common Error with `functions.php`

If you have space after the closign `?>` php tag you will get an error. Open `functions.php` and add space after the closing `?>` php tag.

Refresh WordPress site in browser. Do you see an error?

If not, you may need to adding some code to your `wp-config.php`.

##### The White Screen of Death
Avoided with some simple troubleshooting.

You don't have debugging on which is a good thing in production but when developing you [want debugging on](https://codex.wordpress.org/Debugging_in_WordPress).

If you see the `white screen of death`, turn on [WordPress Debug Mode](https://codex.wordpress.org/Debugging_in_WordPress). Set that inside your `wp-config.php` file.

## Solutions for common WordPress errors.

[Read this article](https://codex.wordpress.org/FAQ_Troubleshooting) for more debug information on common problems.

## WYSIWYG Plugin
This plugin enables you to add marked up code without writing HTML. Great for your clients that hate writing (or don't know how) to write code.

[Black Studio TinyMCE Widget](https://wordpress.org/plugins/black-studio-tinymce-widget/)

## page.php
Our Page template.

As it stands now, our theme has two different pages.

`front-page.php` (our home page) and all the other pages we create based on `index.php`.

Save `index.php` as `page.php`

This is the `page.php` template. When we create templates they now will use `page.php`. We want `page.php` to have a different layout then `front-page.php` and `index.php` so we will now create a page with two columns.

Make `page.php` look like:

### Two column layout

`page.php`

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

Since we want dynamic content for the first column we need to put in our dynamic loop (This is `The Loop` WordPress uses)

#### What are templates?
Think of them like cookie cutters. You don't view the actual templates, you view the pages dynamically creating using those templates.

## Let's make our page.php super cool

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

#### WWe Added the `WordPress Loop`
The Loop enables us to edit our page content in the Dashboard

* `the_title()` function pulls the title of our page
* `the_content()` pulls the page content into this page
* **conditional logic** to show or hide depending on content or no content

View page in browser and you'll see it's empty

### Let's install a couple of WordPress productivity tools

## [Ipsum Generator for Chrome](https://chrome.google.com/webstore/detail/lorem-ipsum-generator-def/mcdcbjjoakogbcopinefncmkcamnfkdb)
Add this to your Chrome browser. Since you are creating a lot of empty pages, having a quick way to generate fake text will save you time.

## [GhostText](https://chrome.google.com/webstore/detail/ghosttext/godiecgffnchndlihlpaajjcplehddca)
This enables you to code WordPress in your favorite editor (Sublime Text or Atom). [This will show you how you can install it.](https://github.com/GhostText/GhostText)

#### Let's create a sidebar
Static sidebar in `page.php`

Let's add a sidebar in our `page.php.`

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

Notice we now are using `get_sidebar()`. This function works like `get_header()` and `get_footer()` except that it will pull in code from a file named `sidebar.php`.

`page.php`

```php
<?php get_header(); ?>

  <div class="container">
    <div class="row">
      <div class="col-md-9">
       [FIRST COLUMN CODE HERE]
      </div>
      <aside class="col-md-3">
       <?php get_sidebar(); ?>
      </aside>
    </div><!-- END .row -->

<?php get_footer(); ?>
```

`sidebar.php`

Inside sidebar we will put the following chunk of code.

```php
<?php if ( ! dynamic_sidebar( 'page' ) ): ?>
  <!-- if no sidebar, show this content -->
  <h3>Set Up this sidebar</h3>
  <p>Drag content here so your sidebar wont be empty</p>
<?php endif; ?>
```

Add this code to the bottom `functions.php`

```php
[more code here]
// sidebar
create_widget( 'Page Sidebar', 'page', 'Displays on side of pages with sidebar');
?>
```

`Dashboard > Widgets`

* Add Text widget (or if you are feeling daring, experiment with the `Visual Editor` widget) to `Page Sidebar` widget.
* Add some Latin filler text
* Test if it works in the browser.

## Let's Style our Sidebar
What if we want to adjust how our sidebar looks?

Add some CSS that targets your `.sidebar` class.

`css/style.css`

```css
.sidebar {
  margin-top: 40px;
  color: #444;
}
.sidebar h3 {
  color: #888;
}
```

We look at our page the color has not changed. Why not?

## Alter Widget HTML
Use the Dashboard to open `Sample Page`. If you inspect the sidebar code you will see our widget is using `H2` elements for our headings. How can we change them to `H3`?

`functions.php`

Change `H2` to `H3` so new CSS in `style.css` will work.

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

View the source and you will now see the widget is using `H3`. That browser shows that H3 styled.

### Adding More Widgets to Sidebar
This is easy. In the WP Dashboard, drag and drop `Recent Posts` into your sidebar widget.

The widgets are to close together. Need to add some padding between them.

Add this CSS to `css/style.css`

```css
.widget {
  margin: 10px 0 30px;
}
```

Inside `functions.php` we have the `register_sidebar()` function and inside that function we gave the class of `widget` to the `DIV`.

# Full Width Pages
Right now we have `front-page.php`, `index.php`, `page.php` and now we want to create a new template that will enable us to have a full width layout. It's time to use a new cookie cutter template. WordPress has lots of different templates, using different special names to achieve different outcomes. The naming of these templates is specific and if you spell it wrong, it may cause WordPress to break. [interactive WordPress hierachy page](https://wphierarchy.com/) shows the entire WordPress hierarchy.

### page-full-width.php
Save `page.php` as `page-full-width.php`

Check out the `comment` at the top of this template. This comment has special instructions for our template

Remember the special comments `style.css` has? Well, `page.php` doesn't need those special comments but if we want to create different layouts in other pages, we need to create a new template that will have the word `page` at the start of the template name, following by dashes and the `.php` extension.

Examples:
`page-three-columns.php`
`page-ten-columns.php`

Let's get back to our example with a page layout that is the full width.

`page-full-width.php`

* Once again pay particular attention to the comment at the top of the template.

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

In the WP Dashboard Create a new page and name it `About`. Throw some Latin Filler Text inside the body of the page. Save it.

Under `Page Attributes` in the Dashboard select `Full Width Template` under Template.

View the `About` page in the browser and you will see it has no sidebar!

# Ass Sass and WordPress

Create a `scss` folder in your theme root. Create all your `scss` files inside that folder. A simple way to start would be to have a `style.scss` and import all the partial files. Files like `_nav.scss` and `_variables.scss`.

Run `$ sass --watch scss:css` in your terminal.

That should generate all the css you need and put it inside your `css` folder. We already enqueued that file so when you transfer all your css code to be `scss` code, your WordPress site should look the same.

If not, open the Chrome inspector and see if you can troubleshoot.

* [part 1](bootstrap-wordpress-part-1.md)
* [part 2](bootstrap-wordpress-part-2.md)
* [part 3](bootstrap-wordpress-part-3.md)
* [part 4](bootstrap-wordpress-part-4.md)
* [part 5](bootstrap-wordpress-part-5.md)
