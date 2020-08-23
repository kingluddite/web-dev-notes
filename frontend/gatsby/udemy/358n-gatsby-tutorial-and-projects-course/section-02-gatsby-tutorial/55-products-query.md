# Products Query
* Open sandbox and we now have a bunch of Contentful queries

## allContentfulProduct
* Returns the list of products

## contentfulProduct
* Contains info about the single product

## `all` vs `contentful`
* all === list
* contentful === single

## dummy src
* We can't use fragments in sandbox so we just use fluid and drill down to src

## property names
* Our sandbox contentful product property names mirrors what we created in contentful dashboard

## long text
* **note** Little different here
    - We used long text so we need to drill down inside `info` and the subfield inside that of `info`

#
```
query MyQuery {
  allContentfulProduct {
    nodes {
      title
      price
      slug
      info {
        info
      }
      image {
        fluid {
          src
        }
      }
    }
  }
}
```

* That gives us all the data we need

## Code Exporter
* Let's use this first but copy and paste is a better option
* Copy code and replace all code in `pages/products.js`
* Browse to [http://localhost:8000/products](http://localhost:8000/products)
    - You will see all our project data
* Fragment save so much time
    - If we had to manually add all the fluid data it would take so long and lead to lots of errors, so fragments are amazing

`products.js`

```
import React from 'react';
import { graphql } from 'gatsby';
// import Image from 'gatsby-image';

import Layout from '../components/layout';
import styles from '../components/products.module.css';

const ComponentName = () => {
  return (
    <Layout>
      <section className={styles.page}>
        <h1>Hello from products</h1>
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allContentfulProduct {
      nodes {
        title
        price
        info {
          info
        }
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        slug
      }
    }
  }
`;

export default ComponentName;
```

`components/products.module.css`

```
.page {
  background: yellow;
}

.page h1 {
  color: red;
}

.text {
  text-transform: uppercase;
}
```

## Destructure and plop off `products` as alias

`products.js`

```
// MORE CODE

const ComponentName = ({ data }) => {
  const {
    allContentfulProduct: { nodes: products },
  } = data;
  console.log(products);
// MORE CODE
```

* In the console you'll see we get our array of 3 products
* And since it is an array we can use `map()`

```
// MORE CODE

const ComponentName = ({ data }) => {
  const {
    allContentfulProduct: { nodes: products },
  } = data;

  return (
    <Layout>
      <section className={styles.page}>
        {products.map((product) => {
          console.log(product);

          return <h2>{product.title}</h2>;
        })}
      </section>
    </Layout>
  );
};

export const query = graphql`
```

* You get the list error but you see 3 products

## List error
* This is React and in react if you render a list you need to give them unique values
* Contentful gives us a unique `id` we can use
    - So we need to check that to see it in sandbox then add to our GraphQL

```
// MORE CODE

return (
    <Layout>
      <section className={styles.page}>
        {products.map((product) => {
          console.log(product);

          return (
            <article key={product.id}>
              <h2>{product.title}</h2>
            </article>
          );
        })}
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allContentfulProduct {
      nodes {
        title
        id
        price
// MORE CODE
```
