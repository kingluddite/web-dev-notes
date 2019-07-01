# Locking Down Queries (part 1)
* It is a bit harder to lock down queries
* example
    - fetching post to read
    - but also want to fetch a draft post (only if I am authenticated)

## Query ---> post
* We will add a required post id

```
// MORE CODE

type Query {
  // MORE CODE

  post: Post!
}

// MORE CODE
```

* Update it to accept a required `id`

```
// MORE CODE

type Query {
  // MORE CODE

  post(id: ID!): Post!
}

// MORE CODE
```

* Now we need to make use of that inside our Query post resolver

`Query.js`

```
// MORE CODE

  post() {
    return {
      id: '123',
      title: 'Great Movies',
      body: 'Jaws made me afraid of the water',
      published: '1/1/2019',
    };
  },

// MORE CODE
```

* Make these changes

```
import getUserId from '../utils/getUserId';

const Query = {

// MORE CODE

  post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    // this code

    return {
      id: '123',
      title: 'Great Movies',
      body: 'Jaws made me afraid of the water',
      published: '1/1/2019',
    };
  },

// MORE CODE
```

* Make sure to import `getUserId` utility function

### Houston we have a problem!
* The getUserId() will work fine inside our post query but if there is an error it will not run and this will not be what we want
    - We can't do one thing if they are authenticated and another thing if they are not
    - We could wrap `const userId = getUserId(request);` with a **try/catch** but we will use a "cleaner" and "easier to reuse" solution
* We need to make a small modification to our `getUserId()` function

## Improving getUserId
* We will add a 2nd argument `requireAuth` that will enable us to use getUserId in 2 ways
    - We will set `requireAuth` to true by default
        + If you pass in a value of true to requireAuth we will throw an error
        + If you pass in a value of false we won't throw an error and just return `undefined` as opposed to returning a `userId`
        + We set a default value of true so we don't have to alter our existing code (all our mutations) which just expect one argument request so if we set the second argument to true by default we don't have to change our existing code

## Applying getUserId with a second argument of false
`Query.js`

```
// MORE CODE

  post(parent, args, { request }, info) {
    const userId = getUserId(request, false);

// MORE CODE
```

* Now (after we update our getUserId) the above will just return `undefined`

## Update getUserId
* We will make some minor changes
* Instead of doing something when there isn't a header we'll do something when there is a header

```
import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {
  const header = request.request.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysecret');
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authorization required');
  }
};

export { getUserId as default };
```

* If there is a header we replace Bearer with the token
* We verify
* We return the userId just like before
* But if requireAuth is true we generate an error that Authentication is required
* if requireAuth is not required, the rest of the function will run and implictly return `undefined`

```
// MORE CODE

  post(parent, args, {primsa, request }, info) {
    const userId = getUserId(request, false);

    // At this point in the code the userId if the user
    //  is authenticated or it is "undefined" if the user
    //  is not authenticated

    // we'll return a post and remove the dummy data below

    return {
      id: '123',
      title: 'Great Movies',
      body: 'Jaws made me afraid of the water',
      published: '1/1/2019',
    };
  },

// MORE CODE
```

## Examine :4466 docs
* When it comes to querying data the singular version 'post' gives us far fewer options
    - we just have `id`
* But posts plural gives us a ton of options
* But even though we are using a single post we will use the plural posts to take advantage of the ton of "where" options

```
// MORE CODE

  async post(parent, args, { primsa, request }, info) {
    const userId = getUserId(request, false);

    // At this point in the code the userId if the user
    //  is authenticated or it is "undefined" if the user
    //  is not authenticated

    // we'll return a post and remove the dummy data below

    // return {
    //   id: '123',
    //   title: 'Great Movies',
    //   body: 'Jaws made me afraid of the water',
    //   published: '1/1/2019',
    // };
    const posts = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );
  },

// MORE CODE
```

* We will use async/await
* What do we want to do to grap the correct post
    - We will limit by `id`
        + This will restrict it to a single post since all `id's` are unique
* Now we need to determine weather or not this person should access this post
    - We will consider it a match if:
        + the post is published OR this user is the author

```
// MORE CODE

    const posts = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );

// MORE CODE
```

* If the user is authenticated `userId` will be the user's id
* But if the user is not authenticated, `userId` will be undefined and this is not good
    - This will make this always a match so that is not what we want
    - To fix that we will return `null` in our `getUserId()` utility function

```
import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {
  const header = request.request.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysecret');
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authorization required');
  }

  return null; // Add this line
};

export { getUserId as default };
```

* So instead of returning `undefined` if you are not authenticated and requireAuth is false, we will return null
* This will make our query work
* Now we need to throw an error if now post was found
* And if the post was found, we need to send it's data back

`Query.js`

```
// MORE CODE

a, request }, info) {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );

    if (posts.length === 0) {
      throw new Error('Post not found');
    }

    return posts[0];
  },

// MORE CODE
```

* **note** We took advantage of our `posts` Prisma query plural so we can set up our conditional logic inside of "where"

```
where: {
  id: args.id,
  OR: [
    {
      published: true,
    },
    {
      author: {
        id: userId,
      },
    },
  ],
},
```

## Test it out
* Find a published post

```
query {
  users {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}
```

* Copy the published post id to the clipboard

```
query {
  post(id: "cjxj9g2av02yx07596mbnr7rp") {
    id
    title
    body
    published
  }
}
```

* You will see the post show up
* Switch to posts table
* Click lighting bolt to refresh
* Let's unpublish the post via pgAdmin by "unchecking" it

![uncheck post published](https://i.imgur.com/5bmxC03.png)

* Click away and click save icon
* Run GraphQL Playground query again

```
query {
  post(id: "cjxj9g2av02yx07596mbnr7rp") {
    id
    title
    body
    published
  }
}
```

* You will get error "Post not found" because the post is no longer published (it is a draft)
* I should also get same error if I log in as another user and use authentication (you must be the owner of a draft to see it)
* But if i use the owner token I can view the post draft

## Challenge
* Goal - Lock down me query

1. Require authentication
2. Use correct prisma query to get/return user by their id

`Query.js`

```
// MORE CODE

  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },

// MORE CODE
```

3. Test your work

```
query {
  me {
    name
    email
    posts {
      id
      title
    }
    comments {
      id
      text
    }
  }
}
```

* You must have an auth token in HTTP HEADERS in GraphQL Playground or you will get "Authorization required" error
* You could also use `exists` to make sure user exists and if not throw a custom error (you could also fall back on prisma to throw its own error)

## Notes
* Comments does not need to be authenticated so it is public
* me does need to be authenticated
* post sits in between you need to be authenticated if you are not published
