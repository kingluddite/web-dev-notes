# Sourcing Content from the File System
## We need to store out blog data and using our siteMetadata isn't going to cut it
* Instead we'll power our blog with markdown powered posts
* We'll create markdown files for all our posts we want to create
* All those blog posts will be listed on our Blog page
* We'll have Gatsby dynamically generate brand new pages based off a page template for each of the markdown posts

## Create posts
`src/posts/`

* Create two new blog posts inside `posts` directory

`$ touch gatsby.md react.md`

* Start our posts using what is known as `frontmatter` (stuff inside `---` and `---`)

```
---
frontmatter here
---
```

* **note** I am using dashes (-) and not underscores (_)

`gatsby.md`

```
---
title: "What technologies does GatsbyJS use?"
date: "2019-04-21"
---

GatsbyJS uses the following technologies

## Technologies

1. React
2. GraphQL
3. JavaScript
4. HTML
5. CSS
6. Sass (optional)
7. CSS Modules (optional)
8. NodeJS
9. JSX
```

`react.md`

```
---
title: "React"
date: "2019-04-02"
---

Let's learn React
```

## Let's figout out how to tap into our markdown files
### Step 1: Tell Gatsby that we are now sourcing content from an external source
* It is not coming from siteMetadata, not from a CMS, not from a 3rd party API, it is coming from a filesystem
    - Everything we need is inside the `posts` folder
    - There is a gatsby plugin that will enable us to accomplish this

### Seach gatsby site for `source`
* This will show us all the gatsby plugins that allow us to source data from an external source
    - Examples
        + Bigcommerce (gatsby-source-bigcommerce)
        + A postgres database (gatsby-source-pg)
        + Custom APIs (gatsby-source-custom-api)
        + Instagram (gatsby-source-instagram-all)
        + Vimeo (gatsby-source-vimeo)
        + Google Photos (gatsby-source-google-photos)
        + gatsby-source-trello
        + lots more
* We need to source from our filesystem so we'll use `gatsby-source-filesystem`
* https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=source-filesystem
    - Will enable us to pull those markdown files into Gatsby
    - Later we'll use another plugin to convert them from markdown to HTML and render them to the screen

## Install gatsby-source-filesystem
* Shut down your development server
* Install our plugin

`$ npm i gatsby-source-filesystem`

* We also need to enable it by adding it to our plugins array
* Our last plugin we installed didn't require any customization
* But with the filesystem plugin we need to provide a couple options
    - When you do this you won't add a plugin name as a string, instead you'll add an object
        + But when you do this you still need to provide the plugins name and you do that via the `resolve` property
        + remember `gatsby-config.js` is a nodeJS file and that is why we are using `module.exports` and we'll use `__dirname`

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Full-Stack Gatsby Bootcamp!',
    author: 'Kingluddite',
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
  ],
}
```

* We just told Gatsby to source content from the filesystem, this includes everything in the `src` directory which would also include our markdown posts
* Now start up the development server again

`$ npm run develop`

## Open GraphQL Playground
* Let's examine what we just added with this plugin
* We have access to 2 things that were not there before (Docs)
    - file (single file)
    - allFile (fetching multiple files)

### allFile
* Let's use all file to explore some of the files in our project
* `edges` enables us to perform pagination
    - Inside `edges` we have access to `node`
        + `node` represents and indivual file
        + Examine all the attributes we can access from the file we are requesting
            * size
            * extension
            * absolute path
            * the date it was created
            * name
            * lots more
* This didn't exist before because we were not sourcing content from our system

#### Playground
* I want to create a query that will enable me to access all the files:
    - name, extension, and directory

```
query {
  allFile {
    edges {
      node {
        name
        extension
        dir
      }
    }
  }
}
```

And the output

```
{
  "data": {
    "allFile": {
      "edges": [
        {
          "node": {
            "name": "footer",
            "extension": "js",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/components"
          }
        },
        {
          "node": {
            "name": "header",
            "extension": "js",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/components"
          }
        },
        {
          "node": {
            "name": "header.module",
            "extension": "scss",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/components"
          }
        },
        {
          "node": {
            "name": "layout",
            "extension": "js",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/components"
          }
        },
        {
          "node": {
            "name": "layout.module",
            "extension": "scss",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/components"
          }
        },
        {
          "node": {
            "name": "gatsby",
            "extension": "md",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/posts"
          }
        },
        {
          "node": {
            "name": "react",
            "extension": "md",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/posts"
          }
        },
        {
          "node": {
            "name": "blog",
            "extension": "js",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/pages"
          }
        },
        {
          "node": {
            "name": "contact",
            "extension": "js",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/pages"
          }
        },
        {
          "node": {
            "name": "index",
            "extension": "js",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/pages"
          }
        },
        {
          "node": {
            "name": "index",
            "extension": "scss",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/styles"
          }
        },
        {
          "node": {
            "name": "about",
            "extension": "js",
            "dir": "/Users/philiphowley/Documents/dev/030e-gatsby-stuff/031e-gatsby-bootcamp/src/pages"
          }
        }
      ]
    }
  }
}
```

* We just got a response with every single file within our `src` directory
* Scroll the response and you will see both markdown files

## Two import questions
1. How can we specifically target these markdown files?
2. How do we take their content and convert them into something that is useful for us inside of react components?

* We have a bunch of steps to get our markdown files inside our post
* We need to transform these markdown files into HTML
* We'll use `gatsby-transformer-remark` to do this
  - Very easy to use
    + zero configuration
    + set it up and use it - simple
  - https://www.gatsbyjs.org/packages/gatsby-transformer-remark/

## Install it
* Shut down server
* `$  npm i gatsby-transformer-remark`

## What is remark?
* A standalone javascript library for parsing markdown files
* And we are using a gatsby plugin that runs that library behind the scenes

### Set up plugin in plugins array
* Add `gatsby-transformer-remark` to the plugins array

`gatsby-config.js`

```
// MORE CODE

    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
  ],
}
```

## Start up dev server once again
`$ npm run develop`

* After this change we can access frontmatter and html body

## Check things out in Playground
* Refresh
* You will see two new items in your Playground Docs

  1. markdownRemark
  2. allMarkdownRemark

* After re-running server we'll now be able to access our posts via the graphql api 





