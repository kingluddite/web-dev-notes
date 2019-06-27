# Refactoring Custom Type Resolvers
* Our users and posts queries work but only if we select scaler fields
* Relational fields do not work as of yet
    - This breaks because we've overwritten that behavior using files like Comment.js, Post.js and User.js

## Let's illustrate this issue (localhost:4000)
```
query {
  users(query: "a") {
    id
    name
    email
    posts {
      id
      title
    }
  }
}
```

* Give us this result set

```
{
  "data": {
    "users": [
      {
        "id": "cjxc5b7vo00nc0759fjkbjvmk",
        "name": "Jane",
        "email": "jane@acme.com",
        "posts": []
      }
    ]
  }
}
```

* We don't get an error but we don't get the expected data
* We have post in our Database but it is not showing up in our query

## Why are we not getting any posts?
* Because of the contents of User.js

`User.js`

* This is the file where we told GraphQL how to find the user's posts and comments
    - We did this by looking through our array data

```
// custom object resolver
const User = {
  posts(parent, args, { db }, info) {
    return db.posts.filter(post => post.author === parent.id);
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => comment.author === parent.id);
  },
};

export { User as default };
```

- So the reason we are not seeing our Database is we are currently not looking in our Prisma Database
    + Two ways to solve this:

## 1. Destructure prisma like:
```
// custom object resolver
const User = {
  posts(parent, args, { db, prisma }, info) {
    return primsa.posts.filter(post => post.author === parent.id);
  },
  comments(parent, args, { db, prisma }, info) {
    return prisma.comments.filter(comment => comment.author === parent.id);
  },
};

export { User as default };
```

## 2. Prisma has support for relational data built right in
* This is nice!
* This means that both of these methods are unnecessary
* So we can do this:

`User.js`

```
// custom object resolver
const User = {};

export { User as default };
```

* That's it! And we are done!

## Test again
```
query {
  users {
    id
    name
    email
    posts {
      id
      title
    }
  }
}
```

* And now we get our posts

## How is all of this working?
* It is because we chose to pass in that `info` argument (**remember** info contains all of the information about the fields requested - not just scaler but also related one)
* So just by passing in `info` into `prisma.query.users(opArgs, info)` we can get this behavior by default
    - This is another great reason to use prisma because it works directly with GraphQL it makes it easy to set up your Node.js application

## We will do the exact same thing for posts
* This does not work
    - It will fail because it is trying to get a value for a non-nullable field (author)

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
    }
  }
}
```

* But if I convert this:

`resolvers/Post.js`

```
// custom object resolver
const Post = {
  author(parent, args, { db }, info) {
    return db.users.find(user => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => {
      return comment.post === parent.id;
    });
  }
};

export { Post as default };
```

* To this:

```
// custom object resolver
const Post = {};

export { Post as default };
```

* And run this GraphQL posts query again I get the posts with all the users

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
    }
  }
}
```

* For the moment we will keep the Post and User resolver objects empty but later we will add to them to lock down behavior

## Challenge follow same logic to make the same outcome for the Comments Query
* Goal: Convert the comments query over to Prisma

1. Modify the comments query to fetch data from prisma

```
// MORE CODE

comments(parent, args, { prisma }, info) {
  const optArgs = {};

  return prisma.query.comments(optArgs, info);
},


// MORE CODE
```

* **note** If you just wanted to view scaler fields

```
// MORE CODE

comments(parent, args, { prisma }, info) {

  return prisma.query.comments(null, info);
},


// MORE CODE
```

2. Modify code to allow for relational requests when using comments query

```
// custom object resolver
const Comment = {}
};

export { Comment as default };
```

3. Test your work by performing a few different queries

http://localhost:4000/

* You have to create a comment in GraphQL http://localhost:4466 and grab an existing Prisma user id and post id

```
mutation {
  createComment(
    data: {
      text: "I like prisma"
      post: { connect: { id: "cjx0117l300fd0859mgo0ra9o" } }
      author: { connect: { email: "clyde@clyde.com" } }
    }
  ) {
    id
    author {
      name
    }
    text
  }
}
```

* Then in `http://localhost:4000/`

```
query {
  comments {
    id
    text
    author {
      id
      name
    }
    post {
      id
      title
    }
  }
}
```

## Doing the same thing we did with Queries, with Mutations
