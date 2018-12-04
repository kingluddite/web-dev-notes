# Gatsby Node
* Last video we hit the API and got some data back

## Let's create pages programically
* All of this is done inside the `gatsby-node.js` page
* All that is currently inside this page is comments
    - We don't need the comments so delete them

### What is the purpose of `gatsby-node.js`
* To give us the developer control over what is being created and registered in Gatsby

#### What are we trying to do?
* We want to create a new page at some arbitrary URL that we will define in code instead of React components and we'll point it to a React component that we can then render

### When will this node file be run?
* When the site is built

## require syntax
* This is a node file so we need to use the `require` syntax
    - And that is why we won't be using the ES6 `import` syntax

## Let's create a page
* We have access to an object called `exports`
* Node gives us access to `exports` out of the box

`gatsby-node.js`

```
// MORE CODE

exports.createPages = ({ graphql, actions }) => {
  
}

// MORE CODE
```

* Above is a Gatsby syntax for creating pages inside Gatsby using Node
    - We are creating a new method `createPages`
    - We are passing into it `GraphQL` and `actions` arguments
        + And they are being passed into it via Gatsby's build tools (so we don't have to worry about doing that aspect of it)

```
// MORE CODE

exports.createPages = ({ graphql, actions }) => {
  // destructure createPage from actions
  const { createPage } = actions;
  // run createPage
  createPage({
    // requires a path
    path: '/somefakepage',
    component: CREATE_THIS_NOW!
  })
}

// MORE CODE
```

* Inside of `actions` we have access to `createPage` and we destructure it from `actions`

## Create new component `postLayout.js`

```
import React, { Component } from 'react'

class postLayout extends Component {
  render () {
    return (
      <div>
        <h2>Post Layout</h2>
      </div>
    )
  }
}

export default postLayout
```

### Now we point to `postLayout.js`
```
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  // destructure createPage from actions
  const { createPage } = actions
  // run createPage
  createPage({
    // requires a path
    path: '/somefakepage',
    component: path.resolve('./src/components/postLayout.js'),
  })
}
```

* We need to point to a file
* Node has a built in package `path` that helps us do this consistently on Mac, Windows and Linux OS's
* `path.resolve()` points to the file from the root of the app
* Now everytime Gatsby is restarted it's going to create a new page that points to `/somefakepage` and it will do so using `postLayout.js`

## Visit the route
`http://localhost:8000/somefakepage`

* We get a 404
* We need to stop and restart Gatsby for it to generate this new page

## Restart Gatsby and refresh `/somefakepage`
* If you had any mistakes in your `gatsby-node.js` file Gatsby will not complete the build and it will get stuck on the `createPages` part of the build
* But if you coded the page correctly you will see `Post Layout` on the `/somefakepage` route

## Wrap with layout
`postLayout.js`

```
import React, { Component } from 'react'

// custom components
import Layout from './layout'

class postLayout extends Component {
  render () {
    return (
      <Layout>
        <h2>Post Layout</h2>
      </Layout>
    )
  }
}

export default postLayout
```

* Now the page has a nice layout

## How many times can we run Gatsby's `createPage`?
* As many times as we want

`gatsby-node.js`

```
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  // destructure createPage from actions
  const { createPage } = actions
  // run createPage
  createPage({
    // requires a path
    path: '/somefakepage',
    component: path.resolve('./src/components/postLayout.js'),
  })
  createPage({
    // requires a path
    path: '/somefakepages',
    component: path.resolve('./src/components/postLayout.js'),
  })
}

// MORE CODE
```

## Check what pages were created by Gatsby
* Just go to the 404 page (browse to a route that doesn't exist) and in development (not in production) you will get a list of all the pages that were created by Gatsby
* We should be able to create as many pages as we like based on the content we have via a GraphQL query
* We have some actual queries we can write via our GraphQL to get us an array of posts in which we have almost everything we need, including the slug
    - This will enable us to run a GraphQL query in our `createPage`
    - Then iterate over each of the results
    - Create pages with those results
    - And then pass in some context
    - So that we can then do another query to grab the rest of the data on the page

## Next - Create a page for every markdown file we have in our app
