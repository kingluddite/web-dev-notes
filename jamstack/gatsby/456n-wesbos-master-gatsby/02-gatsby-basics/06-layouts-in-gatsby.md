# Layouts in Gatsby
* **West Practice** auto import (you type your component and this keyboard shortcut shows items, select the component and it will automatically add the import)
  - (VS Code) ctrl + space brings up "code actions" click cube icon to auto import
* You can auto import in Vim (pulls in function but works)

## Self closing React component verses open and close
* You can do either
* If you open and close it means that you expect the component to have `children`

`components/Layout.js`

```
import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout() {
  return (
    <div>
      <Nav />
      <p>I am page content</p>
      <Footer />
    </div>
  );
}

```

## How do we use this Layout?
* We surround our pages with the `Layout` component

`pages/index.js`

```
import React from 'react';
import Layout from '../components/Layout';
import Nav from '../components/Nav';

export default function HomePage() {
  return (
    <Layout>
      <Nav />
      <p>Home page is using hot reloading</p>
    </Layout>
  );
}
```

## props - how do we get the content that was passed down
* Or put inbetween the Layout tag for each one?
* To figure this out we can use `prop`
  - Every React component will react something called `props`
    + `props` are things that are passed to the componet

```
import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout(props) {
  console.log(props);
  return (
    <div>
      <Nav />
      <p>I am page content</p>
      <Footer />
    </div>
  );
}
```

* And let's pass `props` into a page using `Layout` (home page)

```
import React from 'react';
import Layout from '../components/Layout';
import Nav from '../components/Nav';

export default function HomePage() {
  return (
    <Layout age={100} name="joe">
      <Nav />
      <p>Home page is using hot reloading</p>
    </Layout>
  );
}

```

### children
* And you will see `children`, and age and name in console of chrome inspector
  - We just care about the children
    + Which is the Nav and Paragraph of content

```
import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout(props) {
  console.log(props);
  return (
    <div>
      <Nav />
      {props.children}
      <Footer />
    </div>
  );
}

```

### We can destructure

```
import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout({ children }) {
  // console.log(props);
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
```

## Tip
* Make sure the type of page is JavaScript React for proper syntax highlighting

## default props
* Eslint can notify you about prop types (currently not)
  - If you want to require prop types
  - Currenty we have them not required

`package.json`

* Wes overrides the default airbnb eslint config to turn it off but you can remove this code if you want prop-types to be required

```
// MORE CODE

  "eslintConfig": {
    "extends": [
      "wesbos"
    ],
    "rules": {
      "react/prop-types": 0
    }
  },

// MORE CODE
```

* You can use TypeScript instead of prop-types

## Do you want to have to wrap `<Layout>` around all elements
* You can or you can use 2 special gatsby files
  - This will save us time
  - These Gatsby Custom files will automatically wrap them for us
  - I just went into all files and manually wrapped content in Layout tags
  - We can save time with the following:

1. `gatsby-browser.js`
  * Specific Gatsby file that allows us to hook into different APIs of Gatsby if we need to
    - By default Gatsby won't wrap pages in a component but if we want to we can hook into the `wrapPageElement` Hook and Gatsby will automatically do that for us so we don't have to do it for every page
    - [wrapPageElement docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement)

`gatsby-browser.js`

* Will only run in the browser

```
const React = require('react');

export function wrapPageElement({ element, props }) {
  return <div>Yo</div>;
}
```

* You need to stop and start dev gatsby again
  - May change in future that you won't have to restart Gatsby
  - We need to pass our element we want to wrap `Layout` and spread the props

```
import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
```

* Docs don't use import as we are using special way to use import
* We delete all occurences of `Layout` in our pages
* **TODO** You will see a `props` spreading prohibited
* In all our pages we'll add a React Fragment
  - "ghost element"
  - It will allow us to return 2 elements at once
    + If you didn't use fragment and tried to return 2 adjacent JSX elements you would get an error

## Adding the fragment
* Add fragement to all pages

```
import React from 'react';

export default function NotFound() {
  return (
    <>
      <p>Page Not Found</p>
    </>
  );
}
```

## gatsby-ssr.js
* **TODO** You could import the function and export it directly if you want
  - But we will keep it simple

```
import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
```

## Next - Styles in Gatsby
