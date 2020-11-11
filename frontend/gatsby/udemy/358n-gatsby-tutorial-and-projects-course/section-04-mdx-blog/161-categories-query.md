# Categories query
* When we creates posts to be programatically generated pages we are only looking for one specific post
* But for categories
* We will be passing posts a list
* When we set up the query for post we were looking for one specific post (via it's slug)
    - But with categories we are still looking for multiple posts (but with a distinct category)
    - This is why we saved our first GraphQL query
    - But instead of displaying all the posts we will use that query and query variables (remember that in gatsby-node.js we passed it in via the context)

### See how we passed in `category` as the context below?
```
// MORE CODE
  // create category pages programatically
  result.data.categories.distinct.forEach(category => {
    createPage({
      path: `/${category}`,
      component: path.resolve(`src/templates/category-template.js`),
      context: {
        category,
      },
    })
  })
}
```

## So in our category-template
* We want a query that gets all the posts that match that specific category
* We'll rename our query from `allMdx` to `GetCategories`

### GraphQL
```
query GetCategories($category: String) {
  categories: allMdx(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category: {eq: $category}}}) {
    totalCount
    nodes {
      frontmatter {
        title
        author
        category
        date(formatString: "MMMM Do, YYYY")
        readTime
        slug
        image {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
      excerpt
      id
    }
  }
}
```

* Add a variable to test it in GraphQL

```
{
  "category": "javascript"
}
```

## Test it
* You'll see you only have posts with javascript as a category

## Add it to our template
`templates/category-template.js`

```
import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'

const CategoryTemplate = () => {

  return (
    <Layout>
      <Hero />
      <Posts posts={posts} />
    </Layout>
  )
}

export const query = graphql`
  query GetCategories($category: String) {
    categories: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      nodes {
        frontmatter {
          title
          author
          category
          date(formatString: "MMMM Do, YYYY")
          readTime
          slug
          image {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
        excerpt
        id
      }
    }
  }
`

export default CategoryTemplate
```



