# Presave Hooks Unique Slugs
## Houston we have a problem
* Create new entery called `coffee land`
* fill in the rest of data for it
* Create another entry called `coffee land`
* fill in that data
* We have duplicate slugs so one is unreachable

## We are not currently checking for duplicate slugs
`Store.js`

```
storeSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
    // could also just type return next();
  }
  this.slug = slug(this.name);
  next();
  // TODO make slugs unique
});
```

* We will modify this function to make it an `async` function because before we store our slug as `this.name` we want to first check if it currently exists and if it does, alert the user with a flash error
* But WAIT
    - Instead of flat out reject duplicates we'll just add an incremental number to duplicate slug names `coffee-land, coffee-land-1, coffee-land-2`
    - We will make a **regex** that will search for stores that have a `slug` of `coffee-land, coffee-land-1, coffee-land-2`
        + search for strings with `coffee-land`

## RegExp
* **regex** is a way to pattern match
* `i` case insensitive
* search for slugs that start with

```
`new RegExp(`^($this.slug}), 'i');
```

* And where it ends with

```
((-[0-9]*))$
```

* any number a dash `-` and 0-9
    `((-[0-9]*$))$`
        + Can have multiple numbers `*` (i.e. `100`)
        + `-[0-9]*$` - The number will end with these values
        + But since not all slugs will have numbers we need to make it optional so we add the `?` character `-[0-9]*$)?`
* `$` ends

```
const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
```

* Pass our `slugRegEx` into a query
* How do you access the models inside of the models function?
    - We want to use `Store.find()` but we don't have `Store` yet
    - await `this.constructor.find()`
    - `this.constructor()` will be equal to `Store` by the time it runs

```
const storesWithSlug = await this.constructor.find({ slug: slugRegEx })
```

## Fuzzy Search makes everything so clear
* When you are looking for a `fuzzy match` you can use a RegExp instead of a hard coded value
* If there is a match `if (storesWithSlug.length) {}`
    - Set it to the slug name + a dynamic number

```
this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
```

## Final StoreSchema code
`Store.js`

```
storeSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
    // could also just type return next();
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of coffee-land, coffee-land-1, coffee-land-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');

  const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
});
```

### Test it out
* I already have a javaman so I'll enter another one with some new data
* I save and it takes me to this URL:

`http://localhost:7777/store/javaman-2`

Our new code is working to make sure all our slugs are unique!
