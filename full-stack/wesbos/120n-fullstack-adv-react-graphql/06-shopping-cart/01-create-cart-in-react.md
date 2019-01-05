# Create Cart in React
## Styles we'll use

`styles/CartStyles.js`

```
import styled from 'styled-components';

const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid ${props => props.theme.black};
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double ${props => props.theme.black};
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`;

export default CartStyles;
```

`styles/Supreme.js`

```
import styled from 'styled-components';

const Supreme = styled.h3`
  background: ${props => props.theme.red};
  color: white;
  display: inline-block;
  padding: 4px 5px;
  transform: skew(-3deg);
  margin: 0;
  font-size: 4rem;
`;

export default Supreme;
```

`styles/CloseButton.js`

```
import styled from 'styled-components';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;

export default CloseButton;
```

`styles/SickButtons.js`

```
import styled from 'styled-components';

const SickButton = styled.button`
  background: red;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default SickButton;
```

## Add our React Cart Component
`Cart.js`

```
import React from 'react';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const Cart = () => (
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
);

export default Cart;
```

* What is `<CartStyles open>`?
    - We use this `transform: translateX(100%)` and that will move the cart off screen
    - But we use **${props => props.open && `transform: translateX(0);`}**
        + And that says any open prop will move the cart on screen

`Header.js`

```
// MORE CODE

import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';

// custom components
import Nav from './Nav';
import Cart from './Cart';

// MORE CODE

        <div className="sub-bar">
          <p>Search</p>
        </div>
        <Cart />
      </StyledHeader>
    );
  }
}

export default Header;
```

* We replace our static Cart text with the Cart Component

## Take our Cart for a test drive
* You see the Cart on our home page
* Remove `open` from `Cart.js` and you will see the cart disappear
* (TODO ----> note: in Wes Video the Cart animates but my cart is not animated opened and closed when I add and remove the `open` prop)

## Next - Get local state to also live in our Apollo client


