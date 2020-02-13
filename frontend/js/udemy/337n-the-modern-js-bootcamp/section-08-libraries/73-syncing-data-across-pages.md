# Syncing data across pages
* We will listen to changes to localStorage
* This will allow us to keep our tabs in sync

## Currently
* If we have 2 tabs open to edit-notes.html page and we change the title or body and we switch to another tab that change we made to localStorage is not reflected anywhere else
* The only way we can see the new data now is to refresh the browser
* To do this we'll be listening for an event to do something when localStorage changes

## What are we going to attach this event to?
### window to the rescue
* What is window?
    - It is another global variable provided by the browser
    - The window global variable contains lot of things related to the browser window (it is a representation of it)
    - window also contains all of the other global variables we used

### let's dive into window
* Type it into the console `> window`
* `window.innerWidth` and `window.innerHeight` (hit enter for each of them and you'll get the height and width of your browser)
    - If you changed the browser dimensions and reaccess that property the values would update to the new height and width of the browser resize

#### window.console.log()
`> window.console.log('yo')` * will output `yo` in client console

#### window.document
* We can check if window.document is equal to document

```
> window.document === document
< true
```

* They are objects and the true above means they are the exact same objects in memory

## Shorter is better
* We don't have to use `window.document` or window.console.log() or any other and we can just use the shortcut as they are the same object anyway in memory and less typing means we save ourselves time

## We are going to attach a listener to the window object
* **note** There are some listeners that it doesn't make sense to attach to a visible element on the page
* So when I want to watch localStorage for changes, I really don't want to attach it to our title input or textarea, it would be better to attach it to the window object
    - Think of this as a way to attach a "global event"

## We'll add a event listener to window
* Now in the browser for edit-note.html, click anywhere and you'll see our console log fires
    * The `click` event won't help us with localStorage
    * But there is a `storage` event and this will change anytime localStorage changes

### localStorage storage event to the rescue
* **note** `storage` only fires on other open tabs not on the current tab you are on

`notes-edit.js`

```
// MORE CODE

window.addEventListener('storage', function(e) {
  console.log('some data changed');
  // saveNotes(notes);
});
```

* Have your site edit note page open in 2 tabs (both pages should have the client console open)
* Edit one tab title or body and then switch to other tab and you'll see `some data changed` in the client console

## We need to access the latest data
* It lives on the `e` (event) argument and render it to the screen
* We could log out `e` but let's use the `debugger`

```
// MORE CODE

window.addEventListener('storage', function(e) {
  debugger;
  console.log(e);
  // saveNotes(notes);
});

// MORE CODE
```

* In brower type in title field and switch tab. Then type `e` in the browser and you'll get the StorageEvent popping up
    - You'll see `key: notes` and `newValue` and `oldValue` and that was your data before your change and after your change
* We need to make sure we check that the e.key is notes (if it is we'll run our code, if it is not we'll do nothing)

## Now we need to parse the data stored on newValue
```
// MORE CODE

window.addEventListener('storage', function(e) {
  // debugger;
  // console.log(e);
  notes = JSON.parse(e.newValue);

  // saveNotes(notes);
});

// MORE CODE
```

* Run in browser and you'll get an error
* Currently, notes has been defined by const and can't be reassigned
* We'll change it to `let` for both `notes` and `note` as both will be reassigned

`notes-edit.js`

```
// MORE CODE

let notes = getSavedNotes();
const hash = location.hash;
const noteId = hash.substring(1);
let note = notes.find(function(note) {
  return note.id === noteId;
});

// MORE CODE
```

* We still want to check the notes to find a note.id and noteId match again
* If the note is undefined we'll redirect them
* If it does we'll update the title and body inputs

```
// MORE CODE
window.addEventListener('storage', function(e) {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);

    let note = notes.find(function(note) {
      return note.id === noteId;
    });

    if (note === undefined) {
      location.assign('/index.html');
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
  }
});
```

* But now we have duplicate code
* We need to refactor
* We will keep it as is for now but will refactor it later

## Try it out
* We should not have syncing available across our tabs when the same file is open in them whether 2 or 100 tabs
* Even cooler pop the tab out so you can see tabs side by side updating in real time

### home page not updating
* It doesn't update because currently it is not listening to the storage event

## Challenge
1. Add a event listener to the window event for your app page
2. Parse the new data and update notes
3. Rerender the notes

`notes-app.js`

```
// MORE CODE
// check for any localStorage updates
window.addEventListener('storage', function(e) {
  notes = JSON.parse(e.newValue);
  renderNotes(notes, filters);
});
```

* Now data is updated in multiple pages of your app and in multiple tabs
* Play around to see how this works
* **note** The `storage` event only fires on pages we are not on, we don't need it firing on the page we are on because it is already up to date and firing twice for some thing on same page would be inefficient
* **note** Make sure you change the `const` of notes to a `let` because we are reassigned that variable

