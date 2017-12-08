# Rendering Templates with data
* We created routes and wrote markup in a string
* This is not efficient
* There must be a better way
* There is - server side templates

## Templating Engine
* Will let you render HTML but in a dynamic way, where you can inject values (username, current date) inside of the template - like you would in ruby or php
* You can create reusable markup
    - for header
    - footer
    - Stuff that will be the same on many pages

## Handlebars templating engine
* [Handlebars JS Documentation](http://handlebarsjs.com/)
 
### The Handlebars view engine for express
* There are a gaggle of other view engines for express
    - Pug/Jade
    - EJS
* Handlebars has a very similar syntax to writing HTML
* Pug/Jade is what you would use if you want to use spacing and indentation to structure your doc
* EJS is similar to how PHP/ASP 
* We will use a wrapper of handlebars that is built to use with ExpressJS

#### Handlebars
`npmjs.com/package/THEPACKAGENAME`

`https://npmjs.com/package/hbs`

* [link to npm handlebars package](https://www.npmjs.com/package/hbs)

`$ yarn add hbs`

### Configure Express to use Handlebars
`server.js`

```js
const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// more code
```

* That's it
* Our Express app now is ready to use the Handlebars templating language for all it's views

## views
* This is the default Express directory for all the views

`$ mkdir views`

`$ touch views/about.hbs`

* That handlebars extension `.hbs` is important
* Don't forget to use it

`server.js`

* Just update the about route
* We use `render()` to render this template
* We pass the template name

`views/about.hbs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About Page</title>
</head>
<body>
   <h1>About Page</h1>
   <p>Consectetur nisi odit minima laudantium expedita molestiae Doloribus obcaecati laborum quas sunt dolores atque Officia officia placeat odio corrupti asperiores Autem fugiat delectus ad harum libero provident, cupiditate amet Quos</p>
</body>
</html>
```

## Run the Server and view the page
`$ nodemon server.js`

`http://localhost:3000/about`

* You will see the page!
* But this is a silly page because our page is static and we want to make it dynamic

## Dynamic Server Templates!
`about.hbs`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Some Website</title>
</head>
<body>
  <h1>{{pageTitle}}</h1>
   <p>Consectetur nisi odit minima laudantium expedita molestiae Doloribus obcaecati laborum quas sunt dolores atque Officia officia placeat odio corrupti asperiores Autem fugiat delectus ad harum libero provident, cupiditate amet Quos</p>
   <footer>
     <p>Copyright {{currentYear}}</p>
   </footer>
</body>
</html>
```

* Add this to push data into our Handlebars template

`server.js`

```js
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
  });
});
```

* View the browser `/about` and you'll see the dynamic data in the `h1` and the **footer**

```js
app.get('/', (req, res) => {
  // res.send(`<h1>Yo Express!</h1>`);
  res.render('index.hbs', {
    pageTitle: 'Home',
    currentYear: new Date().getFullYear(),
    welcomeText: 'Welcome to this website. It is great to see you here',
  });
});
```

`views/index.hbs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home Page</title>
</head>
<body>
  <h1>{{pageTitle}}</h1>
   <p>Consectetur nisi odit minima laudantium expedita molestiae Doloribus obcaecati laborum quas sunt dolores atque Officia officia placeat odio corrupti asperiores Autem fugiat delectus ad harum libero provident, cupiditate amet Quos</p>
   <footer>
     <p>Copyright {{currentYear}}</p>
     <p>{{welcomeText}}</p>
   </footer>
</body>
</html>
```



