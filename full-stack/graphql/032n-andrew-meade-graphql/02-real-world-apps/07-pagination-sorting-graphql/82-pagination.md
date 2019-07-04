# Pagination
* Pagination will give clients the ability to fetch just a subset of data in the Database
    - We have 1 million home address in a real estate web site

## Does a client want to render and show all 1 million homes on the home page?
* No way!

### Why not?
1. It is "expensive" to fetch 1 million homes
2. It will be "expensive" to render them

* Instead we'll allow clients to only fetch and render a subset of the data

## Prisma has pagination built in
* Check out the docs
* Let's view all posts (we should have 10)

### We are testing in localhost:4466
```
query {
  posts {
    id
    title
    body
    published
  }
}
```

* view posts and see the arguments for pagination
    - skip (int)
    - after (string)
    - before (String)
    - first (int)
    - last (int)

## first
* Let's us limit how many records we are seeing
* int
* Prisma limits you to 1000 by default

### We want just the first 2 posts from the DB
```
query {
  posts(
    first:2
  ) {
    id
    title
    published
  }
}
```

## We have 2 posts - how do I load the next 2 posts?
* You do that with `skip`

## skip
* Int
* Tells Prisma how many records to skip

### We want to skip 2 records then grab the first 2
```
query {
  posts(
    first:2,
    skip:2
  ) {
    id
    title
    published
  }
}
```

* Using a combination of `first` and `skip` we can hone in on the data we want to access

## Get first 5 records
```
query {
  posts(
    first:5,
    skip:0
  ) {
    id
    title
    published
  }
}
```

## Skip 5 and get next 5
```
query {
  posts(
    first:5,
    skip:5
  ) {
    id
    title
    published
  }
}
```

## Skip 5 more and get third page of 5
```
query {
  posts(
    first:5,
    skip:10
  ) {
    id
    title
    published
  }
}
```

## Let's apply pagination to our app
* We'll use 2 files
    - `schema.graphl`
    - `Query.js`
* We will use Pagination on anything that sends back an array

`schema.js`

```
// MORE CODE

type Query {
  users(query: String): [User!]!
  posts(query: String): [Post!]!
  myPosts(query: String): [Post!]!
  comments: [Comment!]!

  // MORE CODE
}

// MORE CODE
```

* We don't need pagination for me or post because that just returns a single record

`schema.graphql`

```
// MORE CODE

type Query {
  // MORE CODE

  me: User!
  post(id: ID!): Post!
}

// MORE CODE
```

## Add pagination for users Query
* We will add 2 optional arguments that will be Integers (Int)

`schema.graphql`

```
// MORE CODE

type Query {
  users(query: String, first: Int, skip: Int): [User!]!

// MORE CODE
```

* We just pass these directly into Prisma (Node.js will do nothing with them)

`Query.js`

```
// MORE CODE

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
    };

// MORE CODE
```

* That's it! Pagination is now set up

## GraphQL Playground :4000
```
query {
  users(first: 2) {
    id
    name
    email
  }
}
```

* Will give you first 2 users

```
query {
  users(first:2, skip:2) {
    id
    name
    email
  }
}
```

* Above skips 2 and gets next 2 users

## Add pagination to posts query
`schema.graphl`

```
// MORE CODE

type Query {
  users(query: String, first: Int, skip: Int): [User!]!
  posts(query: String, first: Int, skip: Int): [Post!]!

// MORE CODE
```

`Query.js`

```
// MORE CODE

  posts(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      where: {
        published: true,
      },
    };

// MORE CODE
```

* Test

```
query {
  posts(first:3, skip:6) {
    id
    title
    author {
      name
    }
  }
}
```


