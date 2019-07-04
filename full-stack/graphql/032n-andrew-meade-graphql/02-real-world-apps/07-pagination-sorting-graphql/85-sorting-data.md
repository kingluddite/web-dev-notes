# Sorting data
## The "orderBy" argument
* We can sort by any field using ASC or DESC

![orderBy](https://i.imgur.com/5gpGBhK.png)

* Doesn't make sense to sort by id since that is randomly generated
* Sorting by Strings
    - ASC (we go from a-z)
    - DESC (we go from z-a)
* Sorting by Booleans
    - ASC (we start with false and go to true)
    - DESC (we go from true and go to false)
* Sorting by Dates
    - ASC (we go from olders to most recent)
    - DESC (we go from most recent to oldest)

## Sort by Title from ASC to DESC
* We can test first in GraphQL Playground :4466

```
query {
  posts(orderBy: title_DESC) {
    id
    title
    published
  }
}
```

```
query {
  posts(orderBy:published_DESC) {
    id
    title
    published
  }
}
```

* Boolean - true comes first

## You can sort by date

```
// MORE CODE

query {
  posts(orderBy:createdAt_DESC) {
    id
    title
    published
    createdAt
  }
}
// MORE CODE
```

* This is what most people use for blogs to have most recent posts at the top

## Now we need to integrate orderBy into our Queries (:4000 GraphQL Playground)
* Both types in Prisma use ENUM
* We could copy and paste this into our code but then we would have to manually update these when they change
* There is a better way

## We can import from our generated Prisma code!
* Then we can just import from this file and this saves us from updating manually

### graphql-import
* [docs for graphql-import](https://github.com/prisma/graphql-import)
* A library that lets us import from our GraphQL generated schema
* **good news** It comes built inside our GraphQL Yoga server!
    - So we do not need to manually configure
    - We can just start using it
* Comments in GraphQL is `#`
    - The commented line gets parsed by the library and it will pull in what is necessary

`schema.graphql`

```
# import Post from "posts.graphql"

type Query {
  posts: [Post]
}
```

* GraphQL doesn't support any import statement so our library uses this to get around that limitation and import what it needs

## Let's try it out - import UserOrderByImport
`src/schema.graphql`

```
// MORE CODE

# import UserOrderByInput from './generated/prisma.graphql'

type Query {

// MORE CODE
```

* Now we have access to this file and it import this automatically

```
// MORE CODE

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

// MORE CODE
```

* We never have to type this as it now is automatically imported and we can now use it

`schema.graphql`

```
// MORE CODE

type Query {
  users(query: String, first: Int, skip: Int, after: String, orderBy: UserOrderByInput): [User!]!

// MORE CODE
```

`Query.js`

```
// MORE CODE

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

// MORE CODE
```

* Now we have the ability to sort our users using our Node.js application
* Now we can order by date

![order by in node.js](https://i.imgur.com/XEjnGM7.png)

```
query {
  users(orderBy: createdAt_DESC) {
    id
    email
    name
    updatedAt
    createdAt
  }
}
```

## How can we import lots of items from our generated file?
`src/schema.graphql`

```
// MORE CODE

# import UserOrderByInput, SomethingElse, SomeThirdItem from './generated/prisma.graphql'

type Query {

// MORE CODE
```

## Challenge
# Goal: Set up sorting for `posts`, `myPosts`, and `comments`
1. Set up the `orderBy` argument with the correct imported Enum
2. Update resolvers to pass the argument through to Prisma
3. Test your work

1. Set up the `orderBy` argument with the correct imported Enum

`schema.graphql`

```
# import UserOrderByInput, PostOrderByInput, CommentOrderByInput from './generated/prisma.graphql'

type Query {
  users(query: String, first: Int, skip: Int, after: String, orderBy: UserOrderByInput): [User!]!
  posts(query: String, first: Int, skip: Int, after: String, orderBy: PostOrderByInput): [Post!]!
  myPosts(query: String, first: Int, skip: Int, after: String, orderBy: PostOrderByInput): [Post!]!
  comments(first: Int, skip: Int, after: String, orderBy: CommentOrderByInput): [Comment!]!

// MORE CODE
```

2. Update resolvers to pass the argument through to Prisma

* Just add `orderBy: args.orderBy` to whatever query you want to use this

3. Test your work

```
query {
  posts(orderBy: title_DESC) {
    id
    title
    createdAt
    updatedAt
  }
}
```

* Just do same for comments and myPosts
