# Relational Data Arrays
`index.js`

```
// MORE CODE

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

// MORE CODE
```

* Now we need to teach GraphQL is how to get the posts for a user when it has a user
* We already setup Post author now we need to set up User post
    - **remember** If one of our fields is not a scalar type we have to set up a custom resolver function to teach GraphQL how to get the data

`index.js`

```
// MORE CODE

  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* We wrote this:

```
User: {
  posts(parent, args, ctx, info) {
    return posts.filter(post => {
      return post.author === parent.id;
    });
  },
},
```

## Test it out in Playground
```
query {
  users {
    id
    name
    email
    age
    posts {
      id
      title
    }
  }
}
```

* Output

```
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Manny",
        "email": "manny@pepboys.com",
        "age": null,
        "posts": [
          {
            "id": "1",
            "title": "soccer"
          },
          {
            "id": "2",
            "title": "basketball"
          }
        ]
      },
      {
        "id": "2",
        "name": "Mo",
        "email": "mo@pepboys.com",
        "age": 100,
        "posts": [
          {
            "id": "3",
            "title": "tennis"
          }
        ]
      },
      {
        "id": "3",
        "name": "Jack",
        "email": "jack@pepboys.com",
        "age": null,
        "posts": []
      }
    ]
  }
}
```

## Let's figure out what is happening
* What happens when this query runs in Playground

```
query {
  users {
    id
    name
    email
    age
    posts {
      id
      title
    }
  }
}
```

1. It will run the resolver method for our `users` Query

```
// MORE CODE

users(parent, args, ctx, info) {
  if (!args.query) {
    return users;
  }

  return users.filter(user => {
    return user.name.toLowerCase().includes(args.query.toLowerCase());
  });
},

// MORE CODE
```

* When it returns a value it will check if we requested any of those relational types
    - So if we just ask for `id`, `name`, `email` or `age` .... that's it, whatever data comes back is going to be the data that comes back in the response
* **BUT** If it sees that the query has asked for relational data (in this case `posts`) it will then call the User posts method for every single user it found
    - We have 3 users so it will call the posts method 3 times
    - Each time it calls it it will call it with a different value for `parent`, it will be calling it with each of those 3 objects which means we can access things like:
        + parent.id
        + parent.name
        + parent.email
        + WE CAN ACCESS ANYTHING ON THE USER OBJECT

## What are we actually going to do?
* We will use the `filter()` method on posts to find just the posts who's author's property matches up with `parent.id`

```
// MORE CODE

User: {
  posts(parent, args, ctx, info) {
    return posts.filter(post => {
      // we want to return true if this post belongs to this author
      return post.author === parent.id;
    });
  },
},

// MORE CODE
```

If the `post.author` property matches the `parent.id` property we know we found a **match** and we'll associate that **post** with that **user**

## Summary
* We have our relationship set up in 2 directions
    - Given a Post we can access it's author via the author property
    - Given a User we can access all of their posts via the posts property

### Silly time
* With these relationships set up we can do some silly things
    - I could start with the users, then get the users posts then from the posts I could go back and get the author (no real purpose served here but it is valid and possible)

```
query {
  users {
    id
    name
    email
    age
    posts {
      id
      title
      author {
        id
        name
      }
    }
  }
}
```

* Output

```
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Manny",
        "email": "manny@pepboys.com",
        "age": null,
        "posts": [
          {
            "id": "1",
            "title": "soccer",
            "author": {
              "id": "1",
              "name": "Manny"
            }
          },
          {
            "id": "2",
            "title": "basketball",
            "author": {
              "id": "1",
              "name": "Manny"
            }
          }
        ]
      },
      {
        "id": "2",
        "name": "Mo",
        "email": "mo@pepboys.com",
        "age": 100,
        "posts": [
          {
            "id": "3",
            "title": "tennis",
            "author": {
              "id": "2",
              "name": "Mo"
            }
          }
        ]
      },
      {
        "id": "3",
        "name": "Jack",
        "email": "jack@pepboys.com",
        "age": null,
        "posts": []
      }
    ]
  }
}
```

* This is redundant data and doesn't make much sense
* But once we set up other custom types and other relationships it will make more sense
* example:
    - I want to get all users, all of their posts and then get some comments for the individual posts

## Comment type
* Our third custom type we need for our application
* A comment will be associated with a user but is also associated with a post
