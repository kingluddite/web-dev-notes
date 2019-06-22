# Adding Comment Type to Prisma

## Challenge
* Goal: Add comments to Prisma API

1. Copy the comment type defintion and mark the `id` as unique
2. Redeploy the Prisma app
3. Work with the comment API in GraphQL Playground
    a. Update our only post to be published
    b. Create a new user
    c. Have new user comments (include comment text and author name)
    d. Fetch all comments (include comment text and author name)

### Challenge Solutions
1. Copy the comment type defintion and mark the `id` as unique

`datamodel.prisma`

```
// MORE CODE

type Comment {
  id: ID! @id
  text: String!
  author: User!
  post: Post!
}
```

2. Redeploy the Prisma app

`$ prisma deploy`

3. Work with the comment API in GraphQL Playground

3a. Update our only post to be published

```
mutation {
  updatePost(
    data: { published: true }
    where: { id: "cjx0117l300fd0859mgo0ra9o" }
  ) {
    id
    title
    body
    published
  }
}
```

3b. Create a new user

```
mutation {
  createUser(data: {
    name: "Harry",
    email:"harry@clyde.com"
  }) {
    id
    name
    email
  }
}
```

3c. Have new user comments (include comment text and author name)

```
mutation {
  createComment(
    data: {
      text: "I like prisma"
      post: { connect: { id: "cjx0117l300fd0859mgo0ra9o" } }
      author: { connect: { email: "harry@clyde.com" } }
    }
  ) {
    id
    author {
      name
    }
    text
  }
}

```

3d. Fetch all comments (include comment text and author name)

```
query {
  comments {
    id
    text
    author {
      id
      name
    }
  }
}
```

## Next
* When it comes to integrating GraphQL with Node.js we won't have to type all of this out and that is what we are working on next
