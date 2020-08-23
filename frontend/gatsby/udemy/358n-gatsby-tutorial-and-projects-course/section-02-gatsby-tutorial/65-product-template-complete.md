# Product Template Complete
* Copy code in sandbox from `Code Exporter` and we'll get a bug
* Just replace products page and you'll see error
    - In exported code notice that:
        + we don't include the `query` keyword
        + The name of the query `GetSingleProduct`
        + As well as the setup of the variable

## You need to copy and paste `query GetSingleProduct($slug: String) {}`
* The copy from the `Code Exporter` looks like this:

```
import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    contentfulProduct(slug: {eq: $slug}) {
      title
      price
      image {
        fixed {
          src
        }
      }
      info {
        info
      }
    }
  }
`

export default ComponentName
```

## Houston we have a problem!
* We get this error:

![variable is not defined](https://i.imgur.com/aXlQTOT.png)

## Solution
* And we need to make it:
    - We add `query GetSingleProduct($slug: String)`

```
import React from 'react';
import { graphql } from 'gatsby';

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;

export const query = graphql`
  query GetSingleProduct($slug: String) {
    contentfulProduct(slug: { eq: $slug }) {
      title
      price
      image {
        fixed {
          src
        }
      }
      info {
        info
      }
    }
  }
`;

export default ComponentName;
```

## Navigate to single page
* Click on more details in product list page
* You will see data just for that one single product

## More meaningful return
* We need to setup the jsx to show our single product

## Add fragment
* It won't work in sandbox but it works on template

```
// MORE CODE

export const query = graphql`
  query GetSingleProduct($slug: String) {
    contentfulProduct(slug: { eq: $slug }) {
      title
      price
      image {
        fixed(width: 300) {
          ...GatsbyContentfulFixed
        }
      }
      info {
        info
      }
    }
  }
`;

// MORE CODE
```

* Look at page and you'll see lots more info you can use for your image

`src/templates/product-template.js`

