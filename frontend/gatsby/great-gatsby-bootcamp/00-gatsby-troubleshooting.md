# Troubshooting:
## Debug Gatsby Build process
* https://github.com/microsoft/vscode-recipes/tree/master/Gatsby-js

## Debug Gatsby React apps
https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f

* [react-fire-dom is not detected](https://i.imgur.com/n6q5txs.png)
* https://github.com/gatsbyjs/gatsby/issues/11934
* replace `react-dom` with `@hot-loader/react-dom` to remove this warning

`$ npm uninstall react-dom`

`$ npm i -D @hot-loader/react-dom`

* Create `gatsby-node.js` in root of gatsby project

`gatsby-node.js`

```
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
```

* Above solution works

## Vim write files
* Sometimes you are readonly and your changes are not recorded
* `$ w!` will force a write
* Example of a problem, i was updating my siteMetadata and didn't see it in the GraphQL Playground and had to write to it with `w!` to make the changes stick

## Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (67)
For more information on which environments are supported please see:
https://github.com/sass/node-sass/releases/tag/v4.9.0

* Remove `$ rm -rf node_modules && npm i`
* Also `$ npm rebuild node-sass`
