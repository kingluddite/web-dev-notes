# Update Data with Mutations (Part 1)
* Updating users

1. Define the Mutation
2. Define the Resolver
3. Test

## Update arguments
1. Pass the `id` of the user you want to update
2. Pass and object with all fields you want to update

`schema.graphql`

```
// MORE CODE

type Mutation {
  // MORE CODE

  updateUser(id: ID!, data: UpdateUserInput!): User!
  
  // MORE CODE
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}
```

* We could have reused CreateUserInput but it has 2 required fields and we want to have name, email and age as optional as a user can update any fields or not update any

## updateUser resolver
```
// MORE CODE

updateUser(parent, args, { db }, info) {
    // check if user exists
    const user = db.users.find(user => {
      return user.id === args.id;
    });
  },

// MORE CODE
```

### Three ways to handle args
* Some developers don't touch args and leave it as is
    - See above code snippet
* Some developers destructure args

```
updateUser(parent, { id, data }, { db }, info) {
    // check if user exists
    const user = db.users.find(user => {
      return user.id === id;
    });
  },
```

* Leave args in place as argument and destructure it down below like this:

```
updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find(user => {
      return user.id === args.id;
    });
  },
```

* All 3 are perfectly fine - you pic your style
* **tip** Age can be null, it can be set but the user can also remove it (set it to null)

`Mutations.js`

```
// MORE CODE

updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find(user => {
      return user.id === id;
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    if (typeof data.email === "string") {
      // does email already exist?
      const emailTaken = db.users.som(use => user.email === data.email);

      // if email exists throw error
      if (emailTaken) {
        throw new Error("Sorry. That email is already taken");
      }

      // email not taken, update it
      user.email = data.email;

      if (typeof data.name === "string") {
        user.name = data.name;
      }

      if (typeof data.age !== "undefined") {
        user.age = data.age;
      }
    }

    return user;
   
  },

// MORE CODE
```

* Checking if age !== 'undefined'
* If we leave `age` off of `data` argument we will do nothing
* If we set it to `null` or a `number` the code will run and update the `age`

## Test
* Update one of our users
* **tip** lots of tabs in GraphQL Playground, later we'll get a tool that helps keep our tabs organized

```
mutation {
  updateUser(id: "1") {
    name
    email
    age
  }
}
```

* That will generate an error because the `data` argument was not provided, all the fields are optional but the `data` field is required

```
mutation {
  updateUser(id: "1", data: {
    name: "Mark",
    email: "mark1@mark.com",
    age: 22
  }) {
    name
    email
    age
  }
}
```

* Will update the user
* Play around with updating and not updating fields
* If you add an email that exists you will see duplicate email error
