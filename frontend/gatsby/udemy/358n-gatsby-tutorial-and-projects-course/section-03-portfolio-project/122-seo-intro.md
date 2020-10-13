# SEO intro
* We'll add a head element to all our pages

## Add plugin - gatsby-plugin-react-helmet
* [docs](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet)

## Install it
`$ npm install gatsby-plugin-react-helmet react-helmet`

## Add the plugin
`gatsby-config.js`

```
// MORE CODE

plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
// MORE CODE
```

## Place your twitter hero card in the static folder
`gatsby-config.js`

```
// MORE CODE

module.exports = {
  siteMetadata: {
    title: "WebDev Portfolio",
    description: "This is WebDev Portfolio Site",
    author: "@example",
    twitterUsername: "@example",
    image: "/twitter-img.png",
    siteUrl: "https://test-strapi-gatsby-build.netlify.app",
  },
// MORE CODE
```

# GOTCHA! - Remove the trailing forward slash in `siteUrl`

## SEO alternatives
* Search on Gatsby you'll see several options

`pages/index.js`

```
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Jobs from "../components/Jobs"
import Projects from "../components/Projects"
import Blogs from "../components/Blogs"
import SEO from "../components/SEO" // ADD!

export default ({ data }) => {
  const {
    allStrapiProjects: { nodes: projects },
    allStrapiBlogs: { nodes: blogs },
  } = data

  return (
    <Layout>
      <SEO /> // ADD!
// MORE CODE
```

`components/SEO.js`

```
import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title }) => {
  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={title}>
      <meta name="description" content={description} />
    </Helmet>
  )
}
export default SEO
```

`pages/index.js`

```
// MORE CODE

return (
    <Layout>
      <SEO title="Home" description="This is our home page" />
      <Hero />
// MORE CODE
```

* view element tab in chrome console
    - You'll see lang (top html tag) and description (meta)

