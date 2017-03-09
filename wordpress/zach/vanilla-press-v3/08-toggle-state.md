# Toggle State
Add functionality to determine if editor was open when the page loads

* Add settings to data
* Check for editor toggle state on page load
* Update local store when editor is toggled to determine whether it was open or not
* We'll start with the data and build up from there

## Update our data
Add this code to the bottom of `js/data.js`

```js
settings = {
    "editorHidden": "true"
  },
  data = {
    "posts": posts,
    "pages": pages,
    "settings": settings
  };
```

## Find out the state of the Editor (hidden or not)

`js/hidden.js`

```js
/**
  * Gets local store setting for if editor is hidden
  */
  model.getEditorHidden = function () {

    var store = model.getLocalStore();

    return store.settings.editorHidden;

  };
```

## Log out the current state to test

`js/model.js`

```js
model.init = function( ) {

  if ( false === model.checkLocalStore() ) {
    model.updateLocalStore( data );
  }

  console.log( model.getEditorHidden() );

};
```

* You will get an error because we are looking for local store and it is not showing settings in the local store. Delete the local store by manually going into `Applications` of inspector and deleting it.
* You can then refresh the browser and you will see `true` which is the current state of the editor hidden propery.

## in editor.js there is code that was not in video. the var links wasn't there. and teh links for each to remove event listeners was not there (in the editor.toggle() method)
* video is also using old code `editor.loadEditForm()` instead of `editor.fillEditForm()`

### removeEventListeners
Address new code on how to remove event listeners that were on all links when our editor is closed

### Add variable

`js/editor.js`

```js
/**
  * Controls the toggle for the editor
  * @return {Object} Main toggle element
  */
editor.toggle = function( ) {

    var editorEl = helpers.getEditorEl( ),
        toggleEl = helpers.getEditorToggleEl( ),
        // ADD THIS LINE
    links = helpers.getLinks();

  editor.currentContent = model.getCurrentContent();

    editorEl.classList.toggle( 'hidden' );
    toggleEl.classList.toggle( 'hidden' );

    if (false === toggleEl.classList.contains( 'hidden' )) {

        editor.fillEditForm( editor.currentContent );

        // ADD THE ELSE SECTION

    } else {

      links.forEach( function ( link ) {

        link.removeEventListener(
          'click',
          editor.protectUnsavedContent,
          false
        );
      });

  }
};
```
 
## Update our 

```js
/**
  * Controls the toggle for the editor
  * @return {Object} Main toggle element
  */
editor.toggle = function( ) {

    var editorEl = helpers.getEditorEl( ),
        toggleEl = helpers.getEditorToggleEl( ),
    links = helpers.getLinks();

  editor.currentContent = model.getCurrentContent();

    editorEl.classList.toggle( 'hidden' );
    toggleEl.classList.toggle( 'hidden' );

    if (false === toggleEl.classList.contains( 'hidden' )) {

        editor.fillEditForm( editor.currentContent );
        // ADD THIS LINE
        model.updateEditorHidden( false );

    } else {

    // ADD THIS LINE
    model.updateEditorHidden( true );

      links.forEach( function ( link ) {

        link.removeEventListener(
          'click',
          editor.protectUnsavedContent,
          false
        );
      });

  }
};
```

* Above we set hidden to `false` when the editor is open and set it to `true` when editor is closed

Run this in the console (with editor open)

`> console.log( model.getEditorHidden())`

If you close the editor and run same code in console, you will see `true`

Also check to see if the data was updated in local store

## Check if editor is open or not
We need to write one more method that will check if the editor is open in our data so that it will open or close it on page load

`js/editor.js`

* Above the toggle() method add this method

```js
/**
 * Opens editor if local store has editor visible
 *
 */
 editor.checkEditorHidden = function () {

  var isHidden = model.getEditorHidden();

  if( false === isHidden ) {
    editor.toggle();
  }
  
 };
```

And at the top of `editor.js` when it is initialized add:

```js
/**
 * Initializes the VanillaPress app
 */
editor.init = function( ) {

    editor.listenEditorToggle( );
    // ADD THIS LINE
    editor.checkEditorHidden();
};
```

Now with close refresh page and with open refresh page. When open you will see it stays open even after a page refresh.

# Review
* Started with data/JSON and saved it local storage
* Checked if local storage object exists
* If it does we use that as our default data source rather than our data file
* Load page and post content to view
    - Able to display pages posts and individual page and posts based off of the navigation
* Router to control content based on URL
* Editor to edit and save content back to local storage as well as preview it along the way
* Working with MVC (Model, View, Controller)
    - Model - data
    - View - UI (what's displayed on the site)
    - Controller (was more of our router, and sometimes our editor) determining what should happen when the user makes a certain input or selection
* Added UI and UX refinements
    - Animation when you click update
    - Make sure it remembers the state of the editor (hidden not hidden)

## Take it further
* Clean up code
    - duplicate code or cleaner code or more eloquent
    - add a WYSIWYG editor, bold line breaks
        + line breaks currently don't show up
*  Build out editor navigation
    -  So you can navigate pages right from your editor, or you can see a full list of all the posts, or any settings (ability to change the site name and site description)
*  Add Post or Page functionality

Here is a hack for that

`index.html`

Update this section of code to have the `<pre>` tags

```html
<div class="primary">
 <h2 id="pageTitle"></h2>
 <pre>
    <div id="pageContent"></div>
 </pre>
</div> 
```

* The `<pre>` will save the spaces in the data.js and local store

## Better solution
* [TinyMCE](https://www.tinymce.com/)




