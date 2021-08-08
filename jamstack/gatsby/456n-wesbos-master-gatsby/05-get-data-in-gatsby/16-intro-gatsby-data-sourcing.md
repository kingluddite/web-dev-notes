# Intro to gatsby-data-sourcing

## Where we are now
* We setup our Gatsby
    - Basic templating and layout
    - Creating of pages
* We added sanity
    - Created our schemas and content types

## How do I take the data that lives in my sanity and get it into my Gatsby website?
* We'll answer that soon but first let's talk about the GraphQL Playground

### GraphQL Playground
* Run gatsby `$ npm start`
  - This gives us our localhost server running Gatsby on `localhost:8000`
  - And it also gives us access to GraphQL Playground server running on a local server `localhost:8000/___graphql`
    + You will see GraphiQL running
    + This allows you to see GraphQL queries
    + You run queries in here to see what data is returned

## The idea behind Gatsby
* At build time (when we build our website before we deploy it to the internet) gatsby goes and grabs all the data it needs in order to run
    - It goes to sanity and grabs all the people, toppings, all the relationships... all the data
    - It takes all this data and sticks it (not inside a Database because as soon as its done it disappears) but in its memory and it allows us to query that data via GraphQL queries (**repeat** it is not stored in a Database, but rather just memory)

### GraphiQL endpoint
* Comes with some standard GraphQL queries
    - allDirectory
    - allFile
    - allSite
    - are not very useful for developers (more for lower level plugin developers)

### How do we surface the data from our sanity into our GraphQL explorer (GraphiQL)?
* We do this using the `gatsby-config.js`
* [docs for gatsby-config.js](https://www.gatsbyjs.com/docs/gatsby-config/)
    - siteMetadata and plugins are the big ones
    - smaller ones
        + pathPrefix (for deploying gatsby to subdomains)

### gatsby-config.js
* **UPDATE**
    - Cool to use backticks for all your strings
    - spelling is important... `siteMetadata` (not siteMetaData!!!!!)
    - **note** Restart gatsby any time you change your `gatsby-config.js`, `gatsby-browser.js` or `gatsby-ssr.js`
      + Currently Gatsby is working on making the changes without a restart but have no idea when that change becomes a reality
        * <kbd>ctrl</kbd> + <kbd>c</kbd> (kill server)
        * <kbd>cmd</kbd> + <kbd>k</kbd> (clear)
        * `$ npm start` (clear terminal)
        * Now Gatsby will restart and it first checks for `gatsby-config.js` and then any settings that are inside this file get applied to that build
        * Open GraphiQL
        * You will see `site` > `siteMetaData`
        * **problem** <kbd>ctrl</kbd> + <kbd>space</kbd> gives you dropdown in GraphiQL but that conflicts with my Alfred App open keyboard shortcut
          - Thank goodness Gatsby also offers an alternative <kbd>shift</kbd> + <kbd>space</kbd>
    - The docs show `module.exports` (which is Common JS syntax)
    - NOW Node.js has added the ability to use ES Modules
      + It is beneficial to just use one and since everything else is ES modules

#### Common JS syntax
```js
module.exports = {
  // common js syntax
}
```

#### ES Modules (Node has added ability to use these instead)
```js
export default {
  // ES modules
}
```

### Enable ES Modules in Gatsby
`package.json`

* Use ES Modules in Gatsby

```js
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

* **note** We install `esm` and `cross-env` as dependencies (not devDependencies)

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

```js
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
```js
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
```js
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
