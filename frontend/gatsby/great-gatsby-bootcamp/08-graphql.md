# Gatsby Data with GraphQL
* Get dynamic data into our Gatsby sites using Gatsby's GraphQL API
* Everything so far is code we typed into our rendered components

## How could we add a blog to our site?
1. We could create a blog page to our site for every single post and this would result in a lot of duplicate (not DRY) code
2. You would end up writing the JSX for the component which is not a good idea since you would want to get your thoughts written down and also remember and maintain the HTML structure for those posts
3. Another CON is you would need to continually update your blog page so all posts would appear on it and this means you would need to copy titles and content for each blog post to this page

## A better idea
* Get data via the GraphQL Gatsby API

## How Gatsby works on home page of Gatsby
1. You have data sources (CMSs, Markdown, Data)
    - CMSs
        + Contentful, Drupal, WordPress
    - Markdown
        + Documentation, Posts, etc.
    - Data
        + APIs, Databases, YAML, JSON, CSV, etc
2. You have your Build
    - Powered by GraphQL
        + HTML, CSS, React
3. Deploy
    - Static Web Host
        + AWS Amplify, Netlify, GitHub Pages, Surge.sh, Aerobatic, Now.sh & lots more

![How GatsbyJS works](https://i.imgur.com/f2JMi15.png)

## Data sources
* Where does your data come from when it is not tied directly inside your component?
* This is what makes GatsbyJS very powerful as we can pull in all kinds of data using GatsbyJS' GraphQL API allowing us to create a static site but that static site gets generated with Dynamic data from 3rd party data sources
* We'll cover markdown and Contentful but first we'll start with site meta data which is nothing more than an object and we can add any key/value pairs we like in this object
    - examples:
        + site title
        + twitter profile name
        + author of the site
        + anything like the above that we want to be able to adjust across the entire site

### Where do we manipulate the site meta data?
* Inside the `gatsby-config.js`
* You need to use `siteMetadata` and spell it exactly like that or else Gatsby will not be able to find it

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Full-Stack Gatsby Bootcamp',
    author: 'Kingluddite',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
    },
  ],
}
```

## Gatsby GraphQL Playground
* This URL localhost `http://localhost:8000/___graphql` is only available when our site is running in development mode
* This opens GraphiQL
* Self documenting

### Three Main operations we can perform in GraphQL
1. Queries
2. Mutations
3. Subscriptions

* When it comes to GraphQL inside of Gatsby we just use `Queries` to fetch the data from those external sources
* Click on Query in GraphiQL and you will see a list of all the queries we have access to
* This will change when we start to fetch content with Markdown and Contentful

### Let's work with the `site` Query
* Click on `site` and you will see various arguments
* You can also view the `Type` definition which is what we want

### When we grab `site` what do we have access to?
* After clicking `Site` you will see all the `fields` you have access to
* The field we are interested in is `siteMetadata`
    - If you click on `siteMetadate` you will see that it is of the type `SiteSiteMetadata` and if you click on that you will see the fields you have access to
        + title: String
        + author: String
    - These are the 2 things we defined in our gatsby-config.js siteMetadata

## Run a Query
* This query will fetch our siteMetadata

`Playground`

```
query {
  site {
    siteMetadata {
      title
    }
  }
}
```

* Execute/Play and you'll see what is returned from the GraphQL query

## The structure of the response
```
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "Full-Stack Gatsby Bootcamp"
      }
    }
  }
}
```

* The structure of the response is dictated by the structure of the query
* We get back the fields we put in but the values are populated with the values we put in

## Run exact same query in React component
* This will enable us to fetch dynamic data
* We will populate our Header value with the `siteMetadata.title`
* To do this we'll need to add `graphql` and `useStaticQuery`

## graphql and useStaticQuery
`header.js`

```
import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

// MORE CODE
```

* These two things will give us access to the data and then we can inject that data into the JSX down below
* `useStaticQuery` will enable us to query our GraphQL API
    - tagged template literal
        + it will convert our string GraphQL query over to something that can be used, a complex abstract state tree with all sorts of object properties and stuff we don't need to worry about
        + inside the backticks copy the exact query in Playground

`header.js`

```
// MORE CODE

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

// MORE CODE
```

## Inject the data into our JSX
`header.js`

```
// MORE CODE

  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to="/">
          {data.site.siteMetadata.title}
        </Link>
      </h1>

// MORE CODE
```

* Refresh the browser and you'll see our siteMetadata `title`
* What is very cool is you can modify the title in `gatsby-config.js` and it will update in realtime in the browser
* This is great for
    - Your name
    - title
    - social media URLs
    - emails
    - the list is left to your imagination

## Homework
```
Goal: Run another GraphQL query

1. Use GraphiQL to fetch the author
2. Update the footer component to display the dynamic author value
3. Test your work
```

### GraphiQL
```
query {
  site {
    siteMetadata {
      author
    }
  }
}
```

`footer.js`

```
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)
  return (
    <footer>
      <p>Created by {data.site.siteMetadata.author}, &copy; 2019</p>
    </footer>
  )
}

export default Footer
```


