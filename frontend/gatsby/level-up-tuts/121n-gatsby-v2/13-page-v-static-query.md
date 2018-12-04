# Page Query vs Static Query
`gatsby-node.js`

```
// MORE CODE

    `).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        // run createPage
        createPage({
          // requires a path
          path: `/post${ node.frontmatter.slug }`,
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

* We add this:

```
// MORE CODE

path: `/post${ node.frontmatter.slug }`
// MORE CODE
```

* Stop and start Gatsby
* Click on the links in the Archive section and they now work

## How do we get our page/post data into our page?
* We want to write a new query that is able to use the `slug` from the **context** that we passed in and from there pull out a single post

## allMarkdownRemark vs markdownRemark
* allMarkdown is all posts and markdownRemark is one post
* `markdownRemark` needs to be passed an argument
* We need to pass our `slug`
    - We will use `eq` (this is Gatsby/markdown specific)
    - If you use a normal GraphQL API this will not work
    - You must use double quotes (single quotes will cause an error)

```
{
  markdownRemark(frontmatter: {
    slug:{
      eq: "/third-post"
    }
  }) {
    id
  }
}
// MORE CODE
```

## Grab the fields we want
* We tell it what fields we want
    - Before we grabbed `edges` and `node` and had to work from an array
    - But since we are not grabbing from array we can tell it the fields we need like this

```
{
  markdownRemark(frontmatter: {
    slug:{
      eq: "/third-post"
    }
  }) {
    html
    frontmatter {
      title
      date
      slug
    }
  }
}
// MORE CODE
```

* Click play and you'll see we get all the data we requested

## Hardcoded does't help us
* Yes `eq: "/third-post"` is hardcoded
* We need this gererated dynamically
* How can we do this?
    - `context` we set earlier will save us!
    - We used this

```
// MORE CODE

          context: {
            slug: node.frontmatter.slug,
          },

// MORE CODE
```

* We can send the above into our query as a variable of itself and then have this data populate dynamically

`postLayout.js`

```
import React, { Component } from 'react'
import { graphql } from 'gatsby'

// custom components
import Layout from './layout'

class postLayout extends Component {
  render () {
    return (
      <Layout>
        <h2>Post Layout</h2>
      </Layout>
    )
  }
}

export default postLayout

// MORE CODE
```

### Will we use StaticQuery again?
* No
    - Why not?
    - `StaticQuery` is a component prop that using render props to allow us to fetch data from our GraphQL API in Gataby
    - But in this situation we want to use a `page` query
        + A page query only works with pages
        + Since `postLayout.js` is registered as a page we can use a page query

### When to use a page query vs a StaticQuery?
#### Static Query
* Can be used anywhere
* DOES NOT ACCEPT VARIABLES
* Since we need to accept variables for this instance that eliminates using a Static Query
* CAN NOT USE `context`

#### Page Query
* Must be used on pages
* If we have a page and we want a query on that page we have to use some Gatsby magic (there is not an explicit hookup here)
* We have to create this export as a named export query
* We'll copy our GraphQL sandbox query and paste into our query
* We'll give it a name (optional but recommended)

`postLayout.js`

```
// MORE CODE

export default postLayout

export const query = graphql`
  query PostQuery {
    markdownRemark(frontmatter: { slug: { eq: "/third-post" } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`
```

## Test to see if our data is available
* We are still using a hardcoded path (we'll fix soon)
* You don't need to stop and start Gatsby (only if you are creating new pages)
* View `http://localhost:8000/post/third-post`
* Open CDT and use the React Dev Tool (RDT)
* Search for `postLayout`
    - View under Props
    - Expand data and you will see markdown, frontmatter...

![all our requested fields from GraphQL](http://localhost:8000/post/third-post)

* All pages will return the data from the `third-page` because of our hardcoded `slug`

## Next
* Pass in context and build out full page
* Pulling off the context and using it inside `postLayout.js`

## Important Takeaways
* These last few pages of notes are the crux of Gatsby and the most cause of confusion
    - The difference between Static Query and Page Query
    - How to create pages programically
    - How to work with the GraphQL API
    - Knowing this and not know this is the difference between a basic and advanced Gatsby developer
