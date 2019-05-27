# GraphQL Queries
* Run 1st GraphQL query
* We will make requests to a real world API

## As with a REST API
* We will have a client and a server
* In this course
    - The client will be a web app
    - The server will be a Node.js GraphQL server

## First things first - let's keep it simple
* We'll use an existing GraphQL server to test things out
* `https://graphql-demo.mead.io` 
    - Playground
    - Just a request/response tool for GraphQL
    - It shows us what happens when we submit a query to a GraphQL API
    - This is similar to [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/)
    - Good news - we ony have 1 end point with GraphQL - `https://graphql-demo.mead.io/`

## Three types of request
1. Query
    * Allows us to query data
2. Mutation
    * Enables us to change data
3. Subscription
    * Allows us to watch data for changes (great for real time apps)

## Query
* GraphQL API
* Query allows us to fetch data

```
query {

}
```

* This will show us an error
* We need to specify what fields we want inside `query` to be valid, then we'll have a valid GraphQL query that will allow us to fetch some data

```
query {
  hello
  courseInstructor
  course
}
```

* Output

```
{
  "data": {
    "hello": "Hello world!",
    "courseInstructor": "Andrew Mead",
    "course": "GraphQL"
  }
}
```

* If you query a field that is not in the API you will get an error alerting you to that fact (it gives us useful feedback)
* Your GraphQL API has self creating documentation
* This is possible because your GraphQL API exposes a GraphQL schema

## View Schema tab in GraphQL API
* Shows you all the queries we can make
* Tells you what you will get back, in this case we always will get a String response back
* The `!` means that you will always get a String response back
* We put Type definitions inside a es6 template string

### hello
* We will setup our app to query for hello, nothing else
* `type Query` (has to match exactly as it is built in)
  - Inside we define all the queries we want to support

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    hello: String
  }
`

// Resolvers
```

* Above is a completely valid Type definition for our API
* We are defining the Type we want to "come back" when this query is executed, in this example we want a String Type to "come back"
* By not addind `!` like `String!` then we are allowing `null` to also be returned instead of just a String

## Always return a String
* Just add an `!` like this:

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
  }
`

// Resolvers
```

## Now we also have to define our Resolvers
* Since we have only 1 Query, we just need to write one Resolver (which is just a function)
* In general the structure of the Resolver will mirror the structure of the Query

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
  }
`

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query from hello!'
    }
  }
}
```

* We write our resolver function and make sure it returns a string
* **note** The resolver function does get called with some **arguments** which we will ignore for now

## Done
* Whew! We are fininished writing our query and resolver
* What next?

## Start up our server and query for that data
* We need to create a new instance of our GraphQL-Yoga server
* `GraphQLServer` needs to be an object with 2 properties defined

1. typeDefs
2. resolvers

`indes.js`

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})
```

* Which becomes

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs,
  resolvers
})
```

## Now we nee to start our sever
* We use the `start()` method and we will pass to it a callback function and that callback function runs when the server is up and running

```
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});

// MORE CODE
```

## Now it is time to run our application
`$ npm run start`

* By default GraphQL will try to start up the application on [http://localhost:4000/](http://localhost:4000/)
* Check it out in your browser and you will see Playground running

### Test our query
* query for `hello`

```
query {
  hello
}
```

#### Output
```
{
  "data": {
    "hello": "This is my first query from hello!"
  }
}
```

### Summary
1. We just set up our very simple GraphQL API
2. We made a query to the API
3. And we got the correct data back

## What if we wanted to add another Query?
* Add a name query that returns a name

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query from hello!';
    },
    name() {
      return 'John Doe';
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

* GraphQL Playground query modification

```
query {
  hello
  name
}
```

* Output

```
{
  "data": {
    "hello": "This is my first query from hello!",
    "name": "John Doe"
  }
}
```

* Shut down server `ctrl` + `c`
* Run the server `$ npm run start`
* Refresh the browser
* Click play to run the query one more time (keyboard shortcut is `⌘` + `return`)

## Challenge
* Add 2 more queries

1. `location` that returns your location
2. `bio` that returns a short brief bio 

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query from hello!';
    },
    name() {
      return 'John Doe';
    },
    location() {
      return 'LA';
    },
    bio() {
      return 'In a galaxy far, far away';
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

* GraphQL Playground

```
query {
  hello
  name
  location
  bio
}
```

* Output

```
{
  "data": {
    "hello": "This is my first query from hello!",
    "name": "John Doe",
    "location": "LA",
    "bio": "In a galaxy far, far away"
  }
}
```
