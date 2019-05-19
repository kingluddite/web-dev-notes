# Dynamically generating pages
Goal 1 - We created our page slugs

`gatsby.md -> gatsby -> /blog/gatsby`

Goal 2 - Create a template for a blog post page

* We'll do that now

## Create a new `src/templates` folder
* We do this to differentiate react templates from the react components inside the `components` directory and the specialized components in the `pages` directory

### Create `src/templates/blog.js`
* We need to create and export a react component
* Now create a simple basic react component

`blog.js`

```
import React from 'react'

import Layout from '../components/layout'

const Blog = () => {
  return <Layout>Basic Blog</Layout>
}

export default Blog
```

## Goal 2 accomplished!
* We have a template in place to generate a page for each blog post so we have accomplished Goal #2

## Goal 3 - Generate a new page for each post
* This will require us to use another file inside the **gatsby-node.js** config file

## createPages
* Tells plugins to add pages
* [docs](https://www.gatsbyjs.org/docs/node-apis/#createPages)
* This gives us everything we need to dynamically create new pages for the site

### Let's focus on these 2 lines
```
// MORE CODE

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

// MORE CODE
```

* We export a createPages function and Gatsby gets access to that function and runs it a single time and we destructure that first argument to get access to `graphql` and `actions`
    - `graphql` will enable us to fetch some data (in this case we'll fetch those markdown nodes)
    - `actions` gives us access to an action for `createPage` (which is an action that will allow us to create a new page)

`gatsby-node.js`

```
// MORE CODE

module.exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // 1. Get path to template
  // 2. Get markdown data
  // 3. Create new pages
}
```

## Get path to template
* We just need to get the path to that new template we created to `blog.js`
* We need an absolute path on our machine starting way back from the root of the hard drive - to do this we'll use `path.resolve("PUT_PARTIAL_PATH_HERE")`
   - PUT_PARTIAL_PATH_HERE - This needs to be the path from our current location (in the gatsby bootcamp folder) to the destination (which is blog.js)
       + PATH from CURRENT LOCATION to DESTINATION

`path.resolve('./src/templates/blog')`

* The `resolve()` function will prepend everything upfront to provide an absolute path from the root of the hard drive

```
// MORE CODE

module.exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // 1. Get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js');

  // 2. Get markdown data
  // 3. Create new pages
}

// MORE CODE
```

## Get the markdown data
* We need to get all the slugs for the markdown, we did that previously be we only need the slug so use this:

```
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
```

## graphql
* The graphql we destructured is not the same as the GraphQL we've been importing from the Gatsby module in files like our header component
    - This is actually a function itself that we pass a string GraphQL query to
    - We take our Playground query and drop it inside like this:

```
// MORE CODE

module.exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // 1. Get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js')

  // 2. Get markdown data
  graphql(`
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
}
```

* Notice that we are not doing anything with the return value
* This function returns a Promise
* This means we have a couple of different options

1. Use a `.then()` call for the Promise
2. Or use `async-await` (we'll use this as it makes our code look nicer)

## Now we have our data all inside `res.data`
* let's loop through an array with forEach()
* ](https://codeburst.io/javascript-map-vs-foreach-f38111822c0f)
    - forEach() - executes a provided function once for each array element
        + forEach() may be preferable when you’re not trying to change the data in your array, but instead want to just do something with it
    - map() - creates a new array with the results of calling a provided function on every element in the calling array

### createPage()
* Pass it an object
    - Provide the object 3 things
        + 1) the component we are trying to render (this component is not the actual component but rather just the path to the component and we have that stored in our `blogTemplate`)
        + 2) path - we are creating a new page but where should someone be able to access
            * Something like `/test`
            * But in our case we need it to be dynamic based off the slug that each post has `/blog/${edge.node.fields.slug}`
        + 3) context - is an object and it contains stuff you can pass down to that template, in our case the only thing we need is the slug, if that template has the slug it can fetch the rest of the data for the post (like the `title` and `body` content)

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

  res.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug
      }
    })
  })
}
```

### Test it out
`$ npm run develop`

* You should see 2 new pages
* Go to a page you did not create, this will generate an error (you only see this error page in development) but it will show you the new pages `/blog/gatsby` and `/blog/react`
    - Click on both pages and you will see the basic component with `Basic Blog` on both pages which lets you know that your template is working
    - The 404 page is autogenerated but we can customize it later

## We now have a way to dynamically generate pages

## Need to do 2 more things
1. Render the post content on the gatsby page
2. And on the blog list we want to link to the individual pages

### Assignment
* Make the headings on the blog page link to the individual pages we just created

#### Goal: Link to blog posts
1. Fetch the slug for posts
2. Use slug to generate a link to the post page
3. Test your work

`pages/blog.js`

```
import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

// custom components
import Layout from '../components/layout'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  // console.log(data);
  return (
    <Layout>
      <h1>This is my Blog Page</h1>
      <ol>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            <li>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
              <p>{edge.node.frontmatter.date}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage
```

## Next
* How to use this slug in the template to fetch the data (title, date, post body) because all of that needs to get rendered to the screen





