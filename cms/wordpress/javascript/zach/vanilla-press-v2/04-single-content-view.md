# Single Content View
Build out the functionality to build out a single content 
view whether it be for a post or a page

* Create method to load post or page
    - that we will adapt from our `loadBlogPost`
* Update the router
    - to work with pages and different types of pages 
    (home, blog)

`if (null == contentInfo ) {}` won't find a post for 
the about page because it is a page so it will be `null`

**tip** you usually don't want to have logic surrounding 
your data inside your view

`js/view.js`

```js
/**
 * Displays a single post or page based on slug
 *
 */

view.loadSingleContent = function( slug ) {

    var contentObj = model.getPost( slug ),
        titleEl = helpers.getPageTitleEl( ),
        contentEl = helpers.getPageContentEl( );

    // if null we must be dealing with a page
    // so grab its slug using the getPage() method in models.js
    if ( null === contentObj ) {
        contentObj = model.getPage( slug );
    }

    // if contentObj is still null, then we will create
    // our own 404 object to return to the view
    if ( null === contentObj ) {
        contentObj = {
            title: '404 Error',
            content: 'Content not found'
        };
    }

    titleEl.innerHTML = contentObj.title;
    contentEl.innerHTML = contentObj.content;

};
```

## Update the router

`js/router.js`

```js
/**
 * Determines whether to load blog posts
 * or single post
 *
 */

router.loadContent = function( ) {

    var slug = router.getSlug( );

    view.clearContent( );

    if ( null === slug ) {

        view.loadSingleContent( 'home' );

    } else if ( 'blog' === slug ) {

        view.loadBlogPosts( );

    } else {

        view.loadSingleContent( slug );

    }

};
```

## View in browser
Now if you have no slug in the URL, you will load the `home`
page. If you click on the separate pages in the menu the
page will load from our data set. If you click on the
`blog` page, you will see all our posts pull from the
data set.




