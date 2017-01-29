# The Router

* Works as the Controller (in MVC pattern)
    - this means it is controlling when a user makes an 
    input into our app (changing the URL), what other 
    functions should be called
* Find our current page
    - getting the current page using the hashtag
* Determining what content should be loaded
    - if nothing is there, the home page should be loaded
    - if its on a certain page, it should look up that URL
    - if the blog page is showing it should show all of 
    the content
* Listen for URL changes (not link clicks)
    - we are going to look for URL changes at the `window` 
    level
    - we won't attach event listeners onto specific links 
    (like links of the blog posts) using `preventDefault()` and then loading the content based off of that
        + we are actually going to be listening for the URL
        changes itself
        + this is a common thing for the router to do

`js/router.js`

```js
/**
 * Router file for managing URL changes
 */

/**
 * The main router object
 */

var router = {};

/**
 * Initializes the router
 */

router.init = function( ) {};

/**
  * Gets the slug from the URL
  */
 
/**
   * Listener function for URL changes
   */
```

Make sure to add the script pointing to router in 
`index.html`

`index.html`

```html
<script src="js/data.js"></script>
<script src="js/helpers.js"></script>
<script src="js/model.js"></script>
<!-- add this -->
<script src="js/router.js"></script>
<script src="js/view.js"></script>
<script src="js/app.js"></script>
```

Update your `js/router.js`

```js
/**
 * Router file for managing URL changes
 */

/**
 * The main router object
 */

var router = {};

/**
 * Initializes the router
 */

router.init = function( ) {

    router.getSlug( );

};

/**
  * Gets the slug from the URL
  */
router.getSlug = function( ) {

    var slug = window.location.hash;

    console.log( slug );

};

/**
 * Listener function for URL changes
 */
```

Make sure you initialize the `router.js` file in `app.js`

`js/app.js`

```js
init: function( ) {

        // Add any functions here you want
        // to run to start the application
        model.init( );
        // ADD THIS LINE
        router.init( );
        view.init( );

    }

```

CLick on a link and then refresh the page. After refreshing
you will see the **console** populate with the 
`#learning-javascript` (or whatever link you clicked)

## Get rid of the the hash
Why is there a `#` (hash)?

`js/router.js`

```js
/**
 * Router file for managing URL changes
 */

/**
 * The main router object
 */

var router = {};

/**
 * Initializes the router
 */

router.init = function( ) {

    console.log(router.getSlug( ));

};

/**
  * Gets the slug from the URL
  *
  * @return slug {string} Slug for content
  */
router.getSlug = function( ) {

    var slug = window.location.hash;

    if ( '' === slug ) {

        return null;

    } else {

        // remove first character of string (# - the hash)
        return slug.substring( 1 );

    }

};

/**
 * Listener function for URL changes
 */
```

We update the comment to say it is returning something and
that it is a string and the string will be content (post) 
we keep in generic so that it can handle posts or pages

* since we do not `console.log()` in the `router.getSlug()` 
method, we use the `console.log()` in the call to 
`router.init()`

Now when we refresh the browser the console shows us the 
URL after the # but it does not have the `#` since we used
the JavaScript string method `substring(1)` to remove 
the first character `#`

### Next

Remove the `loadBlogPosts()` from this

`js/view.js`

```js
/**
 * Calls initial View methods
 *
 */
view.init = function( ) {};
```

We don't need it there, so we move it into:

`router.js`

```js
/**
 * Router file for managing URL changes
 */

/**
 * The main router object
 */

var router = {};

/**
 * Initializes the router
 */

 router.init = function( ) {

     router.listenPageChange( );

 };

/**
  * Gets the slug from the URL
  *
  * @return slug {string} Slug for content
  */
router.getSlug = function( ) {

    var slug = window.location.hash;

    if ( '' === slug ) {

        return null;

    } else {

        // remove first character of string (# - the hash)
        return slug.substring( 1 );

    }

};

/**
 * Listener function for URL changes
 */

router.listenPageChange = function( ) {

    window.addEventListener( 'hashchange', router.loadContent, false );

};

/**
 * Determines what to load in the view
 *
 */

router.loadContent = function( ) {

    var slug = router.getSlug( );

    if ( null === slug ) {

        view.loadBlogPosts( );

    } else {

        console.log( 'Load post ' + slug );

    }

};
```

But our page is blank until we click something. 
That is because our listener is waiting for a hash 
change. We need to call our router as soon as the page 
loads so add this:

`js/router.js`

```js
router.init = function( ) {

    // ADD THIS LINE
    router.loadContent( );
    router.listenPageChange( );

};
```

Now when you view the page in the browser you get a 
slug console message telling which page to load but 
we need more.

## Wipe the page

all the pages should load (if there is no #something 
in the URL)

Now we want to clear the page when a link is clicked

`js/view.js`

Add this method to the bottom of `js/view.js`

```js
/**
 * Clears title and main content from page
 */

view.clearContent = function( ) {

    var titleEl = helpers.getPageTitleEl( ),
        contentEl = helpers.getPageContentEl( );

    titleEl.innerHTML = '';
    contentEl.innerHTML = '';

};
```

Then we want to call this before the logic in 
`route.loadContent()` method of the `router.js`

```js
/**
 * Determines what to load in the view
 *
 */

router.loadContent = function( ) {

    var slug = router.getSlug( );

    // ADD THIS LINE
    view.clearContent( );

    if ( null === slug ) {

        view.loadBlogPosts( );

    } else {

        console.log( 'Load post ' + slug );

    }

};

```

Now when no hash URL we see all posts but when you click 
on any post link, the page is wiped.
