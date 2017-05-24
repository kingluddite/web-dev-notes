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

## How can we update title and siteName?
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

If we did the same thing for `siteName` and if we had to pass these variables to every route in our routes page, it could become quite time consuming and annoying

## helpers.js
* Any helper libraries
* Any data you need in every single template
* Put `siteName` in this file
* Put a menu inside an array to make it easy to update and maintain

We loop through our menu in `helpers.js`

Here in `layout.pug`

`each item in h.menu`

But where are we getting `h` from?

`app.js`

* This is a concept called `middleware`

```
// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});
```

## locals
* All variables get put into `locals`
* You can also put stuff on every single `render()`

`app.js`

`res.local.h = helpers;`

### And where did helpers come from?
`app.js`

`const helpers = require('./helpers');`

## Export first
We export all our items from `helpers.js`

`exports.siteName = 'Now that\'s good';`

Then we import that into `app.js` (technically we **require** it)

Then later in the page we use `res.locals.h = helpers;` so we can use `h` every time we need **helpers**

* `helpers.js` is different than `variables.env` because `variables.env` is all sensative information

* You can use locals with:
    - arrays
    - strings
    - Entire libraries like `moment.js`

`hello.pug`

```
extends layout

block content
  h2 Sale ends in #{h.moment().endOf('day').fromNow()}
```

Outputs: `Sales ends in 10 hours`

![helpers output](https://i.imgur.com/orroTb3.png)
