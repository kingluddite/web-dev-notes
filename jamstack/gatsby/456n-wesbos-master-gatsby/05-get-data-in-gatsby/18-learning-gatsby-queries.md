# Gatsby Queries
## Page Queries
* Can be dynamic with variables
* Can only be run on a top level page
    - If you want to have variables in your query, it HAS TO HAPPEN AT A PAGE LEVEL (limitation of gatsby)

## Static Queries
* Can not be dynamic, no variables can be passed in
* Can be run anywhere

## More About Page Queries
* How do you specify a page query?
    - You just export a query from the page and Gatsby is smart enough to recognize that it is a query and it will go and get that data for us when we run the build and then it will pass it to our page component

`pages/pizzas.js`

```js
import React from 'react';

export default function PizzasPage() {
  return (
    <>
      <p>The pizzas page</p>
    </>
  );
}

export const query = graphql``;
```

* Is there anything special about `query` name?
    - No
    - You will also see `pageQuery` used
    - It doesn't matter what you call it
    - All that matters is that if you are exporting something that is a GraphQL query it will then turn that into data for you
    - **note** Make sure to auto-import it

`pizzas.js`

* auto-import pulls in the `graphql` named export

```js
import React from 'react';
import { graphql } from 'gatsby'; // ADD this!

// MORE CODE
```

## A name or not a name
* You may see this - no name
```js
// MORE CODE

export const query = graphql`
 query {
   
 }
`;
```

* You may see a name (I like this)
    - It's good to have names for GraphiQL history

```js
// MORE CODE
export const query = graphql`
 query PizzaQuery {

 }
`;
```

* You don't need parentheses unless you are filtering

```js
// MORE CODE
export const query = graphql`
 query PizzaQuery() { // NO NEED FOR PARENTHESEES HERE

 }
`;
```

## GraphQL
* **note** You can't say "give me everything" you have to be specific with what you want
    - This can be tedious but that is what `fragments` are for
    - We will use a `fragment` for our images
        + These fragments come with the sanity plugin we used

### Gatsby fragments
* **note** Fragments do not currently work in GraphiQL
    - **UPDATE** Looks like they are working now!!!!
    - min 7 of video Wes shows Gatsby Fragment not working
    - Just use `src` in GraphiQL and when you are in your top level pages, then use the fragments

### Name your page components
* You will need to find your page components so name them
    - Then finding them with React Dev Tools is easy 
    - **tip** It is important to name you page components
* Search (spelling is important)
    - Navigate to Pizzas page
    - Search for `PizzasPage`

## Renaming queries (aliases in GraphQL)
* Some of the names are lame
* We can rename them to whatever we want (something easier to type)
* Let's rename `allSanityPizza` to `pizzas` by doing this:

```js
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

* Refresh
    - Now we see `pizzas` instead of `allSanityPizzas`

## Now how can we gain access to our data in our Gatsby react component
* Through props
* **note** this is a little bit of Gatsby magic
    1. Gatsby will recognize that you have exported a GraphQL component from the page
    2. Then it will run it behind the scenes
    3. And then it will stick it into props data

### Test it out
* Clear console
* Refresh page
* You will see props and data inside props (named pizzas)

`src/pages/pizzas.js`

* Now you'll see we have `pizzas` directly in our console

```js
import { graphql } from 'gatsby';
import React from 'react';

export default function PizzasPage(props) {
  console.log(props);

  return (
    <>
      <p>Pizzas Page</p>
    </>
  );
}

// MORE CODE
```

* And we can log out `props.data.pizzas`

### We also add PropTypes
`src/pages/pizzas.js`

```js
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

export default function PizzasPage({ data }) {
  console.log(data.pizzas);

  return (
    <>
      <p>Pizzas Page</p>
    </>
  );
}

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

## Destructure even further
* But this is harder to read

```js
// MORE CODE

export default function PizzasPage({ data: { pizzas } }) {
  console.log(pizzas);

// MORE CODE
```

* And now we have access to `nodes`
* **Wes Preference** He just likes to destructure one level deep

## We'll use this (as it was before)
```js
// MORE CODE

export default function PizzasPage({ data }) {
  console.log(data);

// MORE CODE
```

* Output our pizzas number

```js
// MORE CODE

export default function PizzasPage({ data }) {
  console.log(data);

  return (
    <>
      <p>There are {data.pizzas.nodes.length} Pizzas!</p>
    </>
  );
}

// MORE CODE
```

* But we could use this to clean it up

```js
// MORE CODE

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <p>There are {pizzas.length} Pizzas!</p>
    </>
  );
}

// MORE CODE
```

## To load or not to load
* In other react courses we have to worry about data loading
* Not with Gatsby!
    - In gatsby we can just use the data
    - That is the beauty of gatsby and the jam stack
    - There is never a loading state in gatsby because it is all prebuilt
        + Before the page even renders, the data will be there
        + **note** This is very similar to how server side rendering works (SSR) because it just happens at build time rather than render time
        + This means we never need spinners because the data will always be there!
        + The page will never be rendered until the data is there
        + And in build time, the pizzas will be there and then we'll ship it off to the server

## Now build a component that will display all the pizzas that we have
* We could do this all inside our page
* **West Practice** (combo of best and wes practice :) ) - Keep your pages as thin as possible
    - In pages
        + You have your queries
        + Then block out the pieces you want

### PizzaList
`components/PizzaList.js`

```js
import React from 'react';

export default function PizzaList() {
  return <p>list of pizzas</p>;
}
```

* Pull that into our pizzas.js page

`src/pages/pizzas.js`

```js
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <PizzaList />
    </>
  );
}

// MORE CODE
```

* Pass our pizzas down as props

```js
// MORE CODE

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <PizzaList pizzas={pizzas} />
    </>
  );
}

// MORE CODE
```

* And show the pizzas in our PizzaList

```js
// MORE CODE

import React from 'react';
import PropTypes from 'prop-types';

export default function PizzaList({ pizzas }) {
  return <p>There are {pizzas.length} pizzas</p>;
}

PizzaList.propTypes = {
  pizzas: PropTypes.array,
};

// MORE CODE
```

## Loop over pizzas and show the names we have

```js
// MORE CODE

import React from 'react';

export default function PizzaList({ pizzas }) {
  return pizzas.map((pizza) => <p>{pizza.name}</p>);
}

// MORE CODE
```

### Adding a div
```js
import React from 'react';
import PropTypes from 'prop-types';

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <p>{pizza.name}</p>
      ))}
    </div>
  );
}

PizzaList.propTypes = {
  pizzas: PropTypes.array,
};
```

## West Practice
* Anytime you have a grid of items and then a singular item you should almost always make both a separate item for the grid and the item
* We will keep it in this page (unless it gets too long)
* We won't export it as we'll just use it in this page
    - Some people will say why not in it's own component?
        + Wes thinks that's too confusing
        + He will keep it in this component unless he finds himself using this component in multiple other places

## West Practice
* Give it a "hot supper refresh"

```js
import React from 'react';
import PropTypes from 'prop-types';

function SinglePizza({ pizza }) {
  return <p>{pizza.name}</p>;
}

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <SinglePizza pizza={pizza} />
      ))}
    </div>
  );
}

PizzaList.propTypes = {
  pizzas: PropTypes.array,
};

SinglePizza.propTypes = {
  pizza: PropTypes.object,
};
```

## Fixing the "each child in a list should have a unique 'key' prop" error
* Anytime you map over something you must give the individual item a unique key so the react virtual dom can keep track of it and update it quickly
* And that's why we queried for the `id` of the pizza because that is the perfect use case for an `id`

```js
// MORE CODE

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

// MORE CODE
```

## How can you tell if the error you see is yours or gatsbys?
* If the actual error is coming from one of your components (versus some junk inside of gatsby)

### Working on the individual pizzas
* We'll use Link to link to the individual pizza
    - Using the `slug.current`
    - How to know you need that
        + Use dev tools and search for `SinglePizza` and you will see slug > current

```js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>{pizza.name}</h2>;
      </Link>
    </div>
  );
}

// MORE CODE
```

## You see links
* But you click and you get the 404 page
* We'll take care of that later by dynamically created pages
    - We don't want to create these single pizza pages inside the pages folder because we would have to create thousands of pages manually and that would... suck

## Add toppings
* We get all the toppings right after each other

```js
// MORE CODE

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name)}</p>
      </Link>
    </div>
  );
}

// MORE CODE
```

## Using the chrome console for some coolness
* What did we just do?
    - We just took the list of toppings, mapped over it, and returned just the topping name

### Let's use the console and show what we did
* Use React Dev tools to search for a SinglePizza
* Click on that SinglePizza component
* Click on console tab
* Type `$r`
* That gives us the currently selected component in react dev tools
* `$r.props.pizza`
* `$r.props.pizza.toppings.map(topping => topping.name)`
    - That will show you an array of all the toppings
    - Then we can run `join('xxx')` on it with anything we want in between and we just want commas so:
    - `$r.props.pizza.toppings.map(topping => topping.name).join(', ')`
        + This saves us from having to wrap them each in `<span>`


```js
// MORE CODE
function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      </Link>
    </div>
  );
}
// MORE CODE
```

## Next
* Get images showing up
