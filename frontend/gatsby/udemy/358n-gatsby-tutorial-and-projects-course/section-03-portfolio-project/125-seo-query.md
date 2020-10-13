# SEO query
* We'll get the info now from the `gatsby-config.js`
* We'll use GraphQL to pull meta info in from our `gatsby-config.js`

## GraphQL
* Use `site` and check
    - author
    - description
    - image
    - siteUrl
    - title
    - twitterUsername

## To make things easier we'll use two aliases
```
query MyQuery {
  site {
    siteMetadata {
      author
      siteDesc: description
      image
      siteUrl
      siteTitle:title
      twitterUsername
    }
  }
}
```

## No export
* Since this is not a page I can not export

`SEO.js`

```
import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const query = graphql`
  {
    site {
      siteMetadata {
        author
        siteDesc: description
        image
        siteUrl
        siteTitle: title
        twitterUsername
      }
    }
  }
`

const SEO = ({ title, description }) => {
  const { site } = useStaticQuery(query)
  const {
    siteDesc,
    siteTitle,
    siteUrl,
    image,
    twitterUsername,
  } = site.siteMetadata

  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={`${title} | ${siteTitle}`}>
      <meta name="description" content={description || siteDesc} />
      <meta name="image" content={image} />
    </Helmet>
  )
}
export default SEO
```

