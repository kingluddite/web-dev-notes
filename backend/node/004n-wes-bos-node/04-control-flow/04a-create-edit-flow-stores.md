# Create and edit flow stores (Part 1)
* We need to edit our stores
* When you click on the `soon` button, that will be our edit button that will enable us to edit that specific store

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
### BEM
`.store__action.store__action--edit` - this is **BEM**

BEM helps us write CSS so it is not nested

### _id
`_storeCared.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      .store__actions
        .store__action.store__action--edit
          a(href=`/stores/${store._id}/edit`)
// more code
```

* Mongo assigns a unique `_id` to every document created
* Look inside `MongoDB` Compass and see:

![mongdo ids](https://i.imgur.com/VSbnROU.png)

## Include SVG
`helpers.js`

```
// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);
```

* We use the above code to include **svg**s inside our Application
* The reason is if you use an `img` tag with a **SVG** there is no way to fill it our style it, it is just a solid `img` tag
* But if you include the **svg** code, you have full access to working with that **svg**
    - You can also use **svg** sprites [read more](https://css-tricks.com/svg-sprites-use-better-icon-fonts/)
    - The short way we are using without having any additional requests on page load

## !=
Tells pug we are writing some HTML 

`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      .store__actions
        .store__action.store__action--edit
          a(href=`/stores/${store._id}/edit`)
            != h.icon('pencil')
// more code
```

## What is this line doing?
`!= h.icon('pencil')`

* It using this helper

``exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);``

And it puts `pencil` where `${name}` is

`./public/images/icons/pencil.svg`

## View in browser
![pencil added](https://i.imgur.com/Dzkw2ve.png)

* Now we have our `pencil` edit button
* But we haven't wired it up to work yet
* Click on any store and you are taking to a URL that looks similar to:

`http://localhost:7777/stores/59288a8d23562c8d5b912742/edit`

* That is the `id` of our store
* All will 404 because we need to wire up our route

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
3. Render our the edit form so the user can update their store

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
Make sure you are on the 404 page we get after clicking on the `edit` button on a store

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

## res.json(store) and `Can't set headers after they are sent` Error
Many times we'll use `res.json(object)` to see what our object looks like in the browser but if you forget to take it when you are testing it and you try to render something after it you will get an error like this

![header sent already error](https://i.imgur.com/BWehHxx.png)

