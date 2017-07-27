# Quick Data Visualization Tip

## Git
* Create new branch

`$ git checkout -b quick-data`

* Open `MongoDB` Compass app
    - View schema for your Database and you'll see some have data fields populated and some have them undefined
    - Manually delete all current data
    - Add [three new stores with name, description and address](https://i.imgur.com/sOZZHon.png)
      + Hatfield, PA
      + El Segundo, CA
      + Honolulu, HI
    - View in `MongoDB` and you'll see maps of the locations
        + If you don't see it (_quit MongoDB Compass and start it again_)
        + You will see all your spots on that map

## How can Mongo compass do this? 
* Because we stored our data as `Points`
* And MongoDB Compass is smart enough to show them on a map

## Houston We have a Problem
* If we update a coffee shop
    1. Change Starbucks from Hermosa Beach to El Segundo address
    2. Save
    3. Open Mongo Compass
    4. Refresh your Documents tab
    5. Expand `location` under Starbucks
    6. And you will see it doesn't have a type of `Point` any more

![What's the Point :)](https://i.imgur.com/7lREvc7.png)

### So when you do `findOneAndUpdate()` with MongoDB the `defaults` do not kick in
* We add this to `storeController.js`

```js
// set the location data to be a point
req.body.location.type = 'Point';
```

`storeController.js`

```js
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

## Git
* Save
  - `$ ga -A`
* Commit
  - `$ gc -m 'complete quick-data notes`
* Checkout master
  - `$ gcm`
* Merge branch into master
  - `$ git merge quick-data`
* Push master to github (_and all branches_)
  - `$ git push --all`
