# Setting up Comments Subscription
* Real world example of Subscription
* Create 2 subscriptions that work with our blog

1. One Subscription for subscribing to new comments on a particular post
    * This will enable you to get all new comments as they are added in real time
2. Second Subscription allowing you to get new posts
    * Whenever someone publishes a new post you will be notified and you can do something with that data

`schema.graphql`

```
// MORE CODE

type Subscription {
  count: Int!
  comment: Comment!
}

// MORE CODE
```

### But our comment will take an argument
* The syntax for Subscription arguments will be identical to syntax for arguments for Querys and Mutations

`schema.graphql`

```
// MORE CODE

type Subscription {
  count: Int!
  comment(postId: ID!): Comment!
}

// MORE CODE
```

* We are now allowing you to subscribe to comments for a particular post but you do have to provide the ID of the post you are trying to subscribe to

## Congrats! Our schema defintion is all done for this first practical subscription
* Now we'll jump to `Subscription.js` and work on our resolver method

`Subscription.js`

```
// MORE CODE

    },
    comment: {
      subscribe(parent, args, ctx, info) {
        // We have 2 jobs
        // 1. Determin if that post actually exists and it is published
        // 2. Return an asyncIterator with a valid channel name
      }
    }
  },
};

export { Subscription as default };

// MORE CODE
```

## How can we get the `postId` argument?
* We added this argument to our comment subscription

```
// MORE CODE

type Subscription {
  count: Int!
  comment(postId: ID!): Comment!
}

// MORE CODE
```

* So we have access to `postId` through `args` and if we destructure it we can grab it like this:

```
// MORE CODE

 comment: {
      subscribe(parent, { postId }, ctx, info) {
        // We have 2 jobs
        // 1. Determin if that post actually exists and it is published
        // 2. Return an asyncIterator with a valid channel name
      }
    }
// MORE CODE
```

* We are going to need our db to search through all the posts
    - So let's destructure db like we did before

    ```
    // MORE CODE

     comment: {
          subscribe(parent, { postId }, { db }, info) {
            // We have 2 jobs
            // 1. Determin if that post actually exists and it is published
            // 2. Return an asyncIterator with a valid channel name
          }
        }
    // MORE CODE
    ```

* We check for the post and throw an error if we don't find it

```
// MORE CODE

    comment: {
      subscribe(parent, { postId }, { db }, info) {
        // We have 2 jobs
        // 1. Determin if that post actually exists and it is published
        const post = post.find(post => {
          return post.id === postId && post.published;
        });

        // throw error if no post
        if (!post) {
          throw new Error('Post Not Found');
        }

        // 2. Return an asyncIterator with a valid channel name
      },

// MORE CODE
```

* We need pubsub so we'll destructure it off of `ctx` argument
    - We will use `pubsub.asyncIterator()`
    - We will pass `pubsub.asyncIterator()` a channel name
        + There is no standard yet for this but make sure to:
            1. Pick a pattern
            2. Stick with it throughout your application
            3. Our pattern will be
                * Use a template string so we can easily inject that postId
                * We'll use the actual subscription name (lowercase)
                * **return pubsub.asyncIterator(`comment ${postId`)
* If there is a post then we are good to go and we can subscribe to that data

```
// MORE CODE

        // 2. Return an asyncIterator with a valid channel name
        return pubsub.asyncIterator(`comment ${postId}`); // "comment 44"
      },
    },
  },
};

export { Subscription as default };
```

* We are done inside `Subscription.js`

`Subscription.js`

```
// MORE CODE

    comment: {
      subscribe(parent, { postId }, { db, pubsub }, info) {
        // We have 2 jobs
        // 1. Determin if that post actually exists and it is published
        const post = post.find(post => {
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

// MORE CODE
```

1. We verified that the post exists
2. We return the asyncIterator which allows the subscription to actually happen
3. Now we need to use `pubsub.publish` at the correct moment

## Important make sure your Subscription is structured properly
* Make sure it looks like this:

`Subscription.js`

```
const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish('count', {
          count,
        });
      }, 1000);

      return pubsub.asyncIterator('count');
    },
  },

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
};

export { Subscription as default };
```

## When do comments get created?
* In our `Mutation.js` with `createComment` method
* Since this is the exact place where comments get created so this is the best place to call `pubsub.publish`
* Since we are calling the `publish` method on the pubsub object we need to destructure it on the `ctx` object argument

### When should we call `pubsub.publish()`?
* We'll call it right after it is added to the comments array
* Remember to pass the 2 arguments when we call `pubsub.publish`
    - 1. The channel name + the postId (we have access to the postId from the data.post)
    - 2. The second argument is our object and on that we have to provide a value for the comment property, this matches up with the subscription name and that value needs to be whatever we expected to come back which is this case is `Comment!` and we have that already on the comment variable above

`Mutation.js`

```
// MORE CODE

    db.comments.push(comment);
    pubsub.publish(`comment ${data.post}`, { comment: comment });
    return comment;
  },

// MORE CODE
```

* That can be simplified to:

```
// MORE CODE

    db.comments.push(comment);
    pubsub.publish(`comment ${data.post}`, { comment });
    return comment;
  },

// MORE CODE
```

* The full code for the `createComment` Mutation

`Mutation.js`

```
// MORE CODE

  createComment(parent, args, { db, pubsub }, info) {
    const { data } = args;
    const userExists = db.users.some(user => user.id === data.author);

    if (!userExists) {
      throw new Error('User not found');
    }

    const postExists = db.posts.some(post => {
      return post.id === data.post && post.published;
    });

    if (!postExists) {
      throw new Error('Post not found!');
    }

    const comment = {
      id: uuidv4(),
      ...data,
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${data.post}`, { comment });
    return comment;
  },

// MORE CODE
```

## We are ready to test in GraphQL Playground
* Let's see our posts

```
query {
  posts {
    id
    title
    published
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

* GraphQL Playground Result

```
{
  "data": {
    "posts": [
      {
        "id": "10",
        "title": "soccer",
        "published": true,
        "author": {
          "id": "1",
          "name": "Manny"
        },
        "comments": [
          {
            "id": "103",
            "text": "Not better than cats"
          }
        ]
      },
      {
        "id": "11",
        "title": "basketball",
        "published": false,
        "author": {
          "id": "1",
          "name": "Manny"
        },
        "comments": [
          {
            "id": "104",
            "text": "Was this about cats?"
          }
        ]
      },
      {
        "id": "12",
        "title": "tennis",
        "published": true,
        "author": {
          "id": "2",
          "name": "Mo"
        },
        "comments": [
          {
            "id": "105",
            "text": "I am not a cat lover"
          },
          {
            "id": "efb5542e-e4e6-4189-a71c-e6a59ffa1704",
            "text": "two"
          },
          {
            "id": "456b1423-9d05-46af-8efd-8cc58cc09aba",
            "text": "two"
          },
          {
            "id": "f1651077-af13-4e23-b165-16d24f971f98",
            "text": "three"
          },
          {
            "id": "69775703-6324-4832-8743-88c50f470a15",
            "text": "three"
          }
        ]
      }
    ]
  }
}
```

* Look at published and we see we only have 2 published posts
* That means we can work with postId of `10` or `12`
* I will use post id `10` and on that I will create a comment
* I first create my subscription to `createComment`

```
subscription {
  comment(postId: "12") {
    id
    text
    author {
      id
      name
    }
  }
}
```

## Let's use comment subscription we just created in GraphQL Playground
* We'll repurpose the count subscription as we'll delete that soon
* We set up `comment(postId: "10")` and pass in the one argument we know we are required to pass in
* We know that comment sends a comment object back so we'll have to provide a selection set determine what we want for each comment
    - We want
        + The comment id
        + The text
        + Information about the author who made the comment (id and name)

## Write the subscription GraphQL Playground
```
subscription {
  comment(postId: "12") {
    id
    text
    author {
      id
      name
    }
  }
}
```

* Execute and you will see it is listening...
* Now write a comment

```
mutation {
  createComment(data: { text: "three", author: "3", post: "10" }) {
    id
    text
    author {
      id
      name
    }
  }
}
```

* Jump back to your `listening` subscription and you will see:
  - If you see nothing did you connect to the correct channel? (should be post id of 10)

```
{
  "data": {
    "comment": {
      "id": "440e87a3-5225-4d76-b247-33999e1c8678",
      "text": "three",
      "author": {
        "id": "3",
        "name": "Jack"
      }
    }
  }
}
```

* If you try to add a comment to an unpublished post you will not see anything in subscription
  - You will get `Post Not Found` error
* If you add a comment to a post you didn't subscribe to you will see nothing because you added a comment to a post you didn't subscribe to :)

## Next
* We'll learn about subscribing to comment updates and comments removed
* Challenge to use your knowledge to create subscriptions
