# Query backend for Cologne
* We can use the `_id` to get the document
* We are getting `warnings` that `match` and `_id` are defined but not used
  - We can ignore them for now

## Create query in schema
* To find a Cologne we just need an `_id`

`schema.js` (getCologne)

```
// MORE CODE

type Query {
    getAllColognes: [Cologne]
    getCologne(_id: ObjectID!): Cologne // add this
    getCurrentUser: User
  }

  // MORE CODE
```

## Now build query in our `resolvers.js`

```
 // MORE CODE

getCologne: async (root, { _id }, { Cologne }) => {
  const cologne = await Cologne.findOne({ _id });
  return cologne;
},

getCurrentUser: async (root, args, 

    // MORE CODE
```

## Now let's see if `getCologne` has been added to our documentation

`http://localhost:4444/graphql`

## Try query to see if it works
* Click green `SCHEMA` button
* Click on `getCologne` in the `graphql` docs
* You will see all the fields of `Cologne`

![all Cologne fields](https://i.imgur.com/IyMOEVQ.png)

## Build it in `graphql`
* In order to build this we need an `_id` in a document from our `colognes` collection
* We could log into `mLab` and find it but there is an easier way:

### Find an _id, the easy way... through the URL
* View the home page of our app
* Click on one of the cologne links
* After clicking on the link you will see the page is now the single page and the URL in the browser will look similar to:

`http://localhost:3000/cologne/5bb83690d57663dee0e4c7b2`

* This is the `_id` we need: `5bb83690d57663dee0e4c7b2`
  - Obviously your `_id` will be different
  - Copy that `_id` to your clipboard

## Now we are ready to build our GraphQL query

`http://localhost:4444/graphql`

### Write our graphql
```
query($_id: ObjectID!) {
  getCologne(_id: $_id) {
    _id
    scentName
    scentPrice
    createdDate
    description
    likes
  }
}
```

* Write our variables
  - Paste your `_id` into the value below and enter it into your GraphQL GUI
  - (_obviously your `_id` will be different_)

```
{
  "_id": "5bb83690d57663dee0e4c7b2"
}
```

* Click `play` button

### Output from graphql will look similar to: (below)

```
{
  "data": {
    "getCologne": {
      "scentName": "L'eau D'issey (issey Miyake)",
      "scentPrice": 16,
      "createdDate": "1538799248627",
      "description": null,
      "likes": 0
    }
  }
}
```

## Reuse your GUI code
* Copy and Paste the query in your GraphQL GUI into `index.js`
* Make sure to click `Prettify` button first to make you code clean
    - **note** If you have `eslint` and `prettier` set up it will format it after you paste and save inside `queries/index.js`

`queries/index.js`

* First write the `export` code needed to use your query on other parts of your app

```
// MORE CODE

export const GET_Cologne = gql`
  
`;

// MORE CODE
```

* Now paste in your GUI code to make it look like this:

```
// MORE CODE

export const GET_Cologne = gql`
  query($_id: ObjectID!) {
    getCologne(_id: $_id) {
      _id
      scentName
      scentPrice
      createdDate
      description
      likes
    }
  }
`;

// MORE CODE
```

## But our variable `_id` is missing?
* Yes and if you noticed this, that is great!
* We need a way of injecting this variable but we need to answer 2 questions:

1. Where do we inject the `_id` variable? (**ColognePage.js**)
2. How do we inject the `_id` variable? (**Inside our Query**)

## Update ColognePage.js

`ColognePage.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// GraphQL
import { Query } from 'react-apollo';
import { GET_COLOGNE } from '../../queries';

class ColognePage extends Component {
  render() {
    const { match } = this.props;
    const { _id } = match.params;

    return (
      <Query query={GET_COLOGNE} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          console.log(data);

          return <div>ColognePage</div>;
        }}
      </Query>
    );
  }
}

export default withRouter(ColognePage);
```

* Import `Query` from **react-apollo**
    - Pass `query` prop of `GET_COLOGNE`
* Import `GET_COLOGNE` from queries
* Inside **return** Replace `div` with `QUERY` component

### Add `render props` inside Query
* Make sure to destructure `data`, `loading` and `error`
* Return what we returned before
* Also need to pass `variables` prop and its value will be `_id`
* Check for `loading` and `error`
* log out `data` to test if proper `data` is coming back
  - The `data` coming back should be the single document we are querying for

### Time to test it out
* Visit a single page route
* **Remember** Your `_id` at the end of the URL will be different so swap your `_id` in for the one I am using below

`http://localhost:3000/cologne/5b7721b8b2f9066cad5f7ad8`

* Refresh the browser
* You will now see `getCologne` in the console
* Expand it and you will see all the info returned from our single cologne query (That is what is inside the `data` object inside our response object from our server)
## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add query backend for cologne`

## Push to github
`$ git push origin auth`

## Next - Output single cologne data on our UI
