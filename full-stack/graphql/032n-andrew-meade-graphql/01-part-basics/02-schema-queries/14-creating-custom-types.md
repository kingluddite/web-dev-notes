# Creating Custom Types
## Think of a blog you would run
* We need to create custom types for
    - user
        + name
        + email
    - post
        + title
        + body
    - comment
        + comment text
        + when comment was created
        + who comment was created by
* Each custom type has its own custom fields 

## Before using the demo GraphQL API
* Some of our queries sent back scalar types
    - hello
    - course
    - courseInstructor
* They all sent back Strings
* But queries like `me` sent back custom Types 
    - It allows us to send back an object with a set of fields
* `me` sent back a custom type of user
    - If you look inside the API docs
        + The User has a set of defined fields
            * Inside that you would see scalar values and relational data

## Let's see what it takes to build a Custom Type
`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    id: ID!
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

// MORE CODE
```

* We just created our very first Type definition

## Now we'll create a Query that returns the User
* Let's clean up our Query's and Resolvers

### First we need to Query for our user
`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

const resolvers = {
  Query: {

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

## Now we need to write our resolver method
* We will set our method name to be `me()`
    - We need to return something that matches up with the `User` Type
    - We will return an object that matches up with all the `User` fields
        + This is where we would go off and fetch data from the DB
        + But we'll start off with simple static data

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        id: '123',
        name: 'john',
        email: 'john@john.com',
        age: 22
      }
    }
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

* That's it we now have our first resolver
* And we have our first Query that returns a custom Type

## Test it out in Playground
```
query {
  me {
    id
    name
    email
    age
  }
}
```

* Output

```
{
  "data": {
    "me": {
      "id": "123",
      "name": "john",
      "email": "john@john.com",
      "age": 22
    }
  }
}
```

* This is important

```
query {
    me
}
```

* That would not be enough for our Query
* We need to be specific down to the **scalar** values
* Before we had queries that returned **scalar** values so this would be enough

```
query {
    hello
}
```

* In our case `me` is not returning a **scalar** value (String, Boolean, Int, Float, ID), it is returning `User` type
* If we have a non-scalar value (like User) we have to provide a selection set for it

```
query {
  me {
    id
    name
    email
    age
  }
}
```

* Remove age from `index.js` resolver
* Refresh Playground and you'll see:

```
{
  "data": {
    "me": {
      "id": "123",
      "name": "john",
      "email": "john@john.com",
      "age": null
    }
  }
}
```

* Remember that `age` was not required (no `!`)

## If you forget a required field
* Remove `email` from the resolver and re-run Playground
* You will get this error

```
{
  "data": null,
  "errors": [
    {
      "message": "Cannot return null for non-nullable field User.email.",
      "locations": [
        {
          "line": 5,
          "column": 5
        }
      ],
      "path": [
        "me",
        "email"
      ]
    }
  ]
}
```

**tip**: semi-colon less JavaScript (still use them in for loops)

## Challenge
1. Create a `Post` type
2. Add `id`, `title`, `body`, and `published` to the `Post` type (all non-nullable)
3. Define a "post" query that returns a single post
4. Set up the `resolver` method to return some post data
5. Test out the query

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: String!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        id: '123',
        name: 'john',
        email: 'john@john.com',
      };
    },
    post() {
      return {
        id: '123',
        title: 'Great Movies',
        body: 'Jaws made me afraid of the water',
        published: '1/1/2019',
      };
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
  post {
    id
    title
    body
    published
  }
}
```

* Output

```
{
  "data": {
    "post": {
      "id": "123",
      "title": "Great Movies",
      "body": "Jaws made me afraid of the water",
      "published": "1/1/2019"
    }
  }
}
```

### In GraphQL Playground
* Analyze your Schema
* Analyze your new Documentation

## Questions
* How do I work with lists?
    - posts
    - arrays
* How do I set up relationships between these types
    - A user owns posts
    - A post has an author
