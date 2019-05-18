# Generating Slugs for Posts
How do we create a new page for each and every post?
We can use a Gatsby API that will enable us to dynamically generate new pages with dynamic content
* We'll generate new pages where the new content is the blog post content

## Big picture
### Goal 1 - Generate a slug for each post

```
gatsby.md --> gatsby --> /blog/gatsby
```

### Goal 2 - Generate the blog post page template
* Out put the React Component

### Goal 3 - Combine Goal 1 and Goal 2
Generate a new page for each post

## gatsby-node.js
* This is the gatsby node config file
* This enables us to connect to the gatsby node API that gatsby provides

`$ touch gatsby-node.js`

* We will use this file to generate our slug and our pages from a template

### Read more about the Gatsby Node API
[docs](https://www.gatsbyjs.org/docs/node-apis/)

#### onCreateNode
[docs](https://www.gatsbyjs.org/docs/node-apis/#onCreateNode)

* Allows us attach some new data onto the individual node
* We will attach the slug and this will give us access to the slug throughout the entirety of the app

##### What is a node?
* Nothing more than a data structure for storing your Gatsby data
    - We saw this in action with the GraphQL queries we ran earlier

```
query {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          date
        }
        html
        excerpt
      }
    }
  }
}
```

* Above is our GraphQL query where we can grab individual nodes
* This `onCreateNode` API allows us to do something when that node is created
* So when a new markdown file is created then we'll attach the slug field onto it which is nothing more than a string without the `.md` extension

## Bring in this API into our `gatsby-node.js`

### module.export
```
module.exports.onCreateNode = () => {
    //
}
```

* That's how we use this file `gatsby-node.js`

1. We export functions
2. These functions get registered to Gatsby and run when they are supposed to

`gatsby-node.js`

```
module.exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
}
```

* And in this case our this function runs when a new node is created

* createNode
    - [docs](https://www.gatsbyjs.org/docs/actions/#createNode)
* createNodeField
    - [docs](https://www.gatsbyjs.org/docs/actions/#createNodeField)

`gatsby-node.js`

```
exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
  console.log(node)
}
```

* This will log out the node object
* Stop/Start server and view the output

```
exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
  console.log(actions)
}
```

* This will output all the actions
* Something like this will be output to the terminal

```
{
  deletePage: [Function],
  createPage: [Function],
  deleteNode: [Function],
  deleteNodes: [Function],
  createNode: [Function],
  touchNode: [Function],
  createNodeField: [Function],
  createParentChildLink: [Function],
  createPageDependency: [Function],
  deleteComponentsDependencies: [Function],
  replaceComponentQuery: [Function],
  replaceStaticQuery: [Function],
  setWebpackConfig: [Function],
  replaceWebpackConfig: [Function],
  setBabelOptions: [Function],
  setBabelPlugin: [Function],
  setBabelPreset: [Function],
  createJob: [Function],
  setJob: [Function],
  endJob: [Function],
  setPluginStatus: [Function],
  createRedirect: [Function],
  addThirdPartySchema: [Function],
  createTypes: [Function],
  queryExtracted: [Function],
  queryExtractionGraphQLError: [Function],
  queryExtractedBabelSuccess: [Function],
  queryExtractionBabelError: [Function],
  setProgramStatus: [Function],
  pageQueryRun: [Function]
}
```

### Pretty print terminal output
* Make our terminal output easier to read
* We can "Pretty print" the node

#### JSON.stringify()
* This will convert the node object over to a formatted string (this makes it easier to read)

`JSON.stringify(PASS_IN_OBJECT, undefined, SPACES_WE_WANT_USE_WHEN_PRINTING_TO_TERMINAL)`

example:

`console.log(JSON.stringify(node, undefined, 4))`

* The second argument is an optional filtering function
    - We want to see everything in this example so we leave that off and set it to `undefined`
```
exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
  console.log(JSON.stringify(node, undefined, 4))
}
```

* And this will be the output
* We look for after the "success createPages"

```
// MORE CODE

success createPages — 0.000 s

// MORE CODE

{
    "jsonName": "index",
    "internalComponentName": "ComponentIndex",
    "path": "/",
    "component": "/Users/philiphowley/Documents/dev/gatsby-stuff/031e-gatsby-bootcamp/src/pages/index.js",
    "componentChunkName": "component---src-pages-index-js",
    "isCreatedByStatefulCreatePages": true,
    "context": {},
    "pluginCreator___NODE": "0ff9aaa9-a43a-55ff-8be0-ff69cb4bcca6",
    "pluginCreatorId": "0ff9aaa9-a43a-55ff-8be0-ff69cb4bcca6",
    "componentPath": "/Users/philiphowley/Documents/dev/gatsby-stuff/031e-gatsby-bootcamp/src/pages/index.js",
    "id": "SitePage /",
    "parent": null,
    "children": [],
    "internal": {
        "type": "SitePage",
        "contentDigest": "64b298beb75c7474839c16da91286f4d",
        "description": "0ff9aaa9-a43a-55ff-8be0-ff69cb4bcca6",
        "owner": "internal-data-bridge"
    }
}

// MORE CODE
```

* We are interested in the `internal`
    - `internal` is an object
        + This is the type for the current node
            * type is a `SitePage`
                - SitePage is a built in Gatsby type (this is for new pages on our site)
            * the `componentPath` shows us where the page is for the home page
* scroll up and you'll see sitePage for all the other pages (even a 404 dev page)

## `MarkdownRemark`
* If you scroll up you will see a new type `MarkdownRemark`

```
// MORE CODE

{
    "id": "5452371b-68ff-50fa-9ae7-465216b6be4b",
    "children": [],
    "parent": "f67af22e-b673-58d8-9ea0-342df70b16c9",
    "internal": {
        "content": "\nGatsbyJS uses the following technologies\n\n## Technologies\n\n1. React\n2. GraphQL\n3. JavaScript\n4. HTML\n5. CSS\n6. Sass (optional)\n7. CSS Modules (optional)\n8. NodeJS\n9. JSX\n",
        "type": "MarkdownRemark",
        "contentDigest": "e20eeea922018768253b0ccc4c4e46dc",
        "owner": "gatsby-transformer-remark"
    },
    "frontmatter": {
        "title": "What technologies does GatsbyJS use?",
        "date": "2019-04-21"
    },
    "excerpt": "",
    "rawMarkdownBody": "\nGatsbyJS uses the following technologies\n\n## Technologies\n\n1. React\n2. GraphQL\n3. JavaScript\n4. HTML\n5. CSS\n6. Sass (optional)\n7. CSS Modules (optional)\n8. NodeJS\n9. JSX\n",
    "fileAbsolutePath": "/Users/philiphowley/Documents/dev/gatsby-stuff/031e-gatsby-bootcamp/src/posts/gatsby.md"
}

// MORE CODE
```

* These `MarkdownRemark` nodes are the nodes we need to tap into
* `onCreateNode` runs for ALL of the nodes on our site
    - We DO NOT want to do something for all the nodes
    - We ONLY want to do something for the `MarkdownRemark` nodes
        + We want to take the entire file name, reduce it to a slug, and we want to add that as a new field onto the node so it is easily accessible throughout the rest of our app 
        + So we need to filter only `MarkdownRemark` type and we'll do that using an `if` statement

```
exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
  if (node.internal.type === 'MarkdownRemark') {
    console.log(JSON.stringify(node, undefined, 4))
  }
}
```

* That will only give us our `MarkdownRemark` type files 

```
{
    "id": "d89fbccc-4879-5ca3-a1d7-c83f143c7aff",
    "children": [],
    "parent": "26b7fcaa-59c3-59d1-a2e3-d38ceca6f37f",
    "internal": {
        "content": "\nLet's learn React\n",
        "type": "MarkdownRemark",
        "contentDigest": "88d80d906b02005cbfde6d78b4d6669d",
        "owner": "gatsby-transformer-remark"
    },
    "frontmatter": {
        "title": "React",
        "date": "2019-04-02"
    },
    "excerpt": "",
    "rawMarkdownBody": "\nLet's learn React\n",
    "fileAbsolutePath": "/Users/philiphowley/Documents/dev/gatsby-stuff/031e-gatsby-bootcamp/src/posts/react.md"
}
```

* You'll see all returned nodes have a `fileAbsolutePath` and we'll take this and use it to get our slug

1. We'll remove the string path, the entire path except for the file name
2. We'll also strip off the extension

That will leave us with just the `slug`

* So this fileAbsolutePath:

/Users/philiphowley/Documents/dev/gatsby-stuff/031e-gatsby-bootcamp/src/posts/react.md

* Becomes

`react`

## path
[documentation](https://nodejs.org/docs/latest/api/path.html)
* There is a built-in node module called `path` that enables us to manipulate the path
* And the `path` module has a function that enables us to extract the `file name` from any complex path

### path.basename(path[, ext])
[documentation](https://nodejs.org/docs/latest/api/path.html#path_path_basename_path_ext)

```
const path = require('path')

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')
    console.log(slug)
  }
}
```

* We require `path`
    - We don't need to import it as `path` is built into the core node module
* The second argument is the extension we want to remove
* `$ npm run develop`

You will see in the terminal output `react` (it's hard to see but it should be there)


```
// MORE OUTPUT
success initialize cache — 0.024 s
success copy gatsby files — 0.066 s
success onPreBootstrap — 0.011 s
⠂ source and transform nodesgatsby
react
success source and transform nodes — 0.110 s

// MORE OUTPUT
```
 
* Make it easier to see in the Terminal

## createNodeField
* Now we'll need to use the `createNodeField` to add the new field onto the node

```
exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
```

* Now we'll see if we can grab the newly created `slug` from our GraphQL Playground

## This won't work
```
query {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          date
        }
        html
        excerpt
        slug
      }
    }
  }
}
```

* Read your dynamic docs in Playground
* allMarkdownRemark > edges > node > fields > slug

```
query {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          date
        }
        html
        excerpt
        fields {
          slug
        }
      }
    }
  }
}
```

* Check it out and you will see the slugs for the markdown files

## Next
1. We will set up the templates
2. Dynamically generating those new pages



