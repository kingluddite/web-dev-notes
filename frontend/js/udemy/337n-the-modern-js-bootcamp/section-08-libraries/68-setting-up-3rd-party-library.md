# Setting up 3rd Party Library
* We want to delete todos
* How do we target one specific todo?
* By the text? What if the text is the same for multiple todos?
* We need a way to add a unique identifier

## We will use a 3rd party library
### What is a 3rd party library?
* Just some code that someone else wrote
* We need a way to uniquely id an element
* Someone wrote a program to do specifically that, we can use it and not have to code it ourselves (reinvent the wheel), save time and use theirs

## UUID
* [uuid repo](https://github.com/uuidjs/uuid)
* **note** node-uuid is deprecated (above repo is new one)
* (node means we can't use it in the browser, but they removed the node part and we can use this in the browser too)
    - [link for browsers and uuid](https://github.com/uuidjs/uuid)
* But we need to work in the browser and the CDN for this is not working
* [Here is a Gist of the file](https://gist.github.com/andrewjmead/d64087c46129fc58df67c361cb01e889)

`uuidv4.js`

```
!function(r){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.uuidv4=r()}}(function(){return function r(e,n,t){function o(f,u){if(!n[f]){if(!e[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var d=new Error("Cannot find module '"+f+"'");throw d.code="MODULE_NOT_FOUND",d}var p=n[f]={exports:{}};e[f][0].call(p.exports,function(r){var n=e[f][1][r];return o(n?n:r)},p,p.exports,r,e,n,t)}return n[f].exports}for(var i="function"==typeof require&&require,f=0;f<t.length;f++)o(t[f]);return o}({1:[function(r,e,n){function t(r,e){var n=e||0,t=o;return t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]}for(var o=[],i=0;i<256;++i)o[i]=(i+256).toString(16).substr(1);e.exports=t},{}],2:[function(r,e,n){var t="undefined"!=typeof crypto&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&msCrypto.getRandomValues.bind(msCrypto);if(t){var o=new Uint8Array(16);e.exports=function(){return t(o),o}}else{var i=new Array(16);e.exports=function(){for(var r,e=0;e<16;e++)0===(3&e)&&(r=4294967296*Math.random()),i[e]=r>>>((3&e)<<3)&255;return i}}},{}],3:[function(r,e,n){function t(r,e,n){var t=e&&n||0;"string"==typeof r&&(e="binary"===r?new Array(16):null,r=null),r=r||{};var f=r.random||(r.rng||o)();if(f[6]=15&f[6]|64,f[8]=63&f[8]|128,e)for(var u=0;u<16;++u)e[t+u]=f[u];return e||i(f)}var o=r("./lib/rng"),i=r("./lib/bytesToUuid");e.exports=t},{"./lib/bytesToUuid":1,"./lib/rng":2}]},{},[3])(3)});
```

* It is minified
* Put it in it's own file `uuidv4.js`

## Add to html
`index.html`

```
 // MORE CODE

    <button id="create-note">Create Note</button>
    <script src="assets/js/uuidv4.js"></script> <!-- Add this line -->
    <script src="assets/js/notes-functions.js"></script>
    <script src="assets/js/notes-app.js"></script>
  </body>
</html>
```

## Let's experiment with this 3rd party library uuid
`notes-app.js`

```
console.log(uuidv4());
let notes = getSavedNotes();

// MORE CODE
```

## View in browser
* Look in console and you'll see a number similar to `865f8c83-dc6f-4c22-b379-c81ceec5b374`

## Use uuid
* Remove test log from notes-app.js
* Add new `id` property to where we create new notes
* Use `localStorage.clear()` to get rid of all previous notes

`notes-app.js`

```
// MORE CODE

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  notes.push({
    id: uuidv4(),
    title: '',
    body: '',
  });
  saveNotes(notes);
  debugger; // I added this to test
  renderNotes(notes, filters);
});

// MORE CODE
```

* Now when you create a new note the page will freeze
* Type `notes` in console and you will see that an id has been added to the note

![new note added with id](https://i.imgur.com/Rs6JnNN.png)

## Another way to view the array info
* Remove the debugger
* Add a few more notes
* Go into the client Application tab (Chrome) and click on localStorage and you can click each note individually and you'll see that each note has a unique id

## Challenge
* Add unique `id` using uuid for todos
* Just do the same thing for todos
* Add the script pointing to uuidv4.js

```
// MORE CODE

// todo form submit listener
document
  .querySelector('#new-todo-form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    todos.push({
      id: uuidv4(),
      text: e.target.elements.text.value,
      completed: false,
    });
    saveTodos(todos);
    // store in localStorage
    renderTodos(todos, filters);
    e.target.elements.text.value = '';
  });

// MORE CODE
```

`index.html`

```
// MORE CODE
    <script src="assets/js/uuidv4.js"></script>
    <script src="assets/js/todos-functions.js"></script>
    <script src="assets/js/todos-app.js"></script>
  </body>
</html>
```

* Check that after removing all todos and adding some new ones, make sure you check the localStorage that each have a unique id from uuid
