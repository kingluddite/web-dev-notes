# Rendering Post Data in Blog Template
* How can we set up a dynamic GraphQL query
    - This query needs to accept the slug and it needs to give us back and it needs to give us back the data for the associated post
    - We are going to replace our placeholder text with our actual data (title, date...)

`templates/blog.js`

```
import React from 'react'

import Layout from '../components/layout'

const Blog = () => {
  return <Layout>Basic Blog</Layout>
}

export default Blog
```

* We have access to the `slug` but we can't access the static query we need a dynamic query

## Learning how to use GraphQL variables and arguments
* Open Playground and check out the docs
* Before we used allMarkdownRemark (for a list of posts) and now we are going to use `markdownRemark` for a single post
    - Examine the markdownRemark call signature
    - query name followed by a list of arguments followed by what we get back which is `MarkdownRemark` (and we can see the type details of that - stuff like fetching frontmatter, html or fields

### scroll down to markdownRemark arguments
* This contains all the different ways we can target the post we are trying to fetch
    - And in our case we are going to target it by its `fields`
        + And inside fields all we have access to now is `slug`
        + And we can target it using StringQueryOperatorInput
            * eq (short for equality)
                - This will enable us to target a post by its target value
            * ne
            * in
            * nin
            * regex
            * glob

## Try this in Playground
```
query {
  markdownRemark {
    frontmatter {
      title
    }
  }
}
```

* Will output

```
{
  "data": {
    "markdownRemark": {
      "frontmatter": {
        "title": "What technologies does GatsbyJS use?"
      }
    }
  }
}
```

That just returns the first post it finds... not helpful to us

We need to target it by the `slug` value and to do that we have to set up arguments for our query

* The arguments come right after the query name
* Common to put them on their own line like this:

```
query {
  markdownRemark (
    fields:{
      slug: {
        eq: "react"
      }
    }
  ) {
    frontmatter {
      title
    }
  }
}
```

* And that will output

```
{
  "data": {
    "markdownRemark": {
      "frontmatter": {
        "title": "React"
      }
    }
  }
}
```

* Above we are hard coding
* I could change it to "Gatsby" and we would get that data
* I could change it to "bla bla" and that would return `null` because it doesn't exist
* But how can I dynamically call slugs? Through Variables

## Using query variables in Playground
* We define query variables with a preceding `$`
* We define them just after the `query` inside `(` and `)`
* We have the variable as the name and the type as a String (there are many other types GraphQL supports)

```
query(
  $slug: String
) {
  markdownRemark (
    fields:{
      slug: {
        eq: $slug
      }
    }
  ) {
    frontmatter {
      title
    }
  }
}
```

* Then define a query variable like this (bottom left of Playground)

```
{
  "slug": "gatsby"
}
```

* Now whatever our slug variable value is we'll get a different result

### Tranfer Playground to our template
* Before we used `useStaticQuery` and `graphql` like in footer.js

`footer.js`

```
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
    <footer>
      <p>Created by {data.site.siteMetadata.author}, &copy; 2019</p>
    </footer>
  )
}

export default Footer
```

* But GraphQL works differently in template files
* Instead, for template files, we will define our GraphQL queries separately and export it
    - And the reason for this is that currently there is no way to access the context (which contains our slug) if we were to work with `useStaticQuery`
    - But this alternative approach will work really well just with our template files

```
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`
const Blog = () => {
  return <Layout>Basic Blog</Layout>
}

export default Blog
```

* Our Playground format after pasting it into Gatsby will format it differently (this is fine)

## Grab other stuff we need from GraphQL
* Make sure you test in Playground first so you know it works

```
query(
  $slug: String
) {
  markdownRemark (
    fields:{
      slug: {
        eq: $slug
      }
    }
  ) {
    frontmatter {
      title
      date
    }
    html
  }
}
```

And then update your file

```
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`
const Blog = () => {
  return <Layout>Basic Blog</Layout>
}

export default Blog
```

## Make sure to `export` GraphQL for templates
* We need to enable Gatsby to be able to export our query and run it so we add `export`

```
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`
const Blog = () => {
  return <Layout>Basic Blog</Layout>
}

export default Blog
```

* Above we export `query` as a named export

1. Gatsby will grab our GraphQL query
2. It will run it
3. The variable slug will come from the context we set up when we created the page
4. Then Gatsby will take the response (all of the post data) and it will provide that as a `prop` to our component down below

## Pull the data into our template component using `props`

```
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`
const Blog = props => {
  return (
    <Layout>
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      <p>{props.data.markdownRemark.frontmatter.date}</p>
      <div
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      />
    </Layout>
  )
}

export default Blog
```

* We need to use `dangerouslySetInnerHTML` like above when pulling in `html`

## Test it out
* Click on blog and you see posts
* Click on an individual post and you'll see it's content


