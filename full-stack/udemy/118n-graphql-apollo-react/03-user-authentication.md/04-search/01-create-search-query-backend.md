# Create `seachGenealogy` query on Backend, add Apollo Query to Search Component

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
  searchGenealogies(searchTerm: String): [Genealogy]

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

* **tip** Delete all users and genealogies from mongodb (mLab or local)
* Create a new user and add some genealogies

## Test
* View search page in console

`http://localhost:3000/search`

## Output Genealogies we are getting back
`Search.js`

```
// MORE CODE

const Search = () => {
  return (
    <Query query={SEARCH_GENEALOGIES} variables={{ searchTerm: '' }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return (
          <div className="App">
            <input type="search" name="search" id="search" />
            <ul>
              {data.searchGenealogies.map(genealogy => (
                <li key={genealogy._id}>
                  <h4>
                    {genealogy.firstName} {genealogy.lastName}
                  </h4>
                  <p>{genealogy.likes}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
    // MORE CODE
```

## Test in browser
* You will see the names and the likes under the names on the search page

## Link to the individual genealogies
`Search.js`

```
// MORE CODE

import { Link } from 'react-router-dom'; // add this
import { SEARCH_GENEALOGIES } from '../../queries';

const Search = () => {
  // MORE CODE

        return (
          <div className="App">
            <input type="search" name="search" id="search" />
            <ul>
              {data.searchGenealogies.map(genealogy => (
                <li key={genealogy._id}>
                  <Link to={`/genealogy/${genealogy._id}`}>
                    <h4>
                      {genealogy.firstName} {genealogy.lastName}
                    </h4>
                  </Link>
                  <p>{genealogy.likes}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};
export default Search;
```

## Test
* The names are now links
* Click on a name and you'll be taken to the single genealogy page

## Next - Indexing and Seaching on input change
