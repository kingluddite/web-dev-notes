# Templating and Styling our Single Pizza Page
`Pizza.js`

* We get our props but we just need to get to our data
    - So we can destructure it

```
import { graphql } from 'gatsby';
import React from 'react';

export default function SinglePizzaPage(props) {
  console.log(props);
  return <p>Single Pizza</p>;
}

// MORE CODE
```

* Destructure our data

```
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

export default function SinglePizzaPage({ data }) {
  console.log(data);
  return <p>Single Pizza</p>;
}

SinglePizzaPage.propTypes = {
  data: PropTypes.object.isRequired,
};

// MORE CODE
```

* You can destructure a property two levels deep

```
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

export default function SinglePizzaPage({ data: { pizza } }) {
  console.log(pizza);
  return <p>Single Pizza</p>;
}

SinglePizzaPage.propTypes = {
  data: PropTypes.object.isRequired,
};

// MORE CODE
```

![destructured 2 levels deep](https://i.imgur.com/6ZoTqyE.png)

## We don't need toppings in ToppingsFilter.js
```
// MORE CODE

export default function ToppingsFilter() {
  // 1. Get a list of all the toppings
  // 2. Get a list of all the pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  console.clear();
  // count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log(toppingsWithCounts);

// MORE CODE
```

## Fix stylelint issue
* grid-template-columns needs to come first (order!)

```
// MORE CODE

const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 2rem;
`;

// MORE CODE
```

## The finised Pizza.js
```
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <PizzaGrid>
      <Img fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  );
}

SinglePizzaPage.propTypes = {
  data: PropTypes.object,
};

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query ($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
```
