# Comment Challenge Part 3k
* We will set up a relationship between the post and the comment
* The comment was commented on a specific post
* All posts have a collection of comments associated with it
* We need to do these things so we can fetch all the comments for a specific post when making queries with GraphQL

## Challenge
Goal: Set up a relationship between Comment and Post

1. Set up a post field on Comment
2. Update all comments in the array to have a new post field (use one of the post ids as value)
3. Create a resolver for the Comments post field that returns the post that the comment belongs to
4. Run a sample query that gets all comments and gets the post name
5. Set up a comments field on Post
6. Set up a resolver for the Post comments field that returns all comments belonging to taht post
7. Run a sample query that gets all posts and all their comments


1. Set up a post field on Comment

```
// MORE CODE

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

// MORE CODE
```

2. Update all comments in the array to have a new post field (use one of the post ids as value)

```
// MORE CODE

const comments = [
  {
    id: '1',
    text: 'Better than cats!',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: 'Not better than cats',
    author: '1',
    post: '1'
  },
  {
    id: '3',
    text: 'Was this about cats?',
    author: '3',
    post: '3'
  },
  {
    id: '4',
    text: 'I am not a cat lover',
    author: '2',
    post: '3' 
  },
];

// MORE CODE
```

3. Create a resolver for the Comments post field that returns the post that the comment belongs to

```
// MORE CODE

  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    },
  },

// MORE CODE
```

4. Run a sample query that gets all comments and gets the post name

```
query {
  comments {
    id
    text
    post {
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
    "comments": [
      {
        "id": "1",
        "text": "Better than cats!",
        "post": {
          "id": "1",
          "title": "soccer"
        }
      },
      {
        "id": "2",
        "text": "Not better than cats",
        "post": {
          "id": "1",
          "title": "soccer"
        }
      },
      {
        "id": "3",
        "text": "Was this about cats?",
        "post": {
          "id": "3",
          "title": "tennis"
        }
      },
      {
        "id": "4",
        "text": "I am not a cat lover",
        "post": {
          "id": "3",
          "title": "tennis"
        }
      }
    ]
  }
}
```

5. Set up a comments field on Post

```
// MORE CODE

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    professionalLeague: String!
    author: User!
    comments: [Comment!]!
  }

// MORE CODE
```

6. Set up a resolver for the Post comments field that returns all comments belonging to that post

```
// MORE CODE

Post: {
  author(parent, args, ctx, info) {
    return users.find(user => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, ctx, info) {
    return comments.filter(comment => {
      return comment.post === parent.id;
    });
  },
},

// MORE CODE
```

7. Run a sample query that gets all posts and all their comments

```
query {
  posts {
    id
    title
    comments {
      id
      text
    }
  }
}
```

* Output

```
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "soccer",
        "comments": [
          {
            "id": "1",
            "text": "Better than cats!"
          },
          {
            "id": "2",
            "text": "Not better than cats"
          }
        ]
      },
      {
        "id": "2",
        "title": "basketball",
        "comments": []
      },
      {
        "id": "3",
        "title": "tennis",
        "comments": [
          {
            "id": "3",
            "text": "Was this about cats?"
          },
          {
            "id": "4",
            "text": "I am not a cat lover"
          }
        ]
      }
    ]
  }
}
```

## Getting crazy with our Playground
```
query {
  posts {
    id
    title
    author {
      name
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

* Output

```
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "soccer",
        "author": {
          "name": "Manny"
        },
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
          }
        ]
      },
      {
        "id": "2",
        "title": "basketball",
        "author": {
          "name": "Manny"
        },
        "comments": []
      },
      {
        "id": "3",
        "title": "tennis",
        "author": {
          "name": "Mo"
        },
        "comments": [
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
    ]
  }
}
```

## Summing up
* With GraphQL the client is who dictates what data comes back
* This is very useful
* If I was on a desktop application I might run this 

```
query {
  posts {
    id
    title
    author {
      name
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

If I was on mobile I might leave comments off

```
query {
  posts {
    id
    title
    author {
      name
    }
  }
}
```

* Than later on I'd fetch the comments if the user determined they wanted to see them by clicking something like a `comments` button

## so far all our data is static

## Next
* We'll learn about the Mutation operator that will allow us to perform the other CRUD operations
    - We did the R for Read
    - Next we have to do the Create, Update and Delete
