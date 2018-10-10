# Map over Colognes and Create CologneItem Component
* Right now we have a `<p>Colognes</p>`

`App.js`

```
// MORE CODE

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Five Star Colognes</h1>
        <Query query={GET_ALL_COLOGNES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return <p>Colognes</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default App;
```

* Replace `p` with an unordered list of cologne content
* We'll use the ES6 `map()` array function

`App.js`

```
// MORE CODE

return (
          <ul>
            {data.getAllColognes.map(cologne => (
              <li>{cologne.firstName}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);
export default App;
```

### View in browser
* First look at console and see if your `getAllColognes` has any items in the array
* If not, use `http://localhost:4444/graphql` to add a few colognes
* Why are we using graphql to add colognes?
  - Because we didn't create a form yet

#### Add 3 colognes

```
mutation {
  addCologne(scentName: "L'eau D'issey (issey Miyake)", scentPrice: 16) {
    scentName
    scentPrice
  }
}
```

```
mutation {
  addCologne(scentName: "Versace Eros", scentPrice: 9) {
    scentName
    scentPrice
  }
}
```

```
mutation {
  addCologne(scentName: "Jean Paul Gaultier", scentPrice: 50) {
    scentName
    scentPrice
  }
}
```

### Test in Browser (refresh page)
* You will see the 3 cologne names output as map is looping through the array (_inside the data object we have an array `getAllColognes` returned by GraphQL_)

## unique "key" warning
* Inside console

`Warning: Each child in an array or iterator should have a unique "key" prop`

* One of the reasons why react is so fast is it has a **virtual DOM** and takes care of adjusting only what need to be adjusted but when we loop out several items it needs each item to be unique

### Fix warning using `_id`
* This is an easy fix because MongoDB inserts a unique `_id` field every time we insert a record

#### key prop
* To make react fast you need to add key `prop`

## Add an _id (will help us get rid of "key" prop error)
* We don't have an `_id` yet
* Open your browser console and expand `getAllColognes` and you will see there is not `_id` yet
  - Let's add an `_id` but opening `/queries/index.js`

`src/queries/index.js`

```
// MORE CODE

// cologne Queries
export const GET_ALL_Colognes = gql`
  query {
    getAllColognes {
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

## Now we have a problem (But a hard problem to find)
* You won't see any errors in the console or terminal but you will see an error if you open `http://localhost:4444/graphql` in the browser
* And enter this in the GUI:

```
query {
  getAllColognes {
    _id
    scentName
    scentPrice
    likes
    createdDate
  }
}
```

* Press the `play` button and you will get an error similar to:

```
ID cannot represent value: { _bsontype: \"ObjectID\", id: <Buffer 5b b8 36 e8 d5 76 63 de e0 e4 c7 b4> }
```

![visual of error in graphql](https://i.imgur.com/4PJBDi2.png)

* Search for that error on apollo's github page's issues came up with [this solution]https://github.com/apollographql/apollo-server/issues/1633):
* The reason for the error is GraphQL are using a new method to serialize ID and the new method doesn't support ID in object type anymore so something like this is recommended:

```
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
```

* But below is a more robust solution (so we'll add that)
* [scalar solution](https://github.com/apollographql/apollo-server/issues/1649#issuecomment-420840287)

`resolvers.js`

```
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { ObjectID } = require('mongoose').mongo.ObjectID;

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  ObjectID: new GraphQLScalarType({
    name: 'ObjectID',
    description:
      'The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.BSON) commonly used in `mongodb`',
    serialize(_id) {
      if (_id instanceof ObjectID) {
        return _id.toHexString();
      }
      if (typeof _id === 'string') {
        return _id;
      }
      throw new Error(
        `${Object.getPrototypeOf(_id).constructor.name} not convertible to `
      );
    },
    parseValue(_id) {
      if (typeof _id === 'string') {
        return ObjectID.createFromHexString(_id);
      }
      throw new Error(`${typeof _id} not convertible to ObjectID`);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ObjectID.createFromHexString(ast.value);
      }
      throw new Error(`${ast.kind} not convertible to ObjectID`);
    },
  }),

  Query: {

// MORE CODE
```

### Also update schema
* We will now use `ObjectID` instead of `ID`
`schema.js`

```
const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  scalar ObjectID
  type Cologne {
    _id: ObjectID
    scentName: String!
    scentPrice: Int
    createdDate: String
    description: String
    likes: Int
    username: String
  }

  type User {
    _id: ObjectID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Cologne]
  }

  type Query {
    getAllColognes: [Cologne]

    getCurrentUser: User
  }

  type Token {
    token: String!
  }

  type Mutation {
    addCologne(
      scentName: String!
      scentPrice: Int
      description: String
      username: String
    ): Cologne

    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
```

## Test it out in browser
* Refresh home page
* Open console and see we are still logging `getAllColognes`
* Expand that object and you'll see we now have `_id` property

* Remove unnecessary fields in `getAllColognes`

## Add key prop
`App.js`

```
// MORE CODE

return (
  <ul>
    {data.getAllColognes.map(cologne => (
      <li key={cologne._id}>{cologne.firstName}</li>
    ))}
  </ul>
);

// MORE CODE
```

# Refresh browser
* Our `unique key` warning is gone!

## Make `li` it's own component --- CologneItem.js
* We do this to make our code more modular and updating parts of the app is easier because you can just open the one component you need to update that part of the app

`App.js`

```
import React, { Component } from 'react';

// graphql stuff
import { Query } from 'react-apollo';
import { GET_ALL_COLOGNES } from '../queries';

// custom components
import CologneItem from './Cologne/CologneItem';

// styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Five Star Colognes</h1>
        <Query query={GET_ALL_COLOGNES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return (
              <ul>
                {data.getAllColognes.map(cologne => (
                  <CologneItem key={cologne._id} {...cologne} />
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
```

`components/Cologne/CologneItem.js`

```
import React, { Component } from 'react';

class CologneItem extends Component {
  render() {
    const { scentName } = this.props;
    return <li>{scentName}</li>;
  }
}

export default CologneItem;
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add cologne to home page`

## Push to github
`$ git push origin auth`

## Additional Resources
* [What is Virtual DOM in react](https://www.youtube.com/watch?v=RquK3TImY9U)
