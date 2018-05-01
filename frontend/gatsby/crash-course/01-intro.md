# Crash Course on Gatsby
## install gatsby cli globally

`$ npm i -g gatsby -cli`

## Create project
`$ gatsby new gatsby-crash-course`

`$ cd gatsby-crash-course`

`$ gatsby develop`

## View in browser
`localhost:8000`

## change site title
`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Ironcove Solutions',
  },
  plugins: ['gatsby-plugin-react-helmet'],
}
```

* If you change config file you need to restart the server
* **note** I've found that if you add plugins you need to restart the server but updating variable values is fine
  - When in doubt, restart

## Change meta for page
`layouts/index.js`

```
// MORE CODE
<Helmet
  title={data.site.siteMetadata.title}
  meta={[
    { name: 'description', content: 'new descr i just added' },
    { name: 'keywords', content: 'keywords are not needed anymore' },
  ]}
/>
// MORE CODE
```

case study
* https://www.gatsbyjs.org/blog/gatsbygram-case-study/

## Create our static pages
`pages/index.js`

```
import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Welcome to our site</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
  </div>
)

export default IndexPage
```

`pages/about.js`

```
import React from 'react'

const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <p>this is who we are</p>
    </div>
  )
}

export default AboutPage;
```

`pages/services.js`

```
import React from 'react'

const ServicesPage = () => {
  return (
    <div>
      <h1>Services</h1>
      <p>This is what we do</p>
    </div>
  )
}

export default ServicesPage;
```

## Add a navbar
`components/navbar.js`

```
import React from 'react'
import Link from 'gatsby-link'

const Navbar = () => (
  <div
    style={{
      background: '#f4f4f4',
      paddingTop: '10px',
    }}
  >
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-evenly',
      }}
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/services">Services</Link>
      </li>
    </ul>
  </div>
)

export default Navbar
```

## Add the navbar to the main layout
`layouts/index.js`

```
// MORE CODE
const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'new descr i just added' },
        { name: 'keywords', content: 'keywords are not needed anymore' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <Navbar />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)
// MORE CODE
```

## alter the navbar links in the global css
`layouts/index.css`

```
// MORE CODE
a {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  color: #333;
  text-decoration: none;
}
// MORE CODE
```

## Create a blog
`pages/2018-04-10-post-one/index.md`

```
---
path: '/post-two'
date: '2018-04-10'
title: 'My very first gatsby post'
author: 'PEH2'
---

This is my very first post in Gatsby
```

* Stuff inside the --- and --- is called `frontmatter`

* create another blog post

`pages/2018-04-30-post-one/index.md`

```
---
path: '/post-two'
date: '2018-04-30'
title: 'My second gatsby post'
author: 'PEH2'
---

This is my second post in Gatsby
```

* Add a special plugin `gatsby-source-filesystem`
    - This allows us to work with data from our computer's file system
    - We need this to be able to query our blog post from our file system
* We'll also need `gatsby-transformer-remark`
    - This will enable us to transform posts written in markdown (.md files) on the local disk into HTML for rendering
* We also need `gatsby-plugin-catch-links`
    - This will intercept local links from markdown and other non-react pages and does a client side push state to avoid the browser having to refresh the page

`$ npm i gatsby-source-filesystem gatsby-transformer-remark gatsby-plugin-catch-links`

## After installing plugins you need to configure them
`gatsby-config.js`

```js
module.exports = {
  siteMetadata: {
    title: 'Ironcove Solutions',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-transformer-remark',
  ],
}
```

* Run site to make sure there are no errors

`$ gatsby develop`

edges is an array of our nodes
and our nodes are our files

graphql - find frontmatter

```
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          path
          title
          author
        }
      }
    }
  }
}
```

graphql - with content (using excerpt ) and frontmatter

```
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          path
          title
          author
        }
        excerpt
      }
    }
  }
}
```

`pages/blog.js`

```
import React from 'react'
import Link from 'gatsby-link'

const BlogPage = ({ data }) => (
  <div>
    <h1>Latest posts</h1>
    {data.allMarkdownRemark.edges.map(post => (
      <div key={post.node.id}>
        <h3>{post.node.frontmatter.title}</h3>
        <small>
          Posted by {post.node.frontmatter.author} on{' '}
          {post.node.frontmatter.date}
        </small>
        <br />
        <br />
        <Link to={post.node.frontmatter.path}>Read More</Link>
        <br />
        <br />
        <hr />
      </div>
    ))}
  </div>
)

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            path
            title
            author
          }
          excerpt
        }
      }
    }
  }
`

export default BlogPage
```

* Don't forget to add to your navbar

```
// MORE CODE
                <Link to="/blog" className="nav-link">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
        </div>
      </nav>
    )
  }
}

export default SiteNavi
```

* **note** Gatsby encoures not using semi-colons
    - but it is just a preference
* **note** dangerouslySetInnerHTML={{ __html: post.html }}
     - enables us to have HTML inside our react template
     - It is pure React code

## get one page of our blog

`$ npm i gatsby-plugin-catch-links gatsby-plugin-sass gatsby-source-filesystem gatsby-transformer-remark`

```
module.exports = {
  siteMetadata: {
    title: 'Ironcove Solutions',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
  ],
}
```



```
import React from 'react'
import Link from 'gatsby-link'

export default function Template({ data }) {
  const post = data.allMarkdownRemark

  return (
    <div>
      <Link to="/">Go Back</Link>
      <hr />
      <h1>{post.frontmatter.title}</h1>
      <h4>
        Posted by {post.frontmatter.author} on {post.frontmatter.date}
      </h4>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export const postQuery = graphql`
 markdownRemark(frontmatter: { path: { eq: $path } }) {
  html
  frontmatter {
   path 
   title 
   author 
   date
  }
 }
`
```


## Add StyledComponents
npm i styled-components gatsby-styled-components

```
module.exports = {
  siteMetadata: {
    title: 'Ironcove Solutions',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
  ],
}
```

## Example of using styled components
```
/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import './../layouts/gatstrap.scss'
import './../layouts/colors.scss'
import logo from './../images/ics-logo.png'

const HeaderWrapper = styled.header`
  background-image: linear-gradient(to top, #f0f0f0, #f4f4f4);
  padding-top: 0.5rem;
`
const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <div className="container">
      <Link to="/">
        <img src={logo} alt={siteTitle} />
      </Link>
    </div>
  </HeaderWrapper>
)

export default Header
```
