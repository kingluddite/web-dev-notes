# A Pro GraphQL Project: Structure (Part 1)
* Currently 362 lines
* We will make this much easier to manage by breaking it up into multiple files

## Put typeDefs in their own file
* Common to name this file `schema.graphql`

`schema.graphql`

```
# Type definitions (schema)
type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
}

type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
}

input CreateUserInput {
name: String!
email: String!
age: Int
}

input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
}

input CreateCommentInput {
    text: String
    author: ID!
    post: ID!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    professionalLeague: String
    author: User!
    comments: [Comment!]!
}

type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
}
```

* Import `schema.graphql` inside `index.js`

`index.js`

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

// MORE CODE
```

* By making this change, we broke nodemon
    - nodemon will no longer restart our application when we make a change to separate `schema.graphql` because it does not watch files with a `.graphql` extension by default
    - This is a problem and we need nodemon to restart the server when we make changes to our schema

## Solution
* Using one of the arguments that `nodemon` supports
* [nodemon docs](https://github.com/remy/nodemon)
* Search for `watch list` on that page and you'll see **Specifying extension watch list**
    - By default, nodemon looks for files with the `.js`, `.mjs`, `.coffee`, `.litcoffee`, and `.json` extensions
    - However, you can specify your own list with the `-e`

`package.json`

```
// MORE CODE

"scripts": {
  "start": "nodemon src/index.js --ext js,graphql --exec babel-node",
  "test": "echo \"Error: no test specified\" && exit 1"
},

// MORE CODE
```

* Now you can make changes to `schema.graphql` and nodemon will restart the server

## Move our temp data into its own file
* This data file will move and whether it is static data as it is now, we will use this same structure when we move to dynamic data
* This structure is exactly what we will be using when we wire up graphql to work with a real world production ready database

### Steps
1. Put a new file inside `src` directory (this will be the last file we put directly in the `src` folder)
2. Create `src/db.js`
    * This will be an important piece to the puzzle later on when we add real db data
3. Cut 3 arrays from `index.js` and pasted them into `db.js`
4. Create one object that holds all 3 arrays
5. Export db object from `db.js`
6. Import `db.js` into `index.js`

`db.js`

```
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
    id: '10',
    title: 'soccer',
    body: '11 players',
    published: true,
    professionalLeague: 'MLS',
    author: '1',
  },
  {
    id: '11',
    title: 'basketball',
    body: '5 players',
    published: false,
    professionalLeague: 'NBA',
    author: '1',
  },
  {
    id: '12',
    title: 'tennis',
    body: '2 players',
    published: true,
    professionalLeague: 'MLT',
    author: '2',
  },
];

const comments = [
  {
    id: '102',
    text: 'Better than cats!',
    author: '3',
    post: '2',
  },
  {
    id: '103',
    text: 'Not better than cats',
    author: '1',
    post: '10',
  },
  {
    id: '104',
    text: 'Was this about cats?',
    author: '2',
    post: '11',
  },
  {
    id: '105',
    text: 'I am not a cat lover',
    author: '2',
    post: '12',
  },
];

const db = {
  users,
  posts,
  comments
}

export { db as default };
```

* We export db as a default export
* We revert our `let` declarations to `const` as we no longer be reasigning them like we did before
* We store `users`, `posts` and `comments` inside one `db` object and export that
* We will import that `db` object inside `index.js`

## We have a problem
* How are we going to import our default `db` export?
    - Might seem easy but it's not that straight forward
    - We could just import db like this:

`index.js`

```
// MORE CODE

import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

import db from './db';

const resolvers = {
  Query: {
    db.posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

// MORE CODE
```

* The problem is not everything will reside inside `index.js`
    - Mutations and Queries will each have their own files as will resolvers

## The Solutions - ctx (third argument in our resolvers)
* `users(parent, args, ctx, info) {}`
* `ctx` is something that we can set
    - We can set up some context for our API and the context is just an object with a set of properties will get passed to every single resolver method!
    - So we can set up our `db` object inside `db.js` to be part of the `ctx` object and the db object will be passed to every single resolver method (regardless of where it is in our site structure!)

## Adding `context`
* **Note** `context` is a very useful and important feature of GraphQL and the GraphQL Yoga Server
* To add our `context` to the `ctx` of every resolver we just need to do this:

`index.js`

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context
});

// MORE CODE
```

* `context` will be an object and on that object we will define the things we want to set up on `context`
    - So we can choose to pass in whatever values we happen to need
    - We'll soon pass in:
        + Our DB connection
        + Authentication
            * Authentication token the user used

## How we'll use `context`
1. We'll import our `db.js` inside `index.js`

```
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
// custom
import db from './db';

// MORE CODE
```

2. Pass the `db` object to every single one of our resolvers!

`index.js`

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
});

// MORE CODE

```

* By doing what we just did with `db` we are passing that `db` object to every single one of the resolvers for our application - regardless of actually where these resolvers actually live!
    - This will give us tons of flexiblity allowing us to move our resolves around to different files and folders which is exactly what we are going to do
    - The resolver methods now have an object stored on `ctx`
        + That `ctx` object has a single property called `db` and the `db` object has 3 properties - users, posts and comments

* **tip**

1. Add thirdy party imports first
2. Followed by custom imports

## Add the new path the `ctx`

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
// custom
import db from './db';

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return ctx.db.posts;
      }

      return ctx.db.posts.filter(post => {
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
        return ctx.db.users;
      }

      return ctx.db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments;
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = ctx.db.users.some(user => user.email === args.data.email);
      // if email exists, throw error back to client
      if (emailTaken) {
        throw new Error('Email taken!');
      }

      // if email is not taken
      // create new user
      const user = {
        id: uuidv4(),
        // name: args.name,
        // email: args.email,
        // age: args.age,
        ...args.data,
      };

      // save the user (add to array)
      ctx.db.users.push(user);

      // return the user
      // so the client can get values off of user
      return user;
    },
    deleteUser(parent, args, ctx, info) {
      // check for a user
      const userIndex = ctx.db.users.findIndex(user => user.id === args.id);

      // check if no user was found
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const deletedUsers = ctx.db.users.splice(userIndex, 1);

      posts = ctx.db.posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          comments = ctx.db.comments.filter(comment => comment.post !== post.id);
        }

        return !match;
      });

      comments = ctx.db.comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },
    createPost(parent, args, ctx, info) {
      // make sure author id matches up with one of our users

      const userExists = ctx.db.users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found!');
      }

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      posts.push(post);

      return post;
    },

    deletePost(parent, args, ctx, info) {
      // check if post exists
      const postIndex = ctx.db.posts.findIndex(post => post.id === args.id);

      // if no post found throw error
      if (postIndex === -1) {
        throw new Error('No Post Found');
      }

      // capture the deleted post so you can return
      const deletedPosts = ctx.db.posts.splice(postIndex, 1);

      comments = ctx.db.comments.filter(comment => comment.post !== args.id);

      return deletedPosts[0];
    },

    createComment(parent, args, ctx, info) {
      const userExists = ctx.db.users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const postExists = ctx.db.posts.some(post => {
        return post.id === args.data.post && post.published;
      });

      if (!postExists) {
        throw new Error('Post not found!');
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      ctx.db.comments.push(comment);

      return comment;
    },

    deleteComment(parent, args, ctx, info) {
      // check if the comment exists
      const commentIndex = ctx.db.comments.findIndex(comment => comment.id === args.id);

      // if no comment throw an error
      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }

      const deletedComments = ctx.db.comments.splice(commentIndex, 1);

      return deletedComments[0];

    }
  },

  Post: {
    author(parent, args, ctx, info) {
      return ctx.db.users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments.filter(comment => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return ctx.db.posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments.filter(comment => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return ctx.db.users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return ctx.db.posts.find(post => {
        return post.id === parent.post;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

### Make the path shorter using this destructured technique
* This is a very popular method to use when working with `context` (ctx)

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
// custom
import db from './db';

const resolvers = {
  Query: {
    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      }

      return db.posts.filter(post => {
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
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }

      return db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments;
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
  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some(user => user.email === args.data.email);
      // if email exists, throw error back to client
      if (emailTaken) {
        throw new Error('Email taken!');
      }

      // if email is not taken
      // create new user
      const user = {
        id: uuidv4(),
        // name: args.name,
        // email: args.email,
        // age: args.age,
        ...args.data,
      };

      // save the user (add to array)
      db.users.push(user);

      // return the user
      // so the client can get values off of user
      return user;
    },
    deleteUser(parent, args, { db }, info) {
      // check for a user
      const userIndex = db.users.findIndex(user => user.id === args.id);

      // check if no user was found
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const deletedUsers = db.users.splice(userIndex, 1);

      db.posts = db.posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          db.comments = db.comments.filter(comment => comment.post !== post.id);
        }

        return !match;
      });

      db.comments = db.comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },
    createPost(parent, args, { db }, info) {
      // make sure author id matches up with one of our users

      const userExists = db.users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found!');
      }

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      db.posts.push(post);

      return post;
    },

    deletePost(parent, args, { db }, info) {
      // check if post exists
      const postIndex = db.posts.findIndex(post => post.id === args.id);

      // if no post found throw error
      if (postIndex === -1) {
        throw new Error('No Post Found');
      }

      // capture the deleted post so you can return
      const deletedPosts = db.posts.splice(postIndex, 1);

      db.comments = db.comments.filter(comment => comment.post !== args.id);

      return deletedPosts[0];
    },

    createComment(parent, args, { db }, info) {
      const userExists = db.users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const postExists = db.posts.some(post => {
        return post.id === args.data.post && post.published;
      });

      if (!postExists) {
        throw new Error('Post not found!');
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      db.comments.push(comment);

      return comment;
    },

    deleteComment(parent, args, { db }, info) {
      // check if the comment exists
      const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

      // if no comment throw an error
      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }

      const deletedComments = db.comments.splice(commentIndex, 1);

      return deletedComments[0];

    }
  },

  // custom object resolvers
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, { db }, info) {
      return db.posts.find(post => {
        return post.id === parent.post;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});

```

* That took a lot of time but now we have something very special
* Our resolvers don't rely on that global `db` variable because it gets passed in via the context
    - Now it will be very simple to break our methods out into their own files

* Test GraphQL Playground to make sure it is still working

```
query {
  posts {
    id
    title
    author {
      id
      name
    }
    comments {
      id
      text
    }
  }
}
```

## Recap
* We broke our Type Definitions (typeDefs) into their own file (schema.graphql)
* We could import that file in by providing the path to `typeDefs` in our GraphQLServer
    - We could either
        + Provider our typeDefs inline (like we started with)
        + Or break our typeDefs into their own file (preferred method for a real world production grade API)
* We set up `context` for the application
    - `context` will have values that are universal
        + Things that should be shared across your app
        + And in the case of a real GraphQL API, one of those important things to share across your application is a DB connection
            * All of our methods should be able to use the DB connection
                - So we can CRUD data
        + Currently we just pass in our static data of arrays into `context` and that gives us access to it in all our resolver methods

## Next
* More Refactoring
* We'll break them all into their own set of folders and files
