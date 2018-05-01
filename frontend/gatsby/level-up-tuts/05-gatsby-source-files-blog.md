# Blog Markdown Source files
## Source plugin
* What is a source plugin?
    - allows you to create nodes
    - `$ npm install gatsby-source-filesystem`

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: `My Blog2`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
  ],
}
```

### Install remark plugin
* `$ npm install gatsby-transformer-remark`
* stop server

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: `My Blog2`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    `gatsby-transformer-remark`,
  ],
}
```

* Start server
* `$ gatsby develop`

## What is frontmatter? (similar to jeckel)
`/pages/04-28-2018-first-blog`

```
---
path: '/first-post'
title: 'First Blog Post'
---
```

* you have access to your frontmatter

`post.js`

```
import React from 'react'
import Helmet from 'react-helmet'

export default function Template({ data }) {
  const { markdownRemark: post } = data
  // above would look like the below line
  // const post = data.markdownRemark;

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
    </div>
  )
}

export const postQuery = graphql`
 query BlogPostByPath($path: String!) {
   markdownRemark(frontmatter: { path: { eq: $path } }) {
     html
     frontmatter {
       path
       title
     }
   }
 }
`
```

## need to tell our blog will be pages
* We need to register it
* At root of project
    - `/gatsby-node.js` (need to name it that exactly)

`post.js`

```
import React from 'react'
import Helmet from 'react-helmet'

export default function Template({ data }) {
  const { markdownRemark: post } = data
  // above would look like the below line
  // const post = data.markdownRemark;

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
    </div>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
```

`gatsby-node.js`

```
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const postTemplate = path.resolve('src/templates/post.js')

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
    })
  })
}
```

* Remove the scss we added earlier

![first blog in markdown](https://i.imgur.com/V5zWOt6.png)

## Now bring in the markdown from the first-blog.md

`post.js`

```
// MORE CODE
export default function Template({ data }) {
  const { markdownRemark: post } = data
  // above would look like the below line
  // const post = data.markdownRemark;

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}
// MORE CODE
```

* change the h1 to a p
* you can just create days for the blog post and rinse and repeat for other blog posts

## Review
* Imported plugins
    - gatsby-source-filesystem
    - gatsby-transformer-remark
* inside gatsby-config.js
    - We said to use our gatsby-transformer-remark
    - use gatsby-source-filesystem pointing to the path where our pages are
        + that lets gatsby know our blog is pages so it can run a query on them
* gatsby-node.js (most important)
    - we are grabbing all the pages
    - using the createPage (from API)
    - we point to our template `src/template/post.js`
    - we use graphql to grab all our posts
        + gives it to us as `res.data`
            * res.data.allMarkdownRemark is an array of all our pages
                - we iterate over them and create them with a path and a component
* in our individual template we are creating a query, we are grabbing blogpost by path
* and we find a particular markdown file where the formatter path is equal to $path
* We want the html and the path and title from frontmatter
* Lastly we have a react functional stateless component
    - we pull out post from data.mardownRemark.post
    - and we return a div with a title
    - and we pull in html with dangerouslySetInnerHTML
