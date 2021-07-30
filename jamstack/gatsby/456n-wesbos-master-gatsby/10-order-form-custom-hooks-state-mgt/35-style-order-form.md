# Style Order Form
* We'll create styles in separate folder
* **tip** If the VS Code import shortcut is giving you require instead of import it is because VS Code does not see any evidence of ES Modules (like import/export and so it assume Common JS)

## Create an external styled component
`src/styles/OrderStyles.js`

```
import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  fieldset {
    display: grid;
    grid-column: span 2;
    gap: 1rem;
    align-content: start;
    overflow: auto;
    max-height: 600px;

    &.menu,
    &.order {
      grid-column: span 1;
    }

    /* &menu (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  } */
  }
`;

export default OrderStyles;
```

* We consume our OrderStyles so we can use it on our page

```
// MORE CODE

import OrderStyles from '../styles/OrderStyles';

export default function OrdersPage({ data }) {
  // console.log(data);
  // You have to explicitly set the default values
  //  for whatever inputs you have
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });

  // console.log(values, updateValues);
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO />
      <OrderStyles>
        <fieldset>

// MORE CODE
```

`src/styles/MenuItemStyles.js`

```
import styled from 'styled-components';

const MenuItemStyles = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 100px 1fr;
  gap: 0 1.3rem;
  align-content: center;
  align-items: center;

  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }

  p {
    margin: 0;
  }

  button {
    font-size: 1.5rem;
  }

  /* when there is a button that comes next to a button */

  button + button {
    margin-left: 1rem;
  }

  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }
`;

export default MenuItemStyles;
```

## Next - When someone clicks the button, add that item to our order
