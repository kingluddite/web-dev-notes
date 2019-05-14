# Link Gatsby Pages
* Let's try a standard a tag first

`index.js`

```
import React from 'react'

const IndexPage = () => {
  return (
    <div>
      <h1>Hello</h1>
      <h2>I'm a full-stack developer</h2>
      <p>
        Need a developer? <a href="/contact">Contact</a> me
      </p>
    </div>
  )
}

export default IndexPage
```

* It works but we go through a full page refresh, the entire page went away to white screen, then the contact page was loaded in
* This works but Gatsby has a link it uses which comes with a lot of optimizations that enables the content to be swapped out instantaneously

`index.js`

```
import React from 'react'
import { Link } from 'gatsby'

const IndexPage = () => {
  return (
    <div>
      <h1>Hello</h1>
      <h2>I'm a full-stack developer</h2>
      <p>
        Need a developer? <Link to="/contact">Contact</Link> me
      </p>
    </div>
  )
}

export default IndexPage
```

* Optimizations with Link
    - Gatsby will preload the page content you may be going to which give you that instant change effect and we no longer get that "flash of content" we get with the traditional `a` element
* If you are linking to an external file the `a` HTML element if fine but for internal links use the Gatsby `Link` element

## Homework
```
Goal: Add a couple of links to the site

1. On contact page, link to twitter profile
2. On about page, link to contact page
3. Test your work
```

`contact.js`

```
import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <h1>Contact Me</h1>
      <p>This is how you can contact me</p>
      <a href="https://twitter.com/king_luddite" target="_blank">
        Reach Me on Twitter
      </a>
    </div>
  )
}

export default ContactPage
```

* We use `_blank` so a new tab opens and user are completed directed away from our site

`about.js`

```
import React from 'react'
import { Link } from 'gatsby'

const AboutPage = () => {
  return (
    <div>
      <h1>About Me</h1>
      <p>This is my bio</p>
      <Link to="/contact">Contact Me</Link>
    </div>
  )
}

export default AboutPage
```





