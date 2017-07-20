# Save Lat/Long Store

## Create a new branch
`$ git checkout -b save-lat-long`

## Custom Data Types and our Schema
`Store.js`

* This is currently what our Schema looks like

```js
// more code
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});
// more code
```

* We need a `string`, a `string`, and an `array of strings` (**[String]**)
* **note** There are a ton of different types of data that can be stored inside a `MongoDB` Database

## Good Prep work
Before building your app you should figure out how your data should be stored

## Add `created` field
* Let's add a new field to our schema called `created`
* It will store a date
* It has a default value of `Date.now`
    - This will enter the **current Date** when the document is inserted into `MongoDB`
    - This is what the **current date** will look like
      + Notice that it is not in the most readible format
      + We'll use `moment.js` to make the date look more user friendly
![date.now()](https://i.imgur.com/k4nmg17.png)

`Store.js`

```js
// more code
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now,
  }
});
// more code
```

## Add `location` field
* `MongoDB` has great location info built in
* All you need to do is enter the `latitude` and `longitude` and `MongoDB` will be able to figure out if you are close to those coordinates

### No Math!
* <u>The cool part</u> is you don't have to figure out the crazy math to determine if you are close to those coordinates, MongoDB does it for you

`Store.js`

```
// more code
const storeSchema = new mongoose.Schema({
// more code
created: {
    type: Date,
    default: Date.now,
},
location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates',
    }],
    address: {
      type: String,
      required: 'You must supply an address',
    },
  },
});
// more code
```

* We have a **location** property
    - That has a type of string (that defaults to **'Point'**)
* `coordinates` is an array of numbers
* `address` is string
    - **123 Elm St**

## Let's build an interface
* This will incorporate adding the `address` and s`coordinates`

### How to comment in `Pug`
* You should feel free to add comments inside your Pug templates
* Here is the Pug comment syntax

`//- `

`_storeForm.pug`

```
mixin storeForm(store = {})
  form(action=`/add/${store._id || ''}` method="POST" class="card")
    label(for="name") Name
    input(type="text" name="name" value=(store.name))
    label(for="description") Description
    textarea(name="description")= store.description

    //- start code modification
    //- address, lng and lat
    label(for="address") Address
    input(type="type" id="address" name="location[address]")
    //- end code modification

    - const choices = ['Closed', 'Closing', 'Kmart', 'Sears', 'Radioshack', 'Mall']
    - const tags = store.tags || []
    ul.tags
      each choice in choices
        .tag.tag__choice
          input(type="checkbox" id=choice value=choice name="tags" checked=(tags.includes(choice)))
          label(for=choice) #{choice}
    input(type="submit" value="Save" class="button")
```

### What the heck is `name="location[address]"`?
* This is a very cool feature that Express offers us

`app.js`

```
app.use(bodyParser.urlencoded({ extended: true }));
```

* `extended: true`
    - Allows us to use inputs that `kind of` have nested data inside them
* In our object schema it will come as `location.address`
* So `name="location[address]"`
    - Enables us to send nested data without having to do any extra heavy lifting either:
        + On `the client side` before we send it
        + **Or** on `the server side` as we receive that data

![form with address](https://i.imgur.com/GSHvleC.png)

1. We fill out our form with an address
2. Submit form
3. We get `successful` flash on 404 (_as we have no route yet_)

### Now let's edit an exiting store
1. View the stores page (_`/stores` route_)
2. Click edit button (`pencil icon`) on a store

#### Why is `address` not pre-filled in?
* Because we passed the `store` object to the `_storeForm.pug` template and that object is holding our store info from the database, we just have to use that as a **value** attribute `value` on our `address` input field
  - But `value=store.address` won't work
  - We need to use `value=store.location.address` instead

`_storeForm.pug`

```
// more code
label(for="address") Address
    input(type="text" id="address" name="location[address]" value=store.location.address)
// more code
```

Refresh the page and you should see the address

![address showing](https://i.imgur.com/DwXGFRz.png)

### Houston we have a problem!
* Click on `/add` store route and we'll get an error

![error on location](https://i.imgur.com/X2SwLvz.png)

* If `location` is not defined we will get an error
* If you try to read a property of something that is not an object or doesn't exist
    - It will error **"can not read property of undefined"** (_because location is undefined_)
    - You will see this problem when you try to add a new store
* We get this error because we don't have an address yet

#### The Solution is Simple
`_storeForm.pug`

```
// more code
input(type="text" id="address" name="location[address]" value=(store.location && store.location.address))
// more code
```

* When you use `&&` both left and right of the expression must be true is one is false, the expression is `false`
  - We check for the object first `store.location` because if it doesn't exist, it will be `false` and then it will never get to the second part `store.location.address`
* Refresh the `/add` page and the error will be gone
* View the edit of your store with address and you will see the address
* All is right and just in the world again!

## Add Lng and Lat
* **Important** Make sure `lng` comes first and `lat` is second in this array
* This is just how `MongoDB` expects the data to be stored

`1st lng, 2nd lat`

`_storeForm.pug`

```
// more code

//- address, lng and lat
label(for="address") Address
input(type="type" id="address" name="location[address]" value=(store.location && store.location.address))
label(for="lng") Address Lng
input(type="text" id="lng" name="location[coordinates][0]")
label(for="lat") Address Lat
input(type="text" id="lat" name="location[coordinates][1]")

// more code
```

### Manually add Lng and Lat
* This definitely is not a good solution but let's see if we can add long and lat first, then we'll improve on this solution

1. Save
2. Open the edit page of a store
3. Add Lng `127` and Lat `-43`
4. Save
5. We get success flash

#### We don't see the `lng` and `lat` after we refresh page
* Add them with:

`_storeForm.pug`


```
// more code
label(for="lng") Address Lng
input(type="text" id="lng" name="location[coordinates][0]" value=store.location.coordinates[0]) 
label(for="lat") Address Lat 
input(type="text" id="lat" name="location[coordinates][1]" value=store.location.coordinates[1])
// more code
```

* Refresh browser and you'll see the Lng/Lat coordinates
* But we need to use our same solution as before to prevent errors when we add stores

```
// more code
//- address, lng and lat
label(for="address") Address
input(type="type" id="address" name="location[address]" value=(store.location && store.location.address))
label(for="lng") Address Lng
input(type="text" id="lng" name="location[coordinates][0]" value=(store.location && store.location.coordinates[0]))
label(for="lat") Address Lat
input(type="text" id="lat" name="location[coordinates][1]" value=(store.location && store.location.coordinates[1]))
// more code
```

* Don't forget to check for `location` first!
`_storeForm.pug`

### Dump
We can always use `dump` to see if our data took with:

```
// more code
input(type="submit" value="Save" class="button")
pre= h.dump(store)
```

And you'll see we were successful (_dump is below the form_)

![dump with coordinates](https://i.imgur.com/SZ85Oqp.png)

## Add Client Side Validation
Make `Lng` and `Lat` required

`_storeForm.pug`

```
// more code
input(type="text" id="lng" name="location[coordinates][0]" value=(store.location && store.location.coordinates[0]) required) 
label(for="lat") Address Lat 
input(type="text" id="lat" name="location[coordinates][1]" value=(store.location && store.location.coordinates[1]) required)
// more code
```

### Delete an address
* Now delete an address from your store edit page and try to save
* You will get a flash error that `You must supply an address`

![supply address error](https://i.imgur.com/xAeIJNg.png)

#### Why is that happening?
In our schema our store requires an address

`Store.js`

![address schema](https://i.imgur.com/6ydlqRd.png)

* We need a string with an address

#### What is happening here?
* In `createStore` controller in `storeController.js`
    - We don't handle that error anywhere

```
exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};
```

* But because we are using `async-await`
* And because we are using that `errorHandler` helper
    - The following line will fail (_because our validation won't pass_)

`const store = await (new Store(req.body)).save();`

And what happens is our error handlers `errorHandlers.js` will call **next**

![error handlers call next](https://i.imgur.com/aev8xne.png)

**next** will take us into our `app.js`

And it will go to our routes

`app.use('/', routes);`

* And if it does not work, it will say, "Ok, next"
* And then it will go down the chain of events

![chain of events middleware](https://i.imgur.com/8fy9aRt.png)

It gets to our **flashValidationErrors**

`app.use(errorHandlers.flashValidationErrors);`

`errorHandlers.js`

```
// more code
exports.flashValidationErrors = (err, req, res, next) => {
  // if there are no errors to show for flashes, skip it
  if (!err.errors) return next(err);
  // validation errors look like
  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach(key => req.flash('error', err.errors[key].message));
  res.redirect('back');
};
// more code
```

* So if we don't have any errors skip to next middleware
* But if there is an error, it will check for those errors and flash them
* And our **model** will pass an error message

`Store.js`

![error schema for address](https://i.imgur.com/48xCsH7.png)

* And since we have a good error message we don't need to show a stack trace (_because it didn't break_), it's just a validation error
* And our errorHandler, [for each of the possible errors](https://i.imgur.com/Gsom6A8.png), [it will flash that error](https://i.imgur.com/M7L421l.png) and show it on the page
* And then it calls `res.redirect('back')` to [redirect back to the page](https://i.imgur.com/7DgztL9.png) we were on
* This is really nice
    - You just have it once in your Application
    - And you don't have to worry about it because the errors will filter through the different levels

## Remove 
`_storeForm.pug`

![remove this dump](https://i.imgur.com/mdOcSKJ.png)

## Next
* Hook our address to google Maps
* When we plugin the address our long and lat will populate with real values

## Git
* Save
  - `$ ga -A`
* Commit
  - `$ gc -m 'complete save-lat-long notes`
* Checkout master
  - `$ gcm`
* Merge branch into master
  - `$ git merge save-lat-long notes`
* Push master to github (_and all branches_)
  - `$ git push --all`
