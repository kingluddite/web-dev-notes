# Getting started with Contentful
* Click on menu icon (top left)
* Create space (2 on free plan)
* Select free plan (no cc card needed)
* Name it `Great Bootcamp` (anyname will work)
* Select Create an empty space
* Confirm and create space

## Two main tabs
* Content model
    - This is where we create structured data
* Content
    - Create instances of our models

## Create first model
* Content Model > Add Content Type
* Enter a name of `Blog Post` (it will fill in the Api Identifier we'll use later)
* No desc needed
* Click Create

## Create first blog post
* When first creating a Blog post all the fields will be non-existant
* It is up to us to create them

### Add fields
* Click add field
* You will see all the different types of fields
* Click `Text`
* Enter Name of `Title`
* It fills in the `Field ID` (we'll use that when we need to query with GraphQL API)
* Select Create
* Create another field
* Slug and slug
* Click create
* Create another field
* Published Date and publishedDate
* Click Create
* Create field
* This time SELECT RICH TEXT
* Body and body
* Click Create

## Now we have finished off our content model
We added our structure that needs 4 pieces of data
As long as those 4 pieces of data are provided we can render something to the screen

### Save the content model
* Click Save

### Now we can create Blog Posts
* Based off the model we just created

### Create blog post
* Click `Add Blog Post`
* Enter
    - title: My first Contentful
    - slug: contentful
    - Published Date: select today
    - Body: My first Contentful body
* This Blog Post by default is not Published (not accessible to the outside world)
* Change that by changing status of Draft to Publish by clicking Publish button
* That is your first Published page
* Click Content and you will see it in list under Blog
* Add one more blog post and enter your data as you wish

## Learn how to access Contentful data via our GraphQL API
* Search gatsby plugin for `contentful`

### gatsby-source-contentful
* [docs](https://www.gatsbyjs.org/packages/gatsby-source-contentful/)
* Source plugin for pulling content types, entries, and assets into Gatsby from Contentful spaces. It creates links between entry types and asset so they can be queried in Gatsby using GraphQL.

### Using Delivery API
```
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `your_space_id`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
```

* You need your space id and your access token

## Install gatsby-source-contentful
`$ npm install --save gatsby-source-contentful`

## Configure Gatsby with Contentful plugin
`gastby-config.js`

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
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: `your_space_id`,
              // Learn about environment variables: https://gatsby.dev/env-vars
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
          },
        ],
      },
    },
  ],
}
```

### Get spaceId and accessToken from Contentful
Settings > API keys

### Using Environment variables to prevent sensitive data from sneaking into our source code

* Your spaces by default have an example key pair set up for you
* Click on Example Key 1 and you will see your
    - Space ID
    - Content Delivery API - access token

`.env.development`

```
GATSBY_GRAPHQL_IDE=playground
CONTENTFUL_SPACE_ID=vk51oefgs39c CONTENTFUL_ACCESS_TOKEN=L9x6Eyr6G423ffVGWcqiZKNccaEf5k5YT-8bDA6hZiN
```

* IMPORTANT: Make sure you have a return at the end of each line of your environment variables
* Now we have updated our config file to source everything we need from Contentful
* We also have set up environment variables to keep sensative data out of our source code

## Update config file with new settings
`gatsby-config.js`

```
// MORE CODE

          {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: process.env.CONTENTFUL_SPACE_ID,
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
          },
        ],
      },
    },
  ],
}
```

## Start site up again
`$ npm run develop`

## Check out Playgournd
* Now checkout playground and see what new GraphQL API queries we have access to
* You now have a bunch of Contentful GraphQL APIS
    - 2 for working with content types
    - There are others too but we are interesting in are:
        + `contentfulBlogPost`
            * Fetch data about individual data
        + `allContentfulBlogPost`
            * Fetch a list of all individual posts

```
query {
  allContentfulBlogPost {
    edges {
      node {
        title
      }
    }
  }
}
```

* Output

```
{
  "data": {
    "allContentfulBlogPost": {
      "edges": [
        {
          "node": {
            "title": "Debug node"
          }
        },
        {
          "node": {
            "title": "My first Contentful"
          }
        }
      ]
    }
  }
}
```

* Excellent, we successfully sourced the content of the CMS right inside our Gatsby GraphQL API

## Add other fields

```
query {
  allContentfulBlogPost {
    edges {
      node {
        title
        slug
        publishedDate
      }
    }
  }
}
```

* Adding these fields is simple
* You get this output

```
{
  "data": {
    "allContentfulBlogPost": {
      "edges": [
        {
          "node": {
            "title": "Debug node",
            "slug": "debug-node",
            "publishedDate": "2019-05-31T00:00-07:00"
          }
        },
        {
          "node": {
            "title": "My first Contentful",
            "slug": "contentful",
            "publishedDate": "2019-05-19T00:00-07:00"
          }
        }
      ]
    }
  }
}
```

* But the body is not that simple, we'll deal with that later

## Next
* sort posts
* format date to be more friendly

## Other plugins for other CMSs (lots more too!)
* WordPress
    - gatsby-source-wordpress
        + [docs](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/?=wordpress)
* Drupal
    - gatsby-source-drupal
        + [docs](https://www.gatsbyjs.org/packages/gatsby-source-drupal/?=drupal)
* You can even use multiple if that makes sense for your project
