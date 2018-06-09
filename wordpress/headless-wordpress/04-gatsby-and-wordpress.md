# Gatsby and WordPress
* Create `wordpress-gatsby`
* Add plugin `$ yarn add gatsby-source-wordpress`

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `localhost:8080`,
        protocol: `http`,
        hostingWPCOM: false,
        useACF: true,
      },
    },
  ],
}
```

* restart server
* `$ gatsby develop`

`localhost:8000/___graphql`

```
{
  allWordpressPage {
    edges {
      node {
        id
        slug
        title
      }
    }
  }
}
```

* You can easily access all of WordPress API
