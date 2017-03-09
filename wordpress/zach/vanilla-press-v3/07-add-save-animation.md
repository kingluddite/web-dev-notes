# Adding Save Animation
Let the user know the content has been updated

* Introduction to timers in JavaScript
* Creating and calling an Animate Update button method
* Change text: `Saving...` to `Saved!` and back to `Update`
* Introduce the `setTimeout()` method allows us to delay code from being called for a certain number of milliseconds

`js/editor.js`

## Fix
**note** In `js/helpers.js`, I had named a method `getEditorUpdateBtn()` and updated it to `getEditorUpdateBtnEl()`. In order to clean the errors I just had to rename all the methods that used the old method name to the new method name.

## Back to the animation
Let's call the animate effect on the button when the `editor.saveContent()` method is called

```js
editor.saveContent = function( ) {

  event.preventDefault();
  model.updateContent( editor.currentContent );
  editor.unSavedContent = false;
  // ADD THIS LINE
  editor.animateSaveBtn();

};
```

Then, still in `js/editor.js` add this:

```js
/**
 * Animates the Update button to mimic saving data
 *
 */
 editor.animateSaveBtn = function () {

  var btn = helpers.getEditorUpdateBtnEl(),
      saved = function () {
        btn.innerText = 'Update';
      },
      saving = function () {
        btn.innerText = 'Saved!';
      };

  btn.innerText = 'Saving...';

 };
```

Now if you test and click the Update editor form button you will see the name change from `Update` to `Saving!!!`. But after that it is stuck.

##
After we set it to saving we need to run a method called `saving()`

And if we add some function calls:

```js
editor.animateSaveBtn = function () {

  var btn = helpers.getEditorUpdateBtnEl(),
      saved = function () {
        btn.innerText = 'Update';
      },
      saving = function () {
        btn.innerText = 'Saved!';
        saved();
      };

  btn.innerText = 'Saving...';
  saving();
 };
```

* It all happens so fast we can't see the change so we need to put in some delays.

### setTimeout()
Native function built into JavaScript

```js
setTimeout( function() {
    // Runs after x milliseconds
    }, milliseconds)
```

* Takes two parameters
    - one - function
    - two - how many milliseconds you want to wait before that function is called

### Just Mimicking the process
* This is not what we would do in the real world but we are just mimicking the effect. In the real world app, when we send off a request to WordPress to save the content, we'll say `Saving...` and then when we get the result back saying the new content has been saved, we'll say `Saved!` 
* So we'll use this for now but later we will update it when working with the WordPress database.

## Making our animation work
After adding the code below you will see that when you click the update button we have a feedback animation which improves our user experience.

`js/editor.js`

```js
/**
 * Animates the Update button to mimic saving data
 *
 */
 editor.animateSaveBtn = function () {

  var btn = helpers.getEditorUpdateBtnEl(),
      saved = function () {
        setTimeout( function () {
          btn.innerText = 'Update';
        }, 900 );
      },
      saving = function () {
        setTimeout( function() {
          btn.innerText = 'Saved!';
          saved();
        }, 900 );
      };

  btn.innerText = 'Saving...';
  saving();
 };
```

### Work on the toggle state of our editor



