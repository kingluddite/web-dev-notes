# Upload, resize, images with middleware
## Add the ability to upload a photo
### This will be a 3 stage process
1. Modify our form to accept file uploads
2. Need to add some middleware inbetween
    * Before we create the store (_`createStore()` controller_)
        - We need to add some logic to:
            1. upload the file
            2. resize the file
    * [**multer**](https://www.npmjs.com/package/multer)
        - External middleware package
        - This will allow us to upload the file
    * [**jimp**](https://www.npmjs.com/package/jimp)
        - Will help us resize a file

## Modify our form to accept file uploads
`_storeForm.pug`

Change the `form` to look like this:

```
mixin storeForm(store = {})
  form(action=`/add/${store._id || ''}` method="POST" class="card")
// more code
```

* Anytime you are uploading files to a server
* You need to make sure that the browser will send it as a **multipart**

Make the following modification:

```
mixin storeForm(store = {})
  form(action=`/add/${store._id || ''}` method="POST" class="card")
```

* At the beginning we had this inside our form and when we submitted the form, nothing happened
* That was because we did not tell express how to handle multipart form data
* Now that we changed it we need to use a package like **multer** to be able to handle all those fields that are being passed to us

## Multer
require it

`storeController.js`

```
const mongoose = require('mongoose');
const multer = require('multer');

const Store = mongoose.model('Store');

const multerOptions = {
  1. Where will file be stored when it is uploaded?
  2. What types of files are allowed?
};
```

* multer will handle the upload request
    - We need to tell it, this is where you put the photo and this only the types of files you should expect to see
    - **storage** - lots of storage options with multer
        + save to disc
        + save to memory
            * We do this because we don't want to keep the originally uploaded file
                - We will just read it into memory
                - Then resize it
                - Then save the resized version to file

`storeController.js`

```
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: function(req, file, next) {
    
  }
};
```

Use ES6 method shorthand like this:

```
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    
  }
};
```

* file.mimetype - will tell you what type of photo it is
    - Every file has it's own **mimetype**
    - You can't rely on the extension of the file to actually be true
        + Someone could take `virus.exe` and rename it to `image.jpg` but mimetype you can rely on

```
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    };
  }
};
```

* Since we are using `async-await` we haven't working with **callback** stuff or **Promises** but you will often see this callback premise in node:

```
if (isPhoto) {
  next(null, true);
};
```

* If you call `next` and you pass it something as a first value, that means it's an **error**
* If you call `next` as the second value that means it worked and the second value is the value you need passed
    - So we are saying if it starts with `image` cool, continue on
        + Otherwise we have an error and we handle it

```
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed' }, false);
    }
  },
};
```

* In our app we don't want people uploaded PDFs or mp4 files

## Make our middleware
For working with our `createStore()`

`storeController.js`

```
// more code
exports.upload = multer(multerOptions).single('photo'); // add this line

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};
// more code
```

## Update our form
To take in a photo

`_storeForm.pug`

```
// more code
textarea(name="description")= store.description
//- Image upload
label(for="photo") Photo 
  input(type="file" name="photo" id="photo" accept="image/gif, image/png, image/jpeg")
// more code
```

* We use **Client side** validation `accept="image/gif, image/png, image/jpeg"`
    * But this can be removed if someone use the Chrome dev tools
    * So we also more importantly **Server side** validate
    * `const isPhoto = file.mimetype.startsWith('image/');` (_storeController.js_)

`_storeForm.pug`

```
// more code
textarea(name="description")= store.description
//- Image upload
label(for="photo") Photo 
  input(type="file" name="photo" id="photo" accept="image/gif, image/png, image/jpeg")
if store.photo
  img(src=`/uploads/${store.photo}`, alt=store.name width=200)
//- address, lng and lat
label(for="address") Address
// more code
```

## View in browser
![photo upload field in form](https://i.imgur.com/UImto6C.png)

* Now we can upload images and read them into memory
    - This means it doesn't save the file to disc
    - It just stores it in the memory of our server (just temporary)
    - We want to resize and then save it to disc

## Resize images with jimp
* We require `jimp`
* We also need to make sure our files are unique
    - [uuid package](https://www.npmjs.com/package/uuid) helps us solve this issue

`storeController.js`

```
const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp'); // add this line
const uuid = require('uuid'); // add this line
```

`storeController.js`

```
exports.resize = async (req, res, next)
```

* We use `next` because this is middleware
* We are not going to be doing any rendering or sending back to the **Client**
    - We are just going to save the image
    - Recording what the file name is
    - Then just pass it allong to our `createStore()` controller
        + upload, resize, `createStore()`
* We won't upload a file each time so we first check if there is no new file to resize
    - `if (!req.file) {`
        + **multer** will put the file on the file property of the **request** (_req_)
        + That is the whole point of middleware, (_somebody that came before you makes and preps data for you_)

## log out our file
`storeController.js`

```
// more code
exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return; // make sure to leave the function
  }
  console.log(req.file);
};
// more code
```

### Three for One
1. We want to upload
2. Then we want to resize
3. Then we want to `createStore`

We need to wire this in our router

`index.js`

```
// more code
router.get('/add', storeController.addStore);

// add this chunk of code
router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.post('/add/:id', catchErrors(storeController.updateStore));
// more code
```

* We don't use `catchErrors()` on `.upload()` because it is 3rd party **multer**

1. View in `/add`
2. Enter store info
3. Add an image
4. Submit
5. View Terminal

You will see something like:

![terminal data of image](https://i.imgur.com/3qcsF4V.png)

* `fieldname` - is from our form
* `originalname` - name of what we uploaded
* `encoding` and `mimetype`
* **important** - The buffer
    - We aren't saving the file we're just reading it into memory
    - The buffer is just the representation of that file in memory
    - The browser just spins forever because after we log it, we don't tell it to do anything so it just hangs
    - Eventually we'll get a timeout on our sever because we never send a response

## Focus on the extension
* Don't rely on the `user-given extension` (_1.jpg_)
* We will rely on the **mimetype** (_image/jpeg_)
    - `const extension = req.file.mimetype.split('/')[1];`

![how we get the extension](https://i.imgur.com/NhVmBaY.png)

* We saved our store on `req.body`
    - `const store = await (new Store(req.body)).save();`
    - So we need to put `photo` on `body` (_req.body.photo_)
* We need unique file names that are not overlapping each other
    - `${uuid.v4()}`
* Add file extension
    - `${uuid.v4()}.${extension}`

`storeController.js`

```
exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return; // make sure to leave the function
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
};
```

## Now time to do the Resizing
* jimp.read()
    - Either pass it a file path on your server
    - Or you pass it a buffer (this is something stored in memory)
        + `req.file.buffer`

![buffer highlighted](https://i.imgur.com/zrylBl9.png)

### jimp
* Is a package that is based on **Promises**
    - Because of this we can **await** the results and put it into `photo`
    - We then want to resize with jimp and we will want it to be `800px` and then whatever the other value is should be `autogenerated` because we want the image to be proportional
        + `await photo.resize(800, jimp.AUTO)`
        + [jimp documentation reference](https://github.com/oliver-moran/jimp)
* Write it
    - All this is asynchronous so we need to wait until their done
    - ``await photo.write(`./public/uploads/${req.body.photo]}`);``
* Keep going!
    - next()

`storeController.js`

```
// more code
exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return; // make sure to leave the function
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};

exports.createStore = async (req, res) => {
// more code
```

## View the image upload hot!
* Refresh browser on `/add` route and place on left of your screen
* open finder (_on right of screen_) and have it open to the `uploads` folder
    - sort finder by `Date Modified`
* Add new store and upload image
* Submit

View in finder

![new image uploaded](https://i.imgur.com/1WTJLef.png)

View the dimensions (800xauto)

![image dimensions](https://i.imgur.com/fCmFMMw.png)

But when we view the data dump with:

`_storeForm.pug`

```
mixin storeForm(store = {})
  form(action=`/add/${store._id || ''}` method="POST" class="card"
        enctype="multipart/form-data")
    pre= h.dump(store)
// more code
```

![data dump](https://i.imgur.com/ThX1c7l.png)

### What did we forget?
We forgot to add this image to our **schema**

`Store.js`

* We need to tell our schema to look for a `photo` field that is a **String**

![we need a string for our image upload](https://i.imgur.com/8wL5K9Q.png)

## View in browser
1. Refresh browser on `/add` route and place on left of your screen
2. Add new store and upload image
3. Submit
4. View `/stores`
5. You will see the new image

![images working](https://i.imgur.com/ws8wwWa.png)

## Do the same thing for our update controller

`index.js`

```
// more code
router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.post('/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);
// more code
```

Edit and image and you will see it uploads and places our image in `/stores`

## Why middleware is useful
* Don't dump all your logic into one controller

* Remove data dump

`_storeForm.pug`

```
mixin storeForm(store = {})
  form(action=`/add/${store._id || ''}` method="POST" class="card"
        enctype="multipart/form-data")
    //- pre= h.dump(store) delete this line
```
