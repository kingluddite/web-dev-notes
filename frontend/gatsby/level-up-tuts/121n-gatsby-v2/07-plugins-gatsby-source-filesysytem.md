# Plugins & Gatsby Source Filesystem
`gatsby-config.js`

* The file where you manage all your plugins

## Plugins
* gatsby-plugin-react-helmet
* gatsby-plugin-manifest
    - options (to create a manifest file):
        + name
        + short_name
        + start_url
        + background_color
        + theme_color
        + display
        + icon
* gatsby-plugin-offline
    - Don’t forget to list the offline plugin after the manifest plugin so that the manifest file can be included in the service worker

## What is a manifest file?
* Google says, "_The web app manifest is a simple JSON file that tells the browser about your web application and how it should behave when ‘installed’ on the users mobile device or desktop_"

## What is Lighthouse?
* If you run audit with Lighthouse you will initially get a low PWA score
* Lighthouse is included in CDT
    - Run its audit
        + Then address the errors it finds and implementing the improvements it suggests is a great way to prepare your site to go live
        + It helps give you confidence that your site is as fast and accessible as possible

### Create a production build of your Gatsby site

`$ gatsby build`

* This does a production build of your site
* And outputs the built static files into the **public** directory

#### View the production site locally
`$ gatsby serve`

Once this starts, you can now view your site at `localhost:9000`

### Development server
`$ gatsby develop`

* The Gatsby development server is optimized for making development fast
    - But the site that it generates, while closely resembling a production version of the site, isn't as optimized

### Run CDT
* Click `Audits` tab
* Click `Perform an audit...`
* It takes about a minute until the audit is complete

### All good except for PWA
* Out of the box our Progressive Web App score is terrible
* We can fix this and in the process make our site much more friendly to visitors and search engines

## Add a manifest file

### What are PWAs?
PWAs are regular websites that take advantage of modern browser functionality to augment the web experience with app-like features and benefits
* Are delivered through the web
* Just websites "that took all the right vitamins"

## Add offline support

## Add page metadata

## What qualifies as a PWA?
1. It must run under HTTPS
2. It must include a Web App Manifest
3. It must implement a service worker

## How is Gatsby a PWA?
* Gatsby is designed to provide top-notch performance out of the box
* Gatsby handles:
    - code splitting
    - code minification
    - various optimizations like:
        + pre-loading in the background
        + image processing
* It must run under **HTTPS**
    - Gatsby doesn't do this out of the box
    - If you use Netlify to deploy you can make your production site use HTTPS with one click
        + Running your site under HTTPS is a highly recommended security practice, no matter the content of your site
        + Specifically concerning progressive web apps, running under HTTPS is a criterion for many new browser features that are required for progressive web apps to work
* It must include a **Web App Manifest**
    - A web app manifest is a JSON file that provides the browser with information about your web app, and makes it possible for users to save to their home screen
    - It includes information like the web app’s `name`, `icons`, `start_url`, `background-color` and more
    - Gatsby provides a plugin interface to add support for shipping a manifest with your site — `gatsby-plugin-manifest`
* It must implement a **service worker**
    - A service worker provides support for an offline experience for your site, and makes your site more resilient to bad network connections
    - It’s a script that runs separately in the background, supporting features like push notifications and background sync
    - Gatsby also provides a plugin interface to create and load a service worker into your site — `gatsby-plugin-offline`
    - Gatsby JS recommends using this plugin together with the manifest plugin
        + Don’t forget to list the `offline` plugin after the `manifest` plugin so that the manifest file can be included in the service worker
* After adding those plugins you will get almost over 90% for all Lighthouse measurements

## Gatsby has a list of plugins it maintains
* [over 500 plugins](https://www.gatsbyjs.org/plugins/)

## Comment in `gatsby-plugin-offline`
* By default it was commented out

## gatsby-source-filesystem
* [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=file)
* This lets you tell Gatsby where there are going to be files
    - And the `transformer` plugin will enable us to transform that file into data we can use
    - It is a plugin for creating **File** nodes from the file system
        + The plugin will enable us to point to a directory where our markdown files reside and then the `gatsby-transformer-remark` package will enable us to query those markdown files

## How to shape plugins
* Plugins can be simple strings like `gatsby-plugin-offline`
* But you can also have a plugin with options
    -  like `gatsby-plugin-manifest`
        +  Then you store the plugin inside an object
            *  `resolve` will be the package name
            *  `options` are where you store your options

### Create a new `posts` folder
`/src/posts/`

### Update our config file with a new plugin

`gatsby-config.js`

```
// MORE CODE

    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts'
      }
    }
  ],
};
```

* Now after add this Gatsby should be aware of `posts` in our app

## Create a new file
`/src/posts/post1.md`

```
# Hello from your Markdown Post
```

## Run Gatsby develop server
`$ gatsby develop`

* Open GraphQL sandbox `http://localhost:8000/___graphql`

```
{
  site {
    siteMetadata {
      title
      description
    }
  }
  allFile
}
```

* All files is `edges`
* Each individual file is `node`

```
{
  site {
    siteMetadata {
      title
      description
    }
  }
  allFile {
    edges {
      node {
        extension
        name
      }
    }
  }
}
```

* That will output this:

```
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "React Sensei",
        "description": "Learn Gatsby from the ground up. Our target market are people new to the world of development"
      }
    },
    "allFile": {
      "edges": [
        {
          "node": {
            "extension": "png",
            "name": "gatsby-icon"
          }
        },
        {
          "node": {
            "extension": "png",
            "name": "gatsby-astronaut"
          }
        },
        {
          "node": {
            "extension": "md",
            "name": "post1"
          }
        }
      ]
    }
  }
}
```

* You will see `allFile` or `file`
    - If you don't make sure to stop and restart your server
    - Make sure you have at least one `something.md` file in your `posts` directory

## Next
* Using markdown package
* Make our post nicer looking
* Write our Query in GraphQL inside Gatsby to create a working blog
* We'll create a page for our blog and explain why
  - This will give us the ability to create static pages out with GraphQL and NodeJS

## Additional Resources
* [Google's Overview](https://developers.google.com/web/progressive-web-apps/)
    - Defines a PWA experience
    - [Google Video about PWA](https://www.youtube.com/watch?time_continue=54&v=m-sCdS0sQO8)
* Progressive web apps (PWAs) doc
    - Learn how a Gatsby site is a progressive web app
