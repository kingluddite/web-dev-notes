# The Menu
Build a dynamic menu that will display pages from our data
file as a menu at the top of our page

* Use the `model.getPages()` method
* A new View method to build the menu
* Several new helper functions
    - Includes
        + Building individual link
        + Building a list item with a link inside of it

We want to build a menu of all our pages.

This is the code we will be targeting:

```html
<nav id="mainNav">
    <ul>
    </ul>
</nav>
```

So we need to grab that and we use `helpers.js` to do that:

`js/helpers.js`

```js
/**
 * Get's the main menu element
 * @return {Object} Main menu DOM object
 */
helpers.getMainMenuEl = function( ) {

    return document.querySelector( '#mainNav ul' );

};
```

Since we want to drop `li` elements inside the UL of 
`#mainNav` we use this **querySelector**.

## Create a link

`js/helpers.js`

```js
/**
  * Creates link
  *
  * @param {Object} page Page or post object to create link for
  * @return {Object} linkEl Link object
  */
helpers.createLink = function( contentObj ) {

    var linkEl = document.createElement( 'a' ),
        linkTitle = document.createTextNode( contentObj.title );

    linkEl.appendChild( linkTitle );

    if ( 'home' === contentObj.slug ) {
        linkEl.href = '#';
    } else {
        linkEl.href = '#' + contentObj.slug;
    }

    return linkEl;

};
```

* We create an 'A' element and we also grab the title from
our data
* We append the title to our 'A' element.
* We check if it is the home page, then we just link to 
`#` else we link to `#` + `the slug` in our data
* We return our self made link

## Create our List Items

`js/helpers.js`

```js
/**
 * Creates a list item with a link inside for menus
 *
 * @param {Object} page Page or post object to create menu item for
 * @return {Object} menuItemEl List item DOM object
 */
helpers.createMenuItem = function( contentObj ) {

    var menuItemEl = document.createElement( 'li' );

    menuItemEl.appendChild(helpers.createLink( contentObj ));

    return menuItemEl;
};
```

* We create a `LI` element
* We call our `createLink()` method and pass it our 
content object so that we can use it to access data 
properties like the **slug** or the *title*
* We append our link to the `LI` element

## Building our menu
Now that we have our helpers we can build our menu

`js/view.js`

```js
/**
 * Creates a Menu Item for a Page
 *
 */

view.createMainMenu = function( ) {

    var pages = model.getPages( ),
        menuMarkup = document.createDocumentFragment( ),
        mainMenuEl = helpers.getMainMenuEl( );

    for ( var i = 0, max = pages.length; i < max; i++ ) {

        menuMarkup.appendChild(helpers.createMenuItem(pages[i]));

    }

    mainMenuEl.appendChild( menuMarkup );

};
```

* We get our data and store it inside pages variable
* We create a document fragment
* We grab our document hook that we are going to 
attach our menu items to
* We loop through all our pages and for each page we 
append each piece of page data `pages[i]` and build our 
menu with that object.
    - Since **menuMarkup** is our fragment it will be 
    appended after the loop is completed to `mainMenuEl` 
    and this is what that will look like:

```html
<ul>
  <li><a href="#">Home</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#blog">Blog</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>
```

In order to get this to load as the `js/app.js` loads 
we need to temporarily add this line back in:

`js/app.js`

```js
init: function( ) {

   // Add any functions here you want
   // to run to start the application
   model.init( );
   router.init( );
   // ADD THIS LINE BACK IN (TEMPORARILY)
   view.init( );

}
```

We also need to call the `createMainMenu()` method 
as soon as the view is initialized:

`js/view.js`

```js
view.init = function( ) {

    // Load menu
    view.createMainMenu( );

};
```

Now when all this is completed you will see that the 
menu is created. The links don't work but that will 
be added when we work on the next changes.

![menu is working](https://i.imgur.com/HCh8ya1.png)

