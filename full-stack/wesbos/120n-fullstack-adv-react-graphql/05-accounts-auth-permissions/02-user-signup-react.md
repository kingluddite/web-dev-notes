# User Signup in React
`frontend/components/Signup.js`

```
import React, { Component } from 'react';

// GraphQL
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// styles
import Form from './styles/Form';

// custom components
import Error from './ErrorMessage';

class Signup extends Component {
  render() {
    return (
      <Form>
        <fieldset>
          <h2>Sign Up for An Account</h2>
        </fieldset>
      </Form>
    );
  }
}

export default Signup;
```

* `signup.js`

```
import styled from 'styled-components';

// custom components
import Signup from '../components/Signup';

// styles
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <Columns>
    <Signup />
    <Signup />
    <Signup />
  </Columns>
);

export default SignupPage;
```

* Make sure your client server is running (webpack from nextJS)
  - `$ cd frontend && npm run dev`

* View in browser `http://localhost:7777/`
    - We have 3 columns

## Add our forms, state and submit button

`Signup.js`

```
// MORE CODE

class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: '',
  };

  render() {

    const { email, name, password } = this.state;

    return (
      <Form>
        <fieldset>
          <h2>Sign Up for An Account</h2>
          <label htmlFor="email">
            email
            <input type="email" name="email" placeholder="email" value={email} onChange={this.saveToState} />
          </label>
          <label htmlFor="name">
            name
            <input type="text" name="name" placeholder="name" value={name} onChange={this.saveToState} />
          </label>
          <label htmlFor="password">
            password
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={this.saveToState}
            />
          </label>
          <button type="submit">Sign Up</button>
        </fieldset>
      </Form>
    );
  }
}

// MORE CODE
```

* If you try and type in form fields it won't work
* We have the value getting pulled from `state` so we need a method that will setState based on what the user types in the form field

```
// MORE CODE

saveToState = event => {
  this.setState({ [event.target.name]: event.target.value });
};

render() {
  const { email, name, password } = this.state;

// MORE CODE
```

### Test it in browser
* You can type in form fields
* React Dev Tools
  - Search For Signup (you will see 3)
  - Update them one and all and see how they all update the `state`

## Mutation 
* We need to write Query to handle the Mutation
* And wrap the entire form inside the Mutation

`Signup.js`

```
import React, { Component } from 'react';
// GraphQL
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// styles
import Form from './styles/Form';

// custom components
import Error from './ErrorMessage';

const SIGNUP_USER_MUTATION = gql`
  mutation SIGNUP_USER_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      name
      email
      password
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: '',
  };

  saveToState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, name, password } = this.state;

    return (
      <Mutation mutation={SIGNUP_USER_MUTATION} variables={{ email, name, password }}>
        {(signup, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          console.log(data);

          return (
            <Form>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign Up for An Account</h2>
                <Error error={error} />
                <label htmlFor="email">
                  email
                  <input type="email" name="email" placeholder="email" value={email} onChange={this.saveToState} />
                </label>
                <label htmlFor="name">
                  name
                  <input type="text" name="name" placeholder="name" value={name} onChange={this.saveToState} />
                </label>
                <label htmlFor="password">
                  password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Sign Up</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
```

## Warning --- Add Post
* Forms if you don't specify a method will default to `get`
* We need to change this to `post` otherwise our password could get passed into the query string if our javascript breaks
* Fill out the form and submit and you will see something like:

`http://localhost:7777/signup?email=joe%40joe.com&name=joe&password=iknowyourpassword`

* Do you see the password is in the URL? We can't let that happen
* That could go in a server log, in the history... not good
* So we'll use `post` as our form method
  - Another solution is not to use `form` tags and just use `input`

`Signup.js`

```
// MORE CODE

return (
  <Form method="post">

// MORE CODE
```

## Add on `onSubmit` and `handleSubmit`

`Signup.js`

```
// MORE CODE

handleSubmit = (event, signup) => {
  event.preventDefault();
  signup();
};

render() {
  const { email, name, password } = this.state;

  return (
    <Mutation mutation={SIGNUP_USER_MUTATION} variables={{ email, name, password }}>
      {(signup, { data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error {error.message}</div>;
        console.log(data);

        return (
          <Form method="post" onSubmit={event => this.handleSubmit(event, signup)}>

// MORE CODE
```

## Take the form for a test drive in the browser
* Fill it out
* You don't know if anything worked
* Check Prisma and you'll see you now have a new user in your db

### Clear the form
* Right now the form still has what we put inside it when we hit submit
* We can clear the form which would be a better UX
* But we first need to capture the result and then clear it

#### Let's log the result first
`Signup.js`

```
// MORE CODE

handleSubmit = async (event, signup) => {
  event.preventDefault();
  const res = await signup();
  console.log(res);
};

render() {

// MORE CODE
```

* Fill the form out and you will see the `res` has `email`, `name` and `pwd` in it
  - We don't want `pwd` coming back but rather `id` so make this change to our mutation

`Signup.js`

```
// MORE CODE

const SIGNUP_USER_MUTATION = gql`
  mutation SIGNUP_USER_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`;

// MORE CODE
```

* Now we need to clear or form

`Signup.js`

```
// MORE CODE

const initialState = {
  email: '',
  name: '',
  password: '',
};

class Signup extends Component {
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

  handleSubmit = async (event, signup) => {
    event.preventDefault();
    const res = await signup();
    this.clearForm();
  };

  render() {

// MORE CODE
```

## Kick the tires
* In the browser fill it out and submit
* Watch how the form clears

## Dupes and error
* Enter a duplicate email and watch the error appear
* You can change the error wording to make it a better UX

## Houston we have a problem
* After we get an error our form disappears (fix this as the form should not disappear)

`Signup.js`

```
// MORE CODE

<Mutation mutation={SIGNUP_USER_MUTATION} variables={{ email, name, password }}>
  {(signup, { data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error {error.message}</div>;
    console.log(data);

    return (
      <Form method="post" onSubmit={event => this.handleSubmit(event, signup)}>
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Sign Up for An Account</h2>
          <Error error={error} />

// MORE CODE
```

* The reason is our Apollo error was just returning a `div` and our form never rendered after the error showed
* But with our custom error we can show the error and our form stays on the page

`Signup.js`

```
// MORE CODE

handleSubmit = async (event, signup) => {
  event.preventDefault();
  const res = await signup();
  this.clearForm();
};

// MORE CODE
```

* Because `signup()` did not resolve Properly
  - It is a **Promise** so it sent a reject instead of resolve
  - So we never get to the `console.log()` or the clear the form function
  - You could remove the `res` unless you want to add a custom success message to the user
    + TODO - Add custom success message to the user

## Next - As soon as user is created - they will instantly have `logged in` status in UI
