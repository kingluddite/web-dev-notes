# Single Blog Post

* Load single blog post function
* Model method to get single post
* Update router

## Write the getPost() method

`js/model.js`

```js
/**
 * Get a single post based on URL slug
 *
 * @param slug {string} The slug for the post
 * @return post {object} Single post
 */

model.getPost = function( slug ) {

    var posts = model.getLocalStore( );

    for ( i = 0, max = posts.length; i < max; i++ ) {

        if ( slug === posts[i].slug ) {

            return posts[i];

        }

    }

    return null;

};

```

* Assume that all our slugs are unique

## Update our View

`js/view.js`

```js
/**
 * Loads a single blog post
 *
 * @param slug {string} Post to create markup for
 */

view.loadBlogPost = function( slug ) {

    var post = model.getPost( slug ),
        titleEl = helpers.getPageTitleEl( ),
        contentEl = helpers.getPageContentEl( );

    titleEl.innerHTML = post.title;
    contentEl.innerHTML = post.content;

};
```

## Update our Router

`js/router.js`

```js
/**
 * Determines what to load in the view
 *
 */

router.loadContent = function( ) {

    var slug = router.getSlug( );

    view.clearContent( );

    if ( null === slug ) {

        view.loadBlogPosts( );

    } else {

        // console.log( 'Load post ' + slug );
        view.loadBlogPost( slug );

    }

};
```

Now if you click on the list of blog titles you will be 
taken to that individual blog post.

#### Update our app.js

`js/app.js`

Change this:

```js
init: function( ) {

        // Add any functions here you want
        // to run to start the application
        model.init( );
        router.init( );
        // WE ARE REMOVING THIS LINE
        view.init( );

}
```

to this:

```js
init: function( ) {

        // Add any functions here you want
        // to run to start the application
        model.init( );
        router.init( );

}
```

Our router is taking control of initializing the view 
so we don't need this `view.init()` anymore.

* **note** - If you refresh the page, it figures out 
what it needs based on the current URL and it loads it.
