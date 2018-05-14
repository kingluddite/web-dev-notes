# Making Queries and Binding Data
## How do we make queries inside a component?
* There are 2 steps

1. Construct a query just like we did in graphql
2. Then we take that query and bind it to the component
    * This will give us access to all the data that comes back from the query

* graphql is not JavaScript
* We need to use gql form appolo-boost to make JavaScript work with graphql

### Step 1 - contruct a query
`BookList.js`

```
import React, { Component } from 'react';
import { gql } from 'apollo-boost';

const getBooksQeury=gql`
 {
   books {
     name
     id
   }
 }
`
class BookList extends Component {
  render() {
    return (
      <div>
        <ul id="book-list">
          <li>Book</li>
        </ul>
      </div>
    );
  }
}

export default BookList;
```

## Step 2 - Bind query to the component

```
import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
class BookList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">
          <li>Book</li>
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
```

* Now it is binded and stored in this components props

## Test
* `$ npm start`

### we get an error because we are using two servers and so we get a cors error
* We need to install cors on our express server that allow requests from other servers
* Stop express server
* And install `cors` client side
* `$ npm i cors`

`server/app.js`

```
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors'); // add this

const app = express();

// allow cross-origin requests
app.use(cors()); // add this

// MORE CODE
```

## run nodemon again
`$ nodemon app`

* Now view browser
* You will see to data objects
* one is empty when the component is first rendered
* Then next data object has all our books inside `data.books`

![all our books](https://i.imgur.com/UqsuvtL.png)


