# Layout Component
## Add a footer
`Footer.js`

```
import React from 'react';

const Footer = () => {
  return (
    <div>
      <h1>Footer</h1>
    </div>
  );
};

export default Footer;
```

## Add to home page
`index.js`

```
import React from 'react';
import { Link } from 'gatsby';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <div>
        <a href="https://cnn.com">CNN</a>
      </div>
      <Link to="/blog">Blog</Link>
      <Footer />
    </div>
  );
}
```

## Better option to create a component that will wrap all our pages and that is what Layout does
* You can name it whatever you want but common naming convention is naming it `Layout` and this is the recommendation
* Use `<></>` React Fragment
* You can only have on parent (and that is why you have `div` soup) but with Fragments you create a container that does not render but you don't get the "must have parent component" error
* Why is the must have parent component because at end of day a return must return one thing from the `return`

## components/layout.js
```
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const layout = () => {
  return (
    <>
      <Navbar />
      content
      <Footer />
    </>
  );
};

export default layout;
```

* Now we import `layout in all our pages`

`pages/products.js`

```
import React from 'react';
import Layout from '../components/layout';

const products = () => {
  return (
    <Layout>
      <h1>Products</h1>
    </Layout>
  );
};

export default products;
```

## Problem - the content is not showing for each page!

## children
* Specific prop to render children of layout
* `props.children` but we can destructure as `({ children })`

`layout.js`

```
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
```

