# Build Gatsby Site
* **remember** Gatsby is just a static site generator

## Traditionally we run `$ gatsby build`
* But we want to use ES modules so we use `$ npm run build`
    - This build can be short like 10 seconds to 15 minutes for large sites
    - **note** If you have images that need to be resize on build time that is why it takes so long
        + If you are using sanity or other images hosting service
            * They do the resizing on their servers and it speeds up your build time

`$ npm run build`

* The build should take approximatley 15 seconds (it will tell you in the terminal after the build completes)

## Troubleshoot
* Error on build
    - WebpackError: ReferenceError: `OrderProvider` is not defined
    + fix: in `gatsby-ssr.js` make sure to import `OrderProvider`
    + **note** make sure to remove console.logs() in gatsby build

## We can't run `$ npm run build`
* Are you using serverless functions?
    - If you don't have a `netlify.toml` file in the root the build won't complete

## After the successful build
* All our production code will reside inside the `public` folder
* open `public` in your explorer/finder
    - Click to open index.html (and see it looks like it almost fully works)
    - Not all the URLs will resolve, it needs to be on a domain name
    - You will see all the pages are in folders
    - We are using folders to do our routing (just like olden days of the web)
