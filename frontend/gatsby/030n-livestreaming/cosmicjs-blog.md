# Build a blog with cosmicjs

## Why use Gatsby instead of Create React App?
* Think of Gatsby as adding extra power to Create React App

### Advantages of using Gatsby
* Gatsby gives you same types of benefits as Create React App but it also has a data layer
  - You can do things like
    + Pull data from cosmicjs
    + You could also pull data from 
      * WordPress
      * Drupal
      * Any backend you can think
      * Markdown files
      * Hard coded react code
* Gatsby has a built in router

**note** Gatsby skips `test` pages so don't name them `test.js` but name them `test-page.js`

## Gatsby vs NextJS
* What Gatsby is doing that is different from NextJS or hosting a site with a server is that you are doing all of this ahead of time
* We take all this data and run it as part of the build process
* `gatsby-node.js` executes during the Gatsby build once the site is live we don't have access to the cosmicjs server and there is no requests being made to it
  - The benefit of this is that if you have security compliancy issues you are able to build things locally and then deploy them to something like amazon S3 or Netlify or any other kind of cloud app storage
  - And whatever those files that are to go up to cloud app storage they don't have access to the servers that were used to load that data
  - That means that even if someone was able to hack your site there are no calls to the server so there is nothing to gain access to
  - They could debase the current built assets but they couldn't find database keys because they are not present in the built code
  - This is great because you don't have to worry about a server
  - You don't have to worry about scaling your servers or coming up with failover regions in case one region gets overwhelmed
  - You are putting it on a CDN (Content Delivery Network) and so your CDN will be able to scale with you
    + It is very hard to take down Amazon S3
    + This means you are relativey DDOS proof (good safe position to be in) or as DDOS proof as you can be without being a giant like Amazon or Twitter

## What is the benefit of the JAM stack?
* Why is it that we want something so minimal?
* 1990s web development was amazing in that it was pretty much HTML, CSS and JavaScript and that is where a lot of development is moving toward "serverless" as we really depend on "services" because we want to focus on our application layer and delivering a great experience for users and when you have something as well put together as Gatsby that puts together all the best features for your users out of the box you are able to get quicker to market with a more optimized HTML, CSS, JavaScript build
* This makes Gatsby websites extremely fast, they are optimized for user experience
* And deploying to something like Netlify or S3 you get that security and user experience you want out of the box
* You could easily deploy the site as static HTML files and that alone is valuable
* But when you add React to that it becomes an even more powerful combination
* Gatsby is growing in popularity because it is doing everything we want a web app to do where we want it to be performant and secure
* We are standing on the shoulders of giants who gathered all the best practices into the JAMstack
* Headless CMSs are making it very simple to use the JAMstack
  - Your data can go whereever you want it to
  - You can have a stateful server that pulls data from a headless cms or you can use a system like Gatsby that builds it ahead of time
* Gatsby is trying to take the JAM stack and put as many of the industry standard best practices as default settings as possible into Gatsby
  - utrafast
  - secure
  - easy to use to get up and running
  - you add `Gatsby new` and you are off creating pages for your site
  - getting website development back to feeling easy and accessible again

## Sign up with Github
* Note give access to public and private repos
* Necessary for deployment

### What are buckets
* Synonymous with projects
* Similar to AWS buckets
* any kind of type like blog posts, pages, categories
    - rule is one bucket per site
* offer both REST(more built out CRUD ready) and GraphQL APIs(currently read only)

### Build from scratch
* Page
    - Add metafield
        + Headline (input)
            * we'll add a headline (required)
        + Content
            * content (required)
* Object options
    - uncheck content editor
* localization
    - will turn on later
* Preview Link
    - used to let content creators preview their content before they publish
* Save Object

## Create Home page
Title: Home
Slug: home (required)
Add a Headline
Add Content and bold it because it is an HTML field

## New gatsby
* Use start in existing folder

`$ gatsby new cosmicjs-blog`

* **note** You can not add a gatsby starter inside an existing Github repo

## There is a CosmicJS Gatsby starter
* [cosmicjs gatsby-starter](https://github.com/cosmicjs/gatsby-starter)
* This is the faster way to get set up
* We will use the [gatsby-source-cosmicjs plugin](https://www.gatsbyjs.org/packages/gatsby-source-cosmicjs/?=cosmic)

## Review what is installed by default
`package.json`

* gatsby-image (helps you optimize your images)
    - gatsby-plugin-sharp and gatsby-transformer-sharp are required to support gatsby image
* gatsby-offline (PWA support "progressive web app support")
* gatsby-plugin-react-helmet
    - edit metadata (page titles description)
    - react-helmet is required for gatsby-plugin-react-helmet to work
* gatsby-source-filesystem
    - used to read from the files
    - currently using it to read from images
* prop-types
    - dependency we need for react and react-dom

`gatsby-config.js`

* Default site metadata
* We have our helmet set up
* We are reading our images from the file system
* We have both sharp plugins so we can be able to transform images
* Gatsby commented out gatsby-plugin-offline to make sure people want to use it as it does come with some caveats
    - This was done to make sure people are putting themselves in a position where they are wondering "why things are refreshing (cache)

Not doing anything with gatsby-node, gatsby-browser and gatsby-ssr (just there in case we need them)

## troubleshoot - if you are using an incompatible version of gatsby sharp
* What version of node are you running `$ node -v`
* Switch up your nvm version `$ nvm use 8`
* But most likely you will need to delete and reinstall sharp
* `$ yarn`
* sharp is very powerful but it is not written in node so we have to build it as part of the installation process and that sometimes leads to compatibility problems
* You can keep working by commenting out the Image in the page <Image /> and comment out all code in image.js
* Than run `$ gatsby develop` and it should work

### deeper fix
* Remove
* gatsby-plugin-sharp
* gatsby-transformer-sharp
* gatsby-source-filesystem
* `$ rm -rf package-lock.js yarn.lock`
* and rerun `$ gatsby develop`

`npm install --save gatsby-source-cosmicjs`

```
// MORE CODE

// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-cosmicjs`,
    options: {
      bucketSlug: ``,
      objectTypes: [`posts`],
      // If you have enabled read_key to fetch data (optional).
      apiAccess: {
        read_key: ``,
      }
    }
  },
]
```

* Good to copy and paste [from gatsby](https://www.gatsbyjs.org/packages/gatsby-source-cosmicjs/?=cosmic)

## Do I need API access?
* No because we haven't set them up in our bucket
* This is a read only app so we are not doing any writing or editing to the bucket so we are find with just leaving the API open
* Go to cosmicjs settings > Basic Settings
    - 
* 

```
// MORE CODE

// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-cosmicjs`,
    options: {
      bucketSlug: `gatsby-cosmic-blog`,
      objectTypes: [`pages`],
    }
  },
]
```

* We update our plugin with our bucket info from cosmicjs
* We could also use the settings page to create an API key

`$ yarn develop` (always when you change config file)

## Check GraphQL to make sure you see `allCosmicjsPage` in playground
![we see it in the playground](https://i.imgur.com/Mnzwlz2.png)

```
{
  allCosmicjsPages {
    edges {
      node {
        title
        slug
        content
      }
    }
  }
}
```

Output

```
{
  "data": {
    "allCosmicjsPages": {
      "edges": [
        {
          "node": {
            "title": "Home",
            "slug": "home",
            "content": ""
          }
        }
      ]
    }
  }
}
```

* Because we disabled content we want to use metadata
    - this will give us keys, titles...

## revise our playground
```
{
  allCosmicjsPages {
    edges {
      node {
        title
        slug
        metadata {
          headline
          content
        }
      }
    }
  }
}
```

* Will give us the output we want

```
{
  "data": {
    "allCosmicjsPages": {
      "edges": [
        {
          "node": {
            "slug": "home",
            "metadata": {
              "headline": "Home",
              "content": "<p>This is my home page</p>"
            }
          }
        }
      ]
    }
  }
}
```

* we drop the title because we can use the headline

## Create pages
* At the moment we have GraphQL that pulls data but we can not build pages yet and that is what we will do now

`gatsby-node.js`

```
exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    {
      allCosmicjsPages {
        edges {
          node {
            slug
            metadata {
              headline
              content
            }
          }
        }
      }
    }
  `)

  console.log(result)
}
```

`$ gatsby develop`

* The log should output in the Terminal:

```
{ data:
  [Object: null prototype] {
    allCosmicjsPages: [Object: null prototype] { edges: [Array] } } }
```

* It gives us our data
* allCosmicjsPages
* And our edges which is an array where our actual content is
* This is what we want so now we can return to `gatsby-node.js` and start building it

## Build our page
* We will take the data from GraphQL and grab the node

```
exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    {
      allCosmicjsPages {
        edges {
          node {
            slug
            metadata {
              headline
              content
            }
          }
        }
      }
    }
  `)

  // console.log(result)
  const pages = result.data.allCosmicjsPages.edges.map(({ node }) => node)
  console.log(pages)
}

```

* Will output this in the terminal

```
[ [Object: null prototype] {
    slug: 'home',
    metadata:
     [Object: null prototype] { headline: 'Home', content: '<p>This is my home page</p>' } } ]
```

* So now we have an array of pages with
    - slug
    - metadata
        + headline
        + content
* We need to feed this into a template
* Currently, we have no template to do this

## Create a `src/templates`
* This is the gatsby convention for working with templates 

`src/templates/page.js`

```
import React from 'react'

export default <div>This page was created from a page template</div>
```

`gatsby-node.js`

```
exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    {
      allCosmicjsPages {
        edges {
          node {
            slug
            metadata {
              headline
              content
            }
          }
        }
      }
    }
  `)

  // console.log(result)
  const pages = result.data.allCosmicjsPages.edges.map(({ node }) => node)
  // console.log(pages)

  pages.forEach(page => {

  })
}
```

## Create a page with node
* now we have each page but we need to generate a template
* Create page comes from `actions` so we destructure it to get it

`gatsby-node.js`

```
exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    
// MORE CODE
```

* Now we have the ability to create a page

`gatsby-node.js`

```
// MORE CODE

  const pages = result.data.allCosmicjsPages.edges.map(({ node }) => node)
  // console.log(pages)

  pages.forEach(page => {
    createPage()
  })
}
```

* Look up the syntax for [gatsby createPage](https://www.gatsbyjs.org/docs/actions/#createPage)

`gatsby-node.js`

```
  // console.log(result)
  const pages = result.data.allCosmicjsPages.edges.map(({ node }) => node)
  // console.log(pages)

  pages.forEach(page => {
    createPage({
      path: `page.slug ? 'home' : ''`,
      component: path.resolve(`./src/templates/page.js`),
      // The context is passed as props to the component as well
      // as into the component's GraphQL query.
      // context: {
      //   id: `123456`,
      // },
    })
  })
}
```

* `$ gatsby develop`
* This will show you `path` is not defined so you need to import it

```
const path = require('path')

// MORE CODE

  pages.forEach(page => {
    createPage({
      path: page.slug === 'home' ? '/' : `/${page.slug}`,
      component: path.resolve(`./src/templates/page.js`),
      // The context is passed as props to the component as well
      // as into the component's GraphQL query.
      context: {
        slug: page.slug,
      },
    })
  })
}

// MORE CODE
```

`$ gatsby develop`

* Get to a 404 page
* Type anything in the url like `localhost:8000/xx`
* That will show you all pages that were generated (shows locally for development only)
* logic for slug
  - if slug is home `if page.slug === 'home`
  - then we will set it to `/`
  - else we will set it to `/${page.slug}`
* To avoid a clash we rename `index.js` to `index-old.js`
  - You can't have two pages going to same slug
  - **tip** Make sure you run `$ gatsby develop` again because you renamed index.js and need to regenerate it

## Accessing Context
`gatsby-node.js`

```
// MORE CODE

  pages.forEach(p age => {
    createPage({
      path: page.slug === 'home' ? '/' : `/${page.slug}`,
      component: path.resolve(`./src/templates/page.js`),
      // The context is passed as props to the component as well
      // as into the component's GraphQL query.
      context: {
        slug: page.slug,
      },
    })
  })
}
```

* We can access context in 2 ways:
  - pageContext

`templates/page.js`

```
import React from 'react'

export default ({ pageContext }) => (
  <div>
    This page was created from a page template
    <pre>{JSON.stringify(pageContext, null, 2)}</pre>
  </div>
)
```

That will output this in the browser (home page)

![home page](https://i.imgur.com/kySy8An.png)

```
This page was created from a page template
{
  "slug": "home"
}
```

* So we can see whatever we pass into the template is available on `pageContext`
* It doesn't matter what it is, we can pass it anything we want and it will show up

`gatsby-node.js`

```
      context: {
        slug: page.slug,
        fieldPosition: 'striker',
      },

```

* And it will show up on the page
* Make sure to stop and `$ gatsby develop` to generate the new page from the new template
* Will out put this:

```
This page was created from a page template
{
  "slug": "home",
  "fieldPosition": "striker"
}
```

* You could put all the metadata through the context

Another way is we could import `graphql` from Gatsby
And then from within the template I could export a query and this will be the query that pulls from cosmicjs

`templates/page.js`

```
import React from 'react'
import { graphql } from 'gatsby';

export const query = graphql`
 // WE'll put GraphQL in here from playground
`;

export default ({ pageContext }) => (
  <div>
    This page was created from a page template
    <pre>{JSON.stringify(pageContext, null, 2)}</pre>
  </div>
)
```

* Instead of allCosmicPages we'll use cosmicPages to just get one page

### GraphQL playground
```
query ($slug: String!) {
  cosmicjsPages(slug: {eq: $slug}) {
    metadata {
      headline
      content
    }
  }
}
```

* Add this as the `Query Variables` in bottom of GraphQL Playground

```
{
  "slug": "home"
}
```

### Output of Playground
```
{
  "data": {
    "cosmicjsPages": {
      "metadata": {
        "headline": "Home",
        "content": "<p>This is my home page</p>"
      }
    }
  }
}
```

* So now we can use this in our template

`templates/page.js`

```
import React from 'react'
import { graphql } from 'gatsby'

export const query = graphql`
  query($slug: String!) {
    cosmicjsPages(slug: { eq: $slug }) {
      metadata {
        headline
        content
      }
    }
  }
`

export default ({ data }) => (
  <div>
    This page was created from a page template
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
)
```

* So **context** is availale either with `pageContext` as we did before or with `data` live above and that will output this on our home page

```
This page was created from a page template
{
  "cosmicjsPages": {
    "metadata": {
      "headline": "Home",
      "content": "<p>This is my home page</p>"
    }
  }
}
```

* This is cool because now we dig write into `data` and use it like this

`templates/page.js`

```
import React from 'react'
import { graphql } from 'gatsby'

export const query = graphql`
  query($slug: String!) {
    cosmicjsPages(slug: { eq: $slug }) {
      metadata {
        headline
        content
      }
    }
  }
`

export default ({ data }) => {
  const { headline, content } = data.cosmicjsPages.metadata

  return (
    <div>
      <h1>{headline}</h1>
      <p>{content}</p>
    </div>
  )
}
```

## React problem with HTML
* To fix this we use a special React prop

```
import React from 'react'
import { graphql } from 'gatsby'

// custom components
import Layout from '../components/layout'

export const query = graphql`
  query($slug: String!) {
    cosmicjsPages(slug: { eq: $slug }) {
      metadata {
        headline
        content
      }
    }
  }
`

export default ({ data }) => {
  const { headline, content } = data.cosmicjsPages.metadata

  return (
    <Layout>
      <h1>{headline}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}
```

## Add another page
* Because gatsby only runs at build time
* If we create an About page on Cosmisjs we need to run `$ gatsby develop`

## Creat a new object on cosmicjs
* Name it Global
* Create a Global Object
* This will be a header with a title and an image

## To "touch this new global head"
* We need to modify our:

`gatsby-node.js`

```
// MORE CODE

    {
      resolve: `gatsby-source-cosmicjs`,
      options: {
        bucketSlug: `gatsby-cosmic-blog`,
        objectTypes: [`pages`, `globals`],
      },
    },

// MORE CODE
```

* Rebuilt Gatsby

`$ gatsby develop`

## GraphQL playground
* You will now see `cosmicjsGlobals` in the GraphQL playground docs
* [imgix](https://www.imgix.com/)

```
query ($slug: String!) {
  cosmicjsGlobals(slug: {eq: $slug}) {
    title
    metadata {
      title
      logo {
        imgix_url
      }
    }
  }
}
```

* output

```
{
  "data": {
    "cosmicjsGlobals": {
      "title": "Header",
      "metadata": {
        "title": "Rock it nonstop!",
        "logo": {
          "imgix_url": "https://cosmic-s3.imgix.net/d949e6e0-38a1-11e9-89fa-bb32e491b8ac-placeholder.gif"
        }
      }
    }
  }
}
```

## Apply it to our Layout
`layout.js`

```
// MORE CODE

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        cosmicjsGlobals(slug: { eq: "header" }) {
          title
          metadata {
            title
            logo {
              imgix_url
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.cosmicjsGlobals.metadata.title} />

// MORE CODE
```

* Now our header on all pages will be the content we added to our Header Globals object on cosmicjs

## Now also add the image


## Gatsby cosmicjs localization
* [link](https://github.com/cosmicjs/gatsby-localization-starter)
* [video](https://cosmicjs.com/articles/webinar-video-localization-with-gatsby-and-cosmic-js-jnyqtjoa)

