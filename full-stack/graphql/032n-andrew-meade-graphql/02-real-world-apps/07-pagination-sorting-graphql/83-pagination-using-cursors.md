# Pagination Using Cursors
* We will focus on Pagination again but specifically `after`
    - `after` takes a String as its value
    - This String is an `id` for a record
    - This allows us to start pagination at that point
        + This enables us to only use pagination after that record
* We will not be using `before` or `last` (this is for reverse pagination)
* We will stick with:
    - skip
    - after
    - first

`Query.js`

```
// MORE CODE

  import getUserId from '../utils/getUserId';

  const Query = {
    users(parent, args, { prisma }, info) {
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after,
      };

      // MORE CODE

    },

    posts(parent, args, { prisma }, info) {
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        where: {
          published: true,
        },
      };


// MORE CODE
```

```
query {
  posts(first:3, skip:0, after:"cjxjy26or07fb0759if9qmvvb") {
    id
    title
    author {
      name
    }
  }
}
```

* We grab an id of post and use that and when we skip we are skipping after that `id`
* Add `after` to our schema.graphql

`schema.graphl`

```
// MORE CODE

type Query {
  users(query: String, first: Int, skip: Int, after: String): [User!]!
  posts(query: String, first: Int, skip: Int, after: String): [Post!]!

// MORE CODE
```

* **note** We can test Prisma first to see how Pagination works in :4466 GraphQL Playground but if we want to integrate this inside our app we first update our schema.graphql and then we update our Query.js and then we test in :4000 GraphQL Playground

## Challenge
`schema.graphql`

```
// MORE CODE

type Query {
  // MORE CODE

  myPosts(query: String, first: Int, skip: Int, after: String): [Post!]!
  comments(first: Int, skip: Int, after: String): [Comment!]!

// MORE CODE
```

## Challenge: Goal: Add pagination for myPosts and comments query
1. Add 3 necessary arguments to query definition
2. Pass arguments through prisma in resolvers
3. Test your work!

`Query.js`

* myPosts

```
// MORE CODE

  async myPosts(parent, args, { prisma, request }, info) {
    // get id
    const userId = getUserId(request);

    // does user exist?
    const userExists = await prisma.exists.User({
      id: userId,
    });

    // if no user, throw error
    if (!userExists) {
      throw new Error('User not found');
    }

    // only where user owns posts
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      where: {
        author: {
          id: userId,
        },
      },
    };

// MORE CODE
```

* comments
    - comments doesn't pass in an options object (optArgs)
    - We'll create and replace null with that optObj

* from this:

```
// MORE CODE

comments(parent, args, { prisma }, info) {
  return prisma.query.comments(null, info);
},


// MORE CODE
```

To this: 

```
// MORE CODE

  comments(parent, args, { prisma }, info) {
    const optArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
    };

    return prisma.query.comments(optArgs, info);
  },

// MORE CODE
```

* List comments

```
query {
  comments {
    id
    text
  }
}
```


