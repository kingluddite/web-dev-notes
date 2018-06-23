# Object Queries
* We'll add another query for Resolutions

## return info from a query

`register-api.js`

```
// MORE CODE
const typeDefs = [testSchema, ResolutionsSchema];

const resolvers = {
  Query: {
    hi() {
      return 'hello from your graphql';
    },
    resolutions() {
      return [{_id: '12345', name: 'Just do it task!'}];
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
```

### Update Resolutions.graphql
```
# name
# createdAt
# [todoId]

type Resolution {
  _id: String!
  name: String!
}
```

* We made Resolution singluar

### Error - Houston we have a problem!
* `Error: Query.resolutions defined in resolvers, but not in schema`

`Resolutions.graphql`

```
type Resolution {
  _id: String!
  name: String!
}
```

### This is the wrong way to fix it
* This how we would do it in JavaScript

```
type Query {
    hi: String
    resolutions: {
        _id: String
        name: String
    }
}
```

* above is wrong because we are not return and object with some strings, we are return `Resolution` which we already defined as a type of its own
* But if we did this

```
type Query {
    hi: String
    resolutions: Resolution
}
```

* But that would be wrong too because we are not just returning one resolutions, we are returning an array of resolutions
* Here is the correct solution:

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';

const testSchema = `
type Query {
 hi: String 
 resolutions: [Resolution]
}
`;
// MORE CODE
```

## Take for test drive
* Our code is working again
* Apollo dev tools doesn't work with: 

```
{
    resolutions
}
```

* and hitting play
* but if you try it in the browser `localhost:3000/graphiql` you will see an error 

![fields error](https://i.imgur.com/CSLVN4M.png)

* It needs `[Resolution]` to have a selection of subfields
* When we are doing a query of an object or an array of objects we have to specify which items in that object we want
    - this is the power of graphql
    - we only get the stuff we want and none of the stuff we don't want
    - so if we do this inside graphiql:

```
{
    resolutions {
      _id_ 
    }
}
```

* We get this output

```
{
  "data": {
    "resolutions": [
      {
        "_id": "12345"
      }
    ]
  }
}
```

* And to show you we only get what we ask for look at this:

```
{
  "data": {
    "resolutions": [
      {
        "_id": "12345",
        "name": "Just do it task!"
      }
    ]
  }
}
```

## Add another task
`register-api.js`

```
// MORE CODE
const resolvers = {
  Query: {
    hi() {
      return 'hello from your graphql';
    },
    resolutions() {
      return [
        {
          _id: '12345',
          name: 'Buy eggs',
        },
        {
          _id: '12346',
          name: 'Jump rope',
        },
      ];
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
```

* This will now show this out put with our previous graphql query

```
{
  "data": {
    "resolutions": [
      {
        "_id": "12345",
        "name": "Buy eggs"
      },
      {
        "_id": "12346",
        "name": "Jump rope"
      }
    ]
  }
}
```

* Here in lies why graphql is so powerful vs RESTful API
    - a RESTful API is going to just send a bunch of data
    - graphql will only send data we request
* This:

```
{
  resolutions {
    name
  }
}
```

* Gives us this data:

```
{
  "data": {
    "resolutions": [
      {
        "name": "Buy eggs"
      },
      {
        "name": "Jump rope"
      }
    ]
  }
}
```

## Let's update our graphiql query into our code
* It is the purpose of graphiql to test what data you get back and then paste it into your code base
* **graphql rule** It is not JavaScript
* **graphql rule** Do no use commas

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const App = ({ data }) => {
  return (
    <div>
      <h1>{data.hi}</h1>
      <ul>
        {data.resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};

const hiQuery = gql`
  {
    hi
    resolutions {
      _id
      name
    }
  }
`;

export default graphql(hiQuery)(App);
```

## Error - Houston we have a problem
* This should work but we get an error
* Troubleshoot
    - comment out the code causing the error

`App.js`

```
// MORE CODE
const App = ({ data }) => {
  return (
    <div>
      <h1>{data.hi}</h1>
      {/* <ul> */}
      {/*   {data.resolutions.map(resolution => ( */}
      {/*     <li key={resolution._id}>{resolution.name}</li> */}
      {/*   ))} */}
      {/* </ul> */}
    </div>
  );
};
// MORE CODE
```

* We use React dev tools and search for `App` to see that we indeed have access to `resolutions`

![resolutions](https://i.imgur.com/8A6fEBN.png)

### But why the error?
* Because when the component first loads the data does not come in immediately and so there is a lag
* To prevent this from happening we use `data.loading`
    - It is true until the data has loaded and then it is false (see above screenshot to see that it does exist in **Props**)
    - It happens so fast it is hard to see it being set to `true`

## One solution
* We could set up some defaultProps and have resolutions array be an array
* But you can't set up defaultProps on a nested prop
* So we can't use this but we'll come back to this later and make it work

## Other solution that we'll use - data.loading1

`App.js`

```
// MORE CODE

const App = ({ data }) => {
  if (data.loading) return null;
  return (
    <div>
      <h1>{data.hi}</h1>
      <ul>
        {data.resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};
// MORE CODE
```

## Take for a test spin
* Browser now shows both tasks

![tasks working](https://i.imgur.com/CAagLkW.png)

## Summary of what we did
1. We created a new query (resolutions that is returning an array of object tasks)
2. We created it under the Query type and use that Query to give us the id and name
3. Used data.loading so that we can prevent our component from trying to access data that doesn't exist
4. Next we won't return an array we'll return a Mongo DB find

## Next - Clean up
* We don't want all our queries to reside inside `register-api.js` or else that file will grow huge and unmaintainable
