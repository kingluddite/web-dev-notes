# Sourcing data from an external
<!-- MarkdownTOC -->

- [What if we want to pull data into from another place? \(API\)](#what-if-we-want-to-pull-data-into-from-another-place-api)
- [Sample APIs!](#sample-apis)
- [How do we get this API data into our gatsby GraphQL API?](#how-do-we-get-this-api-data-into-our-gatsby-graphql-api)
- [Sourcing Nodes](#sourcing-nodes)
    - [What we need to do](#what-we-need-to-do)
- [Watch out for this error](#watch-out-for-this-error)
- [Run gatsby](#run-gatsby)
- [Let's get our beers!](#lets-get-our-beers)
    - [Is fetch a node API?](#is-fetch-a-node-api)
        - [How can I use fetch in node?](#how-can-i-use-fetch-in-node)
- [Let's test if we can pull in beers now](#lets-test-if-we-can-pull-in-beers-now)
    - [Fix - await!](#fix---await)
    - [Create a GraphQL query](#create-a-graphql-query)
        - [GraphQL Playground](#graphql-playground)
- [Next - Write queries to pull beers into our beers page](#next---write-queries-to-pull-beers-into-our-beers-page)

<!-- /MarkdownTOC -->

* All of our data we've been pulling lives inside of Sanity

## What if we want to pull data into from another place? (API)
* What if you have a REST API (tweets/instagram/github/etc)?
    - How do you get that data into Gatsby?
    - And still reap these benefits
        + server rendered
        + pre-prendered
        + seo friendly
        + All gatsby good stuff

## Sample APIs!
* [link](https://sampleapis.com/)
    - [ale json](https://api.sampleapis.com/beers/ale)
    - It's 100's of beers, do we care about the large size?
        + No because we are fetching on page load, we are fetching at build time

## How do we get this API data into our gatsby GraphQL API?
* **question?** And then do the whole query and pull it in?
* **answer** Inside `gatsby-node.js`

## Sourcing Nodes
* We used the gatsby api for creating pages `createPages()`
    - sourcing
        + Putting the data into your gatsby API
    - nodes
        + A node is a piece of data
        + each piece of data in the gatsby API is referred to as a node (this is a GraphQL thing)

### What we need to do
* Put pieces of data into the GraphQL API by sourcing them
* We do this using `sourceNodes`
    - [docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes)
    - Extension point to tell plugins to source nodes
    - This API is called during the Gatsby bootstrap sequence
        + This means it happens before the createPages is finished because the data needs to exist first before the pages are created
        + So you should put this code BEFORE your `createPages()` function in `gatsby-nodes.js`

```js
// MORE CODE

export async function sourceNodes() {
  // we need data before we createPages!
}

export async function createPages(params) {

// MORE CODE
```

* Now we want to grab our beers and make them into nodes
    - **question** Why are we using below the `Promise.all` like we did before inside an array, even though we only have one thing we want to do?
    - **answer** It sets us up to add more stuff to do with no extra cost
        + If you Promise.all, it will just wait for that one promise to resolve and there is no downside to doing that

```js
// MORE CODE

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  console.log('Turn beers into nodes');
}

export async function sourceNodes() {
  // fetch a list of beers and source them into our gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes()]);
}

// MORE CODE
```

## Watch out for this error
* If you see cannot destructure `actions` of undefined
    - It means we forgot to pass in `params`

![destructure error](https://i.imgur.com/PtxKPgP.png)

`gatsby-node.js`

```js
// MORE CODE

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

// MORE CODE
```

## Run gatsby
* Look what happens

1. gatsby sources all data from sanity
2. Then it runs our beer to nodes log
3. Then it finished transforming source into nodes
4. Then it creates our pages

![turn beers into nodes](https://i.imgur.com/qnw7AN7.png)

## Let's get our beers!
1. We want to fetch a list of beers from our API endpoint
2. Loop over each beer
3. Create a node for each beer
4. Go into one of our pages and fetch that data

### Is fetch a node API?
* No currently fetch is a browser API

#### How can I use fetch in node?
* To use fetch in node you need to use [isomorphic fetch](https://www.npmjs.com/package/isomorphic-fetch)

`gatsby-node.js`

```js
import path from 'path'; // I also converted this to ES6 imports from Common JS
import fetch from 'isomorphic-fetch'; // Awesome!

// MORE CODE
```

## Let's test if we can pull in beers now
* Also remove all `console.log()` statements (it's getting cluttered)

```js
// MORE CODE

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  // 1. fetch a list of beers
  const res = await fetch(`https://api.sampleapis.com/beers/ale`);
  const beers = res.json();
  console.log(beers);
}

// MORE CODE
```

* You will see a PENDING in our console.log(beers)

### Fix - await!
```js
// MORE CODE

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  // 1. fetch a list of beers
  const res = await fetch(`https://api.sampleapis.com/beers/ale`);
  const beers = await res.json(); // we also need to await this because it is
        // also a Promise
  console.log(beers);
}

// MORE CODE
```

* Now you run and see all the beers are showing up
* We can use a `for of` loop or a `forEach` loop (both loop through arrays)
* **note** When you create nodes you have to create `nodeMeta`
    - Inside the `nodeMeta` you need to create a unique `id`
        + You can do that using the built-in `createNodeId`
            * We'll pattern it as `beer-BEER_NAME`
        + You can link to a parent or children if they existed
        + `internal` is how we relate this to our query
        + We need to tell node we are working with json (application/json)
            * Why? because when you are sourcing nodes it can be anything
                - like images/markdown/anything
                    + `mediaType: 'application/json'` (this helps other plugins find the type of media they are looking for)
                - `contentDigest` this is internal for gatsby to let it know if the data has changed or not
    - Lastly, we need to take our `actions` and run createNode() and pass it an object holding our `beer` and our `nodeMeta`

```js
// MORE CODE

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  // 1. fetch a list of beers
  const res = await fetch(`https://api.sampleapis.com/beers/ale`);
  const beers = await res.json();
  // 2. Loop through beers
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

// MORE CODE
```

* After we run this we should now see beers in our GraphQL Playground

![beer in our GraphQL Playground](https://i.imgur.com/FT3hQS4.png)

* How did gatsby know to put this in the GraphQL Playground?
    - Because of the `internal: { type: 'Beer' }`
    - Gatsby will make two queries: allBeer and beer

### Create a GraphQL query
* We want all beers
    - with id, name, image, price and rating
        + And the reviews and average for each rating

#### GraphQL Playground
```js
// MORE CODE

query MyQuery {
  allBeer {
    edges {
      node {
        id
        image
        rating {
          average
          reviews
        }
        name
        price
      }
    }
  }
}
// MORE CODE
```

* Lots of GraphQL APIs you have to explicitly type out all of the fields
    - Gatsby makes it easy
* **cool piece of info**
    - There is no difference between writing a plugin for gatsby and just writing it inside your `gatsby-node.js`
        + If you open the sanity source plugin you'll see they are doing exactly what we just did
            1. They are grabbing some data
            2. They are looping over that data
            3. And they are putting it into the GraphQL for you

## Next - Write queries to pull beers into our beers page
