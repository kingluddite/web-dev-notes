# Gatsby global styles
## ways to import css
* `gatsby-browser.css`

`import './src/styles/red.css`

### css modules
* scoped components

### styled components
* scoped components

`styles/GlobalStyle.js` (not .css - since we are using styled-components package)

* We use `createGlobalStyle` **styled-components** function

```
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

## How are we able to import `svgs` and `css` into javascript files?
* Gatsby knows not to render the images and css to javascript but knows to render it out to css or a compressed image

## Why am I importing them and referencing them and not just having them in my images folder and referencing them in my css code?
* Because to do that we would have to stick them in our `static` folder and then Gatsby doesn't run them through Gatsby and we lose all our optimization Gatsby stuff

## CSS custom properties (we know them as variables)
* We stick them on `:root` so that they are available anywhere we need them in our app

`GlobalStyles.js`

```
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

```
// MORE CODE

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }
// MORE CODE
```

### scrollbar styles to get it to work cross-browser
```
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
* We stuck them in a variable and exported them
* Then we'll injext them into our Layout

`Layout.js`

```
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

```
// MORE CODE

html {
    background-image: url(/static/bg-38613543c07cf2c51e84f17fbd1182b1.svg);

// MORE CODE
```

* Gatsby takes the images processes it, optimizes it and renames it with a cachebuster, so if you change the image you don't have to do a "hard refresh" on the browser because the image will have a new cache busting name
