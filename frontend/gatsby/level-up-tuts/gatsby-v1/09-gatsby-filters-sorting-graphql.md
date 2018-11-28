# Filters & Sorting with GraphQL
* Change blog posts to have `published` frontmatter

```
---
path: '/second-post'
title: 'Second Blog Post'
published: false
---
```

`pages/index.js`

```
// MORE CODE
const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    <h2>Index</h2>
    <ul>
      {data.allMarkdownRemark.edges.map(post => (
        <li>
          <Link key={post.node.id} to={post.node.frontmatter.path}>
            {post.node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
// MORE CODE
```

* We put it in a list to make it look nicer

## Add published field
graphql UI

```
{
  allMarkdownRemark(limit: 10) {
    edges {
      node {
        id
        frontmatter {
          title
          path
          published
        }
      }
    }
  }
}
```

But we get an error
just stop and restart server

## Add filter
* test in graphql UI

```
{
  allMarkdownRemark(
    limit: 10
    filter: { frontmatter: { published: { eq: true } } }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          path
          published
        }
      }
    }
  }
}
```

* run query and you'll see we only see published blog posts

```
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            published
          }
        }
      }
    }
  }
`
export default IndexPage
```

* Now we only see the published blog post
    - The other one was filtered out
    - Turn the false published post to true and it will appear

## Sort by dates
```
---
path: '/first-post'
title: 'First Blog Post'
published: true
date: '2018-03-10'
---

# Yo!
```

* We add date

```
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            published
            date
          }
        }
      }
    }
  }
`
export default IndexPage
```

* Add date to our query
* restart server

## sort
```
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            published
            date
          }
        }
      }
    }
  }
`
export default IndexPage
```

