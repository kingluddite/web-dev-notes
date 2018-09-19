# Implement Signin Mutation on client
`queries/index.js`

* Copy graphiql code you were using and paste into `index.js`

```
// MORE CODE

// User Mutations
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`

// MORE CODE
```

## Save time
* Copy all `Signup.js` code and paste into `Signin.js`

`Signin.js`

```
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';

// custom components
import Error from '../Error';

const initialState = {
  username: '',
  password: '',
};

class Signin extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    // call our signinUser function
    // it is a promise so we can use `then()`
    // within `then()` we get our return `data`
    signinUser().then(data => {
      console.log(data);
      this.clearState();
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;

    return isInvalid;
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signin</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signinUser)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                />
                <button
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signin;
```

* `Signin.js` will be very similar to `Signup.js`
* Make the logical changes (see above)

## Visit route
`http://localhost:3000/signin`

* Log in and you will see the data object returned from our **console.log()** and you'll see token if successfully logged in

## Next - Add token to localStorage




