 # Gatsby Pages
* Gatsby looks into the src/pages directory to find all static pages your site needs
* react is already installed as part of a Gatsby project

src > pages

`index.js`

* Important to name home page `index.js` (similar to `index.html` for a site homepage)

```
import React from 'react'

const IndexPage = () => {
  return (
    <div>
     <h1>Hello</h1>  
     <h2>I'm a full-stack developer</h2>
    </div>
  )
}

export default IndexPage
```

* Prefer to separate variable and last line export of that variable
  - This makes it easier to manage my code

`blog.js`

```
import React from 'react'

const BlogPage = () => {
  return (
    <div>
      <h1>This is my Blog Page</h1>
      <p>My posts will go here</p>
    </div>
  )
}

export default BlogPage
```

* The slug `blog` will be the page

`http://localhost:8000/blog`

* If you go to a page not registered you'll see the default development page

`http://localhost:8000/xxx`

* I use this to see all the static pages that are created

## Homework
```
Goal: Create an about page and a contact page

1. Create an about page. Include a page title and a bio
2. Create a contact page. Include a page title and contact details
3. Test your work
```

`about.js`

```
import React from 'react'

const AboutPage = () => {
  return (
    <div>
      <h1>About Me</h1>
      <p>This is my bio</p>
    </div>
  )
}

export default AboutPage
```

`contact.js`

```
import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <h1>This is my Blog Page</h1>
      <p>My posts will go here</p>
    </div>
  )
}

export default ContactPage
```

