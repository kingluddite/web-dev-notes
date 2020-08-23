# gatsby build
* **note** At end of day you just have a bunch of static files
* This is great because it means we can deploy our app almost anywhere
* We build locally and share anywhere
    - godaddy
    - bluehost
    - Or services like netlify
* Or we could push our project up to github and the service would build our project for us

## Run the build command
`$ gatsby build`

### Houston we have a problem!
* This is because we are using environment variables
* Here is the error

```
// MORE CODE

Problems with gatsby-source-contentful plugin options:
spaceId: "*********4ma"
accessToken: undefined - "accessToken" is required
// MORE CODE
```

### Solution
* Create `.env.production` (remember it is already ignored in .gitignore)
* Copy and paste your content inside `.env.development` into `.env.production`

## Run build again
`$ gatsby build`

* Now we get the build (inside `public`) folder
* Just drag and drop folder inside your host

## See what project we have locally
`gatsby serve`

`localhost:9000`

* You should see it works just like in development

## Now we are ready to host it on line
