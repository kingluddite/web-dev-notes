# Templates With Express

* Templates live on the server
* Act as an `HTML` skeleton
    - Provides basic structure for web page
        + variables
        + logic
    - Server will dynamically inject the template with data based on those variables and logic
        + because of this, templates are often called `views`
    - This `response` is then send to the client as HTML
        + this entire process is known as `Template Rendering`

Most templating languages resemble `HTML`

## Most Popular JavaScript Templating Languages
* Handlebars
* EJS (Embedded JavaScript)
* JADE
    - By far most popular
    - Most integrated with express
    - Easiest to setup and use with express
    - Has a steeper learning curve (because of its syntax)

## [Jade](http://jade-lang.com/)
* One of the most popular templating engines for node
* Commonly used with Express
* Jade uses a compiler to transform Jade to HTML

### Practice writing Jade

On Jade site, remove jade in left column and type the following (_line by line_) paying attention to what happens during the conversion

```jade
doctype html
html
 head
  title Express Syntax Tutorial
 body
  h1 This is a fun tutorial
  p.class1.class2.another-class cool way to add classes
  p(class="phillies") I can also add classes this way
```

### Jade Syntax Package available for Sublime Text
* Install it for proper syntax coloring
* Package Name: `Jade`

#### block syntax
If you indent, jade puts indented tag inside the tag above it
as long as you indent your code properly, you don't have to add the closing tag (_big time saver_)

## Install Jade

```
$ npm install jade --save
```

Make sure it was properly installed by using `package.json`

![jade is installed](https://i.imgur.com/bOVAidq.png)

## Using Jade in our application

Create a new directory called `templates`

`src/templates`

* After we define it in our app, express will look for templates in this folder
* We will call it `templates` but we could call it anything, many developers call it `views`

`src/templates/index.jade`


```
doctype html
html(lang="en")
 head
  title Landing Page
 body
  h1 "Landing Page"
  p Man braid chartreuse vegan, tilde ennui paleo mumblecore 3 wolf moon chillwave. Messenger bag beard direct trade, fashion axe salvia crucifix ennui gochujang. Selvage fixie ennui, 8-bit chillwave four loko farm-to-table heirloom truffaut lo-fi tilde vinyl. PBR&B pabst vegan banjo, single-origin coffee four loko godard intelligentsia. Helvetica chicharrones pug, fashion axe pork belly tumblr heirloom locavore craft beer single-origin coffee keffiyeh raw denim organic quinoa. Occupy pop-up disrupt, sriracha raw denim trust fund literally deep v chartreuse. Keffiyeh mumblecore farm-to-table 8-bit viral roof party, dreamcatcher whatever direct trade vegan.
```

Lipsum generated from [hipsum.co](http://hipsum.co/)

## Make our app.js aware of jade

`src/app.js`

```js
[more code]
var app = express();

// which template engine are we using?
app.set( 'view engine', 'jade' );
// where is our template folder located?
app.set( 'views', __dirname + '/templates' );
[more code]
```

### Important Express and Path with Node Applications
Pointing to a path inside node applications

* Express will look where we tell it for our templates
* We will use a trick that invokes the dirname variable
* This is important because we are starting the server from a different directory
* We start the server from the root of our project
* In many cases node directories are going to be relative to the node process, not the file you are working in.
    - If we used this path `./templates`, express would only find the directory for the templates if the node process was started in the same directory as the `app.js` file but in our app we start our node process one directory up, with the nodemon command with a path to the `app.js` (`nodemon src/app.js`)

Because we start the process from potentially a different directory, we need to make sure that the templates path, is relative to the file and not to the node process by using `__dirname` parameter
* Now express can look for templates in the template folder

# Add index.jade to our route

```js
app.get( '/', function( req, res ) {
  res.render( 'index' );
} );
```

* We don't need to add `index.jade` because we told express we were using jade so it knows that our template files will have that suffix and this saves us from typing it.

### Run nodemon

```
$ nodemon src/app
```

View `http://localhost:3000` and you should see our that our `HTML` was rendered from our `index.jade` template

## response.render
* so far we have only been working with static data
* now we will use variables in our static responses and inject them into our templates during rendering

### Create post.jade

`src/templates/post.jade`

```
doctype html
html(lang="en")
 head
  title Post Page
 body
  section.post
   .container.text-right
   a(href="").text-faded view all
   .row
    .col-lg-8.col-lg-offset-2.text-center
     h2.section-heading I like to run!

     hr.light

     p.text-faded
       | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
     .article
       | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
```

* We will use this template when we render a specific blog post
* If you have a new block in Jade where a tag is not define (like `.container`), than that tag will be a `DIV` tag by default.

`src/app.js`

```js
app.get( '/blog/:title?', function( req, res ) {
  //debugger;
  var title = req.params.title;
  if ( title === undefined ) {
    res.status(503);
    res.send( 'Page under construction' );
  } else {
    var post = posts[ title ];
    res.render( 'post' );
  }
} );
```

* Start up server `$ nodemon src/app.js`
* View `http://localhost:3000/blog/Civitas FC Wins` in browser
    - You should see your static post.jade template in browser

## Adding variables to our response

We can access the `post` variable (in the `else` of above app.js) by providing it as an object in the second parameter of the render()

```js
res.render( 'post', { post: post });
```

### update post.jade

```
doctype html
html(lang="en")
 head
  title #{post.title}
 body
  section.post
   .container.text-right
   a(href="").text-faded view all
   .row
    .col-lg-8.col-lg-offset-2.text-center
     h2.section-heading #{post.title}

     hr.light

     p.text-faded
       | #{post.description}
     .article
       | #{post.description}
```

* Notice the new dynamic elements we added to our template

Run and view in browser using `http://localhost/Civitas FC Wins`
* Then view other blog routes (different blog titles)

### Problem
When we go to blog routes that do not exist
We get an error because when we get routed to thoses pages, the variables will be undefined

#### Quick solution
If the post we are looking for does not exist, define it as an empty object

```js
app.get( '/blog/:title?', function( req, res ) {
  //debugger;
  var title = req.params.title;
  if ( title === undefined ) {
    res.status(503);
    res.send( 'Page under construction' );
  } else {
    var post = posts[ title ] || {}; // we add to this line || {};
    res.render( 'post', { post: post });
  }
} );
```

* View in browser and go to an undefined blog route and you will see the error is no longer there. Not the best solution but it works for now.

## Organizing Templates
* name your templates well
* keep a single file at 150 lines maximum (good rule for modular development) when working with them in development
* after we add the bootstrap navbar to both our jade files, anytime we need to make a change we need to make a change in both our files.

### Solution: Create a layout template
block content
* let's jade know any page extending it's content can inject it's content here

* problems
    - spacing, remove sublime text clear end of line (was true set to false)
    - block content goes on line 2 of index.jade and post.jade and after navbar of layout.jade
    - indent content that comes after block content in index.jade and post.jade
    - the `|` means text in jade and needs a space character after it, if sublime strips it, you'll get an error

## Adding 'partials'
Create a directory called `partials` in the `templates` directory
* partials is a common naming convention and recommended for you to use in your projects
    - Other developers will know what is going on when they see your application for the first time
    - also name files with a leading underscore `ie - _nav.jade`
        + the underscore(_) means this file is not meant to be used on it's own, it is a fragment and will be included from another file

* remove the nav code from `src/templates/layout.jade` and place it inside `src/templates/partials/_nav.jade`
* use `include ./partials/_nav.jade` to include the nav inside `layout.jade`
* view in browser and make sure it works just like it did before
* as a test comment out the include and see if the nav disappears

### Make head element its own partial too
Do the exact same process for the HEAD HTML element
