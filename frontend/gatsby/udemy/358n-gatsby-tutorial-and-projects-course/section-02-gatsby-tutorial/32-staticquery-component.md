# StaticQuery component
* This is the OLD way but good to know
    - We will be using `useStaticQuery` hook
* In GraphQL sandbox grab the StaticQuery code from Code Exporter

`examples/HeaderStatic.js`

* Here we import the whole component `StaticQuery` (not the react hook useStaticQuery)
* We also grab the `graphql` (the tag template literal)
* How it works
  - We set up our component `StaticQuery`
    + That component has two props:
      * `query` prop (we pass in our GraphQL)
        - **note** You were required to name it `query`
        - With useStaticQuery we set up a variable and passed it directly to `useStaticQuery`
        - You could have also put the GraphQL in a variable and referenced the variable
      * `render` is the other prop
        - This was the strange one because `render` was the render props
          + This means we have our render props `render=` and what we are getting back is a function
            `render={data => <pre>{JSON.stringify(data, null, 4)}</pre>}`
          + This means whatever we return from the render() will be displayed in our UI
          + **note** render props is not unique to Gatsby or React, it was used a lot prior to React hooks

```
import React from "react"
import { StaticQuery, graphql } from "gatsby"

const ComponentName = () => (
  <StaticQuery
    query={graphql`
      {
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
    `}
    render={data => <pre>{JSON.stringify(data, null, 4)}</pre>}
  ></StaticQuery>
)

export default ComponentName
```

## And render our StaticQuery object
`examples.js`

```
import React from 'react';
import Header from '../examples/Header';
import HeaderStatic from '../examples/HeaderStatic';
import Layout from '../components/layout';

const examples = () => {
  return (
    <Layout>
      <h1>Hello from examples page</h1>
      <Header />
      <HeaderStatic />
    </Layout>
  );
};

export default examples;
```

* You should see the `StaticQuery` object

`HeaderStatic.js`

```
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const ComponentName = () => (
  <StaticQuery
    query={graphql`
      {
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
    `}
    render={(data) => <h4>{data.site.info.description}</h4>}
  />
);

export default ComponentName;
```

* Now you'll see the description on the page
