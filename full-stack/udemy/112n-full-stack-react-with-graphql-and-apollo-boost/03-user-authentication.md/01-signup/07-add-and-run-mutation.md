# Add onSubmit to Signup form and run signup mutation on Client
* In order to execute the SIGNUP_USER function we need to pass it the necessary variables

`Signup.js`

```
// MORE CODE

<Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {({ data, loading, error }) => {

// MORE CODE
```

* We can use username, email, password because of destructuring above
* We get access to `data, loading and error` whenever using a Query or Mutation
* **note** With `Mutation` components we get access to **one additional thing** --- access to the Signup user itself (The function itself whenever we are executing a Mutation... as the first argument)
    - This gives us control of whenever we want to call the SIGNUP_USER function
    - In this case we want to call SIGNUP_USER whenever our form submits

```
// MORE CODE

<Mutation
   mutation={SIGNUP_USER}
   variables={{ username, email, password }}
>
  {(signupUser, { data, loading, error }) => {

// MORE CODE
```

`Signup.js`

```
// MORE CODE

{({ data, loading, error }) => {
            return (
              <form className="form" onSubmit={this.handleSubmit}>

// MORE CODE
```

* We will also pass down the `signupUser` function

```
// MORE CODE
{(signupUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signupUser)}
              >

// MORE CODE
```

* **note** In order to prevent `this.handleSubmit()` from being called whenever our Signup user component is loaded we need to make `handleSubmit` and arrow function

`Signup.js`

```
// MORE CODE

  event.preventDefault();
  // call our signupUser function
  // it is a promise so we can use `then()`
  // within `then()` we get our return `data`
  signupUser().then(data => {
    console.log(data);
  });
};

// MORE CODE
```

## Houston we have an error
`SIGNUP_USER` is not defined

* We need to import it

`Signup.js`

```
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

// MORE CODE
```

# Test
`http://localhost:3000/signup`

* Fill out form
* If enter duplicate email will get console error: "User already exists"
* If enter valid data will get data object in console

![sample data object](https://i.imgur.com/RXy5jY0.png)

* This has the token returned
