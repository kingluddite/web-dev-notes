# Adding Images to Posts
* Use this image `links.mead.io/grasspic`
* Save image to `src/posts/grass/png`

## Render image in post
`posts/gatsby.md`

```
---
title: "What technologies does GatsbyJS use?"
date: "2019-04-21"
---

GatsbyJS uses the following technologies

![Grass](./grass.png)

## Technologies

1. React
2. GraphQL
3. JavaScript
4. HTML
5. CSS
6. Sass (optional)
7. CSS Modules (optional)
8. NodeJS
9. JSX
```

* Above is how you add an image
* `[alt attribute value for screenreader](relative path to image)`

## View in browser
* You will see `alt` text only and a broken image
* The reason is gatsby doesn't yet know where you are going to fetch the image from

### Install 3 plugins to set up support for this syntax
* shut down server
* `$ npm i gatsby-plugin-sharp gatsby-remark-images gatsby-remark-relative-images`

### gatsby-plugin-sharp
* Allows us to use the sharp library inside gatsby sites
* The sharp library provides many tools for working with and manipulating images and it is a dependency of the other plugins we are going to use

### gatsby-remark-images
* Allows us to use images inside our markdown posts when they are processed with remark

### gatsby-remark-relative-images
* This will allow us to source image relative to the markdown file (this will now correctly render our relative path `./grass.png`)

## Now we need to make big changes to the plugins array
* These changes happen inside `gatsby-config.js`
* No options needed for `gatsby-plugin-sharp`
* But since we need to add options to our remark plugin we'll need to remove it and add it as an object with options

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Full-Stack Gatsby Bootcamp!',
    author: 'Kingluddite',
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
}
```

* maxWidth - We have an image that is 1920 x 1080 (standard HD size) but the css in the blog says the largest width never is greater than 750px
    - So the image is unnecessarily large for the context in which it is used
    - With this plugin and this configuration, our gatsby blog will automatically resize the image by setting maxWidth to a value (750)
    - linkImagesToOriginal set to false keeps people from clicking on an image and going to a page just to see the image (which bugs me and that is why it is off)

## Test in browser
* `$ npm run develop`
* You should see the image now in the browser (refresh page if you get an error)
* View the image in the CDT inspector and you'll see the image width has magically be truncated to be 750px wide

## Organize your folder better
* Create a folder for each page
* `posts/gatsby/gatsby.md` and `posts/gatsby/grass.png`

### New CSS Modules
* `$ touch components/footer.module.css`

```
.footer {
  margin-top: 3rem;
}
```

### Apply the CSS Module to our footer.js

```
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import footerStyles from './footer.module.scss'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)
  return (
    <footer className={footerStyles.footer}>
      <p>Created by {data.site.siteMetadata.author}, &copy; 2019</p>
    </footer>
  )
}

export default Footer
```

## Style our blog list
`pages/blog.module.scss`

```
.posts {
  list-style-type: none;
  margin: 0;
}
```

`pages/blog.js`

```
import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

// custom components
import Layout from '../components/layout'
import blogStyles from './blog.module.scss'

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
      <ol className={blogStyles.posts}>
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

`blog.module.scss`

```
.posts {
  list-style-type: none;
  margin: 0;
}

.post {
  margin: 1rem 0;
}
```

`blog.js`

```
// MORE CODE

return (
  <Layout>
    <h1>This is my Blog Page</h1>
    <ol className={blogStyles.posts}>
      {data.allMarkdownRemark.edges.map(edge => {
        return (
          <li className={blogStyles.post}>

          // MORE CODE
```

## More style additions
`blog.module.scss`

```
.posts {
  list-style-type: none;
  margin: 0;
}

.post {
  margin: 1rem 0;

  a {
    background: #f4f4f4;
    color: #000000;
    display: block;
    padding: 1rem;
    text-decoration: none;
  }

  a:hover {
    background: #e4e4e4;
  }

  h2 {
    margin-bottom: 0;
  }

  p {
    color: #777777;
    font-size: .8rem;
    font-style: italic;
  }
}
```
