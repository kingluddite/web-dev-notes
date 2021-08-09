### UPDATE!!!! Gatsby in V3 has totally revamped how images work
<!-- MarkdownTOC -->

- [gatsby images](#gatsby-images)
    - [Problems with web images today](#problems-with-web-images-today)
        - [Gatsby addresses all of this for you](#gatsby-addresses-all-of-this-for-you)
    - [How can I process images?](#how-can-i-process-images)
    - [What are those services?](#what-are-those-services)
    - [So you make a decision](#so-you-make-a-decision)
        - [We will use Sanity Image Pipeline](#we-will-use-sanity-image-pipeline)
    - [Run your app](#run-your-app)
    - [There are two different images that you can feed to gatsby-image](#there-are-two-different-images-that-you-can-feed-to-gatsby-image)
    - [Let's use gatsby-image](#lets-use-gatsby-image)
        - [Install the gatsby-image plugin](#install-the-gatsby-image-plugin)
    - [West Practice](#west-practice)
    - [Don't forget that alt attribute!](#dont-forget-that-alt-attribute)
    - [What if you need a different size of that image?](#what-if-you-need-a-different-size-of-that-image)

<!-- /MarkdownTOC -->

# gatsby images
* One of the greatest benefits gatsby offers is with images
* Working with images in web today is hard because there is so much to know and do

## Problems with web images today
* too large - like 8mb
* not compressed (lossless (smaller without giving up quality) and lossy (makes smaller and gives up quality) - you can compress without the human eye noticing a difference)
* width / height discrepancies
* poor loading performance - as it's loading you see nothing
* wrong format
    - lots of formats for images
        + webp (in a lot of browser but not all, so you need a fallback offering a jpg and the webp)
        + jpg
        + png
        + gif

### Gatsby addresses all of this for you
* You give gatsby the image and it will deliver a gatsby image that has all that stuff cooked in for you
    - It takes care of ratios (this is hard in css)
    - It will give us a data image (this is what gatsby will show as the image is loading - showing the blurry image until it loads the full image)
    - We use a picture element (this is part of HTML)
        + It tries first to serve you up a webp
            * Otherwise it will serve a jpg
            * And it will also server multiple versions of that image depending on the device size (using media queries)
* This is a ton of stuff and gatsby does it for you
    - But it is not default behavior
    - To use gatsby image you need something to process all of those images
    - You need a service or a computer that will manually process all of the versions of that image
        + they are going to make a base64 of that image
        + several size versions of the jpg
        + a webp version
        + even if you have one file you'll have serveral versions behind the scenes and the browser will take care of showing which one it wants

## How can I process images?
* There are two ways ([docs on gatsby-image](https://www.gatsbyjs.com/plugins/gatsby-image/):

1. You can source your images (if you have your images in a directory) like in your website, you can source them (much like we sourced them from sanity)
2. And then you can pipe them through gatsby sharp (plugin)
    * sharp is something that will run on your computer `gatsby-plugin-sharp`
    * Or sharp will run on your build process (your netlify build process) and it will resize and generate all the images for you
    * That can take a long time (if you 200 images - a fresh build can take 20 minutes! or more!)
    * Why so long?
        - Image processing is very "expensive" meaning it takes a lot of computer power
        - There are ways around this
            + You can still use gatsby image
            + But you can use it with a service
            + Lots of services out there where you can upload your image directly to them or you can feed them your image and it will produce all of those for you, on demand, as the user requests it

## What are those services?
* Sanity has - Sanity Image Pipeline
* Cloudinary (have a generous free tier)
* Imgix

## So you make a decision
* Do it on your own computer and have a slow build process
* Or use one of these services and speed up your build time

### We will use Sanity Image Pipeline
* Since it is all build in Sanity
* **note** Gatsby image works the same way regardless of your service

## Run your app
* Let's shut down our app and run it from scratch

1. Start gatsby (in gatsby folder) `$ npm start`
2. Start sanity (in sanity folder) `$ npm start`
3. Navigate to pizzas page
4. Use React Dev Tools > Components
5. Search for Single Pizza
6. Look at props > image > assets > fluid (look at all that cool stuff!)

![SinglePizza in React Dev Tools](https://i.imgur.com/29XXg3c.png)

* There is lots of stuff here
* We don't have to take all these things an piece them together
* We can use a custom image component that ships with gatsby and feed it this stuff

## There are two different images that you can feed to gatsby-image
* fixed (when you have a fixed width and height)
* fluid (mostly what you want - because it is responsive and as you resize the browser or device the images will resize)
* Also Gatsby will only load images on demand as you scroll them into view (aka lazy-loading - great because you are not using unnecessary bandwidth on your server as well as the customer that is visiting your website)

## Let's use gatsby-image
### Install the gatsby-image plugin
`$ npm install gatsby-image`

## West Practice
* He names gatsby-image as `<Img />`
    - This is how you know it is a custom component (because it is capitalized) and not an HTML `<img />`
    - The property is `fluid` not `src`

`s/c/PizzaList.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} />
      </Link>
    </div>
  );
}

// MORE CODE
```

## Don't forget that alt attribute!
```
// MORE CODE

        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />

// MORE CODE
```

* You don't need to add `Picture of...` before the `{pizza.name}` because it is assumed that it is a picture, when someone uses a screenreader that it is a picture or an image

## What if you need a different size of that image?
* In our `pizzas.js` page:
    - We could change our max size:
    
```
// MORE CODE

        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }

// MORE CODE
```

* Or we could make it a fixed size like this:

```
// MORE CODE

        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
          }
        }

// MORE CODE
```

* And in the component you would modify to look like:

```
// MORE CODE

        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />

// MORE CODE
```
