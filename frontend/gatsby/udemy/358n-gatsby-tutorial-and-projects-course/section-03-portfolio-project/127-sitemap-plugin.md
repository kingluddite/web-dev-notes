# Sitemap plugin
* Generates an XML raw document
* Lists all the important pages of our site
* Designed to help search engines learn more about the structure of our site, find them and crawl them
* [docs](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/?=sitemap)

## Install
`$ npm install gatsby-plugin-sitemap`

* Make sure you have `siteMetadata` and `siteUrl`

`gatsby-config.js`

```
// MORE CODE

module.exports = {
  siteMetadata: {

    // MORE CODE

    siteUrl: "https://testing-strapi-gatsby-build.netlify.app",
  },
// MORE CODE
```

### Add to plugins
`gatsby-config.js`

```
// MORE CODE

plugins: [
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sitemap`, // ADD!

// MORE CODE
```

## Future stuff
* You could add to config for pages to exclude from sitemap

`gatsby-config.js`

```
// MORE CODE

plugins: [
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      output: `/some-other-sitemap.xml`,
      // Exclude specific pages or groups of pages using glob parameters
      // See: https://github.com/isaacs/minimatch
      // The example below will exclude the single `path/to/page` and all routes beginning with `category`
      exclude: [`/category/*`, `/path/to/page`], // ADD if you need
// MORE CODE
```


