# Custom Hook for our Order Form
<!-- MarkdownTOC -->

- [What the custom hook will do?](#what-the-custom-hook-will-do)
- [usePizza custom hook](#usepizza-custom-hook)
  - [What our custom hook will do](#what-our-custom-hook-will-do)
- [Remove an item from order](#remove-an-item-from-order)
  - [How this works](#how-this-works)
- [The finished custom usePizza hook](#the-finished-custom-usepizza-hook)
- [We'll consume the usePizza custom hook](#well-consume-the-usepizza-custom-hook)
- [Inspect our hooks using RDTs](#inspect-our-hooks-using-rdts)
- [But when we add a button to add the size and pizza id when clicked like:](#but-when-we-add-a-button-to-add-the-size-and-pizza-id-when-clicked-like)
- [New component to hold the displaying of our ordered items](#new-component-to-hold-the-displaying-of-our-ordered-items)
- [Consume our PizzaOrder component](#consume-our-pizzaorder-component)
  - [Test in browser](#test-in-browser)
- [Now we'll loop over the items in the order](#now-well-loop-over-the-items-in-the-order)
- [Add remove button](#add-remove-button)
  - [Don't forget position relative](#dont-forget-position-relative)
  - [Accessibility tip](#accessibility-tip)
- [Remove from order](#remove-from-order)
- [The finished PizzaOrder component](#the-finished-pizzaorder-component)
- [But if we jump to another page we lose the persistance of our order](#but-if-we-jump-to-another-page-we-lose-the-persistance-of-our-order)

<!-- /MarkdownTOC -->

## What the custom hook will do?
* When you click on one of the buttons it will add it to your order
    + And then we will loop over the order and display it in the order box
    + We'll add a button to checkout
    + We'll add a button to show the total

## usePizza custom hook
`src/utils/usePizza.js`

### What our custom hook will do
1. Create some state to hold our order
2. Make a function add things to order
3. Make a function remove things forom order
4. Send this data the a a serverless function when they check out

* notes
    - We'll default `order` to an empty array
    - Don't forget to import `useState` from react

## Remove an item from order
* Here's our function

```js
// MORE CODE

  // 3. Make a function remove things forom order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      // everything after the item we want to remove
    ])
  }

// MORE CODE
```

### How this works
* If you have an array `[1,2,3,4,5]` and you want to remove `3`
    - We want to make an new array of the parts before `[1,2]`
    - And the parts after `[4,5]`
    - So the new array will be `[1,2,4,5]` (so 3 was removed)

```js
// MORE CODE

  // 3. Make a function remove things forom order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1) // if you omit the second argument on slice
      // it will just go to the end of the array
    ])
  }

// MORE CODE
```

## The finished custom usePizza hook
`utils/usePizza.js`

```js
import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  const [order, setOrder] = useState([]);
  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function remove things forom order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data the a a serverless function when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
```

* What are we returning from this custom usePizza hook?
    - All the custom functionality that this custom hook needs to surface to whoever is using the hook
    - We want to return
        + The actual `order` itself
        + addToOrder (utility function)
        + removeFromOrder (utility function)
        + TODO Also some loading and error state

## We'll consume the usePizza custom hook
```js
// MORE CODE

import usePizza from '../utils/usePizza';

export default function OrdersPage({ data }) {
  const pizzas = data.pizzas.nodes;
  // console.log(data);
  // You have to explicitly set the default values
  //  for whatever inputs you have

  // CUSTOM HOOKS
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder } = usePizza({ pizzas, inputs: values });

// MORE CODE
```

## Inspect our hooks using RDTs
* You will see both our custom hooks
    - Form
    - Pizza
* If you inspect them you'll see our state is empty

## But when we add a button to add the size and pizza id when clicked like:
```js
// MORE CODE

>
                {['S', 'M', 'L'].map((size, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>

// MORE CODE
```

* Click on Small and Medium of the first pizza and then inspect your RDT's state of usePizza custom hook

![we have orders in our state](https://i.imgur.com/AfC18rJ.png)

* We don't need all the info of the pizza
    - Just the size and id
    - **Warning** State is not persistant, if you refresh the state is gone

## New component to hold the displaying of our ordered items
`src/components/PizzaOrder.js`

```js
import React from 'react';
import PropTypes from 'prop-types';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  //
  return (
    <>
      <p>ORDER!</p>
    </>
  );
}

PizzaOrder.propTypes = {
  order: PropTypes.object,
  pizzas: PropTypes.object,
  removeFromOrder: PropTypes.func
};
```

## Consume our PizzaOrder component
`orders.js`

```js
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import usePizza from '../utils/usePizza';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';

export default function OrdersPage({ data }) {
  const pizzas = data.pizzas.nodes;
  // console.log(data);
  // You have to explicitly set the default values
  //  for whatever inputs you have

  // CUSTOM HOOKS
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder, removeFromOrder } = usePizza({ pizzas, inputs: values });
  // END CUSTOM HOOKS

  // console.log(values, updateValues);

  return (
    <>
      <SEO />
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={values.name} id="name" onChange={updateValues} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={values.email} onChange={updateValues} />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder />
        </fieldset>
      </OrderStyles>
    </>
  );
}

OrdersPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
```

* Pass our props our hook wants

```js
// MORE CODE

        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder order={order} removeFromOrder={removeFromOrder} />
        </fieldset>
      </OrderStyles>

// MORE CODE
```

* Why do we pass `removeFromHook` instead of just grabbing it from our hook?
    - **answer** This removeFromHook prop we are passing to PizzaOrder is bound to our state and if you were to use the custom hook again you would create a separate set of pizzas and you wouldn't be able to talk to each other 

```js
// MORE CODE

        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
        </fieldset>

// MORE CODE
```

* Update our hook to increase the items in our order

```js
// MORE CODE

import React from 'react';
import PropTypes from 'prop-types';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      <p>ORDER!</p>
      <p>You have {order.length} items in your order</p>
    </>
  );
}

PizzaOrder.propTypes = {
  order: PropTypes.object,
  pizzas: PropTypes.object,
  removeFromOrder: PropTypes.func,
};

// MORE CODE
```

### Test in browser
* You will see the pizzas increase when you click on S M L buttons
* You will see the state for Pizza hook updates also

## Now we'll loop over the items in the order
* We need the index in case we need to remove it (so we use map's second argument (index))

`PizzaOrder.js`

```js
import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizzaObj = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={index}>
            <Img fluid={pizzaObj.image.asset.fluid} />
            <h2>{singleOrder.id}</h2>
            <p>{formatMoney(calculatePizzaPrice(pizzaObj.price, singleOrder.size))}</p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}

PizzaOrder.propTypes = {
  order: PropTypes.array,
  pizzas: PropTypes.array,
  removeFromOrder: PropTypes.func,
};
```

## Add remove button
* To remove pizza order

### Don't forget position relative
`MenuItemStyles.js`

```js
// MORE CODE

const MenuItemStyles = styled.div`
  position: relative;
  display: grid;

// MORE CODE
```

### Accessibility tip
* If we don't tell sight impaired users what we are removing they will just hear "muliplication sign!" (because we use the html encoded `&times;`)

```js
// MORE CODE

              <button type="button" className="remove" title={`Remove ${singleOrder.size} ${pizzaObj.name} from Order`}>
                &times;
              </button>

// MORE CODE
```

## Remove from order
```js
// MORE CODE

              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizzaObj.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>

// MORE CODE
```

## The finished PizzaOrder component
```js
import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizzaObj = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={index}>
            <Img fluid={pizzaObj.image.asset.fluid} />
            <h2>{pizzaObj.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizzaObj.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizzaObj.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}

PizzaOrder.propTypes = {
  order: PropTypes.array,
  pizzas: PropTypes.array,
  removeFromOrder: PropTypes.func,
};
```

## But if we jump to another page we lose the persistance of our order
* Next we'll show how to keep our state as we travel between pages using React Context instead of just state inside this component
