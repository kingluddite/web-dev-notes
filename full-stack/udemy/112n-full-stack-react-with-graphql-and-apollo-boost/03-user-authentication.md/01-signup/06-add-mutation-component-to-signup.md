# Add Mutation Component to Signup Component

## Important
* Did you add a SECRET to your variables.env?
  - If not, do so now, just enter any long string of a value inside variables.env

variables.env
```
SECRET=asdfjassslfjsdfsjsdfdsdkjfsdasfkjsd
```

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
* We will return JSX (_which will be our `<form>` element_)

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

## But we didn't create our SIGNUP_USER yet
* Now we need to create `SIGNUP_USER` inside our `queries` folder:

`queries/index.js`

* We'll add some comments to add some struture to our file
    - We'll have two sections
        1. Genealogy Queries
        2. Genealogy Mutations

```
import { gql } from 'apollo-boost';

// Genealogy Queries

export const GET_ALL_GENEALOGIES = gql`
  query {
    getAllGenealogies {
      firstName
      lastName
      likes
      createdDate
    }
  }
`;

// Genealogy Mutations

// User Queries

// User Mutations

```

`schema.js`
* We use this file to see what we will use in our query

```
// MORE CODE

    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
```

* We need `username`, `email` and `password` and we need to return a `Token`

## Test in graphiql
* Sample graphiql with static values
* Will output a `token` after running

```
mutation {
  signupUser(username: "John", email: "john@john.com", password: "a12345") {
    token
  }
}
```

* Grab that mutation and run it in `graphiql`

`http://localhost:4444/graphiql`

* This will enable us to set up how we want our `mutation` to run on the `client`
* Before when we ran this we were using static values for `username`, `email` and `password`

## This not is if you are using Local MongoDB install 
### Houston we may have a problem (Occassional error when using local mongodb)
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

## Using variables
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
* Use the `Query Variables` section in graphiql
* Click it to expand it

![using variables in graphiql](https://i.imgur.com/nddPEHm.png)

```
{
  "username": "mike",
  "email": "mike@mike.com",
  "password": "a12345"
}
```

### Cool use of graphiql
* After **running query** and **getting new token** returned
* You can now just copy the entire definition of the mutation you just wrote and paste it into the `SIGNUP_USER` variable you just declared

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

## Next - Add and run mutation
