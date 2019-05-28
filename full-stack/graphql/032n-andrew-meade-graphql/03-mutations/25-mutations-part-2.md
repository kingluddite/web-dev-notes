# Mutations Part 2
## Create a Post Mutation
`index.js`

```
// MORE CODE

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean! author: ID!): Post! 
  }

// MORE CODE
```

* We need to make sure there is a person with that id

```
// MORE CODE

    createPost(parent, args, ctx, info) {
      // make sure author id matches up with one of our users

    }
  },
  Post: {

// MORE CODE
```

* And here it is

```
// MORE CODE

    createPost(parent, args, ctx, info) {
      // make sure author id matches up with one of our users

      const userExists = users.some(user => user.id === args.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };

      posts.push(post);

      return post;
    },

// MORE CODE
```

## We need to have a user id first!

* We need to generate an author `id` first
* Use your client side Playground `createUser` method to create a new user and copy that new user's id to the clipboard

```
mutation {
  createUser(name: "John", email: "john@doe.com") {
    id
  }
}
```

* Output

```
{
  "data": {
    "createUser": {
      "id": "375c4cc1-f1bf-4dde-8377-8151a7c25d44"
    }
  }
}
```

* Copy the `id`: `375c4cc1-f1bf-4dde-8377-8151a7c25d44` to the clipboard

## Open a new tab in Playground
* Write your `createPost` mutation

```
mutation {
  createPost(title: "First Post", body: "Great first Post", published: true, author: "375c4cc1-f1bf-4dde-8377-8151a7c25d44") {
    id
    title
    body
    published
    author {
      name
      email
    }
  }
}
```

* I pasted the author ID into the `author` argument value
* Output

```
{
  "data": {
    "createPost": {
      "id": "9596a05f-e9dd-43f2-9a6a-2cd0be68ac59",
      "title": "First Post",
      "body": "Great first Post",
      "published": true,
      "author": {
        "name": "John",
        "email": "john@doe.com"
      }
    }
  }
}
```

* **TIP** If you have a lot of arguments in Playground it is common and recommended to break them all up on their own line like this:

```
mutation {
  createPost(
    title: "First Post"
    body: "Great first Post"
    published: true
    author: "375c4cc1-f1bf-4dde-8377-8151a7c25d44"
  ) {
    id
    title
    body
    published
    author {
      name
      email
    }
  }
}
```

* **Note** We could also use comments in our client side query (no comments were created yet for our user)
* Output

```
{
  "data": {
    "createPost": {
      "id": "9943fa92-7bc7-4201-beb9-d1a3ed5404a7",
      "title": "First Post",
      "body": "Great first Post",
      "published": true,
      "author": {
        "name": "John",
        "email": "john@doe.com"
      },
      "comments": []
    }
  }
}
```

* What if you tried to create a post with a user that didn't exist
* Add random letters to the author id and rerun Playground

```
mutation {
  createPost(
    title: "First Post"
    body: "Great first Post"
    published: true
    author: "BAD375c4cc1-f1bf-4dde-8377-8151a7c25d44"
  ) {
    id
    title
    body
    published
    author {
      name
      email
    }
    comments {
      text
    }
  }
}
```

* Output

```
{
  "data": null,
  "errors": [
    {
      "message": "User not found",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "createPost"
      ]
    }
  ]
}
```

* We get error "user not found" since this user did not match up with what is in our user array of objects

## Run posts query to see if our new post is showing up
```
query {
  posts {
    id
    title
    author {
      name
    }
  }
}
```

* You will see the new post in the posts output

## Challenge create comment
Goal: Allow clients to create a new comment
1. Define a new createComment mutation
    * Should take text, author and post
    * Should return a comment
2. Define a resolver method for createComment
    * Confirm that the user exists, else throw an error
    * Confirm that the post exists and is published, else throw an error
3. Run the mutation and add a comment
4. Use the comment query to verify the comment was added

1. Create the Mutation for Comment

```
// MORE CODE

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean! author: ID!): Post! 
    createComment(text: String, author: ID!, post: ID!): Comment!
  }

// MORE CODE
```

2. Create the resolver for createComment()

```
// MORE CODE

    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const postExists = posts.some(post => post.id === args.post);

      if (!postExists) {
        throw new Error('Post not found!');
      }

      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post,
      };

      comments.push(comment);

      return comment;
    },

// MORE CODE
```

* You need to get the id running this mutation in Playground

```
mutation {
  createUser(name: "John", email: "john@doe.com") {
    id
  }
}
```

* Copy the author id from the output

```
{
  "data": {
    "createUser": {
      "id": "d43b9096-c1df-4285-b86e-a1c5ab2ccdac"
    }
  }
}
```

* Paste in the author id into the Create Post

```
mutation {
  createPost(
    title: "First Post"
    body: "Great first Post"
    published: true
    author: "d43b9096-c1df-4285-b86e-a1c5ab2ccdac"
  ) {
    id
    title
    body
    published
    author {
      id
      name
      email
    }
    comments {
      text
    }
  }
}
```

* Copy both the post id and the author id from the output

```
{
  "data": {
    "createPost": {
      "id": "554174eb-3022-464a-b465-ed4c3ce4aa68",
      "title": "First Post",
      "body": "Great first Post",
      "published": true,
      "author": {
        "id": "d43b9096-c1df-4285-b86e-a1c5ab2ccdac",
        "name": "John",
        "email": "john@doe.com"
      },
      "comments": []
    }
  }
}
```

* Paste author and post id into the createComment Playground Mutation

```
mutation {
  createComment(
    text: "Loved this post!", 
    author: "d43b9096-c1df-4285-b86e-a1c5ab2ccdac", 
    post: "554174eb-3022-464a-b465-ed4c3ce4aa68"
  ) {
    id
    text
  }
}
```

* Will give you this output

```
{
  "data": {
    "createComment": {
      "id": "bfd27aa3-0c35-4c4d-a9d5-5dd26a933cb4",
      "text": "Loved this post!"
    }
  }
}
```

* And if you run all posts

```
query {
  posts {
    id
    title
    author {
      name
    }
    comments {
      id
      text
      author {
        name
      }
    }
  }
}
```

* You will see this output showing the comments with the posts

```
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "soccer",
        "author": {
          "name": "Manny"
        },
        "comments": [
          {
            "id": "1",
            "text": "Better than cats!",
            "author": {
              "name": "Manny"
            }
          },
          {
            "id": "2",
            "text": "Not better than cats",
            "author": {
              "name": "Manny"
            }
          }
        ]
      },
      {
        "id": "2",
        "title": "basketball",
        "author": {
          "name": "Manny"
        },
        "comments": []
      },
      {
        "id": "3",
        "title": "tennis",
        "author": {
          "name": "Mo"
        },
        "comments": [
          {
            "id": "3",
            "text": "Was this about cats?",
            "author": {
              "name": "Jack"
            }
          },
          {
            "id": "4",
            "text": "I am not a cat lover",
            "author": {
              "name": "Mo"
            }
          }
        ]
      },
      {
        "id": "554174eb-3022-464a-b465-ed4c3ce4aa68",
        "title": "First Post",
        "author": {
          "name": "John"
        },
        "comments": [
          {
            "id": "bfd27aa3-0c35-4c4d-a9d5-5dd26a933cb4",
            "text": "Loved this post!",
            "author": {
              "name": "John"
            }
          }
        ]
      }
    ]
  }
}
```

## One thing missed
* Forgot to check if post was published

```
 // MORE CODE

createComment(parent, args, ctx, info) {
  const userExists = users.some(user => user.id === args.author);

  if (!userExists) {
    throw new Error('User not found');
  }

  const postExists = posts.some(post => post.id === args.post && post.published);

  if (!postExists) {
    throw new Error('Post not found!');
  }

  const comment = {
    id: uuidv4(),
    text: args.text,
    author: args.author,
    post: args.post,
  };

  comments.push(comment);

  return comment;
},
 // MORE CODE

```

* Also could have run createComment first in Playground
* You would get errors on unable to find user and post (from our resolver)
* Pick an author and a post id from the simple ones we used before
* Make sure the post is also published!
* Then when you run you should be able to create your comment

## Next
* Optimizations
    - Improve arguments
    - Improve the code inside
