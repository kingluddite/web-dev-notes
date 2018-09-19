# Map over Genealogies and Create Genealogy Item Component
* Right now we have a `<p>Genealogies</p>`

`App.js`

```
// MORE CODE

console.log(data);

        return <p>Genealogies</p>;
      }}
    </Query>
  </div>
);
export default App;
```

* Replace `p` with an unordered list of Genealogy content

`App.js`

```
// MORE CODE

return (
          <ul>
            {data.getAllGenealogies.map(genealogy => (
              <li>{genealogy.firstName}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);
export default App;
```

* Whenever we output a list of items we need to use a unique key to prevent a warning about inefficient use of react
* To make react fast you need to add key `prop`
* If you do not see anything new on the home page make sure you add a Genealogy (at least one)
* Add another Genealogy (use graphiql to add this as we didn't create a form yet)

## Add an _id (will help us get rid of "key" prop error)
* We don't have an `_id` yet
* Expand getAllSongs inside the console and you will see there is not `_id`

`src/queries/index.js`

```
// MORE CODE

// Genealogy Queries
export const GET_ALL_GENEALOGIES = gql`
  query {
    getAllGenealogies {
      _id
      firstName
      lastName
      likes
      createdDate
    }
  }
`;

// MORE CODE
```

* Refresh home page and you'll see we now have `_id`
* Also confirm that `_id` is on **Genealogy** model

`schema.js`

```
// MORE CODE

type Genealogy {
  _id: ID,
  firstName: String!
  lastName: String!
  dateOfBirth: String
  description: String
  createdDate: String
  likes: Int
  username: String
}

// MORE CODE
```

* Remove unnecessary fields in `getAllGenealogies`

`index.js`

```
// MORE CODE

// Genealogy Queries
export const GET_ALL_GENEALOGIES = gql`
  query {
    getAllGenealogies {
      _id
      firstName
      lastName
    }
  }
`;
```

## Add key prop
`App.js`

```
// MORE CODE

return (
          <ul>
            {data.getAllGenealogies.map(genealogy => (
              <li key={genealogy._id}>{genealogy.firstName}</li>
            ))}
          </ul>
        );

// MORE CODE
```

# Refresh browser
* We now only see `_id`, `firstName`, and `lastName`
* Our `unique key` warning is gone

## Make `li` it's own component
`App.js`

```
// MORE CODE
import GenealogyItem from './Genealogy/GenealogyItem';

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_GENEALOGIES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return (
          <ul>
            {data.getAllGenealogies.map(genealogy => (
              <GenealogyItem key={genealogy._id} {...genealogy} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);
export default App;
```

`components/Genealogy/GenealogyItem.js`

```
import React from 'react';

const GenealogyItem = ({ firstName, lastName }) => {
  return (
    <li>
      <h4>
        {firstName} {lastName}
      </h4>
    </li>
  );
};

export default GenealogyItem;
```
