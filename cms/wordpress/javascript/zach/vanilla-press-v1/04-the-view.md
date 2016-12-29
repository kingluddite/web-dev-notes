# The View
The part that is displayed in the browser.

**note**

```html
<script src="js/data.js"></script>
<script src="js/helpers.js"></script>
<script src="js/model.js"></script>
<script src="js/view.js"></script>
<script src="js/app.js"></script>
```

* We add the `helpers.js` after data because we may want to use the functions inside it on the following `js` files.
* The `view.js` is after `model.js` because it may use data from the model file.

Let's run `view.init`:

`js/app.js`

```js
/**
 * The main app object.
 *
 */
var vanillaPress = {

    init: function( ) {

        // Add any functions here you want
        // to run to start the application
        model.init( );
        view.init( );

    }

};
```

Now let's grab `#pageContent` from `index.html`

`js/view.js`

```js
/**
 * View file for displaying content
 */

/**
 * Main view object
 */

var view = {};

/**
 * Calls initial View methods
 *
 */
view.init = function( ) {};

/**
 *  Gets blog posts and appends them to the page
 */

view.loadBlogPosts = function( ) {

    var posts = model.getPosts( ),
        postsMarkup = document.createDocumentFragment( ),
        primaryContentEl;

};
/**
  * Creates Markup for Blog Posts
  *
  * @param object {post} Post to create markup for
  * @return object {articleEl} Final post markup
  */
```

## js/helpers.js

We need to have a method that grabs the **#pageContent**

```js
/**
* Helper file for extra helper functions
*/

var helpers = {};

helpers.getPageContentEl = function( ) {

    return document.getElementById( 'pageContent' );

};
```

Here is the HTML fragment we need.

`index.html`

```html
<div class="primary">
    <h2 id="pageTitle"></h2>
    <div id="pageContent">
    </div>
</div>
```

We grab `#pageContent` so we can put stuff inside it.

We need a helper to grab the page title

`js/helpers.js`

```js
// we add this method
helpers.getPageTitleEl = function( ) {

    return document.getElementById( 'pageTitle' );

};

helpers.getPageContentEl = function( ) {

    return document.getElementById( 'pageContent' );

};
```

### Test to see if it is working

`js/app.js`

```js
init: function( ) {

    // Add any functions here you want
    // to run to start the application
    model.init( );
    view.init( );
    console.log(helpers.getPageTitleEl( ));
    console.log(helpers.getPageContentEl( ));

}
```

* Remove `console.log()` tests when you know they work

`js/view.js`

```js
/**
 * View file for displaying content
 */

/**
 * Main view object
 */

var view = {};

/**
 * Calls initial View methods
 *
 */
view.init = function( ) {

    view.loadBlogPosts( );

};

/**
 *  Gets blog posts and appends them to the page
 */

view.loadBlogPosts = function( ) {

    var posts = model.getPosts( ),
        postMarkup = document.createDocumentFragment( ),
        primaryContentEl = helpers.getPageContentEl( );

    for ( var i = 0, max = posts.length; i < max; i++ ) {

        postMarkup.appendChild(view.createPostMarkup(posts[i]));

    }

};

/**
  * Creates Markup for Blog Posts
  *
  * @param post {object} Post to create markup for
  * @return articleEl {object} Final post markup
  */

view.createPostMarkup = function( post ) {

    console.log( post );

};
```

View the page in the browser and you will see in the console that we see one post but we do get an error on the second post because it is not a node. Our code is working enough to move forward. But we will need to fix this in the future.

## Show our JSON!
Now let's finally get our JSON data on the page.

`js/view.js`

```js
/**
 * View file for displaying content
 */

/**
 * Main view object
 */

var view = {};

/**
 * Calls initial View methods
 *
 */
view.init = function( ) {

    view.loadBlogPosts( );

};

/**
 *  Gets blog posts and appends them to the page
 */

view.loadBlogPosts = function( ) {

    var posts = model.getPosts( ),
        postMarkup = document.createDocumentFragment( ),
        primaryContentEl = helpers.getPageContentEl( );

    for ( var i = 0, max = posts.length; i < max; i++ ) {

        postMarkup.appendChild(view.createPostMarkup(posts[i]));

    }

    primaryContentEl.appendChild( postMarkup );

};

/**
  * Creates Markup for Blog Posts
  *
  * @param post {object} Post to create markup for
  * @return articleEl {object} Final post markup
  */

view.createPostMarkup = function( post ) {

    var articleEl = document.createElement( 'article' ),
        titleEl = document.createElement( 'h3' ),
        titleLink = document.createElement( 'a' ),
        titleText = document.createTextNode( post.title ),
        contentEl = document.createElement( 'div' );

    // header
    titleLink.appendChild( titleText );
    titleLink.href = '#' + post.slug;
    titleEl.appendChild( titleLink );

    contentEl.appendChild(document.createTextNode( post.content ));

    articleEl.appendChild( titleEl );
    articleEl.appendChild( contentEl );

    return articleEl;

};
```

View the page in the browser and you will see our JSON 
parsed and manipulate using JavaScript and the DOM. 
But what's with the HTML not being rendered properly? 
This is more complex data than we need to deal with 
right now. So jor now just go into `data.js` and 
manually remove all our HTML.

`js/data.js`

```js
/**
 * Main JSON object of posts, pages and settings
 */
var posts = [
        {
            "id": 1,
            "date": "2016-01-09T22:05:09",
            "modified": "2016-01-09T22:05:09",
            "slug": "hello-world",
            "type": "posts",
            "title": "Hello world!",
            "content": "Welcome to WordPress. This is your first post. Edit or delete it, then start writing! "
        }, {
            "id": 2,
            "date": "2016-01-10T22:05:09",
            "modified": "2016-01-10T22:05:09",
            "slug": "learning-javascript",
            "type": "posts",
            "title": "Learning JavaScript!",
            "content": "I'm learning JavaScript and super excited!!! "
        }, {
            "id": 3,
            "date": "2016-01-11T22:05:09",
            "modified": "2016-01-11T22:05:09",
            "slug": "rest-api",
            "type": "posts",
            "title": "The REST API!",
            "content": "I've started working with the REST API in WordPress, what fun! "
        }, {
            "id": 4,
            "date": "2016-01-12T22:05:09",
            "modified": "2016-01-12T22:05:09",
            "slug": "json-data",
            "type": "posts",
            "title": "JSON Data!",
            "content": "So, with the REST API it is posible to pull in WordPress data as pure JSON.  Now I'm figuring out what to do with the data "
        }, {
            "id": 5,
            "date": "2016-01-13T22:05:09",
            "modified": "2016-01-13T22:05:09",
            "slug": "javascript-project",
            "type": "posts",
            "title": "JavaScript Project",
            "content": "I've started working with the REST API in WordPress, what fun! "
        }
    ],
    jsonData = JSON.stringify( posts );
```

Note if after refreshing the browser you still see the 
unparsed `<p>` tags, make sure you have:

`js/model.js`

```js
model.init = function( ) {

    model.updateLocalStore( jsonData );

};
```

That line of code will update our localStorage so that it 
is not using a cached version of our JSON data.




