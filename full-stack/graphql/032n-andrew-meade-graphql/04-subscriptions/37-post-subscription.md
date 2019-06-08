# Setting up a Post Subscription
## Challenge - Create post subscription
* Allow client to subscribe to new posts so client will be notified whenever there is a new post

### Goal - Create a subscription for new posts
1. Define "post" subscription. No arguments are necessary. Response should be a post object.
2. Setup the resolver post. Since there are no args, a channel name like "post" is fine.
3. Modify the `mutation` for creating a post to publish the new post data.
    - Only call `pubsub.publish` if the post had "published" set to true.
    - Don't worry about `updatePost` or `deletePost`.
4. Test your work!

#### Solution
1. Define "post" subscription. No arguments are necessary. Response should be a post object.

`schema.graphl`

```
// MORE CODE

type Subscription {
  // MORE CODE

  post: Post!
}

// MORE CODE
```

2. Setup the resolver post. Since there are no args, a channel name like "post" is fine.

`Subscription.js`

```
// MORE CODE
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};

export { Subscription as default };
```

3. Modify the `mutation` for creating a post to publish the new post data.
    - Only call `pubsub.publish` if the post had "published" set to true.
    - Don't worry about `updatePost` or `deletePost`.

`Mutation.js`

```
// MORE CODE

createPost(parent, args, { db, pubsub }, info) {
  const { data } = args;

// MORE CODE

    db.posts.push(post);

    if (post.published) {
      pubsub.publish('post', { post });
    }

    return post;
  },
```

4. Test your work!

* createPost GraphQL Playground

```
mutation {
  createPost(data: {
    title: "Yo Sub",
    body: "This is a challenge",
    published: true,
    author: "1",
  }) {
    id
    title
  }
}
```

* Create and see if Post subscription is notified when you create a post

```
subscription {
  post {
    id
    title
    body
    author {
        id
        name
    }
  }
}
```

* GraphQL Playground Response

```
{
  "data": {
    "post": {
      "id": "fc1a7160-44eb-415d-afa0-2a0d43ac74cd"
    }
  }
}
```

* Test a post that `published` is false and make sure that the subscription does not return that post

## Clean up
* Remove count subscription (not needed anymore)

`Subscription.js`

```
const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      // We have 2 jobs
      // 1. Determin if that post actually exists and it is published
      const post = db.posts.find(post => {
        return post.id === postId && post.published;
      });

      // throw error if no post
      if (!post) {
        throw new Error('Post Not Found');
      }

      // 2. Return an asyncIterator with a valid channel name
      return pubsub.asyncIterator(`comment ${postId}`); // "comment 44"
    },
  },

  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};

export { Subscription as default };
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};

export { Subscription as default };
```

* Also move it from

`schema.graphql`

```
// MORE CODE

type Subscription {
  comment(postId: ID!): Comment!
  post: Post!
}

// MORE CODE
```
