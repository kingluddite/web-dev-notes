# Setup frontend (gatsby) to consume data
## plugin - gatsby-source-strapi
* https://www.gatsbyjs.com/plugins/gatsby-source-strapi/

`gatsby-config.js`

```
// MORE CODE

{
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        //   contentTypes : `jobs`, `projects`, `blogs`,
        //   singleType : `about`
        //  ONLY ADD TO ARRAY IF YOU HAVE DATA IN STRAPI !!!!
        contentTypes: [`jobs`],
        // singleTypes: [],
      },
    },
// MORE CODE
```

* Restart gatsby

`$ gatsby develop`

## Look for any errors
* Then look in graphiQL for `allStrapiJobs`
