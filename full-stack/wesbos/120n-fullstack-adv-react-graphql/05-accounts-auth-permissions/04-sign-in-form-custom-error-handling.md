# Sign in Form and Custom Error Handling
* This will have a similar cadence to what we did with Signup

1. Add it to the schema
2. Add it to the resolver (Query or Mutation)
3. Test in Playground
4. Flip to the frontend
5. Build UI for it
6. Manage it from there

`schema.graphql`

* It will be a Mutation

```
// MORE CODE

  signup(email: String!, password: String!, name: String!): User!
  signin(email: String!, password: String!): User!
}

type Query {

// MORE CODE
```

* Move to our resolver

`Mutations.js`

```
async signin(parent, args, ctx, info) {
  
}
```

* That is the we have started up to this point but there is a way we can reduce our typing

### destructuring args
```
async signin(parent, {email, password }, ctx, info) {
  
}
```

* Map out what we need to to

```
// MORE CODE

async signin(parent, {email, password}, ctx, info) {
  // 1. Check if there is an email with that user
  // 2. Check if there password is correct
  // 3. Generate the JWT token
  // 4. Set the cookie with the token
  // 5. Return the user
}

// MORE CODE
```

* Check if there is a user

```
async signin(parent, {email, password}, ctx, info) {
  // 1. Check if there is an email with that user
  const user = await ctx.db.query.user({ where: { email } });
  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }
  // 2. Check if there password is correct
  // 3. Generate the JWT token
  // 4. Set the cookie with the token
  // 5. Return the user
}
```

* Some people think telling people no email exists is bad for security
* It is up for debate but I don't think it is an issue

### Check if password is valid
```
// 2. Check if there password is correct
const valid = await bcrypt.compare(password, user.password)
```

* `bcrypt.compare()` returns a promise so we can `await` it
* `compare()` will take the password used to login with the hashed password and it is able to compare the two to deterime if they are the same

#### If it isn't valid
```
// 2. Check if there password is correct
const valid = await bcrypt.compare(password, user.password)
if (!valid) {
  throw new Error('Invalid Password!');
}
```

* If it is valid we can keep going and generate a new token
* We can recycle a previous line and paste it in here

```
// 3. Generate the JWT token
const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
```

* Now set the cookie and return the user

```
// MORE CODE

  async signin(parent, { email, password }, ctx, info) {
    // 1. Check if there is an email with that user
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if there password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. Generate the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    // 5. Return the user
    return user;
  },
};

module.exports = Mutations;
```

* I created `setCookieWithToken()` and passed it `ctx` and `token`
* I did this because we have duplicate code so I just put the code in a function at the top of the file

`Mutation.js`

* TODO - function broken FIX

```
// MORE CODE

const setCookieWithToken = (ctx, token) => {
  [ctx].response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
};

const Mutations = {

// MORE CODE
```

* And I refactored the other part of code that was using this code and just call the function and pass the `ctx` and `token`

`Mutation.js`

```
// MORE CODE

async signup(parent, args, ctx, info) {

 // MORE CODE

  // setCookieWithToken(ctx, token);
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });

  // We did it! Now return the user to the browser!
  return user;
},

async signin(parent, { email, password }, ctx, info) {

// MORE CODE
```

* That is the whole signin flow

### Signin recap
1. Check if someone is there
2. Check if there password is correct
3. If it is... Generate a JWT
4. Stick it in a cookie
5. Return the user from that `res`

## Switch to the UI in the frontend
* Now we need to create a signin form
* To make life easy we'll duplicate `signup.js` and name the duplicate `signin.js`
* Go through the `signin.js` and rename all `signup` to `signin`

`Signin.js`

```
import React, { Component } from 'react';
// GraphQL
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// styles
import Form from './styles/Form';

// custom components
import Error from './ErrorMessage';

const SIGNIN_USER_MUTATION = gql`
  mutation SIGNIN_USER_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const initialState = {
  email: '',
  password: '',
};

class Signin extends Component {
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

  handleSubmit = async (event, signin) => {
    event.preventDefault();
    const res = await signin();
    this.clearForm();
  };

  render() {
    const { email, password } = this.state;

    return (
      <Mutation mutation={SIGNIN_USER_MUTATION} variables={{ email, password }}>
        {(signin, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          // if (error) return <div>Error {error.message}</div>;
          // console.log(data);

          return (
            <Form method="post" onSubmit={event => this.handleSubmit(event, signin)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In</h2>
                <Error error={error} />
                <label htmlFor="email">
                  email
                  <input type="email" name="email" placeholder="email" value={email} onChange={this.saveToState} />
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
                <button type="submit">Sign In</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
```

* Import and use the Signin component

`signup.js`

```
import styled from 'styled-components';

// custom components
import Signup from '../components/Signup';
import Signin from '../components/Signin';

// styles
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <Columns>
    <Signup />
    <Signin />
  </Columns>
);

export default SignupPage;
```

* Now you can register and sign in
* Check the Google Console > Application > Cookies > http://localhost:7777
* You will see a token added

## Great Custom Error handling
* Enter a duplicate email and look at the UX friendly error
* Enter no email and look at UX friendly error
* Enter a wrong password and look at UX friendly error

## We have an issue because we are using React
* We don't have a page refresh when we submit the form
* So we are not sending a request to the server
* But we need to do the currentUser query a couple more times
* This is where the Mutation `refetchQueries` comes in handy

## refetchQueries
* We need to ask Apollo to refetch our `CURRENT_USER_QUERY`

`User.js`

```
// GraphQL
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
```

* Once we refetch it will rerender the parts to show if we are signed in or signed out

### Named exports are useful
* This is why we exported CURRENT_USER_QUERY here:

`User.js`

```
// MORE CODE

export default User;
export { CURRENT_USER_QUERY };
```

* Because we did a named export we can import it into `Signin` like this:

`Signin.js`

```
// MORE CODE

return (
  <Mutation
    mutation={SIGNIN_USER_MUTATION}
    variables={{ email, password }}
    refetchQueries={[
      {
        query: CURRENT_USER_QUERY,
      },
    ]}
  >
    {(signin, { data, loading, error }) => {

// MORE CODE
```

* We use the Mutation `refetchQuery` prop and pass it an array with just one object
* And we set the key to be `query` and the value to be the Query we imported
* We could also pass variables if there were any (there are not for this Query)

## What does refetchQueries do?
* When the Mutation is successfully finished it will go into the Apollo store, and refetch this query so that the part of our app using `User.js` will update itself (logged in and show username or logged out and show nothing)

### Take this for a test drive
* First are you currently logged in?
    - How can you tell?
        + Do you see a user name in the navbar area of your app?
        + If you do you will see in the Chrome Dev Tools > Application > Cookies a cookie with a token and our JWT
        + Delete that token
        + The problem before we used `refetchQueries` is after we logged in we had to refresh the browser to see our username in the navbar
        + But now log in and instantly, without a page refresh, we see the username in the navbar
        + **note** If we remove the token manually by deleting it, the `refetchQueries` does not get called so the username remains until we refresh the browser

## Update Signup.js with the same `refetchQueries.js`

`Signup.js`

```
// MORE CODE

import { CURRENT_USER_QUERY } from './User';

// MORE CODE

class Signup extends Component {

  // MORE CODE

  render() {
    const { email, name, password } = this.state;

    return (
      <Mutation
        mutation={SIGNUP_USER_MUTATION}
        variables={{ email, name, password }}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY,
          },
        ]}
      >

// MORE CODE
```

## We need to organize our navbar
* Show stuff if we are not logged in
* Show different stuff if we are logged in
* We will nest our links inside our User's render props so we can check for currentUser and show items if logged in and don't show if not logged in

`Nav.js`

```
import React, { Component, Fragment } from 'react';
import Link from 'next/link';

// styles
import NavStyles from './styles/NavStyles';

// custom components
import User from './User';

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data: { currentUser } }) => (
          <NavStyles>
            <Link href="/items">
              <a>Shop</a>
            </Link>
            {currentUser && (
              <Fragment>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
                <Link href="/me">
                  <a>Account</a>
                </Link>
              </Fragment>
            )}
            {!currentUser && (
             <Link href="/signup">
               <a>Sign In</a>
             </Link>
           )}
          </NavStyles>
        )}
      </User>
    );
  }
}

export default Nav;
```

* But there is a new way to do it in React and that is React Fragments
* But now with NextJS because it is using babel7 you can use this:
* And you don't need the Fragment import anymore

`Nav.js` 
```
// MORE CODE

{currentUser && (
  <>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>
  </>
)}

// MORE CODE
```

## Test it out
* Log in
* See the token in the chrome console
* Notice how the navbar updates with different items (private site - Sign In is gone)
* Remove token manually
* Refresh and see how navbar updates with different items (public site - Sign In is back)

## Next - Sign Out button
### Homework - Try it yourself
* Create Signout button
    - Adding to schema
    - Writing a Mutation that deletes that cookie
    - Writing a button in the nav that will trigger that Mutation
