# Templating Helpers
* Times you'll need data inside every single request

## The `/dist` folder
* We run our code and it gets moved to the `/dist` folder
* Delete `/dist` and refresh the browser

![no js or styles](https://i.imgur.com/Rsi2WRI.png)

### Regenerate our production files
* Stop the server `ctrl` + `c`
* `$ yarn start`
* Our `dist` folder gets regenerated with the CSS and JS "readable code" (aka 'unminified and uglified')

## Update our Logo
* Make the following modification

`layout.pug`

```
// more code
li.nav__item
  a.nav__link.nav__link--logo(href="/")
    | The Retail Apocalypse
// more code
```

## Update our title
`layout.pug`

```
doctype html
html
  head
    title= `${title} | ${h.siteName}`
// more code
```

## How can we update title?
Easy, when you create your route, just pass the title to the template you are rendering

`routes/index.js`

```
router.get('/learning', (req, res) => {
  res.render('learning', {
    title: 'Latest Store Closing!', // add this line
  });
});
```

Refresh the page in the browser and you'll see our new page title:

![page title](https://i.imgur.com/CMmR3HS.png)

## Do we do the same thing for `siteName`?
* If we did the same thing for `siteName`
* And if we had to pass these variables to every route in our routes page
* It could become quite time consuming and annoying

### There has to be a better way
* There is!

## helpers.js
* This is a file that we put stuff we'll be using all over our site
* Any helper libraries
* Any data you need in every single template

`helpers.js`

### Put `siteName` in this file

```js
// more code
// Some details about the site
exports.siteName = `Retail Apocalypse!`;
// more code
```

### We have our menu in helpers.js too
```js
exports.menu = [
  { slug: '/stores', title: 'Stores'}
];
```

* Put a menu inside an array to make it easy to update and maintain

## Looping over our menu
* We can create multiple menu items using a JavaScript object like this:

`helpers.js`

```js
// more code
exports.menu = [
  { slug: '/stores', title: 'Stores' },
  { slug: '/about', title: 'About' },
  { slug: '/contact', title: 'Contact' },
];
```

* We loop through this menu in `layout.pug`

`each item in h.menu`

```
each item in h.menu
  li.nav__item
    a.nav__link(href=item.slug)
      span #{item.title}
```

## What the h?
* Where are we getting this `h` from?
  - `h.siteName`
  - `h.menu`

## Welcome to middleware
* This is a concept called `middleware`

`app.js`

```
// more code
// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  next();
});
// more code
```

## locals
* All variables get put into `locals`
* You can also put stuff on every single `render()` inside our routes

`index.js`

```js
// more code
router.get('/learning', (req, res) => {
  res.render('learning', {
    title: 'Latest Store Closings'
  });
});
// more code
```

`app.js`

```js
// more code
app.use((req, res, next) => {
  res.locals.h = helpers;
  next();
});
// more code
```

### And where did helpers come from?
* At the top of `app.js` we require it and store it inside a variable so we can use that variable later on in `app.js`
* We store it in the `helpers` variable

`const helpers = require('./helpers');`

## Export first
* Check out `/helpers.js`
* We use `exports` on all the items in this page so we can use them on other pages
  - But we can only use them on other pages if we `require` them
  - `require` is a feature of `Node.js`
  - JavaScript and ES6 use `import` to load modules
* We export all our items from `helpers.js`
  - This line stores a value inside `siteName` and we export it

`/helpers.js`

```js
// more code
exports.siteName = 'The Retail Apocalypse';
// more code
```

## Imported exported code
* We import `siteName` into `app.js` (_technically we **require** it_)
* Then later in the page we use `res.locals.h = helpers;`
  - So we can use `h` every time we need **helpers**

### `helpers.js` is different than `variables.env`
Because `variables.env` is all sensitive information

### You can use locals with:
* arrays
* strings
* Entire libraries like `moment.js`

`learning.pug`

```
extends layout

block content
  h2 The next store closes in #{h.moment().endOf('day').fromNow()}
```

* Here we are using the awesome `moment` library
* It is great for displaying time because it makes it super easy to show dates and times in pretty much any format you can think of

Outputs: `The next store closes in 3 hours` (your time may differ)

![helpers output](https://i.imgur.com/ti7tL4i.png)
