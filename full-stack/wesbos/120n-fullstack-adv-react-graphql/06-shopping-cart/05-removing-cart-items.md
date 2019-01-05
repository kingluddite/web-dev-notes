# Removing Cart Items
* We will have a button that when clicked will remove a CartItem
* We'll add the function to our schema, it will take in an `id` as an argument and it will return a CartItem
    - It is important to remove the CartItem and we'll see why in a bit

`schema.graphql`

```
// MORE CODE

  addToCart(id: ID!): CartItem
  removeFromCart(id: ID!): CartItem
}

// MORE CODE
```

## Add our resolver that matches that schema
`Mutation.js`

```
// MORE CODE

  async removeFromCart(parent, args, ctx, info) {
    // 1. Find the cart item
    // 2. Make sure they own that cart item
    // 3. Delete that cart item
  },
};

module.exports = Mutations;
```

### Find the cart
```
// MORE CODE

  async removeFromCart(parent, args, ctx, info) {
    // 1. Find the cart item
    const cartItem = await ctx.db.query.cartItem({
      where: {
        id: args.id,
      },
    }, `{ id, user { id }}`);
    // 1.5 Make sure we found an item
    // 2. Make sure they own that cart item
    // 3. Delete that cart item
  },

// MORE CODE
```

* We don't use `info` here and instead use a manual search because instead of just passing the cartItem we need to know who owns the cartItem
    - So we need the `id` of the **item** and the `id` of the **user**

### Make sure a cartItem was found
`Mutation.js`

```
// MORE CODE

// 1.5 Make sure we found an item
 12     prisma.yml             |2269     if(!cartItem) throw new Error('No CartItem Found!');
// MORE CODE
```

### Make sure they own that cartItem
`Mutation.js`

* We don't need to check that the user is logged in
    - Because you'll always have a request and if there is not `userId` on the request then it will still throw the `You don't own that item` error

```
// MORE CODE

/ 2. Make sure they own that cart item
f(cartItem.user.id !== ctx.request.use
 throw new Error('You do not own that 


// MORE CODE
```

### deleteCartItem
* Through the wonders of prisma, there will be a function we can use in the generated file

`generated/prisma.graphql`

```
// MORE CODE

  deleteCartItem(where: CartItemWhereUniqueInput!): CartItem

// MORE CODE
```

* And here is the code to delete a cartItem

`Mutation.js`

```
// MORE CODE

    // 3. Delete that cart item
    return ctx.db.mutation.deleteCartItem({
      where: { id: args.id }
    }, info);

// MORE CODE
```

* We pass the info, which is the query that is coming in from the client side

### Here is the complete removeFromCart resolver
`Mutations.js`

```
// MORE CODE

  async removeFromCart(parent, args, ctx, info) {
    // 1. Find the cart item
    const cartItem = await ctx.db.query.cartItem({
      where: {
        id: args.id,
      },
    }, `{ id, user { id }}`);
    // 1.5 Make sure we found an item
    if(!cartItem) throw new Error('No CartItem Found!');
    // 2. Make sure they own that cart item
    if(cartItem.user.id !== ctx.request.userId) {
      throw new Error('You do not own that item');
    }
    // 3. Delete that cart item
    return ctx.db.mutation.deleteCartItem({
      where: { id: args.id }
    }, info);
  },

// MORE CODE
```

## Now we jump over to the client side
* We create a new client side component `RemoveFromCart.js`

`RemoveFromCart.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import PropTypes from 'prop-types';

// GraphQL
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id } = this.props;
    return (
      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }}>
        {removeFromCart => (
          <button
            type="button"
            onClick={() => {
              removeFromCart();
            }}
          >
            Remove From Cart
          </button>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
```

* It is just a button
* We add prop types for the `id`
    - All we care to get back from our removeFromCart client side GraphQL is the `id`
* We write our client side GraphQL to call our resolver (server side)
* We go into our `CartItem` and import this component into it
* We are calling a function and when clicked we assign it to an arrow function and inside the body of that function we call removeFromCart()
    - We are passing this function the `id` via the recommended way `variables={{ id: this.props.id }}`
        + But we can destructure this intoo `variables={{ id }}`

`CartItem.js`

```
// MORE CODE

// lib
import formatMoney from '../lib/formatMoney';

// custom components
import RemoveFromCart from './RemoveFromCart'; // don't forget to import this

// MORE CODE

const CartItem = ({ cartItem }) => (

    // MORE CODE

    </div>
    <RemoveFromCart id={cartItem.id} />
  </CartItemStyles>
);

CartItem.propTypes = {
  cartItem: PropTypes.object,
};

export default CartItem;
```

* Notice we pass RemoveFromCart the `id` of the `cartItem` we want to remove
* And inside RemoveFromCart we accept that `id` via `this.props.id`

## Let's style our button better
* Remember we are using props in our styles and pulling from our theme we created in `Page.js`

`Page.js`

```
// MORE CODE

const theme = {
  red: '#ff0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#e1e1e1',
  offWhite: '#ededed',
  maxWidth: '1000px',
  bs: '0 12ps 24px 0 rgba(0, 0, 0, 0.09)',
};

// MORE CODE
```

### Here is BigButton styled component
```
// MORE CODE

import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import PropTypes from 'prop-types'; // Don't forget the import!

// styles
const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

// MORE CODE
```

## Destructure with the Mutation `loading` and `error`
* Change this:

`RemoveFromCart.js`

```
// MORE CODE

      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }}>
        {removeFromCart => (

// MORE CODE
```

* To this:

```
// MORE CODE

      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }}>
        {(removeFromCart, { loading, error }) => (

// MORE CODE
```

* And here is what that code looks like

```
// MORE CODE

      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }}>
        {(removeFromCart, { loading, error }) => (
          <BigButton
            type="button"
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}
          >
            &times;
          </BigButton>
        )}
      </Mutation>

// MORE CODE
```

* Any errors (like the one we code server side that say "You do not own this item") can be shown in an alert box to the user

### Alternative way to pass `id`
* Using `variables` attribute inside `<Mutation>` is my preferred way
* Here is an alternative way and is only provided in case you see it out in the wild of React coding

```
// MORE CODE

          <BigButton
            type="button"
            disabled={loading}
            onClick={() => {
              removeFromCart({
                variables: {
                  id,
                },
              }).catch(err => alert(err.message));
            }}
          >
            &times;
          </BigButton>

// MORE CODE
```

* But let's use the other way
* **note** I am using loading to disable the button right after we click it (this is a UX improvement)

`RemoveFromCart.js`

```
// MORE CODE

      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }}>
        {(removeFromCart, { loading, error }) => (
          <BigButton
            type="button"
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}
          >
            &times;
          </BigButton>
        )}
      </Mutation>

// MORE CODE
```

### Take it for a test drive
* Delete a cart item
* Refresh the page
* The cartItem should be gone

### Why do we need to manually refresh
* We didn't use refetchQueries like we did before
* We could do this but let's look at an issue with AddToCart

### AddToCart is slow
* When we click AddToCart it takes over a second before the item is added to the cart
* We can fix this and use what we learn on both AddToCart and RemoveFromCart to make our app's UX almost instantaneous

## Next - Update the cache as soon as we delete a cartItem from the server
* And then in the background we can then go back and refetch behind the scenes
