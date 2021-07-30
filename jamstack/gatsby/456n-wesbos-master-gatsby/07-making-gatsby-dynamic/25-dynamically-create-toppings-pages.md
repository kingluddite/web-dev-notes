# Dynamically creating Toppings pages
* We will do something similar for our toppings page
* But we'll reuse our Pizza.js page but just pass it the ability to pass toppings

## Create a similar function
`gatsby-node.js`

```
const path = require('path');

// MORE CODE

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  console.log(data);
  //  3. Loop over each topping and create a page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
}

// MORE CODE
```

## We need to create our Topping page
* We can't do this

```
// MORE CODE

export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);
  await turnToppingsIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
}

// MORE CODE
```

* This is a common thing that happens with async await
    - If we await on the first item (`await turnPizzasIntoPages(params)`)
        + That will pause the `createPages()` function from running
            * It will go off and turn all the pizzas into pages and then moves onto the next line
            * Then it will go and turn toppings into pages
            * These methods are not related

```
// MORE CODE

  await turnPizzasIntoPages(params);
  await turnToppingsIntoPages(params);

// MORE CODE
```

* We don't have to wait to turn pizzas into pages before we can turn the toppings into pages
* They can be run at the same time (We call that concurrently in JavaScript)

## Solution
* We can turn both of these "Promise Based" functions
    - `await turnPizzaIntoPages(params);` (This says "I promise I turn the pizzas into pages")
    - `await turnToppingsIntoPages(params);` (This says "I promise I turn the toppings into pages")

### If we want to run them concurrently we use `await Promise.all(ARRAY_OF_PROMISES)`
* And this will run them all and wait for them all to finish
    - What is the benefit?
        + And this will make your build faster

`gatsby-node.js`

* And this is how gatsby knows to wait for these pages to be created before it starts the server and tells you that it's OK to go to `localhost:8000`

```
// MORE CODE
export async function createPages(params) {
  // Create pages dynamically
  // wait for all promises to be resolved before
  // finishing this function
  await Promise.all([turnPizzasIntoPages(params), turnToppingsIntoPages(params)]);
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
```

* Let's make some topping pages

```
// MORE CODE

async function turnToppingsIntoPages({ graphql, actions }) {
  console.log(`Turning the Toppings into Pages!!`);
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  console.log(data);
  //  3. Loop over each topping and creete a page for that topping
  data.toppings.nodes.forEach((topping) => {
    console.log(`Creating page for topping`, topping.name);
    //   actions.createPage({
    //     // What is the URL for this new page??
    //     path: `topping/${topping.name}`,
    //     component: toppingTemplate,
    //     context: {
    //       slug: topping.name,
    //     },
    //   });
  });
}

// MORE CODE
```

* Debugging errors
    - A common problem is if you have Promise and you forget to await it like this:

![data undefined](https://i.imgur.com/sQgzpF9.png)

* To troubleshoot this log out `res` like this:
    - **note** You could also destructure the error property
        + `const { data, error } = graphql(`...code here...`)

```
// MORE CODE

async function turnToppingsIntoPages({ graphql, actions }) {
  console.log(`Turning the Toppings into Pages!!`);
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  //  2. query all pizzas
  const res = graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  console.log(res);
  //  3. Loop over each pizza and creete a page for that pizza
  // data.toppings.nodes.forEach((topping) => {
  //   console.log(`Creating page for topping`, topping.name);
  //   actions.createPage({
  //     // What is the URL for this new page??
  //     path: `topping/${topping.name}`,
  //     component: toppingTemplate,
  //     context: {
  //       topping: topping.name,
  //     },
  //   //   });
  // });
}

// MORE CODE
```

* And when you run the code you'll see that we didn't await our promise

![promise pending](https://i.imgur.com/G8SFG0y.png)

## The fix
```
// MORE CODE

async function turnToppingsIntoPages({ graphql, actions }) {
  console.log(`Turning the Toppings into Pages!!`);
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  console.log(data);
  //  3. Loop over each pizza and creete a page for that pizza
  data.toppings.nodes.forEach((topping) => {
    console.log(`Creating page for topping`, topping.name);
    actions.createPage({
      // What is the URL for this new page??
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO: Regex for Topping
      },
    });
  });
}

// MORE CODE
```

* Run it again and you'll see our log showing creating pages for all toppings

## Test our site
* All the toppings pages have been created
* The links go to the page but the content doesn't change (still shows pizzas)
* **tip** If you go to a 404 in development (you will all the pages that were created - great way to troubleshoot if a page was created or if the path is correct)

## Problem
* How to we go to our `pizzas.js` page and filter this query for the specific toppings that we currenty want?

`src/pages/pizzas.js`

```
// MORE CODE
export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
```

* **note** filtering in gatsby
    - filtering in GraphQL is not uniform so you just have to figure it out per tool
* Let's find a match where the topping is "Pepperoni"

## GraphQL Playground
```
{
    {
      allSanityPizza(filter: {toppings: {elemMatch: {name: {in: "Pepperoni"}}}}) {
        nodes {
          name
          toppings {
            name
          }
        }
      }
    }
```

* Will give you this data:

```
{
  "data": {
    "allSanityPizza": {
      "nodes": [
        {
          "name": "Piggy Smalls",
          "toppings": [
            {
              "name": "Pulled Pork"
            },
            {
              "name": "Pepperoni"
            },
            {
              "name": "Bacon"
            },
            {
              "name": "Sausage"
            },
            {
              "name": "Onion"
            }
          ]
        }
      ]
    }
  },
  "extensions": {}
}
```

* Regex

```
{
  allSanityPizza(filter: {toppings: {elemMatch: {name: {regex: "/pep/i"}}}}) {
    nodes {
      name
      toppings {
        name
      }
    }
  }
}
```

### West Practice
* Use `in` if you know exactly what is being typed
* Use `regex` if the user is typing something in

## Here is our filter using `in`
```
// MORE CODE
export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(filter: { toppings: { elemMatch: { name: { in: $topping } } } }) {
      nodes {
        id
        name
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
```

## Tips on using regex
* You can't do this:
    - You can't interpolate values into a regex
    - You also can't create a string in JavaScript and pass it in either
    - This is a GraphQL template string and there is no way to interpolate a varaiable into an input (in our case a regex)
    - **note** String is not in an array and not required (vs `[String!]`)

```
// MORE CODE

export const query = graphql`
  query PizzaQuery($topping: String) {
    pizzas: allSanityPizza(filter: { toppings: { elemMatch: { name: { regex: "/$topping/i" } } } }) {

// MORE CODE
```

## How to pass in a Regex
* You would need to create the regex in JavaScript (in our gatsby-node.js)

```
// MORE CODE

  data.toppings.nodes.forEach((topping) => {
    console.log(`Creating page for topping`, topping.name);
    actions.createPage({
      // What is the URL for this new page??
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO: Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

// MORE CODE
```

* That shows you that onion and onions are both there (combined)
    - versus `in` has onion and `onions` as separate search results
    - fix: change the external data

## Highlight the active topping
`s/p/pizzas.js`

```
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

PizzasPage.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

// MORE CODE
```

* And we pass that prop into our `ToppingsFilter` query

`ToppingsFilter.js`

```
// MORE CODE
export default function ToppingsFilter({ activeTopping }) {
  
  // MORE CODE

  return (
    <ToppingsStyles>
      // MORE CODE

      <p>{activeTopping}</p>
      {toppingsWithCounts.map((topping) => (

      // MORE CODE

      ))}
    </ToppingsStyles>
  );
}

ToppingsFilter.propTypes = {
  activeTopping: PropTypes.string,
};
```

## Test
* Click on a topping and the text of the topping (current topping) appears on page

```
// MORE CODE

    <ToppingsStyles>
      {/* 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping */}
      {toppingsWithCounts.map((topping) => (
        // 5. Link it up
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>

// MORE CODE
```

* Fix the CSS error

`ToppingsFilter.js`

* Forgot the `&`

```
// MORE CODE

    &.active {
      background: var(--yellow);
    }

// MORE CODE
```

* But we don't even need this and can just use `aria-current` from gatsby!

```
// MORE CODE

    &[aria-current='page'] {
      background: var(--yellow);
    }

// MORE CODE
```

## Add all pizzas link
`ToppingsFilter.js`

```
// MORE CODE

    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>

// MORE CODE
```

* Now we have an all pizzas link that also highlights when it is the current page

## Next - Sourcing Data from an external API
