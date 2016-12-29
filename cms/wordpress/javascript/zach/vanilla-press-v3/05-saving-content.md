# Saving Content
Saving to localStorage when the update button is clicked

* Add event listener to Update button
* Add an editor.currentContent property
    - save the latest updates to the post or page 
    while it is being updated and this will be used 
    when ever we need reference that
        + In the past we just grabbed the form element 
        itself, grabbed it's value, but now we'll create 
        something slightly different which will be a 
        store of the latest current content (post or page)
* Add updateContent method in our Model
    - to actually do the saving for us
    - the main logic will be here to find out the
    current post or page we are working with editing 
    and make sure we make the updates and save them

## Grab the editor's update button
Since we may need to use this several times, let's 
make it a helper

`js/helpers.js`

```js
/**
  * Gets editor content form element
  * @return {Object} Content form element
  */
  helpers.getEditorUpdateBtn = function () {
    return document.getElementById( 'editUpdateBtn' );
  };
```

## Set a current content property
We initially set it to empty.

`js/editor.js`

```js
editor.init = function( ) {

    // Call editor toggle listener
    editor.listenEditorToggle( );
};

// WE ADD THIS LINE
editor.currentContent = '';
```

## create the updateContent() method
When this is called we need to call the method we 
defined `model.updateContent()` and we pass that 
method the value inside `editor.currentContent`

## Add listener to update button

`js/editor.js`

```js
/**
 * Adds event listeners to from elements
 *
 */
editor.addFormListeners = function( ) {

    var titleForm       = helpers.getEditorTitleEl(),
          contentForm     = helpers.getEditorContentEl(),
      // ADD THIS
      editorUpdateBtn = helpers.getEditorUpdateBtn();

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
  // ADD THIS
  // Add listener for updateBtn
  editorUpdateBtn.addEventListener(
    'click',
    editor.updateContent,
    false
  );
};
```

* We use our helper to grab the update button
* We add a `click` listener to that button that will 
call `editorContent` method when that event occurs

## Set the currentContent property
We set this to what the `model.getCurrentContent()` 
method gives us

`js/editor.js`

```js
/**
  * Controls the toggle for the editor
  * @return {Object} Main toggle element
  */
editor.toggle = function( ) {

    var editorEl = helpers.getEditorEl( ),
        toggleEl = helpers.getEditorToggleEl( );

  // ADD THIS
  // when toggle is clicked we grab the current content 
  // and store it inside this property
  editor.currentContent = model.getCurrentContent();

    editorEl.classList.toggle( 'hidden' );
    toggleEl.classList.toggle( 'hidden' );

    // REMOVE THIS LINE - shouldn't be here, there is no event
    // event.preventDefault( );

    if (false === toggleEl.classList.contains( 'hidden' )) {

        // UPDATE THIS LINE (now pass in editor.currentContent );
        editor.fillEditForm( editor.currentContent );

    }
};
```

* So no if you test this in the browser and you are on 
the home page. Open the editor and then in the Chrome 
console, type `> editor.currentContent`. You shoud see 
an Object returned with the home page data inside it.
* If you click to the About page and refresh the browser 
and type this in the Chrome 
console `> editor.currentContent`, you will now see 
an Object with the About page data.

### Fix problem
If you add content into the about page (assuming we are working on the About page and we just tested that the About page data was returned when we typed `> editor.currentContent` in the Chrome console), the content you added will not appear in the Object if you type `> editor.currentContent` 
again.

#### Solution to the problem

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
  // ADD THIS LINE
  editor.currentContent.title = title;

 };
```

Add this line

```js
/**
  * Updates the main content for a page or post from editor form
  *
  */
view.updateContentFromForm = function () {

  var contentEl = helpers.getPageContentEl(),
      content   = helpers.getEditorContentEl().value;

  contentEl.innerHTML = content;
  editor.currentContent.content = content;

};
```

* So now when we update the title or content, 
the `> editor.currentContent` will update.
* We have a problem in that now we have editor stuff 
inside our view page. This is not good OOP design and 
we will fix this later. For now we will keep it and if 
you test it, it should work

## Next problem
When we click the update button we get a quick error 
before it sends us to the next page. The reason is 
in `editor.js` we are calling `model.updateContent()` 
method which we did not write yet.

### Found code change
Not sure when this code was added but it was

`js/editor.js`

```js
/**
 * Listens for the editor toggle button
 */
editor.listenEditorToggle = function( ) {

    var toggleEl = helpers.getEditorToggleEl( );

    toggleEl.addEventListener( 'click',
    // THIS FUNCTION WAS ADDED WITH PREVENT DEFAULT
  function() {
    editor.toggle();
    event.preventDefault();
  }, false );
  
};
```

### Did not get Save content form to work
It should update in object and it was not.
In video the update button when clicked wasn't 
closing editor form but mine was. Moving on to see if 
it is fixed in next video.

#### Update on Update form closing when clicking update
Found in video 1.6.18 - Protecting Unsaved Content

`js/editor.js`

Change this:

```js
editor.updateContent = function( event ) {

  model.updateContent( editor.currentContent );

};
```

To this:

```js
editor.saveContent = function( event ) {

  event.preventDefault();
  model.updateContent( editor.currentContent );

};
```

# Load from local Store
Add the functionality where if local storage already exists, our app will load that instead of wiping the current local storage and replacing it with the data file

* Start with model method to check if local store exists
    - This will give us a true/false value and then we can determine if we want to
        + Load from local store if it exists
        + Or if not, we will load our data file
        + This will allow us to "keep" saved content
        + **note** someone could go in and lose local storage and then they would lose all of their edits, but for our purposes this works well
        + Eventually, when working with the WordPress API, we will write back and save our content to the database, rather than just saving it in local storage
        + we can use local storage and mysql for the best result

### Notes update
It looks like everything is working but the Update button hides the form when it is clicked which is not what is in the video.

## create simple method to check if local store exists

`js/model.js`

```js
/**
  * Checks if local store already exists
  *
  * @return {Boolean} Boolean value for if local sotre already exists
  */
model.checkLocalStore = function () {

    var store = model.getLocalStore();

    if( null === store ) {
      return false;
    } else {
      return true;
    }

};
```

* we could use a terniary operator to streamline this but we kept is simple and obvious so we are sure what is happening

We then go to the top of `js/model.js` and check if local store exists and if it does, use it, otherwise just pull in our data.js file.

`js/model.js`

```js
model.init = function( ) {

  if ( false === model.checkLocalStore() ) {
    model.updateLocalStore( data );
  }

};
```

## Problems
1. When we click on another page, the form does not update with that page's data inside the editor form. So we need to add code that if they click on a new page that should repopulate the editor form with the new page data.
2. If we are editing a page and then click on another page but haven't saved our current edit, we should be alerted that we are about to leave a page and lose unsaved data.



