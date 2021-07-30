# Modify custom hook to send the order data
* Get the list of pizzas
* Their names
* Their emails
* Work on getting that data to be sent over to our serverless function

## usePizza custom hook update
* We need to deal with errors
* We need to deal with the loading state 
* We need to handle any returned messages

`src/utils/usePizza.js`

```
export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  // We moved the line below (useState) up to the Provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function
  //  (setOrder) via context
  // 2. Make a function to add things to order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

// MORE CODE
```

* And we need to remember to return these new states from our custom usePizza hook

```
// MORE CODE
  return {
    order,
    addToOrder,
    removeFromOrder,
    error, // add!
    loading, // add!
    message, // add!
  };
}
```

## Use these pieces of state in our orders.js
`src/pages/orders.js`

```
// MORE CODE
  const { order, addToOrder, removeFromOrder, error, loading, message } = usePizza({
    pizzas,
    inputs: values,
  });
  // END CUSTOM HOOKS

// MORE CODE
```

## We'll handle loading first
* We need to disable the submit button until our data has loaded from our serverless function

```
// MORE CODE

        <fieldset>
          <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>

// MORE CODE
```

## Create a handler for when someone clicks "Order Ahead" button
* We use `event.preventDefault()` to make sure our form data gets added to URL and no page refresh

```
// MORE CODE
  // add this function!
  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder, // add this!
  };
}
```

* Add submitOrder to our destructured items

`orders.js`

```
// MORE CODE

  const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({
    pizzas,
    inputs: values,
  });

// MORE CODE
```

* Invoke the function when the form is clicked
    - **Remember** our styled component was formerly a form tag

```
// MORE CODE

  return (
    <>
      <SEO />
      <OrderStyles onSubmit={(e) => submitOrder(e)}>
        <fieldset>

// MORE CODE
```

### Test in browser
1. Click `Order Ahead` button on orders page
2. You see "Placing Order..." text appear on button
3. And runs submit order which
    * prevents default
    * Logs the event (Synthentic event in CDTs console)
    * And sets `loading` to true which is what makes our button say "Placing Order..."

## Gather the data
* We change in orders.js `inputs: values` to just `values`

```
// MORE CODE

  const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({
    pizzas,
    inputs: values,
  });

// MORE CODE
```

* To this:

```
// MORE CODE

  const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({
    pizzas,
    values, // update this!
  });

// MORE CODE
```

* Then we update this in `userPizza.js`

```
// MORE CODE

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order

// MORE CODE
```

* And we gather our data and log it out to make sure it works

```
// MORE CODE

  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    // gather all the data
    const body = {
      order,
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    console.log(body);
  }

// MORE CODE
```

## Test it in the browser
1. Fill out the form
2. Submit
3. Look at our data logged to the CDT

![logged data after gathering](https://i.imgur.com/epvf9VL.png)

## Now we need to send all that data over to the backend
* But before we do that we need to fix our data
    - Currently it only shows the id and size of our pizza
    - We need more info

### Create a new attachNamesAndPrices function
1. It will loop through our order using map
2. And find where the pizza.id matches the item.id (will give us the pizza)
3. Then we'll return all the stuff we have but also add the name of the pizza, the thumbnail of the pizza and the price of the pizza

`src/utils/attachNamesAndPrices.js`

* **tip** Putting all these utility functions in their own file and folder is great because we use them all over the place

```
import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((singlePizza) => singlePizza.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
```

## Now we can use the attachNamesAndPrices function
`usePizza.js`

```
import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices'; // add!

// MORE CODE

  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    console.log(body);
  }

// MORE CODE
```

* Then check out our new data in CDTs after filling form out like before and submitting

![pizzas with prices and stuff!](https://i.imgur.com/XXAktuP.png)

## Now we'll send our data to the serverless function
* We could easily hard code this using fetch like:
    - But we don't want to hard code this into your URL
    - Why?
        + What happens if you choose not to host this on netlify?
        + **West Practice** Your code should not be specifically written for a deployment target
            * We'll store the path in an environment variable and it makes it easy to change later (improved flexibility)

`usePizza.js`

```
// MORE CODE

  // this is the function that is run when user submits the form
  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    console.log(body);
  }

  // 4. Send this data the a a serverless function when they check out
  const res = fetch(`/.netlify/functions/placeOrder/placeOrder`)

// MORE CODE
```

`.env`

```
// MORE CODE
MAIL_USER=jayson.bradtke@ethereal.email
MAIL_PW=XFq7QwDPAVMaJEUnNH
GATSBY_SERVERLESS_BASE=http://localhost:8888/.netlify/functions
```

## West Practice
* Never end your URLs with a forward slash because it's always easy to add them on yourself

### Fetching and sending our data to the serverless function

* **note** GET is default method
    - We will be POSTing data
* headers
    - You can post all kinds of data to an endpoint
        + examples:
            * JSON
                - We are sending JSOn
                - We tell the server that is accepting the data that "hey!, this is JSON" so when it comes it you appropriately parse it
                - **note** `Content-Type` - Because there is a dash you must put the "Content-Type" inside quotes and we set the value to a mime type which is `'application/json'` (this is the base type for JSON)
                - Why can't we just send the body like `body: body` because the body can't be sent as an object. IT MUST BE SENT AS A STRING so we do this `body: JSON.stringify(body)`
            * Raw form data
            * Form encoded data
            * Etc...
* **note** Make sure all the res/fetch is inside the `submitOrder` function
    - **tip** Eslint helps with scoping issues
        + When fetch was outside the function eslint told us `body` was not defined
        + And inside the submitOrder eslint told us `body` was never used, this lets us know there is a scoping issue 

`usePizza.js`

```
// MORE CODE

is run when user submits the form
  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    // console.log(body);

    // 4. Send this data the a a serverless function when they check out
    const res = fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder/placeOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

// MORE CODE
```

## Now we need to parse the reponse
* **note** fetch requests are in two stages:

1. First you get a response (that has headers inside it immediately)
2. And then if you want to actually wait for the body to finish coming back, we have to get the response
**note** Don't forget our `await` before our fetch and the `res.text()`
**note** And the response (server side) we need to parse it like this `const text = JSON.parse(await res.text());`
    * When we fetch it we take our body object and stringify it and then on the server we parse the JSON on the response
    * All response status greater than 400 are less than 600 (599) all are bad and something went wrong
        - If something went wrong we set `loading` to false
        - And we set the error to the `text.message`
    * If we get a success then also set loading to false and send a success message
    * If the error is set (happens in the >= 400 < 600) and when they correct their order, then we need to clear it

```
// MORE CODE

  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    setError(null); // add!
    setMessage(null); // add!

// MORE CODE
```

* And here is the complete submitOrder function

```
// MORE CODE

 the form
  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    setError(null);
    setMessage(null);

    // // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    // console.log(body);

    // 4. Send this data the a a serverless function when they check out
    const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder/placeOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Com on down for your pizza');
    }
  }

// MORE CODE
```

## Handling showing and hiding of errors
`orders.js`

```
// MORE CODE

          <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>

// MORE CODE
```

## Test our error
`usePizza.js`

```
// MORE CODE

  // this is the function that is run when user submits the form
  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    setError('BADDDDDD!');
    setMessage(null);

    // gather all the data
    // const body = {
    //   order: attachNamesAndPrices(order, pizzas),
    //   total: formatMoney(calculateOrderTotal(order, pizzas)),
    //   name: values.name,
    //   email: values.email,
    // };
    // // console.log(body);
    //
    // // 4. Send this data the a a serverless function when they check out
    // const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder/placeOrder`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // });
    // const text = JSON.parse(await res.text());
  }

// MORE CODE
```

* Click the button and you'll see:

![error bad!](https://i.imgur.com/4ZG86U5.png)

## Deal with if there is a message
`orders.js`

```
// MORE CODE

  // END CUSTOM HOOKS

  // console.log(values, updateValues);

  if (message) {
    return <p>{message}</p>;
  }

  return (

// MORE CODE
```

## Test the message
```
// MORE CODE

  // this is the function that is run when user submits the form
  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    setError(null);
    setMessage('Go eat!');

    // // gather all the data
    // const body = {
    //   order: attachNamesAndPrices(order, pizzas),
    //   total: formatMoney(calculateOrderTotal(order, pizzas)),
    //   name: values.name,
    //   email: values.email,
    // };
    // // console.log(body);
    //
    // // 4. Send this data the a a serverless function when they check out
    // const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder/placeOrder`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // });
    // const text = JSON.parse(await res.text());
  }

// MORE CODE
```

* You will see it say `GO EAT!` in browser UI

## That is the client side part finished
### Finished files
`usePizza.js`

```
import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order
  // We moved the line below (useState) up to the Provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function
  //  (setOrder) via context
  // 2. Make a function to add things to order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // this is the function that is run when user submits the form
  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    setError(null);
    setMessage(null);

    // // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    // console.log(body);

    // 4. Send this data the a a serverless function when they check out
    const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder/placeOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Com on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
```

`orders.js`

```
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
import calculateOrderTotal from '../utils/calculateOrderTotal';

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
  const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({
    pizzas,
    values,
  });
  // END CUSTOM HOOKS

  // console.log(values, updateValues);

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO />
      <OrderStyles onSubmit={(e) => submitOrder(e)}>
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
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
        </fieldset>
        <fieldset>
          <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
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

## Next Email
* Templating the data and sending it in an email
* We need to accept the data on the server and email it out
