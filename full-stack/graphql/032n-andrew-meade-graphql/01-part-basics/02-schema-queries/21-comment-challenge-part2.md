# Comment Challenge Part 2
Goal: Set up a relationship between Comment and User

1. Set up an `author` field on **Comment**
2. Update all comments in the array to have a new `author` field (use one of the ids as value)
3. Create a resolver for the Comments `author` field that returns the `user` who wrote the `comment`
4. Run a sample **query** that gets all comments and gets the author's `name`
5. Set up a `comments` field on User
6. Set up a resolver for the User `comments` field that returns all comments belonging to that `user`
7. Run a sample `query` that gets all users and all their comments

1. Set up an `author` field on **Comment**

```
// MORE CODE

  type Comment {
    id: ID!
    text: String!
    author: User!
  }

// MORE CODE
```

2. Update all comments in the array to have a new `author` field (use one of the `id`s as value)

```
const comments = [
  {
    id: '1',
    text: 'Better than cats!',
    author: '1',
  },
  {
    id: '2',
    text: 'Not better than cats',
    author: '1',
  },
  {
    id: '3',
    text: 'Was this about cats?',
    author: '3',
  },
  {
    id: '4',
    text: 'I am not a cat lover',
    author: '2',
  },
];
```

3. Create a resolver for the Comments `author` field that returns the `user` who wrote the `comment`

```
// MORE CODE

  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
  },

// MORE CODE
```

4. Run a sample **query** that gets all comments and gets the author's `name`

```
query {
  comments {
    id
    text
    author {
      name
    }
  }
}
```

* Output

```
{
  "data": {
    "comments": [
      {
        "id": "1",
        "text": "Better than cats!",
        "author": {
          "name": "Manny"
        }
      },
      {
        "id": "2",
        "text": "Not better than cats",
        "author": {
          "name": "Manny"
        }
      },
      {
        "id": "3",
        "text": "Was this about cats?",
        "author": {
          "name": "Jack"
        }
      },
      {
        "id": "4",
        "text": "I am not a cat lover",
        "author": {
          "name": "Mo"
        }
      }
    ]
  }
}
```

5. Set up a `comments` field on User

```
// MORE CODE

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

// MORE CODE
```

6. Set up a resolver for the User `comments` field that returns all comments belonging to that `user`

```
// MORE CODE

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    },
  },

// MORE CODE
```


7. Run a sample `query` that gets all users and all their comments

```
query {
  users {
    name
    comments {
      text
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
        "name": "Manny",
        "comments": [
          {
            "text": "Better than cats!"
          },
          {
            "text": "Not better than cats"
          }
        ]
      },
      {
        "name": "Mo",
        "comments": [
          {
            "text": "I am not a cat lover"
          }
        ]
      },
      {
        "name": "Jack",
        "comments": [
          {
            "text": "Was this about cats?"
          }
        ]
      }
    ]
  }
}
```

## Next
* Create a relationship between comments and posts
    - comments belong to a specific post
    - post have a selection of comments that have been left on that individual post
