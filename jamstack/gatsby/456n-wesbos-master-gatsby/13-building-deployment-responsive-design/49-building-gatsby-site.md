# Build Gatsby Site
* **remember** Gatsby is just a static site generator

## Traditionally we run `$ gatsby build`
* But we want to use ES modules so we use `$ npm run build`
    - This build can be short like 10 seconds to 15 minutes for large sites
    - **note** If you have images that need to be resize on build time that is why it takes so long
        + If you are using sanity or other images hosting service
            * They do the resizing on their servers and it speeds up your build time

## Troubleshoot
* Error on build
    - WebpackError: ReferenceError: OrderProvider is not defined
    + fix: in `gatsby-ssr.js` make sure to import `OrderProvider`
    + **note** make sure to remove console.logs() in gatsby build

## We can't run `$ npm run build`
* Because we are missing the netlify.toml file 
