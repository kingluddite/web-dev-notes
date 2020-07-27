# Code Exporter - useStaticQuery
* Close Explorer
* Open Code Exporter and choose `JavaScript` and `StaticQuery hook`

`examples/Header.js`

* It names it default `ComponentName` since it is a default it doesn't matter

```
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ComponentName = () => {
  const data = useStaticQuery(graphql`
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
  `)
  return <pre>{JSON.stringify(data, null, 4)}</pre>
}

export default ComponentName
```

## Now import Header into our examples page
`pages/examples.js`

```
import React from 'react';
import Header from '../examples/Header';

const examples = () => {
  return (
    <div>
      <h1>Hello from examples page</h1>
      <Header />
    </div>
  );
};

export default examples;
```

* You will see the JSON inside the examples page
* This is possible because we are stringifying our code and rendering to the page

`examples/Header.js`

```
// MORE CODE

 return <pre>{JSON.stringify(data, null, 4)}</pre>;
// MORE CODE
```

## Show how you can render a name from the person object inside siteMetadata
`Header.js`

```
// MORE CODE

  return (
    <div>
      <h2>{data.site.siteMetadata.person.name}</h2>
      <h2>{data.site.siteMetadata.person.age}</h2>
    </div>
  );
};

export default ComponentName;
```

