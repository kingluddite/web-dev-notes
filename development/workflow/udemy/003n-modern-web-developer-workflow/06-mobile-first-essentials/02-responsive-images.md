# Responsive Images
## What is a responsive image and why do we need it?
* Very similar to a traditional image

## Two unique situations
* Two unique code patterns

`/app/responsive-image-example.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Responsive Image Example</title>
  <link rel="stylesheet" href="temp/styles/styles.css"/>
</head>
<body>
 <h1>Kitten Page</h1>
 <img src="http://loremflickr.com/g/1200/400/paris" alt="french placeholder image"/>

 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur laborum esse consequuntur nam ullam, quisquam maxime. Odio veritatis neque hic perspiciatis ad amet, numquam minus debitis magnam quae praesentium dicta.</p>
</body>
</html>
```

1. View in browser
2. Shrink size to mobile
3. Observer what is happening

* Problem
    - We are forcing mobile phones to download large image
    - We are needlessly burning through the smartphone user's data plan
    - The problem is the `img` tag is forcing us to send one image to all devices, it doesn't care if they differ in size
* Solution
    - Send different image files to different device sizes
    - That is exactly what responsive images do!

## Convert traditional image into a responsive image
### Two Examples
* There are two distinct reasons to use responsive images in the first place

1. Art Direction & Cropping situation

`responsive-image-example.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Responsive Image Example</title>
  <link rel="stylesheet" href="temp/styles/styles.css"/>
</head>
<body>
 <h1>Paris Building</h1>
 <picture>
    <source media="(min-width: 1200px)" srcset="assets/images/paris-large-w1200.jpg">
    <source media="(min-width: 760px)" srcset="assets/images/paris-med-w714.jpg">
    <source media="(min-width: 480px)" srcset="assets/images/paris-small-w425.jpg">
    <img src="assets/images/paris-smallest-w200.jpg" alt="Some Paris Building">
    </picture>

 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur laborum esse consequuntur nam ullam, quisquam maxime. Odio veritatis neque hic perspiciatis ad amet, numquam minus debitis magnam quae praesentium dicta.</p>
</body>
</html>
```

* When you need to use responsive images for art direction and cropping situation -----> use the `<picture>` element

2. Image resolution & file size situation (faster load times)

* Here we leave the browser and the device to decide which image they see
* The image is the same cropped image
* But we have three different optimizations of the same cropped image (small, medium and large)
* Devices are self-aware, they know the size of their own screen and they also know the pixel density of their screens
* Browsers and devices are intelligent enough to choose the smallest picture
    - But as a developer we do need help the browser out a bit
    - Web browsers can figure out the size of the image but only after it was downloaded and we don't want the browser to have to download all three images
        + That would totally defeat the purpose of what we are trying to do
    - We just need to tell the browser the size of each image so it knows which one to use

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Responsive Image Example</title>
  <link rel="stylesheet" href="temp/styles/styles.css"/>
</head>
<body>
 <h1>Paris Building</h1>
<img srcset="images/dog-resolution-small.jgp 570w, images/dog-resolution-medium.jpg 1200w, images/dog-resolution-large.jpg 1920w" alt="Puppy in the sand." />
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur laborum esse consequuntur nam ullam, quisquam maxime. Odio veritatis neque hic perspiciatis ad amet, numquam minus debitis magnam quae praesentium dicta.</p>
</body>
</html>
```

#### Testing
* This can be annoying because Google Chrome may not let you see your work as it is doing things behind the scenes
* To test your images, you can clear the cache
* Or you can use an incognito image

### Make our hero image responsive
* We need to crop it for smaller screen sizes

### Update our Project
`index.html`

* Here is the code we are changing

```
// more code
  <div class="large-hero">
    <img src="assets/images/hero--large.jpg">
// more code
```

* We always begin with the smallest image first

`index.html`

```
// more code
<div class="large-hero">
    <picture>
      <source srcset="assets/images/hero--large.jpg" media="(min-width: 1380px)" />
      <source srcset="assets/images/hero--medium.jpg" media="(min-width: 990px)" />
      <source srcset="assets/images/hero--small.jpg" media="(min-width: 640px)" />
      <img src="assets/images/hero--smaller.jpg" alt="Coastal view of ocean and mountains" />
    </picture>
// more code
```

* We can also combine the image resolution and file size situation into this responsive image!
* Files can use same crop and ration but may need a higher `dpi`
    - We do this in case someone has a retina display so they can see the more crisp image
* Some monitors have a very high pixel density so a monitor showing 1920 wide image might look great but on a high pixel density monitor it will not look great. We need to make a high dpi image too for people using a 4K monitor or 5K monitor... in this case we would want to send an even larger image with the exact same cropping ratio

`index.html`

```
// more code
<picture>
  <source srcset="assets/images/hero--large.jpg 1920w, assets/images/hero--large-hi-dpi.jpg 3840w" media="(min-width: 1380px)" />
  <source srcset="assets/images/hero--medium.jpg 1380w, assets/images/hero--medium-hi-dpi.jpg 2760w" media="(min-width: 990px)" />
  <source srcset="assets/images/hero--small.jpg 990w, assets/images/hero--small-hi-dpi.jpg 1980w" media="(min-width: 640px)" />
  <img srcset="assets/images/hero--smaller.jpg 640w, assets/images/hero--smaller-hi-dpi.jpg 1280" alt="Coastal view of ocean and mountains" />
</picture>
// more code
```



 
