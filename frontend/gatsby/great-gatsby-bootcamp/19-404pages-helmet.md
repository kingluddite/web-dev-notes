# 404 pages and React Helmet
* Very easy to create a 404 page in Gatsby

`pages/404.js`

```
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const NotFound = () => {
  return (
    <Layout>
      <h1>Page not found</h1>
      <p>
        Sorry, the page you requested is not available. Please return to the{' '}
        <Link to="/"> home page</Link>
      </p>
    </Layout>
  )
}

export default NotFound
```

* Restart server

`$ npm run develop`

Visit a URL that doesn't exist

`http://localhost:8000/blog/noexist`

Click `Preview custom 404 page` button (this is the development page with more info and won't appear in the production site)

## Helmet
* How to easily add site titles to pages

### `gatsby-plugin-react-helmet`
* [docs](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/)

#### Also download `react-helmet` (stand alone react component)
* [docs](https://github.com/nfl/react-helmet)

Shut down server

## Install plugins
`$ npm i gatsby-plugin-react-helmet react-helmet`

## Configure gatby helmet plugin
`gatsby-config.js`

```
// MORE CODE

plugins: [
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sass`,
  {

    // MORE CODE
```

* We will create it once and use it everywhere

## Create a new component

`components/head.js`

```
import React from 'react'
import { Helmet } from 'react-helmet'

const Head = () => {
  return <Helmet title="this is a test" />
}

export default Head
```

## Add Helmet to the home page
`pages/index.js`

```
import React from 'react'
import { Link } from 'gatsby'

// custom components
import Layout from '../components/layout'
import Head from '../components/head'

const IndexPage = () => {
  return (
    <Layout>
      <Head />

      // MORE CODE
```

* Restart server

`$ npm run develop`

## Update favicon
* Just swap out the `static/favicon.ico`

## Use sitemetadata
`head.js`

```
import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Head = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return <Helmet title={data.site.siteMetadata.title} />
}

export default Head
```

`index.js`

* We pass in to Head a prop `title` and give it our value we want for the title of the page

```
import React from 'react'
import { Link } from 'gatsby'

// custom components
import Layout from '../components/layout'
import Head from '../components/head'

const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />
      <h1>Hello</h1>
      <h2>I'm a full-stack developer</h2>
      <p>
        Need a developer? <Link to="/contact">Contact</Link> me
      </p>
    </Layout>
  )
}

export default IndexPage
```

## Grab title inside our `Head` component
`head.js`

```
import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Head = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return <Helmet title={`${title} | ${data.site.siteMetadata.title}`} />
}

export default Head
```

* Now we'll have the page title (coming from our prop) and the `sitemetadata` title
* After saving both pages you should see `Home | Full-Stack Gatsby Bootcamp` in the title of the home page

## Make all changes to all pages
`404.js`

```
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

const NotFound = () => {
  return (
    <Layout>
      <Head title="404" />
      <h1>Page not found</h1>
      <p>
        Sorry, the page you requested is not available. Please return to the{' '}
        <Link to="/"> home page</Link>
      </p>
    </Layout>
  )
}

export default NotFound
```

* Do that for about.js, blog-contentful.js, blog.js, and contact.js

## Templates
* Use the blog post title as the page title for templates

`templates/blog.js`

```
import react from 'react'
import { graphql } from 'gatsby'

import layout from '../components/layout'
import Head from '../components/head'

export const query = graphql`
  query($slug: string) {
    markdownremark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`
const blog = props => {
  return (
    <layout>
      <Head title={props.data.markdownremark.frontmatter.title} />

      // MORE CODE
```

`templates/blog-contentful.js`

```
import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import Head from '../components/head'

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
    }
  }
`
const BlogContentful = props => {
  const options = {
    renderNode: {
      'embedded-asset-block': node => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img src={url} alt={alt} />
      },
    },
  }

  return (
    <Layout>
      <Head title={props.data.contentfulBlogPost.title} />

      // MORE CODE
```

* String is case sensative

`templates/blog.js`

```
import react from 'react'
import { graphql } from 'gatsby'

import layout from '../components/layout'
import Head from '../components/head'

export const query = graphql`
  query($slug: String!) {

    // MORE CODE
```

## Troubleshoot this issue
Looks like an issue running blog and contentful-blog posts, only runs the later and the pages for blog are not generated?

### Fixed
* I am using 2 templates so I need to use them both inside my `createPages`

`gatsby-node.js`

```
const path = require('path')
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    }
  }
}

// markdown stuff
exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')
    // console.log('@@@@@@@@@@@@@@' + slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create our markdown pages
  // 1. Get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js')

  // 2. Get markdown data
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  // 3. Create new pages

  res.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })

  // Create contentful pages
  // 1. Get path to template
  const blogContentfulTemplate = path.resolve(
    './src/templates/blog-contentful.js'
  )

  // 2. Get markdown data
  const resContentful = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  // 3. Create new pages

  resContentful.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      component: blogContentfulTemplate,
      path: `/blog-contentful/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}

```

* Before I was calling `createPages` twice
* When I commented one out the other worked so I put them all inside `createPages` and all works well
