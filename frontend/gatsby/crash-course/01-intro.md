# Crash Course on Gatsby

## cache
* if you have issues, delete the cache folder and restart develop (cache is buggy sometimes)

* you can't have spaces in your image names
* remove static from path
* this is a pain so to not have to do this again use this in your config.yml

```
// MORE CODE
media_folder: static/assets
public_folder: /assets

// MORE CODE
```

## images
* helps us transform and manipulate imagees

### gatsby-transformer-sharp and gatsby-plugin-sharp
* will allow us to use the sharp image manipulation tools

`$ npm i gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp`

## styled components
`$ npm i --save styled-components gatsby-plugin-styled-components babel-plugin-styled-components`

`gatsby-config.js`

```js
module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    desc: 'A new blog',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
```

## Make gatsby aware that we will have files available for it
* We need to query our system with graphql
    - By default gatsby does not know how to do that

### Tell gatsby we want to also query images and we show where they are location

```js
module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    desc: 'A new blog',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
```

* Restart gatsby process
  - ctrl + c
  - gatsby develop
  - always smart to do after changing config to make sure takes are taken into effect

**note** We will get an error because we tried to use but did not install

`$ npm i gatsby-source-filesystem`

```
{
  site {
    siteMetadata {
      title
      desc
    }
  }
  imageSharp(id: {regex: "/bg.jpeg"})
}
```

* This does not work and we get an error, graphyql buggy on searching for images
* We need to paste it into our site and work from it through there
* gatsby does some things it's own way
* Through gatsby we will assign an image to a background

## this works:

![access to image info](https://i.imgur.com/iKGvZtd.png)

`pages/index.js`

```
import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hello people</h1>
    <p>data.site.siteMetadata.title</p>
    <p>data.site.siteMetadata.desc</p>
    <p>Now go build something great.</p>
  </div>
)

export default IndexPage

export const query = graphql`
  query SiteMeta {
    site {
      siteMetadata {
        title
        desc
      }
    }
    background: imageSharp(id: { regex: "/bg.jpeg/" }) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
```

* This is a long process but comes with great time saving benefits
* Now we need to drop in the image data we have available to our home page 

`pages/index.js`

```
import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hello people</h1>
    <Img sizes={data.background.sizes} />
    <p>{data.site.siteMetadata.title}</p>
    <p>{data.site.siteMetadata.desc}</p>
    <p>Now go build something great.</p>
  </div>
)
// MORE CODE
```

* Now we have a bg image on our page

### Why is this cool?
* for "fee"
  - Gatsby progressively loads your images
    + common technique so a low res image loads first then the higher quality img loads... this means you images load faster to the end user
    + all we had to do is use imageSharp and other image plugins, give our image a name and we get all these benefits
    + other options
      * change max height of image, change quality of give it grey scale

## make it grayscale

```
// MORE CODE
export const query = graphql`
  query SiteMeta {
    site {
      siteMetadata {
        title
        desc
      }
    }
    background: imageSharp(id: { regex: "/bg.jpeg/" }) {
      sizes(maxWidth: 1240, grayscale: true) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
```

duotone

```
background: imageSharp(id: { regex: "/bg.jpeg/" }) {
  sizes(
    maxWidth: 1240
    duotone: { highlight: "#f00e2e", shadow: "#192550" }
  ) {
    ...GatsbyImageSharpSizes
  }
}
```

* [documentation on gatsby image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp)
* This is almost like the holy grail for images
  - we had a large image and we made it more manageable

## Warning
* Can't use graphql queries on `components` just for pages and layouts directories inside gatsby
* The natural size of this image is a whole swath of different sizes (inspect the bg image for yourself)
* ![background image sizes](https://i.imgur.com/BuQ8WVq.png)
* because we have all the different sizes per viewport width which means we can have the image load with as good as quality as it needs to per viewport size, which is incredible!

# we move the image sharp bg image from index page to header
* we put the graphql query inside layout (can't put it inside components folder)
* we move the import Img to header img
* we put the Img component underneath the HeaderContainer

### Style a react component (Img) (different than our custom StyleComponents)
* We could do this (but it won't work without a bunch of overriding)

```
import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Img from 'gatsby-image'

import logo from '../../images/logo.svg'
// import womenVid from '../../videos/women-bg-dropbox.mp4'
// console.log(logo)

const HeaderWrapper = styled.div`
  background: #524763;
  margin-bottom: 1.45rem;
  h1 {
    img {
      height: 80px;
    }
  }
`

const HeaderContainer = styled.div`
   margin: 0 auto,
   max-width: 960px,
   padding: 1.45rem 1.0875rem,
`

const Billboard = styled(Img)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const Header = ({ data }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        />
        <img src={logo} alt="Logo" />
      </h1>
      <p>{data.site.siteMetadata.title}</p>
      <p>{data.site.siteMetadata.desc}</p>
      <nav>
        <ul>
          <li>
            <Link to="/">Homee</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
    <Billboard sizes={data.background.sizes} />
  </HeaderWrapper>
)

export default Header
```

convert header component to Header (class based component)

```
import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Img from 'gatsby-image'
import logo from '../../images/logo.svg'
// import womenVid from '../../videos/women-bg-dropbox.mp4'
// console.log(logo)

const HeaderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 70vh;
  background: #524763;
  margin-bottom: 1.45rem;
  h1 {
    img {
      height: 80px;
    }
  }
`

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
`

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            />
            <img src={logo} alt="Logo" />
          </h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Homee</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </HeaderContainer>
        <Img
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
          }}
          sizes={data.background.sizes}
        />
      </HeaderWrapper>
    )
  }
}

export default Header
```

## Build Gatsby
* `$ gatsby build`
* creates a public folder with all your assets to drag to godaddy
* `$ gatsby serve`
  - It won't work unless you first run `$ gatsby build`
  - Because all serve does is run a server (it needs that `public` folder that `$ gatsby build` creates)
  - use the IP for testing on other devices (not quite as cool as browser sync)

## gatsby-plugin-netlify-cms
* `$ npm i gatsby-plugin-netlify-cms netlify-cms`

`/static/admin/config.yml`

```
backend:
  name: test-repo

media_folder: static/assets

collections:
  - name: post
    label: Posts
    folder: src/Posts
    create: true
```

browse to `http://localhost:8000/admin/#/`

* Should see Login page

## Make blog user friendly (just a test environment not persistent)

```
backend:
  name: test-repo

media_folder: static/assets

collections:
  - name: post
    label: Posts
    folder: src/Posts
    create: true
    fields:
      - { name: title, label: Title }
      - { name: date, label: Create At, widget: date }
      - { name: body, label: Post, widget: markdown }
```

## Create git locally and remote origin and push

```
backend:
  name: github 
  repo: kingluddite/levelup-pro

media_folder: static/assets

collections:
  - name: post
    label: Posts
    folder: src/Posts
    create: true
    fields:
      - { name: title, label: Title }
      - { name: date, label: Create At, widget: date }
      - { name: body, label: Post, widget: markdown }
```

/admin/

* you will see this

![no auth](https://i.imgur.com/jjWnOVh.png)

you need to get oauth access from github get client id and secret
on netflify add that info inside it's access under settings
make sure to get netlify callback url from this page

https://www.netlify.com/docs/authentication-providers/

this is the callback `https://api.netlify.com/auth/done`

when you create posts it commits to your repo and netlify updates
this is super cool
remember to pull down new posts to your local repo!

`gatsby-source-contentful`


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
