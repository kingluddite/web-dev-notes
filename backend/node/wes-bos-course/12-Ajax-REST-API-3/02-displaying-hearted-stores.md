# Displaying hearted stores
* remove user dump in `layout.pug`
* `pre= h.dump(user)`

## If you click on heart icon in nav you get 404
* We need to create a route for this page
* We need to query the stores that have hearts

### Add route
`index.js`

```
// more code

router.get('/map', storeController.mapPage);
router.get('/hearts', catchErrors(storeController.getHearts));

// more code
```

### Add method in our storeController
`storeController.js`

```
// more code

exports.getHearts = async (req, res) => {

};
```

## Two ways we could do this
1. Query the current user and call the `.populate()` on the hearts and they will get the user and populate all of the hearts
2. We can query a bunch of stores and find those stores who's id are in our current heart array

We did the first way already so we'll try the second way

`storeController.js`

```
// more code

exports.getHearts = async (req, res) => {
  const stores = await Store.find({
    _id: { $in: req.user.hearts }
  });
  res.json(stores);
};
```

* This will find any stores where `_id` is in an array (req.user.hearts)
* This is useful because it looks in the array and finds all of the stores for us

### View in browser
You will see JSON of all stores that logged in user hearted

### Render to page in our template view
`storeController.js`

```
exports.getHearts = async (req, res) => {
  const stores = await Store.find({
    _id: { $in: req.user.hearts }
  });
  res.render('stores', { title: 'Hearted Stores', stores });
};
```

### View in browser
You'll see all your liked stores

### Houston we have a problem!
In incognito we get an error

![hearts error](https://i.imgur.com/ZJ8FVGL.png)

* We are trying to show hearts of user but in incognito, user doesn't exist
* Users can click on heart because they are not logged in and won't see the heart in the navbar
* But if someone sends them a link to their favorites we need them to know they have to be logged in to see favorites

`index.js`

```
// more code

router.get('/map', storeController.mapPage);
router.get('/hearts', authController.isLoggedIn, catchErrors(storeController.getHearts));

// more code
```

Now try to see `/hearts` route in incognito and they will get flash error telling them they need to be logged in

![logged in error](https://i.imgur.com/EpaumZR.png)
