# Advanced Templating
## Partials
* Handlebars needs a special config in Express to use partials

### What are partials?
* Easy. You have a footer and you have it on every page of a 1000 page website
* You don't want to code that footer for all 1000 pages
* Create a partial once and include it all 1000 pages
* Need to make a change? Easy. Change the code in the partial file and it will replicate automatically on all the pages with that partial included

## Partial config for Express
`server.js`

```js
// more code
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// more code
```

### Add template strings
* Always a nice improvement to use ESNext

```js
const hbs = require('hbs');
const express = require('express');

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));
```

## Create `views/partials` directory
### Inject handlebar template
`{{> _partialName }}`

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
  <p>{{welcomeText}}</p>
  {{> footer}}   
</body>
</html>
```

`views/about.hbs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Some Website</title>
</head>
<body>
  <h1>{{pageTitle}}</h1>
   <p>Consectetur nisi odit minima laudantium expedita molestiae Doloribus obcaecati laborum quas sunt dolores atque Officia officia placeat odio corrupti asperiores Autem fugiat delectus ad harum libero provident, cupiditate amet Quos</p>
   {{> footer}}
</html>
```

`partials/footer.hbs`

```html
<footer>
  <p>Copyright {{currentYear}}</p>
</footer>
```

## Houston we have a problem
* Nodemon is not watching our handlebar files
* We can fix this
* Stop the server and start it with this command:

`$ nodemon server.js -e js,hbs`

* We watch the js extension for the server file and the `hbs` extension

## Challenge
`views/header.js`

```html
<header>
    <h1>{{pageTitle}}</h1>
</header>
```

`about.hbs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Some Website</title>
</head>
<body>
  {{> header}}
   <p>Consectetur nisi odit minima laudantium expedita molestiae Doloribus obcaecati laborum quas sunt dolores atque Officia officia placeat odio corrupti asperiores Autem fugiat delectus ad harum libero provident, cupiditate amet Quos</p>
   {{> footer}}
</html>
```

`index.hbs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home Page</title>
</head>
<body>
  {{> header}}
  <p>{{welcomeText}}</p>
  {{> footer}}   
</body>
</html>
```

## Update partial
* Now we can update header.hbs and it will update on all the pages with that partial

`header.hbs`

```html
<header>
    <h1>{{pageTitle}}</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
</header>
```

### Register helps with handlebars
* Why add a new date inside every route
* Make a global variable

`hbs.registerHelper('name of helper', function to run);`

* When you use something inside of curly braces that clearly isn't a partial handlebars is first going to look for a helper with that name if there is no helper it will look for a piece of data with that `getCurrentYear` name

## Helpers can take arguments
`server.js`

```js
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase(); 
});
```

`index.hbs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home Page</title>
</head>
<body>
  {{> header}}
  <p>{{screamIt welcomeText}}</p>
  {{> footer}}   
</body>
</html>
```

* You could pass multiple variables if they existed, just separate them with spaces

## View in the browser
* You will see the home page have all UPPERCASE words for the welcome message

