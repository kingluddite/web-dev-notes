# Filtering Out Albums
Why are our images all not showing up.

## Debugging
1. Open console
2. Open network tab
3. Click filter icon
4. We need to find the request that was made to the imgur API
5. Click XHR (_which means show me any Ajax requests_)
6. Refresh page
7. Click on the `0` (_that is the XHR request we are making to the imgur API_)
8. Then click the `Preview` tab (_you will then see all the data that came back from the API and the requests_)
9. Expand `data`
10. We can look through it to see the pictures that had broken links
11. You will see that the broken image has a link URL but it is an album (_is_album: true_)
    * That means an album has a collection of images inside of it, as opposed to just one

## Let's fix this
We need to filter out any `is_album: true`

## filter() vs map()
`.filter()` is just like `.map()` but the only difference is if we return **false** from the filter function that item will not be included in the result set (_validImages_)

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
