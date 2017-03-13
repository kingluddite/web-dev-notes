# Filtering Out Albums
Why are our images all not showing up.

## Debugging
Open network tab
Click filter icon
We need to find the request that was made to the imgur API
Click XHR - which means show me any Ajax requests
Refresh page
Click on the `0` - that is the XHR request we are making to the imgur API
Then click the `Preview` tab - you will then see all the data that came back from the API and the requests
Expand `data`
We can look through it to see the pictures that had broken links
You will see that the broken image has a link URL but it is an album (is_album: true), that means an album has a collection of images inside of it, as opposed to just one
**fix** - we need to filter out any is_album: true

.filter() is just like .map() but the only difference is if we return false from the filter function that item will not be included in the result set (validImages)

Update `ImageList.js`

```
// more code
const ImageList = (props) => {
  const validImages = props.images.filter(image => !image.is_album);

  const RenderedImages = validImages.map(image =>
    <ImageDetail key={image.title} image={image} />
  );
// more code
```

## View in browser
It works. No broken images!
