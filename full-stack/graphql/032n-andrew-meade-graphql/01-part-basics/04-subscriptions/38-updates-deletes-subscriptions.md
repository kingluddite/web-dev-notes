# Expanding the posts subscription for edits (updates) and deletes
* Data can be
    - created
    - updated
    - deleted
* Alert the user on all 3
* Currently our comment and post only notify on creation
* But if a comment or post if updated or created we do not know and this defeats the purpose of subscriptions
    - We subscribe to data to keep the client and server in sync

## Changing structure
* When we create a comment that we subscribe to we get this response

```
{
  "data": {
    "comment": {
      "id": "85326664-6bc0-41c3-b30e-2a88d6f151fe",
      "text": "three",
      "author": {
        "id": "3",
        "name": "Jack"
      }
    }
  }
}
```

* We need to change the structure to know if this was a create comment or update or delete comment
* We will add a new `mutation` field with a string value of:
    - `created`
    - `updated`
    - `deleted`

## Create a new type
### PostSubscriptionPayload
* This is a common naming convention

`schema.graphql`

```
// MORE CODE
type PostSubscriptionPayload {
  mutation: String!
  data: Post!
}
```

* You will always get a string back when using this type
* You will also always get the data back as a `Post`

### Update our post subscription
`schema.graphql`

```
// MORE CODE
type Subscription {
  // MORE CODE

  post: PostSubscriptionPayload!
}
```

* This is a non-nullable field so you will never be notified about a post if a PostSubscriptionPayload is not provided

## We don't need to change Subscription.js at all!
* All our changes happen in `Mutation.js`
* This is our current structure we need to modify to fit our new changes

`Mutation.js`

```
// MORE CODE

    db.posts.push(post);
    if (post.published) {
      pubsub.publish('post', { post });
    }

// MORE CODE
```

* We still will send a post
* And our second argument will still send an object but inside that object we'll send a nested `post` object with both our fields we defined in `PostSubscriptionPayload`
    - Like this:

`Mutation.js`

```
// MORE CODE

    db.posts.push(post);

    if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }

    return post;
  },

// MORE CODE
```

* It is a common naming convention to spell the CREATED, UPDATED or DELETED in uppercase letters

## Test if it still works
* Create a post and see if we still see the notification from our post subscription
* Remember we changed the structure so we'll need to alter our test slightly to fit this change

```
subscription {
  post {
    mutation
    data {
      id
      title
      author {
        id
        name
      }
    }
  }
}
```

* Create a post

```
mutation {
  createPost(data: {
    title: "yo you ma",
    body: "yes",
    published: true
    author: "1"
  }) {
    id
    title
    body
  }
}
```

You should be notified in the subscription when you create the post

## Delete a post subscription
* Gets a little tricky here
* When we're deleting a post we don't always want to alert subscribers especially if we have a draft post that we don't want people to see

`schema.graphql`

```
// MORE CODE

type Mutation {
  // MORE CODE

  deletePost(id: ID!): Post!

  // MORE CODE
}

// MORE CODE
```

`Mutation.js`

```
// MORE CODE

    // before we notify subscribers that the post was deleted
    // make sure it was a published post
    if (deletedPosts[0].published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: deletedPosts[0]
        }
      })
    }
    return deletedPosts[0];
  },

// MORE CODE
```

* But `deletedPosts[0]` can be destructured using **array destructuring** which will make our code a lot cleaner

### How to destructure an array
* Before

```
const deletedPosts = db.posts.splice(postIndex, 1);
```

* After

```
const [post] = db.posts.splice(postIndex, 1);
```

* **note** I can choose any names for the array elements
  - like this: [a, b, c]
  - In this case we know we only have one array element so we'll name it something appropriate like [post]
  - Also don't forget to add `pubsub` to the **ctx**

`Mutation.js`

```
// MORE CODE

deletePost(parent, args, { db, pubsub}, info) {
  const { id } = args;

  // check if post exists
  const postIndex = db.posts.findIndex(post => post.id === args.id);

  // if no post found throw error
  if (postIndex === -1) {
    throw new Error('No Post Found');
  }

  // capture the deleted post so you can return
  const [post] = db.posts.splice(postIndex, 1);

  db.comments = db.comments.filter(comment => comment.post !== id);

  // before we notify subscribers that the post was deleted
  // make sure it was a published post
  if (post.published) {
    pubsub.publish('post', {
      post: {
        mutation: 'DELETED',
        data: post
      }
    })
  }
  return post;
},

// MORE CODE
```

* Now our above code is much easier to read

## Test `deletePost` subscription
* In GraphQL Playground start up the `post` subscription so that it is listening

```
subscription {
  post {
    mutation
    data {
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

### Delete a post
* With an `id` of 12

```
mutation {
  deletePost(id: "12") {
    id
  }
}
```

* Response

```
{
  "data": {
    "deletePost": {
      "id": "12"
    }
  }
}
```

* And view the posts subscription response notification

```
{
  "data": {
    "post": {
      "mutation": "DELETED",
      "data": {
        "id": "12",
        "title": "tennis",
        "body": "2 players",
        "author": {
          "id": "2",
          "name": "Mo"
        }
      }
    }
  }
}
```

* Try to delete a post `id` that doesn't exist (like 11)
* You will see that you receive no notification since there was no post to delete

## updatePost method
* This is the most confusing of the 3 types of mutation events
* **Remember** Updating a post may not be just updating a post
  - If I publish a post using updatePost I want to send out that created event
  - If I UNpublish a post using updatePost I want to send out that deleted event
  - If I change the title and or body of a post I want to send out the updated event
  - In reality updatePost could be firing out all 3 types of mutation events

### First let's write ugly code
* We will refactor later and make it prettier code

`Mutation.js`

```
// MORE CODE

  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const post = db.posts.find(post => {
      return post.id === id;
    });
    const originalPost = { ...post };

    if (!post) {
      throw new Error('Post Not Found');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.professionalLeague === 'string') {
      post.professionalLeague = data.professionalLeague;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost,
          },
        });
      } else if (!originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost,
          },
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post,
          },
        });
      } else if (post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'UPDATED',
            data: post,
          },
        });
      }
    }

    return post;
  },

// MORE CODE
```

* Inside our check if we have a type of `boolean`
* Our nested if statement will only run if a user provided a published status
  - This will allow us to know if the post published (post is being created) or if post is unpublished (which means post is being deleted)

```
// MORE CODE

    if (typeof data.published === 'boolean') {
      post.published = data.published;

// MORE CODE
```

* But we need to know what the post published value was before it was changed
* We'll need to create a new variable `originalPost` that will be a clone of post at this point in time before any changes
  - How do you clone post?
    + We'll use the object spread operator which will create a new object and spreading out all the fields from post and assigning it to originalPost

```
// MORE CODE

  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const post = db.posts.find(post => {
      return post.id === id;
    });
    const originalPost = { ...post };

// MORE CODE
```

* Now we'll use that later in our code and we'll use conditional logic to determine if the post was published but is now unpublished
* And if that logic is true that is where we will fire the deleted event

```
// MORE CODE

    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        // fire the deleted event

// MORE CODE
```

* Else if it was originally not published and now is published (it is being CREATED)

```
// MORE CODE

      if (originalPost.published && !post.published) {
        // fire the deleted event
       
      } else if (!originalPost.published && post.published) {
        // fire the created event
      }
// MORE CODE
```

* Last type of update we can have if it is actually just being updated and the published value isn't being changed

```
// MORE CODE

      if (originalPost.published && !post.published) {
        // fire the deleted event
      } else if (!originalPost.published && post.published) {
       // created
      } 
    } else if (post.published) {
        // updated
      }
    
    return post
  },

// MORE CODE
```

* Add pubsub via destructuring

```
// MORE CODE

  updatePost(parent, args, { db, pubsub }, info) {

// MORE CODE
```

* publish the subscriptions
* start with the deleted event
  - For deleted we won't use `post` which contains the new data because someone might have updated the title and body while they were unpublishing the post (all in the same operation)
  - And we don't want to leak that data when they might not have thought that is how it worked
    + So we'll publish the old data `originalPost` (this way will get back the original data without any of the changes that were made for this particular operation)

```
// MORE CODE

    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        // fire the deleted event
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost,
          },
        });
        
      } else if (!originalPost.published && post.published) {
        
      } else if (post.published) {
       // updated 
      }
    }

    return post;
  },

// MORE CODE
```

* The created event
  - This is like the post is being created because it is going from unpublished to published

```
if (originalPost.published && !post.published) {
  pubsub.publish('post', {
    post: {
      mutation: 'DELETED',
      data: originalPost,
    },
  });
} else if (!originalPost.published && post.published) {
  pubsub.publish('post', {
    post: {
      mutation: 'CREATED',
      data: post,
    },
  });
} else if (post.published) {
```

* Last the updated

```
// MORE CODE

      if (originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost,
          },
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post,
          },
        });
      }
    } else if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post,
        },
      });
    }

    return post;
  },

// MORE CODE
```

* Test things out

1. Run our post subscription
2. Use updatePost to update a post in various ways to make sure that all 3 of our conditions fire

```
mutation {
  updatePost(id: "11", data: {
    published: true
  }){
    id
    title
    body
  }
}
```

* This 11 id post was not published
* We change it to published and we should get a 
* Check out the post subscription and you'll see CREATED

```
{
  "data": {
    "post": {
      "mutation": "CREATED",
      "data": {
        "id": "11",
        "title": "basketball",
        "body": "yes yes yes!",
        "author": {
          "id": "1",
          "name": "Manny"
        }
      }
    }
  }
}
```

* Update same post to false and you will see DELETED

```
{
  "data": {
    "post": {
      "mutation": "DELETED",
      "data": {
        "id": "11",
        "title": "basketball",
        "body": "yes yes yes!",
        "author": {
          "id": "1",
          "name": "Manny"
        }
      }
    }
  }
}
```

* Change post 10's body to "yesssssss!"

```
mutation {
  updatePost(id: "11", data: {
    body: "yesssssss!",
    published: true
  }){
    id
    title
    body
  }
}
```

* if you change a post from false to true via publish you will get

```
{
  "data": {
    "post": {
      "mutation": "CREATED",
      "data": {
        "id": "10",
        "title": "soccer",
        "body": "hello",
        "author": {
          "id": "1",
          "name": "Manny"
        }
      }
    }
  }
}
```

* troubleshoot - this shows updated

```
updatePost(parent, args, { db, pubsub }, info) {
  const { id, data } = args;
  const post = db.posts.find(post => post.id === id);
  const originalPost = { ...post };

  if (!post) {
    throw new Error('Post not found');
  }

  if (typeof data.title === 'string') {
    post.title = data.title;
  }

  if (typeof data.body === 'string') {
    post.body = data.body;
  }

  if (typeof data.published === 'boolean') {
    post.published = data.published;

    if (originalPost.published && !post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: originalPost,
        },
      });
    } else if (!originalPost.published && post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    } else if (originalPost.published && post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post,
        },
      });
    }
  } else if (post.published) {
    pubsub.publish('post', {
      post: {
        mutation: 'UPDATED',
        data: post,
      },
    });
  }

  return post;
},
```

## Next
* Comments Subscriptions for Update and Delete
* Challenge
