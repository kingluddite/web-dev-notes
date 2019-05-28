# Creating data with Mutations
* The Mutation operation will allow us to change data on the server
    - create data
    - update data
    - delete data
* Goal - To use Mutations from our GraphQL client to perform operations on a UI like sign up a user

## Remember
* The GraphQL client could be:
    - a web app
    - a mobile app
    - or just even GraphQL playground
* If it was a web or mobile app
    1. I would get some data from a sign up form (or any form)
    2. We would need a way to pass that data to the server
    3. The server needs to response accordingly
    4. Maybe the server will do a little validation on that data (example: make sure the email is not already in use by another user)
    5. The server will send back a success message or an error message letting me know that things didn't go as expected

## We already defined all the Queries we wanted to support
* Now we are going to define all the Mutations we are going to support

## createUser Mutation
* We will have to use some arguments and our client will have to send some data across
    - You have to send a name and an email and optionally you could also send an age

```
// MORE CODE

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
  }

// MORE CODE
```

* We have our `createUser` mutation and pass it the required `name` and `email` and the age is optional

## Warning - Our file is getting larger!
* We'll create multiple files later but right now, we'll stick to a one file solution

## Next - Create a resolver
* We'll add our Mutations just after our Queries ends
* We'll get same 4 arguments for Mutation
    - `parent`, `args`, `ctx`, `info`

`index.js`

```
// MORE CODE

    post() {
      return {
        id: '123',
        title: 'Great Movies',
        body: 'Jaws made me afraid of the water',
        published: '1/1/2019',
      };
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      // stuff
    },
  },
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

* With a Query we are just concerned about fetching data
* With a Mutation we are concerned about creating, updating or deleting data and then responding accordingly

## Let's log out a test
`index.js`

```
// MORE CODE

  Mutation: {
    createUser(parent, args, ctx, info) {
      console.log(args);
    },
  },

// MORE CODE
```

* GraphQL Playground
    - Currently:
        + We are not creating a new user
        + We are not returning the data that createUser expects to get back (a User object)
        + But no worries, this will still work for the most part

```
mutation {

}
```

* The syntax will look very similar to when we passed arguments to a Query in Playground

`http://localhost:4000/`

```
mutation {
  createUser(name: "John", email: "john@john.com", age: 22) {
    id
    name
    email
    age
  }
}
```

* This results in an error:

```
{
  "data": null,
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Mutation.createUser.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "createUser"
      ]
    }
  ]
}
```

* But our `console.log()` in the Terminal running GraphQL server shows us

```
{ name: 'John', email: 'john@john.com', age: 22 }
```

## Wire up backend to perform task
1. We need to check if the email is unique
2. We'll create a new user with a randomly generated ID
3. We'll add it to the array and return it to the user

### UUID library
* Great library for generating random ID's
* [github repo](https://github.com/kelektiv/node-uuid)
* What does UUID do?
    - Generates a random ID you can use as a string
* There are 4 types of UUID
    - version 1 (timestamp)
    - version 3 (namespace)
    - **version 4 (random) - we are using this one**
    - version 5 (namespace)
* uuid is a **default** export

#### Install UUID
1. Shut down server with `ctrl` + `c`
2. `$ npm i uuid`

#### Add uuid as import
* `.some()` returns true of some of users have email and return false if none of the users have that email
    - Like most of the array methods we provide a callback function
    - It gets called one time for every single array in the list
    - 3 of the args we sent to the server but it would be nice to get the randomly generated ID of the user we just created get sent back to the client

## Run server again
`$ npm run start`

* Playground

```
mutation {
  createUser(name: "John", email: "john@john.com", age: 22) {
    id
    name
    email
    age
  }
}
```

* Output

```
{
  "data": {
    "createUser": {
      "id": "ad357440-5224-4dac-b4f6-4f5628f7e98f",
      "name": "John",
      "email": "john@john.com",
      "age": 22
    }
  }
}
```

* But if you run it again
* We should see our dupe email check getting triggered
* A new user will not be created and we get this error:

```
{
  "data": null,
  "errors": [
    {
      "message": "Email taken",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "createUser"
      ]
    }
  ]
}
```

* You will see a new `errors` property with an array of all the errors that occurred

## Our data is not persistant
* If we changed something in `index.js` like add a `.` inside our error messsage, you would be able to create the user again with the email because the mutation was not saved to a DB and just in memory so when we restart the server the mutation will run again and add the email again

## Summary about Mutations
* There are two sides to any Mutation

1. There is the client operation
2. There is the server definitition

So if I want to support a Mutation, I have to define it on the server than I have to use it from the client

The definition of a Mutation very similar to a Query

### From the server's perspective
1. Define a new Mutation type
2. List out all the Mutations we want to support
3. Give them a name, set up the arguments and give them a value
4. Then we define a resolver method just like we did for any of our Queries
5. We take in the input (via the args argument)
6. We return whatever data the application expects to return

### From the client's perspective
* Also very similary to a Query
* Playground

1. We have a mutation {}
2. We list one of our mutations inside our mutation

```
mutation {
    createUser {

    }
}
```

3. We take in arguments

```
mutation {
    createUser(name: "John", email: "john@john.com", age: 22) {

    }
}
```

4. We provide the selection set we want

```
mutation {
  createUser(name: "John", email: "john@john.com", age: 22) {
    id
    name
    email
  }
}
```

* Only have to provide what is required in my Mutation schema
