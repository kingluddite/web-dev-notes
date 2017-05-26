# Saving Stores and Mixins - Part A

## Update router
`routes/index.js`

```
const express = require('express');
const storeController = require('./../controllers/storeController');

const router = express.Router();

// Do work here
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore); // add this line

module.exports = router;
```

## Update controller
`controllers/storeController.js`

```
exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};

// add this code below
exports.addStore = (req, res) => {
  res.send('addStore page!');
};
```

## Run Server 
`$ npm start`

## View Route in browser
`http://localhost:7777/add`

And you should see this:

![addStore route](https://i.imgur.com/E3iGnN7.png)

## Render
But we don't want to send that we want to render out one of our `pug` templates

`storeController.js`

```
exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};
```

## View in browser
* We see our navbar but we have an error because we didn't create the template
* We use the `editStore` template because we want to be efficient with our templates and use the editStore template for both adding and editing the Store

![editStore error](https://i.imgur.com/9ScSklM.png)

`views/editStore.pug`

```
extends layout

block content
  .inner
    h2 #{title}
```

And you will see this:

![working template](https://i.imgur.com/zHrolul.png)

Alternative for using variables:

```
extends layout

block content
  .inner
    h2= title
```

With same output result

* remember that `title` is a variable that is available to us in our **locals**

## Add a Store form
* We could attach the store form to the edit page
* But there is a better way
* We most likely will want to reuse the edit form throughout our app
* We will include our store form in a separate file
* We do this with **mixins**

## Mixins
* Kind of like a function in JavaScript
    - Pass it some data and it will return to you some HTML that needs to be displayed on the page
    - Good to preface mixin names with underscore `_name`
        + This follows the Sass naming convention

`views/mixins/_storeForm.pug`

```
mixin storeForm(store = {})
  p It works!
```

* Similar to ES6 we take an argument but default to an empty object if no argument is provided

### Import the mixin
`storeController.js`

```
extends layout

include mixins/_storeForm

block content
  .inner
    h2= title
```

* This makes the mixin function available to our pug template

#### Best Practice
* You have have multiple mixins per file
* But keep it to one mixin per file

## Use the Mixins
`storeController.js`

```
extends layout

include mixins/_storeForm

block content
  .inner
    h2= title
    +storeForm()
```

### View in browser
And you will see this:

![You see this](https://i.imgur.com/pCw39uO.png)

### Pass mixin data
`editStore.pug`

```
extends layout

include mixins/_storeForm

block content
  .inner
    h2= title
    +storeForm({ name: 'Abercrombie & Fitch'})
```

`_storeForm.pug`

```
mixin storeForm(store = {})
  p It works! #{store.name}
```

Output will show `It works! Abercrombie & Fitch`

### Why did that work?
- We passed in an object that was a store `+storeForm({ name: 'Abercrombie & Fitch'})`
- It accepts a store object `mixin storeForm(store = {})`
- And then we can use all the properties that got passed on that store
- Works just like a function in JavaScript
    + It accepts the parameters and then we can use that parameter and all the properties on it

