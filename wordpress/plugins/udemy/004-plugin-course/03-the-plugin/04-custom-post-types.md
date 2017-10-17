# Custom Post Types
* [link post types](https://codex.wordpress.org/Post_Types)
* It can hold and display many types of content
* All the data in WordPress is held in an object called `post`
* A single item is called a post
  - Internally all the post types are stored in the same place, the `wp_posts` db table, but are differentiated by a column called `post_type`
  - WordPress has all types of functions for handling a post object and displaying its content
  - By making custom post types to store the data in our plugin, we ensure that the data in our plugin is going to be kept in WordPress' current eco system

## Couldn't we store the data in our own db tables?
* Yes but then WordPress wouldn't be as aware of our content as it might be if we created it into posts

### Intall Custom Post Type UI
* Install with WP-CLI

`$ vagrant ssh`
`$ ibdp`
`$ wp plugin install custom-post-type-ui`
`$ wp plugin activate custom-post-type-ui`

* It is now installed

![activated and installed plugin](https://i.imgur.com/GUiFtjp.png)

## Set up CPT (custom post type) for subscriber data
* Dashboard > CPT UI > Add/Edit Post Types
* Settings:
* - Post Type Slug
    + slb_subscriber
    + Plural -- Subscribers
    + Singular -- Subscriber
  - Set Public: false
    + We don't want our subscriber data to be available publicly anywhere
  - Exclude From Search: true
    + We don't want subscribers to be site searchable
  - With Front: false
  - We will create our own custom fields and won't use the default WordPress fields so we will select `none` for Supports
* Scroll to top and click `Add Post Type` (saves it)

![added post type](https://i.imgur.com/AqUxxER.png)

* It is that easy to add a post type!
* Refresh the WordPress browser window and you'll see we just added Subscribers

![Subscribers added](https://i.imgur.com/mgjn4Ss.png)

* If you select it and click `add new` you will see nothing because we selected 'none' option
* Later we'll add some custom fields

### Add another Custom Post type (lists)
* Dashboard > CPT UI > Add/Edit Post Types
* Settings:
* - Post Type Slug
    + slb_list
    + Plural -- Lists
    + Singular -- List
  - Set Public: false
    + We don't want our subscriber data to be available publicly anywhere
  - Exclude From Search: true
    + We don't want subscribers to be site searchable
  - With Front: false
  - select `title` for Supports
* Scroll to top and click `Add Post Type` (saves it)

## Done
* Now we have Subscribers and Lists in our Dashboard sidebar

### Tools
* CPT UI > Tools > Get Code
* Easy access to PHP for getting custom post types
* We are using plugins to help create plugins!
