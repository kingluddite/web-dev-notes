# Loading the Edit Form
Learn how to load the content from the current page into 
the edit form so that we can customize and change it.

* New model methods for getting generic content
* Helpers for getting form elements
* Load the form content on toggle

### Start with refactoring

`js/view.js`

`loadSingleContent() method`

We are going to create a new method in `js/model.js` and we are going to take this chunk of code:

Not a good idea to have logic code in `view`

`js/view.js`

```js
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
```

And in `js/model.js` we are going to create a new method 
and take the above chunk of code and move it into the 
new method

`js/model.js`

```js
/**
 * Get a single post or page based on the URL slug
 *
 * @param {String} slug The slug for the post
 * @return {Object} contentObj Single post or page
 *
 */
model.getContent = function( slug ) {

    var contentObj = model.getPost( slug );

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
    // ADD THIS LINE
    return contentObj;

};
```

Now we can go back to `js/view.js` and make the 
following update:

`js/view.js`

```js
/**
 * Displays a single post or page based on slug
 *
 */

view.loadSingleContent = function( slug ) {

    var contentObj = model.getContent( slug ),
        titleEl = helpers.getPageTitleEl( ),
        contentEl = helpers.getPageContentEl( );

    titleEl.innerHTML = contentObj.title;
    contentEl.innerHTML = contentObj.content;

};
```

Now our code is more DRY since we refactored. If we 
didn't do what we did, we would have the same 
code checking in two different places.

### Test
Site should work just like it did before

### Find post or page when we don't know the URL

### Helpers to grab content and title

`js/helpers.js`

```js
/**
 * Gets Editor title field element
 * @return {Object} Title field
 */
helpers.getEditorTitleEl = function( ) {

    return document.getElementById( 'editTitle' );

};
/**
  * Gets Editor content field element
  * @return {Object} Content field
  */
helpers.getEditorContentEl = function( ) {

    return document.getElementById( 'editContent' );

};
```

### Get current content

`js/model.js`

```js
/**
 * Get a single post or page based on the current URL
 *
 * @return {Object} contentObj Single post or page
 */
model.getCurrentContent = function( ) {

    var slug = router.getSlug( ),
        contentObj = model.getContent( slug );

    return contentObj;
};
```

### Update our view with form data of current page

`js/editor.js`

```js
/**
 * Dynamically fills the edit form based on the URL
 * @param {Object} contentObj Post or page object
 * to load
 */
editor.loadEditForm = function( contentObj ) {

    var titleForm = helpers.getEditorTitleEl( ),
        contentForm = helpers.getEditorContentEl( );

    titleForm.value = contentObj.title;
    contentForm.value = contentObj.content;
};
```

### Update our editForm

`js/editor.js`

```js
/**
  * Controls the toggle for the editor
  * @return {Object} Main toggle element
  */
editor.toggle = function( ) {

    var editorEl = helpers.getEditorEl( ),
        toggleEl = helpers.getEditorToggleEl( );

    editorEl.classList.toggle( 'hidden' );
    toggleEl.classList.toggle( 'hidden' );

    event.preventDefault( );
    
    // WE ADD THIS CONDITIONAL
    if (false === toggleEl.classList.contains( 'hidden' )) {

        editor.loadEditForm(model.getCurrentContent( ));

    }
};
```

The above conditonal checks if the **toggleEl** does NOT 
have a hidden class which means it is open. If is is 
open we fill the form (or load it) with the data from 
the current page

### Fix a 404 problem on the home page

![404 error on home page](https://i.imgur.com/MRpd4kO.png)

We change this:

`js/model.js`

```js
/**
 * Get a single post or page based on the current URL
 *
 * @return {Object} contentObj Single post or page
 */
model.getCurrentContent = function( ) {

    var slug = router.getSlug( ),
        contentObj = model.getContent( slug );

    return contentObj;
};
```

to this:

```js
model.getCurrentContent = function( ) {

    var slug = router.getSlug( ),
        contentObj;

    if ( null === slug ) {
        slug = 'home';
    }
    
    contentObj = model.getContent( slug );

    return contentObj;
};
```

Now check and the 404/Content not found 
error is no longer on the home page.


