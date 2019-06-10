# Delete Data Mutations (part 2)

## Delete a post mutation
### Challenge
* Goal: Set up a mutation for deleting a post

1. Define a mutation. It should take the post `id`. It should return the deleted post.

```
// MORE CODE

type Mutation {
  // MORE CODE

  deletePost(id: ID!): Post!

  // MORE CODE
}
```

2. Define the `resolver` for the **mutation**
    - Check if the post exists, else throw error
    - Remove and return post
    - Remove all comments belonging to that post

```
// MORE CODE

deletePost(parent, args, ctx, info) {
      // check if post exists
      const postIndex = posts.findIndex(post => post.id === args.id);

      // if no post found throw error
      if (postIndex === -1) {
        throw new Error('Post Not Found');
      }

      // capture the deleted post so you can return
      const deletedPosts = posts.splice(postIndex, 1);

      comments = comments.filter(comment => comment.post !== args.id);

      return deletedPosts[0];
    },

// MORE CODE
```

* We still need to delete all the comments belonging to that post we just deleted

`comments = comments.filter(comment => comment.post !== args.id);`

* We set comments to a brand new value
* We use filter to get access to the individual comment and we'll return true if we want to keep it and false if we want to remove it

This will return true to comments not belonging to this post (meaning they will be kept in the array which is what we want)

But it will return false for comments belonging to the post and thus they will be removed

`comment.post !== args.id`



3. Test your work by running **mutation** to delete a post. Verify post/comments are removed

* Query all posts first

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

* Memorize a post `id` that you will use to delete that post
* Use the deletePost Mutation with that `id` to delete that post

```
mutation {
  deletePost(id: "10") {
    id
  }
}
```

* Run it a second time and you will get "Post Not Found" error we made letting us know that the post was already deleted
* Query to make sure you also deleted that post's comments

```
query {
  comments {
    id
    author {
      id
    }
    text
  }
}
```


## Challenge
* Goal: Set up a mutation for deleting a comment

1. Define a **mutation**. It should take the comment `id`. It should return the deleted `comment`.

```
type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
  }
```


2. Define the **resolver** for the `mutation`
  * Check if the comment exists, else throw error
  * Remove and return the comment

```
// MORE CODE

deleteComment(parent, args, ctx, info) {
      // check if the comment exists
      const commentIndex = comments.findIndex(comment => comment.id === args.id);

      // if no comment throw an error
      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }

      const deletedComments = comments.splice(commentIndex, 1);

      return deletedComments[0];

    }

// MORE CODE
```

3. Test your work by running **mutation** to delete a comment. Verify comment was removed.

* Run a query to get all comments so you can find a comment `id`

```
query {
  comments {
    id
    author {
      id
    }
    text
  }
}
```

* Delete the comment using that `id` you copied from the result of the above all comments query

```
mutation {
  deleteComment(id: "105") {
    id
  }
}
```

* Search all **comments** again and you should see your comment has been removed

### Summary
* We now have delete mutations for all posts, comments and users
