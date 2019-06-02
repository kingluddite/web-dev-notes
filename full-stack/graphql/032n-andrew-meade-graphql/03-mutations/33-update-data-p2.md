# Update Data with Mutations Part 2
* We will create 2 update mutations

1. Update the Post
2. Update the Comment

## Challenge
* Goal: Set up a mutation for updating a post

1. Define a mutation
    * Add id/data for arguments. Setup data to support title, body and published
    * Return the updated post (Don't forget to return a post! It is required and if you forget to return it you will get 'cannot return null for non-nullable field')

`schema.graphql`

```
// MORE CODE

type Mutation {
  // MORE CODE
  
  updatePost(id: ID!, data: UpdatePostInput!): Post!

  // MORE CODE
}

// MORE CODE

input UpdatePostInput {
  title: String
  body: String
  published: Boolean
}

// MORE CODE
```

2. Create resolver method
    * Verify post exists, else throw error
    * Update post properties one at a time

`Mutation.js`

```
// MORE CODE

updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find(post => {
      return post.id === id;
    });

    if (!post) {
      throw new Error("Post Not Found");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }

    if (typeof data.body === "string") {
      post.body = data.body;
    }

    if (data.published === null) {
      throw new Error("Please let us know if this is published or not");
    }

    post.published = data.published;

    if (typeof data.professionalLeague === "string") {
      post.professionalLeague = data.professionalLeague;
    }

    return post;
  },

// MORE CODE
```

* What about updating author?
    - No site will let you update the author, doesn't make sense

3. Verify your work by updating all properties for a given post

```
mutation {
  updatePost(id: "10", data: {
    title: "yes222",
    body: "yes2",
    published: false
  }){
    id
    title
    body
  }
}
```

## Challenge - do same for updating a comment
