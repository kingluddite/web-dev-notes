# Gatsby-Node
* Here we set up our Node file
    - It gives us access to the Node API during the build process
* **IMPORTANT** Any times we make changes to `gatsby-node.js` we must restart the server
* **note** In `gatsby-node.js` **name** and **location** is very important

## Where do I save `gatsby-node.js`?
* In the root
* It must be named `gatsby-node.js`

## Syntax in `gatsby-node.js` will be written in Node
* `gatsby-node` will return a function with the name of `createPage`
* **note** createPages MUST return a Promise

### This gives us two options
1. We can return a Promise explicitly in the function body
2. Or I can set it up as async/await (which means we'll right away/automatically return a Promise) ---- We'll choose this way

### We have access to two arguments
* `graphql` (function - we used this before but the syntax will differ because we are writing Node.js) and `actions` (object)

#### Destructuring
* We need to do more destructuring from our `actions` object
    - We could do this destructuring in the argument but it will be more clear doing the destructuring in a new line
    - We will destructure the singular `createPage` (and that is from the actions object and not `createPages` which we are exporting)

`gatsby-node.js`

```
// create pages dynamically
exports.createPages = async ({graphql, actions}) => {
  const { createPage } = actions;
}
```

## Now we'll evoke our GraphQL
* In node our syntax will change from

```
graphql``
```

* To this:

```
graphql(``)
```

### Now we'll add our query
* We'll give it a different name
* And we'll add an alias to make it easier to type out in gatsby-node.js (we don't have to keep typing `allContentfulProduct`)

* sandbox

```
query GetProducts {
  products:allContentfulProduct {
    nodes {
      slug
    }
  }
}
```

* And our data response

```
{
  "data": {
    "products": {
      "nodes": [
        {
          "slug": "black-mattress"
        },
        {
          "slug": "leather-sofa"
        },
        {
          "slug": "sectional-sofa"
        }
      ]
    }
  }
}
```

* Then we copy and paste our query

`gatsby-node.js`

```
// create pages dynamically
exports.createPages = async ({graphql, actions}) => {
  const { createPage } = actions;
      graphql(`query GetProducts {
        products: allContentfulProduct {
          nodes {
            slug
          }
        }
      }
    `)
}
```

* **note** Since `graphql` returns a Promise we could chain on `.then()`
    - But since we are using `async/await` we can use use `await`

```
// create pages dynamically
exports.createPages = async ({graphql, actions}) => {
  const { createPage } = actions;
  const result =  await graphql(`query GetProducts {
        products: allContentfulProduct {
          nodes {
            slug
          }
        }
      }
    `)
}
```

## Let's test to make sure we are getting back our data result (same as before)
* We'll use a log
* We'll use `####` to see it in our TERMINAL console better
* We'll use `JSON.stringify()` to make our JSON a string
* **NOTE** Make sure to stop and restart your server

```
// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query GetProducts {
      products: allContentfulProduct {
        nodes {
          slug
        }
      }
    }
  `);
  console.log('########');
  console.log(JSON.stringify(result));
  console.log('########');
};
```

![data inside terminal console](https://i.imgur.com/Vkrkstd.png)

## Now we tested and proved the data is the same
* We need to iterate over my nodes array
* As we iterate over each item in our nodes array, we will be creating a new page
* **note** We don't want to modify any data so we won't use the `map()` method of arrays but instead we'll use the `forEach()` array method

### How can I access `nodes`?
* Use `MYVARIABLE.data.products.nodes`
* Naming is `path`, `component` and `context` is required (don't change their names)
* It is better to nest folder because it adds a bit more structure
* **component** We want to point to our page
    - We need absolute path so we'll use a node module (**path** - it comes preinstalled with Node - we still need to require it)

`gatsby-node.js`

```
const path = require('path');

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query GetProducts {
      products: allContentfulProduct {
        nodes {
          slug
        }
      }
    }
  `);
  result.data.products.nodes.forEach((product) => {
    createPage({
      path: `/products/${product.slug}`,
      component: path.resolve(`src/templates/product-template.js`),
      context: {
        slug: product.slug,
      },
    });
  });
};
```

* Restart node
* If you see errors make sure your code is correct
* To see if we are successful we need to browse to a 404 page (only in development) and you'll see the new pages are created
    - Because we already had a file named after a slug that page won't be created and we'll need to delete that and run again

![3 pages created](https://i.imgur.com/94Rklky.png)

## How are we going to be accessing the variable?
* We have access to our React `props` object every time we are creating a new page

```
import React from 'react';

const productTemplate = (props) => {
  console.log(props);
  return <h1>Hello from product template</h1>;
};

export default productTemplate;
```

* Then browse to one of the pages that was created
* Open console
* Then expand `pageContext` you will see `{slug: "black-mattress"}`
* Navigate to the other 2 created product pages and you'll see the slug is `unique` for that page

### Here's how it works
1. We have our array
2. We iterated over the array (with forEach)
3. We use the template to set up a template for each of the pages
4. But in order to get that specific data we will use that `slug` (that we are passing in as a variable of slug)

## Not covered yet
* We have yet to discuss how we can set up our page queries with variables but affectively in our template we will have a page query that accepts variables and then for each and every item we have in the list we'll just fetch specific data about that product
