# Add refetch Queries to deleteUserGenealogies Mutation
* All works great except...
* After deleting item and we go to home page, the item we deleted is still there... is it alive?... no we just need to refetch the fresh data

## Pull in the queries we need
`UserGenealogis.js`

```
import React from 'react';
import { Link } from 'react-router-dom';
// queries
import { Query, Mutation } from 'react-apollo';

// custom queries
import {
  GET_USER_GENEALOGIES,
  DELETE_USER_GENEALOGY,
  GET_ALL_GENEALOGIES, // add this
  GET_CURRENT_USER, // add this
} from '../../queries';

// MORE CODE
```

## Add refetch
* It is an array of all the queries you want to refetch
* We also are fetching GET_CURRENT_USER
    - We refetch this just in case we delete a Genealogy that we favorited
    - Because we added favorites to our user

```
// MORE CODE

<Mutation
              mutation={DELETE_USER_GENEALOGY}
              variables={{ _id: genealogy._id }}
              refetchQueries={() => [
                { query: GET_ALL_GENEALOGIES },
                { query: GET_CURRENT_USER },
              ]}
// MORE CODE
```

## Test it out
* Delete an item
* Navigate to home page and the item has been deleted
