# Navbar
* Create a `components` folder
    - This is a common naming convention in React
    - Components are spelled with a capital letter (another React common naming convention)

`src/components/Navbar.js`

```
import React from 'react';
import { Link } from 'gatsby';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

```

* **note** Default exports can be named whatever you want when you import
* `./` is a relative path to the folder that I'm currently in

## Add Navbar component to our home page
`index.js`

```
import React from 'react';
import { Link } from 'gatsby';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <div>
        <a href="https://cnn.com">CNN</a>
      </div>
      <Link to="/blog">Blog</Link>
    </div>
  );
}
```


