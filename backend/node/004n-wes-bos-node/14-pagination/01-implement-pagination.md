# Implement Pagination
* Our stores could grow into thousands
* We can't just have a huge list of stores
* We need to break them up to a certain amount of stores that appear
* And we let the user choose when to see more stores in the list

## We need to modify `getStores`
To not find all stores but find a select number

* 1 to 4 stores
* 5 to 8 stores
* 9 to 12 stores
...

We need to create a new route

`/stores/page/2`
`/stores/page/3`
`/stores/page/4`

### Add our new route
`index.js`

```
// more code

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
// add this line below
router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get('/add',
  authController.isLoggedIn,
  storeController.addStore
);

// more code
```

### Building pagination
We will use the `getStores()` method

`storeController.js`

```
// more code

exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};

// more code
```

And we'll convert it to:

### Get the page we are on

`const page = req.params.page || 1;`

* We get it from URL or if we are on home page the page will be `1`

### Create our limit
How many results per page?

`const limit = 4;`

### Create our `skip`
* If we are showing 4 results per page
and were on page 1 and go to page 2 we want to skip 4 so page 2 would be 5,6,7,8
* If we are on home page, our `skip` would be `0`

The math calculation for that is `(page * limit) - limit`

```
page 1
1 * 4 = 4
4 - 4 = 0 (skip = 0)
page 2
2 * 4 = 8
8 - 4 = 4 (skip = 4)
```

## Put it all together

`storeController.js`

```
exports.getStores = async (req, res) => {
  // create variable for what page we are on
  const page = req.params.page || 1;
  // what is our limit per page?
  const limit = 4;
  // what is our skip
  const skip = (page * limit) - limit;

  // 1. Query the database for a list of all stores
  const stores = await Store
    .find()
    .skip(skip)
    .limit(limit);
  res.render('stores', { title: 'Stores', stores });
};
```

### Test in browser
* Try the following routes
    - [http://localhost:7777/stores/page/1](http://localhost:7777/stores/page/1)
    - [http://localhost:7777/stores/page/2](http://localhost:7777/stores/page/2)
    - [http://localhost:7777/stores/page/3](http://localhost:7777/stores/page/3)
* You will see 4 per page
* Our pagination is now working

## Add pagination UI

`views/mixins/_pagination.pug`

```
mixin pagination(page, pages, count)
  .pagination
    .pagination__prev
      if page > 1
        a(href=`/stores/page/${page - 1}`) Prev
      .pagination__text
        p Page #{page} of ${pages} - ${count} total results
      .pagination__next
        if page < pages
          a(href=`/stores/pages/${parseFloat(page) + 1}`) Next
```

* We'll take three arguments page, pages, count
    - We need to figure out `pages` and `count`
* We use `parseFloat(page)` because it will think `page` is a string and we need to convert it to a number

## How do we know how many items are in the Database?
* `MongoDB` gives us `count`
    - This is great because it won't return all the documents
    - It will just tell us how many there are
* We will no longer use `await` and instead use a Promise

`storeController.js`

```
// more code

exports.getStores = async (req, res) => {
  // create variable for what page we are on
  const page = req.params.page || 1;
  // what is our limit per page?
  const limit = 4;
  // what is our skip
  const skip = (page * limit) - limit;

  // 1. Query the database for a list of all stores
  const storesPromise = Store
    .find()
    .skip(skip)
    .limit(limit);

  const countPromise = Store.count();

  const [stores, count] = await Promise.all([storesPromise, countPromise]);
  res.render('stores', { title: 'Stores' + count, stores });
};

// more code
```

* We create two Promises
* Then we await them both to come back (the first one will take longer than the second one - so we wait for both)
* We temporarily output `count` to see if it is working

![count is working](https://i.imgur.com/JZJ4UPu.png)

* Since `count is working` we can remove it with:

` res.render('stores', { title: 'Stores' + count, stores });`

To

` res.render('stores', { title: 'Stores', stores });`

## How many pages will there be?
* If we have a count of `16`
* We divide by our limit `4`
* And that will give us `4` pages
* But if we have 17 count we need to round up to five pages so we use this formula

`const pages = Math.ceil(count / limit);`

## Pass the variables to our template
`res.render('stores', { title: 'Stores' + count, stores, page, pages, count });`

## Bring it all together
`storeController.js`

```
exports.getStores = async (req, res) => {
  // create variable for what page we are on
  const page = req.params.page || 1;
  // what is our limit per page?
  const limit = 4;
  // what is our skip
  const skip = (page * limit) - limit;

  // 1. Query the database for a list of all stores
  const storesPromise = Store
    .find()
    .skip(skip)
    .limit(limit);

  const countPromise = Store.count();

  const [stores, count] = await Promise.all([storesPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  res.render('stores', { title: 'Stores' + count, stores, page, pages, count });
};
```

## Include the mixin, use it and pass it what it expects
`stores.pug`

```
extends layout

include mixins/_storeCard
include mixins/_pagination

block content
  .inner
    h2= title
    .stores
      each store in stores
        +storeCard(store)
    +pagination(page, pages, count)
```

## View in browser and you'll see

![error in pagination](https://i.imgur.com/y8qjBv5.png)

We need to fix this with:

`_pagination.pug`

Change this line:

`p Page #{page} of #{pages} - #{count} total results`

* That fixes the dynamic pages but when you click you get a 404
* We need to update our route

`_pagination`

Change this line:

``a(href=`/stores/pages/${parseFloat(page) + 1}`) Next``

To this:

``a(href=`/stores/page/${parseFloat(page) + 1}`) Next``

### Special Case
`storeController.js`

```
if (!stores.length && skip) {
    req.flash('info', `Greetings! You asked for page ${page}. But that doesn't exist. So I put you on page ${page}`);
    res.redirect(`/stores/page/${pages}`);
    return;
  }
```

* If a person bookmarks a page and stores were deleted and that page no longer exists
* Or if someone manually changes URL to break our site, we flash them a message and redirect them to our furthest page
* We use return to leave because we do not need to render again

`storeController.js`

```
exports.getStores = async (req, res) => {
  // create variable for what page we are on
  const page = req.params.page || 1;
  // what is our limit per page?
  const limit = 4;
  // what is our skip
  const skip = (page * limit) - limit;

  // 1. Query the database for a list of all stores
  const storesPromise = Store
    .find()
    .skip(skip)
    .limit(limit);

  const countPromise = Store.count();

  const [stores, count] = await Promise.all([storesPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!stores.length && skip) {
    req.flash('info', `Greetings! You asked for page ${page}. But that doesn't exist. So I put you on page ${page}`);
    res.redirect(`/stores/page/${pages}`);
    return;
  }
  res.render('stores', { title: 'Stores', stores, page, pages, count });
};
```

### Test it out
* Enter this URL

`http://localhost:7777/stores/page/40`

* And this is what happends

![edge case working](https://i.imgur.com/xWfo4ag.png)

### Sort our stores
We will sort by last created

`storeController.js`

```
exports.getStores = async (req, res) => {
  // create variable for what page we are on
  const page = req.params.page || 1;
  // what is our limit per page?
  const limit = 4;
  // what is our skip
  const skip = (page * limit) - limit;

  // 1. Query the database for a list of all stores
  const storesPromise = Store
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Store.count();

  const [stores, count] = await Promise.all([storesPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!stores.length && skip) {
    req.flash('info', `Greetings! You asked for page ${page}. But that doesn't exist. So I put you on page ${page}`);
    res.redirect(`/stores/page/${pages}`);
    return;
  }
  res.render('stores', { title: 'Stores', stores, page, pages, count });
};
```
