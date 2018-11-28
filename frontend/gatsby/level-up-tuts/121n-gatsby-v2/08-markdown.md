# Markdown
* We will work with Markdown using a Markdown processor (aka transformer)
    - You will see the word `transformer` often in the Gatsby docs

## What is a transformer?
* It takes a node (in this case a node is a markdown file) and it takes it and transforms it into something that we can query off of in a better more appropriate manner
    - This transformer understands much more about markdown than the source-filesystem plugin
    - We need a transformer to be able to access nuance attributes about markdown

## How can we install gatsby-transformer-remark?
`$ npm install --save gatsby-transformer-remark`

## After installing we need to add the plugin to our config file
`gatsby-config.js`

```
// MORE CODE

},
'gatsby-transformer-remark',
'gatsby-transformer-sharp',

// MORE CODE
```

## Restart server
* Anytime we modify our `gatsby-config.js` file we must remember to restart our server

## Open GraphQL sandbox
`http://localhost:8000/___graphql`

```
query SiteTitleQuery {
  site {
    siteMetadata {
      title
      description
    }
  }
}
```

* Run play
* Here is the output

```
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "React Sensei",
        "description": "Learn Gatsby from the ground up. Our target market are people new to the world of development"
      }
    }
  }
}
```

## Modify GraphQL query
* Type `all`

![allMarkdownRemark](https://i.imgur.com/ErLnj9v.png)

* Now you will see you have access to `allMarkdownRemark`
    - You want all markdown files so use `edges`
        + Then you want each blog so you use `node`
            * And if you want the html inside the blog you type `html`

### GraphQL sandbox
```
query SiteTitleQuery {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark {
    edges {
      node {
        html
      }
    }
  }
}
```

### GraphQL sandbox output
```
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "React Sensei",
        "description": "Learn Gatsby from the ground up. Our target market are people new to the world of development"
      }
    },
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "html": "<h1>Hello from your Markdown post</h1>"
          }
        }
      ]
    }
  }
}
```

* But in our markdown we just have:

`# Hello from your Markdown post`

* But our markdown transformer is transforming our markdown into HTML

## What kind of stuff can we get out of `allMarkdownRemark`?
* View the GraphQL real time documentation
* You will use this constantly
* It creates your documentation as your write your GraphQL
* Hover over `allMarkdownRemark` and you will see the `link` underline appear
    - Click and you will see the documentation
        + The type: MarkdownRemarkConnection
            * Click on `MarkdownRemarkConnection`
                - pageInfo (good for pagination)
                - edges (we are using)
                - totalCount
                - distinct
                - group
                    + skip
                    + limit
                    + field
        + The arguments:
            * skip
            * limit
            * sort
            * filter

### We can use all/any of the above in our GraphQL
* Example: Use `totalCount`

```
query SiteTitleQuery {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark {
    totalCount
    edges {
      node {
        html
        excerpt
      }
    }
  }
}
```

* You will see `totalCount` returns `1` because we only have `1` markdown file

## MarkdownRemarkEdge
* Navigate to see the documentation
    - Click on MarkdownRemarkEdge
        + You will see:
            * node: MarkdownRemark
            * next: MarkdownRemark
            * previous: MarkdownRemark
                - Click on MarkdownRemark and you will see Node
                    + Node has a lot of properties like `html` (which we used in our GraphQL query)

## Let's make our Markdown pretty
`post1.md`

```
---
slug: "/first-post"
data: "2018-11-27"
title: "The First Post"
---

# Hello from your Markdown post
```

* The `---` is used to designate **frontmatter**

## Use markdown to structure our blog with latin filler text

`post1.md`

```
---
slug: "/first-post"
date: "2018-11-27"
title: "The First Post"
---

# Hello from your Markdown post

  Lorem maxime accusantium quod maiores alias At assumenda voluptatem eum alias nihil molestias Neque quasi repellat consectetur consequuntur facilis. Expedita hic error culpa minus hic Pariatur quia nesciunt nam blanditiis

## Heading 2
Ipsum officiis optio aut ratione repudiandae Ratione reiciendis vel dicta quas nulla Quam tenetur numquam ad repellendus debitis repellendus. Libero voluptates omnis ducimus et aperiam Illum quasi amet et labore

### Heading 3
Adipisicing ratione quidem expedita id expedita. Tenetur vel sunt quam atque quo expedita? Totam quod sunt nulla aspernatur corrupti quae Deserunt pariatur sed provident possimus sunt Natus iste ab deserunt
Ipsum ullam id eligendi iure labore impedit minus veniam! Numquam dolore quisquam ratione dolor saepe Reprehenderit eos enim excepturi placeat explicabo Excepturi exercitationem rerum excepturi voluptatum reprehenderit Voluptatem dolorem voluptatum.
```

* Run query again in GraphQL sandbox
* You now get all the html 
* and an excerpt
    - The excerpt removes all html formatting
    - And addes `...` at end automatically

## Use frontmatter
* We will pull out the slug, date and title

```
query SiteTitleQuery {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark {
    totalCount
    edges {
      node {
        excerpt
        frontmatter {
          title
        }
      }
    }
  }
}
```

* `title` works but `slug` and `date` do not
* We need to restart server and refresh GraphQL sandbox
* **Note** this is a static site generator so much of the stuff we code needs to be rebuilt to be seen

```
query SiteTitleQuery {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark {
    totalCount
    edges {
      node {
        excerpt
        frontmatter {
          title
          slug
          date
        }
      }
    }
  }
}
```

* Run play and now we get all our frontmatter

## Automatic date transformation
* With Gatsby out of the box!

### Format date
```
query SiteTitleQuery {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark {
    totalCount
    edges {
      node {
        excerpt
        frontmatter {
          title
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}
```

* Will output the date like `November 27, 2018`

## Tip
* You have to restart server when you add new content
* But YOU DO NOT have to restart the server if you modify content (only when you add something new)

## Next - Get an individual post
