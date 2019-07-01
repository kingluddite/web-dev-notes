# Locking Down Mutations (Users) 
`schema.graphql`

```
// MORE CODE

type Mutation {
 // MORE CODE

  updateUser(id: ID!, data: UpdateUserInput!): User!
  
  // MORE CODE

}

// MORE CODE
```

* When we integrate authentication, you won't be able to authenticate any user, only can update yourself
* We know your `id` because we have the token (which has your `id` embedded) so we no longer need to pass the `id` argument in `updateUser`
    - All we need is 2 things:
    
1. Your authentication token
2. And the data you actually want to change

## Remove the id argument
```
// MORE CODE

type Mutation {
 // MORE CODE

  updateUser(data: UpdateUserInput!): User!
  
  // MORE CODE

}

// MORE CODE
```

## Update the updateUser Mutation
`Mutation.js`

```
// MORE CODE

  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: userId
        },
      },
      info
    );
  },

// MORE CODE
```

* We add the request from the context
* We use the getUserID() utility function to pass in the request and grab the user `id`
* We update the User using the userId

## 2 things we just accomplished
1. updateUser is "locked down" (you have to be authenticated to use it)
2. We customized the behavior (making sure you can only update your own profile)

## Test updateUser :4000 GraphQL Playground
* We removed `id` as an argument
* We removed `age` as that is no longer used

```
mutation {
  updateUser(data: {
    name: "Mark",
    email: "mark1@mark.com"
  }) {
    name
    email
  }
}
```

* Error - "Authentication required"

### Make sure to add the Authorization token in GraphQL Playground
* And run the updateUser Mutation

```
mutation {
  updateUser(data: {
    name: "Markey Mark",
    email: "mark1@mark.com"
  }) {
    name
    email
  }
}
```

* It should work now and update the user

## Challenge - add authentication for deleteUser
`schema.graphql`

```
// MORE CODE

type Mutation {
  createUser(data: CreateUserInput!): AuthPayload!
  deleteUser: User!

// MORE CODE
```

`Mutation.js`

```
// MORE CODE

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },

// MORE CODE
```

* You should only be able to delete yourself
* You should not be able to delete other users

## Test and you should see that you can delete yourself
* Make sure authorization token is defined in GraphQL Playground

```
mutation {
  deleteUser {
    id
    email
    name
  }
}
```

* If you try to delete the user again you'll get this error "No Node for the model User with value cjxjh310p032u0759cmzoqmyv for id found."

## Challenge - deletePost
```
// MORE CODE

type Mutation {

  deletePost(id: ID!): Post!
  
}

// MORE CODE
```

* And modify it to look like:

```
// MORE CODE

type Mutation {

  deletePost: Post!
  
}

// MORE CODE
```

* You can only delete your own posts

`Mutation.js`

```
// MORE CODE

  deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deletePost(
      {
        where: {
          id: userId
        },
      },
      info
    );
  },

// MORE CODE
```

* When we delete a post we want to take in the userId
* We only want to delete a post that user owns
    - We want to check that the post id matches with what was in the where
    - And that the post is owned by the authenticated user
    - PROBLEM
        + deletePost doesn't accept any other arguments on `where`
        + We can't use this syntax

```
// MORE CODE

  deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
          author: {
            id: userId
          }
        },
      },
      info
    );
  },

// MORE CODE
```

* This is the deletePost :4466 GraphQL Playground documentation

```
// MORE CODE

type PostWhereUniqueInput {
id: ID
}
// MORE CODE
```

* So we can't confirm that this post belongs to this user unless we add more code

## exists
* We used this earlier and now we'll use it again
* We will use `exists` to make sure that the post does exist and that the author is the owner of the post
* We will need to use async/await

`Mutation.js`

```
// MORE CODE

  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!postExists) {
      throw new Error('Unable to delete post');
    }

    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },

// MORE CODE
```

## Test
* We will create 2 users
* We will create a post for each user
* As one of the users we will try to delete both posts (we should only be able to delete the post we "own")

### First user creates a post
* Make sure auth token is in GraphQL Playground for this user when you createPost in :4000 GraphQL Playground

```
mutation {
  createPost(data: {
    title: "Post by Oh",
    body: "...",
    published: true,
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

* Now we will log in as another user

```
mutation {
  login(data: {
    email: "rick@phil.com",
    password: "abcdabcd"
  }) {
    user {
      id
      name
      email
      password
    }
    token
  }
}
```

* Grab the token that was generated in the response

```
{
  "data": {
    "login": {
      "user": {
        "id": "cjxihx1ap01450759euc9zvq7",
        "name": "rick",
        "email": "rick@phil.com",
        "password": "$2a$10$yIxwlbSYcd/6jRxe85eKW.pAlTVbFD4kQlR.HESAorsKfr6y7ZqGe"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanhpaHgxYXAwMTQ1MDc1OWV1Yzl6dnE3IiwiaWF0IjoxNTYxOTMyMTg1fQ.XoZNSJreSBE8POwyJu0iEvqReqtOpH7ZeBQKKSsRrhA"
    }
  }
}
```

* And paste that into the createPost HTTP HEADER authorization token


```
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanhpaHgxYXAwMTQ1MDc1OWV1Yzl6dnE3IiwiaWF0IjoxNTYxOTMyMTg1fQ.XoZNSJreSBE8POwyJu0iEvqReqtOpH7ZeBQKKSsRrhA"
}
```

* Create the post

```
mutation {
  createPost(data: {
    title: "Post by Rick",
    body: "...",
    published: true,
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

* Now try to delete both posts as Rick
    - Make sure to pass a post id that Rick is the owner of

```
mutation {
  deletePost(id: "cjxji5nnt03jy07593nuw7pfc") {
    id
    title
    author {
      id
      name
      email
    }
  }
}
```

* That will successfully delete the post
* But this will fail with "Unable to delete the post"

```
mutation {
  deletePost(id: "cjxjhzahq03fl075903qaoskh") {
    id
    title
    body
    published
  }
}
```

* You must own the post to delete it

