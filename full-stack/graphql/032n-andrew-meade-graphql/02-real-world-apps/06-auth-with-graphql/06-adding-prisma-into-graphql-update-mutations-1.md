# Adding Prisma into GraphQL Update Mutations (Part 1)
* This was the most complex in our CRUD using the db.js array Database
* Prisma will allow us to reduce our lines of code and code complexity

```
async updateUser(parent, args, { prisma, pubsub }, info) {
  const userExists = await prisma.exists.User({ id: args.id });

  if (!user) {
    throw new Error('User Not Found');
  }

  const emailExists = await prisma.exists.User({ email: args.data.email });

  if (emailExists) {
    throw new Error('Sorry. That email is already taken');
  }

  return prisma.mutation.updateUser(
    {
      data: {
        name: args.data.name,
        email: args.data.email,
      },
      where: {
        id: args.id,
      },
    },
    info
  );
},
```

* But you can remove checking if exists and leave that up to Prisma

```
import uuidv4 from 'uuid/v4';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {

    return prisma.mutation.createUser({ data: args.data }, info);
  },
  async deleteUser(parent, args, { prisma }, info) {

    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },
  async updateUser(parent, args, { prisma, pubsub }, info) {

    return prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

// MORE CODE
```

* We used the code before to understand all the stuff that Prisma is doing for us
* Now our code is simplified greatly

## Code Challenge
* Goal: Refactor the createPost mutation to use Prisma

1. Refactor `createPost` mutation resolver to use Prisma instead of the array data
    * Don't worry about pubsub or subscription
2. Test the Mutation from `localhost:4000`

* Prisma handles almost all pubsub and subscriptions internally
* We will not use pubsub.publish anywhere inside of this file

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

* Test in GraphQL

```
mutation {
  createPost(data: {
    title: "Wake Up",
    body: "Don't fall asleep",
    published: false,
    author: "cjxcfh7nx01f00759zfvdok8l"
  }) {
    id
    title
    body
    author {
      id
      name
    }
  }
}
```

## Next
* Refactor updatePost and deletePost
