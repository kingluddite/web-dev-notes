# What are WP plugins?
* A program written in PHP that adds a specific type of features or services to the wordpress web blog which can be seamlessly integrated with the weblog using using access points and methods provided by the WordPress API
* [link to doc](https://codex.wordpress.org/Plugins)
* Think of WordPress plugins like apps for phone
  - You add them and they add capability to your phone
  - Examples
    + WooCommerce - eccomerce site
    + Buddy - social network
    + [stats on cms](https://w3techs.com/technologies/overview/content_management/all)
    + [History of WordPress](https://codex.wordpress.org/History)
    + [WordPress plugin repo](https://wordpress.org/plugins/)
      * "App store for WordPress"

## What are WordPress Hooks?
* Without hooks, plugins in WordPress would be impossible
* They allow you to "hook into" the rest of WordPress
  - call functions in your plugin at specific times
  - hooks are how we add extra functionality onto wordpress

### Two kinds of hooks
1. Actions
  * custom php function defined in your plugin/theme and hooked (ie set to respond) to some of these events
  * actions do one or more of the following
    - modify database data
    - send an email message
    - modify the generated admin screen or front end page sent to the user browser
2. Filters
  * functions that WordPress passes data through at certain points of execution just before taking some action with that data
    - like adding it to the db or sending it to the browser screen
    - filters sit between the db and browser so when wp is generating pages and when between the browser and db when wordpress is adding new posts and comments to the db
    - most input and output in wordpress passes through at least one filter
    - wordpress does some filtering by default
    - you plugin can add its own filtering
    - You may sometimes achieve the same goal with either an action or a filter
    - [link to Plugin API, Hooks, Actions, Filters](https://codex.wordpress.org/Plugin_API)

## Common WordPress Hooks
* [plugins_loaded](https://codex.wordpress.org/Plugin_API/Action_Reference/plugins_loaded)
  - Called once any activated plugins have been loaded

`<?php add_action( 'plugins_loaded', 'function_name' ); ?>`

* [init](https://codex.wordpress.org/Plugin_API/Action_Reference/init)
  - - Fires after WordPress has finished loading but before any headers are sent

* [wp_head](https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head)
  - essential theme hook
  - triggered within the `<head></head>` section of the user's template by the `wp_head()` function

* [template_redirect](https://codex.wordpress.org/Plugin_API/Action_Reference/template_redirect)
  - We know which page or post the user will be viewing and this hook is just executed before the theme is chosen
  - This is useful for loading specific code only for a specific page view

* [admin_menu](https://codex.wordpress.org/Plugin_API/Action_Reference/admin_menu)
  - When you are writing plugins just for the admin side

* [full list of actions](https://codex.wordpress.org/Plugin_API/Action_Reference)

* [full list of filters](https://codex.wordpress.org/Plugin_API/Filter_Reference)

