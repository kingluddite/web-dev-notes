# Nested Pages
* Simple way create a products folder inside pages

`pages/products/latest.js`

```
import React from 'react';

const latest = () => {
  return (
    <div>
      hello from latest products
      <p>and the url is /products/latest</p>
    </div>
  );
};

export default latest;
```

* Navigate to `http://localhost:8000/products/latest` and you have your page

## Test with a query
* Create a new page `pages/products/sectional-sofa.js`

### In sandbox
* Single product this time with this query

```
query MyQuery {
  contentfulProduct(slug: {eq: "sectional-sofa"}) {
    price
    title
  }
}
```

* Gives you this data response

```
{
  "data": {
    "contentfulProduct": {
      "price": 9.99,
      "title": "sectional sofa"
    }
  }
}
```

* Let's add an alias so we can call this `product` instead of `contentfulProduct`

```
query MyQuery {
  product: contentfulProduct(slug: {eq: "sectional-sofa"}) {
    price
    title
  }
}
```

* And the data response now is:

```
{
  "data": {
    "product": {
      "price": 9.99,
      "title": "sectional sofa"
    }
  }
}
```

## Let's use code exporter
* Make sure to set up Page query

```
import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    product: contentfulProduct(slug: {eq: "sectional-sofa"}) {
      price
      title
    }
  }
`

export default ComponentName
```

* http://localhost:8000/products/sectional-sofa/ will show you the data

## Let's add a more sophisticated return
```
import React from 'react';
import { graphql } from 'gatsby';

const ComponentName = ({ data }) => {
  return (
    <div>
      <h2>{data.product.title}</h2>
      <h2>$ {data.product.price}</h2>
    </div>
  );
};

export const query = graphql`
  {
    product: contentfulProduct(slug: { eq: "sectional-sofa" }) {
      price
      title
    }
  }
`;

export default ComponentName;

```

* And you'll see title and price on `http://localhost:8000/products/sectional-sofa/`
* If you navigate to products and click more details link you'll see the sectional sofa page

## Houston we have a problem
* What if we have 50,000 pages --- are we going to do this manually for every page?
* And what if we delete data in contentful, do I have to look through all my pages and delete that specific one?

## Even though it is a legit approach to creating pages
* It does not work when you are getting data from an external source and then you are setting up pages based on that source
* A more sane approach would be to set up pages programattically

## Next
* Setting up pages programmatically

