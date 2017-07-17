# Save Lat/Long Store

## Create a new branch
`$ git checkout -b save-lat-long`

## Custom Data Types and our Schema
`Store.js`

```
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

## created
* Let's add a new field to our schema called `created`
* It will store a date
* It has a default value of Date.now
    - This will enter the current Date when the document is inserted into `MongoDB`

![date.now()](https://i.imgur.com/k4nmg17.png)

`Store.js`

```
// more code
const storeSchema = new mongoose.Schema({
// more code
  created: {
    type: Date,
    default: Date.now,
  },
});
// more code
```

## location
* `MongoDB` has great location info build in
* You enter the lat and lon and it will be able to figure out if you are close to those coordinates
    - The cool part is you don't have to figure out the crazy math to determine if you are close to those coordinates, MongoDB does it for you

`Store.js`

```
// more code
const storeSchema = new mongoose.Schema({
// more code
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
* Has a `coordinates`
    - Which is an array of numbers
* Has an `address` which will be a string

## Now we want to build an interface
For adding our `address` and our `coordinates`

### How to comment in `Pug`
`//- `

`Store.js`

```
// more code
//- address, lng and lat
    label(for="address") Address
    input(type="text" id="addres" name="location[address]")
// more code
```

### What the heck is `name="location[address]"`?
`app.js`

```
app.use(bodyParser.urlencoded({ extended: true }));
```

* `extended: true` - allows us to use inputs that kind of have nested data inside them
* In our object schema it will come as `location.address`
* So `name="location[address]"` will allow us to send nested data without having to do any extra heavy lifting either on `the client side` before we send it or on `the server side` as we receive that data
    - This is a very cool feature of **Express**

![form with address](https://i.imgur.com/xj9Jjxt.png)

1. We fill out our form
2. Submit form
3. We get `successful` flash on 404 (no route yet)
4. We try to edit that store on `/stores`
5. But `address` is not filled in

How can we fill it in?

`_storeForm.pug`

```
// more code
label(for="address") Address
    input(type="text" id="addres" name="location[address]" value=store.location.address)
// more code
```

Refresh the page and you should see the address

![address showing](https://i.imgur.com/3FJpdFP.png)

### Houston we have a problem
* If `location` is not defined we will get an error
* If you try to read a property of something that is not an object or doesn't exist
    - It will error "can not read property of undefined" (because location is undefined)
    - You will see this problem when you try to add a new store
    - Try it now

![address error](https://i.imgur.com/vYbSlJo.png)

* We get this error because we don't have an address yet

#### Solution
`_storeForm.pug`

```
// more code
input(type="text" id="addres" name="location[address]" value=(store.location && store.location.address))
// more code
```

* This will first check to make sure `store.location` exists
    - And if it does it will go and return the second part
    - If `store.location` does not exist it will just return **false** or it won't return anything so the value will be empty
    - Refresh the `/add` page and the error will be gone
        + View the edit of your store with address and you will see the address

## Add Lng and Lat
**Important** Make sure Long comes first and Lat is second in this array
    * This is just how `MongoDB` expects the data to be stored

`_storeForm.pug`

```
// more code
label(for="lng") Address Lng
input(type="text" id="lng" name="location[coordinates][0]") 
label(for="lat") Address Lat 
input(type="text" id="lat" name="location[coordinates][1]") 
// more code
```

1. Save
2. Open the edit page of a store
3. Add Lng `127` and Lat `-43`
4. Save
5. We get success flash
6. Don't see the values
7. Add them with:

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

## Don't forget to check for `location` first
`_storeForm.pug`

```
// more code
label(for="lng") Address Lng
input(type="text" id="lng" name="location[coordinates][0]" value=store.location.coordinates[0]) 
label(for="lat") Address Lat 
input(type="text" id="lat" name="location[coordinates][1]" value=store.location.coordinates[1])
// more code
```

### Dump
We can always use `dump` to see if our data took with:

And you'll see we were successful (_dump is below the form_)

![dump with coordinates](https://i.imgur.com/zTJuKSo.png)

## Add Client Side Validation
Make Lng and Lat required

`_storeForm.pug`

```
// more code
input(type="text" id="lng" name="location[coordinates][0]" value=(store.location && store.location.coordinates[0]) required) 
label(for="lat") Address Lat 
input(type="text" id="lat" name="location[coordinates][1]" value=(store.location && store.location.coordinates[1]) required)
// more code
```

* Now delete an address from your store edit page and try to save
* You will get a flash error that `You must supply an address`

![supply address error](https://i.imgur.com/xAeIJNg.png)

### Why is that happening?
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
  await store.save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};
```

### Update
Not sure why this line was in that controller

```
const store = await (new Store(req.body)).save();
await store.save();
```

It should just be:

```
const store = await (new Store(req.body)).save();
await store.save();
```

So this is the correct `createStore` controller:

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

* And if we have a good error message from this we don't need to show a stack trace (because it didn't break), it's just a validation error
* And our errorHandler, [for each of the possible errors](https://i.imgur.com/Gsom6A8.png), [it will flash that error](https://i.imgur.com/M7L421l.png) and show it on the page
* And then it calls `res.redirect('back')` to [redirect back to the page](https://i.imgur.com/7DgztL9.png) we were on
* This is really nice
    - You just have it once in your Application
    - And you don't have to worry about it because the errors will filter through the different levels

## Remove 
`_storeForm.pug`

![remove this dump](https://i.imgur.com/Jin3Z6V.png)

## Next
* Hook our address to google Maps
* When we plugin the address our long and lat will populate with real values

