# Protecting Unsaved Content
* Adding a notice that informs users that if they click on a link with unsaved content in the editor that they should go back and save this before proceding.
* When you do save a page, that content will be added to the editor for you to edit.

* Update the router to fill the edit form
    - the router must check that the editor is open, and if it is, loading in the correct content into it
* New `editor.unsavedContent` property
    - where we can keep track of if the content in the editor is saved or if there have been changes made since the last time the update button was clicked
* Add event listeners to all of the links
* Code out where we display a notice that if any of the links are clicked with `unsavedContent = true` then it will display a confirmation box saying are you sure you want to proceed or you can cancel and go back and save your data.

 ## Make Pages fill editor with that current page's data

 `js/router.js`

 ```js
 /**
  * Determines whether to load blog posts
  * or single post
  *
  */

 router.loadContent = function( ) {

    var slug = router.getSlug( ),
       toggleEl = helpers.getEditorToggleEl();

    view.clearContent( );

    if ( null === slug ) {

        view.loadSingleContent( 'home' );

    } else if ( 'blog' === slug ) {

        view.loadBlogPosts( );

    } else {

        view.loadSingleContent( slug );

    }

   // Update editor.currentContent
   editor.currentContent = model.getContent( slug );

   // if editor is open, load the edit form
   if (false === toggleEl.classList.contains( 'hidden' )) {

        editor.fillEditForm( editor.currentContent );

    }

 };
 ```

 * We set the `editor.currentContent` to be what we get from `model.getContent( slug )`
 * Then we reuse an if statement from our editor's toggle method that checks if the editor is `hidden` (It's class will let us know this) and if it is not hidden then we fill the form with the current content
 * Since we did not define the variable toggleEl, we need to do that at the top and populate it with `helpers.getEditorToggleEl()`
 
 ### BUG TO FIX
 We have one error when you click on the `home` page we get a 404 error

### Add code to let us know when we have unsaved data

`js/editor.js`

```js
editor.currentContent = '';
// ADD THIS LINE
editor.unSavedContent = false;
```

`js/view.js`

```js
/**
 * Updates the main title for a page or post from editor form
 *
 */
 view.updateTitleFromForm = function () {

  var titleEl = helpers.getPageTitleEl(),
      title   = helpers.getEditorTitleEl().value;

  titleEl.innerHTML = title;
  editor.currentContent.title = title;
  editor.unSavedContent = true;

 };

 /**
  * Updates the main content for a page or post from editor form
  *
  */
view.updateContentFromForm = function () {

  var contentEl = helpers.getPageContentEl(),
      content   = helpers.getEditorContentEl().value;

  contentEl.innerHTML = content;
  editor.currentContent.content = content;
  editor.unSavedContent = true;

};
```

Now we update these two methods but we have a problem. Our code in view should be for view and our code in editor should be for editor. Here we are mixing the code and this is not good and so we need to refactor to separate them.

## Refactor and make our MVC more organized

`js/view.js`

```js
/**
 * Updates the main title for a page or post from editor form
 *
 */
 view.updateTitle = function ( title ) {

  var titleEl = helpers.getPageTitleEl();

  titleEl.innerHTML = title;

 };

 /**
  * Updates the main content for a page or post from editor form
  *
  */
view.updateContent = function ( content ) {

  var contentEl = helpers.getPageContentEl();

  contentEl.innerHTML = content;

};
```

`js/editor.js`

## Rename a method from editor.updateContent to editor.saveContent

```js
/**
 * Saves local storage for post or page
 */
editor.saveContent = function () {

  model.updateContent( editor.currentContent );

};
```

and `js/editor.js`

```js
/**
 * Update the title when changed in editor
 */
editor.updateTitle  = function () {

    var title = helpers.getEditorTitleEl().value;

    editor.currentContent.title = title;
    editor.unSavedContent = true;
    view.updateTitle( title );
};

/**
* Update the content when changed in editor
*/
editor.updateContent  = function () {

    var content = helpers.getEditorContentEl().value;

    editor.currentContent.content = content;
    editor.unSavedContent = true;
    view.updateContent( content );
};
```

Test by opening home page in browser. Update the content with update button. Refresh browser and it stays there.

## Problem
If we click to another page it does not alert us that we did not save our data.

## Update button name
`js/editor.js` - inside the `addFormListeners()` method rename `editorUpdateBtn` to be `updateBtn`

## Grab all the links

`js/helpers.js`

```js
/**
 * Gets all links
 * @return {Object[]} All link elements
 */
 helpers.getLinks = function () {

   return document.querySelectorAll( 'a' );

 };
```

## Add event listen to all links

`js/editor.js`

Add this to the top of the `addFormListeners()` method

```js
var titleForm       = helpers.getEditorTitleEl(),
          contentForm     = helpers.getEditorContentEl(),
      updateBtn = helpers.getEditorUpdateBtn(),
      // ADD THIS LINE
      links = helpers.getLinks();
```

* Now we have all the links
* **note** As mentioned previously, we renamed variable to `updateBtn`

## Add a listener to all of our links
Still inside the `addFormListeners()` method

`js/editor.js`

```js
links.forEach( function ( link ) {

      link.addEventListener(
          'click',
          editor.protectUnsavedContent,
          false
      );

  });
```

* For each of the links in our links array, we add a `click` event listener taht will call the `editor.protectUnsavedContent()` method

## protectUnsavedContent() method

```js
/**
 * Adds alert if links are clicked with unsaved content
 */
 editor.protectUnsavedContent = function () {

  if( true === editor.unSavedContent ) {

    var confirm = window.confirm( 'You have unsaved content' );

    if( false === confirm ) {

      event.preventDefault();

    } else {

      editor.unSavedContent = false;

    }

  }

 };
```

* First we check if `unSavedContent` is `true
    - If it is, we display a confirm() dialog
        + If they click confirm, we stop the page from leaving
        + If they click no, we let them leave and set unSavedContent to false
            * Which means it is OK to not save it and the changes will be lost

## Problem
If we make a change and click the update button, and then click on another page, we get the confirm window. To stop this add:

`js/editor.js`

```js
/**
 * Saves local storage for post or page
 */
editor.saveContent = function( event ) {

  event.preventDefault();
  model.updateContent( editor.currentContent );
  editor.unSavedContent = false;

};
```

## Todo list
* Add a visual clue that our update worked

