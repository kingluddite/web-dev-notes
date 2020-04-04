# Style the notes app
* Switch live server to the notes app

## What it looks like at the start
![start notes app](https://i.imgur.com/ooswK4a.png)

* If you get an error from `http://wzrd.in/standalone/uuid%2Fv4@latest` use this code and manually add:

` scripts/uuidv4.js`

```
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).uuidv4=e()}}(function(){return function(){return function e(n,r,t){function o(f,u){if(!r[f]){if(!n[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var p=new Error("Cannot find module '"+f+"'");throw p.code="MODULE_NOT_FOUND",p}var y=r[f]={exports:{}};n[f][0].call(y.exports,function(e){return o(n[f][1][e]||e)},y,y.exports,e,n,r,t)}return r[f].exports}for(var i="function"==typeof require&&require,f=0;f<t.length;f++)o(t[f]);return o}}()({1:[function(e,n,r){for(var t=[],o=0;o<256;++o)t[o]=(o+256).toString(16).substr(1);n.exports=function(e,n){var r=n||0,o=t;return[o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]]].join("")}},{}],2:[function(e,n,r){var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(t){var o=new Uint8Array(16);n.exports=function(){return t(o),o}}else{var i=new Array(16);n.exports=function(){for(var e,n=0;n<16;n++)0==(3&n)&&(e=4294967296*Math.random()),i[n]=e>>>((3&n)<<3)&255;return i}}},{}],3:[function(e,n,r){var t=e("./lib/rng"),o=e("./lib/bytesToUuid");n.exports=function(e,n,r){var i=n&&r||0;"string"==typeof e&&(n="binary"===e?new Array(16):null,e=null);var f=(e=e||{}).random||(e.rng||t)();if(f[6]=15&f[6]|64,f[8]=63&f[8]|128,n)for(var u=0;u<16;++u)n[i+u]=f[u];return n||o(f)}},{"./lib/bytesToUuid":1,"./lib/rng":2}]},{},[3])(3)});
```

* Place all `*.js` files inside `scripts`

## Update paths for all files
`index.html`

```
<!DOCTYPE html>

<html>
    <head>
        
    </head>
    <body>
        <h1>Notes App</h1>
        <h2>Take notes and never forget</h2>
        <input id="search-text" type="text" placeholder="Filter notes">
        <select id="filter-by">
            <option value="byEdited">Sort by last edited</option>
            <option value="byCreated">Sort by recently created</option>
            <option value="alphabetical">Sort alphabetically</option>
        </select>
        <div id="notes"></div>
        <button id="create-note">Create Note</button>  
        <script src="http://wzrd.in/standalone/uuid%2Fv4@latest"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment-with-locales.min.js"></script>
        <script src="/scripts/notes-functions.js"></script>
        <script src="/scripts/notes-app.js"></script>
    </body>
</html>
```

`edit.html`

```
<!DOCTYPE html>

<html>
    <head></head>
    <body>
        <a href="/index.html">Home</a>
        <input id="note-title" placeholder="Note title">
        <span id="last-edited"></span>
        <textarea id="note-body" placeholder="Enter note text"></textarea>
        <button id="remove-note">Remove note</button>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment-with-locales.min.js"></script>
        <script src="/scripts/notes-functions.js"></script>
        <script src="/scripts/notes-edit.js"></script>
    </body>
</html>
```

## Test that it still works as before
`styles/styles.css`

```
/* Base Styles */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
  font-size: 62.5%;
}

body {
  color: #333333;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
}

button {
  cursor: pointer;
}

a {
    color: #396684;
}

/* Container */

.container {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.6rem;
}

/* Header */

.header {
  background: #43799c;
  color: white;
  padding: 1.6rem 0;
}

.header__title {
  font-size: 3.2rem;
  margin-bottom: .4rem;
}

.header__subtitle {
  font-size: 1.6rem;
  font-weight: 300;
}

/* Actions Bar */

.actions {
    background-color: #F7F7F7;
    border-bottom: 1px solid #dedfe0;
    padding: .8rem
}

.actions__container {
    align-items: center;
    display: flex;
    max-width: 60rem;
    margin: 0 auto;
    min-height: 3rem;
    padding: 0 1.6rem;
}

.actions__container--spaced {
    justify-content: space-between
}

/* Form Inputs */

.input {
    border: 1px solid #DEDFE0;
    border-radius: 5px;
    font-size: 1.4rem;
    font-weight: 300;
    height: 3rem;
    margin-right: .8rem;
    padding: .4rem .8rem;
}

.dropdown {
    border-radius: 0;
    border: 1px solid #DEDFE0;
    background: white;
    font-size: 1.4rem;
    font-weight: 300;
    height: 3rem;
    margin-right: .8rem;
}

.button {
    background: #43799c;
    border: none;
    border-bottom: 2px solid #396684;
    color: white;
    font-size: 1.4rem;
    font-weight: 300;
    padding: .8rem;
    transition: background .3s ease;
}

.button:hover {
    background: #396684;
}

.button--secondary {
    background: #888888;
    border-bottom: 2px solid #717171;
}

.button--secondary:hover {
    background: #6E6E6E;
}

/* Note editor */

.title-input {
    border: 1px solid #DEDFE0;
    font-size: 2rem;
    font-weight: 300;
    display: block;
    margin: 2.4rem 0;
    padding: .8rem;
    width: 100%;
}

.body-input {
    border: 1px solid #DEDFE0;
    font-family: inherit;
    font-size: 1.6rem;
    font-weight: 300;
    display: block;
    margin: 2.4rem 0;
    min-height: 15rem;
    padding: .8rem;
    width: 100%;
}

/* Note List Item */

.list-item {
    text-decoration: none;
    color: #333333;
    background: #F7F7F7;
    border: 1px solid #dedfe0;
    margin: 1.6rem 0;
    padding: 1.6rem;
    display: block;
    transition: background .3s ease;
}

.list-item:hover {
    background: #eeeeee;
}

.list-item__title {
    font-size: 1.8rem;
    margin-bottom: .4rem
}

.list-item__subtitle {
    color: #666;
    font-size: 1.4rem;
    font-weight: 300;
    font-style: italic;
}

.empty-message {
    text-align: center;
    margin: 3.2rem 0;
}
```

## Add title, favicon and link to CSS
`index.html`

```
<!DOCTYPE html>

<html>
    <head>
     <title>Notes</title>        
     <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
     <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
     <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png">
     <link rel="manifest" href="/images/favicon/site.webmanifest">
     <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>

// MORE CODE
```

* **note** You also have to add these links to the edit.html page

`edit.html`

```
<!DOCTYPE html>

<html>
    <head>
     <title>Edit Notes</title>        
     <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
     <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
     <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png">
     <link rel="manifest" href="/images/favicon/site.webmanifest">
     <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>
        <h1>Edit Notes App</h1>

// MORE CODE
```

## Create our header and center it
`index.html`

```
// MORE CODE

    <body>
        <h1>Notes App</h1>
        <h2>Take notes and never forget</h2>

// MORE CODE
```

* And we'll structure this semantically and style it

`index.html`

```
// MORE CODE

      <header class="header">
        <div class="container">
          <p>Test content</p>
        </div>
      </header>
      <h1>Notes App</h1>
      <h2>Take notes and never forget</h2>

// MORE CODE
```

![styled header](https://i.imgur.com/oxkQoXY.png)

## Here are the styles to style our header
`styles.css`

```
// MORE CODE

/* Container */
/* goal is to set a fixed with and center the content */
.container {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.6rem;
}

/* Header */
/* goal is to give bg and font color and some padding
.header {
  background: #43799c;
  color: white;
  padding: 1.6rem 0;
}

// MORE CODE
```

## Use BEM (block, element, modifier) 
* `Block`: house
    - A block is a "high level construct"
    - An example would be a `header`
    - A big container on the page
    - A "block" of content
* `Element`: house__kitchen
    - This is just a piece of a block
        + So for `header` we have a piece of the block called `__title` and `__subtitle`
        + And we combine the block and element for `header__title`
* `Modifier`: house--condo

### What is BEM?
* [link to info about BEM](http://getbem.com/introduction/)

`styles.css`

```
// MORE CODE

.header__title {
  font-size: 3.2rem;
  margin-bottom: .4rem;
}

.header__subtitle {
  font-size: 1.6rem;
  font-weight: 300;
}

// MORE CODE
```

## Add new header withe BEM stuff
* To `index.html` and `edit.html`

`index.html`

```
// MORE CODE

        <header class="header">
          <div class="container">
            <h1 class="header__title">Notes App</h1>
            <h2 class="header__subtitle">Take notes and never forget</h2>
          </div>
        </header>

// MORE CODE
```

`edit.html`

```
<!DOCTYPE html>

<html>
    <head>
     <title>Edit Notes</title>        
     <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
     <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
     <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png">
     <link rel="manifest" href="/images/favicon/site.webmanifest">
     <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>
        <header class="header">
          <div class="container">
            <h1 class="header__title">Edit Notes App</h1>
            <h2 class="header__subtitle">Take notes and never forget</h2>
          </div>
        </header>

// MORE CODE
```

## Style forms on home page
`index.html`

```
// MORE CODE

        <div class="actions">
          <div class="actions__container">
            <input id="search-text" type="text" placeholder="Filter notes" />
            <select id="filter-by">
                <option value="byEdited">Sort by last edited</option>
                <option value="byCreated">Sort by recently created</option>
                <option value="alphabetical">Sort alphabetically</option>
            </select>
          </div>
          <!-- /.actions__container -->
        </div>
       <!-- /.actions  -->

// MORE CODE
```

## CSS
`styles.css`

```
// MORE CODE

/* Actions Bar */

.actions {
    background-color: #F7F7F7;
    border-bottom: 1px solid #dedfe0;
    padding: .8rem
}

.actions__container {
    align-items: center;
    display: flex;
    max-width: 60rem;
    margin: 0 auto;
    min-height: 3rem;
    padding: 0 1.6rem;
}

// MORE CODE
```

![styled forms on home page](https://i.imgur.com/GqCLfzi.png)

## Style our input and dropdown
* Here are the classes

`styles.css`

```
// MORE CODE

/* Form Inputs */

.input {
    border: 1px solid #DEDFE0;
    border-radius: 5px;
    font-size: 1.4rem;
    font-weight: 300;
    height: 3rem;
    margin-right: .8rem;
    padding: .4rem .8rem;
}

.dropdown {
    border-radius: 0;
    border: 1px solid #DEDFE0;
    background: white;
    font-size: 1.4rem;
    font-weight: 300;
    height: 3rem;
    margin-right: .8rem;
}

// MORE CODE
```

`index.html`

```
// MORE CODE

        <div class="actions">
          <div class="actions__container">
            <input id="search-text" type="text" class="input" placeholder="Filter notes" />
            <select id="filter-by" class="dropdown">

// MORE CODE
```

![style forms](https://i.imgur.com/75biOgK.png)

## Style our edit page
`edit.html`

```
// MORE CODE

        <div class="actions">
          <div class="actions__container actions__container--spaced">
            <a href="/index.html">Home</a>
            <span id="last-edited"></span>
          </div>
          <!-- ./actions__container -->
        </div>
        <!-- /.actions -->

// MORE CODE
```

### The M in BEM (Modifier)
* We have a block (a house), the house has an element (kitchen) and the kitchen could be modern that is the modifier
* Think of actions container that is spaced
* Here is our CSS for that:

`styles.css`

```
// MORE CODE

.actions__container--spaced {
    justify-content: space-between
}

// MORE CODE
```

![styling middle of edits page](https://i.imgur.com/mGEQIkn.png)


