# Expanding the Comments Subscriptions for Updates and Deletes
## Challenge
* Goal: Setup CREATED, UPDATED, and DELETED for comment subscriptions

1. Set up a custom payload type for comment subscription with "mutation" and "data"

`schema.graphql`

```
// MORE CODE

type Subscription {
  // MORE CODE
  comment(postId: ID!): CommentSubscriptionPayload!

}

// MORE CODE

type CommentSubscriptionPayload {
  mutation: String!
  data: Comment!
}

// MORE CODE
```


2. Update publish call in `createComment` to send back **CREATED** with the data

`Mutation.js`

```
// MORE CODE

  createComment(parent, args, { db, pubsub }, info) {
    // MORE CODE

    pubsub.publish(`comment ${data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment,
      },
    });

    return comment;
  },

// MORE CODE
```

3. Add publish call in `deleteComment` using **DELETED** event

```
// MORE CODE

deleteComment(parent, args, { db, pubsub }, info) {
  const { id } = args;

  // check if the comment exists
  const commentIndex = db.comments.findIndex(comment => comment.id === id);

  // if no comment throw an error
  if (commentIndex === -1) {
    throw new Error('Comment not found');
  }

  const [deletedComment] = db.comments.splice(commentIndex, 1);

  pubsub.publish(`comment ${deletedComment.post}`, {
    comment: {
      mutation: 'DELETED',
      data: deletedComment,
    },
  });

  return deletedComment;
},

```

4. Add publish call in `updateComment` using **UPDATED** event

```
// MORE CODE

  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;

    // search for comment
    const comment = db.comments.find(comment => {
      return comment.id === id;
    });

    // if no comment - throw error
    if (!comment) {
      throw new Error('Comment not found');
    }

    // make sure text is a string
    if (typeof data.text === 'string') {
      // update text
      comment.text = data.text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment,
      },
    });

    // return required updated comment
    return comment;
  },

// MORE CODE
```

5. Test your work by creating, updating and deleting a comment

## Test createComment
* Add the comment subscription

```
subscription {
  comment(postId: "10") {
    mutation
    data {
      id
      text
    }
  }
}
```

* You will get a response similar to this:

```
{
  "data": {
    "createComment": {
      "id": "1359ac89-dd56-436a-aeeb-1eebda06d26e",
      "text": "three",
      "author": {
        "id": "3",
        "name": "Jack"
      }
    }
  }
}
```

* Now update a comment and use the `comment` id generated above (substitute your own)

```
mutation {
  updateComment(id: "1359ac89-dd56-436a-aeeb-1eebda06d26e", data: {
    text: "hey hey we are the monkeys"
  }) {
    id
    text
  }
}
```

* Will give you the following in your listening comment subscription

```
{
  "data": {
    "comment": {
      "mutation": "UPDATED",
      "data": {
        "id": "1359ac89-dd56-436a-aeeb-1eebda06d26e",
        "text": "hey hey we are the monkeys"
      }
    }
  }
}
```

* Use the same `id` to delete a comment

```
mutation {
  deleteComment(id: "1359ac89-dd56-436a-aeeb-1eebda06d26e") {
    id
  }
}
```

* And here is the comment subscription response

```
{
  "data": {
    "comment": {
      "mutation": "DELETED",
      "data": {
        "id": "1359ac89-dd56-436a-aeeb-1eebda06d26e",
        "text": "hey hey we are the monkeys"
      }
    }
  }
}
```




