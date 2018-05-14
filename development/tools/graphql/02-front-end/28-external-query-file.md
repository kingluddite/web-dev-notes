# External Query file
* Delete bad data from authors field to make sure your dropdown looks good with all proper authors data
* this will help organize your code by making it easier to maintain
* We will cut out our graphql queries and put them in `src/queries/queries.js`

`src/queries/queries.js`

```
import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
```

`AddBook.js`

```
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';
// MORE CODE
```

`BookList.js`

```
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
// MORE CODE
```

