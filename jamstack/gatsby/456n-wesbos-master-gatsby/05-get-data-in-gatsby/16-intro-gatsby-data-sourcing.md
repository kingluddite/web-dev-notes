# Intro to gatsby-data-sourcing
* localhost:8000
* localhost:8000/___graphql
* GraphiQL

## The idea behind Gatsby
* At build time gatsby goes and grabs all the data it needs in order to run
    - It goes to sanity and grabs all the people, toppings... all the data
    - It takes all this data and sticks it in its memory and it allows us to query that data via GraphQL queries (not stored in a Database, but rather just memory)

### GraphQL endpoint
* Comes with some standard GraphQL queries
    - all files, directory, are not very useful for developers (more for lower level plugin developers)

### How do we surface the data from our sanity into our GraphQL explorer (GraphiQL)?
* We do this using the `gatsby-config.js`
* [docs for gatsby-config.js](https://www.gatsbyjs.com/docs/gatsby-config/)
    - siteMetadata and plugins are the big ones
    - smaller ones
        + pathPrefix (for deploying gatsby to subdomains)

### gatsby-config.js
* **UPDATE**
    - The docs show `module.exports` (which is Common JS syntax)
    - NOW Node.js has added the ability to use ES Modules

### Enable ES Modules in Gatsby
`package.json`

* Use ES Modules in Gatsby

```
// MORE CODE

  "scripts": {
    "//": "⁉️ Hey! This might look confusing but allow me to explain. The command we want to run is called gatsby build. But because we want to use es modules with gatsby, we use a package called esm. One way to require it is to set the NODE_OPTIONS environmental variable to -r esm. Finally to make this work for windows users, we use the cross-env package. Hopefully once Node es modules are stable, we can bring this back to simple gatsby build",
    "build": "cross-env NODE_OPTIONS=\"-r esm\" gatsby build",
    "develop": "cross-env NODE_OPTIONS=\"-r esm\" gatsby develop",
    "start": "npm run develop",
    "serve": "cross-env NODE_OPTIONS=\"-r esm\" gatsby serve"
// MORE CODE
```

* Add the module to support ECMAScript modules in Node 6+
* [esm docs](https://www.npmjs.com/package/esm)

### Install esm
`$ npm i esm cross-env` (we also install cross-env for windows users)

* There were issues getting this working on Windows and here was [Wes' GHI](https://github.com/wesbos/master-gatsby/issues/28)

### You will get this error
```
  Error: /Users/philiphowley/Documents/dev/clients/vendveri/gatsby-config.js:5
  export default {
  ^^^^^^
  SyntaxError: Unexpected token 'export'

```

## TODO - I could not get this working
* Then add this to `package.json`
    - Make sure you save and restart your server!

```
// MORE CODE

"//": "⁉️ we want to use es modules with gatsby, we use a package called esm. One way to require it is to set the NODE_OPTIONS environmental variable to -r esm. Finally to make this work for windows users, we use the cross-env package. once Node es modules are stable, we can bring this back to simple gatsby build",
    "build": "cross-env NODE_OPTIONS=\"-r esm\" gatsby build",
    "develop": "cross-env NODE_OPTIONS=\"-r esm\" gatsby develop",
    "start": "npm run develop",
    "serve": "cross-env NODE_OPTIONS=\"-r esm\" gatsby serve",
// MORE CODE
```

* If you change your `gatsby-config.js` you currently need to restart your server
    - This is something Gatsby is working on fixing so you can change the config without having to restart the server

## GraphiQL
```
query MyQuery {
  site {
    siteMetadata {
      description
      siteUrl
      title
    }
  }
}

```

### Data result
```
{
  "data": {
    "site": {
      "siteMetadata": {
        "description": "The best pizza ever",
        "siteUrl": "https://gatsby.pizza",
        "title": "Pizza Slices"
      }
    }
  },
  "extensions": {}
}
```
