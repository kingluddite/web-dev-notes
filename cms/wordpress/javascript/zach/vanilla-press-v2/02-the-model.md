# The Model

* New data stream with pages
* Update the Model
* Get pages and page methods
* Discussion of DRY

## New Data Stream

`js/data.js`

```js

/**
 * Main JSON object of posts, pages and settings
 */
var posts =
    [
      {
        "id":1,
        "date":"2016-01-09T22:05:09",
        "modified":"2016-01-09T22:05:09",
        "slug":"hello-world",
        "type":"post",
        "title":"Hello world!",
        "content":"Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
      },
      {
        "id":2,
        "date":"2016-01-10T22:05:09",
        "modified":"2016-01-10T22:05:09",
        "slug":"learning-javascript",
        "type":"post",
        "title":"Learning JavaScript!",
        "content":"I'm learning JavaScript and super excited!!!"
      },
      {
        "id":3,
        "date":"2016-01-11T22:05:09",
        "modified":"2016-01-11T22:05:09",
        "slug":"rest-api",
        "type":"post",
        "title":"The REST API!",
        "content":"I've started working with the REST API in WordPress, what fun!"
      },
      {
        "id":4,
        "date":"2016-01-12T22:05:09",
        "modified":"2016-01-12T22:05:09",
        "slug":"json-data",
        "type":"post",
        "title":"JSON Data!",
        "content":"So, with the REST API it is posible to pull in WordPress data as pure JSON.  Now I'm figuring out what to do with the data"
      },
      {
        "id":5,
        "date":"2016-01-13T22:05:09",
        "modified":"2016-01-13T22:05:09",
        "slug":"javascript-project",
        "type":"post",
        "title":"JavaScript Project",
        "content":"I've started working with the REST API in WordPress, what fun!"
      }
    ],
    pages =
    [
      {
        "id":6,
        "date":"2016-01-18T22:05:09",
        "modified":"2016-01-18T22:05:09",
        "slug":"home",
        "type":"page",
        "title":"Home",
        "content":"Welcome to VanillaPress, my JavaScript site!"
      },
      {
        "id":7,
        "date":"2016-01-18T22:05:09",
        "modified":"2016-01-18T22:05:09",
        "slug":"about",
        "type":"page",
        "title":"About",
        "content":"A little about me!"
      },
      {
        "id":8,
        "date":"2016-01-18T22:05:09",
        "modified":"2016-01-18T22:05:09",
        "slug":"blog",
        "type":"page",
        "title":"Blog",
        "content":"Please enjoy my posts"
      },
      {
        "id":9,
        "date":"2016-01-18T22:05:09",
        "modified":"2016-01-18T22:05:09",
        "slug":"contact",
        "type":"page",
        "title":"Contact",
        "content":"Drop me a line with any questions :)"
      }
    ]
    jsonData = JSON.stringify( { "posts": posts, "pages": pages } );
```

## Starting Model code

`js/model.js`

```js
/**
 * Model file for working with data
 */

/**
 * Main Model Object
 *
 */

var model = {};

model.init = function( ) {

    model.updateLocalStore( jsonData );
    console.log( jsonData );

};

/**
  * Gets posts from local store
  *
  * @return store {object} Object of posts
  */

model.getPosts = function( ) {

    var posts = JSON.parse(model.getLocalStore( ))[ 'posts' ];
    return posts;

};

/**
 * Get a single post based on url slug
 *
 * @param slug {string} The slug for the post
 * @return post {object} Single post
 *
 */

model.getPost = function( slug ) {

    var posts = JSON.parse(model.getLocalStore( ))[ 'posts' ];

    // Get the post from store based on the slug
    for ( i = 0, max = posts.length; i < max; i++ ) {

        if ( slug === posts[i].slug ) {
            return posts[i];
        }

    }

    return null;

};

/**
  * Gets pages from local store
  *
  * @return pages {array} Array of pages
  */

/**
  * Gets content from local store
  *
  * @return store {object} Native JavaScript object 
  * from local store
  */

model.getLocalStore = function( ) {

    var store = JSON.parse(localStorage.getItem( 'vanillaPress' ));

    return store;

};

/**
  * Saves temporary store to local storage.
  *
  * @param store {object} Native JavaScript object 
  * with site data
  */

model.updateLocalStore = function( store ) {

    localStorage.setItem('vanillaPress', JSON.stringify( store ));

};

/**
  * Deletes data from local storage
  *
  */

model.removeLocalStore = function( ) {

    localStorage.removeItem( 'vanillaPress' );

};

```

## The data

This is cool

`jsonData = JSON.stringify( { "posts": posts, "pages": pages } );`

It has an object that has **pages** and **posts** 
properties. 

Inside the **page** and **posts** properties are and array 
of `posts` objects and `pages` objects. This needed to be 
added to `data.js` from our vanilla V1 project.

## Problems
* We are stringinfying our data twice.
* We are parsing our data twice

### Stringifying dupes
* Once at the bottom of our `js/data.js` file
* And once here in our `js/model.js` file

```js
model.updateLocalStore = function( store ) {

    localStorage.setItem('vanillaPress', JSON.stringify( store ));

};
```

## Parsing Dupes
* We are actually parsing three times!

`js/model.js`

```js
model.getPosts = function( ) {

    var posts = JSON.parse(model.getLocalStore( ))[ 'posts' ];
    return posts;

};

model.getPost = function( slug ) {

    var posts = JSON.parse(model.getLocalStore( ))[ 'posts' ];

    // Get the post from store based on the slug
    for ( i = 0, max = posts.length; i < max; i++ ) {

        if ( slug === posts[i].slug ) {
            return posts[i];
        }

    }

    return null;

};
model.getLocalStore = function( ) {

    var store = JSON.parse(localStorage.getItem( 'vanillaPress' ));

    return store;

};
```

## Only stringify once

And this is where we will only stringify once

``js/model.js``

```js
model.updateLocalStore = function( store ) {

    localStorage.setItem('vanillaPress', JSON.stringify( store ));

};
```

In `js/data.js` change:

```js
jsonData = JSON.stringify( { "posts": posts, "pages": pages } );
```

to this:

```js
data = { "posts": posts, "pages": pages };
```

Our site will now break and when we look at the console we will see `jsonData is not defined(...)`

### Fix error

`js/model.js`

change this:

```js
model.init = function( ) {

    model.updateLocalStore( jsonData );
    console.log( jsonData );

};
```

to this:

```js
model.init = function( ) {

    model.updateLocalStore( data );

};
```

change this:

```js
model.getPosts = function( ) {

    var posts = JSON.parse(model.getLocalStore( ))[ 'posts' ];
    return posts;

};
```

to this:

```js
model.getPosts = function( ) {

    var posts = model.getLocalStore( )[ 'posts' ];
    return posts;

};
```

and change this:

```js
model.getPost = function( slug ) {

    var posts = JSON.parse(model.getLocalStore( ))[ 'posts' ];

    // Get the post from store based on the slug
    for ( i = 0, max = posts.length; i < max; i++ ) {

        if ( slug === posts[i].slug ) {
            return posts[i];
        }

    }

    return null;

};
```

to this:

```js
model.getPost = function( slug ) {

    var posts = model.getLocalStore( )[ 'posts' ];

    // Get the post from store based on the slug
    for ( i = 0, max = posts.length; i < max; i++ ) {

        if ( slug === posts[i].slug ) {
            return posts[i];
        }

    }

    return null;

};
```

And keep it here

```js
model.getLocalStore = function( ) {

    var store = JSON.parse(localStorage.getItem( 'vanillaPress' ));

    return store;

};
```

Delete and refresh localStorage

## Improve code and readability with `dot syntax`

Change this:

```js
model.getPosts = function( ) {

    var posts = model.getLocalStore( )[ 'posts' ];
    return posts;

};
```

to this:

```js
model.getPosts = function( ) {

    // var posts = model.getLocalStore( )[ 'posts' ];
    var posts = model.getLocalStore( ).posts;
    return posts;

};
```

## Get pages and single page

`js/model.js`

```js
/**
  * Gets pages from local store
  *
  * @return pages {array} Array of pages
  */

model.getPages = function( ) {

    var pages = model.getLocalStore( ).pages;
    return pages;

};

/**
 * Get a single page based on URL slug
 *
 * @param {String} slug The slug of the page
 * @return {Object} page Single page object
 *
 */

model.getPage = function( slug ) {

    var pages = model.getLocalStore( ).pages;

    // Get the post from store based on the slug
    for ( i = 0, max = pages.length; i < max; i++ ) {

        if ( slug === pages[i].slug ) {
            return pages[i];
        }

    }

    return null;

};
```

Note since this code looks almost identical, this is 
not DRY and should be refactored.

Test to see if it is working by adding this:

`js/model.js`

```js
model.init = function( ) {

    model.updateLocalStore( data );
    console.log(model.getPage( 'about' ));

};
```

## Bug
Zach has a function in `router.js` that is not defined 
`view.loadSingleContent()`, so temporarily comment it out 
until you get to the `router.js` code

`js/router.js`

This is the code Zach had:

```js
/**
 * Determines whether to load blog posts
 * or single post
 *
 */

router.loadContent = function( ) {

    var url = router.getSlug( );

    view.clearContent( );

    if ( null === url ) {

        // view.loadSingleContent( 'home' );

    } else if ( 'blog' === url ) {

        view.loadBlogPosts( );

    } else {

        // view.loadSingleContent( url );

    }

};
```

This is the existing code:

```js
/**
 * Determines what to load in the view
 */
router.loadContent = function loadContent() {
  const slug = router.getSlug();

  view.clearContent();

  if ( slug === null ) {
    view.loadBlogPosts();
  } else {
    view.loadBlogPost( slug );
  }
};

export default router;
```

![output from test from console](https://i.imgur.com/FJ8Cbnb.png)

## Yoda code
Yoda code is a technique used before tools like ESLinter 
were used. You can safely not use Yoda code if using
ESLinter because it will catch the errors using Yoda
code is meant to prevent.

**tip** - Start from model and work from there
