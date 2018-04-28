# Build Index Page
* Use the graphQl from before
* paste into GraphQl UI
* Make sure it works

`src/pages/index.js`

```
import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10) {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
export default IndexPage
```

## Chrome React Dev tools
* Search for Index page

![index page](https://i.imgur.com/QQyby13.png)

* We see `Props` > `data` > `allmarkdownRemark` > `edges` Array[2]
    - That's where all our stuff is

## Add unique keys
![keys added](https://i.imgur.com/ylfiIC7.png)

```
import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    <h2>
      {data.allMarkdownRemark.edges.map(post => (
        <a key={post.node.id} href={post.node.frontmatter.path}>
          {post.node.frontmatter.title}
        </a>
      ))}
    </h2>
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
export default IndexPage
```

