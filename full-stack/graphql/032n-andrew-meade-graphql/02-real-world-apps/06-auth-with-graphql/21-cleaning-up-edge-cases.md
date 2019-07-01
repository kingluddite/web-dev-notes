# Cleaning up Some Edge Cases
`Query.js`

* The users query is restricted in that you can not access a user's email or a user's unpublished posts
* The problem is we still let someone search by email

```
import getUserId from '../utils/getUserId';

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

* We need to remove the email query and allow the user only to search for stuff they can see and in this case it is the name

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
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },

// MORE CODE
```

## Now fix createComment
`Mutation.js`

```
// MORE CODE

  createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          post: {
            connect: {
              id: args.data.post,
            },
          },
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

* We can create comments but we locked down our posts
* We should only be able to create comments for published posts

## Challenge
* Goal: Allow comments on published posts only

1. Check if the post is published
2. Throw an error if it is not published
3. Test your work

```
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const post = await prisma.query.post({
      where: {
        id: args.data.post,
      },
    });

    if (!post.published) {
      throw new Error('Can not create comment');
    }

    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          post: {
            connect: {
              id: args.data.post,
            },
          },
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

```

* But a slightly more efficient way it to use `exists`

```
// MORE CODE

  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true,
    });

    if (!postExists) {
      throw new Error('Can not create comment');
    }

    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          post: {
            connect: {
              id: args.data.post,
            },
          },
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

## Test
* If you try to create a comment for a post that is not published, you will get the error "Can not create comment"
* But if the post is published you can create the comment
* **tip** Use the `myPosts` to see a list of all your posts

## Updating a post
`Mutation.js`

```
// MORE CODE

  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!postExists) {
      throw new Error('Could not update Post');
    }

    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },

// MORE CODE
```

* The goal is to delete all post comments if the post is about to be unpublished
    - We don't have to do that when deleting post because we are using the @cascade directive to accomplish that
    - But in our case here, we still need to apply a small amount of manual work

## Challenge - Goal: Delete all comments when unpublishing a post
1. Use `exists` to determine if the post is published or not
2. If published, but about to be unpublished, delete all post comments
   * Check out the `deleteManyComments` mutation in the schema tab for Prisma
3. Test your work 

```
// MORE CODE

  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });
    // find only published post
    const isPublished = await prisma.exists.Post({
      id: args.id,
      published: true,
    });

    // if post is published and is about to be unpublished
    if (isPublished && args.data.published === false) {
      // delete all comments with that post id
      const deletedComments = await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id,
          },
        },
      });
      console.log(deletedComments);
    }

    if (!postExists) {
      throw new Error('Could not update Post');
    }

    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },

// MORE CODE
```

* I logged `deletedComments` to show the number of comments deleted in the Terminal

## Test Challenge
* Find all your posts and comments on that post

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
    comments {
      id
      text
    }
  }
}
```

* Copy a published post id to the clipboard
* Paste that post `id` into your `updatePost` mutation

```
mutation {
  updatePost(id: "cjxjy1yjl07et0759yddj3i2f", data: {
    body: "my teeth hurt",
    published: true,
    title: "teeth"
  }){
    id
    title
    body
    published
  }
}
```

* Make sure you have your auth token
* Now change the true to false for published

```
mutation {
  updatePost(id: "cjxjy1yjl07et0759yddj3i2f", data: {
    body: "my teeth hurt",
    published: false,
    title: "teeth"
  }){
    id
    title
    body
    published
  }
}
```

* And run the `myPosts` again and you will see all the comments have been removed

## Next - lock down subscriptions

