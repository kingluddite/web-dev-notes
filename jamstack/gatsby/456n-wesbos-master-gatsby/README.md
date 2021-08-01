# Review Wes Bos Course
## Gatsby
* **note** If you change your .env you must restart gatsby!

## Build a Gatsby site
* Traditionally we use `$ gatsby build`

### Buiding with ES Modules support
`$ npm run build`

* If you are building a site with serverless functions you need to have a `netlify.toml` in the root pointing to where your serverless functions are located

`netlify.toml`

```
[build]
  functions = "functions/"
```


## Sanity
### Sanity GraphQL Endpoint
* In sanity folder

`$ sanity graphql list`

* Click on URL and it will open a GraphQL Playground to work with your Sanity Data

## Sanity GraphQL changes
* If you made changes to your Sanity backend and you don't see the changes in your GraphQL Playground (looking at the SCHEMA sidebar) you need to redeploy your GraphQL API for Sanity
* **note** Make sure you are inside your sanity folder

`$ sanity graphql deploy production`

## Sanity Studio
* This is the remote site where you add pizzas and slicers
* If you click on your project in sanity you will see the URL listed under STUDIO and it will look like: `https://thepeezzaguypeh.sanity.studio/desk`
* The local machine URL of this studio will be `http://localhost:3333`

### If you local Sanity Studio looks different than your remote Sanity Studio...
* This means you made changes to your local Sanity Studio but did not deploy them to the remote Sanity Studio
* You can easily sync them up by deploying to sanity using the sanity CLI

`$ sanity deploy`

* You should see after it builds the terminal will tell you the URL where the studio was deployed (just refresh the open page and you will see your remote Sanity Studio is updated )
