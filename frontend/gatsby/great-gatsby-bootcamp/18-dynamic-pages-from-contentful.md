# Dynamic Pages from Contentful

`gatsby-node.js`

```
const path = require('path')
// exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
//   const config = getConfig()
//   if (stage.startsWith('develop') && config.resolve) {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       'react-dom': '@hot-loader/react-dom',
//     }
//   }
// }

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
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 1. Get path to template
  const blogContentfulTemplate = path.resolve(
    './src/templates/blog-contentful.js'
  )

  // 2. Get markdown data
  const res = await graphql(`
    query {
      allContentfulBlogPost
        edges {
          node {
              slug
          }
        }
      }
    }
  `)
  // 3. Create new pages

  res.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      component: blogContentfulTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
```

* Working with a CMS requires a little less to do to get things working than working with markdown

## Update our blog-contentful template
`gatsby-node.js`

```
const path = require('path')
// exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
//   const config = getConfig()
//   if (stage.startsWith('develop') && config.resolve) {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       'react-dom': '@hot-loader/react-dom',
//     }
//   }
// }

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
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 1. Get path to template
  const blogContentfulTemplate = path.resolve(
    './src/templates/blog-contentful.js'
  )

  // 2. Get markdown data
  const res = await graphql(`
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

  res.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      component: blogContentfulTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
```

`src/templates/blog-contentful.js`

```
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
    }
  }
`
const BlogContentful = props => {
  return (
    <Layout>
      <h1>{props.data.contentfulBlogPost.title}</h1>
      <p>{props.data.contentfulBlogPost.publishedDate}</p>
    </Layout>
  )
}

export default BlogContentful
```

* Note: I forgot to add the `query($slug: String!) {}`
    - The `!` means it is required

## Test and now the single contentful pages work now

## Body content is not as easy
Playground

```
query {
  allContentfulBlogPost {
    edges {
      node {
        title
        slug
        publishedDate
        body {
          json
        }
      }
    }
  }
}
```

Checkout the crazy output

```
{
  "data": {
    "allContentfulBlogPost": {
      "edges": [
        {
          "node": {
            "title": "Debug node",
            "slug": "debug-node",
            "publishedDate": "2019-05-31T00:00-07:00",
            "body": {
              "json": {
                "data": {},
                "content": [
                  {
                    "data": {},
                    "content": [
                      {
                        "data": {},
                        "marks": [],
                        "value": "Here's how to debug your apps",
                        "nodeType": "text"
                      }
                    ],
                    "nodeType": "paragraph"
                  }
                ],
                "nodeType": "document"
              }
            }
          }
        },
        {
          "node": {
            "title": "My first Contentful",
            "slug": "contentful",
            "publishedDate": "2019-05-19T00:00-07:00",
            "body": {
              "json": {
                "data": {},
                "content": [
                  {
                    "data": {},
                    "content": [
                      {
                        "data": {},
                        "marks": [],
                        "value": "My first Contentful post body",
                        "nodeType": "text"
                      }
                    ],
                    "nodeType": "paragraph"
                  }
                ],
                "nodeType": "document"
              }
            }
          }
        }
      ]
    }
  }
}
```

* They do this so they can keep track of embedded assets (paragraphs, images...)
* Good news is we don't have to mess with this structure
* Contentful provides and npm library and it takes the json and it will convert it into a set of react components that we can render anywhere, it is not specific to JavaScript, it is specific to react which makes it very easy to work with

## Install rich-text-react-renderer
* Stop server

`$ npm i @contentful/rich-text-react-renderer`

`templates/blog-contentful.js`

```
import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
    }
  }
`
const BlogContentful = props => {
// MORE CODE
```

`documentToReactComponents` will take in the JSON that from the API once we add our GraphQL query and it will spit out React components wherever we want to

### Now this is how we grab the JSON value
`template/blog-contentful.js`

```
// MORE CODE

import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'

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
  return (
    <Layout>
      <h1>{props.data.contentfulBlogPost.title}</h1>
      <p>{props.data.contentfulBlogPost.publishedDate}</p>
      {documentToReactComponents(props.data.contentfulBlogPost.body.json)}
    </Layout>
  )
}

export default BlogContentful
```

* Now you will see the body content when you run `$ npm run develop`

## Add more complex structure to our contentful blog post
* Add a heading
* Bold something
* Add an image (grass.png)
    - You can add images directly from post or from the media 
    - Add an asset, browse for asset on machine and upload it to contentful
    - Publish changed from image AND from post (don't forget to publish both changes)
* Restart server
* `$ npm run develop` 

## No images yet
* All the other structure changes we made to our json contentful post data show up in our page but not the image
* Refresh the Playground and look at the new json data structure

```
query {
  allContentfulBlogPost {
    edges {
      node {
        title
        slug
        publishedDate
        body {
          json
        }
      }
    }
  }
}
```

```
// MORE CODE

{
                   "data": {
                     "target": {
                       "sys": {
                         "space": {
                           "sys": {
                             "type": "Link",
                             "linkType": "Space",
                             "id": "vk51oefgs39b"
                           }
                         },
                         "id": "c7awqHwy9gFkWnvxqp0iQZG",
                         "type": "Asset",
                         "createdAt": "2019-05-20T16:16:31.819Z",
                         "updatedAt": "2019-05-20T16:28:38.765Z",
                         "environment": {
                           "sys": {
                             "id": "master",
                             "type": "Link",
                             "linkType": "Environment"
                           }
                         },
                         "revision": 2
                       },
                       "fields": {
                         "title": {
                           "en-US": "Grass"
                         },
                         "description": {
                           "en-US": "Grass"
                         },
                         "file": {
                           "en-US": {
                             "url": "//images.ctfassets.net/vk51oefgs39b/7awqHwy9gFkWnvxqp0iQZG/d1542d28a19cb110d7becd5c5f4e5f05/grass.png",
                             "details": {
                               "size": 969253,
                               "image": {
                                 "width": 2000,
                                 "height": 1091
                               }
                             },
                             "fileName": "grass.png",
                             "contentType": "image/png"
                           }
                         }
                       }
                     }
                   },
                   "content": [],
                   "nodeType": "embedded-asset-block"
                 },

// MORE CODE
```

## Drilling down the JSON to get the alt text and image URL
* To access this:
    - node.data.target.fields.title['en-US'] (alt text)
    - node.data.target.fields.file.en-US.url (image url)

## Optional Options object
* To get the image we have to set up an optional Options object
* We'll pass this in to the 2nd argument of `documentToReactComponents`

`blog-contentful.js`

```
// MORE CODE

  {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
</Layout>

// MORE CODE

```

* renderNode: lets us override how specific nodes are rendered (we saw various nodes types in that data (paragraph, heading2))
* All values that have a hyphen we have to wrap in quotes
* We get the node data passed in and we return some JSX (in this case just return an image `<img />`)
* We want to set up values for the alt text and src

`blog-contentful.js`

```
// MORE CODE

const BlogContentful = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        return <img />
      }
    }
  }

  return (
    <Layout>
      <h1>{props.data.contentfulBlogPost.title}</h1>
      <p>{props.data.contentfulBlogPost.publishedDate}</p>
      {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
    </Layout>
  )
}

export default BlogContentful
```

Note we are using `embedded-asset-block` and we get that from the json returned from contentful

```
// MORE CODE

"file": {
                           "en-US": {
                             "url": "//images.ctfassets.net/vk51oefgs39b/7awqHwy9gFkWnvxqp0iQZG/d1542d28a19cb110d7becd5c5f4e5f05/grass.png",
                             "details": {
                               "size": 969253,
                               "image": {
                                 "width": 2000,
                                 "height": 1091
                               }
                             },
                             "fileName": "grass.png",
                             "contentType": "image/png"
                           }
                         }
                       }
                     }
                   },
                   "content": [],
                   "nodeType": "embedded-asset-block"
                 },

// MORE CODE
```

* We will use stand alone variables so they are easier to work with

```
// MORE CODE

const BlogContentful = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = '';
        const url = '';
        return <img src={url} alt={alt} />
      }
    }
  }

// MORE CODE
```

* Drill into JSON returned in Playground
* Collapse sys in Playground
* node.data.target.fields.title["en-US"] (alt)
* node.data.target.fields.file["en-US"].url (url)

`blog-contentful.js`

```
  // MORE CODE

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

  // MORE CODE
```

* Refresh the browser and the `http://localhost:8000/blog/contentful` page should now show the contentful image




