# Locking Down Subscriptions
* We'll lock down our subscriptions the same way we locked down Queries and Mutations
* We have 2 subscriptions

1. comment
    * We use this for subscribing to comments on a particular post where we provide the post it
2. post
    * We use the post subscription to subscribe to all public posts

`Subscriptions.js`

```
const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId,
              },
            },
          },
        },
        info
      );
    },
  },

  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
};

export { Subscription as default };

```

## Create a 3rd subscription
* This subscription will require authentication
* We'll call it `myPost`
    * This will allow a logged in user to just subscribe to their post
        - both published and draft posts

```
// MORE CODE

  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
    }
  }

// MORE CODE
```

* There is a problem with the above and it involves getUserId

`getUserId.js`

```
import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {
  const header = request.request.headers.authorization;

// MORE CODE
```

* The problem is when dealing with subscriptions it is a bit different than using `request.request.headers.authorization`
* For Queries and Mutations we are using standard HTTP requests
* With subscriptions we are using **Web Sockets** and in that case the data lives somewhere else on the request

## Web sockets
* The auth token lives in the request here: 

`request.connection.context.Authorization`

### Case? WTF?
* Why is HTTP standard requests lower "a" for "authorization":

`request.request.headers.authorization`

* And with Web Sockets it is a Capital "A" like:

`request.connection.context.Authorization`

* Who knows but for now you must spell it like that
* Maybe they will fix it down the road and then your code will break but for now them's the rules!

## Conditional
* So we need to set up some logic to use Web Sockets or HTTP standard for requests and the determining factor is `request.request`

### Ternary to the rescue
* If we are using `request.request` use `request.request.headers.authorization` else use `request.connection.context.Authorization`
* Here is the code to do that:

`getUserId.js`

```
import jwt from 'jsonwebtoken';

const getUserId = (request, requireAuth = true) => {
  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysecret');
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authorization required');
  }

  return null;
};

export { getUserId as default };

```

## Challenge - Goal: Finish the myPosts subscription
1. Define the subscription in `schema.graphl`
2. Use correct prisma method to subscribe to posts
   * Limit to posts by a particular author using "where"
3. Test your work

### Solution
1. Define the subscription in `schema.graphl`

```
// MORE CODE

type Subscription {
  comment(postId: ID!): CommentSubscriptionPayload!
  post: PostSubscriptionPayload!
  myPost: PostSubscriptionPayload!
}

// MORE CODE
```

2. Use correct prisma method to subscribe to posts
   * Limit to posts by a particular author using "where"

```
// MORE CODE

 myPost: {
   subscribe(parent, args, { prisma, request }, info) {
     const userId = getUserId(request);

     return prisma.subscription.post({
       where: {
         node: {
           author: {
             id: userId,
           },
         },
       },
     });
   },
 },

// MORE CODE
```

* Don't forget to provide `info` or you will get error "Cannot return null for non-nullable field Subscription.myPost"

```
// MORE CODE

  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);

      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId,
              },
            },
          },
        },
        info
      );
    },
  },

// MORE CODE
```

3. Test your work

```
subscription {
  myPost {
    mutation
    node {
      id
      title
      body
      author {
        id
        name
      }
    }
  }
}
```

* I update a post with updatePost
* **important** Make sure you are authenticated (auth token!)

```
mutation {
  updatePost(id: "cjxjy1yjl07et0759yddj3i2f", data: {
    body: "did you hear about this?",
    published: false,
    title: "ttttt"
  }){
    id
    title
    body
    published
  }
}
```

* And get this notification from my myPost subscription

```
{
  "data": {
    "myPost": {
      "mutation": "UPDATED",
      "node": {
        "id": "cjxjy1yjl07et0759yddj3i2f",
        "title": "ttttt",
        "body": "did you hear about this?",
        "author": {
          "id": "cjxjxz94j07ek07592yapfmum",
          "name": "Eve"
        }
      }
    }
  }
}
```




