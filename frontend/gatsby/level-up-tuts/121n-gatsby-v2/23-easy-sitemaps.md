# Easy Sitemaps
* You want SEO
* With WP or Drupal you get Sitemaps for free
* We just install a plugin to get sitemaps working with Gatsby

## Install sitemap
`$ npm i gatsby-plugin-sitemap`

* This will generate an .xml file at `/sitemap`
* Options for this plugin are simple

```
// MORE CODE

    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify', // make sure this is the very last plugin
  ],
}
```

## Visit `http://localhost:8000/sitemap.xml`
* Bad news
* Cannot GET `/sitemap.xml`
* The sitemap is only generated on `$ gatsby build`

`$ gatsby build`

### Houston we have a problem
* We get this error

```
Error: Cannot query field "siteUrl" on type "siteMetadata_2".
  GraphQL request (5:11)
  4:         siteMetadata {
  5:           siteUrl
               ^
  6:         }
```

* This is running query on on site metadata
* We currently have no URL
* We just add our production URL

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'React Sensei',
    description:
      'Learn Gatsby from the ground up. Our target market are people new to the world of development',
    siteUrl: 'https://reactsensei.com',
  },

// MORE CODE
```

* You do not want a `/` at the end of `http://reactsensei.com`

`$ gatsby build`

* Run gatsby serve
    - This will serve the build site locally

`http://localhost:9000/sitemap.xml`

* All pages and posts will be registered on sitemap
* Point any of our webmaster tools to the sitemap, greatly helps with SEO and a must for any production site 
* Update the manifest and info will make phones look nice
* Read manifest and offline plugin docs on Gatsby
