# Home page mdx query
* Find `allMdx` query in GraphQL
* Gets lots of info
    - body
    - excerpt (preview of content)
* You need to sort by date (frontmatter dat)
    - So you check sort and click on field and select frontmatter date
* And order DESC
* Set `limit` to 3

GraphQL

```
query MyQuery {
  allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: 3) {
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

* We will grab this query and run it on the home page
    - Why home page? Because we'll set up a `Posts` components
    - We only show 3 posts on home page
    - But on Posts page we show more posts

`pages/index.js`

```
import React from 'react'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
// import Posts from '../components/Posts'
// import { graphql } from 'gatsby'
// import SEO from '../components/SEO'

const IndexPage = ({data}) => {
  console.log(data);
  return (
    <Layout>
      <Hero showPerson />
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: 3) {
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

export default IndexPage
```

* And view home page in browser
* View console and you'll see the `allMdx` object
* 3 latest posts
