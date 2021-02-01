# Layouts in Gatsby
* **TIP** auto import (you type your component and this keyboard shortcut shows items, select the component and it will automatically add the import)

`Layout.js`

```
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout(props) {
  console.log(props);
  return (
    <>
      <Navbar />
      text
      <Footer />
    </>
  );
}
```

* You'll see children is only prop

`components/Layout.js`

```
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

```

## Tip
* Make sure the type of page is JavaScript React for proper syntax highlighting

## default props
* Can use Typescript instead
* Eslint should notify you about prop types (currently not)

## Do you want to have to wrap `<Layout>` around all elements
* You can or you can use 2 special gatsby files

1. gatsby-browser.js
2. gatsby-ssr.js

### gatsby-browser.js
* Allows us to hook into different Gatsby APIs if we need to
* By default Gatsby not going to wrap your pages in a `<Layout>` component
    - But you can use `gatsby-browser.js` to wrap it for you 

### wrapPageElement
* [docs for wrapPageElement in Gatsby docs](https://www.gatsbyjs.com/docs/browser-apis/#wrapPageElement)
* Allow a plugin to wrap the page element
    - So here we will make our own little plugin that anytime Gatsby renders out a page it will wrap that in something

`gatsby-browser.js`

```
// MORE CODE

const React = require('react');
const Layout = require('./src/components/Layout').default;

export function wrapPageElement({ element, props }) {
  return <div>🍅</div>;
}
// MORE CODE
```

* **note** Currently (may change in future) you have to quit Gatsby and restart
* You also need to restart with:
    - gatsby-node.js
    - gatsby-ssr.js

## Caution
* You will get an error if you try to wrap a DOM element (example: `<div>`)
* You need to wrap it in a React component (like `<Layout />`)

# Wrap all pages with Layout and pass a tomato

```
const React = require('react');
const Layout = require('./src/components/Layout').default;

export function wrapPageElement({ element, props }) {
  return <Layout>🍅</Layout>;
}
```

* But we will pass props with spread operator and use the element so we'll wrap Layout around all our content

`gatsby-browser.js`

```
const React = require('react');
const Layout = require('./src/components/Layout').default;

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
```

* Remove Layout from all other pages

## And now each of our pages look like this (no longer using `Layout`)

`pages/slicemasters.js`

```
import React from 'react';

export default function SlicemastersPage() {
  return <p>The slicemasters page</p>;
}

```

## Better to return React fragment
```
import React from 'react';

export default function SlicemastersPage() {
  return (
    <>
      <p>The slicemasters page</p>;
    </>
  );
```

* Helps to prevent the "can't return two or more things (adjacent jsx error)"

## gatsby-browser vs gatsby-ssr.js
* The above only runs in the browser
* But we also need to put it in `gatsby-ssr.js`
* **note** gatsby-browser.js will run once that page has been loaded and once the page has been generated in the browser
    - But Gatsby also generates everything on the server (so that it is server rendered and really fast)
        + So we need to create another file in our root called `gatsby-ssr.js`
        + And paste the exact `gatsby-browser.js` contents into `gatsby-ssr.js`
        + **note** Even better is to create another file with a function and import it into both files
            * **TODO** Show example of that here


