# useStaticQuery and graphql
`pages/examples.js`

```
import React from 'react';
import Header from '../examples/Header';
import Layout from '../components/layout';

const examples = () => {
  return (
    <Layout>
      <h1>Hello from examples page</h1>
      <Header />
    </Layout>
  );
};

export default examples;
```

## Now let's handcode our useStaticQuery hook
* We need to import two named exports  from Gatsby:

1. `useStaticQuery` hook (which is a React hook)
    * **note** All the standard React hooks rules apply
        - example
            + We can only run it within the functional component
            + Also we can only run it inside the function (if you try to run it outside you will get an error)
2. `graphql` (a tagged template GraphQL function)
    * Similar to when we used styled-components because there we also use tagged template

`button.js`

* The tagged template is the backticks
* We passed in css but with gatsby we'll pass in the graphql query

```
import styled from 'styled-components';

const ExampleButton = styled.button`
  background: green;
  color: orange;
  font-size: 2rem;
`;

export default ExampleButton;
```

`Header.js`

```
import React from 'react';
import { useStaticQuery, grapqhl } from 'gatsby';

// MORE CODE
```

## Now we have two steps
1. We need to set up our GraphQL query
2. Then we want to invoke `useStaticQuery`, pass the query and it will return our `data` object

### Multiple ways to do this
* We could use the way that Code Exporter does

```
// MORE CODE

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ComponentName = () => {
  const data = useStaticQuery(graphql`
    {
      site {
// MORE CODE
```

* But let's use an alternative way

```
const getData = graphql``;
```

* Now we copy our our GraphQL from our sandbox (just copy all code from the curly braces and paste inside like this:)

```
// MORE CODE

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const getData = graphql`
  {
    site {
      siteMetadata {
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
// MORE CODE
```

## Now we need to use `useStaticQuery` pass in our getData and store in the standard `data` variable like this:

`Header.js`

```
// MORE CODE

const Header = () => {
  const data = useStaticQuery(getData);
  console.log(data);

  return (
    <div>
      <h1>This in our heading</h1>
      {/* <h2>{data.site.siteMetadata.person.name}</h2> */}
    </div>
  );
};

export default Header;
// MORE CODE
```

* And you'll see the data in the client console

## Accessing the data
* It's just a JavaScript thing
* You decide how you want to extract the data

### the long way
```
// MORE CODE

return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <h2>{data.site.siteMetadata.person.name}</h2>
    </div>
  );

// MORE CODE
```

* Or use destructuring

```
// MORE CODE

const Header = () => {
  // const data = useStaticQuery(getData);
  const {
    site: {
      siteMetadata: {
        title,
        person: { name },
      },
    },
  } = useStaticQuery(getData);

  // console.log(data);

  return (
    <div>
      {/* <h1>{data.site.siteMetadata.title}</h1>
      <h2>{data.site.siteMetadata.person.name}</h2> */}
      <h1>{title}</h1>
      <h1>{name}</h1>
    </div>
  );
};
// MORE CODE
```

