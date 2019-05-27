# Arrays GraphQL Part 2
* We will talk about arrays of custom types
    - `[Users]`
    - `[Posts]`

## Remove this
* greeting(), add() and grades queries and resolvers

## Users
* Get all users in a blog

## Set up the Query

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    users: [User!]!
    me: User!
    post: Post!
  }

// MORE CODE
```

* users: [User!]!
    - An array of our custom type User, it is required to be an array and no users can be null
    - Essentially it will be an array of objects where each object matches the User custom type fields
        + id
        + name
        + email
        + age (optional)

## Set up the Resolver 

```
// MORE CODE

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      //
    }
    me() {

// MORE CODE
```

* Let's create fake data
    - Later it will come from a db
    - Let's create an array of 3 fake users
    - All users will have the minimum field requirements `id`, `name` and `email` for `User` custom Type
    - One user will have the optional `age`

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

const users = [
  {
    id: '1',
    name: 'Manny',
    email: 'manny@pepboys.com'
  },
  {
    id: '2',
    name: 'Mo',
    email: 'mo@pepboys.com',
    age: 100
  },
  {
    id: '3',
    name: 'Jack',
    email: 'jack@pepboys.com'
  }
]
// Type definitions (schema)
const typeDefs = `
  type Query {

// MORE CODE
```

* Now we can easily return users like this:

`index.js`

```
// MORE CODE

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      return users;
    },

// MORE CODE
```

* Playground

```
query {
  users {
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
    "users": [
      {
        "id": "1",
        "name": "Manny",
        "email": "manny@pepboys.com",
        "age": null
      },
      {
        "id": "2",
        "name": "Mo",
        "email": "mo@pepboys.com",
        "age": 100
      },
      {
        "id": "3",
        "name": "Jack",
        "email": "jack@pepboys.com",
        "age": null
      }
    ]
  }
}
```

## How to sort or filter
* We can use arguments to help do this
* If you provide `query` we will filter based on that query
* If you don't provide query will will show all users
* So query query will be an optional argument

```
// MORE CODE

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
  }

// MORE CODE
```

* Now we'll add the resolver

```
// MORE CODE

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return users.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },

// MORE CODE
```

## Check out the docs
```
users(
query: String
): [User!]!

TYPE DETAILS

type User {
id: ID!
name: String!
email: String!
age: Int
}

ARGUMENTS

query: String
```

* Run the query in playground
* You will get all users because our query is optional and if no args are provided we return all users

## How to pass the query
* It shows you in the docs:

```
users(
    query: String
): [User!]!
```

`index.js`

```
// MORE CODE

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },

// MORE CODE
```

* First we check if there was a query argument provided, if there wasn't return all users
* Then we use the [filter array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
    - The `filter()` method creates a new array with all elements that pass the test implemented by the provided function
    - We provide filter() a callback function
        + This function gets called 1 time for each item in the array
        + We refer to the singular of users as `user`
            * We return `true` if the item should be kept in the new array and false if it should be filtered out
            * We want in this case to return `true` when the user's name contains the query
                - We will do this in a case insensitive way so we'll use the `toLowerCase()` string method
                    + `user.name.toLowerCase()`
                    + We'll also use the `includes()` method to check if the String includes another string, if it does, we'll get `true` back which means it will be kept in the new array and if it doesn't contain the other string it will return false and not be included in the new array (it will be filtered out)
                    + `return user.name.toLowerCase().includes(args.query.toLowerCase())`
            * **tip** Make sure you use the filter on the plural `users` and you pass the singular `user` to the callback function

* Playground

```
query {
  users(query: "a") {
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
    "users": [
      {
        "id": "1",
        "name": "Manny",
        "email": "manny@pepboys.com",
        "age": null
      },
      {
        "id": "3",
        "name": "Jack",
        "email": "jack@pepboys.com",
        "age": null
      }
    ]
  }
}
```

* Empty array returned

```
query {
  users(query: "x") {
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
    "users": []
  }
}
```

* That means no results were returned based on your query filter

## Challenge
1. Set up an array of 3 posts with dummy post data (id, title, body, published)
2. Set up a "posts" query and resolver that returns all the posts
3. Test the query out
4. Add a "query" argument that only returns posts that contain the query string in the `title` or `body`
5. Run a few sample queries searching for posts with specific titles

* First write the Posts fake data

```
const posts = [
  {
    id: '1',
    title: 'soccer',
    body: '11 players',
    published: '1/2/19',
  },
  {
    id: '2',
    title: 'basketball',
    body: '5 players',
    published: '2/2/19',
  },
  {
    id: '3',
    title: 'tennis',
    body: '2 players',
    published: '3/2/19',
  },
];

```

* Now write the `posts` query

`index.js`

```
// MORE CODE

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

// MORE CODE
```

* Now write the posts resolver method that will return all posts

`index.js`

```
// MORE CODE

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      return posts;
    },

// MORE CODE
```

* Test in Playground

```
query {
  posts {
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
    "posts": [
      {
        "id": "1",
        "title": "soccer",
        "body": "11 players",
        "published": "1/2/19"
      },
      {
        "id": "2",
        "title": "basketball",
        "body": "5 players",
        "published": "2/2/19"
      },
      {
        "id": "3",
        "title": "tennis",
        "body": "2 players",
        "published": "3/2/19"
      }
    ]
  }
}
```

* Now finish the challenge with:

4. Add a "query" argument that only returns posts that contain the query string in the `title` or `body`
5. Run a few sample queries searching for posts with specific titles

```
import { GraphQLServer } from 'graphql-yoga';

const users = [
  {
    id: '1',
    name: 'Manny',
    email: 'manny@pepboys.com',
  },
  {
    id: '2',
    name: 'Mo',
    email: 'mo@pepboys.com',
    age: 100,
  },
  {
    id: '3',
    name: 'Jack',
    email: 'jack@pepboys.com',
  },
];

const posts = [
  {
    id: '1',
    title: 'soccer',
    body: '11 players',
    published: '1/2/19',
    professionalLeague: 'MLS',
  },
  {
    id: '2',
    title: 'basketball',
    body: '5 players',
    published: '2/2/19',
    professionalLeague: 'NBA',
  },
  {
    id: '3',
    title: 'tennis',
    body: '2 players',
    published: '3/2/19',
    professionalLeague: 'MLT',
  },
];
// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    professionalLeague: String!
  }
`;

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase()) ||
          post.professionalLeague
            .toLowerCase()
            .includes(args.query.toLowerCase())
        );
      });
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
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
  posts(query: "M") {
    id
    title
    body
    published
    professionalLeague
  }
}
```

* Output

```
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "soccer",
        "body": "11 players",
        "published": "1/2/19",
        "professionalLeague": "MLS"
      },
      {
        "id": "3",
        "title": "tennis",
        "body": "2 players",
        "published": "3/2/19",
        "professionalLeague": "MLT"
      }
    ]
  }
}
```

* Woops
    - Published should be a Boolean value (Not a String)

```
// MORE CODE

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    professionalLeague: String!
  }

// MORE CODE
```

* **tip** A nicer way to write the challenge solution

`index.js`

```
// MORE CODE

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        // return (
        //   post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        //   post.body.toLowerCase().includes(args.query.toLowerCase()) ||
        //   post.professionalLeague
        //     .toLowerCase()
        //     .includes(args.query.toLowerCase())
        // );
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },

// MORE CODE
```

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

const users = [
  {
    id: '1',
    name: 'Manny',
    email: 'manny@pepboys.com',
  },
  {
    id: '2',
    name: 'Mo',
    email: 'mo@pepboys.com',
    age: 100,
  },
  {
    id: '3',
    name: 'Jack',
    email: 'jack@pepboys.com',
  },
];

const posts = [
  {
    id: '1',
    title: 'soccer',
    body: '11 players',
    published: true,
    professionalLeague: 'MLS',
  },
  {
    id: '2',
    title: 'basketball',
    body: '5 players',
    published: false,
    professionalLeague: 'NBA',
  },
  {
    id: '3',
    title: 'tennis',
    body: '2 players',
    published: true,
    professionalLeague: 'MLT',
  },
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    published: Boolean!
    professionalLeague: String!
  }
`;

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        // return (
        //   post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        //   post.body.toLowerCase().includes(args.query.toLowerCase()) ||
        //   post.professionalLeague
        //     .toLowerCase()
        //     .includes(args.query.toLowerCase())
        // );
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isProfessionalLeagueMatch = post.professionalLeague
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch || isProfessionalLeagueMatch;
      });
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
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

## Next - Relational Data


