# GraphQL Operation Arguments
* This will allow us to pass data from the client to the server
* So far we've been showing how data can go from server to client

## Why would I send from client to server?
* Imagine I create a frontend to my application
    - We could set up a sign up form
        + I ask for their email/password
        + Once I get them from the client I need a way to pass those through to the server and maybe take that data and set it to a new record in our DB
* We also might want to use operational arguments to filter data
    - I have a query that returns all posts (lots of posts)
    - But the user could use a UI searchbox we have on our site, we can take that keyword in the client and send it to the server to be used in our GraphQL query
        + Our query will only return posts if they find that keyword inside the posts

## Our first argument query
* A simple hello but the user will pass along their name

`index.js`

```
// MORE CODE

const typeDefs = `
  type Query {
    greeting(name: String): String!
    me: User!
    post: Post!
  }

// MORE CODE
```

* We will return a `String` (required)
    - We can have an optional `name` passed in that will be a `String`

## Now we'll work on our resolver method
`index.js`

```
// MORE CODE

const resolvers = {
  Query: {
    greeting() {
      return 'Hello';
    },

    me() {

// MORE CODE
```

* Now we need to figure out what it takes to pass in an argument in GraphQL Playground

### Arguments
* IMPORTANT: There are 4 arguments that get passed to all `resolver` functions

1. `parent`
    * Very common
    * Useful when working with relational data
        - Example if a user has many posts
            + the `parent` comes into play on how to get a user's posts
2. `args`
    * This contains the info we need in this example
    * This contains the operation arguments supplied
    * Is an object and it contains all of the argument values provided
3. `ctx`
    * aka `context` (usually shortened to `ctx`)
    * Very useful for contextual data
        - If a user is logged in the ctx might contain the `id` of that user so that we can access it through our application
4. `info`
    * Contains great information about the actual operations that were sent along to the server

`index.js`

```
// MORE CODE

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      console.log(args);
      return 'Hello';
    },

// MORE CODE
```

* Playground

```
query {
  greeting(name: "John")
}
```

* Output

```
{
  "data": {
    "greeting": "Hello"
  }
}
```

* But check out the terminal where nodemon is running and you'll see:

```
{ name: 'John' }
```

## Output the arg value in playground
* In our method we'll check to make sure we get the args.name
* If we do get it we'll output the greeting plus the name
* Otherwise we'll just return 'Hello'

`index.js`

```
// MORE CODE

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}!`;
      } else {
        return 'Hello';
      }
    },

    me() {

// MORE CODE
```

* Playground

```
query {
  greeting(name: "John")
}
```

* Output

```
{
  "data": {
    "greeting": "Hello John!"
  }
}
```

* Nice it works!

## Add another argument
* Name it `position` and query Playground so that it says something like "Hello John. You play as a Forward in soccer"

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
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
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello ${args.name}. You play as a ${args.position} in soccer`;
      } else {
        return 'Hello';
      }
    },

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

* Playground

```
query {
  greeting(name: "John", position: "Forward")
}
```

* Output in Playground

```
{
  "data": {
    "greeting": "Hello John. You play as a Forward in soccer"
  }
}
```

## Challenge
* Create a new Query that accepts some arguments

1. Create a new "add" query that returns a float
2. Set up "add" to take 2 arguments (a, b) which are required floats
3. Have the resolver send back the sum of the two arguments
4. Test to make sure it works

`index.js`

```
// MORE CODE

const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(a: Float!, b: Float!): Float!
    me: User!
    post: Post!
  }

// MORE CODE

    add(parent, args, ctx, info) {
      if (args.a && args.b) {
        return args.a + args.b;
      }
    },

// MORE CODE
```

* Playground

```
query {
  add(a: 22.34, b: 33.10)
}
```

* output

```
{
  "data": {
    "add": 55.44
  }
}
```

## Next
* Array based data
* Arguments will come in handy with that because they will allow us to filter/sort data

