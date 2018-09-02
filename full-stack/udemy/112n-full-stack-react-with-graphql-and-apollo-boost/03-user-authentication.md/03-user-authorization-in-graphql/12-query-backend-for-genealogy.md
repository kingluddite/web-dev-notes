# Query backend for Genealogy
* We can use the `_id` to get the document

## Create query in schema
* To find a Genealogy we just need an `_id`

`schema.js` (getGenealogy)

```
// MORE CODE

type Query {
    getAllGenealogies: [Genealogy]
    getGenealogy(_id: ID!): Genealogy
    getCurrentUser: User
  }

  // MORE CODE
```

## Now build query in our `resolvers.js`

```
 // MORE CODE

getGenealogy: async (root, { _id }, { Genealogy }) => {
  const genealogy = await Genealogy.findOne({ _id });
  return genealogy;
},

getCurrentUser: async (root, args, 

    // MORE CODE
```

`http://localhost:4444/graphiql`

* Look for `getGenealogy` in the docs of **graphiql**

## Try query to see if it works
* Build it in graphiql
* Click in docs to get all the fields of `Genealogy`

![all genealogy fields](https://i.imgur.com/RY1PXja.png)

## Test it out
* Click on link to get to single page with `_id` in URL
* `http://localhost:3000/genealogy/5b7721b8b2f9066cad5f7ad8`

## Open graphiql
`http://localhost:4444/graphiql`

### Write our graphiql
```
query($_id: ID!) {
  getGenealogy(_id: $_id) {
    _id
    firstName
    lastName
    dateOfBirth
    description
    createdDate
    likes
  }
}
```

* Write our variables

```
{
  "_id": "5b7721b8b2f9066cad5f7ad8"
}
```

* Click execute/play button (obviously your `_id` will be different)

### Output from graphiql will look similar to: (below)

```
{
  "data": {
    "getGenealogy": {
      "_id": "5b7721b8b2f9066cad5f7ad8",
      "firstName": "Phil",
      "lastName": "Hawley",
      "dateOfBirth": null,
      "description": null,
      "createdDate": "Fri Aug 17 2018 20:27:52 GMT+0100 (Irish Standard Time)",
      "likes": 0
  }
}
}
```

## Copy and Paste into `index.js` inside queries
* Make sure to click `Prettify` button first to make you code clean
* But if you have eslint and prettier set up it will format it after you paste and save inside `queries/index.js`

`queries/index.js`

```
// MORE CODE

export const GET_GENEALOGY = gql`
  query($_id: ID!) {
    getGenealogy(_id: $_id) {
      _id
      firstName
      lastName
      dateOfBirth
      description
      createdDate
      likes
    }
  }
`;

// MORE CODE
```

## Update GenealogyPage
* Import `Query` from **react-apollo**
    - pass `query` prop of GET_RECIPE
* import GET_RECIPE from queries
* Inside **return** Replace `div` with `QUERY` component
    - Add render props inside Query
    - Make sure to destructure `data`, `loading` and `error`
    - Return what we returned before
    - Also need to pass variables prop and its value will be `_id`
    - Check for `loading` and `error`
    - log out `data` to test if proper data is coming back (the single document we are querying for)

`GenealogyPage`

```
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_GENEALOGY } from './../../queries';

const GenealogyPage = ({ match }) => {
  const { _id } = match.params;
  // console.log(match.params._id);
  return (
    <Query query={GET_GENEALOGY} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return <div>Genealogy Page</div>;
      }}
    </Query>
  );
};

export default withRouter(GenealogyPage);
```

`http://localhost:3000/genealogy/5b7721b8b2f9066cad5f7ad8`

* Refresh
* You now see all the content we want for this `Genealogy`
