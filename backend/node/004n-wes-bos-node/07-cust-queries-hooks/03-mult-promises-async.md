# Multiple Query Promises with Async-Await
## Task
* When you click on a tag you will only see the stores associated with that tag
* This will be `two` queries inside of one controller method

## How do we do two queries inside one controller method?
We could do something like this...

`storeController.js`

```js
exports.getStoresByTag = async (req, res) => {
  const tags = await Store.getTagsList();
  const stores = await Store.find(PUT STUFF HERE); // add this line
  const tagName = req.params.tag;
  res.render('tags', { tags, title: 'Tags', tagName });
};
```

### Houston We have a problem!
* Await does exactly that... It WAITS!
    - We first search for the tags: `const tags = await Store.getTagsList();`
    - Then the tags will come back
    - Then we go and find the latest 10 stores or all of the stores (_depending on how we want to do it_)
    - But the **problem** with **that is that is synchronous**
        + And we shouldn't do that!
    - If `await Store.getTagsList();` and `await Store.find(PUT STUFF HERE);` are not dependent on each other
    - They should be fired off at the exact same time because that will be the fastest way to accomplish our end goal
    - If you have **50 AJAX calls** and none of them need to wait on the other ones
        + Then you should make them **all at the same time**

### A better (more efficient way)
* `const storesPromise = Store.find({ tags: tagName });`
    - This will find all tags where the `tagName` matches
    - No need to use `includes` as it will do the same thing
    - This line will filter matching `tagNames` for us

`storeController.js`

```js
exports.getStoresByTag = async (req, res) => {
  const tagName = req.params.tag;
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagName });
  
  res.render('tags', { tags, title: 'Tags', tagName });
};
```

## Promise.all()
* Way to wait for multiple Promises to come back

```js
exports.getStoresByTag = async (req, res) => {
  const tagName = req.params.tag;
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagName });

  const result = Promise.all([tagsPromise, storesPromise]);

  res.render('tags', { tags, title: 'Tags', tagName });
};
```

* `result` will return our actual data
* But we need to `await` still but instead of awaiting each individual one we **group all our promises together** and `await them all`

```js
exports.getStoresByTag = async (req, res) => {
  const tagName = req.params.tag;
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagName });

  const result = await Promise.all([tagsPromise, storesPromise]);

  res.render('tags', { tags, title: 'Tags', tagName });
};
```

### Test our data
```js
exports.getStoresByTag = async (req, res) => {
  const tagName = req.params.tag;
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagName });

  const result = Promise.all([tagsPromise, storesPromise]);
  res.json(result);
  // res.render('tags', { tags, title: 'Tags', tagName });
};
```

## Make sure you are viewing the `Sears` tag page
* You need to run this in the browser on a particular tag page
* The URL will look similar to this:
    - `http://localhost:7777/tags/Sears`

### Result set
* The result will be all your tag counts grouped
* The second result will be a list all coffeeshops that have the `Wifi` tag
![result of both Promises](https://i.imgur.com/T6dOJUJ.png)

### How should we access this result set?
We could do this:

```js
var tags = result[0];
var stores = result[1];
```

Or...

### ES6 Destructuring
Better way to deal with this

`const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);`

* This will destructure it into their own variables immediately
* `res.json(tags)` - will just show you tags (try it out)
* `res.json(stores)` - will just show you stores (try it out)

`storeController.js`

```js
// more code
exports.getStoresByTag = async (req, res) => {
  const tagName = req.params.tag;
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagName });
  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
  res.render('tags', { tags, title: 'Tags', tagName, stores });
};
```

### View page in browser
* It works just as it did before but now we have access to `stores` data

#### Dump stores dats
`tags.pug`

```
extends layout

block content
  .inner
    h2 #{tagName || 'Tags'}
    ul.tags
      each tag in tags
        li.tag
          a.tag__link(href=`/tags/${tag._id}` class=(tag._id === tagName ? 'tag__link--active' : ''))
            span.tag__text= tag._id
            span.tag__count= tag.count
    pre=h.dump(stores)
```

* Refresh browser and you'll see your **stores** data
* Now we have our data where we want it
* Now we just have to template it out (_fix our view to show our data_)

`tags.pug`

```
extends layout

include mixins/_storeCard

block content
  .inner
    h2 #{tagName || 'Tags'}
    ul.tags
      each tag in tags
        li.tag
          a.tag__link(href=`/tags/${tag._id}` class=(tag._id === tagName ? 'tag__link--active' : ''))
            span.tag__text= tag._id
            span.tag__count= tag.count
    .stores
      each store in stores
        +storeCard(store)
```

* We reuse our `storeCard()` mixin
* We have to include that `include mixins/_storeCard` to use it

### View each Tag page
We now have filtered by tags successfully

### Houston we have a problem
* Go to `/tags` route and it is empty
* It should show all tags

#### Create a dynamic query
Our query will either be `tag` if it exists from the **params** (_URL_) or return everything (_if the store has a `tag` show it - which will show them all_)

`storeController.js`

```
exports.getStoresByTag = async (req, res) => {
  const tagName = req.params.tag;
  const tagQuery = tagName || { $exists: true };
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagQuery });
  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
  res.render('tags', { tags, title: 'Tags', tagName, stores });
};
```



