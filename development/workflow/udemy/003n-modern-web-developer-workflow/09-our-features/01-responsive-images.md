# Responsive Images
## What is a responsive image and why do we need it?
* Very similar to a traditional image
* [Reading up on high-dpi images](https://www.html5rocks.com/en/mobile/high-dpi/)
* [Watch Video on the difference between high dpi and not high dpi images](https://www.youtube.com/watch?v=F_CdTRDNNRE)
* [Efficient and Modern way to create high dpi images with Photoshop](https://www.elegantthemes.com/blog/tips-tricks/how-to-create-retina-display-image-assets-for-better-looking-websites)

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
3. Observe what is happening

### Problem
* We are forcing mobile phones to download large images
* We are needlessly burning through the smartphone user's data plan
* The problem is the `img` tag is forcing us to send one image to all devices, it doesn't care if they differ in size

### Solution
* Send different image files to different device sizes
* That is exactly what responsive images do!

## Convert traditional image into a responsive image
### Two Examples
* There are two distinct reasons to use responsive images in the first place

1. Art Direction & Cropping situation
2. Image resolution & file size situation (_faster load times_)

### Art Direction & Cropping situation

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

### Image resolution & file size situation (faster load times)
* Here we leave the browser and the device to decide which image they see
* The image is the same cropped image
* But we have three different optimizations of the same cropped image (small, medium and large)
* Devices are **self-aware**
    - They know the size of their own screen
    - And they also know the pixel density of their screens
* Browsers and devices are intelligent enough:
    - To choose the smallest picture

## Help a browser out!
* But as a developer we do need help the browser out a bit
* Web browsers can figure out the size of the image
    - But only after it was downloaded
    - And we don't want the browser to have to download all three images
        + That would defeat the purpose
    - We need to tell the browser the size of each image
        + So the browser knows which one to use

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
* One annoying problem to be aware of:
    - Google Chrome may not let you see your work
    - To improve the user experience Google Chrome caches images
    - This is so you don't have to download the same images every time you visit a page
    - It downloads the images the first time you visit the site
    - And then the next time you visit that page you are viewing the same images but Chrome has cached them (faster page load)

##### When Testing Remember to clear the cache!
* Or you can use an **incognito** image
* I like to use the [Clear Cache](https://chrome.google.com/webstore/detail/clear-cache/cppjkneekbjaeellbfkmgnhonkkjfpdn?hl=en) chrome browser extesion to easily clear the cache

## Responsive Images
* Make our hero image responsive
* We need to crop it for smaller screen sizes

### Update our Project
`index.html`

* Add this image to your `large-hero` section
* All the necessary images were added in the last branch (**peh2-header**)

```html
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

## Combing Image Stuff
* We can also combine the **image resolution** AND **file size situation** into this responsive image!
* Files can use same crop and ration
    - But they may need a higher `dpi`
    - We do this in case someone has a retina display
    - So they can see the more crisp image

### Some monitors have a very high pixel density
* So a monitor showing `1920px` wide image might look great
* But on a **high pixel density monitor** it will not look great
* We need to make a high `dpi` image too for people using a 4K monitor or 5K monitor...
    - In this case we would want to send an even larger image
    - With the exact same cropping ratio

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

## Errors
You will get this error if you forget the `w`

![no w error](https://i.imgur.com/sqrWV7u.png)

```html
<img class="large-hero__image" srcset="assets/images/hero--smaller.jpg 640w, assets/images/hero--smaller-hi-dpi.jpg 1280" alt="Coastal view of ocean and mountains" />
```

So make sure to add the `w`

```html
<img class="large-hero__image" srcset="assets/images/hero--smaller.jpg 640w, assets/images/hero--smaller-hi-dpi.jpg 1280w" alt="Coastal view of ocean and mountains" />
```

# Tips for Testing Responsive Images
## Dragging browser shows different images
* But lots of times you are guessing
* To eliminate guesswork and know which image you are looking at at which breakpoint
    - Create a counterpart for every image in your folder that ends in `-i`
        + chose `i` to stand for **information**
        + The `-i` version of the image has a transparent black overlay and over the text we see the dimensions of the image
        + So any time you need to see an image change the filename to `-i`

![example of -i](https://i.imgur.com/ro0xF41.png)

## Simulating and testing different pixel densities
* As a developer we need to be able to test all of our images but if we don't have a high `dpi` monitor we will never be able to test for those images
* Do we just have to hope they work?
* How do you test high `dpi` images in a `non-high-dpi` monitor?
    - Also if you have high `dpi` monitor and you want to test the `non-high-dpi` images

### Chrome browser to the rescue
* View - Inspect
* Click Toggle Device Toolbar
* Click Responsive
* Make sure you add `-i` to your images
* Click the vertical 3 dots in Chrome ([screenshot](https://i.imgur.com/E17ert8.png))

* When you are done testing, remove the `-i` on all images

