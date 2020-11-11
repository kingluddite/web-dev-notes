# Recent posts
* Ask if you:
    - Used something before that is similar
        + If so you can use the history in GraphQL (if you gave your query's labels)
        + Reusing queries will save you time
        + Then you can modify the query to meet the needs of your new component
        + **note** make sure you are using the browser where you saved your GraphQL history

## GraphQL labels vs names
* You can label your queries for future use (this is different than the query name)
* If it is going to be a list, keep the `id` in the query

```
query GetLastFivePosts {
  allMdx(limit: 5) {
    nodes {
      frontmatter {
        title
        slug
        image {
          childImageSharp {
            fixed {
              src
            }
            id
          }
        }
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
}
```

## Put this query inside Banner/Recent.js
* It is not a page so remove export

```
// MORE CODE

import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import Title from './Title'

const query = graphql`
  {
    allMdx(limit: 5) {
      nodes {
        frontmatter {
          title
          slug
          image {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFluid
              }
              id
            }
          }
          date(formatString: "MMMM Do, YYYY")
        }
      }
    }
  }
`

// MORE CODE
```

* I need to sort the date in DESC

```
// MORE CODE

query GetLastFivePosts {
  allMdx(limit: 5, sort: {fields: frontmatter___date, order: DESC}) {
// MORE CODE
```

* Add to our query in our component

```
// MORE CODE

import Title from './Title'

const query = graphql`
  {
    allMdx(limit: 5, sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
          slug
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
              id
            }
          }
          date(formatString: "MMMM Do, YYYY")
        }
      }
    }
  }
`
// MORE CODE
```

## Destructure and map through our array of posts
* We give our `nodes` and alias of `posts` (makes our code more readable)

```
// MORE CODE

const Recent = () => {
  const data = useStaticQuery(query)
  const {
    allMdx: { nodes: posts },
  } = data
  return (
    <Wrapper>
      <Title title="recent" />
      {posts.map(post => {
        return <h5>post</h5>
      })}
    </Wrapper>
  )
}

// MORE CODE
```

## Destructure to get our fields inside our map method
* We pluck these from our `frontmatter` field

```
// MORE CODE

    <Wrapper>
      <Title title="recent" />
      {posts.map(post => {
        const {
          title,
          slug,
          date,
          image: {
            childImageSharp: { fluid },
          },
        } = post.frontmatter

        return <h5>post</h5>
      })}
    </Wrapper>

// MORE CODE
```

* All these posts will be links to the posts
* **note** The `key` is not in the frontmatter so we can access is with `post.id`

## Test
* Click on latest posts and you'll see the last 5


