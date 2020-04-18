# Converting Notes (part 1)
* Similar to converting hangman app with 2 exceptions

## 2 exceptions
1. 2 3rd party modules we'll install and import (uuid and moment)
2. This app has 2 html pages and each html page loads different scripts

## Move files
* Duplicate boilerplate as `notes-app-webpack`
* Copy and paste into `public` `index.html` (overwrite existing `index.html` and `edit.html`
* drag images and styles to proper folders

### The JavaScript files
* We have different js we want to run for each HTML file
* We'll modify the webpack.config.js
* We'll have 2 js files, add edit.js inside `src`
    - make sure each file has a simple log:
        + example: (src/edit.js) `console.log('edit.js');`

## webpack config
`webpack.config.js`

```
// MORE CODE

const path = require('path')

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/index.js'],
    edit: ['babel-polyfill', './src/edit.js'],
  },

// MORE CODE
```

* We'll convert entry from array to an object
* **note** Make sure you have a comma at the end of the entry object
* We'll use key/value pairs
    - The key will be filenames
    - The value will be what is used in that filename

## We'll need to output 2 different bundle files
* We'll use `[]` to dynamically apply the file name from the key in the key/value pairs of the `entry` object

```
// MORE CODE

  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
    filename: '[name]-bundle.js',
  },

// MORE CODE
```

* Now this will create 2 files
    - `index-bundle.js` (will point to ['babel-polyfill', './src/index.js'])
    - `edit-bundle.js` (will point to ['babel-polyfill', './src/edit.js'])
* Update `.html` files with links to the js

`index.html`

```
<!DOCTYPE html>
<html class="no-js" lang="en">
  
<head>
  <meta charset="UTF-8">
  <title>Notes Webpack App</title>
  <meta name="description" content="Notes App">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- generate your custom favicon &#45; https://favicon.io/favicon&#45;generator/ -->
  <link rel="manifest" href="/assets//img/favicon/site.webmanifest">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png">

  <link rel="stylesheet" href="/assets/css/normalize.css">
  <link rel="stylesheet" href="/assets/css/styles.css">

  <meta name="theme-color" content="#fafafa">
</head>
    <body>
        <header class="header">
          <div class="container">
            <h1 class="header__title">Notes App</h1>
            <h2 class="header__subtitle">Take notes and never forget</h2>
          </div>
        </header>
        <div class="actions">
          <div class="actions__container">
            <input id="search-text" type="text" class="input" placeholder="Filter notes" />
            <select id="filter-by" class="dropdown">
                <option value="byEdited">Sort by last edited</option>
                <option value="byCreated">Sort by recently created</option>
                <option value="alphabetical">Sort alphabetically</option>
            </select>
          </div>
          <!-- /.actions__container -->
        </div>
       <!-- /.actions  -->
        <div class="container">
          <div id="notes"></div>
          <button id="create-note" class="button">Create Note</button>  
        </div>
        <!-- /.container -->
        <script src="/assets/js/index-bundle.js"></script>
</html>

```

* Same thing for `edit.html` but:

`edit-note.html`

* [link](http://localhost:8080/edit-note.html)

```
<!DOCTYPE html>
<html class="no-js" lang="en">
  
<head>
  <meta charset="UTF-8">
  <title>Edit Note</title>
  <meta name="description" content="Notes App">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- generate your custom favicon &#45; https://favicon.io/favicon&#45;generator/ -->
  <link rel="manifest" href="/assets//img/favicon/site.webmanifest">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png">

  <link rel="stylesheet" href="/assets/css/normalize.css">
  <link rel="stylesheet" href="/assets/css/main.css">

  <meta name="theme-color" content="#fafafa">
</head>
<body>
  <a href="/index.html">Home</a>
  <form id="edit-note-form">
   <input id="note-title" type="text" placeholder="Note Title" />
   <span id="last-edited"></span>
   <textarea id="note-body" name="noteBody" cols="30" rows="10" placeholder="Body of Note"></textarea>
  </form>
  <button id="remove-note-button">Remove Note</button>
 <script src="/assets/js/index-bundle.js"></script>
</body>
</html>
```

## Install all dependencies
* Navigate to notes-app-webpack folder

`$ npm i`

## Run webpack dev server
`$ npm run dev-server`

* We should see 2 logs in client console then we know our file infrastructure is setup properly
    - `index.js`
    - `edit.js`
* The styles should be working
* The page is not functional yet
* Each html page is loading the correct bundle

## Next - work on the JavaScript
* We'll convert the files from the old `scripts` directory over to the new `src` directory
