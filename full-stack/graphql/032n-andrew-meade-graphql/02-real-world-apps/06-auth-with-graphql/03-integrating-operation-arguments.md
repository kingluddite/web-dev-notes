# Integrating Operation Arguments
* We will complete the conversion of the user and post query
* To do this we will learn how to filter data using Prisma data
    - (for users) Previously we were filtering just by users that had a particular name (we will restore that)
    - (for posts) We were allowing them to search for a specific piece of text in the title or body and we returned posts that just contained that text
        + We will add those features back in
* To do this we will be providing operation arguments into Prisma
    - We will just be creating objects and passing them in for the operation arguments

## Users
1. We start by creating an empty object

`const opArgs = {};`

* This is the value that we will provide as the operation arguments for the user's query (as opposed to currently providing `null`)

```
// MORE CODE

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    return prisma.query.users(opArgs, info);
}

// MORE CODE

}
```

* Currently `opArgs` is just an empty object so it is just still like passing in `null` - so this will still give us "all users back"

### Conditional changes
* We will set up conditionals to make changes to opArgs over time

#### If args.query exists
* We will modify opArgs to use it

```
// MORE CODE

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {

    }

    return prisma.query.users(opArgs, info);

// MORE CODE
```

## Which operation arguments can you provide?
* You need to look at the GraphQL Playground SCHEMA (DOCS)
* Click on Queries > users(...)

```
users(
    where: UserWhereInput
    orderBy: UserOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
): [User]!
```

* We will focus on `where`
    - **note** skip, after, before, first, last pertain to pagination

## Where
* We click on `UserWhereInput`
    - Here you will see about 60 different fields you can provide (Under Type Details)

```
type UserWhereInput {
AND: [UserWhereInput!]
OR: [UserWhereInput!]
NOT: [UserWhereInput!]
id: ID
id_not: ID
id_in: [ID!]
id_not_in: [ID!]
id_lt: ID
id_lte: ID
id_gt: ID
id_gte: ID
id_contains: ID
id_not_contains: ID
id_starts_with: ID
id_not_starts_with: ID
id_ends_with: ID
id_not_ends_with: ID
name: String
name_not: String
name_in: [String!]
name_not_in: [String!]
name_lt: String
name_lte: String
name_gt: String
name_gte: String
name_contains: String
name_not_contains: String
name_starts_with: String
name_not_starts_with: String
name_ends_with: String
name_not_ends_with: String
email: String
email_not: String
email_in: [String!]
email_not_in: [String!]
email_lt: String
email_lte: String
email_gt: String
email_gte: String
email_contains: String
email_not_contains: String
email_starts_with: String
email_not_starts_with: String
email_ends_with: String
email_not_ends_with: String
createdAt: DateTime
createdAt_not: DateTime
createdAt_in: [DateTime!]
createdAt_not_in: [DateTime!]
createdAt_lt: DateTime
createdAt_lte: DateTime
createdAt_gt: DateTime
createdAt_gte: DateTime
updatedAt: DateTime
updatedAt_not: DateTime
updatedAt_in: [DateTime!]
updatedAt_not_in: [DateTime!]
updatedAt_lt: DateTime
updatedAt_lte: DateTime
updatedAt_gt: DateTime
updatedAt_gte: DateTime
posts_every: PostWhereInput
posts_some: PostWhereInput
posts_none: PostWhereInput
comments_every: CommentWhereInput
comments_some: CommentWhereInput
comments_none: CommentWhereInput
}
```

* We have a dozen fields to check on `id`
* Same thing for `name` and `email`

## Update our code
* We will alter the functionality slightly from before
* We will check for both name and email, if either name or email contains that string, we'll consider that user a match and they will be returned
    - If the string you provide is not anywhere in the name or email, we will not consider that a match and that will return an empty record set

```
// MORE CODE

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        name_contains: args.query,
      };
    }

    return prisma.query.users(opArgs, info);

// MORE CODE
```

* Test in GraphQL Playground

```
query {
  users {
    id
    name
    email
  }
}
```

* We did not filter at all so all users are returned
* **note** That the filter is optional

## Important - localhost:4000 or localhost:4466?
### Why I don't have a query option on localhost:4466?
* `localhost:4000` contains all the queries and arugments that we've built out with our `Node.js` code
* `localhost:4466` contains all the queries and arguments provided by Prisma
    - In this case, `localhost:4000` is where the query would live

## Make sure to run your local GraphQL Playground that is using Node.js
* In root of your project

`$ npm start`

* View GraphQL Playground in browser

`http://localhost:4000/`

```
query {
  users(query: "q") {
    id
    name
    email
  }
}
```

* I have a `y` in one user so only one user is returned
* If I change the query to `e` I'll get both records as they both have an e in their name
* If I change query to `x` I will get an empty result set
* I have a ton of ways to filter my data in GraphQL Prisma

## Check the Prisma GraphQL Playground (localhost:4466)
* But now we also want to check for email
    - We want to check "if the user's name contains a string OR their email contains a string"

### where: UserWhereInput
* TYPE DETAILS

```
// MORE CODE

type UserWhereInput {
    AND: [UserWhereInput!]
    OR: [UserWhereInput!
// MORE CODE
```

* Both AND and OR take an array of objects

## How to use Primsa OR for the where
```
// MORE CODE

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);

  },

// MORE CODE
```

* Now when we pass a query filter we are checking if the query string is in the email OR the name

## AND
* **note** IF we changed it to:

```
const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        AND: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },
```

* Now when we pass a query filter both the name and the email must contain the string in order to be included in the result set

## Complete users with operational arguments
```
// MORE CODE

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);

  },

// MORE CODE
```

## Challenge
* Goal: Modify posts to support the query argument

1. Set up an object for operational arguments
2. If query is provided, modify the object to return only posts that have string in the `title` or `body`
3. Test your work by performing a few different queries

### Challenge Solution
```
// MORE CODE

  posts(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query,
          },
          {
            body_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.posts(opArgs, info);
  },

// MORE CODE
```

## Final code
```
const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query,
          },
          {
            body_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  me() {
    return {
      id: '123',
      name: 'john',
      email: 'john@john.com',
    };
  },
  post() {
    return {
      id: '123',
      title: 'Great Movies',
      body: 'Jaws made me afraid of the water',
      published: '1/1/2019',
    };
  },
};

export { Query as default };
```

