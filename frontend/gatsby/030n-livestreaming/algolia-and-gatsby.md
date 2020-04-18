# Gatsby with Algolia Search
* [Gatsby-plugin-algolia](https://github.com/algolia/gatsby-plugin-algolia)

## Sign up for free trial (14 days)
* You'll need to create an Index (I named my `Blog`)

## Create .env.production
```
ALGOLIA_APP_ID=XXX (app ID here)
ALGOLIA_API_KEY=XXX (put you Admin API key here)
ALGOLIA_INDEX_NAME=XXX (Put your index name here - it is case sensative)
```

## Add plugin
`$ npm i gatsby-plugin-algolia dotenv`

`gatsby-config.js`

```
require('dotenv').config({
  path: `.env.production`,
})

const blogQuery = `
{
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
          description
        }
        excerpt
        html
      }
    }
  }
`

const queries = [
  {
    query: blogQuery,
    transformer: ({ data }) => data.allMarkdownRemark.nodes,
  },
]

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: `Kyle Mathews`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 1000,
      },
    },

    // MORE CODE

```

## Run build
`$ gatsby build` 

* Should not get any errors
* Refresh Dashboard Indices > Blog (and you will see some data)

## Change dotenv to:
`gatsby.config.js`

```
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// MORE CODE
```

## Run in dev
`$ gatsby develop`

## Add Search box
* [algolia docs](https://www.algolia.com/doc/)
* Search for React
* [React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
* Click `Installation` on sidebar

`$ npm install algoliasearch react-instantsearch-dom`

* Copy the JSX (it has your personal code adding to this React search component)

`src/pages/index.js`

```
import React from 'react'
import { Link, graphql } from 'gatsby'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

const searchClient = algoliasearch(
  '9MUIQF3OH7',
  'adcdb9952d9c7ab0fadff168ed16364b'
)

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <InstantSearch searchClient={searchClient} indexName="Blog">
          <SearchBox />
          <Hits />
        </InstantSearch>
        {posts.map(({ node }) => {

// MORE CODE
```

* Make sure you set the prop in `InstantSearch` component to `Blog`
* You should see JSON appearing when you do a search for `blogging`

## Create new component called `src/components/post-preview.js`
```
import React from 'react'
import { rhythm } from '../utils/typography'
import { Link } from 'gatsby'

const PostPreview = ({ slug, title, date, description, excerpt }) => (
  <article>
    <header>
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={slug}>
          {title}
        </Link>
      </h3>
      <small>{date}</small>
    </header>
    <section>
      <p
        dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
      />
    </section>
  </article>
)

export default PostPreview
```

`src/pages/index.js`

```
const searchClient = algoliasearch(
  '9MUIQF3OH7',
  'adcdb9952d9c7ab0fadff168ed16364b'
)

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <InstantSearch searchClient={searchClient} indexName="Blog">
          <SearchBox />
          <Hits />
        </InstantSearch>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <PostPreview
              key={node.fields.slug}
              slug={node.fields.slug}
              title={title}
              date={node.frontmatter.date}
              description={node.frontmatter.description}
              excerpt={node.excerpt}
            />
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
```

## Now do we re-index to get date? (we didn't search for that before in our graphql)
* We just add a new prop `hitComponent={PostPreview}`

`src/pages/index.js`

```
// MORE CODE

        <InstantSearch searchClient={searchClient} indexName="Blog">
          <SearchBox />
          <Hits hitComponent={PostPreview} />
        </InstantSearch>

// MORE CODE
```

* This will pass the data it gets to PostPreview

## Update graphql
`gatsby-config.js`

```
const blogQuery = `
{
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
          date
          description
        }
        fields {
         slug
        }
        excerpt
        html
      }
    }
  }
`
```

## Run gatsby build again
* This will add in our new GraphQL

`$ gatsby build`

## Update post-preview.js
```
import React from 'react'
import { rhythm } from '../utils/typography'
import { Link } from 'gatsby'

const PostPreview = ({ hit }) => {
  const title = hit.frontmatter.title || hit.fields.slug
  return (
    <article>
      <header>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: `none` }} to={hit.fields.slug}>
            {title}
          </Link>
        </h3>
        <small>{hit.frontmatter.date}</small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: hit.description || hit.excerpt,
          }}
        />
      </section>
    </article>
  )
}

export default PostPreview
```

* Update `src/pages/index.js`

```
import React from 'react'
import { graphql } from 'gatsby'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PostPreview from '../components/post-preview'

const searchClient = algoliasearch(
  '9MUIQF3OH7',
  'adcdb9952d9c7ab0fadff168ed16364b'
)

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <InstantSearch searchClient={searchClient} indexName="Blog">
          <SearchBox />
          <Hits hitComponent={PostPreview} />
        </InstantSearch>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
```

## Fix the date
`post-preview.js`

```
// MORE CODE

        <small>{new Date(hit.frontmatter.date).toLocaleDateString()}</small>

// MORE CODE
```

## How to add highlighting
* Search for highlighting
* [highlight docs](https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/how-to/highlighting-snippeting/#highlighting)

## But we want to search for highlight widget
* [highlight widget docs](https://www.algolia.com/doc/api-reference/widgets/highlight/react/)

### Add Highlight snippet
`index.js`

```
// MORE CODE

import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom'

// MORE CODE
```

## After changes to break up chunks

### Dashboard
Configuration > Deduping and Grouping > Distinct > (change to true)
Attribute for Distinct is `slug`
Save Settings






