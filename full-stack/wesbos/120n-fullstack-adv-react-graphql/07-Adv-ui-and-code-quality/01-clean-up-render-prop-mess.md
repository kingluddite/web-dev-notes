# Clean up Render Prop Mess
##
* We will use React Adopt
    - It will compose all of our nested render props into a single composed component that will expose
        + currentUser
        + TOGGLE_CART_MUTATION
            * local data we need

`Cart.js`

```
// MORE CODE

import { adopt } from 'react-adopt';

// MORE CODE

const Composed = adopt({
  user: <User />,
  toggleCart: <Mutation mutation={TOGGLE_CART_MUTATION} />,
  localState: <Query query={LOCAL_STATE_QUERY} />,
});

const Cart = () => (

// MORE CODE
```

## Swap out
* `<User>` with `<Composed>`

```
// MORE CODE

const Cart = () => (
  <Composed>
    
    // MORE CODE

  </Composed>

// MORE CODE
```

## Now the harder part
* We'll these lines:

`Cart.js`

```
// MORE CODE

const Cart = () => (
  <Composed>
    {({ data: { currentUser } }) => {

// MORE CODE
```

* With these lines:

```
// MORE CODE

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const currentUser = user.data.currentUser;

// MORE CODE
```

## Now we remove our open an closing parts of the Mutation
`Cart.js`

* From this:

```
// MORE CODE

        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data }) => (
                <CartStyles open={data.cartOpen}>
                  <header>
                    <Supreme>
                      {currentUser.name}
                      's Cart
                    </Supreme>
                    <p>
                      You have {currentUser.cart.length} Item
                      {currentUser.cart.length === 1 ? '' : 's'}
                    </p>
                    <ul>
                      {currentUser.cart.map(cartItem => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                      ))}
                    </ul>
                    <CloseButton onClick={toggleCart} title="close">
                      &times;
                    </CloseButton>
                  </header>

                  <footer>
                    <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
                    <SickButton>Checkout</SickButton>
                  </footer>
                </CartStyles>
              )}
            </Query>
          )}
        </Mutation>

// MORE CODE
```

* We remove the Mutation and it's open and the closing Mutation and the close
* What that does is expose the `toggleCart` to us

* To this:

```
// MORE CODE

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const currentUser = user.data.currentUser;
      if (!currentUser) return null;
      return (
        <Query query={LOCAL_STATE_QUERY}>
          {({ data }) => (
            <CartStyles open={data.cartOpen}>
              <header>
                <Supreme>
                  {currentUser.name}
                  's Cart
                </Supreme>
                <p>
                  You have {currentUser.cart.length} Item
                  {currentUser.cart.length === 1 ? '' : 's'}
                </p>
                <ul>
                  {currentUser.cart.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                  ))}
                </ul>
                <CloseButton onClick={toggleCart} title="close">
                  &times;
                </CloseButton>
              </header>

              <footer>
                <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
                <SickButton>Checkout</SickButton>
              </footer>
            </CartStyles>
          )}
        </Query>
      );
    }}
  </Composed>
);

// MORE CODE
```

## Now we delete the opening and closing of Query LOCAL_STATE_QUERY
* And we need to change:

```
// MORE CODE

<CartStyles open={data.cartOpen}>

// MORE CODE
```

* To this:

```
// MORE CODE

<CartStyles open={localState.data.cartOpen}>

// MORE CODE
```

* We do that because after we remove the Query open and close we expose `localState` and now have to reference `cartOpen` through `localState`

## The final Code
`Cart.js`

```
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';

// custom styles
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

// custom components
import User from './User';
import CartItem from './CartItem';

// lib
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

// GraphQL client side
const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;

const Composed = adopt({
  user: <User />,
  toggleCart: <Mutation mutation={TOGGLE_CART_MUTATION} />,
  localState: <Query query={LOCAL_STATE_QUERY} />,
});

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const { currentUser } = user.data;
      if (!currentUser) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <Supreme>
              {currentUser.name}
              's Cart
            </Supreme>
            <p>
              You have {currentUser.cart.length} Item
              {currentUser.cart.length === 1 ? '' : 's'}
            </p>
            <ul>
              {currentUser.cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <CloseButton onClick={toggleCart} title="close">
              &times;
            </CloseButton>
          </header>

          <footer>
            <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
            <SickButton>Checkout</SickButton>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
```

## Take app for a test drive
* Should work just as it did before
* But we now have 3 warnings with:

* Warning: Failed prop type: The prop `children` is marked as required in `User`, but its value is `undefined`.`
* Warning: Failed prop type: The prop `children` is marked as required in `Mutation`, but its value is `undefined`.
* Warning: Failed prop type: The prop `children` is marked as required in `Query`, but its value is `undefined`.

* The code works fine but here is the work-a-round to get rid of the warnings

`Cart.js`

```
// MORE CODE

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});

// MORE CODE
```

## Now we are getting eslint errors
* For this we can turn eslint off and back on for a chunk of code
* This is helpful if you know the warnings are not harmful and just annoying

`Cart.js`

```
// MORE CODE

/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable */

// MORE CODE
```

* Now the eslint warnings should disappear

### Our code is cleaner and easier to read
* The payload allows us to destructure those 3 render components into a single render prop component
* Easier to read
* Injected all at the top level
* You will use this all over your projects
 
