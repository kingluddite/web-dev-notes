# Setup Twitter cards
`SEO.js`

```
// MORE CODE

  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={`${title} | ${siteTitle}`}>
      <meta name="description" content={description || siteDesc} />
      <meta name="image" content={image} />
      {/* twitter cards go here */}
    </Helmet>
  )
}
export default SEO
```

* For this to work we need to add the meta tags then deploy the project
* We need the URL
* Then we can test out the card
    - Remember the `siteUrl` has not trailing slash because the image has a forward slash at the beginning

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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
    </Helmet>
  )
}

export default SEO
```

## Clean and build
`$ gatsby clean && gatsby build`

## Netlify
1. Click your site
2. Click Deploys
3. `$ open` to open Finder/Explorer to get to `public` folder
4. Drag and drop `public` to spot that says "need to update your site? Drag and drop your site folder here"
5. Copy live url to twitter card test site `https://cards-dev.twitter.com/validator`

## If all is well
* You will see a nice card image
* And all these tests pass

```
INFO:  Page fetched successfully
INFO:  12 metatags were found
INFO:  twitter:card = summary_large_image tag found
INFO:  Card loaded successfully
```

## Test on Twitter
* Paste your URL into Twitter's site and you'll see your cool twitter card appearing on Twitter
