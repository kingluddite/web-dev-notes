# Query Database Stores
* We want to display our stores
* We want to display our stores on the `home page` and on the `stores page`
* We need a controller method that runs on both of those **routes**

`storeController.js`

```
// more code
exports.getStores = (req, res) => {
  res.render('stores', { title: 'Stores' });
};
```

## Update two routes to use this same `getStores()` controller
`index.js`

```
// more code
router.get('/', storeController.getStores);
router.get('/stores', storeController.getStores);
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;
```

## View in browser
If you view `/` or `/stores` you will see `Failed to lookup view "stores" in views directory`

* Create `stores.pug`
* Copy `editStore.pug` and paste into `stores.pug`

`stores.pug`

```
extends layout

include mixins/_storeForm

block content
  .inner
    h2= title
    +storeForm()
```

And make it look like this:

```
extends layout

block content
  .inner
    h2= title
```

## View in browser
Now `/` and `/stores` pages work

### Before we get the stores
We need to:

1. Query the Database for a list of all stores before we can show them on the page

### We need to use `async` on the `getStores()` controller
#### Rules for using `async`
1. Place the word `async` before your controller

`storeController.js`

```
// more code
exports.getStores = async (req, res) => {
  res.render('stores', { title: 'Stores' });
};
```

2. Inside your **routes** wrap your controller inside `catchErrors()`

`index.js`

```
// more code
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;
```

### Now we want to query for all the stores
`storeController.js`

```
exports.getStores = async (req, res) => {
  const stores = await Store.find();
  console.log(stores);
  res.render('stores', { title: 'Stores' });
};
```

### View in Terminal
The server will show you all the stores inside the Terminal

![all stores inside Terminal](https://i.imgur.com/qLvpeAz.png)

Now we want to take that `stores` variable and give it to our template so we can loop over it

`storeController.js`

```
exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};
```

## View in browser
We see nothing

Let's dump it

`stores.pug`

```
extends layout

block content
  .inner
    h2= title
    pre= h.dump(stores)
```

### View in browser
* You'll see our stores data has now been dumped to the page
* View you live `MongoDB` Database and see our data is there (_MongoDB Compass_)

## How do we get our data on the actual page
`stores.pug`

```
extends layout

block content
  .inner
    h2= title
    .stores
      each store in stores
        h2= store.name
```

* We loop over each store in stores and out a H2 with the `store.name`
* Refresh the browser and you'll see the large store names

![large store names](https://i.imgur.com/KZENSVO.png)

## Store Card
Push our store names to a separate mixin

* Create a new mixin called `/mixins/_storeCard.pug`
* We want to show a photo if the store has one and if not, display a default image
    - `public/uploads/store.png`

## ES6 Template strings vs Interpolation
`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      img(src=`/uploads/${store.photo || 'store.png'}`)
      h2.title
        a(href=`/store/${store.slug}`) #{store.name}
```

## For Attribute Values --> ES6 Template Strings
* If you want to generate an attribute like:

``a(href=`/store/${store.slug}`)``

* You have to use an ES6 template string

## Variable inside text content of a `node` --> Pug Interpolation
`#{store.name}`


### We are finished with our mixin
#### Import our mixin
`stores.pug`

```
extends layout

include mixins/_storeCard

block content
  .inner
    h2= title
    .stores
      each store in stores
        +storeCard(store)
```

* Notice when we include our mixin we are not using quotes
* We call our **mixin** and pass it our `store`

## View in browser
![all our stores](https://i.imgur.com/ZPwhTDz.png)

* If you click on a store you get a 404
* We didn't create those routes yet

## Add a description
`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      img(src=`/uploads/${store.photo || 'store.png'}`)
      h2.title
        a(href=`/store/${store.slug}`) #{store.name}
    .store__details
      p= store.description
```

## View in browser
![stores with description](https://i.imgur.com/l6eAIHC.png)

## Houston we have a problem
What if someone adds a really long name and description?

![long names](https://i.imgur.com/KJQh706.png)

* We'll use JavaScript to take string and split it into a array and start at beginning `0` and stop at the 25th letter and then join it with space

`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      img(src=`/uploads/${store.photo || 'store.png'}`)
      h2.title
        a(href=`/store/${store.slug}`) #{store.name}
    .store__details
      p= store.description.split(' ').slice(0, 25).join(' ');
```

## Why do we get an error?
* Because we added a `;` at the end
* Remove it and you'll see it works and we successfully truncated our description

### Analyzing the code
`p= store.description.split(' ').slice(0, 25).join(' ');`

* We split all words by spaces and put them in an array
* We grab the first 25 words and put them in a string and separate them with spaces
* This is [what that looks like](https://i.imgur.com/cbMy7yv.png) using the console

## Give each store a `soon` button
`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      .store__actions
        button soon
      img(src=`/uploads/${store.photo || 'store.png'}`)
// more code
```

## Review
* We have our route
    - Which calls our `getStores()` controller
    - Our `getStores()` controller is responsible for two things
        1. Get the data
        2. Pass that data to our template
            * The template in turn uses a mixin and a template
            * To loop over and display all that data
            * Remove `console.log()` out it cloggs up your terminal window so use them when you need them

### Final
`storeController.js`

```
exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};

```
