# Create and edit flow stores (Part 2)

## Getting our `editStore` showing up with store name
`storeController.js`

```
exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  const _id = req.params.id;
  const store = await Store.findOne({ _id });
  // 2. Confirm they are the owner of the store
  // TODO
  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};
```

![working edit form](https://i.imgur.com/yOspAON.png)

### Dump the data above the store
This is good to let us know we are using the edit form and teh data shows us how we can target it to pre-populate the form with the data

`editStore.pug`

```
extends layout

include mixins/_storeForm

block content
  .inner
    pre= h.dump(store)
    h2= title
    +storeForm()
```

### View in browser
![data above our edit store form](https://i.imgur.com/ToXWQcm.png)

## How do we populate fields and check checkboxes?
To match our data

`editStore.pug`

```
extends layout

include mixins/_storeForm

block content
  .inner
    h2= title
    +storeForm(store)
```

### How are we using two forms for two different reasons?
`_storeForm.pug`

```
mixin storeForm(store = {})
```

* This is possible because of this line
* If we don't pass a store the form will be passed an empty object
* If we do pass a store to the mixin, the form will be passed the `store` object

* `- const tags = store.tags || []`
    - We set it to `store.tags` or an empty array because further down the code we will use the `includes()` method and if you try to use the array `includes()` method on something that doesn't exist you will get an error (_can not read property includes of undefined_)

### How do you make a checkbox checked?
`checked`

* When you want to run JavaScript you add parenthesees like this `checked=()`
* If you set a value like `value=store.name` and there is no store name, it is ok, it will then just be empty
* `<textarea>` doesn't have a **value** attribute so we use `textarea(name="description")= store.description`

```
- const tags = store.tags || []
    ul.tags
      each choice in choices
        .tag.tag__choice
          input(type="checkbox" id=choice value=choice name="tags" checked=(tags.includes(choice)))
          label(for=choice) #{choice}
    input(type="submit" value="Save" class="button")
```

* So with checkboxes we create an array that holds all of our store's current tags or we create an empty array
* Later in the code we use `checked=(tags.includes(choice))` and if any of our tags are included in that **tags** array, we mark that particular checkbox as **checked**
    - Otherwise it will return false and **pug** knows to omit that item from being checked

`_storeForm.pug`

```
mixin storeForm(store = {})
  form(action="/add" method="POST" class="card")
    label(for="name") Name 
    input(type="text" name="name" value=store.name)
    label(for="description") Description
    textarea(name="description")= store.description
    - const choices = ['Wifi', 'Open Late', 'Family Friendly', 'Vegetarian', 'Licensed']
    - const tags = store.tags || []
    ul.tags
      each choice in choices
        .tag.tag__choice
          input(type="checkbox" id=choice value=choice name="tags" checked=(tags.includes(choice)))
          label(for=choice) #{choice}
    input(type="submit" value="Save" class="button")
```

View several stores and after you click the `edit` button you will see that each store input, textarea and checkboxes are filled in appropriately

## Now we need to handle updating the URL
If we submit now the form action will **POST** to `/add` and that won't work because it will create another store instead of updating the existing store

### URL trick
* We are using one form for two different tasks, adding stores and editing stores
* We need to make our `action` URL to be dynamic
    - We need it to be `action="/add"` on when we are adding stores
    - And we need it to be ``action=`/add/${store._id}`` when we are editing pages

To accomplish this we use: ``form(action=`/add/${store._id || ''}``

And after you make that change you will see when you visit the `/add` route and inspect the form it will have this action:

![add form action](https://i.imgur.com/frgvnIg.png)

And if you visit the edit store page you will see this when you inspect the form in the Chrome console

![edit from action](https://i.imgur.com/gIIkYSA.png)

## Test
* Add a store to make sure everything works like it did and you didn't break anything
* After you add the store verify that it appears on the `stores` page

## Edit (Update) Stores
If you edit a store and change a form field and submit the form you will get a 404 and when you check the database, the **store** was never updated

## Add the /add/:id route
To fix this we need to add a route

`index.js`

`router.post('/add/:id', catchErrors(storeController.updateStore));`

### Organize our routes better with this
`index.js`

```
const express = require('express');
const storeController = require('./../controllers/storeController');
const { catchErrors } = require('./../handlers/errorHandlers');

const router = express.Router();

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

module.exports = router;
```

### Make our `updateStore()` controller
`storeController.js`

```
exports.updateStore = async (req, res) => {
  // find and update the store

  // Redirect them to teh store and tell them it worked
};
```

### findOneAndUpdate(query, data, options)
* We could query for the store
* Bring it back
* Change the data on it
* Then send it back to the Database and update it

But `findOneAndUpdate()` is a method in MongoDB that will allow us to kind of do it in one fell swoop (which is nice!)

* `new: true` - returns the new store instead of the old one (_By default findOneAndUpdate() will return to us the old store and not the updated data_)
* `runValidators: true` - We run our validators only on insert but this option makes sure that if someone changes a value from something to nothing and their is a `required` value in that field's schema, the validators will run again and the person will get an error and the data won't be updated
* We tag on `.exec()` on the end to make sure this runs (some won't run so we do this to make sure it runs)
* All of this returns a Promise so we make sure we use `await`

`storeController.js`

```
exports.updateStore = async (req, res) => {
  // find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // returns the new store instead of the old owner
    runValidators: true,
  }).exec();
  // Redirect them to the store and tell them it worked
  req.flash('success', `Successfully update <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`);
  res.redirect(`/stores/${store._id}/edit`);
};
```

* We use async-await to go grab and update store data with our new values
* We make sure our schema is followed (validate)
* We flash congrats to our use and give them a link to that store
* We bring the user back to our form with the store data changed and saved
* The link to the new store is broken because we didn't create that route yet
