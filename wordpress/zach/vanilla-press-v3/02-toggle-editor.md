# Toggle the editor
How to toggle the editor open and closed

* Add event listener to toggle
* Toggle hidden class on toggle
* Update the `event.init()` method
    - Make sure it is always listening to see if this
    toggle is clicked

## Starting code with comments

`js/editor.js`

```js
/**
 * Code for the Editor
 */

/**
  * The main Editor object
  */
var editor = {};

/**
   * Initializes the VanillaPress app
   */
editor.init = function( ) {

    // Call editor toggle listener

};

/**
 * Listens for the editor toggle button
 * @return {Object} Main editor DOM object
 */

/**
  * Controls the toggle for the editor
  * @return {Object} Main toggle element
  */

/**
   * Gets editor toggle link element in the DOM
   * @return {Object} Main toggle link
   */
```

### Update editor.js

`js/editor.js`

```js
/**
 * Initializes the VanillaPress app
 */
editor.init = function( ) {

    // Call editor toggle listener
    editor.listenEditorToggle( );
};

/**
 * Listens for the editor toggle button
 */
editor.listenEditorToggle = function( ) {

    var editorEl = helpers.getEditorEl( );
    console.log( editorEl );
};
```

### add our helper to get the form

`js/helpers.js`

```js
/**
 * Gets the Editor element in the DOM
 * @return {Object} Main editor DOM object
 */
helpers.getEditorEl = function( ) {

    return document.getElementById( 'editor' );

};
```

### intialize the editor

`js/app.js`

```js
init: function( ) {

  // Add any functions here you want
  // to run to start the application
  model.init( );
  router.init( );
  view.init( );
  // ADD THIS LINE
  editor.init( );

}
```

### Test in console and you will see

```html
<section id="editor" class="">

      <h1>VanillaPress</h1>

      <nav id="edit" class="active">

        <form action="">
          <ul>
            <li>
              <label for="editTitle">Title</label>
              <input type="text" name="editTitle" id="editTitle">
            </li>
            <li>
              <label for="editContent">Content</label>
              <textarea name="editContent" id="editContent"></textarea>
            </li>
            <li>
              <button id="editUpdateBtn" type="submit" value="Update" class="btn primary">Update</button>
            </li>
          </ul>
        </form>
      </nav>
      <!-- /#edit.active -->
    </section>
```

### Fix something
We made a mistake. We didn't want the form. We wanted to get the #editorToggle so:

Add this helper

`js/helper.js`

```js
/**
 * Gets Editor toggle element in the DOM
 * @return {Object} Main toggle element
 */
helpers.getEditorToggleEl = function( ) {

    return document.getElementById( 'editorToggle' );

};
```

And update your listening method

`js/editor.js`

```js
/**
 * Listens for the editor toggle button
 */
editor.listenEditorToggle = function( ) {

    var toggleEl = helpers.getEditorToggleEl( );
    console.log( toggleEl );
};
```

### Check in the browser and you should see this in the console:

```html
<div id="editorToggle" class="hidden">
    <a href="#">
      <span class="arrow"></span>
      <label>Hide Editor</label>
    </a>
</div>
```

### Forgot to do this before
Comment out this consol.log()

`js/model.js`

```js
var model = {};

model.init = function( ) {

    model.updateLocalStore( data );
    // console.log(model.getPage( 'about' ));

};
```

### Update editor to get toggle working

`js/editor.js`

```js
/**
 * Listens for the editor toggle button
 */
editor.listenEditorToggle = function( ) {

    var toggleEl = helpers.getEditorToggleEl( );

    toggleEl.addEventListener( 'click', editor.toggle, false );
};

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
};
```

### If you test in browser
The toggle should work

### What does classList.toggle() do again?
[learn about classList.toggle](http://callmenick.com/post/add-remove-classes-with-javascript-property-classlist)

### Make the editor closed by default
Just manually add the `hidden` class in two places:

`index.html`

`<section id="editor" class="hidden">`

and

`<div id="editorToggle" class="hidden">`

### View in browser
The editor is not hidden by default but will toggle open when you click on the button


