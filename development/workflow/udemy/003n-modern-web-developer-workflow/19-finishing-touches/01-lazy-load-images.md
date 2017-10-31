# Lazy Loading Images
* Faster page loads

## Chrome Developer Tools
* Network tab
* Click refresh page (`cmd` + `r`)
    - Make sure filter is not selected
    - Make sure `All` is selected
* All URLs and files our page has requested

![all files](https://i.imgur.com/ZMWKYMJ.png)

## Download Everything!
* By default our browser will try to download everything on the page immediately
* As a developer we can customize it and make it more efficient

### Filter to only see image files
* Click filter icon
* Select `img`
* Refresh

![filter images](https://i.imgur.com/Ls0DZX7.png)

* Do we need to download all these images before the page loads?
* Testimonials are at bottom of page

## Lazy Loading
Only load assets as they become necessary

### Lazy Loading images
* Load them as they are scrolled into view

## Git Stuff
`$ git status`

* Add all changes with:

`$ git all -A`

* Commit changes

`$ git commit -m 'Complete modal overlay`

* Merge branch into master

`$ git checkout master`

`$ git merge create-modal`

`$ git push origin master`

* Add new branch

`$ git checkout -b lazyloading`

## Lazysizes
### Install npm library `lazysizes`
`$ npm i lazysizes -S`

* [Lazysizes](https://github.com/aFarkas/lazysizes) will do everything for us and we won't need to add a single line of JavaScript
* When using 3rd party **libraries/packages/plugins** that we write no custom code for it is a best practice to include those imports in their own file and not in our main `App.js`

## Create and Import `Vendor.js` file
`/app/assets/scripts/Vendor.js`

```js
import 'lazysizes';
```

* We are not storing this inside a variable because we are not writing code for it
* Now we will update `webpack.config.js` setup to create a bundled version of this file that we can feed to the browser

`webpack.config.js`

```js
const path = require('path');

module.exports = {
  entry: {
    App: './app/assets/js/App.js',
    Vendor: './app/assets/js/Vendor.js'
  },
  output: {
    path: path.join(__dirname, './app/temp/js'),
    filename: '[name].js'
  },
// more code
}
```

* Instead of one item inside `entry` we are storing multiple so we store two paths inside an object
* For `output` we can't have two files named `App.js` so we use `filename: '[name].js`
    - That will keep the filename dynamic and will create two file names based on the `entry` object's keys (_App and Vendor_) and so the files created will be:
        + `App.js`
        + `Vendor.js`

## Restart Webpack
* Because you changed the `webpack.config.js` you must restart it to see the config changes take effect

## Restart Gulp
* `ctrl` + `c` and `$ gulp watch`

## Save any JavaScript file
* You also need to trigger webpack to create its bundles just go into any JavaScript file and save with `cmd` + `s`
* You should `lazysizes.js` in the Terminal output

![lazyfiles loading](https://i.imgur.com/RnZ9A37.png)

* Check for `/app/temp/js/Vendor.js`
    - It should be a bundled JavaScript file
* We now need to include this file inside `index.html`

## Where do we include our `Vendor.js`
* Normally we'll put all our JavaScript at the bottom like where we put `App.js`

```html
  <script src="/temp/js/App.js"></script>
</body>
</html>
```

* But with `Vendor.js` we want it to load right away so we'll put it at the top just after our link to our CSS bundle

```html
  <link rel="stylesheet" href="temp/styles/styles.css"/>
  <script src="/temp/js/Vendor.js"></script>
</head>
<body>
```

### We need to tell the web browser to not load our testimonial images
* But web browsers can't help it
* As soon as they see `srcset`, they immediately begin download the file
* So in order to stop the browser from doing this, we don't use `srcset` and instead use our very own custom attribute `data-srcset`
    - Won't that break the image entirely?
    - Yes, but that is what the lazysizes package is doing for us
        + We just need to also give that image element a class of `lazyload` and the **lazysizes** JavaScript package will automatically convert this to the legit `srcset` attribute at the precise moment that this element is almost scrolled to

`index.html`

* We create a container and give it the `technologies__photo` class
  - And inside we have our image with the `.lazyload` class

```html
// more code
<div class="technologies__photo">
  <img class="lazyload" sizes="160px" data-srcset="assets/images/testimonial-jane.jpg 160w, assets/images/testimonial-jane-hi-dpi.jpg 320w" alt="Jane Doe">
</div>
// more code
<div class="technologies__photo">
  <img class="lazyload" sizes="160px" data-srcset="assets/images/testimonial-john.jpg 160w, assets/images/testimonial-john-hi-dpi.jpg 320w" alt="John Smith">
</div>
// more code
<div class="technologies__photo">
  <img class="lazyload" sizes="160px" data-srcset="assets/images/testimonial-cat.jpg 160w, assets/images/testimonial-cat-hi-dpi.jpg 320w" alt="Cat McKitty">
</div>
// more code
```

## Check the Network
* In Chrome Dev tools
* Make sure you are on the top of your web site
* Click Network
* Filter images
* Refresh browser
* You will not see our 3 testimonial images
* Scroll down the page and when you get to the testimonials section, you'll see the images appear in the Network tab!

## Can we lazyload background images that we add to the page with CSS?
* We can lazy load the testimonial background using lazysizes
* Find the HTML element the background image is applied to and give that element a class of `lazyload` and then as we get to that part of the page, lazyload will swap the `lazyload` class name out with `lazyloaded` and we can use that class name to load our image using our CSS file

```html
<div id="technologies" class="page-section page-section--no-b-padding-until-large page-section--technologies lazyload" data-matching-link="#technologies-link">
```

`_page-section.css`

* Change this:
 
```css
&--technologies {
  background-color: #e0e6ef;

  @mixin atLarge {
    background: url("/assets/images/testimonials-bg.jpg") top center no-repeat;
    background-size: cover;
  }
}
```

* To this:

```css
&--technologies {
  background-color: #e0e6ef;

  @mixin atLarge {
    &.lazyloaded {
      background: url("/assets/images/testimonials-bg.jpg") top center no-repeat;
      background-size: cover;
    }
  }
}
```

* That will output to this CSS (production CSS)

```css
.page-section--technologies.lazyloaded {
    background: url(/assets/images/textured-paper-bg.jpg) top center no-repeat;
    background-size: cover;
}
```

## Check Network tab of Chrome dev tool
* Scroll to top of page
* Filter images
* Refresh
* The testimonial background image is not there
* Scroll down the page and when you get near testimonials, `lazysizes` will load that background css image

## Add lazy load to our other two images
```html
// more code
<div class="wrapper wrapper--medium wrapper--b-margin">
  <img class="lazyload" sizes="(min-width: 970px) 976px, 100vw" data-srcset="assets/images/first-trip-low-res.jpg 565w, assets/images/first-trip.jpg 976w, assets/images/first-trip-hi-dpi.jpg 1952w" alt="Couple walking down a street.">
</div>
// more code
<div class="row__medium-4 row__medium-4--larger row__b-margin-until-medium">
  <picture>
    <source sizes="404px" data-srcset="assets/images/our-start.jpg 404w, assets/images/our-start-hi-dpi.jpg 808w" media="(min-width: 1020px)">
    <source sizes="320px" data-srcset="assets/images/our-start-portrait.jpg 382w, assets/images/our-start-portrait-hi-dpi.jpg 764w" media="(min-width: 800px)">
    <img class="lazyload" data-srcset="assets/images/our-start-landscape.jpg 800w, assets/images/our-start-landscape-hi-dpi.jpg 1600w" alt="Our founder, Jane Doe">
  </picture>
</div>
// more code
```

* Check the network tab and you will see they lazyload
* Since they are so close to the top they will load fast

## Next - Deal with possible Lazysize and waypoint issues
