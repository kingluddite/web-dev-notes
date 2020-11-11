# SEO in Gatsby
* Make sure you install `react-helmet`
* Before we set up SEO the long way
* This is the fast way

### SEO

[Gatsby Example](https://www.gatsbyjs.org/docs/add-seo-component/)

* Scroll to the bottom and copy and paste the `src/components/seo.js` on Gatsby to your `components/SEO.js`

```
import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`
```

## Set up the query
* Most import thing is to set up this query

```
// MORE CODE

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`
```

## Let's setup siteMetadata in `gatsby-config.js`
`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: `Gatsby MDX Blog`,
    description: `Really cool blog built with Gatsby`,
    titleTemplate: `%s | MDX Blog`,
    url: `https:example.com`,
    image: `mainImg.png`,
    twitterUsername: `@king_luddite`,
  },
  plugins: [

// MORE CODE
```

* titleTemplate - think of it as an addition to the title of the page
    - `<title>Home | MDX Blob</title>`

![title of page](https://i.imgur.com/LMvvml1.png)

* Will be added to each and every page title

### image
* Needs to be in the `static` folder and whatever you named the image

## After adding
`$ gatsby clean && gatsby develop`

### They are expecting
* title, description, image, article

```
// MORE CODE

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()

// MORE CODE
```


* But if you don't provide them they provide default values

```
// MORE CODE

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

// MORE CODE
```

* But the props say they are expecting but not requiring

```
// MORE CODE

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

// MORE CODE
```

* They setup some aliases in the query

```
// MORE CODE

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`

// MORE CODE
```

## See how they descructure from the `useStaticQuery`

```
// MORE CODE

  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

// MORE CODE
```

## And here is where they use your values or if you didn't provide them, they use defaults
* They saves your site from blowing up

```
// MORE CODE

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

// MORE CODE
```

## And finally pass the props if they exists
```
// MORE CODE

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

// MORE CODE
```

## Add our SEO component
```
// MORE CODE

import SEO from '../components/SEO'

const IndexPage = ({ data }) => {
  const {
    allMdx: { nodes: posts },
  } = data

  return (
    <Layout>
      <SEO />

// MORE CODE
```

* Pass a prop

```
// MORE CODE

  return (
    <Layout>
      <SEO title="Home" />

// MORE CODE
```

`$ gatsby clean && gatsby develop`

## Link to final page
* [finished page](https://gatsby-mdx-blog-course-project.netlify.app/)
* **note** Just remember to run -

`$ npm install`

`$ gatsby develop` (or npm run develop)

Also, follow this link if you want to check out finished project.
