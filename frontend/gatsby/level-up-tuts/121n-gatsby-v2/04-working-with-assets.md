# Working with Assets
* Instead of using a path to an asset in a static folder we will import in a JavaScript style import and this will enable Gatsby to better manage these assets
    - It could reduce your HTTP request by turning your image into a data-uri
        + it will do this if your image is < 10K bytes

`components/header.js`

```
import React from 'react';
import { Link } from 'gatsby';

// images
import GatsbyLogo from '../images/gatsby-icon.png';

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <img style={{ width: '100px' }} src={GatsbyLogo} alt="Gatsby Logo" />
        </Link>
      </h1>
    </div>
  </div>
);

export default Header;
```

* View the image code using Chrome Dev Tools (CDT)
* You will see a path like this:

`http://localhost:8000/static/gatsby-icon-4a9773549091c227cd2eb82ccd9c5e3a.png`

* **note** It is not serving it from `src/images`
    - Instead it is server it from `/static/gatsby-icon-...` (some long string)
    - That long string serves a purpose and that purpose is caching
    - The next time we view this image, it will be cached but if the image changes the string will change and the image will no longer be cached
        + When developing your site an old problem was the cache. You made a change to the image but it had the same name so it was cached by the browser but you didn't want it to be cached
            * The solution was to clear the cache but this was annoying and time consuming
            * A better solution was **cache-busting** with random strings tied to image names
* Gatsby recommends importing all your images as it is a huge performance gain
* Other stuff you import like this:
    - videos
    - photos
    - fonts
    - pictures
    - logos
    - svg content
    - sounds
    - But there is also a type of "escape hatch" called the `static` folder

## The `static` folder
* If you create a `static` folder (it is not created by default)
* All assets inside the `static` folder are NOT PROCESSED by Webpack
    - Not recommended to use it unless you need it
    - Use case is small
    - If you need it just create a `static` folder in the root of your Gatsby project
        + Placing them in this folder will have Gatsby move them to the `public` folder upon build, it won't modify them, change the paths
        + The `public` folder is where your site files will be served from
        + But you will need to import a `withPrefix` function from gatsby 

## Next - Gatsby data layer ... GraphQL
