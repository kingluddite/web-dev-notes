# Query React
* Duplicate a post
    - Give it a different name, date and title and heading

`post2.md`

```
---
slug: "/second-post"
date: "2018-11-28"
title: "The Second Post"
---

# Hello AGAIN from your Markdown post

// MORE CODE
```

## Run GraphQL Sandbox
```
query SiteTitleQuery {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark {
    totalCount
    edges {
      node {
        excerpt
        frontmatter {
          title
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}
```

* You will see 2 posts now
    - We have multiple pages inside an array
    - Now we can create a listing of all the blogposts  

### Gatsby V2 Coolness - We can now run queries from anywhere
* In V1 we had to run queries from specific types of components
* In V2 we can run queries from anywhere we just need to import the `StaticQuery` and `graphql` from Gatsby

### Capital vs Lowercase
* Gatsby names its components lowercase
    - But it is common to name components with a Capital letter

### Save `layout.js` as `archive.js`

`archive.js`

* We will convert our layout content in archive.js to the below code:

```
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Archive = () => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery2 {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <aside>
          <h3>Archive</h3>
        </aside>
      </>
    )}
  />
)

export default Archive
```

## Time to output all our posts
`components/layout.js`

```
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

// custom components
import Header from './header'
import Archive from './archive'

// styles
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
        <Archive />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
```

* View home page and you will see Archive
* For simplicity
    - In our sandbox
        + We'll remove
            * date
            * siteMetadata
            * Rename Query

```
query BLOG_POST_ARCHIVE_QUERY {
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
```

## Replace GraphQL with new working GraphQL sandbox Query
* We will clean up how we write queries later

`components/archive.js`

```
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Archive = () => (
  <StaticQuery
    query={graphql`
      query BLOG_POST_ARCHIVE_QUERY {
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
    `}

// MORE CODE
```

## View React Dev Tools (RTDs)
* Search for `Archive` component
* Expand `StaticQuery` and you will see `Context.Consumer`
    - We currently do not have access to `props`
    - It is hard to "spy" on our data because we are using a `render prop`
    - But if we were just using data from a component it would be easier

## Destructure
* Inside render we have `data` and we can restructure that from this:

`archive.js`

```
// MORE CODE

render={data => (

// MORE CODE
```

* To this:

```
// MORE CODE

render={({ allMarkdownRemark }) => (

// MORE CODE
```

`archive.js`

```
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Archive = () => (
  <StaticQuery
    query={graphql`
      query BLOG_POST_ARCHIVE_QUERY {
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
    `}
    render={({ allMarkdownRemark }) => (
      <>
        <aside>
          <h3>Archive</h3>
          <ul>
            {allMarkdownRemark.edges.map(edge => (
              <li>{edge.node.frontmatter.title}</li>
            ))}
          </ul>
        </aside>
      </>
    )}
  />
)

export default Archive
```

## View in browser
* You will see 2 posts
* Add another post
* You will now see 3 posts (You don't need to restart server it will automatically add 3rd post to your archive)

