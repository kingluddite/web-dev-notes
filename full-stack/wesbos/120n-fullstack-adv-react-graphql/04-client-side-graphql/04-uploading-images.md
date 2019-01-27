# Uploading Images
## Create Feature Branch
`$ git checkout -b images`

* Replace `feature-branch` with the name of your feature branch

## Multer with Express - Uploading to your Own Server
* A way to upload images on a NodeJS app
* This is a way to upload images to your own server

## Another Way - Uploading to an external service
* `Cloudinary`
    - Other competitors
        + Amazon AWS
        + Imager

### Pros of using Cloudinary
* You can upload images
* You can do transformations
    - Includes everything like:
        + Image compression 
        + Resizing of images
        + Cropping of images
        + Applying filters to images
        + And much more
* You get 10gigs for free
* You refer a friend and you get an extra 2 gigs

## Sign up for a free account
* Answer welcome questions to get to main dashboard
* Verify your email

### Make a couple settings changes
* This will make it easy for us to upload from the client without the need to have a server in the middle

1. Click on settings `gear icon` at top of dashboard
2. Click on `Upload` tab
3. Scroll down to click on `Add upload preset`
    * Preset is a set of setting that will apply to any of our uploads
    * Upload preset name `buystuff`
4. Signing Mode set to `Unsigned`
5. The folder it goes into will be called `buystuff`
6. Click on `Transformations` tab
7. Click on `Edit` under `Incoming Transformations`
8. An `Edit Transformation` dialog box opens up
9. Under Resize & crop, set `Width` to be `500`
10. Set `Mode` to be `Scale`
11. Under Format & Shape set to `Auto`
12. Click on `OK` button

## Eager Transformation
1. Click `Add Eager Transformation`
2. Width is `1000` for Resize & Crop
3. Set Mode to `Scale`
4. For Format & shape just select `Auto`
5. Click `OK`

## Finish up with settings
* Click `Save`
* At top you should see `Upload preset created successfully!`

## Add a method to our CreateItem component
* This method will handle all the uploading of all of our images
* **note** There is no `value` attribute for a `file` type input field

`CreateItem.js`

```
// MORE CODE

// images
uploadFile = event => {
  console.log('uploading file');
};

render() {

  // MORE CODE

          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="file">
              Image
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an Image"
                required
                onChange={this.uploadFile}
              />
            </label>
            <label htmlFor="title">
              Title

// MORE CODE
```

## Test it in browser
* Have an image somewhere on your computer
* Click choose file > browser to your file
* Look at Chrome console and you will see the `uploading file` log fires

### Now we need to do the heavy lifting with our uploadFile method

`CreateItem.js`

```
// MORE CODE

// images
uploadFile = async event => {
  const { files } = event.target;
  // console.log('uploading file');
  // pull files from selection
  // user FormData API which is part of JavaScript
  //  to prep all the data
  const data = new FormData();
  // Append the file to the first field user selected
  data.append('file', files[0]);
  // Add preset that cloudinary needs
  data.append('upload_preset', 'buystuff');

  // Hit cloudinary API
  // Don't forget to make this an async function
  // Since we are awaiting here
  // The URL ends with the Cloudinary cloud name (you can edit this)
  const res = await fetch('https://api.cloudinary.com/v1_1/piplearns/image/upload', {
    method: 'POST',
    body: data,
  });
  // convert the response we get into JSON
  const file = await res.json();
  // let's see what our file data looks like
  console.log(file);
  //
  this.setState({
    image: file.secure_url,
    largeImage: file.eager[0].secure_url,
  });
};

render() {

// MORE CODE
```

* The `upload_preset` is needed by cloudinary
    - You gave this preset a name when signing up so use that name here

`data.append('upload_preset', 'buystuff');`

* We use async await
* We use the `fetch() API to hit the API`
    - `fetch() API takes a number of arguments`
        + The default method of `fetch()` is `GET`
        + The `body` will be set to the `data`
            * It will be the file itself and another argument called `upload_preset` that gets added with it
    - After that gets uploaded we need to parse the data that comes back
        + We will just convert the response we get to JSON
* We log out our file just to see what it gives us
* But we can put the data that comes back into the two spots in our `state`
    - The `image` and the `largeImage`

```
this.setState({
  image: file.secure_url,
  largeImage: file.eager[0].secure_url,
});
```

* **note** The `eager` is a secondary transform that happens and it transform a larger version of that and we just use that as a secondary so we don't have to wait for both of them to come back and this makes the request a little bit faster

![preset name](https://i.imgur.com/YkAMHIw.png)

* You can edit your name when you sign up

![cloudinary username](https://i.imgur.com/rMuv50n.png)

## Check with React Dev Tools
* Search for `CreateItem` on `/sell` page
* We will watch the `image` and `largeImage` of our `state`
* Just find an image and don't hit submit
* In React tab you will see the image and largeImage have cloudinary URLs
* Switch to the console tab and you will see all the data cloudinary sends back to us in the response
* You can choose to save any of this information to your DB if you need it
    - We are just picking the secure_url and the eager secure_url
* Submit form
* Then go to your home page and you will see the image you uploaded on the page
    - The image is stretched and we'll fix that soon

### Tip
* When you submit form you should check that the image is done uploading because there could be a little time where someone uploads a file and then immediately hits enter, your API will still come back with a specific error saying you didn't provide to me an image or large image but if you check first you will give the user a better experience

## Upload Preview
* Display the image to the user if it is loaded

```
// MORE CODE

<fieldset disabled={loading} aria-busy={loading}>
  <label htmlFor="file">
    Image
    <input
      type="file"
      id="file"
      name="file"
      placeholder="Upload an Image"
      required
      onChange={this.uploadFile}
    />
    {image && <img src={image} alt="Upload Preview" />}
  </label>

// MORE CODE
```

* Select and image and you will see a large distored preview image appear
* We'll fix the dimensions soon

## Summary
* So we saw how to handle the R of CRUD (read)
* And the C of CRUD (create)

## Next - The U of CRUD (update)

## Additional Resources
* [What is FormData()](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)
* [All about the fetch API](https://davidwalsh.name/fetch)
* [How to find API to upload images](https://cloudinary.com/documentation/admin_api)
