# Locking Down Mutations (Posts and Comments)
## Challenge
### Update Posts
* Goal: Lock down updatePost

1. Validate the authentication token
2. Check if that post exists with the post id and the correct author id
    - Else thrown an error
3. Test your work

`Mutation.js`

```
// MORE CODE

  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!postExists) {
      throw new Error('Could not update Post');
    }

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

## Test
```
mutation {
  updatePost(id: "cjxj9g2av02yx07596mbnr7rp", data: {
    body: "love soccer Yes I do!",
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

* Make sure you log in
* Grab the token and pasted into HTTP HEADERS of GraphQL Playground

```
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanhpaHgxYXAwMTQ1MDc1OWV1Yzl6dnE3IiwiaWF0IjoxNTYxOTMzNDc1fQ.23DYUPT6k-_UGrbNlIdnB3SSnvTiarzpf18l48mK_Vw"
}
```

* It should successfully update the post (if you "own" the post!)

## Async await errors
* If you forget to use async and just use await you will get this error "await is a reserved word"
* If you use async but forget to await you may not get error

## createComment challenge
* Put it behind authentication
* Goal - Lock down createComment

1. Validate the authentication token

```
// MORE CODE

  createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

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
              id: userId,
            },
          },
        },
      },
      info
    );
  },

// MORE CODE
```

2. Update mutation to no longer accept author id

`  createComment(data: CreateCommentInput!): Comment!`

```
input CreateCommentInput {
  text: String
  author: ID!
  post: ID!
}
```

* Remove author: ID!

```
input CreateCommentInput {
  text: String
  post: ID!
}
```

3. Create comment with the authenticated user as the author
4. Test your work

```
mutation {
  createComment(
    data: { text: "this is my text", post: "cjxjhzahq03fl075903qaoskh" }
  ) {
    id
    text
  }
}
```

* Make sure Authorization token is in HTTP HEADERS

## deleteComment and updateComment
`Mutation.js`

```
// MORE CODE

  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!commentExists) {
      throw new Error('Could not remove comment');
    }

    return prisma.mutation.deleteComment({
      where: {
        id: args.id,
      },
    });
  },

  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id: args.data.id,
      author: {
        id: userId,
      },
    });

    if (!commentExists) {
      throw new Error('Count not update comment');
    }

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

// MORE CODE
```

```
mutation {
  updateComment(id: "cjxjk5k2f04w50759x6p7bnw9", data: {
    text: "I love LA!"
  }) {
    id
    text
  }
}
```

```
mutation {
  deleteComment(id: "cjxjk5k2f04w50759x6p7bnw9") {
    id
    text
  }
}
```
