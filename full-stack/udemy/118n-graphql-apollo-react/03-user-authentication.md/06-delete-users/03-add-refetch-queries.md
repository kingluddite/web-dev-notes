# Add refetch Queries to `deleteUserColognes` Mutation
* All works great except...
* After deleting item and we go to home page, the item we deleted is still there... is it alive?
* NO! We just need to `refetch` the **fresh data**

## Pull in the queries we need
`UserColognes.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

// queries
import { Query, Mutation } from 'react-apollo';

// custom queries
import {
  GET_USER_COLOGNES,
  DELETE_USER_cologne,
  GET_ALL_COLOGNES, // add this
  GET_CURRENT_USER, // add this
} from '../../queries';

// MORE CODE
```

## Add refetch
* It is an array of all the queries you want to refetch
* We also are fetching `GET_CURRENT_USER`
    - We refetch this just in case we delete a cologne that we favorited
    - Because we added favorites to our user

```
// MORE CODE

<Mutation
  mutation={DELETE_USER_COLOGNE}
  variables={{ _id: cologne._id }}
  refetchQueries={() => [
    { query: GET_ALL_COLOGNES },
    { query: GET_CURRENT_USER },
  ]}

// MORE CODE
```

## Test it out
* Delete an item
* Navigate to home page and the item has been deleted
