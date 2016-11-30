# Pug Templating Language
[Formerly known as Jade](https://github.com/pugjs/pug/issues/2184)

[Jade Website](http://jade-lang.com/)

* Commonly used with express applications
* Provides lots of shortcuts
* Shorthand for writing **HTML** tags
* Express reads **Pug** and expands into complete **HTML**

## Other Pug benefits
* You can use multiple templates to assemble a web page
    - Enables you to share similar components between pages
        + Without writing extra **HTML**
            * Put `nav` in one file and include it multiple times for different routes
* Lets us access data from express routes and place them in the corresponding template
    - Example
        + We can set the page title dynamically for a route
        + Change the way our navbar looks based on the state of our application
            * Active pages in navbar
            * Or if use is logged in, change log in button to `log out`

## Where is pug defined in our app?

**app.js**

```js
// view engine setup
app.set( 'view engine', 'pug' );
app.set( 'views', __dirname + '/views' );
```

`app.set( 'view engine', 'pug' );`

* Tells the application that when referencing a view by name it will have a `.pug` file extension

## views

`app.set( 'views', __dirname + '/views' );`

* This shows where our views will be stored
    - The views folder holds all our pug files which is where we define our templates

## Create new file `views/register.pug`
* `extends layout`
    - We use this to pull in another template as the layout for the registration page
        + It is referring to `layout.pug`

**views/layout.pug**

```
doctype html(lang='en')
head
  meta(charset='utf-8')
  meta(name='viewport', content='width=device-width, initial-scale=1, shrink-to-fit=no')
  meta(http-equiv='x-ua-compatible', content='ie=edge')
  title Bookworm | #{title}
  link(rel='stylesheet', href='scripts/bootstrap/dist/css/bootstrap.min.css')
  link(rel='stylesheet', href='/css/style.css')

  body
    // load navbar.jade
    include navbar

    // content block
    block content

    // footer
    p.foot.text-xs-center A Treehouse Project

    script(src='scripts/jquery/dist/jquery.min.js')
    script(src='scripts/tether/dist/js/tether.min.js')
    script(src='scripts/bootstrap/dist/js/bootstrap.min.js')
```

## include

`include navbar`

* `pug` keyword that loads another template `navbar.pug`
* Don't need to add `.pug` extension

### views/navbar.pug

```
nav.navbar.navbar-fixed-top.navbar-dark.bg-inverse
  button.navbar-toggler.hidden-md-up.pull-xs-right(type='button', data-toggle='collapse', data-target='#navbar') &#x2630;
  #navbar.navbar-nav.collapse.navbar-toggleable-sm
    .container
      a.navbar-brand(href='/')
        i.icn-logo.material-icons bookmark_border
        | Bookworm
      .nav-items.clearfix
        a.nav-item.nav-link(href='register') Sign Up
        a.nav-item.nav-link(href='about') About
        a.nav-item.nav-link(href='contact') Contact
        a.nav-item.nav-link(href='profile') My Profile

      a.btn.btn-info.pull-md-right(href='login') Login
```

## block content
Very important line

* Indicates where express should insert html from another pug file
* This is where we will insert the registration form

## views/register.pug

```
extends layout

block content
```

### block content
`block content` above indicates the start of the content that will be injected into the `layout.pug` file

* Indented lines indicated nested **HTML** tags with classes
* `method` attribute refers to the **HTTP** method that the browser uses to submit the form
    - We are using **POST** because we are posting this information to our web server
* `action` attribute tells the form where the form data will be processed
    - we will post to `/register` which maps to the route we created in `router/index.js`

**views/register.pug**

```
extends layout

block content
  .main.container
    .row
      .col-md-6.col-md-offset-3
        h1.display-4.m-b-2 Sign Up

        // register form
        form(method='POST' action='/register')
          div.form-group
            label(for='name') Name:
            input#name.form-control(type='text', placeholder='first and last' name='name')
          div.form-group
            label(for='email') Email:
            input#email.form-control(type='email', placeholder='name@email.com' name='email')
          div.form-group
            label(for='favoritebook') Favorite Book:
            input#favoritebook.form-control(type='text', placeholder='title of book' name='favoriteBook')
          div.form-group
            label(for='pw') Password:
            input#pw.form-control(type='password' name='password')
          div.form-group
            label(for='pw2') Confirm Password:
            input#pw2.form-control(type='password' name='confirmPassword')
          button.btn.btn-primary(type='submit') Sign up
```

## Save and Test
Run `$ nodemon`

### We have a problem
Click `SIGN UP` and it doesn't work

### res.render()
Renders a view and sends the rendered HTML string to the client

[documentation on express res.render](http://expressjs.com/en/api.html#res.render) 

Update **router/index.js**

```js
// GET /register
router.get( '/register', function( req, res, next ) {
  return res.render( 'register', { title: 'Sign Up' } );
} );
```

* `{ title: 'Sign Up'}` is an object containing one key and one value
    + that will pass the string **Sign Up!** into the `layout.pug` template (_using `#{title}`_) that is extended at the beginning of the `register.pug` template 


