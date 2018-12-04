# Creating Pages From Markdown Files
* What kind of information do we need for our pages to be able to build them?
    - `slug`
        + It is the path that is generated
        + That's it, we just need the `slug`

## Clean up our sandbox query
```
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          slug
        }
      }
    }
  }
}

// MORE CODE
```

* We will be using GraphQL so do we need to require it in `gatsby-node.js`?
    - No, since we already are passing it as an argument to Gatsby's `createPages` function
    - So all we need to do is create a new asynchronous function that loops over these things after running these queries
        + The easiest way to do that is to return a new Promise

```
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  // destructure createPage from actions
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                slug
              }
            }
          }
        }
      }
    `).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        // run createPage
        createPage({
          // requires a path
          path: node.frontmatter.slug,
          component: path.resolve('./src/components/postLayout.js'),
        })
      })
    })
  })
}

// MORE CODE
```

* `results` will contain the exact same result set we get in the GraphQL sandbox

```
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "frontmatter": {
              "title": "The First Post",
              "slug": "/first-post"
            }
          }
        },
        {
          "node": {
            "frontmatter": {
              "title": "The Second Post",
              "slug": "/second-post"
            }
          }
        },
        {
          "node": {
            "frontmatter": {
              "title": "The Third Post",
              "slug": "/third-post"
            }
          }
        }
      ]
    }
  }
}
// MORE CODE
```

* This means we can loop through all the `data` using a `forEach` loop and destructure `node` which will give us access to `frontmatter` and everything inside it
* We then can replace our hardcoded `slug` with a dynamic `slug` that will pull from the slug we are programically cycling through `node.frontmatter.slug`
* For each page we have in markdown it will create the page and set the slug of that page to the slug we gave it in our markdown file
* Each page will be created using our `postLayout.js` template

### Finally, we need to `resolve` our original Promise

`gatsby-node.js`

```
// MORE CODE

    `).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        // run createPage
        createPage({
          // requires a path
          path: node.frontmatter.slug,
          component: path.resolve('./src/components/postLayout.js'),
        })
      })
      resolve();
    })
  })
}
```

## Stop and start Gatsby again
* Now click the Archive links and they will still not work (we need to fix this later)
* But if you manually enter
    - http://localhost:8000/first-post
    - http://localhost:8000/second-post
    - http://localhost:8000/third-post
* They will all work
* Both `/somefakepage` and `/somefakepages` no longer work

## We have Post Layout
* But we have no page data and the reason for that is we haven't told what the page should have on it yet (we'll do that next)

## How do we pass data into our template?
* So we can query off it and pull it into our page

## Single page query
* We only queried for all pages and have yet to query for a single page
* We will take something called `context` and run the query on it

## Adding context
* It will be the third property we add to `createPage`
    - This will enable us to pass some data into the template itself and this in turn is what we will use to query off it
    - It can be any properties you want
    - We'll use `slug` and pass it `node.frontmatter.slug`
        + This means we will have access to the `slug` inside `postLayout.js`
        + And we will use that `slug` to query off of

`gatsby-node.js`

```
// MORE CODE

    `).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        // run createPage
        createPage({
          // requires a path
          path: node.frontmatter.slug,
          component: path.resolve('./src/components/postLayout.js'),
          context: {
            slug: node.frontmatter.slug,
          },
        })
      })
      resolve()
    })
  })
}
```

## What did we just do?
* We created a new page based on a query
* If you have any GraphQL query on your site you can do this via query
    - Or you can have data that is arbitrary, create it anywhere
    - All you have to do is run `createPage` and it will create a page as long as there is a path to resolve and a correct path in the `path.resolve(PATHTOFILE)`

## Next - Create detailed page
* This will fix our broken links
* When we click on the archive links, it will take us to that respective post that we created using `gatsby-node.js`
