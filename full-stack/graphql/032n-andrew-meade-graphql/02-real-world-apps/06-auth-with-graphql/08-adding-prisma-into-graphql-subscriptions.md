# Adding Prisma into GraphQL Subscriptions
* Prisma has built in support for subscriptions
* Setup process is way easier
    - Before we had a buncho of pubsub calls
    - With Prisma all that happens behind the scenes

## GraphQL :4466
* Let's experiment with what Prisma gives us
* Prisma gives us one subscription for what we have defined inside datamodel.prisma

`prisma/datamodel.prisma`

* This file is what is autogenerating our entire GraphQL API including our 3 subscriptions

![3 subscriptions from Prisma](https://i.imgur.com/ZuhVrlJ.png)

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


type Comment {
  id: ID! @id
  text: String!
  author: User! @relation(name: "CommentToUser", onDelete: SET_NULL)
  post: Post! @relation(name: "CommentToPost", onDelete: SET_NULL)
}
```

## Subscriptions
```
// MORE CODE

const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment(null, info);
      //   // We have 2 jobs
      //   // 1. Determin if that post actually exists and it is published
      //   const post = db.posts.find(post => {
      //     return post.id === postId && post.published;
      //   });
      //
      //   // throw error if no post
      //   if (!post) {
      //     throw new Error('Post Not Found');
      //   }
      //
      //   // 2. Return an asyncIterator with a valid channel name
      //   return pubsub.asyncIterator(`comment ${postId}`); // "comment 44"
    },
  },

// MORE CODE
```

* We never have to use pubsub in our code
* Prisma already knows when the Database is changing because it's code is in charge of changing it, this makes it easy for Prisma to manage the subscription allowing use to reduce the complexity of our code


