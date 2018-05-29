# API Calls with ComponentWillMount
* delete custom route in server.js
* delete blogPost
* Now working in components folder

`components/PostIndex.js`

* Copy everthing from `post-index.js` to `PostIndex.js` and make it look like this
* This will be a component that we can drop in anywhere

```
import React, { Component } from "react";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { Config } from "../config";
import { link } from "fs/promises";

export default class PostIndex extends Component {
  static async getInitialProps() {
    const postsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/posts`);
    const posts = await postsRes.json();
    return {
      posts
    };
  }

  render() {
    const { posts } = this.props;
    return (
      <section>
        <h3>Archive</h3>
        <ul>{posts.map(post => <li>{post.title.rendered}</li>)}</ul>
      </section>
    );
  }
}
```

* getInitialProps() only works on pages
* It does not work on components
* to get it to work on components you need to use componentsWillMount() instead

## Menus
* You will need this to work with API menus in wordpress - WP-REST-API V2 Menus
* http://localhost:8080/wp-json/menus/v1/menus

### How to add a nav
* Dive into wordpress folder
* themes > functions (shows you need to open inc/menus.php)
* Make your code look like this:

```
<?php

/**
 * Register navigation menu.
 *
 * @return void
 */
function register_menus() {
    register_nav_menu( 'header-menu', __( 'Header Menu', 'postlight-headless-wp' ) );
    register_nav_menu( 'main-nav', __( 'Main Nav', 'postlight-headless-wp' ) );
}
add_action( 'after_setup_theme', 'register_menus' );
```

* Above I added `main-nav`
* View menus in dashboard and you'll see a new theme location (under Manage Locations) called Main Nav
* Select Main Nav as the assigned menu and save

![main nav location saved](https://i.imgur.com/TCLlwwS.png)

## Create footer nav
* add it inside `menus.php`

```
<?php

/**
 * Register navigation menu.
 *
 * @return void
 */
function register_menus() {
    register_nav_menu( 'header-menu', __( 'Header Menu', 'postlight-headless-wp' ) );
    register_nav_menu( 'main-nav', __( 'Main Nav', 'postlight-headless-wp' ) );
    register_nav_menu( 'footer-nav', __( 'Footer Nav', 'postlight-headless-wp' ) );
}
add_action( 'after_setup_theme', 'register_menus' );
```

![make sure to create a new menu nave it Footer Nav](https://i.imgur.com/t9DpIXW.png)

* Make sure to save it
* Check to make sure that Footer nav has been assiged to Footer Nav
* Check to make sure Main Nav also has "automatically add new top-level pages to this menu" checked and has been assigned to Main Nav
* **Double check** That each of the 3 menus is correctly assigned (I thought I assigned them properly and it did not work so I needed to redo this step)

### Now check your new api menus
* http://localhost:8080/wp-json/menus/v1/menus/main-nav (shows you main nav)
* http://localhost:8080/wp-json/menus/v1/menus/footer-nav (shows you footer nav)

### Gatsby WordPress
* Notifications Custom Notification and Alerts for WordPress
* [wordpress plugin to add hooks](https://wordpress.org/plugins/notification/)
    - install and activate
    - skip
    - Add a new notification
        + Name: Redeploy Page Pub
        + Trigger: Page published
        + Then switch on the Webhook checkbox button
            * Click Add URL button
                - type: button
                - URL: (Get and post the URL you get from following the netlify instructions below)
                    + MAKE SURE TO SAVE YOUR CHANGES
                - (go to netflify > Site settings > Build & Deploy)
                    + Scroll down to Build hooks
                        * name it `redeploy`
                        * Click save
                            - That will give you a URL
                                + Any time this URL is hit with a post request
                                + this will rebuild our gatsby site

## Test if it works
* Create a new page
    - Add a new page with a title and some lorem ipsum
    - Publish
    - That page will be build (after the deploy runs successfully on netlify)
    - It is not added to the menu but you can browse to it's slug
        + But it would have it you clicked the checkbox that said (automatically add new pages in the menu option)


## Takeaways
* Once you have the WP JSON up and running which is out of the box there
    - You just need to add the plugins to pull in the data
    - then you can hit this API in all kinds of ways
* There is a great GraphQL wordpress API package for working with a normal apollo site if you want to throw a wordpress API into anything

## What is the best way to do everything?
* If you are starting from scratch
    - use the postlight starter kit
    - if not starting from scratch use it as a basis for using an actual wordpress site

### Once you use postlight starter kit
* Go nextjs route
    - constantly updated server side site that you can host anywhere you host a node app

* Or go with gatsby that might be a little more difficult
    - We have to wait for the publish hook to trigger a rebuild
    - But the lightening fast speeds are pretty unmatched in this system 


