# The Model
Dealing with the data

* Functions related to the data
* Get posts or single post
* Save and get from Local Storage (Local Store)

`js/model.js`

```js
/**
 * Model file for working with data
 */

/**
 * Main Model Object
 */

var model = {};

model.init = function( ) {

    model.updateLocalStore( jsonData );
    console.log(model.getLocalStore( ));
};

/**
   * Gets posts from local store
   *
   * @return posts {array} An array of post objects
   */

model.getPosts = function( ) {};

/**
 * Gets content from local store
 *
 * @return store {object} Object or array of objects of site data
 */
model.getLocalStore = function( ) {

    return JSON.parse(localStorage.getItem( 'vanillaPress' ));

};

/**
 * Saves temporary store to local storage
 *
 * @param store {string} JSON string of data to store
 */

model.updateLocalStore = function( store ) {

    // we are assuming we are getting JSON
    // to make this more robust you could check if it is an object
    // or JSON first and handle accordingly
    localStorage.setItem( 'vanillaPress', store );

};
/**
 * Deletes data from local storage
 */
```

`index.html`

* In order for first test to work we need these files at the bottom

```html
<script src="js/data.js"></script>
<script src="js/model.js"></script>
<script src="js/app.js"></script>
```

`js/app.js`

```js
/**
 * Main app file.  Initializes app components.
 */

/**
 * The main app object.
 *
 */
var vanillaPress = {

    init: function( ) {

        // Add any functions here you want
        // to run to start the application
        // console.log( jsonData );
        // when our main app loads (vanillaPress.init())
        // we also want to trigger kick off the model which is going to
        // get our data, local store and set up all the other methods
        // we need
        model.init( );

    }

};

vanillaPress.init( );

// Add your custom code starting here:
```

**note** - in model.js we pass `model.updateLocalStore( jsonData )` and this takes the JSON mimick of WordPress REST API code from our `data.js` file.

So far our app needs to use `data.js`, `model.js` and `app.js`.

## remove the data from localStorage

`js/model.js`

```js
/**
 * Deletes data from local storage
 */

model.removeLocalStorage = function( ) {

    localStorage.removeItem( 'vanillaPress' );

};
```

And then test it out with:

`js/model.js`

```js
model.init = function( ) {

    model.updateLocalStore( jsonData );
    console.log(model.getLocalStore( ));
    model.removeLocalStorage( );

};
```

If you refresh the page in the browser, and re-inspect the localStorage, you will see that it has been removed. Comment out `model.removeLocalStorage()` and the data in localStorage will return.

Make `model.init()` look like the following after testing that the delete method works:

`js/model.js`

```js
model.init = function( ) {

    model.updateLocalStore( jsonData );

};
```

## Update the getPosts() method

`js/model.js`

```js
/**
   * Gets posts from local store
   *
   * @return posts {array} An array of post objects
   */

model.getPosts = function( ) {

    var posts = model.getLocalStore( );
    return posts;

};
```

Then test if it works with:

`js/model.js`

```js
model.init = function( ) {

    model.updateLocalStore( jsonData );
    console.log(model.getPosts( ));

};
```

View in the browser and use the inspector to see the console and you will see 

![array of objects](https://i.imgur.com/geCsIVB.png)

And if you open one of the arrays you will see:

![opened object inside the array of objects](https://i.imgur.com/j1ZasUy.png)

The test is successful. You can remove the test console.log

`js/model.js`

```js
model.init = function( ) {

    model.updateLocalStore( jsonData );

};
```

### Why did we start with model.js?
A lot of developers feel comfortable dealing with everything that has to do with your data first. Because once you have your data you can build your data and your router more easily because you have stuff to work with. Otherwise you need to work with mimic code.







