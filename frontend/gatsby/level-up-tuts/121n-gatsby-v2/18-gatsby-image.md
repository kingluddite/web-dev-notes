# gatsby-image
* react component that gives us great power with images
* Our image is large
* Can we do the exact same thing we did for our logo and import it?
    - No!
    - Why not?
    - Because of a few factors:
        + We want to ensure different screen sizes get served difference image sizes
        + We want to use loading animation to make the image loading be perceieved to load faster
            * A less res image loads first until the real full rez image is loaded
        * To do all of this we'll need to use `gatsby-image`

## gatsby-image
* This will work in coordination with a couple of other packages
    - gatsby-transformer-sharp
        + Enables us to transform the node data
    - gatsby-plugin-sharp
        + Enables us to use sharp overall
    - **note** sharp will enable our image to have all these cool effects

## Install the stuff needed for working with images in Gatsby
`$ npm i gatsby-plugin-sharp gatsby-transformer-sharp gatsby-image` 

## Install these plugins to our plugins file
* After a successfull install you will get an error that says it can not find `gatsby-image/index.js`
    - We'll fix this now
    - The error is because we need to add another source-file-system in `gatsby-config.js`
* Any time you add plugins to your project you also need to add those plugins (and their options if necessary) to `gatsby-config.js`

`gatsby-config.js`

```
// MORE CODE

  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

// MORE CODE
```

## Turn all our images into nodes that GraphQL can understand
* To do this we need to add another `gatsby-source-filesystem`

### Can we have two `gatsby-source-filesystem`s?
* Sure
* Whenever you need to include another file as a different type of node you need to add another `gatsby-source-filesystem`
* I will put our images inside `src/assets/images`
* So make this modification by adding it below our existing `gatsby-source-filesystem`

`gatsby-config.js`

```
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${ __dirname }/src/posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${ __dirname }/src/images`,
      },
    },
  ],
}
```

* This makes is so:
    - bg.jpg
    - gatsby-icon.png
    - logo.svg
* All the above is findable via GraphQL

## Restart server
* **caveat** With this plugin you can't test out everything
    - We'll deal with this issue later

### Test in GraphQL sandbox
```
{
  file(relativePath:{
    regex: "/icon/"
  }) {
    size
  }
}
```

* Output

```
{
  "data": {
    "file": {
      "size": 21212
    }
  }
}
```

#### childImageSharp
* There are different ways to grab an image
    - From fixed image to
        + fluid image (where you don't know the size)
        + Use fluid if you want to have the image change based on different screen sizes
* Add this modification to GraphQL sandbox

```
{
  file(relativePath:{
    regex: "/icon/"
  }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        src
      }
    }
  }
}
```

* Output

```
{
  "data": {
    "file": {
      "childImageSharp": {
        "fluid": {
          "src": "/static/4a9773549091c227cd2eb82ccd9c5e3a/91661/gatsby-icon.png"
        }
      }
    }
  }
}
```

* Above is a generated image

## Let's break GraphQL sandbox
* We'll use a spread operator

```
{
  file(relativePath:{
    regex: "/icon/"
  }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GastbyImageSharpFluid
      }
    }
  }
}
```

* Hit play and you'll get an error `Unknown fragment`
* But if we paste this same code into our site it will work

### Import gatsby-image React Component
```
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image';
import Helmet from 'react-helmet'

// MORE CODE
```

## Update our GraphQL query from this:
`layout.js`

```
// MORE CODE

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}

// MORE CODE
```

* To this:

```
// MORE CODE

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
        file(relativePath: { regex: "/icon/" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GastbyImageSharpFluid
            }
          }
        }
      }
    `}

// MORE CODE
```

### Find the path to the `src` of our image
* Easy just do this in GraphQL Sandbox

```
{
  file(relativePath:{
    regex: "/icon/"
  }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        src
      }
    }
  }
}
```

* Output

```
{
  "data": {
    "file": {
      "childImageSharp": {
        "fluid": {
          "src": "/static/4a9773549091c227cd2eb82ccd9c5e3a/91661/gatsby-icon.png"
        }
      }
    }
  }
}
```

* That shows you the path

`data.file.childImageSharp.fluid.src`

* We will just point to:

`file.childImageSharp.fluid`

* Like this:

`layout.js`

```
// MORE CODE

        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Img fluid={data.file.childImageSharp.fluid} />
        <MainLayout>
          <div>{children}</div>
          <Archive />
        </MainLayout>
      </>
    )}
  />
)

// MORE CODE
```

* Run Gatsby `$ gatsby develop`

## Test in browser
* You see the image in the page
* If the image was a 20mb image it would load fast
* Refresh and watch how the image loads blurry and then animates to full res
    - Gatsby loads in a lower res image blurred it
    - Then swaps out with high res image when it loads and animates that in

### Use CDT to inspect the size of the image
* Make screen wider and see how dimensions of image used is larger
* Make screen smaller and see how dimensions of image is smaller

## Why are we going through the long drawn out technique of querying the image with GraphQL?
* To get this benefit of serving the best image dynically depending on device size

## Other options for gatsby-image
* Can use trace SVG, webP, node based 64
* See the [Gatsby Image Plugin](https://www.gatsbyjs.org/packages/gatsby-image/) to see all options

### try SVG image
`layout.js`

```
// MORE CODE

        file(relativePath: { regex: "/icon/" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }

// MORE CODE
```

* This gives you a trace svg effect instead of blurred
