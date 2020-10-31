# Create post pages programatically
## How do we set up pages programmatically?

## Create MDX/Post Pages Programatically
1. Setup Query with unique value (most likely slug)
2. Setup Template
3. Run Query in `gatsby-node.js` - just like normal setup
4. Pass Variable (slug)
5. Run Query in Template using variable (slug)

## Let's create another playground from scratch
* We want to reuse the other one

### GraphQL
```
// MORE CODE

query MyQuery {
  allMdx {
    nodes {
      frontmatter {
        slug
      }
    }
  }
}

// MORE CODE
```

* The slugs are unique
* We will iterate through this query in `gatsby-node.js`
* Then we'll pass in the template `in our templates folder`

`gatsby-node.js`

```
const path = require('path')

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  result.data.allMdx.nodes.forEach(({ frontmatter: { slug } }) => {
    createPage({
      path: `/posts/${slug}`,
      component: path.resolve(`src/templates/post-template.js`),
      context: {
        slug,
      },
    })
  })
}
```

* Stop server and restart it

## Inside our template
* We need to setup a query that uses that slug and gets specific info about that page
* Currently we have a little bit about the page (excerpt) but we want to click on a page and get all the info about that topic
    - Click on home page blog ling
    - You will see single page like `http://localhost:8000/posts/tea-station` URL with just static text
    - Now we want to populate that with all our code about our blog post

### Show all the generated pages from the template
* Go to a page that does not exist in your site and dev feedback shows you all the pages and posts 
