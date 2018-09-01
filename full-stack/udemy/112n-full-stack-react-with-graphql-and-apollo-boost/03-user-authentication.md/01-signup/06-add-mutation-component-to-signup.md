# Add Mutation Component to Signup Component
* Wrap form inside `Mutation` component
    - Need to import it (this is from react-apollo package)

`Signup.js`

```
import React, { Component } from 'react';
import { Mutation } from 'react-apollo'; // add this line

class Signup extends Component {
    // MORE CODE

  render() {
    const { username, password, passwordConfirmation } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation>
          <form className="form">
          // MORE CODE
          </form>
        </Mutation>
      </div>
    );
  }
}

export default Signup;
```

## Add render props
* Just like we did inside our Query component we can also do this with the `Mutation` component
* We will return JSX (which will be our form element)

`Signup.js`

```
// MORE CODE

return (
  <div className="App">
    <h2 className="App">Signup</h2>
    <Mutation>
      {() => {
        return (
          <form className="form">
            // MORE CODE
          </form>
        );
      }}
    </Mutation>
  </div>
);

// MORE CODE
```

## Set which type of Mutation we want to execute
* Do this using the `mutation` prop
    - Similar to what we did in our `<Query>` component with our `query` prop

`<Query query={}>...</Query>`

`Signup.js`

```
// MORE CODE

return (
  <div className="App">
    <h2 className="App">Signup</h2>
    <Mutation mutation={SIGNUP_USER}>

    // MORE CODE
```

* Now we need to create `SIGNUP_USER` inside our `queries` folder:

`queries/index.js`

* We'll add some comments to add some struture to our file
    - We'll have two sections
        1. Genealogy Queries
        2. Genealogy Mutations

`schema.js`
* We use this file to see what we will use in our query

```
// MORE CODE

    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
```

* Grab that mutation and run it in graphiql
* This will enable us to set up how we want our mutation to run on the client
* Before when we ran this we were using static values for `username`, `email` and `password`

## Test in graphiql

`http://localhost:4444/graphiql`

## Houston we may have a problem
* If you get the graphiql error "Topology was destroyed"
* Find `node` process, kill it and rerun
* Rerun mongo and dev server

## Houston we may have another problem
* Make sure all emails are unique
* Here is a sample of what the error will look like in graphiql

```
{
  "data": {
    "signupUser": null
  },
  "errors": [
    {
      "message": "E11000 duplicate key error collection: they_came_before_me.users index: email_1 dup key: { : \"me@you.com\" }",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "signupUser"
      ]
    }
  ]
}
```

## sample graphiql with static values

```
mutation {
  signupUser(username: "joe", email: "you@me.com", password: "a12345") {
    token
  }
}
```

* Will output a token

## Using varibles
* Because it will change for everyone that signs in

### How do I provide variables to graphql?
* Easy... just like this:

```
mutation($username: String!, $email: String!, $password: String!) {
  signupUser(username: $username, email: $email, password: $password) {
    token
  }
}
```

### Now how can we run this on the backend if we don't have a place to enter any actual values for our variables?
* Use the `Query Variables` sectin in graphiql
* Click it to expand it

![using variables in graphiql](https://i.imgur.com/nddPEHm.png)

### Cool use of graphiql
* After running query and getting new token returned you can now just copy the entire definiion of the mutation you just wrote and paste it into the SIGNUP_USER variable you just declared

`queries/index.js`

```
// MORE CODE

// User Mutations
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
```


