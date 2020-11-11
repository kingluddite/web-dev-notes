# Categories JSX
`category-template.js`

```
import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'

const CategoryTemplate = props => {
  const {
    data: {
      categories: { nodes: posts },
    },
  } = props

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

* Now if you manually browse to a category you will see all posts with that category

`http://localhost:8000/react`

* And now we see all posts with a category of react

## How does our page have access to `cagegory`?
* It comes from the context

### Let's text by logging `props`
`category-template.js`

```
// MORE CODE

const CategoryTemplate = props => {
  console.log(props)
  const {
    data: {
      categories: { nodes: posts },
    },
  } = props

// MORE CODE
```

![pageContext](https://i.imgur.com/qrd50tO.png)

* You could also use react dev tools to see pageContext (and all other props)

![react dev tools](https://i.imgur.com/OkY9f4I.png)

### Notice we were not looking for the `data` here
* We wanted to have access to the context
* So we'll destructure `props` and pluck off `pageContext`
    - Then we can use that value
    - If we destructured all the `data` we would not have access to `pageContext`

`category-template.js`

```
// MORE CODE

const CategoryTemplate = props => {
  const {
    pageContext: { category },
  } = props

  const {
    data: {
      categories: { nodes: posts },
    },
  } = props

  return (
    <Layout>
      <Hero />
      <Posts posts={posts} title={category} />
    </Layout>
  )
}

// MORE CODE
```

* Now our category pages also have titles

## Let's make it look nicer with:
```
// MORE CODE

  return (
    <Layout>
      <Hero />
      <Posts posts={posts} title={`category / ${category}`} />
    </Layout>
  )
}

// MORE CODE
```

* And it will now look like:

![category formatted nicer](https://i.imgur.com/EVM0Jv6.png)

