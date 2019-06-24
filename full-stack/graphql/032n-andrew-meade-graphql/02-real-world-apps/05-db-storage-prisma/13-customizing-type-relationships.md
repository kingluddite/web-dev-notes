# Customizing Type Relationships
* What happens when we try to remove date from our Database using the GraphQL API
    - And how we can override that default behavior by making a few changes to datamodel.prisma

## Try to remove a user in GraphQL Playground
* Delete a user that has a comment

```
mutation {
  deleteUser(where:{
    id: "cjx00qd8l008a0859zfb31bhw"
  }) {
    id
    name
    email
  }
}
```

* Error

```
{
  "data": {
    "deleteUser": null
  },
  "errors": [
    {
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteUser"
      ],
      "code": 3042,
      "message": "The change you are trying to make would violate the required relation 'PostToUser' between Post and User",
      "requestId": "local:cjx986p1i0aeh0759fwibx06f"
    }
  ]
}
```

* If you query comments

```
query {
  comments {
    id
    text
    author {
      id
      name
    }
  }
}
```

* Copy an `id` of a user who has comments try to delete that user
* This will give you a slightly different error

```
{
  "data": {
    "deleteUser": null
  },
  "errors": [
    {
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteUser"
      ],
      "code": 3042,
      "message": "The change you are trying to make would violate the required relation 'CommentToUser' between Comment and User",
      "requestId": "local:cjx98c49l0ai60759n658s9i6"
    }
  ]
}
```

* We see for data.deleteUser we have a value of `null` (This is because no user was removed)
* There is just one object in the errors array
    - `The change you are trying to make would violate the required relation 'CommentToUser' between Comment and User`
    - This is referring to our two types `User` and `Comment`

`datamodel.prisma`

```
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  posts: [Post!]!
}

// MORE CODE

type Comment {
  id: ID! @id
  text: String!
  author: User!
  post: Post!
}

```

* When a user gets removed it makes the comment invalid
* All of our comments have that `author` field which needs to link to a User!
    - User is non-nullable
    - This is why prisma isn't letting us delete Comment

## Good news!
* We can override this behavior
* We can setup some 'on delete' behavior to solve this issue

### We ran into the same problem before
* When we created our GraphQL API using just arrays for storage
* When we deleted the user we also had to delete all of their posts and all of their comments
    - We will do the same thing here with Prisma
    - But the good news is the process of setting it up will be MUCH, MUCH easier

* **note** When we brought over all of our types datamodel.prisma we never reconfigured the `comments` field on User and Post
* We'll do that now (It didn't matter thus far but we need it now) 

`datamodel.prisma`

```
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  posts: [Post!]!
  comments: [Comment!]!
}

type Post {
  id: ID! @id
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment!]!
}

// MORE CODE
```

* We add a non-nullable arrary and all of the types are of a type Comment

## What happens when a given type gets deleted?
* Prisma gives us 2 options:

1. SET_NULL (A default option)
2. CASCADE (An additional option we can set up)

* Both of these options are only relevent when we have types that link to other types
    - Examples
        + A User links to Post via post
        + A User links to Comment via comments 
        + A Post links to User via author
        + A Post links to Comment via comments
        + A Comment links to User via author
        + A Comment links to Post via post
    - In all 6 situations above we can customize what happens to the other records when a given record gets removed

## Currently, what happens when a user gets deleted?
* By default we use the SET_NULL behavior, so it tries to set the field on the Post to null (so author it tries to set to null and that generates an error)
* When we try to deleted a user with a comment it tries to set the author field to null (which is non-nullable and thus generates an error)

## Our rules
* We don't want to keep posts or comments around if the user has been deleted
* So SET_NULL is not what we want to use here, instead we are looking for CASCASE

## CASCADE
* When we delete a user it will delete all posts associated with that user
* We could do the exact same thing for Comment, so when a user gets removed, we remove all of their posts and comments
* We could also set this up for Post, when a Post gets removed we can use CASCADE to make sure all of the comments get removed as well

### How to configure CASCASE using `relation`
* Primsa gives us another **directive** allowing us to customize the relationships between our types
* We use the `relation` directive on our field linking to other types

`datamodel.prisma`

```
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  posts: [Post!]! @relation(name: 'PostToUser', onDelete: CASCADE)
  comments: [Comment!]! @relation(name: 'CommentToUser', onDelete: CASCADE)
}

type Post {
  id: ID! @id
  title: String!
  body: String!
  published: Boolean!
  author: User! @relation(name: 'PostToUser', onDelete: SET_NULL)
  comments: [Comment!]! (name: 'CommentToPost', onDelete: CASCADE)
}


type Comment {
  id: ID! @id
  text: String!
  author: User! @relation(name: 'CommentToUser', onDelete: SET_NULL)
  post: Post! @relation(name: 'CommentToPost', onDelete: SET_NULL)
}
```

* Notice when we use CASCADE and SET_NULL
* We use SET_NULL when we don't want to delete (like we don't want to delete users)
* Notice we give the directive `@relation` a name and sometimes we use the same name
    - Like for user we have a @relation for posts named `PostToUser` and we use the same name on the matching field in the other type Post, the author field has an @realtion with the same PostToUser name. We set that onDelete to SET_NULL because we don't want to delete the user but we do want to delete the user's comments

## Test it out
* Since we made changes to our `datamodel.prisma` we need to be inside our `prisma` directory and redeploy our app

* Stop server `ctrl` + `c`

`$ cd prisma`

`$ prisma deploy`

* You will see our 2 new comments fields added

```
Changes:

  User (Type)
  + Created field `comments` of type `[Comment!]!`

  Post (Type)
  + Created field `comments` of type `[Comment!]!`
```

* Now run the same `deleteUser` command we ran before but now we will successfully delete the user

```
mutation {
  deleteUser(where:{
    id: "cjx4vfkqh00e5075900liocar"
  }) {
    id
    name
    email
  }
}
```

* Check out all the comments

```
query {
  comments {
    id
    text
    author {
      id
      name
    }
  }
}
```

* That user's comments will be removed

```
{
  "data": {
    "comments": []
  }
}
```

* If that particular user had any posts associated with them, they would also be removed and any comments on that post that got deleted by other users would have been deleted too

## Recap
* User has its comments and posts removed
* Since we are removing posts all of the post comments are removed too
* This is the same behavior we had before when we were not using a Database but just an array
    - But the Big different is before we had to manually delete all of them and it was a hassle
    - Now instead we modify 6 lines of code in datamodel.prisma and it achieves the same outcome
    - We needed all 6 lines in order to get everything to work

## Next - Challenge
* You will have to create a separate Prisma project with a different data model for a different type of application
    - You will need to set up all the types for that application
    - And you'll need to set up the relationship between all of those types 
