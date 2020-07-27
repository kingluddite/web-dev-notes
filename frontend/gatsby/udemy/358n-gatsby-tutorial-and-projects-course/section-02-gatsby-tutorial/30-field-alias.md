# Field Alias
* Saves time
* Writing long names is annoying
* example - typing `siteMetadata` is very long
    - We can type `bugsbunny` instead

## GraphQL
```
query MyQuery {
  site {
    bugsbunny: siteMetadata {
      author
    }
  }
}
```

## Output
```
{
  "data": {
    "site": {
      "bugsbunny": {
        "author": "@johndoe"
      }
    }
  }
}
```

* But `bugsbunny` isn't semantic
* This would be better

## GraphQL
```
query MyQuery {
  site {
    info: siteMetadata {
      author
    }
  }
}
```

## Output
```
{
  "data": {
    "site": {
      "info": {
        "author": "@johndoe"
      }
    }
  }
}
```

## Let's add it to Header.js
`Header.js`

```
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const getData = graphql`
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
`;

const Header = () => {
  // const data = useStaticQuery(getData);
  const {
    site: {
      info: {
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

export default Header;
```

* And it works
* **caution** If you add an alias in your GraphQL make sure you change it to the alias in the destructured code
