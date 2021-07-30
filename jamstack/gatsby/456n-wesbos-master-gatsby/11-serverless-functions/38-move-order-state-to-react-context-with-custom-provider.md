# Move Order state to React Context with custom Provider
* Our state only currently resides in our order page
* If you leave and come back our state is empty
    - Why?
        + Gatsby unmounts your component and remounts it

## How can you maintain state in react across page changes?
* You need to put that state at the very highest level in Gatsby
    - This will prevent react from unmounting and remounting the state


## Gatsby gives us the `wrapRootElement` that we can use inside `gatsby-browser.js`
* Use RDTs and look at the top of the tree (in Components) and you'll see `Root`

![Root in gatsby](https://i.imgur.com/ALl1Gdt.png)

* If you view Root while clicking through other pages you'll see Root doesn't change
    - Root is the only element that stays put
    - All the other elements unmount and remount everytime you move from page to page
    - If you want state to stay wrap it in the Root element and this allows us to persist our data

## How do we wrap our state in Root?
* We are sticking state in order level here:

```
// MORE CODE

  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder, removeFromOrder } = usePizza({ pizzas, inputs: values });

// MORE CODE
```

* But now we'll stick all of the data in `context`
    - `context` allows us to store data and functionality at a high level and then access that data at a much lower level without having to pass props

## `src/components/OrderContext.js`
* Provider
    - A component that will live at a higher level and then we'll inject that around our root

```
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// create an order context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // we need to stick state in here
  const [order, setOrder] = useState('yo adrian!');

  return <OrderContext.Provider>{children}</OrderContext.Provider>;
}

OrderProvider.propTypes = {
  children: PropTypes.object,
};

export default OrderContext;
```

* Now we need to use our `gatsby-browser.js` file to use the `wrapRootElement()` function to wrap it around our `OrderProvider`

`gatsby-browser.js`

```
import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
```

## We also need to copy and paste the wrapRootElement in gatsby-ssr.js
* Because it has to happen in both of them

`gatsby-ssr.js`

```
import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
```

* View in browser
    - Examine the RDTs and you'll see Root is now wrapped

![Root is now wrapper](https://i.imgur.com/gbPbWVS.png)

## Let's see if it has our default state of `yo adrian!`
* Click on `OrderProvider` in RDT and you will see it in the hooks State

## So our data is high up on the food chain. Great!
* But how do we access that state from a lower level component like our orders page? (or any component deeper down in the gatsby food chain)

`src/utils/usePizza.js`

* We need to import both useState and useContext from react

```
// MORE CODE

import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  const [order, setOrder] = useState([]);
  // 2. Make a function to add things to order
  const hola = useContext(OrderContext);
  console.log(hola);

// MORE CODE
```

* View in browser and we see `undefined` on the orders page

## Why is it undefined?
* We didn't pass our values into our Provider
* Now you'll see the log on the orders page (yo adrian)
    - But we'll load an empty array of pizzas

`usePizza.js`

```
// MORE CODE

import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  // We moved the line below (useState) up to the Provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function
  //  (setOrder) via context
  // 2. Make a function to add things to order
  const [order, setOrder] = useContext(OrderContext);

// MORE CODE
```

### Review what we accomplished
* We swapped out the array of items and the updater `[order and setOrder]`
* We took it from living inside of our custom hook to now living inside our provider
* And now we can grab it wherever we want from context

### And show what we accomplished
* Load pizzas up on order page
* Visit another page
* Come back to orders and the orders are still there!
* View your top level OrderProvider in RDTs and you'll see your state is inside ther
    - The data will be gone when you refresh the page
    - **improvement** Put the data in localStorage

## Fixing warning
* `Warning: Encountered two children with the same key, Keys should be unique`
    - We are mapping over the pizzas
    - But if you put the same key in your cart twice they are not unique
* One solution is to combine key to make it unique (we use map's index argument):

```
<MenuItemStyles key={`${singleOrder.id}-${index}`}>
```

## VS Code trick
* hover over it and hold option down and click it and it will open that component

## Next - Serverless Functions
