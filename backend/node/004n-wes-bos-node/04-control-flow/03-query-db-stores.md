# Query Database Stores
* We want to:
    - Display our stores
    - Display our stores on the `home page` and on the `stores page`
* We need a controller method that runs on BOTH of those **routes**

`storeController.js`

```
// more code
exports.getStores = (req, res) => {
  res.render('stores', { title: 'Stores' });
};
```

## Update routes
We will update two routes to use this same `getStores()` controller

`index.js`

```
// more code
// show all stores on home page
router.get('/', storeController.getStores);
// show all stores on stores page
router.get('/stores', storeController.getStores);
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;
```

## View in browser
* If you view `/` or `/stores` you will see `Failed to lookup view "stores" in views directory`
* This error is because we pointed our routes to a template that we have yet to create

### Create `stores.pug`
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

And update the code to look like this:

```
extends layout

block content
  .inner
    h2= title
```

## View in browser
Now `/` and `/stores` pages work

* Before we get the stores we need to query the Database for a list of all stores

## Let's use async
* We need to use `async` on the `getStores()` controller

1. Place the word `async` before your controller
2. Inside your **routes** wrap your controller inside `catchErrors()`
3. Query for all the stores

#### Place the word `async` before your controller

`storeController.js`

```js
// more code
exports.getStores = async (req, res) => {
  res.render('stores', { title: 'Stores' });
};
```

2. Inside your **routes** wrap your controller inside `catchErrors()`

`index.js`

```js
// more code
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;
```

### Query for all the stores
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

![all stores inside Terminal](https://i.imgur.com/12cV46b.png)

### Loop over stores
1. Take our `stores` variable
2. And give it to our template so we can loop over it

`storeController.js`

```
exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};
```

## View in browser
We see nothing

### Dump the data
* We dump data to see what data we have available inside our template

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
* View your live `MongoDB` Database and see our data is there (_MongoDB Compass_)

## How do we get our data on the actual page?
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

### The Power of the loop
* We loop over each store in stores and out a H2 with the `store.name`
* Refresh the browser and you'll see the large store names

![large store names](https://i.imgur.com/Eqk8WHe.png)

## Store Card
Push our store names to a separate mixin

* Create a new mixin called `storeCard`

## ES6 Template strings vs Interpolation
`views/mixins/_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      img(src=`/uploads/${store.photo || 'store-closing.jpg'}`)
      h2.title
        a(href=`/store/${store.slug}`) #{store.name}
```

* We want to show a photo if the store has one and if not, display a default image
    - `public/uploads/store-closing.png` (default image)
    - (_dimensions 1496x1000_)

## TIP - Attribute Values you should use ES6 Template Strings
* If you want to generate an attribute like:
* You have to use an ES6 template string

``a(href=`/store/${store.slug}`)``

## TIP - Variable inside text content of a `node` use Pug Interpolation
`#{store.name}`

## Import our mixin
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

### No quotes
* Notice when we include our mixin we are not using quotes
* We call our **mixin** and pass it our `store`

### Update our store Sass
`_store.scss`

```
.stores {
  // flex stuff
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
}

.store {
  background: $white;
  box-shadow: $shad;
  margin: 10px 0;
  width: 30%;

  @media all and (max-width: 850px) {
    width: 48%;
  }
  @media all and (max-width: 550px) {
    width: 100%;
  }
}

.store__hero {
  // positioning
  position: relative;

  padding: 0 10px 0 10px;

  &:before {
    // positioning
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
    content: '';
    display: block;
    height: 100%;
    opacity: 0.6;
    width: 100%;
  }

  img {
    // positioning
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
```

## Add a new variable Sass
`_variables.scss`

```
// more code
$danger-yellow: #FF991C;
$yellow-alpha: rgba($danger-yellow,0.8);
// more code
```

## Update typography Sass
`_typography.scss`

```
// more code

// Set base font size that we use for all our REM measurements
html {
  font-size:10px;
}

// more code
a {
  color:$black;
}

// more code

.title {
  // positioning
  position: relative;
  z-index: 2;

  font-size: 40px;
  line-height:1.1;
  margin:0;
  transform: skew(0, -3deg);
  word-wrap: break-word;

  // inline link inside
  a {
    background-image: linear-gradient(to right, $yellow-alpha 100%, $yellow-alpha 50%);
    border-bottom: 0;
  }
}
```

## View in browser
![all our stores](https://i.imgur.com/W4GZ7lF.png)

### Sass Mixins, Query Strings Mobile First
`_store.scss`

```
// more code
.store {
  background: $white;
  box-shadow: $shad;
  margin: 10px 0;
  width: 100%;

  @include atSmall {
    width: 48%;
  }

  @include atMedium {
    width: 48%;
  }

  @include atLarge {
    width: 30%;
  }
// more code
```

* We first define 100% for mobile so the stores take up the full width
* Then we work our way up from lesser width to great device widths

### And add our mixins
`/public/sass/partials/_mixins.scss`

```
// query strings
@mixin atSmall {
  @media (min-width: 550px) {
    @content;
  }
}

@mixin atMedium {
  @media (min-width: 850px) {
    @content;
  }
}

@mixin atLarge {
  @media (min-width: 1000px) {
    @content;
  }
}
```

* [Read More about Sass Mixins](https://scotch.io/tutorials/how-to-use-sass-mixins)

## How do we add a store description?
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

### Add our details styles
`_store.scss`

```
// more code
&__details {
    padding: 2rem;
    p {
      color: $black;
      line-height: 1.2;
      margin-bottom: 0;
    }

  }
  @include atSmall {
    width: 48%;
  }
// more code
```

### Comment out our image
* Let's try the boxes without a background image so we can see our description text

`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      //- img(src=`/uploads/${store.photo || 'store-closing.jpg'}`)
// more code
```

#### Comments in Pug
* Notice in our above code how we add a comment inside our Pug template

### View in browser
![stores with description](https://i.imgur.com/RJNKy2I.png)

### Fix our Pug Indentation bug
* Our `.store__details` was indented too much

`_store.scss`

```
mixin storeCard(store = {})
  .store
    .store__hero
      img(src=`/uploads/${store.photo || 'store-closing.jpg'}`)
      h2.title
        a(href=`/store/${store.slug}`) #{store.name}
    .store__details
        p= store.description
```

* We also comment back in our background image
* Experiment with before/after `.store__details` indentation to see how the template generated HTML changes
* Here is what we now see:

![bg images working better](https://i.imgur.com/c3Drmq5.png)

## Houston we have a problem
What if someone adds a really long description?

![long description](https://i.imgur.com/VuCP3gu.png)

* We'll use JavaScript to fix this

`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      img(src=`/uploads/${store.photo || 'store-closing.jpg'}`)
      h2.title
        a(href=`/store/${store.slug}`) #{store.name}
    .store__details
        p= store.description.split(' ').slice(0, 25).join(' ');
```

## Why do we get an error?
* Because we added a `;` at the end
* Remove it and you'll see it works and we successfully truncated our description

### Analyzing the code
`p= store.description.split(' ').slice(0, 25).join(' ')`

* We split all words by spaces and put them in an array
* We grab the first 25 words and put them in a string and separate them with spaces
* This is what that looks like using the console

![what that looks like](https://i.imgur.com/cbMy7yv.png)

### Houston we have a problem!
* If you click on a store you get a `404`
* Why?
    - We didn't create those routes yet
    - We will

## Review
* We have our route
    - Which calls our `getStores()` controller
    - Our `getStores()` controller is responsible for two things
        1. Get the data
        2. Pass that data to our template
            * The template in turn uses a mixin and a template
            * To loop over and display all that data

## Git
* Save
  - `$ ga -A`
* Commit
  - `$ gc -m 'query-db-stores notes`
* Checkout master
  - `$ gcm`
* Merge branch into master
  - `$ git merge query-db-stores`
* Push master to github (_and all branches_)
  - `$ git push --all`
