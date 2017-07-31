# Rendering an Angular 2 app with NodeJS/Express
* Delete `node.hbs` - We won't be using it

## SPA
* Single Page Application
* Angular 2 allows us to do this
* We will only have one view file using a template file
* We need to render one html page and then angular 2 will take over
    - We need to provide certain hooks for that page

## Set up our backend NodeJS routes
* This is for now

`routes/app.js`

```js
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
```

## Here is our template:
`views/index.hbs`

```html
<!DOCTYPE html>
<html>
<head>
    <base href="/">
    <title>Angular Messenger</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel='stylesheet' href='/stylesheets/style.css'/>

</head>
<body>
<my-app>Loading...</my-app>

<script src="/js/app/bundle.js"></script>
</body>
</html>
```

* Webpack will take care of creating `bundle.js`
* Angular will be inside that file along with all our custom client side JavaScript

### Service!
This is how our front end that holds Angular 2 gets served
