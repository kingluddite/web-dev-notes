# Create Order page with Custom Hooks
* Now our website gets a bit more "appy"
* Our side will be functional and can:
    - List out all the pizzas that we have
    - You can add pizza's to your order
    - You can type in your name
    - You can remove things from your order
    - It will give your total order amount

## How does our order form work?
* It is just a regular form in react
* When someone submits the order we send it off in an email
    - Just a glorified contact form
* But to send an email we need a backend
    - But we don't have a backend?
    - But we can do this using serverless functions
    - We will get a "sip of the server" in a gatsby website

## TODO - fix title SEO for order page
`pages/orders.js`

```
import React from 'react';
import SEO from '../components/SEO';

export default function OrdersPage() {
  return (
    <>
      <SEO />
      <p>Orders Page</p>
    </>
  );
}
```

* Add fieldsets
    - **West Practice** `<fieldset>` are easy to disable

```
import React from 'react';
import SEO from '../components/SEO';

export default function OrdersPage() {
  return (
    <>
      <SEO />
      <form>
        <fieldset>
          <legend>Your Info</legend>
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
}
```

* Error `jsx-a11y/label-has-associated-control: A form label must be associated with a control`
    - It wants you to wrap the label around the input
    - [docs on best practice for label and input structure](https://stackoverflow.com/questions/774054/should-i-put-input-elements-inside-a-label-element)
    - The label itself may be positioned before, after or around the associated control
    - Wes code needs to be updated
        + [It was](https://github.com/wesbos/eslint-config-wesbos/commit/35adb5b18aeba2083f6c88df71941cacb5bc5031)
* To allow nesting input inside label or as a sibling with htmlFor attribute use this rule:

```
// MORE CODE

 "jsx-a11y/label-has-associated-control": [
      "error",
      {
        "assert": "either"
      }
    ],
// MORE CODE
```

`.eslintrc`

```
{
  "extends": ["wesbos"],
  "rules": {
    "no-console": 0,
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        "assert": "either"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 120,
        "tabWidth": 2
      }
    ]
  }
}
```

* You may need to restart gatsby

`orders.js`

```
import React, { useState } from 'react';
import SEO from '../components/SEO';

export default function OrdersPage() {
  const [name, setName] = useState('');

  return (
    <>
      <SEO />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
}
```

## Test in browser on orders page
* Type in name field and you can't and you get this error:

```
Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
```

* **Follow up** My error is different than Wes'
    - He was getting `Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not be switch from uncontrolled to controlled (or vice versa)`
        + This means you can not put `state` into an input in react without having a plan of attack for what happens when someone types into the text input
    - We are using the `useState` React Hook (and importing it)
    - We default to nothing (empty string)

```
// MORE CODE

export default function OrdersPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <SEO />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} id="name" onChange={(event) => setName(event.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </fieldset>

// MORE CODE
```

* Now we are able to type into both fields

## Houston we have a problem!
* What happens if we have 10 inputs? 20 inputs? Our code starts to quickly violate DRY principles
* Libraries for making this easier
    - [Link to Forkik](https://formik.org/)
    - Better, easier way, make a custom hook

## Create a custom hook called useForm()
* Great to put all custom hooks in `src/utils`

`src/utils/useForm.js`

```
import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(event) {
    let { value, type, name } = event.target;
    // check if its a number
    if (type === 'number') {
      // convert it to a number to prevent coercian to string
      value = parseInt(value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [name]: value,
    });
  }

  return { values, updateValue };
}
```

* Now let's consume our custom hook
    -  You have to explicitly set the default values for whatever inputs you have
        +  Otherwise react will put in a new value for you

```
// MORE CODE

import React from 'react';
import SEO from '../components/SEO';

export default function OrdersPage() {
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });

  return (
    <>
      <SEO />

// MORE CODE
```

## Finished orders.js
```
import React from 'react';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';

export default function OrdersPage() {
  // You have to explicitly set the default values
  //  for whatever inputs you have
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });

  return (
    <>
      <SEO />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={values.name} id="name" onChange={updateValues} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={values.email} onChange={updateValues} />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
}

```

## Test it out
* Getting this error

```
index.js:2177 Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
```

### Troubleshoot by logging out
```
// MORE CODE

export default function OrdersPage() {
  // You have to explicitly set the default values
  //  for whatever inputs you have
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });

  console.log(values, updateValues);

// MORE CODE
```

* You will see the second value is undefined
* Should be spelled `updateValues`
    - We renamed it to `updateValue` but to match the `values` name I renamed it like this in the custom hook

`utils/useForm.js`

```
import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(event) {
    let { value, type, name } = event.target;
    // check if its a number
    if (type === 'number') {
      // convert it to a number to prevent coercian to string
      value = parseInt(value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [name]: value,
    });
  }

  return { values, updateValues };
}
```

## Also check if the state is populating as you would expect using the RDTs
![yes our state is updating](https://i.imgur.com/IHk5kSB.png)

## Next - loop over all our pizzas
* With photo and prices for the different sizes

### How are we going to get all of our pizzas?
* We could use a Static query (because we aren't using any variables) or a page query (we're on a page)
* We have a pizza's query in another page `pizzas.js`
    - We tried to export a query from another page into our orders.js page but it does not work
    - **note** Each Gatsby GraphQL query is exported as a number
* **Follow Up** I did not get a number like Wes at 15:58 of #34 video
    - I got undefined

```
// MORE CODE

import { query } from './pizzas';

console.log(query);

export default function OrdersPage() {

// MORE CODE
```

## Do I need to worry about fetching extra data fields with Gatsby GraphQL?
* No! Because it runs at build time
* It doesn't happen on your user's page load'
* **note** In gatsby land don't confuse a fragment like `...GatsbySanityImageFluid` with the spread operator in JavaScript `...pages`

`orders.js`

```
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';

export default function OrdersPage({ data }) {
  console.log(data);
  // You have to explicitly set the default values
  //  for whatever inputs you have
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });

  // console.log(values, updateValues);

  return (
    <>
      <SEO />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={values.name} id="name" onChange={updateValues} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={values.email} onChange={updateValues} />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
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

* We get all our pizzas in the console

## map through all the pizzas
```
// MORE CODE

        <fieldset>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <div key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
            </div>
          ))}
        </fieldset>

// MORE CODE
```

## Wes form label control error
* Wes ran into same problem I did earlier 21:46 of #34 video
* **solution on wes slack** https://app.slack.com/client/T0B6Z0ZL1/C01AHHRCTU2/thread/C01AHHRCTU2-1601505406.397300

## s,m,l buttons
```
// MORE CODE

          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <div key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button type="button">{size}</button>
                ))}
              </div>
            </div>
          ))}
        </fieldset>

// MORE CODE
```

## Solution for key unique error for s,m,l
```
// MORE CODE

              <div>
                {['S', 'M', 'L'].map((size, index) => (
                  <button key={index} type="button">
                    {size}
                  </button>
                ))}
              </div>

// MORE CODE
```

## Price
* The price we attached is a medium
    - small and large can be based off of that price

### Benefits of ES Modules
* By default sizes is scoped to this module
* I didn't need to declare a closure
* I just declare a small piece of JavaScript inside the file and it will be accessible anywhere inside this module

`src/utils/calculatePizzaPrice.js`
```
const sizes = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

export default function calculatePizzaPrice(cents, size) {
  return cents * sizes[size];
}
```

`orders.js`

```
// MORE CODE

import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function OrdersPage({ data }) {

   // MORE CODE
 
              <div>
                {['S', 'M', 'L'].map((size, index) => (
                  <button key={index} type="button">
                    {size} {calculatePizzaPrice(pizza.price, size)}
                  </button>
                ))}
              </div>

// MORE CODE
```

## Another utility function to format money
* Intl.NumberFormat
    - Is built into both the browser and Node.js
    - And it is built in for formatting currency (which is great!)

`src/utils/formatMoney.js`

```
const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
```

* Consume the formatMoney utility function

`orders.js`

```
// MORE CODE

import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function OrdersPage({ data }) {

    // MORE CODE

                {['S', 'M', 'L'].map((size, index) => (
                  <button key={index} type="button">
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}

// MORE CODE
```

## Next - Styling our order form
