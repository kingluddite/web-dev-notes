# Static Queries and Building the Toppings Filter
<!-- MarkdownTOC -->

- [Create filter](#create-filter)
- [Next - Stuff we need to do to get our filter working](#next---stuff-we-need-to-do-to-get-our-filter-working)
  - [Before we exported a query from a page](#before-we-exported-a-query-from-a-page)
- [Gatsby Rule - If you want to query data anywhere else outside of a page \(like inside a component\) you MUST use a `Static Query`](#gatsby-rule---if-you-want-to-query-data-anywhere-else-outside-of-a-page-like-inside-a-component-you-must-use-a-static-query)
  - [Write a query that gets all the toppings](#write-a-query-that-gets-all-the-toppings)
  - [alias to save having a stroke on keystrokes `:)`](#alias-to-save-having-a-stroke-on-keystrokes-)
- [Stylelint aside](#stylelint-aside)
- [Now we need to get all our pizzas](#now-we-need-to-get-all-our-pizzas)
- [WEST PRACTICE - Logging out 2 things and giving them names](#west-practice---logging-out-2-things-and-giving-them-names)
- [Now we need to count how many pizzas are in each topping](#now-we-need-to-count-how-many-pizzas-are-in-each-topping)
  - [WEST PRACTICE](#west-practice)
- [Returning our pizzas with counts](#returning-our-pizzas-with-counts)
- [Now filter to get return the count we want](#now-filter-to-get-return-the-count-we-want)
- [Next](#next)

<!-- /MarkdownTOC -->

## Create filter
* You click the filter and show only those pizzas that have those toppings

`components/ToppingsFilter.js`

```js
import React from 'react';

export default function ToppingsFilter() {
  return (
    <div>
      <p>Toppings</p>
    </div>
  );
}
```

* Add to our pizzas page

```js
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

// MORE CODE
```

## Next - Stuff we need to do to get our filter working
* **note** Now we enter the topic of gatsby "Static Queries"

1. Get a list of all the toppings
2. Get a list of all the pizzas with their toppings
3. Count how many pizzas are in each topping
4. Loop over the list of toppings and display the topping and the count of pizzas in that topping
5. Link it up

### Before we exported a query from a page
`pizzas.js`

* We could also pass variables into the page query to make it dynamic

```js
// MORE CODE
PizzasPage.propTypes = {
  data: PropTypes.object,
};

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

## Gatsby Rule - If you want to query data anywhere else outside of a page (like inside a component) you MUST use a `Static Query`
* **note** Static Queries are queries that DO NOT TAKE variables
* This is a gatsby limitation
* If you need the query to be dynamic, then you must do the query at a page level and then pass the data down (prop drilling in React parlance)
* If it is just a static query that has no variables passed into it you can run that wherever you want using a React Hook
* **notes**
    - `useStaticQuery` comes from gatsby
    - `graphql` comes from gatsby

```js
// MORE CODE

import {graphql, useStaticQuery} from 'gatsby';

// MORE CODE
```

### Write a query that gets all the toppings
* Use GraphQL Playground

```
{
  allSanityTopping {
    nodes {
      name
      id
      vegetarian
    }
  }
}
```

* Run and you'll see all the toppings data
* **note** Sanity does not pluralize data types `allTopping => allToppings` but Sanity does not do this `:(`

### alias to save having a stroke on keystrokes `:)`
* And we log out to make sure we get the data we expect (toppings) in the browser console

```js
// MORE CODE

export default function ToppingsFilter() {
  // 1. Get a list of all the toppings
  const toppings = useStaticQuery(graphql`
    {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
    }
  `);
  console.log(toppings);


// MORE CODE
```

* When we see our console we get this:

![toppings.toppings](https://i.imgur.com/MVjR7HI.png)

* We don't want `toppings.toppings` so we should have named our data `data`

```js
// MORE CODE

export default function ToppingsFilter() {
  // 1. Get a list of all the toppings
  const data = useStaticQuery(graphql`

// MORE CODE
```

* And then destructure it to `toppings`
    - This will gives us all our toppings inside `nodes`

```js
// MORE CODE

export default function ToppingsFilter() {
  // 1. Get a list of all the toppings
  const { toppings } = useStaticQuery(graphql`
    {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
    }
  `);
  console.log(toppings);

// MORE CODE
```

## Stylelint aside
* How to ignore a line (didn't know how to solve this stylint error)

```js
// MORE CODE

const PizzaStyles = styled.div`
  display: grid;

  /* Take your row sizing not from the pizzaStyles div, but from the PizzaGridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  /* stylelint-disable */
  grid-template-rows: var(--rows, subgrid);
  /* stylelint-enable */

// MORE CODE
```
## Now we need to get all our pizzas
* We add another Static query and log both out

```js
// MORE CODE

export default function ToppingsFilter() {
  // 1. Get a list of all the toppings
  // 2. Get a list of all the pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
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
  console.log(toppings, pizzas);

// MORE CODE
```

## WEST PRACTICE - Logging out 2 things and giving them names
* Instead of `console.log(toppings, pizza)`

![no names](https://i.imgur.com/5W3AUed.png)

* Wrap them in an object like this:

`console.log({toppings, pizza})`

* Which gives you names!

![we have names](https://i.imgur.com/sBP75lC.png)

* **note** This is not a special `console.log()` it is just good 'ole fashioned (or really modern lol) es6 where the name of the object is the same as the property so:

`console.log({ toppings: toppings, pizzas: pizzas })`

## Now we need to count how many pizzas are in each topping

### WEST PRACTICE
* Clear your console before hot reloading
    - Otherwise your console is always cluttered with old data and you have to scroll forever

```js
console.clear();
console.log({ toppings, pizzas });
```

## Returning our pizzas with counts
```js
// MORE CODE

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  // 3. Count how many pizzas are in each topping
  console.log(pizzas);
}

export default function ToppingsFilter() {
  // 1. Get a list of all the toppings
  // 2. Get a list of all the pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
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
  // 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // 5. Link it up

  return (
    <div>
      <p>Toppings</p>
    </div>
  );
}
```

## Now filter to get return the count we want
* This will give us an array of arrays

```js
// MORE CODE

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  // console.log(pizzas);
  return pizzas.map((pizza) => pizza.toppings);
}

// MORE CODE
```

* And the nested array will be the pizza toppings

![array of arrays of toppings](https://i.imgur.com/XhDI9Cq.png)

* Now we need to make one big array of every single topping
    - Easily done with `flat()`
        + What does `flat()` do?
            * It takes an array of arrays and turns it into one really big array
* Now below will give us an array of 49 toppings

```js
// MORE CODE

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  // console.log(pizzas);
  return pizzas.map((pizza) => pizza.toppings).flat();
}

// MORE CODE
```

![array of 49 toppings](https://i.imgur.com/l3jUWjJ.png)

* Now we add up all the unique toppings
* We'll start with an empty object
* If the topping doesn't exist add the topping with a value of 1
* If the topping exists, just increment the topping value by 1

```js
// this will get us all the unique toppings and counts
function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  // console.log(pizzas);
  return pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is, increment by 1
        existingTopping.count += 1;
      }
      // else create a new entry in our acc and set it to 1
      else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {}); // we set our initial value to an empty object
}
```

![topping counts](https://i.imgur.com/O3b8p7E.png)

* Now we want to assort his object in descending order by toppings

```js
// MORE CODE

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  // console.log(pizzas);
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is, increment by 1
        existingTopping.count += 1;
      }
      // else create a new entry in our acc and set it to 1
      else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {}); // we set our initial value to an empty object
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count);
  return sortedToppings;
}

// MORE CODE
```

* And That will give us the sorted toppings in descending order

![sorted toppings desc](https://i.imgur.com/1X7awQt.png)

* Now we need to loop over the array and show them

```js
// MORE CODE

  return (
    <div>
      {/* 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping */}
      {toppingsWithCounts.map((topping) => (
        // 5. Link it up
        <Link>{topping.name}</Link>
      ))}
    </div>
  );
}

// MORE CODE
```

* Will give us all the toppings

![all the toppings](https://i.imgur.com/HC2ScOc.png)

* Add the link to the topping page
    - We'll use `topping/NAME_OF_TOPPING`
    - If there is a space in the name the space will be URL encoded
    - Click on "Ground Beef" topping and you'll see URL encoding of space like `http://localhost:8000/toppings/Ground%20Beef`
        + These single topping pages don't exist yet (but will)
    - **REACT RULE** Anytime you map over something you need to provide a unique `key` prop value for the react virtual DOM to update efficiently
        + **note** The immediate child of the `map()` needs a `key` prop

```js
// MORE CODE
  return (
    <div>
      {/* 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping */}
      {toppingsWithCounts.map((topping) => (
        // 5. Link it up
        <Link key={topping.id} to={`/toppings/${topping.name}`}>
          {topping.name}
        </Link>
      ))}
    </div>
  );
}
```

* Add more content and tags to render
    - Now we have
        + name
        + count

```js
// MORE CODE
  return (
    <div>
      {/* 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping */}
      {toppingsWithCounts.map((topping) => (
        // 5. Link it up
        <Link key={topping.id} to={`/toppings/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </div>
  );
}
```

* Style our toppings

```js
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
`;

 // MORE CODE

  return (
    <ToppingsStyles>
      {/* 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping */}
      {toppingsWithCounts.map((topping) => (
        // 5. Link it up
        <Link key={topping.id} to={`/toppings/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
```

![styled toppings](https://i.imgur.com/1NVXKRp.png)

* Style the links and the count

```js
// MORE CODE

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center; /* helps vertically align counts */
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;

    .count {
      background: var(--white);
      padding: 2px 5px;
    }

    .active {
      background: var(--yellow);
    }
  }
`;

// MORE CODE
```

![styled with counts](https://i.imgur.com/uOsEWuu.png)

## Next
* How do we dynamically create the pages for:
    - pizza
    - topping
