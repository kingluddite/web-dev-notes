# gatsby-source-filesystem Plugin install
* Now we need to get our image optimizations
* We'll need to add a few more plugins
* Currently we DON'T EVEN HAVE ACCESS TO OUR IMAGES

### Two Step Process for optimization images
1. Install `gatsby-source-filesystem` Plugin (to access our local files)
2. We'll need a gatsby-image Plugin (this will apply all the incredible image optimizations)

#### Search plugins
`search for source-file-system`

* "A Gatsby source plugin for sourcing data into your Gatsby application from your local filesystem"
    - Since our images our inside our local file system that is why we need this plugin
* [docs](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)

## Install it:
`$ npm install --save gatsby-source-filesystem`

### Once installed `source-file-system` gives us
* We have access to `allFile` gives us the ability to get all files from a specific folder
* We need to point to `images` and since it is a node.js file we need to use `__dirname` with our `path` property
    - `__dirname` points to where the file is located which `gatsby-config.js` which resides in the root then to `src` than to images
        + `{__dirname}/src/images`
* We are using an object for our plugin because we need to pass options
    - One option property is `name` - why do we need name?
    - You can have multiple instances of this plugin to read source nodes from different locations on your filesystem so you use `name` to differentiate them
        + Maybe you have one name pointing to `pages`, another `images` and another `data` (names are arbitrary)
* `sourceInstanceName` once we set up our query and once we learn how arguments work in GraphQL we can use `sourceInstanceName` argument and depending on which name you gave for that instance (ie "images") then you can point to that specific folder
* **NOTE** The order of your plugins in gatsby-config does not matter

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Learn Gatsby',
    description: 'bla bla bla description',
    author: '@johndoe',
    data: ['item 1', 'item 2'],
    person: { name: 'jane', age: 100 },
  },
  plugins: [
    'gatsby-plugin-eslint',
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
```

* Shutdown gatsby
* Restart gatsby
* If no errors you successfully installed gatsby-source-filesystem
