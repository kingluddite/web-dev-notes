# Blog content
* The `title` and `slug` are connected
* If you type a `title` it will also add a `slug` separated with dashed
* But if you save your `title` and edit it later you need to click the `regenerate` button to update the old slug

* https://hipsum.co/ (for description) 2 sentences

## Update gatsby-config.js
* Add `blog` like this

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
        contentTypes: [`jobs`, `projects`, `blogs`],
        // singleTypes: [],
      },
    },
// MORE CODE
```

* Make sure you stop `gatsby` and restart it

`$ gatsby develop`
