## File Setup
* Break functionality out into separate files
* Follow Model, View, Controller* organization
* Go over each file and what it does
* Next: Build out each file

`index.html` (starting file)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>VanillaPress</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <section id="wrapper">

    <section id="view">

      <div class="container">

        <header class="page-header">
          <h1 id="siteName"><a href="#">VanillaPress</a></h1>
          <h2 id="siteDesription">A JS Front &amp; Back End</h2>
        </header>

        <div class="content">

          <div class="primary">
            <h2 id="pageTitle"></h2>
            <div id="pageContent">
            </div>
          </div>

          <div class="sidebar">
            <h3>Welcome!</h3>
            <p>
              This site is built using JavaScript and JSON.
            </p>
          </div>

        </div>

        <div class="footer">
          <p>Made with JavaScript &hearts;</p>
        </div>

      </div>

    </section>

  </section>
  <script src="js/data.js"></script>
  <script src="js/app.js"></script>

</body>
</html>
```

Add some calls to external code:

#### Order is very important

* **note** the order of these matter
    - in order for one file to call the function/method from another file, it needs to appear before the file calling it.

```html
<script src="js/data.js"></script>
<!-- add the following 4 files -->
<script src="js/helpers.js"></script>
<script src="js/model.js"></script>
<script src="js/router.js"></script>
<script src="js/view.js"></script>
<script src="js/app.js"></script>
```

Create those files

`$ cd js`

`$ touch helpers.js model.js router.js view.js`

### helpers

`js/helpers.js`

```js
/**
* Helper file for extra helper functions
*/
```

* getting pieces of the DOM
* or building out different nodes
* building out links
* stuff like that

### model

`js/model.js`

```js
/**
 * Model file for working with data
 */
```

* getting all posts
* get single post
* getting page
* saving content
* localStorage stuff will go here too
* getting and saving data goes here

### router

`js/router.js`

```js
/**
 * Router file for managing URL changes
 */  
```

* listening for page changes
* figuring out what the new URL is and then grabbing that and then loading different content depending on what the URL is
* figuring out what comes after the hash tag and then breaking that apart because we will be using the hashtag primary at this point
* making sure the correct content is loaded on each page depending on the URL

### view

`js/view.js`

```js
/**
 * View file for displaying content
 */ 
```

* the front end facing of our app
* deal with everything for displaying the content
* we get the posts from our model but we display them out here, in the view
* we may need to build out nodes, text nodes, element nodes, load those onto the page, append them to page, set them

**note** - using model, view, helpers and router is used a lot in different languages and is very common. It will help us scale our app

* known as MVC architecture (Model View Controller)

