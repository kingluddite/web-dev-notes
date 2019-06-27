# Adding Prisma into GraphQL Update Mutations (Part 2)
## Challenge
* Goal: Refactor the deletePost mutation to use Prisma

1. Refactor deletePost mutation resolver to use prisma instead of the array data
    * Don't worry about pubsub or subscriptions
2. Test the mutation from localhost:4000

* Before
    - We start by commenting out all the code

```
// MORE CODE

deletePost(parent, args, { db, pubsub }, info) {
  // const { id } = args;
  //
  // // check if post exists
  // const postIndex = db.posts.findIndex(post => post.id === args.id);
  //
  // // if no post found throw error
  // if (postIndex === -1) {
  //   throw new Error('No Post Found');
  // }
  //
  // // capture the deleted post so you can return
  // const [post] = db.posts.splice(postIndex, 1);
  //
  // db.comments = db.comments.filter(comment => comment.post !== id);
  //
  // // before we notify subscribers that the post was deleted
  // // make sure it was a published post
  // if (post.published) {
  //   pubsub.publish('post', {
  //     post: {
  //       mutation: 'DELETED',
  //       data: post,
  //     },
  //   });
  // }
  // return post;
},

// MORE CODE
```

* After

```
// MORE CODE

deletePost(parent, args, { prisma }, info) {
  return prisma.mutation.deletepost(
    {
      where: {
        id: args.id,
      },
    },
    info
  );
},
// MORE CODE
```

* Find a post id from :4000

```
query {
  posts {
    id
    title
    published
    body
    author {
      id
      name
    }
  }
}
```

* Delete a post

```
mutation {
  deletePost(id: "cjxcmktqc01xb0759zccdtc83") {
    id
  }
}
```

## Other challenge
* Do the same for updatePost
* Before

```
// MORE CODE

  updatePost(parent, args, { db, pubsub }, info) {
    // const { id, data } = args;
    // const post = db.posts.find(post => post.id === id);
    // const originalPost = { ...post };
    //
    // if (!post) {
    //   throw new Error('Post not found');
    // }
    //
    // if (typeof data.title === 'string') {
    //   post.title = data.title;
    // }
    //
    // if (typeof data.body === 'string') {
    //   post.body = data.body;
    // }
    //
    // if (typeof data.published === 'boolean') {
    //   post.published = data.published;
    //
    //   if (originalPost.published && !post.published) {
    //     pubsub.publish('post', {
    //       post: {
    //         mutation: 'DELETED',
    //         data: originalPost,
    //       },
    //     });
    //   } else if (!originalPost.published && post.published) {
    //     pubsub.publish('post', {
    //       post: {
    //         mutation: 'CREATED',
    //         data: post,
    //       },
    //     });
    //   } else if (originalPost.published && post.published) {
    //     pubsub.publish('post', {
    //       post: {
    //         mutation: 'UPDATED',
    //         data: post,
    //       },
    //     });
    //   }
    // } else if (post.published) {
    //   pubsub.publish('post', {
    //     post: {
    //       mutation: 'UPDATED',
    //       data: post,
    //     },
    //   });
    // }
    //
    // return post;
  },

// MORE CODE
```

* After

```
// MORE CODE

  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },

// MORE CODE
```

* GraphQL :4000

```
mutation {
  updatePost(id: "cjxcmmhtq01xh07592yu13rsf", data: {
    body: "love soccer",
    published: true,
    title: "win world cup"
  }){
    id
    title
    body
    published
  }
}
```

## Comment Mutations
* We made a change to our datamodel.prisma by adding the `comments` field

```
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  posts: [Post!]! @relation(name: "PostToUser", onDelete: CASCADE)
  comments: [Comment!]! @relation(name: "CommentToUser", onDelete: CASCADE)
}

type Post {
  id: ID! @id
  title: String!
  body: String!
  published: Boolean!
  author: User! @relation(name: "PostToUser", onDelete: SET_NULL)
  comments: [Comment!]! @relation(name: "CommentToPost", onDelete: CASCADE)
}

// MORE CODE
```

## Don't forget to Re-Fetch the prisma generated file
* When we added that it wasn't a big deal but when we integrate with `prisma-bindings` we need to make sure that the prisma app is not just deployed but that our generated file is ALSO REFETCHED whenever prisma is deployed

### Refetch the generated script
`ctrl` + `c` to shut down the terminal

* Remember we setup `get-schema` inside `package.json`

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

### Run get-schema script
`$ npm run get-schema`

* You should see a success message in the Terminal:

```
project prisma - Schema file was updated: src/generated/prisma.graphql
```

* Now we can restart our application and use the Prisma bindings related to the comments

### Refactor all 3 comment-based Mutations
* Start your local server with `$ npm start`

```
  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          post: {
            connect: {
              id: args.data.post,
            },
          },
          author: {
            connect: {
              id: args.data.author,
            },
          },
        },
      },
      info
    );
  },

  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({
      where: {
        id: args.id,
      },
    });
  },

  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
};

export { Mutation as default };
```

* GraphQL :4000

```
query {
  comments {
    id
    text
    author {
      id
      name
    }
    post {
      id
      title
    }
  }
}
```

* Delete comment

```
mutation {
  deleteComment(id: "cjxdhsch803080759xhk9uxr0") {
    id
  }
}
```

* Update comment

```
mutation {
  updateComment(id: "cjxdhpppi02y50759jz37ow1p", data: {
    text: "love me do"
  }) {
    id
    text
  }
}
```

## Final Mutation.js
```
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    return prisma.mutation.createUser({ data: args.data }, info);
  },
  async deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },
  async updateUser(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  createPost(parent, args, { prisma }, info) {
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author,
            },
          },
        },
      },
      info
    );
  },

  deletePost(parent, args, { prisma }, info) {
    return prisma.mutation.deletepost(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },

  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          post: {
            connect: {
              id: args.data.post,
            },
          },
          author: {
            connect: {
              id: args.data.author,
            },
          },
        },
      },
      info
    );
  },

  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({
      where: {
        id: args.id,
      },
    });
  },

  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
};

export { Mutation as default };
```

## Next
1. Subscriptions
2. Authentication
