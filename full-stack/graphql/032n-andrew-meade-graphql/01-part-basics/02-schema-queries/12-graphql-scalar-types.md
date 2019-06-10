# GraphQL Scalar Types
## Five Scalar Types
1. String
2. Boolean
3. Int (numbers)
4. Float (decimal numbers)
5. ID (used to uniquely identify types)

## What does Scalar mean?
* A single discrete value
* `Scalar Types` is a Type that stores a single value
* This is the opposite of a non-scalar type (Object, Array) because they are a collection of values
    - Object can have many properties
    - Array can have many elements

## Let's review the 5 Scalar types
* All five will be used as "things to describe a person"

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;

// MORE CODE
```

* The only Scalar type that can return a `null` value is `gpa` because some people (like teachers) won't have a gpa
* You are either employed or unemployed (Boolean)

## Now we create our resolvers (functions)
`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {},
    name() {},
    age() {},
    employed() {},
    gpa() {},
  },
};

// MORE CODE
```

* Above we have individual resolvers methods for individual properties on something like a user (this is only temporary)
    - When we learn about **custom Types**, where we can model our user/post/comment or whatever makes sense for our application we will be reducing the number of resolvers
* We'll return a **string** for the `id`, we could also return a **number** but it will at the end of the process return a **string** so that is what we will return

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return 'abc123';
    },
    name() {
      return 'john doe';
    },
    age() {
      return 22;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    },
  },
};

// MORE CODE
```

* Now you need to add this:

`index.js`

```
 // MORE CODE

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* That will use GraphQLServer and point it to both your typeDefs and resolvers and run the server
* **important** If you don't do this your server won't run and your code will run and stop

## Let's start the GraphQL Yoga server up!
* Restart server
* Visit your playground `http://localhost:4000`
* Refresh Playground
* View new updated Docs!

* Add this to Playground

```
query {
  id
  name
  age
  employed
  gpa
}
```

* Output

```
{
  "data": {
    "id": "abc123",
    "name": "john doe",
    "age": 22,
    "employed": true,
    "gpa": null
  }
}
```

* We could also return a float for gpa

```

 // MORE CODE

    gpa() {
      return 3.14
    },
  },
};

// MORE CODE
```

* `Save` and `restart` server and run again you'll see `gpa` returns a **Float**

## Challenge
* Create a query definition and resolver for each
* `title` - string product name
* `price` - number as Float
* `releaseYear` - number as int (optional)
* `rating` - number as float (optional)
* `inStock` - number as boolean 

```
import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    id: ID!
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

const resolvers = {
  Query: {
    id() {
      return '123';
    },
    title() {
      return 'nike jordans';
    },
    price() {
      return 100.99;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 10;
    },
    inStock() {
      return true;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* Playground Query

```
query {
  id
  title
  price
  releaseYear
  rating
  inStock
}
```

* Output

```
{
  "data": {
    "id": "123",
    "title": "nike jordans",
    "price": 100.99,
    "releaseYear": null,
    "rating": 10,
    "inStock": true
  }
}
```

## Next
* Model real world things that make up our application
  - So we might have a `Product` custom type for our 5 fields
  - Or we might create a `User` custom type
* This will make it easier to maintain and scale our applications
    - That will help us not have to write 5 functions for 5 separate pieces of data
    - We'll be able to return everything a custom type has with just a single resolver

### Bonus
* Restart our server when we change our GraphQL server code


