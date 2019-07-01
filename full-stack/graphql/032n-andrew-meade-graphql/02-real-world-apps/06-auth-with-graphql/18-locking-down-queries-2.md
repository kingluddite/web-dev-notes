# Locking Down Queries (part 2)
* Let's focus on how we are fetching posts
* Currently our posts query returns every single post (regardless of whether or not it is published)
    - Our posts query will be public, it won't require any sort of authentication
    - But we will only send back public posts

`Queries.js`

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

* We can do this:

```
// MORE CODE

  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true,
      },
    };

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

*  But we don't want to override our existing **where** so we do this:

`Mutation.js`

```
// MORE CODE

  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true,
      },
    };

    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

    return prisma.query.posts(opArgs, info);
  },

// MORE CODE
```

* Now if you run this query, you will only see posts that are public

```
query {
  posts {
    id
    title
    published
    body
    author {
      id
      name
      email
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

## Challenge
* Create a brand new query from scratch that allows a logged in user to get all of their published and unpublished posts

### Goal: Create a query for accessing your posts (myPosts)
1. Define the query in schema.graphql
    * Accept optional query string
    * Return array of posts

```
// MORE CODE

type Query {
  // MORE CODE

  myPosts(query: String): [Post!]!
  
  // MORE CODE
}

// MORE CODE
```

2. Require authentication

```
// MORE CODE

  myPosts(parent, args, { prisma, request }, info) {
    // get id
    const userId = getUserId(request);
  }

// MORE CODE
```

3. Setup `opArgs` to just fetch posts by the authenticated user

```
// MORE CODE

  myPosts(parent, args, { prisma, request }, info) {
    // get id
    const userId = getUserId(request);

    // only where user owns posts
    const opArgs = {
      where: {
        author: {
          id: userId,
        },
      },
    };
  }

// MORE CODE
```
4. Setup support for query argument list with posts

```
// MORE CODE

    // filter by title or body
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

// MORE CODE
```

5. Use correct prisma query to get/return data

```
// MORE CODE

    // return all posts that match criteria
    return prisma.query.posts(opArgs, info);

// MORE CODE
```

6. Test your data

* Make sure to login and get your token and add to HTTP HEADERS as auth token

```
query {
  myPosts {
    id
    title
    body
    published
    author {
      name
    }
  }
}
```

* Here is my final myPosts with comments and validation

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
      where: {
        author: {
          id: userId,
        },
      },
    };

    // filter by title or body
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

    // return all posts that match criteria
    return prisma.query.posts(opArgs, info);
  },

// MORE CODE
```


