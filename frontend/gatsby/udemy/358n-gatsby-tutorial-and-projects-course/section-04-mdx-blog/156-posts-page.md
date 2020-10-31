# Posts page
* We remove limit from query
* Grab Code Exporter page GraphQL

```
export const query = graphql`
  {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
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
```

`pages/posts.js`

```
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Posts from '../components/Posts'

const PostsPage = ({ data }) => {
  const {
    allMdx: { nodes: posts },
  } = data

  return (
    <Layout>
      <Hero />
      <Posts posts={posts} title="all posts" />
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
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
                ...GatsbyImageSharpFluid
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
export default PostsPage
```

* View in browser `http://localhost:8000/posts`
* You'll see all posts
