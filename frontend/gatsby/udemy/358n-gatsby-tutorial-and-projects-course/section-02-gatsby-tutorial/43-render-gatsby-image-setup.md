# render gatsby-image setup
## Create a Gatsby component with 3 images side-by-side
* One - as a simple react import
* One - Gatsby fixed
* One - Gatsby fluid

## This will highlight the benefits of using Gatsby image over a simple react import


`examples/Images.js`

```
import React from 'react';

const Images = () => {
  return <div>hello from images</div>;
};

export default Images;

```

* Add a images page

`pages/images.js`

```
import React from 'react';
import Layout from '../components/layout';
import Images from '../examples/Images';

const images = () => {
  return (
    <Layout>
      <Images />
    </Layout>
  );
};

export default images;
```

* Add a link to our navbar

`Navbar.js`

```
// MORE CODE
<li>
          <Link to="/images">Images</Link>
        </li>
        <li>
          <Link to="/examples">Examples</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

## Add the structure
`Images.js`

```
import React from 'react';
// import { graphql, useStatic } from 'gatsby';
// import Image from 'gatsby-image';
// import img from '../images/large-image.jpg';

const Images = () => {
  return (
    <section className="images">
      <article className="single-image">
        <h3>basic image</h3>
      </article>
      <article className="single-image">
        <h3>fixed image/blure</h3>
      </article>
      <article className="single-image">
        <h3>fluid image/svg</h3>
      </article>
    </section>
  );
};

export default Images;
```

## Add the CSS
* 3 columns on large page
* 1 column with 3 vertical cells on small screens

`layout.css`

```
// MORE CODE
.images {
  text-align: center;
  text-transform: capitalize;
  width: 80vw;
  margin: 0 auto 10rem auto;
}
.single-image {
  border: 3px solid red;
  padding: 1rem 0;
}
@media screen and (min-width: 992px) {
  .images {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
}
```

## Add GraphQL
* Copy and paste your query from sandbox (prettify first)
* 
