# Working with Markdown Posts

* We need to transform these markdown files into HTML
* We'll use `gatsby-transformer-remark` to do this
  - Very easy to use
    + zero configuration
    + set it up and use it - simple
  - https://www.gatsbyjs.org/packages/gatsby-transformer-remark/

## Install it
* Shut down server
* `$ npm i gatsby-transformer-remark`

## What is remark?
* A standalone javascript library for parsing markdown files
* And we are using a gatsby plugin that runs that library behind the scenes

### Set up plugin in plugins array
* Add `gatsby-transformer-remark` to the plugins array

`gatsby-config.js`

```
// MORE CODE

    'gatsby-transformer-remark',
    // MORE CODE
  ],
}
```

## Start up dev server once again
`$ npm run develop`

* After this change we can access frontmatter and html body

## Check things out in Playground
* Refresh
* You will see two new items in your Playground Docs

  1. markdownRemark
    * Used to fetch individual posts
  2. allMarkdownRemark
    * Used for fetching a list of posts (blog page where I want to show a list of all blogs I've published with most recent ones on top)

* After re-running server we'll now be able to access our posts via the graphql api 
* If you don't see `markdownRemark` and `allMarkdownRemark` make sure:

1. npm install that module
2. add that gatsby module to the gatsby-config file
3. stop and restart server
4. Refresh playground and look at the docs

allMarkdownRemark
allMarkdownRemark > edges > node > frontmatter > access title and date
allMarkdownRemark > edges > node > access html of post, time to read

```
query {
allMarkdownRemark {
  edges {
    node {
      frontmatter {
        title
      }
    }
  }
}
}
```

output

```
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "frontmatter": {
              "title": "What technologies does GatsbyJS use?"
            }
          }
        },
        {
          "node": {
            "frontmatter": {
              "title": "React"
            }
          }
        }
      ]
    }
  }
}
```

or this

```
query {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
        }
        html
        excerpt
        timeToRead
      }
    }
  }
}
```

output

```
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "frontmatter": {
              "title": "What technologies does GatsbyJS use?"
            },
            "html": "<p>GatsbyJS uses the following technologies</p>\n<h2>Technologies</h2>\n<ol>\n<li>React</li>\n<li>GraphQL</li>\n<li>JavaScript</li>\n<li>HTML</li>\n<li>CSS</li>\n<li>Sass (optional)</li>\n<li>CSS Modules (optional)</li>\n<li>NodeJS</li>\n<li>JSX</li>\n</ol>",
            "excerpt": "GatsbyJS uses the following technologiesTechnologiesReactGraphQLJavaScriptHTMLCSSSass (optional)CSS Modules (optional)NodeJSJSX",
            "timeToRead": 1
          }
        },
        {
          "node": {
            "frontmatter": {
              "title": "React"
            },
            "html": "<p>Let's learn React</p>",
            "excerpt": "Let's learn React",
            "timeToRead": 1
          }
        }
      ]
    }
  }
}
```

## Great we have access to the data in our posts via the GraphQL API 

## Now we can run queries from our components to pull this data in and use it to render a list of the posts available

## Challenge
* In blog.js

### Goal: Show a list of posts on blog page
1. Query the title and date for each post in blog component
2. Render an ol on that page
3. Render a li with a nested h2 (title) and p (date) for each post
    - "render array of objects"
4. Test your work

`blog.js`

```
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'



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
        }
      }
    }
  }
  `)

  // MORE CODE

```

View `http://localhost:8000/blog`

View CDTC (Chrome Dev Tools Console)

You will see the data is available on the client

![data available on client](https://i.imgur.com/INajTz9.png)

`blog.js`

```
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'



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
        {data.allMarkdownRemark.edges.map((edge) => {
          return (
            <li>
              <h2>{edge.node.frontmatter.title}</h2>
              <p>{edge.node.frontmatter.date}</p>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage
```

How do we create a new page for every post?
We will use a Gatsby API that will enable us to dynamically generate new pages with the content
