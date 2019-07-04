# Working with createdAt and updatedAt
* **note** These fields used to be autobaked into primsa, now you must add them
    - We already added them earlier but this is where we would actually add them in our notes
* 3 fields that autogenerate values
    - id
    - updatedAt
    - createdAt

## datamodel.grapqhl
* This is where we define our 3 types
    - User
    - Post
    - Comment

`datamodel.graphql`

* We add createdAt and updatedAt

```
// MORE CODE

type User {
  id: ID! @id
  name: String!
  email: String! @unique
  password: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  posts: [Post!]! @relation(name: "PostToUser", onDelete: CASCADE)
  comments: [Comment!]! @relation(name: "CommentToUser", onDelete: CASCADE)
}

// MORE CODE
```

### createdAt and updatedAt
* Will be represented as Strings but Prisma gives us a date type for them called `DateTime`
* Must be non-nullible
* Making these changes to `datamodel.prisma` you must redeploy your app

`$ cd prisma && prisma deploy`

#### You also need to fetch a new schema
* Anytime you change Prisma you should fetch a new schema

`$ cd ../ && npm run get-schema`

## Now we need to change schema.graphql
1. We first changed the User in our Prisma type definition
2. Now we need to change the User in our schema

`src/schema.graphql`

```
// MORE CODE

type User {
  id: ID!
  name: String!
  email: String
  password: String!
  posts: [Post!]!
  comments: [Comment!]!
}

// MORE CODE
```

* We need to add `updatedAt` and `createdAt`
* We will set the types for both as non-nullible Strings

```
// MORE CODE

type User {
  id: ID!
  name: String!
  email: String
  password: String!
  posts: [Post!]!
  comments: [Comment!]!
  updatedAt: String!
  createdAt: String!
}

// MORE CODE
```

* After adding these to fields to our User schema we now have access to those timestamps for all users

## Test users query in GraphQL Playground
* Refresh :4000 GraphQL Playground
* Modify to look like this:

```
query {
  users {
    email
    name
    updatedAt
    createdAt
  }
}
```

* Will return

```
{
  "data": {
    "users": [
      {
        "email": null,
        "name": "Adam",
        "updatedAt": "2019-07-01T05:27:22.153Z",
        "createdAt": "2019-07-01T05:27:22.153Z"
      },
      {
        "email": null,
        "name": "Eve",
        "updatedAt": "2019-07-01T05:27:44.371Z",
        "createdAt": "2019-07-01T05:27:44.371Z"
      },
      {
        "email": null,
        "name": "Noah2",
        "updatedAt": "2019-07-02T18:01:01.149Z",
        "createdAt": "2019-07-02T17:57:39.197Z"
      }
    ]
  }
}
```

* Now we know when the user was originally created and when the user was last updated
* Congrats for just "exposing those timestamps to the client"

## Why can't I read the timestamp?
* It is computer friendly not human friendly
* We don't just want to dump it to our web app

## Our timestamp follows a standardized format
* Google "iso 8601"

### ISO 8601
* This is the standard for describing time the way machines understand
* They are time zone independent
* We don't care about giving the server a date that's easy for humans to read we want to give it a date that's easy for machines to read

#### momentjs
* This is a library that can used to consume our iso 8601 string and convert it into a human friendly date that would could server the client

### sorting
* We will be able to sort by these 2 data fields

## Challenge
* Expose the timestamps for posts and comments

### - Goal: Configure updatedAt and createdAt for 
1. Update prisma models with those fields
2. Redeploy and fetch new schema
3. Update your schema with those fields
4. Test your work

`prisma/datamodel.prisma`

```
// MORE CODE

type Post {
  id: ID! @id
  title: String!
  body: String!
  published: Boolean!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  author: User! @relation(name: "PostToUser", onDelete: SET_NULL)
  comments: [Comment!]! @relation(name: "CommentToPost", onDelete: CASCADE)
}


type Comment {
  id: ID! @id
  text: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  author: User! @relation(name: "CommentToUser", onDelete: SET_NULL)
  post: Post! @relation(name: "CommentToPost", onDelete: SET_NULL)
}

// MORE CODE
```

* Redeploy 

`$ cd prisma && prisma deploy` 

* Refetch schema

`$ cd ../ && npm run get-schema`

`src/schema.graphl`

```
// MORE CODE

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  professionalLeague: String
  updatedAt: String!
  createdAt: String!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  createdAt: String!
  updatedAt: String!
  createdAt: String!
  post: Post!
}


// MORE CODE
```

* You may need to wipe your Database with `$ prisma reset && prisma deploy`

## Test
* View your posts and comments with your 2 new date fields
* If updatedAt and createdAt are the same it means that when it was created they are the same values

## Reminder
* If you change your datamodel you need to redeploy
* If you redeploy you need to pull down your new schema
* If you don't see your new fields in the GraphQL Playground client, this is probably what you need to do

## Next - sort by other fields and our new date fields
