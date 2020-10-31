# Hero
## Point to one static image
* We need to use `gatsby-config.js`

```
// MORE CODE

{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
// MORE CODE
```

* We will use GraphQL and use `file` because we just want to point to one image

```
// MORE CODE

query MyQuery {
  person: file(relativePath: {eq: "person.png"}) {
    relativePath
  }
}
// MORE CODE
```

* That will grab the image we want from the assets folder
* We create a `person` alias

### Get our image
GraphQL

```
query MyQuery {
  person: file(relativePath: {eq: "person.png"}) {
    relativePath
    childImageSharp {
      fluid {
        srcSet
      }
    }
  }
}

```

* We are using srcSet here but eventually we'll use's a gatsby fragment

## To export
* We are using our `Page query`
* But we'll copy and paste just the variable to the ending backtick in `Code Exporter`
* Since we are using a component we don't need a page query

```
// MORE CODE

const query = graphql`
  {
    person: file(relativePath: {eq: "person.png"}) {
      relativePath
      childImageSharp {
        fluid {
          srcSet
        }
      }
    }
  }
`
// MORE CODE
```

## Put our query into our Hero component
`components/Hero.js`

```
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
// ...GatsbyImageSharpFluid

const query = graphql`
  {
    person: file(relativePath: { eq: "person.png" }) {
      relativePath
      childImageSharp {
        fluid {
          srcSet
        }
      }
    }
  }
`

const Hero = () => {
  return <h2>hero component</h2>
}

export default Hero
```

## Replace our srcset with our Gatsby Fragment

`Hero.js`

```
// MORE CODE

const query = graphql`
  {
    person: file(relativePath: { eq: "person.png" }) {
      relativePath
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
// MORE CODE
```

## Now we want to access this query
* We imported `graphql` and `useStaticQuery` in Hero.js

### I want to destructure the person out of my query
`Hero.js`

```
// MORE CODE

const query = graphql`
  {
    person: file(relativePath: { eq: "person.png" }) {
      relativePath
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const Hero = () => {
  console.log(useStaticQuery(query))
  return <h2>hero component</h2>
}
// MORE CODE
```

* But I don't see anything
* The reason is we need to render the Hero component

`pages/index.js`

```
// MORE CODE

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
    </Layout>
  )
}
// MORE CODE
```

* And now you will see our data in the browser

![data from StaticQuery](https://i.imgur.com/2RLw6F9.png)

## Destructure `person` alias from our data
`Hero.js`

```
// MORE CODE

const Hero = () => {
  const { person } = useStaticQuery(query)
  console.log(person)
  return <h2>hero component</h2>
}
// MORE CODE
```

## Add the image
* Since I am using a fluid prop in static query I also need to use `fluid` prop in my image

`Heros.js`

```
// MORE CODE

const Hero = () => {
  const { person } = useStaticQuery(query)

  return (
    <header className="hero">
      <Image fluid={person.childImageSharp.fluid} className="hero-person" />
    </header>
  )
}
// MORE CODE
```

## Only show the image if we pass a `showPerson` prop
`Hero.js`

```
// MORE CODE

const Hero = ({ showPerson }) => {
  const { person } = useStaticQuery(query)

  return (
    <header className="hero">
      {showPerson && (
        <Image fluid={person.childImageSharp.fluid} className="hero-person" />
      )}
    </header>
  )
}
// MORE CODE
```

* Now we don't see the image because we didn't pass the `showPerson` prop on the home page

### But let's show it on the Posts page
`pages/index.js`

```
// MORE CODE

const IndexPage = () => {
  return (
    <Layout>
      <Hero showPerson />
    </Layout>
  )
}

export default IndexPage
// MORE CODE
```

* Now because we pass the `showPerson` prop we see the image on the Hero

`pages/posts.js`

```
// MORE CODE

const PostsPage = ({ data }) => {
  return (
    <>
      <h1>Posts</h1>
      <Hero />
    </>
  )
}

export default PostsPage

// MORE CODE
```

* But on posts page we don't see image in Hero because we didn't pass the `showPerson` prop

## Footer
`Layout.js`

* Comment in the footer

```
// MORE CODE

return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}></Sidebar>
      <main>{children}</main>
      <Footer />
    </>
  )
// MORE CODE
```

`Footer.js`

```
// MORE CODE

import React from 'react'
import SocialLinks from '../constants/socialLinks'
const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <SocialLinks styleClass="footer-icons" />
        <p>&copy;{new Date().getFullYear()} MDXBlog. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
// MORE CODE
```

## 404 page
`404.js`

```
import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <section className="error-page">
      <div className="page-center">
        <span>404</span>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to="/" className="btn">
          back home
        </Link>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
```
