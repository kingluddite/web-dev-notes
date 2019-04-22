# GraphQL Playground
* GraphiQL is the default playground but there is a better one to use instead of GraphiQL

## How to swap out GraphiQL for GraphQL Playground
* Set up an environment on our machines in a cross OS way
* We could easily set up the environment variable in the "scripts" of package.json but that is not cross OS compatible
    - Instead we'll create an environment variable in a separate file (`.env.development`) which will load in (very common approach)
        + We'll use KEY=value pairs for our environment variables

## .env.development
* In the root of your Gatsby project create

`$ touch .env.development`

* And add this:

```
GATSBY_GRAPHQL_IDE=playground
```

* Next this is we need to load this file in when we are using the development server and to do that we'll use the very popular envcmd package
* Shut down the development server `ctrl` + `c`
* We'll use `-D` flag since this is a dependency we only need in development

`$ npm i -D env-cmd`

* After that is installed we need to work it into our package.json development script
    - This will use `env-cmd` to load that environment variable file in and then it will run gatsby develop

`package.json`

 * Change from this:

```
// MORE CODE

   "scripts": {
     "build": "gatsby build",
     "develop": "gatsby develop",
     "format": "prettier --write src/**/*.{js,jsx}",
     "start": "npm run develop",
     "serve": "gatsby serve",
     "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\""
   },

// MORE CODE
```

* To this: 
```
// MORE CODE

   "scripts": {
     "build": "gatsby build",
     "develop": "env-cmd .env.development  gatsby develop",
     "format": "prettier --write src/**/*.{js,jsx}",
     "start": "npm run develop",
     "serve": "gatsby serve",
     "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\""
   },

// MORE CODE
```

`$ npm run develop`

* Refresh the GraphiQL page and you will now see the GraphQL Playground
* Improvements
    - We can add tabs and run multiple queries at same time
    - Nicer set of docs that is much easier to work with, we get to see everything in one shot to make is easier to construct the queries we want to perform
