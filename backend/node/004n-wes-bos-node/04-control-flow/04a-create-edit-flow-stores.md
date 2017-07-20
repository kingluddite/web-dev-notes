# Create and edit flow stores (Part 1)
* We need to edit our stores
* When you click on the `edit` button, that will be our edit button that will enable us to edit that specific store

## Create a new branch
`$ git checkout -b create-edit-flow-stores`

### Create edit button
`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      .store__actions
        .store__action.store__action--edit
          a(href="/stores/123/edit")
            != h.icon('pencil')
// more code
```

* Update our Sass

`_store.scss`

```
// more code
.store__actions {
  position: relative;
  z-index: 2;

  // flex stuff
  display: flex;
  align-items: center;
  justify-content: space-around;

  border-bottom: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 0 rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.2);
  color: $white;
  margin-bottom: 50px;
  padding-bottom: 20px;
  padding-top: 10px;
}

.store__action {
  font-size: 10px;
  svg {
    width: 25px;
    fill: $white;
  }
  &--edit {
    a {
      border-bottom: 0;
    }
  }
}
// more code
```

## Adding icons
`helpers.js`

```js
// more code
// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);
```

* In `app.js` we places helpers on our locals
  - So to use we just do this `h.icon('pencil')`
  - But we will be pointing to `<svg>` HTML tag so we'll need to use Pug's `!= h.icon('pencil')` which lets us add HTML
  - And it puts `pencil` where `${name}` is

`./public/images/icons/pencil.svg`

### Use node to grab images from the internet and pull them into our project
`/get-icons.js`

```js
const fileSystem = require('fs');
// important to look at URL and use http or https and require it
const https = require('https');

// browse to this URL out and see what it looks like
const pencilIconUrl = 'https://raw.githubusercontent.com/wesbos/Learn-Node/master/stepped-solutions/45%20-%20Finished%20App/public/images/icons/pencil.svg';
const pencilIcon = fileSystem.createWriteStream(__dirname + '/public/images/icons/pencil.svg');
const request = https.get(pencilIconUrl, function(response) {
  response.pipe(pencilIcon);
});
```

### Run the file through node
`$ node get-icons.js`

* Practice adding more icons by repeating the above process for:
  - add.svg
  - cog.svg
  - review.svg
* We now can use this in our templates

![test store](https://i.imgur.com/HNcAnZK.png)

* It is hard to see but there is now a pencil svg icon there

## Dynamic Routes

`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      .store__actions
        .store__action.store__action--edit
          a(href="/stores/123/edit")
```

* We need to work on that `123` part of the URL
* Notice we changed `"` to a backtick **`**
    - We did this because we need to use ES6 template strings to inject our variable value inside this string
        + This is so much easier than using concatenation
* Update the URL to this:

``a(href=`/stores/${store._id}/edit`)``

## Refresh the browser
* Hover over the pencil icon and look at the URL that pops up

![URL with dynamic URL](https://i.imgur.com/8vmmky1.png)

* That URL now has the `_id` of each store when you hover over the respective store edit pencil icons
* When you click, you get a **404** because we didn't create that route yet
* `_id`
  - Mongo assigns a unique `_id` to every document created
  - Look inside `MongoDB` Compass and see:

![mongdo ids](https://i.imgur.com/VSbnROU.png)

## More on SVG
`helpers.js`

```
// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);
```

* We use the above code to include **svg**s inside our Application
* The reason is
    - If you use an `img` tag with a **SVG** there is no way to fill it our style it
    - It is just a solid `img` tag
* But if you include the **svg** code, you have full access to working with that **svg**
    - You can also use **svg** sprites [read more](https://css-tricks.com/svg-sprites-use-better-icon-fonts/)
    - The short way we are using without having any additional requests on page load

## Add Edit Store Route
### How do we do a wildcard route (aka 'a dynamic route')?
`router.get('/stores/123/edit')`

* We need to make `123` a dynamic route

`router.get('/stores/:id/edit')`

* Now when we visit this page we are going to have a variable available to us on our **request** object that tells us what the actual **id** of the URL is

`index.js`

```
// more code
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
// more code
```

### Best Practice
* Anytime you are dealing with the Database you will make it `async`
* If you make something `async` and don't use it, there is no harm in using it

## `editStore()` controller
We need to do 3 things:

1. Find the store given the ID - `req.params`
2. Confirm they are the owner of the store (_we'll deal with auth later_)
3. Render out the edit form so the user can update their store

## What are params?
Any time your URL has :id like in `/stores/:id/edit`

`storeController.js`

```
exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  res.json(req.params);
  // 2. Confirm they are the owner of the store
  // 3. Render out the edit form so the user can update their store
};
```

## View in browser
Make sure you are on the **404** page we get after clicking on the `edit` button on a store

You will see this in the browser:

```
{
"id": "59288a8d23562c8d5b912742"
}
```

* Your `id` will be different
* Change the `id` portion of the URL and hit enter and you will see that is the value returned from `req.params.id`

### Find the store
* We have the `id`
* Now we need to query our store and plugin in the `id`

`storeController.js`

```
exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  const _id = req.params.id;
  const store = await Store.findOne({ _id });
  res.json(store);
  // 2. Confirm they are the owner of the store
  // 3. Render out the edit form so the user can update their store
};
```

## View in browser

```
{
"_id": "592890c823562c8d5b912743",
"slug": "cool",
"name": "Cool",
"description": "Awesome",
"__v": 0,
"tags": [
"Vegetarian"
]
}
```

This means we have the data from our specific store we clicked on


## res.json(store) and potential errors
* `Can't set headers after they are sent` Error
* Many times we'll use `res.json(object)` to see what our object looks like in the browser
* But if you forget to take it out when you are testing it and you try to render something after it you will get an error like this

![header sent already error](https://i.imgur.com/BWehHxx.png)

## Git
* Save
  - `$ ga -A`
* Commit
  - `$ gc -m 'complete create-edit-flow-stores notes`
* Checkout master
  - `$ gcm`
* Merge branch into master
  - `$ git merge complete create-edit-flow-stores`
* Push master to github (_and all branches_)
  - `$ git push --all`
