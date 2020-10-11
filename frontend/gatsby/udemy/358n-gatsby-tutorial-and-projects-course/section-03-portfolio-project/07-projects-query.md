# Projects Query
* Make sure to find all and one for projects to make the API public

## also do this for api
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
        contentTypes: [`jobs, projects`],
        // singleTypes: [],
      },
    },
// MORE CODE
```

* You need to restart the gatsby server
* **tip** also run gatsby clean

`$ gatsby clean`

## Two for the price of one
`$ gatsby clean && gatsby develop`

`package.json`

* Save time and add above line to `scripts` when you run `$ gatsby develop`

```
// MORE CODE

"scripts": {
    "build": "gatsby build",
    "develop": "gatsby clean && gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,json,md}\"",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1"
  },
// MORE CODE
```

## Troubleshoot
* If you get error `Cannot query field "allStrapiJobs" on type "Query" ----->`
  - Start your strapi server!
* When gatsby re-starts you need to look for one thing in GraphQL sandbox

1. Browse to your local API for `strapi` folder

`$ npm run develop`

## Houston we have a problem!
* **IMPORTANT** Make sure to surround your `types` with backticks

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
        contentTypes: [`jobs`, `projects`], // see the backtick?!!!!
        // singleTypes: [],
      },
// MORE CODE
```

## Make sure you see `allStrapiProjects` in GraphQL sandbox
### GraphQL query for all projects
```
query MyQuery {
  allStrapiProjects {
    nodes {
      github
      id
      description
      title
      url
      image {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      stack {
        id
        title
      }
    }
  }
}

```

## Filter by feature
* If `feature` equals **true** then display that project
* I added `totalCount` which is 3 since they were all set to `true` in strapi's projects

```
query MyQuery {
  allStrapiProjects(filter: {featured: {eq: true}}) {
    nodes {
      github
      id
      description
      title
      url
      image {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      stack {
        id
        title
      }
    }
    totalCount
  }
}
```

## Next
* We'll set 2 queries
    - One to `featured` **true**
    - One with out (on projects page we will show all projects)
