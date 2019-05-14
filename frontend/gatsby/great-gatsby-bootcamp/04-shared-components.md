# Shared Page Components
* What are something items you'll share across your site?
    - header
    - footer
    - navbar
* Keeps your code DRY
* It won't go in the pages directory since we are not creating a page
* We will create a `header` and `footer` component so we will create a `components` directory
* On Mac `option` + `g` gives you the copyright symbol `©`
    - You can also use `&copy;`

`components/footer.js`

```
import React from 'react';

const Footer = () => {
  return (
    <footer>
    <p>&copy; 2019</p>
    </footer>
  )
}

export default Footer;
```

`components/header.js`

```
import React from 'react'

const Header = () => {
  return (
    <header>
      <h1>Gatsby Bootcamp</h1>
    </header>
  )
}

export default Header
```

* Now use those shared components

`index.js`

```
import React from 'react'
import { Link } from 'gatsby'

// custom components
import Header from '../components/header'
import Footer from '../components/footer'

const IndexPage = () => {
  return (
    <div>
      <Header />
      <h1>Hello</h1>
      <h2>I'm a full-stack developer</h2>
      <p>
        Need a developer? <Link to="/contact">Contact</Link> me
      </p>
      <Footer />
    </div>
  )
}

export default IndexPage
```

## Homework
```
Goal: Add navigation to your header

1. Add navigation to all 4 pages in your header
2. Render Header and Footer on all pages
```

`header.js`

```
import React from 'react'
import { Link } from 'gatsby'

const Header = () => {
  return (
    <header>
      <h1>Gatsby Bootcamp</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
```

`about.js`

```
import React from 'react'
import { Link } from 'gatsby'

// custom components
import Header from '../components/header'
import Footer from '../components/footer'

const AboutPage = () => {
  return (
    <div>
      <Header />
      <h1>About Me</h1>
      <p>This is my bio</p>
      <Link to="/contact">Contact Me</Link>
      <Footer />
    </div>
  )
}

export default AboutPage
```

`blog.js`

```
import React from 'react'

// custom components
import Header from '../components/header'
import Footer from '../components/footer'

const BlogPage = () => {
  return (
    <div>
      <Header />
      <h1>This is my Blog Page</h1>
      <p>My posts will go here</p>
      <Footer />
    </div>
  )
}

export default BlogPage
```

`contact.js`

```
import React from 'react'

// custom components
import Header from '../components/header'
import Footer from '../components/footer'

const ContactPage = () => {
  return (
    <div>
      <Header />
      <h1>Contact Me</h1>
      <p>This is how you can contact me</p>
      <a href="https://twitter.com/king_luddite" target="_blank">
        Reach Me on Twitter
      </a>
      <Footer />
    </div>
  )
}

export default ContactPage
```

`index.js`

```
import React from 'react'
import { Link } from 'gatsby'

// custom components
import Header from '../components/header'
import Footer from '../components/footer'

const IndexPage = () => {
  return (
    <div>
      <Header />
      <h1>Hello</h1>
      <h2>I'm a full-stack developer</h2>
      <p>
        Need a developer? <Link to="/contact">Contact</Link> me
      </p>
      <Footer />
    </div>
  )
}

export default IndexPage
```







