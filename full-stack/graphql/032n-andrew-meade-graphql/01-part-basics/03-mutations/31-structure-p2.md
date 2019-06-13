# A GraphQL Projection Structure (Part 2)
* **tip** Install VS Code `Prettier` package for autoformatting
* 
## Let's refactor the resolvers object
* We were at over 300 lines of code
* Our last refactoring made reduced `index.js` to 231
* After this part we will be around 20 lines of code

## Create the following folders/files inside `src`
* resolvers
    - `Query.js` (**Naming Convention** Common naming convention to name resolvers to match up with their name in the file)
    - `Mutation.js`
    - Custom Post Types
        + (We will create files for each of our custom types User, Post and Comment)
        + `User.js`
        + `Post.js`
        + `Comment.js`

`src/resolvers/Query.js`

```
const Query = {
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
  }

export { Query as default };
```

* I don't need to import anything as it doesn't require any of the 3rd party modules we used in `index.js`
    - `import db from './db'` - not needed because it is accessed via the `context`
    - `import uuidv4 from 'uuid/v4'` - not needed because that was used for our create mutations
    - `import { GraphQLServer } from 'graphql-yogo` is not needed because we are not creating a server in Query.js

* How do we load this file into `index.js`?
    - We'll talk about that soon!

## Let's work on Mutation.js
`Mutation.js`

```
import uuidv4 from "uuid/v4";

const Mutation = {
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
  };

export { Mutation as default };
```

* Do we need any imports for Mutation.js? Yes!
    - We need to import the `uuid` module
    - We cut it from `index.js` and paste it into `Mutation.js`

## User.js
`User.js`

```
// custom object resolver
const User = {
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
};

export { User as default };
```

## Post.js
`Post.js`

```
// custom object resolver
const Post = {
  author(parent, args, { db }, info) {
    return db.users.find(user => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => {
      return comment.post === parent.id;
    });
  }
};

export { Post as default };
```

## Comment.js
`Comment.js`

```
// custom object resolver

const Comment = {
  author(parent, args, { db }, info) {
    return db.users.find(user => {
      return user.id === parent.author;
    });
  },
  post(parent, args, { db }, info) {
    return db.posts.find(post => {
      return post.id === parent.post;
    });
  }
};

export { Comment as default }; 
```

## Import files into `index.js`
`index.js`

```
import { GraphQLServer } from "graphql-yoga";

// custom
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Comment
};

// MORE CODE
```

But an even better way is like this:

`index.js`

```
import { GraphQLServer } from "graphql-yoga";

// custom
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

server.start(() => {
  console.log("This graphql-yoga server is running");
});
```

* Now our `index.js` is only 27 lines long!

## The goal of index.js
* We define parts of our app throughout our site
* We use `index.js` to load them in and **bootstrap** our application

## Next
* Mutations that update data
    - Update a user's email
    - Change the body of a post
    - Change what we wrote in a comment
