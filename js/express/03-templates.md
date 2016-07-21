# Templates With Express

* Templates live on the server
* Act as an `HTML` skeleton
    - Provides basic structure for web page
        + variables
        + logic
    - Server will dynamically inject the template with data based on those variables and logic
        + Because of this, templates are often called `views`
    - This `response` is then send to the client as HTML
        + This entire process is known as `Template Rendering`

Most templating languages resemble `HTML`

## Most Popular JavaScript Templating Languages
* Handlebars
* EJS (Embedded JavaScript)
* JADE (now called Pug)
    - By far most popular
    - Most integrated with express
    - Easiest to setup and use with express
    - Has a steeper learning curve (because of its syntax)

## [Jade](http://jade-lang.com/)

### Caution
When working with Jade/Pug, you need to turn off a Sublime Text setting. If you don't you will get errors because `|` in Pug needs trailing space after it and the following setting removes trailing spaces automatically

```js
"trim_trailing_white_space_on_save": false,
```

### Important
Jade has been renamed to pug because of copyright violations

So install pug instead of jade:

```
$ npm install pug --save
```

**src/app.js**

and change your app.js to the following

```js
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
```

* One of the most popular templating engines for node
* Commonly used with Express
* Jade/Pug uses a compiler to transform Jade/Pug to HTML

### Practice writing Jade/Pug

On Jade/Pug site (_click on Jade link above to get to Jade site_), remove jade in left column and type the following (_line by line_) paying attention to what happens during the conversion

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

### Jade/Pug Syntax Package available for Sublime Text
* Install it for proper syntax coloring
* Package Name: `Pug`

#### block syntax
* If you indent, jade puts indented tag inside the tag above it
* As long as you indent your code properly, you don't have to add the closing tag (_big time saver_)

Make sure it was properly installed by using `package.json`

## Using Jade/Pug in our application

Create a new directory called `views`

`src/views`

* After we define it in our app, express will look for templates in this folder
* We will call it **views** but we could call it anything, many developers call it `views`

`src/templates/index.pug`


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

## Make our app.js aware of jade/pug

`src/app.js`

```js
[more code]
var app = express();

// which template engine are we using?
app.set( 'view engine', 'pug' );
// where is our template folder located?
app.set( 'views', __dirname + '/views' );
[more code]
```

### Important Express and Path with Node Applications
Pointing to a path inside node applications

* Express will look where we tell it for our templates
* We will use a trick that invokes the **__dirname** variable
* This is important because we are starting the server from a different directory
* We start the server from the root of our project
* In many cases node directories are going to be relative to the node process, not the file you are working in.
    - If we used this path `./views`, express would only find the directory for the templates if the node process was started in the same directory as the `app.js` file but in our app we start our node process one directory up, with the nodemon command with a path to the `app.js` (`nodemon src/app.js`)

Because we start the process from potentially a different directory, we need to make sure that the templates path, is relative to the file and not to the node process by using `__dirname` parameter
* Now express can look for templates in the template folder

# Add index.pug to our route

```js
app.get( '/', function( req, res ) {
  res.render( 'index' );
} );
```

* We don't need to add `index.pug` because we told express we were using jade so it knows that our template files will have that suffix and this saves us from typing it.

### Run nodemon

```
$ nodemon src/app
```

View `http://localhost:3000` and you should see our that our `HTML` was rendered from our `index.pug` template

## response.render
* so far we have only been working with static data
* now we will use variables in our static responses and inject them into our templates during rendering

### Create post.pug

`src/templates/post.pug`

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
* If you have a new block in Jade/Pug where a tag is not define (like `.container`), than that tag will be a `DIV` tag by default.

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

## Adding variables to our response

We can access the `post` variable (in the `else` of above `app.js`) by providing it as an object in the second parameter of the `render()`

* You should see your static `post.pug` template in browser

```js
res.render( 'post', { post: post });
```

### update `post.pug`

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

### Run and view in browser 
Using `http://localhost:3000/blog/Civitas FC Wins`

* Then view other blog routes (_different blog titles_)

### Problem
* When we go to blog routes that do not exist
* We get an error because when we get routed to thoses pages, the variables will be undefined

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

**post.pug** (spacing issue on github)

```
doctype html
html(lang="en")
    head
        title #{post.title}

    body#page-top
        nav#mainNav.navbar.navbar-default.navbar-fixed-top
          .container-fluid
            // Brand and toggle get grouped for better mobile display
            .navbar-header
              button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#bs-example-navbar-collapse-1')
                span.sr-only Toggle navigation
                | 
                span.icon-bar
                | 
                span.icon-bar
                | 
                span.icon-bar
              | 
              a.navbar-brand.page-scroll(href='/') FitLog.io
            // Collect the nav links, forms, and other content for toggling
            #bs-example-navbar-collapse-1.collapse.navbar-collapse
              ul.nav.navbar-nav.navbar-right
                li
                    a(href='/blog') Blog
                li
                    a.page-scroll(href='#about') About

                li
                    a.page-scroll(href='#services') Services
                | 
                li
                    a.page-scroll(href='#portfolio') Portfolio
                | 
                li
                    a.page-scroll(href='#contact') Contact
                // /.navbar-collapse
                // /.container-fluid
      section.post
        .container.text-right
        a(href="").text-faded view all
        .row
         .col-lg-8.col-lg-offset-2.text-center
          h2.section-heading #{post.title}

          hr.light

          p.text-faded
            |  #{post.description}
          .article
            |  #{post.description}
```

### Solution: Create a layout template
block content
* let's jade know any page extending it's content can inject it's content here

#### problems
* spacing, remove sublime text clear end of line (was true set to false)
* block content goes on line 2 of index.pug and post.pug and after navbar of layout.pug
* indent content that comes after block content in index.pug and post.pug
* the `|` means text in Jade/Pug and needs a space character after it, if sublime strips it, you'll get an error

## Adding 'partials'
Create a directory called `partials` in the `templates` directory
* `partials` is a common naming convention and recommended for you to use in your projects
    - Other developers will know what is going on when they see your application for the first time
    - also name files with a leading underscore `ie - _nav.pug`
        + the underscore(_) means this file is not meant to be used on it's own, it is a fragment and will be included from another file

* remove the nav code from `src/templates/layout.pug` and place it inside `src/templates/partials/_nav.pug`
* use `include ./partials/_nav.pug` to include the nav inside `layout.pug`
* view in browser and make sure it works just like it did before
* as a test comment out the include and see if the nav disappears

### Make head element its own partial too
Do the exact same process for the HEAD HTML element
