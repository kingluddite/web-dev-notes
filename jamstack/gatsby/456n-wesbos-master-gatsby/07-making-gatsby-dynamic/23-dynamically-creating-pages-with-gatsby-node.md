# Dynamically creating pages with gatsby-node
<!-- MarkdownTOC -->

- [\(gatsby-node.js\) gatsby node APIs](#gatsby-nodejs-gatsby-node-apis)
  - [createPages](#createpages)
- [Here is our plan](#here-is-our-plan)
- [Get a template for this page](#get-a-template-for-this-page)
- [We'll generate our pizza template](#well-generate-our-pizza-template)
- [Now we loop over each pizza and create a page for each pizza](#now-we-loop-over-each-pizza-and-create-a-page-for-each-pizza)
- [Create the pages for each pizza](#create-the-pages-for-each-pizza)
- [Test it out](#test-it-out)
  - [What is context?](#what-is-context)
- [Using our page as if it were a regular query](#using-our-page-as-if-it-were-a-regular-query)
  - [GraphQL](#graphql)
- [In GraphQL Playground](#in-graphql-playground)
- [Now we pass into our template](#now-we-pass-into-our-template)
- [Test it out for all pizza pages](#test-it-out-for-all-pizza-pages)
- [An alternative way to query dynamic data](#an-alternative-way-to-query-dynamic-data)
- [WEST PRACTICE on putting the template query inside the component?](#west-practice-on-putting-the-template-query-inside-the-component)
- [Let's finish with our Pizza query](#lets-finish-with-our-pizza-query)
- [Let's build it in GraphQL Playground first](#lets-build-it-in-graphql-playground-first)
- [Next - Put the data into the UI and style it](#next---put-the-data-into-the-ui-and-style-it)

<!-- /MarkdownTOC -->

* We don't want to manually create millions of pages
* We have all these toppings
    - If we had to manually create a page for each that would not be fun
* Also we have a Headless CMS that we want clients to update
    - They won't be creating pages
    - They just want to create content and that should create the pages dynamically

## (gatsby-node.js) gatsby node APIs
* https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
* Code in the file `gatsby-node.js` is run once in the process of building your site
* You can use its APIs to create pages dynamically, add data into GraphQL, or respond to events during the build lifecycle
* We will tap into the `createPages` "extension point" (think of it as a Hook)
  - This extension point is called only after the initial sourcing and transformation of nodes plus creation of the GraphQL schema are complete so you can query your data in order to create pages
  - [createPages docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages)
* We'll build a file in the `src/templates` folder to be the template used to create all these single pages
    + Because there is time involved we will build these pages using async/await

### createPages
* [docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages)
* Create pages dynamically. This extension point is called only after the initial sourcing and transformation of nodes plus creation of the GraphQL schema are complete so you can query your data in order to create pages

`gatsby-node.js`

```js
export async function createPages() {
  console.log('Create Page');
  console.log('Create Page');
  console.log('Create Page');
  console.log('Create Page');
}
```

* Restart gatsby and you'll see the log prints in the local build

![gatsby local build gatsby-node.js](https://i.imgur.com/N6hCiXh.png)

* You will see the logs appear after the sanity data has come and before we do our gatsby build (which is what we want to do so we can create pages in gatsby and put our sanity data inside it)

## Here is our plan
```js
async function turnPizzaIntoPages(params) {
  // 1. Get a template for this page
  //  2. query all pizzas
  //  3. Loop over each pizza and creete a page for that pizza
}

export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
```

## Get a template for this page
* We'll put templates inside a `templates` folder
* We'll call this template `Pizza.js`
    - We spell it with a capital letter
        + Why?
        + Because it can be reused multiple times
            * It is a class
            * And every install will be lowercase `pizza`
        + pages are lowercase because they are only used once

`src/templates/Pizza.js`

```js
export default SinglePizzaPage() {
  return <p>Single Pizza</p>
}
```

`gatsby-node.js`

* **note** Don't forget the `.js` extension
    - It is not an import, it is a file path resolution

```js
import path from 'path'; // node core

async function turnPizzaIntoPages(params) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  //  2. query all pizzas
  //  3. Loop over each pizza and creete a page for that pizza
}

// MORE CODE
```

* Call our function
    - We call `await` before calling turnPizzasInto pages because turnPizzasIntoPages is an async function and it will take several seconds to query all the data and create the pages for us
        + If we don't do the async await then createPages will run before we are done creating and we won't have our pages

```js
import path from 'path'; // node core

async function turnPizzaIntoPages(params) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  //  2. query all pizzas
  //  3. Loop over each pizza and creete a page for that pizza
}

export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzaIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
}

```

## We'll generate our pizza template
```js
// MORE CODE

import path from 'path'; // node core

async function turnPizzaIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  console.log(data);
  //  3. Loop over each pizza and creete a page for that pizza
}

// MORE CODE
```

* Restart gatsby
    - It will run and you'll see the log in the termial

![log in console](https://i.imgur.com/eOdmI4Y.png)

* While not pretty we can see there are pizzas showing up (1 for everyone in our sanity Database)

## Now we loop over each pizza and create a page for each pizza
* We will use `forEach()`
    - This is not a `map()` as we are just returning anything from this, we are just going off and doing some work with the data

```js
// MORE CODE

async function turnPizzaIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  console.log(data);
  //  3. Loop over each pizza and creete a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    console.log('Create a page for ', pizza.name);
  });
}

// MORE CODE
```

* And we can see we created our data and we are looping over it

![data looped over](https://i.imgur.com/7fU86Gm.png)

## Create the pages for each pizza
* We take in `actions`
* Note that `actions` was initially in the createPages `params`
    - actions has a createPage (singular) method
        + `actions.createPage()`

`gatsby-node.js`

```js
// MORE CODE

async function turnPizzaIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  console.log(data);
  //  3. Loop over each pizza and creete a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        wes: 'is cool',
        slug: pizza.slug.current,
      },
    });
  });
}
// MORE CODE
```

* Restart gatsby and click on toppings and you will see a page for each pizza has been created

## Test it out
* **note** Click on the pizza images (I was accidentilly clicking on the toppings :( )
* Use react dev tools to see that you can go to that single page and get all the props and you will see `pathContext` with the slug

### What is context?
* If you need to pass some data from this `createPage()` method (below) to the actual template
  - You can do that via `context`

`gatsby-node.js`

```js
// MORE CODE

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate
    });
  });

// MORE CODE
```

* Using context

```js
// MORE CODE

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        blablabla: 'this is neat!',
        slug: pizza.slug.current,
      },
    });
  });

// MORE CODE
```

![RDT shows page context](https://i.imgur.com/5fN15fb.png)

* **note** You could also get this info via the URL using parameters but this is the proper way to do by passing it page context
  - **note** on **note** The old deprectated property was `pathContext` and now we use `pageContext`

## Using our page as if it were a regular query
* We will interpolate variables into our query
* **note** the GraphQL query has access to all of our pageContext variables directly

### GraphQL
```js
{
  sanityPizza(slug: {
current: {
eq: "nacho-average-pizza"
}
  }) {
    name
    toppings {
      name
    }
  }
}
```

* Output

```js
{
  "data": {
    "sanityPizza": {
      "name": "Nacho Average Pizza",
      "toppings": [
        {
          "name": "Hot Peppers"
        },
        {
          "name": "Avocado Crema"
        },
        {
          "name": "Shredded Lettuce"
        },
        {
          "name": "Ground Beef"
        }
      ]
    }
  },
  "extensions": {}
}
```

* Use this in our `Pizza.js` template
  - The slug is a required string `String!`

## In GraphQL Playground
```js
query ($slug: String!) {
  pizza: sanityPizza(slug: {current: {eq: $slug}}) {
    name
    toppings {
      name
    }
  }
}
```

* Adding Query Variabels

```js
{
  "slug": "nacho-average-pizza"
}
```

## Now we pass into our template
`s/templates/Pizza.js`

```js
import { graphql } from 'gatsby';
import React from 'react';

export default function SinglePizzaPage() {
  return <p>Single Pizza</p>;
}

// this needs to be dynamic
// based on the slug passed in via context
// in gatsby-node.js
export const query = graphql`
  query ($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      toppings {
        name
      }
    }
  }
`;
```

* Where does the `slug` come from again?

`gatsby-node.js`

* From the context (we remove blablabla property as it is not needed)

```js
// MORE CODE

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current, // we get slug from here!
      },
    });
  });
}

// MORE CODE
```

## Test it out for all pizza pages
1. Click on any pizza
2. Inspect with RDV and you will see each page has a different current slug

![dynamic data is working](https://i.imgur.com/YapNrwh.png)

## An alternative way to query dynamic data
* Why don't we query the entire pizza here

`gatsby-node.js`

```js
// MORE CODE

async function turnPizzaIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  console.log(data);

// MORE CODE
```

* Then we can pass the entire pizza via context here:

```js
// MORE CODE

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

// MORE CODE
```

* Then we can skip this query here entirely

`Pizza.js`

```js
// MORE CODE
export const query = graphql`
  query ($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      toppings {
        name
      }
    }
  }
`;
```

## WEST PRACTICE on putting the template query inside the component?
* You can do that but because all your pages have to work like our `Pizza.js` query it seems to make sense to tighly couple the query with the template page
    - That way if you need to modify the page you can easily modify the query without having to jump back into your `gatsby-node.js`
* Another benefit of doing the query directly inside of your template is when you hit save the data for that page will immediately update
    - If you wrote your entire query in `gatsby-node.js` you'd have to kill your entire process and start it again
    - And if you have a large site, that can take minutes and makes building the site frustrating

## Let's finish with our Pizza query
* We need
  - id
  - image (fluid)
  - toppings
    + name
    + id
    + vegetarian (boolean)

## Let's build it in GraphQL Playground first
```
query ($slug: String!) {
  pizza: sanityPizza(slug: {current: {eq: $slug}}) {
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
```

* We see our data is working
* Copy and paste into Pizza query

`Pizza.js`

## Next - Put the data into the UI and style it
