# Styling our Grid using CSS subgrid
`PizzaList.js`

* **note** In css grid you can use `gap` instead of `grid-row` or `column-row`
    - The older version was `grid-column-gap` and `grid-row-gap`
    - You can also use `gap` for flexbox

```
// MORE CODE

import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
`;

// MORE CODE

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}

// MORE CODE
```

## We have a problem
* Our images won't always be aligned (and they are not now)
* This is common when clients are uploading files
* We also have a problem where our toppings could be 2 or 1 line
* With nothing lined up, this is a problem

### Solution
* We need to specify the rows of the grid
    - row 1 will be the `title`
    - row 2 will be the `ingredients`
    - row 3 will be the `image`
    - then we start again
    - * **note** We will not specifically state those rows because they are automatically generated rows in css grid
        + But we can specify the automatically generated sizes doing this:
* We now say
    - The first `auto` (title)
    - The second `auto` (ingredients)
    - The third `500px` (the image) 

```
  grid-auto-rows: auto auto 500px;
```

* And here is our code (it won't have any affect yet)

```
// MORE CODE

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

function SinglePizza({ pizza }) {

// MORE CODE
```

* Why no change?
    - We put the rows on the pizza grid that surrounds all the
    - But the items we really want to are not direct children of our grid they are children of a single pizza

* This is our css grid

```
// MORE CODE

    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>

// MORE CODE
```

* But the items we want to align are:
    - h2
    - p
    - img
    - (see below)

```
// MORE CODE

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </div>
  );
}

// MORE CODE
```

* We need to tell h2, p and img to align themselves not based on their `parent` `<div>` but based on the grandparent
    - What is sub grid again?
        + It is when children elements of another child will align themselves with a grandparent grid
        + **note** We altered our `Link` so it only surrounds the `h2`

## Make another style for a single pizza
* This starts to work but our images are different sizes and not lining up

```
// MORE CODE

const PizzaStyles = styled.div`
  display: grid;
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}

// MORE CODE
```

## Subgrid only works in firefox
```
I kept watching Wes using Firefox and wondered why. And then it hit me when I was struggling to get subgrid to work in Chrome (In his #19 "Styling our Pizza Grid with CSS subgrid") and it wasn't working.
Then I said hmmm. Maybe other browsers don't like subgrid yet?
And that's when I saw that Chrome (and everyone else) is not using subgrid yet :disappointed:
https://caniuse.com/?search=subgrid
```

## But we can use a backup for browsers that don't support grid
* the beauty of `@supports not (grid-template-rows: subgrid) {...}`

```
// MORE CODE

const PizzaStyles = styled.div`
  display: grid;

  /* Take your row sizing not from the pizzaStyles div, but from the PizzaGridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: auto auto 1fr;
  }
  grid-template-rows: subgrid;
  grid-row: span 3;
  grid-gap: 1rem;

  h2,
  p {
    margin: 0;
  }
`;

// MORE CODE
```

* We could also define a CSS custom properties (aka variables)
    - Stick that in the logic of our `@supports not() {}`
    - If the browser doesn't support that property the variable will be defined and used later on, otherwise, the value of `subgrid` will be used

#
```
// MORE CODE

const PizzaStyles = styled.div`
  display: grid;

  /* Take your row sizing not from the pizzaStyles div, but from the PizzaGridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;

  h2,
  p {
    margin: 0;
  }
`;

// MORE CODE
```

## Create the Toppings filter
