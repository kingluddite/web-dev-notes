# Single post query
* This is a query that just gets info about one specific post
* This will be dynamic (so we'll need a variable in the query)

## GraphQL
```
query GetSinglePost {
  mdx {
    id
    body
    frontmatter {
      category
      date(formatString: "YYYY Do, YYYY")
      slug
      title
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

* That just gives us a random result
* We need to set up a variable pointing to the slug

## How do we point to slug
* In our `gatsby-node.js`

```
// MORE CODE

result.data.allMdx.nodes.forEach(({ frontmatter: { slug } }) => {
    createPage({
      path: `/posts/${slug}`,
      component: path.resolve(`src/templates/post-template.js`),
      context: {
        slug,
      },
    })
  })
// MORE CODE
```

* We pass in `slug` with our value of slug

## How do we set up variables
* We first need to instantiate them
* The name `because we used it in our gatsby-node.js` has to be `slug`

```
// MORE CODE

query GetSinglePost($slug:String) {
  mdx {
    id
    body
    frontmatter {
      category
      date(formatString: "YYYY Do, YYYY")
      slug
      title
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

// MORE CODE
```

* But now we get an error because we set up a variable but we are not yet using it

## How do we use the variable?
We we are setting up the argument in GraphQL

```
query GetSinglePost($slug: String) {
  mdx(frontmatter: {slug: {eq: $slug}}) {
    id
    body
    frontmatter {
      category
      date(formatString: "YYYY Do, YYYY")
      slug
      title
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

* And in the variable set up

```
{
  "slug": "questions"
}
```

* I used a query to find out all the slug values
* Run the query and we see that one post and all its values

## Look at the Code Exporter in GraphQL playground
* We have a problem as we don't get our named query but just a generic query like this:

```
export const query = graphql`
  {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      id
      body
      frontmatter {
        category
        date(formatString: "YYYY Do, YYYY")
        slug
        title
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
`
```

* So I manually copy my named query to the clipboard (see below)

```
query GetSinglePost($slug: String) {
  mdx(frontmatter: {slug: {eq: $slug}}) {
    id
    body
    frontmatter {
      category
      date(formatString: "YYYY Do, YYYY")
      slug
      title
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

* Since it is a page we need the query to be exported
* We add

```
export const query = graphql`


`
// don't forget that last backtic!
```

* And past our named query inside like this:

`templates/post-template.js`

```
// MORE CODE

import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const PostTemplate = () => {
  return <h2>post template</h2>
}

export const query = graphql`
  query GetSinglePost($slug: String) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        category
        date(formatString: "YYYY Do, YYYY")
        slug
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

// MORE CODE
```

## View react dev tools in browser
* Search for `PostTemplate`
    - You'll see all our data, the context... lots of stuff

## Next - Put all that stuff on the post page for that post slug
* We need to worry about rendering our return 
