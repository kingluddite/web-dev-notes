# Pushing User Data to our API - Part 1
* When you heart something it will add it to your list of **hearts**
* Every time you heart a store, the `_id` of the store will be put into your User account
* We will have a property on the User called `hearts`

## Grab our heart icon
* Modify the following code:

`get-icons.js`

```
const fileSystem = require('fs');
// important to look at URL and use http or https and require it
const https = require('https');

// browse to this URL out and see what it looks like
const heartIconUrl =
  'https://raw.githubusercontent.com/wesbos/Learn-Node/master/stepped-solutions/45%20-%20Finished%20App/public/images/icons/heart.svg';
const heartIcon = fileSystem.createWriteStream(
  __dirname + '/public/images/icons/heart.svg'
);
const request = https.get(heartIconUrl, function(response) {
  response.pipe(heartIcon);
});
```

* Run the node code above with `$ node get-icons.js`

## Test it out
* We get an ugly white box instead of a heart

![ugly white heart](https://i.imgur.com/efiDZHS.png)

### Add some css
`_heart.scss`

```
.heart {
  &__button {
    background: none;
    border: 0;
    outline: 0;
    position: relative;
    &:after {
      content: '♥️';
      font-size: 20px;
      position: absolute;
      opacity: 0;
      top: 0;
    }
    svg {
      width: 25px;
      fill: white;
    }
    &--hearted {
      svg {
        fill: red;
      }
    }
    &--float {
      &:after {
        animation: fly 2.5s 1 ease-out;
      }
    }
  }
}

@keyframes fly {
  0% {
    transform: translateY(0);
    left: 0;
    opacity: 1;
  }
  20% { left: 20px; }
  40% { left: -20px; }
  60% { left: 20px; }
  80% { left: -20px; }
  100% {
    transform: translateY(-400px);
    opacity: 0;
    left: 20px;
  }
}
```

* Import the css

`style.scss`

```
// more code
@import 'partials/search';
@import 'partials/heart'; // add this line
```

## What will the hearts look like?
`User.js`

```js
// more code

resetPasswordToken: String,
  resetPasswordExpires: Date,
  hearts: [
    { type: mongoose.Schema.ObjectId, ref: 'Store' }
  ]
});

// more code
```

* It will be a relationship because the user will heart many stores
* How do you do a relationship when their are multiple ObjectIDs?
* Inside `User.js` we'll add hearts and make it an array
    - Inside the array will have a key of `type`
    - And the value will be `mongoose.Schema.Objectid`
    - And we'll also have a `ref` key with a value of `Store`

## Create the UI for hearts
* We'll be adding this chunk of code to our existing template

```
if user
  .store__action.store__action--heart
    form.heart(method="POST" action=`/api/v1/stores/${store._id}/heart`)
      button.heart__button(type="submit" name="heart")
        != h.icon('heart')
```

`_storeCard.pug`

```
mixin storeCard(store = {})
  .store
    .store__hero
      .store__actions
        if user
          .store__action.store__action--heart
            form.heart(method="POST" action=`/api/v1/stores/${store._id}/heart`)
              button.heart__button(type="submit" name="heart")
                != h.icon('heart')
        if user && store.author.equals(user._id)
          .store__action.store__action--edit
            a(href=`/stores/${store._id}/edit`)
              != h.icon('pencil')
      img(src=`/uploads/${store.photo || 'store.png'}`)
      h2.title
        a(href=`/store/${store.slug}`) #{store.name}
    .store__details
      p= store.description.split(' ').slice(0, 25).join(' ')
```

* `if user` - If they are logged in
    - They we'll add classes to show heart icon
* We use a `form` tag
    - Whenever you are submitting data to the backend it is easiest to have a form tag
    - That way if JavaScript does fail it will still work as a regular form submit
* And now the heart is properly styled

![the heart now works!](https://i.imgur.com/hy7qHHd.png)

### We use `button` instead of `input` - Why?
* Because you can't put HTML inside of an `input` tag

### Test it out
* Click on heart and the URL will look like this:

`http://localhost:7777/api/v1/stores/58c05c208060197ca0b52d58/heart`

* But we have a 404

### Add our post route pointing to our API
`index.js`

```js
// more code

router.get('/api/v1/search', catchErrors(storeController.searchStores));
router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));
router.post('/api/v1/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;
```

### Add our heartStore method to our storeController
`storeController.js`

```js
// more code

exports.heartStore = async (req, res) => {
  // get array of hearts
  const hearts = req.user.hearts.map((obj) => obj.toString());
  console.log(hearts);
  res.json(hearts);
};
```

* We check for list of the person's stores
* check if they have the store and if they have hearted it
* If they did, we remove the heart
* If they don't, we add the heart
* It will just be a toggle and do the opposite of what they currently have
* We think we have an array of `_id`s but we really have an array of objects
* We can turn the `objectId` into a string with `.toString()`

### Test in browser
1. Logged in
2. Click on Stores
3. Click on `heart` icon
4. You get an empty array `[ ]`

#### Why is it empty?
* We are new and haven't added any hearts yet

### Adding a store `_id` to our hearts array
`storeController.js`

```js
// more code
const Store = mongoose.model('Store');
const User = mongoose.model('User'); // add this because we are using the User Collection

// more code
exports.heartStore = async (req, res) => {
  // get array of hearts
  const hearts = req.user.hearts.map((obj) => obj.toString());
  const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User
    .findByIdAndUpdate(req.user._id,
      { [operator]: { hearts: req.params.id } },
      { new: true }
    );
  res.json(user);
};
```

* We need to search our array of hearts to determine if the current `_id` in the URL is a match to any of the `_id` listed inside of our `hearts` array
    - If it is, we'll remove it
    - It it is not, then we'll add it
    - `$pull` - `MongoDB` for removing item from array in document
    - `$addToSet` - `MongoDB` for adding
        + Why not `$push`?
            * Because we want it to be **unique**
            * `$push` just will add `_id` multiple times
            * `$addToSet` will only add it if it doesn't already exist

## ES6 magic
Normally we would do this:

```js
.findByIdAndUpdate(req.user._id,
  { $pull: { hearts: req.params.id } },
  { new: true }
);
// and
.findByIdAndUpdate(req.user._id,
  { $addToSet: { hearts: req.params.id } },
  { new: true }
);
```

* But because we put it in a variable `operator`
* We can use the **computed property names** in ES6
* Which is **square brackets** `[]`

#### Computed Property Names
* Another small but useful change is the ability to have computer property names when defining object literals
* Using the square bracket notation, we can use variables or any valid JavaScript statement to compute a property name
* There are two ways of specifying a key when accessing a property
    1. You can use a fixed alphanumeric name, which allows us to use the dot notation (`myBoat.make`)
    2. You can also use an expression
        * But then you have to use the square bracket notation
        * The expression could contain variables (`myBoat['make' + make]`)
        * Or be a string literal that contains non-alphanumeric characters that would cause a Syntax Error if used as an identifier (`myBoat['make/model']`)

##### ES6 Way

```js
function getBoat(make, model, value) {
    return {
        // computed values now work with
        // object literals
        ['make' + make]: true
    };
}
```

##### ES3/ES5 Way

```js
function getBoat(make, model, value) {
    var car = {};

    // in ES3/ES5 the only way to use a
    // computed property key was in a
    // separate assignment statement
    car['make' + make] = true;

    return car;
}
```

* We had to use 3 statements in ES3/ES5 code
* In ES6 we use 1 statement because we can use computed property keys in object literal definitions
* The square brackets indicate to the JavaScript engine that the property key is computed so the expression is evaluated to a string
* Anything that you would’ve put in the ES5 square bracket notation will work in the new ES6 computed property key syntax
* **note** -  The property value shorthand cannot be combined with the computed property key syntax
    - If you tried the above you would get a **Syntax Error**

### Test it out
1. Log in
2. Click on stores
3. Click heart of a store
4. You should see something like this:

![heart added to store](https://i.imgur.com/77xrx92.png)

#### Review
1. We posted to this URL with this a specific `_id`

`http://localhost:7777/api/v1/stores/58c05f928060197ca0b52d59/heart`

2. That goes to our route and calls the `heartStore()` method inside our `storeController.js`

3. Because Passport attaches the User to every `req` (request) we can gain access to the `hearts` array and use the `.map()` method to go through every ObjectId in the hearts array (if there are any) and convert them all to Strings
4. We then check to see if the `_id` in the URL (We access that with `req.params.id`) is inside the **hearts** array
5. If it is, we use `$pull`
6. If it is not, we use `$addToSet`
7. We then construct our `MongoDB` query using `.findByIdAndUpdate()` passing it the current logged in user's `_id` and using our `[operator]`, which will hold `$pull` if `_id` existed or `$addToSet` if `_id` didn't exist and they will either pull out the `_id` from the **hearts** array or push the `_id` into the **hearts** array
8. `{ new: true }` - is an option to return the new `_id`
9. We render JSON to the page with `res.json(user)`
    * By default it returns `user` before it was updated not after

* If you heart another store, you will see our **hearts** array is an array of two `ObjectIds`
* If you heart a store you already hearted, it removes your heart

## Heart count
* Add this to `layout.pug`

```
if user
  li.nav__item: a.nav__link(href="/hearts", class=(currentPath.startsWith('/hearts') ? 'nav__link--active' : ''))
    != h.icon('heart')
    span.heart-count #{user.hearts && user.hearts.length}
  li.nav__item: a.nav__link(href="/logout", class=(currentPath.startsWith('/logout') ? 'nav__link--active' : ''))
```

* If you refresh your page after adding two hearts you should see this:

![heart count](https://i.imgur.com/2PozoBs.png)

### How is heart count working?
`layout.pug`

This is the line that gives us the count:

`span.heart-count #{user.hearts && user.hearts.length}`

* We first check if there is a **heart**'s property `user.hearts` (we just added it and before it didn't exist so we don't want to point to a property if it doesn't exist yet or we'll get an error)
* If there is a hearts property we get the length of it
* Add another `heart` and refresh and you should see it updated to `3`
