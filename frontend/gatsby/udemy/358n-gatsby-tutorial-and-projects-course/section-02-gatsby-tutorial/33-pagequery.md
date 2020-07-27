# PageQuery
* useStaticQuery hook (will be our weapon of choice)
* StaticQuery (legacy)
* PageQuery
    - **note** You can set up `StaticQuery` in the pages and in the Page components but you CAN NOT SET UP PageQuery in the components
    - **TIP** IF the file is not in the `pages` directory then YOU CAN NOT USE THE `PageQuery` in your regular component
        + But you can still use the StaticQuery if you wanted

## What is the benefit of the PageQuery?
* That we can pass in the variable
* And PageQuery allow you to set up pages programatically (we'll tackle this later)

## Let's show the author using a PageQuery
* To use the PageQuery we need to import the GraphQL tag template

`import { graphql } from 'gatsby'`

* Now we need to set up a query
    - Once we set up the query it will make automatically available our data object in the props of the component

## Let's first see what props Gatsby (by default) provides to the `page` component (component inside the pages folder)

`pages/examples.js`

```
// MORE CODE

const examples = (props) => {
  console.log(props);
  return (
    <Layout>

// MORE CODE
```

## View in client console
* You will see a bunch of props
    - children
    - location
    - navigate
    - pageContext
    - pageResources
    - path
    - pathContext
    - uri

## But we want `data`
* And by default there is not `data` prop
* We get data prop by setting up our GraphQL
* We need to export data and use our graphql and backticks and paste in our query

`examples.js`

* And now we have access to the `data` prop

```
import React from 'react';
import { graphql } from 'gatsby';
import Header from '../examples/Header';
import HeaderStatic from '../examples/HeaderStatic';
import Layout from '../components/layout';

const examples = (props) => {
  console.log(props);
  return (
    <Layout>
      <h1>Hello from examples page</h1>
      <Header />
      <HeaderStatic />
    </Layout>
  );
};

export const data = graphql`
  query myQuery {
    site {
      info: siteMetadata {
        person {
          age
          name
        }
        author
        data
        description
        title
      }
    }
  }
`;

export default examples;
```

## An alternate way to destructure
* Pull the `data` out from props then inside the function destructure data

`examples.js`

```
import React from 'react';
import { graphql } from 'gatsby';
import Header from '../examples/Header';
import HeaderStatic from '../examples/HeaderStatic';
import Layout from '../components/layout';

const examples = ({ data }) => {
  const {
    site: {
      info: { author },
    },
  } = data;

  return (
    <Layout>
      <h1>Hello from examples page</h1>
      <h2>
        <strong>Author: </strong> {author}
      </h2>
      <Header />
      <HeaderStatic />
    </Layout>
  );
};

export const data = graphql`
  query myQuery {
    site {
      info: siteMetadata {
        person {
          age
          name
        }
        author
        data
        description
        title
      }
    }
  }
`;

export default examples;
```

* And you'll see the author's name in the UI

## Recap: When we set up the page query
1. We import `graphql`
2. We set up our query (BUT WE MUST EXPORT OUR VARIABLE)
3. We set our variable equal to GraphQL with backticks and use our GraphQL query inside the backticks
4. Once we pass in our query then we'll have access to our `data` object
5. Then we decide how to access the data
    * Drill down the long way
    * Destructure for easier access to our data

## Remember query names must be unique and we will get an error if we use FirstQuery (it will be in examples.js and in Header.js)

`Header.js`

```
// MORE CODE

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const getData = graphql`
  query FirstQuery {
    site {
      info: siteMetadata {
        author
        data
        description
        title
        person {
          age
          name
        }
      }
    }
  }
`;

const Header = () => {

// MORE CODE
```

`examples.js`

```
// MORE CODE
const examples = ({ data }) => {
  const {
    site: {
      info: { author },
    },
  } = data;

  return (
    <Layout>
      <h1>Hello from examples page</h1>
      <h2>
        <strong>Author: </strong> {author}
      </h2>
      <Header />
      <HeaderStatic />
    </Layout>
  );
};

export const data = graphql`
  query FirstQuery {
    site {
      info: siteMetadata {
        person {
          age
          name
        }
        author
        data
        description
        title
      }
    }
  }
`;

export default examples;
```

## Houston we have a problem!
* And you will get an error with `Multiple "root" queries found: "FirstQuery" and "FirstQuery". Only the first ("FirstQuery") will be registered.`
* **note** The error code gives a recommendation to fix the code by entering a unique name for the query

![error code tip](https://i.imgur.com/guSAiYd.png)



