# Animating Cart Count
* We will add a number in our `My Cart` button in our navbar that will update via animation as the number of items in the cart grow

## Styles
```
font-feature-settings: 'tnum'
font-variant-numeric: tabular-nums;
```

* As you increase your numbers the above lines will keep the same with for the characters regardless if it is a fat number like `2` or a skinny number like `1`

`CartCount.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Dot = styled.div`
 background: ${props => props.theme.red};
 color: white;
 border-radius: 50%;
 padding: 0.5rem;
 line-height: 2rem;
 min-width: 3rem;
 margin-left: 1rem;
 font-weight: 100;
 font-feature-settings: 'tnum';
 font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => <Dot>{count}</Dot>;

export default CartCount;
```

## Import our new CartCount button
* We'll manually pass `100` to see what it looks like

`Nav.js`

```
// MORE CODE

import CartCount from './CartCount';

class Nav extends Component {

    // MORE CODE

    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => (
        <button type="button" onClick={toggleCart}>
          My Cart
          <CartCount count={100} />
        </button>
      )}
    </Mutation>

// MORE CODE
```

### We can't add the cart length
* Because we could have multiple of one item so array.length won't work here
* `reduce` will come in handy because we just need to find the count of all the items inside our cart

```
// MORE CODE

    <button type="button" onClick={toggleCart}>
      My Cart
      <CartCount count={currentUser.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
    </button>

// MORE CODE
```

* Test and now our cart count is accurate

## Adding the animation
* We want to transition from one component to another
* We have Dot with a count inside it
* When you go from a Dot with 2 inside to 3 inside
* It will unmount the initial amount 2 and remount the 3 
* We can use react transition group to make these animations

`CartCount.js`

```
// MORE CODE

import { TransitionGroup, CSSTransition } from 'react-transition-group';

// MORE CODE

const CartCount = ({ count }) => (
  <TransitionGroup>
    <CSSTransition unmountOnExit className="count" classNames="count" key={count} timeout={{ enter: 4000, exit: 4000 }}>
      <Dot>{count}</Dot>
    </CSSTransition>
  </TransitionGroup>
);

export default CartCount;
```

* You need to have the `unmountOnExit` to remove when you are done
* View CDTC in browser
* Hover over the CartCount
* And click Add To Cart button
* You will see the copy added and the original disappears after 4 seconds
* Now look at the CartCount in the nav and click add to cart button and you will see two CartCount buttons on top of each other (this is for you to be able to animate out and in)

### Add our Animation styles
* Very important to make the position `relative`
* We make `backface-visability: hidden` because we will flip out old one and flip in new one and as it flips itself over it will hide itself

`CartCount.js`

```
// MORE CODE

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 4s;
    backface-visibility: hidden;
  }
`;

const Dot = styled.div`

// MORE CODE
```

### Now Wrap your AnimationStyles around the TranstionGroup
* Now look at the class names we are given
* View CartCount code in CDTC after you click Add To Cart button
    - count-enter-done
    - count-enter
    - count-exit
    - count-enter-active
    - count-exit-active
* We can use these to style them how we want
* We could use 180 degrees but in CSS we can use `turns` is 360 degree turn and this just makes doing math easier when using CSS

```
// MORE CODE

  .count-enter {
    transform: rotateX('angle')
  }

// MORE CODE
```

### Now the final Animation styles
```
// MORE CODE

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all .4s;
    backface-visibility: hidden;
  }

  /* Initial Stat of the enter (will be flipped on its back) */
  .count-enter {
    transform: rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: rotateX(0.5turn);
  }
`;

// MORE CODE
```

* We cut the time from 4s to .4s

### Also change 4000 to 400
```
// MORE CODE

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);

// MORE CODE
```

* View in browser
* Add an item to the cart and it will nicely animate with a flip

## add scale
```
// MORE CODE

  /* Initial Stat of the enter (will be flipped on its back) */
  .count-enter {
    transform: scale(2) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(2) rotateX(0.5turn);
  }
`;

// MORE CODE
```

* That is a nice punch effect with animation
* This CSS can get long but you can reuse these animation components throughout your app
