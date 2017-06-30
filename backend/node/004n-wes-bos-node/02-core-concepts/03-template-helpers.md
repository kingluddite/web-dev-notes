# Templating Helpers
* Times you'll need data inside every single request

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
router.get('/', (req, res) => {
  res.render('hello', {
    name: 'Diego',
    team: req.query.team,
    title: 'Foodie!', // add this line
  });
});
```

Refresh the page in the browser and you'll see our new page title:

![page title](https://i.imgur.com/F9HK1GX.png)

## Do we do the same thing for `siteName`?
If we did the same thing for `siteName` and if we had to pass these variables to every route in our routes page, it could become quite time consuming and annoying

### There has to be a better way!
There is

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
  { slug: '/stores', title: 'Stores', icon: 'store', },
  { slug: '/tags', title: 'Tags', icon: 'tag', },
  { slug: '/top', title: 'Top', icon: 'top', },
  { slug: '/add', title: 'Add', icon: 'add', },
  { slug: '/map', title: 'Map', icon: 'map', },
  { slug: '/about', title: 'About', icon: 'bullhorn', },
];
```

* Put a menu inside an array to make it easy to update and maintain

We loop through this menu in `layout.pug`

`each item in h.menu`

```
each item in h.menu
  li.nav__item
    a.nav__link(href=item.slug, class=(currentPath.startsWith(item.slug) ? 'nav__link--active' : ''))
      != h.icon(item.icon)
      span #{item.title}
```

## What the h?
* Where are we getting this `h` from?
  - `h.siteName`
  - `h.menu`

## Welcome to middleware

`app.js`

* This is a concept called `middleware`

```
// more code
// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});
// more code
```

## locals
* All variables get put into `locals`
* You can also put stuff on every single `render()`

`app.js`

```js
// more code
res.local.h = helpers;
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
  - This line gives stores a value inside `siteName` and we export it

`/helpers.js`

```js
// more code
exports.siteName = 'Now that\'s good';
// more code
```

* We use the ecape key to escape the `'`

## Imported exported code
* Then we import that into `app.js` (_technically we **require** it_)
* Then later in the page we use `res.locals.h = helpers;`
  - So we can use `h` every time we need **helpers**

### `helpers.js` is different than `variables.env`
Because `variables.env` is all sensative information

### You can use locals with:
* arrays
* strings
* Entire libraries like `moment.js`

`hello.pug`

```
extends layout

block content
  h2 Sale ends in #{h.moment().endOf('day').fromNow()}
```

* Here we are using the awesome `moment` library
* It is great for displaying time because it makes it super easy to show dates and times in pretty much any format you can think of

Outputs: `Sales ends in 10 hours`

![helpers output](https://i.imgur.com/orroTb3.png)
