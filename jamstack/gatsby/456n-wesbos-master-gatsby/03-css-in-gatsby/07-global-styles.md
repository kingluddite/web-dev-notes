# Gatsby global styles
<!-- MarkdownTOC -->

- [ways to import css](#ways-to-import-css)
  - [css modules](#css-modules)
  - [styled components](#styled-components)
- [Our CSS strategy](#our-css-strategy)
  - [Let's tackle global styles](#lets-tackle-global-styles)
  - [Add our reset](#add-our-reset)
- [Create our global styled component file](#create-our-global-styled-component-file)
    - [Are we allowed to import svg into javascript? No](#are-we-allowed-to-import-svg-into-javascript-no)
    - [Why am I importing them and storing them as variables?](#why-am-i-importing-them-and-storing-them-as-variables)
- [West Practice](#west-practice)
- [How I select gatsby images before they are fully rendered](#how-i-select-gatsby-images-before-they-are-fully-rendered)
- [How are we able to import `svgs` and `css` into javascript files?](#how-are-we-able-to-import-svgs-and-css-into-javascript-files)
- [Why am I importing them and referencing them and not just having them in my images folder and referencing them in my css code?](#why-am-i-importing-them-and-referencing-them-and-not-just-having-them-in-my-images-folder-and-referencing-them-in-my-css-code)
- [CSS custom properties \(we know them as variables\)](#css-custom-properties-we-know-them-as-variables)
- [Tip](#tip)
- [How we can select the gatsby images before they are fully rendered](#how-we-can-select-the-gatsby-images-before-they-are-fully-rendered)
  - [scrollbar styles to get it to work cross-browser](#scrollbar-styles-to-get-it-to-work-cross-browser)
- [How can we use these GlobalStyles?](#how-can-we-use-these-globalstyles)

<!-- /MarkdownTOC -->

`src/styles/GlobalStyles.js`

```css
import { createGlobalStyle } from 'styled-components';
import bg from '../assets/images/bg.svg';
import stripes from '../assets/images/stripes.svg';

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #efefef;
  }
  html {
    background-image: url(${bg});
    background-size: 450px;
    background-attachment: fixed;
    font-size: 10px;
  }

  body {
    font-size: 2rem;
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    background: var(--red);
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    &:hover {
      --cast: 4px;
    }
  }

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
    }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--red) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--red) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  hr {
    border: 0;
    height: 8px;
    background-image: url(${stripes});
    background-size: 1500px;
  }

  img {
    max-width: 100%;
  }

  .tilt {
    transform: rotate(-2deg);
    position: relative;
    display: inline-block;
  }

`;

export default GlobalStyles;
```

## ways to import css
* You could do this:

`src/components/Layout.js`

```js
import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout({ children }) {
  // console.log(props);
  return (
    <div>
      <link rel="stylesheet" href="./mycss.css" />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
```

* But that would not follow Gatsby's best practice of "try to always go through gatsby"
  - Gatsby needs to know about everything in your project
    + Your data
    + Your images
    + Your pages
    + Your links
    + Your CSS
  - WHY?
    + If you look at a Gatsby rendered production page you'll see all the CSS gets dumped before the content - Gatsby is smart and knows what CSS to load first (aka the "critical CSS") without having a flash of unstyled content
    + So instead of linking like about we need to link it "through" Gatsby
      * There are tons of different ways to use CSS in Gatsby
        - We'll eventually land on Styled Components

`red.css`

```css
body {
  background: red;
}
```

* Then inside our browser file

`gatsby-browser.js`

* Run `$ npm start` and background will be red

```js
import React from 'react';
import Layout from './src/components/Layout';

import './src/styles/red.css';

export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}
```

* By writing our code this way now gatsby will know this is important and stick it before our page renders
* But if you view page source you won't see it in development
* But you can see it in production
  - You can run your site in production locally with `$ gatsby build` and then `$ gatsby serve` you will see that gatsby will stick that CSS in a style tag before the content
    + TODO - But this causes a problem because `$ npm run build` and then `$ npm run serve` is broken

### css modules
* scoped components (a bit clunky)

### styled components
* scoped css inside a react app
  - Great for scoping your CSS and making reusable styled components

## Our CSS strategy
1. Let's scope some global styles in our app
2. Then we'll set some typography styles
3. Then we'll write CSS for the rest of our app

* **note** Remove the `red.css` and import!

### Let's tackle global styles
* Why do I need global styles?
  - What color is your background?
  - What fonts are you using?
  - What do buttons look like?
  - What do the scrollbars look like?
  - Is there any max-width on the images?

### Add our reset
* We'll use `normalize.css` as our reset

`$ npm i normalize.css`

* We will import it in our `Layout.js` file

`components/Layout.js`

* The import isn't special because it literally is just pointing to a folder called `normalize.css` that has a file called `normalize.css` inside it

```js
import React from 'react';
import 'normalize.css'; // reset
import Footer from './Footer';
import Nav from './Nav';

export default function Layout({ children }) {
  // console.log(props);
  return (
    <div>
      <link rel="stylesheet" href="./mycss.css" />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
```

* **Test it out** Show the css in Chrome without the `normalize.css` and you'll see the `body` tag has a margin of 8px but with normalize it is a margin of 0;

## Create our global styled component file
`$ npm i styled-components`

`styles/GlobalStyle.js` (not `.css` - since we are using `styled-components` package)

* We use `createGlobalStyle` **styled-components** function
* We use regular CSS variables (aka custom properties)
* We put them on the `:root` (global) so they are available anywhere I want in the application

#### Are we allowed to import svg into javascript? No
* And before we imported `normalize.css` into JavaScript
* This is not valid JavaScript
* But because the way that Gatsby works, is gatsby allows you to import anything including images and CSS and Gatsby knows not to render that out to JavaScript but it knows to render it out to CSS or a compressed image or whatever it needs to

#### Why am I importing them and storing them as variables?
* If I just pointed to the path where they are in the CSS then gatsby won't know about them and I'd have to put them in the static folder and I would not get any of the performance benefits that Gatsby offers

## West Practice
* buttons
  - one global button?
    + Some people like to create reusable buttons over and over again, but Wes likes to use a regular button and style it the same way for the entire application

## How I select gatsby images before they are fully rendered
* Looking at pizzas page
  - What gatsby does under the hood
  - Gatsby renders out their images with all kinds of cool things
  - Gatsby renders out image with multiple formats
    + `webp` (_format that works in chrome, firefox (not safari) - it works in some browsers but not all and fall back to other versions if the browser doesn't support_)
  - Gatsby also ships multiple sizes of that image (so based on the users device they will load large or smaller images)
  - Gatsby, when you load up an image for the first time, before any of these images have finished downloading from the server, gatsby will just render out a base64 string, this is cool because instead of having to wait for a small thumbnail it just ships that image as text in base64, if you copy and paste that super tiny image you can scale up and blur that image (and inside of the base64 are the piece of code that represent the image)
  - so the above code will pixelate the images to give it a cool fade in effect
* scrollbar styles are applied (to work cross browser)
* use

```css
img {
  max-width: 100%; /* used so no images ever overflow */
}
```

```css
// MORE CODE

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
    }
// MORE CODE
```

## How are we able to import `svgs` and `css` into javascript files?
* Gatsby knows not to render the images and css to javascript but knows to render it out to css or a compressed image

## Why am I importing them and referencing them and not just having them in my images folder and referencing them in my css code?
* Because to do that we would have to stick them in our `static` folder and then Gatsby doesn't run them through Gatsby and we lose all our optimization Gatsby stuff

## CSS custom properties (we know them as variables)
* We stick them on `:root` so that they are available anywhere we need them in our app

`GlobalStyles.js`

```js
// MORE CODE

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #efefef;
  }
  html {

// MORE CODE
```

## Tip
* Base styles for all our buttons
    - Some like to create reusable buttons over and over again but wes likes to use a regular button and style it the same way for the entire app

## How we can select the gatsby images before they are fully rendered
* You see the first blurry image
* Gatsby renders out images with lots of stuff (multiple formats)
    - `webp` is one type
    - It falls back to others if the browser doesn't support webp
    - Gatsby also ships multiple sizes of that image (depending on the user's device)
    - **coolness** When you load up the image for the first time before any of the images finish downloading from the server it will render out a base64 string
        + `<img aria-hidden="true" src="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAQFBwb/xAAmEAABAwQABQUBAAAAAAAAAAABAgMEAAUGERIhMUFRBxMUImFx/8QAGAEBAAMBAAAAAAAAAAAAAAAAAwEEBQb/xAAdEQACAgIDAQAAAAAAAAAAAAAAAQIRAyEEEiIy/9oADAMBAAIRAxEAPwCF6e4+LPFirSzHdfdbBcLvLgJ6aroWXZNwmpE5xp2KOLjaQ39SP7Vbj8mHOt0WY2g+2poFQK97HjXmpzUtmMh1EVt4LJCktBPQH9rnpW5els3rvaZmuYYYWb24Yaj8dxIcQPAPalaFfG0tztTXgt4oCjrsOwpS98kdISORSSbMixm9TbZj2oi0pS5yUCN7q4hZhdgjSXGxvqQjnSlWORFOe0Fi+LOWvd5nu3Fxa5Cyo/tKUp0lRDbs/9k=" alt="" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; object-position: center center; opacity: 0; transition-delay: 500ms;">`
        + So instead of waiting for a small thumbnail of the image is just sents that image as text (in base64)
        + Copy and paste that image and you'll see it is tiny but you can scale up that image very large and blur it
        + We apply the `image-rendering` css property to give it a pixelated fade in effect

```css
// MORE CODE

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }
// MORE CODE
```

### scrollbar styles to get it to work cross-browser
```css
// MORE CODE

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--red) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--red) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }
// MORE CODE
```

## How can we use these GlobalStyles?
* We stick them in a variable and export them
* Then we'll inject them into our Layout

`Layout.js`

```js
// MORE CODE

import GlobalStyles from '../styles/GlobalStyles';

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
// MORE CODE
```

* View in browser and inspect `html` element and you'll see our global css

```css
// MORE CODE

html {
    background-image: url(/static/bg-38613543c07cf2c51e84f17fbd1182b1.svg);

// MORE CODE
```

* The bg image is not equal to `bg.svg`
* Gatsby takes the images processes it, optimizes it and renames it with a cachebuster (unique identifier), so if you change the image (gatsby will know and put on a different random modifier string on it) and you don't have to do a "hard refresh" on the browser because the image will have a new cache busting name
