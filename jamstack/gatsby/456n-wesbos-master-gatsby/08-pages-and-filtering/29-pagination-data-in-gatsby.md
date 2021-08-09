# Paginating Data in Gatsby
<!-- MarkdownTOC -->

- [Gatsby paginates differently](#gatsby-paginates-differently)
  - [Example](#example)
- [We will add these settings in our environment variables](#we-will-add-these-settings-in-our-environment-variables)
- [And we now will surface GATSBY_PAGE_SIZE in gatby](#and-we-now-will-surface-gatsby_page_size-in-gatby)
- [Wait! Won't that also surface my secret Sanity environment variable too?](#wait-wont-that-also-surface-my-secret-sanity-environment-variable-too)
- [Wes says to add this to .env](#wes-says-to-add-this-to-env)
- [New function to turn slicemasters into pages](#new-function-to-turn-slicemasters-into-pages)
- [1. Query all slicemasters](#1-query-all-slicemasters)
  - [Add to our function gatsby-node.js](#add-to-our-function-gatsby-nodejs)
- [3. Determine how many pages](#3-determine-how-many-pages)
- [4. Loop from 1 to n \(n = number of pages we have\)](#4-loop-from-1-to-n-n--number-of-pages-we-have)
  - [How to you loop through from 1 to 3?](#how-to-you-loop-through-from-1-to-3)
- [Restart Gatsby](#restart-gatsby)
- [So we change the number of slicemasters per page to 2](#so-we-change-the-number-of-slicemasters-per-page-to-2)
- [Next](#next)

<!-- /MarkdownTOC -->

* Slightly different than traditional site generate on demand

`localhost:8000/slicemasters?page=3`

## Gatsby paginates differently
* But gatsby does it differently becaue it is all pregenerated at build time
    - So we need to know at build time how many pages there are

### Example
* We'll do this in `gatsby-node.js`
    - If we have 10 people and 2 per page
    - Then we need 5 pages
        + slicemasters
        + slicemasters/2
        + slicemasters/3
        + slicemasters/4
        + slicemasters/5
    - And those pages need to be generated ahead of time

## We will add these settings in our environment variables
* These environmental variables will show how many are on each page
    - We could also put this file on a JavaScript file in settings.js (as an example)
* We will also show how to add these environmental variables in our `.env` file and "surface" them to Gatsby
    - **Note** To surface an environmental variable in Gatsby you must preface it with:
        + `GATSBY_`
            * `GATSBY_PAGE_SIZE=4`

`.env`

```js
// MORE CODE

SANITY_TOKEN=YOURKEYHERE
GATSBY_PAGE_SIZE=4

// MORE CODE
```

## And we now will surface GATSBY_PAGE_SIZE in gatby
`slicemasters.js`

* **note** You need to kill gatsby and restart
* You will see `4` on the slicemasters page when you refresh it

## Wait! Won't that also surface my secret Sanity environment variable too?
* No!
    - If you try to show `process.env.SANITY_TOKEN` you won't see it
* You only surface environment variables that are prefaces with `GATSBY_`

## Wes says to add this to .env
* I slacked the Wes Gatsby channel if this was still necessary as I don't see any updates about it online other than a plugin
    - https://www.gatsbyjs.com/docs/reference/local-development/fast-refresh/
        + Ways says it speeds up gatsby a lot and css refreshes are even better

```js
GATSBY_HOT_LOADER=fast-refresh
```

* **note** Any changes to `.env` requires a gatsby restart

## New function to turn slicemasters into pages
```js
// MORE CODE

async function turnSlicemastersIntoPages({ graphql, actions }) {
  //
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  await Promise.all([turnPizzasIntoPages(params), turnToppingsIntoPages(params), turnSlicemastersIntoPages(params)]);
  // 2. Toppings
  // 3. Slicemasters
}

// MORE CODE
```

* **note** Wes slack channel said I could remove this from `.env`

`GATSBY_HOT_LOADER=fast-refresh`

## 1. Query all slicemasters
* DO this in GraphQL Playground

```js
query MyQuery {
  allSanityPerson {
    nodes {
      name
      slug {
        current
      }
      _id
    }
    totalCount
  }
}
```

### Add to our function gatsby-node.js

```js
// MORE CODE

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      allSanityPerson {
        nodes {
          name
          slug {
            current
          }
          _id
        }
        totalCount
      }
    }
  `);
  // 2. TODO: turn each slicemaster into their own page
  // 3. Determine how many pages ther are based on how many
  //       slicemasters there are, and how many per page?
  //       example: 10 / 2 = 5
  // 4. Loop from 1 to n (n = number of pages we have)
  // 5. modify slicemasters.js query to accept argument to only pull 4 records at a time
  //       and skip over items to make the pagination functional
}

// MORE CODE
```

## 3. Determine how many pages
* There are based on how many slicemasters there are, and how many per page?
    - **warning!** Data from environment variables come in as a string (not a number!)

```js
// MORE CODE

  const pageSize = process.env.GATSBY_PAGE_SIZE;

// MORE CODE
```

* So make sure to convert to a number

```js
// MORE CODE

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);

// MORE CODE
```

* Now we need to figure out the amount of pages we need
    - We'll round up (ceil)
    - round up(how many people there are / how many people per page)

`gatsby-node.js`

```js
// MORE CODE

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `There are ${Math.ceil(
      data.slicemasters.totalCount
    )} total pages. And we have ${pageCount} pages with ${pageSize} per page.`
  );

// MORE CODE
```

* You will get this output when you run the gatsby
    - This shows we have the three pieces of data we need to perform pagination

```
There are 11 total pages. And we have 3 pages with 4 per page.
```

## 4. Loop from 1 to n (n = number of pages we have)
* We loop through total pages needed and create a page for each

### How to you loop through from 1 to 3?
* Let's do this in Chrome Dev Tools (CDT) - (prefaced with `>` )
`> Array.from({ length: pageCount })`

* That will give you an array of pageCount (5) slots):

`[undefined, undefined, undefined, undefined, undefined]`

* We'll forEach over that array
    - We don't care about the first argument (slot)
    - But we want the second argument (index)

`Array.from({length: 5}).forEach((_, i) => console.log(i))`

* Will loop out from 0 to 5
    - But we'll need to add 1 (to start from 1)
    - **note** we don't care about the `undefined` in the array and it is common for developers to put an underscore as a placeholder (wes calls it a garbage variable because we won't use it)

## Restart Gatsby
* You should see in the build terminal
    - This shows we created 3 pages
    - Go to a 404 page and you'll see the 3 pages that were creates (the urls)
        + View `SlicemastersPage` for each page
            * `http://localhost:8000/slicemasters/2`
                - View the page context for this and other pages and you'll see:
                    + pageSize
                    + skip (will be different per page)
                    + totalPages
        * If you change the `.env` from 4 to 2, 5 pages will be created instead of 3

`GATSBY_PAGE_SIZE=2` (we changed it to 2) - run again and see how more pages are created

![pages created for slicemasters](https://i.imgur.com/b4WV7NN.png)

```js
// MORE CODE

Creating page 0
Creating page 1
Creating page 2
// MORE CODE
```

```js
// MORE CODE

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          name
          slug {
            current
          }
          _id
        }
        totalCount
      }
    }
  `);
  // 2. TODO: turn each slicemaster into their own page
  // 3. Determine how many pages ther are based on how many
  //       slicemasters there are, and how many per page?
  //       example: 10 / 2 = 5
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `There are ${Math.ceil(
      data.slicemasters.totalCount
    )} total pages. And we have ${pageCount} pages with ${pageSize} per page.`
  );
  // 4. Loop from 1 to n (n = number of pages we have)
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      // What is the URL for this new page??
      path: `slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template when we create it
      context: {
        skip: i * pageSize, // how many people should we skip? (if we are querying 4 slicemasters but we are on page 2, we need to tell it give me 4 but skip the first 4),
        currentPage: i + 1,
        pageSize,
      },
    });
  });
  // 5. modify slicemasters.js query to accept argument to only pull 4 records at a time
  //       and skip over items to make the pagination functional
}
 // MORE CODE
```

## So we change the number of slicemasters per page to 2

## Next
* We will modify the slicemasters page query
    - So that it takes the incoming context
    - And our pagination works so we get 2 different slicemasters on each page
