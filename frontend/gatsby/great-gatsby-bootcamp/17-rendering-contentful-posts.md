# Rendering Contentful Posts
## Swap posts to use contentful posts instead of markdown posts
AllContentfulBlogPost
* You will see
    - Arguments
        + filter
        + sort
        + skip
        + limit

## Sort
ContentfulBlogPostSortInput

* fields
* order
* We will sort by publishedDate using DESC (most recent posts first)

```
query {
  allContentfulBlogPost (
    sort: {
     fields: publishedDate,
      order: DESC
    }
  ) {
    edges {
      node {
        title
        slug
        publishedDate
      }
    }
  }
}
```

IF you wanted to reverse the order

```
query {
  allContentfulBlogPost (
    sort: {
     fields: publishedDate,
      order: ASC
    }
  ) {
    edges {
      node {
        title
        slug
        publishedDate
      }
    }
  }
}
```

## Format publishedDate
* Navigate the API and you'll see the publishedDate can be formatted using moment.js date tokens

```
query {
  allContentfulBlogPost (
    sort: {
     fields: publishedDate,
      order: DESC
    }
  ) {
    edges {
      node {
        title
        slug
        publishedDate(fromNow: true)
      }
    }
  }
}
```

* Output

```
{
  "data": {
    "allContentfulBlogPost": {
      "edges": [
        {
          "node": {
            "title": "Debug node",
            "slug": "debug-node",
            "publishedDate": "in 11 days"
          }
        },
        {
          "node": {
            "title": "My first Contentful",
            "slug": "contentful",
            "publishedDate": "16 hours ago"
          }
        }
      ]
    }
  }
}
```

* Format the date

```
query {
  allContentfulBlogPost (
    sort: {
     fields: publishedDate,
      order: DESC
    }
  ) {
    edges {
      node {
        title
        slug
        publishedDate(formatString: "MMMM Do, YYYY")
      }
    }
  }
}
```

* Output

```
{
  "data": {
    "allContentfulBlogPost": {
      "edges": [
        {
          "node": {
            "title": "Debug node",
            "slug": "debug-node",
            "publishedDate": "May 31st 2019"
          }
        },
        {
          "node": {
            "title": "My first Contentful",
            "slug": "contentful",
            "publishedDate": "May 19th 2019"
          }
        }
      ]
    }
  }
}
```

## Customize even more using moment.js
[docs for tokens](https://momentjs.com/docs/#/displaying/)

## Challenge
* Create a new file called `blog-content.js`
* Goal: Render Contentful Posts
* 1. Write a contentful query
* 2. Render the new data
    - Don't worry if the link links to a non-existant page
* 3. Test your work

`src/pages/blog-contentful.js`

* We will be using Contentful and Markdown in same project

```
import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

// custom components
import Layout from '../components/layout'
import blogContentfulStyles from './blog-contentful.module.scss'

const BlogContentfulPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            title
            slug
            publishedDate(formatString: "MMMM Do YYYY")
          }
        }
      }
    }
  `)
  // console.log(data);
  return (
    <Layout>
      <h1>This is my Contentful Blog Page</h1>
      <ol className={blogContentfulStyles.posts}>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className={blogContentfulStyles.post}>
              <Link to={`/blog/${edge.node.slug}`}>
                <h2>{edge.node.title}</h2>
                <p>{edge.node.date}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogContentfulPage
```

* Add the new page to your navbar (do this on your own)

