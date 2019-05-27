# Comment Challenge Part 1
1. Set up a "Comment" type with `id` and `text` fields. Both non-nullable.
2. Set up a "comments" array with 4 comments
3. Set up a "comments" query with a resolver that returns all the comments
4. Run a query to get all 4 comments with both `id` and `text` fields

## Answers
1. Set up a "Comment" type with `id` and `text` fields. Both non-nullable.

`index.js`

```
// MORE CODE

  type Comment {
    id: ID!
    text: String!
  }

// MORE CODE
```

2. Set up a "comments" array with 4 comments

```
// MORE CODE

const comments = [
  {
    id: '1',
    text: 'Better than cats!',
  },
  {
    id: '2',
    text: 'Not better than cats',
  },
  {
    id: '3',
    text: 'Was this about cats?',
  },
  {
    id: '4',
    text: 'I am not a cat lover',
  },
];

// MORE CODE
```

3. Set up a "comments" query with a resolver that returns all the comments

```
// MORE CODE

type Query {
  users(query: String): [User!]!
  posts(query: String): [Post!]!
  comments: [Comment!]!
  me: User!
  post: Post!
}

// MORE CODE

comments(parent, args, ctx, info) {
  return comments;
},
```

4. Run a query to get all 4 comments with both `id` and `text` fields

* Playground

```
query {
  comments {
    id
    text
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
        "text": "Better than cats!"
      },
      {
        "id": "2",
        "text": "Not better than cats"
      },
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
}
```

## Next
* Set up relationships between our comment type and other types in our application
