# Static Query Page Listing
## Write a Static Query from scratch
`src/components/listing.js`

```
import React from 'react'
import { Link } from 'gatsby'

import Image from '../components/image'

const Listing = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default Listing
```

`pages/index.js`

```
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import Listing from '../components/listing'

const IndexPage = () => (
  <Layout>
    <Listing />
  </Layout>
)

export default IndexPage
```

* We'll import StaticQuery and grapql
* We'll work in GraphQL sandbox
* We copy archive GraphQL query as starting point and paste into GraphQL sandbox

GraphQL Sandbox

```
query BLOG_POST_ARCHIVE_QUERY {
    allMarkdownRemark(
      limit: 5
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
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
```

* This will give us 3 posts

## Make modification
* Add:
    - excerpt
    - date

```
  query BLOG_POST_ARCHIVE_QUERY {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date
            title
            slug
          }
        }
      }
    }
  }
```

* Run and you'll see the new fields output
* We also updated the limit from 5 to 10

## Create the client side GraphQL shell
* Recommend naming convention to be all UPPERCASER_QUERY

```
// MORE CODE

const LISTING_QUERY = graphql`
  # PASTE SANDBOX GraphQL HERE
`

const Listing = () => (

// MORE CODE
```

```
import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import Image from '../components/image'

const LISTING_QUERY = graphql`
  query BlogPostListingQuery {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date
            title
            slug
          }
        }
      }
    }
  }
`

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map(edge => (
        <article key={edge.node.frontmatter.slug}>
          <h2>{edge.node.frontmatter.title}</h2>
          <p>{edge.node.frontmatter.date}</p>

          <p>{edge.node.excerpt}</p>
          <Link to={`/posts${ edge.node.frontmatter.slug }`}>Read More</Link>
        </article>
      ))
    }
  />
)

export default Listing
```

## Clean up with destructuring
```
// MORE CODE

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map(({ node }) => (
        <article key={node.frontmatter.slug}>
          <Link to={`/post${ node.frontmatter.slug }`}>
            <h2>{node.frontmatter.title}</h2>
          </Link>
          <p>{node.frontmatter.date}</p>

          <p>{node.excerpt}</p>
          <Link to={`/post${ node.frontmatter.slug }`}>Read More</Link>
        </article>
      ))
    }
  />
)

// MORE CODE
```

## Congrats! We now have a working blog

### Format the date
* It doesn't look great so let's improve that now

```
// MORE CODE

const LISTING_QUERY = graphql`
  query BlogPostListingQuery {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            slug
          }
        }
      }
    }
  }
`

// MORE CODE
```

* Now our blog list on the home page has nicely formatted dates

![pretty dates](https://i.imgur.com/roYtnrc.png)


