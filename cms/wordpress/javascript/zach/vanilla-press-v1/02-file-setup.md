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

Here is a [gist to the CSS](https://gist.github.com/kingluddite/13f343175756a0b342ae3dba8b7a93d9) code to be placed in `css/style.css`

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

Create those files in the the terminal:

Change into the `js` folder.

`$ cd js`

Create all the `js` files we will need.

`$ touch helpers.js model.js router.js view.js`

### helpers

`js/helpers.js`

```js
/**
* Helper file for extra helper functions
*/
```

* Getting pieces of the DOM
* Building out different nodes
* Building out links
* And various other things like that

### model
The model is going to be our data layer, the layer that interacts directly with our data. We are going to have our data stored in `data.js` and our model will interact with that data.

`js/model.js`

```js
/**
 * Model file for working with data
 */
```

* Getting all posts
* Get single post
* Getting page
* Saving content
* `localStorage` stuff will go here too
* Getting and saving data goes here

### router
Moving from page to page and the URL in the browser. How can we use these events and browser string to change what our application does.

`js/router.js`

```js
/**
 * Router file for managing URL changes
 */  
```

* Listening for page changes
* Figuring out what the new URL is and then grabbing that and then loading different content depending on what the URL is
* Figuring out what comes after the hash tag and then breaking that apart because we will be using the hashtag primary at this point
* Making sure the correct content is loaded on each page depending on the URL

Sample URLs

`http://mysite.com/about` vs `http://mysite.com/contact`

Hashtags in the URL (FIX THIS LATER)

`http://mysite.com/about#`

### view
This is the UI of your site. The stuff people see. The stuff your app displays.

`js/view.js`

```js
/**
 * View file for displaying content
 */ 
```

* The front end facing of our app
* Deal with everything for displaying the content
* We get the posts from our model but we display them out here, in the view
* We may need to build out things like:
  - **nodes**
  - **text nodes**
  - **element nodes** 
* And then load those things we created onto the page
  - We can also append them to page
  - Or set them to a page

**note** - Using model, view, helpers and router is used a lot but how it is used is can vary in different languages but it is very common. It will help us scale our app.

* Using model, views and controllers is known as MVC architecture (_Model View Controller_)


