# Quick Data Visualization Tip
* Open `MongoDB` Compass app
    - View schema for your Database and you'll see some have data fields populated and some have them undefined
    - Manually delete all current data
    - Add [three new stores with name, description and address](https://i.imgur.com/sOZZHon.png)
    - View in `MongoDB` and you'll see maps of the locations
        + If you don't quit, the app and start it again
        + You will see all your spots on that map
        + How can Mongo compass do this? Because we stored our data as `Points` and this app is smart enough to know it can show them on a map

## Houston We have a Problem
* If we update a coffee shop
* Change Starbucks from Hermosa Beach to El Segundo address and Save
* Open Mongo Compass and refresh your Documents tab and expand `location` under Starbucks and you will see it doesn't have a type of `Point` any more

![What's the Point :)](https://i.imgur.com/7lREvc7.png)

### So when you do `findAndUpdate()` with MongoDB the `defaults` do not kick in
We add this:

```
// set the location data to be a point
req.body.location.type = 'Point';
```

`storeController.js`

```
exports.updateStore = async (req, res) => {
  // set the location data to be a point
  req.body.location.type = 'Point';
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

* Now `save` the edited store again
* Open and refresh Mongo Compass
* That store now has a Point

![three location points](https://i.imgur.com/Stzbhcp.png)
