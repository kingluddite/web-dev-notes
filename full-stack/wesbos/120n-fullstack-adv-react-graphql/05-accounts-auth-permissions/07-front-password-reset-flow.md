# Frontend Password Reset Flow
* We will build the form for the actual reset
* Save Signin as `RequestReset.js`

## Remove
* `import { CURRENT_USER_QUERY } from './User';`
* Change Mutation name from `SIGNIN_USER_MUTATION` to `REQUEST_RESET_MUTATION`
    - Many times I don't know what to put in what is returned from when I define the client side Mutation or Query and the answer to this is just to look at the schema definition and we can see it needs to return a `SuccessMessage` so we can just return a `message`

```
// MORE CODE

requestReset(email: String!): SuccessMessage

// MORE CODE
```

`RequestReset.js`

```
// MORE CODE

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;
  
// MORE CODE
```

* Update the Mutation attribute to `mutation={REQUEST_RESET_MUTATION}`
* Remove `refetchQueries={.....}`
* Our `state` only needs and `email` address
* We only pass `email` to our REQUEST_RESET_MUTATION
    - Make sure all code only references `email` and delete others
    - Make sure we only have the email text field and button that says 'Reset Password'
* Rename the function from `Signin` to `requestReset`
* Rename the class and default export to `RequestReset`
* Make `h2` say `Request Password Reset`
* After making all those changes it should look like this:

`RequestReset.js`

```
import React, { Component } from 'react';
// GraphQL
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// styles
import Form from './styles/Form';

// custom components
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const initialState = {
  email: '',
};

class RequestReset extends Component {
  state = {
    ...initialState,
  };

  clearForm = () => {
    this.setState({
      ...initialState,
    });
  };

  saveToState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event, requestReset) => {
    event.preventDefault();
    const res = await requestReset();
    this.clearForm();
  };

  render() {
    const { email } = this.state;

    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={{ email }}>
        {(requestReset, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          // console.log(data);

          return (
            <Form method="post" onSubmit={event => this.handleSubmit(event, requestReset)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request Password Reset</h2>
                <Error error={error} />
                <label htmlFor="email">
                  email
                  <input type="email" name="email" placeholder="email" value={email} onChange={this.saveToState} />
                </label>
                <button type="submit">Reset Password</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default RequestReset;
```

* Import that into `Signup.js`

`signup.js`

```
// MORE CODE

import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';

// MORE CODE

const SignupPage = props => (
  <Columns>
    <Signup />
    <Signin />
    <RequestReset />
  </Columns>
);

export default SignupPage;
```

### How do we know if the password request has been called or not?
* We could capture the success message that comes back from here:

`RequestReset.js`

```
// MORE CODE

handleSubmit = async (event, requestReset) => {
  event.preventDefault();
  const res = await requestReset();
  this.clearForm();
};

// MORE CODE
```

* Here's one way we could do this
* But we have to rework our clearForm to make this work
* Notice how we grab the success message `successMessage.data.requestReset.message`

`RequestReset.js`

```
// MORE CODE

const initialState = {
  email: '',
  success: '',
};

class RequestReset extends Component {
  state = {
    ...initialState,
  };

  clearForm = () => {
    this.setState({
      ...initialState,
    });
  };

  handleSubmit = async (event, requestReset) => {
    event.preventDefault();
    const successMessage = await requestReset();
    // console.log(successMessage.data.requestReset.message);
    this.setState({
      success: successMessage.data.requestReset.message,
    });
    // this.clearForm();
  };

  render() {
    const { email, success } = this.state;

    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={{ email }}>
        {(requestReset, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          // console.log(data);

          return (
            <Form method="post" onSubmit={event => this.handleSubmit(event, requestReset)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request Password Reset</h2>
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <Error error={error} />
                <label htmlFor="email">
                  email
                  <input type="email" name="email" placeholder="email" value={email} onChange={this.saveToState} />
                </label>
                <button type="submit">Reset Password</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default RequestReset;
```

* After submitting RequestPassword we get this UI notification

![success UI notification](https://i.imgur.com/Zvurfsf.png)

## An alternative way using `called` property of Apollo's Mutation
* Called will be `boolean` whether this mutation has been called yet
* We need to make sure our data is not `loading`, doesn't have an `error` and `called` is **true** and if it is, output a success message

`RequestReset.js`

```
// MORE CODE

<Form method="post" onSubmit={event => this.handleSubmit(event, requestReset)}>
  <fieldset disabled={loading} aria-busy={loading}>
    <h2>Request Password Reset</h2>
    <Error error={error} />
    {!loading && !error && called && <p>Success! Check your email for a reset link</p>}

// MORE CODE
```

* Test it out in the browser
* Look in the terminal (server) and you will see the user object is returned with all the info we have inside `res`

`Mutation.js`

```
// MORE CODE

async requestReset(parent, args, ctx, info) {

  // MORE CODE

  console.log(res);
  return { message: 'Thanks!' };
  // 3. TODO Email them that reset token
},

// MORE CODE
```

* **Important Security Tip** - In Production you never want to console.log any of this token information, because the resetToken is super secret information (treat it as important as a password) and if in the wrong hands can help a malicious user have access to your account
    - It should never be in server logs so remove all console.logs in production
* I think you will agree that this is a much easier and cleaner solution

## Now we need to hit the reset page
* Save `sell.js` as `reset.js`

```
import React, { Component } from 'react';

class ResetPage extends Component {
  render() {
    return (
      <div>
        <p>Reset Your Password</p>
      </div>
    );
  }
}

export default ResetPage;
```

* Visit `http://localhost:7777/reset` and you'll see our reset page

### resetToken from prisma
* Grab a reset token from Prisma and append to URL similar to:

`http://localhost:7777/reset?resetToken=8f7fb4922d99518cb93bc2a92ef846ed74c2f218`

* Update code so we can see `resetToken` on page

`reset.js`

```
import React, { Component } from 'react';

class ResetPage extends Component {
  render() {
    return (
      <div>
        <p>Reset Your Password {this.props.query.resetToken}</p>
      </div>
    );
  }
}

export default ResetPage;
```

## Make a Request component
`/components/ResetPassword.js`

* Save `RequestReset.js` as `ResetPassword.js`
    - And make all the following changes:

`ResetPassword.js`
```
import React, { Component } from 'react';
// GraphQL
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// styles
import Form from './styles/Form';

// custom components
import Error from './ErrorMessage';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

const initialState = {
  password: '',
  confirmPassword: '',
};

class ResetPassword extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };

  state = {
    ...initialState,
  };

  clearForm = () => {
    this.setState({
      ...initialState,
    });
  };

  saveToState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event, resetPassword) => {
    event.preventDefault();
    const res = await resetPassword();
    this.clearForm();
  };

  render() {
    const { resetToken } = this.props;
    const { password, confirmPassword } = this.state;

    return (
      <Mutation mutation={RESET_PASSWORD_MUTATION} variables={{ resetToken, password, confirmPassword }}>
        {(resetPassword, { data, loading, error, called }) => {
          if (loading) return <div>Loading...</div>;
          // console.log(data);

          return (
            <Form method="post" onSubmit={event => this.handleSubmit(event, resetPassword)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>
                <Error error={error} />
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Reset Password</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default ResetPassword;
```

* Why do we confirm password on server?
    - Usually it is just done on client
    - We are building an API and regardless of where this API is being used we want to always make sure the user confirms the password and we check it on the server
        + You could do it on the client side but if you ever were to have a reset mutation anywhere else in the application you would also have to do that client side check there
 
**tip** It is worth renaming this component to `ResetPage`
* It doesn't matter since it's the default export
* But it will give you better debugging should there be any errors

`reset.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// custom components
import ResetPassword from '../components/ResetPassword';

class ResetPage extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
  };

  render() {
    const { query } = this.props;
    return (
      <div>
        <ResetPassword resetToken={query.resetToken} />
      </div>
    );
  }
}

export default ResetPage;
```

## Take it for a test drive in your browser
* After enter and confirming password if you received 'invalid password or expired' error message grab a new token by signing in again
* Then log into Prisma and grab new token
    - Or you could grab it from the log we left in the server
    - Go to `http://localhost:7777/reset?resetToken=c5286ffca1d9a8d4ecbb4296d8b02a43d4022d5b` and reset your password again
* It should work
    - But we have no we in our UI of knowing it worked
    - We didn't provide any success message but what should happen if it worked correctly it should log us in
    - If you signout and signin you will see we are signin (that is what we want to happen)

### How do we do that?
* We use a refetchQuery in our Mutation
* Just like we did before we want to refetch the current user

`ResetPassword.js`

```
// MORE CODE

// graphql
import { CURRENT_USER_QUERY } from './User';

// MORE CODE

class ResetPassword extends Component {
  // MORE CODE

  render() {
    // MORE CODE

    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{ resetToken, password, confirmPassword }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
      // MORE CODE
```

* In our User.js component we have this:

`User.js`

```
// MORE CODE

 const CURRENT_USER_QUERY = gql`
   query CURRENT_USER_QUERY {
     currentUser {
       id
       email
       name
       permissions
     }
   }
 `;

// MORE CODE
```

* We need to refetch the `currentUser` query so that currently logged in person has changed then apollo will automatically go back to the server and refetch who is currently signed in
* And we need to do this just after we reset our password
* That is why in `ResetPassword.js` we
    - Import `User.js` to access the `CURRENT_USER_QUERY` **named export**
    - Look at the bottom of `User.js` to see how we can access this
* We user the `refetchQueries` Mutation prop that gives us access to an array of queries (because we can refetch multiple queries) this is where we tell it to refetch the `CURRENT_USER_QUERY`
    - Now when this Mutation has successfully been called are there other queries that should be refetched and refreshed of their data

## Test drive it in the browser one more time
* Make sure you are initially logged out for this test
* On the signup page reset your password
* Copy to the clipboard the `resetToken` from the log value inside our server terminal
* Go to reset page and paste in your resetToken at the end of the URL `http://localhost:7777/reset?resetToken=117735e55b5be7dc3af313fd49ec73ff7d115eaf`

### What you should see
* The navbar updates to show you are now instantly logged in!
    - You could also route to the home page as a bonus UI improvment
    - A success message could also be shown to the user for the full service UI experience
    - **Homework** Try to implement both those UI improvements
* This is a great UI experience
* The user has the proper token so why not just log them in automatically?

### One missing piece
* I have to go into Prisma db or grab it from terminal log to get `resetToken`

## Next - Email the token to the user
* Improve the UI
* This will confirm that if they are resetting password than we know that the user has access to that email address otherwise they should not be allowed to update the password
