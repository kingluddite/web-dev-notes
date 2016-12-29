# Preview Content
How we can update the main content area or the view 
with the changes we make in our editor.

* Helpers for getting the form elements
* Attach Event listeners to the various form element
    - So that we can call View methods for updating 
    content
    - We will place them in the view because that 
    makes sense for where code should go to update 
    what the main view is doing
    - Some of our code will go in the `editor.js` 
    (_like the event listeners_) but code for updating 
    actual content will go in our view

## Update form name
`js/editor.js`

* Change name of method from `loadEditForm()` to 
`fillEditForm()`
    - The reason is **fillEditForm** makes a little 
    more sense. Your are filling out the form and 
    not loading it. The form is already loaded 
    and we are just filling it out with content

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

 };

 /**
  * Updates the main content for a page or post from editor form
  *
  */
view.updateContentFromForm = function () {

  var contentEl = helpers.getPageContentEl(),
      content   = helpers.getEditorContentEl().value;

  contentEl.innerHTML = content;

};
```

So we just user our helpers to find the title and 
content on the page and also grab the editor's 
title and content and when it is changed, listen for 
that change and update the page with those changes

## Listen for changes in the editor title and content

`js/editor.js`

```js
/**
 * Adds event listeners to from elements
 *
 */
editor.addFormListeners = function( ) {

    var titleForm = helpers.getEditorTitleEl( ),
        contentForm = helpers.getEditorContentEl( );

    titleForm.addEventListener(
    'input',
    view.updateTitleFromForm,
    false
  );

  contentForm.addEventListener(
    'input',
    view.updateContentFromForm,
    false
  );
};
```

### Update method name 
With more symantic name and add listener 

`js/editor.js`

```js
/**
 * Dynamically fills the edit form based on the URL
 * @param {Object} contentObj Post or page object
 * to load
 */
editor.fillEditForm = function( contentObj ) {

    var titleForm = helpers.getEditorTitleEl( ),
        contentForm = helpers.getEditorContentEl( );

    titleForm.value = contentObj.title;
    contentForm.value = contentObj.content;

  editor.addFormListeners();
};
```

* So when the `fillEditForm()` method is called and the 
`contentObj` is passed (_page or post slug_) we grab the 
editor title and content fields and set their value to 
the slug title and content. After that is done, we 
call the `addFormListener()` method to listen for any 
changes to the edit fields



