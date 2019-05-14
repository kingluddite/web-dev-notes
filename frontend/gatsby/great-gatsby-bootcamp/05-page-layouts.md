# Gatsby Page Layouts
* We have to import Header and Footer to all 4 pages
* We will create a univeral layout component that will make our code more DRY

## src/components/layout.js
* Eventually this will be the only component are pages will need to get up and running
* We will focus on layout.js and index.js, if we get it working on those 2 it will be easy to add it to the other pages

`layout.js`

```
import React from 'react'

// custom components
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
```

* I destructure `children`
* react gives us access to `children` via `props.children`

`about.js`

```
import React from 'react'
import { Link } from 'gatsby'

// custom components
import Layout from '../components/layout'

const AboutPage = () => {
  return (
    <Layout>
      <h1>About Me</h1>
      <p>This is my bio</p>
      <Link to="/contact">Contact Me</Link>
    </Layout>
  )
}

export default AboutPage
```

`blog.js`

```
import React from 'react'

// custom components
import Layout from '../components/layout'

const BlogPage = () => {
  return (
    <Layout>
      <h1>This is my Blog Page</h1>
      <p>My posts will go here</p>
    </Layout>
  )
}

export default BlogPage
```

`contact.js`

```
import React from 'react'

// custom components
import Layout from '../components/layout'

const ContactPage = () => {
  return (
    <Layout>
      <h1>Contact Me</h1>
      <p>This is how you can contact me</p>
      <a
        href="https://twitter.com/king_luddite"
        target="_blank"
        rel="noopener noreferrer"
      >
        Reach Me on Twitter
      </a>
    </Layout>
  )
}

export default ContactPage
```

`index.js`

```
import React from 'react'
import { Link } from 'gatsby'

// custom components
import Layout from '../components/layout'

const IndexPage = () => {
  return (
    <Layout>
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
