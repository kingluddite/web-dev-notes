# Blog Query
* Date is using Moment JS behind the scenes
    - Look a t moment docs for formatting date differently than

`MMMM Do, YYYY` - `October 10, 2020`

## GraphQL
```
query MyQuery {
  allStrapiBlogs(sort: {fields: date, order: DESC}, limit: 3) {
    nodes {
      desc
      slug
      content
      date(formatString: "MMMM Do, YYYY")
      id
      title
      category
      image {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  }
}
```
