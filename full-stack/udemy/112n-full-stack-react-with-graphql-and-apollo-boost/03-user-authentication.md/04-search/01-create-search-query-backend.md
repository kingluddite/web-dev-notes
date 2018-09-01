# Create seachGenealogy query on Backend, add Apollo Query to Search Component

`Search.js`

```
import React from 'react';

import { Query } from 'react-apollo';
import { SEARCH_GENEALOGIES } from '../../queries';

const Search = () => {
  return (
    <Query query={SEARCH_GENEALOGIES}>
      {() => {
        return (
          <div className="App">
            <input type="search" />
          </div>
        );
      }}
    </Query>
  );
};

export default Search;
```

`schema.js`

```
// MORE CODE

type Query {
  getAllGenealogies: [Genealogy]
  getGenealogy(_id: ID!): Genealogy
  searchGenealogy(searchTerm: String): [Genealogy]

  getCurrentUser: User
}

// MORE CODE
```

`resolvers.js`

```
// MORE CODE

searchGenealogies: async (root, { searchTerm }, { Genealogy }) => {
  if (searchTerm) {
    // search
  } else {
    const genealogies = await Genealogy.find().sort({
      likes: 'desc',
      createdDate: 'desc',
    });
    return genealogies;
  }
},

getCurrentUser: async (root, args, { currentUser, 

    // MORE CODE
```

`queries/index.js`

```
// MORE CODE

export const SEARCH_GENEALOGIES = gql`
  query($searchTerm: String) {
    searchGenealogies(searchTerm: $searchTerm) {
      _id
      firstName
      lastName
      likes
    }
  }
`;

// Genealogies Mutations

// MORE CODE
```

`Search.js`

```
import React from 'react';

import { Query } from 'react-apollo';
import { SEARCH_GENEALOGIES } from '../../queries';

const Search = () => {
  return (
    <Query query={SEARCH_GENEALOGIES} variables={{ searchTerm: '' }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return (
          <div className="App">
            <input type="search" />
          </div>
        );
      }}
    </Query>
  );
};

export default Search;
```

* **tip** Delete all users and genealogies from mongodb
* Create a new user and add some genealogies

## Test
* View search page in console

`http://localhost:3000/search`




