# Sign Out Button
* We first will create our `signout()` Mutation
    - Questions?
        + What arguments will it take? None
        + What will it return? It doesn't return anything

`backend/src/schema.graphql`

```
// MORE CODE

type Mutation {
  createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
  updateItem(id: ID!, title: String, description: String, price: Int): Item!
  deleteItem(id: ID!): Item
  signup(email: String!, password: String!, name: String!): User!
  signin(email: String!, password: String!): User!
  signout: SuccessMessage
}

// MORE CODE
```

## Custom types
* But we can return a custom `type`
* And this will be `SuccessMessage` when it will let us know whether this was successfully:
    - deleted
    - signed out
* But whatever if you just want to create a custom message for the user we can create our own type for that

`schema.graphql`

```
# import * from '/generated/prisma.graphql'

type SuccessMessage {
  message: String
}

type Mutation {

// MORE CODE
```

* Our custom `type` will have a **message** that holds a `string`
* **tip** If you every want to create your own types that are NOT a thing on your backend
    - You just want to return a specific shape of an object
    - You can do what we just did and create a custom type inside your schema and return it

## Add our signout resolver
* How can we use `clearCookie()`?
    - Because in `index.js` we use `cookieParser()` and that gives us `clearCookie()`

`backend/src/resolvers/Mutation.js`

```
// MORE CODE

  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Live long and prosper!' };
  },
};

module.exports = Mutations;
```

* We won't be showing that message to the user but it's nice to have the functionality

### Client side UI
* We need a signout button
* We need to fetch the current user (`CURRENT_USER_QUERY`) because as soon as they sign out we need to refetch the `currentUser` so we can update the UI

`components/Signout.js`

```
import React, { Component } from 'react';

// graphql
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';

class Signout extends Component {
  render() {

    return (
        <button type="button">
          Signout
        </button>
    );
  }
}

export default Signout;
```

## Add signout button to our Nav.js
`Nav.js`

```
// MORE CODE

import Signout from './Signout';

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
              <>

               // MORE CODE

                <Signout />
              </>
            )}
            {!currentUser && (
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
            )}
          </NavStyles>
        )}
      </User>

// MORE CODE
```

## Fix some styles of our button
`NavStyles.js`

```
// MORE CODE

color: ${props => props.theme.black};
font-weight: 800;

// MORE CODE 
```

#### Make our Signout button work
`Signout.js`

```
import React, { Component } from 'react';

// graphql
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_USER_MUTATION = gql`
  mutation SIGNOUT_USER_MUTATION {
    signout {
      message
    }
  }
`;

class Signout extends Component {
  render() {
    return (
      <Mutation mutation={SIGNOUT_USER_MUTATION}>
        {signout => (
          <button type="button" onClick={signout}>
            Signout
          </button>
        )}
      </Mutation>
    );
  }
}

export default Signout;
```

## Take for a test spin in the browser
* Make sure you are logged in
    - You know if you see a `token` in the Chrome Dev Tools (CDT) Applications tab (under Cookies)
* Click the Signout button
    - The `token` should disappear

## Houston we have a problem
* After we signout it does not rerender
    - We need it to rerender so we can see our navbar update after we log out

### Add `refetchQueries` prop to our Mutation
`Signout.js`

```
// MORE CODE

class Signout extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGNOUT_USER_MUTATION}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY,
          },
        ]}
      >

// MORE CODE
```

## Take it for a test spin in the browser
* Sign in
    - Navbar will change
* Click sign out
    - Navbar will change

## Refactor
* Whenever we use our code in two places we can start thinking about refactoring

`backend/src/resolvers/Mutation.js`

```
// MORE CODE

const setCookieWithToken = (ctx, token) => {
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
};

// MORE CODE

const Mutations = {

  async signup(parent, args, ctx, info) {

    // MORE CODE

    // set the jwt as a cookie on the response
    setCookieWithToken(ctx, token);
    // We did it! Now return the user to the browser!
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {

    // MORE CODE

    // 4. Set the cookie with the token
    setCookieWithToken(ctx, token);
    // 5. Return the user
    return user;
  },

// MORE CODE
```

## Take it for a test spin in the browser
* Log in and Sign out
* Register and Sign out
* Should work the same as it did before (but we made our codebase more DRY)
