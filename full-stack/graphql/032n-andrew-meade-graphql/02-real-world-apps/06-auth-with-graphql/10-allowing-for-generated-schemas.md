# Allowing for Generated Schemas
* We just locked down Prisma

![Prisma locked down](https://i.imgur.com/esA04GT.png)

## How can we authenticate a client's request
* We will focus on our "Sign Up" request
* We can currently create a user but there is no password field
* We will incorporate a password

## Visualization
![Prisma authentication](https://i.imgur.com/UADdbgX.png)

1. Client wants to edit a post with an id of "A9MN"
2. This request will get sent off to Node.js
3. Node.js will respond correctly
4. If we are not authenticated we will lock down almost all operations
    * The only thing you will be able to do if you are not authenticated is read public posts
    * You won't be able to read your drafts because we don't know who you are
    * You won't be able to use CRUD
5. The Node.js server will ask you to login

## Client Login stage
![use logs in and node generates auth token](https://i.imgur.com/9HLSwMT.png)

1. The client will login with email/password (let's assume the client already exists)
2. The client sends the login credentials off to Node.js
3. Node.js will verify that the credentials exist in the Database
4. If it does find a user it will say "I found your account. Here's an auth token"
    * Node.js will create an auth token and send that back to the client
5. The client can than use this token to make requests that require authentication (example: To edit a post)
    * Now that our client has the auth token it can send it with future requests

![replay request but with auth token](https://i.imgur.com/N7Y2YXw.png)

6. Node.js can get that auth token
7. Node.js can verify that auth token belongs to the user who is the creator of the post that is being edited and if it is a match, the user can perform the edit post operation

![node verifies auth token is user who wants to edit post](https://i.imgur.com/Ytrcjhr.png)

## Add a new password field
* We will not store this password in plain text
* We will use a hashing algorithm to encrypt the password

`prisma/datamodel.prisma`

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

`schema.graphql`

```
// MORE CODE

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  posts: [Post!]!
  comments: [Comment!]!
}

// MORE CODE
```

## Wipe our Database
* Then we will redeploy
* We don't have a password field in any of our existing users so blowing up our Database and starting again is the best course of action

`$ cd prisma && prisma delete`

* "Are you sure that you want to delete http://localhost:4466? y/N (n)"
* Type `y`
* That will delete our default Database

### Redeploy Prisma
* Make sure you are still inside `prisma` directory

`$ prisma deploy`

* This will create our Database with a password field for each and every user
* You will see output like the following in your Terminal:

```
Changes:

  User (Type)
  + Created type `User`
  + Created field `id` of type `ID!`
  + Created field `name` of type `String!`
  + Created field `email` of type `String!`
  + Created field `password` of type `String!`
  + Created field `createdAt` of type `DateTime!`
  + Created field `updatedAt` of type `DateTime!`
  + Created field `posts` of type `[Post!]!`
  + Created field `comments` of type `[Comment!]!`

  Post (Type)
  + Created type `Post`
  + Created field `id` of type `ID!`
  + Created field `title` of type `String!`
  + Created field `body` of type `String!`
  + Created field `published` of type `Boolean!`
  + Created field `author` of type `User!`
  + Created field `comments` of type `[Comment!]!`

  Comment (Type)
  + Created type `Comment`
  + Created field `id` of type `ID!`
  + Created field `text` of type `String!`
  + Created field `author` of type `User!`
  + Created field `post` of type `Post!`

  PostToUser (Relation)
  + Created an inline relation between `Post` and `User` in the column `author` of table `Post`

  CommentToUser (Relation)
  + Created an inline relation between `Comment` and `User` in the column `author` of table `Comment`

  CommentToPost (Relation)
  + Created an inline relation between `Comment` and `Post` in the column `post` of table `Comment`
```

### We made a change to datamodel.prisma
* So we need to generate a new `src/generated/prisma.graphql` file

#### Generate a new prisma.graphql
* Using this command `get-schema` in `package.json`

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

`$ npm run get-schem`

#### Houston we have a problem!
* We get this error "Your token is invalid"
* This is because we locked down Prisma

##### Solution
* We could pass a ton of arguments in our package.json but that gets long and sloppy and our token is inside our package.json

##### A better solution - small tweak to .graphqlconfig
* Currently the `$ npm run get-schema` is failing because the only way it can access that schema is by endpoint:

`.graphqlconfig`

```
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "endpoints": {
          "default": "http://localhost:4466"
        }
      }
    }
  }
}
```

* And our endpoing `http://localhost:4466` is locked down
* But for our one `get-schema` script in `package.json` we will provide an alternative where we can run `get-schema` without providing a **secret**
* The only reason this will work is we have the `prisma` directory right in the same project
    - So we will just point get-schema right toward these files
        + prisma
            * datamodel.prisma
            * docker-compose.yml
            * prisma.yml
    - This will allow us to get the new schema without needed to go to localhost:4466

## Update our .graphqlconfig
* We will add `prisma` property and sets it value to to the path to our `prisma.yml` file

```
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "prisma": "prisma/prisma.yml",
        "endpoints": {
          "default": "http://localhost:4466"
        }
      }
    }
  }
}
```

* Now we still have that locked down endpoing `http://localhost:4466` which makes sure the client can't directly interact with our Prisma GraphQL API
* But we also provided an alternative for our local development tools which allows us to keep our package.json script exactly the same

```
// MORE CODE

  "scripts": {
    "start": "nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

## Re-run get-schema script and this time it should work!
* Make sure you are in the root of your project (where the `package.json` is)

`$ npm run get-schema`

* And you should see:

![schema file updated](https://i.imgur.com/6iPZI1N.png)

## Next
* Update Mutation.js to hash and encrypt our passwords





