# Apollo Local State Queries and Mutations
## What is local state?
* Date that might not live in the database
* But it is data that needs to live in the browser for whatever reason
* Generally for local data in the browser you use `state` but it can be cumbersome to move `state` around and ripple it through your app
    - Alternatives to having to do this is using React Redux and with that you could have a store at the top level of your app and you can inject those pieces of data anywhere you want
    - You could use React Context (new to React in 2017)
        + [Wes Bos Video on React Context](https://www.youtube.com/watch?v=XLJN4JfniH4)
    - But when you are using Apollo to store all of your GraphQL data it makes sense to also use Apollo and GraphQL to also store your local data and this gives you the advantage to write queries and mutations the same way you would for your server side against your client side data (We will do this now)

## Getting back to our ApolloClient
* We need to find where we coded our client side apollo client
* And that is inside our `withData.js`

`withData.js`

```
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
```

* This is where we created our `ApolloClient` and `Apollo store`
    - Inside of ApolloClient we will tell it to store our local data
    - We'll add this below our `request`
    - We will call it `clientState` and that will hold our local data
        + It need to have a resolvers property that will hold an object
        + It also needs some defaults
            * We do this also with React state (When the component loads you give it an empty state or a default state)
            * We will have a `cartOpen` value we will be toggling and we will intially set it to `true`

## Jump back to our Cart
* We'll import the Query and Mutation Components from react-apollo
* And we'll import `gql` from **graphql-tag**

`Cart.js`

```
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// custom styles
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

// MORE CODE
```

## Adding LOCAL_STATE_QUERY
`Cart.js`

```
// MORE CODE

import SickButton from './styles/SickButton';

// GraphQL client side
const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;

const Cart = () => (
  <Query query={LOCAL_STATE_QUERY}>
    {({ data }) =>
      console.log(data) || (
        <CartStyles open>
          <header>
            <Supreme>Your Cart</Supreme>
            <CloseButton title="close">&times;</CloseButton>
          </header>

          <footer>
            <p>$10.10</p>
            <SickButton>Checkout</SickButton>
          </footer>
        </CartStyles>
      )
    }
  </Query>
);

export default Cart;
```

* We could use the query in many places in our app as a way to grab local state
* And you could also have many different queries to describe different pieces of state
* `@client` is code we use to tell GraphQL to not go to the server for this information because it is client side data (so just grab it directly from the Apollo Store and don't worry about anything going off to the server)
* We use Query just like we would for our server components
* We get back `data` from this Query (just like server side's data is stored in a `data` object)
* We surround our Cart with `Query`


## Take it for a spin in the browser
* Home page view console
* Expand and you will see:

```
{ cartOpen: true }
```

* When page loads, the Cart load and the query triggers and local state and we see our data cartOpen
* Now we can set our open equal to `data.cartOpen`
* We can remove our log
* And if we manually change our clientDate `cartOpen` to **false** we will not see our Cart on page load

`Cart.js`

```
// MORE CODE

const Cart = () => (
  <Query query={LOCAL_STATE_QUERY}>
    {({ data }) => (
      <CartStyles open={data.cartOpen}>

// MORE CODE
```

* And set the default value to `false`

`withData.js`

```
    // local data
    clientState: {
      resolvers: {},
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
```

* Now the Cart doesn't show
* We have to do a manual refresh to see this
* Change `cartOpen` to true, manual refresh and you will see the cart again

## Toggle a Mutation for our Cart
* This will toggle our Cart open and closed
* Our code will get crazy because we are wrapping a Query inside a Mutation

### Tip for writing Queries and Mutations
* Start like this:

```
// MORE CODE

const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>{() => ()}</Mutation>
  <Query query={LOCAL_STATE_QUERY}>

// MORE CODE
```

* It gives us one function (we just wrote it)

```
// MORE CODE

const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>{(toggleCart) => ()}</Mutation>
  <Query query={LOCAL_STATE_QUERY}>

// MORE CODE
```

## Does the order of Mutation or Query matter?
* No, you can do them in either order

### Now wrap the Mutation around the query
* Make sure to get the closing parenthese, curly brace and `</Mutatation>`

```
const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {toggleCart => (
      <Query query={LOCAL_STATE_QUERY}>
        {({ data }) => (
          <CartStyles open={data.cartOpen}>
            <header>
              <Supreme>Your Cart</Supreme>
              <CloseButton title="close">&times;</CloseButton>
            </header>

            <footer>
              <p>$10.10</p>
              <SickButton>Checkout</SickButton>
            </footer>
          </CartStyles>
        )}
      </Query>
    )}
  </Mutation>
);

export default Cart;
```

### Add our `toggleCart` function to our `<CloseButton>` onClick event
`Cart.js`

```
// MORE CODE

<CloseButton onClick={toggleCart} title="close">
  &times;
</CloseButton>

// MORE CODE
```

* We haven't writter our resolver (and that is what happens when this function gets called) but if we click it we should get an error in the console
* I click the X in the cart and I see this warning in the console:

`Missing field toggleCart in {}`


* `_` - Placeholder, not sure what it is for, can be anything
* `variables` - Not using any here but can use them if you do have variables
* `client` - We don't need the entire `client` and we'll just destructure the `cashe` ..... `{ cache }`
    - We will pull the cart value from the cache, read it, setting it back into the cache with the opposite value (true -> false or false -> true)
    - You can't just read to the cache with this `cache.cartOpen` as that is not possible, what you have to do is do an entire GraphQL query and then read from that (a bit of a pain but that's just the way it works)
        + But we will just export both the Query and Mutation in Cart.js so we can use them elsewhere

`Cart.js`

```
// MORE CODE

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
```

* We want to open the cart from anywhere in our app so exporting them here will come in handy down the road

## Write the toggleCart resolver


`withData.js`

```
// MORE CODE

import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

// config
import { endpoint } from '../config';

// client side GraphQL
import { LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {

    // MORE CODE

    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            console.log(cartOpen);
          },
        },
      },
      defaults: {
        cartOpen: true,
      },
    },
  });
}

export default withApollo(createClient);
```

## Take it for a test drive
* You will need to refresh the page and will have to every time because whenever we are editing the ApolloClient it doesn't have hot reloading enabled for you
* You should see when you click the close button `true` appears in console

## Now we will write the cart state to the opposite
`withData.js`

* Refresh browser and try again (after adding the following changes to your code)

```
// MORE CODE

    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // console.log(cartOpen);
            // Write the cart State to the opposite
            const data = {
              data: { cartOpen: !cartOpen },
            };
          },
        },
      },

// MORE CODE
```

* Refresh and that won't work because we now need to write the `data` back to the `cache`
* Test it out - still won't work until we **return** the data

```
// MORE CODE

    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // console.log(cartOpen);
            // Write the cart State to the opposite
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);
            return data; // add this line
          },
        },
      },

// MORE CODE
```

* Take it for a test drive
* Remember to refresh the browser first
* It will work and hide the cart but then you have no way of clicking to see the cart again
* We will add a cart button in our navbar so we can open it at any time

## Cart open animation
* We exported TOGGLE_CART_MUTATION from `withData.js`
* We want to add a Cart button inside our Nav.js
    - So we need to import `Mutation` and `TOGGLE_CART_MUTATION` from that file

`Nav.js`

```
import React, { Component, Fragment } from 'react';
import Link from 'next/link';

// GraphQL
import { Mutation } from 'react-apollo';
// local GraphQL
import { TOGGLE_CART_MUTATION } from './Cart';

// MORE CODE
```

## Surround button with Mutation
* Make sure to pass mutation prop the value of that TOGGLE_CART_MUTATION
* Pass the function as an argument to the render prop
* Add an onClick to call the function

`Cart.js`

```
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => (
        <button type="button" onClick={toggleCart}>
          Cart
        </button>
      )}
    </Mutation>

// MORE CODE
```

* Take it for a test drive
* You will see a Cart button in the navbar
* Click it and the Cart slides open
* Click the Close button and the cart slides closed
    - This is great because you can now add that toggleCart functionality anywhere in our app without having to pass it from one component down to a child component, and we can do it without Redux and React Context and this is the power that ApolloClient gives us!

## Next - Server Side Cart Stuff
* We need to set up our schema to be able to handle our cart stuff

## More Resources
* [Wes Bos talks about React Context](https://www.youtube.com/watch?v=XLJN4JfniH4)
