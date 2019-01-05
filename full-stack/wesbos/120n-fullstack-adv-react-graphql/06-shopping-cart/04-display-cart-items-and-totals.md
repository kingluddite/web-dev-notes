# Display Cart Items and Totals
## Remember User.js?
`User.js`

```
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

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

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
```

* We built that to tuck away all the complexity of the `CURRENT_USER_QUERY` which is large
* We also wanted to:
    - Write the Query component
    - And then pass the data down

## How are we currently using the `User` component?
* Just in our `Nav.js` and it will give us our currently logged in user and change the nav UI based on that condition (logged in vs not logged in)
* We import `User` into `Nav` and wrap our `User` around `Nav` like this

```
// MORE CODE

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
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {toggleCart => (
                    <button type="button" onClick={toggleCart}>
                      Cart
                    </button>
                  )}
                </Mutation>
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
    );
  }
}

export default Nav;
```

* So we wrap `User` around `NavStyles` and we add a render prop `{({ data: { currentUser } }) => (` and that will expose the currently logged in user and inside of that user we have information about them (their name, email address) and now we'll be able to query the user's cart
    - We'll accomplish this by modifying the user query `CURRENT_USER_QUERY` and making it slightly bigger

## Import `User` into `Cart`
`Cart.js`

```
// MORE CODE

import SickButton from './styles/SickButton';

// custom components
import User from './User';

// MORE CODE
```

## Add another layer of render prop
* Now we are getting really complicated with all these nested render props (we are now nested 3 deep! - we'll clean this up soon)

### `{` vs `(`
#### Using parentheses
* Sometimes in render props you will use parentheses like this:
    - You use this when you want an implicit return

```
// MORE CODE

   {({ data: {currentUser} }) => (
     
   )}

// MORE CODE
```

#### Using curly braces
* And sometimes you will use curly braces like this
    - You use this when your code is more complex and has multiple expressions

```
// MORE CODE

   {({ data: {currentUser} }) => {
     
   }}

// MORE CODE
```

## Add our rendered prop
`Cart.js`

```
// MORE CODE

const Cart = () => (
  <User>
   {({ data: {currentUser} }) => {
     if(!currentUser) return null;
     return (

     )
   }}
    </User>
  <Mutation mutation={TOGGLE_CART_MUTATION}>

// MORE CODE
```

* Grab the closing `)}}</User>` and wrap your Mutation with it like this:

```
// MORE CODE

const Cart = () => (
  <User>
    {({ data: { currentUser } }) => {
      if (!currentUser) return null;
      console.log(currentUser); // add this log
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
             // MORE CODE
            </Query>
          )}
        </Mutation>
      );
    }}
  </User>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };

// MORE CODE
```

* We added a log to see what user info we now have
* Clear console in CDT and refresh page
* View home page, log in and check CDT and you will see all properties of currently logged in user

## Add that info to the cart
* We want change "Your're Cart" to the name of the user logged in's Cart

`Cart.js`

```
// MORE CODE

<CartStyles open={data.cartOpen}>
  <header>
    <Supreme>{currentUser.name} Cart</Supreme>

// MORE CODE
```

* View in browser, click Cart button in Nav and you will see currently logged in user's name beside Cart

![logged in user cart](https://i.imgur.com/Gv89cZB.png)

## We don't have access to the user's cart yet
* Let's modify this in CURRENT_USER_QUERY

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

* We will modify the above
* We can't just add cart like this

```
// MORE CODE

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
      cart
    }
  }
`;

// MORE CODE
```

* And that is because cart is an object so we write it like this (and now we can say what properties we want to show from the cart which are `id` and `quantity`)

```
// MORE CODE

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
      cart {
        id
        quantity
      }
    }
  }
`;

// MORE CODE
```

* Now refresh home page and you will see in the CDTC the cart with the `id` and `quantity`

![cart length](https://i.imgur.com/s1EIjTw.png)

### How can we say how many items are in the cart
* Easy, the cart is an array and so we can just use the **array** length property to find this out and use it to update our Cart UI

`Cart.js`

```
// MORE CODE

<Supreme>
  {currentUser.name}
  's Cart
</Supreme>
<p>You have {currentUser.cart.length}</p>

// MORE CODE
```

### Plural items vs item conditional
* We need to change singular to plural if they go from one item to more than one item

`Cart.js`

```
// MORE CODE

    <p>
      You have {currentUser.cart.length} Item
      {currentUser.cart.length === 1 ? '' : 's'}
    </p>

// MORE CODE
```

### Quantity showed in bubble
* We will add the quantity in a bubble beside the cart in the nav (we'll get to that soon)

### Loop over all items in cart and show inside cart
* First we'll just create a simple loop and loop out all the item id's just to make sure we get the data we need

```
// MORE CODE

<p>
  You have {currentUser.cart.length} Item
  {currentUser.cart.length === 1 ? '' : 's'}
</p>
<ul>
  {currentUser.cart.map(cartItem => (
    <li>{cartItem.id}</li>
  ))}
</ul>

// MORE CODE
```

* That outputs the ids in the Cart UI - success

### We need to refetch
* Add another item to the cart and you won't see it in the cart
* But if you refresh the page you see it added
* We need to add a refetch so we don't have to manually refresh to see our fresh data
* **note** We get the unique key warning that we'll need to fix (TODO)

#### Where do we add the refetch?
* When we add the item to the cart that is when we need it so we will add the refetch inside the `AddToCart` component

`AddToCart.js`

```
// MORE CODE

import gql from 'graphql-tag';

// GraphQL
import { CURRENT_USER_QUERY } from './User';

// MORE CODE

class AddToCart extends Component {

  // MORE CODE

  render() {
    const { id } = this.props;

    return (
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>

       // MORE CODE

        )}
      </Mutation>
    );
  }
}

export default AddToCart;
```

* Add an item, test in browser and see the item is added without performing a manual page refresh

### We won't code all our looping inside Cart.js
* We want each item to be a separate component
* This helps keep our code modular and maintainable

`CartItem.js`

```
import React from 'react';
import styled from 'styled-components';

const CartItemStyles = styled.li``;

const CartItem = props => <CartItemStyles>hello</CartItemStyles>;

export default CartItem;
```

### Add the CartItem to the Cart
* Make sure to fix the `unique key` warning

```
// MORE CODE

// custom components
import User from './User';
import CartItem from './CartItem';

// MORE CODE

    <ul>
      {currentUser.cart.map(cartItem => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </ul>

    // MORE CODE

```

* Remember to also pass down the `cartItem` as a prop to `CartItem`
    - And use that prop value `id` in CartItem like this:

```
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CartItemStyles = styled.li``;

const CartItem = props => {
  const { cartItem } = props;
  return <CartItemStyles>{cartItem.id}</CartItemStyles>;
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
```

* We added a prop type (best practice)
    - You can shape it further if you want (TODO)
* We destructured (best practice)
* We used a Stateless functional component and we are showing how props are accessed
    - If we were using a class based component we would access props with `this.props`

## Get more info about our CartItem
* Right now we only have `id` and `quantity`
* How do we get more information about the item inside our cart?
* So do we add all the details here?

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
      cart {
        id
        quantity
        title
        price
        image
      }
    }
  }
`;

// MORE CODE
```

* No. We do not add them like that
* Why not? Because this is a cart item and all the details about the cart item is not in the cart item it actually has a relationship to the item
    - This means we have to go even one step further and grab the `item` and the properties inside of it like this:

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
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

// MORE CODE
```

* Now view the browser and refresh and check out the magic inside the CDTC

![the cart item info](https://i.imgur.com/VXXX3Kf.png)

* That is amazing and this is the real power of GraphQL!
    - We have a cart
        + Inside the cart we have several items
            * Inside each item we see the properties for that individual item

### Can we nest further?
* Each item has a user so we can access the user's email

```
// MORE CODE

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
          user {
            name
            email
          }
        }
      }
    }
  }
`;

// MORE CODE
```

![nested even deeper](https://i.imgur.com/OIR7KP5.png)

### And we can nest even deeper - each user has a cart
```
// MORE CODE

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
          user {
            name
            email
            cart {
              item {
                user {
                  email
                }
              }
            }
          }
        }
      }
    }
  }
`;

// MORE CODE
```

* This is crazy how deep we can nest
* If you wanted to show who's item you are trying to buy, you totally could
* We have a user
    - That user has a cart
    -   That cart item
        +   That has an item
            *   That has a user
                -   That has a cart
                    +   That has an item
                        *   That has a user
                            -   That has an email address
* What we just did shows the power of GraphQL

### Here is the query we will use
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
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

// MORE CODE
```

* A better way to destructure in SFC

`CartItem.js`

```
// MORE CODE

const CartItem = ({ cartItem }) => <CartItemStyles>{cartItem.id}</CartItemStyles>;

// MORE CODE
```

* We could destructure even further with this:

```
// MORE CODE

const CartItem = ({ cartItem: { item } }) => (
  <CartItemStyles>
    <img width="100" src={item.image} alt="" />
  </CartItemStyles>
);

// MORE CODE
```

* But we need `cartItem` to show quantity so we won't destructure that deep

```
// MORE CODE

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img width="100" src={cartItem.item.image} alt="" />
  </CartItemStyles>
);

// MORE CODE
```

### Add our item properties to the cart
```
// MORE CODE

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
    <div className="cart-item-details">
      <h3>{cartItem.item.title}</h3>
      <p>{cartItem.item.price}</p>
    </div>
  </CartItemStyles>
);

// MORE CODE
```

* We see our properties
* We need to format money into something people are used to

### Format money
* Let's use this utility function for formatting money

`lib/formatMoney.js`

```js
export default function(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
}
```

## And let's import and use that format function

`CartItem.js`

```
// MORE CODE

// lib
import formatMoney from '../lib/formatMoney';

// MORE CODE

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
    <div className="cart-item-details">
      <h3>{cartItem.item.title}</h3>
      <p>{formatMoney(cartItem.item.price)}</p>
    </div>
  </CartItemStyles>
);

// MORE CODE
```

### Now we want to list out the total of what we have
#### First list out the quantity
```
// MORE CODE

      <p>
        {formatMoney(cartItem.item.price)}
        {' - '}
        <em>{cartItem.quantity}</em>
      </p>

// MORE CODE
```

* Click Add to Cart button and the quantity in the cart will automatically update

### We want to format it so it is quantity X price (and format price again)
```
// MORE CODE

        <em>
          {cartItem.quantity} &times; {formatMoney(cartItem.item.price)}
        </em>

// MORE CODE
```

## Now we need to make this the total
* We will do this on the cartItem and not the item itself

```
// MORE CODE

      <p>
        {formatMoney(cartItem.item.price * cartItem.quantity)}
        {' - '}
        <em>
          {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
        </em>
      </p>

// MORE CODE
```

* Add another item and watch it calculate new total amount automatically

#### Quick fix - disable Add To Cart after you click it and it is waiting for response

`AddToCart.js`

```
// MORE CODE

      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(addToCart, { loading }) => (
          <button type="button" disabled={loading} onClick={addToCart}>
            Add
            {loading && 'ing'} To Cart
          </button>
        )}
      </Mutation>

// MORE CODE
```

## Add styling to make our cart look better

`CartItem.js`

```
// MORE CODE

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

// MORE CODE
```

![cart styled](https://i.imgur.com/uPYjKU4.png)

### We want to calculate total price
`lib/calcTotalPrice.js`

```
export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally;
    return tally + cartItem.quantity * cartItem.item.price;
  }, 0);
}
```

* It uses JavaScript's reduce function, takes every single item and mash them into each other
* We start with 0 cents
* For each one we get a tally and a cart item
* If there is a cart item
    - There is a possibility that you add an item to the cart but then someone deletes the item, then you have a cart item with something that doesn't exist so we need to check that the item is still there otherwise we will skip that one
* Finally we return the tally times the new amount

### Add Total Price calculation
`Cart.js`

```
// MORE CODE

                  <footer>
                    <p>{calcTotalPrice(currentUser.cart)}</p>
                    <SickButton>Checkout</SickButton>
                  </footer>

// MORE CODE
```

And change it to this

```
// MORE CODE

                  <footer>
                    <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
                    <SickButton>Checkout</SickButton>
                  </footer>
                </CartStyles>

// MORE CODE
```

* Don't forget to import the 2 utility functions

`Cart.js`

```
// MORE CODE

import CartItem from './CartItem';

// lib
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

// MORE CODE
```

### Get rid of all unneeded logs
* Keep your terminal and console clean - helps with debugging
* Find all logs so you can comment them out

`$ grep -R --exclude-dir=node_modules 'console.log(' .`

* View app in browser and check to make sure the logs are gone

## TODO's - Improve this app
* Make is so that all names entered are always capitalized

## Next - Removing of Cart Items

