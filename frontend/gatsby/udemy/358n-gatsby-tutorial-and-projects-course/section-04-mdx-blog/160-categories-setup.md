# Categories Setup
* We have categories in our frontmatter
* We want to set up pages programatically that will only show posts with that category
    - So if I want only react posts, I see only react posts

## Setup a query that gets only the categories
* How many categories do I have?
    - 1, 50,000? 
* We keep our GraphQL allMdx open and don't touch as we'll use later
* We'll use our other GraphQL and build from that

### GraphQL
```
query MyQuery {
  allMdx {
    nodes {
      frontmatter {
        category
      }
    }
  }
}
```

* But we just want distinct categories

```
query MyQuery {
  allMdx {
    distinct(field: frontmatter___category)
  }
}

```

* We don't need notes and just specify what field we want to be distinct and now we get only our distinct categories

### Output from GraphQL
```
{
  "data": {
    "allMdx": {
      "distinct": [
        "HTML&CSS",
        "javascript",
        "react",
        "test"
      ]
    }
  }
}
```

## Now we need to create pages programmatically using these distict categories
* To programatically create pages based on categories we'll need `gatsby-node.js`
* So we just grab this part of our GraphQL

```
// MORE CODE

allMdx {
    distinct(field: frontmatter___category)
  }
// MORE CODE
```

* And we past it into `gatsby-node.js`

`gatsby-node.js`

```
const path = require('path')

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      allMdx {
        distinct(field: frontmatter___category)
      }
    }
  `)

// MORE CODE
```

## Houston we have a problem
* We have duplicate names in our query `allMdx`
    - Solution: `alias`

```
// MORE CODE

  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      categories: allMdx {
        distinct(field: frontmatter___category)
      }
    }
  `)

// MORE CODE
```

## And here we create our category pages using node

`gatsby-node.js`

```
// MORE CODE
  // create posts pages programatically
  result.data.allMdx.nodes.forEach(({ frontmatter: { slug } }) => {
    createPage({
      path: `/posts/${slug}`,
      component: path.resolve(`src/templates/post-template.js`),
      context: {
        slug,
      },
    })
  })

  // create category pages programatically
  result.data.allMdx.nodes.forEach(category => {
    createPage({
      path: `/${category}`,
      component: path.resolve(`src/templates/category-template.js`),
      context: {
        category,
      },
    })
  })
}
```

## Restart server
* And clean just to be safe

`$ gatsby clean && gatsby develop`

```html
<form
  className="contact-form"
  name="contact"
  method="post"
  netlify-honeypot="bot-field"
  data-netlify="true"
  action="/success"
>
  <input type="hidden" name="bot-field" />
  <input type="hidden" name="form-name" value="contact" />
</form>
```

7. Success Page (optional);

## Basic MDX Setup

1. Install mdx plugin
2. Add `gatsby-plugin-mdx` to gatsby-config
3. Setup Page - pageName.mdx /pages
4. Basic Markdown
   Syntax Highlighting - MDX EXTENSION
5. Basic Styling
6. Add React Components including Gatsby Link
7. New Line Gotcha

## Multiple Posts

1. Setup Posts Folder
2. Add New filesystem Instance to gatsby-config

```js
{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },

```

4. Create a Brand New Folder For Post
   Won't Query Name - setup is up to you
5. Add mdx file
6. DOUBLE CHECK PATHS (../../ - gotcha)
7. Run 'gatsby clean' - just to be on the safe side
8. Seperate Images Folder
9. FrontMatter (space gotcha - title: first post)
10. Imports after FrontMatter

## Create MDX/Post Pages Programatically

1. Setup Query with unique value (most likely slug)
2. Setup Template
3. Run Query in gatsby-node.js - just like normal setup
4. Pass Variable (slug)
5. Run Query in Template using variable (slug)

## Create Categories Pages Programatically

1. Repeat the same steps as posts just for categories.

## Add INLINE Images to MDX

1. Syntax - ![](./pathToImages/imageName - if in the same folder)
2. Install - gatsby-transformer-remark
3. Changes in gatsby config

   remove - 'gatsby-plugin-mdx'
   add

```js
{
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [{ resolve: "gatsby-remark-images" }],
      },
    },
```

4. Restart the server
5. Whitespace gotchas and "gatsby clean"
6. Styling - Good Luck!

## Videos

[Gatsby Video Reference] : https://www.gatsbyjs.org/docs/working-with-video/

### Reg Video

1. The same as regular video
2. autoPlay - gotcha
3. use like regular component

### Iframe

1. Gatsby Docs
2. Gotchas - url, styling
3. Use in template - johnsmilga.com

### MDX Wrapper

1. Gatsby wrapRootElement
   [Wrap Root Element ] : https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
2. MDX
   [MDX Reference] : https://mdxjs.com/getting-started
3. Gatsby/MDX Reference
   [ Elements Reference] : https://www.gatsbyjs.org/docs/mdx/customizing-components/

### prism-react-renderer

[docs]: https://github.com/FormidableLabs/prism-react-renderer

```
npm install --save prism-react-renderer
```

1. our code - props.children.props.children.trim()
2. language -
   props.children.props.className
   className.replace(/language-/,'')
3. theme

### Favicon

Favicon

[favicon] : https://favicon.io/

`/static/favicon.ico`

### SEO

[Gatsby Example] : https://www.gatsbyjs.org/docs/add-seo-component/

