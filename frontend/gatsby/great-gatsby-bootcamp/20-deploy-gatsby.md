# Deploy Gatsby
* Instead of creating multiple environment variables we will just use one
* So rename `.env-development` to `.env`
* And that will automatically be ignore based on the .gitignore that comes with Gatsby

## Rename the `.env` in `package.json`

```
// MORE CODE

"scripts": {
  "build": "gatsby build",
  "develop": "env-cmd .env gatsby develop",
  "format": "prettier --write src/**/*.{js,jsx}",
  "start": "npm run develop",
  "serve": "gatsby serve",
  "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\""
},
// MORE CODE
```

* Create git repo
* Make repo private (free)

`$ git add .`

`$ git commit -m 'Final gatsby site'`

Push up to github

## Netlify
* Select repo and add it
* Show advanced and setup environment variables
* Only setup space id and access token for Contentful (playground is not available for production)
* add name value pairs for the tokens (do not grab the = sign! from .env)

### Deploy
Click deploy site 
Might take a few minutes the first time to get everything up and running as it runs through the build script


Make changes in Contentful post
Changes are not updated. Why?
You need to trigger them
Deploy > Trigger deploy > Clear cache and deploy site


## change react stuff
* make change to code base
* Save add and commit changes, a new build will run in netlify
* You can add a custom domain and HTTPS
* You can set up a hook that automatically builds contentful blog post changes (way better than manually changing them alll the time!)
