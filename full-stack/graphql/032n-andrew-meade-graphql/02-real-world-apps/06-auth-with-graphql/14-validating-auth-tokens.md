# Validating Auth Tokens
* We signed up and created an auth token
* Now we need to use that to authenticate users

## What we need to do
1. Figure out how we can get this token can get passed from the client to the Node.js server
2. How the Node.js server can use this token to perform some sort of authentication

## createPost Mutation
`Mutation.js`

```
// MORE CODE

  createPost(parent, args, { prisma }, info) {
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author,
            },
          },
        },
      },
      info
    );
  },

// MORE CODE
```

* Currently this does not require any sort of authentication (it is sitting out in the open)
* **note** We are going to remove the author argument
    - Since you shouldn't be able to create a post for any author
    - You should only be able to create a post for the author you are actually logged in as

## First - we need to get the token from the client to the server
* Get a token (log in or create a new user and grab the token from GraphQL Playground :4000)
* Then, still in :4000, we will provide that copied auth token via an HTTP HEADER in our createPost mutation
    - **remember** HTTP HEADERS allow us to pass those values from client to server and server to client
    - Regardless of what platform you are using you can set HEADERS for your request (IOS, Android or Web client... you can set HEADERS for all of those)
    - We will use the same structure that we used for our Authorization token in :4466

```
{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTYxODY5MjM1LCJleHAiOjE1NjI0NzQwMzV9.sWRVosLux5CAwpJ9Z8-WVPD3KL_vLmgvfqjtdtf0-d4"
}
```

* So we pasted our token in to the "Bearer" in GraphQL `:4000`
* And that is all we need to do to get the token from the client to the `Node.js` server

## Now we need to figure out how we can get access to our JWT from inside of Node.js
* To accomplish this we'll need to make a change to our server
* I want to be able to access it inside of my individual Mutation resolvers since some Mutations require authentication like `createPost` and others won't like `login`

### Time to make a change to the context for our server
`src/index.js`

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: {
    db,
    pubsub,
    prisma,
  },
});

// MORE CODE
```

* We haven't touched context in a while
* **remember** Context values get passed into the the 3rd argument of our Mutations and Queries
    - Example:

`Mutation.js`

* `prisma` is from context in `index.js` and we pass it into our `createPost` method

```
// MORE CODE

createPost(parent, args, { prisma }, info) {
    // MORE CODE
}

// MORE CODE
```

* The context property can also be set up as a function
    - This function then returns the object much like the object we have setup here:

`index.js`

```
// MORE CODE

  context: {
    db,
    pubsub,
    prisma,
  },

// MORE CODE
```

* Make this modification:

`index.js`

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context() {
    return {
      db,
      pubsub,
      prisma,
    };
  },
});

// MORE CODE
```

* With this change we haven't changed the functionality at all but we've set ourselves up to make an important change which is to be able to access our Request HEADERS (which is where our Authorization token actually lives)
* Let's dive into the [graphql-yoga documentation](https://github.com/prisma/graphql-yoga) to discover why this is important and needed

![context - Object or Function](https://i.imgur.com/qparzDW.png)

```
Contains custom data being passed through your resolver chain

This can be passed in as an object, or as a Function with the signature (req: ContextParameters) => any **

This function actually gets called by GraphQL Yoga with an argument
The request object and this is where we can access our Headers
```

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context(request) { // we pass in request as an argument to our context
                     // Function
    return {
      db,
      pubsub,
      prisma,
      request, // and we use it here inside our context
    };
  },
});

// MORE CODE
```

* Let's analyze what lives on `request`

```
// MORE CODE

  context(request) {
    console.log(request);
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },

// MORE CODE
```

* You will see a ton of information as it is everything that makes up that request
* We can target what we are looking for using

```
// MORE CODE

  context(request) {
    console.log(request.request.headers);
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },

// MORE CODE
```

* You will see this in the Terminal:

```
// MORE CODE

{ host: 'localhost:4000',
  connection: 'keep-alive',
  'content-length': '1468',
  origin: 'http://localhost:4000',
  authorization:
   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanhpaHgxYXAwMTQ1MDc1OWV1Yzl6dnE3IiwiaWF0IjoxNTYxODcxNDM2fQ.GugaRTsmJmU0jNZGg1Weenz6ueJqL0MPqhOj5PaQPFk',
// MORE CODE
```

* We can see the authorization token we need to access
    - `request.request.headers` contains all our headers which is where our token lives
* Remove the console.log(request.request.headers)

## Adding authentication to our methods
* We will need to add authentication to many of our methods

### stuff we need to do
1. get the header value
2. parse out the token
3. verify the token
4. And we need to do this every time
5. We don't want to write out this code for every Mutation and Query that needs authentication

### Let's make life easy and create a Utility function
* That will do all the steps necessary to add authentication to our Mutations and Queries

#### Create a new folder/file
* Make sure we can access this file inside other files

`src/utils/getUserId.js`

```
const getUserId = () => {};

export { getUserId as default };
```

* Make sure to import this file inside `Mutation.js`

`getUserId.js`

```
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId'; // add this line

// MORE CODE
```

* Now we will pass to our `getUserId()` method the new `request` context we have access to

`Mutation.js`

```
// MORE CODE

  createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

// MORE CODE
```

* Now we need to accept that argument and use it to access our authorization token

`getUserId.js`

```
const getUserId = (request) => {
  const header = request.request.headers.authorization;
};

export { getUserId as default };
```

* Why `request.request`?
    - In the entire request there is a `request` and a `response`
    - There is 2 pieces to each `request`

## Check if there is a header?
* Throw an error if there is not

`getUserId.js`

```
const getUserId = (request) => {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error('Authentication required');
  }
};

export { getUserId as default };
```

* We will only see this error when we call getUserId() and so we will only see the error when we are checking for authentication - so we'll see it when using createPost but not for login (where authentication isn't necessary)

## Replace `Bearer and a space` with just an empty string
* Notice this space after "Bearer"

```
{
  "Authorization":"Bearer THIS_IS_WHERE_YOUR_TOKEN_IS..."
}
```

* Add this

```
const getUserId = (request) => {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error('Authentication required');
  }

  const token = header.replace('Bearer ', ''); // Add this line
};

export { getUserId as default };
```

* That will make our `token` go from this:

```
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanhpaHgxYXAwMTQ1MDc1OWV1Yzl6dnE3IiwiaWF0IjoxNTYxODcxNDM2fQ.GugaRTsmJmU0jNZGg1Weenz6ueJqL0MPqhOj5PaQPFk"
```

* To this:

```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanhpaHgxYXAwMTQ1MDc1OWV1Yzl6dnE3IiwiaWF0IjoxNTYxODcxNDM2fQ.GugaRTsmJmU0jNZGg1Weenz6ueJqL0MPqhOj5PaQPFk"
```

## Verify the token with jwt
`getUserId.js`

```
import jwt from 'jsonwebtoken';

const getUserId = request => {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error('Authentication required');
  }

  const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(token, 'mysecret'); // add this line
};

export { getUserId as default };
```

* If there is a token for whatever reason `decoded` will throw an error causing the `getUserId()` function to stop
* If we are continuing on, things went well and we can return the userId property from the Payload

`getUserId.js`

```
import jwt from 'jsonwebtoken';

const getUserId = request => {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error('Authentication required');
  }

  const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(token, 'mysecret');

  return decoded.userId; // add this line
};

export { getUserId as default };
```

* Now we have the authenticated `userId` whenever we need to use it
* And now we will use it in `Mutation.js` in `createPost`

## Making use of getUserId()
* Now we can replace the author id getting passed in

`Mutation.js`

```
// MORE CODE

    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author, // we are replacing this author id
            },
          },
        },
      },
      info
    );

// MORE CODE
```

* Now we'll replace `args.data.author` with the userId of the authenticated user

```
// MORE CODE

  createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published 
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

* Because we updated this we need to update our `schema.graphql`

```
 // MORE CODE

createPost(data: CreatePostInput!): Post!
 // MORE CODE
```

* And update this:

```
// MORE CODE

input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
  author: ID!
}

// MORE CODE
```

* With this:

```
// MORE CODE

input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
}

// MORE CODE
```

* Now when we are creating a post using createPost, we will just need to supply the `title`, `body` and `published`
    - The authenticated userId will now be supplied automatically

## Test createPost in :4000 GraphQL Playground
* Remove author as the field is not longer used
* Make sure you have provided a Auth token in GraphQL Playground

```
mutation {
  createPost(data: {
    title: "Post Up",
    body: "Win tonight!",
    published: false,
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

* And you should see your post created
* And look how it associates the post with the correct user

```
{
  "data": {
    "createPost": {
      "id": "cjxj9g2av02yx07596mbnr7rp",
      "title": "Post Up",
      "body": "Win tonight!",
      "published": false,
      "author": {
        "id": "cjxihx1ap01450759euc9zvq7",
        "name": "rick"
      }
    }
  }
}
```

* If the Auth token in GraphQL Playground is not there or wrong, the Mutation will fail with "invalid token" or if not token is provided we'll get "Authentication required" error

## Adding authenticaton is easy now
1. Add request to our 3rd argument
2. Call getUserId() method
3. Do something with the userId

```
// MORE CODE

createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    // MORE CODE

```

