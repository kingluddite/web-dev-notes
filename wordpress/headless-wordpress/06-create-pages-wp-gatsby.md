# Create pages in Gatsby for WP site

`gatsby-node.js`

```
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allWordpressPage {
          edges {
            node {
              id
              slug
              title
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      result.data.allWordpressPage.edges.forEach(({ node }) => {
        createPage({
          path: node.slug,
          component: path.resolve('./src/pages/page-2.js'),
        })
      })

      resolve()
    })
  })
}
```

* view localhost:8000/sample-page (it is working!)
* If you view localhost:8000/sample-wrong (it is 404 page)
