# Pages in Gatsby
Copy `index.js` and name the file (name of file is in URL) to get to that page

## Create a page
* Set up a react component and export it

`src/pages/index.js`

```
import React from 'react';

export default function Home() {
  return <div>Hello world!</div>;
}
```

* You could set up CBCs or FSCs but with React Hooks most of the time you'll set up all your pages and components as FSCs
* Whatever we `return` from our component will be displayed on our page
* This is React so we can also set up a `components` folder and import any component we want

## Create 2 additional pages
* blog.js
* products.js
* Keep pages lowercase

`rafce` snippet

`pages/blog.js`

```
import React from 'react';

const blog = () => {
  return (
    <div>
      <h1>Blog</h1>
    </div>
  );
};

export default blog;
```

`pages/products.js`

```
import React from 'react';

const products = () => {
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
};

export default products;
```

## 404 page
* Got to a non-existent page `/junk` you will get an ugly 404
* To get a nice 404 name the page `404.js`
* We can name a file based on a number `404.js` but we can store variables inside number `const 404 = 86` so we can call this variable `NotFound`

`404.js`

```
import React from 'react';

const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
```

* Search all 3 pages
    - `/blog`
    - `/products`
    - `/junk`
        + The 404 shows differently on development and it gives us info we need as a developer
          * But you can also preview the production 404 by clicking link in page not found dev
          * Or `$ gatsby build` and `$ gatsby source` to see production in development
