# Improve our Query with Filtering and Sorting

## Organize our Query better
* Currently the GraphQL is taking up a big chunk of space and it makes it hard to understand what our component is doing
* We will move it out
* This is a common technique when working with Apollo

### Create a variable
* Name it ALL_UPPER_CASE_AND_SEPARATE_WORDS_WITH_UNDERSCORES

`archive.js`

```
// MORE CODE

const POST_ARCHIVE_QUERY = graphql`
  query BLOG_POST_ARCHIVE_QUERY {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}

// MORE CODE
```

* **note** It is common to place GraphQL in its own file

## Add a `key`
* We need to address this warning `Warning: Each child in an array or iterator should have a unique "key" prop.`
* We need the `key` to be unique
* A great unique key will be `slug` as no two slugs can be the same

`archive.js`

```
// MORE CODE

          <ul>
            {allMarkdownRemark.edges.map(edge => (
              <li key={edge.node.frontmatter.slug}>
                {edge.node.frontmatter.title}
              </li>
            ))}
          </ul>

// MORE CODE
```

* Now the warning is gone

## Add Link
* This is now part of the `gatsby` plugin
* Just needs a `to` attribute
* We will use the slug to point it to the current post

```
import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

// MORE CODE

const Archive = () => (

    // MORE CODE

          <ul>
            {allMarkdownRemark.edges.map(edge => (
              <li key={edge.node.frontmatter.slug}>
                <Link to={`/post/${ edge.node.frontmatter.slug }`}>
                  {edge.node.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>

// MORE CODE
```

## Test in browser
* Click all 3 post links in the archive section
* They all go to 404 page
* We get a UI warning (here's a warning when we click on the third post link - `There's not a page yet at **/third-post**`
* The browser shows this in the URL: `http://localhost:8000/posts/third-post`
* The console shows something odd: `A page wasn't found for "/posts//third-post"`
    - Why are there two forward slashes?
    - Gatsby adds the slash for us so we can remove the extra forward slash

```
// MORE CODE

<Link to={`/post${ edge.node.frontmatter.slug }`}>

// MORE CODE
```

* Test in browser
* The extra forward slash (shown in the CDT Console) is gone

## MarkdownRemarkConnection
* Open GraphQL sandbox `http://localhost:8000/___graphql`
* Enter this query and play

```
// MORE CODE

query BLOG_POST_ARCHIVE_QUERY {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          slug
        }
      }
    }
  }
}

// MORE CODE
```

* Use GraphQL Documentation to view the MarkdownRemarkConnection Documentation
* You will see we have these **arguments**
    - skip
    - limit
    - sort
    - filter

### Us `limit` to only show one post
```
query BLOG_POST_ARCHIVE_QUERY {
  allMarkdownRemark(limit: 1) {
    edges {
      node {
        frontmatter {
          title
          slug
        }
      }
    }
  }
}
```

* Click play and only one post shows
* We only want to show 5 posts at 1 time (if we had 1 million posts we wouldn't want them all showing)

```
// MORE CODE

query BLOG_POST_ARCHIVE_QUERY {
  allMarkdownRemark(limit: 5) {
    edges {
      node {
        frontmatter {
          title
          slug
        }
      }
    }
  }
}

// MORE CODE
```

## How do we sort?
* Click on `markdownRemarkConnectionSort`
* `allMarkdownRemark(limit: 5, sort: { }`
    - Then we have inside the object `fields` and the value is inside an array
    - We need to use the `date` field and sort by that in **descending** order

```
// MORE CODE

query BLOG_POST_ARCHIVE_QUERY {
  allMarkdownRemark(limit: 5, sort: {
    order: DESC,
    fields: [frontmatter___date]
  }) {
    edges {
      node {
        frontmatter {
          title
          slug
        }
      }
    }
  }
}
// MORE CODE
```

* Hit play and the posts are in descending order
* **note** How we sort by fields and date is from the `allMarkdownRemark` plugin and if you are using something else (like Contentful) you will need to use their documentation to see how they sort
    - This is not built into GraphQL, it is built into the plugin you are using to query which is called the **resolver**

## Add our GraphQL query to our client side code
`archive.js`

```
// MORE CODE

const POST_ARCHIVE_QUERY = graphql`
  query BLOG_POST_ARCHIVE_QUERY {
    allMarkdownRemark(
      limit: 5
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

// MORE CODE
```

### Test in browser
* Now our UI is showing the posts sorted in reverse order by `date`

## Next
* We'll learn all about Gatsby Node
    - This will fix our links going to actual pages
    - This file intimidates people so we will go through it line by line and after that it shouldn't be too intimidating

 
