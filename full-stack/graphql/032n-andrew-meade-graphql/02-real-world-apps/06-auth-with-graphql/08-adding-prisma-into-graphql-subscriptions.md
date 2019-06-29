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

## Data flow
* Data flows in our app from Prisma to Node.js than from Node.js to the client
  - We this works well with our Queries and Mutations

```
Prisma --> Node --> Client (GraphQL Playground)
```

* The same process will happen with our subscriptions
* But there is a PROBLEM!
  - The data that Prisma is sending Node.js currently does not align with the data that Node.js is sending the client
  - This means we will LOSE DATA as data flows through the app

## Let's Illustrate this data loss via the app schemas

### localhost:4466
* Looking at the Docs we see 4 fields coming back from the comment Subscription
  - mutation
  - node
  - updateFields
  - previousValues

### localhost:4000
* But if we go over to localhost:4000 we can see what the `Node.js` API sends the client
  -  There are only 2 fields in the comment subscription
    +  mutation
    +  data

* So if Prisma sends all these fields to Node.js
  - mutation
  - node
  - updateFields
  - previousValues
* But Node.js only sends these fields to the client
  - mutation
  - data
* This means ---- not all of the data is getting to the client
  - First of all, there is no `data` field coming back from Prisma so things would fail
  - We are saying that `data` is required and we made that non-nullable but Prisma doesn't send back a data field so currently Node.js really can't serve as a middle man and in this case is not a good middle man

## Solution
* Align the type definition in `:4466` (Prisma) closer with the type definition in Node.js `:4000`
  - Currently, the only data that would successfully make it all the way to the client is the Mutation field because it is sent between `Node.js` and the client and it is sent between Prisma and `Node.js`

`schema.graphql`

```
// MORE CODE
type CommentSubscriptionPayload {
  mutation: MutationType!
  data: Comment!
}
```

* We will change the name of data to align it with what Prisma is already sending Node.js (and it is calling it `node`)

`schema.graphql`

```
// MORE CODE
type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment! # MODIFY THIS LINE!!!!!
}
```

* Yes this is confusing
  - Prisma is sending the data to Node.js
  - The field is called node and this is what represents the data
  - With respect to the Comment Subscription this is where we would get the comment that was created/updated or deleted

* You will see that Prisma allows null to be nullable

![nullable node](https://i.imgur.com/XwDdOsv.png)

* So we will do the same thing:

`schema.graphql`

```
// MORE CODE
type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment ## REMOVE the "!"
}
```

* Now our subscription will be useful
  - We still won't be able to get a hold of `updatedFields` or `CommentPreviousValues` but that is OK
    + We are going to be able to access what we need to access
      * `mutation` and `node`

## Now let's test this out
`Subscriptions.js`

```
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

### We will subscribe to comment using :4000
* Comment does take a post id and we'll address that in a moment
* There is no longer a `data` field, we change that to `node`

```
subscription {
  comment(postId: "10") {
    mutation
    node {
      id
      text
      author {
        id
        name
      }
    }
  }
}
```

* Run it and we will start to listen and should be notified if comment gets created/updated or deleted

## Now we'll interact with some data and Create a comment
* Create a new comment

```
subscription {
  comment(postId: "10") {
    mutation
    node {
      id
      text
      author {
        id
        name
      }
    }
  }
}
```

* Then check your subscription tab that is listening and you will see:

```
{
  "data": {
    "comment": {
      "mutation": "CREATED",
      "node": {
        "id": "cjxfbr3qv09wt0759266fu3ja",
        "text": "I am listening to you",
        "author": {
          "id": "cjxcfh7nx01f00759zfvdok8l",
          "name": "JumpinJackFlash"
        }
      }
    }
  }
}
```

* We see that the mutation was CREATED
* And we have all of the data of our newly created comment

## Test for a comment updated
* Grab the id of the comment you just created from above

```
mutation {
  updateComment(
    id: "cjxfbr3qv09wt0759266fu3ja"
    data: { text: "updated a comment yo" }
  ) {
    id
    text
  }
}
```

* Check to see the comment notification says something like:

```
{
  "data": {
    "comment": {
      "mutation": "UPDATED",
      "node": {
        "id": "cjxfbr3qv09wt0759266fu3ja",
        "text": "updated a comment yo",
        "author": {
          "id": "cjxcfh7nx01f00759zfvdok8l",
          "name": "JumpinJackFlash"
        }
      }
    }
  }
}
```

## Test if deleted
```
mutation {
  deleteComment(id: "cjxfbr3qv09wt0759266fu3ja") {
    id
  }
}
```

* And you should see a notification like (in subscription tab):

```
{
  "data": {
    "comment": {
      "mutation": "DELETED",
      "node": null
    }
  }
}
```

* Notice we are getting `null` sent back when we delete a comment and this is why it was important for us to convert `node` from non-nullible to nullible
  - When you delete a comment there is nothing to return and this is what is getting sent back

## All of this was possible because we added this one line
`Subscriptions.js`

```
// MORE CODE

const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment(null, info); // THIS ONE LINE

// MORE CODE
```

## Now we need to take the post id into account
* Making sure to subscribe to just comments for a particular post
* We'll remove all the comments we had in comment subscription

```
// MORE CODE

const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment(null, info);
    },
  },

// MORE CODE
```

## Now we'll provide operation arguments
```
const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment({
        where: {
          // here we determine what criteria we want to use to determine what comments we want to subscribe to
        }
      }, info);
    },
  },

// MORE CODE
```

* We can refer to the `Docs` tag at `localhost:4466`
  - We click on the `where:` under Arguments and we see we have a lot of choices

![where choices for comment subscriptions where](https://i.imgur.com/diWgyei.png)

* Many of these are not related to anything specific about the comment itself
  - example
    + mutation_in: allows us just to subscribe to just created mutations or just deleted mutations
    + updatedFields+contains: allows us to subscribe to when a specific field changes
* In our case we want to use `node`
  - We want to subscribe to comments "where" we specify something about that comment (there are a ton of choices to choose from)
  - We don't care about what the comment is at all what we do care about is the post of the comment - specifically does the post id align with the id that got passed in
    + We can use `post` (select it) and then we'll see all of the same fields over again and in this case we'll use `id:ID` to look at that post id

![full path to post id](https://i.imgur.com/k4bKh4y.png)

`Subscription.js`

```
const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info);
    },
  },

// MORE CODE
```

* At the end of the day this is the exact object that is going to allow us to subscribe to comments for a specific post

## Now we'll test things out
* We are trying to subscribe to comments for a post where the post id is 10 that no longer exists in our application since we are using real randomly generated ids, so we expect to never see an event

```
subscription {
  comment(postId: "10") {
    mutation
    node {
      id
      text
      author {
        id
        name
      }
    }
  }
}
```

* Run it to start listening for events on comments

## Create a comment
```
mutation {
  createComment(
    data: {
      text: "aaa"
      author: "cjxcfh7nx01f00759zfvdok8l"
      post: "cjxcmmhtq01xh07592yu13rsf"
    }
  ) {
    id
    text
    author {
      id
      name
    }
  }
}
```

* Check the comments subscription in `localhost:4000` and there is no event

## Now run subscription again with a valid post id
* Grab a valid post id from the createComment tab of localhost:4000 and paste that id into the subscription tab

```
subscription {
  comment(postId: "cjxcmmhtq01xh07592yu13rsf") {
    mutation
    node {
      id
      text
      author {
        id
        name
      }
    }
  }
}
```

* Now create another comment using that post id

```
mutation {
  createComment(
    data: {
      text: "bbb"
      author: "cjxcfh7nx01f00759zfvdok8l"
      post: "cjxcmmhtq01xh07592yu13rsf"
    }
  ) {
    id
    text
    author {
      id
      name
    }
  }
}
```

* Check the subscription tab again for comment and you will see:

```
{
  "data": {
    "comment": {
      "mutation": "CREATED",
      "node": {
        "id": "cjxfcoxfl0aha0759kbixelz4",
        "text": "bbb",
        "author": {
          "id": "cjxcfh7nx01f00759zfvdok8l",
          "name": "JumpinJackFlash"
        }
      }
    }
  }
}
```

## Challenge
* Do exact same thing for post subscription

### Goal: Set up the post subscription to work with Prisma
1. Update schema.graphql to use 'node' as nullable instead of "data" for posts
2. Update the subscribe method to use the correct prisma method
  * Limit the subscriptions to posts that are published using "where" argument
3. Test your work. Subscribe to posts and then create a published and unpublished post

### Starting point
`Subscription.js`

```
// MORE CODE

  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },

// MORE CODE
```

1. Update schema.graphql to use 'node' as nullable instead of "data" for posts

`schema.graphql`

* Change this:

```
type PostSubscriptionPayload {
  mutation: MutationType!
  data: Post!
}
```

* To this:

```
type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
}
```

2. Update the subscribe method to use the correct prisma method
  * Limit the subscriptions to posts that are published using "where" argument
  * Limit the subscriptions to just posts that are actually published

`Subscription.js`

```
// MORE CODE
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
};

export { Subscription as default };

```

3. Test your work. Subscribe to posts and then create a published and unpublished post

```
subscription {
  post {
    mutation
    node {
      id
      title
      body
      author {
        id
        name
      }
    }
  }
}
```

* Create a post that is published

```
mutation {
  createPost(data: {
    title: "Post Up",
    body: "Win tonight!",
    published: true,
    author: "cjxcfh7nx01f00759zfvdok8l"
  }) {
    id
    title
    body
    published
    author {
      id
      name
    }
  }
}
```

* Create a post that is not published and you will not be notified

## Recap
* We have our 2 subscriptions set up
  - In both cases we customize what "comes back"
    + comment - we are returning just comments for a particular post
    + post - we are returning just posts that are published
